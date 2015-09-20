//query backend API


$("#tag_holder div:nth-of-type(1)").ready(function() {
	$.ajax({
		type: "GET",
		url: "http://aggregate.gogogogo.co/yolo/yolo/5/rochester/pittsburgh",
		timeout: 2000,
		success: function(r) {
			console.log(r);
			// $("p#flightId").html()
		}
	});
	// $("p#flightId").html()
});
