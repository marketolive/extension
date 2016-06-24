console.log("Background > Running");

/**************************************************************************************
 *
 *  Global Constants
 *
 **************************************************************************************/

var mktoLiveInstances = "^https:\/\/app-(sjp|ab07|ab08)+\.marketo\.com",
    mktoLiveUserPods = "app-sjp|app-ab07|app-ab08",
    mktoLiveDomain = "^https:\/\/marketolive.com",
	mktoLiveMatch = "https://marketolive.com/*",
    mktoLiveUriDomain = ".marketolive.com",
    mktoDomainMatch = "https://www.marketo.com/*",
    mktoUriDomain = ".marketo.com",
    mktoAppDomainMatch = "https://app-*.marketo.com",
    mktoDesignerMatch = "https://www.marketodesigner.com/*",
    mktoDesignerUriDomain = ".marketodesigner.com";
    

/**************************************************************************************
 *
 *  This function retireves information about a single cookie.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param [Object] obj - JSON object that contains the following key/value pairs:
 *      {String} url - The URL with which the cookie to retrieve is associated.
 *      {String} name - The name of the cookie to retrieve.
 *  @param {function} callback - The function to be called back after getting cookie.
 *
 **************************************************************************************/
	
function getCookie(obj, callback) {
    chrome.cookies.get({
        "url" : obj.url,
        "name" : obj.name
    }, function(cookie) {
        if (cookie) {
            if (cookie.value != null) {
                console.log("Background > Getting: " + cookie.name + " Cookie for " + cookie.domain + " = " + cookie.value);
            }
            else {
                console.log("Background > Getting: " + cookie.name + " Cookie for " + cookie.domain + " = null");
            }
            if (callback) {
                callback(cookie);
            }
        }
        else {
            console.log("Background > Getting: " + obj.name + " Cookie for " + obj.url + " = undefined");
            if (callback) {
                callback(null);
            }
        }
    });
}

/**************************************************************************************
 *
 *  This function sets a cookie with the given cookie data.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param [Object] obj - JSON object that contains the following key/value pairs:
 *      {String} url - The request-URI to associate with the setting of the cookie.
 *      {String} name - The name of the cookie.
 *      {String} value - The value of the cookie.
 *      {String} domain - The domain of the cookie.
 *
 **************************************************************************************/

function setCookie(obj) {   
    var cookie = {
        url : obj.url,
        name : obj.name,
        value : obj.value,
        domain : obj.domain
    };
    chrome.cookies.set(cookie, function() {
        if (cookie.value != null) {
            console.log("Background > Setting: " + cookie.name + " Cookie for " + cookie.url + " = " + cookie.value);
        }
        else {
            console.log("Background > Setting: " + cookie.name + " Cookie for " + cookie.url + " = null");
        }
    });
}

/**************************************************************************************
 *
 *  This function deletes a cookie by name.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param [Object] obj - JSON object that contains the following key/value pairs:
 *      {String} url - The request-URI to associate with the setting of the cookie.
 *      {String} name - The name of the cookie.
 *
 **************************************************************************************/

function removeCookie(obj) {
    var cookie = {
        url : obj.url,
        name : obj.name
    };
    chrome.cookies.remove(cookie, function() {
        console.log("Background > Removing: " + cookie.name + " Cookie for " + cookie.url);
    });
}

/**************************************************************************************
 *
 *  This function reloads all Marketo tabs.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *
 **************************************************************************************/

function reloadMarketoTabs() {
    chrome.tabs.query({url : "*://*.marketo.com/*"}, function(tabs) {
        for (var ii = 0; ii < tabs.length; ii++) {
            chrome.tabs.reload(tabs[ii].id);
        }
    });
}

/**************************************************************************************
 *
 *  This function creates an event listener in order to receive the company's logo and 
 *  color from the MarketoLive Color-Picker page and then sets the cookie for both the 
 *  mktoLiveDomain and mktoDesignerDomain.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param [Object] message - JSON object that contains the following key/value pairs:
 *      {String} action - The name of the requested action.
 *      {String} logo - The company's logo as an img URL.
 *      {String} color - The company's color as an RGB value.
 *  @param {MessageSender} sender - An object containing information about the script 
 *      context that sent a message.
 *  @param {function} sendResponse - Function to call when you have a response.
 *
 **************************************************************************************/

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action == "setCompanyCookies") {
        console.log("Background > Receiving: Company Logo & Color");
        
		var companyLogoCookieName = "logo",
            companyColorCookieName = "color",
            companyLogoCookieMarketoLive = {
                "url" : mktoLiveMatch,
                "name" : companyLogoCookieName,
                "value" : message.logo,
                "domain" : mktoLiveUriDomain
            },
            companyLogoCookieDesigner = {
                "url" : mktoDesignerMatch,
                "name" : companyLogoCookieName,
                "value" : message.logo,
                "domain" : mktoDesignerUriDomain
            },
            companyColorCookieMarketoLive = {
                "url" : mktoLiveMatch,
                "name" : companyColorCookieName,
                "value" : message.color,
                "domain" : mktoLiveUriDomain
            },
            companyColorCookieDesigner = {
                "url" : mktoDesignerMatch,
                "name" : companyColorCookieName,
                "value" : message.color,
                "domain" : mktoDesignerUriDomain
            };
        
        setCookie(companyColorCookieMarketoLive);
        setCookie(companyColorCookieDesigner);
        setCookie(companyLogoCookieMarketoLive);
        setCookie(companyLogoCookieDesigner);
    }
});

/**************************************************************************************
 *
 *  This function sets the MarketoLive cookie to identify the user's pod.
 *
 *  @Author Andy
 *
 *  @function
 *
 *  @param {Integer} tabId - The browser tab ID.
 *  @param {String} changeInfo - The change event.
 *  @param {Object} tab - The object that represents the browser tab.
 *
 **************************************************************************************/

function checkForValidUrl(tabId, changeInfo, tab) {
    console.log("Background > Checking: Valid URL");
    
    var currentUrl = tab.url,
        mktoPodCookieMarketo = {
            "url" : mktoAppDomainMatch,
            "name" : "mkto_pod"
        },
        userPod,
        userPodCookieName,
        userPodCookieMarketo,
        userPodCookieDesigner,
        userPodCookieMarketoLive;
    
    chrome.browserAction.enable(tabId);
    
    if (currentUrl.search(mktoLiveInstances)
    || currentUrl.search(mktoLiveDomain)) {
        getCookie(mktoPodCookieMarketo, function(cookie) {
            if (cookie) {
                userPod = cookie.value.split('.')[0].split(':')[1];
                if (userPod) {
                    userPodCookieName = "userPod";
                    if (userPod.search(mktoLiveUserPods) != -1) {
                        userPodCookieMarketo = {
                            "url" : mktoDomainMatch,
                            "name" : userPodCookieName,
                            "value" : userPod,
                            "domain" : mktoUriDomain
                        };
                        userPodCookieDesigner = {
                            "url" : mktoDesignerMatch,
                            "name" : userPodCookieName,
                            "value" : userPod,
                            "domain" : mktoDesignerUriDomain
                        };
                        userPodCookieMarketoLive = {
                            "url" : mktoLiveMatch,
                            "name" : userPodCookieName,
                            "value" : userPod,
                            "domain" : mktoLiveUriDomain
                        };
                        
                        setCookie(userPodCookieMarketo);
                        setCookie(userPodCookieDesigner);
                        setCookie(userPodCookieMarketoLive);
                    }
                }
                else {
                    console.log("Background > Checking: " + userPodCookieName + " is null for the tab " + currentUrl);
                }
            }
            else {
                console.log("Background > Checking: mkto_pod is null for the tab " + currentUrl);
            }
        });
    }
}

/**************************************************************************************
 *
 *  Main
 *  
 **************************************************************************************/

chrome.tabs.onUpdated.addListener(checkForValidUrl);