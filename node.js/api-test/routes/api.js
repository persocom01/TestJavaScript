// Demonstrates how to set up pageless apis in express.
var express = require('express')
var router = express.Router()
var multer = require('multer')

var mod1 = require('../cjsMod')
// We do this because we are importing a class. When using individual functions,
// simply calling them with mod1.functionName() will do.
var m1c = new mod1.Mod1Class()

// Demonstrates how to use an ESM-only module in node.js. ESM-only modules
// cannot be imported using require, and using them typically requires the
// import statement which would cause a SyntaxError when CJS is the default.
// To use ESM in CJS, we will dynamically import the module later.
let fetch

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

// Demonstrates sending json using an async api with the ESM fetch module.
// Apparently apis can send data to themselves.
var url = 'http://localhost:3000/api/json'
var obj = {
  string: 'string data',
  bool: 'no',
  int: 1.5,
  direction: 'n'
}
router.get('/async', async function (req, res, next) {
  console.log('async fetch api')
  fetch = (await import('node-fetch')).default
  const response = await fetch(url, {
    method: 'POST',
    // JSON.stringify(obj) is necessary to send json.
    body: JSON.stringify(obj),
    // Setting the Content-Type header is necessary to send json.
    headers: { 'Content-Type': 'application/json' }
  })
  // response.text() for text response
  const data = await response.json()
  res.json(data)
})

router.post('/json', function (req, res, next) {
  const data = req.body
  res.json(data)
})

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './temp')
  },
  filename: function (req, file, cb) {
    // cb(null, Date.now() + path.extname(file.originalname))
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage })
router.post('/file', upload.single('file'), function (req, res, next) {
  res.json({ text: 'success' })
})

module.exports = router
