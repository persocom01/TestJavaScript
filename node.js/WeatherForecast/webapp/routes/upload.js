var express = require('express')
var router = express.Router()
var multer = require('multer')
var { spawn } = require('child_process')
var axios = require('axios')
var pythonData

async function getApiData (options, res) {
  try {
    const apiRes = await axios(options)
    return apiRes.data
  } catch (err) {
    res.send(err)
  }
}

router.get('/', function (req, res, next) {
  res.render('upload', { title: 'Upload Data', status_color: 'color:black;', status_text: '_' })
})

// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './tmp')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '.csv')
  }
})

var upload = multer({ storage: storage })

router.post('/', upload.single('csv_file'), function (req, res, next) {
  const file = req.file
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
  // use spawn('python3', ['./upload_data.py']) on ubuntu.
  const python = spawn('python', ['./upload_data.py'])
  python.stdout.on('data', function (data) { pythonData = data.toString() })
  python.on('close', code => res.render('upload', { title: 'Upload Data', status_color: 'color:white;', status_text: pythonData }))
})

router.post('/retrain', function (req, res, next) {
  const options = {
    url: 'http://127.0.0.1:5000/retrain',
    method: 'get'
  }

  getApiData(options, res).then(data => res.status(204).send())
})

module.exports = router
