const log = require('@vladmandic/pilogger')
const fs = require('fs')
const path = require('path')
const process = require('process')
const canvas = require('canvas')
const tf = require('@tensorflow/tfjs-node')
const Human = require('./dist/human.node.js').default

class HumanCV {
  constructor (config, cameraConfig) {
    this.config = config
    this.cameraConfig = cameraConfig
    this.isStreaming = false
    this.human = new Human(config)
    this.fetch = null
    this.startup = this.init()
    this.result = null
  }

  async init () {
    log.configure({ inspect: { breakLength: 265 } })
    log.header()
    this.fetch = (await import('node-fetch')).default
    await this.human.tf.ready()
    log.info('Human:', this.human.version)
    await this.human.load()
    const loaded = Object.keys(this.human.models).filter((a) => this.human.models[a])
    log.info('Loaded:', loaded)
    log.info('Memory state:', this.human.tf.engine().memory())
  }

  buffer2tensor (buffer) {
    return this.human.tf.tidy(() => {
      if (!buffer) return null
      const decode = this.human.tf.node.decodeImage(buffer, 3)
      let expand
      if (decode.shape[2] === 4) { // input is in rgba format, need to convert to rgb
        const channels = this.human.tf.split(decode, 4, 2) // tf.split(tensor, 4, 2); // split rgba to channels
        const rgb = this.human.tf.stack([channels[0], channels[1], channels[2]], 2) // stack channels back to rgb and ignore alpha
        expand = this.human.tf.reshape(rgb, [1, decode.shape[0], decode.shape[1], 3]) // move extra dim from the end of tensor and use it as batch number instead
      } else {
        expand = this.human.tf.expandDims(decode, 0) // input a rgb so use as-is
      }
      const cast = this.human.tf.cast(expand, 'float32')
      return cast
    })
  }

  async test () {
    let result
    process.on('unhandledRejection', (err) => {
      // @ts-ignore // no idea if exception message is complete
      log.error(err || 'no error message')
    })
    log.state('Processing embedded warmup image: face')
    this.config.warmup = 'face'
    result = await this.human.warmup(this.config)

    log.state('Processing embedded warmup image: full')
    this.config.warmup = 'full'
    result = await this.human.warmup(this.config)
    // no need to print results as they are printed to console during detection from within the library due to human.config.debug set
    return result
  }

  logResults (result) {
    log.data('Results:')
    if (result && result.face && result.face.length > 0) {
      for (let i = 0; i < result.face.length; i++) {
        const face = result.face[i]
        const emotion = face.emotion.reduce((prev, curr) => (prev.score > curr.score ? prev : curr))
        log.data(`  Face: #${i} boxScore:${face.boxScore} faceScore:${face.faceScore} age:${face.age} genderScore:${face.genderScore} gender:${face.gender} emotionScore:${emotion.score} emotion:${emotion.emotion} iris:${face.iris}`)
      }
    } else {
      log.data('  Face: N/A')
    }
    if (result && result.body && result.body.length > 0) {
      for (let i = 0; i < result.body.length; i++) {
        const body = result.body[i]
        log.data(`  Body: #${i} score:${body.score} keypoints:${body.keypoints.length}`)
      }
    } else {
      log.data('  Body: N/A')
    }
    if (result && result.hand && result.hand.length > 0) {
      for (let i = 0; i < result.hand.length; i++) {
        const hand = result.hand[i]
        log.data(`  Hand: #${i} score:${hand.score} keypoints:${hand.keypoints.length}`)
      }
    } else {
      log.data('  Hand: N/A')
    }
    if (result && result.gesture && result.gesture.length > 0) {
      for (let i = 0; i < result.gesture.length; i++) {
        const [key, val] = Object.entries(result.gesture[i])
        log.data(`  Gesture: ${key[0]}#${key[1]} gesture:${val[1]}`)
      }
    } else {
      log.data('  Gesture: N/A')
    }
    if (result && result.object && result.object.length > 0) {
      for (let i = 0; i < result.object.length; i++) {
        const object = result.object[i]
        log.data(`  Object: #${i} score:${object.score} label:${object.label}`)
      }
    } else {
      log.data('  Object: N/A')
    }
  }

  async detectFromBuffer (buffer) {
    const tensor = this.buffer2tensor(buffer)
    log.state('Processing:', tensor.shape)
    try {
      this.result = await this.human.detect(tensor, this.config)
    } catch (err) {
      log.error('caught')
    }
    this.human.tf.dispose(tensor)
    this.logResults(this.result)
    return this.result
  }

  async startStream (interval = 0) {
    this.isStreaming = true
    this.fetch = (await import('node-fetch')).default
    let i = interval || this.cameraConfig.interval
    i *= 1000
    while (this.isStreaming) {
      // if (i) {
      //   setTimeout(() => this.startStream(), i)
      // }
      const response = await this.fetch(`${this.cameraConfig.url}`)
      const data = await response.json()
      const buffer = Buffer.from(data.snapshot, 'base64')
      this.result = await this.detectFromBuffer(buffer)
    }
  }

  async detectFromFile (f) {
    let buffer
    log.info('File location:', f)
    if (f.length === 0) {
      log.warn('Parameters: <input image | folder> missing')
      await this.test()
    } else if (!fs.existsSync(f)) {
      log.error(`File not found: ${f}`)
    } else {
      if (fs.existsSync(f)) {
        const stat = fs.statSync(f)
        if (stat.isDirectory()) {
          const dir = fs.readdirSync(f)
          this.result = []
          for (const file of dir) {
            log.info('Loading image:', path.join(f, file))
            buffer = fs.readFileSync(path.join(f, file))
            this.result = this.result.push(await this.detectFromBuffer(buffer))
          }
        } else {
          log.info('Loading image:', f)
          buffer = fs.readFileSync(f)
          this.result = await this.detectFromBuffer(buffer)
        }
      } else {
        log.info('Loading image:', f)
        buffer = fs.readFileSync(f)
        this.result = await this.detectFromBuffer(buffer)
      }
    }
    return this.result
  }
}

module.exports = { HumanCV }
