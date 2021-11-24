const cc = require('camera-capture')

class Webcam {
  constructor (config, callback = () => {}) {
    this.config = config
    this.camera = new cc.VideoCapture(this.config.options)
    if (this.config.initialize) this.startup = this.init(callback)
  }

  async init (callback = () => {}) {
    await this.camera.initialize()
    callback()
  }

  isReady () {
    return this.camera.isStopped()
  }

  isRecording () {
    return this.camera.isRecording()
  }

  async pauseCamera () {
    return this.camera.pause()
  }

  async resumeCamera () {
    return this.camera.resume()
  }

  async snapshot () {
    const frame = await this.camera.readFrame()
    return frame.data
  }

  start () {
    return this.init()
  }

  startCamera () {
    return this.camera.startCamera()
  }

  async startRecording () {
    return this.camera.startRecording()
  }

  stop () {
    return this.camera.stop()
  }

  stopCamera () {
    return this.camera.startCamera()
  }

  async stopRecording () {
    const data = await this.camera.stopRecording()
    const buffer = Buffer.from(data)
    return buffer
  }
}

module.exports = { Webcam }
