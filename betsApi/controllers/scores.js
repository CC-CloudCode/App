var sql = require('./db.js');
const Score = require("../models/scores.js"); 

Score.getAll = function (){
    return new Promise(function(resolve, reject) {
     sql.query("Select * from score", function (err, res) {
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

module.exports = Score;
