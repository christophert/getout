var express = require('express');
var _ = require('lodash');
var router = express.Router();
var request = require('request');
var moment = require('moment');
var configuration = require('../config.json');

router.get('/flights/:from/:to/:start/:end/:limit', function(req, res, next) {
	var leaveFrom = req.params.from;
	var goTo = req.params.to;
	var start = req.params.start;
	var end = req.params.end;
	var limit = req.params.limit;
	
	var parsedBody;
	var jsonUrl = 'http://static.letsgo.woooooo.science/flights/outbound.json';
	var endpointUrl = 'https://www.priceline.com/pws/v0/air/search/'+leaveFrom+'-'+goTo+'-'+start+'/'+goTo+'-'+leaveFrom+'-'+end+'/1';
	
	function parseBody(err, resp, body) {
		if(!err && resp.statusCode == 200) {
			parsedBody = JSON.parse(body)["airSearchRsp"];
			var sliceMap = parsedBody["sliceMap"];
			var segmentMap = parsedBody["segmentMap"];
			var itineraryPricing = parsedBody["pricedItinerary"];
			
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
			
			var itineraries = _.map(itineraryPricing, function(itinerary) {
				return {
					'id': itinerary.slice[0].uniqueSliceId,
					'fare': itinerary.pricingInfo.totalFare
				};
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
					'id': slice.uniqueSliceId,
					'layoverTime': slice.duration - flightduration,
					'cost': _.filter(itineraries, {'id': slice.uniqueSliceId})[0].fare,
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
			if(limit > 0) {
				res.json(_.slice(flights, 0, limit));
			} else {
				res.json(flights);
			}
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
	if(start instanceof undefined || end instanceof undefined)
		return -1;

	request('http://priceline.com/api/hotelretail/listing/v3/'+coordinates+'/'+start+'/'+end+'/1/50?minStars=3&minGuestRating=6&sort=2', function(error, response, body){
		if(!error && response.statusCode == 200) {
			var hotelResp = JSON.parse(body);
			
			var sortedPrice = hotelResp["priceSorted"];
			var availableHotels = [];
			for(var i = 0; i < sortedPrice.length; i++) {
				if(hotelResp["hotels"][sortedPrice[i]].remainingRooms > 0) {
					availableHotels.push(sortedPrice[i]);
				}
			}
			var firstElement = hotelResp["hotels"][availableHotels[0]];
			res.send({
				'name': firstElement.hotelName,
				'price': firstElement.merchPrice,
				'overallRating': firstElement.overallRatingScore,
				'address': firstElement.address,
				'image': firstElement.thumbnailURL,
				'amenities': firstElement.amenities
			});
		}
	});

});

router.get('/places/:loc/:query', function(req, res, next) {
	var loc = req.params.loc;
	var query = req.params.query;
	var rand;
	
	request('https://maps.googleapis.com/maps/api/place/textsearch/json?query='+query+' in '+loc+"&key="+configuration.gmaps.API_KEY, function(error, response, body){
			if(!error && response.statusCode == 200 && response.status!="ZERO") {
				var ret = []
				var stuff = JSON.parse(body)["results"];
				rand = Math.floor(Math.random() * stuff.length);
				// console.log(rand + " length of array is " + stuff.length);
				while(stuff[rand] && ret.length < 3){
					ret.push({
						'name': stuff[rand].name,
						'address': stuff[rand].formatted_address,
						'icon': stuff[rand].icon
					});
					rand = Math.floor(Math.random() * stuff.length);
				}
				res.send(ret);
			} else {
				res.send({
					'status': 'ERR_NORESULT'
				});
			}
	});

});

router.get('/uber/:startLat/:startLon/:endLat/:endLon', function(req, res, next){
	var startLat = req.params.startLat;
	var startLon = req.params.startLon;
	var endLat = req.params.endLat;
	var endLon = req.params.endLon;		
	
	request('https://api.uber.com/v1/estimates/price?start_latitude='+startLat+'&start_longitude='+startLon+'&end_latitude='+endLat+'&end_longitude='+endLon+'&server_token='+configuration.uber.API_KEY, function(error, response, body){
			if(!error && response.statusCode == 200 && typeof JSON.parse(body)["prices"][0] != 'undefined'){
				console.log(error + " " + response + " " + body);
				var rideInfo = JSON.parse(body)["prices"];
				console.log(rideInfo);
				res.send({
					'name': rideInfo[0].display_name,
					'costEstimate': rideInfo[0].estimate,
					'duration': rideInfo[0].duration
				});
			}
			else if(JSON.parse(body)["prices"].length == 0){
				res.send({
					'available': 0
				});
			} 
	});
});

module.exports = router;
