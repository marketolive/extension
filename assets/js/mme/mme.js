$(document).ready(function(){
  function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  }
  $('#page-cover-container').click(function(){
      x = 0;
      $('.side-bar').css('background-color','transparent');
      $('.side-bar-inner-container').css('display','none');  
  });
  var engagementWords = [
    'With Marketo Mobile Engagement, designing and delivering push notifications and in-app messages is as simple as creating an email.', 
    'Beacon technology allows Mobile Apps to understand their position on a micro-local scale, and deliver hyper-contextual content to users based on location. This means users can be messaged when they pass by a location with a beacon',
    'In-app messaging allows you to deliver engaging and relevant messages to your users.  As soon as your users open your app, they will see their personalized message.',
    'Close the loop by synchronizing purchase data back to Marketo to report on how impactful each mobile campaign is to  your overall Marketing strategy.'
  ]
  $('#push-container').click(function(){
    $(this).hide('slide', {direction: 'right'}, 800, function(){
      $(this).css('display','none');
      document.getElementById('image-overlay').src = "../assets/img/beacon.jpg";
      document.getElementById('android-time').style.display = "none";
      document.getElementById('android-date').style.display = "none";
      //$('.app-description-box-container').css('margin-bottom','93px');
      //document.getElementById('section-description').innerHTML = engagementWords[2];
      $('#mme').attr("class","mme-bkg-3");
      $('.beacon-overlay').css('display', 'block');
    });
  });
  $('.beacon-overlay').click(function(){
    $('.beacon-overlay').hide('slide', {direction: 'down'}, 800, function(){
      $(this).css('display','none');
    });
    $('.beacon-overlay-1').show('slide', {direction: 'up'}, 800, function(){
      $('#mme').attr("class","mme-bkg-4");
    });
  });
  $('#message-body').keyup(function(e) {
    var enterKey = 13;
    if (e.which == enterKey){
        push();
        console.log("yup");
     }
     else{
      console.log("nope");
     }
 });
  $("#push").click(function() {
    push()
  }); 
  var push = function(){
    var audio = document.getElementById("audio");
    var audio2 = document.getElementById("audio2");
    audio.play();
    audio2.play();
    var pushNotification = document.querySelector('#message-body');
    //document.getElementById('image-overlay').src = '../assets/img/mme-push-1.png';
    $('.push-notification-container').css('display','none');
    $('.phone-buttons-container').css('display','inline-block');
    var logo = getCookie('logo');
    var company = getCookie('company');
    if(company != null && company != "turner"){
      var company  = company.substring(0, company.indexOf('.'));
      document.getElementById('push-name-name').innerHTML = company;
      document.getElementById('turner-tie-logo').src = logo;
    }
    if(pushNotification.value != ''){
      document.getElementById('push-words').innerHTML = pushNotification.value;
    }
    else{
      document.getElementById('push-words').innerHTML = 'Summers here! Stay cool in the heat with this discount!';
    }
    $('#push-image').fadeIn( "slow", function() {
    });
    $('#push-words-container').fadeIn( "slow", function() {
    });
  }
  $("#back-phone-button, #next-phone-button").click(function() {
    var className = $('#mme').attr('class').split(' ')[0];
    console.log(className);
    switch(className){
      case 'mme-bkg' :
        if(this.id == 'back-phone-button'){}
        else{
          document.getElementById('image-overlay').src = "../assets/img/beacon-1.jpg";
          document.getElementById('section-description').innerHTML = engagementWords[1];
          document.getElementById('push-words-container').style.display = "none";
          document.getElementById('push-image').style.display = "none";
          $('#mme').attr("class","mme-bkg-2");
          $('.push-notification-container').css('display','none');
          $('#message-title').css('display','none');
          $('#message-body').css('display','none');
          $('.app-description-box-container').css('display', 'none');
          $('#push-container').css({'display':'block', 'width':'409px', 'left':'4px', 'top':'235px'});
          $('#back-phone-button').css('display','none');
          $('#next-phone-button').css('display', 'none');
          $('#main-inner-phone-container').css('width', '450px');
          $('#android-background').css('width', '100%');
          $('#android-container').css('width', '100%');
          $('#phone').css('width', '100%');
          $('#image-overlay').css({'width':'408px','height':'728px', 'top':'17px','left':'5px'});
          $('#android-time-container').css({'width':'408px', 'top': '75px', 'left':'5px'});
          $('#android-time').css('font-size','76px');
          $('#android-date').css('font-size','22px');
          $('#image-push-1').css('width', '100%');
        }
        break;
      default :
        console.log("went to default");
        break;
    }
  });
});