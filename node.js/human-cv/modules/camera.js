const cc = require('camera-capture')

class Webcam {
  constructor (config, logPrefix = '[camera]', callback = null) {
    this.config = config
    this.camera = new cc.VideoCapture(this.config)
    this.startup = this.init(callback)
    this.logPrefix = logPrefix
  }

  async init (callback = null) {
    await this.camera.initialize().then(() => {
      return callback
    })
    console.log(`${this.logPrefix}initializing camera`)
  }

  async snapshot () {
    const frame = await this.camera.readFrame()
    console.log(`${this.logPrefix}taking snapshot`)
    return frame.data
  }

  async startRecording () {
    await this.camera.startRecording()
    console.log(`${this.logPrefix}starting video recording`)
  }

  async stopRecording () {
    const video = await this.camera.stopRecording()
    console.log(`${this.logPrefix}stopping video recording`)
    return video
  }

  async pauseCamera () {
    await this.camera.pause()
    console.log(`${this.logPrefix}pausing camera`)
  }

  async resumeCamera () {
    await this.camera.resume()
    console.log(`${this.logPrefix}resuming camera`)
  }

  stopCamera () {
    console.log(`${this.logPrefix}stopping camera`)
    return this.camera.stop()
  }

  startCamera () {
    console.log(`${this.logPrefix}starting camera`)
    return this.init()
  }

  isReady () {
    return this.camera.isStopped()
  }
}

module.exports = { Webcam }
