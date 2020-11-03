var express = require('express');
var router = express.Router();
var Countries = require('../controllers/countries')

router.get('/', function(req, res, next) {
    Countries.getAll()
        .then(dados =>{res.jsonp(dados)})
        .catch(erro => res.write(erro))
    });
  

module.exports = router;