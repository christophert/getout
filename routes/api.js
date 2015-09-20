var express = require('express');
var _ = require('lodash');
var router = express.Router();
var request = require('request');
var configuration = require('../config.json');

router.get('/flights/:from/:to/:start/:end', function(req, res, next) {
	var leaveFrom = req.params.from;
	var goTo = req.params.to;
	var start = req.params.start;
	var end = req.params.end;
	
	var parsedBody;
	var jsonUrl = 'http://static.letsgo.woooooo.science/flights/outbound.json';
	
	function parseBody(err, resp, body) {
		if(!err && resp.statusCode == 200) {
			parsedBody = JSON.parse(body)["airSearchRsp"];
			var sliceMap = parsedBody["sliceMap"];
			var segmentMap = parsedBody["segmentMap"];
			
			var segments = _.map(segmentMap, function(segment) {
				return {
					'flightID': segment.uniqueSegId,
					'arrival': segment.arrivalDateTime,
					'depart': segment.departDateTime,
					'origin': segment.origAirport,
					'dest': segment.destAirport,
					'airline': segment.marketingAirline,
					'fltno': segment.flightNumber,
					'aircraft': segment.equipmentCode,
					'duration': segment.duration
				}
			});
			
			var flights = _.map(sliceMap, function(slice) {
				
				
				var fullSegment = [];
				var flightduration = 0;
				for (var i = 0; i < slice.segment.length; i++) {
					var applicableSegments = _.filter(segments, {'flightID': slice.segment[i].uniqueSegId});
					fullSegment.push(applicableSegments);
					applicableSegments.forEach(function(element) {
						flightduration += element.duration;
					}, this);
				}
				return {
					'layoverTime': slice.duration - flightduration,
					'tripSegment': fullSegment
				}
			});
			
			//console.log(flights);
			
			// sliceMap.forEach(function(entry) {
			// 	var fullSegment = [];
			// 	entry["segment"].forEach(function(flight) {
			// 		fullSegment.push(segmentMap[flight.uniqueSegId]);
			// 	});
			// 	flights.push(fullSegment);
			// });
			res.json(flights);
		}
	}
	
	request(jsonUrl, parseBody);
});

//Query http link
//  receive JSON
//    parse usable data into js array
router.get('/hotels/:coordinates/:start/:end', function(req, res, next) {
	var coordinates = req.params.coordinates;
	var start = req.params.start;
	var end = req.params.end;
	var searchRes = [];
	var hotel;
	var cityID;

	request('http://priceline.com/api/hotelretail/listing/v3/'+coordinates+'/'+start+'/'+end+'/1/50?minStars=3&sort=2', function(error, response, body){
		var hotelResp = JSON.parse(body);
		
		var sortedPrice = hotelResp["priceSorted"];
		var firstElement = hotelResp[sortedPrice[0]];
		res.send({
			'name': firstElement.hotelName,
			'price': firstElement.merchPrice,
			'overallRating': firstElement.overallRatingScore,
			'address': firstElement.address,
			'image': firstElement.thumbnailURL,
			'amenities': firstElement.amenities
		});
	});

});

router.get('/places/:loc/:query', function(req, res, next) {
	var loc = req.params.loc;
	var query = req.params.query;
	var place = [];
	var rand;
	
	function getPhoto(photoRef) {
		request('http://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference='+photoRef+'&key='+configuration.gmaps.API_KEY, function(error, response, body){
			return body;
		});		
	};
	
	request('https://maps.googleapis.com/maps/api/place/textsearch/json?query='+query+' in '+loc+"&key="+configuration.gmaps.API_KEY, function(error, response, body){
			var stuff = JSON.parse(body)["results"];
			rand = Math.floor(Math.random() * stuff.length);
			// console.log(rand + " length of array is " + stuff.length);
			console.log(stuff[rand]);
			res.send({
				'name': stuff[rand].name,
				'address': stuff[rand].formatted_address,
				'image': getPhoto(stuff[rand]["photos"].photo_reference)
			});
	});

});

module.exports = router;
