jQuery(document).ready(function() {
    var location = document.getElementsByName('input')[0].value;
    var numOfDays = document.getElementsByName('input')[1].value;
    $("#trigger").click().attr("onclick","location.herf='/plan?days=' +  numOfDays + '&to=' + location;");
});