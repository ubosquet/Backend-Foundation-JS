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


router.get('/category', function(req,res, next){

  models.category.findAll({
      
  }).then(categoryFound => {
    res.render('category', { category: categoryFound})
  });
});



router.post('/addcategory', (req, res) => {
  models.category
    .findOrCreate({
      where: {
        name: req.body.name,
        default_price: parseFloat(req.body.default_price)
      }
    })
    .spread(function(result, created) {
      if (created) {
        res.redirect('/addcategory');
      } else {
        res.send('This category already exists!');
      }
    });
});


router.get('/specificCategory/:id', function(req,res, next){

 let categoryId = parseInt(req.params.id);
  models.category.findOne({

    where : {
      category_id : categoryId
    }
  })
  .then ( category => {
    res.render('specificCategory', {category : category})
  });
});

module.exports = router;
