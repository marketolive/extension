/**************************************************************************************
 *
 *  This script contains all of the functionality needed for the plugin.
 *
 *  @Author Andy, Arrash
 *
 *  @namespace
 *
 **************************************************************************************/
console.log("Background > Running");

/**************************************************************************************
 *
 *  Global Constants
 *
 **************************************************************************************/

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

/**************************************************************************************
 *
 *  This function gets the value of cookie of the requested domain.
 *
 *  @Author Arrash
 *
 *  @function
 *
 *  @param {String} domain - The domain portion of the URL.
 *  @param {String} name - The name of the cookie.
 *  @param {function} callback - The function to be called back after getting cookie.
 *
 **************************************************************************************/
	
function getCookies(domain, name, callback) {
	console.log("Background > Getting: Cookies");
	
    chrome.cookies.get({
        'url': domain,
        'name': name
    }, function (cookie) {
        if (cookie) {
            if (callback) {
                callback(cookie.value);
            }
        }
    });
}

/**************************************************************************************
 *
 *  This function stores the edit privileges value.
 *
 *  @Author Arrash
 *
 *  @function
 *
 *  @param {Object} data - The privileges object, either 'true' or 'false'.
 *
 **************************************************************************************/

function savePriv(data) {
	console.log("Background > Saving: Edit Privliges");
	
	chrome.storage.sync.set(data, function() {});
	var cookiePriv = {
		url : "http://login.marketo.com/*",
		name : "priv",
		value : data.editPrivileges,
		domain : ".marketo.com"
	}
	chrome.cookies.set(cookiePriv, function() {});
}

/**************************************************************************************
 *
 *  This function stores the value of the company name submitted.
 *
 *  @Author Arrash
 *
 *  @function
 *
 *  @param {Object} data - The company object.
 *
 **************************************************************************************/

function submitCompany(data) {
	console.log("Background > Submitting: Company Name");
	
	chrome.storage.sync.set(data, function() {});
}

/**************************************************************************************
 *
 *  This function creates a cookie on mktoDesignerDomain passing the company name and
 *  then passes the company name to Content.
 *
 *  @Author Arrash
 *
 *  @function
 *
 *  @param
 *
 **************************************************************************************/

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) { 
	if (changeInfo.status == "complete") {
		chrome.storage.sync.get(["company"], function(storage) {
			var cookieCompany = {
				url : "http://www.marketodesigner.com/*",
				name : "company",
				value : storage.company,
				domain : ".marketodesigner.com"
			}
			chrome.cookies.set(cookieCompany, function() {})
			chrome.tabs.query({url : "*://marketolive.com/*"}, function(tabs) {
				chrome.tabs.sendMessage(tabs[0].id, {company: storage.company, action: "company"}, function(response) {});
			});
		});
	}
});

/**************************************************************************************
 *
 *  This function creates a cookie on mktoDesignerDomain passing the company color and
 *  then stores the company color in local storage for the plugin.
 *
 *  @Author Arrash
 *
 *  @function
 *
 *  @param
 *
 **************************************************************************************/

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.action == "colorVal") {
		var cookieColor = {
			url : "http://www.marketodesigner.com/*",
			name : "color",
			value : request.color,
			domain : ".marketodesigner.com"
		}
		chrome.cookies.set(cookieColor, function() {});
		data = {"color" : request.color};
		chrome.storage.sync.set(data, function() {});
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
	
    var currentUrl = tab.url;
    chrome.browserAction.enable(tabId);

    if (currentUrl.search(mktoAppDomain)
	|| currentUrl.search(mktoLiveDomain)
	|| currentUrl.search(emailDeliverabilityDomain)) {
		getCookies(mktoAppMatch, 'mkto_pod', function (id) {
			var cookie_pod_value = id,
				user_pod_value = cookie_pod_value.split('.'),
				user_pod = user_pod_value[0].split(':');
			chrome.runtime.onConnect.addListener(function (port) {
				port.postMessage({
					greeting: user_pod[1]
				});
			});
		});
    }
}

/**************************************************************************************
 *
 *  Main
 *  
 **************************************************************************************/

chrome.tabs.onUpdated.addListener(checkForValidUrl);