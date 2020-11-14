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

 Standing.getLeagueStanding = function (idleague){
    return new Promise(function(resolve, reject) {
     sql.query("select s.idstanding as idstanding, s.position as position, s.idteam as idteam, t.name as teamname, t.logo as teamlogo, l.name as leaguename, l.logo as leaguelogo from standing s, team t, league l where s.idleague=" +idleague+ " and s.idteam = t.idteam and s.idleague = l.idleague order by position", function (err, res) {
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