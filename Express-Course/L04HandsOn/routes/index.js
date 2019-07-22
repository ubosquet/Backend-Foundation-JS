var express = require('express');
var router = express.Router();
var mysql = require('mysql');


/* Database connection */
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '$3Renity',
  database: 'sakila'
});

/* GET home page. */
router.get('/film', function(req, res, next) {
  let filmQuery = `SELECT * FROM film`;

  connection.query(filmQuery, function(err, result) {
    if (err) {
      console.log(err);
      res.render('error', { message: err.message });
    } else {
      res.render('film.hbs', { films: result });
    }
  });
});

router.get('/film/:id', function(req, res, next) {
  let filmId = parseInt(req.params.id);
  let filmActorQuery = `
    SELECT film.title, actor.first_name, actor.last_name
    FROM film INNER JOIN film_actor ON film.film_id = film_actor.film_id
    INNER JOIN actor ON film_actor.actor_id = actor.actor_id
    WHERE film.film_id = ${filmId}
  `;

  connection.query(filmActorQuery, function(err, result) {
    if (err) {
      res.render('error', { message: err.message });
    } else {
      console.log(result);
      res.render('filmDetails', { 
        filmTitle: result[0].title, 
        films: result
      });  
    }
  });
});

module.exports = router;
