var express = require('express');
var router = express.Router();
var Grupos = require('../controllers/grupos')

/* GET grupos. */
router.get('/', function(req, res, next) {
   Grupos.getGroups()
     .then(dados => {
          res.jsonp(dados)
     })
     .catch(erro => {
         console.log(erro); 
         res.status(500).jsonp(erro)
      })
});

router.get('/:id', function(req, res, next) {
   Grupos.getGroup(req.params.id)
      .then(dados => {
           res.jsonp(dados)
      })
      .catch(erro => {
          console.log(erro); 
          res.status(500).jsonp(erro)
       })
 });

router.get('/find/:name', function(req, res, next) {
    Grupos.find(req.params.name)
       .then(dados => {
            res.jsonp(dados)
       })
       .catch(erro => {
           console.log(erro); 
           res.status(500).jsonp(erro)
        })
  })

router.get('/:id/members', function(req, res, next) {
  Grupos.getGrupoMembers(req.params.id)
     .then(dados => {
          res.jsonp(dados)
     })
     .catch(erro => {
         console.log(erro); 
         res.status(500).jsonp(erro)
      })
});

router.get('/:id/requests', function(req, res, next) {
    Grupos.getPedidosGrupo(req.params.id)
       .then(dados => {
            res.jsonp(dados)
       })
       .catch(erro => {
           console.log(erro); 
           res.status(500).jsonp(erro)
        })
});
  

router.get('/:id/posts', function(req, res, next) {
   Grupos.getGrupoPosts(req.params.id)
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

router.post('/:id/requests', function(req, res, next) {
    Grupos.creatRequest(req.body)
          .then(dados => {
              res.jsonp(dados)
          })
          .catch(erro => {
              res.status(500).jsonp(erro)
          })
 })

router.post('/:id/members', function(req, res, next) {
   Grupos.acceptRequest(req.body)
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

router.delete('/requests/:idRequest', function(req, res, next) {
    Grupos.deleteRequest(req.params.idRequest)
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
