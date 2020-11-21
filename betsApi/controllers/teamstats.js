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


Teamstats.getStandingByLeague = function (leagueid){
return new Promise(function(resolve, reject) {
    sql.query("select ts.*, t.name as teamname, t.logo as teamlogo , l.name as leaguename, l.logo as leaguelogo from team_stats ts, team t, league l where ts.idleague="+leagueid+" and ts.idteam = t.idteam and ts.idleague = l.idleague", function (err, res) {
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