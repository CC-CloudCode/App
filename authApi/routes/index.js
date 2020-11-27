var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
var nanoid = require('nanoid')
var axios = require('axios')
var Tokens = require('../controllers/refreshToken')


var apiDadosHost = "http://localhost:4052/"
const jwtKey = "PEI-BettingSpree2020"
const jwtExpirySeconds = 60 * 10

generateToken = function(user){

    const token = jwt.sign({ user }, jwtKey, {
		algorithm: "HS256",
		expiresIn: jwtExpirySeconds,
    })
    
    return token
}

router.post('/login', function(req, res){
  axios.post(apiDadosHost + "users/login", req.body)
            .then(async dados => { 
              
              var response = dados.data
              if(response.login == true){
                response.token = await generateToken(response.user)
                var tokenExistente = await Tokens.findUserTokenAtivo(response.user.iduser)
                if(tokenExistente == null){
                  var token = nanoid.nanoid();
                  var refeshToken = {token:token, idUtilizador: response.user.iduser, estado: "Ativo"}
                  Tokens.createToken(refeshToken)
                  res.cookie('refresh-token', refeshToken, { httpOnly: true, sameSite: 'strict'});
                }
                else{
                  res.cookie('refresh-token', tokenExistente, { httpOnly: true, sameSite: 'strict'});
                }
              }
              res.jsonp(response)
            })
            .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })

})


router.post('/refreshToken',  function(req, res){
    var cookie = req.cookies['refresh-token']
    console.log(req.cookies)
    Tokens.findUserTokenAtivo(cookie.idUtilizador)
    .then(async token =>{
      console.log(cookie)
      console.log(token)
      if(token == null)
      res.sendStatus(401);
      else{
        console.log(req.body)
        var newToken = await generateToken(req.body)
        console.log(newToken)
        res.jsonp({token: newToken})
      }
    })
    .catch(erro => res.status(500).jsonp(erro))

})

module.exports = router;
