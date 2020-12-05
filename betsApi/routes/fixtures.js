var express = require('express');
var router = express.Router();
var Fixtures = require('../controllers/fixtures')

router.get('/', function(req, res, next) {
    Fixtures.getAllNotStarted()
        .then(dados =>{res.jsonp(dados)})
        .catch(erro => res.write(erro))
    });

router.get('/distinctleagues', function(req, res, next) {
    Fixtures.getDistinctLeagues()
        .then(dados =>{res.jsonp(dados)})
        .catch(erro => res.write(erro))
    });

router.get('/allinfo', function(req, res, next) {
    Fixtures.getAllInfo()
        .then(dados =>{res.jsonp(dados)})
        .catch(erro => res.write(erro))
    });

router.get('/isopen/:id', function(req, res, next) {
    Fixtures.getIsOpen(req.params.id)
        .then(dados =>{res.jsonp(dados)})
        .catch(erro => res.write(erro))
    });

module.exports = router;
