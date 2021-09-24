var express = require('express')
var router = express.Router()
var multer = require('multer')
var mod1 = require('../mod1')

var m1c = new mod1.Mod1Class()
router.get('/', function (req, res, next) {
  var output = m1c.divideQueryByTwo(5)
  res.send(output)
})

router.post('/json', function (req, res, next) {
  res.json({ text: 'text' })
})

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './tmp')
  },
  filename: function (req, file, cb) {
    // cb(null, Date.now() + path.extname(file.originalname))
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage })
router.post('/file', upload.single('file'), function (req, res, next) {
  res.json({ text: 'text' })
})

module.exports = router
