var mariadb = require('mariadb');
var dotenv = require('dotenv').config();

// create a new connection 
var mariadbConnection = mariadb.createPool({
    host: process.env.DB_HOST, 
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectionLimit: 10,
    port:process.env.DB_PORT
  });

module.exports = mariadbConnection;