/**************************************************************************************
 *
 *  Global Constants
 *
 **************************************************************************************/

var URL_PATH = "m3-dev",
HEAP_ANALYTICS_SCRIPT_LOCATION = "https://marketolive.com/" + URL_PATH + "/pluginv3/heap-analytics-ext.min.js",
BACKGROUND_DATA_SCRIPT_LOCATION = "https://marketolive.com/" + URL_PATH + "/pluginv3/background-demo-data.min.js",
mktoLiveInstances = "^https:\/\/app-sjp\.marketo\.com",
mktoLiveUserPods = "app-sjp",
mktoLiveDomain = "^http:\/\/www\.marketolive\.com",
mktoLiveDomainMatch = "http://www.marketolive.com/*",
mktoLiveUriDomain = ".marketolive.com",
mktoLiveClassicDomain = "^https:\/\/marketolive\.com",
mktoLiveClassicDomainMatch = "https://marketolive.com/*",
mktoLiveClassicUriDomain = ".marketolive.com",
mktoAppDomainMatch = "https://app-*.marketo.com",
mktoAppUriDomain = ".marketo.com",
mktoDesignerDomainMatch = "https://www.marketodesigner.com/*",
mktoDesignerUriDomain = ".marketodesigner.com",
mktoDesignerMatchPattern = "https://*.marketodesigner.com/*",
mktoSjpWebRequest = "https://app-sjp.marketo.com/",
mktoSjdemo1WebRequest = "https://app-sjdemo1.marketo.com/",
//mktoLoginWebRequestMatch = "https://login.marketo.com/",
//mktoAppWebRequestMatch = "https://app.marketo.com/",
//mktoSjpLoginWebRequest = "https://app-sjp.marketo.com/homepage/login*",
//mktoSjdemo1LoginWebRequest = "https://app-sjdemo1.marketo.com/homepage/login*",
mktoEmailDesignerFragment = "EME",
mktoEmailPreviewFragmentRegex = new RegExp("#EME[0-9]+&isPreview", "i"),
mktoEmailPreviewFragment = "EMP",
mktoLandingPageDesignerFragment = "LPE",
mktoLandingPagePreviewFragment = "LPPD",
oneLoginExtMsgRegex = "https:\/\/marketo\.onelogin\.com\/client\/apps",
colorPickerMsgRegex = "https:\/\/marketolive\.com\/" + URL_PATH + "\/apps\/color-picker\.html\\?.+",
count = 0,
oneLoginFirstName,
oneLoginLastName,
oneLoginEmail;

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

/**************************************************************************************
 *
 *  This function issues an HTTP request.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {String} url - The HTTP request URL.
 *  @param {String} params - The parameters to pass in the body of the request.
 *  @param {String} method - The HTTP request method (e.g. GET, POST, PATCH).
 *  @param {String} responseType - The type of the response (e.g. document, json, text).
 *  @param {Function} callback - The callback function.
 *
 **************************************************************************************/

function webRequest = function (url, params, method, responseType, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.response);
    }
    xmlHttp.open(method, url, true); // true for asynchronous
    xmlHttp.responseType = responseType;
    xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlHttp.send(params);
};

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
    }, function (cookie) {
        if (cookie) {
            if (cookie.value != null) {
                console.log("Getting: " + cookie.name + " Cookie for " + cookie.domain + " = " + cookie.value);
            } else {
                console.log("Getting: " + cookie.name + " Cookie for " + cookie.domain + " = null");
            }
            if (callback) {
                callback(cookie);
            }
        } else {
            console.error("Getting: " + obj.name + " Cookie for " + obj.url + " = undefined");
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
        domain : obj.domain,
    };
    
    if (obj.expiresInDays) {
        cookie.expirationDate = new Date().getTime()/1000 + (obj.expiresInDays * 24 * 60 * 60);
    }
    chrome.cookies.set(cookie, function () {
        if (cookie.value != null) {
            console.log("Setting: " + cookie.name + " Cookie for " + cookie.domain + " = " + cookie.value);
        } else {
            console.log("Setting: " + cookie.name + " Cookie for " + cookie.domain + " = null");
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
    chrome.cookies.remove(cookie, function () {
        console.log("Removing: " + cookie.name + " Cookie for " + cookie.url);
    });
}

/**************************************************************************************
 *
 *  This function reloads all tabs that match the specified URL pattern.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *
 **************************************************************************************/

function reloadTabs(urlMatch) {
    chrome.tabs.query({
        url : urlMatch
    }, function (tabs) {
        for (var ii = 0; ii < tabs.length; ii++) {
            chrome.tabs.reload(tabs[ii].id);
        }
    });
}

/**************************************************************************************
 *
 *  This function reloads the company logo and color on all Marketo designer tabs in
 *  order to support email and landing page overlay without requiring to reload the tab.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

function reloadCompany() {
    console.log("Loading: Company Logo & Color");
    
    var companyLogoCookieDesigner = {
        "url" : mktoDesignerDomainMatch,
        "name" : "logo"
    },
    saveEditsToggleCookieDesigner = {
        "url" : mktoDesignerDomainMatch,
        "name" : "saveEditsToggleState"
    },
    setAssetData,
    queryInfo = {
        "currentWindow" : true,
        "url" : mktoDesignerMatchPattern
    },
    message = {
        "action" : "",
        "assetType" : "",
        "assetView" : ""
    };
    
    getCookie(companyLogoCookieDesigner, function (cookie) {
        if (cookie
             && cookie.value) {
            setAssetData = function (tab) {
                if (tab.url.search("#" + mktoEmailDesignerFragment + "[0-9]+$") != -1) {
                    console.log("Loading: Company Logo, Hero Background, Color for Email Designer");
                    message.assetType = "email";
                    message.assetView = "edit";
                } else if (tab.url.search(mktoEmailPreviewFragmentRegex) != -1
                     || tab.url.search("#" + mktoEmailPreviewFragment + "[0-9]+$") != -1) {
                    console.log("Loading: Company Logo, Hero Background, Color for Email Previewer");
                    message.assetType = "email";
                    message.assetView = "preview";
                } else if (tab.url.search("#" + mktoLandingPageDesignerFragment + "[0-9]+$") != -1) {
                    console.log("Loading: Company Logo, Hero Background, Color for Landing Page Designer");
                    message.assetType = "landingPage";
                    message.assetView = "edit";
                } else if (tab.url.search("#" + mktoLandingPagePreviewFragment + "[0-9]+$") != -1) {
                    console.log("Loading: Company Logo, Hero Background, Color for Landing Page Previewer");
                    message.assetType = "landingPage";
                    message.assetView = "preview";
                }
                
                if (message.assetType
                     && message.assetView) {
                    chrome.tabs.sendMessage(tab.id, message, function (response) {
                        console.log("Receiving: Message Response from Content for tab: " + tab.url + " " + response);
                    });
                    message.assetType = message.assetView = "";
                }
            }
            
            message.action = "newCompany";
            chrome.tabs.query(queryInfo, function (tabs) {
                for (var ii = 0; ii < tabs.length; ii++) {
                    setAssetData(tabs[ii]);
                }
            });
        } else {
            console.log("NOT Loading: Company Logo & Color as logo is undefined");
        }
    });
}

/**************************************************************************************
 *
 *  This function registers an event listener for app-sjp.marketo.com and 
 *  app-sjdemo1.marketo.com demo pods web requests in order to initiate background data 
 *  submission.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {function} - Callback function for the response.
 *
 **************************************************************************************/

chrome.webRequest.onCompleted.addListener(function (details) {
    console.log("webRequest Completed: " + details.url);
    
    loadScript(BACKGROUND_DATA_SCRIPT_LOCATION);
    heapTrack({
        name: "Marketo > Demo Pod",
        app: "Marketo",
        area: "Demo Pod"
    });
}, {
    urls : [mktoSjpWebRequest, mktoSjdemo1WebRequest]
});

/**************************************************************************************
 *
 *  This function registers an event listener in order to receive the company's logo
 *  and color from the MarketoLive Color-Picker page and then sets the cookie for both
 *  the mktoLiveClassicDomain and mktoDesignerDomain.
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

chrome.runtime.onMessageExternal.addListener(function (message, sender, sendResponse) {
    if (sender.url == oneLoginExtMsgRegex) {
        console.log("Receiving: OneLogin User");
        
        oneLoginFirstName = message.firstName;
        oneLoginLastName = message.lastName;
        oneLoginEmail = message.email;
        
        var usernameCookieName = "onelogin_username",
        firstNameCookieName = "onelogin_first_name",
        lastNameCookieName = "onelogin_last_name",
        emailCookieName = "onelogin_email",
        expiresInDays = 365,
        usernameCookieMarketoLive = {
            "url" : mktoLiveDomainMatch,
            "name" : usernameCookieName,
            "value" : message.username,
            "domain" : mktoLiveUriDomain,
            "expiresInDays" : expiresInDays
        },
        usernameCookieMarketoLiveClassic = {
            "url" : mktoLiveClassicDomainMatch,
            "name" : usernameCookieName,
            "value" : message.username,
            "domain" : mktoLiveClassicUriDomain,
            "expiresInDays" : expiresInDays
        },
        usernameCookieMarketoApp = {
            "url" : mktoAppDomainMatch,
            "name" : usernameCookieName,
            "value" : message.username,
            "domain" : mktoAppUriDomain,
            "expiresInDays" : expiresInDays
        },
        usernameCookieDesigner = {
            "url" : mktoDesignerMatchPattern,
            "name" : usernameCookieName,
            "value" : message.username,
            "domain" : mktoDesignerUriDomain,
            "expiresInDays" : expiresInDays
        },
        firstNameCookieMarketoLive = {
            "url" : mktoLiveDomainMatch,
            "name" : firstNameCookieName,
            "value" : message.firstName,
            "domain" : mktoLiveUriDomain,
            "expiresInDays" : expiresInDays
        },
        firstNameCookieMarketoLiveClassic = {
            "url" : mktoLiveClassicDomainMatch,
            "name" : firstNameCookieName,
            "value" : message.firstName,
            "domain" : mktoLiveClassicUriDomain,
            "expiresInDays" : expiresInDays
        },
        firstNameCookieMarketoApp = {
            "url" : mktoAppDomainMatch,
            "name" : firstNameCookieName,
            "value" : message.firstName,
            "domain" : mktoAppUriDomain,
            "expiresInDays" : expiresInDays
        },
        firstNameCookieDesigner = {
            "url" : mktoDesignerMatchPattern,
            "name" : firstNameCookieName,
            "value" : message.firstName,
            "domain" : mktoDesignerUriDomain,
            "expiresInDays" : expiresInDays
        },
        lastNameCookieMarketoLive = {
            "url" : mktoLiveDomainMatch,
            "name" : lastNameCookieName,
            "value" : message.lastName,
            "domain" : mktoLiveUriDomain,
            "expiresInDays" : expiresInDays
        },
        lastNameCookieMarketoLiveClassic = {
            "url" : mktoLiveClassicDomainMatch,
            "name" : lastNameCookieName,
            "value" : message.lastName,
            "domain" : mktoLiveClassicUriDomain,
            "expiresInDays" : expiresInDays
        },
        lastNameCookieMarketoApp = {
            "url" : mktoAppDomainMatch,
            "name" : lastNameCookieName,
            "value" : message.lastName,
            "domain" : mktoAppUriDomain,
            "expiresInDays" : expiresInDays
        },
        lastNameCookieDesigner = {
            "url" : mktoDesignerMatchPattern,
            "name" : lastNameCookieName,
            "value" : message.lastName,
            "domain" : mktoDesignerUriDomain,
            "expiresInDays" : expiresInDays
        },
        emailCookieMarketoLive = {
            "url" : mktoLiveDomainMatch,
            "name" : emailCookieName,
            "value" : message.email,
            "domain" : mktoLiveUriDomain,
            "expiresInDays" : expiresInDays
        },
        emailCookieMarketoLiveClassic = {
            "url" : mktoLiveClassicDomainMatch,
            "name" : emailCookieName,
            "value" : message.email,
            "domain" : mktoLiveClassicUriDomain,
            "expiresInDays" : expiresInDays
        },
        emailCookieMarketoApp = {
            "url" : mktoAppDomainMatch,
            "name" : emailCookieName,
            "value" : message.email,
            "domain" : mktoAppUriDomain,
            "expiresInDays" : expiresInDays
        },
        emailCookieDesigner = {
            "url" : mktoDesignerMatchPattern,
            "name" : emailCookieName,
            "value" : message.email,
            "domain" : mktoDesignerUriDomain,
            "expiresInDays" : expiresInDays
        };
        
        setCookie(usernameCookieMarketoLive);
        setCookie(usernameCookieMarketoLiveClassic);
        setCookie(usernameCookieMarketoApp);
        setCookie(usernameCookieDesigner);
        setCookie(firstNameCookieMarketoLive);
        setCookie(firstNameCookieMarketoLiveClassic);
        setCookie(firstNameCookieMarketoApp);
        setCookie(firstNameCookieDesigner);
        setCookie(lastNameCookieMarketoLive);
        setCookie(lastNameCookieMarketoLiveClassic);
        setCookie(lastNameCookieMarketoApp);
        setCookie(lastNameCookieDesigner);
        setCookie(emailCookieMarketoLive);
        setCookie(emailCookieMarketoLiveClassic);
        setCookie(emailCookieMarketoApp);
        setCookie(emailCookieDesigner);
        
        loadScript(BACKGROUND_DATA_SCRIPT_LOCATION);
        heapTrack({
            name : "OneLogin > Apps",
            app : "OneLogin",
            area : "Apps"
        });
        return sendResponse;
    } else if (sender.url.search(colorPickerMsgRegex) != -1) {
        if (message.action == "setCompanyCookies") {
            console.log("Receiving: Company Logo, Color, Image");
            
            var companyLogoCookieName = "logo",
            companyColorCookieName = "color",
            companyImageCookieName = "heroBackground",
            companyImageResCookieName = "heroBackgroundRes";
            
            if (message.logo) {
                setCookie({
                    "url" : mktoLiveClassicDomainMatch,
                    "name" : companyLogoCookieName,
                    "value" : message.logo,
                    "domain" : mktoLiveClassicUriDomain
                });
                
                setCookie({
                    "url" : mktoDesignerDomainMatch,
                    "name" : companyLogoCookieName,
                    "value" : message.logo,
                    "domain" : mktoDesignerUriDomain
                });
            }
            
            if (message.color) {
                setCookie({
                    "url" : mktoLiveClassicDomainMatch,
                    "name" : companyColorCookieName,
                    "value" : message.color,
                    "domain" : mktoLiveClassicUriDomain
                });
                
                setCookie({
                    "url" : mktoDesignerDomainMatch,
                    "name" : companyColorCookieName,
                    "value" : message.color,
                    "domain" : mktoDesignerUriDomain
                });
            } else {
                removeCookie({
                    "url" : mktoLiveClassicDomainMatch,
                    "name" : companyColorCookieName
                });
                
                removeCookie({
                    "url" : mktoDesignerDomainMatch,
                    "name" : companyColorCookieName
                });
            }
            
            if (message.image) {
                setCookie({
                    "url" : mktoLiveClassicDomainMatch,
                    "name" : companyImageCookieName,
                    "value" : message.image,
                    "domain" : mktoLiveClassicUriDomain
                });
                
                setCookie({
                    "url" : mktoDesignerDomainMatch,
                    "name" : companyImageCookieName,
                    "value" : message.image,
                    "domain" : mktoDesignerUriDomain
                });
            } else {
                removeCookie({
                    "url" : mktoLiveClassicDomainMatch,
                    "name" : companyImageCookieName
                });
                
                removeCookie({
                    "url" : mktoDesignerDomainMatch,
                    "name" : companyImageCookieName
                });
            }
            
            if (message.imageRes) {
                setCookie({
                    "url" : mktoLiveClassicDomainMatch,
                    "name" : companyImageResCookieName,
                    "value" : message.imageRes,
                    "domain" : mktoLiveClassicUriDomain
                });
                
                setCookie({
                    "url" : mktoDesignerDomainMatch,
                    "name" : companyImageResCookieName,
                    "value" : message.imageRes,
                    "domain" : mktoDesignerUriDomain
                });
            }
            
            if (message.logo
                 || message.color
                 || message.image) {
                
                getCookie({
                    "url": mktoDesignerDomainMatch,
                    "name": "saveEditsToggleState"
                }, function (cookie) {
                    if (cookie
                         && cookie.value == "true") {
                        reloadTabs("*://*"+mktoDesignerUriDomain+"/*");
                    } else {
                        reloadCompany();
                    }
                });
            }
        }
    } else {
        console.log("Unexpected Message: " + JSON.stringify(message) + " : " + sender.url);
        return sendResponse;
    }
});

chrome.runtime.onUpdateAvailable.addListener(function (details) {
    chrome.tabs.create({
        url : "https://docs.google.com/document/d/1w87HqvlDXwDHFyavRzDEIHzaIOVTYsTR9a_tn6ZpWpk/edit?usp=sharing",
        active : true,
        selected : true
    });
    
    return;
});

/**************************************************************************************
 *
 *  This function sets the MarketoLiveClassic cookie to identify the user's pod.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

function setMarketoUserPodCookie() {
    console.log("Setting: Marketo User Pod Cookie");
    
    var userPodCookieName = "userPod",
    userPod = "app-sjp",
    expiresInDays = 365,
    userPodCookieMarketo = {
        "url" : mktoAppDomainMatch,
        "name" : userPodCookieName,
        "value" : userPod,
        "domain" : mktoAppUriDomain,
        "expiresInDays" : expiresInDays
    },
    userPodCookieDesigner = {
        "url" : mktoDesignerDomainMatch,
        "name" : userPodCookieName,
        "value" : userPod,
        "domain" : mktoDesignerUriDomain,
        "expiresInDays" : expiresInDays
    },
    userPodCookieMarketoLiveClassic = {
        "url" : mktoLiveClassicDomainMatch,
        "name" : userPodCookieName,
        "value" : userPod,
        "domain" : mktoLiveClassicUriDomain,
        "expiresInDays" : expiresInDays
    };
    
    setCookie(userPodCookieMarketo);
    setCookie(userPodCookieDesigner);
    setCookie(userPodCookieMarketoLiveClassic);
}

/**************************************************************************************
 *
 *  This function issues a tracking event for Heap Analytics
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {Object} event - the details of the event to track
 *
 **************************************************************************************/

function heapTrack(event) {
    var isHeapAnalyticsForBackground = window.setInterval(function () {
            if (typeof(heap) !== "undefined"
                 && heap) {
                
                window.clearInterval(isHeapAnalyticsForBackground);
                
                if (oneLoginEmail) {
                    heap.identify(oneLoginEmail);
                } else {
                    getCookie({
                        url : mktoLiveDomainMatch,
                        name : "onelogin_email"
                    }, function (cookie) {
                        if (cookie
                             && cookie.value) {
                            
                            heap.identify(cookie.value);
                        } else {
                            heap.identify();
                        }
                    });
                }
                
                if (oneLoginFirstName
                     && oneLoginLastName) {
                    console.log("OneLogin > Heap Analytics ID: " + oneLoginFirstName + " " + oneLoginLastName);
                    
                    heap.addUserProperties({
                        Name : oneLoginFirstName + " " + oneLoginLastName
                    });
                } else {
                    getCookie({
                        url : mktoLiveDomainMatch,
                        name : "onelogin_first_name"
                    }, function (cookie) {
                        if (cookie
                             && cookie.value) {
                            
                            oneLoginFirstName = cookie.value;
                        }
                    });
                    
                    getCookie({
                        url : mktoLiveDomainMatch,
                        name : "onelogin_last_name"
                    }, function (cookie) {
                        if (cookie
                             && cookie.value) {
                            
                            oneLoginLastName = cookie.value;
                        }
                    });
                    
                    if (oneLoginFirstName
                         && oneLoginLastName) {
                        console.log("OneLogin > Heap Analytics ID: " + oneLoginFirstName + " " + oneLoginLastName);
                        
                        heap.addUserProperties({
                            Name : oneLoginFirstName + " " + oneLoginLastName
                        });
                    }
                }
                
                if (event) {
                    console.log("Extension > Tracking: Heap Event:\n" + JSON.stringify(event, null, 2));
                    
                    heap.track(event.name, {
                        app : event.app,
                        area : event.area,
                        version : event.version
                    });
                }
            }
        }, 0);
}

/**************************************************************************************
 *
 *  This function sets the MarketoLiveClassic cookie to identify the user's pod.
 *
 *  @Author Andy
 *
 *  @function
 *
 **************************************************************************************/
/*
function setMarketoUserPod() {
console.log("Setting: Marketo User Pod");

getCookie({
"url" : mktoAppDomainMatch,
"name" : "mkto_pod"
}, function (cookie) {
if (cookie) {
var userPod = cookie.value.split('.')[0].split(':')[1];
if (userPod) {
var userPodCookieName = "userPod",

if (userPod.search(mktoLiveUserPods) != -1) {
var userPodCookieMarketo = {
"url" : mktoAppDomainMatch,
"name" : userPodCookieName,
"value" : userPod,
"domain" : mktoAppUriDomain
},
userPodCookieDesigner = {
"url" : mktoDesignerDomainMatch,
"name" : userPodCookieName,
"value" : userPod,
"domain" : mktoDesignerUriDomain
},
userPodCookieMarketoLiveClassic = {
"url" : mktoLiveClassicDomainMatch,
"name" : userPodCookieName,
"value" : userPod,
"domain" : mktoLiveClassicUriDomain
};

setCookie(userPodCookieMarketo);
setCookie(userPodCookieDesigner);
setCookie(userPodCookieMarketoLiveClassic);
}
} else {
console.error("Checking: " + userPodCookieName + " is null");
}
} else {
console.error("Checking: mkto_pod is null");
}
});
}*/

/**************************************************************************************
 *
 *  Main
 *
 **************************************************************************************/

console.log("Running");

setMarketoUserPodCookie();
loadScript(HEAP_ANALYTICS_SCRIPT_LOCATION);
heapTrack({
    name : "Background",
    app : "Extension",
    area : "Background",
    version : chrome.app.getDetails().version
});