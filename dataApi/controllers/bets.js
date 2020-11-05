var sql = require('../models/db.js');
var Bet = function(b){
    this.idbet = b.idbet;
    this.date = b.date;
    this.money = b.money;
    this.iduser = b.iduser;
    this.state = b.state;
    this.originalbetid = b.originalbetid;
};

// Informação relativa a uma aposta
Bet.getBet = function (id) {    
    return new Promise(function(resolve, reject) {
    sql.query("Select * from bet where idbet = ?;", id, function (err, res) {
            
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
Bet.getEventsFromBets = function (idbet) {    
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

Bet.getUsersFromBets = function (idbet) {    
    return new Promise(function(resolve, reject) {
        //originalbetid: (porque é que não é booleano ?)
        // 0- não foi copiado
        //1- foi copiado

    sql.query("Select bet.iduser , user.name from bet inner join user on bet.iduser = user.iduser  where idbet = ? and originalbetid = 1;", idbet, function (err, res) {
            
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

Bet.createBet = function (bet){
    var parameters = [bet.date, bet.money, bet.iduser,bet.originalbetid]
    return new Promise(function(resolve,reject){
    sql.query("INSERT INTO bet (date,money,iduser,state,originalbetid) values(?,?,?,2,?)",parameters,function(err,res){
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

Bet.createEvent = function (idbetapi,odd,bettype,idbet){ 
    
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


module.exports= Bet;
