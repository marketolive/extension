var URL_PATH = "m3-dev",
    ONE_LOGIN_APP_SCRIPT_LOCATION = "https://marketolive.com/"+URL_PATH+"/pluginv3/one-login-app.min.js",
    loadScript,
    isOneLoginUser;

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
	console.log("Background > Loading: Script: " + scriptSrc);
	
    var scriptElement = document.createElement("script");
    scriptElement.async = true;
    scriptElement.src = scriptSrc;
    document.getElementsByTagName("head")[0].appendChild(scriptElement);
}

/**************************************************************************************
 *
 *  Main
 *  
 **************************************************************************************/

console.log("One Login > Script Loaded");

isOneLoginUser = window.setInterval(function() {
    if (typeof(Application) !== "undefined"
    && Application.user) {
        window.clearInterval(isOneLoginUser);
        loadScript(ONE_LOGIN_APP_SCRIPT_LOCATION);
    }
}, 0);