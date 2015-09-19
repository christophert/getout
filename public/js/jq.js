jQuery(document).ready(function() {
    jQuery('#trigger').on('click', function(e)  {
 
        // Show/Hide Tabs
        jQuery('#sub').fadeOut(2000);
        jQuery('#sub').addClass('hidden');
        jQuery('form:first-of-type').removeClass('hidden');
		jQuery('form:first-of-type').delay(400).fadeIn(1200);
        e.preventDefault();
    });
});