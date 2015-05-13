function getCookies(domain, name, callback) {
    chrome.cookies.get({'url': domain, 'name': name}, function(cookie) {
        if(callback) {
            callback(cookie.value);
        }
    });
}

function checkForValidUrl(tabId, changeInfo, tab) {
	var current_url = tab.url;
	var plugin_status;
	var appMatch = /([([a-z0-9][a-z0-9-]+[a-z0-9]\.marketo\.com)/;
	var match = new RegExp(appMatch);
	var mkto_app = match.test(current_url);
	var mkto_live = current_url.indexOf('http://marketolive.com');
	
    if (mkto_live == 0 || mkto_app == true) {
		chrome.browserAction.enable(tabId);

		getCookies('https://*.marketo.com', 'mkto_pod', function(id) {
    		var cookie_pod_value = id;
    		var user_pod_value = cookie_pod_value.split('.');
    		var user_pod = user_pod_value[0].split(':');
    		chrome.runtime.onConnect.addListener(function(port){
				port.postMessage({greeting:user_pod[1]});
			});
		});
	}else{
		chrome.browserAction.disable();
	}
};
chrome.tabs.onUpdated.addListener(checkForValidUrl);

