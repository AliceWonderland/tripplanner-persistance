var db = require('./_db');

var Place = require('./place');
var Hotel = require('./hotel');
var Restaurant = require('./restaurant');
var Activity = require('./activity');

Day.belongsTo(Hotel);
Day.belongsToMany(Restaurants,{through:day_restaurant});
Day.belongsToMany(Activity,{through:day_activity});

module.exports = {
	db,
	Place,
	Hotel,
	Restaurant,
	Activity
};