var mysql = require('mysql')
var db_config = {
  host: 'localhost',
  user: 'bettingspree',
  password: 'PEI2020',
  database: 'betsbettingspree',
  insecureAuth : true
}


var connection =  mysql.createPool(db_config)

module.exports = connection;