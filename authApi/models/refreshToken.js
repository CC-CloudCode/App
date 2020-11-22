const mongoose = require('mongoose')
var Schema = mongoose.Schema

var TokenSchema = new Schema({
    token: String,
    idUtilizador : Number,
    estado : String
  })


module.exports = mongoose.model('refreshTokens', TokenSchema)
