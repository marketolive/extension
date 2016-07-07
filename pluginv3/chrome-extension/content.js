console.log("Content > Running");

var URL_PATH = "m3-dev",
    LIVE_SCRIPT_LOCATION = "https://marketolive.com/"+URL_PATH+"/pluginv3/marketo-live.min.js",
    APP_SCRIPT_LOCATION = "https://marketolive.com/"+URL_PATH+"/pluginv3/marketo-app.min.js",
    POD_SCRIPT_LOCATION = "https://marketolive.com/"+URL_PATH+"/pluginv3/pods.min.js",
	DELIVERABILITY_TOOLS_SCRIPT_LOCATION = "https://marketolive.com/"+URL_PATH+"/pluginv3/deliverability-tools.min.js",
    INVISION_APP_SCRIPT_LOCATION = "https://marketolive.com/"+URL_PATH+"/pluginv3/invision-app.min.js",
    DASHBOARD_SCRIPT_LOCATION = "https://marketolive.com/"+URL_PATH+"/pluginv3/dashboards/remote-data.min.js",
    RTP_DEEPLINK_SCRIPT_LOCATION = "https://marketolive.com/"+URL_PATH+"/pluginv3/rtp-deeplink.min.js",
    ASSET_NAV_BAR_LOCATION = "https://marketolive.com/"+URL_PATH+"/v3/assets.html",
    RTP_NAV_BAR_LOCATION = "https://marketolive.com/"+URL_PATH+"/pluginv3/html/turner-rtp.html",
    currentUrl = window.location.href,
	mktoAppDomain = "^https:\/\/app-[a-z0-9]+\.marketo\.com",
	mktoDesignerDomain = "^https:\/\/[a-z0-9]+-[a-z0-9]+\.marketodesigner\.com",
	mktoEmailDesigner = mktoDesignerDomain + "/ds",
	mktoLandingPageDesigner = mktoDesignerDomain + "/lpeditor/",
	mktoWizard = mktoAppDomain + "/m#",
    mktoLiveColorPickerDomain = "^https:\/\/marketolive\.com[a-zA-Z0-9-\/]*\/color-picker\.html",
	rtpDemoDomain = "^http:\/\/sjrtp1.marketo.com\/demo\/$|^http:\/\/cloud4.insightera.com\/demo\/$",
	emailDeliverabilityDomain = "^https:\/\/250ok.com/",
    invisionAppDomain = "^https:\/\/marketo\.invisionapp\.com\/share\/",
    customCompanyLandingPage106Fragment = "LPE11826",
    customCompanyLandingPagePreview106Fragment = "LPP11826",
    customCompanyLandingPage106aFragment = "LPE10672",
    customCompanyLandingPagePreview106aFragment = "LPP10672",
    customCompanyLandingPage106bFragment = "LPE10768",
    customCompanyLandingPagePreview106bFragment = "LPP10768",
    customCompanyEmail106Fragment = "EME15464",
    customCompanyEmail106aFragment = "EME14240",
    customCompanyEmail106bFragment = "EME13924",
    form106Fragment = "FOE3576",
    form106aFragment = "FOE2532",
    form106bFragment = "FOE2472",
    push106Fragment = "MPNE29",
    push106aFragment = "MPNE29",
    push106bFragment = "MPNE2",
	loadScript,
	getCookie,
	setCookie,
    displayProgressModal,
    overlayEmail;

loadScript = function(scriptSrc) {
	console.log("Content > Loading: Script: " + scriptSrc);
	
    var scriptElement = document.createElement("script");
    scriptElement.onload = function() {
        overlayEmail = APP.overlayEmail;
    }
    scriptElement.setAttribute("src", scriptSrc);
    document.getElementsByTagName("head")[0].appendChild(scriptElement);
}

setCookie = function(name, value, expiresInDays, domain, secure) {
    console.log("Content > Setting: " + name + " Cookie for " + domain);
    
	var d = new Date(),
        expires;
	d.setTime(d.getTime() + (expiresInDays * 24 * 60 * 60 * 1000));
	expires = "expires=" + d.toGMTString();
	document.cookie = name + "=" + value + "; " + expires + "; " + "path=/;" + "domain=" + domain + ";secure="+ secure +";";
}

getCookie = function(cookieName) {
    console.log("Content > Getting: " + cookieName + " Cookie");

    var name = cookieName + '=',
        cookies = document.cookie.split(';'),
        currCookie;
    
    for (var ii = 0; ii < cookies.length; ii++) {
        currCookie = cookies[ii].trim();
        if (currCookie.indexOf(name) == 0) {
            return currCookie.substring(name.length, currCookie.length);
        }
    }
    return null;
}

displayProgressModal = function(parameters) {
    console.log("Content > Displaying: Progress Modal Window");
    
    var nextButton = parameters["next"],
        prevButton = parameters["prev"],
        homeButton = parameters["home"],
        progress = parameters["progress"],
        xmlHttp = new XMLHttpRequest(),
        modal;
    
    xmlHttp.open("GET", chrome.extension.getURL("lib/remote.html"));
    xmlHttp.send();
    
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            console.log("Content > Displaying: Progress Modal Window Request Successful");
            
            modal = document.createElement("div");
            modal.innerHTML = xmlHttp.responseText;
            document.getElementsByTagName("body")[0].appendChild(modal);
            document.getElementById("next-button").href = nextButton;
            document.getElementById("prev-button").href = prevButton;
            document.getElementById("home-button").href = homeButton;
            document.getElementById("striped-bar").addClass(progress);
        }
    }
}

grayOutCompletedStories = function() {
    console.log("Content > Displaying: Disabled Completed Stories");
    
    var completed = chrome.storage.sync.get("completed", function(result) {
        if (typeof(result["stories"]) !== "undefined") {
            for (var ii = 0; ii < result["stories"].length; ii++) {
                document.getElementById(result["stories"][ii]).addClass("completed");
            }
        }
    });
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
    
    var xmlHttp = new XMLHttpRequest(),
        pageLoaded,
        newElement;
    
    xmlHttp.open("GET", "https://marketolive.com/dev/pluginv3/html/analyzer.html", false);
    xmlHttp.send();
    pageLoaded = function() {
        newElement = document.createElement("div");
        newElement.innerHTML = xmlHttp.responseText;
        document.body.appendChild(newElement);
    }
    window.onload = pageLoaded();
}

var port = chrome.runtime.connect({
    name: "mycontentscript"
});

/**************************************************************************************
 *
 *  This function creates an event listener in order to capture the setting of a new 
 *  value for the company logo cookie when a new company has been submitted via popup. 
 *  This enables the overlay for both emails and landing pages to change accordingly 
 *  without requiring a tab refresh.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param [Object] message - JSON object that contains the following key/value pairs:
 *      {String} action - The name of the requested action.
 *      {String} assetType - The type of the asset for this request.
 *      {String} assetView - The mode in which this asset is being viewed (edit/preview).
 *  @param {MessageSender} sender - An object containing information about the script 
 *      context that sent a message.
 *  @param {function} sendResponse - Function to call when you have a response.
 *
 **************************************************************************************/

addNewCompanyListener = function() {
    console.log("Content > Adding: New Company Listener");
    
    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
        if (message.action == "newCompany") {
            console.log("Content > Capturing: New Company");
            
            switch(message.assetType) {
                case "email":
                    if (message.assetView == "edit") {
                        overlayEmail("edit");
                    }
                    else if (message.assetView == "preview") {
                        overlayEmail("preview");
                    }
                    break;
                case "landingPage":
                    if (message.assetView == "edit") {
                        overlayLandingPageDesigner();
                    }
                    else if (message.assetView == "preview") {
                        overlayLandingPageDesigner();
                    }
                    break;
                default:
                    break;
            }
        }
    });
}

window.onload = function() {
    console.log("Content > Window: Loaded");
    
    if (currentUrl.search(mktoAppDomain) != -1
	&& currentUrl.search(mktoDesignerDomain) == -1
	&& currentUrl.search(mktoWizard) == -1) {
		console.log("Content > Location: Marketo App");
		
		var oppInfluenceAnalyzerFragment = "AR1559A1!",
			programAnalyzerFragment = "AR1544A1!",
			modeler106Fragment = "RCM70A1!",
			modeler106abFragment = "RCM5A1!",
			successPathAnalyzerFragment = "AR1682A1!";
		
        loadScript(APP_SCRIPT_LOCATION);
        loadScript(POD_SCRIPT_LOCATION);
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
        addNewCompanyListener();
        
        if (currentUrl.search(customCompanyLandingPage106Fragment) != -1
        || currentUrl.search(customCompanyLandingPage106aFragment) != -1
        || currentUrl.search(customCompanyLandingPage106bFragment) != -1
        || currentUrl.search(customCompanyLandingPagePreview106Fragment) != -1
        || currentUrl.search(customCompanyLandingPagePreview106aFragment) != -1
        || currentUrl.search(customCompanyLandingPagePreview106bFragment) != -1
        || currentUrl.search(customCompanyEmail106Fragment) != -1
        || currentUrl.search(customCompanyEmail106aFragment) != -1
        || currentUrl.search(customCompanyEmail106bFragment) != -1
        || currentUrl.search(form106Fragment) != -1
        || currentUrl.search(form106aFragment) != -1
        || currentUrl.search(form106bFragment) != -1
        || currentUrl.search(push106Fragment) != -1
        || currentUrl.search(push106aFragment) != -1
        || currentUrl.search(push106bFragment) != -1) {
            console.log("Content > Location: Asset with Nav Bar");
            
            //Analyzer.prototype.showAssets();
        }
    }
    else if (currentUrl.search(mktoLiveColorPickerDomain) != -1) {
		console.log("Content > Location: Color-Picker Page");
        
        var correct = document.getElementById("correct"),
            incorrect = document.getElementById("incorrect"),
			sendBackgroundMsg,
            companyLogo,
            companyColor;
		
		sendBackgroundMsg = function() {
            // The split gets rid of the image size in the URL parameter
            companyLogo = document.getElementById("cookie-logo").innerHTML.split("?")[0];
            companyColor = document.getElementById("cookie-color").innerHTML;
            
            chrome.runtime.sendMessage({
                action : "setCompanyCookies",
                logo : companyLogo,
                color : companyColor
            }, function(response) {
                console.log("Content > Receiving: Message Response from Background: " + response);
            });
            window.close();
        }

        correct.onclick = sendBackgroundMsg;
		document.onkeyup = function(e) {
			if (e.which == 13) {
				sendBackgroundMsg();
			}
		}
        
        incorrect.onclick = function() {
            document.getElementById('first').style.display = "none";
            document.getElementById('second').style.display = "block";
            document.getElementById('second-incorrect').style.display = "block";
        }
    }

    else if (currentUrl.search(rtpDemoDomain) != -1) {
		console.log("Content > Location: RTP Demo");
		
        var xmlHttp = new XMLHttpRequest(),
            pageLoaded,
            newElement;
        
        xmlHttp.open("GET", RTP_NAV_BAR_LOCATION, false);
        xmlHttp.send(null);
        pageLoaded = function() {
            newElement = document.createElement('div');
            newElement.innerHTML = xmlHttp.responseText;
            document.getElementById("demo-page").appendChild(newElement);
            loadScript(RTP_DEEPLINK_SCRIPT_LOCATION);
        }
        window.onload = pageLoaded();
    }
	
	else if (currentUrl.search(emailDeliverabilityDomain) != -1) {
		console.log("Content > Location: Deliverability Tools");
		
		loadScript(DELIVERABILITY_TOOLS_SCRIPT_LOCATION);
	}
    
    else if (currentUrl.search(invisionAppDomain) != -1) {
        console.log("Content > Location: InVision App");
        
        loadScript(INVISION_APP_SCRIPT_LOCATION);
    }
}