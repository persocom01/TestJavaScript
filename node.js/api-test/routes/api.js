// Demonstrates how to set up pageless apis in express.
var express = require('express')
var router = express.Router()
var multer = require('multer')

var mod1 = require('../cjsMod')
// We do this because we are importing a class. When using individual functions,
// simply calling them with mod1.functionName() will do.
var m1c = new mod1.Mod1Class()

// The routes are are in addition to those defined in app.js. For example
// '/json' defined here plus app.use('/api', apiRouter) in app.js makes the
// final route 'domain/api/json'.
// Regex can be used to defined valid routes. To use pure regex, one may use
// literals like /\d+/
// One can also define route parameters using : such as '/:paramName'. Params
// are retrieved using req.params.paramName. Only letters and numbers
// (including _) can be params, so - and . can be used as param separators.
// However, using regex in route parameters allows - and . in params. To use
// regex in route parameters, put the regex in brackets, such as
// '/:paramName(regex)'. regex when used in params may have strange rules due to
// the limitations of the parsing engine. For instance, * needs to be replaced
// with {0,}, until express 5. More on routing found here:
// https://expressjs.com/en/guide/routing.html
router.get('/:query([+-]?([0-9]+\.?[0-9]{0,}))', function (req, res, next) {
  console.log('route with decimal number regex')
  var output = m1c.divideQueryByTwo(req.params.query).toString()
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

router.post('/async', upload.single('file'), async function (req, res, next) {
  res.json({ text: 'text' })
})

module.exports = router
