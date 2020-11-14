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

Teamstats.getTeamsStats = function (idleague,idteam1,idteam2){
    return new Promise(function(resolve, reject) {
     sql.query("Select * from team_stats where idleague=" + idleague + " and team_idteam=" + idteam1, function (err, res) {
             if(err) {
                 console.log("error: ", err);
                 reject(err);
             }
             else{
                sql.query("Select * from team_stats where idleague=" + idleague + " and team_idteam=" + idteam2, function (err, res1) {
                    if(err) {
                        console.log("error: ", err);
                        reject(err);
                    }
                    else{
                        result = {equipa1:res,equipa2:res1}
                        resolve(result);
                    }
                });   
             }
         });   
     })
 } 



module.exports = Teamstats;