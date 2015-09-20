//query backend API

	

$.ajax({
	type: "GET",
	url: "https://aggregate.gogogogo.co/yolo/yolo/5/rochester/pittsburgh",
	timeout: 10000,
	success: function(r) {
		console.log(r);
		var tripsegment = r.flights[0].tripSegment;
		$("#tag_holder div:nth-of-type(1)").ready(function() {
			$("p#flightId").html(tripsegment[0][0].flightID);
			$("p#airline").html(tripsegment[0][0].airline);
			$("p#fltno").html(tripsegment[0][0].fltno);
			$("p#depart").html(tripsegment[0][0].depart);
			$("p#arrival").html(tripsegment[1][0].arrival);
			
		});
		var hotel = r.hotel;
		$("#tag_holder div:nth-of-type(2)").ready(function() {
			$("p#name").html(hotel.name);
			$("p#overallRating").html(hotel.overallRating);
			$("p#addressLine1").html(hotel.address.addressLine1);
			$("p#cityName").html(hotel.address.cityName);
			$("p#stateCode").html(hotel.address.stateCode);
		});
		var eat = r.places.food;
		$("#tag_holder div:nth-of-type(3)").ready(function() {
			$("p#fname").html(eat.name);
			$("p#faddress").html(eat.address);
		});
		var poi = r.places.poi;
		$("#tag_holder div:nth-of-type(4)").ready(function() {
			$("p#pname").html(poi.name);
			$("p#paddress").html(poi.address);
		});
	},
	error: function(xhr, textStatus, errorThrown) {
		return textStatus;
	}
});
