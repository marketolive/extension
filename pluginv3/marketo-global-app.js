var URL_PATH = "m3-dev",
    MARKETO_LIVE_APP_SCRIPT_LOCATION = "https://marketolive.com/"+URL_PATH+"/pluginv3/marketo-live-app.min.js",
    MARKETO_DEMO_APP_SCRIPT_LOCATION = "https://marketolive.com/"+URL_PATH+"/pluginv3/marketo-demo-app.min.js",
    disableDemoPluginCheck,
    loadScript,
    isMktoPageGlobal;

/**************************************************************************************
 *  
 *  This function disables the demo plugin check that the Marketo subscription uses
 *  to enforce having the plugin installed. The user experience with the Marketo
 *  feature as implemented today isn't ideal, so this function disables it altogether.
 *  Obviously, only having the plugin could disable the check, so it's guaranteed that
 *  the user has the plugin (unless they're very Javascript savvy and paste this in the
 *  console).
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

disableDemoPluginCheck = function() {
    console.log("Marketo Global App > Disabling: Demo Plugin Check");

    window.mkto_live_plugin_state = true;
    
    if (MktPage
    && MktPage.validateDemoPlugin) {
        MktPage.validateDemoPlugin = function() {};
    }
}

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

loadScript = function(scriptSrc) {
	console.log("Marketo Global App > Loading: Script: " + scriptSrc);
	
    var scriptElement = document.createElement("script");
    scriptElement.async = true;
    scriptElement.src = scriptSrc;
    document.getElementsByTagName("head")[0].appendChild(scriptElement);
}

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

getCookie = function(cookieName) {
    console.log("Marketo Global App > Getting: Cookie " + cookieName);
    
    var name = cookieName + '=',
        cookies = document.cookie.split(';'),
        currCookie;
    
    for (var ii = 0; ii < cookies.length; ii++) {
        currCookie = cookies[ii].trim();
        if (currCookie.indexOf(name) == 0) {
            return currCookie.substring(name.length, currCookie.length);
        }
    }
    console.log("Marketo Global App > Getting: Cookie " + cookieName + " not found");
    return null;
}

/**************************************************************************************
 *
 *  Main
 *  
 **************************************************************************************/

isMktoPageGlobal = window.setInterval(function() {
    console.log("Marketo Global App > Location: Waiting for Marketo Page");
    if (typeof(MktPage) !== "undefined"
    && MktPage.savedState
    && MktPage.savedState.custPrefix) {
        console.log("Marketo Global App > Location: Marketo Page");
        
        window.clearInterval(isMktoPageGlobal);
        
        var accountString = MktPage.savedState.custPrefix,
            mktoDemoAccountMatch = "^mktodemoaccount",
            mktoAccountStringQe = "globalsales",
            mktoAccountStringsMatch = "^mktodemoaccount106$|^mktodemoaccount106d$|^" + mktoAccountStringQe + "$";
            
        if (accountString.search(mktoAccountStringsMatch) != -1
        || getCookie("toggleState") == "false") {
            console.log("Marketo Global App > Location: MarketoLive Instance");
            
            disableDemoPluginCheck();
            loadScript(MARKETO_LIVE_APP_SCRIPT_LOCATION);
        }
        else if (accountString.search(mktoDemoAccountMatch) != -1) {
            loadScript(MARKETO_DEMO_APP_SCRIPT_LOCATION);
        }
    }
}, 0);