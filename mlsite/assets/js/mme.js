$( document ).ready(function() {

  var updateTime = function(){
    setInterval(function(){
      var d = new Date();
      var hour = d.getHours();
      if(hour > 12)
        hour = hour - 12;
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