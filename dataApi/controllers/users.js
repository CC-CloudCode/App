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
    sql.query("Select iduser, username, birthdate, email, name, followers, following, private from user where iduser = ?;", id, function (err, res) {
            
            if(err) {
                console.log("error: ", err);
                reject(err);
            }
            else{
                if(res.length != 0) resolve(res[0]);
                else resolve(undefined)
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

User.getFeedFromUser = function(iduser){
    return new Promise(function(resolve, reject) {
        sql.query("Select post.*, u.username from follower follower, post post, user u where follower.me = ? and follower.following = post.iduser and u.iduser=post.iduser and isnull(post.idgroup);", iduser, function (err, res) {
                
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

User.getPostsFromUser = function (iduser) {    
    return new Promise(function(resolve, reject) {
    sql.query("Select p.*, u.username from post p, user u where p.iduser = ? and u.iduser=p.iduser;", iduser, function (err, res) {
            
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

User.getFollowRequests = function(iduser){
    return new Promise(function(resolve, reject) {
        sql.query("Select fr.id, fr.requester, fr.requested, (select username from user u where u.iduser = fr.requester) as usernameRequester from databettingspree.followrequests fr where fr.requested = ? ;", iduser, function (err, res) {
                
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

User.getFollowersFromUser = function (iduser) {    
    return new Promise(function(resolve, reject) {
    sql.query("Select f.id, f.me, f.following, u.username from follower f, user u where f.following = ? and u.iduser=f.me;", iduser, function (err, res) {
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

User.find = function(username){
    return new Promise(function(resolve, reject) {
        sql.query("SELECT * FROM user WHERE username LIKE '%" + username + "%' ;", function (err, res) {
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

User.getGroupsFromUser = function (iduser) {    
    return new Promise(function(resolve, reject) {
    sql.query("Select g.idgroup, g.createdby, g.name from databettingspree.group g, databettingspree.usergroup u where u.iduser = ? and g.idgroup = u.idgroup;", iduser, function (err, res) {
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
    sql.query("Select f.id, f.me, f.following, u.username from follower f, user u where f.me = ? and f.following = u.iduser;", iduser, function (err, res) {
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
                resolve(res.insertId);
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

User.acceptFollowRequest = async function(idRequest, requester, requested){
    await User.createFollower(requested, requester);
    return await User.deleteFollowRequest(idRequest)
}


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

User.createFollowRequest = function (requester, requested) {    
    return new Promise(function(resolve, reject) {
    sql.query("INSERT INTO databettingspree.followrequests (requester, requested) values (?, ?)", [requester, requested], function (err, res) {
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

User.updatePrivateAccount = function(id){
    return new Promise(function(resolve, reject) {
    sql.query("UPDATE user SET private = !private WHERE iduser = ?", id, function (err, res) {
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

User.deleteFollowRequest = function (idRequest){
    return new Promise(function(resolve, reject) {
        sql.query("DELETE FROM databettingspree.followrequests WHERE id = ? ;", idRequest, function (err, res) {
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