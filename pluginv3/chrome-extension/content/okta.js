console.log("OKTA > Running");

/**************************************************************************************
 *
 *  This module contains all of the functionality needed for loading external scripts
 *  on OKTA 
 *
 **************************************************************************************/

var URL_PATH = "m3",

  OKTA_LOGIN = "https://marketolive.com/" + URL_PATH + "/pluginv3/okta.min.js",

  APP = APP || {};

/**************************************************************************************
 *
 *  This function loads the given script source.
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

window.onload = function () {
  APP.loadScript(OKTA_LOGIN);
};