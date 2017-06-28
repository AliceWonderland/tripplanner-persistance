'use strict';
/* global $ tripModule attractionsModule hotels restaurants activities */

/**
 * This module fills the `select` tags with `option`s.
 * It runs immediately upon document ready (not called by other modules).
 * Each `option` displays the name of an attraction and is has a value of
 * that attraction's id. Selecting an option looks up the attraction by id,
 * then tells the trip module to add the attraction.
 */

var hotels, restaurants, activities;
$(function(){


// HOTELS
    $.ajax({
        method: 'get',
        url: '/api/hotels'
    })
        .then(function (responseData) {
            console.log('data is received! ', responseData);
            hotels=responseData;
            hotels.forEach(makeOption, $hotelSelect);

        })
        .catch(function (errorObj) {
            console.log("Something wrong with Hotels AJAX");
        });


// RESTAURANTS
    $.ajax({
        method: 'get',
        url: '/api/restaurants'
    })
        .then(function (responseData) {
            console.log('data is received! ', responseData);
            restaurants=responseData;
            restaurants.forEach(makeOption, $restaurantSelect);
        })
        .catch(function (errorObj) {
            console.log("Something wrong with Restaurants AJAX");
        });

// ACTIVITIES
    $.ajax({
        method: 'get',
        url: '/api/activities'
    })
        .then(function (responseData) {
            console.log('data is received! ', responseData);
            activities=responseData;
            activities.forEach(makeOption, $activitySelect);
        })
        .catch(function (errorObj) {
            console.log("Something wrong with Activities AJAX");
        });


  // jQuery selects
  var $optionsPanel = $('#options-panel');
  var $hotelSelect = $optionsPanel.find('#hotel-choices');
  var $restaurantSelect = $optionsPanel.find('#restaurant-choices');
  var $activitySelect = $optionsPanel.find('#activity-choices');

  // make all the option tags (second arg of `forEach` is a `this` binding)
  // hotels.forEach(makeOption, $hotelSelect);
  // restaurants.forEach(makeOption, $restaurantSelect);
  // activities.forEach(makeOption, $activitySelect);

  function makeOption (databaseAttraction) {
    var $option = $('<option></option>') // makes a new option tag
      .text(databaseAttraction.name)
      .val(databaseAttraction.id);
    this.append($option); // add the option to the specific select
  }

  // what to do when the `+` button next to a `select` is clicked
  $optionsPanel.on('click', 'button[data-action="add"]', function () {
    var $select = $(this).siblings('select');
    var type = $select.data('type'); // from HTML data-type attribute
    var id = $select.find(':selected').val();
    // get associated attraction and add it to the current day in the trip
    var attraction = attractionsModule.getByTypeAndId(type, id);
    tripModule.addToCurrent(attraction);
  });

});
