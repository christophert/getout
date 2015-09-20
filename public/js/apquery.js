//query backend API


var processingAJAX = 
	
$("#tag_holder div:nth-of-type(1)").ready(function() {
	$.ajax({
		type: "GET",
		url: "http://aggregate.gogogogo.co/yolo/yolo/5/rochester/pittsburgh",
		timeout: 10000,
		success: function(r) {
			console.log(r.flights);
			$.each(r.flights, function(i, flight) {
				console.log(flight);
			});
		},
		error: function(xhr, textStatus, errorThrown) {
			return textStatus;
		}
	});
});
