console.log("Marketo Dashboards > Running");

/**************************************************************************************
 *
 *  This script contains all of the functionality needed for loading external scripts
 *  on MarketoLive environments.
 *
 *  @Author Brian Fisher
 *
 *  @namespace
 *
 **************************************************************************************/

var URL_PATH = "m3-dev",

PROGRAM_ANALYZER = "https://marketolive.com/" + URL_PATH + "/pluginv3/dashboards/program-analyzer-data.min.js",
NURTURE_PROGRAM = "https://marketolive.com/" + URL_PATH + "/pluginv3/dashboards/nurture-dashboard-data.min.js",
SOCIAL_APP = "https://marketolive.com/" + URL_PATH + "/pluginv3/dashboards/social-dashboard-data.min.js",
EMAIL_DASHBOARD = "https://marketolive.com/" + URL_PATH + "/pluginv3/dashboards/email-dashboard-data.min.js",
//EMAIL_ASSET= "https://marketolive.com/" + URL_PATH + "/pluginv3/dashboards/email-asset-data.min.js",

mktoAccountStringMaster = "mktodemolivemaster",

DASHBOARD = DASHBOARD || {};

/**************************************************************************************
 *
 *  This function loads the given script source.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {String} scriptSrc - The URL of the desired script.
 *  @param {Function} onLoadFn - function to execute when the script loads.
 *
 **************************************************************************************/

DASHBOARD.loadScript = function (scriptSrc, onLoadFn) {
  console.log("Loading: Script: " + scriptSrc);
  
  var scriptElement = document.createElement("script");
  scriptElement.async = true;
  scriptElement.src = scriptSrc;
  
  if (typeof(onLoadFn) === "function") {
    scriptElement.onload = onLoadFn();
  }
  
  document.getElementsByTagName("head")[0].appendChild(scriptElement);
};

/**************************************************************************************
 *
 *  Main
 *
 **************************************************************************************/

var isMktPageDashboards = window.setInterval(function () {
    if (typeof(MktPage) !== "undefined"
       && MktPage.savedState
       && MktPage.savedState.custPrefix) {
      console.log("Marketo Dashboards > Location: Marketo Page");
      
      var accountString = MktPage.savedState.custPrefix,
      onLoadFn = function () {
        loadData();
      };
      
      window.clearInterval(isMktPageDashboards);
      
      if (accountString == mktoAccountStringMaster) {
        DASHBOARD.loadScript(PROGRAM_ANALYZER, onLoadFn);
      } else {
        DASHBOARD.loadScript(PROGRAM_ANALYZER, onLoadFn);
        DASHBOARD.loadScript(NURTURE_PROGRAM, onLoadFn);
        DASHBOARD.loadScript(SOCIAL_APP, onLoadFn);
        DASHBOARD.loadScript(EMAIL_DASHBOARD, onLoadFn);
      }
    }
  }, 0);