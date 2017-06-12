console.log("Marketo > Running");

/**************************************************************************************
 *
 *  This module contains all of the functionality needed for enabling dynamic landing 
 *  pages and emails within Marketo's Designer.
 *
 *  @Author Brian Fisher
 *
 *  @namespace
 *
 **************************************************************************************/

var URL_PATH = "m3-dev",
MARKETO_GLOBAL_APP_LOCATION = "https://marketolive.com/" + URL_PATH + "/pluginv3/marketo-global-app.min.js",
GLOBAL_LANDING_PAGE_SCRIPT_LOCATION = "https://marketolive.com/" + URL_PATH + "/pluginv3/global-landing-page.min.js",
MARKETO_OTHER_APP_SCRIPT_LOCATION = "https://marketolive.com/" + URL_PATH + "/pluginv3/marketo-other-app.min.js",
ASSET_NAV_BAR_LOCATION = "https://marketolive.com/" + URL_PATH + "/v3/assets.html",
mktoAppDomain = "^https://app-[a-z0-9]+\.marketo\.com",
mktoLoginDomain = "^https://login\.marketo\.com|^https://app\.marketo\.com",
mktoLoginPathName = "/homepage/login",
mktoDesignerDomain = "^https://[a-z0-9]+-[a-z0-9]+\.marketodesigner\.com",
mktoWizardDomain = mktoAppDomain + "/m#",
mktoEmailInsightsDomain = "^https://sj-ee-api\.marketo\.com",
mktoWebPersonalizationUrl = "^https://(sjrtp3\.marketo\.com|sjrtp1\.marketo\.com)/app/",
mktoPredictiveContentUrl = "^https://(sjrtp3\.marketo\.com|sjrtp1\.marketo\.com)/app/predictive-app/",
mktoSeoDomain = "^https://seo.marketo.com",
currentUrl = window.location.href,

mktoLiveDevLandingPageDomain = "^http://dev\.pages\.marketolive\.com",
mktoLiveProdLandingPageDomain = "^http://pages\.marketolive\.com",
mktoLandingPageDomain = "^http://[^\.]+\.marketo\.com/lp/[0-9]{3}-[a-zA-Z]{3}-[0-9]{3}/.*",
mktoGlobalLandingPageDomains = "(" + mktoLiveDevLandingPageDomain + "|" + mktoLiveProdLandingPageDomain + "|" + mktoLandingPageDomain + ")",

MARKETO = MARKETO || {};

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

MARKETO.loadScript = function (scriptSrc) {
    console.log("Marketo > Loading: Script: " + scriptSrc);
    
    var scriptElement = document.createElement("script");
    scriptElement.async = true;
    scriptElement.src = scriptSrc;
    document.getElementsByTagName("head")[0].appendChild(scriptElement);
};

/**************************************************************************************
 *
 *  This function sets the specified cookie for the current domain.
 *
 *  @Author Andrew Garcia
 *
 *  @function
 *
 *  @param {String} name - The name of the cookie.
 *  @param {String} value - The value of the cookie.
 *  @param {int} expiresInDays - The expiration date of the cookie in days.
 *  @param {String} domain - The domain of the cookie.
 *  @param {boolean} secure - Whether the cookie should be marked as Secure.
 *
 **************************************************************************************/

MARKETO.setCookie = function (name, value, expiresInDays, domain, secure) {
    console.log("Marketo > Setting: " + name + " Cookie for " + domain);
    
    var d = new Date(),
    expires;
    d.setTime(d.getTime() + (expiresInDays * 24 * 60 * 60 * 1000));
    expires = "expires=" + d.toGMTString();
    document.cookie = name + "=" + value + "; " + expires + "; " + "path=/;" + "domain=" + domain + ";secure=" + secure + ";";
};

/**************************************************************************************
 *
 *  This function gets the specified cookie for the current domain. It loops through
 *  the string contained in document.cookie and looks for the given cookie.
 *
 *  @Author Andrew Garcia
 *
 *  @function
 *
 *  @param {String} cookieName - Represents the key to search for inside document.cookie
 *
 **************************************************************************************/

MARKETO.getCookie = function (cookieName) {
    console.log("Marketo > Getting: Cookie " + cookieName);
    
    var name = cookieName + '=',
    cookies = document.cookie.split(';'),
    currCookie;
    
    for (var ii = 0; ii < cookies.length; ii++) {
        currCookie = cookies[ii].trim();
        if (currCookie.indexOf(name) == 0) {
            return currCookie.substring(name.length, currCookie.length);
        }
    }
    console.log("Marketo > Getting: Cookie " + cookieName + " not found");
    return null;
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
    if ((currentUrl.search(mktoAppDomain) != -1
             || currentUrl.search(mktoDesignerDomain))
         && window.location.pathname != mktoLoginPathName
         && currentUrl.search(mktoLoginDomain) == -1) {
        console.log("Marketo > Location: App URL");
        
        MARKETO.loadScript(MARKETO_GLOBAL_APP_LOCATION);
        
    } else if (currentUrl.search(mktoGlobalLandingPageDomains) != -1) {
        console.log("Marketo > Location: Global Landing Page");
        
        MARKETO.loadScript(GLOBAL_LANDING_PAGE_SCRIPT_LOCATION);
    
    } else if (currentUrl.search(mktoEmailInsightsDomain) != -1
         || currentUrl.search(mktoWebPersonalizationUrl) != -1
         || currentUrl.search(mktoSeoDomain) != -1) {
        console.log("Marketo > Location: Marketo Other App");
        
        MARKETO.loadScript(MARKETO_OTHER_APP_SCRIPT_LOCATION);
    }
    
    if (typeof(origOnLoad) === "function") {
        origOnLoad.apply(this, arguments);
    }
};