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
} catch (err) {
  console.log(`[human-cv]error reading config file: ${err}`)
}

var hcv = new humanCV.HumanCV(config.human_params, config.camera)
if (config.camera.enabled && config.camera.streaming) {
  hcv.startStream()
}

router.get('/', function (req, res, next) {
  console.log('[human-cv]help triggered')
  res.json(config.help)
})

router.get('/detect', function (req, res, next) {
  console.log('[human-cv]getting detection')
  const output = hcv.result
  res.json(output)
})

router.get('/start_stream', async function (req, res, next) {
  if (!hcv.isStreaming) {
    console.log('[human-cv]starting stream...')
    await hcv.startStream()
    res.send('stream started')
  }
  const output = hcv.result
  res.json(output)
})

router.get('/stop_stream', async function (req, res, next) {
  console.log('[human-cv]stopping stream...')
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

router.get('/snapshot', async function (req, res, next) {
  console.log('[human-cv]getting snapshot detection')
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
  console.log('[human-cv]getting detection from file')
  const output = await hcv.detectFromBuffer(req.file.buffer)
  res.json(output)
})

module.exports = router
