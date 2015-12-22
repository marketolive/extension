$(document).ready(function() {
    $('#fullpage').fullpage();
    console.log("fullpage iniatilizing?");

    $('.arrow-container-down').click(function(){
    	$.fn.fullpage.moveSectionDown();
    });

    $('.arrow-container-up').click(function(){
    	$.fn.fullpage.moveSectionUp();
    })
});