console.log('Plugin Loading MarketoLive Complete');
console.log('MarketoLive Script Executing...');
//----> Set Global Variables
var cust_prefix = '';
var current_user = '';
if (typeof(MktPage) !== "undefined") {
	cust_prefix = MktPage.savedState.custPrefix;
	console.log(cust_prefix);
	window.postMessage({
		type : 'DemoMsg',
		text : cust_prefix
	}, 'https://marketolive.com/');
	current_user = MktPage.userid;
	console.log(current_user);
}

window.addEventListener("prefix", function(data) {
	console.log(data.detail);
	chrome.runtime.sendMessage(data.detail);
}); 

var current_pod = getCookie('userPod');
if (current_pod == '') {
	//current_pod = 'app-sjp';
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

// Define Stylesheet for User Information Dialog
function userInfo_style() {
	var style = document.createElement('style');
	style.setAttribute('type', 'text/css');
	var style_data = document.createTextNode(
		".web_dialog_overlay{position: fixed;top: 0;right: 0;bottom: 0;left: 0;height: 100%;width: 100%;margin: 0;padding: 0;background: #000000;opacity: .15;filter: alpha(opacity=15);-moz-opacity: .15;z-index: 101;display: none;}" +
		".web_dialog{display: none;position: fixed;width: 415px;height: 240px;top: 50%;left: 50%;margin-left: -190px;margin-top: -100px;background-color: #ffffff;border: 2px solid #55528d;padding: 0px;z-index: 102;font-family: Verdana;font-size: 10pt;}" +
		".web_dialog_title{border-bottom: solid 2px #55528d;background-color:#55528d;padding: 4px;color: White;font-weight:bold;}" +
		".web_dialog_title a{color: White;text-decoration: none;font-size: 1.0em;}" +
		".align_right{text-align: right;}" +
		"#btnSubmit{background: #8A70B2;border: 1px solid #464E49;border-radius: 0;box-shadow: 0 1px 0 #ffffff, 0 1px 0 #ffffff inset;color: #F5F5F5;font-family: helvetica,serif;font-size: 14px;padding: 8.5px 18px;text-decoration: none;text-shadow: 0 1px 0 #464E49;vertical-align: middle;}"
	);
	style.appendChild(style_data);
	document.getElementsByTagName('head')[0].appendChild(style);
}
// Define HTML for User Information Dialog
function userInfo_html() {
	var html_div_1 = document.createElement('div');
	html_div_1.setAttribute('id', 'overlay');
	html_div_1.setAttribute('class', 'web_dialog_overlay');		
	document.getElementsByTagName('body')[0].appendChild(html_div_1);
	var html_div_2 = document.createElement('div');
	html_div_2.setAttribute('id', 'dialog');
	html_div_2.setAttribute('class', 'web_dialog');
	document.getElementsByTagName('body')[0].appendChild(html_div_2);	
	
	var html_table = document.createElement('table');
	html_table.setAttribute('style', 'width: 100%; border: 0px;');
	html_table.setAttribute('cellpadding', '3');
	html_table.setAttribute('cellspacing', '0');
	html_div_2.appendChild(html_table);
	
	var html_tr_1 = document.createElement('tr');
	html_table.appendChild(html_tr_1);
	
	var html_td_1 = document.createElement('td');
	html_td_1.setAttribute('class', 'web_dialog_title');
	html_tr_1.appendChild(html_td_1);
	
	var html_td_2= document.createElement('td');
	html_td_2.setAttribute('class', 'web_dialog_title align_right');
	html_tr_1.appendChild(html_td_2);
	
	var html_a = document.createElement('a');
	html_a.setAttribute('id', 'btnClose');
	html_a.setAttribute('href', '#');
	html_td_2.appendChild(html_a);
		
	var html_content_1 = document.createTextNode('Who Are You?');
	html_td_1.appendChild(html_content_1);
	var html_content_2 = document.createTextNode('Close');
	html_a.appendChild(html_content_2);
	
	var html_tr_2 = document.createElement('tr');
	html_table.appendChild(html_tr_2);
	
	var html_td_3 = document.createElement('td');
	var html_br_1 = document.createElement('br');
	html_td_3.appendChild(html_br_1);
	html_tr_2.appendChild(html_td_3);
	
	var html_td_4 = document.createElement('td');
	var html_br_2 = document.createElement('br');
	html_td_4.appendChild(html_br_2);	
	html_tr_2.appendChild(html_td_4);
	
	var html_tr_3 = document.createElement('tr');
	html_table.appendChild(html_tr_3);
	
	var html_td_5 = document.createElement('td');
	html_td_5.setAttribute('colspan', '2');
	html_td_5.setAttribute('style', 'padding-left:15px; color:#000000;');
	html_tr_3.appendChild(html_td_5);
	
	var html_b_1 = document.createElement('b');
	html_td_5.appendChild(html_b_1);
	
	var html_content_5 = document.createTextNode('Provide your information below:');
	html_b_1.appendChild(html_content_5);

	var html_tr_4 = document.createElement('tr');
	html_table.appendChild(html_tr_4);
	
	var html_td_6 = document.createElement('td');
	var html_br_3 = document.createElement('br');
	html_td_6.appendChild(html_br_3);	
	html_tr_4.appendChild(html_td_6);
	
	var html_td_7 = document.createElement('td');
	var html_br_4 = document.createElement('br');
	html_td_7.appendChild(html_br_4);
	html_tr_4.appendChild(html_td_7);
	
	var html_tr_5 = document.createElement('tr');
	html_table.appendChild(html_tr_5);
	
	var html_td_8 = document.createElement('td');
	html_td_8.setAttribute('colspan', '2');
	html_tr_5.appendChild(html_td_8);
	
	var html_div_1 = document.createElement('div');
	html_div_1.setAttribute('id', 'user_information');
	html_div_1.setAttribute('style', 'padding:0 40px;');
	html_td_8.appendChild(html_div_1);
	
	var html_div_2 = document.createElement('div');
	html_div_2.setAttribute('style', 'width: 100%; height: 100%; margin: 5px 0;');
	html_div_1.appendChild(html_div_2);
	
	var html_span_1 = document.createElement('span');
	html_span_1.setAttribute('style', 'float:left; color:#000000; padding-left:10px;');
	html_div_2.appendChild(html_span_1);
	var html_span_2 = document.createElement('span');
	html_span_2.setAttribute('style', 'float:right; color:#000000; padding-right:10px;');
	html_div_2.appendChild(html_span_2);
	
	var html_div_3 = document.createElement('div');
	html_div_3.setAttribute('style', 'width: 100%; height: 100%; margin: 25px 0;');
	html_div_1.appendChild(html_div_3);
	
	var html_span_3 = document.createElement('span');
	html_span_3.setAttribute('style', 'float:left; color:#000000; padding-left:10px;');
	html_div_3.appendChild(html_span_3);
	var html_span_4 = document.createElement('span');
	html_span_4.setAttribute('style', 'float:right; color:#000000; padding-right:10px;');
	html_div_3.appendChild(html_span_4);
	
	var html_div_4 = document.createElement('div');
	html_div_4.setAttribute('style', 'width: 100%; height: 100%; margin: 25px 0;');
	html_div_1.appendChild(html_div_4);
	
	var html_span_5 = document.createElement('span');
	html_span_5.setAttribute('style', 'float:left; color:#000000; padding-left:10px;');
	html_div_4.appendChild(html_span_5);
	var html_span_6 = document.createElement('span');
	html_span_6.setAttribute('style', 'float:right; color:#000000; padding-right:10px;');
	html_div_4.appendChild(html_span_6);
	
	var html_content_8 = document.createTextNode('First Name:');
	html_span_1.appendChild(html_content_8);
	var html_content_9 = document.createTextNode('Last Name:');
	html_span_3.appendChild(html_content_9);
	var html_content_10 = document.createTextNode('Email Address:');
	html_span_5.appendChild(html_content_10);	

	var html_input_1 = document.createElement('input');
	html_input_1.setAttribute('id', 'firstName');
	html_input_1.setAttribute('name', 'firstName');
	html_input_1.setAttribute('type', 'text');
	html_input_1.setAttribute('required', '');
	html_span_2.appendChild(html_input_1);
	
	var html_input_2 = document.createElement('input');
	html_input_2.setAttribute('id', 'lastName');
	html_input_2.setAttribute('name', 'lastName');
	html_input_2.setAttribute('type', 'text');
	html_input_2.setAttribute('required', '');
	html_span_4.appendChild(html_input_2);	

	var html_input_3 = document.createElement('input');
	html_input_3.setAttribute('id', 'emailAddress');
	html_input_3.setAttribute('name', 'emailAddress');
	html_input_3.setAttribute('type', 'text');
	html_input_3.setAttribute('required', '');
	html_span_6.appendChild(html_input_3);
	
	var html_tr_6 = document.createElement('tr');
	html_table.appendChild(html_tr_6);
	
	var html_td_9 = document.createElement('td');
	var html_br_5 = document.createElement('br');
	html_td_9.appendChild(html_br_5);
	html_tr_6.appendChild(html_td_9);
	
	var html_td_10 = document.createElement('td');
	var html_br_6 = document.createElement('br');
	html_td_10.appendChild(html_br_6);
	html_tr_6.appendChild(html_td_10);

	var html_tr_7 = document.createElement('tr');
	html_table.appendChild(html_tr_7);
	
	var html_td_11 = document.createElement('td');
	html_td_11.setAttribute('colspan', '2');
	html_td_11.setAttribute('style', 'text-align: center;');
	html_tr_7.appendChild(html_td_11);
	
	var html_input_4 = document.createElement('input');
	html_input_4.setAttribute('id', 'btnSubmit');
	html_input_4.setAttribute('value', 'Submit');
	html_input_4.setAttribute('type', 'button');
	html_input_4.setAttribute('required', '');
	html_td_11.appendChild(html_input_4);
}
// Define JavaScript for User Information Dialog
function userInfo_js() {
	var script = document.createElement('script');
	script.setAttribute('type', 'text/javascript');
	var script_data = document.createTextNode(						
		"var id;" +
		"$(document).on('click', '.home-action-button', function(event) {" +
			"id = $(this).attr('id') || '';" +
			"/*console.log(id);*/" +
		"});" +
   		"function ShowDialog(modal) {" +
      		"$('#overlay').show();" +
      		"$('#dialog').fadeIn(300);" +
      		"if (modal) {" +
         		"$('#overlay').unbind('click');" +
      		"}" +
      		"else" +
      		"{" +
      			"$('#overlay').click(function (e){" +
            		"HideDialog();" +
         		"});" +
      		"}" +
   		"}" +
   		"function HideDialog() {" +
      		"$('#overlay').hide();" +
      		"$('#dialog').fadeOut(300);" +
   		"}"
	);
	script.appendChild(script_data);
	document.getElementsByTagName('head')[0].appendChild(script);
}
// Define Stylesheet for Floating Demonstration Button
function floatButton_style() {
	var style = document.createElement('style');
	style.setAttribute('type', 'text/css');
	var style_data = document.createTextNode(
		"#floatMenu {position:absolute; top:78px; left:50%; margin-left:235px; width:200px; font-weight: 400;}" +
		"#floatMenu a {display:block; border:2px solid #fff; background-color:#716EB3; text-decoration:none; color:#fff; padding:5px 5px 5px 5px; text-align:center; font-size:14px;}" +
		"#floatMenu a:hover {border-color: orange; color: white; cursor: pointer;}"
	);
	style.appendChild(style_data);
	document.getElementsByTagName('head')[0].appendChild(style);
}
// Define HTML for Floating Demonstration Button
function floatButton_html() {
	var html_div_1 = document.createElement('div');
	html_div_1.setAttribute('id', 'floatMenu');		
	document.getElementsByTagName('body')[0].appendChild(html_div_1);
	var html_span_1 = document.createElement('span');
	html_div_1.appendChild(html_span_1);
	var html_a_1 = document.createElement('a');
	html_a_1.setAttribute('id', 'demoButton');
	html_a_1.setAttribute('onclick', 'marketoDemo()');
	html_a_1.setAttribute('title', 'Show this use case in Marketo');
	html_span_1.appendChild(html_a_1);
	var html_content_1 = document.createTextNode('Demo in Marketo');
	html_a_1.appendChild(html_content_1);
}
// Define JavaScript for Floating Demonstration Button
function floatButton_js() {
	var script = document.createElement('script');
	script.setAttribute('type', 'text/javascript');
	var script_data = document.createTextNode(						
		"var name = '#floatMenu';" +
		"var menuYloc = null;" +
		"$(document).ready(function(){" +
			"var x = parseInt($(name).css('top'));" +
    		"$(window).scroll(function(){" +
				"var offset = x+$(document).scrollTop()+'px';" + 
				"$(name).animate({top:offset},{duration:500,queue:false});" + 
			"});" +
		"});"
	);
	script.appendChild(script_data);
	document.getElementsByTagName('head')[0].appendChild(script);
}
//Set User Cookie
function setCookie(cname, cvalue, exdays, domain) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));	
	var expires = "expires=" + d.toGMTString();
	document.cookie = cname + "=" + cvalue + "; " + expires + "; " + "path=/;"+ "domain=" + domain+ ";";
}
//Delete User Cookie
function deleteCookie(cname) {
	document.cookie = cname + "= ; expires=Thu, 01 Jan 1970 00:00:00 GMT;"+ "path=/;"+ "domain=.marketolive.com;";
}
//Get User Cookie
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
//Check User Cookie
function checkCookie(cname) {
	var user_information = getCookie(cname);
	if (user_information != "") {		
		return true;
	} else {		
		return false;
	}
}
// Coming Soon Alert
function coming_soon() {
	alert('Coming Soon!');
}
// Define Style for Demonstration Pod Dialog
function podStatus_style() {
	var style = document.createElement('style');
	style.setAttribute('type', 'text/css');
	var style_data = document.createTextNode(
		"#floatDemo p {padding-top: 10px; color: #f2f2f2; padding: 10px 55px;}" +
		".ui-dialog-title {padding-right: 69px;}" +
		".ui-icon.ui-icon-alert {background-image: none;}" +
		".ui-dialog-buttonset {padding-top: 50px; width: 225px;}" +
		".ui-dialog.ui-widget.ui-widget-content.ui-corner-all.ui-front.ui-dialog-buttons.ui-draggable {background-color: #716EB3;}" +
		".ui-dialog-titlebar.ui-widget-header.ui-corner-all.ui-helper-clearfix {padding: 3px 0px;}" +
		".ui-button.ui-widget.ui-state-default.ui-corner-all.ui-button-icon-only.ui-dialog-titlebar-close {margin-left: 13px; width: 2.0em; height: 2.0em;}" +
		".ui-button.ui-widget.ui-state-default.ui-corner-all.ui-button-text-only {width:110px;}" +
		".ui-dialog-buttonpane.ui-widget-content.ui-helper-clearfix {padding: 18px 46px 10px;}" +
		".ui-widget-overlay {height: 100%; left: 0; position: fixed; top: 0; width: 100%;}"
	);
	style.appendChild(style_data);
	document.getElementsByTagName('head')[0].appendChild(style);
}
// Define HTML for Demonstration Pod Dialog
function podStatus_html() {
	var html_div_1 = document.createElement('div');
	html_div_1.setAttribute('id', 'floatPod');
	html_div_1.setAttribute('title', 'Demonstration Status');		
	document.getElementsByTagName('body')[0].appendChild(html_div_1);
	var html_p_1 = document.createElement('p');
	html_p_1.setAttribute('style', 'text-align:center; color:#ffffff; padding-top:8px;');
	html_div_1.appendChild(html_p_1);
	var html_span_1 = document.createElement('span');
	html_span_1.setAttribute('class', 'ui-icon ui-icon-alert');
	html_span_1.setAttribute('style', 'float:left; margin:0 7px 20px 0;');
	html_p_1.appendChild(html_span_1);
	var html_span_2 = document.createElement('span');
	html_span_2.setAttribute('style', 'padding: 0 15px 0 0;');
	html_p_1.appendChild(html_span_2);
	var html_content_1 = document.createTextNode('Demo account not detected.');
	html_span_2.appendChild(html_content_1);
	var html_br_1 = document.createElement('br');
	html_p_1.appendChild(html_br_1);
	var html_span_3 = document.createElement('span');
	html_span_3.setAttribute('style', 'padding: 0 10px 0 0;');
	html_p_1.appendChild(html_span_3);
	var html_content_2 = document.createTextNode('Choose an action.');
	html_span_3.appendChild(html_content_2);
}
// Define JavaScript for Demonstration Pod Dialog
function podStatus_js() {
	var script = document.createElement('script');
	script.setAttribute('type', 'text/javascript');
	var script_data = document.createTextNode(						
		"$(function() {" +
    		"$('#floatPod').dialog({" +
      			"resizable: false," +
				"height:140," +
				"modal:true," +
				"buttons: {" +
					"'Login': function() {" +
						"/*console.log('Login Action');*/" +
						"var myWindow = null;" +
						"myWindow = window.open('https://app.onelogin.com/trust/saml2/http-post/sso/421360','demoWindow');" +
						"window.location.replace('http://marketolive.com');" +
						"$(this).dialog('close');" +
						"/*console.log('Close Action');*/" +
					"}," +
					"'Close': function() {" +
						"$(this).dialog('close');" +
						"window.location.replace('http://marketolive.com');" +
						"/*console.log('Close Action');*/" +
					"}" +
				"}" +
			"});" +
		"});" +
		"$(function() {" +
			"$('div.ui-widget-overlay').css('position', 'fixed');" +
			"$('div.ui-dialog-buttonset > button').eq(0).hover(function() {" +
				"$(this).attr('title', 'Login to your demonstration account');" +
			"});" +
			"$('div.ui-dialog-buttonset > button').eq(1).hover(function() {" +
				"$(this).attr('title', 'Return to the MarketoLive homepage.');" +
			"});" +
		"});"
	);
	script.appendChild(script_data);
	document.getElementsByTagName('head')[0].appendChild(script);
}
// Load Demonstration Pod Status
function loadPodCheck() {
	var status_pod = checkCookie('userPod');
	var status_demo = checkCookie('userDemo');
	console.log(status_pod);
	console.log(status_demo);
	var current_pod = getCookie('userPod');
	var current_demo = getCookie('userDemo');
	console.log(current_pod);
	console.log(current_demo);	
	if (status_pod !== true && status_demo !== true) {
		podStatus_style();
		podStatus_html();
		podStatus_js();
		return false;
	} 
	if (current_pod !== 'app-sjp' || current_pod !== 'app-ab07') {
		podStatus_style();
		podStatus_html();
		podStatus_js();
		return false;				
	} else {
		return true;
	}
}

/*********************************************************************************/

//This function transforms the MarketoAgile page to all deep links 
function MarketoAgile() {
	console.log(current_pod);
//    var pod = new PODS.Pod(current_pod);
    $(".use-case").click(function(e) {
        e.preventDefault();
        window.open(pod[$(this).context.id]);
    });
}
/***********************************************************************************/

//Loads Floating Demonstration Button
function loadFloater() {
	floatButton_style();
	floatButton_html();	
	floatButton_js();	
}
//Loads User Information Dialog
function loadDialog() {
	userInfo_style();
	userInfo_html();
	userInfo_js();
}
//Define Style for Subscription Type and Login Dialog
function loadSubType_style() {
	var style = document.createElement('style');
	style.setAttribute('type', 'text/css');
	var style_data = document.createTextNode(
		"#login-lightbox {position: absolute; top: 0; left: 50%; width: 500px; height: 344px;margin-left: -250px; background: #fff; z-index: 1001; display: none;}" +
		"#login-lightbox-shadow {position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: #000; filter: alpha(opacity=75); -moz-opacity: 0.75; -khtml-opacity: 0.75; opacity: 0.75; z-index: 1000; display: none;}" +
		"#login-lightbox-outerdiv {width: 250px; position: relative;}" +
		"#login-lightbox-innerdiv {position: absolute; left: -320px; top: -220px;clip:rect(220px 600px 660px 0px);}"
	);
	style.appendChild(style_data);
	document.getElementsByTagName('head')[0].appendChild(style);
}
//Define HTML for Subscription Type and Login Dialog
function loadSubType_html() {
	var html_div_1 = document.createElement('div');
	html_div_1.setAttribute('id', 'login-lightbox');		
	document.getElementsByTagName('body')[0].appendChild(html_div_1);
	var html_div_2 = document.createElement('div');
	html_div_2.setAttribute('id', 'login-lightbox-shadow');		
	document.getElementsByTagName('body')[0].appendChild(html_div_2);
}
//Define JavaScript for Subscription Type and Login Dialog
function loadSubType_js() {
	// display the login-lightbox

	var script = document.createElement('script');
	script.setAttribute('type', 'text/javascript');
	var script_data = document.createTextNode(
		"function loginLightbox(insertContent, ajaxContentUrl){" +		

			"if($('#login-lightbox').size() == 1){" +
				//"$('#login-lightbox-shadow').click(function(e){" +
					//"closeLightbox();" +
				//"});" +
				"$('body').keyup(function(e) {" +
					"console.log(e.keyCode);" +
					"if (e.keyCode == 27) {" +
						"closeLightbox();" +
					"}" +
				"});" +
			"}" +

			//"$('#closeLightbox();lightbox').empty();" +

			"if(insertContent != null){" +
				"$('#login-lightbox').append(insertContent);" +
			"}" +

			"if(ajaxContentUrl != null){" +

				"$.ajax({" +
					"type: 'GET'," +
					"url: ajaxContentUrl," +
					"success:function(data){" +

						"$('#login-lightbox').empty();" +
						"$('#login-lightbox').append(data);" +
					"}," +
					"error:function(){" +
						"alert('AJAX Failure!');" +
					"}" +
				"});" +
			"}" +

			"$('#login-lightbox').css('top', $(window).scrollTop() + 100 + 'px');" +

			"$('#login-lightbox').show();" +
			"$('#login-lightbox-shadow').show();" +
			"return true;" +
		"}" +

		"function closeLightbox(){" +
			"$('#login-lightbox').hide();" +
			"$('#login-lightbox-shadow').hide();" +
			"$('#login-lightbox').empty();" +
		"}"
	);
	script.appendChild(script_data);
	document.getElementsByTagName('head')[0].appendChild(script);
}
//Loads Subscription Type Dialog
function loadSubType() {
	loadSubType_style();
	loadSubType_html();
	loadSubType_js();
}
//Creates the iframe for the Marketo Login Screen
function loadLoginFrame() {
	var login_state = loginLightbox('<iframe id="marketo_login_hijack" src="https://login.marketo.com" height="344" width="501" scrolling="no">' + 
									'<script type="javascript/text">' + 
									'$("#marketo_login_hijack").keyup(function(e) {' + 
										'console.log(e.keyCode);' + 
										'if (e.keyCode == 27) {' + 
											'closeLightbox();' + 
										'}' + 
									'});' + '</script>');
	if (login_state = true) {
		window.addEventListener('message', function(event) {
			if (event.data.type && event.data.type == 'ContentScript') {
				console.log(event.data.text);
				detectedPrefix = event.data.text;
				console.log('PAGE (ContentScript): Receive Plugin Message = ' + detectedPrefix);
			}
		}, false);
	}
}
var pluginStatus;
var detectedPrefix;

if (domain == 'marketolive.com') {
	$ = jQuery.noConflict();
	$(document).ready(function() {
		window.postMessage({
			type : 'PageMsg',
			text : 'mkto_live_loaded'
		}, 'https://marketolive.com/');
		window.addEventListener('message', function(event) {
			if (event.data.type && event.data.type == 'DemoScriptMsg') {
				pluginStatus = event.data.text;
				console.log('PAGE (DemoScriptMsg): Receive Plugin Message = ' + pluginStatus);
			}
			if (event.data.type && event.data.type == 'ContentScript') {
				detectedPrefix = event.data.text;
				console.log('PAGE (ContentScript): Receive Plugin Message = ' + detectedPrefix);
			}
		}, false);
		var referral_url = document.referrer;
		console.log(referral_url);
		if (referral_url == '') {
			console.log('Direct access to a this page is prevented. You must enter through Get Started.');
			window.location.replace('https://marketolive.com/m2/home.html');
		}
		if (current_url != 'https://marketolive.com/m2/home.html') {
			var fn_status = checkCookie('firstName');
			var ln_status = checkCookie('lastName');
			var em_status = checkCookie('emailAddress');
			if (fn_status == false || ln_status == false || em_status == false) {
				console.log('User information not found.');
				window.location.replace("https://marketolive.com/m2/home.html");
			}
		}	
		if (current_url == 'http://marketolive.com/m/b2b/rtp/') {
			loadFloater();			
		}
		if (current_url == 'https://marketolive.com/m2/home.html') {
			var goAgileButton = "<div class='home-page-option' id='first-option'><a id='action0'>Go Agile</a></div>"
			$('#second-option').before(goAgileButton);
			var goAgileNavLink = "<li><a id='go_agile_link'>Go Agile</a></li>"
			$('#title_nav_bar').append(goAgileNavLink);
			/*
			 $('#go_agile_link').hover(function(e) {
			 $('#go_agile_link').css({
			 'color':'#9d9d9d',
			 'cursor':'pointer'
			 });
			 });
			 */

			$('#go_agile_link').hover(function() {
				$('#go_agile_link').css('color', '#9d9d9d');
				$('#go_agile_link').css('cursor', 'pointer');
			}, function() {
				$('#go_agile_link').css('color', '#ffffff');
			});
		}

		if (window.location.href == 'https://marketolive.com/m2/go-agile/business.html') {
			MarketoAgile();
		}		
		if (current_url == 'https://marketolive.com/m2/home.html') {
			loadDialog();	
		}
		$('#second-option, #get_started_link').click(function(e) {
			window.postMessage({
				type : 'PageMsg',
				text : 'get_started_clicked'
			}, 'https://marketolive.com/');
			var fn_status = checkCookie('firstName');
			var ln_status = checkCookie('lastName');
			var em_status = checkCookie('emailAddress');
			//var dm_status = checkCookie('demoStatus');
			var mkto_status = checkCookie('_mkto_trk');
			var fn_ckv = getCookie('firstName');
			var ln_ckv = getCookie('lastName');
			var em_ckv = getCookie('emailAddress');
			if (fn_status == false || ln_status == false || em_status == false) {
				e.preventDefault();
				ShowDialog(true);
				$('#firstName').val(fn_ckv);
				$('#lastName').val(ln_ckv);
				$('#emailAddress').val(em_ckv);
			}
			else if (fn_status == true || ln_status == true || em_status == true) {
				if (fn_ckv == "" || ln_ckv == "" || em_ckv == "") {
					e.preventDefault();
					ShowDialog(true);
					$('#firstName').val(fn_ckv);
					$('#lastName').val(ln_ckv);
					$('#emailAddress').val(em_ckv);
				}else{
					HideDialog();
					//setCookie("demoStatus","active",0.04,".marketolive.com");
					e.preventDefault();
					var form_el = document.createElement('form');
					form_el.setAttribute('id', 'mktoFrom_1255');
					document.getElementsByTagName('body')[0].appendChild(form_el);				
					MktoForms2.loadForm("//app-sj08.marketo.com", "226-FBL-320", 1255, function(form) {
						MktoForms2.lightbox(form).show();
						var leadInfo = '<div id="form_content" style="color:#000; margin-bottom: 15px; font-weight:800;">Register Your Prospect:</div>';
						var target_div = $('.mktoModalContent').children('div');
						$(target_div).eq(0).after(leadInfo);
						$('.mktoModalClose').css('width', '48px')
						$('.mktoModalClose').html('Skip');
						var formCloseButton = $('.mktoModalClose').click(function(e) {
							window.location.replace("https://marketolive.com/m2/get-started/get-started.html");
						});
					});					
				}
			}else{
				//window.location.replace("https://marketolive.com/m/b2b/");
			}
		});
		$('#form_close').click(function(e) {
			console.log('click');
			window.location.replace("https://marketolive.com/m2/get-started/business.html");
		});
		$('#first-option, #go_agile_link').click(function(e) {
			window.postMessage({
				type : 'PageMsg',
				text : 'agile_clicked'
			}, 'https://marketolive.com/');
			var fn_status = checkCookie('firstName');
			var ln_status = checkCookie('lastName');
			var em_status = checkCookie('emailAddress');
			//var dm_status = checkCookie('demoStatus');
			var mkto_status = checkCookie('_mkto_trk');
			var fn_ckv = getCookie('firstName');
			var ln_ckv = getCookie('lastName');
			var em_ckv = getCookie('emailAddress'); 
			if (fn_status == false || ln_status == false || em_status == false) {
				e.preventDefault();
				ShowDialog(true);
				$('#firstName').val(fn_ckv);
				$('#lastName').val(ln_ckv);
				$('#emailAddress').val(em_ckv);
			}
			else if (fn_status == true || ln_status == true || em_status == true) {
				if (fn_ckv == "" || ln_ckv == "" || em_ckv == "") {
					e.preventDefault();
					ShowDialog(true);
					$('#firstName').val(fn_ckv);
					$('#lastName').val(ln_ckv);
					$('#emailAddress').val(em_ckv);
				}else{					
					HideDialog();
					e.preventDefault();
					loadSubType();
					loadLoginFrame();
					/*
					var login_state = loginLightbox('<iframe id="marketo_login_hijack" src="https://login.marketo.com" height="344" width="501" scrolling="no">' + 
													'<script type="javascript/text">' +
														'$("#marketo_login_hijack").keyup(function(e) {' +
															'console.log(e.keyCode);' +
															'if (e.keyCode == 27) {' +
																'closeLightbox();' +
															'}' +
														'});' +
													'</script>'
													);
					if (login_state = true) {
						window.addEventListener('message', function(event) {
							if (event.data.type && event.data.type == 'ContentScript') {
								console.log(event.data.text);
								detectedPrefix = event.data.text;
								console.log('PAGE (ContentScript): Receive Plugin Message = ' + detectedPrefix);
							}
						}, false);
					}
					*/					 
					//setCookie("userDemo","business", 0.04, ".marketolive.com");				
					//var subStatus = loadPodCheck();
					//if (subStatus !== true) {
						//e.preventDefault();
					//}else{
					//console.log('Now Open Agile');
					//setCookie("demoStatus","active",0.04, ".marketolive.com");						
					//window.location.replace("https://marketolive.com/m2/go-agile/business.html");
				}
			}
			else{
				console.log('Just Open Agile');
				//window.location.replace("https://marketolive.com/m2/go-agile/business.html");
			}
		});	
		$('#btnClose').click(function(e) {
			HideDialog();
		});	
		$('#btnSubmit').click(function(e) {
			var firstName = $('#firstName').val();
			var first_regex = new RegExp(/^[a-z ,.'-]+$/i);
			var first_result = first_regex.test(firstName);
			
			var lastName = $('#lastName').val();
			var last_regex = new RegExp(/^[a-z ,.'-]+$/i);
			var last_result = last_regex.test(lastName);
			
			var emailAddress = $('#emailAddress').val();
			var email_regex = new RegExp(/^[-0-9a-zA-Z.+_]+@marketo\.com/i);
			var email_result = email_regex.test(emailAddress);
			
			if (first_result == false) {
				alert('You must provide a properly formatted First Name');
				$('#firstName').val(firstName);
				$('#lastName').val(lastName);
				$('#emailAddress').val(emailAddress);
			}		
			else if (last_result == false) {
				alert('You must provide a properly formatted Last Name');
				$('#firstName').val(firstName);
				$('#lastName').val(lastName);
				$('#emailAddress').val(emailAddress);
			}
			else if (email_result == false) {
				alert('You must provide a properly formatted Marketo Email Address');
				$('#firstName').val(firstName);
				$('#lastName').val(lastName);
				$('#emailAddress').val(emailAddress);
			}
			else if (first_result == true && last_result == true && email_result == true) {
				HideDialog();
				//setCookie("demoStatus","active",0.04, ".marketolive.com");
				setCookie("firstName",firstName,365, ".marketolive.com");
				setCookie("lastName",lastName,365, ".marketolive.com");
				setCookie("emailAddress",emailAddress,365, ".marketolive.com");
				if (id == 'action0') {
					var form_el = document.createElement('form');
					form_el.setAttribute('id', 'mktoFrom_1255');
					document.getElementsByTagName('body')[0].appendChild(form_el);				
					MktoForms2.loadForm("//app-sj08.marketo.com", "226-FBL-320", 1255, function(form) {
						MktoForms2.lightbox(form).show();
						var leadInfo = '<div id="form_content" style="color:#000; margin-bottom: 15px; font-weight:800;">Register Your Prospect:</div>';
						var target_div = $('.mktoModalContent').children('div');
						$(target_div).eq(0).after(leadInfo);
					});	
					//window.location.replace("https://marketolive.com/m/b2b/");
				}
				else if (id == 'action1') {
					//loadPodCheck();
					//window.location.replace("https://marketolive.com/m2/go-agile/business.html");
					e.preventDefault();
					loadSubType();
					loginLightbox('<iframe id="marketo_login_hijack" src="https://login.marketo.com" height="344" width="501" scrolling="no">');
					window.addEventListener('message', function(event) {
						if (event.data.type && event.data.type == 'ContentScript') {
							console.log(event.data.text);
							detectedPrefix = event.data.text;
							console.log('PAGE (ContentScript): Receive Plugin Message = ' + detectedPrefix);
						}
					}, false);
				}
			}        				
		});
	});
}

if (domain == 'marketolive.com') {
	var jscript_lib = document.createElement('script');
	jscript_lib.setAttribute('type', 'text/javascript');
	jscript_lib.setAttribute('src', '//marketolive.com/plugin/analytics.js');
	document.getElementsByTagName('head')[0].appendChild(jscript_lib);
}

console.log('MarketoLive Script Complete');
