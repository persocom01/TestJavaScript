const cc = require('camera-capture')
const fs = require('fs')
const options = {
  mime: 'image/jepg'
}
const camera = new cc.VideoCapture(options)

async function snapshot () {
  await camera.initialize()
  const frame = await camera.readFrame()
  return frame.data
}

module.exports = { snapshot }
