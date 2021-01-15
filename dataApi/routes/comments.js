var express = require('express');
var router = express.Router();
var Comments = require('../controllers/comments')
var passport = require('passport')

/* --------------------------- GETS ---------------------------*/
router.get('/:id', passport.authenticate('jwt', {session: false}), function(req, res, next) {
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
router.post('/', passport.authenticate('jwt', {session: false}), function(req, res, next) {
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
router.put('/:id', passport.authenticate('jwt', {session: false}), function(req, res, next) {
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
router.delete('/:id', passport.authenticate('jwt', {session: false}), function(req, res, next) {
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