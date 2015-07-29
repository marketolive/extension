$(document).ready(function(){
  document.getElementById('home-main-body-0').style.display = 'block';
  setInterval(function(){
    if(document.getElementById('home-main-body-0').style.display == 'block'){    
      $('#home-main-body-0').css('display','none');
      $('#home-main-body-1').fadeIn(2000,'linear');
    }
    else if(document.getElementById('home-main-body-1').style.display == 'block'){
      $('#home-main-body-1').css('display','none');
      $('#home-main-body-2').fadeIn(2000,'linear');
    }
    else if(document.getElementById('home-main-body-2').style.display == 'block'){
      $('#home-main-body-2').css('display','none');
      $('#home-main-body-0').fadeIn(2000,'linear');
    }
    else{
      console.log("nothing");
    }
  }, 8000);
})