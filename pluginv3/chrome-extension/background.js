var mktoAppDomain               = "^https:\/\/app-[a-z0-9]+\.marketo\.com",
    mktoLiveDomain              = "^https:\/\/marketolive.com",
    mktoLoginDomain             = "^https:\/\/login\.marketo\.com",
    mktoAppLoginDomain          = "^https:\/\/app\.marketo\.com",
    rtpDemoDomain               = "^http://sjrtp1.marketo.com/demo/$|^http://cloud4.insightera.com/demo/$",
    emailDeliverabilityDomain   = "^https:\/\/250ok.com/";

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
    var currentUrl = tab.url;
    console.log(currentUrl);
    
    chrome.browserAction.enable(tabId);

    // TODO: refactor this.
    if (currentUrl.search(mktoAppDomain) || currentUrl.search(mktoLiveDomain) || currentUrl.search(emailDeliverabilityDomain)) {
        getCookies("https://app-*.marketo.com", 'mkto_pod', function (id) {
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
//
//function mySaveFunction(data) {
//    chrome.storage.sync.set(data, function () {
//        console.log("Data saved.", data);
//    });
//}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
        chrome.storage.sync.get(["editPrivileges"], function (storage) {
            priv = {};
            priv.editPrivileges = storage.editPrivileges;
            chrome.tabs.query({
                url: "*://*.marketo.com/*"
            }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    priv: priv,
                    action: "priv"
                }, function (response) {});
            });
        });
    }
});

chrome.tabs.onUpdated.addListener(checkForValidUrl);
