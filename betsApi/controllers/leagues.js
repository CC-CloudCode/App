var sql = require('./db.js');
const League = require("../models/leagues.js"); 

League.getAll = function (){
    return new Promise(function(resolve, reject) {
     sql.query("Select * from league", function (err, res) {
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

module.exports = League;
