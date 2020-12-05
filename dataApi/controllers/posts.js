var sql = require('../models/db.js');
var Post = function(post){
    this.idPost = post.idPost;
    this.text = post.text;
    this.public = post.public;
    this.date = post.date;
    this.iduser = post.iduser;
    this.idbet = post.idbet;
    this.betpublic = post.betpublic;
    this.idgroup = post.idgroup;

};
Post.getPosts = function (idPost) {
    return new Promise(function(resolve, reject) {
    sql.query("Select *from post", function (err, res) {

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

Post.getPost = function (idPost) {
    return new Promise(function(resolve, reject) {
    sql.query("Select idPost, text, public, date, iduser, idbet, betpublic,idgroup from post where idPost = ?;", idPost, function (err, res) {

            if(err) {
                console.log("error: ", err);
                reject(err);
            }
            else{
                resolve(res[0]);
            }
        });
    })
};

Post.getPostComments = function (idPost) {
    return new Promise(function(resolve, reject) {
    sql.query("Select *from comment where idPost = ?;", idPost, function (err, res) {

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

Post.getPostUpvotes = function (idPost) {
    return new Promise(function(resolve, reject) {
    sql.query("Select *from upvotes where idPost = ?;", idPost, function (err, res) {

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

Post.createPost = function (post) {
    var parameters = [post.text, post.public, post.date, post.iduser, post.idbet,post.betpublic ,post.idgroup]
    return new Promise(function(resolve, reject) {
    sql.query("INSERT INTO post (text, public, date, iduser, idbet, betpublic, idgroup) values (?, ?, ?, ?, ?, ?, ?)", parameters, function (err, res) {
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

Post.createUpvotes = function (post) {
    return new Promise(function(resolve, reject) {
    sql.query("INSERT INTO upvotes (iduser, idpost) values (?, ?)", [post.iduser,post.idpost], function (err, res) {
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

Post.updatePost = function (id, post) {
    var parameters = [post.text, post.public, post.date,  id]
    return new Promise(function(resolve, reject) {
    sql.query("UPDATE post SET text = ?, public = ?, date = ? WHERE idpost = ?", parameters, function (err, res) {
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

Post.deletePost = function (id){
    return new Promise(function(resolve, reject) {
        sql.query("DELETE post FROM post INNER JOIN upvotes ON post.idpost = ?", id, function (err, res) {
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

Post.deleteUpvote = function (iduser,idpost){
    return new Promise(function(resolve, reject) {
        sql.query("DELETE upvotes FROM upvotes  WHERE idpost = ? and iduser = ?", [idpost,iduser], function (err, res) {
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

// Select post.* from follower follower, post post where follower.following = post.iduser; POSTS FEED

module.exports= Post;