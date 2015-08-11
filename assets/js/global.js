$( document ).ready(function() {
  $("#help-link").click(function(){
    var bkg = document.getElementsByClassName('help-cover');
    var container = document.getElementsByClassName('help-center-container');
    var centerbox = document.getElementsByClassName('help-center-box');
    $(centerbox).animate({
      'margin-top': '125px',
      }, 400, function() {
    });
    $(bkg).css('display','block');
    $(container).css('display','block');
  });
  
  $('.cancel-help').click(function(){
    var bkg = document.getElementsByClassName('help-cover');
    var container = document.getElementsByClassName('help-center-container');
    $(bkg).css('display','none');
    $(container).css('display','none');
  });
});