//query backend API


jQuery("#tag_holder div:nth-of-type(1)").ready(function() {
	jQuery.ajax({
		type: "GET",
		url: "http://aggregate.gogogogo.co/yolo/yolo/5/rochester/pittsburgh",
		timeout: 10000,
		success: function(r) {
			console.log(r);
			// jQuery("p#flightId").html()
		}
	});
	// jQuery("p#flightId").html()
});
