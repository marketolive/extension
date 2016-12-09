/**************************************************************************************
 *
 *  For whatever reason, Chrome does not allow the opening of links from inside
 *  popup.html. The workaround for this is contained below. We select all of the
 *  <a> tags, and then add a click listener that calls window.open() on the <a>
 *  tag's target URL. Jquery is also not allowed by Chrome in this context.
 *
 *  @Author Andy
 *
 *  @function
 *
 **************************************************************************************/
console.log("Popup > Running");

window.onload = function () {
    
    // This is a strange idiosyncrasy with chrome plugins. You cannot directly reference the local
    // folders without hard-coding the unique id of the plugin, which may potentially change. This is
    // the alternative to using <img src="whatever">
    document.getElementById("logo-size").src = chrome.extension.getURL("images/marketo-live-image-purp.png");
    document.getElementById("gear-size").src = chrome.extension.getURL("images/popupsettings.png");
    document.getElementById("rtp").src = chrome.extension.getURL("images/rtp-image.png");
    //document.getElementById("ecommerce").src = chrome.extension.getURL("images/shopping-cart-purple.png");
    document.getElementById("mobile-moments").src = chrome.extension.getURL("images/marketo_moments.png");
    document.getElementById("mobile-engagement").src = chrome.extension.getURL("images/mobile_engagement.png");
    document.getElementById("mobile-msi").src = chrome.extension.getURL("images/mobile_msi.png");
    //document.getElementById("event-check-in").src = chrome.extension.getURL("images/marketoball.png");
    document.getElementById("privilegesToggle").src = chrome.extension.getURL("images/toggle-on.png");
    document.getElementById("saveEditsToggle").src = chrome.extension.getURL("images/toggle-on.png");
    document.getElementById("help-size").src = chrome.extension.getURL("images/help-white.png");
    document.getElementById("training").src = chrome.extension.getURL("images/training-icon-purple-small.png");
    document.getElementById("report-a-bug").src = chrome.extension.getURL("images/report-a-bug-img-purp.png");
    
    var background = chrome.extension.getBackgroundPage(),
    URL_PATH = "m3-dev",
    mktoLiveClassicMatch = "https://marketolive.com/*",
    mktoLiveClassicUriDomain = ".marketolive.com",
    mktoDomainMatch = "https://www.marketo.com/*",
    mktoUriDomain = ".marketo.com",
    mktoDesignerMatch = "https://www.marketodesigner.com/*",
    mktoDesignerUriDomain = ".marketodesigner.com",
    clearbitDomain = "https://logo.clearbit.com/",
    tags = document.getElementsByClassName("link"),
    company = document.getElementById("name-entered"),
    submit = document.getElementById("company-submit"),
    privilegesToggle = document.getElementById("privilegesToggle"),
    saveEditsToggle = document.getElementById("saveEditsToggle"),
    clear = document.getElementById("clear-submit"),
    settings = document.getElementById("settings"),
    help = document.getElementById("help"),
    close = document.getElementById("close"),
    settingsOpen = false,
    helpOpen = false,
    openColorPicker,
    currToggleState,
    privilegesToggleCookieName = "toggleState",
    saveEditsToggleCookieName = "saveEditsToggleState",
    companyLogoCookieName = "logo",
    companyColorCookieName = "color",
    companyImageCookieName = "heroBackground",
    companyImageResCookieName = "heroBackgroundRes",
    privilegesToggleCookieMarketo = {
        "url" : mktoDomainMatch,
        "name" : privilegesToggleCookieName,
        "value" : "",
        "domain" : mktoUriDomain
    },
    privilegesToggleCookieDesigner = {
        "url" : mktoDesignerMatch,
        "name" : privilegesToggleCookieName,
        "value" : "",
        "domain" : mktoDesignerUriDomain
    },
    saveEditsToggleCookieMarketo = {
        "url" : mktoDomainMatch,
        "name" : saveEditsToggleCookieName,
        "value" : "",
        "domain" : mktoUriDomain
    },
    saveEditsToggleCookieDesigner = {
        "url" : mktoDesignerMatch,
        "name" : saveEditsToggleCookieName,
        "value" : "",
        "domain" : mktoDesignerUriDomain
    },
    companyLogoCookieMarketoLive = {
        "url" : mktoLiveClassicMatch,
        "name" : companyLogoCookieName,
        "value" : "",
        "domain" : mktoLiveClassicUriDomain
    },
    companyLogoCookieDesigner = {
        "url" : mktoDesignerMatch,
        "name" : companyLogoCookieName,
        "value" : "",
        "domain" : mktoDesignerUriDomain
    },
    companyColorCookieMarketoLive = {
        "url" : mktoLiveClassicMatch,
        "name" : companyColorCookieName,
        "value" : "",
        "domain" : mktoLiveClassicUriDomain
    },
    companyColorCookieDesigner = {
        "url" : mktoDesignerMatch,
        "name" : companyColorCookieName,
        "value" : "",
        "domain" : mktoDesignerUriDomain
    },
    companyImageCookieMarketoLive = {
        "url" : mktoLiveClassicMatch,
        "name" : companyImageCookieName,
        "value" : "",
        "domain" : mktoLiveClassicUriDomain
    },
    companyImageCookieDesigner = {
        "url" : mktoDesignerMatch,
        "name" : companyImageCookieName,
        "value" : "",
        "domain" : mktoDesignerUriDomain
    },
    companyImageResCookieMarketoLive = {
        "url" : mktoLiveClassicMatch,
        "name" : companyImageResCookieName,
        "value" : "",
        "domain" : mktoLiveClassicUriDomain
    },
    companyImageResCookieDesigner = {
        "url" : mktoDesignerMatch,
        "name" : companyImageResCookieName,
        "value" : "",
        "domain" : mktoDesignerUriDomain
    };
    
    background.getCookie(privilegesToggleCookieMarketo, function (cookie) {
        if (cookie == null
             || cookie.value == null) {
            console.log("Popup > Getting: " + privilegesToggleCookieMarketo.name + " Cookie for " + privilegesToggleCookieMarketo.url + " = null");
            currToggleState = true;
            privilegesToggleCookieMarketo.value = "true";
            document.getElementById("privilegesToggleText").innerHTML = "Privileges Enabled";
            document.getElementById("privilegesToggle").src = chrome.extension.getURL("images/toggle-on.png");
            background.setCookie(privilegesToggleCookieMarketo);
        } else if (cookie.value == "true") {
            console.log("Popup > Getting: " + cookie.name + " Cookie for " + cookie.domain + " = " + cookie.value);
            currToggleState = true;
            document.getElementById("privilegesToggleText").innerHTML = "Privileges Enabled";
            document.getElementById("privilegesToggle").src = chrome.extension.getURL("images/toggle-on.png");
        } else {
            console.log("Popup > Getting: " + cookie.name + " Cookie for " + cookie.domain + " = " + cookie.value);
            currToggleState = false;
            document.getElementById("privilegesToggleText").innerHTML = "Privileges Disabled";
            document.getElementById("privilegesToggle").src = chrome.extension.getURL("images/toggle-off.png");
        }
    });
    
    background.getCookie(privilegesToggleCookieDesigner, function (cookie) {
        if (cookie == null
             || cookie.value == null) {
            console.log("Popup > Getting: " + privilegesToggleCookieDesigner.name + " Cookie for " + privilegesToggleCookieDesigner.url + " = null");
            currToggleState = true;
            privilegesToggleCookieDesigner.value = "true";
            document.getElementById("privilegesToggleText").innerHTML = "Privileges Enabled";
            document.getElementById("privilegesToggle").src = chrome.extension.getURL("images/toggle-on.png");
            background.setCookie(privilegesToggleCookieDesigner);
        } else if (cookie.value == "true") {
            console.log("Popup > Getting: " + cookie.name + " Cookie for " + cookie.domain + " = " + cookie.value);
            currToggleState = true;
            document.getElementById("privilegesToggleText").innerHTML = "Privileges Enabled";
            document.getElementById("privilegesToggle").src = chrome.extension.getURL("images/toggle-on.png");
        } else {
            console.log("Popup > Getting: " + cookie.name + " Cookie for " + cookie.domain + " = " + cookie.value);
            currToggleState = false;
            document.getElementById("privilegesToggleText").innerHTML = "Privileges Disabled";
            document.getElementById("privilegesToggle").src = chrome.extension.getURL("images/toggle-off.png");
        }
    });
    
    background.getCookie(saveEditsToggleCookieMarketo, function (cookie) {
        if (cookie == null
             || cookie.value == null) {
            console.log("Popup > Getting: " + saveEditsToggleCookieMarketo.name + " Cookie for " + saveEditsToggleCookieMarketo.url + " = null");
            currToggleState = true;
            saveEditsToggleCookieMarketo.value = "true";
            document.getElementById("saveEditsToggleText").innerHTML = "Save Edits Enabled";
            document.getElementById("saveEditsToggle").src = chrome.extension.getURL("images/toggle-on.png");
            background.setCookie(saveEditsToggleCookieMarketo);
        } else if (cookie.value == "true") {
            console.log("Popup > Getting: " + cookie.name + " Cookie for " + cookie.domain + " = " + cookie.value);
            currToggleState = true;
            document.getElementById("saveEditsToggleText").innerHTML = "Save Edits Enabled";
            document.getElementById("saveEditsToggle").src = chrome.extension.getURL("images/toggle-on.png");
        } else {
            console.log("Popup > Getting: " + cookie.name + " Cookie for " + cookie.domain + " = " + cookie.value);
            currToggleState = false;
            document.getElementById("saveEditsToggleText").innerHTML = "Save Edits Disabled";
            document.getElementById("saveEditsToggle").src = chrome.extension.getURL("images/toggle-off.png");
        }
    });
    
    background.getCookie(saveEditsToggleCookieDesigner, function (cookie) {
        if (cookie == null
             || cookie.value == null) {
            console.log("Popup > Getting: " + saveEditsToggleCookieDesigner.name + " Cookie for " + saveEditsToggleCookieDesigner.url + " = null");
            currToggleState = true;
            saveEditsToggleCookieDesigner.value = "true";
            document.getElementById("saveEditsToggleText").innerHTML = "Save Edits Enabled";
            document.getElementById("saveEditsToggle").src = chrome.extension.getURL("images/toggle-on.png");
            background.setCookie(saveEditsToggleCookieDesigner);
        } else if (cookie.value == "true") {
            console.log("Popup > Getting: " + cookie.name + " Cookie for " + cookie.domain + " = " + cookie.value);
            currToggleState = true;
            document.getElementById("saveEditsToggleText").innerHTML = "Save Edits Enabled";
            document.getElementById("saveEditsToggle").src = chrome.extension.getURL("images/toggle-on.png");
        } else {
            console.log("Popup > Getting: " + cookie.name + " Cookie for " + cookie.domain + " = " + cookie.value);
            currToggleState = false;
            document.getElementById("saveEditsToggleText").innerHTML = "Save Edits Disabled";
            document.getElementById("saveEditsToggle").src = chrome.extension.getURL("images/toggle-off.png");
        }
    });
    
    background.getCookie(companyLogoCookieMarketoLive, function (cookie) {
        if (cookie == null
             || cookie.value == null) {
            console.log("Popup > Getting: " + companyLogoCookieMarketoLive.name + " Cookie for " + companyLogoCookieMarketoLive.url + " = null");
        } else {
            console.log("Popup > Getting: " + cookie.name + " Cookie for " + cookie.domain + " = " + cookie.value);
            company.value = cookie.value.toLowerCase().split(clearbitDomain)[1].split("?")[0];
        }
    });
    
    background.getCookie(companyLogoCookieDesigner, function (cookie) {
        if (cookie == null
             || cookie.value == null) {
            console.log("Popup > Getting: " + companyLogoCookieDesigner.name + " Cookie for " + companyLogoCookieDesigner.url + " = null");
        } else {
            console.log("Popup > Getting: " + cookie.name + " Cookie for " + cookie.domain + " = " + cookie.value);
            company.value = cookie.value.toLowerCase().split(clearbitDomain)[1].split("?")[0];
        }
    });
    
    // getElementsByClassName() returns an array, so the click
    // listener needs to be added to each one individually.
    for (var ii = 0; ii < tags.length; ii++) {
        // This is for running the Android apps inside the Chrome browser
        //        if (tags[ii].id == "mobile-moments-app") {
        //			tags[ii].onclick = function() {chrome.management.launchApp("eljfcfjdjcjilbhnjnimaigfaankeolk")};
        //		}
        //		else {
        tags[ii].onclick = function () {
            chrome.tabs.create({
                url : this.href,
                selected : true
            });
        }
        //		}
    }
    
    openColorPicker = function (companyNameSubmitted) {
        if (companyNameSubmitted) {
            companyNameSubmitted = companyNameSubmitted.toLowerCase();
            
            if (companyNameSubmitted.search("\\.[a-z0-9-]+$") == -1) {
                if (companyNameSubmitted.search("\\.$") == -1) {
                    companyNameSubmitted = companyNameSubmitted + ".com";
                } else {
                    companyNameSubmitted = companyNameSubmitted + "com";
                }
            }
            window.open("https://marketolive.com/" + URL_PATH + "/apps/color-picker.html?company=" + companyNameSubmitted);
        }
    };
    
    help.onclick = function () {
        if (!helpOpen) {
            helpOpen = true;
            document.getElementById("help-container").style.display = "block";
        } else {
            helpOpen = false;
            document.getElementById("help-container").style.display = "none";
        }
    };
    
    settings.onclick = function () {
        if (!settingsOpen) {
            settingsOpen = true;
            document.getElementById("settings-container").style.display = "block";
        } else {
            settingsOpen = false;
            document.getElementById("settings-container").style.display = "none";
        }
    };
    
    clear.onclick = function () {
        company.value = "";
        background.removeCookie(companyLogoCookieMarketoLive);
        background.removeCookie(companyLogoCookieDesigner);
        background.removeCookie(companyColorCookieMarketoLive);
        background.removeCookie(companyColorCookieDesigner);
        background.removeCookie(companyImageCookieMarketoLive);
        background.removeCookie(companyImageCookieDesigner);
        background.removeCookie(companyImageResCookieMarketoLive);
        background.removeCookie(companyImageResCookieDesigner);
        background.reloadTabs(background.mktoDesignerMatchPattern);
        setTimeout(function () {
            window.close();
        }, 1100);
        //        settingsOpen = false;
        //        document.getElementById("settings-container").style.display = "none";
    };
    
    submit.onclick = function (e) {
        openColorPicker(company.value);
    };
    
    company.onkeyup = function (e) {
        if (e.keyCode == 13) {
            openColorPicker(this.value);
            return;
        } else {
            return;
        }
    };
    
    privilegesToggle.onclick = function () {
        if (!currToggleState) {
            currToggleState = true;
            privilegesToggleCookieMarketo.value = "true";
            privilegesToggleCookieDesigner.value = "true";
            document.getElementById("privilegesToggleText").innerHTML = "Privileges Enabled";
            document.getElementById("privilegesToggle").src = chrome.extension.getURL("images/toggle-on.png");
        } else {
            currToggleState = false;
            privilegesToggleCookieMarketo.value = "false";
            privilegesToggleCookieDesigner.value = "false";
            document.getElementById("privilegesToggleText").innerHTML = "Privileges Disabled";
            document.getElementById("privilegesToggle").src = chrome.extension.getURL("images/toggle-off.png");
        }
        background.setCookie(privilegesToggleCookieMarketo);
        background.setCookie(privilegesToggleCookieDesigner);
        background.reloadTabs("*://*.marketo.com/*");
        setTimeout(function () {
            window.close();
        }, 1500);
    };
    
    saveEditsToggle.onclick = function () {
        if (!currToggleState) {
            currToggleState = true;
            saveEditsToggleCookieMarketo.value = "true";
            saveEditsToggleCookieDesigner.value = "true";
            document.getElementById("saveEditsToggleText").innerHTML = "Save Edits Enabled";
            document.getElementById("saveEditsToggle").src = chrome.extension.getURL("images/toggle-on.png");
            background.reloadCompany();
        } else {
            currToggleState = false;
            saveEditsToggleCookieMarketo.value = "false";
            saveEditsToggleCookieDesigner.value = "false";
            document.getElementById("saveEditsToggleText").innerHTML = "Save Edits Disabled";
            document.getElementById("saveEditsToggle").src = chrome.extension.getURL("images/toggle-off.png");
            background.reloadCompany();
        }
        background.setCookie(saveEditsToggleCookieMarketo);
        background.setCookie(saveEditsToggleCookieDesigner);
        setTimeout(function () {
            window.close();
        }, 1500);
    };
    
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

    function loadScript(scriptSrc) {
        console.log("Loading: Script: " + scriptSrc);
        
        var scriptElement = document.createElement("script");
        scriptElement.async = true;
        scriptElement.src = scriptSrc;
        document.getElementsByTagName("head")[0].appendChild(scriptElement);
    }
    
    loadScript(background.HEAP_ANALYTICS_SCRIPT_LOCATION);
    background.heapTrack({
        name : "Popup",
        app : "Extension",
        area : "Popup",
        version : chrome.app.getDetails().version
    });
};