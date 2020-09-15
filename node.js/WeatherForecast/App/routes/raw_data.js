var express = require('express');
var router = express.Router();
var mariadbConnection = require('../connection');
var dotenv = require('dotenv').config();

var sql_query = `SELECT * 
                FROM weather 
                WHERE station = 'Pasir Panjang'`;
                
router.get('/', function (req, res)  {
  mariadbConnection
   .query(sql_query)
   .then(data => {
    res.render('upload', {title: 'Weather Data', data: data}); 
    // console.log(data);
   })
   .catch(err => {
    console.log("Not connected due to error:" + err);
   });

});


module.exports = router;
