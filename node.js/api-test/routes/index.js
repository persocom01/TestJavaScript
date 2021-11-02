// Demonstrates how to set up pageless apis in express.
var express = require('express')
var router = express.Router()
var fs = require('fs')
var multer = require('multer')

var mod1 = require('../cjsMod')
// We do this because we are importing a class. When using individual functions,
// simply calling them with mod1.functionName() will do.
var m1c = new mod1.Mod1Class()

// Demonstrates how to use an ESM-only module in node.js. ESM-only modules
// cannot be imported using require, and using them typically requires the
// import statement which would cause a SyntaxError when CJS is the default.
// To use ESM in CJS, we will dynamically import the module later.
var fetch

var config
try {
  const data = fs.readFileSync('./config/config.json', 'utf8')
  config = JSON.parse(data)
} catch (e) {
  console.log(`error reading config file: ${e}`)
}

var logPrefix = config.log_prefix || '[api-test]'

var defaultPaths = {
  get_async: '/async',
  // Due to strange rules when strings are processed, you need to escape . here
  // with \. In json, pass the string without the escape.
  get_divide_query_by_two: '/:query([+-]?([0-9]+\.?[0-9]{0,}))',
  get_help: '/',
  get_trigger_own_api: '/trigger:query?',
  post_buffer: '/buffer',
  post_file: '/file',
  post_json: '/json'
}

// The routes are are in addition to those defined in app.js. For example
// '/json' defined here plus app.use('/api', apiRouter) in app.js makes the
// final route 'domain/api/json'.
router.get(config.commands.get_help || defaultPaths.get_help, function (req, res, next) {
// router.get('/', function (req, res, next) {
  console.log(`${logPrefix}get help`)
  try {
    res.json(config.commands)
  } catch (e) {
    res.json(defaultPaths)
  }
})

// Regex can be used to defined valid routes. To use pure regex, one may use
// literals like /\d+/
// One can also define route parameters using : such as '/:paramName'. Params
// are retrieved using req.params.paramName. To make a parameter optional, add ?
// to the end. Only letters and numbers (including _) can be params, so - and .
// can be used as param separators. However, using regex in route parameters
// allows - and . in params. To use regex in route parameters, put the regex in
// brackets, such as '/:paramName(regex)'. regex when used in params may have
// strange rules due to the limitations of the parsing engine. For instance, *
// needs to be replaced with {0,}, until express 5. More on routing found here:
// https://expressjs.com/en/guide/routing.html
router.get(config.commands.get_divide_query_by_two || defaultPaths.get_divide_query_by_two, function (req, res, next) {
// router.get('/:query([+-]?([0-9]+\.?[0-9]{0,}))', function (req, res, next) {
  console.log(`${logPrefix}get decimal number regex with query ${req.params.query}`)
  var output = m1c.divideQueryByTwo(req.params.query).toString()
  res.send(output)
})

// Demonstrates sending json using an async api with the ESM fetch module.
// Apparently apis can send data to themselves.
var url = `http://localhost:${process.env.PORT || config.port || 3000}${config.commands.post_json || defaultPaths.post_json}`
var obj = {
  string: 'string data',
  bool: 'no',
  int: 1.5,
  direction: 'n'
}
router.get(config.commands.get_async || defaultPaths.get_async, async function (req, res, next) {
  console.log(`${logPrefix}get async fetch ap`)
  fetch = (await import('node-fetch')).default
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(obj),
    // Setting the Content-Type header is necessary to send json.
    headers: { 'Content-Type': 'application/json' }
  })
  // response.text() for text response
  const data = await response.json()
  // The output can be modified as normal.
  data.api = 'async'
  res.json(data)
})

// Demonstrates how to trigger your own apis without fetch. However, this
// approach does not allow the response to be modified, which makes it less
// versatile. One known use of this method is to create if or switch apis.
router.get(config.commands.get_trigger_own_api || defaultPaths.get_trigger_own_api, function (req, res, next) {
  console.log(`${logPrefix}get to trigger another api`)
  if (req.params.query === undefined) {
    req.url = config.commands.post_json || defaultPaths.post_json
    req.method = 'POST'
    // GET req do not need headers or body.
    req.headers = { 'Content-Type': 'application/json' }
    req.body = JSON.stringify(obj)
    router.handle(req, res, next)
  } else {
    req.url = `/${req.params.query}`
    req.method = 'GET'
    router.handle(req, res, next)
  }
})

router.post(config.commands.post_json || defaultPaths.post_json, function (req, res, next) {
  console.log(`${logPrefix}post json with body ${req.body}`)
  res.json(req.body)
})

// Demonstrates how to save file to disk in node.js
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
//
router.post(config.commands.post_file || defaultPaths.post_file, upload.single('file'), function (req, res, next) {
  console.log(`${logPrefix}post upload file`)
  console.log(req.file)
  // Buffers do not have req.file.path
  fs.readFile(req.file.path, 'utf8', function (err, data) {
    if (err) throw err
    // We put res inside fs.readfile() here because it is an async function.
    // fs.readFileSync() is the sync version.
    // We use trim here to remove /r/n from the string.
    res.json({ filename: req.file.originalname, data: data.toString().trim() })
  })
})

// Demonstrates how to save temp files to the buffer instead of disk. This
// method is slightly faster.
var storageBuffer = multer.memoryStorage()
var uploadBuffer = multer({ storage: storageBuffer })
router.post(config.commands.post_buffer || defaultPaths.post_buffer, uploadBuffer.single('file'), function (req, res, next) {
  console.log(`${logPrefix}post upload file to buffer`)
  console.log(req.file)
  res.json({ filename: req.file.originalname, data: req.file.buffer.toString().trim() })
})

module.exports = router
