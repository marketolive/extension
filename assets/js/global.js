$( document ).ready(function() {
  var x = 0;
  $("#help-link").click(function(){
/*
    var bkg = document.getElementsByClassName('help-cover');
    var container = document.getElementsByClassName('help-center-container');
    var centerbox = document.getElementsByClassName('help-center-box');
*/
    $('.help-center-box').animate({
      'margin-top': '125px',
      }, 400, function() {
    });
    $('.help-cover').css('display','block');
    $('.help-center-container').css('display','block');
  });
  
  $('.cancel-help').click(function(){
/*
    var bkg = document.getElementsByClassName('help-cover');
    var container = document.getElementsByClassName('help-center-container');
*/
    $('.help-cover').css('display','none');
    $('.help-center-container').css('display','none');
  });

  $('.marketo-ball').click(function(){
    if(x == 0){
      x = 1;
      $('.side-bar').css('background-color','#fff');
      $('.side-bar-inner-container').fadeIn( "slow" );
    }
    else{
      x = 0;
      $('.side-bar').css('background-color','transparent');
      $('.side-bar-inner-container').css('display','none');      
    }
  });
});