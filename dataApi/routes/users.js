var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs')
const fs = require('fs')
var multer = require('multer')
var upload = multer({dest: 'uploads/'})
var Users = require('../controllers/users');
const User = require('../controllers/users');

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

/* GET find user by username. */
router.get('/find/:username', function(req, res, next) {
    Users.find(req.params.username)
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

/* GET user balance. */
router.get('/:id/balance', function(req, res, next) {
    Users.getUserBalance(req.params.id)
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

/* GET user feed. */
router.get('/:id/feed', function(req, res, next){
    User.getFeedFromUser(req.params.id)
        .then(dados => {
            res.jsonp(dados)
        })
        .catch(erro => {
            res.status(500).jsonp(erro)
        })
})

/* GET user feed. */
router.get('/:id/groups', function(req, res, next){
    User.getGroupsFromUser(req.params.id)
        .then(dados => {
            res.jsonp(dados)
        })
        .catch(erro => {
            res.status(500).jsonp(erro)
        })
})


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

/* GET user follow requests. */
router.get('/:id/followrequests', function(req, res, next) {
    Users.getFollowRequests(req.params.id)
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
        .then(id => {
            fs.copyFile(__dirname + '/../public/images/default-user.png', __dirname + '/../public/images/'+id, (err) => {
                if (err) throw err;
              });
            res.jsonp(id)
        })
        .catch(erro => {
            res.status(500).jsonp(erro)
        })
})



/* POST user login. */
router.post('/login', function(req, res, next) {
    var user = req.body
    Users.login(req.body.email)
       .then(dados => {
            var result = {
                login : false,
                message : "Utilizador não existe."
            }
            if(dados.length != 0){
                if(bcrypt.compareSync(user.password, dados[0].password)){
                    Users.getUser(dados[0].iduser)
                         .then(user =>{
                            result.login = true
                            result.message = "Credenciais corretas."
                            result.user = user
                            res.jsonp(result)
                         })
                         .catch(error => res.status(500).jsonp(error))
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

/* POST create follow request */
router.post('/followrequests', function(req, res, next) {
    Users.createFollowRequest(req.body.requester, req.body.requested)
          .then(dados => {
              res.jsonp(dados)
          })
          .catch(erro => {
              res.status(500).jsonp(erro)
          })
})


/* POST accept a follow request */
router.post('/followrequests/:id', function(req, res, next) {
    Users.acceptFollowRequest(req.params.id, req.body.requester, req.body.requested)
          .then(dados => {
              res.jsonp(dados)
          })
          .catch(erro => {
              res.status(500).jsonp(erro)
          })
})

/* POST new user follower. */
router.post('/:id/followers', function(req, res, next) {
    Users.createFollower(req.params.id, req.body.id)
          .then(dados => {
              res.jsonp(dados)
          })
          .catch(erro => {
              res.status(500).jsonp(erro)
          })
})

// POST Inserir imagem de perfil
router.post('/:id/fotoPerfil', upload.single('ficheiro'), function(req, res){

    let oldPath = __dirname + '/../'+req.file.path
    let newPath = __dirname + '/../public/images/'
    let iduser = req.params.id
    //let type = name.split(".")[1] 
  
    newPath = newPath + iduser;
  
    fs.copyFile(oldPath, newPath, function(err){
      if(err) throw err
      fs.unlinkSync(oldPath);
      res.jsonp(1)
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

/* PUT Change acoount privacy. */
router.put('/:id/privacy', function(req, res, next) {
    Users.updatePrivateAccount(req.params.id)
          .then(dados => {
              res.jsonp(dados)
          })
          .catch(erro => {
              res.status(500).jsonp(erro)
          })
})

/* PUT Update user balance(negative when he have to take money from the user). */
router.put('/:id/balance', function(req, res, next) {
    Users.updateBalance(req.params.id, req.body.balance)
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

/* DELETE Delete a follow request. */
router.delete('/followrequests/:id', function(req, res, next) {
    Users.deleteFollowRequest(req.params.id)
          .then(dados => {
              res.jsonp(dados)
          })
          .catch(erro => {
              res.status(500).jsonp(erro)
          })
})

/* DELETE Delete a follow user. */
router.delete('/:id/followers', function(req, res, next) {
    Users.deleteFollower(req.params.id, req.query.me)
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