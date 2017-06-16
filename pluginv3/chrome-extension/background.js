console.log("Background > Running");

/**************************************************************************************
 *
 *  This background script contains all of the functionality needed to support the 
 *  extension.
 *
 *  @Author Brian Fisher
 *
 *  @namespace
 *
 **************************************************************************************/

var URL_PATH = "m3-dev",

HEAP_ANALYTICS_SCRIPT_LOCATION = "https://marketolive.com/" + URL_PATH + "/pluginv3/heap-analytics-ext.min.js",
BACKGROUND_DATA_SCRIPT_LOCATION = "https://marketolive.com/" + URL_PATH + "/pluginv3/background-demo-data.min.js",

mktoLiveInstances = "^(https://app-sjdemo1\.marketo\.com/|https://app-sjp\.marketo\.com/)",
mktoLiveDomainMatch = "http://www.marketolive.com/*",
mktoLiveUriDomain = ".marketolive.com",
mktoLiveClassicDomainMatch = "https://marketolive.com/*",
mktoLiveClassicUriDomain = ".marketolive.com",
mktoAppDomainMatch = "https://app-*.marketo.com",
mktoAppUriDomain = ".marketo.com",
mktoDesignerDomainMatch = "https://www.marketodesigner.com/*",
mktoDesignerUriDomain = ".marketodesigner.com",
mktoDesignerMatchPattern = "https://*.marketodesigner.com/*",
mktoSjpWebRequest = "https://app-sjp.marketo.com/",
mktoSjdemo1WebRequest = "https://app-sjdemo1.marketo.com/",
oneLoginUrl = "https://marketo.onelogin.com/client/apps",

mktoEmailDesignerFragment = "EME",
mktoEmailPreviewFragmentRegex = new RegExp("#EME[0-9]+&isPreview", "i"),
mktoEmailPreviewFragment = "EMP",
mktoLandingPageDesignerFragment = "LPE",
mktoLandingPagePreviewFragment = "LPPD",

adTargetingRegEx = "^http(s)?://www\.marketolive\.com/en/tools/ad-targeting",
companyPickerRegEx = "^https://marketolive\.com/" + URL_PATH + "/apps/color-picker\.html\\?company=.+",

mktoAppUserCookie = "ids_sso",
munchkinIdsMatch = "^(185-NGX-811|026-COU-482|767-TVJ-204)$",

//adminUserNamesMatch = "^mktodemolivemaster@marketo\.com$|^admin(\.[a-z]{0,2})?@(marketolive.com$|mktodemoaccount)|^marketodemo.*@gmail\.com$",
adminUserNamesMatch = "^mktodemolivemaster@marketo\.com$|^admin(\.[a-z]{0,2})?@(marketolive.com$|mktodemoaccount)|^mktodemoaccount[a-z0-9]*@marketo\.com$|^marketodemo.*@gmail\.com$",
mktoLiveBlockUrlPatterns = ["*://sjrtp3.marketo.com/app/*", "*://sj-ee-api.marketo.com/api/v1/settings/dimensions/activate/*", "*://seo.marketo.com/*", "*://250ok.com/*"],
mktoLiveRtpDomainsMatch = "sjrtp3\.marketo\.com",

oneLoginFirstName,
oneLoginLastName,
oneLoginEmail,
mktoUserId,
mktoName,
mktoRole,
lastMktoMessageDate,
numOfMktoLiveMessage;

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
 *  @param {Boolean} async - Type of request execution (true = async, false = sync).
 *  @param {String} responseType - The type of the response (e.g. document, json, text).
 *  @param {Function} callback - The callback function.
 *
 **************************************************************************************/

function webRequest(url, params, method, async, responseType, callback) {
    console.log("Web Request > " + url + "\n" + params);
    var xmlHttp = new XMLHttpRequest(),
    result;
    xmlHttp.onreadystatechange = function () {
        if (callback
             && xmlHttp.readyState == 4
             && xmlHttp.status == 200)
            result = callback(xmlHttp.response);
    }
    if (async
         && xmlHttp.responseType) {
        xmlHttp.responseType = responseType;
    }
    xmlHttp.open(method, url, async); // true for asynchronous
    xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
    xmlHttp.send(params);
    return result;
}

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
        "url": obj.url,
        "name": obj.name
    }, function (cookie) {
        if (cookie) {
            if (cookie.value != null) {
                console.log("Getting: " + cookie.name + " Cookie for " + cookie.domain + " = " + cookie.value);
            } else {
                console.log("Getting: " + cookie.name + " Cookie for " + cookie.domain + " = null");
            }
            if (callback) {
                return callback(cookie);
            }
        } else {
            console.log("Getting: " + obj.name + " Cookie for " + obj.url + " = undefined");
            if (callback) {
                return callback();
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
        url: obj.url,
        name: obj.name,
        value: obj.value,
        domain: obj.domain,
    };
    
    if (obj.expiresInDays) {
        cookie.expirationDate = new Date().getTime() / 1000 + (obj.expiresInDays * 24 * 60 * 60);
    }
    if (obj.secure) {
        cookie.secure = obj.secure;
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
        url: obj.url,
        name: obj.name
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
        url: urlMatch
    }, function (tabs) {
        for (var ii = 0; ii < tabs.length; ii++) {
            chrome.tabs.reload(tabs[ii].id);
        }
    });
}

function findAndReloadOrCreateTab(tabInfo) {
    chrome.tabs.query({
        url: tabInfo.urlMatch
    }, function (tabs) {
        if (tabs.length > 0) {
            if (tabs[0].url == tabInfo.urlCreate) {
                chrome.tabs.reload(tabs[0].id);
                chrome.tabs.update(tabs[0].id, {
                    active: true
                });
            } else {
                chrome.tabs.update(tabs[0].id, {
                    url: tabInfo.urlCreate,
                    active: true
                });
            }
        } else {
            chrome.tabs.create({
                url: tabInfo.urlCreate,
                active: true
            });
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
        "url": mktoDesignerDomainMatch,
        "name": "logo"
    },
    saveEditsToggleCookieDesigner = {
        "url": mktoDesignerDomainMatch,
        "name": "saveEditsToggleState"
    },
    setAssetData,
    queryInfo = {
        "currentWindow": true,
        "url": mktoDesignerMatchPattern
    },
    message = {
        "action": "",
        "assetType": "",
        "assetView": ""
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
    urls: [mktoSjpWebRequest, mktoSjdemo1WebRequest]
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
        "url": mktoAppDomainMatch,
        "name": userPodCookieName,
        "value": userPod,
        "domain": mktoAppUriDomain,
        "expiresInDays": expiresInDays
    },
    userPodCookieDesigner = {
        "url": mktoDesignerDomainMatch,
        "name": userPodCookieName,
        "value": userPod,
        "domain": mktoDesignerUriDomain,
        "expiresInDays": expiresInDays
    },
    userPodCookieMarketoLiveClassic = {
        "url": mktoLiveClassicDomainMatch,
        "name": userPodCookieName,
        "value": userPod,
        "domain": mktoLiveClassicUriDomain,
        "expiresInDays": expiresInDays
    };
    
    setCookie(userPodCookieMarketo);
    setCookie(userPodCookieDesigner);
    setCookie(userPodCookieMarketoLiveClassic);
}

function createBasicNotification(notification, extensionId) {
    var notify = {
        type: "basic",
        iconUrl: "http://www.marketolive.com/static/marketo-live-circle-logo.png",
        title: notification.title,
        message: notification.message,
        requireInteraction: notification.requireInteraction
    };
    
    if (notification.buttonTitle) {
        notify.buttons = [{
                title: notification.buttonTitle
            }
        ];
        
        chrome.notifications.onButtonClicked.addListener(function (notificationId, buttonIndex) {
            if (notificationId == notification.id
                 && buttonIndex == 0) {
                switch (notification.action) {
                case "update":
                    var url = "chrome://extensions";
                    
                    if (extensionId) {
                        url += "/?id=" + extensionId
                    }
                    chrome.tabs.create({
                        url: url
                    });
                    break;
                case "enable":
                    chrome.management.setEnabled(extensionId, true);
                    chrome.notifications.clear(notificationId);
                    break;
                case "uninstall":
                    chrome.management.uninstall(extensionId);
                    break;
                }
                
                if (notification.reload) {
                    chrome.runtime.reload();
                }
                
                chrome.notifications.onButtonClicked.removeListener(this);
            }
        });
    }
    
    chrome.notifications.create(notification.id, notify);
}

function checkForOldExtension(extensionMinVersion) {
    var versionSplit = chrome.app.getDetails().version.split("."),
    minVersionSplit = extensionMinVersion.split("."),
    version = minVersion = "";
    
    for (var ii = 0; ii < versionSplit.length; ii++) {
        version += versionSplit[ii];
        minVersion += minVersionSplit[ii];
    }
    version = parseInt(version);
    minVersion = parseInt(minVersion);
    
    if (version < minVersion) {
        var oldExtensionNotification = {
            id: "MarketoLive Extension is Out of Date",
            title: "Extension is Out of Date",
            message: "Your MarketoLive extension is older than the required minimum version (" + extensionMinVersion + ").",
            buttonTitle: "Update Extension",
            requireInteraction: true,
            action: "update",
            reload: false
        };
        
        createBasicNotification(oldExtensionNotification, chrome.app.getDetails().id);
        
        heapTrack({
            name: "Old Extension",
            app: "Extension",
            area: "Background",
            version: chrome.app.getDetails().version
        });
        
        return {
            isValidExtension: false
        };
    }
    
    return {
        isValidExtension: true
    };
}

function checkForBadExtension() {
    chrome.management.getAll(function (extensions) {
        for (var ii = 0; ii < extensions.length; ii++) {
            var extension = extensions[ii];
            
            if (extension.id == "kpipagoofoccjflbjohbadncakalhnmk") {
                extensionErrorNotification = {
                    id: "MarketoLive Extension Error",
                    title: "MarketoLive Extension Error",
                    message: "You have more than one MarketoLive extension installed.",
                    buttonTitle: "Uninstall Bad Extension",
                    requireInteraction: true,
                    action: "uninstall",
                    reload: false
                };
                
                addCheckBadExtensionMsgListener({
                    isValidExtension: false
                });
                
                chrome.management.onUninstalled.addListener(function (extensionId) {
                    if (extensionId == extension.id) {
                        chrome.notifications.clear(extensionErrorNotification.id);
                        chrome.runtime.reload();
                    }
                    chrome.management.onUninstalled.removeListener(this);
                });
                createBasicNotification(extensionErrorNotification, extension.id);
                
                heapTrack({
                    name: "Bad Extension",
                    app: "Extension",
                    area: "Background",
                    badExtensionId: extension.id,
                    badExtensionName: extension.name
                });
                
                break;
            }
        }
        
        addCheckBadExtensionMsgListener({
            isValidExtension: true
        });
    });
}

function setOneLoginCookies(message) {
    oneLoginFirstName = message.firstName;
    oneLoginLastName = message.lastName;
    oneLoginEmail = message.email;
    
    var usernameCookieName = "onelogin_username",
    firstNameCookieName = "onelogin_first_name",
    lastNameCookieName = "onelogin_last_name",
    emailCookieName = "onelogin_email",
    expiresInDays = 365,
    usernameCookieMarketoLive = {
        "url": mktoLiveDomainMatch,
        "name": usernameCookieName,
        "value": message.username,
        "domain": mktoLiveUriDomain,
        "expiresInDays": expiresInDays
    },
    usernameCookieMarketoLiveClassic = {
        "url": mktoLiveClassicDomainMatch,
        "name": usernameCookieName,
        "value": message.username,
        "domain": mktoLiveClassicUriDomain,
        "expiresInDays": expiresInDays
    },
    usernameCookieMarketoApp = {
        "url": mktoAppDomainMatch,
        "name": usernameCookieName,
        "value": message.username,
        "domain": mktoAppUriDomain,
        "expiresInDays": expiresInDays
    },
    usernameCookieDesigner = {
        "url": mktoDesignerMatchPattern,
        "name": usernameCookieName,
        "value": message.username,
        "domain": mktoDesignerUriDomain,
        "expiresInDays": expiresInDays
    },
    firstNameCookieMarketoLive = {
        "url": mktoLiveDomainMatch,
        "name": firstNameCookieName,
        "value": message.firstName,
        "domain": mktoLiveUriDomain,
        "expiresInDays": expiresInDays
    },
    firstNameCookieMarketoLiveClassic = {
        "url": mktoLiveClassicDomainMatch,
        "name": firstNameCookieName,
        "value": message.firstName,
        "domain": mktoLiveClassicUriDomain,
        "expiresInDays": expiresInDays
    },
    firstNameCookieMarketoApp = {
        "url": mktoAppDomainMatch,
        "name": firstNameCookieName,
        "value": message.firstName,
        "domain": mktoAppUriDomain,
        "expiresInDays": expiresInDays
    },
    firstNameCookieDesigner = {
        "url": mktoDesignerMatchPattern,
        "name": firstNameCookieName,
        "value": message.firstName,
        "domain": mktoDesignerUriDomain,
        "expiresInDays": expiresInDays
    },
    lastNameCookieMarketoLive = {
        "url": mktoLiveDomainMatch,
        "name": lastNameCookieName,
        "value": message.lastName,
        "domain": mktoLiveUriDomain,
        "expiresInDays": expiresInDays
    },
    lastNameCookieMarketoLiveClassic = {
        "url": mktoLiveClassicDomainMatch,
        "name": lastNameCookieName,
        "value": message.lastName,
        "domain": mktoLiveClassicUriDomain,
        "expiresInDays": expiresInDays
    },
    lastNameCookieMarketoApp = {
        "url": mktoAppDomainMatch,
        "name": lastNameCookieName,
        "value": message.lastName,
        "domain": mktoAppUriDomain,
        "expiresInDays": expiresInDays
    },
    lastNameCookieDesigner = {
        "url": mktoDesignerMatchPattern,
        "name": lastNameCookieName,
        "value": message.lastName,
        "domain": mktoDesignerUriDomain,
        "expiresInDays": expiresInDays
    },
    emailCookieMarketoLive = {
        "url": mktoLiveDomainMatch,
        "name": emailCookieName,
        "value": message.email,
        "domain": mktoLiveUriDomain,
        "expiresInDays": expiresInDays
    },
    emailCookieMarketoLiveClassic = {
        "url": mktoLiveClassicDomainMatch,
        "name": emailCookieName,
        "value": message.email,
        "domain": mktoLiveClassicUriDomain,
        "expiresInDays": expiresInDays
    },
    emailCookieMarketoApp = {
        "url": mktoAppDomainMatch,
        "name": emailCookieName,
        "value": message.email,
        "domain": mktoAppUriDomain,
        "expiresInDays": expiresInDays
    },
    emailCookieDesigner = {
        "url": mktoDesignerMatchPattern,
        "name": emailCookieName,
        "value": message.email,
        "domain": mktoDesignerUriDomain,
        "expiresInDays": expiresInDays
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
        name: "OneLogin > Apps",
        app: "OneLogin",
        area: "Apps"
    });
}

function setMktoCookies(message) {
    var mktoUserIdCookieName = "mkto_user_id",
    mktoNameCookieName = "mkto_name",
    mktoRoleCookieName = "mkto_role",
    expiresInDays = 365,
    mktoUserIdCookieMarketoLive = {
        "url": mktoLiveDomainMatch,
        "name": mktoUserIdCookieName,
        "value": message.mktoUserId,
        "domain": mktoLiveUriDomain,
        "expiresInDays": expiresInDays
    },
    mktoUserIdCookieMarketoApp = {
        "url": mktoAppDomainMatch,
        "name": mktoUserIdCookieName,
        "value": message.mktoUserId,
        "domain": mktoAppUriDomain,
        "expiresInDays": expiresInDays
    },
    mktoNameCookieMarketoLive = {
        "url": mktoLiveDomainMatch,
        "name": mktoNameCookieName,
        "value": message.mktoName,
        "domain": mktoLiveUriDomain,
        "expiresInDays": expiresInDays
    },
    mktoNameCookieMarketoApp = {
        "url": mktoAppDomainMatch,
        "name": mktoNameCookieName,
        "value": message.mktoName,
        "domain": mktoAppUriDomain,
        "expiresInDays": expiresInDays
    },
    mktoRoleCookieMarketoLive = {
        "url": mktoLiveDomainMatch,
        "name": mktoRoleCookieName,
        "value": message.mktoRole,
        "domain": mktoLiveUriDomain,
        "expiresInDays": expiresInDays
    },
    mktoRoleCookieMarketoApp = {
        "url": mktoAppDomainMatch,
        "name": mktoRoleCookieName,
        "value": message.mktoRole,
        "domain": mktoAppUriDomain,
        "expiresInDays": expiresInDays
    };
    
    mktoUserId = message.mktoUserId;
    mktoName = message.mktoName;
    mktoRole = message.mktoRole;
    setCookie(mktoUserIdCookieMarketoLive);
    setCookie(mktoUserIdCookieMarketoApp);
    setCookie(mktoNameCookieMarketoLive);
    setCookie(mktoNameCookieMarketoApp);
    setCookie(mktoRoleCookieMarketoLive);
    setCookie(mktoRoleCookieMarketoApp);
}

function setAdInfoCookies(message) {
    var googleDomainMatch = "https://www.google.com/*",
    linkedinDomainMatch = "https://www.linkedin.com/*",
    adInfoCookieName = "ad_info";
    
    if (message.adInfo) {
        switch (message.adType) {
        case "googleSearch":
            setCookie({
                "url": mktoLiveDomainMatch,
                "name": adInfoCookieName,
                "value": message.adInfo,
                "domain": mktoLiveUriDomain
            });
            setCookie({
                "url": googleDomainMatch,
                "name": adInfoCookieName,
                "value": message.adInfo,
                "domain": ".google.com"
            });
            break;
            
        case "facebook":
            setCookie({
                "url": mktoLiveDomainMatch,
                "name": adInfoCookieName,
                "value": message.adInfo,
                "domain": mktoLiveUriDomain
            });
            break;
            
        case "linkedin":
            setCookie({
                "url": mktoLiveDomainMatch,
                "name": adInfoCookieName,
                "value": message.adInfo,
                "domain": mktoLiveUriDomain
            });
            setCookie({
                "url": linkedinDomainMatch,
                "name": adInfoCookieName,
                "value": message.adInfo,
                "domain": ".linkedin.com"
            });
            break;
        }
        
        findAndReloadOrCreateTab({
            urlMatch: message.urlMatch,
            urlCreate: message.urlCreate
        });
    } else {
        removeCookie({
            "url": mktoLiveDomainMatch,
            "name": adInfoCookieName
        });
        removeCookie({
            "url": googleDomainMatch,
            "name": adInfoCookieName
        });
        removeCookie({
            "url": linkedinDomainMatch,
            "name": adInfoCookieName
        });
    }
}

function setCompanyCookies(message) {
    var companyLogoCookieName = "logo",
    companyColorCookieName = "color",
    companyImageCookieName = "heroBackground",
    companyImageResCookieName = "heroBackgroundRes";
    
    if (message.logo) {
        setCookie({
            "url": mktoLiveClassicDomainMatch,
            "name": companyLogoCookieName,
            "value": message.logo,
            "domain": mktoLiveClassicUriDomain
        });
        
        setCookie({
            "url": mktoDesignerDomainMatch,
            "name": companyLogoCookieName,
            "value": message.logo,
            "domain": mktoDesignerUriDomain
        });
    }
    
    if (message.color) {
        setCookie({
            "url": mktoLiveClassicDomainMatch,
            "name": companyColorCookieName,
            "value": message.color,
            "domain": mktoLiveClassicUriDomain
        });
        
        setCookie({
            "url": mktoDesignerDomainMatch,
            "name": companyColorCookieName,
            "value": message.color,
            "domain": mktoDesignerUriDomain
        });
    } else {
        removeCookie({
            "url": mktoLiveClassicDomainMatch,
            "name": companyColorCookieName
        });
        
        removeCookie({
            "url": mktoDesignerDomainMatch,
            "name": companyColorCookieName
        });
    }
    
    if (message.image) {
        setCookie({
            "url": mktoLiveClassicDomainMatch,
            "name": companyImageCookieName,
            "value": message.image,
            "domain": mktoLiveClassicUriDomain
        });
        
        setCookie({
            "url": mktoDesignerDomainMatch,
            "name": companyImageCookieName,
            "value": message.image,
            "domain": mktoDesignerUriDomain
        });
    } else {
        removeCookie({
            "url": mktoLiveClassicDomainMatch,
            "name": companyImageCookieName
        });
        
        removeCookie({
            "url": mktoDesignerDomainMatch,
            "name": companyImageCookieName
        });
    }
    
    if (message.imageRes) {
        setCookie({
            "url": mktoLiveClassicDomainMatch,
            "name": companyImageResCookieName,
            "value": message.imageRes,
            "domain": mktoLiveClassicUriDomain
        });
        
        setCookie({
            "url": mktoDesignerDomainMatch,
            "name": companyImageResCookieName,
            "value": message.imageRes,
            "domain": mktoDesignerUriDomain
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
                reloadTabs("*://*" + mktoDesignerUriDomain + "/*");
            } else {
                reloadCompany();
            }
        });
    }
}

function isDateInRange(date, startDate, endDate) {
    var isAfterStartDate,
    isBeforeEndDate;
    
    if (startDate) {
        if (typeof(startDate) === "string") {
            startDate = new Date(startDate);
        }
        
        if (date.getFullYear() >= startDate.getFullYear()
             && date.getMonth() >= startDate.getMonth()
             && date.getDate() >= startDate.getDate()) {
            isAfterStartDate = true;
        } else {
            isAfterStartDate = false;
        }
    }
    
    if (endDate) {
        if (typeof(endDate) === "string") {
            endDate = new Date(endDate);
        }
        
        if (date.getFullYear() <= endDate.getFullYear()
             && date.getMonth() <= endDate.getMonth()
             && date.getDate() <= endDate.getDate()) {
            isBeforeEndDate = true;
        } else {
            isBeforeEndDate = false;
        }
    }
    
    if (startDate
         && !endDate) {
        if (isAfterStartDate) {
            return true;
        } else {
            return false;
        }
    } else if (!startDate
         && endDate) {
        if (isBeforeEndDate) {
            return true;
        } else {
            return false;
        }
    } else if (startDate
         && endDate) {
        if (isAfterStartDate
             && isBeforeEndDate) {
            return true;
        } else {
            return false;
        }
    } else {
        return true;
    }
}

function mktoLiveMessage(message) {
    var date = new Date();
    
    if (isDateInRange(date, message.startDate, message.endDate)) {
        var notification = {
            id: message.id,
            title: message.title,
            message: message.notify,
            requireInteraction: message.requireInteraction
        };
        
        if (message.numOfTimesPerDay
             && message.numOfTimesPerDay != -1) {
            if (lastMktoMessageDate
                 && date.toDateString() == lastMktoMessageDate.toDateString()) {
                if (numOfMktoLiveMessage < message.numOfTimesPerDay) {
                    createBasicNotification(notification);
                    numOfMktoLiveMessage++;
                }
            } else {
                createBasicNotification(notification);
                lastMktoMessageDate = new Date();
                numOfMktoLiveMessage = 1;
                heapTrack({
                    name: "Received Important Message",
                    app: "Extension",
                    area: "Background",
                    title: message.title
                });
            }
        } else {
            createBasicNotification(notification);
            heapTrack({
                name: "Received Important Message",
                app: "Extension",
                area: "Background",
                title: message.title
            });
        }
    }
}

function addCheckBadExtensionMsgListener(response) {
    chrome.runtime.onMessageExternal.addListener(function (message, sender, sendResponse) {
        switch (message.action) {
        case "checkBadExtension":
            sendResponse(response);
            console.log("Received " + message.action + " Response: " + JSON.stringify(response));
            break;
        };
        console.log("Added checkBadExtension Message Listener");
    });
}

function checkMsgs(message, sender, sendResponse) {
    switch (message.action) {
    case "setOneLoginUser":
        if (sender.url == oneLoginUrl) {
            setOneLoginCookies(message);
            console.log("Received: " + JSON.stringify(message));
        }
        break;
    case "checkExtensionVersion":
        var response = checkForOldExtension(message.minVersion);
        
        sendResponse(response);
        if (sender.url.search(mktoLiveInstances) != -1) {
            heapTrack({
                name: "Loaded MarketoLive Instance",
                app: "Extension",
                area: "Background",
                version: chrome.app.getDetails().version
            });
        }
        console.log("Received " + message.action + " Response: " + JSON.stringify(response));
        break;
    case "setMktoCookies":
        setMktoCookies(message);
        console.log("Received: " + JSON.stringify(message));
        break;
    case "setAdInfo":
        if (sender.url.search(adTargetingRegEx) != -1) {
            setAdInfoCookies(message);
            console.log("Received: " + JSON.stringify(message));
        }
        break;
    case "setCompanyCookies":
        if (sender.url.search(companyPickerRegEx) != -1) {
            setCompanyCookies(message);
            console.log("Received: " + JSON.stringify(message));
        }
        break;
    case "checkMktoCookie":
        chrome.cookies.getAll({
            name: mktoAppUserCookie,
            domain: mktoAppUriDomain
        }, function (cookies) {
            var cookie = cookies[0],
            response = {};
            
            if (cookie
                 && cookie.value
                 && ((message.munchkinId
                         && cookie.value.split(":")[2].search(message.munchkinId) != -1)
                     || cookie.value.split(":")[2].search(munchkinIdsMatch) != -1)) {
                response.isMktoLive = true;
                
                if (cookie.value.split(":")[1].search(adminUserNamesMatch) != -1) {
                    response.isAdmin = true;
                } else {
                    response.isAdmin = false;
                }
            } else {
                response.isMktoLive = false;
                response.isAdmin = false;
            }
            
            sendResponse(response);
            console.log("Received " + message.action + " Response: " + JSON.stringify(response));
        });
        break;
    case "demoDataPage":
        if (message.tabAction == "create") {
            chrome.tabs.create({
                url: message.url,
                active: false,
                selected: false,
                pinned: true
            }, function (tab) {
                window.setTimeout(function () {
                    if (!Number.isInteger(parseInt(message.tabTimeout))) {
                        message.tabTimeout = 10000;
                    }
                    chrome.tabs.remove(tab.id);
                }, parseInt(message.tabTimeout));
            });
        } else {
            chrome.tabs.query({
                url: message.currUrl,
                pinned: true
            }, function (tabs) {
                var tabId = tabs[0].id;
                
                switch (message.tabAction) {
                case "update":
                    chrome.tabs.update(tabId, {
                        url: message.nextUrl
                    });
                    break;
                case "remove":
                    chrome.tabs.remove(tabId);
                    break;
                }
            });
        }
        break;
    case "mktoLiveMessage":
        mktoLiveMessage(message);
        break;
    }
    return true;
}

function addMsgExtListener(listeningMsg) {
    chrome.runtime.onMessageExternal.addListener(listeningMsg);
    console.log("Added External Message Listener " + listeningMsg.name);
}

function removeMsgExtListener(listeningMsg) {
    chrome.runtime.onMessageExternal.removeListener(listeningMsg);
    console.log("Removed External Message Listener " + listeningMsg.name);
}

/**************************************************************************************
 *
 *  This function cancels specific web requests for Email Insights, Web Personalization,
 *  and Predictive Content in order to block adding, removing, editing, saving, deleting
 *  for normal users in MarketoLive instances.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param [Object] details - JSON object that contains the following key/value pairs:
 *      {String} method - The method of the web request.
 *      {String} url - The URL of the web request.
 *      {String} tabId - The ID of the tab that issued the web request.
 *
 **************************************************************************************/

function cancelWebRequest(details) {
    var toCancel;
    
    switch (details.method) {
    case "POST":
        if (details.url.search("://" + mktoLiveRtpDomainsMatch + "/app/editSegment\.ext") != -1 // Segment > Edit
             || details.url.search("://" + mktoLiveRtpDomainsMatch + "/app/rest/segments/action") != -1 // Segment > Enable/Disable/Delete
             || details.url.search("://" + mktoLiveRtpDomainsMatch + "/app/rest/labels") != -1 // Segment > Label > New/Apply
             || details.url.search("://" + mktoLiveRtpDomainsMatch + "/app/editReaction\.ext") != -1 // Web Campaigns > Edit
             || details.url.search("://" + mktoLiveRtpDomainsMatch + "/app/campaign/labels\.json") != -1 // Web Campaigns > Label > New/Apply
             || details.url.search("://" + mktoLiveRtpDomainsMatch + "/app/rest/reactions/action") != -1 // Web Campaigns > Launch/Pause/Delete
             || details.url.search("://" + mktoLiveRtpDomainsMatch + "/app/rest/reaction/schedule/schedule") != -1 // Web Campaigns > Schedule > Add/Remove
             || details.url.search("://" + mktoLiveRtpDomainsMatch + "/app/editAudience\.ext") != -1 // Retargeting > Audience > Edit
             || details.url.search("://" + mktoLiveRtpDomainsMatch + "/app/rest/remarketing/action") != -1 // Retargeting > Audience > Enable/Disable
             || details.url.search("://" + mktoLiveRtpDomainsMatch + "/app/rest/remarketing/params\.json") != -1 // Retargeting > Domain Retargeting Config > Edit
             || details.url.search("://" + mktoLiveRtpDomainsMatch + "/app/rest/setting/analytics/params\.json") != -1 // Account Settings > Domain > Analytics > Edit
             || details.url.search("://" + mktoLiveRtpDomainsMatch + "/app/admin/accountSettings/excludedips\.json") != -1 // Account Settings > Domain > IP Exclude > Edit
             || details.url.search("://" + mktoLiveRtpDomainsMatch + "/app/admin/accountSettings\.do") != -1 // Account Settings > Database > Fields > Add/Remove
             || details.url.search("://" + mktoLiveRtpDomainsMatch + "/app/admin/contentSettings\.do") != -1 // Content Settings > Categories & URL Patterns > New/Delete
             || details.url.search("://" + mktoLiveRtpDomainsMatch + "/app/rest/setting/rcmd/params\.json") != -1 // Content Settings > Bar > Recommendation Bar Config > Edit
             || details.url.search("://" + mktoLiveRtpDomainsMatch + "/app/predictive/content/addContent\.json") != -1 // Predictive Content > Content > Add
             || details.url.search("://" + mktoLiveRtpDomainsMatch + "/app/predictive/content/editContent\.json") != -1
             || details.url.search("://seo\.marketo\.com/rest/report/keyword/addWithLists") != -1 // SEO > Keywords > Phrase/List > Add
             || details.url.search("://seo\.marketo\.com/keyword/overview:remove") != -1 // SEO > Keywords > Phrase > Delete
             || details.url.search("://seo\.marketo\.com/ajax/orgList:add") != -1 // SEO > Keywords, Pages, Inbound Links > Phrase/Page/Issue/Link > Add To List
             || details.url.search("://seo\.marketo\.com/ajax/orgList:delete") != -1 // SEO > Keywords, Pages, Inbound Links > Phrase/Page/Issue/Link > Remove From List
             || details.url.search("://seo\.marketo\.com/ajax/orgList:deleteList") != -1 // SEO > Keywords, Pages, Inbound Links > List > Delete
             || details.url.search("://seo\.marketo\.com/keyword/overview\.keyworduploadform") != -1 // SEO > Keywords > List > Import
             || details.url.search("://seo\.marketo\.com/rest/report/page/addWithLists") != -1 // SEO > Pages > Page > Add
             || details.url.search("://seo\.marketo\.com/rest/report/page/delete") != -1 // SEO > Pages > Page > Delete
             || details.url.search("://seo\.marketo\.com/page/detail:hideResult") != -1 // SEO > Pages > Issue > Remove
             || details.url.search("://seo\.marketo\.com/ajax/StickyNote:Save") != -1 // SEO > Pages > Issue > Sticky Note > Add/Delete
             || details.url.search("://seo\.marketo\.com/rest/report/link/addWithLists") != -1 // SEO > Inbound Links > Link > Add
             || details.url.search("://seo\.marketo\.com/rest/report/link/addFromSuggestionsWithLists") != -1 // SEO > Inbound Links > Link > Add From Suggestions
             || details.url.search("://seo\.marketo\.com/rest/report/link/delete") != -1 // SEO > Inbound Links > Link > Delete
             || details.url.search("://seo\.marketo\.com/rest/report/link/uploadfile") != -1 // SEO > Inbound Links > Link > Import
             || details.url.search("://seo\.marketo\.com/rest/reportdetail/create") != -1 // SEO > Reports > Report > Create
             || details.url.search("://seo\.marketo\.com/rest/reportdetail/save") != -1 // SEO > Reports > Report > Save
             || details.url.search("://seo\.marketo\.com/rest/reportdetail/delete") != -1 // SEO > Reports > Report > Delete
             || details.url.search("://seo\.marketo\.com/rest/adminsettings/site/add") != -1 // SEO > Admin Settings > Site > Add
             || details.url.search("://seo\.marketo\.com/rest/adminsettings/site/[^/]+/delete") != -1 // SEO > Admin Settings > Site > Delete
             || details.url.search("://seo\.marketo\.com/rest/adminsettings/site/[^/]+/rename") != -1 // SEO > Admin Settings > Site > Rename
             || details.url.search("://seo\.marketo\.com/rest/adminsettings/searchengines/set") != -1 // SEO > Admin Settings > Site > Search Engines > Set
             || details.url.search("://seo\.marketo\.com/rest/adminsettings/competitor/add") != -1 // SEO > Admin Settings > Site > Competitors > Add
             || details.url.search("://seo\.marketo\.com/rest/adminsettings/competitor/[^/]+/delete") != -1 // SEO > Admin Settings > Site > Competitors > Delete
             || details.url.search("://250ok\.com/ajax/bookmark") != -1 // 250ok > ALL > Bookmark (Star) > Add/Remove
             || details.url.search("://250ok\.com/app/dashboard") != -1 // 250ok > Dashboard > Dashboard & Widget > Add/Modify/Copy/Delete
             || details.url.search("://250ok\.com/ajax_dashboard/saveGrid") != -1 // 250ok > Dashboard > Widget > Move/Resize
             || details.url.search("://250ok\.com/ajax_dashboard/removeWidget") != -1 // 250ok > Dashboard > Widget > Remove
             || details.url.search("://250ok\.com/app/inbox-informant") != -1 // 250ok > Inbox > Campaigns, Get Seedlist, Optimize Seedlist > ALL Actions
             || details.url.search("://250ok\.com/app/blacklist-informant") != -1 // 250ok > Reputation > My Profiles > ALL Actions
             || details.url.search("://250ok\.com/ajax_blacklist/switchstatus") != -1 // 250ok > Reputation > My Profiles > Status > Enable/Disable
             || details.url.search("://250ok\.com/app/snds/configuration") != -1 // 250ok > Reputation > SNDS > Key > Add/Delete
             || details.url.search("://250ok\.com/app/signalspam") != -1 // 250ok > Reputation > Signal Spam > ALL Actions
             || details.url.search("://250ok\.com/app/fbl") != -1 // 250ok > Reputation > Feeback Loops > ALL Actions
             || details.url.search("://250ok\.com/app/email-analytics") != -1 // 250ok > Analytics > Overview, Campaigns > ALL Actions
             || details.url.search("://250ok\.com/app/account") != -1 // 250ok > Settings > Account, Users, API, Inbox, Analytics > ALL Actions
             || details.url.search("://250ok\.com/ajax_emailanalytics/switchstatus") != -1 // 250ok > Settings > Analytics > Parameters & Segments Status > Enable/Disable
             || details.url.search("://250ok\.com/ajax_reputationinformant/switchstatus") != -1 // 250ok > Settings > Reputation > Filter Sets Status > Enable/Disable
             || details.url.search("://250ok\.com/app/design-informant") != -1 // 250ok > Design > ALL Actions
             || details.url.search("://250ok\.com/app/alerts") != -1 // 250ok > Alerts > ALL Actions
        )
        {
            toCancel = true;
        }
        break;
    case "PUT":
        if (details.url.search("://sj-ee-api.marketo.com/api/v1/settings/dimensions/activate/") != -1 // Email Insights > System Settings > Dimension > Add/Remove
             || details.url.search("://" + mktoLiveRtpDomainsMatch + "/app/predictive/content/setEligibility\.json") != -1 // Predictive Content > Content > Approve/Unapprove
             || details.url.search("://" + mktoLiveRtpDomainsMatch + "/app/predictive/predictiveContent/setEmail\.json") != -1 // Predictive Content > Content > Enable/Disable EM
             || details.url.search("://" + mktoLiveRtpDomainsMatch + "/app/predictive/predictiveContent/setBar\.json") != -1 // Predictive Content > Content > Enable/Disable Bar
             || details.url.search("://" + mktoLiveRtpDomainsMatch + "/app/predictive/predictiveContent/setRichMedia\.json") != -1 // Predictive Content > Content > Enable/Disable RM
             || details.url.search("://" + mktoLiveRtpDomainsMatch + "/app/predictive/predictiveContent/editContentName\.json") != -1 // Predictive Content > Content > Name > Edit
             || details.url.search("://" + mktoLiveRtpDomainsMatch + "/app/predictive/predictiveContent/editContent\.json") != -1) { // Predictive Content > Content > Edit
            toCancel = true;
        }
        break;
    case "GET":
        if (details.url.search("://" + mktoLiveRtpDomainsMatch + "/app/rest/deleteAudience\.json") != -1 // Retargeting > Audience > Delete
             || details.url.search("://" + mktoLiveRtpDomainsMatch + "/app/setting/param\.json") != -1 // Account Settings > ALL > Toggles > Enable/Disable
             || details.url.search("://seo\.marketo\.com/ajax/ComponentSettings:Save\\?id=keyword\.overview\.grid\.keyword_table") != -1 // SEO > Keywords > Report > Edit
             || details.url.search("://250ok\.com/app/design-informant/[^\\?]+\\?action=delete") != -1 // 250ok > Design > Test > Delete
        ) {
            toCancel = true;
        }
        break;
    case "DELETE":
        if (details.url.search("://" + mktoLiveRtpDomainsMatch + "/app/predictive/content/delete\.json") != -1 // Predictive Content > Content > Delete
             || details.url.search("://" + mktoLiveRtpDomainsMatch + "/app/rest/reaction/schedule/schedule") != -1) { // Web Campaigns > Schedule > Delete
            toCancel = true;
        }
        break;
    default:
        return;
        break;
    }
    
    if (toCancel) {
        var notAllowedNotification = {
            id: "MarketoLive Not Allowed",
            title: "Not Allowed",
            message: "You are not authorized to make changes to this demo instance.",
            requireInteraction: false
        };
        
        createBasicNotification(notAllowedNotification);
        if (details.url.search("://seo\.marketo\.com/rest/reportdetail/save") == -1) {
            chrome.tabs.reload(details.tabId);
        }
        return {
            cancel: true
        };
    } else {
        return;
    }
}

/**************************************************************************************
 *
 *  This function adds an event listener for Email Insights, Web Personalization,
 *  and Predictive Content web requests in order to block adding, removing,
 *  editing, saving, deleting for normal users in MarketoLive instances.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {function} - Callback function for the response.
 *
 **************************************************************************************/

function addWebRequestListener() {
    chrome.webRequest.onBeforeRequest.addListener(cancelWebRequest, {
        urls: mktoLiveBlockUrlPatterns
    }, ["blocking"]);
    console.log("Added Blocking Web Request Listener");
}

/**************************************************************************************
 *
 *  This function removes an event listener for Email Insights, Web Personalization,
 *  and Predictive Content web requests in order to allow adding, removing,
 *  editing, saving, deleting for admins and non-MarketoLive instances.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {function} - Callback function for the response.
 *
 **************************************************************************************/

function removeWebRequestListener() {
    chrome.webRequest.onBeforeRequest.removeListener(cancelWebRequest);
    console.log("Removed Blocking Web Request Listener");
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
                
                if (mktoUserId) {
                    heap.identify(mktoUserId);
                } else {
                    getCookie({
                        url: mktoLiveDomainMatch,
                        name: "mkto_user_id"
                    }, function (cookie) {
                        if (cookie
                             && cookie.value) {
                            mktoUserId = cookie.value;
                            heap.identify(cookie.value);
                            if (oneLoginEmail) {
                                heap.addUserProperties({
                                    Email: oneLoginEmail
                                });
                            } else {
                                getCookie({
                                    url: mktoLiveDomainMatch,
                                    name: "onelogin_email"
                                }, function (cookie) {
                                    if (cookie
                                         && cookie.value) {
                                        heap.addUserProperties({
                                            Email: cookie.value
                                        });
                                    }
                                });
                            }
                        } else {
                            if (oneLoginEmail) {
                                heap.identify(oneLoginEmail);
                                heap.addUserProperties({
                                    Email: oneLoginEmail
                                });
                            } else {
                                getCookie({
                                    url: mktoLiveDomainMatch,
                                    name: "onelogin_email"
                                }, function (cookie) {
                                    if (cookie
                                         && cookie.value) {
                                        heap.identify(cookie.value);
                                        heap.addUserProperties({
                                            Email: cookie.value
                                        });
                                    } else {
                                        heap.identify();
                                    }
                                });
                            }
                        }
                    });
                }
                
                if (oneLoginFirstName
                     && oneLoginLastName) {
                    heap.addUserProperties({
                        Name: oneLoginFirstName + " " + oneLoginLastName
                    });
                    console.log("OneLogin > Heap Analytics ID: " + oneLoginFirstName + " " + oneLoginLastName);
                } else {
                    getCookie({
                        url: mktoLiveDomainMatch,
                        name: "onelogin_first_name"
                    }, function (cookie) {
                        if (cookie
                             && cookie.value) {
                            oneLoginFirstName = cookie.value;
                            getCookie({
                                url: mktoLiveDomainMatch,
                                name: "onelogin_last_name"
                            }, function (cookie) {
                                if (cookie
                                     && cookie.value) {
                                    oneLoginLastName = cookie.value;
                                    heap.addUserProperties({
                                        Name: oneLoginFirstName + " " + oneLoginLastName
                                    });
                                    console.log("OneLogin > Heap Analytics ID: " + oneLoginFirstName + " " + oneLoginLastName);
                                } else {
                                    if (mktoName) {
                                        heap.addUserProperties({
                                            Name: mktoName
                                        });
                                        console.log("OneLogin > Heap Analytics ID: " + mktoName);
                                    } else {
                                        getCookie({
                                            url: mktoLiveDomainMatch,
                                            name: "mkto_name"
                                        }, function (cookie) {
                                            if (cookie
                                                 && cookie.value) {
                                                mktoName = cookie.value;
                                                heap.addUserProperties({
                                                    Name: mktoName
                                                });
                                                console.log("OneLogin > Heap Analytics ID: " + mktoName);
                                            }
                                        });
                                    }
                                }
                            });
                        } else {
                            if (mktoName) {
                                heap.addUserProperties({
                                    Name: mktoName
                                });
                                console.log("OneLogin > Heap Analytics ID: " + mktoName);
                            } else {
                                getCookie({
                                    url: mktoLiveDomainMatch,
                                    name: "mkto_name"
                                }, function (cookie) {
                                    if (cookie
                                         && cookie.value) {
                                        mktoName = cookie.value;
                                        heap.addUserProperties({
                                            Name: mktoName
                                        });
                                        console.log("OneLogin > Heap Analytics ID: " + mktoName);
                                    }
                                });
                            }
                        }
                    });
                }
                
                if (mktoRole) {
                    heap.addUserProperties({
                        Role: mktoRole
                    });
                } else {
                    getCookie({
                        url: mktoLiveDomainMatch,
                        name: "mkto_role"
                    }, function (cookie) {
                        if (cookie
                             && cookie.value) {
                            mktoRole = cookie.value;
                            heap.addUserProperties({
                                Role: mktoRole
                            });
                        }
                    });
                }
                
                if (event) {
                    console.log("Extension > Tracking: Heap Event:\n" + JSON.stringify(event, null, 2));
                    
                    heap.track(event.name, {
                        app: event.app,
                        area: event.area,
                        version: event.version,
                        badExtensionId: event.badExtensionId,
                        badExtensionName: event.badExtensionName
                    });
                }
            }
        }, 0);
}

/**************************************************************************************
 *
 *  Main
 *
 **************************************************************************************/

console.log("Running");

setMarketoUserPodCookie();
loadScript(HEAP_ANALYTICS_SCRIPT_LOCATION);
heapTrack({
    name: "Background",
    app: "Extension",
    area: "Background",
    version: chrome.app.getDetails().version
});

addMsgExtListener(checkMsgs);
checkForBadExtension();

chrome.cookies.getAll({
    name: mktoAppUserCookie,
    domain: mktoAppUriDomain
}, function (cookies) {
    var cookie = cookies[0];
    
    if (cookie
         && cookie.value.split(":")[2].search(munchkinIdsMatch) != -1
         && cookie.value.split(":")[1].search(adminUserNamesMatch) == -1) {
        addWebRequestListener();
    }
});

chrome.cookies.onChanged.addListener(function (changeInfo) {
    if (changeInfo.cookie
         && changeInfo.cookie.name == mktoAppUserCookie
         && changeInfo.cookie.domain == mktoAppUriDomain
         && changeInfo.cause == "explicit") {
        if (changeInfo.cookie.value.split(":")[2].search(munchkinIdsMatch) != -1
             && changeInfo.cookie.value.split(":")[1].search(adminUserNamesMatch) == -1) {
            addWebRequestListener();
        } else {
            removeWebRequestListener();
        }
    }
});

chrome.runtime.onInstalled.addListener(function (details) {
    if (details.id == chrome.app.getDetails().id) {
        var event = {
            name: "",
            app: "Extension",
            area: "Background",
            version: chrome.app.getDetails().version,
            previousVersion: ""
        };
        
        switch (details.reason) {
        case "install":
            chrome.tabs.create({
                url: "http://www.marketolive.com/en/update/privacy-policy",
                active: true,
                selected: true
            });
            event.name = "Install";
            break;
        case "update":
            if (details.previousVersion != chrome.app.getDetails().version) {
                chrome.tabs.create({
                    url: "http://www.marketolive.com/en/update/extension",
                    active: true,
                    selected: true
                });
                event.name = "Update";
                event.previousVersion = details.previousVersion;
            }
            break;
        }
        
        heapTrack(event);
    }
});