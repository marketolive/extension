$(document).ready(function(){
  $('.map-img').hover(function(){
    var ele = '../assets/img/' + this.id + '.png';
    document.getElementById('map-image').src = ele;
    if(this.id == 'us-map-west')
      document.getElementById('map-words').innerHTML = "West Coast";
    else if(this.id == 'us-map-east')
      document.getElementById('map-words').innerHTML = "East Coast";
    else if(this.id == 'us-map-central')
      document.getElementById('map-words').innerHTML = "Mid West";     
    else{} 
  });
});