var express = require('express');
var router = express.Router();

/* GET home page. */

let animals = ['pig', 'giraffe','monkey','aligator', 'goat', 'dog', 'cat'];

router.get('/', function(req, res, next) {

res.render('index');
});

router.post('/', function(req, res, next) {
  let bodyAnimal = req.body;
  if (animals.includes(bodyAnimal.animal)) {
    res.send('Already have a ' + bodyAnimal.animal + ' thanks.');
  } else {
    animals.push(bodyAnimal.animal);
    res.send(animals);
  }
});


module.exports = router;
