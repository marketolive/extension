$( document ).ready(function() {
  function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  }
  var updateDemoButton = function(){
    var pod = getCookie("userPod");
    if(pod === 'app-sjp')
      $("a[href='nothing']").attr('href', 'https://app-sjp.marketo.com/#SL1094330B2')
  }
  updateDemoButton();
  var updateTime = function(){
    setInterval(function(){
      var d = new Date();
      var hour = d.getHours();
      if(hour > 12)
        hour = hour - 12;
      else if(hour == 0)
        hour = 12;
      else{}
      var mins = d.getMinutes();
      if(mins < 10)
        mins = '0' + mins;
      var day = d.getDate();
      var time = hour + ':' + mins;
      var dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
      var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      var month = monthNames[d.getMonth()];
      var dayOfWeek = dayNames[d.getDay()-1];
      var date = dayOfWeek + ' ' + day + ' ' + month; 
      document.getElementById('android-time').innerHTML = time;
      document.getElementById('android-date').innerHTML = date;
    }, 200);
  }
  updateTime();
});