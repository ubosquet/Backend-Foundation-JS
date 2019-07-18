var express = require('express');
var router = express.Router();
var story = require('../models/storyLine');

/* GET home page. */
router.get('/begin/:storyPart', function(req, res, next) {
  let begin1 = story.storyLine.find( beg => {
    return beg.storyPart === req.params.storyPart;
  });

  res.render('beginning', { begin1 });
});


/* Middle part of the story*/
router.get('/middle/:storyPart', function(req, res, next) {

  let middle1 = story.storyLine.find( midd => {
    return midd.storyPart === req.params.storyPart;
  });

  res.render('middle', { middle1 });
});

/* End part of the story*/
router.get('/end/:storyPart', function(req, res, next) {

  let end1 = story.storyLine.find( end1 => {
    return end1.storyPart === req.params.storyPart;
  });

  res.render('end', { end1 });
});

module.exports = router;
