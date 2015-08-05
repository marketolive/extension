console.log("Background > Running");

/**************************************************************************************
 *
 *  Global Constants
 *
 **************************************************************************************/

var mktoAppDomain = "^https:\/\/app-[a-z0-9]+\.marketo\.com",
	mktoLiveInstances = "^https:\/\/app-(sjp|ab07|ab08)+\.marketo\.com"
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
	console.log("Background > Saving: Edit Privileges");
	
	var editPriv = data.editPrivileges,
		cookiePrivMarketo = {
			url : "https://login.marketo.com/*",
			name : "priv",
			value : editPriv,
			domain : ".marketo.com"
		},
		cookiePrivDesigner = {
			url : "https://www.marketodesigner.com/*",
			name : "priv",
			value : editPriv,
			domain : ".marketodesigner.com"
		};
	chrome.cookies.set(cookiePrivMarketo, function() {
        console.log("Background > Setting: Edit Privileges Cookie for Marketo");
    });
	chrome.cookies.set(cookiePrivDesigner, function() {
        console.log("Background > Setting: Edit Privileges Cookie for Designer");
    });
	chrome.storage.sync.set(data, function() {});
	chrome.tabs.query({url : "*://app-sjp.marketo.com/*"}, function(tabs) {
		chrome.tabs.reload(tabs[0].id);
	});
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
	console.log("Background > Submitting: Company Name = " + data.company);
	
	var cookieCompany = {
		url : "https://www.marketodesigner.com/*",
		name : "company",
		value : data.company,
		domain : ".marketodesigner.com"
	},
		cookieCompanyMarketoLive = {
		url : "http://marketolive.com/*",
		name : "company",
		value : data.company,
		domain : ".marketolive.com"
	};
	chrome.cookies.set(cookieCompany, function() {
        console.log("Background > Setting Marketo Designer Company Cookie "+cookieCompany);
    });
	chrome.cookies.set(cookieCompanyMarketoLive, function() {
        console.log("Background > Setting MarketoLive Company Cookie "+cookieCompanyMarketoLive);
    });
	chrome.storage.sync.set(data, function() {});
}

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
		console.log("Background > Color");
		var cookieColor = {
			url : "http://www.marketodesigner.com/*",
			name : "color",
			value : request.color,
			domain : ".marketodesigner.com"
		},
			cookieColorMarketoLive = {
			url : "http://marketolive.com/*",
			name : "color",
			value : request.color,
			domain : ".marketolive.com"
		};
		chrome.cookies.set(cookieColor, function() {
            console.log("Background > Setting: Colorscheme Cookie "+cookieColor);
        });
		data = {"color" : request.color};
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

    if (currentUrl.search(mktoLiveInstances)
	|| currentUrl.search(mktoLiveDomain)) {
		getCookies(mktoAppMatch, 'mkto_pod', function (id) {
			var cookie_pod_value = id,
				user_pod_value = cookie_pod_value.split('.'),
				user_pod = user_pod_value[0].split(':');
            
            console.log(user_pod);
            if (user_pod[1].search("app-sjp") != -1
            || user_pod[1].search("app-ab07") != -1
            || user_pod[1].search("app-ab08") != -1) {
                var cookiePod = {
                    url : "http://www.marketo.com/*",
                    name : "userPod",
                    value : user_pod[1],
                    domain : ".marketo.com"
                },
                cookiePodMarketoDesigner = {
                    url : "http://www.marketodesigner.com/*",
                    name : "userPod",
                    value : user_pod[1],
                    domain : ".marketodesigner.com"
                },
                cookiePodMarketoLive = {
                    url : "https://marketolive.com/*",
                    name : "userPod",
                    value : user_pod[1],
                    domain : ".marketolive.com"
                } 
                chrome.cookies.set(cookiePod, function() {
                    console.log("Background > Setting: Marketo User Pod Cookie "+user_pod[1]);
                });
                chrome.cookies.set(cookiePodMarketoDesigner, function() {
                    console.log("Background > Setting: Marketo Designer User Pod Cookie "+user_pod[1]);
                });
                chrome.cookies.set(cookiePodMarketoLive, function() {
                    console.log("Background > Setting: MarketoLive User Pod Cookie "+user_pod[1]);
                });
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