/*!
 * jQuery Cookie Plugin v1.3.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function(e){if(typeof define==="function"&&define.amd){define(["jquery"],e)}else{e(jQuery)}})(function(e){function n(e){return e}function r(e){return decodeURIComponent(e.replace(t," "))}function i(e){if(e.indexOf('"')===0){e=e.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\")}try{return s.json?JSON.parse(e):e}catch(t){}}var t=/\+/g;var s=e.cookie=function(t,o,u){if(o!==undefined){u=e.extend({},s.defaults,u);if(typeof u.expires==="number"){var a=u.expires,f=u.expires=new Date;f.setDate(f.getDate()+a)}o=s.json?JSON.stringify(o):String(o);return document.cookie=[s.raw?t:encodeURIComponent(t),"=",s.raw?o:encodeURIComponent(o),u.expires?"; expires="+u.expires.toUTCString():"",u.path?"; path="+u.path:"",u.domain?"; domain="+u.domain:"",u.secure?"; secure":""].join("")}var l=s.raw?n:r;var c=document.cookie.split("; ");var h=t?undefined:{};for(var p=0,d=c.length;p<d;p++){var v=c[p].split("=");var m=l(v.shift());var g=l(v.join("="));if(t&&t===m){h=i(g);break}if(!t){h[m]=i(g)}}return h};s.defaults={};e.removeCookie=function(t,n){if(e.cookie(t)!==undefined){e.cookie(t,"",e.extend({},n,{expires:-1}));return true}return false}});

jQuery(function($) {

	$.cookie.defaults.path = $('.sw-style').data('cookie-path');

	var sw;

	try {
		sw = $.parseJSON($.cookie('skywarrior')) || {};
	} catch (e) {
		sw = {};
	};

	// preserve demo data
	var persist = function(key, value) {
		sw[key] = value;

		// persist to cookie
		$.cookie('skywarrior', JSON.stringify(sw));
	};

	$('.sw-style .toggle, .style-heading').click(function() {
		$('.sw-style .selector').toggle();
		$('.sw-style .toggle').toggleClass('closed');

		persist('handle', ($('.sw-style .toggle').hasClass('closed') ? 'close' : null));
	});

	// change boxed/non-boxed
	$('.layout-style').change(function() {

		// boxed?
		if ($(this).val() == 'boxed') {
	       jQuery('.navbar-fixed-top').addClass('container');
	       jQuery('#metro-carousel-wrapper').addClass('container');
	       jQuery('footer .container').replaceWith(jQuery('footer .container').contents());
	       jQuery('footer').addClass('container');

		   jQuery('body').attr('style', function(i, style)
			{
			    return style.replace(/background[^;]+;?/g, '');
			});
		   jQuery('body').css("margin-top","20px");
		   jQuery('body .normal-page').css("padding","20px 30px");
		   jQuery('.logo-wrapper').addClass('container');
		   jQuery('.container').css("box-shadow",'0px 1px 3px rgba(0,0,0,0.5)');
		   jQuery('.container').css("background-color",'#202126');
			jQuery(".wrapper-carousel").each(function(){
		var carousel_id = jQuery(this).attr('id');
		var carousel_auto = jQuery(this).data('notauto')?false:true;
		//home page carousel
		topcarousel = jQuery(this).find(".carousel-content");
		if(topcarousel.length){
			visible = 0;
			align = false;
			tcarousel = topcarousel.carouFredSel({
				responsive  : false,
				items       : {
					visible	: function(visibleItems){
						if(visible>0){
							if(visibleItems>=3){
								return 5;
							}else{
								return 3;
							}
						}else{return visibleItems+1;}
					},
					minimum	: 1,
				},
				circular: true,
				infinite: true,
				onCreate: function (data) {

						jQuery('.carousel-content .multimedia-item img').css('visibility', 'visible');

				},
				width 	: "100%",
				auto 	: {
					play	: carousel_auto,
					timeoutDuration : 2600,
					duration        : 800,
					pauseOnHover: "immediate-resume"
				},
				align	: align,
				prev	: {
					button	: "#"+carousel_id+" .prev",
					key		: "left"
				},
				next	: {
					button	: "#"+carousel_id+" .next",
					key		: "right"
				},
				scroll : {
					items : 1,
					fx : "scroll",
					easing : 'quadratic',
					onBefore : function( data ) {
						jQuery(".multimedia-item").removeClass('current-carousel-item').removeClass('current-carousel-item2');
						var current_item_count=0;
						data.items.visible.each(function(){
							current_item_count++;
							if(current_item_count==2){jQuery(this).addClass( "current-carousel-item2" );}
							jQuery(this).addClass( "current-carousel-item" );
						});
					}
				},
				swipe       : {
					onTouch : false,
					onMouse : false,
				}
			})
			topcarousel.swipe({
				allowPageScroll : 'vertical',
				excludedElements:"",
				tap:function(event, target) {
					if( event.button == 2 ) {
						return false;
					}
					tapto = jQuery(target);
					if(tapto.attr('href')){
						window.location = tapto.attr('href');
					}else if(tapto.parent().attr('href')){
						window.location = tapto.parent().attr('href');
					}
					return true;
				},
				swipeStatus:function(event, phase, direction, distance, duration, fingers)
				{

				  if(phase=='move'){
					  if(direction=='left'||direction=='right'){
						  jQuery(this).css('transform','translateX('+(direction=='left'?'-':'')+distance+'px)');
					  }
				  }
				  if(phase=='end'){
					  item_to_next = distance>520?2:1;
					  direction_to_next = direction=='left'?'next':'prev';
					  if(distance>20){
					  	jQuery(this).trigger(direction_to_next,item_to_next);
					  }
					  jQuery(this).css('transform','translateX(0px)');
				  }
				}
			});
			jQuery(".carousel-content").trigger("currentVisible", function( current_items ) {
				var current_item_count=0;
				current_items.each(function(){
					current_item_count++;
					if(current_item_count==2){jQuery(this).addClass( "current-carousel-item2" );}
					jQuery(this).addClass( "current-carousel-item" );
				});
			});
		}

	});//each



		}
		else {
		   jQuery('.navbar-fixed-top').removeClass('container');
		   jQuery('#metro-carousel-wrapper').removeClass('container');
		   jQuery('footer').removeClass('container');
	       jQuery('footer').children().not('.copyright').wrapAll("<div class='container'></div>");

	       jQuery('body').css("background","#202126", "important");
	       jQuery('body').css("margin-top","0");
	       jQuery('body .normal-page').css("padding","0");
	       jQuery('.logo-wrapper').removeClass('container');
	       jQuery('.container').css("box-shadow",'none');
	       jQuery('.container').css("background-color",'transparent');

			jQuery(".wrapper-carousel").each(function(){
		var carousel_id = jQuery(this).attr('id');
		var carousel_auto = jQuery(this).data('notauto')?false:true;
		//home page carousel
		topcarousel = jQuery(this).find(".carousel-content");
		if(topcarousel.length){
			visible = 0;
			align = false;
			tcarousel = topcarousel.carouFredSel({
				responsive  : false,
				items       : {
					visible	: function(visibleItems){
						if(visible>0){
							if(visibleItems>=3){
								return 5;
							}else{
								return 3;
							}
						}else{return visibleItems+1;}
					},
					minimum	: 1,
				},
				circular: true,
				infinite: true,
				onCreate: function (data) {

						jQuery('.carousel-content .multimedia-item img').css('visibility', 'visible');

				},
				width 	: "100%",
				auto 	: {
					play	: carousel_auto,
					timeoutDuration : 2600,
					duration        : 800,
					pauseOnHover: "immediate-resume"
				},
				align	: align,
				prev	: {
					button	: "#"+carousel_id+" .prev",
					key		: "left"
				},
				next	: {
					button	: "#"+carousel_id+" .next",
					key		: "right"
				},
				scroll : {
					items : 1,
					fx : "scroll",
					easing : 'quadratic',
					onBefore : function( data ) {
						jQuery(".multimedia-item").removeClass('current-carousel-item').removeClass('current-carousel-item2');
						var current_item_count=0;
						data.items.visible.each(function(){
							current_item_count++;
							if(current_item_count==2){jQuery(this).addClass( "current-carousel-item2" );}
							jQuery(this).addClass( "current-carousel-item" );
						});
					}
				},
				swipe       : {
					onTouch : false,
					onMouse : false,
				}
			})
			topcarousel.swipe({
				allowPageScroll : 'vertical',
				excludedElements:"",
				tap:function(event, target) {
					if( event.button == 2 ) {
						return false;
					}
					tapto = jQuery(target);
					if(tapto.attr('href')){
						window.location = tapto.attr('href');
					}else if(tapto.parent().attr('href')){
						window.location = tapto.parent().attr('href');
					}
					return true;
				},
				swipeStatus:function(event, phase, direction, distance, duration, fingers)
				{

				  if(phase=='move'){
					  if(direction=='left'||direction=='right'){
						  jQuery(this).css('transform','translateX('+(direction=='left'?'-':'')+distance+'px)');
					  }
				  }
				  if(phase=='end'){
					  item_to_next = distance>520?2:1;
					  direction_to_next = direction=='left'?'next':'prev';
					  if(distance>20){
					  	jQuery(this).trigger(direction_to_next,item_to_next);
					  }
					  jQuery(this).css('transform','translateX(0px)');
				  }
				}
			});
			jQuery(".carousel-content").trigger("currentVisible", function( current_items ) {
				var current_item_count=0;
				current_items.each(function(){
					current_item_count++;
					if(current_item_count==2){jQuery(this).addClass( "current-carousel-item2" );}
					jQuery(this).addClass( "current-carousel-item" );
				});
			});
		}

	});//each


		}

		persist('style', $(this).val());

		return false;
	});


	// change main color to sample
	$('.sample-colors a').click(function() {
		var bg = $(this).css('backgroundColor'),
			rgb = bg.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

		rgb = rgb.join(',');

		if(rgb.substr(rgb.length - 2) == '46'){
			bottomgrad = 'rgb(9,106,161)';
			topgrad =  'rgb(38,195,246)';
			innershadow =  'rgb(5,199,247)';
			innershadowo =  'rgba(5,199,247,0.5)';
		}else if(rgb.substr(rgb.length - 2) == '37'){
			bottomgrad = 'rgb(33,119,10)';
			topgrad =  'rgb(105,245,37)';
			innershadow =  'rgb(5,247,26)';
			innershadowo =  'rgba(5,247,26,0.5)';
		}else if(rgb.substr(rgb.length - 2) == '36'){
			bottomgrad = 'rgb(161,142,9)';
			topgrad =  'rgb(200,255,36)';
			innershadow =  'rgb(247,226,5)';
			innershadowo =  'rgba(247,226,5,0.5)';
		}else if(rgb.substr(rgb.length - 2) == '18'){
			bottomgrad = 'rgb(161,72,9)';
			topgrad =  'rgb(255,198,18)';
			innershadow =  'rgb(247,226,5)';
			innershadowo =  'rgba(247,134,5,0.5)';
		}else if(rgb.substr(rgb.length - 2) == '35'){
			bottomgrad = 'rgb(161,9,9)';
			topgrad =  'rgb(255,36,35)';
			innershadow =  'rgb(247,5,5)';
			innershadowo =  'rgba(247,5,5,0.5)';
		}
		// remove existing
		$('.sample-color-css').remove();
console.log(rgb);
		// modify main color
		$("<style type='text/css' class='sample-color-css'>" + $('#css-color').html().replace(/%color%/g, bg).replace(/%rgb_color%/g, rgb).replace(/%bottomgrad%/g, bottomgrad).replace(/%innershadow%/g, innershadow).replace(/%innershadowo%/g, innershadowo).replace(/%topgrad%/g, topgrad) + "</style>").appendTo('body');

		persist('color', $(this).attr('class'));

		// add active
		$(this).parent().find('a').removeClass('active');
		$(this).toggleClass('active');

		return false;
	});


	// change background to sample
	$('.sample-backgrounds a').click(function() {
		var bg = $(this).css('backgroundImage');
		var regExp = /\(([^)]+)\)/;
		var image = regExp.exec(bg);


		// remove existing
		$('.sample-background-css').remove();

		// modify background
		$("<style type='text/css' class='sample-background-css'>" + $('#css-bck').html().replace(/%background%/g, image[1]) + "</style>").appendTo('body');

		persist('background', $(this).attr('class'));

		// add active
		$(this).parent().find('a').removeClass('active');
		$(this).toggleClass('active');

		return false;
	});

	// change patterns to sample
	$('.sample-patterns a').click(function() {
		var bg = $(this).css('backgroundImage');
		var regExp = /\(([^)]+)\)/;
		var image = regExp.exec(bg);


		// remove existing
		$('.sample-pattern-css').remove();

		// modify background
		$("<style type='text/css' class='sample-pattern-css'>" + $('#css-pat').html().replace(/%pattern%/g, image[1]) + "</style>").appendTo('body');

		persist('pattern', $(this).attr('class'));

		// add active
		$(this).parent().find('a').removeClass('active');
		$(this).toggleClass('active');

		return false;
	});

	$('.reset-style').click(function() {

		$.cookie('skywarrior', false);

		location.reload();

		return false;
	});

	// act on demo data
	if (sw)
	{
		$.each(sw, function(key, value) {

			switch (key) {
				case 'color':
					$('.sample-colors').find('.' + value.split(' ').join('.')).click();
					break;

				case 'handle':
					if (value == 'close') {
						$('.style-heading').click();
					}
					break;

				default:
					break;
			};
		});
	}

});