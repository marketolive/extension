$( document ).ready(function() {
  var pushPressed = document.getElementById('push');
  function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1);
      if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
  }
  return "";
  }
  function returnTrack(cookie){
    var string = '';
    var firstid = '';
    for(var x = 0; x < cookie.length; x++){
      if(cookie[x] == 'n'){
        var y = x+2;
        string = cookie.substring(y);
        break;
      }
    }
    return string;
  }
  pushPressed.onclick = function(){
    var identity = 'https://226-FBL-320.mktorest.com/identity/oauth/token?grant_type=client_credentials&client_id=a9fa6570-f0de-4f4e-a85a-c67c40586df8&client_secret=3DZbLaTAYmMjGRAwy8F7ZoXcpHUUItPr';
    var authToken = '';

    var returnIdentity = $.ajax({
      dataType: 'json',
      url: identity,
      crossDomain: true
    })
    .done(function( data ) {
        authToken = data.access_token;
    })
    .fail( function(xhr, textStatus, errorThrown) {
        console.log(xhr.responseText);
        console.log(textStatus);
    });
    setTimeout(function(){
      console.log(authToken);
      var munchkin = getCookie('_mkto_trk');
      var munchid = returnTrack(munchkin);
      var finalMunch = '&cookie=' + 'id:226-FBL-320%26token:'+munchid;
      var secondAuthToken = "123123123";
      var auth_token =  "?access_token=" + authToken;
      var endpoint = 'https://226-FBL-320.mktorest.com/rest/v1/leads/1008555/associate.json'+auth_token+finalMunch;
      //var test = 'https://226-FBL-320.mktorest.com/rest/v1/lead/1008555.json'+auth_token;
      $.ajax({
        type: "POST",
        url: endpoint,
        dataType: JSON,
        contentType: 'application/json'
      })
      .done(function( data ) {
        console.log('success!');
      })
      .fail( function(xhr, textStatus, errorThrown) {
          console.log(xhr.responseText);
          console.log(textStatus);
      });
      Munchkin.init("226-FBL-320");
        Munchkin.munchkinFunction('clickLink', {
          href: '/pushnotification'
        });
      },3000);
  }
});