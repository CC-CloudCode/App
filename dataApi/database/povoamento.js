var bcrypt = require('bcryptjs');
var sql = require('../models/db.js');
// USERS
var i 

var nomesUsers = ['José Sousa', 'Gervásio Macedo', 'Fernando Pinto', 'Manuel Teixeira', 'André Ferreira', 'Carlos Dias', 'Gabriel Magalhães', 'Dinis Peixoto', 'Ricardo Pereira',
            'Sheila Dias', 'Catarina Silva', 'Daniel Esteves', 'Joana Machado', 'Maria Valentim', 'Liliana Brandão', 'Inês Castro', 'Sara Guedes', 'Francisca Carvalho', 
            'Rita Pereira', 'Raquel Matos']
for(i = 1; i <= 20; i++){
    var private = true
    if (i % 2) private = false
    var queryUsers = 'INSERT INTO `databettingspree`.`user` (`username`, `birthdate`, `password`, `email`, `name`, `followers`, `following`, `private`, `balance`) VALUES '
    queryUsers += "(" + "'user" + i + "', '1998" + "-" + "12" + "-" + i + "', '" + bcrypt.hashSync("123456", 10) + 
                "'," + "'user" + i + "@hotmail.com'" + ", '" + nomesUsers[i-1] + "', " + "0, 0, " + private + ", " + 0 + ")"  
    sql.query(queryUsers)
}

console.log("Users Preenchidos")

// GRUPOS


var nomesGrupos = ['England Tips', 'Portugal Tips', 'Italy Tips', 'France Tips', 'Spain Tips', 'Germany Tips', 'Brazil Tips', 'Champions Tips', 'Holand Tips', 'Turkey Tips']
for(i = 1; i <= 10; i++){
    var queryGrupos = "INSERT INTO `databettingspree`.`group` (`createdby`, `name`) VALUES ";
    queryGrupos += "(" + i + ", '" + nomesGrupos[i-1] + "')" 
    sql.query(queryGrupos)
    var queryAdmin = "INSERT INTO `databettingspree`.`usergroup` (`idgroup`, `iduser`, `isAdmin`) VALUES (" + i + ", " + i + "," + true + ")"
    sql.query(queryAdmin)
}

console.log("Grupos Preenchidos")

// POST



var publicacoes = ["Boa tarde, acham que o Manchester United ganha hoje?", "Boa noite, viram o jogo do Real Madrid? Levou baile do Shakthar.", 
                    "Bom dia, acham que é seguro apostar no Tondela ou é muito arriscado?", "Sigam as minhas apostas se quiserem ganhar dinheiro!",
                    "Esta aplicação está muito boa! Já recomendei aos meus amigos", "Estou farto de apostar no Barcelona e perder dinheiro."]

for(i = 1; i <= 20; i++){
    var j ;
    var lista = [] 
    for(j = 1; j <= 3; j++){
        var queryPublicacoes = "INSERT INTO `databettingspree`.`post` (`text`, `public`, `date`, `iduser`, `idbet`, `betpublic`, `idgroup`) VALUES "
        var teste = true
        while(teste){
            var min = Math.ceil(0);
            var max = Math.floor(554500);
            var aux = Math.floor(Math.random() * (max - min)) + min;
            var p = aux % 6
            if(!lista.find(element => element == p)){
                teste = false
                lista.push(p)
            }
        }
        var public = true
        var date = new Date()
        var dateAtual = date.toISOString().substr(0,19).replace('T', ' ')

        if(j%2) public = false
        queryPublicacoes += "('" + publicacoes[lista[j-1]] + "', " + public + ", '"  + dateAtual + "', " + i + ", null, null, null)"
        sql.query(queryPublicacoes)
    }
}

console.log("Posts Preenchidos!")


// Followers


for(i = 1; i <= 20; i++){
    var lista = [] 
    for(var j = 1; j <= 4; j++){
        var teste = true
        while(teste){
            var min = Math.ceil(0);
            var max = Math.floor(554500);
            var aux = Math.floor(Math.random() * (max - min)) + min;
            var p = (aux % 20) + 1 
            if(!lista.find(element => element == p && p != i)){
                teste = false
                lista.push(p)
            }
        }
        var me = lista[j-1]
        var queryFollowers = "INSERT INTO `databettingspree`.`follower` (`me`, `following`) VALUES (" + me + ", " + i + ")"
        sql.query(queryFollowers) 
    }
}


console.log("Followers Preenchido!")

// UserGroup

for(i = 1; i <= 10; i++){
    var lista = [] 
    for(var j = 1; j <= 5; j++){
        var teste = true
        while(teste){
            var min = Math.ceil(0);
            var max = Math.floor(554500);
            var aux = Math.floor(Math.random() * (max - min)) + min;
            var p = (aux % 20) + 1 
            if(!lista.find(element => element == p) && p != i){
                teste = false
                lista.push(p)
            }
        }
        var iduser = lista[j-1]
        var queryUserGroup = "INSERT INTO `databettingspree`.`usergroup` (`idgroup`, `iduser`, `isAdmin`) VALUES (" + i + ", " + iduser + "," + false + ")"
        sql.query(queryUserGroup)
    }
}

console.log("UserGroup Preenchidos")

return;