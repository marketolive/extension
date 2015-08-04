console.log("Content > Running");

var LIVE_SCRIPT_LOCATION = "https://marketolive.com/m3-dev/pluginv3/marketo-live.js",
    APP_SCRIPT_LOCATION = "https://marketolive.com/m3-dev/pluginv3/marketo-app.js",
    POD_SCRIPT_LOCATION = "https://marketolive.com/m3-dev/pluginv3/pods.js",
	COLORPICKER_SCRIPT_LOCATION = "https://marketolive.com/m3-dev/website/apps/color-picker.js",
	DELIVERABILITY_TOOLS_SCRIPT_LOCATION = "https://marketolive.com/m3-dev/pluginv3/deliverability-tools.js",
    DASHBOARD_SCRIPT_LOCATION = "https://marketolive.com/m3-dev/pluginv3/dashboards/remote-data.js",
    RTP_DEEPLINK_SCRIPT_LOCATION = "https://marketolive.com/m3-dev/pluginv3/rtp-deeplink.js",
    currentUrl = window.location.href,
	mktoAppDomain = "^https:\/\/app-[a-z0-9]+\.marketo\.com",
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
	emailDeliverabilityDomain = "^https:\/\/250ok.com/",
	colorPickerPage = "\/color-picker\.html$",
	loadScript,
	getCookie,
	setCookie;

loadScript = function(name) {
	console.log("Content > Loading: Script: "+name);
	
    var script = document.createElement("script");
    script.setAttribute("src", name);
    document.getElementsByTagName("head")[0].appendChild(script);
}

setCookie = function(cname, cvalue, exdays, domain, secure) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toGMTString();
	document.cookie = cname + "=" + cvalue + "; " + expires + "; " + "path=/;" + "domain=" + domain + ";secure="+ secure +";";
}

getCookie = function(cookieField) {
	console.log("Content > Getting: Cookie");
	
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
	console.log("Content > Constructor: Analyzer");
	
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
        document.body.appendChild(newElement);
    }
    window.onload = pageLoaded();
}

Analyzer.prototype.showAssets = function () {
   var xmlHttp = new XMLHttpRequest();
   xmlHttp.open("GET", "https://marketolive.com/m3-dev/v3/assets.html", false);
   xmlHttp.onreadystatechange = function () {
       if ( 4 != xmlHttp.readyState ) {
           return;
       }
       if ( 200 != xmlHttp.status ) {
           return;
       }
   };
   xmlHttp.send();
   var pageLoaded = function (response) {
       var newElement = document.createElement('div'),
           pod = getCookie("userPod");
       newElement.innerHTML = response;
//       document.body.appendChild(newElement);
       document.querySelectorAll("body.mktPurple")[0].appendChild(newElement);
   }
   window.onload = pageLoaded(xmlHttp.responseText);
    
    switch(pod) {
        case "app-sjp":
            document.getElementById("ml-email-link").href = "https://na-sjp.marketodesigner.com/ds?explictHostname=app-sjp.marketo.com#EME9819";
            document.getElementById("ml-form-link").href = "https://app-sjp.marketo.com/m#FOE2892-DET";
            document.getElementById("ml-lp-link").href = "https://na-sjp.marketodesigner.com/lpeditor/editor?explictHostname=app-sjp.marketo.com#LPE8703";
            document.getElementById("ml-push-link").href="https://app-sjp.marketo.com/#PN29A1LA1";
        case "app-ab07":
            document.getElementById("ml-email-link").href = "https://na-ab07.marketodesigner.com/ds?explictHostname=app-ab07.marketo.com#EME14240";
            document.getElementById("ml-form-link").href = "https://app-ab07.marketo.com/m#FOE2532-DET";
            document.getElementById("ml-lp-link").href = "https://na-ab07.marketodesigner.com/lpeditor/editor?explictHostname=app-ab07.marketo.com#LPE10672";
            document.getElementById("ml-push-link").href="https://app-ab07.marketo.com/m#MPNE29-SU";
        case "app-ab08":
            document.getElementById("ml-email-link").href = "https://na-ab08.marketodesigner.com/ds?explictHostname=app-ab08.marketo.com#EME13924";
            document.getElementById("ml-form-link").href = "https://app-ab08.marketo.com/m#FOE2472-DET";
            document.getElementById("ml-lp-link").href = "https://na-ab08.marketodesigner.com/lpeditor/editor?explictHostname=app-ab08.marketo.com#LPE10768";
            document.getElementById("ml-push-link").href="https://app-ab08.marketo.com/m#MPNE2-SU";
    }
}

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.action == "company") {
		console.log("Content > Company: " + request.company);
        localStorage.setItem("company", request.company);
		console.log("Content > Location: Color Picker");
		loadScript(COLORPICKER_SCRIPT_LOCATION);
	}
});

var port = chrome.runtime.connect({
	name: "mycontentscript"
});

window.onload = function() {
    console.log("Content > Window: Loaded");

    if (currentUrl.search(mktoAppDomain) != -1
	&& currentUrl.search(mktoDesignerDomain) == -1
	&& currentUrl.search(mktoWizard) == -1) {
		console.log("Content > Location: Marketo App");
		
		window.mkto_live_plugin_state = true;
		var oppInfluenceAnalyzerFragment = "AR1559A1!",
			programAnalyzerFragment = "AR1544A1!",
			modeler106Fragment = "RCM39A1!",
			modeler106abFragment = "RCM5A1!",
			successPathAnalyzerFragment = "AR1682A1!";
		
        loadScript(POD_SCRIPT_LOCATION);
        loadScript(APP_SCRIPT_LOCATION);
		loadScript(DASHBOARD_SCRIPT_LOCATION);
		
		if (currentUrl.search(mktoAppDomain + "/#" + oppInfluenceAnalyzerFragment) != -1
		|| currentUrl.search(mktoAppDomain + "/#" + programAnalyzerFragment) != -1
		|| currentUrl.search(mktoAppDomain + "/#" + modeler106Fragment) != -1
		|| currentUrl.search(mktoAppDomain + "/#" + modeler106abFragment) != -1
		|| currentUrl.search(mktoAppDomain + "/#" + successPathAnalyzerFragment) != -1) {
			console.log("Content > Location: Analyzers");
		
			Analyzer.prototype.showAnalyzer();
		}
    }
	
    else if (currentUrl.search(mktoDesignerDomain) != -1
    || currentUrl.search(mktoWizard) != -1) {
        console.log("Content > Location: Designer/Wizard");
		
        loadScript(APP_SCRIPT_LOCATION);
                
        // TODO: Fix this so it isn't static
        Analyzer.prototype.showAssets();
    }
	
    else if (currentUrl.search(mktoLiveDomain) != -1) {
		console.log("Content > Location: MarketoLive");
        
		var color = getCookie('color');
		if (color) {
			chrome.runtime.sendMessage({action: "colorVal", color : color}, function(response) {console.log("response = " + response);});
		}
    }
	
    else if (currentUrl.search(rtpDemoDomain) != -1) {
		console.log("Content > Location: RTP Demo");
		
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", "https://marketolive.com/m3-dev/pluginv3/html/turner-rtp.html", false);
        xmlHttp.send(null);
        var pageLoaded = function() {
            var newElement = document.createElement('div');
            newElement.innerHTML = xmlHttp.responseText;
            document.getElementById("demo-page").appendChild(newElement);
            loadScript(RTP_DEEPLINK_SCRIPT_LOCATION);
        }
        window.onload = pageLoaded();
    }
	
	else if (currentUrl.search("250ok\.com\/") != -1) {
		console.log("Content > Location: Deliverability Tools");
		
		loadScript(DELIVERABILITY_TOOLS_SCRIPT_LOCATION);
	}
}