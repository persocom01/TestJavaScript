// Demonstrates how to set up pageless apis in express.
var express = require('express')
var router = express.Router()
var fs = require('fs')
var multer = require('multer')
var imgTest = require('../modules/image-test')
var path = require('path')

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
  get_divide_query_by_two: '/:num([+-]?([0-9]+\.?[0-9]{0,}))',
  get_help: '/',
  get_trigger_own_api: '/trigger:query?',
  post_buffer: '/buffer',
  post_file: '/file',
  post_json: '/json',
  post_temp: '/temp'
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
  console.log(`${logPrefix}get decimal number regex with params ${req.params}`)
  // Route params are different from url params, which come in the from:
  // /routeParam?key1=value1&key2=value2
  // to access these values, use req.query.keyName instead.
  var output = m1c.divideQueryByTwo(req.params.query).toString()
  res.send(output)
})

// Demonstrates sending json using an async api with the ESM fetch module.
// Apparently apis can send data to themselves.
var obj = {
  string: 'string data',
  bool: 'no',
  int: 1.5,
  direction: 'n'
}
router.get(config.commands.get_async || defaultPaths.get_async, async function (req, res, next) {
  console.log(`${logPrefix}get async fetch ap`)
  fetch = (await import('node-fetch')).default
  const url = `http://localhost:${process.env.PORT || config.port || 3000}${config.commands.post_json || defaultPaths.post_json}`
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
router.post(config.commands.post_file || defaultPaths.post_file, upload.single('file'), function (req, res, next) {
  console.log(`${logPrefix}post upload file`)
  console.log(req.file)
  // Buffers do not have req.file.path
  fs.readFile(req.file.path, 'utf8', function (e, data) {
    if (e) throw e
    // We put res inside fs.readfile() here because it is an async function.
    // fs.readFileSync() is the sync version.
    // We use trim here to remove /r/n from the string.
    res.json({ filename: req.file.originalname, data: data.toString().trim() })
  })
})

// Demonstrates how to save temp files to the buffer instead of disk. This
// method is slightly faster. However, because blob implementation is still new
// in node.js, there is no easy method of getting the file path to pass to
// other functions.
var storageBuffer = multer.memoryStorage()
var uploadBuffer = multer({ storage: storageBuffer })
router.post(config.commands.post_buffer || defaultPaths.post_buffer, uploadBuffer.single('file'), function (req, res, next) {
  console.log(`${logPrefix}post upload file to buffer`)
  console.log(req.file)

  // This is how using the blob object should look like if it were implemented.
  // const blob = new Blob([req.file.buffer], { type: 'image/jpeg' })
  // const url = URL.createObjectURL(blob)
  res.json({ filename: req.file.originalname, data: req.file.buffer.toString().trim() })
})

// Demonstrates how to create and delete temp files using multer. This api
// accepts a normal file, or an image file if ?type=image is set as url param.
// It then returns the file in two different ways, from buffer for the image
// and from file for the normal file, and deletes the temp file afterwards.
// On testing, there was no noticable speed difference over multer diskStorage.
// For temp files, the dest property is sufficient instead of a storage object.
var uploadTemp = multer({ dest: './temp/' })
// fs.unlink(path, errorHandler) is used to delete the temp file after use.
var clearTemp = filePath => fs.unlink(filePath, function (e) {
  if (e) throw e
  console.log(`${logPrefix}temp file deleted`)
})
// Instead of passing the absolute path to res.sendFile(), one can use the
// options root key to append the directory to every relative file path.
var sendFileOptions = { root: path.resolve() }
router.post(config.commands.post_temp || defaultPaths.post_temp, uploadTemp.single('file'), async function (req, res, next) {
  console.log(`${logPrefix}post upload temp file`)
  console.log(req.file)
  try {
    if (req.query.type === 'img' || req.query.type === 'image') {
      // Demonstrates how to send image buffers.
      const buffer = await imgTest.processImage(req.file.path)
      res.write(buffer, 'binary')
      res.end(null, 'binary')
      // Delete the temp file.
      clearTemp(req.file.path)
    } else {
      // Demonstrates how to send a file.
      // res.sendFile() requires absolute path, which you can get using
      // path.resolve(file) or path.join(__dirname, file).
      // The difference is that __dir returns the directory of this file
      // while path.resolve() returns the directory of the app.js file.
      console.log('path.join():', path.join(__dirname))
      console.log('path.resolve():', path.resolve())
      res.sendFile(req.file.path, sendFileOptions, e => {
        if (e) throw e
        // res.sendFile is async, so to delete the temp file after the file is
        // sent, the delete function has to be located in its callback.
        clearTemp(req.file.path)
      })
    }
  } catch (e) {
    clearTemp(req.file.path)
  }
})

module.exports = router
