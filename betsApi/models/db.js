var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'bettingspree',
  password: 'PEI2020',
  database: 'betsbettingspree'
})


connection.connect(function(err) {
    if (err) throw err;
    console.log("Database Connected!");
  });



module.exports = connection;