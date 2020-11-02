var sql = require('../models/db.js');
var User = function(user){
    this.iduser = user.iduser;
    this.username = user.username;
    this.birthdate = user.birthdate;
    this.password = user.password;
    this.email = user.email;
    this.name = user.name;
    this.followers = user.followers;
    this.followings = user.followings;
};

User.getUser = function (username) {    
    return new Promise(function(resolve, reject) {
    sql.query("Select iduser, username, birthdate, email, name, followers, following from user where username = ?;", username, function (err, res) {
            
            if(err) {
                console.log("error: ", err);
                reject(err);
            }
            else{
                resolve(res);
            }
        });   
    })       
};

module.exports= User;