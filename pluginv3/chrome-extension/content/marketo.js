console.log("Marketo > Running");

/**************************************************************************************
 *
 *  This content script contains all of the functionality needed for loading external
 *  scripts on the Marketo App.
 *
 *  @Author Brian Fisher
 *
 *  @namespace
 *
 **************************************************************************************/

var URL_PATH = "m3-dev",

  MARKETO_GLOBAL_APP = "https://marketolive.com/" + URL_PATH + "/pluginv3/marketo-global-app.min.js",
  GLOBAL_LANDING_PAGE = "https://marketolive.com/" + URL_PATH + "/pluginv3/global-landing-page.min.js",
  MARKETO_OTHER_APP = "https://marketolive.com/" + URL_PATH + "/pluginv3/marketo-other-app.min.js",
  ANALYZER_NAV_BAR = "https://marketolive.com/" + URL_PATH + "/pluginv3/html/analyzer-nav-bar.html",
  //ASSET_NAV_BAR = "https://marketolive.com/" + URL_PATH + "/v3/assets.html",

  currentUrl = window.location.href,
  mktoAppDomain = "^(https://app-[a-z0-9]+\.marketo\.com|https://engage-(ab|sj)\.marketo\.com)",
  mktoLoginDomain = "^(https://login\.marketo\.com|https://app\.marketo\.com)",
  mktoLoginPathName = "/homepage/login",
  mktoLandingPageDomain = "^http://[^\.]+\.marketo\.com/lp/[0-9]{3}-[a-zA-Z]{3}-[0-9]{3}/",
  mktoEmailInsightsDomain = "^https://sj-ee-api\.marketo\.com",
  mktoWebPersonalizationDomain = "^https://(sjrtp3|sjrtp1|sjrtp8|abrtp2)\.marketo\.com/",
  //mktoPredictiveContentUrl = "^https://(sjrtp3|sjrtp1)\.marketo\.com/app/predictive-app/",
  mktoSeoDomain = "^https://seo\.marketo\.com",

  oppInfluenceAnalyzerFragment = "#AR1559A1!",
  programAnalyzerFragment = "#AR1544A1!",
  modelerFragment = "#RCM70A1!",
  modelerPreviewFragment = "\\?preview=true(&approved=true)?/#RCM70A1!",
  successPathAnalyzerFragment = "#AR1682A1!",
  analyzerFragmentsMatch = mktoAppDomain + "/(" + oppInfluenceAnalyzerFragment + "|" + programAnalyzerFragment + "|" + modelerFragment + "|" + modelerPreviewFragment + "|" + successPathAnalyzerFragment + ")",

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
 *  This function issues an HTTP request.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {String} url - The HTTP request URL.
 *  @param {String} params - The parameters to pass in the body of the request.
 *  @param {String} method - The HTTP request method (e.g. GET, POST, PATCH).
 *  @param {String} responseType - The type of the response (e.g. document, json, text).
 *  @param {Function} callback - The callback function.
 *
 **************************************************************************************/

APP.webRequest = function (url, params, method, async, responseType, callback) {
  var xmlHttp = new XMLHttpRequest(),
    result;
  xmlHttp.onreadystatechange = function () {
    if (typeof (callback) === "function"
      && xmlHttp.readyState == 4
      && xmlHttp.status == 200)
      result = callback(xmlHttp.response);
  }
  if (async
    && xmlHttp.responseType) {
    xmlHttp.responseType = responseType;
  }
  xmlHttp.open(method, url, async); // true for asynchronous
  xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
  if (url.search(/^\//) != -1
    || url.replace(/^[a-z]+:\/\/([^\/]+)\/?.*$/, "$1") == window.location.host) {
    xmlHttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  }
  xmlHttp.send(params);
  return result;
};

/**************************************************************************************
 *
 *  This function inserts the HTML and CSS for the analyzer nav bar directly into the
 *  header of the Marketo page.
 *
 *  @Author Arrash
 *
 *  @function
 *
 **************************************************************************************/

APP.showNavBar = function () {
  APP.webRequest(ANALYZER_NAV_BAR, null, 'GET', true, 'text', function (response) {
    var newElement = document.createElement("div");

    newElement.innerHTML = response;
    document.body.appendChild(newElement);
  });
};

/**************************************************************************************
 *
 *  Main
 *
 **************************************************************************************/

window.onload = function () {
  if (currentUrl.search(mktoAppDomain) != -1
    && window.location.pathname != mktoLoginPathName
    && currentUrl.search(mktoLoginDomain) == -1) {
    console.log("Marketo > Location: App URL");
    APP.loadScript(MARKETO_GLOBAL_APP);

    if (currentUrl.search(analyzerFragmentsMatch) != -1) {
      console.log("Marketo > Location: Golden Analytics");
      APP.showNavBar();
    }

  } else if (currentUrl.search(mktoLandingPageDomain) != -1) {
    console.log("Marketo > Location: Landing Page");
    APP.loadScript(GLOBAL_LANDING_PAGE);

  } else if (currentUrl.search(mktoEmailInsightsDomain) != -1
    || currentUrl.search(mktoWebPersonalizationDomain) != -1
    || currentUrl.search(mktoSeoDomain) != -1) {
    console.log("Marketo > Location: Marketo Other App");
    APP.loadScript(MARKETO_OTHER_APP);
  }
};