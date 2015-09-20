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
				$("p#flightId").html(flight[0].flightID + "<br>" + flight[1].flightID);
				$("p#airline").html(flight[0].airline + "<br>" + flight[1].airline);
				$("p#fltno").html(flight[0].fltno + "<br>" + flight[1].fltno);
				
			});
		},
		error: function(xhr, textStatus, errorThrown) {
			return textStatus;
		}
	});
});
