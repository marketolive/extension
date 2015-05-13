function loadScript() {
	var jscript_lib_demo = document.createElement('script');
	jscript_lib_demo.setAttribute('id', 'mkto_demo_script');
	jscript_lib_demo.setAttribute('type', 'text/javascript');
	jscript_lib_demo.setAttribute('src', '//marketolive.com/plugin/v2/marketo_demo_v2.js');
	document.getElementsByTagName('head')[0].appendChild(jscript_lib_demo);
	
	var jscript_lib_live = document.createElement('script');
	jscript_lib_live.setAttribute('id', 'mkto_live_script');
	jscript_lib_live.setAttribute('type', 'text/javascript');
	jscript_lib_live.setAttribute('src', '//marketolive.com/plugin/v2/marketo_live_v2.js');
	document.getElementsByTagName('head')[0].appendChild(jscript_lib_live);
}

function setCookie(cname, cvalue, exdays, domain) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));	
	var expires = "expires=" + d.toGMTString();
	document.cookie = cname + "=" + cvalue + "; " + expires + "; " + "path=/;"+ "domain=" + domain+ ";";
}

var pageStatus;
var scriptStatus;
var current_url = location.href;
var appMatch = /([([a-z0-9][a-z0-9-]+[a-z0-9]\.marketo\.com)/g;
var match = new RegExp(appMatch);
var mkto_app = match.test(current_url);
var mkto_live = current_url.indexOf('http://marketolive.com');
if (mkto_live == 0 || mkto_app == true) {
	console.log('Plugin Loading MarketoLive Scripts...');
	loadScript();	
}

//This line opens up a long-lived connection to your background page.
var port = chrome.runtime.connect({
	name : "mycontentscript"
});
port.onMessage.addListener(function(message, sender) {
	user_pod = message.greeting;
	setCookie('userPod', user_pod, 365, '.marketolive.com');
	setCookie('userPod', user_pod, 365, '.marketo.com');	
}); 

if (mkto_live == 0) {
	window.postMessage({
		type : 'PluginMsg',
		text : 'true'
	}, 'http://marketolive.com');	
}

if (mkto_app == true) {
	var mkto_app_url = current_url.slice(0,current_url.indexOf('/',9));
	window.postMessage({
		type : 'PluginMsg',
		text : 'true'
	}, mkto_app_url);
}

window.addEventListener('message', function(event) {
	if (event.data.type && event.data.type == 'ScriptMsg') {
		scriptStatus = event.data.text;
		//console.log('PLUGIN : Receive Script Message = ' + scriptStatus);
	}
}, false);

window.addEventListener('message', function(event) {
	if (event.data.type && event.data.type == 'PageMsg') {
		pageStatus = event.data.text;
		//console.log('PLUGIN : Receive Page Message = ' + pageStatus);
	}
}, false);