var express = require('express');
var router = express.Router();
var staticModels = require('../staticModels/planets');

router.get('/staticPlanets', function (req, res, next) {

  res.send(JSON.stringify(
    staticModels.planet
  ));
});

router.get('/starTrekPlanets', function (req, res, next) {
  var planets = [
    {id: 1, name: "Q'onoS", numberOfMoons: 1 },
    {id: 2, name: "Vulcan", numberOfMoons: 0 },
    {id: 3, name: "Earth", numberOfMoons: 1 },
    {id: 4, name: "Rator III", numberOfMoons: 0 }
  ];
res.send(JSON.stringify(planets));

});

module.exports = router;