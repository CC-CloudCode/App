var express = require('express');
var router = express.Router();
var Head2Head = require('../controllers/head2head')

router.get('/', function(req, res, next) {
    Head2Head.getAll()
        .then(dados =>{res.jsonp(dados)})
        .catch(erro => res.write(erro))
    });

router.get('/:id', function(req, res, next) {
    Head2Head.getFixture(req.params.id)
        .then(dados =>{res.jsonp(dados)})
        .catch(erro => res.write(erro))
    });
      
  

module.exports = router;