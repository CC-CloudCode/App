var sql = require('../models/db.js');
var Grupo = function(grupo){
    this.idgroup = grupo.idgroup;
    this.createdby = grupo.createdby;
    this.name = grupo.name;
};

Grupo.getGroups = function () {
    return new Promise(function(resolve, reject) {
    sql.query("Select * from databettingspree.group where idgroup != -1", function (err, res) {

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

Grupo.getGroup = function (idGroup) {
    return new Promise(function(resolve, reject) {
        sql.query("Select idgroup, createdby, name from databettingspree.group where idgroup = ? ;", idGroup, function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    reject(err);
                }
                else{
                    if(res.length!=0) resolve(res[0]);
                    else resolve(undefined)
                }
            });   
        }) 
};

Grupo.getGrupoMembers = function (idGrupo) {
    return new Promise(function(resolve, reject) {
    sql.query("Select user.*, u.isAdmin from databettingspree.usergroup u, databettingspree.user user where idgroup = ? and user.iduser = u.iduser;", idGrupo, function (err, res) {

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

Grupo.getPedidosGrupo = function(idGrupo){
    return new Promise(function(resolve, reject) {
        sql.query("Select u.id, u.idgroup, user.iduser, user.username from databettingspree.grouprequests u, databettingspree.user user where idgroup = ? and user.iduser = u.iduser;", idGrupo, function (err, res) {
    
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

Grupo.find = function(name){
    return new Promise(function(resolve, reject) {
        sql.query("SELECT idgroup, name FROM databettingspree.group WHERE idgroup != -1 and name LIKE '%" + name + "%' ;", function (err, res) {
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

Grupo.getGrupoPosts = function (iduser, idGrupo) {
    return new Promise(function(resolve, reject) {
    sql.query(`Select p.*, u.username, (select p.idpost from upvotes up where up.iduser = ? and up.idpost = p.idpost) as upvote,
    (select count(idpost) from upvotes u where u.idpost = p.idpost) as postNum, g.name as namegroup,
    (select state from bet where p.idbet = idbet) as state
    from post p, user u, databettingspree.group g where g.idgroup=? and u.iduser=p.iduser and g.idgroup = p.idgroup Order by p.date DESC;`, [iduser,idGrupo], function (err, res) {

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
    sql.query("INSERT INTO databettingspree.group (createdby,name) values (?, ?)", [group.createdby,group.name], function (err, res) {
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

Grupo.createRequest = function (request) {
    return new Promise(function(resolve, reject) {
    sql.query("INSERT INTO databettingspree.grouprequests (idgroup, iduser) values (?, ?)", [request.idgroup, request.iduser], function (err, res) {
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

Grupo.acceptRequest = async function(request){
    await Grupo.deleteRequest(request.id)
    request.isAdmin = false
    await Grupo.creatMember(request)
    return true
}

Grupo.creatMember = function (member) {
    return new Promise(function(resolve, reject) {
    sql.query("INSERT INTO databettingspree.usergroup (idgroup, iduser, isAdmin) values (?,?, ?)", [member.idgroup,member.iduser, member.isAdmin], function (err, res) {
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
    sql.query("UPDATE databettingspree.group SET createdby = ?, name = ? WHERE idgroup = ?,", parameters, function (err, res) {
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

Grupo.putMembroAdmin = function (idgroup, iduser){
    return new Promise(function(resolve, reject) {
        sql.query("UPDATE databettingspree.usergroup SET isAdmin = 1 WHERE idgroup = ? and iduser = ?", [idgroup,iduser], function (err, res) {
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

Grupo.deleteGroup = function (id){
    return new Promise(function(resolve, reject) {
        sql.query("DELETE FROM databettingspree.group WHERE idgroup = ?", id, function (err, res) {
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



Grupo.deleteRequest = function (id){
    return new Promise(function(resolve, reject) {
        sql.query("DELETE FROM databettingspree.grouprequests WHERE id=?", id, function (err, res) {
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
        sql.query("DELETE FROM databettingspree.usergroup WHERE idgroup = ? and iduser = ?", [group, member], function (err, res) {
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