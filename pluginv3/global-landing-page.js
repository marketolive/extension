console.log("Global Landing Page > Running");

/**************************************************************************************
 *
 *  This script contains all of the functionality needed for loading external scripts
 *  on MarketoLive Landing Pages.
 *
 *  @Author Brian Fisher
 *
 *  @namespace
 *
 **************************************************************************************/

var URL_PATH = "m3-dev",

MARKETO_LIVE_LANDING_PAGE = "https://marketolive.com/" + URL_PATH + "/pluginv3/marketo-live-landing-page.min.js",

mktoLiveProdLandingPageDomain = "http://pages\.marketolive\.com",
mktoLiveDevLandingPageDomain = "http://dev\.pages\.marketolive\.com",
mktoLiveLandingPageHostsMatch = "http://na-sjdemo1\.marketo\.com",
mktoLiveDevMunchkinId = "685-BTN-772",
mktoLiveProdMunchkinId = "185-NGX-811",
mktoLiveNewPodMunchkinId = "924-LFC-514",
mktoLiveMunchkinIdsMatch = "(" + mktoLiveProdMunchkinId + "|" + mktoLiveDevMunchkinId + "|" + mktoLiveNewPodMunchkinId + ")",
mktoLiveLandingPageDomainMatch = "^(" + mktoLiveProdLandingPageDomain + "|" + mktoLiveDevLandingPageDomain + "|" + mktoLiveLandingPageHostsMatch + "\/lp\/" + mktoLiveMunchkinIdsMatch + ")/",

GLOBAL_LPAGE = GLOBAL_LPAGE || {};

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

GLOBAL_LPAGE.loadScript = function (scriptSrc) {
  console.log("Loading: Script: " + scriptSrc);
  
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

if (window.location.href.search(mktoLiveLandingPageDomainMatch) != -1) {
  console.log("Global Landing Page > Location: MarketoLive Landing Page");
  
  GLOBAL_LPAGE.loadScript(MARKETO_LIVE_LANDING_PAGE);
}