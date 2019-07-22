var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var models = require('../models');
var Sequelize = require('sequelize');
var op = Sequelize.Op;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/actors', function(req,res, next){

    models.actor.findAll({
        
    }).then(actorsFound => {
      res.render('actors', { actors: actorsFound})
    });
});


router.get('/actor/:id', function(req,res, next){

  let actorId = parseInt(req.params.id);
  models.actor.findOne({

    where : {
      actor_id : actorId
    }
  })
  .then ( actor => {
    res.render('specificActor', {actor : actor})
  });


  });

  router.post('/actor', (req, res) => {
    models.actor
      .findOrCreate({
        where: {
          first_name: req.body.first_name,
          last_name: req.body.last_name
        }
      })
      .spread(function(result, created) {
        if (created) {
          res.redirect('/actors');
        } else {
          res.send('This actor already exists!');
        }
      });
  });

  router.get('/actor/:id', function(req,res, next){

    let actorId = parseInt(req.params.id);
    models.category.findOne({
  
      where : {
        actor_id : actorId
      }
    })
    .then ( category => {
      res.render('specificActor', {actor : actor})
    });
  });

module.exports = router;
