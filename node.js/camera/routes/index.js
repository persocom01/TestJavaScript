var express = require('express')
var router = express.Router()
var fs = require('fs')

var config
try {
  const data = fs.readFileSync('./config/config.json', 'utf8')
  config = JSON.parse(data)
} catch (e) {
  console.log(`error reading config file: ${e}`)
}

var logPrefix = config.log_prefix || '[camera]'

var defaultPaths = {
  get_help: '/',
  get_is_ready: '/ready',
  get_pause_camera: '/pause',
  get_resume_camera: '/resume',
  get_snapshot: '/snapshot',
  get_start_camera: '/start',
  get_start_recording: '/start_rec',
  get_stop_camera: '/stop',
  get_stop_recording: '/stop_rec'
}

if (config.camera_config.enabled) {
  var camera = require('../modules/camera')
  var webcam = new camera.Webcam(config.camera_config, async () => {
    // Insert any code that needs the camera to loaded first here.
    console.log(`${logPrefix}camera initialized`)
  })
}

router.get(config.commands.get_help || defaultPaths.get_help, function (req, res, next) {
  console.log(`${logPrefix}help triggered`)
  try {
    res.json(config.commands)
  } catch (e) {
    res.json(defaultPaths)
  }
})

router.get(config.commands.get_is_ready || defaultPaths.get_is_ready, function (req, res, next) {
  console.log(`${logPrefix}help triggered`)
  const isReady = webcam.isReady()
  res.json({ text: isReady })
})

router.get(config.commands.get_pause_camera || defaultPaths.get_pause_camera, async function (req, res, next) {
  console.log(`${logPrefix}pausing camera`)
  await webcam.pauseCamera()
  res.json({ text: 'camera paused' })
})

router.get(config.commands.get_resume_camera || defaultPaths.get_resume_camera, async function (req, res, next) {
  console.log(`${logPrefix}resuming camera`)
  await webcam.resumeCamera()
  res.json({ text: 'camera resumed' })
})

router.get(config.commands.get_snapshot || defaultPaths.get_snapshot, async function (req, res, next) {
  console.log(`${logPrefix}getting camera snapshot`)
  const buffer = await webcam.snapshot()
  res.write(buffer, 'binary')
  res.end(null, 'binary')
})

router.get(config.commands.get_start_camera || defaultPaths.get_start_camera, async function (req, res, next) {
  console.log(`${logPrefix}starting camera`)
  await webcam.start()
  res.json({ text: 'camera started' })
})

router.get(config.commands.get_start_recording || defaultPaths.get_start_recording, async function (req, res, next) {
  console.log(`${logPrefix}starting recording`)
  if (isNaN(req.query.time)) {
    await webcam.startRecording()
    res.json({ text: 'recording started' })
  } else {
    const ms = req.query.time * 1000
    const timer = ms => new Promise(resolve => setTimeout(resolve, ms))
    await webcam.startRecording()
    await timer(ms)
    const buffer = await webcam.stopRecording()
    res.write(buffer, 'binary')
    res.end(null, 'binary')
    await webcam.stop()
    await webcam.start()
  }
})

router.get(config.commands.get_stop_camera || defaultPaths.get_stop_camera, async function (req, res, next) {
  console.log(`${logPrefix}stopping camera`)
  await webcam.stop()
  res.json({ text: 'camera stopped' })
})

router.get(config.commands.get_stop_recording || defaultPaths.get_stop_recording, async function (req, res, next) {
  console.log(`${logPrefix}stopping recording`)
  if (webcam.isRecording()) {
    const buffer = await webcam.stopRecording()
    res.write(buffer, 'binary')
    res.end(null, 'binary')
    await webcam.stop()
    await webcam.start()
  } else {
    res.json({ text: 'start recording should be triggered first' })
  }
})

module.exports = router
