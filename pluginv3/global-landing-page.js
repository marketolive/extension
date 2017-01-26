var URL_PATH = "m3-dev",
MARKETO_LIVE_LANDING_PAGE_SCRIPT_LOCATION = "https://marketolive.com/" + URL_PATH + "/pluginv3/marketo-live-landing-page.min.js",
currentUrl = document.location.href,
mktoLiveLandingPageHostsMatch = "na-sjdemo1.marketo.com",
mktoLiveDevMunchkinId = "685-BTN-772",
mktoLiveProdMunchkinId = "185-NGX-811",

mktoLiveDevLandingPageDomain = "^http:\/\/pages-dev\.marketolive\.com",
mktoLiveProdLandingPageDomain = "^http:\/\/pages\.marketolive\.com",
mktoLiveMunchkinIdsMatch = "(" + mktoLiveDevMunchkinId + "|" + mktoLiveProdMunchkinId + ")",
mktoLiveLandingPageDomainMatch = "(" + mktoLiveDevLandingPageDomain + "|" + mktoLiveProdLandingPageDomain + "|^http:\/\/" + mktoLiveLandingPageHostsMatch + "\/lp\/" + mktoLiveMunchkinIdsMatch + "\/.*)",

loadScript;

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
    console.log("Global Landing Page > Loading: Script: " + scriptSrc);
    
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

console.log("Global Landing Page > Script: Loaded");

if (currentUrl.search(mktoLiveLandingPageDomainMatch) != -1) {
    console.log("Global Landing Page > Location: MarketoLive Landing Page");
    
    loadScript(MARKETO_LIVE_LANDING_PAGE_SCRIPT_LOCATION);
} else {
    console.log("Global Landing Page > Location: NOT MarketoLive Landing Page");
}