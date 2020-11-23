var express = require('express');
var router = express.Router();
var Teamstats = require('../controllers/teamstats')

router.get('/', function(req, res, next) {
    Teamstats.getAll()
        .then(dados =>{res.jsonp(dados)})
        .catch(erro => res.write(erro))
    });


router.get('/teamstats/standings/:idleague', function(req, res, next) {
    Teamstats.getStandingByLeague(req.params.idleague)
        .then(dados =>{res.jsonp(dados)})
        .catch(erro => res.write(erro))
    });



    

module.exports = router;