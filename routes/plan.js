var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('plan', { title: 'Paln your trip!' });
});

module.exports = router;