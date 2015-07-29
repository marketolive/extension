/*
 $( document ).ready(function() {
 $(window).scroll(function(){
 var scrollTop = 600;
 if($(window).scrollTop() >= scrollTop){
 $('.navbar-header').css({'display':'block'});
 $('.navbar').removeClass('navbar-expanded');
 }
 else if($(window).scrollTop() == 0){
 $('.navbar-header').css({'display':'none'});
 $('.navbar').addClass('navbar-expanded');
 }
 else{
 $('.navbar-header').css({'display':'none'});
 $('.navbar').addClass('navbar-expanded');
 }
 })
 });
 */
$(document).ready(function() {
	var currentClass = $('.navbar-collapse').css('display', 'none');
	/*
	$(document).scroll(function() {
		$('#bs-example-navbar-collapse-1').hide();
	});
	*/
}); 