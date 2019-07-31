var express = require('express');
var router = express.Router();
var models = require('../models');
var passport = require('../services/passport');

/* GET users listing. */

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


// Sign Up Area 
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

// GET method for Login view
router.get('/login', function(req, res, next) {
  res.render('login')
});

// POST Method for Login
router.post('/login', passport.authenticate('local', {
  failureRedirect: '/users/login'
  }),
  function (req, res, next) {
    res.redirect('profile');
});

// Profile area
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
          res.send('User not found at please check again or Register');
        }
      });
  } else {
    res.redirect('/users/login');
  }
});

// Load a user per User ID
router.get('/profile/:id',function (req, res) {
  if (req.user && req.user.Admin) {
    let userId = parseInt(req.params.id);
    models.users
            .findByPk(userId)
            .then( user => {
      res.render('profile', {
            FirstName: user.FirstName,
            LastName: user.LastName,
            Email: user.Email,
            Username: user.Username
          });

        });
        }
           else {
            res.redirect('/users/unauthorized');
          }
      });



// Show a list of users
router.get('/users', function(req, res, next) {
  if (req.user && req.user.Admin) {
    models.users
      .findAll({})
      .then(users => res.render('users', { users: users }));
  } else {
    res.redirect('/users/unauthorized');
  }
});


router.delete('/profile/:id', function(req, res, next) {
  if (req.user && req.user.Admin) {
    let userId = parseInt(req.params.id);
    models.users
      .update({ Deleted: true }, { where: { UserId: userId } })
      .then(result => res.redirect('/users'))
      .catch(error => {
        res.status(400);
        res.send("error deleting user");
      });
  } else {
    res.redirect("unauthorized");
  }
}); 






module.exports = router;
