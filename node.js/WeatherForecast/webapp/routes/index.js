var express = require('express')
var router = express.Router()
var axios = require('axios')
var predictionImageMap = { 0: './images/shine.jpg', 1: './images/rain.jpg', 99: './images/loading.gif' }

async function getApiData (options, res) {
  try {
    const apiRes = await axios(options)
    return apiRes.data
  } catch (err) {
    return { prediction: 99 }
  }
}

/* GET home page. */
router.get('/', function (req, res, next) {
  const options = {
    url: 'http://127.0.0.1:5000/predict',
    method: 'get',
    timeout: 1000
  }
  getApiData(options, res).then(data => {
    res.render('index', { title: 'Weather Forecast App', image: predictionImageMap[data.prediction], probability: data.probability })
  })
})

router.post('/', function (req, res, next) {
  const options = {
    url: 'http://127.0.0.1:5000/refresh',
    method: 'get'
  }
  getApiData(options, res).then(data => {
    res.render('index', { title: 'Weather Forecast App', image: predictionImageMap[data.prediction], probability: data.probability })
  })
})

module.exports = router
