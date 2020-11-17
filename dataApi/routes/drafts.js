var express = require('express');
var router = express.Router();
var Drafts = require('../controllers/drafts')

// Devolve um rascunho com um determinado id
router.get("/:id", function(req, res, next){
    Drafts.getDraft(req.params.id)
          .then(dados => {
              res.jsonp(dados)
          })
          .catch(erro => res.status(500).jsonp(erro))
})

// Devolve os eventos de um rascunho
router.get("/:id/events", function(req, res, next){
    Drafts.getEventsFromDraft(req.params.id)
          .then(dados => {
              res.jsonp(dados)
          })
          .catch(erro => res.status(500).jsonp(erro))
})

router.post("/", function(req, res, next){
    Drafts.createDraft(req.body)
          .then(dados => {
              res.jsonp(dados)
          })
          .catch(erro => res.status(500).jsonp(erro))
})

router.post("/:id/events", function(req, res, next){
    Drafts.createEvent(req.body.idbetapi, req.body.odd, req.body.bettype, req.params.id)
          .then(dados => {
              res.jsonp(dados)
          })
          .catch(erro => res.status(500).jsonp(erro))
})

router.delete("/:id", function(req, res, next){
    Drafts.deleteDraft(req.params.id)
          .then(dados => {
              res.jsonp(dados)
          })
          .catch(erro => res.status(500).jsonp(erro))
})


module.exports = router