function getCookies(domain, name, callback) {
	chrome.cookies.get({
		'url' : domain,
		'name' : name
	}, function(cookie) { 
		if (cookie) {
			if (callback) {
				callback(cookie.value);
			}	
		}
	});
}

function checkForValidUrl(tabId, changeInfo, tab) {
	var current_url = tab.url;
	var cust_prefix;
	var plugin_status;
	var appMatch = /([([a-z0-9][a-z0-9-]+[a-z0-9]\.marketo\.com)/;
	var match = new RegExp(appMatch);
	var mkto_app = match.test(current_url);
	var mkto_live = current_url.indexOf('https://marketolive.com');

	if (mkto_live == 0 || mkto_app == true) {
	//if (mkto_live == 0) {
		chrome.browserAction.enable(tabId);

		getCookies('https://*.marketo.com', 'mkto_pod', function(id) {
			var cookie_pod_value = id;
			var user_pod_value = cookie_pod_value.split('.');
			var user_pod = user_pod_value[0].split(':');
			chrome.runtime.onConnect.addListener(function(port) {
				port.postMessage({
					greeting : user_pod[1]
				});
			});
		}); 

		chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {			
			console.log(sender.tab.id);
			console.log(sender.tab.url);
			console.log(message.greeting);
			if (message.greeting == "mkto_login_frame_loaded") {
				console.log('EXTENSION: Message Received from Content Script: ' + message.greeting);
			}
			if (message.greeting == "mkto_demo_loaded") {
				console.log('EXTENSION: Message Received from Content Script: ' + message.greeting);
				/*
				chrome.tabs.executeScript(tab.id, {
					code : "document.getElementById('login-lightbox').innerHTML = null;"
				}, function(response) {
					console.log(response);
					chrome.runtime.onConnect.addListener(function(port) {
						port.postMessage({
					 		greeting : 'load_agile'
						});					
					});
				});
				*/
			}
			if (message.greeting == "demo_error") {
				console.log('EXTENSION: Message Received from Content Script: ' + message.greeting);
				chrome.tabs.getSelected(null, function(tab) {
					chrome.tabs.executeScript(tab.id, {
						code : "var loginIframe = document.getElementById('marketo_login_hijack');" + 
								"loginIframe.height = '410';"
					}, function(response) {
						
					});
				});								
			}
			if (message.greeting == 'clean_up_login') {
				chrome.tabs.executeScript(tab.id, {
					code : "document.getElementById('login-lightbox').innerHTML = null;"
				}, function(response) {
					console.log(response);
				});
			}			
			if (message.greeting == "mktodemoaccount106") {
				console.log('EXTENSION: Message Received from Content Script: ' + message.greeting);
				chrome.cookies.set({
					"url": "https://marketolive.com",
					"domain": ".marketolive.com",
					"name" : "custPrefix",
					"secure" : true,
					"value" : message.greeting
				}, function() {
					chrome.tabs.executeScript(tab.id, {
						code : "if (document.getElementById('login-lightbox') !== null) {" +
									"document.getElementById('login-lightbox').style.display = ('none');" +	
									"document.getElementById('login-lightbox-shadow').style.display = ('none');" +
									"document.getElementById('login-lightbox').innerHTML = null;" +
									"window.location.replace('https://marketolive.com/m/b2b/agile/');" +
								"}"
					}, function(response) {
						console.log(response);
						chrome.runtime.onConnect.addListener(function(port) {
							port.postMessage({
						 		greeting : 'login_closed'
							});					
						});					
					});
				}); 
			}
			
		});
/*
		chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
			console.log(sender.tab.id);
			console.log(sender.tab.url);
			console.log(request.greeting);
		
			if (request.greeting == "mkto_login_frame_loaded") {
				console.log('EXTENSION: Message Received from Content Script: ' + request.greeting);
			}
			
			if (request.greeting == "mkto_demo_loaded") {
				chrome.tabs.executeScript(tab.id, {
					code : "document.getElementById('login-lightbox').style.display = ('none');" +
							"document.getElementById('login-lightbox-shadow').style.display = ('none');"
				}, function(response) {
					console.log(response);
					chrome.runtime.onConnect.addListener(function(port) {
						port.postMessage({
					 		greeting : 'load_agile'
						});					
					});
				});
			}

			if (request.greeting == "demo_error") {
				chrome.tabs.getSelected(null, function(tab) {
					chrome.tabs.executeScript(tab.id, {
						code : "var loginIframe = document.getElementById('marketo_login_hijack');" + 
								"loginIframe.height = '410';"
					}, function(response) {
						
					});
				});								
			}
		}); 
*/
	} else {
		chrome.browserAction.disable();
	}
}

chrome.tabs.onUpdated.addListener(checkForValidUrl);

//chrome.tabs.executeScript(tab.id, {code: "console.log(document.querySelector('body'));"});

/*

chrome.runtime.onConnect.addListener(function(port) {
	console.log(demoError);
	port.postMessage({
		greeting : demoError
	});
}); 



 */
/*
 getCookies('https://*.marketo.com', 'custPrefix', function(id) {
 var cookie_prefix_value = id;
 var user_prefix_value = cookie_prefix_value.split('.');
 var user_prefix = user_prefix_value[0].split(':');
 console.log('EXTENSION: Prefix Detected via getCookie function: ' + user_prefix);
 chrome.runtime.onConnect.addListener(function(port) {
 port.postMessage({
 greeting : user_prefix[1]
 });
 });

 chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
 console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
 if (request.greeting == "custPrefix")
 sendResponse({
 farewell : "blue"
 });
 });

 });
 */
