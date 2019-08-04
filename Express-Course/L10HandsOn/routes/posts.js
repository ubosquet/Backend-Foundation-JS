var express = require('express');
var router = express.Router();
const mysql = require('mysql2');
var models = require('../models');
var authService = require('../services/auth');


/*router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  }); */

router.get('/', function(req, res, next){
   let token = req.cookies.jwt;
   if (token) {
    authService.verifyUser(token).then(user => {
        if (user) {
            models.posts.findAll({
                where : {UserId : user.UserId, Deleted: false}
            }).then (result => res.render("posts", {posts : result}))
        } else {
            res.send ('User not able to be authenticated . Please Login');
        }
    }

    )} else{
        res.redirect('/users/errorLogin');
    }
});

// Writing a new POST
router.post("/", function(req, res, next) {
    let token = req.cookies.jwt;
    if (token) {
      authService.verifyUser(token).then(user => {
        if (user) {
          models.posts
            .findOrCreate({
              where: {
                UserId: user.UserId,
                PostTitle: req.body.postTitle,
                PostBody: req.body.postBody
              }
            })
            .spread((result, created) => res.redirect("/posts"));
        } else {
          res.status(401);
          res.send("Invalid authentication token");
        }
      });
    } else {
      res.status(401);
      res.send("Must be logged in");
    }
  });
/*
router.delete('/:id', function(req, res, next){
    let token = req.cookies.jwt;
    if (token){
        authService.verifyUser(token).then (user => {
            if (user){
                let postId = parseInt(req.params.id);
                models.posts.update( {Deleted : true},
                    {
                    where : {PostId : postId}
                    }
                ).then(res.redirect('posts'))
                .catch(error => {
                    res.status(400);
                    res.send("error deleting post");
                  });
            }

        })
        
    } else {
        res.redirect('/users/errorLogin')
    }
   
}); */
       
        

router.delete("/:id", function(req, res, next) {
  let postId = parseInt(req.params.id);
  models.posts
    .update(
      { Deleted: true },
      {
        where: { PostId: postId }
      }
    )
    .then(result => res.redirect("/"));
});

/*router.post('/', function(req,res, next){
    let token = req.cookies.jwt;
    if (token) {
     authService.verifyUser(token).then(user => {
         if (user) {
             models.posts.findOrCreate({
                 where : {UserId : user.UserId },
                 default : { 
                     PostTitle : req.body.postTitle,
                     PostBody : req.body.postBody
                 }
             }) .spread(function(result, created) {
                if (created) {
                  res.redirect('/posts');  
                } else {
                  
                  res.send('Error . Post has not been created');
                }
              });
     } 
    });
}  else{
    res.redirect('/users/profile');
}
});*/







module.exports = router;