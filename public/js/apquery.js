//query backend API

var getUrlParam = function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}

var fromLoc = "ithaca"
var to = getUrlParam('loc');
var howlong = getUrlParam('time');

$.ajax({
	type: "GET",
	url: "https://aggregate.gogogogo.co/yolo/yolo/"+howlong+"/"+fromLoc+"/"+to,
	//url: "https://aggregate.gogogogo.co/yolo/yolo/5/rochester/pittsburgh",
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
		var eat = r.places.food[0];
		$("#tag_holder div:nth-of-type(3)").ready(function() {
			$("p#fname").html(eat.name);
			$("p#faddress").html(eat.address);
		});
		
		var poi = r.places.poi[0];
		$("#tag_holder div:nth-of-type(4)").ready(function() {
			$("p#pname").html(poi.name);
			$("p#paddress").html(poi.address);
		});
		
		var eat2 = r.places.food[1];
		$("#tag_holder div:nth-of-type(6)").ready(function() {
			$("p#fname1").html(eat2.name);
			$("p#faddress1").html(eat2.address);
		});
		
		var poi2 = r.places.poi[1];
		$("#tag_holder div:nth-of-type(7)").ready(function() {
			$("p#pname1").html(poi2.name);
			$("p#paddress1").html(poi2.address);
		});
		
		var eat3 = r.places.food[2];
		$("#tag_holder div:nth-of-type(8)").ready(function() {
			$("p#fname2").html(eat3.name);
			$("p#faddress2").html(eat3.address);
		});
		var cost = r.totalCost;
		$("p#price").ready(function() {
			$("p#price").html(cost);
		})
		
	},
	error: function(xhr, textStatus, errorThrown) {
		return textStatus;
	}
});


