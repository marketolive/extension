console.log("Content > Running");

var LIVE_SCRIPT_LOCATION = "https://marketolive.com/dev/plugin-bcf/marketo-live.js",
    APP_SCRIPT_LOCATION = "https://marketolive.com/dev/plugin-bcf/marketo-app.js",
    POD_SCRIPT_LOCATION = "https://marketolive.com/dev/plugin-bcf/pods.js",
	DESIGNER_SCRIPT_LOCATION = "https://marketolive.com/m2_update/v3/designer.js",
	COLORPICKER_SCRIPT_LOCATION = "https://marketolive.com/m2_update/assets/js/colorpicker.js",
	DELIVERABILITY_TOOLS_LOCATION = "https://marketolive.com/dev/plugin-bcf/deliverability-tools.js",
    currentUrl = window.location.href,
				 loadScript,
				 getCookie,
				 setCookie;
	
var port = chrome.runtime.connect({
    //name : "mycontentscript"
});

port.onMessage.addListener(function(message, sender) {
    setCookie("userPod", message.greeting, 365, ".marketolive.com", true);
    setCookie("userPod", message.greeting, 365, ".marketo.com", true);
});

loadScript = function(name) {
    var jscript_lib_demo = document.createElement("script");
    jscript_lib_demo.setAttribute("src", name);
    document.getElementsByTagName("head")[0].appendChild(jscript_lib_demo);
}

setCookie = function(cookieField, cookieValue, expiresIn) {
    var d = new Date(),
			expires;
    d.setTime(d.getTime() + (expiresIn * 24 * 60 * 60 * 1000));
    expires = "expires=" + d.toUTCString();
    document.cookie = cookieField + "=" + cookieValue + "; " + expires;
}

getCookie = function(cookieField) {
    var name = cookieField + "=",
        cookies = document.cookie.split(';'),
        currentCookie;
    for (var ii = 0; ii < cookies.length; ++ii) {
        var currentCookie = cookies[ii].trim();
        if (currentCookie.indexOf(name) == 0) {
            return currentCookie.substring(name.length, currentCookie.length);
		}
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
 **************************************************************************************/

Analyzer = function(pod) {
    this.currPosition = 0;
    this.pod = pod;
}

/**************************************************************************************
 *
 *  This method will insert an HTML template and a CSS sheet inside the template 
 *  directly into the header of the Marketo page via "Import" and runs asynchronously. 
 *  Then it binds the 'prev' and 'next' elements with a click function so that whenever 
 *  they are clicked it will call chooseAnalyzer and pass the element clicked.
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

Analyzer.prototype.showAnalyzer = function() {
	console.log("Content > Displaying: Analyzer Navigation Bar");
	
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "https://marketolive.com/dev/pluginv3/html/analyzer.html", false);
    xmlHttp.send();
    var pageLoaded = function() {
        var newElement = document.createElement('div');
        newElement.innerHTML = xmlHttp.responseText;
        console.log(xmlHttp.responeText);
        document.body.appendChild(newElement);
    }
    window.onload = pageLoaded();
}

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.action == "company") {
        localStorage.setItem("company", request.company.companyName);
	}
});

if (window.location.href.search("marketolive") != -1) {
	var color = getCookie('color');
	if (color)
		chrome.runtime.sendMessage({action: "colorVal", color : color}, function(response) {});
}

if (window.location.href.search("color-picker.html") != -1) {
    window.onload = function() {
        loadScript(COLORPICKER_SCRIPT_LOCATION);
    }
}

if (window.location.href == "https://na-sjp.marketodesigner.com/ds?explictHostname=app-sjp.marketo.com#EME15464") {
	window.onload = function() {
		loadScript(DESIGNER_SCRIPT_LOCATION);
	}
}

window.onload = function() {
    console.log("Content > Window: Loaded");

    var mktoAppDomain = "^https:\/\/app-[a-z0-9]+\.marketo\.com",
		mktoAppMatch = "https://app-*.marketo.com",
		mktoLiveDomain = "^https:\/\/marketolive.com",
		mktoLiveMatch = "https://marketolive.com/*",
		mktoLoginDomain = "^https:\/\/login\.marketo\.com",
		mktoAppLoginDomain = "^https:\/\/app\.marketo\.com",
		mktoDesignerDomain = "^https:\/\/[a-z0-9]+-[a-z0-9]+\.marketodesigner\.com",
		mktoDesignerMatch = "https://*.marketodesigner.com/*",
		mktoEmailDesigner = mktoDesignerDomain + "/ds",
		mktoLandingPageDesigner = mktoDesignerDomain + "/lpeditor/",
		mktoWizard = mktoAppDomain + "/m#",
		rtpDemoDomain = "^http:\/\/sjrtp1.marketo.com\/demo\/$|^http:\/\/cloud4.insightera.com\/demo\/$",
		emailDeliverabilityDomain = "^https:\/\/250ok.com/";

    if (currentUrl.search(mktoAppDomain) != -1
	&& currentUrl.search(mktoEmailDesigner) == -1) {
		console.log("Content > Location: Marketo App");
		
        window.mkto_live_plugin_state = true;
        loadScript(POD_SCRIPT_LOCATION);
        loadScript(APP_SCRIPT_LOCATION);
    }
    else if (currentUrl.search(mktoEmailDesigner) != -1
    || currentUrl.search(mktoWizard) != -1) {
        console.log("Content > Location: Designer/Wizard");
		
        loadScript(APP_SCRIPT_LOCATION);  
    }
    else if (currentUrl.search(mktoLiveDomain) != -1) {
		console.log("Content > Location: MarketoLive");
		
        var port = chrome.runtime.connect({
            name: "mycontentscript"
        });
        port.onMessage.addListener(function(message, sender) {
            user_pod = message.greeting;
            setCookie('userPod', user_pod, 365, '.marketolive.com', true);
            setCookie('userPod', user_pod, 365, '.marketo.com', true);
        });
        loadScript(POD_SCRIPT_LOCATION);
        loadScript(LIVE_SCRIPT_LOCATION);
    }
	else if (currentUrl.search(mktoAppDomain + "/#RCM39A1") != -1
	|| currentUrl.search(mktoAppDomain + "/#RCM5A1!") != -1
	|| currentUrl.search(mktoAppDomain + "/#AR1559A1") != -1) {
        console.log("Content > Location: Analyzers");
		
		//loadScript("https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js");
        Analyzer.prototype.showAnalyzer();
    }
    else if (currentUrl.search(rtpDemoDomain) != -1) {
		console.log("Content > Location: RTP Demo");
		
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", "https://marketolive.com/dev/pluginv3/html/turner-rtp.html", false);
        xmlHttp.send(null);
        var pageLoaded = function() {
            var newElement = document.createElement('div');
            newElement.innerHTML = xmlHttp.responseText;
            document.getElementById("advanced").appendChild(newElement);
        }
        window.onload = pageLoaded();
    }
	else if (currentUrl.search("250ok.com/")) {
		loadScript(DELIVERABILITY_TOOLS_SCRIPT_LOCATION);
	}
}