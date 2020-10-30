const mongoose = require('mongoose')
var Schema = mongoose.Schema

var Transactiom = new Schema({
    id: Number,
    idUtilizador : String,
    estado : String
  })


module.exports = mongoose.model('transactions', TokenSchema)
