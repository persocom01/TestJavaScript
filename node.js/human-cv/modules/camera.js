const log = require('@vladmandic/pilogger')
const nodeWebCam = require('node-webcam')
const tempFile = 'webcam-snap'
const optionsCamera = {
  callbackReturn: 'buffer',
  saveShots: false
}
const camera = nodeWebCam.create(optionsCamera)

camera.list((list) => {
  log.data('detected camera:', list)
})

async function snapshot (callback) {
  camera.capture(tempFile, (err, buffer) => { // gets the (default) jpeg data from from webcam
    if (err) {
      log.error('error capturing webcam:', err)
    } else {
      callback(buffer)
    }
  })
}

module.exports = { snapshot }
