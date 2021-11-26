const cc = require('camera-capture')

class Webcam {
  constructor (config, callback = () => {}) {
    this.config = config
    this.camera = new cc.VideoCapture(this.config.options)
    if (this.config.initialize) this.startup = this.init(callback)
  }

  async init (callback = () => {}) {
    await this.start()
    callback()
  }

  isReady () {
    return this.camera.isStopped()
  }

  isRecording () {
    return this.camera.isRecording()
  }

  pauseCamera () {
    return this.camera.pause()
  }

  resumeCamera () {
    return this.camera.resume()
  }

  async snapshot () {
    if (!this.isReady()) await this.start()
    const frame = await this.camera.readFrame()
    return frame.data
  }

  async start () {
    await this.camera.initialize()
  }

  startCamera () {
    return this.camera.startCamera()
  }

  async startRecording () {
    if (!this.isReady()) await this.start()
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
