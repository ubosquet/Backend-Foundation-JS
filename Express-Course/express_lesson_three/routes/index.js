var express = require('express');
var router = express.Router();
var users = require('../models/user');




/* GET home page. */
router.get('/person/:id', function(req, res, next) {
  let person = users.people.find(peep => {
    return peep.id === parseInt(req.params.id);
  });
  res.render('index', { person });
  console.log(req.url);
});

module.exports = router;
