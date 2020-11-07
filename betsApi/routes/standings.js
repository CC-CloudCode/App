var express = require('express');
var router = express.Router();
var Standings = require('../controllers/standings')

router.get('/', function(req, res, next) {
    Standings.getAll()
        .then(dados =>{res.jsonp(dados)})
        .catch(erro => res.write(erro))
    });
  

module.exports = router;