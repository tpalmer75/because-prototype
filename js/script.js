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
		// Set the data value as a variable
		var placement = $(this).data('left')+'%';
		var wayfinder = $('.wayfinder');
		// Slide the wayfinder
		wayfinder.css('left', placement);

		// Multiply the data value by four (mainframe is 400% wide)
		var screenSlide ='-' + $(this).data('left') * 4 + '%';
		var mainFrame = $('.mainframe');
		// Slide the mainframe
		mainFrame.css('left', screenSlide);

		filterContainer.removeClass('show');

	});

	// Function to remove all top bar controls
	var clearTopBar = function(){$('.top-controls').removeClass('show');};

	// ========================================
	// Single cause view
	// ========================================

	var cause = $('.cause-trigger');

	cause.click(function() {
		if ($(this).next('.cause-summary').is(':hidden')) {
			// Hide all other causes
			$(this).siblings().not(this).slideUp(200);
			// Scroll up to top to maintain view
			$('body,html').animate({
	            scrollTop: 0
	        }, 200);
			// Show the cause information
	        $(this).next('.cause-summary').slideDown(200);
	        // Remove all controls from top bar
	        clearTopBar();
	        // Add single view control in top bar
	        $('.top-controls.top-singleview').addClass('show');
	    }
	});

	var backFromCause = $('.top-singleview .back-button');
	var openSummary = $('.cause-summary');

	backFromCause.click(function() {
		openSummary.slideUp(200);
		// Remove all controls from top bar
		clearTopBar();
		// Put the main feed controls back
		$('.top-controls.top-mainfeed').addClass('show');

		$('.cause-frame').slideDown(200);
	});

	// Changed sign button colors on click, and +1
	$('.cause-button').click(function(e) {

		$(this).toggleClass('signed');
		e.preventDefault();

		var signatures = $(this).parents('.cause-summary').prev('.cause-frame').find('.signatures h4');
		var signaturesButton = signatures.parents('.signatures');
		var currentNumber = signatures.text();

		if ($(this).hasClass('signed')) {
			// Bump the number up
			currentNumber ++;
			signatures.text(currentNumber);

			signaturesButton.addClass('highlight').delay(800).removeClass('highlight');
		} else {
			// Bump the number down
			currentNumber --;
			signatures.text(currentNumber);
		}
	});

	// Show signatures pictures
	$('.signatures').click(function(e) {
		$(this).parents('.cause-frame').next('.cause-summary').find('.signature-view').toggleClass('show');
	});

});