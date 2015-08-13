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

  $("#push").click(function() {
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
  }); 
  $("#back-phone-button, #next-phone-button").click(function() {
    var className = $('#mme').attr('class').split(' ')[0];
    console.log(className);
    switch(className){
      case 'mme-bkg' :
        if(this.id == 'back-phone-button'){}
        else{
          document.getElementById('section-description').innerHTML = engagementWords[1];
          document.getElementById('push-words-container').style.display = "none";
          document.getElementById('push-image').style.display = "none";
          document.getElementById('image-overlay').src = "../assets/img/beacon-1.jpg";
          $('#mme').attr("class","mme-bkg-2");
          $('.push-notification-container').css('display','none');
          $('#message-title').css('display','none');
          $('#message-body').css('display','none');
          $('.app-description-box-container').css('margin-bottom','43px');
        }
        //$('#mme').attr("class","mme-bkg");
        //document.getElementById('image-overlay').src = '../assets/img/mme-push-0.png';
        break;
      case 'mme-bkg-2' :
        if(this.id == 'back-phone-button'){
          document.getElementById('image-overlay').src = "../assets/img/mme-push-0.jpg";
          $('.app-description-box-container').css('margin-bottom','0px');
          document.getElementById('section-description').innerHTML = engagementWords[0];
          $('#mme').attr("class","mme-bkg");
          $('.push-notification-container').css('display','block');
          $('.phone-buttons-container').css('display','none');
          $('#message-title').css('display','block');
          $('#message-body').css('display','block');
        }
        else{
          document.getElementById('image-overlay').src = "../assets/img/beacon-2.jpg";
          document.getElementById('android-time').style.display = "none";
          document.getElementById('android-date').style.display = "none";
          $('.app-description-box-container').css('margin-bottom','93px');
          document.getElementById('section-description').innerHTML = engagementWords[2];
          $('#mme').attr("class","mme-bkg-3");
        }
        break;
      case 'mme-bkg-3' :
        if(this.id == 'back-phone-button'){
          document.getElementById('image-overlay').src = "../assets/img/beacon-1.jpg";
          document.getElementById('android-time').style.display = "block";
          document.getElementById('android-date').style.display = "block";
          $('.app-description-box-container').css('margin-bottom','93px');
          document.getElementById('section-description').innerHTML = engagementWords[1];
          $('#mme').attr("class","mme-bkg-2");
        }
        else{
          document.getElementById('image-overlay').src = "../assets/img/beacon-3.jpg";
          $('.app-description-box-container').css('margin-bottom','93px');
          document.getElementById('section-description').innerHTML = engagementWords[3];
          $('#mme').attr("class","mme-bkg-4");
        }
        break;
      case 'mme-bkg-4' :
        if(this.id == 'back-phone-button'){
          document.getElementById('image-overlay').src = "../assets/img/beacon-2.jpg";
          $('.app-description-box-container').css('margin-bottom','93px');
          document.getElementById('section-description').innerHTML = engagementWords[2];
          $('#mme').attr("class","mme-bkg-3");
        }
        else{
          document.getElementById('image-overlay').src = "../assets/img/mme-push-0.jpg";
          document.getElementById('android-time').style.display = "block";
          document.getElementById('android-date').style.display = "block";
          document.getElementById('section-description').innerHTML = engagementWords[0];
          $('.app-description-box-container').css('margin-bottom','0px');
          $('#mme').attr("class","mme-bkg");
          $('#message-title').css('display','block');
          $('#message-body').css('display','block');
          $('.push-notification-container').css('display','block');
          $('.phone-buttons-container').css('display','none');
        }
        break;
      default :
        console.log("went to default");
        break;
    }
  });
});