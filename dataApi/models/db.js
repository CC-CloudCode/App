var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'bettingspree',
  password: 'PEI2020',
  database: 'databettingspree',
  dateStrings: ['DATE','DATETIME']
})


connection.connect(function(err) {
    if (err) throw err;
    console.log("Database Connected!");
  });



module.exports = connection;