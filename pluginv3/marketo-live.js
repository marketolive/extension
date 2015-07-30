/**************************************************************************************
 *
 *  This module contains all of the functionality needed for the
 *  manipulation of the marketolive.com website. It handles the deep
 *  linking of the tiles, manipulation of the UI, cookie checking etc.
 *  It is loaded onto the page by the Marketo Live plugin. It largely uses
 *  jQuery to interact with DOM elements and inject new bahavior.
 *
 *
 *  @Author Andy, Arrash
 *
 *  @namespace
 *
 **************************************************************************************/
console.log("Marketo Live > Running");

var currentUrl = window.location.href,
	mktoLiveDomain = "^https:\/\/marketolive.com",
	mktoLiveMatch = "https://marketolive.com/*",
    
    LIVE = LIVE || {};

/**************************************************************************************
*
*  This function displays a message to the user if he or she does not have a userPod
*  cookie. Since the deeplinks will not work until after the first login, the user
*  must be forced through the login page. The message instructs the user to login to 
*  Marketo, and then return to refresh the page.
*
*
*  @Author Andy
*
*  @function
*
**************************************************************************************/

LIVE.displayLoginMessage = function () {
   $("#modal-background")[0].style.display = "block";
}

/**************************************************************************************
 *
 *  This function injects the deep links onto the homepage based on which
 *  pod that the user is in.
 *
 *
 *  @Author Andy
 *
 *  @function
 *  @param pod {PODS.Pod} - The pod object that stores all of the
 *                          user's links for that subscription.
 *
 **************************************************************************************/

LIVE.insertDeepLinks = function(pod) {
	console.log("Marketo Live > Inserting: Deep Links");
	
    $(".marketo-live-option").click(function(e) {
        window.open(pod[$(this).context.id]);
        return false;
    });
}

/**************************************************************************************
 *
 *  This function displays a message to the user if he or she does not have a userPod
 *  cookie. Since the deeplinks will not work until after the first login, the user
 *  must be forced through the login page. The message instructs the user to login to 
 *  Marketo, and then return to refresh the page.
 *
 *
 *  @Author Andy
 *
 *  @function
 *
 **************************************************************************************/

LIVE.displayLoginMessage = function () {
    console.log("Marketo Live > Displaying Modal Window")
    
    $("#modal-background")[0].style.display = "block";
    $("#secret-passage").click(function() {
        $("#modal-background")[0].style.display = "none";
    });
}

/**************************************************************************************
 *
 *  Main
 *
 **************************************************************************************/
var isPodsLoaded = window.setInterval(function() {
    if (typeof(PODS) !== "undefined") {
        console.log("Marketo Live > Finished: Waiting for PODS")
        var podString = PODS.getCookie("userPod");
        if (!podString) {
            LIVE.displayLoginMessage();
        }

        var pod = new PODS.Pod(podString);
        if (currentUrl.search(mktoLiveDomain) != -1) {
            LIVE.insertDeepLinks(pod);
        }
		window.clearInterval(isPodsLoaded);
    }
}, 0);

