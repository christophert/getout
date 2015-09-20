//query backend API


var processingAJAX = 
	
$("#tag_holder div:nth-of-type(1)").ready(function() {
	$.ajax({
		type: "GET",
		url: "http://aggregate.gogogogo.co/yolo/yolo/5/rochester/pittsburgh",
		timeout: 10000,
		success: function(r) {
			console.log(r.flights[0]);
			$.each(r.flights[0].tripSegment, function(i, flight) {
				console.log(flight);
				$("p#flightId").html(flight[0].flightID);
				$("p#airline").html(flight[0].airline);
				$("p#fltno").html(flight[0].fltno);
				
			});
		},
		error: function(xhr, textStatus, errorThrown) {
			return textStatus;
		}
	});
});
