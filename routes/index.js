var Promise = require('bluebird');
var router = require('express').Router();
var Hotel = require('../models').Hotel;
var Restaurant = require('../models').Restaurant;
var Activity = require('../models').Activity;
var Day = require('../models').Day;

router.get('/', function(req, res, next) {
  Promise.all([
    Hotel.findAll(),
    Restaurant.findAll(),
    Activity.findAll()
  ])
  .spread(function(dbHotels, dbRestaurants, dbActivities) {
    res.render('index', {
      templateHotels: dbHotels,
      templateRestaurants: dbRestaurants,
      templateActivities: dbActivities
    });
  })
  .catch(next);
});

router.get('/api/hotels', function(req, res, next){

  Hotel.findAll({})
  .then(everything => {
    res.json(everything);
  })


})

router.get('/api/restaurants', function(req, res, next){
  Restaurant.findAll({})
  .then(everything => {
    res.send(everything);
  })
})

router.get('/api/activities', function(req, res, next){
  Activity.findAll({})
  .then(everything => {
    res.send(everything);
  })
})


router.get('/api/days', function(req, res, next){
  Day.findAll({})
  .then(everything => {
    res.send(everything);
  })
})



module.exports = router;
