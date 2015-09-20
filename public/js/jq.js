jQuery(document).ready(function() {
    jQuery('#trigger').on('click', function(e)  {
 
        // Show/Hide Tabs
        jQuery('#sub').fadeOut(2000);
        jQuery('#sub').addClass('hidden');
        jQuery('#sub1').delay(400).removeClass('hidden');
        jQuery('form:first-of-type').removeClass('hidden');
        jQuery('#trigger').attr('disabled', 'disabled');
		jQuery('form:first-of-type').delay(400).fadeIn(1200);
        e.preventDefault();
    });
    
    $("#next").click(function(){
        $("html").load("");
    });
    
    
});