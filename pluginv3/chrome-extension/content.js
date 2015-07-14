var LIVE_SCRIPT_LOCATION = "https://marketolive.com/dev/pluginv3/marketo-live.js",
    DEMO_SCRIPT_LOCATION = "https://marketolive.com/dev/pluginv3/marketo-demo.js",
    POD_SCRIPT_LOCATION = "https://marketolive.com/dev/pluginv3/pods.js",
    currentUrl = window.location.href,
    loadScript,
    getCookie,
    setCookie;



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

//<<<<<<< Updated upstream
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
//if (window.location.href.search("marketo.com") != -1 ||
//   window.location.href.search("marketolive.com") != -1) {
//    while (!MktPage)
//    {
//        setTimeout(function(){}, 100);
//    }
//        MktPage.validateDemoPlugin = function(){};
//		MktPage.demoPluginWindow.hide();
//        loadScript(POD_SCRIPT_LOCATION);
//=======
    if (currentUrl.search("marketo.com") != -1) {
        loadScript(DEMO_SCRIPT_LOCATION);
    } else if (currentUrl.search("marketolive.com") != -1) {
//>>>>>>> Stashed changes
        loadScript(LIVE_SCRIPT_LOCATION);
    }

    var port = chrome.runtime.connect({
        name: "mycontentscript"
    });

    port.onMessage.addListener(function (message, sender) {
        user_pod = message.greeting;
        setCookie('userPod', user_pod, 365, '.marketolive.com', true);
        setCookie('userPod', user_pod, 365, '.marketo.com', true);
    });

    if (currentUrl == "http://cloud4.insightera.com/demo/") {
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

    if (currentUrl.search("#RCM39A1") != -1 ||
        currentUrl.search("#RCM5A1!") != -1 ||
        currentUrl.search("#AR1559A1") != -1) {
        loadScript("https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js");
        console.log("About to show Analyzer");
        Analyzer.prototype.showAnalyzer();
    } else {
        console.log("You spelled the URL wrong");
    }
}
