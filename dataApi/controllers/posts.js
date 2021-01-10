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

Post.getPost = function (iduser, idpost) {
    return new Promise(function(resolve, reject) {
    sql.query("Select post.*, u.username, (select post.idpost from upvotes up where up.iduser = ? and up.idpost = post.idpost) as upvote, " +
    "(select count(idpost) from upvotes u where u.idpost = post.idpost) as postNum, (select g.name from databettingspree.group g where g.idgroup = post.idgroup) as namegroup from follower follower, post post, user u where post.idpost=? and u.iduser=post.iduser Order by post.date DESC;", [iduser, idpost], function (err, res) {

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
    var parameters = [post.text, post.public, post.iduser, post.idbet,post.betpublic ,post.idgroup]
    return new Promise(function(resolve, reject) {
    sql.query("INSERT INTO post (text, public, date, iduser, idbet, betpublic, idgroup) values (?, ?, now(), ?, ?, ?, ?)", parameters, function (err, res) {
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
        sql.query("Update post Set idgroup=-1 where idpost=?", id, function (err, res) {
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

// get posts count ultimos 5 dias
Post.getPostsCount = function (idPost) {
    return new Promise(function(resolve, reject) {
    sql.query("select count(idpost) as postscount, date(date) as date from post group by date(date) order by date(date) asc limit 5", function (err, res) {

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

// get posts count por hora no dia anterior
Post.getPostsCountLastDay = function (idPost) {
    return new Promise(function(resolve, reject) {
    sql.query("select hour(date), count(idpost) from post where date(date)=date(date(now())-1) group by hour(date) order by hour(date);", function (err, res) {

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

// get public posts count ultimos 5 dias
Post.getPublicPostsCount = function (idPost) {
    return new Promise(function(resolve, reject) {
    sql.query("select date(date), count(idpost) from post where public=1 group by date(date) order by date(date) asc limit 5;", function (err, res) {

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

// get private posts count ultimos 5 dias
Post.getPrivatePostsCount = function (idPost) {
    return new Promise(function(resolve, reject) {
    sql.query("select date(date), count(idpost) from post where public=0 group by date(date) order by date(date) asc limit 5;", function (err, res) {

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

module.exports= Post;