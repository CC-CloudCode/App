var express = require('express');
var router = express.Router();
var Grupos = require('../controllers/grupos')

/* GET grupos. */
router.get('/', function(req, res, next) {
   Grupos.getGroupos()
     .then(dados => {
          res.jsonp(dados)
     })
     .catch(erro => {
         console.log(erro); 
         res.status(500).jsonp(erro)
      })
});

router.get('/:id', function(req, res, next) {
   Grupos.getGroupo()
      .then(dados => {
           res.jsonp(dados)
      })
      .catch(erro => {
          console.log(erro); 
          res.status(500).jsonp(erro)
       })
 });

router.get('/:id/members', function(req, res, next) {
  Grupos.getGrupoMembers()
     .then(dados => {
          res.jsonp(dados)
     })
     .catch(erro => {
         console.log(erro); 
         res.status(500).jsonp(erro)
      })
});

router.get('/:id/post', function(req, res, next) {
   Grupos.getGrupoPosts()
      .then(dados => {
           res.jsonp(dados)
      })
      .catch(erro => {
          console.log(erro); 
          res.status(500).jsonp(erro)
       })
 });

router.post('/', function(req, res, next) {
   Grupos.createGrupo(req.body)
         .then(dados => {
             res.jsonp(dados)
         })
         .catch(erro => {
             res.status(500).jsonp(erro)
         })
})

router.post('/:id/members', function(req, res, next) {
   Grupos.creatMember(req.body)
         .then(dados => {
             res.jsonp(dados)
         })
         .catch(erro => {
             res.status(500).jsonp(erro)
         })
})

router.post('/:id/members', function(req, res, next) {
   Grupos.creatMember(req.body)
         .then(dados => {
             res.jsonp(dados)
         })
         .catch(erro => {
             res.status(500).jsonp(erro)
         })
})

router.put('/:id', function(req, res, next) {
   Grupos.updateGroup(req.params.id, req.body)
         .then(dados => {
             res.jsonp(dados)
         })
         .catch(erro => {
             res.status(500).jsonp(erro)
         })
})

router.delete('/:id', function(req, res, next) {
   Grupos.deleteGroup(req.params.id)
         .then(dados => {
             res.jsonp(dados)
         })
         .catch(erro => {
             res.status(500).jsonp(erro)
         })
})

router.delete('/:id/members', function(req, res, next) {
   Grupos.deleteMember(req.params.id)
         .then(dados => {
             res.jsonp(dados)
         })
         .catch(erro => {
             res.status(500).jsonp(erro)
         })
})


module.exports = router;
