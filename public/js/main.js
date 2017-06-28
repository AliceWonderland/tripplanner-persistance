'use strict';
/* global $ tripModule */

$(tripModule.load);

$.ajax({
  method: 'get',
  url: '/api/hotels' // e.g. for POST requests
})


.then(function (responseData) {
  console.log('data is received! ', responseData)

  // var output="<ul>";
  // $.each(responseData, function(idx, val){
  //   output+="<li>"+ val.name +"</li>";
  // });
  // output="</ul>";
  // $('#testing').html(output);



  var output="<ul>";
  $.each(responseData, function(idx, val){
    output+="<li>"+ val.name +"</li>";
  });
  output+="</ul>";
  $('#testing').append(output);


});

