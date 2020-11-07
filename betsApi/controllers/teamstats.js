var sql = require('./db.js');
const Teamstats = require("../models/teamstats.js"); 

Teamstats.getAll = function (){
    return new Promise(function(resolve, reject) {
     sql.query("Select * from team_stats", function (err, res) {
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

module.exports = Teamstats;