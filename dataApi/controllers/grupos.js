var sql = require('../models/db.js');
var Grupo = function(pedreste){
    this.idPedestre = pedreste.idPedestre;
    this.latitude = pedreste.latitude;
    this.longitude = pedreste.longitude;
    this.idPassadeira = pedreste.idPassadeira;
};


module.exports= Grupo;