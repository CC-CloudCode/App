var express = require('express');
var router = express.Router();
var Bets = require('../controllers/bets')

/* GET bets. */
router.get('/:id', function(req, res, next) {
  Bets.getBet(req.params.id)
     .then(dados => {
          res.jsonp(dados)
     })
     .catch(erro => {
         console.log(erro); 
         res.status(500).jsonp(erro)
      })
});

/*GET evento*/

router.get('/:id/events', function(req, res, next) {
  Bets.getEventsFromBets(req.params.id)
       .then(dados => {
          res.jsonp(dados)
       })
       .catch(erro => {
          res.status(500).jsonp(erro)
       })
});

/*GET copies*/
router.get('/:id/copies', function(req, res, next) {
  Bets.getUsersFromBets(req.params.id)
       .then(dados => {
          res.jsonp(dados)
       })
       .catch(erro => {
          res.status(500).jsonp(erro)
       })
});

/*POST bet */
router.post('/', function(req, res, next) {
  Bets.createBet(req.body)
        .then(dados => {
            res.jsonp(dados)
        })
        .catch(erro => {
            res.status(500).jsonp(erro)
        })
})

/*POST event*/
router.post('/:id/events', function(req, res, next) {
  Bets.createEvent(req.params.id, req.body.id)
        .then(dados => {
            res.jsonp(dados)
        })
        .catch(erro => {
            console.log(erro);
            res.status(500).jsonp(erro)
        })
})

module.exports = router;
