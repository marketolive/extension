$(document).ready(function(){
  function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  }
  var updateDemoButton = function(){
    console.log("test1");
    var pod = getCookie("userPod");
    console.log(pod);
    if(pod === 'app-sjp'){
      $("a[href='nothing']").attr('href', 'https://app-sjp.marketo.com/#SL1094330B2')
      console.log($('#demo-in-marketo').href);
    }
  }
  updateDemoButton();
  $("#reminder-clone, #lp-clone, #auto-responder-clone").click(function() {
    console.log(this.id);
    switch(this.id){
      case 'reminder-clone':
        $('#reminder-clone').css('display','none');
        $('#reminder-arrow').css('display','block');
        $('#reminder-arrow').animate({'width': '100%'}, 1000);
        setTimeout(function(){
          $('#reminder-body').fadeIn("slow", "linear");
        },900);
        break;
      case 'lp-clone':
        $('#lp-clone').css('display','none');
        $('#lp-arrow').css('display','block');
        $('#lp-arrow').animate({'width': '100%'}, 1000);
        setTimeout(function(){
          $('#landing-page-body').fadeIn("slow", "linear");
        },900);      
        break;
      case 'auto-responder-clone':
        $('#auto-responder-clone').css('display','none');
        $('#auto-responder-arrow').css('display','block');
        $('#auto-responder-arrow').animate({'width': '100%'}, 1000);
        setTimeout(function(){
          $('#auto-responder-body').fadeIn("slow", "linear");
        },900);         
        break;
      default: 
        console.log("none");
        break;
      }
  });
  $("#lp-first, #auto-responder-first, #reminder-first").click(function() {
    var id = this.id;
    var content = '#' + id + '-content';
    var replace = '#' + id + '-replace';
    $(content).css('display', 'none');
    $(replace).css('display', 'block');
  });
  $("#lp-second, #auto-responder-second-img, #reminder-second-img").click(function(){
    document.getElementById('lp-second-replace').style.display = 'block';
  });  
  $("#rs-image").click(function(){
    if(document.getElementById('lp-lightbox').style.display == 'block'){    
      document.getElementById('lp-second-img').src = "../assets/img/boston.jpg";
      document.getElementById('lp-second-replace').style.display = "none";
    }
    else if(document.getElementById('auto-responder-lightbox').style.display == 'block'){
      document.getElementById('auto-responder-second-img').src = "../assets/img/boston.jpg";
      document.getElementById('lp-second-replace').style.display = "none";      
    }
    else if(document.getElementById('reminder-lightbox').style.display == 'block'){
      document.getElementById('reminder-second-img').src = "../assets/img/boston.jpg";
      document.getElementById('lp-second-replace').style.display = "none";      
    }
    else{}
  });
  $("#rs-save").click(function(){
    $('.background-cover').css('display','none');
    $('.rs-lightbox-container').css('display','none');
    if(document.getElementById('lp-lightbox').style.display == 'block'){
      var el = document.querySelector("#lp-textarea");
      document.getElementById('lp-text-inside').innerHTML = el.value;
      document.getElementById('original-lp-image').src = "../assets/img/boston.jpg";
    }
    else if(document.getElementById('auto-responder-lightbox').style.display == 'block'){
      var el = document.querySelector("#auto-responder-textarea");
      document.getElementById('auto-responder-text-inside').innerHTML = el.value;
      document.getElementById('original-auto-responder-image').src = "../assets/img/boston.jpg";
    }
    else if(document.getElementById('reminder-lightbox').style.display == 'block'){
      var el = document.querySelector("#reminder-textarea");
      console.log(el.value);
      document.getElementById('reminder-text-inside').innerHTML = el.value;
      console.log(document.getElementById('reminder-text-inside').innerHTML);
      document.getElementById('original-reminder-image').src = "../assets/img/boston.jpg";
      console.log(document.getElementById('original-reminder-image').src);
    }
    else{
      console.log("NOPE");
    }
  });
  $('#landing-page-body, #auto-responder-body, #reminder-body').click(function(){
    $('.background-cover').css('display','block');
    $('.rs-lightbox-container').css('display','block');
    $('#auto-responder-lightbox').css('display','none');
    $('#reminder-lightbox').css('display','none');
    $('#lp-lightbox').css('display','none');
    switch(this.id){
      case 'landing-page-body':
        $('#lp-lightbox').css('display','block');
        break;
      case 'auto-responder-body':
        $('#auto-responder-lightbox').css('display','block');
        break;
      case 'reminder-body':
        $('#reminder-lightbox').css('display','block');
        break;
      default:
        break;
    }
  });
  $('#onto-mkto').click(function(){
    $('#competition').css('display','none');
    $('#mkto').fadeIn("slow","linear");
    $('#mkto-clone').css('display','block');
  });
  $('#mkto-clone').click(function(){
    $('#mkto-clone').css('display','none');
    $('.campaign-arrow-mkto').css('display','block');
    $('.campaign-arrow-mkto').animate({'width':'100%'},1000);
    setTimeout(function(){
      $('#reminder-body-mkto').fadeIn('slow','linear');
      $('#auto-responder-body-mkto').fadeIn('slow','linear');
      $('#landing-page-body-mkto').fadeIn('slow','linear');
    },1000);
    setTimeout(function(){
      $('.campaign-arrow-mkto').css('display','none');
      $('#tokens').css('display','block');
    },1500);
  });
  $("#tokens").click(function(){
    $('.token-city').html('Boston');
    $('.token-location').html('Hynes Convention Center');
    $('.token-time').html('8:30 PM');
    $('.token-date').html('August 22nd');
    document.getElementById('original-lp-image-mkto').src = "../assets/img/boston.jpg";
    document.getElementById('original-reminder-image-mkto').src = "../assets/img/boston.jpg";
    document.getElementById('original-auto-responder-image-mkto').src = "../assets/img/boston.jpg";
    $('.assets-image').src = "../assets/img/boston.jpg";
    $('.assets-image').css('border','1px solid #5a54a4');
    $('.token-city, .token-location, .token-time, .token-date').css({'color':'#5a54a4', 'font-weight':'bold'});
  });
});