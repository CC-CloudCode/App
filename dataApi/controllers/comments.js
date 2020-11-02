var sql = require('../models/db.js');
var Comment = function(pedreste){
    this.idcomment = pedreste.idcomment;
    this.text = pedreste.text;
    this.date = pedreste.date;
    this.iduser = pedreste.iduser;
    this.idpost = pedreste.idpost;
};

Comment.create = function (p) {    
    return new Promise(function(resolve, reject) {
    sql.query("INSERT INTO comment (text, date, iduser, idpost) values (?,?,?,?)", [p.text,p.date,p.iduser,p.idpost], function (err, res) {
            
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
    sql.query("Select idcomment, text, date, iduser, idpost from comment where idcomment = ? ", [id], function (err, res) {             
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