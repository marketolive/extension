function getCookies(domain, name, callback) {
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

function checkForValidUrl(tabId, changeInfo, tab) {
    var current_url = tab.url;
    console.log(current_url);
    var cust_prefix,
        plugin_status,
        appMatch = /([([a-z0-9][a-z0-9-]+[a-z0-9]\.marketo\.com)/,
        match = new RegExp(appMatch),
        mkto_app = match.test(current_url),
        mkto_live = current_url.indexOf('https://marketolive.com'),
        mkto_email = current_url.indexOf('https://250ok.com/login');
    chrome.browserAction.enable(tabId);

    // TODO: refactor this.
    if (mkto_live == 0 || mkto_app == true || mkto_email == 0) {
        getCookies('https://*.marketo.com', 'mkto_pod', function (id) {
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

    chrome.tabs.onUpdated.addListener(checkForValidUrl);
}
