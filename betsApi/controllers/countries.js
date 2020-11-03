var sql = require('./db.js');
const Country = require("../models/countries.js");


Country.getAll = function (){
    return new Promise(function(resolve, reject) {
     sql.query("Select * from country", function (err, res) {
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

module.exports= Country;