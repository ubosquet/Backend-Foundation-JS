var express = require('express');
var router = express.Router();

/* GET home page. */

let flowers = ['Daisy', 'Bleeding Heart','Hydrangea','Amaryllis', 'Dahlia', 'Daffodil'];

router.get('/', function(req, res, next) {

  let bodyGarden = req.query.flower;
  if (flowers.includes(bodyGarden.flower)) {
    res.send('Yes, we have ' + bodyGarden.flower + ' in our garden.');
  }
  else {
    res.send(' Nope, We do not have '+ bodyGarden.flower + ' in our Garden, but maybe we should plant it!')
  }

});

router.post('/', function(req, res, next) {
  let bodyGarden = req.body;
  if (flowers.includes(bodyGarden.flower)) {
    res.send('We already have that flower, no need to add it');
  } else {
    flowers.push(bodyGarden.flower);
    res.send(flowers);
  }
});




module.exports = router;
