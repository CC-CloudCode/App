var express = require('express');
var router = express.Router();
var Teams = require('../controllers/teams')

router.get('/', function(req, res, next) {
    Teams.getAll()
        .then(dados =>{res.jsonp(dados)})
        .catch(erro => res.write(erro))
    });
  

module.exports = router;