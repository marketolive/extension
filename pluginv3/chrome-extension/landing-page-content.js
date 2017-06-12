console.log("Landing Page > Running");

/**************************************************************************************
 *
 *  This module contains all of the functionality needed for loading external scripts 
 *  on MarketoLive Landing Pages.
 *
 *  @Author Brian Fisher
 *
 *  @namespace
 *
 **************************************************************************************/

var URL_PATH = "m3-dev",
GLOBAL_LANDING_PAGE_SCRIPT_LOCATION = "https://marketolive.com/" + URL_PATH + "/pluginv3/global-landing-page.min.js",

mktoLiveDevLandingPageDomain = "http://dev\.pages\.marketolive\.com",
mktoLiveProdLandingPageDomain = "http://pages\.marketolive\.com",
mktoGlobalLandingPageDomains = "^(" + mktoLiveDevLandingPageDomain + "|" + mktoLiveProdLandingPageDomain + ")",

LPAGE = LPAGE || {};

/**************************************************************************************
 *
 *  This function loads the given script source.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {String} scriptSrc - The URL of the desired script.
 *  @param {String} onLoad - The onload function to be set.
 *
 **************************************************************************************/

LPAGE.loadScript = function (scriptSrc) {
    console.log("Landing Page > Loading: Script: " + scriptSrc);
    
    var scriptElement = document.createElement("script");
    scriptElement.async = true;
    scriptElement.src = scriptSrc;
    document.getElementsByTagName("head")[0].appendChild(scriptElement);
};

/**************************************************************************************
 *
 *  Main
 *
 **************************************************************************************/

var origOnLoad;

if (typeof(window.onload) === "function"
     && typeof(origOnLoad) !== "function") {
    origOnLoad = window.onload;
}

window.onload = function () {
    LPAGE.loadScript(GLOBAL_LANDING_PAGE_SCRIPT_LOCATION);
    
    if (typeof(origOnLoad) === "function") {
        origOnLoad.apply(this, arguments);
    }
};