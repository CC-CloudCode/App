var express = require('express');
var router = express.Router();
var Bets = require('../controllers/bets')
var passport = require('passport')


/* GET dinheiro apostado ultimos 5 dias. */
router.get('/dashboard/money', function(req, res, next) {
  Bets.getMoneyDay()
     .then(dados => {
          res.jsonp(dados)
     })
     .catch(erro => {
         console.log(erro); 
         res.status(500).jsonp(erro)
      })
});

/* GET dinheiro perdido ultimos 5 dias. */
router.get('/dashboard/lostmoney', function(req, res, next) {
  Bets.getMoneyLost()
     .then(dados => {
          res.jsonp(dados)
     })
     .catch(erro => {
         console.log(erro); 
         res.status(500).jsonp(erro)
      })
});

/* GET numero rascunhos criados ultimos 5 dias */
router.get('/dashboard/draftcount', function(req, res, next) {
  Bets.getDraftCount()
     .then(dados => {
          res.jsonp(dados)
     })
     .catch(erro => {
         console.log(erro); 
         res.status(500).jsonp(erro)
      })
});

/* GET bets. */
router.get('/:id', passport.authenticate('jwt', {session: false}), function(req, res, next) {
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

router.get('/:id/events', passport.authenticate('jwt', {session: false}), function(req, res, next) {
  Bets.getEventsFromBets(req.params.id)
       .then(dados => {
          res.jsonp(dados)
       })
       .catch(erro => {
          res.status(500).jsonp(erro)
       })
});

/*GET copies*/
router.get('/:id/copies', passport.authenticate('jwt', {session: false}), function(req, res, next) {
  Bets.getUsersFromBets(req.params.id)
       .then(dados => {
          res.jsonp(dados)
       })
       .catch(erro => {
          res.status(500).jsonp(erro)
       })
});

/*POST bet */
router.post('/', passport.authenticate('jwt', {session: false}), function(req, res, next) {
  Bets.createBet(req.body)
        .then(dados => {
            res.jsonp(dados)
        })
        .catch(erro => {
            res.status(500).jsonp(erro)
        })
})

/*POST event*/
router.post('/events', passport.authenticate('jwt', {session: false}), function(req, res, next) {
  Bets.createEvent(req.body)
        .then(dados => {
            res.jsonp(dados)
        })
        .catch(erro => {
            console.log(erro);
            res.status(500).jsonp(erro)
        })
})

module.exports = router;
