var express = require('express');
var router = express.Router();
var Teamstats = require('../controllers/teamstats')

router.get('/', function(req, res, next) {
    Teamstats.getAll()
        .then(dados =>{res.jsonp(dados)})
        .catch(erro => res.write(erro))
    });
  

module.exports = router;