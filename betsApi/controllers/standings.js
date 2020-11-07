var sql = require('./db.js');
const Standing = require("../models/standings.js"); 

Standing.getAll = function (){
    return new Promise(function(resolve, reject) {
     sql.query("Select * from standing", function (err, res) {
             if(err) {
                 console.log("error: ", err);
                 reject(err);
             }
             else{
               resolve(res);
             }
         });   
     })
 }

module.exports = Standing;