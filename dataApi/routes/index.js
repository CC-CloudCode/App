var express = require('express');
var router = express.Router();
var exemplo = require('../controllers/exemplo')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
