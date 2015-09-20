//query backend API


var processingAJAX = $.ajax({
		type: "GET",
		url: "http://aggregate.gogogogo.co/yolo/yolo/5/rochester/pittsburgh",
		timeout: 10000,
		success: function(r) {
			return r;
		},
		error: function(xhr, textStatus, errorThrown) {
			return textStatus;
		}
});
	
$("#tag_holder div:nth-of-type(1)").ready(function() {
	console.log(processingAJAX);
	var fltsegment = processingAJAX.responseJSON.flights[0]['tripSegment'][0];
	$("p#flightId").html(fltsegment[0].airline + " " + fltsegment[0].fltno);
});
