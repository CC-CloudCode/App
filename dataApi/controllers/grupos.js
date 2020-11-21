var sql = require('../models/db.js');
var Grupo = function(grupo){
    this.idgroup = grupo.idgroup;
    this.createdby = grupo.createdby;
    this.name = grupo.name;
};

Grupo.getGrupos = function () {
    return new Promise(function(resolve, reject) {
    sql.query("Select * from group", function (err, res) {

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

Grupo.getGrupo = function (idGroup) {
    return new Promise(function(resolve, reject) {
    sql.query("Select idgroup, createdby ,name from group where idgroup = ?;", idGroup, function (err, res) {

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

Grupo.getGrupoMembers = function (idGrupo) {
    return new Promise(function(resolve, reject) {
    sql.query("Select *from usergroup where idgroup = ?;", idGrupo, function (err, res) {

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

Grupo.getGrupoPosts = function (idGrupo) {
    return new Promise(function(resolve, reject) {
    sql.query("Select * from post where idgroup = ?;", idGrupo, function (err, res) {

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

Grupo.createGrupo = function (group) {
    return new Promise(function(resolve, reject) {
    sql.query("INSERT INTO group (createdby,name) values (?)", [group.createdby,group.name], function (err, res) {
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

Grupo.creatMember = function (member) {
    return new Promise(function(resolve, reject) {
    sql.query("INSERT INTO usergroup (idgroup,iduser) values (?,?)", [member.idgroup,member.iduser], function (err, res) {
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


Grupo.updateGroup = function (id, grupo) {
    var parameters = [grupo.createdby, grupo.name, id]
    return new Promise(function(resolve, reject) {
    sql.query("UPDATE group SET createdby = ?, name = ? WHERE idgroup = ?,", parameters, function (err, res) {
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

Grupo.deleteGroup = function (id){
    return new Promise(function(resolve, reject) {
        sql.query("DELETE FROM group WHERE idgroup = ?", id, function (err, res) {
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

Grupo.deleteMember = function (group, member){
    return new Promise(function(resolve, reject) {
        sql.query("DELETE FROM usergroup WHERE idgroup = ? and iduser = ?", [group, member], function (err, res) {
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



module.exports= Grupo;