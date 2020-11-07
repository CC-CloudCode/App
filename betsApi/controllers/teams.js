var sql = require('./db.js');
const Team = require("../models/teams.js"); 

Team.getAll = function (){
    return new Promise(function(resolve, reject) {
     sql.query("Select * from team", function (err, res) {
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

module.exports = Team;