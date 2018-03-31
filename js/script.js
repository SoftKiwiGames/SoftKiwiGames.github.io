var $ = jQuery.noConflict();//if there are 2 jQuery files this helps for no conflict error

$(document).ready(function($) {
	"use strict";


	/********************** Isotope Manipulation ******************/

	var winDow = $(window);
	// Needed variables
	var $container=$('.portfolio-box, .blog-box');
	var $filter=$('.filter');

	try{
		$container.imagesLoaded( function(){
			$container.show();
			$container.isotope({
				filter:'*',
				layoutMode:'masonry',
				animationOptions:{
					duration:700,
					easing:'linear'
				}
			});
		});
	} catch(err) { }

	winDow.bind('resize', function(){
		var selector = $filter.find('a.active').attr('data-filter');

		try {
			$container.isotope({
				filter	: selector,
				animationOptions: {
					duration: 700,
					easing	: 'linear',
					queue	: false,
				}
			});
		} catch(err) { }
		return false;
	});

	// Isotope Filter
	$filter.find('a').click(function(){
		var selector = $(this).attr('data-filter');

		try {
			$container.isotope({
				filter	: selector,
				animationOptions: {
					duration: 700,
					easing	: 'linear',
					queue	: false,
				}
			});
		} catch(err) {

		}
		return false;
	});


	var filterItemA	= $('.filter li a');

	filterItemA.on('click', function(){
		var $this = $(this);
		if ( !$this.hasClass('active')) {
			filterItemA.removeClass('active');
			$this.addClass('active');
		}
	});

	/********************** Preloader Manipulation *******************/
	var body = $('body');
	body.addClass('active');

	// winDow.load( function(){
	// 	var mainDiv = $('#container'),
	// 		preloader = $('.preloader');

	// 		preloader.fadeOut(200, function(){
	// 			mainDiv.delay(200).addClass('active');
	// 			body.delay(200).css('background', '#00be9b');
	// 		});
	// });

	/********************* Flexslider Manipulation ****************/
	try {

		var flexsliderContainer = $('.flexslider');

		flexsliderContainer.flexslider({
			animation: "fade",
			slideshowSpeed: 4000,
		});
	} catch(err) {

	}

	/********************** Header Height Manipulation ****************/
	var content = $('#content');
	content.imagesLoaded( function(){
		var bodyHeight = $(window).outerHeight(),
		containerHeight = $('.inner-content').outerHeight(),
		headerHeight = $('header');

		if( bodyHeight > containerHeight ) {
			headerHeight.css('height',bodyHeight);
		} else {
			headerHeight.css('height',containerHeight);
		}
	});

	winDow.bind('resize', function(){
		var bodyHeight = $(window).outerHeight(),
		containerHeight = $('.inner-content').outerHeight(),
		headerHeight = $('header');

		if( bodyHeight > containerHeight ) {
			headerHeight.css('height',bodyHeight);
		} else {
			headerHeight.css('height',containerHeight);
		}
	});

	/********************** Filter toggle ********************/

	var toggleFilter = $('.filter-toggle'),
		toggleContent = $('.filter-content');

		toggleFilter.on('click', function(e){
			e.preventDefault();

			if ( !$(this).hasClass('active') ) {
				$(this).addClass('active');
				toggleContent.addClass('active');
			} else {
				$(this).removeClass('active');
				toggleContent.removeClass('active');
			}
		});

	/********************** Google Map *************************/
	var contact = {"lat":"44.26", "lon":"26.06"};//HERE YOU CAN CHANGE THE COORDINATES

	var image = "http://zudent.com/adoraCreative2/images/marker.png";

	try {

		var myOptions = {
		    zoom: 10,
		    center: new google.maps.LatLng(contact.lat, contact.lon),
		    mapTypeId: google.maps.MapTypeId.ROADMAP,
		    styles: [{"featureType":"water","stylers":[{"visibility":"on"},{"color":"#acbcc9"}]},{"featureType":"landscape","stylers":[{"color":"#f2e5d4"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#c5c6c6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#e4d7c6"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#fbfaf7"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#c5dac6"}]},{"featureType":"administrative",
"stylers":[{"visibility":"on"},{"lightness":33}]},{"featureType":"road"},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{},{"featureType":"road","stylers":[{"lightness":20}]}]
		};

		var map = new google.maps.Map(document.getElementById('map'), myOptions);


				var marker = new google.maps.Marker({
					position: new google.maps.LatLng(contact.lat, contact.lon),
					map: map,
					icon: image
				});

	} catch(err) {

	}

	/********************** Magnific-popup *************************/

	try {
		var popupImage = $('.zoom');
		popupImage.magnificPopup({
			type: 'image'
		});
	} catch(err) { }

	/********************** Testimonial *************************/
	try{
		var testimonialsContainer = $('.testimonial ul');

		testimonialsContainer.quovolver({
			transitionSpeed:280,
			autoPlay:true
		});
	}catch(err){ }


	/************************* Menu Responsive *************************/
	var menuClick = $('a.menu-toggle'),
		navbarVertical = $('.menu-content');

	menuClick.on('click', function(e){
		e.preventDefault();

		if( navbarVertical.hasClass('active') ){
			navbarVertical.slideUp(300).removeClass('active');
		} else {
			navbarVertical.slideDown(300).addClass('active');
		}
	});

	winDow.bind('resize', function(){
		if ( winDow.width() > 768 ) {
			navbarVertical.slideDown(300).removeClass('active');
		} else {
			navbarVertical.slideUp(300).removeClass('active');
		}
	});

	/********************** Contact Form *************************/

	var submitContact = $('#submit_contact'),
		message = $('#msg');

	submitContact.on('click', function(e){
		e.preventDefault();

		var $this = $(this);

		$.ajax({
			type: "POST",
			url: 'contact.php',
			dataType: 'json',
			cache: false,
			data: $('#contact-form').serialize(),
			success: function(data) {

				if(data.info !== 'error'){
					$this.parents('form').find('input[type=text],textarea,select').filter(':visible').val('');
					message.hide().removeClass('success').removeClass('error').addClass('success').html(data.msg).fadeIn('slow').delay(5000).fadeOut('slow');
				} else {
					message.hide().removeClass('success').removeClass('error').addClass('error').html(data.msg).fadeIn('slow').delay(5000).fadeOut('slow');
				}
			}
		});
	});

});
