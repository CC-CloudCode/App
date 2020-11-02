var express = require('express');
var router = express.Router();
var Comments = require('../controllers/comments')

/* --------------------------- GETS ---------------------------*/
router.get('/:id', function(req, res, next) {
  Comments.get(req.params.id)
  .then(dados => {
       res.jsonp(dados)
  })
  .catch(erro => {
      console.log(erro); 
      res.status(500).jsonp(erro)
   })
});


/* --------------------------- POSTS ---------------------------*/
router.post('/', function(req, res, next) {
  Comments.create(req.body)
  .then(dados => {
       res.jsonp(dados)
  })
  .catch(erro => {
      console.log(erro); 
      res.status(500).jsonp(erro)
   })
});


/* --------------------------- PUTS ---------------------------*/
router.put('/:id', function(req, res, next) {
  Comments.update(req.params.id,req.body)
  .then(dados => {
       res.jsonp(dados)
  })
  .catch(erro => {
      console.log(erro); 
      res.status(500).jsonp(erro)
   })
});


/* --------------------------- DELETES ---------------------------*/
router.delete('/:id', function(req, res, next) {
  Comments.remove(req.params.id)
  .then(dados => {
       res.jsonp(dados)
  })
  .catch(erro => {
      console.log(erro); 
      res.status(500).jsonp(erro)
   })
});

module.exports = router;