var sql = require('./db.js');
const Fixture = require("../models/fixtures.js");


Fixture.getAllNotStarted = function (){
    return new Promise(function(resolve, reject) {
     sql.query("Select * from fixture where state = 'Not Started' and DATEDIFF(begintime, now()) < 5", function (err, res) {
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

Fixture.getDistinctLeagues = function(){
    return new Promise(function(resolve, reject) {
        sql.query("Select distinct idleague from fixture where state = 'Not Started' and DATEDIFF(begintime, now()) < 5", function (err, res) {
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

Fixture.getAllInfo = function(){
    return new Promise(function(resolve, reject) {
        sql.query("Select l.idleague as idleague, l.name as leaguename, l.logo as leaguelogo, c.idcountry as countrycode, f.idfixture as idfixture, f.begintime as begintime, f.homeTeam as hometeamid, f.awayTeam as awayteamid,f.state as state, f.oddHome as oddhome, f.oddaway as oddaway, f.odddraw as odddraw, c.name as countryname,c.flag as countryflag, t1.name as awayteamname, t2.name as hometeamname, t1.logo as awayteamlogo, t2.logo as hometeamlogo from league l, fixture f, country c, team t1, team t2 where f.state = 'Not Started' and now() < begintime and DATEDIFF(begintime, now()) < 20 and l.idleague = f.idleague and l.idcountry = c.idcountry and f.awayTeam = t1.idteam and f.homeTeam = t2.idteam;", function (err, res) {
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


module.exports= Fixture;