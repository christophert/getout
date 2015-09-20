jQuery(document).ready(function() {
    $("form").submit(function(e){
        var clicked = $(e.target);
        var location = document.getElementsByName('input')[0].value;
        var numOfDays = document.getElementsByName('input')[1].value;
        if(clicked) {
            (document).load(/plan.js? + numberOfDays + '&to=' + location);
        }
    });
});