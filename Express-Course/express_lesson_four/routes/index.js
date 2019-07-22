const express = require('express');
var router = express.Router();
const mysql = require('mysql');


/* GET home page. */

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '$3Renity',
  database: 'sakila',
  insecureAuth : true
  }
);

connection.connect(function(err) {
  if (err) {
    console.error(err.message);
    return;
  }
  console.log('Yay! You are connected to the database!');
});



router.get('/actor/:id', function(req, res, next) {
  let actorId = parseInt(req.params.id);
  console.log(actorId);

  let idQuery= `SELECT * FROM actor WHERE actor_id=${actorId}`
  connection.query(idQuery, (err,result) =>{

      if (err){
        console.log(err.message);
        next();
        return;
      }
      
      if (result.length > 0){
        res.render('index',{actor: result[0]});
      }
      else{
        res.send('not a Valid Id')
      }
  });
});

const actorList = `SELECT * from actor`;
router.get('/actor', function(req, res, next) {
connection.query(actorList, function(err, result){
    res.render('actor', {actors: result});
  });

});

router.post('/actor', function(req, res, next) {
  //add code here
  console.log(req.body);
  const newActor = { 
    first_name: req.body.first_name,
    last_name: req.body.last_name
  };

  const selectActor = `
    SELECT *
    FROM actor
    WHERE first_name = '${newActor.first_name}'
    AND last_name = '${newActor.last_name}'`;

  connection.query(selectActor, function(err, result) {
    if (result.length > 0) {
      res.send('Sorry, that actor already exists');
    } else {
      let newActorQuery = `INSERT INTO actor(first_name, last_name) 
        VALUES('${newActor.first_name}', '${newActor.last_name}')`;

      connection.query(newActorQuery, function(err, insertResult) {
        if (err) {
          res.render('error',{message:'Oops, something went wrong'});
        } else {
          res.redirect('/actor');
        }
      });
    }
  });

});

module.exports = router;
