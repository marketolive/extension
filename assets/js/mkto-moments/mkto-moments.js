$(document).ready(function(){
	var x=0;
	$('.marketo-ball').click(function(){
    if(x == 0){
      x = 1;
      $('.side-bar').css({'background-color':'#fff', 'z-index':'999'});
      $('.side-bar-inner-container').fadeIn( "slow" );
    }
    else{
      x = 0;
      $('.side-bar').css({'background-color':'transparent', 'z-index':'-999'});
      $('.side-bar-inner-container').css('display','none');      
    }
  });
	$('.background-container, .inner-container, .inner-container-left').click(function(){
		
		if(x ==1){
		  x = 0;
		  $('.side-bar').css({'background-color':'transparent', 'z-index':'-999'});
	      $('.side-bar-inner-container').css('display','none');  
		}
	});

	
	$('#mobile-header').click(function(){
		
		if ($('#mobile-menu').hasClass("hide")){
			$('.overlay').show();
			$('#mobile-menu').removeClass("hide").effect("slide", {right:77}, 150);
		}
		else {
			$('#mobile-menu').addClass("hide");
			$('.overlay').hide();
		}
	});

	$('.moments-container').scroll(function(){
		$("#mobile-menu").stop().animate({"marginTop": ($('.moments-container').scrollTop()) + "px"}, 400);
	});

});

