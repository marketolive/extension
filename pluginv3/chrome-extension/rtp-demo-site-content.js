var URL_PATH = "m3-dev",
RTP_DEEPLINK_SCRIPT_LOCATION = "https://marketolive.com/" + URL_PATH + "/pluginv3/rtp-deeplink.min.js",
RTP_NAV_BAR_LOCATION = "https://marketolive.com/" + URL_PATH + "/pluginv3/html/turner-rtp.html",
loadScript,
pageLoaded,
xmlHttp = new XMLHttpRequest();

/**************************************************************************************
 *
 *  This function loads the given script source.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {String} scriptSrc - The URL of the desired script.
 *
 **************************************************************************************/

loadScript = function (scriptSrc) {
    console.log("RTP Demo Site > Loading: Script: " + scriptSrc);
    
    var scriptElement = document.createElement("script");
    scriptElement.async = true;
    scriptElement.src = scriptSrc;
    document.getElementsByTagName("head")[0].appendChild(scriptElement);
};

/**************************************************************************************
 *
 *  This function loads the MarketoLive navigation banner.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

pageLoaded = function () {
    console.log("RTP Demo Site > Loading: MarketoLive Navigation Bar");
    
    var newElement = document.createElement('div');
    newElement.innerHTML = xmlHttp.responseText;
    document.getElementById("demo-page").appendChild(newElement);
    loadScript(RTP_DEEPLINK_SCRIPT_LOCATION);
};

/**************************************************************************************
 *
 *  Main
 *
 **************************************************************************************/

xmlHttp.open("GET", RTP_NAV_BAR_LOCATION, false);
xmlHttp.send(null);
window.onload = pageLoaded();