var express = require('express');
var router = express.Router();
const mysql = require('mysql2');
var models = require('../models');

/* GET FILMS page. */


router.get('/', function (req, res, next) {
    models.film
      .findAll({
        attributes: ['film_id', 'title', 'description','release_year','rating'],
        include: [{
          model: models.actor,
          attributes: ['actor_id', 'first_name', 'last_name']
        }]
      })
      .then(filmsFound => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(filmsFound));
      });
  });
  
  router.get('/:id', function(req, res, next) {
    models.film
      .findByPk(parseInt(req.params.id), { 
        include: [{ model: models.actor }]
      })
      .then(filmsFound => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(filmsFound));
      })
  });
  
  
  router.put("/:id", function (req, res, next) {
    let filmId = parseInt(req.params.id);
    models.film
      .update(req.body, { where: { film_id: filmId } })
      .then(result => res.redirect('/films/' + filmId))
      .catch(err => {
        res.status(400);
        res.send("There was a problem updating the Film.  Please check the information provided.");
      });
  });

module.exports = router;