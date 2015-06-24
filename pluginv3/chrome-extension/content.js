LIVE_SCRIPT_LOCATION = "https://marketolive.com/dev/pluginv3/marketo-live.js";

function loadScript(name) { //demo or live
	var jscript_lib_demo = document.createElement('script');
	jscript_lib_demo.setAttribute('id', 'mkto_demo_script');
	jscript_lib_demo.setAttribute('type', 'text/javascript');
	jscript_lib_demo.setAttribute('src', name);
	document.getElementsByTagName('head')[0].appendChild(jscript_lib_demo);
}

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
	var user_information = getCookie(cname);
	if (user_information != "") {
		return true;
	} else {
		return false;
	}
}

function inIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}
var current_url = location.href;
var appMatch = /([([a-z0-9][a-z0-9-]+[a-z0-9]\.marketo\.com)/g;
var match = new RegExp(appMatch);
var mkto_app = match.test(current_url);
var mkto_live = current_url.indexOf('https://marketolive.com');
var mkto_mobile = current_url.indexOf('https://go.app.io');
var mkto_email = current_url.indexOf('https://250ok.com/login');
console.log('Plugin Loading MarketoLive Scripts...');

var port = chrome.runtime.connect({
	name : "mycontentscript"
});

port.onMessage.addListener(function(message, sender) {
	user_pod = message.greeting;
	setCookie('userPod', user_pod, 365, '.marketolive.com', true);
	setCookie('userPod', user_pod, 365, '.marketo.com', true);	
}); 

if (mkto_live == 0) {
	loadScript(LIVE_SCRIPT_LOCATION);
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
			
			if (pageStatus == 'get_started_clicked') {
				console.log('CONTENT (PageMsg): Received Page Message = ' + pageStatus);
			}
			
			if (pageStatus == 'demo_error') {
				console.log('CONTENT (PageMsg): Received Page Message = ' + pageStatus);
			}	
		}
	}, false);
}

if (window.location.href == "http://cloud4.insightera.com/demo/")
{
	var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", "http://marketolive.com/dev/pluginv3/html/turner-rtp.html", false );
  xmlHttp.send( null );
  var pageLoaded = function(){
		var newElement = document.createElement('div');
		newElement.innerHTML = xmlHttp.responseText;
		document.getElementById("advanced").appendChild(newElement);
	}
  window.onload = pageLoaded();
}

if (mkto_app == true || mkto_email == 0) {
	loadScript(LIVE_SCRIPT_LOCATION);
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
		if (cust_prefix == 'mktodemoaccount106a') {
			chrome.runtime.sendMessage({
				greeting : cust_prefix
			}, function(response) {
				console.log("Extension Response = " + response);
			});
		}
		if (cust_prefix == 'mktodemoaccount106b') {
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
			if (demoStatus == 'mkto_app_login_loaded') {
				chrome.runtime.sendMessage({
					greeting : 'mkto_app_login_loaded'
				}, function(response) {
					console.log("Extension Response = " + response);
				});
			}			
			if (demoStatus == 'mkto_live_login_loaded') {
				chrome.runtime.sendMessage({
					greeting : 'mkto_live_login_loaded'
				}, function(response) {
					console.log("Extension Response = " + response);
				});
			}
			if (demoStatus > 0) {
				console.log('login_error');
				chrome.runtime.sendMessage({
					greeting : 'demo_error'
				}, function(response) {
					console.log(response);
				});
			}
			if (demoStatus == 'login_failed') {
				chrome.runtime.sendMessage({
					greeting : 'demo_error'
				}, function(response) {
					console.log(response);
				});
			}
			if (demoStatus == 'login_success') {
				chrome.runtime.sendMessage({
					greeting : 'login_success'
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
			if (demoStatus == 'mktodemoaccount106a') {
				chrome.runtime.sendMessage({
					greeting : 'mktodemoaccount106a'
				}, function(response) {
					console.log("Extension Response = " + response);
				});
			}
			if (demoStatus == 'mktodemoaccount106b') {
				chrome.runtime.sendMessage({
					greeting : 'mktodemoaccount106b'
				}, function(response) {
					console.log("Extension Response = " + response);
				});
			}
		}
	}, false);
	
}
