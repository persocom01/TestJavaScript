var express = require('express')
var router = express.Router()
var fs = require('fs')
var multer = require('multer')
var humanCV = require('../modules/human/human-cv')
var fetch

var config
try {
  const data = fs.readFileSync('./config/config.json', 'utf8')
  config = JSON.parse(data)
} catch (e) {
  console.log(`error reading config file: ${e}`)
}

var logPrefix = config.log_prefix || '[human-cv]'

var defaultPaths = {
  get_current_detection: '/detect',
  get_help: '/',
  get_snapshot: '/snapshot',
  get_start_active_detection: '/start_detect',
  get_stop_active_detection: '/stop_detect',
  post_detect_from_image_file: '/file',
  post_image_with_detection_from_image_file: '/image'
}

var hcv
// initialize human-cv with local camera
if (config.active_detection.use_local_camera) {
  var camera = require('../modules/camera')
  // callback is used to start human-cv only after camera is running.
  var webcam = new camera.Webcam(config.camera, () => {
    if (config.camera.initialize) console.log(`${logPrefix}camera initialized`)
    // set image source as webcam
    config.active_detection._imageBufferFunction = () => webcam.snapshot()
    hcv = new humanCV.HumanCV(config.human_params, config.active_detection)
  })
// initialize human-cv without local camera
} else {
  // set image source as external url
  config.active_detection._imageBufferFunction = async () => {
    fetch = (await import('node-fetch')).default
    const response = await fetch(`${config.active_detection.snapshot_url}`)
    return response.buffer()
  }
  hcv = new humanCV.HumanCV(config.human_params, config.active_detection)
}

router.get(config.commands.get_current_detection || defaultPaths.get_current_detection, function (req, res, next) {
  console.log(`${logPrefix}getting detection`)
  if (config.camera.active_detection) {
    const output = hcv.result
    res.json(output)
  } else {
    req.url = config.commands.get_snapshot || defaultPaths.get_snapshot
    req.method = 'GET'
    router.handle(req, res, next)
  }
})

router.get(config.commands.get_help || defaultPaths.get_help, function (req, res, next) {
  console.log(`${logPrefix}get help`)
  try {
    res.json(config.commands)
  } catch (e) {
    res.json(defaultPaths)
  }
})

router.get(config.commands.get_snapshot || defaultPaths.get_snapshot, async function (req, res, next) {
  console.log(`${logPrefix}getting snapshot detection`)
  if (config.active_detection.use_local_camera) {
    const buffer = await webcam.snapshot()
    const output = await hcv.detectFromBuffer(buffer)
    res.json(output)
  } else {
    fetch = (await import('node-fetch')).default
    const response = await fetch(`${config.active_detection.snapshot_url}`)
    const buffer = await response.buffer()
    const output = await hcv.detectFromBuffer(buffer)
    res.json(output)
  }
})

router.get(config.commands.get_start_active_detection || defaultPaths.get_start_active_detection, async function (req, res, next) {
  console.log(`${logPrefix}starting active detection...`)
  if (!hcv.isActive && !isNaN(req.query.interval)) {
    hcv.startActiveDetection(req.query.interval)
    res.json({ text: 'active detection started' })
  } else if (!hcv.isActive) {
    hcv.startActiveDetection()
    res.json({ text: 'active detection started' })
  } else if (!isNaN(req.query.interval)) {
    hcv.interval = req.query.interval * 1000
    res.json({ text: 'active detection interval changed' })
  } else {
    res.json({ text: 'active detection already active' })
  }
})

router.get(config.commands.get_stop_active_detection || defaultPaths.get_stop_active_detection, async function (req, res, next) {
  console.log(`${logPrefix}stopping active detection...`)
  if (hcv.isActive) {
    hcv.isActive = false
    res.json({ text: 'active detection stopped' })
  } else {
    hcv.isActive = false
    res.json({ text: 'active detection was not running' })
  }
})

var storageBuffer = multer.memoryStorage()
var uploadBuffer = multer({ storage: storageBuffer })
router.post(config.commands.post_detect_from_image_file || defaultPaths.post_detect_from_image_file, uploadBuffer.single('file'), async function (req, res, next) {
  console.log(`${logPrefix}getting detection from file`)
  const output = await hcv.detectFromBuffer(req.file.buffer)
  res.json(output)
})

var uploadTemp = multer({ dest: './temp/' })
var clearTemp = filePath => fs.unlink(filePath, function (e) {
  if (e) throw e
  console.log(`${logPrefix}temp file deleted`)
})
router.post(config.commands.post_image_with_detection_from_image_file || defaultPaths.post_image_with_detection_from_image_file, uploadTemp.single('file'), async function (req, res, next) {
  hcv.detectDrawnOnCanvas(req.file.path, (stream) => {
    stream.on('data', chunk => res.write(chunk, 'binary'))
    stream.on('end', () => res.end(null, 'binary'))
    clearTemp(req.file.path)
  })
})

module.exports = router
