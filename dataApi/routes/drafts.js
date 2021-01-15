var express = require('express');
var router = express.Router();
var Drafts = require('../controllers/drafts')
var passport = require('passport')


// Devolve um rascunho com um determinado id
router.get("/:id", passport.authenticate('jwt', {session: false}), function(req, res, next){
    Drafts.getDraft(req.params.id)
          .then(dados => {
              res.jsonp(dados)
          })
          .catch(erro => res.status(500).jsonp(erro))
})

// Devolve os eventos de um rascunho
router.get("/:id/events", passport.authenticate('jwt', {session: false}), function(req, res, next){
    Drafts.getEventsFromDraft(req.params.id)
          .then(dados => {
              res.jsonp(dados)
          })
          .catch(erro => res.status(500).jsonp(erro))
})

router.post("/", passport.authenticate('jwt', {session: false}), function(req, res, next){
    Drafts.createDraft(req.body)
          .then(dados => {
              res.jsonp(dados)
          })
          .catch(erro => res.status(500).jsonp(erro))
})

router.post("/:id/events", passport.authenticate('jwt', {session: false}), function(req, res, next){
    Drafts.createEvent(req.body.idbetapi, req.body.odd, req.body.bettype, req.params.id)
          .then(dados => {
              res.jsonp(dados)
          })
          .catch(erro => res.status(500).jsonp(erro))
})

router.delete("/:id", passport.authenticate('jwt', {session: false}), function(req, res, next){
    Drafts.deleteDraft(req.params.id)
          .then(dados => {
              res.jsonp(dados)
          })
          .catch(erro => res.status(500).jsonp(erro))
})


module.exports = router