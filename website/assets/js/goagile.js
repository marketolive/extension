
$( window ).resize(function() {
  var windowHeight = $(window).height();
  console.log(windowHeight);
  $('#main-body').css({'height': windowHeight});
  $('#partdeux').css({'height': windowHeight});
  $('#parttrois').css({'height': windowHeight});

  var updateHeight = function(ele, height){
    ele = '#' + ele;
    var thirdHeight = $( window ).height() * 1/3;
    var elementOffSet = $(ele).offset().top;
    var totalHeight = thirdHeight + elementOffSet - height;
    var mainContainer = '.marketo-live-guide-option-container-home-next';
    $(ele).find(mainContainer).css({'margin-top': height,'position':'absolute', 'top': totalHeight, 'left':'0%'});
  }
  updateHeight('main-body', '0');
  updateHeight('partdeux', '50');
  updateHeight('parttrois', '50');
});
$( window ).ready(function() {
  var windowHeight = $(window).height();
  //console.log(windowHeight);
  $('#main-body').css({'height': windowHeight});
  $('#partdeux').css({'height': windowHeight});
  $('#parttrois').css({'height': windowHeight});
  var updateHeight = function(ele){
    ele = '#' + ele;
    var thirdHeight = $( window ).height() * 1/3 ;
    var elementOffSet = $(ele).offset().top;
    var totalHeight = thirdHeight + elementOffSet;
    var mainContainer = '.marketo-live-guide-option-container-home-next';
    $(ele).find(mainContainer).css({'margin-top':'0px;','position':'absolute', 'top': totalHeight, 'left':'0%'});
  }
  updateHeight('main-body');
  updateHeight('partdeux');
  updateHeight('parttrois');
});
/*
var eleDistance = function(ele){
  ele = '#' + ele;
  var thirdHeight = $( window ).height() / 3;
  var elementOffSet = $(ele).offset().top;
  var totalHeight = thirdHeight + elementOffSet;
  var mainContainer = '.marketo-live-guide-option-container-home-next';
  $(ele).find(mainContainer).css({'margin-top':'0px;','position':'absolute', 'top': totalHeight, 'left':'0%'});
}
*/
