var express = require('express');
var _ = require('lodash');
var router = express.Router();
var request = require('request');

router.get('/flights/:from/:to/:start/:end', function(req, res, next) {
	var leaveFrom = req.params.from;
	var goTo = req.params.to;
	var start = req.params.start;
	var end = req.params.end;
	
	var parsedBody;
	var jsonUrl = 'http://static.letsgo.woooooo.science/json.json';
	
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