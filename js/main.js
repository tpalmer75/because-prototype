$(document).ready(function() {

	var mainFrame = $('.mainframe');
	var wayfinder = $('.wayfinder');

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
		// Slide the wayfinder
		wayfinder.css('left', placement);

		// Multiply the data value by four (mainframe is 400% wide)
		var screenSlide ='-' + $(this).data('left') * 4 + '%';
		// Slide the mainframe
		mainFrame.css('left', screenSlide);

		filterContainer.removeClass('show');

		columnControl();

	});

	// Function to remove all top bar controls
	var clearTopBar = function(){$('.top-controls').removeClass('show');};

	// Single cause view

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

	// Filter checkboxes
	var filterBox = $('#filter .checkbox');

	// When checkbox is clicked
	filterBox.click(function() {

		var checkMark = $(this).find('.icon');
		// If it's visible
		if (checkMark.is(':visible')) {
			// Hide it
			checkMark.fadeOut(100);
		} else {
			// Show it
			checkMark.fadeIn(100);
		}
	});

	// Swipe recognition with touchSwipe.js	
	mainFrame.swipe( { swipeLeft:swipe1, swipeRight:swipe2, allowPageScroll:"vertical" });

	// Function for swiping left
	function swipe1(swipe, direction, distance, duration, fingerCount) {
			 // Find how far left the mainFrame is
			var currentLeft = parseInt($('.mainframe')[0].style.left);

			var wayfinderLeft = parseInt($('.wayfinder')[0].style.left);

			// For swipe left
			if (currentLeft < 400) {
				// Set the new left
				var newLeft = currentLeft - 100;
				// Apply
				mainFrame.css('left', newLeft + '%');
				// Set the new left for the wayfinder
				var newWayfinderLeft = wayfinderLeft + 25;
				// Apply
				wayfinder.css('left', newWayfinderLeft + '%');

				columnControl();
			}
		};

	// Function for swiping right
	function swipe2(swipe, direction, distance, duration, fingerCount) {
			 // Find how far left the mainFrame is
			var currentLeft = parseInt($('.mainframe')[0].style.left);

			var wayfinderLeft = parseInt($('.wayfinder')[0].style.left);

			// For swipe right
			if (currentLeft < 0) {
				// Set the new left
				var newLeft = currentLeft + 100;
				// Apply
				mainFrame.css('left', newLeft + '%');
				// Set the new left for the wayfinder
				var newWayfinderLeft = wayfinderLeft - 25;
				// Apply
				wayfinder.css('left', newWayfinderLeft + '%');

				columnControl();
			}
		};

	var columnControl = function() {
		var currentPosition = parseInt(mainFrame[0].style.left);
		var topBar = $('.top-bar');
		var container = $('.container');

		clearTopBar();

		if (currentPosition == 0) {
			$('.top-create').addClass('show');
		} else if (currentPosition == -100) {
			if($('.cause-summary').is(':visible')) {
				$('.top-singleview').addClass('show');
			} else {
				$('.top-mainfeed').addClass('show');
			}
		} else {
			
		}
	};

	// Create cause slides
	$('.col-1 form button.step-1').click(function(e) {
		e.preventDefault();
		$('.create-2').css('left','0');

		clearTopBar();

		$('.top-controls.top-create-2').addClass('show');
	});
});