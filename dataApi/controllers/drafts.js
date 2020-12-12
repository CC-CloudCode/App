var sql = require('../models/db.js');
var Draft = function(b){
    this.idbet = b.idbet;
    this.date = b.date;
    this.money = b.money;
    this.iduser = b.iduser;
    this.state = b.state;
    this.originalbetid = b.originalbetid;
};

// Informação relativa a uma aposta
Draft.getDraft = function (id) {    
    return new Promise(function(resolve, reject) {
    sql.query("Select * from bet where idbet = ? and isDraft = true;", id, function (err, res) {
            
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

//Todos os jogos e resultados apostados da aposta
Draft.getEventsFromDraft = function (idbet) {    
    return new Promise(function(resolve, reject) {
        //state:
        //0- não terminado
        //1- terminado
        //2- pendente

    sql.query("Select * from event where idbet= ? and state = 1;", idbet, function (err, res) {
            
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

Draft.getUsersFromDraft = function (idbet) {    
    return new Promise(function(resolve, reject) {
        //originalbetid: (porque é que não é booleano ?)
        // 0- não foi copiado
        //1- foi copiado

    sql.query("Select bet.iduser , user.name from bet inner join user on bet.iduser = user.iduser  where idbet = ? and originalbetid = 1 and isDraft = true;", idbet, function (err, res) {
            
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

Draft.createDraft = function (bet){
    var parameters = [bet.date, bet.money, bet.iduser,bet.originalbetid]
    return new Promise(function(resolve,reject){
    sql.query("INSERT INTO bet (date,money,iduser,state,originalbetid, isDraft) values(?,?,?,2,?,true)",parameters,function(err,res){
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

Draft.createEvent = function (idbetapi,odd,bettype,idbet){ 
    
    return new Promise(function(resolve,reject){
    sql.query("INSERT INTO event (idbetapi,odd,bettype,idbet,state) values(?,?,?,?,1)",[idbetapi,odd,bettype,idbet],function(err,res){
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

Draft.deleteEvents = function(id){
    return new Promise(function(resolve,reject){
        sql.query("Delete from event where idbet=?", id, function(err,res){
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
}


Draft.deleteDraft = function(id){
    return new Promise(function(resolve,reject){
        sql.query("Update bet Set isDraft=3 where idbet=?", id, function(err,res){
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
}



module.exports= Draft;
