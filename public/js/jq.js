jQuery(document).ready(function() {
    $("#next").submit(function(e){
        e.preventDefault();
        var serializedData = $(this).serialize();
        $.ajax({
            type: "POST",
            url: "http://aggregate.gogogogo.co/",
            data: serializedData,
            dataType: "json",
            timeout: 10000,
            cache: false,
            success: function(r) {
                // console.log(r){
            }
        });
    });
    var location = document.getElementsByName('input')[0].value;
    var numOfDays = document.getElementsByName('input')[1].value;
    $("#trigger").attr("onclick","'/plan?days=' +  numOfDays + '&to=' + location");
});