(function ($) {
	"use strict";


    jQuery(document).ready(function($){

     
        
        // jQuery sticky menu
        $(".header-area").sticky({topSpacing:0});

        // Owl Carousel
        
        var slideTop = $('.slider-area');
        
        slideTop.owlCarousel({
            loop:true,
            margin:0,
            items:1,
            autoplay: 5000,
            animateOut: 'fadeOut',
            nav:true,
            navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],       
        });
        
        slideTop.on('translated.owl.carousel',function(e){
            $(".active .slide-text-cell h2").addClass("fadeInUp").show();
            $(".active .slide-bg").addClass("slidezoom");
        }); 
        
        slideTop.on('translate.owl.carousel',function(e){
            $(".active .slide-text-cell h2").removeClass("fadeInUp").hide();
            $(".active .slide-bg").removeClass("slidezoom");
        });        

        // Owl Carousel
        $('.clients-list').owlCarousel({
            loop:true,
            margin:10,
            responsiveClass:true,
            autoplay: 5000,
            nav:true,
            navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
            responsive:{
                0:{
                    items:2
                },
                600:{
                    items:4
                },
                1000:{
                    items:5
                }
            }        
        });

        // Count down
        $('#countdown_dashboard').countDown({
            targetDate: {
                'day': 21,
                'month': 5,
                'year': 2015,
                'hour': 16,
                'min': 21,
                'sec': 0
            },
            omitWeeks: true
        }); 

        // Flickr gallery
        $('#flickr-gallery').jflickrfeed({
            limit: 6,
            qstrings: {
                id: '44802888@N04'
            },
            itemTemplate: 
            '<li>' +
                '<a class="boxer" data-gallery="flickr" href="{{image_b}}"><img src="{{image_s}}" alt="{{title}}" /></a>' +
            '</li>'
        });
        
        // jQuery counter
        $('.counter').counterUp({
            delay: 50,
            time: 5000
        }); 
        
        $('[data-toggle="tooltip"]').tooltip();

    });


    jQuery(window).load(function(){
        // Boxer 
        $(".boxer").boxer();        

    });


}(jQuery));	