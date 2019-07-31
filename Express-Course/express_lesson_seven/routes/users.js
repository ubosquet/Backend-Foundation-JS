var express = require('express');
var router = express.Router();
var models = require('../models');
var passport = require('../services/passport')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
  
router.get('/signup', function(req, res, next) {
  res.render('signup');
});
  
router.post('/signup', function(req, res, next) {
  models.users
    .findOrCreate({
      where: {
        Username: req.body.username
      },
      defaults: {
        FirstName: req.body.firstName,
        LastName: req.body.lastName,
        Email: req.body.email,
        Password: req.body.password
      }
    })
    .spread(function(result, created) {
      if (created) {
        res.redirect('login');  
      } else {
        res.send('This user already exists');
      }
    });
});
/*
router.get('/profile/:id', function (req, res, next) {
  models.users
    .findByPk(parseInt(req.params.id))
    .then(user => {
      if (user) {
        res.render('profile', {
          FirstName: user.FirstName,
          LastName: user.LastName,
          Email: user.Email,
          Username: user.Username
        });
      } else {
        res.send('User not found');
      }
    });
});
*/
router.get('/profile', function (req, res, next) {
  if (req.user) {
    models.users
      .findByPk(parseInt(req.user.UserId))
      .then(user => {
        if (user) {
          res.render('profile', {
            FirstName: user.FirstName,
            LastName: user.LastName,
            Email: user.Email,
            Username: user.Username
          });
        } else {
          res.send('User not found');
        }
      });
  } else {
    res.redirect('/users/login');
  }
});

router.get('/login', function(req, res, next) {
  res.render('login')
});

router.post('/login', passport.authenticate('local', {
  failureRedirect: '/users/login'
  }),
  function (req, res, next) {
    res.redirect('profile');
});

/* //
router.post('/login', function(req, res, next) {
  models.users
    .findOne({
      where: {
        Username: req.body.username,
        Password: req.body.password
      }
    })
    .then(user => {
      if (user) {
        res.redirect('profile/' + user.UserId); 
      } else {
        res.send('Invalid login!');
      }
    });
});
*/

module.exports = router;