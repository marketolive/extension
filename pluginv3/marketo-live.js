console.log("script loading");

// Default Workspace Check: MktCanvas.activeTab.config.accessZoneId == 1

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

var LIVE = LIVE || {};

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

LIVE.insertDeepLinks = function (pod) {
    $(".marketo-live-option").click(function (e) {
        window.open(pod[$(this).context.id]);
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

LIVE.displayLoginMessage() {
    // TODO
}

/**************************************************************************************
 *
 *  Main
 *
 **************************************************************************************/

window.onload = function () {
    console.log("window loaded");
    var podString = PODS.getCookie("userPod");
    if (!podString) {
        LIVE.displayLoginMessage();
        return;
    }
    
    var pod = new PODS.Pod(podString);
    if (window.location.href.search("marketolive.com") != -1) {
        LIVE.insertDeepLinks(pod);
    }
}
