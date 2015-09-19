jQuery(document).ready(function() {
    jQuery('#trigger').on('click', function(e)  {
 
        // Show/Hide Tabs
        jQuery('#sub').fadeOut(400);
        jQuery('#sub').addClass('hidden');
        jQuery('form:first-of-type').removeClass('hidden');
		jQuery('form:first-of-type').delay(1200).fadeIn(1200);
        e.preventDefault();
    });
});