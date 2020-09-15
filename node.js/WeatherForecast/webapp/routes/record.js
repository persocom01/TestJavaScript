var express = require('express')
var router = express.Router()
var fs = require('fs')
var mariadb = require('mariadb')
var currentDate

var config
var pool
var configPath = '../sql_server.cfg'
fs.readFile(configPath, function (err, data) {
  if (err) return console.error(err)
  config = JSON.parse(data)
  pool = mariadb.createPool({
    user: config.user,
    password: config.pw,
    host: config.url,
    database: config.db,
    connectionLimit: 10,
    port: 3306
  })
})

router.get('/', function (req, res, next) {
  currentDate = new Date()
  const twoDigitMonth = ('0' + (currentDate.getMonth() + 1)).slice(-2)
  currentDate = currentDate.getFullYear() + '-' + twoDigitMonth
  res.render('record', { title: 'View Records', maxMonth: currentDate, data: -1 })
})

router.post('/', function (req, res, next) {
  const inputDate = req.body.inputMonth
  const year = inputDate.slice(0, 4)
  const month = inputDate.slice(-2)
  const command = `SELECT *
    FROM ${config.tablename}
    WHERE year=${year} AND month=${month}`
  pool.query(command).then(rows => {
    res.render('record', { title: 'View Records', maxMonth: currentDate, data: rows })
  }).catch(err => console.error(err))
})

module.exports = router
