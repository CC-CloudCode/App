var sql = require('../models/db.js');
var Comment = function(c){
    this.idcomment = c.idcomment;
    this.text = c.text;
    this.date = c.date;
    this.iduser = c.iduser;
    this.idpost = c.idpost;
};

Comment.create = function (p) {    
    return new Promise(function(resolve, reject) {
    sql.query("INSERT INTO comment (text, date, iduser, idpost) values (?,now(),?,?)", [p.text,p.iduser,p.idpost], function (err, res) {
            
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
Comment.get= function (id) {
    return new Promise(function(resolve, reject) {
    sql.query("Select c.idcomment, c.text, c.date, c.iduser, c.idpost, u.username from comment c, user u where c.idcomment = ? and c.iduser = u.iduser", [id], function (err, res) {             
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

Comment.update = function(id, p){
    return new Promise(function(resolve, reject) {
sql.query("UPDATE comment SET text = ?, date = ?, iduser = ?, idpost = ? WHERE idcomment = ?", [p.text,p.date, p.iduser,p.idpost ,id], function (err, res) {
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

Comment.remove = function(id){
    return new Promise(function(resolve, reject) {
 sql.query("DELETE FROM comment WHERE idcomment = ?", id, function (err, res) {

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


module.exports= Comment;