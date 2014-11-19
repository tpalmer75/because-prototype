$(document).ready(function() {


// Detect touch screens and add class to HTML
    var is_touch_device = 'ontouchstart' in document.documentElement;

    if (is_touch_device) {
    	$('html').addClass('touch');
    } else {
    	$('html').addClass('no-touch');
    }

//Scroll detection (doesn't work)
on.scroll(function() {
	alert('scroll');
});

});