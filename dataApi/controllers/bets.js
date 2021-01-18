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
    sql.query("Select * from bet where idbet = ? and isDraft = false;", id, function (err, res) {
            
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

    sql.query("Select * from event INNER JOIN bet ON event.idbet = bet.idbet where event.idbet= ? and event.state = 1 and bet.isDraft = false;", idbet, function (err, res) {
            
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

    sql.query("Select bet.iduser , user.name from bet inner join user on bet.iduser = user.iduser  where idbet = ? and originalbetid = 1 and isDraft = false;", idbet, function (err, res) {
            
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
    var parameters = [bet.money, bet.iduser,bet.originalbetid, bet.isdraft]
    return new Promise(function(resolve,reject){
    sql.query("INSERT INTO bet (date,money,iduser,state,originalbetid, isDraft, oddtotal) values(now(),?,?,0,?,?, 1)",parameters,function(err,res){
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

Bet.createEvent = function (event){ 
    
    return new Promise(function(resolve,reject){
    sql.query("INSERT INTO event (idbetapi,odd,bettype,idbet,state) values(?,?,?,?,1)",[event.idbetapi,event.odd,event.bettype,event.idbet],function(err,res){
            if(err) {
                //console.log("error: ", err);
                reject(err);
            }   
            else{
                console.log(res.insertId);
                
                resolve(res);
            }
        });
    })
};

// get variação do dinheiro apostado nos ultimos 5 dias
Bet.getMoneyDay = function (idbet) {    
    return new Promise(function(resolve, reject) {
    sql.query("select date(date), sum(money) from bet group by date(date) order by date(date) asc limit 5;", function (err, res) {
            
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

// get dinheiro perdido nos ultimos 5 dias
Bet.getMoneyLost = function (idbet) {    
    return new Promise(function(resolve, reject) {
    sql.query("select date(date), sum(money) from bet where state = 2 group by date(date) order by date(date) asc limit 5;", function (err, res) {
            
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

// get numero rascunhos criados por dia nos ultimos 5 dias
Bet.getDraftCount = function (idbet) {    
    return new Promise(function(resolve, reject) {
    sql.query("select date(date), count(idbet) from bet where isDraft=1 group by date(date) order by date(date) asc limit 5;", function (err, res) {
            
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


module.exports= Bet;
