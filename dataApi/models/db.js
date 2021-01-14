var mysql = require('mysql')
var db_config = {
  host: 'localhost',
  user: 'bettingspree',
  password: 'PEI2020',
  database: 'databettingspree',
  dateStrings: ['DATE','DATETIME']
}


var connection = mysql.createPool(db_config)


module.exports = connection;