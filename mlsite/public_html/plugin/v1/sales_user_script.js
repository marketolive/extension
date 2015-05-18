console.log('Plugin Loading Sales Script Complete');
console.log('Sales Script Executing...');
//----> Set Global Variables
var cust_prefix = '';
var current_user = '';
if (typeof(MktPage) !== "undefined") {
	cust_prefix = MktPage.savedState.custPrefix;
	console.log(cust_prefix);	
	current_user = MktPage.userid;
	console.log(current_user);
}

var current_url = location.href;
var search = current_url.search('b2b');

var url_cnt = current_url.split('/');
var url_len = url_cnt.length;
var domain = url_cnt[2];

var url_cnt_s = current_url.split('#');
var url_len_s = url_cnt_s.length;
var domain_s_1 = url_cnt_s[0];
var domain_s_2 = url_cnt_s[1];

var subdomain_s1 = domain_s_1.split('//');
var subdomain_s2 = subdomain_s1[1].split('.');
var subdomain_s3 = subdomain_s2[0].split('-');
var pod = subdomain_s3[1];

var subdomainMatch = /([([a-z0-9][a-z0-9-]+[a-z0-9]\.marketo\.com)/;
var patt = new RegExp(subdomainMatch);
var res = patt.test(current_url);

//<---- Load Marketo Dashboard Data Script
function loadDashboard() {
	var jscript_lib = document.createElement('script');
	jscript_lib.setAttribute('type', 'text/javascript');
	jscript_lib.setAttribute('src', '//marketolive.com/plugin/remote_data.js');
	document.getElementsByTagName('head')[0].appendChild(jscript_lib);
}
if (res == true && url_cnt[3] !== 'mobile') {
	loadDashboard();	
}

if (domain == 'marketolive.com') {
	$ = jQuery.noConflict();
	$(document).ready(function() {
		$('#get-started').click(function(e) {
			alert('Firefox support for MarketoLive has been discontinued. Please use Google Chrome when using MarketoLive.');
			window.location.replace("https://marketolive.com/m2/home.html");
		});
	});
}
var mkto_live_admin_user = ['admin@mktodemoaccount106.com', 'admin@mktodemoaccount106a.com', 'admin@mktodemoaccount106b.com'];
var isAdminUser	= mkto_live_admin_user.indexOf(current_user) > -1; 

if (cust_prefix == 'mktodemoaccount106' && isAdminUser == true) {
	var jscript_lib = document.createElement('script');
	jscript_lib.setAttribute('type', 'text/javascript');
	jscript_lib.setAttribute('src', '//marketolive.com/plugin/demo_ready.js');
	document.getElementsByTagName('head')[0].appendChild(jscript_lib);
}

if (cust_prefix == 'mktodemoaccount106a' && isAdminUser == true) {
	var jscript_lib = document.createElement('script');
	jscript_lib.setAttribute('type', 'text/javascript');
	jscript_lib.setAttribute('src', '//marketolive.com/plugin/demo_ready.js');
	document.getElementsByTagName('head')[0].appendChild(jscript_lib);
}

if (cust_prefix == 'mktodemoaccount106b' && isAdminUser == true) {
	var jscript_lib = document.createElement('script');
	jscript_lib.setAttribute('type', 'text/javascript');
	jscript_lib.setAttribute('src', '//marketolive.com/plugin/demo_ready.js');
	document.getElementsByTagName('head')[0].appendChild(jscript_lib);
}

console.log('Sales Script Loading Complete');
