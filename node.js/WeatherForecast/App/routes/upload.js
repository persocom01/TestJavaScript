var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer = require('multer');
var csv = require('fast-csv');
var path = require('path');
const validator = require('../validateCsvRow');
const mariadbConnection = require('../connection');
var dotenv = require('dotenv').config();


/* Stores file with extensions into tmp */
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'tmp/');
  },
  // By default, multer removes file extensions so let's add them back
  filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

/* Ensures that only csv files can be uploaded */
var upload = multer({ storage: storage,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if(ext !== '.csv') {
        return callback(new Error('Only csv files are allowed'))
    }
    callback(null, true)
}});

const csv_headers =   [
  'station',
  'year',
  'month',
  'day',
  'daily_rainfall_total_mm',
  'highest_30_min_rainfall_mm',
  'highest_60_min_rainfall_mm',
  'highest_120_min_rainfall_mm',
  'mean_temperature_c',
  'maximum_temperature_c',
  'minimum_temperature_c',
  'mean_wind_speed_kmh',
  'max_wind_speed_kmh'
]


/* Route to upload web page */
router.get('/', function(req, res) {
  res.render("upload", {title: "Upload data beep boop"});
});



/* Take in uploaded csv file to database */
router.post("/uploads", upload.single('userCsv'), function(req, res, next){
  // console.log(req.file,req.body);
  const fileRows = []
  var filepath = req.file.path;
  var options = {
    // objectMode: true,
    headers: csv_headers,
    ignoreEmpty: false,
    renameHeaders: true,
    strictColumnHandling: true,
    // discardUnmappedColumns: true
  };

  var stream = fs.createReadStream(filepath);
  // console.log(stream);
  var parser = csv.parseStream(stream, options)
      // .on('error', error => console.error(error))
      .on("data", function (data) {
            // console.log(data);
            fileRows.push(data); // push each row
          })
      // .on('data-invalid', error => console.log(error))
      .on("end", function () {
        // console.log(fileRows); //contains array of arrays.
        if(fileRows.length > 0){
          // console.log(fileRows);
          fs.unlinkSync(req.file.path); // remove temp file
          const validationError = validator.validateCsvData(fileRows);
            if (validationError) {
              // return res.status(403).json({ error: validationError });
              // console.log({ message: "Error" })
              res.render('upload_status', {uploaded: 'Failed_1', reason: validationError});
            }
            else {
              for (let i = 0; i < fileRows.length; i++) {
                mariadbConnection
                .query("REPLACE INTO weather VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
                [fileRows[i].station,fileRows[i].year,fileRows[i].month,fileRows[i].day,
                fileRows[i].daily_rainfall_total_mm,fileRows[i].highest_30_min_rainfall_mm,fileRows[i].highest_60_min_rainfall_mm,fileRows[i].highest_120_min_rainfall_mm,
                fileRows[i].mean_temperature_c,fileRows[i].maximum_temperature_c,fileRows[i].minimum_temperature_c,
                fileRows[i].mean_wind_speed_kmh,fileRows[i].max_wind_speed_kmh])
                .then(
                  // console.log({ message: "Csv Uploaded Successfully" })
                  // res.render('upload_status', {uploaded: 'Successful', reason: 'Yay!'})
                // console.log(data);
                )
                .catch( err => {
                console.log("Not connected due to error:" + err);  
                // res.render('upload_status', {uploaded: 'Failed_2', reason: err});      
                });
              } 
              res.render('upload_status', {uploaded: 'Successful', reason: 'Yay!'});
            }
        }
        else{
          fs.unlinkSync(req.file.path);
          // return res.json({ message: "Error with columns" });
          res.render('upload_status', {uploaded: 'Failed_3', reason: "Error with columns"});
        }
        
      })
});

module.exports = router;
