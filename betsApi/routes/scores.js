var express = require('express');
var router = express.Router();
var Scores = require('../controllers/scores')

router.get('/', function(req, res, next) {
    Scores.getAll()
        .then(dados =>{res.jsonp(dados)})
        .catch(erro => res.write(erro))
    });
  

module.exports = router;