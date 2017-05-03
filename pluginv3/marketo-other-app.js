/**************************************************************************************
 *
 *  This script contains all of the functionality needed for the tracking and
 *  manipulation of the Marketo's other apps (e.g. Email Insights, Web Personalization,
 *  Predictive Content)
 *
 *  @Author Brian Fisher
 *
 *  @namespace
 *
 **************************************************************************************/
var URL_PATH = "m3-dev",
devExtensionId = "dokkjhbgengdlccldgjnbilajdbjlnhm",
prodExtensionId = "onibnnoghllldiecboelbpcaeggfiohl",
extensionId = devExtensionId; {}
console.log("Marketo Other App > Running");

/**************************************************************************************
 *
 *  Global Constants
 *
 **************************************************************************************/

var HEAP_ANALYTICS_SCRIPT_LOCATION = "https://marketolive.com/" + URL_PATH + "/pluginv3/heap-analytics.min.js",
mktoLiveMasterRtpHostname = "sjrtp3.marketo.com",
mktoLive106RtpHostname = "sjrtp1.marketo.com",
mktoLiveEmailInsightsHostname = "sj-ee-api.marketo.com",
mktoLiveSeoHostname = "seo.marketo.com",

mktoAccountStringMaster = "mktodemolivemaster",
mktoAccountString106 = "mktodemoaccount106",
mktoAccountString106d = "mktodemoaccount106d",

mktoLiveMasterFriendlyName = "MarketoLive Master",
mktoLive106FriendlyName = "MarketoLive",
mktoLive106dFriendlyName = "MarketoLive for Partners",

mktoLiveMasterCustomerName = "mktodemolivemaster",
mktoLive106CustomerName = "Marketo Demo Account 106",
mktoLive106dCustomerName = "mktodemoaccount106d",

APP = APP || {};

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

APP.loadScript = function (scriptSrc) {
    console.log("Marketo Other App > Loading: Script: " + scriptSrc);
    
    var scriptElement = document.createElement("script");
    scriptElement.async = true;
    scriptElement.src = scriptSrc;
    document.getElementsByTagName("head")[0].appendChild(scriptElement);
};

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

APP.getCookie = function (cookieName) {
    console.log("Marketo Other App > Getting: Cookie " + cookieName);
    
    var name = cookieName + '=',
    cookies = document.cookie.split(';'),
    currCookie;
    
    for (var ii = 0; ii < cookies.length; ii++) {
        currCookie = cookies[ii].trim();
        if (currCookie.indexOf(name) == 0) {
            return currCookie.substring(name.length, currCookie.length);
        }
    }
    console.log("Marketo Other App > Getting: Cookie " + cookieName + " not found");
    return null;
};

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

APP.webRequest = function (url, params, method, async, responseType, callback) {
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
    xmlHttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
    xmlHttp.send(params);
    return result;
};

/**************************************************************************************
 *
 *  This function identifies the current user via Heap Analytics
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.heapIdentify = function () {
    var isHeapAnalytics = window.setInterval(function () {
            if (typeof(heap) !== "undefined"
                 && heap) {
                
                window.clearInterval(isHeapAnalytics);
                var identify;
                
                identify = function (userId, userName, roleSubstring, subscriptionFriendlyName, accountString, customerName) {
                    var oneLoginEmail = APP.getCookie("onelogin_email"),
                    oneLoginFirstName = APP.getCookie("onelogin_first_name"),
                    oneLoginLastName = APP.getCookie("onelogin_last_name");
                    
                    console.log("Marketo Other App > Heap Analytics ID: " + userId);
                    heap.identify(userId);
                    
                    if (oneLoginFirstName
                         && oneLoginLastName) {
                        heap.addUserProperties({
                            Name: oneLoginFirstName + " " + oneLoginLastName
                        });
                    } else if (userName) {
                        heap.addUserProperties({
                            Name: userName.replace(/ ?\[[^\]]+\]/, "")
                        });
                    } else {
                        var mktoName = APP.getCookie("mkto_name");
                        
                        if (mktoName) {
                            heap.addUserProperties({
                                Name: mktoName
                            });
                        }
                    }
                    
                    if (roleSubstring
                         && roleSubstring != -1) {
                        heap.addUserProperties({
                            Role: userName.substring(roleSubstring).replace(/^\[([^\]]+)]$/, "$1")
                        });
                    } else {
                        var mktoRole = APP.getCookie("mkto_role");
                        
                        if (mktoRole) {
                            heap.addUserProperties({
                                Role: mktoRole
                            });
                        }
                    }
                    
                    if (oneLoginEmail) {
                        heap.addUserProperties({
                            Email: oneLoginEmail
                        });
                    }
                    
                    if (subscriptionFriendlyName) {
                        if (subscriptionFriendlyName == mktoLive106FriendlyName) {
                            heap.addUserProperties({
                                Environment: "Internal"
                            });
                        } else if (subscriptionFriendlyName == mktoLive106dFriendlyName) {
                            heap.addUserProperties({
                                Environment: "Partner"
                            });
                        } else if (subscriptionFriendlyName == mktoLiveMasterFriendlyName) {
                            heap.addUserProperties({
                                Environment: "Master"
                            });
                        }
                        heap.addUserProperties({
                            app: subscriptionFriendlyName
                        });
                    } else if (accountString) {
                        if (accountString == mktoAccountString106) {
                            heap.addUserProperties({
                                Environment: "Internal",
                                app: mktoLive106FriendlyName
                            });
                        } else if (accountString == mktoAccountString106d) {
                            heap.addUserProperties({
                                Environment: "Partner",
                                app: mktoLive106dFriendlyName
                            });
                        } else if (accountString == mktoAccountStringMaster) {
                            heap.addUserProperties({
                                Environment: "Master",
                                app: mktoLiveMasterFriendlyName
                            });
                        }
                    } else if (customerName) {
                        if (customerName == mktoLive106CustomerName) {
                            heap.addUserProperties({
                                Environment: "Internal",
                                app: mktoLive106FriendlyName
                            });
                        } else if (customerName == mktoLive106dCustomerName) {
                            heap.addUserProperties({
                                Environment: "Partner",
                                app: mktoLive106dFriendlyName
                            });
                        } else if (customerName == mktoLiveMasterCustomerName) {
                            heap.addUserProperties({
                                Environment: "Master",
                                app: mktoLiveMasterFriendlyName
                            });
                        }
                    }
                };
                
                switch (window.location.hostname) {
                case mktoLiveMasterRtpHostname:
                    APP.webRequest('/api/v1/settings/user.json?', null, 'GET', true, 'json', function (response) {
                        var response = JSON.parse(response),
                        userId = response.body.email,
                        userName = response.body.name,
                        roleSubstring = userName.search(/\[[^\]]+\]/),
                        subscriptionFriendlyName = response.body.subscriptionName;
                        
                        identify(userId, userName, roleSubstring, subscriptionFriendlyName);
                    });
                    break;
                case mktoLive106RtpHostname:
                    APP.webRequest('/api/v1/settings/user.json?', null, 'GET', true, 'json', function (response) {
                        var response = JSON.parse(response),
                        userId = response.body.email,
                        userName = response.body.name,
                        roleSubstring = userName.search(/\[[^\]]+\]/),
                        subscriptionFriendlyName = response.body.subscriptionName;
                        
                        identify(userId, userName, roleSubstring, subscriptionFriendlyName);
                    });
                    break;
                case mktoLiveEmailInsightsHostname:
                    APP.webRequest('/api/v1/settings/user.json?', null, 'GET', true, 'json', function (response) {
                        var response = JSON.parse(response),
                        userId = response.result.email,
                        accountString = response.result.customerPrefix;
                        
                        identify(userId, null, null, null, accountString);
                    });
                    break;
                case mktoLiveSeoHostname:
                    var isSeoPage;
                    
                    isSeoPage = window.setInterval(function () {
                            if (typeof(optify) !== "undefined"
                                 && optify
                                 && optify.user
                                 && optify.user.globals
                                 && optify.user.globals.user_first_name
                                 && optify.user.globals.user_last_name
                                 && optify.user.globals.customer_name) {
                                
                                window.clearInterval(isSeoPage);
                                
                                var userName = optify.user.globals.user_first_name + " " + optify.user.globals.user_last_name,
                                roleSubstring = userName.search(/\[[^\]]+\]/),
                                customerName = optify.user.globals.customer_name;
                                
                                identify(null, userName, roleSubstring, null, null, customerName);
                            }
                        }, 0);
                    break;
                }
            }
        }, 0);
};

/**************************************************************************************
 *
 *  Main
 *
 **************************************************************************************/

chrome.runtime.sendMessage(extensionId, {
    action: "checkMktoCookie"
}, null, function (response) {
    if (response
         && response.isMktoLive
         && !response.isAdmin) {
        console.log("Marketo Other App > checkMktoCookie Msg > Heap Tracking Enabled");
        APP.loadScript(HEAP_ANALYTICS_SCRIPT_LOCATION);
        APP.heapIdentify();
    } else {
        console.log("Marketo Other App > checkMktoCookie Msg > Heap Tracking Disabled");
    }
    if (chrome.runtime.lastError) {
        console.log("Marketo Other App > checkMktoCookie Msg > Error: " + JSON.stringify(chrome.runtime.lastError));
    }
});