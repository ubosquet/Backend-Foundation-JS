var express = require('express');
var router = express.Router();
const mysql = require('mysql2');
var models = require('../models');
var authService = require('../services/auth');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Create new user if one doesn't exist
router.get('/signup', function(req, res, next) {
  res.render('signup')
});

router.post('/signup', function(req, res, next) {
  models.users
    .findOrCreate({
      where: {
        Username: req.body.Username
      },
      defaults: {
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Email: req.body.Email,
        Password: authService.hashPassword(req.body.Password)
      }
    })
    .spread(function(result, created) {
      if (created) {
        res.redirect('login');  
      } else {
        
        res.send('This user already exists Please Login instead');
      }
    });
});


// Login user and return JWT as cookie
router.get('/login', function(req, res, next) {
  res.render('login')
});

router.post('/login', function (req, res, next) {
  models.users.findOne({
    where: {
      Username: req.body.Username
    }
  }).then(user => {
    if (!user) {
      res.send('User not found')
     } else  {
       let passwordMatch = authService.comparePasswords(req.body.Password, user.Password);
       if (passwordMatch){
      let token = authService.signUser(user); // <--- Uses the authService to create jwt token
      res.cookie('jwt', token); // <--- Adds token to response as a cookie
      res.redirect('profile');
       } else {
         res.send('Wrong Password');
       }
    } 
  });
});



// Profile that loads all the Posts from the authenticated user.
router.get('/profile', function (req, res, next) {
  let token = req.cookies.jwt;
  if (token){
  authService.verifyUser(token)
       .then(user => {
         if (user) {
          models.users
          .findAll({
            where: {userId: user.UserId },
            include : [{ model: models.posts}]
          }) 
          .then(result => {
            console.log(result);
            res.render("profile", {user: result[0] });
          });
        } else {
          res.status(401);
          res.send("Invalid auth token");
        }
      });
    } else {
      res.status(401);
      res.send("must be logged in");
    }
  });


router.get('/errorLogin', function(req,res, next){
  res.render('errorLogin');
});

router.get('/logout', function (req, res, next) {
  res.cookie('jwt', "", { expires: new Date(0) });
  res.send('Logged out');
  });


  router.get('/admin', function(req,res, next){
    let token = req.cookies.jwt;
    if (token){
      authService.verifyUser(token).then(user => {
        if (user.Admin) {
          models.users.findAll({ where: {Deleted: false}, raw : true})
          .then(usersFound => res.render('admin', {users: usersFound}));
        } else {
          res.send('User must be admin to view this Page');
        }

      });

    } else {
      res.send("must be logged in");
    }
  });

  router.get('/admin/editUser/:id', function(req, res, next){
    let token = req.cookies.jwt;
    if (token){
      authService.verifyUser(token).then(user => {
        if (user.Admin) {
          let userId = parseInt(req.params.id);
          models.users.findAll(
            {where : {UserId : userId},
            include : [{ model: models.posts}]}
            
          )
          .then(usersFound => res.render('editUser', {users: usersFound[0]}));
        } else {
          res.send('User must be admin to view this Page');
        }

      });

    } else {
      res.send("must be logged in");
    }

  });


  router.delete('/profile/:id', function(req,res,next){


    // Add can delte users and Posts user to profile
});
  
/*
// Load a user per User ID
router.get('/profile/:id',auth.verifyUser, function (req, res) {
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
*/
module.exports = router;
