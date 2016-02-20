(function ($) {
	"use strict";

		
	$(document).ready(function(){
	
    
        $(".box-open").click(function(){
            $("#demo-box").animate({left:"0px"});
            
            $(".box-close").css('display', 'block');
            $(this).css('display', 'none');
        });
	
        $(".box-close").click(function(){
            $("#demo-box").animate({left:"-250px"});
            $(".box-open").css('display', 'block');
            $(this).css('display', 'none');
        });
	
        $(".lightgren-color").click(function(){
            $("body").addClass("lightgren-color").removeClass("blue-color darkblue-color sliver-color red-color default-color");
        });
        
	
        $(".blue-color").click(function(){
            $("body").addClass("blue-color").removeClass("lightgren-color darkblue-color sliver-color red-color default-color");
        });
        
	
        $(".darkblue-color").click(function(){
            $("body").addClass("darkblue-color").removeClass("blue-color lightgren-color sliver-color red-color default-color");
        });
        
	
        $(".sliver-color").click(function(){
            $("body").addClass("sliver-color").removeClass("blue-color darkblue-color lightgren-color red-color default-color");
        });
        
	
        $(".red-color").click(function(){
            $("body").addClass("red-color").removeClass("blue-color darkblue-color sliver-color lightgren-color default-color");
        });
        
	
        $(".default-color").click(function(){
            $("body").addClass("default-color").removeClass("blue-color darkblue-color sliver-color red-color lightgren-color");
        });
        
	
		
	});
    
    $(window).load(function(){
		$("#demo-box").delay(2000).animate({left:"-250px"});
		$(".box-open").delay(2000).css('display', 'block');
		$(".box-close").delay(2000).css('display', 'none');    
    });
    

}(jQuery));	