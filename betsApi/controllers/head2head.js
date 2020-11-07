var sql = require('./db.js');
const Head2Head = require("../models/head2head.js"); 

Head2Head.getAll = function (){
    return new Promise(function(resolve, reject) {
     sql.query("Select * from h2h", function (err, res) {
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

Head2Head.getFixture = function (idFixture){
    return new Promise(function(resolve, reject) {
     sql.query("Select * from h2h where idfixture = " + idFixture + " order by date DESC limit 5", function (err, res) {
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

module.exports = Head2Head;
