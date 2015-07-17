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
 *  This function inserts the login credentials for 250ok. Since
 *  we only have one account for the whole team, everyone needs
 *  to use the same set of credentials.
 *
 *
 *  @Author Andy
 *
 *  @function
 *
 **************************************************************************************/

LIVE.emailDeliverabilityLogin = function () {
    $(document).ready(function () {
        $.getJSON("deliverability-login.json", function (login) {
            $("#email").value = login.username;
            $("#password").value = login.password;
        });
    });
}

//we're going to create an instance of the analyzer
//and then call showAnalyzer to actually build out the template and CSS onto the page
window.onload = function () {
    console.log("window loaded");
//    var podString = PODS.getCookie("userPod");
    // TODO: Fix this to accommodate for first time login
    /*********************************************************************
    if (!podString) {
        podString = "app-sjp";
        PODS.setCookie("userPod", podString, 365);
    }
    *********************************************************************/
    
    var pod = new PODS.Pod(PODS.getCookie("userPod"));
    if (window.location.href.search("marketolive.com") != -1) {
        LIVE.insertDeepLinks(pod);
    }
}
