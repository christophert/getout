//query backend API


var processingAJAX = 
	

$.ajax({
	type: "GET",
	url: "http://aggregate.gogogogo.co/yolo/yolo/5/rochester/pittsburgh",
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
		$("#tag_holder div:nth-of-type(2)").ready(function() {
			// $("p#name")
		});
	},
	error: function(xhr, textStatus, errorThrown) {
		return textStatus;
	}
});


	$.ajax({
		type: "GET",
		url: "http://aggregate.gogogogo.co/yolo/yolo/"
	})
})
