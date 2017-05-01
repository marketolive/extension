/**************************************************************************************
 *
 *  This script contains all of the functionality needed for the tracking and
 *  manipulation of the Email Insights App
 *
 *  @Author Brian Fisher
 *
 *  @namespace
 *
 **************************************************************************************/
var URL_PATH = "m3-dev",
devExtensionId = "dokkjhbgengdlccldgjnbilajdbjlnhm",
prodExtensionId = "onibnnoghllldiecboelbpcaeggfiohl",
extensionId = devExtensionId; {}
console.log("Email Insights > Running");

/**************************************************************************************
 *
 *  Global Constants
 *
 **************************************************************************************/

var HEAP_ANALYTICS_SCRIPT_LOCATION = "https://marketolive.com/" + URL_PATH + "/pluginv3/heap-analytics.min.js",
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
    console.log("Email Insights > Loading: Script: " + scriptSrc);
    
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

chrome.runtime.sendMessage(extensionId, {
    action: "checkMktoCookie"
}, null, function (response) {
    if (response
         && response.isMktoLive
         && !response.isAdmin) {
        console.log("Email Insights > checkMktoCookie Msg > Heap Tracking Enabled");
        loadScript(HEAP_ANALYTICS_SCRIPT_LOCATION);
    } else {
        console.log("Email Insights > checkMktoCookie Msg > Heap Tracking Disabled");
    }
    if (chrome.runtime.lastError) {
        console.log("Email Insights > checkMktoCookie Msg > Error: " + JSON.stringify(chrome.runtime.lastError));
    }
});