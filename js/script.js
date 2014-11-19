$(document).ready(function() {

	// Detect touch screens and add class to HTML
    var is_touch_device = 'ontouchstart' in document.documentElement;

    if (is_touch_device) {
    	$('html').addClass('touch');
    } else {
    	$('html').addClass('no-touch');
    }

	// Scroll detection
	var lastScrollTop = 0;
	var bottomBar = $('.bottom-bar');

	$(window).scroll(function(event){
	   var st = $(this).scrollTop();
	   if (st > lastScrollTop && st > 10){
	       // down scroll code
	       bottomBar.addClass('hide');
	   } else {
	      // up scroll code
	      bottomBar.removeClass('hide');
	   }
	   lastScrollTop = st;
	});

	// Filter toggle

	var filterButton = $('.filter-button');
	var filterContainer = $('#filter')

	filterButton.click(function(e) {
		filterContainer.toggleClass('show');
		e.preventDefault();
	});

	// Bottom bar wayfinder movement

	var bottomTrigger = $('.bottom-bar .section')

	bottomTrigger.click(function() {
		var placement = $(this).data('left');
		var wayfinder = $('.wayfinder');

		wayfinder.css('left', placement);
	});

});