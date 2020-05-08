console.log("Marketo Dashboards > Running");

/**************************************************************************************
 *
 *  This script contains all of the functionality needed for loading external scripts
 *  on MarketoLive and demo environments for loading dashboard data.
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
 *
 **************************************************************************************/

DASHBOARD.loadScript = function (scriptSrc) {
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

var isMktPageDashboards = window.setInterval(function () {
    if (typeof(MktPage) !== "undefined"
       && MktPage.savedState
       && MktPage.savedState.custPrefix) {
      console.log("Marketo Dashboards > Location: Marketo Page");
      
      var accountString = MktPage.savedState.custPrefix;
      
      window.clearInterval(isMktPageDashboards);
      
      if (accountString == mktoAccountStringMaster) {
        DASHBOARD.loadScript(PROGRAM_ANALYZER);
        DASHBOARD.loadScript(SOCIAL_APP);
      } else {
        DASHBOARD.loadScript(PROGRAM_ANALYZER);
        DASHBOARD.loadScript(NURTURE_PROGRAM);
        DASHBOARD.loadScript(SOCIAL_APP);
        DASHBOARD.loadScript(EMAIL_DASHBOARD);
      }
    }
  }, 0);