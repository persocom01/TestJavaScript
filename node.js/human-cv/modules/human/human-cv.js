const log = require('@vladmandic/pilogger')
const fs = require('fs')
const path = require('path')
const process = require('process')
const canvas = require('canvas')
const tf = require('@tensorflow/tfjs-node')
const Human = require('./dist/human.node.js').default
var ag = require('./additional-gestures')

globalThis.Canvas = canvas.Canvas // patch global namespace with canvas library
globalThis.ImageData = canvas.ImageData // patch global namespace with canvas library

class HumanCV {
  constructor (config, activeDetection) {
    this.config = config
    this.activeDetection = activeDetection
    this.interval = this.activeDetection.interval
    this.human = new Human(this.config)
    this.startup = this.init()
    this.fetch = null
    this.isActive = false
    this.result = null
  }

  async init () {
    log.configure({ inspect: { breakLength: 265 } })
    log.header()
    await this.human.tf.ready()
    log.info('Human:', this.human.version)
    await this.human.load()
    const loaded = Object.keys(this.human.models).filter((a) => this.human.models[a])
    log.info('Loaded:', loaded)
    log.info('Memory state:', this.human.tf.engine().memory())
    if (this.activeDetection.enabled) this.startActiveDetection()
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

  async bufferFromInput (input) {
    let buffer
    this.fetch = (await import('node-fetch')).default
    log.info('Loading image:', input)
    if (input.startsWith('http:') || input.startsWith('https:')) {
      const res = await this.fetch(input)
      if (res && res.ok) buffer = await res.buffer()
      else log.error('Invalid image URL:', input, res.status, res.statusText, res.headers.get('content-type'))
    } else {
      buffer = fs.readFileSync(input)
    }
    return buffer
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

  async detectFromBuffer (buffer) {
    const tensor = this.buffer2tensor(buffer)
    log.state('Processing:', tensor.shape)
    try {
      this.result = await this.human.detect(tensor, this.config)
      this.result = ag.addGestures(this.result) // additional gestures added here.
    } catch (err) {
      log.error('caught')
    }
    this.human.tf.dispose(tensor)
    this.logResults(this.result)
    return this.result
  }

  async startActiveDetection (interval = 0) {
    this.isActive = true
    const timer = ms => new Promise(resolve => setTimeout(resolve, ms))
    this.interval = (interval || this.activeDetection.interval) * 1000

    const detectLoop = async () => {
      const buffer = await this.activeDetection._imageBufferFunction()
      this.result = await this.detectFromBuffer(buffer)
    }

    while (this.isActive) {
      if (this.interval) {
        await timer(this.interval).then(await detectLoop())
      } else {
        await detectLoop()
      }
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
            const filePath = path.join(f, file)
            log.info('Loading image:', filePath)
            buffer = await this.bufferFromInput(filePath)
            this.result = this.result.push(await this.detectFromBuffer(buffer))
          }
        } else {
          log.info('Loading image:', f)
          buffer = await this.bufferFromInput(f)
          this.result = await this.detectFromBuffer(buffer)
        }
      } else {
        log.info('Loading image:', f)
        buffer = await this.bufferFromInput(f)
        this.result = await this.detectFromBuffer(buffer)
      }
    }
    return this.result
  }

  async drawOnCanvas (input, callback) {
    const inputImage = await canvas.loadImage(input) // load image using canvas library
    console.log('Loaded image', input, inputImage.width, inputImage.height)
    const inputCanvas = new canvas.Canvas(inputImage.width, inputImage.height) // create canvas
    const ctx = inputCanvas.getContext('2d')
    ctx.drawImage(inputImage, 0, 0) // draw input image onto canvas

    // run detection
    const buffer = fs.readFileSync(input)
    this.result = await this.detectFromBuffer(buffer)

    // draw detected results onto canvas
    this.human.draw.all(inputCanvas, this.result).then(() => {
      const stream = inputCanvas.createJPEGStream({ quality: 0.75, progressive: true, chromaSubsampling: true })
      callback(stream)
    })
  }

  async detectDrawnOnCanvas (f, callback) {
    log.info('File location:', f)
    if (f.length === 0) {
      log.warn('Parameters: <input image> missing')
      await this.test()
    } else if (!fs.existsSync(f)) {
      log.error(`File not found: ${f}`)
    } else {
      if (fs.existsSync(f)) {
        const stat = fs.statSync(f)
        if (stat.isDirectory()) {
          log.error(`Image return does not work on directories: ${f}`)
        } else {
          log.info('Loading image:', f)
          await this.drawOnCanvas(f, callback)
        }
      } else {
        log.info('Loading image:', f)
        await this.drawOnCanvas(f, callback)
      }
    }
  }
}

module.exports = { HumanCV }
