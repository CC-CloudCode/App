var express = require('express');
var router = express.Router();
var Posts = require('../controllers/posts')

/*
-> Posts (Zod)

     -> GET:


  - posts/ (Todos os posts)

	- posts/:id (Toda a informação relativa a um post)

	- posts/:id/comments (Todos os comentários de um post)

	- posts/:id/upvotes (Todos os utilizadores que deram upvote num post)

      -> POST:

         - posts/ (Inserção de um post)

	 - posts/:id/upvotes (Inserção de um upvote)

      -> PUT:

	 - posts/:id (Update de um post)

      -> DELETE:

	 - posts/:id (Eliminação de um post)

	 - posts/upvotes/:id (Eliminação de um upvote)

   */

/* GET Posts */
router.get('/', function(req, res, next) {
  Posts.getPosts(req.params.id)
     .then(dados => {
          res.jsonp(dados)
     })
     .catch(erro => {
         console.log(erro);
         res.status(500).jsonp(erro)
      })
});

/* GET Post */
router.get('/:id', function(req, res, next) {
  Posts.getPost(req.params.id)
     .then(dados => {
          res.jsonp(dados)
     })
     .catch(erro => {
         console.log(erro);
         res.status(500).jsonp(erro)
      })
});

/* GET all comments from a specific Post */
router.get('/:id/comments', function(req, res, next) {
  Posts.getPostComments(req.params.id)
     .then(dados => {
          res.jsonp(dados)
     })
     .catch(erro => {
         console.log(erro);
         res.status(500).jsonp(erro)
      })
});

/* GET all upvotes from a specific Post */
router.get('/:id/upvotes', function(req, res, next) {
  Posts.getPostUpvotes(req.params.id)
     .then(dados => {
          console.log(req.body)
          res.jsonp(dados)
     })
     .catch(erro => {
         //console.log(erro);
         res.status(500).jsonp(erro)
      })
});


/* POST new Post. */
router.post('/', function(req, res, next) {
  Posts.createPost(req.body)
        .then(dados => {
            res.jsonp(dados)
        })
        .catch(erro => {
            res.status(500).jsonp(erro)
        })
})


/* POST upvotes into specific post. */
router.post('/:id/upvotes', function(req, res, next) {
  Posts.createUpvotes(req.body)
        .then(dados => {
            res.jsonp(dados)
        })
        .catch(erro => {
            res.status(500).jsonp(erro)
        })
})

/* PUT Update Post. */
router.put('/:id', function(req, res, next) {
  Posts.updatePost(req.params.id,req.body)
        .then(dados => {
            res.jsonp(dados)
        })
        .catch(erro => {
            res.status(500).jsonp(erro)
        })
})

/* DELETE a specific Post. */
router.delete('/:id', function(req, res, next) {
  Posts.deletePost(req.params.id)
        .then(dados => {
            res.jsonp(dados)
        })
        .catch(erro => {
            res.status(500).jsonp(erro)
        })
})

/* DELETE Upvote from specific post. */
router.delete('/:id/upvotes/:idupvote', function(req, res, next) {
  Posts.deleteUpvote(req.params.id, req.body.idupvote)
        .then(dados => {
            res.jsonp(dados)
        })
        .catch(erro => {
            res.status(500).jsonp(erro)
        })
})

module.exports = router;