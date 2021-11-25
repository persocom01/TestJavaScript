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

if (config.camera.enabled) {
  var camera = require('../modules/camera')
  var webcam = new camera.Webcam(config.camera, () => {
    console.log(`${logPrefix}camera initialized`)
    var hcv = new humanCV.HumanCV(config.human_params, config.active_detection)
    if (config.active_detection.enabled) hcv.startActiveDetection()
  })
}

if (config.local_camera.enabled) {
  var camera = require('../modules/camera')
  var webcam = new camera.Webcam(config.local_camera.options, logPrefix)
}


router.get('/camera', async function (req, res, next) {
  console.log(`${logPrefix}camera triggered`)
  // camera.snapshot((buffer) => {
  //   res.write(buffer, 'binary')
  //   res.end(null, 'binary')
  // })
  const buffer = await webcam.snapshot()
  // console.log(buffer)
  // res.send('test')
  res.write(buffer, 'binary')
  res.end(null, 'binary')
})

router.get(config.commands.get_help || defaultPaths.get_help, function (req, res, next) {
  console.log(`${logPrefix}help triggered`)
  try {
    res.json(config.commands)
  } catch (e) {
    res.json(defaultPaths)
  }
})

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

router.get(config.commands.get_start_active_detection || defaultPaths.get_start_active_detection, async function (req, res, next) {
  if (!hcv.isActive) {
    console.log(`${logPrefix}starting active detection...`)
    hcv.startActiveDetection()
    res.json({ text: 'active detection started' })
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

router.get(config.commands.get_snapshot || defaultPaths.get_snapshot, async function (req, res, next) {
  console.log(`${logPrefix}getting snapshot detection`)
  fetch = (await import('node-fetch')).default
  const response = await fetch(`${config.camera.url}`)
  const data = await response.json()
  const buffer = Buffer.from(data.snapshot, 'base64')
  const output = await hcv.detectFromBuffer(buffer)
  res.json(output)
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
