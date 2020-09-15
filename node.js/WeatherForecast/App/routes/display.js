var express = require('express');
var router = express.Router();
var mariadbConnection = require('../connection');
var dotenv = require('dotenv').config();
var moment = require('moment');


router.get('/', function (req, res)  {
    var data = []
    res.render('display', {title: 'Weather Data', data: data}); 
});


router.post("/queryData", function(req, res, next){
  // console.log(req.body.query_dates);
  var date = moment(req.body.query_dates, 'YYYY-MM-DD')
  // console.log(date.year());
  // console.log(date.month());
  // console.log(date.date());
  var sql_query = `SELECT *
                FROM weather 
                WHERE YEAR = ${date.year()} AND MONTH = ${date.month()+1} AND DAY = ${date.date()}`;
  // console.log(sql_query);
  mariadbConnection
  .query(sql_query)
  .then(data => {
   res.render('display', {title: 'Weather Data', data: data}); 
   // console.log(data);
  })
  .catch(err => {
   console.log("Not connected due to error:" + err);
  });
});

module.exports = router;
