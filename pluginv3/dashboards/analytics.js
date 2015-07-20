console.log('MarketoLive Analytics Loading...');

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

var current_url = location.href;
var first = getCookie('firstName');
var last = getCookie('lastName');
var action

var cust_prefix = '';
if (typeof(MktPage) !== "undefined") {
	cust_prefix = MktPage.savedState.custPrefix;
	//console.log(cust_prefix);	
}
	
$(document).ready(function() {
	if (current_url == '//marketolive.com/m/') {
		if (first !== undefined || last !== undefined) {
			$('#go-agile').click(function() {
				ga('send', 'event', first+ ' ' +last, 'Go Agile');
			});
		}
	}
	if (current_url == '//marketolive.com/m/b2b/agile/') {
		if (first !== undefined || last !== undefined) {
			$('a').click(function() {
				action = $(this).find('h3').html();			
				ga('send', 'event', first+ ' ' +last, action);
			});
		}	
	}
	if (cust_prefix == 'mktodemoaccount106' || cust_prefix == 'mktodemoaccount106a' || cust_prefix == 'mktodemoaccount106b') {
		var jscript_lib = document.createElement('script');
		jscript_lib.setAttribute('type', 'text/javascript');
		jscript_lib.setAttribute('src', '//marketolive.com/plugin/analytics.js');
		document.getElementsByTagName('head')[0].appendChild(jscript_lib);
	}
});

console.log('MarketoLive Analytics Complete');