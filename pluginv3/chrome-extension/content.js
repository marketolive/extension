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
    grayOutCompletedStories,
    overlayEmail,
    overlayLandingPage,
    addNewCompanyListener;

loadScript = function(scriptSrc) {
	console.log("Content > Loading: Script: " + scriptSrc);
	
    var scriptElement = document.createElement("script");
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
    console.log("Marketo App > Getting: Cookie " + cookieName);
    
    var name = cookieName + '=',
        cookies = document.cookie.split(';'),
        currCookie;
    
    for (var ii = 0; ii < cookies.length; ii++) {
        currCookie = cookies[ii].trim();
        if (currCookie.indexOf(name) == 0) {
            return currCookie.substring(name.length, currCookie.length);
        }
    }
    console.log("Marketo App > Getting: Cookie " + cookieName + " not found");
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
 *  This function overlays an email with the user submitted company logo and color.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

overlayEmail = function(action) {
    console.log("Marketo App > Overlaying: Email");

    var isEmailEditor2,
        clearOverlayVars,
        overlay,
        isMktoImgReplaced = isMktoTextReplaced = isMktoSubTextReplaced = isMktoButtonReplaced = isMktoEmail1Replaced = editorPrevReady = isEditorCountReset = desktopPrevReady = isDesktopCountReset = phonePrevReady = isPhoneCountReset = isDesktopPreviewReplaced = isPhonePreviewReplaced = false,
        dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUNE", "JULY", "AUG", "SEPT", "OCT", "NOV", "DEC"],
        date = new Date(),
        dayOfWeek = dayNames[date.getDay()],
        month = monthNames[date.getMonth()],
        dayOfMonth,
        year = date.getFullYear(),
        logoMktoNameRegex = new RegExp("logo", "i"),
        mainTitleMktoNameRegex = new RegExp("^main title$|^mainTitle$|^main-title$|^title$", "i"),
        subTitleMktoNameRegex = new RegExp("^subtitle$|^sub-title$", "i"),
        buttonTextRegex = new RegExp("signup|sign up|call to action|cta", "i"),
        logo = getCookie("logo"),
        color = getCookie("color"),
        company,
        companyName,
        editorRepeatReadyCount = desktopRepeatReadyCount = phoneRepeatReadyCount = 0,
        maxRepeatReady = 5000;
    
    switch (date.getDate()) {
        case 1:
            dayOfMonth = "1st";
            break;
        case 2:
            dayOfMonth = "2nd";
            break;
        case 3:
            dayOfMonth = "3rd";
            break;
        default:
            dayOfMonth = date.getDate() + "th";
            break;
    }
    
    if (logo == null) {
        logo = defaultTurnerLogoWhite;
        companyName = "Turner";
    }
    else {
        company = logo.split("https://logo.clearbit.com/")[1].split(".")[0];
        companyName = company.charAt(0).toUpperCase() + company.slice(1);
    }
    
    if (color == null) {
        color = defaultColor;
    }
    
    clearOverlayVars = function() {
        isMktoImgReplaced = isMktoTextReplaced = isMktoSubTextReplaced = isMktoButtonReplaced = isMktoEmail1Replaced = false;
        emailBody = mktoImgs = mktoTexts = mktoButtons = logoSwapCompany = logoSwapContainer = logoSwapCompanyContainer = logoBkg = buttonBkg = null;
    }
    
    overlay = function(emailDocument) {
        if (emailDocument) {
            var emailBody = emailDocument.getElementsByTagName("body")[0],
                logoSwapCompany = emailDocument.getElementById("logo-swap-company"),
                logoSwapContainer = emailDocument.getElementById("logo-swap-container"),
                logoSwapCompanyContainer = emailDocument.getElementById("logo-swap-company-container"),
                logoBkg = emailDocument.getElementById("logo-bkg"),
                buttonBkg = emailDocument.getElementById("button-bkg");
            
            if (emailBody
            && emailBody.innerHTML) {
                var mktoImgs = emailBody.getElementsByClassName("mktoImg"),
                    mktoTexts = emailBody.getElementsByClassName("mktoText"),
                    mktoButtons = emailBody.getElementsByClassName("secondary-font button");
            
                if (!isMktoImgReplaced
                && mktoImgs.length != 0) {
                    var ii,
                        currMktoImg,
                        currMktoImgMktoName,
                        currMktoImgTag;
                    
                    for (ii = 0; ii < mktoImgs.length; ii++) {
                        currMktoImg = mktoImgs[ii];
                        
                        if (currMktoImg.getAttribute("mktoname")) {
                            currMktoImgMktoName = currMktoImg.getAttribute("mktoname");
                        }
                        else if (currMktoImg.getAttribute("id")) {
                             currMktoImgMktoName = currMktoImg.getAttribute("id");
                        }
                        
                        if (currMktoImgMktoName
                        && currMktoImgMktoName.search(logoMktoNameRegex) != -1) {
                            currMktoImgTag = currMktoImg.getElementsByTagName("img")[0];
                            
                            if (currMktoImgTag
                            && currMktoImgTag.src) {
                                console.log("Marketo App > Overlaying: Email 2.0 Company Logo");
                                currMktoImgTag.setAttribute("src", logo);
                                isMktoImgReplaced = true;
                                break;
                            }
                        }
                    }
                }
                
                if (!isMktoSubTextReplaced
                && !isMktoTextReplaced
                && mktoTexts.length != 0) {
                    var ii,
                        currMktoText,
                        currMktoTextMktoName;
                    
                    for (ii = 0; ii < mktoTexts.length; ii++) {
                        currMktoText = mktoTexts[ii];
                        
                        if (currMktoText.getAttribute("mktoname")) {
                            currMktoTextMktoName = currMktoText.getAttribute("mktoname");
                        }
                        else if (currMktoText.getAttribute("id")) {
                            currMktoTextMktoName = currMktoText.getAttribute("id");
                        }
                        
                        if (currMktoTextMktoName
                        && currMktoTextMktoName.search(mainTitleMktoNameRegex) != -1) {
                            if (currMktoText.innerHTML) {
                                console.log("Marketo App > Overlaying: Email 2.0 Company Name");
                                currMktoText.innerHTML = companyName + " Invites You<br><br>PREMIER BUSINESS EVENT<br>OF THE YEAR";
                                isMktoTextReplaced = true;
                            }
                        }
                        else if (currMktoTextMktoName
                        && currMktoTextMktoName.search(subTitleMktoNameRegex) != -1) {
                            if (currMktoText.innerHTML) {
                                console.log("Marketo App > Overlaying: Email 2.0 Today's Date");
                                currMktoText.innerHTML = dayOfWeek + ", " + month + " the " + dayOfMonth + " " + year;
                                isMktoSubTextReplaced = true;
                            }
                        }
                        
                        if (isMktoSubTextReplaced
                        && isMktoTextReplaced) {
                            break;
                        }
                    }
                }
                    
                if (!isMktoButtonReplaced
                && mktoButtons.length != 0) {
                    var ii,
                        currMktoButton;
                    
                    for (ii = 0; ii < mktoButtons.length; ii++) {
                        currMktoButton = mktoButtons[ii];
                        
                        if (currMktoButton.innerHTML
                        && currMktoButton.innerHTML.search(buttonTextRegex) != -1) {
                            if (currMktoButton.style
                            && currMktoButton.style.backgroundColor) {
                                console.log("Marketo App > Overlaying: Email 2.0 Company Color");
                                currMktoButton.style.backgroundColor = color;
                                isMktoButtonReplaced = true;
                                break;
                            }
                        }
                    }
                }
            }
            
            if (logoSwapCompanyContainer
            && logoSwapContainer
            && logoSwapCompany
            && logoBkg) {
                console.log("Marketo App > Overlaying: Email 1.0 Company Logo & Color");
                logoBkg.style.backgroundColor = color;
                logoSwapCompany.setAttribute("src", logo);
                logoSwapContainer.style.display = "none";
                logoSwapCompanyContainer.style.display = "block";
                
                if (buttonBkg) {
                    buttonBkg.style.backgroundColor = color;
                }
                isMktoEmail1Replaced = true;
            }
            
            if ((isMktoButtonReplaced
                && isMktoSubTextReplaced
                && isMktoTextReplaced
                && isMktoImgReplaced)
            || isMktoEmail1Replaced) {
                clearOverlayVars();
                return true;
            }
        }
        
        return false;
    }

    isEmailEditor2 = window.setInterval(function() {
        if (action == "edit") {
            console.log("Marketo App > Overlaying: Email Editor");
            if (document.getElementsByTagName("iframe")[0]
            && document.getElementsByTagName("iframe")[0].contentWindow
            && document.getElementsByTagName("iframe")[0].contentWindow.document
            && document.getElementsByTagName("iframe")[0].contentWindow.document.readyState == "complete") {
                if (overlay(document.getElementsByTagName("iframe")[0].contentWindow.document)
                || (isEditorCountReset
                    && editorRepeatReadyCount >= maxRepeatReady)) {
                    
                    console.log("Marketo App > Overlayed: Email Editor = " + editorRepeatReadyCount);
                    console.log("Marketo App > Overlaying: Email Interval is Cleared");
                    window.clearInterval(isEmailEditor2);
                    clearOverlayVars();
                }
                else if (editorPrevReady) {
                    editorRepeatReadyCount++;
                }
                else {
                    if (editorRepeatReadyCount > 0) {
                        isEditorCountReset = true;
                    }
                    editorRepeatReadyCount = 1;
                }
                editorPrevReady = true;
            }
            else {
                editorPrevReady = false;
            }
        }
        else if (action == "preview") {
            console.log("Marketo App > Overlaying: Email Previewer");
            
            if (!isDesktopPreviewReplaced
            && document.getElementsByTagName("iframe")[2]
            && document.getElementsByTagName("iframe")[2].contentWindow
            && document.getElementsByTagName("iframe")[2].contentWindow.document
            && document.getElementsByTagName("iframe")[2].contentWindow.document.readyState == "complete") {
                if (overlay(document.getElementsByTagName("iframe")[2].contentWindow.document)
                || (isDesktopCountReset
                    && desktopRepeatReadyCount >= maxRepeatReady)) {
                    
                    console.log("Marketo App > Overlayed: Email Desktop Preview = " + desktopRepeatReadyCount);
                    isDesktopPreviewReplaced = true;
                }
                else if (desktopPrevReady) {
                    desktopRepeatReadyCount++;
                }
                else {
                    if (desktopRepeatReadyCount > 0) {
                        isDesktopCountReset = true;
                    }
                    desktopRepeatReadyCount = 1;
                }
                desktopPrevReady = true;
            }
            else {
                desktopPrevReady = false;
            }
                
            if (!isPhonePreviewReplaced
            && document.getElementsByTagName("iframe")[3]
            && document.getElementsByTagName("iframe")[3].contentWindow
            && document.getElementsByTagName("iframe")[3].contentWindow.document
            && document.getElementsByTagName("iframe")[3].contentWindow.document.readyState == "complete") {
                if (overlay(document.getElementsByTagName("iframe")[3].contentWindow.document)
                || (isPhoneCountReset
                    && phoneRepeatReadyCount >= maxRepeatReady)) {
                    
                    console.log("Marketo App > Overlayed: Email Phone Preview = " + phoneRepeatReadyCount);
                    isPhonePreviewReplaced = true;
                }
                else if (desktopPrevReady) {
                    phoneRepeatReadyCount++;
                }
                else {
                    if (phoneRepeatReadyCount > 0) {
                        isPhoneCountReset = true;
                    }
                    phoneRepeatReadyCount = 1;
                }
                phonePrevReady = true;
            }
            else {
                phonePrevReady = false;
            }
            
            if (isPhonePreviewReplaced
            && isDesktopPreviewReplaced) {
                console.log("Marketo App > Overlaying: Email Interval is Cleared");
                window.clearInterval(isEmailEditor2);
                clearOverlayVars();
            }
        }
    }, 0);
}

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
/*                case "landingPage":
                    if (message.assetView == "edit") {
                        overlayLandingPage();
                    }
                    else if (message.assetView == "preview") {
                        overlayLandingPage();
                    }
                    break;*/
                default:
                    break;
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