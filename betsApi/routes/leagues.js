var express = require('express');
var router = express.Router();
var Leagues = require('../controllers/leagues')

router.get('/', function(req, res, next) {
    Leagues.getAll()
        .then(dados =>{res.jsonp(dados)})
        .catch(erro => res.write(erro))
    });
  

module.exports = router;