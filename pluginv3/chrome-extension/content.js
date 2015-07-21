var LIVE_SCRIPT_LOCATION = "https://marketolive.com/dev/plugin-bcf/marketo-live.js",
    APP_SCRIPT_LOCATION = "https://marketolive.com/dev/plugin-bcf/marketo-app.js",
    POD_SCRIPT_LOCATION = "https://marketolive.com/dev/plugin-bcf/pods.js",
    currentUrl = window.location.href,
    loadScript,
    getCookie,
    setCookie;

console.log("Running: Content");

loadScript = function (name) {
    var jscript_lib_demo = document.createElement('script');
    jscript_lib_demo.setAttribute('src', name);
    document.getElementsByTagName('head')[0].appendChild(jscript_lib_demo);
}

setCookie = function (cookieField, cookieValue, expiresIn) {
    var d = new Date(),
        expires;
    d.setTime(d.getTime() + (expiresIn * 24 * 60 * 60 * 1000));
    expires = "expires=" + d.toUTCString();
    document.cookie = cookieField + "=" + cookieValue + "; " + expires;
}


getCookie = function (cookieField) {
    var name = cookieField + "=",
        cookies = document.cookie.split(';'),
        currentCookie;
    for (var ii = 0; ii < cookies.length; ++ii) {
        var currentCookie = cookies[ii].trim();
        if (currentCookie.indexOf(name) == 0)
            return currentCookie.substring(name.length, currentCookie.length);
    }
    return null;
}

chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
    switch (request.action) {
        case "priv":
            {
                setCookie("priv", request.priv.editPrivileges, 1, "www.marketo.com", "yes");
                localStorage.setItem("priv", request.priv.editPrivileges);
                break;
            }
    }
});

/**************************************************************************************
 *
 *  main object that will pass the variables for which analyzer should be present using
 *  currPosition as the current position in the object array.
 *
 *  @Author Arrash
 *
 *  @class
 *
 *  @namespace Analyzer.currPosition
 *  @namespace Analyzer.url
 *
 **************************************************************************************/

Analyzer = function (pod) {
    this.currPosition = 0;
    this.pod = pod;
}

/**************************************************************************************
 *
 *  this method will insert an HTML template and a CSS sheet inside the template directly
 *  into the header of the Marketo page. It accomplishes this using "Import" and runs
 *  asynchronously. It will then bind the 'prev' and 'next' elements with a click function
 *  so that whenever theyre clicked it will call chooseAnalyzer and pass the element clicked
 *
 *  @Author Arrash
 *
 *  @function
 *
 *  @namespace link
 *  @namespace importedDoc
 *  @namespace el
 *
 **************************************************************************************/

Analyzer.prototype.showAnalyzer = function () {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "https://marketolive.com/dev/pluginv3/html/analyzer.html", false);
    xmlHttp.send();
    var pageLoaded = function () {
        var newElement = document.createElement('div');
        newElement.innerHTML = xmlHttp.responseText;
        console.log(xmlHttp.responeText);
        document.body.appendChild(newElement);
        //                document.getElementById("modeler","success-path-analyzer","opportunity-influence-analyzer","program-analyzer").bind("click",            function (e) {
        //                       this.chooseAnalyzer(e.target);
        //                });
        //            }
    }
    window.onload = pageLoaded();
}

window.onload = function () {
    
    console.log("Window: Loaded");


    //var current_url = location.href;
    //var appMatch = /([([a-z0-9][a-z0-9-]+[a-z0-9]\.marketo\.com)/g;
    //var match = new RegExp(appMatch);
    //var mkto_app = match.test(current_url);
    //var mkto_live = current_url.indexOf('https://marketolive.com');
    //var mkto_mobile = current_url.indexOf('https://go.app.io');
    //var mkto_email = current_url.indexOf('https://250ok.com/login');
    //console.log('Plugin Loading MarketoLive Scripts...');
    //
    //

    var mktoAppDomain = "^https:\/\/app-[a-z0-9]+\.marketo\.com",
        mktoLiveDomain = "^https:\/\/marketolive.com",
        mktoLoginDomain = "^https:\/\/login\.marketo\.com",
        mktoAppLoginDomain = "^https:\/\/app\.marketo\.com",
        rtpDemoDomain = "^http://sjrtp1.marketo.com/demo/$|^http://cloud4.insightera.com/demo/$",
        emailDeliverabilityDomain = "^https:\/\/250ok.com/",
        mktoDesignerDomain = "^https:\/\/[a-z0-9]+-[a-z0-9]+\.marketodesigner\.com",
        mktoEmailDesigner = mktoDesignerDomain + "/ds",
        mktoLandingPageDesigner = mktoDesignerDomain + "/lpeditor/",
        mktoWizard = mktoAppDomain + "/m#";

    if (currentUrl.search(mktoAppDomain) != -1 && currentUrl.search(mktoLoginDomain) == -1 && currentUrl.search(mktoAppLoginDomain) == -1) {
        window.mkto_live_plugin_state = true;
        loadScript(POD_SCRIPT_LOCATION);
        loadScript(APP_SCRIPT_LOCATION);
        // Double check that this if statement works
    }
       
    else if (currentUrl.search(mktoEmailDesigner) != -1 
    || currentUrl.search(mktoWizard) != -1) {
        console.log("Window: Designer/Wizard");
        loadScript(APP_SCRIPT_LOCATION);  
    }
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //        if (MktPage.savedState.custPrefix.search("mktodemoaccount") != -1 && (MktPage.userid.search("\.demo@marketo\.com") != -1 || MktPage.userid.search("admin@mktodemoaccount") != -1)) {
        //            loadScript(POD_SCRIPT_LOCATION);
        //            loadScript(APP_SCRIPT_LOCATION);
        //        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    else if (currentUrl.search(mktoLiveDomain) != -1) {
        var port = chrome.runtime.connect({
            name: "mycontentscript"
        });
        port.onMessage.addListener(function (message, sender) {
            user_pod = message.greeting;
            setCookie('userPod', user_pod, 365, '.marketolive.com', true);
            setCookie('userPod', user_pod, 365, '.marketo.com', true);
        });
        loadScript(POD_SCRIPT_LOCATION);
        loadScript(LIVE_SCRIPT_LOCATION);
    } 
    else if (currentUrl.search(rtpDemoDomain)) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", "https://marketolive.com/dev/pluginv3/html/turner-rtp.html", false);
        xmlHttp.send(null);
        var pageLoaded = function () {
            var newElement = document.createElement('div');
            newElement.innerHTML = xmlHttp.responseText;
            document.getElementById("advanced").appendChild(newElement);
        }
        window.onload = pageLoaded();
    } 
    else if (currentUrl.search(mktoAppDomain + "/#RCM39A1") != -1 ||
        currentUrl.search(mktoAppDomain + "/#RCM5A1!") != -1 ||
        currentUrl.search(mktoAppDomain + "/#AR1559A1") != -1) {
        //        loadScript("https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js");
        console.log("About to show Analyzer");
        Analyzer.prototype.showAnalyzer();
    }
}
