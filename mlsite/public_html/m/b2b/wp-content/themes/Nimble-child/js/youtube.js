var params = { allowScriptAccess: "always" };
var atts = { id: "myytplayer" };
swfobject.embedSWF("http://www.youtube.com/v/WEIy9_K_kyI?enablejsapi=1&playerapiid=ytplayer&version=3",
                   "ytapiplayer", "640", "400", "8", null, null, params, atts);

$(function() {
    $( "#dialog" ).dialog({
      dialogClass: "customBox"	,
      resizable: false,
      autoOpen: false,
      show: {
        effect: "blind",
        duration: 1000
      },
      hide: {
        effect: "fade",
        duration: 1000
      }
    });
 });

function onYouTubePlayerReady(playerId) {
  ytplayer = document.getElementById("myytplayer");
  ytplayer.addEventListener("onStateChange", "onytplayerStateChange");
}

function onytplayerStateChange(newState) {
	if(newState == 1){
		//newState equals 1 means the video is playing!
		//let's change this person's score for watching the video, and log an interesting moment
		mktoMunchkinFunction('clickLink', {
		    href: '/CarlSaganVideoStarted'
		    });
	}
	setInterval(function(){
	if(ytplayer.getCurrentTime() > 118){
		mktoMunchkinFunction('clickLink', {
	    	href: '/CarlSaganVideoOverHalf'
	   		});
		}
	}
	,120000);
	if(newState = YT.PlayerState.ENDED){
		mktoMunchkinFunction('clickLink', {
		    href: '/CarlSaganVideoFinished'
		    });
	}
}

(function($){
	//set the mkt cookie for the user
	var mkt = $.cookie('_mkto_trk').split(':')[2];
	//initialize interval timer (this will loop mainloop every 5 seconds)
	var myTimer;
	//initialize flags and semi-global variables for the logic.
	var stopit = false;
	var doneit = false;
	var thescore = 0;
	var elapsed = 0;
	var check = 0;                  
	var videoscore = 0;
	//core loop for the score increment animation
	function mainloop(){
		elapsed = ytplayer.getCurrentTime();
		if (Math.abs(elapsed-check) > 20){
			$( "#dialog" ).dialog( "open" );
			window.clearInterval(myTimer);
			stopit = true;
			return stopit;
		}
		setTimeout(function (){
		 	check = ytplayer.getCurrentTime();
		}, 1000);
		//check to see if the score has loaded from the sidetab
		if ($('#thescore').length !== 0 && doneit === false){
			doneit = true; //only want to do this block one time
			thescore = parseFloat($('#thescore').text().replace(/([^0-9\\.])/g,""));
			//remove the loading gif
			$('#writejs').empty();
			$('#writejs').append(thescore);
		}
		if(doneit === true && Math.abs(elapsed-check) > 1){
			//calc the video score
			videoscore = Math.round(elapsed/5);
			if (videoscore !== 0){
				//add it to thescore and write the new score to writejs with animation
				videoscore = thescore + videoscore;
				$('#writejs').css('color', 'orange');
				$('#writejs').effect('explode', 'easeOutQuad', 2000);
				$('#writejs').remove();
				$('#scorefield > strong').append("<span id='writejs'>" + videoscore + "</span>");
			}
		}
	}
	//do main loop every 5 seconds.
	$(document).ready(function(){
		if (!stopit){
			myTimer=window.setInterval(mainloop,5000);			
		}
		else{
			window.clearInterval(myTimer);
		}
		//cross domain and jsonp does not work. but that is ok since python.marketosolutionsconsulting.com is not crossdomain.
		/*$(window).on('beforeunload', function(){
			alert('videoscore ' + videoscore + ' ' + 'thescore ' + thescore);
		  if (videoscore > thescore) {
		  	console.log('made it to the if block');
		  	//do ajax call to update the score field based on cookie ID.
		  var req2 = 
		      $.ajax({
		        type: "POST",
		        url: 'http://localhost:8000/SideBar/videoscoreupdater/videoscoreupdater.jsonp?callback=?',
		        data: {'data': mkt, 'score': videoscore},
		        async:false,
		        dataType: "jsonp",
		        success: function(data){
		        	alert('success');
		        }
		      });
		  }
		  return;
		});*/
	});
})(jQuery);
