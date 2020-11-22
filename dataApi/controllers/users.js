var sql = require('../models/db.js');
var bcrypt = require('bcryptjs')
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

User.getUser = function (id) {    
    return new Promise(function(resolve, reject) {
    sql.query("Select iduser, username, birthdate, email, name, followers, following from user where iduser = ?;", id, function (err, res) {
            
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

User.getBetsFromUser = function (iduser) {    
    return new Promise(function(resolve, reject) {
    sql.query("Select * from bet where iduser = ?;", iduser, function (err, res) {
            
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

User.getPostsFromUser = function (iduser) {    
    return new Promise(function(resolve, reject) {
    sql.query("Select * from post where iduser = ? and idgroup = 1;", iduser, function (err, res) {
            
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

User.getFollowersFromUser = function (iduser) {    
    return new Promise(function(resolve, reject) {
    sql.query("Select * from follower where following = ?;", iduser, function (err, res) {
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

User.getFollowingFromUser = function (iduser) {    
    return new Promise(function(resolve, reject) {
    sql.query("Select * from follower where me = ?;", iduser, function (err, res) {
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

User.getPublicPostsFromUser = function (iduser) {    
    return new Promise(function(resolve, reject) {
    sql.query("Select * from post where iduser = ? and public = true;", iduser, function (err, res) {
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

User.createUser = function (user) {    
    var newPassword = bcrypt.hashSync(user.password, 10);
    var parameters = [user.username, user.birthdate, newPassword, user.email, user.name]
    return new Promise(function(resolve, reject) {
    sql.query("INSERT INTO user (username, birthdate, password, email, name, followers, following) values (?, ?, ?, ?, ?, 0, 0)", parameters, function (err, res) {
            if(err) {
                console.log("error: ", err);
                reject(err);
            }
            else{
                console.log(res.insertId);
                resolve(res);
            }
        });   
    })       
};

User.login = function (email) {    
    return new Promise(function(resolve, reject) {
    sql.query("Select iduser, password from user where email = ?;", email, function (err, res) {
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

User.createFollower = function (following, me) {    
    return new Promise(function(resolve, reject) {
    sql.query("INSERT INTO follower (me, following) values (?, ?)", [me, following], function (err, res) {
            if(err) {
                console.log("error: ", err);
                reject(err);
            }
            else{
                console.log(res.insertId);
                resolve(res);
            }
        });   
    })       
};

User.updateUser = function (id, user) {
    var parameters = [user.username, user.birthdate, user.email, user.name, id]    
    return new Promise(function(resolve, reject) {
    sql.query("UPDATE user SET username = ?, birthdate = ?, email = ?, name = ? WHERE iduser = ?", parameters, function (err, res) {
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

User.updatePassword = function (id, password) {
    var newPassword = bcrypt.hashSync(password, 10);
    return new Promise(function(resolve, reject) {
    sql.query("UPDATE user SET passaword = ? WHERE iduser = ?", [newPassword, id], function (err, res) {
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

User.deleteUser = function (id){
    return new Promise(function(resolve, reject) {
        sql.query("DELETE FROM user WHERE iduser = ?", id, function (err, res) {
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

User.deleteFollower = function (following, me){
    return new Promise(function(resolve, reject) {
        sql.query("DELETE FROM follower WHERE following = ? and me = ?", [following, me], function (err, res) {
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

module.exports= User;