console.log("ToutApp > Running");

/**************************************************************************************
 *
 *  This module contains all of the functionality needed for loading external scripts
 *  on ToutApp.
 *
 *  @Author Brian Fisher
 *
 *  @namespace
 *
 **************************************************************************************/

var URL_PATH = "m3-dev",

TOUT_APP = "https://marketolive.com/" + URL_PATH + "/pluginv3/tout-app.min.js",

APP = APP || {};

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

APP.loadScript = function (scriptSrc) {
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

window.addEventListener("load", function () {
  APP.loadScript(TOUT_APP);
});