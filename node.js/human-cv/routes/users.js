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

var logPrefix = config.log_prefix || '[human-cv]'

if (config.local_camera.enabled) {
  var camera = require('../modules/camera')
  var webcam = new camera.Webcam(config.local_camera.options, logPrefix)
}

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource')
})

module.exports = router
