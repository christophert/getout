var express = require('express');
var router = express.Router();
var request = require('request');
var _ = require('lodash');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


//Query http link
//  receive JSON
//    parse usable data into js array
router.get('/hotels/:state/:city', function(req, res, next) {
	var city = req.params.city;
	var state = req.params.state;
	var searchRes = [];
	var hotel;
	var cityID;

	request('http://www.priceline.com/svcs/ac/index/hotels/'+city, function(error, response, body){
		searchRes = JSON.parse(body)["searchItems"];		
		//cityID = _.pluck(_.filter(searchRes, {'stateCode': state}), 'cityID')[0];//getting dat cityID

		request('http://priceline.com/api/hotelretail/listing/v3/?cityId='+cityID+"&minStars=3&sort=2", function(error, response, body){
			searchRes = JSON.parse(body)["hotels"][0]; //first element should be cheapest hotel w/ at least 3 stars
			
		});
	});

});

module.exports = router;
