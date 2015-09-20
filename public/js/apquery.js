//query backend API


$("#tag_holder div:nth-of-type(1)").ready(function() {
	$.ajax({
		type: "GET",
		url: "/api/flights/"
	})
	$("p#flightId").html()
}
