var express = require('express');
var router = express.Router();
var Users = require('../controllers/users')

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

/* GET an user. */
router.get('/:id/posts', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });

// Get router.get(rota, function(req, res, next){});
// Post router.post(rota, function(req, res, next){});
// Put router.put(rota, function(req, res, next){});
// Delete router.delete(rota, function(req, res, next){});

module.exports = router;