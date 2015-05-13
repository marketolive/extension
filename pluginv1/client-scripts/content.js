
// Are there any names besides 'demo'? It seems that this is the big-time script here.
function loadScript(name) { //demo or live
	var jscript_lib_demo = document.createElement('script');
	jscript_lib_demo.setAttribute('id', 'mkto_demo_script');
	jscript_lib_demo.setAttribute('type', 'text/javascript');
	jscript_lib_demo.setAttribute('src', '//marketolive.com/plugin/v2/marketo_'+name+'_v2.js');
	document.getElementsByTagName('head')[0].appendChild(jscript_lib_demo);
}

// Is this for keeping track of what instance they're in?
function setCookie(cname, cvalue, exdays, domain, secure) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toGMTString();
	document.cookie = cname + "=" + cvalue + "; " + expires + "; " + "path=/;" + "domain=" + domain + ";secure="+ secure +";";
}

function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i].trim();
		if (c.indexOf(name) == 0)
			return c.substring(name.length, c.length);
	}
	return "";
}

function checkCookie(cname) {
	return getCookie(cname) != "";
//	if (user_information != "") {
//		return true;
//	} else {
//		return false;
//	}
}

// Can you elaborate on this one? Not sure what this logic is saying.
function inIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

var current_url = location.href,
    appMatch = /([([a-z0-9][a-z0-9-]+[a-z0-9]\.marketo\.com)/g,
    match = new RegExp(appMatch),
    mkto_app = match.test(current_url),
    mkto_live = current_url.indexOf('https://marketolive.com');
console.log('Plugin Loading MarketoLive Scripts...');

// What does this do? Specifically the significance of the string
var port = chrome.runtime.connect({
	name : "mycontentscript"
});

port.onMessage.addListener(function(message, sender) {
	user_pod = message.greeting;
	setCookie('userPod', user_pod, 365, '.marketolive.com', true);
	setCookie('userPod', user_pod, 365, '.marketo.com', true);	
}); 

if (mkto_live == 0) {
	loadScript('live');
	console.log('PLUGIN : MarketoLive is Active');

	window.addEventListener('message', function(event) {
		if (event.data.type && event.data.type == 'PageMsg') {
			pageStatus = event.data.text;
			
			if (pageStatus == 'mkto_live_loaded') {
				console.log('CONTENT (PageMsg): Received Page Message = ' + pageStatus);
				window.postMessage({
					type : 'ContentScript',
					text : 'message_to_page'
				}, 'https://marketolive.com/');
			}
			
			if (pageStatus == 'agile_clicked') {
				console.log('CONTENT (PageMsg): Received Page Message = ' + pageStatus);
			}
			
			if (pageStatus == 'demo_error') {
				console.log('CONTENT (PageMsg): Received Page Message = ' + pageStatus);
			}	
		}
	}, false);
}

if (mkto_app == true) {
	loadScript('demo');
	console.log('PLUGIN : MarketoDemo is Active');

	port.onMessage.addListener(function(message, sender) {
		current_prefix_ext = message.greeting;
		console.log('CONTENT: Message Received via Extension: ' + current_prefix_ext);
	});

	window.addEventListener('prefix', function(data) {
		console.log('CONTENT: Prefix Detected via Message from MarketoDemo script: ' + data.detail);
		cust_prefix = data.detail;
		if (cust_prefix == 'mktodemoaccount106') {
			chrome.runtime.sendMessage({
				greeting : cust_prefix
			}, function(response) {
				console.log("Extension Response = " + response);
			});
		}
	});

	window.addEventListener('message', function(event) {
		if (event.data.type && event.data.type == 'DemoMsg') {
			demoStatus = event.data.text;
			console.log('CONTENT (DemoMsg): Received Message from Demo Script= ' + demoStatus);
			if (demoStatus == 'mkto_login_frame_loaded') {
				chrome.runtime.sendMessage({
					greeting : 'mkto_login_live_loaded'
				}, function(response) {
					console.log("Extension Response = " + response);
				});
			}
			if (demoStatus > 0) {
				console.log('login_error');
				chrome.runtime.sendMessage({
					greeting : 'demo_error'
				}, function(response) {
					console.log("Extension Response = " + response);
				});
			}
			if (demoStatus == 'login_failed') {
				chrome.runtime.sendMessage({
					greeting : 'demo_error'
				}, function(response) {
					console.log("Extension Response = " + response);
				});
			}
			if (demoStatus == 'login_closed') {
				chrome.runtime.sendMessage({
					greeting : 'clean_up_login'
				}, function(response) {
					console.log("Extension Response = " + response);
				});
			}
			if (demoStatus == 'mktodemoaccount106') {
				chrome.runtime.sendMessage({
					greeting : 'mktodemoaccount106'
				}, function(response) {
					console.log("Extension Response = " + response);
				});
			}
		}
	}, false);
	
}

/*
	chrome.runtime.sendMessage({
		greeting : "hello"
	}, function(response) {
		console.log(response.farewell);
	});
*/
/*	
	port.onMessage.addListener(function(message, sender) {
		console.log(sender);
		console.log(message);
		ext_message = message.greeting;
		console.log('CONTENT: Prefix Detected via Extension: ' + ext_message);
	});
	
	window.postMessage({
		type : 'ContentScriptA',
		text : 'message_to_page'
	}, 'http://marketolive.com/');
*/

/*

var pageStatus;
var scriptStatus;
var cust_prefix,
    current_prefix_ext,
    current_prefix_live,
    current_prefix_demo;

if (mkto_live == 0 || mkto_app == true) {
	console.log('Plugin Loading MarketoLive Scripts...');
	loadScript();
}

//This line opens up a long-lived connection to your background page.


window.addEventListener('prefix', function(data) {
	console.log('CONTENT: Prefix Detected via Message from MarketoDemo script: ' + data.detail);
	cust_prefix = data.detail;
	chrome.runtime.sendMessage(cust_prefix);
});


port.onMessage.addListener(function(message, sender) {
	current_prefix_ext = message.greeting;
	console.log('CONTENT: Prefix Detected via Extension: ' + current_prefix_ext);
}); 

window.addEventListener('message', function(event) {
	if (event.data.type && event.data.type == 'DemoScriptMsg') {
		cust_prefix = event.data.text;
		console.log('CONTENT: DemoScriptMsg - Receive Script Message = ' + cust_prefix);
	}
}, false);

window.addEventListener('message', function(event) {
	if (event.data.type && event.data.type == 'PageMsg') {
		pageStatus = event.data.text;
		console.log('PLUGIN (PageMsg): Receive Page Message = ' + pageStatus);

		chrome.runtime.sendMessage({
			greeting : "custPrefix"
		}, function(response) {
			console.log(response.farewell);
		});

	}
}, false);

console.log('Background Script: ' + cust_prefix);
console.log('MarketoLive Script: ' + current_prefix_live);
console.log('MarketoDemo Script: ' + current_prefix_demo);

if (cust_prefix !== undefined) {
	//setCookie('custPrefix', cust_prefix, 365, '.marketolive.com');
	//setCookie('custPrefix', cust_prefix, 365, '.marketo.com');
} else if (cust_prefix !== current_prefix_live) {
	//setCookie('custPrefix', cust_prefix, 365, '.marketolive.com');
} else if (cust_prefix !== current_prefix_demo) {
	//setCookie('custPrefix', cust_prefix, 365, '.marketo.com');
} else {
	console.log('Do Nothing');
}

*/