var express = require('express')
var router = express.Router()
var fs = require('fs')
var multer = require('multer')
var humanSnap = require('../modules/human/human-snapshot')
var humanCanvas = require('../modules/human/human-canvas')
var streaming = require('../modules/streaming')
var humanCV = require('../modules/human/human-cv')
var fetch

var config
try {
  const data = fs.readFileSync('./config/config.json', 'utf8')
  config = JSON.parse(data)
} catch (e) {
  console.log(`error reading config file: ${err}`)
}

var logPrefix = config.log_prefix || '[human-cv]'

var defaultPaths = {
  get_detection: '/detect',
  get_help: '/',
  get_snapshot: '/snapshot',
  get_start_stream: '/start_stream',
  get_stop_stream: '/stop_stream',
  post_detect_from_file: '/from_file'
}

var hcv = new humanCV.HumanCV(config.human_params, config.camera)
if (config.camera.enabled && config.camera.streaming) {
  hcv.startStream()
}

router.get(config.get_help || defaultPaths.get_help, function (req, res, next) {
  console.log(`${logPrefix}help triggered`)
  try {
    res.json(config.commands)
  } catch (e) {
    res.json(defaultPaths)
  }
})

router.get(config.get_detection || defaultPaths.get_detection, function (req, res, next) {
  console.log(`${logPrefix}getting detection`)
  const output = hcv.result
  res.json(output)
})

router.get(config.get_start_stream || defaultPaths.get_start_stream, async function (req, res, next) {
  if (!hcv.isStreaming) {
    console.log(`${logPrefix}starting stream...`)
    await hcv.startStream()
    res.send('stream started')
  }
  const output = hcv.result
  res.json(output)
})

router.get(config.get_stop_stream || defaultPaths.get_stop_stream, async function (req, res, next) {
  console.log(`${logPrefix}stopping stream...`)
  hcv.isStreaming = false
  res.send('stream stopped')
})

// router.get('/stream_test', async function (req, res, next) {
//   // stream.connect()
//   const data = stream.getFrame()
//   fs.writeFile('./temp/streamfile.jpg', data, err => {
//     if (err) {
//       console.log(err)
//     } else {
//       console.log('File written successfully')
//     }
//   })
//   var output = await humanBuffer.main(data)
//   res.json(output)
// })

router.get(config.get_snapshot || defaultPaths.get_snapshot, async function (req, res, next) {
  console.log(`${logPrefix}getting snapshot detection`)
  fetch = (await import('node-fetch')).default
  const response = await fetch(`${config.camera.url}`)
  const data = await response.json()
  const buffer = Buffer.from(data.snapshot, 'base64')
  const output = await hcv.detectFromBuffer(buffer)
  res.json(output)
})

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './temp')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '.jpg')
  }
})
var upload = multer({ storage: storage })
router.post('/canvas', upload.single('file'), async function (req, res, next) {
  // var output = await humanCanvas.main('./temp/file.jpg', './temp/outfile.jpg')
  var output = await humanCanvas.main(req.file.path, './temp/outfile.jpg')
  res.json(output)
})
var storageBuffer = multer.memoryStorage()
var uploadBuffer = multer({ storage: storageBuffer })
router.post('/canvas2', uploadBuffer.single('file'), async function (req, res, next) {
  // var output = await humanCanvas.main('./temp/file.jpg', './temp/outfile.jpg')
  var output = await humanCanvas.main(req.file.buffer, './temp/outfile.jpg')
  res.json(output)
})
router.post('/from_file', uploadBuffer.single('file'), async function (req, res, next) {
  console.log(`${logPrefix}getting detection from file`)
  const output = await hcv.detectFromBuffer(req.file.buffer)
  res.json(output)
})

module.exports = router
