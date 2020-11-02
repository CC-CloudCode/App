var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs')
var Users = require('../controllers/users')

/*
-> Users (Luisinho)

      -> GET

      -> POST

      -> PUT

	- users/:id (Update de um utilizador)

	- users/:id/password (Update da password de um utilizador)

      -> DELETE
	
	- users/:id (Remoção de um utilizador)

	- users/:id/followers (Remoção de um seguidor)

*/


/* GET an user. */
router.get('/:id', function(req, res, next) {
    Users.getUser(req.params.id)
       .then(dados => {
            res.jsonp(dados)
       })
       .catch(erro => {
           console.log(erro); 
           res.status(500).jsonp(erro)
        })
});

/* GET user bets. */
router.get('/:id/bets', function(req, res, next) {
    Users.getBetsFromUser(req.params.id)
         .then(dados => {
             res.jsonp(dados)
         })
         .catch(erro => {
             res.status(500).jsonp(erro)
         })
  });

/* GET user posts. */
router.get('/:id/posts', function(req, res, next) {
    Users.getPostsFromUser(req.params.id)
         .then(dados => {
            res.jsonp(dados)
         })
         .catch(erro => {
            res.status(500).jsonp(erro)
         })
  });

/* GET user followers. */
router.get('/:id/followers', function(req, res, next) {
    Users.getFollowersFromUser(req.params.id)
         .then(dados => {
            res.jsonp(dados)
         })
         .catch(erro => {
            res.status(500).jsonp(erro)
         })
  });

/* GET user following. */
router.get('/:id/following', function(req, res, next) {
    Users.getFollowingFromUser(req.params.id)
         .then(dados => {
            res.jsonp(dados)
         })
         .catch(erro => {
            res.status(500).jsonp(erro)
         })
  });

/* GET user public posts. */
router.get('/:id/posts/publics', function(req, res, next) {
    Users.getPublicPostsFromUser(req.params.id)
         .then(dados => {
            res.jsonp(dados)
         })
         .catch(erro => {
            res.status(500).jsonp(erro)
         })
  });


/* POST new user. */
router.post('/', function(req, res, next) {
  Users.createUser(req.body)
        .then(dados => {
            res.jsonp(dados)
        })
        .catch(erro => {
            res.status(500).jsonp(erro)
        })
})

/* POST user login. */
router.post('/login', function(req, res, next) {
    var user = req.body
    Users.login(req.body)
       .then(dados => {
            var result = {
                login : false,
                message : "Utilizador não existe."
            }
            if(dados.length != 0){
                if(bcrypt.compareSync(user.password, dados[0].password)){
                    result.login = true
                    result.message = "Credenciais corretas."
                    result.utilizador = dados[0]
                    res.jsonp(result)
                }
                else{
                    result.message = "Password errada."
                    res.jsonp(result)
                }
            }
            else {res.jsonp(result)}
            
       })
       .catch(erro => {
           console.log(erro); 
           res.status(500).jsonp(erro)
        })
});

/* POST new user. */
router.post('/:id/followers', function(req, res, next) {
    Users.createFollower(req.params.id, req.body.id)
          .then(dados => {
              res.jsonp(dados)
          })
          .catch(erro => {
              res.status(500).jsonp(erro)
          })
})

/* PUT Update user. */
router.put('/:id', function(req, res, next) {
    Users.updateUser(req.params.id, req.body)
          .then(dados => {
              res.jsonp(dados)
          })
          .catch(erro => {
              res.status(500).jsonp(erro)
          })
})

/* PUT Update user password. */
router.put('/:id/password', function(req, res, next) {
    Users.updatePassword(req.params.id, req.body.password)
          .then(dados => {
              res.jsonp(dados)
          })
          .catch(erro => {
              res.status(500).jsonp(erro)
          })
})

/* DELETE Delete user. */
router.delete('/:id', function(req, res, next) {
    Users.deleteUser(req.params.id)
          .then(dados => {
              res.jsonp(dados)
          })
          .catch(erro => {
              res.status(500).jsonp(erro)
          })
})

/* DELETE Delete user. */
router.delete('/:id/followers', function(req, res, next) {
    Users.deleteUser(req.params.id, req.body.id)
          .then(dados => {
              res.jsonp(dados)
          })
          .catch(erro => {
              res.status(500).jsonp(erro)
          })
})



// Get router.get(rota, function(req, res, next){});
// Post router.post(rota, function(req, res, next){});
// Put router.put(rota, function(req, res, next){});
// Delete router.delete(rota, function(req, res, next){});

module.exports = router;