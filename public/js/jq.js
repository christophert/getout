jQuery(document).ready(function() {
    $("#trigger").click(function(e){
        e.preventDefault();
        var location = document.getElementsByName('input')[0].value;
        var numOfDays = document.getElementsByName('input')[1].value;
        $("#trigger").attr("onclick","location.herf='/plan?days=' +  numOfDays + '&to=' + location");
    });
    
});