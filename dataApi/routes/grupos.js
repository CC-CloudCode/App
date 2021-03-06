var express = require('express');
var router = express.Router();
var Grupos = require('../controllers/grupos')
var passport = require('passport')
const fs = require('fs')
var multer = require('multer')
var upload = multer({dest: 'uploads/'})


/* GET grupos. */
router.get('/', passport.authenticate('jwt', {session: false}), function(req, res, next) {
   Grupos.getGroups()
     .then(dados => {
          res.jsonp(dados)
     })
     .catch(erro => {
         console.log(erro); 
         res.status(500).jsonp(erro)
      })
});

router.get('/:id', passport.authenticate('jwt', {session: false}), function(req, res, next) {
   Grupos.getGroup(req.params.id)
      .then(dados => {
           res.jsonp(dados)
      })
      .catch(erro => {
          console.log(erro); 
          res.status(500).jsonp(erro)
       })
 });

router.get('/find/:name', passport.authenticate('jwt', {session: false}), function(req, res, next) {
    Grupos.find(req.params.name)
       .then(dados => {
            res.jsonp(dados)
       })
       .catch(erro => {
           console.log(erro); 
           res.status(500).jsonp(erro)
        })
  })

router.get('/:id/members', passport.authenticate('jwt', {session: false}), function(req, res, next) {
  Grupos.getGrupoMembers(req.params.id)
     .then(dados => {
          res.jsonp(dados)
     })
     .catch(erro => {
         console.log(erro); 
         res.status(500).jsonp(erro)
      })
});

router.get('/:id/requests', passport.authenticate('jwt', {session: false}), function(req, res, next) {
    Grupos.getPedidosGrupo(req.params.id)
       .then(dados => {
            res.jsonp(dados)
       })
       .catch(erro => {
           console.log(erro); 
           res.status(500).jsonp(erro)
        })
});
  

router.get('/:id/posts', passport.authenticate('jwt', {session: false}), function(req, res, next) {
   Grupos.getGrupoPosts(req.user.user.iduser, req.params.id)
      .then(dados => {
           res.jsonp(dados)
      })
      .catch(erro => {
          console.log(erro); 
          res.status(500).jsonp(erro)
       })
 });

router.post('/', passport.authenticate('jwt', {session: false}), function(req, res, next) {
   Grupos.createGrupo(req.body)
         .then(id => {
                fs.copyFile(__dirname + '/../public/images/groups/default-group.png', __dirname + '/../public/images/groups/'+id, (err) => {
                    if (err) throw err;
                });
                res.jsonp(id)
         })
         .catch(erro => {
             res.status(500).jsonp(erro)
         })
})

router.post('/:id/requests', passport.authenticate('jwt', {session: false}), function(req, res, next) {
    Grupos.createRequest(req.body)
          .then(dados => {
              res.jsonp(dados)
          })
          .catch(erro => {
              res.status(500).jsonp(erro)
          })
 })

 router.post('/:id/member', passport.authenticate('jwt', {session: false}), function(req, res, next) {
    Grupos.creatMember({idgroup: req.params.id, iduser: req.body.iduser, isAdmin: req.body.isAdmin})
          .then(dados => {
              res.jsonp(dados)
          })
          .catch(erro => {
              res.status(500).jsonp(erro)
          })
 })
 

router.post('/:id/members', passport.authenticate('jwt', {session: false}), function(req, res, next) {
   Grupos.acceptRequest(req.body)
         .then(dados => {
             res.jsonp(dados)
         })
         .catch(erro => {
             res.status(500).jsonp(erro)
         })
})

// POST Inserir imagem de perfil
router.post('/:id/fotoPerfil', passport.authenticate('jwt', {session: false}), upload.single('ficheiro'), function(req, res){

    let oldPath = __dirname + '/../'+req.file.path
    let newPath = __dirname + '/../public/images/groups/'
    let idgroup = req.params.id
    //let type = name.split(".")[1] 
  
    newPath = newPath + idgroup;
  
    fs.copyFile(oldPath, newPath, function(err){
      if(err) throw err
      fs.unlinkSync(oldPath);
      res.jsonp(1)
    })
  
  })


router.put('/:id', passport.authenticate('jwt', {session: false}), function(req, res, next) {
   Grupos.updateGroup(req.params.id, req.body)
         .then(dados => {
             res.jsonp(dados)
         })
         .catch(erro => {
             res.status(500).jsonp(erro)
         })
})

router.put('/:id/admin', passport.authenticate('jwt', {session: false}), function(req, res, next) {
    Grupos.putMembroAdmin(req.params.id, req.body.iduser)
          .then(dados => {
              res.jsonp(dados)
          })
          .catch(erro => {
              res.status(500).jsonp(erro)
          })
 })

router.delete('/:id', passport.authenticate('jwt', {session: false}), function(req, res, next) {
   Grupos.deleteGroup(req.params.id)
         .then(dados => {
             res.jsonp(dados)
         })
         .catch(erro => {
             res.status(500).jsonp(erro)
         })
})

router.delete('/requests/:idRequest', passport.authenticate('jwt', {session: false}), function(req, res, next) {
    Grupos.deleteRequest(req.params.idRequest)
          .then(dados => {
              res.jsonp(dados)
          })
          .catch(erro => {
              res.status(500).jsonp(erro)
          })
 })

router.delete('/:id/members', passport.authenticate('jwt', {session: false}), function(req, res, next) {
   Grupos.deleteMember(req.params.id, req.query.iduser)
         .then(dados => {
             res.jsonp(dados)
         })
         .catch(erro => {
             res.status(500).jsonp(erro)
         })
})


module.exports = router;
