console.log('Plugin Loading Sales Script Complete');
console.log('Sales Script Executing...');
//----> Set Global Variables
var cust_prefix = '';
var current_user = '';
if (typeof(MktPage) !== "undefined") {
	cust_prefix = MktPage.savedState.custPrefix;
	//console.log(cust_prefix);	
	current_user = MktPage.userid;
	//console.log(current_user);
}
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
	var html_br_1 = document.createTextNode('&nbsp;');
	html_td_3.appendChild(html_br_1);
	html_tr_2.appendChild(html_td_3);
	
	var html_td_4 = document.createElement('td');
	var html_br_2 = document.createTextNode('&nbsp;');
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
	var html_br_3 = document.createTextNode('&nbsp;');
	html_td_6.appendChild(html_br_3);	
	html_tr_4.appendChild(html_td_6);
	
	var html_td_7 = document.createElement('td');
	var html_br_4 = document.createTextNode('&nbsp;');
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
	var html_br_5 = document.createTextNode('&nbsp;');
	html_td_9.appendChild(html_br_5);
	html_tr_6.appendChild(html_td_9);
	
	var html_td_10 = document.createElement('td');
	var html_br_6 = document.createTextNode('&nbsp;');
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
// Define Stylesheet for Demonstration Status Dialog
function demoStatus_style() {
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
// Define HTML for Demonstration Status Dialog
function demoStatus_html() {
	var html_div_1 = document.createElement('div');
	html_div_1.setAttribute('id', 'floatDemo');
	html_div_1.setAttribute('title', 'Demonstration Status');		
	document.getElementsByTagName('body')[0].appendChild(html_div_1);
	var html_p_1 = document.createElement('p');
	html_div_1.appendChild(html_p_1);
	var html_span_1 = document.createElement('span');
	html_span_1.setAttribute('class', 'ui-icon ui-icon-alert');
	html_span_1.setAttribute('style', 'float:left; margin:0 7px 20px 0;');
	html_p_1.appendChild(html_span_1);
	var html_span_2 = document.createElement('span');
	html_span_2.setAttribute('style', 'padding: 0 0;');
	html_p_1.appendChild(html_span_2);
	var html_content_1 = document.createTextNode('Your session has expired.');
	html_span_2.appendChild(html_content_1);
	var html_br_1 = document.createElement('br');
	html_p_1.appendChild(html_br_1);
	var html_span_3 = document.createElement('span');
	html_span_3.setAttribute('style', 'padding: 0 20px;');
	html_p_1.appendChild(html_span_3);
	var html_content_2 = document.createTextNode('Choose an action.');
	html_span_3.appendChild(html_content_2);
}
// Define JavaScript for Demonstration Status Dialog
function demoStatus_js() {
	var script = document.createElement('script');
	script.setAttribute('type', 'text/javascript');
	var script_data = document.createTextNode(						
		"$(function() {" +
    		"$('#floatDemo').dialog({" +
      			"resizable: false," +
				"height:140," +
				"modal: true," +
				"buttons: {" +
					"'New Demo': function() {" +
						"deleteCookie('_mkto_trk');" +
						"setTimeout(function(){" +
							"window.location.href = 'http://marketolive.com/m/';" +							
						"},1000);" +						     				        				          				 
						"$(this).dialog('close');" +
					"}," +
					"'Continue': function() {" +
						"setCookie('demoStatus','active',0.04);" +
						"$(this).dialog('close');" +
					"}" +
				"}" +
			"});" +
		"});" +
		"$(function() {" +
			"$('div.ui-widget-overlay').css('position', 'fixed');" +
			"$('div.ui-dialog-buttonset > button').eq(0).hover(function() {" +
				"$(this).attr('title', 'Start a new demonstration with a new prospect profile.');" +
			"});" +
			"$('div.ui-dialog-buttonset > button').eq(1).hover(function() {" +
				"$(this).attr('title', 'Continue the demonstration with the current prospect profile.');" +
			"});" +
		"});"
	);
	script.appendChild(script_data);
	document.getElementsByTagName('head')[0].appendChild(script);
}
//Set User Cookie
function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));	
	var expires = "expires=" + d.toGMTString();
	document.cookie = cname + "=" + cvalue + "; " + expires + "; " + "path=/;"+ "domain=.marketolive.com;";
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
						"myWindow = window.open('https://login.marketo.com/','demoWindow');" +
						"window.location.replace('//marketolive.com');" +
						"$(this).dialog('close');" +
						"/*console.log('Close Action');*/" +
					"}," +
					"'Close': function() {" +
						"$(this).dialog('close');" +
						"window.location.replace('//marketolive.com');" +
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
	var current_pod = getCookie('userPod');
	//console.log(current_pod);
	if (current_pod !== 'app-sjp' || current_pod !== 'app-ab07' || current_pod !== 'app-ab08') {
		podStatus_style();
		podStatus_html();
		podStatus_js();				
	}
}
//This function sets the Floating Demonstration Button actions for each each use case
function marketoDemo() {
	var current_pod = getCookie('userPod');
	if (current_pod !== '') {
		var mkto = 'https://'+current_pod+'.marketo.com/#';	
	}else{
		var mkto = 'https://app-sjp.marketo.com/#';
	}	
	var cu = $.trim($('#page-name').text());
	//console.log(cu);
	var muc = '';
	var myWindow = null;
	switch(cu)
	{
		case 'Search Optimization':
			alert('Coming Soon!');
			//myWindow = window.open('https://seo.marketo.com/','demoWindow');
			break;
		case 'Social Promotions':
			alert('Coming Soon!');
			break;
		case 'Personalization' : 
			alert('Coming Soon!');
			var rtp_demo = $('#frame').attr('src'); 
			//console.log(rtp_demo);
			if (rtp_demo == '//fc.insightera.com/proxy/rtp/preview?rtp.cuid=3e012a02-a897-41ec-b8a1-d3996cee34bd&shared=1&_dc=1413970703272') {
				//console.log('Financial Sector Campaign');
			} 	
			else if (rtp_demo == '//fc.insightera.com/proxy/rtp/preview?rtp.cuid=eee81ae1-0b29-455e-90e8-e7d2a8413a86&shared=1&_dc=1412688047958') {
				//console.log('New York Campaign');
			}else{
				//console.log('RTP Root');
				//myWindow = window.open('https://sjrtp1.marketo.com/app/ctas.ext','demoWindow');
			}
			break;
		case 'Automate':
			muc = 'SC13488A1'; 
			myWindow = window.open(mkto+muc,'demoWindow');
			break;
		case 'Batch':
			muc = 'EBP3947A1'; 
			myWindow = window.open(mkto+muc,'demoWindow');
			break;
		case 'Drip':
			muc = 'SC13496A1'; 
			myWindow = window.open(mkto+muc,'demoWindow');
			break;
		case 'Nurture':
			var sp = $('#checked1').length;
			if (sp == 0) {
				alert('Choose a Nurture Program');
				break;
			}
			else {
				var np = $('#checked1').closest('div').attr('id');
				if (np == 'producta') {
					muc = 'NP3950B2'; 
					myWindow = window.open(mkto+muc,'demoWindow');
					break;
				}				
				else if (np == 'productb') {
					muc = 'NP4066B2'; 
					myWindow = window.open(mkto+muc,'demoWindow');
					break;
				}
				else if (np == 'productc') {
					muc = 'NP4067B2'; 
					myWindow = window.open(mkto+muc,'demoWindow');
					break;
				}
			}
		case 'Events':
			var ep = $('#eventType').val();
			if (ep == '') {
				alert('Choose an Event Type');
				break;
			}
			else if (ep == 'Webinar') {
				muc = 'ME3974B2'; 
				myWindow = window.open(mkto+muc,'demoWindow');
				break;	
			}
			else if(ep == 'Tradeshow') {
				muc = 'ME4065B2'; 
				myWindow = window.open(mkto+muc,'demoWindow');
				break;	
			}
		case 'Calendar':
			var muc = 'CAL0A1-eyJlZGl0IjoxLCJkdCI6IjIwMTQxMTAyIiwiY3QiOjAsInRhZ3MiOnsic3lzLkVudHJ5U3VidHlwZSI6WyJlbWFpbCIsImVtYWlsX2NhbXBhaWduX3J1biIsImV2ZW50Iiwid2ViaW5hciIsIm51cnR1cmVfcnVuIiwiZW1haWxfdGVzdCIsImNhbXBhaWduX3J1biJdfX0='
			myWindow = window.open(mkto+muc,'demoWindow');
			break;
		case 'Lead Scoring':
			$('#demoButton1').click(function() {
				muc = 'PG3876A1'; 
				myWindow = window.open(mkto+muc,'demoWindow');
			});
			$('#demoButton2').click(function() {
				myWindow = window.open('https://na10.salesforce.com/00Q?fcf=00BF0000006XuwF','demoWindow');
			});
			break;
		case 'Sales Notifications':
			muc = 'PG4689A1'; 
			myWindow = window.open(mkto+muc,'demoWindow');
			break;
		case 'Actionable Insight':
			myWindow = window.open('https://mkto-si.na10.visual.force.com/apex/mkto_si__Dashboard','demoWindow');
			break;
		case 'Executive Dashboards':
			muc = 'AR1559A1!';
			myWindow = window.open(mkto+muc,'demoWindow');
			break;
		case 'Content Analysis':
			alert('Coming Soon!');
			break;
		case 'Flexible Reporting':
			alert('Coming Soon!');
			break;
	}
	if (myWindow) {
		myWindow.opener = null;
	}
}
//This function transforms the MarketoLive homepage to all deep links into mktodemoaccount106
function DemonstrateMarketo() {
	//Change all use case links to redirects to Marketo use cases
	setCookie("demoType","Demonstrate",365);
	$('#floatMenu').empty();
	$('#floatMenu').append("<span><a id='ActivateExperience' onclick='ExperienceMarketo()' title='Click to disable demo shortcuts'>Demo Shortcut - Enabled</a></span>");
	$('#floatMenu').find('a').css('background-color', 'orange');
	var demo_hrefs_mem_services = new Array();
	demo_hrefs_mem_services[0] = 'https://seo.marketo.com/';
	demo_hrefs_mem_services[1] = '';
	demo_hrefs_mem_services[2] = '';
	var mem_hrefs = new Array();
	$('div#mem-services > div.service-white').each(function(index){
		mem_hrefs.push($(this).find('a').attr('href'));
		//console.log('Index = ' + index + ', Value = ' + $(this).find('a').attr('href'));
		$(this).find('a').attr('href', demo_hrefs_mem_services[index]);
		if ($(this).find('a').attr('href').length > 1) {
			$(this).find('a').attr('target', '_blank');
		}else{
			$(this).find('a').removeAttr('href');
			$(this).find('a').removeAttr('target');
			$(this).find('a').attr('onclick', 'coming_soon()');
		} 
	});	
	var demo_hrefs_eyc_services = new Array();
	demo_hrefs_eyc_services[0] = 'https://'+current_pod+'.marketo.com/#SC13488A1';
	demo_hrefs_eyc_services[1] = 'https://'+current_pod+'.marketo.com/#EBP3947A1';
	demo_hrefs_eyc_services[2] = 'https://'+current_pod+'.marketo.com/#SC13496A1';
	demo_hrefs_eyc_services[3] = 'https://'+current_pod+'.marketo.com/#NP3950B2';
	demo_hrefs_eyc_services[4] = 'https://'+current_pod+'.marketo.com/#MF6168A1';
	demo_hrefs_eyc_services[5] = 'https://'+current_pod+'.marketo.com/#CAL0A1-eyJlZGl0IjoxLCJkdCI6IjIwMTQxMTAyIiwiY3QiOjAsInRhZ3MiOnsic3lzLkVudHJ5U3VidHlwZSI6WyJlbWFpbCIsImVtYWlsX2NhbXBhaWduX3J1biIsImV2ZW50Iiwid2ViaW5hciIsIm51cnR1cmVfcnVuIiwiZW1haWxfdGVzdCIsImNhbXBhaWduX3J1biJdfX0=';
	var eyc_hrefs = new Array();
	$('div[id^=eyc-services] > div.service-purple').each(function(index){
		eyc_hrefs.push($(this).find('a').attr('href'));
		//console.log('Index = ' + index + ', Value = ' + $(this).find('a').attr('href'));
		$(this).find('a').attr('href', demo_hrefs_eyc_services[index]);
		if ($(this).find('a').attr('href').length > 1) {
			$(this).find('a').attr('target', '_blank');
		}else{
			$(this).find('a').removeAttr('href');
			$(this).find('a').removeAttr('target');
			$(this).find('a').attr('onclick', 'coming_soon()');
		} 
	});
	var demo_hrefs_aws_services = new Array();
	demo_hrefs_aws_services[0] = 'https://'+current_pod+'.marketo.com/#PG3876A1';
	demo_hrefs_aws_services[1] = 'https://'+current_pod+'.marketo.com/#PG4689A1';
	demo_hrefs_aws_services[2] = 'https://mkto-si.na10.visual.force.com/apex/mkto_si__Dashboard';
	var aws_hrefs = new Array();
	$('div#aws-services > div.service-white').each(function(index){
		aws_hrefs.push($(this).find('a').attr('href'));
		//console.log('Index = ' + index + ', Value = ' + $(this).find('a').attr('href'));
		$(this).find('a').attr('href', demo_hrefs_aws_services[index]);
		if ($(this).find('a').attr('href').length > 1) {
			$(this).find('a').attr('target', '_blank');
		}else{
			$(this).find('a').removeAttr('href');
			$(this).find('a').removeAttr('target');
			$(this).find('a').attr('onclick', 'coming_soon()');
		} 
	});
	var demo_hrefs_mys_services = new Array();
	demo_hrefs_mys_services[0] = 'https://'+current_pod+'.marketo.com/#AR1559A1!';
	demo_hrefs_mys_services[1] = '';
	demo_hrefs_mys_services[2] = '';
	var mys_hrefs = new Array();
	$('div#mys-services > div.service-purple').each(function(index){
		mys_hrefs.push($(this).find('a').attr('href'));
		//console.log('Index = ' + index + ', Value = ' + $(this).find('a').attr('href'));
		$(this).find('a').attr('href', demo_hrefs_mys_services[index]);
		if ($(this).find('a').attr('href').length > 1) {
			$(this).find('a').attr('target', '_blank');
		}else{
			$(this).find('a').removeAttr('href');
			$(this).find('a').removeAttr('target');
			$(this).find('a').attr('onclick', 'coming_soon()');
		}
	});
}
//This function transforms the MarketoLive homepage to the default links for each use case on MarketoLive
function ExperienceMarketo() {
	setCookie("demoType","Experience",365);
	//Revert all use case links to actual MarketoLive use cases
	$('#floatMenu').empty();
	$('#floatMenu').append("<span><a id='ActivateDemonstration' onclick='DemonstrateMarketo()' title='Click to enable demo shortcuts'>Demo Shortcut - Disabled</a></span>");
	$('#floatMenu').find('a').css('background-color', '#716eb3');
	var demo_hrefs_mem_services = new Array();
	demo_hrefs_mem_services[0] = 'http://marketolive.com/m/b2b/search-engine-optimization/';
	demo_hrefs_mem_services[1] = 'http://marketolive.com/m/b2b/social-promotions/';
	demo_hrefs_mem_services[2] = 'http://marketolive.com/m/b2b/website-personalization/';
	var mem_hrefs = new Array();
	$('div#mem-services > div.service-white').each(function(index) {
		mem_hrefs.push($(this).find('a').attr('href'));
		//console.log('Index = ' + index + ', Value = ' + $(this).find('a').attr('href'));
		$(this).find('a').attr('href', demo_hrefs_mem_services[index]);
		$(this).find('a').removeAttr('target');
		$(this).find('a').removeAttr('onclick');
	});
	var demo_hrefs_eyc_services = new Array();
	demo_hrefs_eyc_services[0] = 'http://marketolive.com/m/b2b/automated-email/';
	demo_hrefs_eyc_services[1] = 'http://marketolive.com/m/b2b/batch-email-faq/';
	demo_hrefs_eyc_services[2] = 'http://marketolive.com/m/b2b/drip-email-faq/';
	demo_hrefs_eyc_services[3] = 'http://marketolive.com/m/b2b/nurture/';
	demo_hrefs_eyc_services[4] = 'http://marketolive.com/m/b2b/events/';
	demo_hrefs_eyc_services[5] = 'http://marketolive.com/m/b2b/calendar/';
	var eyc_hrefs = new Array();
	$('div[id^=eyc-services] > div.service-purple').each(function(index) {
		eyc_hrefs.push($(this).find('a').attr('href'));
		//console.log('Index = ' + index + ', Value = ' + $(this).find('a').attr('href'));
		$(this).find('a').attr('href', demo_hrefs_eyc_services[index]);
		$(this).find('a').removeAttr('target');
		$(this).find('a').removeAttr('onclick');
	});
	var demo_hrefs_aws_services = new Array();
	demo_hrefs_aws_services[0] = 'http://marketolive.com/m/b2b/score/';
	demo_hrefs_aws_services[1] = 'http://marketolive.com/m/b2b/sales-alert/';
	demo_hrefs_aws_services[2] = 'http://marketolive.com/m/b2b/sales-insight/';
	var aws_hrefs = new Array();
	$('div#aws-services > div.service-white').each(function(index){
		aws_hrefs.push($(this).find('a').attr('href'));
		//console.log('Index = ' + index + ', Value = ' + $(this).find('a').attr('href'));
		$(this).find('a').attr('href', demo_hrefs_aws_services[index]);
		$(this).find('a').removeAttr('target');
		$(this).find('a').removeAttr('onclick');
	});
	var demo_hrefs_mys_services = new Array();
	demo_hrefs_mys_services[0] = 'http://marketolive.com/m/b2b/executive-dashboards-faq/';
	demo_hrefs_mys_services[1] = 'http://marketolive.com/m/b2b/content-analysis-faq/';
	demo_hrefs_mys_services[2] = 'http://marketolive.com/m/b2b/tactical-reporting-faq/'
	var mys_hrefs = new Array();
	$('div#mys-services > div.service-purple').each(function(index) {
		eyc_hrefs.push($(this).find('a').attr('href'));
		//console.log('Index = ' + index + ', Value = ' + $(this).find('a').attr('href'));
		$(this).find('a').attr('href', demo_hrefs_mys_services[index]);
		$(this).find('a').removeAttr('target');
		$(this).find('a').removeAttr('onclick');
	}); 	
}
//This function transforms the MarketoAgile page to all deep links 
function MarketoAgile() {
	if (current_pod == 'app-sjp') {
		//console.log(current_pod);
		//Change all use case links to redirects to Marketo use cases
		var demo_hrefs_agile_106 = new Array();
		demo_hrefs_agile_106[0] = 'https://'+current_pod+'.marketo.com/#PG4217A1'; //Emails, Forms and Landing Pages
		demo_hrefs_agile_106[1] = 'https://mkto-si.na10.visual.force.com/apex/mkto_si__Dashboard'; //Sales Insight
		demo_hrefs_agile_106[2] = 'https://'+current_pod+'.marketo.com/#SC14945A1'; //Segments and Workflows
		demo_hrefs_agile_106[3] = 'https://'+current_pod+'.marketo.com/#AR1559A1!'; // Marketing ROI
		demo_hrefs_agile_106[4] = 'https://'+current_pod+'.marketo.com/#NP5170B2'; //Customer Engagement
		demo_hrefs_agile_106[5] = 'https://'+current_pod+'.marketo.com/#MF6429A1'; // Replicate Success
		demo_hrefs_agile_106[6] = 'https://seo.marketo.com/'; // Search Optimization
		demo_hrefs_agile_106[8] = 'http://marketolive.com/m/b2b/rtp/'; // Personalization
		demo_hrefs_agile_106[10] = 'https://'+current_pod+'.marketo.com/#CAL0-eyJlZGl0IjoxLCJkdCI6IjIwMTUwMzA4IiwiY3QiOjAsInRhZ3MiOnsic3lzLkVudHJ5U3VidHlwZSI6WyJlbWFpbCIsIndlYmluYXIiLCJudXJ0dXJlX3J1biIsImVtYWlsX3Rlc3QiLCJjYW1wYWlnbl9ydW4iLCJub25lIiwiYjMxYmE2YTYtMDk5Ni00ODMyLWJhZjQtNzk5ODQ3ZGY4YmM4IiwiZXZlbnQiLCIwNWVlZmQ0Yy05OGZiLTRhYjctOTFjZS1hYTE2NWNhZDI0YjkiLCIyNDQ2ODg5MC0yNjEwLTRkMjctYjZlYy05ODVlYjQxNzViOTUiLCI0MTU0MmJiNy1jMzQ0LTQ3NGItODU4Zi1mNGM5YWM1MzcwZjciLCJkZWVjMDkwZC1iY2U0LTQ1MjYtYjYwMy1iMmRhOTc5MzMwNmIiLCIxMzhlZmM1OS02MjU0LTRkNDYtYjdmYi0zZWVjNzA2YTU3ZTMiLCI3YmZiOThkNS05M2IzLTQxMjUtODE5Yy0xZDlkYjMxMzEwYjAiLCI2NDRjOWNiNS0yMjU2LTRlNmMtYjI1YS04ODEzNTE3NGM2MTIiLCI1ZTU4NGQ1Yi04NGI0LTQ2YTctYWIzNi1mMGJmYTE0ZWQ2YzQiXSwic3lzLldvcmtzcGFjZUlkIjpbIjEiXX19'; // Calendar

		var blocks = $('div[id^=block_]');
		var n = 0;
		for (var i = 0, tot = blocks.length; i < tot; i++) {
			$('#block_'+i+'> div.service-white').each(function(index){
				//console.log($(this).find('a').attr('href'));
				$(this).find('a').attr('href', demo_hrefs_agile_106[n]);
				if ($(this).find('a').attr('href').length > 1) {
					$(this).find('a').attr('target', '_blank');
				}else{
					$(this).find('a').removeAttr('href');
				}
				n = n + 1;				
			});
		}	
	}
	else if (current_pod == 'app-ab07') {
		//console.log(current_pod);
		//Change all use case links to redirects to Marketo use cases
		var demo_hrefs_agile_106a = new Array();
		demo_hrefs_agile_106a[0] = 'https://'+current_pod+'.marketo.com/#PG4217A1'; //Emails, Forms and Landing Pages
		demo_hrefs_agile_106a[1] = 'https://mkto-si.na10.visual.force.com/apex/mkto_si__Dashboard'; //Sales Insight
		demo_hrefs_agile_106a[2] = 'https://'+current_pod+'.marketo.com/#SC14945A1'; //Segments and Workflows
		demo_hrefs_agile_106a[3] = 'https://'+current_pod+'.marketo.com/#AR1559A1!'; // Marketing ROI
		demo_hrefs_agile_106a[4] = 'https://'+current_pod+'.marketo.com/#NP4216B2'; //Customer Engagement
		demo_hrefs_agile_106a[5] = 'https://'+current_pod+'.marketo.com/#MF6429A1'; // Replicate Success
		demo_hrefs_agile_106a[6] = 'https://seo.marketo.com/'; // Search Optimization
		demo_hrefs_agile_106a[8] = '//marketolive.com/m/b2b/rtp/'; // Personalization
		demo_hrefs_agile_106a[10] = 'https://'+current_pod+'.marketo.com/#CAL0A1-eyJlZGl0IjoxLCJkdCI6IjIwMTQxMTAyIiwiY3QiOjAsInRhZ3MiOnsic3lzLkVudHJ5U3VidHlwZSI6WyJlbWFpbCIsImVtYWlsX2NhbXBhaWduX3J1biIsImV2ZW50Iiwid2ViaW5hciIsIm51cnR1cmVfcnVuIiwiZW1haWxfdGVzdCIsImNhbXBhaWduX3J1biJdfX0='; // Calendar

		var blocks = $('div[id^=block_]');
		var n = 0;
		for (var i = 0, tot = blocks.length; i < tot; i++) {
			$('#block_'+i+'> div.service-white').each(function(index){
				$(this).find('a').attr('href', demo_hrefs_agile_106a[n]);
				if ($(this).find('a').attr('href').length > 1) {
					$(this).find('a').attr('target', '_blank');
				}else{
					$(this).find('a').removeAttr('href');
				}
				n = n + 1;				
			});
		}	
	}
		else if (current_pod == 'app-ab08') {
		//console.log(current_pod);
		//Change all use case links to redirects to Marketo use cases
		var demo_hrefs_agile_106a = new Array();
		demo_hrefs_agile_106a[0] = 'https://'+current_pod+'.marketo.com/#PG4217A1'; //Emails, Forms and Landing Pages
		demo_hrefs_agile_106a[1] = 'https://mkto-si.na10.visual.force.com/apex/mkto_si__Dashboard'; //Sales Insight
		demo_hrefs_agile_106a[2] = 'https://'+current_pod+'.marketo.com/#SC14945A1'; //Segments and Workflows
		demo_hrefs_agile_106a[3] = 'https://'+current_pod+'.marketo.com/#AR1559A1!'; // Marketing ROI
		demo_hrefs_agile_106a[4] = 'https://'+current_pod+'.marketo.com/#NP4216B2'; //Customer Engagement
		demo_hrefs_agile_106a[5] = 'https://'+current_pod+'.marketo.com/#MF6429A1'; // Replicate Success
		demo_hrefs_agile_106a[6] = 'https://seo.marketo.com/'; // Search Optimization
		demo_hrefs_agile_106a[8] = '//marketolive.com/m/b2b/rtp/'; // Personalization
		demo_hrefs_agile_106a[10] = 'https://'+current_pod+'.marketo.com/#CAL0A1-eyJlZGl0IjoxLCJkdCI6IjIwMTQxMTAyIiwiY3QiOjAsInRhZ3MiOnsic3lzLkVudHJ5U3VidHlwZSI6WyJlbWFpbCIsImVtYWlsX2NhbXBhaWduX3J1biIsImV2ZW50Iiwid2ViaW5hciIsIm51cnR1cmVfcnVuIiwiZW1haWxfdGVzdCIsImNhbXBhaWduX3J1biJdfX0='; // Calendar

		var blocks = $('div[id^=block_]');
		var n = 0;
		for (var i = 0, tot = blocks.length; i < tot; i++) {
			$('#block_'+i+'> div.service-white').each(function(index){
				$(this).find('a').attr('href', demo_hrefs_agile_106a[n]);
				if ($(this).find('a').attr('href').length > 1) {
					$(this).find('a').attr('target', '_blank');
				}else{
					$(this).find('a').removeAttr('href');
				}
				n = n + 1;				
			});
		}	
	}
	else {
		console.log('User is logged into a non-supported Marketo subscription');
		loadPodCheck();
	}	
	$('#target').removeClass('loading');
}
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
//Loads Demonstration Status Dialog
function loadDemoCheck() {
	demoStatus_style();
	demoStatus_html();
	demoStatus_js();
}
// These functions add the demo button functionality to the Marketo Analyzers
// This function gets the current URLs of each Analyzer and sets the onclick location 
function showAnalyzer(id) {
	//console.log(current_pod);
	if (current_pod == 'app-sjp' || current_pod == 'app-ab07') {
		if (id == 0) {
			window.location = 'https://'+current_pod+'.marketo.com/#AR1559A1!';
			document.getElementById('analyzerPrev').setAttribute('style', 'display: none;');
			document.getElementById('analyzerNext').setAttribute('style', 'display: block;');
			document.getElementById('analyzerNext').setAttribute('title', 'Go to the Program Analyzer');
			document.getElementById('analyzerNext').setAttribute('onclick', 'showAnalyzer(1)');
		}
		if (id == 1) {
			window.location = 'https://'+current_pod+'.marketo.com/#AR1544A1!';
			document.getElementById('analyzerPrev').setAttribute('style', 'display: block;');
			document.getElementById('analyzerPrev').setAttribute('title', 'Go to the Opportunity Analyzer');
			document.getElementById('analyzerPrev').setAttribute('onclick', 'showAnalyzer(0)');
			document.getElementById('analyzerNext').setAttribute('style', 'display: block;');
			document.getElementById('analyzerNext').setAttribute('title', 'Go to the Success Path Analyzer');
			document.getElementById('analyzerNext').setAttribute('onclick', 'showAnalyzer(2)');	
		}
		if (id == 2) {
			window.location = 'https://'+current_pod+'.marketo.com/#AR1682A1!';
			document.getElementById('analyzerPrev').setAttribute('style', 'display: block;');
			document.getElementById('analyzerPrev').setAttribute('title', 'Go to the Program Analyzer');
			document.getElementById('analyzerPrev').setAttribute('onclick', 'showAnalyzer(1)');
			document.getElementById('analyzerNext').setAttribute('style', 'display: none;');
		}		
	}
}
// This function adds HTML for the Demo Button in the Analyzers
function loadHtml_analyzers() {
	var html_div_1 = document.createElement('div');
	html_div_1.setAttribute('id', 'analyzerMenu');
	var html_span_1 = document.createElement('span');
	html_span_1.setAttribute('id', 'analyzerPrev');
	html_div_1.appendChild(html_span_1);
	var html_span_2 = document.createElement('span');
	html_span_2.setAttribute('id', 'analyzerNext');
	html_div_1.appendChild(html_span_2);
	document.getElementsByTagName('body')[0].appendChild(html_div_1);
}
// This function adds Stylesheet to the Demon Button in the Analyzers
function loadStyle_analyzers() {
	var style = document.createElement('style');
	style.setAttribute('type', 'text/css');
	var style_data = document.createTextNode(
						"#analyzerMenu {position:absolute; top:7px; left:50%; margin-left:235px; width:100px; font-weight: 400; font-size: 16px; z-index: 9999;}" +
						"#analyzerMenu a {display:block;}" +
						"#analyzerPrev {float: left; height: 40px; width: 40px; background: url('https://marketolive.com/m/b2b/wp-content/themes/Nimble-child/images/left_arrow.png') no-repeat scroll 0 0 / 40px auto rgba(0, 0, 0, 0);}" +
						"#analyzerPrev:hover {cursor: pointer; background: url('https://marketolive.com/m/b2b/wp-content/themes/Nimble-child/images/left_arrow_orange.png') no-repeat scroll 0 0 / 40px auto rgba(0, 0, 0, 0);}" + 
						"#analyzerNext {float: right; height: 40px; width: 40px; background: url('https://marketolive.com/m/b2b/wp-content/themes/Nimble-child/images/right_arrow.png') no-repeat scroll 0 0 / 40px auto rgba(0, 0, 0, 0);}" +
						"#analyzerNext:hover {cursor: pointer; background: url('https://marketolive.com/m/b2b/wp-content/themes/Nimble-child/images/right_arrow_orange.png') no-repeat scroll 0 0 / 40px auto rgba(0, 0, 0, 0);}"						
					);
	style.appendChild(style_data);
	document.getElementsByTagName('head')[0].appendChild(style);
}
// This function adds JavaScript to the Demo Button in the Analyzers
function loadScript_analyzers() {
	var script = document.createElement('script');
	script.setAttribute('type', 'text/javascript');
	var script_data = document.createTextNode(						
		"var name = '#analyzerMenu';" +
		"var menuYloc = null;" +
		"$jq = jQuery.noConflict();" +
		"$jq(document).ready(function(){" +
			"var x = parseInt($jq(name).css('top'));" +
			"$jq(window).scroll(function(){" +
				"var offset = x+$jq(document).scrollTop()+'px';" + 
				"$jq(name).animate({top:offset},{duration:500,queue:false});" + 
			"});" +
		"});"
	);
	script.appendChild(script_data);
	document.getElementsByTagName('head')[0].appendChild(script);
} 

if (domain == 'marketolive.com') {
	$ = jQuery.noConflict();
	$(document).ready(function() {
		window.postMessage({
			type : 'ScriptMsg',
			text : 'true'
		}, 'http://marketolive.com/');
		var dm_status = checkCookie('demoStatus');
		var referral_url = document.referrer;
		if (referral_url == '') {
			console.log('Direct access to a this page is prevented. You must enter through Get Started.');
			window.location.replace('http://marketolive.com/m/');
		}
		if (current_url != 'http://marketolive.com/m/' && current_url != 'http://marketolive.com/m/#') {
			var fn_status = checkCookie('firstName');
			var ln_status = checkCookie('lastName');
			var em_status = checkCookie('emailAddress');
			if (fn_status == false || ln_status == false || em_status == false) {
				console.log('User information not found.');
				window.location.replace("http://marketolive.com/m/");
			}
		}
		if (current_url == 'http://marketolive.com/m/b2b/' || current_url == 'http://marketolive.com/m/b2b/#a-taste of marketo') {
			$('#mem-services').hide(500,'swing',function hideNext() {				
				$('div#mem-services > div[class^=service-white]').each(function(index,obj) {
					$(this).hide(250,'swing');
				});
			});	
		}		
		if (current_url == 'http://marketolive.com/m/b2b/rtp/') {
			loadFloater();			
		}		
		var menu = $('#menu-main-menu').length;
		if (menu == 1) {
			var agileURLcontent = "<li class='menu-item menu-item-type-post_type menu-item-object-page menu-item-1376' id='menu-item-1376'>" +
								  "<a href='http://marketolive.com/m/b2b/agile/'>Agile</a></li>";
			$('#menu-item-13').after(agileURLcontent);
			if (current_url == 'http://marketolive.com/m/b2b/agile/') {
				$('#menu-item-1376').addClass('current-menu-item current_page_item menu-item-1376');
			}
		}
		if (current_url == 'http://marketolive.com/m/' || current_url == 'http://marketolive.com/m/#') {
			var actionElement = $('#intro').length;
			if (actionElement == 1) {
				var goAgilebutton = "<p style='float:left; padding-left:60px;' id='action1' class='home-action-button'>" +
									"<a href='http://marketolive.com/m/b2b/agile/' class='link-scroll btn btn-outline-inverse btn-lg' id='go-agile'>go agile</a></p>";
				$('#action0').before(goAgilebutton);			
			}
		}
		if (location.protocol+'//'+location.host+location.pathname == 'http://marketolive.com/m/b2b/') {
			//loadFloater();
			$('#floatMenu').empty();

			var currentDemoType = getCookie('demoType');
			if (currentDemoType == '') {
				$('#floatMenu').append("<span><a id='ActivateDemonstration' onclick='DemonstrateMarketo()' title='Click to enable demo shortcuts'>Demo Shortcut - Disabled</a></span>");
				ExperienceMarketo();
			}
			else if (currentDemoType == 'Experience') {
				$('#floatMenu').append("<span><a id='ActivateDemonstration' onclick='DemonstrateMarketo()' title='Click to enable demo shortcuts'>Demo Shortcut - Disabled</a></span>");
				ExperienceMarketo();	
			}
			else if (currentDemoType == 'Demonstrate') {
				$('#floatMenu').append("<span><a id='ActivateExperience' onclick='ExperienceMarketo()' title='Click to disable demo shortcuts' style='background-color: orange;'>Demo Shortcut - Enabled</a></span>");
				DemonstrateMarketo();
			}else{
				$('#floatMenu').append("<span><a id='ActivateDemonstration' onclick='DemonstrateMarketo()' title='Click to enable demo shortcuts'>Demo Shortcut - Disabled</a></span>");
				ExperienceMarketo();
			}
		}

		if (window.location.href == 'http://marketolive.com/m/b2b/agile/') {
			MarketoAgile();
			$('html, body').animate({scrollTop:141},{easing:'swing',duration:1000});
		}
		var main = $('#page-name').length;
		var pageName = $.trim($('#page-name').text());
		if (main == 1) {
			loadFloater();
			if (pageName == 'About') {
				$('#floatMenu').empty();	
			}
			if (pageName == 'A Taste of Marketo') {
				$('#floatMenu').empty();	
			}
			if (pageName == 'Blog') {
				$('#floatMenu').empty();	
			}
			if (pageName == 'Subscription Center') {
				$('#floatMenu').empty();	
			}
		}		
		if (pageName == 'Lead Scoring') {
			$('#floatMenu').empty();
			$('#floatMenu').append(
				"<span><a id='demoButton1' onclick='marketoDemo()' title='Show this use case in Marketo'>Demo in Marketo</a></span>" +
				"<span><a id='demoButton2' onclick='marketoDemo()' title='Show this use case in Salesforce'>Demo Sales Insight</a></span>"
				);
		}
		if (current_url == 'http://marketolive.com/m/' || current_url == 'http://marketolive.com/m/#') {
			loadDialog();	
		}
		if (current_url != 'http://marketolive.com/m/' && current_url != 'http://marketolive.com/m/#' && dm_status == false) {
			loadDemoCheck();		
		}
		$('#get-started').click(function(e) {
			var fn_status = checkCookie('firstName');
			var ln_status = checkCookie('lastName');
			var em_status = checkCookie('emailAddress');
			var dm_status = checkCookie('demoStatus');
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
					setCookie("demoStatus","active",0.04);
					e.preventDefault();
					var form_el = document.createElement('form');
					form_el.setAttribute('id', 'mktoFrom_1255');
					document.getElementsByTagName('body')[0].appendChild(form_el);				
					MktoForms2.loadForm("//app-sj08.marketo.com", "226-FBL-320", 1255, function(form) {
						MktoForms2.lightbox(form).show();
						var leadInfo = '<div id="form_content" style="color:#000; margin-bottom: 15px; font-weight:800;">Register Your Prospect:</div>';
						var target_div = $('.mktoModalContent').children('div');
						$(target_div).eq(0).after(leadInfo);
					});					

					//window.location.replace("http://marketolive.com/m/b2b/");
				}
			}else{
				//window.location.replace("http://marketolive.com/m/b2b/");
			}
		});
		$('#go-agile').click(function(e) {
			var fn_status = checkCookie('firstName');
			var ln_status = checkCookie('lastName');
			var em_status = checkCookie('emailAddress');
			var dm_status = checkCookie('demoStatus');
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
					setCookie("demoStatus","active",0.04);
					window.location.replace("http://marketolive.com/m/b2b/agile/");
				}
			}else{
				window.location.replace("http://marketolive.com/m/b2b/agile/");
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
				setCookie("demoStatus","active",0.04);
				setCookie("firstName",firstName,365);
				setCookie("lastName",lastName,365);
				setCookie("emailAddress",emailAddress,365);
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
					//window.location.replace("http://marketolive.com/m/b2b/");
				}
				else if (id == 'action1') {
					window.location.replace("http://marketolive.com/m/b2b/agile/");
				}
			}        				
		});
	});
}

function prevent_autosave_smartcampaigns(scArray) {
	//Prevent Auto Save for Smart Campaigns - Smart Lists and Flows
	if (MktPage) {
		if (Mkt.widgets.DataPanelLayout) {
			Mkt.widgets.DataPanelLayout.prototype.createManager = function() {
				var props = {
					layout : 'fit',
					canvas : this.canvas,
					dpType : this.dpType,
					dpSubtype : this.dpSubtype,
					appVarsBase : this.appVarsBase,
					phpModule : this.phpModule,
					dpEditable : this.dpEditable,
					isFlow : this.isFlow,
					isSmartlist : this.isSmartlist,
					SETTINGS : this.SETTINGS,
					ddGroupName : 'default',
					dataPanelLayout : this,
					saveAction : '/' + this.phpModule + '/edit' + this.dpType + 'Submit',
					baseSaveParams : this.baseSaveParams,
					autosuggestAction : '/' + this.phpModule + '/autosuggest',
					dataPanelMetas : MktPage.appVars[this.appVarsBase + this.dpType + 'Metas'],
					getDataPanelMetas : function() {
						return MktPage.appVars[this.appVarsBase + this.dpType + 'Metas'];
					},
					welcomeTargetMessage : this.welcomeTargetMessage,
					welcomeReadOnlyMessage : this.welcomeReadOnlyMessage,
					hasPalette : this.paletteWidth > 0,
					paletteWatermarkCls : this.paletteWatermarkCls,
					afterWipe : function() {
						if (this.canvas) {
							MktPage.clearPanelContentValid(this.canvas);
							MktPage.activatePanel(this.canvas);
						}
					}
				};
				if (this.afterSaveHook) {
					props.afterSaveHook = this.afterSaveHook;
				}
				if (this.beforeSaveHook) {
					props.beforeSaveHook = this.beforeSaveHook;
				}
				var currentSC, scRegExp;
				for (var i = 0, tot = scArray.length; i < tot; i++) {					
					currentSC = window.location.hash.slice(0, ((window.location.hash.length)-2));
					//console.log('Current Smart Campaign = '+currentSC);
					//console.log('Array Smart Campaign = '+scArray[i]);
					scRegExp = new RegExp(currentSC);
					//console.log(scRegExp.test(scArray[i]));
					if (scRegExp.test(scArray[i]) == true) {
						//console.log('Current Smart Campaign = '+currentSC);
						//console.log('Array Smart Campaign = '+scArray[i]);
						props.enableAutosave = false;
					}
				}
				this.manager = new Mkt.widgets.DataPanelManager(props);
				return this.manager;
			}
		}		
	}
}

function discard_em_drafts(emArray) {
	var myMsg = 'Discarding Email Drafts';
	//console.log(myMsg);
	if (typeof(mktEmManager) !== 'undefined') {
		var message = myMsg;
		var d_em_messageBox = Ext.MessageBox.show({
			title : 'Demo Only',
			msg : message,
			progress : false,
			wait : false,
			width : 270,
			closable : false
		});		
		mktEmManager.discardDraft(emArray);
		d_em_messageBox.hide();	
	}
}

function discard_lp_drafts(lpArray) {
	var myMsg = 'Discarding Landing Page Drafts';
	//console.log(myMsg);
	var parms = {};	
	for (var i = 0; i < lpArray.length; i++) {
		var dItem = 'dpageid_' + lpArray[i];
		parms[dItem] = dItem;			
	}
	if (typeof(mktLPLManager) !== 'undefined') {
		var message = myMsg;
		var d_lp_messageBox = Ext.MessageBox.show({
			title : 'Demo Only',
			msg : message,
			progress : false,
			wait : false,
			width : 270,
			closable : false
		});						
		mktLPLManager.doModifyPages('revert', parms);
		d_lp_messageBox.hide();			
	}
}

function discard_fm_drafts(fmArray) {
	var myMsg = 'Discarding Form Drafts';
	//console.log(myMsg);
	var formStore = Ext4.getStore('Form'), originalExceptionFn = MktMessage.showSystemError;
	MktMessage.showSystemError = Ext4.emptyFn;
	if (typeof(Mkt3) !== 'undefined') {
		if (!formStore) {
				formStore = Ext4.create('Mkt3.store.Form', {
					storeId : 'Form'
				});
		}
		formStore.load({
			filters : [{
				property : 'id',
				value : fmArray
			}],
			callback : function(forms) {
				for (var i = 0; i < forms.length; i++) {
					var form = forms[i];
					form.discard(function(success) {
						if (success) {
							form.updateNode();
						}
					}, this);
				}
			}
		});		
	} 
}

function discard_so_drafts(soArray) {
	var socialAppStore = Ext4.getStore('SocialApp'), originalExceptionFn = MktMessage.showSystemError;

	MktMessage.showSystemError = Ext4.emptyFn;

	if (!socialAppStore) {
		socialAppStore = Ext4.create('Mkt3.store.SocialApp', {
			storeId : 'SocialApp'
		});
	}
	socialAppStore.load({
		filters : [{
			property : 'id',
			value : soArray
		}],
		callback : function(socialApps) {
			for (var i = 0; i < socialApps.length; i++) {
				var socialApp = socialApps[i];
				socialApp.discard(function(success) {
					if (success) {
						socialApp.updateNode();
					}
				}, this);
			}
		}
	});	
}

function prevent_em_approval(emArray) {
	var myMsg = 'Demo Only';
	if (typeof(mktEmManager) !== 'undefined') {
		mktEmManager.approveDraft = function(emailIds) {
			mktEmManager.toApproveEmailIds = emailIds;
			for (var i = 0; i < emArray.length; i++) {
				if (emailIds == emArray[i]) {
					var message = 'You do not have permissions to approve this asset.';
					var a_em_messageBox = Ext.MessageBox.show({
						title : myMsg,
						msg : message,
						width : 400,
						closable : true
					});
					setTimeout(a_em_messageBox.show, 1000);
					return;
				}			
			}
			if (emailIds.length > 1) {
				Ext.MessageBox.confirm(MktLang.getStr('mktEmail.Approve_Emails'), 
				MktLang.getStr('mktEmail.Are_you_sure_wantto_approve_multiple_emails'), 
				mktEmManager.doRealApproveEmails
				);
			} 
			else {
				mktEmManager.doRealApproveEmails('yes');
			}
		}
	}
}

function prevent_lp_approval(lpArray) {
	var myMsg = 'Demo Only';
	if (typeof(mktLPLManager) !== 'undefined') {
		mktLPLManager.doModifyPages = function(action, parms, pageName, token) {
			if (!Ext.isEmpty(token)) {
				Ext.apply(parms, {
					'oauthToken' : token
				});
			}
			if (action == 'deploy') {				
				for(key in parms){
					var lp_long_id = parms[key];
				}				
				var lp_id = lp_long_id.split('_')[1];
				for (var i = 0; i < lpArray.length; i++) {
					if (lp_id == lpArray[i]) {
						var message = 'You do not have permissions to approve this asset.';
						var action = "deploy"; 
						var a_lp_messageBox = Ext.MessageBox.show({
							title : myMsg,
							msg : message,
							width : 400,
							closable : true
						});
						setTimeout(a_lp_messageBox.show, 1000);
						return;
					}
				}
			}
			MktSession.ajaxRequest('landingPage/' + action + 'PageRequest', {
				serializeParms : parms,
				onMySuccess : mktLPLManager.modifyPagesDone.createCallback(action, parms, pageName)
			});
		};
	}
}

function prevent_fm_approval(fmArray) {
	var myMsg = 'Demo Only';	
	if (typeof(Mkt.form) !== 'undefined') {
		Mkt.form.Actions.approveDraft = function(compIds, animEl) {
			for (var i = 0; i < fmArray.length; i++) {
				if (compIds == fmArray[i]) {
					var message = 'You do not have permissions to approve this asset.';
					var a_fm_messageBox = Ext.MessageBox.show({
						title : myMsg,
						msg : message,
						width : 400,
						closable : true
					});
					setTimeout(a_fm_messageBox.show, 1000);
					return;
				}
			}
			Mkt.form.Actions.approve(compIds);
		};
	}
}

function prevent_so_approval(soArray) {
	var myMsg = 'Demo Only';	
	if (typeof(Mkt.socialApp) !== 'undefined') {
		Mkt.socialApp.Actions.approveDraft = function(compIds, animEl) {
			for (var i = 0; i < soArray.length; i++) {
				if (compIds == soArray[i]) {
					var message = 'You do not have permissions to approve this asset.';
					var a_so_messageBox = Ext.MessageBox.show({
						title : myMsg,
						msg : message,
						width : 400,
						closable : true
					});
					setTimeout(a_so_messageBox.show, 1000);
					return;
				}
			}
			Mkt.socialApp.Actions.approve(compIds);
		};
	}
}

function update_n_menus() {
	if (typeof(Mkt.apps.MarketingActivities) !== 'undefined') {
		Mkt.app.MarketingActivities.Toolbar.getNewMenuButton = function() {
			return {
				text : MktLang.getStr('mktMaMenu.New'),
				iconCls : 'mkiBooksBlue',
				xtype : 'mkttbbutton',
				menu : MktMaMenu.maMenu(),
				handler : function(button) {
					var canvas = MktCanvas.getActiveTab(), disableMenu = canvas && canvas.config && canvas.config.accessZoneId && canvas.config.accessZoneId == 1;
					button.menu.items.each(function(item) {
						item.setDisabled(disableMenu);
					});
				}
			};
		};		
	} 
}

function update_ne_menus() {
	if (typeof(Mkt.apps.MarketingActivities) !== 'undefined') { 
		Mkt.app.MarketingActivities.Toolbar.getNewEventMenuButton = function() {
			return {
				text : MktLang.getStr('mktMaMenu.New'),
				iconCls : 'mkiBooksBlue',
				xtype : 'mkttbbutton',
				menu : MktMaMenu.maMenu(),
				handler : function(button) {
					var canvas = MktCanvas.getActiveTab(), disableMenu = canvas && canvas.config && canvas.config.accessZoneId && canvas.config.accessZoneId == 1;
					button.menu.items.each(function(item) {
						item.setDisabled(disableMenu);
					});
				}
			};
		};
	} 
}

function update_pm_menus() {
	if (typeof(Mkt.menus.marketingEvent) !== 'undefined') {
		Mkt.menus.marketingEvent.Toolbar.preShowMarketingProgramActions = Mkt.menus.marketingEvent.Toolbar.preShowMarketingEventActions = function(menu) {
			var mItems = menu.items, canvas = MktCanvas.getActiveTab(), disable = canvas && canvas.config && canvas.config.accessZoneId && canvas.config.accessZoneId == 1, itemsToDisable = ['createNewMarketingEvent', 'deleteMarketingEvent', 'createNewMarketingProgram', 'showImportMemberStatus', 'showExportMemberStatus', 'deleteMarketingProgram', 'deleteNurtureProgram', 'testNurtureProgram', 'deleteEmailBatchProgram'];
	
			itemsToDisable.forEach(function(itemToDisable) {
				var item = mItems.get(itemToDisable);
				if (item) {
					item.setDisabled(disable);
				}
			});
		}
	}
}

function update_sc_menus() {
	if (typeof(MktMaMenu) !== 'undefined') {	
		var originalFn = MktMaMenu.preShowProgramActionsMenu;
		MktMaMenu.preShowProgramActionsMenu = function(menu, attr) {
			originalFn.apply(this, arguments);
			var mItems = menu.items, canvas = MktCanvas.getActiveTab(), disable = attr.accessZoneId == 1 || !attr.accessZoneId && canvas && canvas.config && canvas.config.accessZoneId && canvas.config.accessZoneId == 1, itemsToDisable = ['createProgramFolder', 'convertToArchiveFolder', 'convertToCampaignFolder', 'shareProgramFolder', 'renameProgramFolder', 'deleteProgramFolder', 'newSmartCampaign', 'scActivate', 'scArchive', /*'scClone'*/, 'scAbort', 'scAbort', 'scMove', 'deleteMarketingEvent', 'createNewMarketingProgram', 'newLocalAsset', 'deleteMarketingProgram', 'deleteNurtureProgram', 'deleteEmailBatchProgram'];
			itemsToDisable.forEach(function(itemToDisable) {
				var item = mItems.get(itemToDisable);
				if (item) {
					item.setDisabled(disable);
				}
			});
			return menu;
		}
	}
}

function update_em_menus() {
	if (typeof(MktDsMenu) !== 'undefined') {
		var originalFn = MktDsMenu.preShowEmailMenu;
		MktDsMenu.preShowEmailMenu = function(menu, attr) {
			originalFn.apply(this, arguments);
			var mItems = menu.items, canvas = MktCanvas.getActiveTab(), disable = attr.accessZoneId == 1 || !attr.accessZoneId && canvas && canvas.config && canvas.config.accessZoneId && canvas.config.accessZoneId == 1, itemsToDisable = ['emailApprove', 'emailUnapprove', 'emailDownloadHtml', 'emailClone', /*'emailDraftApprove',*/ 'emailDelete', 'emailNewTest', 'emailMove', 'emailEditTest', 'emailApproveTest', 'emailSendSampleTest', 'emailDiscardTest', 'emailTestDeclareChampion', 'emailViewTestSummary']
			itemsToDisable.forEach(function(itemToDisable) {
				var item = mItems.get(itemToDisable);
				if (item) {
					item.setDisabled(disable);
				}
			});
			return menu;
		}
	}
}

function update_lp_menus() {
	if (typeof(MktDsMenu) !== 'undefined') {
		var originalFn = MktDsMenu.preShowPageMenu;
		MktDsMenu.preShowPageMenu = function(menu, attr) {
			var mItems = menu.items, canvas = MktCanvas.getActiveTab(), disable = attr.accessZoneId == 1 || !attr.accessZoneId && canvas && canvas.config && canvas.config.accessZoneId && canvas.config.accessZoneId == 1, itemsToDisable = ['pageUnapprove', 'createProgramFolder', 'publishToFacebook', 'pageConvertToTestGroup', 'pageConvertToTestGroup', 'pageDelete', 'pageMove', 'pageClone'];
	
			itemsToDisable.forEach(function(itemToDisable) {
				var item = mItems.get(itemToDisable);
				if (item) {
					item.setDisabled(disable);
				}
			});
			return menu;
		}
	}
}

function update_fm_menus() {
	if (typeof(MktDsMenu) !== 'undefined') {	
		var originalFn = MktDsMenu.preShowFormMenu;
		MktDsMenu.preShowFormMenu = function(menu, attr) {
			originalFn.apply(this, arguments);
	
			var mItems = menu.items, canvas = MktCanvas.getActiveTab(), disable = attr.accessZoneId == 1 || !attr.accessZoneId && canvas && canvas.config && canvas.config.accessZoneId && canvas.config.accessZoneId == 1, itemsToDisable = ['formClone', 'formDelete', 'formMove']
	
			itemsToDisable.forEach(function(itemToDisable) {
				var item = mItems.get(itemToDisable);
				if (item) {
					item.setDisabled(disable);
				}
			});
			return menu;
		}
	}
}

function update_so_menus() {
	var originalFnA = Mkt3.controller.socialApp.SocialApp.prototype.loadToolbar;
	Mkt3.controller.socialApp.SocialApp.prototype.loadToolbar = function(menu, attr) {
		originalFnA.apply(this, arguments);

		var disable = this.getSocialApp().get('zoneId') == 1, items = Ext4.ComponentQuery.query('socialAppToolbar contextMenu [action=clone],' + 'socialAppToolbar contextMenu [action=delete],');
		items.forEach(function(item) {
			item.setDisabled(disable);
		});
	}
	if (typeof(MktDsMenu) !== 'undefined') {
		var originalFnB = MktDsMenu.preShowSocialAppMenu;
		MktDsMenu.preShowSocialAppMenu = function(menu, attr) {
			originalFnB.apply(this, arguments);
			var mItems = menu.items, isDefaultAccessZone = attr.accessZoneId == 1;
			if (isDefaultAccessZone) {
				mItems.get('socialAppPreview').setVisible(true);
				mItems.get('socialAppEdit').setVisible(true);
				mItems.get('socialAppApprove').setVisible(true);
				mItems.get('socialAppApprove').setDisabled(false);
				mItems.get('socialAppClone').setDisabled(true);
				mItems.get('socialAppDelete').setDisabled(true);
				mItems.get('socialAppDraftActionsText').setVisible(true);
				mItems.get('socialAppDraftPreview').setVisible(true);
				mItems.get('socialAppDraftEdit').setVisible(true);
				mItems.get('socialAppDraftApprove').setVisible(true);
				mItems.get('socialAppDraftDiscard').setVisible(true);
				mItems.get('socialAppDraftDiscard').setDisabled(false);
			}
			return menu;
		}
	}	
}

function update_ls_menus() {
	if (typeof(MktLeadDbMenu) !== 'undefined') {
		var originalFn = MktLeadDbMenu.preShowListListMenu;
		MktLeadDbMenu.preShowListListMenu = function(menu, attr) {
			originalFn.apply(this, arguments);
			var mItems = menu.items, canvas = MktCanvas.getActiveTab(), disable = menu.currNode && menu.currNode.attributes && menu.currNode.attributes.accessZoneId == 1 || !menu.currNode && canvas && canvas.config && canvas.config.accessZoneId && canvas.config.accessZoneId == 1, 
			itemsToDisable = ['deleteList'];
			itemsToRemove = ['cloneSmartlist', 'importList', 'cloneList'];
	
			itemsToDisable.forEach(function(itemToDisable) {
				var item = mItems.get(itemToDisable);
				if (item) {
					item.setDisabled(disable);
				}
			});
	
			itemsToRemove.forEach(function(itemToRemove) {
				var item = mItems.get(itemToRemove);
				if (item) {
					item.setVisible(!disable);
				}
			});
			return menu;
		}
	}
}

function update_sl_menus() {
	if (typeof(MktLeadDbMenu) !== 'undefined') {
		var originalFn = MktLeadDbMenu.preShowUserListMenu;
		MktLeadDbMenu.preShowUserListMenu = function(menu, attr) {
			originalFn.apply(this, arguments);
			var mItems = menu.items, canvas = MktCanvas.getActiveTab(), disable = menu.currNode && menu.currNode.attributes && menu.currNode.attributes.accessZoneId == 1 || !menu.currNode && canvas && canvas.config && canvas.config.accessZoneId && canvas.config.accessZoneId == 1, 
			itemsToDisable = ['deleteList'];
			itemsToRemove = ['cloneSmartlist', 'importList', 'cloneList'];
	
			itemsToDisable.forEach(function(itemToDisable) {
				var item = mItems.get(itemToDisable);
				if (item) {
					item.setDisabled(disable);
				}
			});
	
			itemsToRemove.forEach(function(itemToRemove) {
				var item = mItems.get(itemToRemove);
				if (item) {
					item.setVisible(!disable);
				}
			});
			return menu;
		}
	}
}

function update_calendar(attribute) {
	var cal_view = '#CAL0-eyJlZGl0IjoxLCJkdCI6IjIwMTUwMzA4IiwiY3QiOjAsInRhZ3MiOnsic3lzLkVudHJ5U3VidHlwZSI6WyJlbWFpbCIsIndlYmluYXIiLCJudXJ0dXJlX3J1biIsImVtYWlsX3Rlc3QiLCJjYW1wYWlnbl9ydW4iLCJub25lIiwiYjMxYmE2YTYtMDk5Ni00ODMyLWJhZjQtNzk5ODQ3ZGY4YmM4IiwiZXZlbnQiLCIwNWVlZmQ0Yy05OGZiLTRhYjctOTFjZS1hYTE2NWNhZDI0YjkiLCIyNDQ2ODg5MC0yNjEwLTRkMjctYjZlYy05ODVlYjQxNzViOTUiLCI0MTU0MmJiNy1jMzQ0LTQ3NGItODU4Zi1mNGM5YWM1MzcwZjciLCJkZWVjMDkwZC1iY2U0LTQ1MjYtYjYwMy1iMmRhOTc5MzMwNmIiLCIxMzhlZmM1OS02MjU0LTRkNDYtYjdmYi0zZWVjNzA2YTU3ZTMiLCI3YmZiOThkNS05M2IzLTQxMjUtODE5Yy0xZDlkYjMxMzEwYjAiLCI2NDRjOWNiNS0yMjU2LTRlNmMtYjI1YS04ODEzNTE3NGM2MTIiLCI1ZTU4NGQ1Yi04NGI0LTQ2YTctYWIzNi1mMGJmYTE0ZWQ2YzQiXSwic3lzLldvcmtzcGFjZUlkIjpbIjEiXX19';
	var cal_url = 'https://'+current_pod+'.marketo.com/';
	var matchingElements = [];
	var targetEl; 
	var allElements = document.getElementsByTagName('a');
	for (var i = 0, n = allElements.length; i < n; i++) {
		if (allElements[i].getAttribute(attribute)) {
			// Element exists with attribute. Add to array.
			matchingElements.push(allElements[i]);
		}
	}
	var targetElements = Array.prototype.slice.call(matchingElements);
	var cal_hash = '#CAL';
	for (var j = 0, o = targetElements.length; j < o; j++) {
		if (targetElements[j].hash === cal_hash) {
			targetEl = targetElements[j];
			break;
		}
	}
	if (targetEl == undefined) {
		return;
	}else{
		console.log('Updating Calendar Tile');
		targetEl.setAttribute('href', cal_url+cal_view);	
	}
}

function prevent_renaming_assets() {
	if (typeof(Mkt.widgets) !== 'undefined') {
		var originalFn1 = Mkt.widgets.CanvasHeader.prototype.startEdit;
		Mkt.widgets.CanvasHeader.prototype.startEdit = function(e) {
			originalFn1.apply(this, arguments);
	
			var canvas = MktCanvas.getActiveTab(), disable = canvas && canvas.config && canvas.config.accessZoneId && canvas.config.accessZoneId == 1;
	
			if (!this.formPanel) {
				this._initFormPanel();
			}
			this.formPanel.buttons[1].setDisabled(disable);
		};
		var originalFn2 = Mkt.widgets.CanvasHeader.prototype.saveEdit;
		Mkt.widgets.CanvasHeader.prototype.saveEdit = function(e) {
			var canvas = MktCanvas.getActiveTab(), disable = canvas && canvas.config && canvas.config.accessZoneId && canvas.config.accessZoneId == 1;
			if (!disable) {
				originalFn2.apply(this, arguments);
			}
		};
	}
}

function prevent_cloning() {
	var myMsg = 'Demo Only';
	var originalFn = Mkt.apps.marketingEvent.MarketingEventForm.prototype.beforeSubmitCallback;
	Mkt.apps.marketingEvent.MarketingEventForm.prototype.beforeSubmitCallback = function() {
		if (this.accessZoneId == 1 /*|| limit_exceeded*/) {			
			if (this.isClone) {			
				var message = 'You do not have permissions to clone this program.';
			}else{
				var message = 'You do not have permissions to create a program here.';
			}
			var a_so_messageBox = Ext.MessageBox.show({
				title : myMsg,
				msg : message,
				width : 415,
				closable : true
			});
			setTimeout(a_so_messageBox.show, 1000);
			return false;
		} else {
			return originalFn.apply(this, arguments);
		}
	}
}

function prevent_sc_create() {
	var myMsg = 'Demo Only';
	var originalFn = MktAppJS.chcSubmitCreateSmartCampaignModal;
	MktAppJS.chcSubmitCreateSmartCampaignModal = function(mf) {
		if (mf.ajopts.serializeParms.accessZoneId == 1) {			
			var message = 'You do not have permissions to create a campaign here.';
			var a_so_messageBox = Ext.MessageBox.show({
				title : myMsg,
				msg : message,
				width : 415,
				closable : true
			});
			setTimeout(a_so_messageBox.show, 1000);
			mf.enableButton(0);
			return false;
		} else {
			return originalFn.apply(this, arguments);
		}
	}
}

function prevent_pm_create() {
	var myMsg = 'Demo Only';
	var originalFn = Mkt.apps.marketingEvent.MarketingEventForm.prototype.beforeSubmitCallback;
	Mkt.apps.marketingEvent.MarketingEventForm.prototype.beforeSubmitCallback = function() {
		if (this.folderPicker.store.baseParams.accessZoneId == 1) {
			var message = 'You do not have permissions to create a program here.';
			var a_so_messageBox = Ext.MessageBox.show({
				title : myMsg,
				msg : message,
				width : 415,
				closable : true
			});
			setTimeout(a_so_messageBox.show, 1000);
			this.buttons[1].disable();
			return false;
		}
		var valid = this.programComboBox && (this.programComboBox.hidden || this.programComboBox.validate() );

		if (!this.isClone) {
			for (var i = 0,
			    l = this.descriptorComboBoxes.length; i < l; i++) {
				valid = this.descriptorComboBoxes[i].validate() && valid;
			}
		} else {
			valid = this.cloneToType.validate() && valid;

			if (this.cloneToType.getValue() == 1) {
				if (this.folderPicker) {
					valid = this.folderPicker.validate() && valid;
				}
			} else if (this.programPicker) {
				valid = this.programPicker.validate() && valid;
			}
		}
		valid = this.nameField.validate() && valid;
		return valid;
	}
}

function prevent_move() {
	var originalFn = MktDDTreeDropZone.prototype.getDropPoint;
	MktDDTreeDropZone.prototype.getDropPoint = function(e, n, dd) {
		if (dd.dragData.node) {
			var draggedAttr = dd.dragData.node.attributes;
			if (draggedAttr && draggedAttr.accessZoneId == 1) {
				return;
			}
		}
		return originalFn.apply(this, arguments);
	}
}

function prevent_streams() {
	var myMsg = 'Demo Only';
	var originalFn = Mkt.menus.marketingEvent.Toolbar.getAddNurtureTracks;
	Mkt.menus.marketingEvent.Toolbar.getAddNurtureTracks = function(attr) {
		return {
			text : MktLang.getStr('MarketingEventMenu.Add_Nurture_Tracks'),
			itemId : 'addNurtureTracks',
			iconCls : 'mkiAdd2',
			handler : function(el) {
				if (MktCanvas.getActiveTab().config.accessZoneId == 1) {
					var message = 'You do not have permissions to add a new stream.';
					var a_so_messageBox = Ext.MessageBox.show({
						title : myMsg,
						msg : message,
						width : 390,
						closable : true
					});
				} else {
					var leadNurtureController = Mkt3.app.controllers.get('Mkt3.controller.leadNurture.LeadNurture');
					if (leadNurtureController) {
						leadNurtureController.newNurtureTrack();
					}
				}
			}
		};
	}
}

function prevent_nurture_cadence() {
	var myMsg = 'Demo Only';
	Mkt3.controller.leadNurture.TrackCadenceForm.prototype.submit = function(form) {
		if (MktCanvas.getActiveTab().config.accessZoneId == 1) {
			//debugger;
			/* TODO: here goes code that shows the message */
			var message = 'You do not have permissions to save stream cadence.';
			var a_nc_messageBox = Ext.MessageBox.show({
				title : myMsg,
				msg : message,
				width : 401,
				closable : true
			});
			setTimeout(a_nc_messageBox.show, 1000);
			this.close(form);
			return;
		}
		var record = this.getTrackCadenceForm().record;
		var repeatType = this.getRepeatType().getValue();

		switch (repeatType) {
		case this.self.NONE:
			this.saveNone(record);
			break;

		case this.self.WEEKLY:
			this.saveWeekly(record);
			break;

		case this.self.MONTHLY:
			this.saveMonthly(record);
			break;

		default:
			// do nothing
			break;
		}
	}
}

function prevent_nurture_rename() {
	var myMsg = 'Demo Only';
	Mkt3.controller.leadNurture.TrackForm.prototype.submit = function(form) {
		if (MktCanvas.getActiveTab().config.accessZoneId == 1) {
			//debugger;
			/* TODO: here goes code that shows the message */
			var message = 'You do not have permissions to rename this stream.';
			var a_nr_messageBox = Ext.MessageBox.show({
				title : myMsg,
				msg : message,
				width : 400,
				closable : true
			});
			setTimeout(a_nr_messageBox.show, 1000);
			//a_nr_messageBox.show();
			this.close(form);
			return;
		}	
		form.updateRecord();
	}	
}

function constrain_nurture(program_ids) {
	var ceArray = program_ids;
	Ext4.override(Mkt3.controller.leadNurture.Content, {
		onContentsViewValidateDrop : function(dd) {
			for (var i = 0, n = ceArray.length; i < n; i++) {
				var original = this.callParent(arguments);
				var treeNode = dd.data.node, treeNodeData = treeNode.attributes, allowedParentNode = treeNode.getOwnerTree().getNodeById(ceArray[i]);
				// only allow local asset emails and smart campaigns from other non-nurture programs (in the same access zone)
				if (treeNodeData.accessZoneId === 1 && !allowedParentNode.contains(treeNode)) {
					return false;
				}	
			}
			return original;
		}
	});
}

function limit_nurture_programs() {
	var myMsg = 'Demo Only';
	var originalFn = Mkt.apps.marketingEvent.MarketingEventForm.prototype.beforeSubmitCallback;
	Mkt.apps.marketingEvent.MarketingEventForm.prototype.beforeSubmitCallback = function() {
		var limit_exceeded = false;
		var rootNode = MktExplorer.boundTree.root;
		var compType = "Nurture Program";
		var matches = [];
		var node = rootNode.cascade(function() {
			var attr = this.attributes;
			if (attr && attr.xtra) {
				if (attr.xtra.compType == compType && attr.xtra.accessZoneId == MktCanvas.activeTab.config.accessZoneId) {
					matches.push(this);
				}
			}
		}, undefined, [compType]);
		//console.log(matches.length);
		if (matches.length >= 3) {
			limit_exceeded = true;
		}
		if (limit_exceeded == true) {			
			var message = 'Demo workspaces are limited to 3 nurture programs.';
			var a_nl_messageBox = Ext.MessageBox.show({
				title : myMsg,
				msg : message,
				width : 400,
				closable : true
			});
			setTimeout(a_nl_messageBox.show, 1000);
			return false;
		} else {
			return originalFn.apply(this, arguments);
		}
	}
}

function prevent_asset_cloning() {
	var myMsg = 'Demo Only';
	var submitFn = function(view) {
		if (view.getRecord() && view.getRecord().get('zoneId') == 1 && !!view.cloneFromAsset) {
			var message = 'You do not have permissions to clone this asset.';
			var a_so_messageBox = Ext.MessageBox.show({
				title : myMsg,
				msg : message,
				width : 400,
				closable : true
			});
			view.setSubmitting(false);
			return false;
		} else {
			this.callParent(arguments);
			return false;
		}
	};
	
	var submitSmartlistFn = function(view) {
		if (view.getRecord() && view.getRecord().get('zoneId') == 1 && !!view.cloneFromAsset) {
			var message = 'You do not have permissions to clone this asset.';
			var a_so_messageBox = Ext.MessageBox.show({
				title : myMsg,
				msg : message,
				width : 400,
				closable : true
			});
			view.setSubmitting(false);
			return false;
		} else {
			var smartList = view.getRecord(), isDirectProgramChild, ownerAsset, params;
			this.callParent(arguments);
			return false;
		}
	};
	
	var submitListFn = function(view) {
		if (view.getRecord() && view.getRecord().get('zoneId') == 1 && !!view.cloneFromAsset) {
			var message = 'You do not have permissions to clone this asset.';
			var a_so_messageBox = Ext.MessageBox.show({
				title : myMsg,
				msg : message,
				width : 400,
				closable : true
			});
			view.setSubmitting(false);
			return false;
		} else {
			var list = view.getRecord(), isDirectProgramChild, ownerAsset, params;
			this.callParent(arguments);
			return false;
			
		}
	};
	
	var submitLandingPageFn = function(view) {
		if (view.getRecord() && view.getRecord().get('zoneId') == 1 && !!view.cloneFromAsset) {
			var message = 'You do not have permissions to clone this asset.';
			var a_so_messageBox = Ext.MessageBox.show({
				title : myMsg,
				msg : message,
				width : 400,
				closable : true
			});
			view.setSubmitting(false);
			return false;

		} else {
			var landingPage = view.getRecord(), isDirectProgramChild, ownerAsset, params;
			this.callParent(arguments);
			return false;
		}
	};

	Ext4.override(Mkt3.controller.smartCampaign.AssetForm, {
		submit : submitFn
	});

	Ext4.override(Mkt3.controller.socialApp.AssetForm, {
		submit : submitFn
	});

	Ext4.override(Mkt3.controller.smartList.AssetForm, {
		submit : submitSmartlistFn
	});

	Ext4.override(Mkt3.controller.report.AssetForm, {
		submit : submitFn
	});

	Ext4.override(Mkt3.controller.list.AssetForm, {
		submit : submitListFn
	});

	Ext4.override(Mkt3.controller.landingPage.AssetForm, {
		submit : submitLandingPageFn
	});
/*
	Ext4.override(Mkt3.controller.form2.AssetForm, {
		submit : submitFn
	});
*/
	Ext4.override(Mkt3.controller.form.AssetForm, {
		submit : submitFn
	});
/*
	Ext4.override(Mkt3.controller.email.AssetForm, {
		submit : submitFn
	});
*/
}

function loadScript_login() {
	var script = document.createElement('script');
	script.setAttribute('type', 'text/javascript');
	script.setAttribute('id', 'reade_test');
	var script_data = document.createTextNode(
		'function setSubscription(subName) {' +
			//'console.log("And Returned This: " + subName);' +
			'var subscriptionType = capitaliseFirstLetter(subName);' +
			'document.getElementById("subscription").value = subscriptionType;' +
			'hideSubscriptionList();' +
		'}' +
		'function capitaliseFirstLetter(string) {' +
		    'return string.charAt(0).toUpperCase() + string.slice(1);' +
		'}' +
		'function hideSubscriptionList() {' +
			'document.getElementById("demoSubscriptions").style.display = "none";' +
		'}' +
		'var selectedSubscription;' +
		'(function() {' +
			'document.getElementById("subscription").onfocus = function(e) {' +
				//'console.log(e.target.id);' +
				'document.getElementById("demoSubscriptions").style.position = "relative";' +
				'document.getElementById("demoSubscriptions").style.display = "block";' +
				'document.getElementById("demoSubscriptions").style.border = "1px solid #e77519";' +
				'document.getElementById("demoSubscriptions").style.cursor = "pointer";' +
			'};' +
			'document.getElementById("demoSubscriptions").onclick = function(e) {' +
				//'console.log(e.target.id);' +
				'selectedSubscription = e.target.id;' +
				'setSubscription(selectedSubscription);' +
			'};' +
			'document.getElementById("loginUsername").onfocus = function(e) {' +
				'document.getElementById("demoSubscriptions").style.display = "none";' +
			'};' +
			'document.getElementById("loginPassword").onfocus = function(e) {' +
				'document.getElementById("demoSubscriptions").style.display = "none";' +
			'};' +
			'document.getElementById("loginButton").onfocus = function(e) {' +
				'document.getElementById("demoSubscriptions").style.display = "none";' +
			'};' +
			/*
			'document.getElementById("frame").onclick = function(e) {' +
				'document.getElementById("demoSubscriptions").style.display = "none";' +
			'};' +
			*/			
		'})();' +
		'var $jq = jQuery.noConflict();' +
		'$jq(document).ready(function() {' +
			'$jq("div.demoSubscription").mouseenter(function() {' +
				'$jq(this).css({' +
					'"border" : "1px solid #e77519",' +
					'"background-color" : "#e77519",' +
					'"cursor" : "pointer"' +
				'});' +
			'}).mouseleave(function() {' +
				'$jq(this).css({' +
					'"border" : "1px solid #ffffff",' +
					'"background-color" : "#ffffff"' +
				'});' +
			'});' +
		'});'	
	);
	script.appendChild(script_data);
	document.getElementsByTagName('head')[0].appendChild(script);
}

function loadHtml_login() {
	var html_tr_1 = document.createElement('tr');
	var html_td_1 = document.createElement('td');
	html_tr_1.appendChild(html_td_1);
	html_input_1 = document.createElement('input');
	html_input_1.setAttribute('class', 'login-field');
	html_input_1.setAttribute('placeholder', 'Subscription');
	html_input_1.setAttribute('id', 'subscription');
	html_input_1.setAttribute('maxlength', '40');
	html_input_1.setAttribute('name', 'text');
	html_input_1.setAttribute('size', '25');
	html_input_1.setAttribute('type', 'text');
	html_input_1.setAttribute('tabindex', '3');
	html_input_1.setAttribute('autocomplete', 'off');
	html_input_1.setAttribute('style', 'cursor: pointer;');
	html_td_1.appendChild(html_input_1);
	var html_div_1 = document.createElement('div');
	html_div_1.setAttribute('id', 'demoSubscriptions');
	html_div_1.setAttribute('style', 'display:none; position: relative; background-color: #ffffff; font-size: 16px; bottom: 20px;');
	html_td_1.appendChild(html_div_1);
	var html_div_2 = document.createElement('div');
	html_div_2.setAttribute('id', 'business');
	html_div_2.setAttribute('class', 'demoSubscription');
	html_div_2.setAttribute('style', 'padding: 15px 15px 15px 10px; border: 1px solid #ffffff;');
	var html_div_2_text = document.createTextNode('Business');
	html_div_2.appendChild(html_div_2_text);
	html_div_1.appendChild(html_div_2);
	var html_div_3 = document.createElement('div');
	html_div_3.setAttribute('id', 'ecommerce');
	html_div_3.setAttribute('class', 'demoSubscription');
	html_div_3.setAttribute('style', 'padding: 15px 15px 15px 10px; border: 1px solid #ffffff;');
	var html_div_3_text = document.createTextNode('Ecommerce');
	html_div_3.appendChild(html_div_3_text);
	html_div_1.appendChild(html_div_3);
	var html_div_4 = document.createElement('div');
	html_div_4.setAttribute('id', 'healthcare');
	html_div_4.setAttribute('class', 'demoSubscription');
	html_div_4.setAttribute('style', 'padding: 15px 15px 15px 10px; border: 1px solid #ffffff;');
	var html_div_4_text = document.createTextNode('Healthcare');
	html_div_4.appendChild(html_div_4_text);
	html_div_1.appendChild(html_div_4);
	var children = document.getElementById('mktLogin').children[2].children[0].children[1];
	var login_table = children;
	function insertAfter(referenceNode, newNode) {
    	referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
	}
	insertAfter(login_table, html_tr_1);
}

function loginDetection() {
	var userName = document.getElementById('loginUsername');
	if (userName == '' || userName == undefined || userName == null) {	
		return false;
	}
	if (userName) {
		var userNameValue = document.getElementById('loginUsername').value;
		console.log(userNameValue);
		if (userNameValue == '' || userNameValue == undefined || userNameValue == null) {
			console.log('Username Not Detected');		
		} else if (userNameValue.length > 1) {
			console.log('Username Detected');
			userNameValue = (userNameValue.slice(0, userNameValue.search('@')).search('.demo'));
			var isDemoUser = false;
			if (userNameValue !== -1) {
				isDemoUser = true;
				console.log(isDemoUser);
				return true;
			}
			else {
				return false;
			}
		}
	}
}

function subDetection() {
	var subType = document.getElementById('subscription');
	if (subType == '' || subType == undefined || subType == null) {
		console.log('Subscription Type Not Detected');
		return false;
	} else if (subType !== '') {
		console.log('Subscription Type Detected');
		return true;
	}
}

function emailDeliverability(field1, field2) {
	var username = document.getElementById(field1);
	var password = document.getElementById(field2);

	//Remove LastPass Functionality
	username.style.backgroundImage = null;
	username.style.backgroundPosition = null;
	username.style.backgroundRepeat = null;
	
	password.style.backgroundImage = null;
	password.style.backgroundPosition = null;
	password.style.backgroundRepeat = null;
	
	username.addEventListener('mouseover', disableUsernameHover, false);
	username.addEventListener('mouseout', disableUsernameHover, false);
	function disableUsernameHover() {
		username.style.backgroundImage = null;
		username.style.backgroundPosition = null;
		username.style.backgroundRepeat = null;
	}
	password.addEventListener('mouseover', disablePasswordHover, false);
	password.addEventListener('mouseout', disablePasswordHover, false);
	function disablePasswordHover() {
		password.style.backgroundImage = null;
		password.style.backgroundPosition = null;
		password.style.backgroundRepeat = null;
	}
	username.addEventListener('click', disableUsernameClick, false);
	password.addEventListener('click', disableUsernameClick, false);
	function disableUsernameClick() {
		username.style.backgroundImage = null;
		username.style.backgroundPosition = null;
		username.style.backgroundRepeat = null;
		password.style.backgroundImage = null;
		password.style.backgroundPosition = null;
		password.style.backgroundRepeat = null;
	}
	username.value = 'reade.demo@marketo.com';
	password.value = 'marketo17';
	document.getElementsByTagName('button')[0].click();
}
function removeSettings() {
	document.getElementById('tour-account-anchor').style.display = 'none';
	var el = document.getElementsByClassName('box');
	console.log(el);
	el[1].style.display = 'none';
}
if (domain == '250ok.com') {
	emailDeliverability('email', 'password');
	if (current_url == 'https://250ok.com/app/account') {
		removeSettings();
	}
}

var loginScreen = document.getElementById("login-container");
/*
if (loginScreen !== null) {
	(function() {
		console.log('Marketo Login Screen Detected');
		document.getElementById('loginButton').onclick = function(e) {
			console.log('Login Button Clicked');
			var demoUser = loginDetection();
			var demoType = subDetection();
			if (demoUser == true && demoType == true) {
				e.preventDefault();
				//TODO: Execute One Login API
				console.log('Execute One Login API');	
			}else if (demoUser == true && demoType == false) {
				e.preventDefault();
				loadHtml_login();
				loadScript_login();
			}
		};   
	})();
}
*/
var mkto_live_admin_user = ['admin@mktodemoaccount106.com', 'admin@mktodemoaccount106a.com', 'admin@mktodemoaccount106a.com'];
var isAdminUser	= mkto_live_admin_user.indexOf(current_user) > -1; 
console.log(isAdminUser);
if (cust_prefix == 'mktodemoaccount106' && isAdminUser == false) {
	var mkto_live_plugin_state = true;

	var ceArray106 = [11046, 11414, 11422, 13564];
	var scArray106 = ['#SC18518', '#SC18519', '#SC18520', '#SC18521', '#SC18522', '#SC18394', '#SC18393', '#SC14945', '#SC14602', '#SC14603', '#SC15639', '#SC14604', '#SC14605', '#SC5373', '#SC5372', '#SC5370', '#SC5371', '#SC5374', '#SC13488', '#SC13496', '#SC14055', '#SC14053', '#SC14056', '#SC14054', '#SC14057', '#SC14058', '#SC13659', '#SC13657', '#SC13660', '#SC13658', '#SC13661', '#SC13662', '#SC13255', '#SC13253', '#SC13257', '#SC13254', '#SC13256', '#SC13258', '#SC13261', '#SC13260', '#SC13259', '#SC16408', '#SC2836', '#SC1426', '#SC139', '#SC843', '#SC690', '#SC17168', '#SC17167', '#SC16890', '#SC16889', '#SC17420', '#SC17419', '#SC116', '#SC3420', '#SC115', '#SC39', '#SC15', '#SC17', '#SC2006', '#SC2005', '#SC62', '#SC3500', '#SC193', '#SC814', '#SC194', '#SC815', '#SC660', '#SC29', '#SC27', '#SC28', '#SC999', '#SC188', '#SC3498', '#SC16', '#SC252', '#SC251', '#SC772', '#SC3499', '#SC2728', '#SC2729', '#SC2756', '#SC2733', '#SC2760', '#SC3003', '#SC2972', '#SC2765', '#SC2790', '#SC2791', '#SC2792', '#SC2795', '#SC2794', '#SC2845', '#SC2735', '#SC2770', '#SC2747', '#SC2706', '#SC3124', '#SC2470', '#SC137', '#SC187', '#SC1099', '#SC1643', '#SC190', '#SC191', '#SC189', '#SC17370', '#SC17369', '#SC17368', '#SC17367', '#SC17366', '#SC17365', '#SC17364', '#SC17363', '#SC17376', '#SC17375', '#SC17372', '#SC17373', '#SC17374', '#SC17371', '#SC17356', '#SC17353', '#SC17354', '#SC17355', '#SC17357', '#SC17358', '#SC17359', '#SC17360', '#SC17361', '#SC17362', '#SC18198', '#SC18197', '#SC18196', '#SC18195', '#SC18194', '#SC18193', '#SC18192', '#SC18191', '#SC18204', '#SC18203', '#SC18200', '#SC18201', '#SC18202', '#SC18199', '#SC18181', '#SC18182', '#SC18183', '#SC18184', '#SC18185', '#SC18186', '#SC18187', '#SC18188', '#SC18189', '#SC18190', '#SC16079', '#SC16078', '#SC16077', '#SC16185', '#SC16184', '#SC16273', '#SC16274', '#SC16288', '#SC16094', '#SC16087', '#SC16092', '#SC16093', '#SC16144', '#SC16091', '#SC16272', '#SC16271', '#SC16270', '#SC16238', '#SC16239', '#SC16240', '#SC16241', '#SC16242', '#SC16243', '#SC16229', '#SC16230', '#SC16231', '#SC16232', '#SC16233', '#SC16269', '#SC16268', '#SC16267', '#SC16222', '#SC16223', '#SC16224', '#SC16225', '#SC16226', '#SC16227', '#SC17680', '#SC17622'];
	var lpArray106 = [8703, 8819, 8941, 4876, 4872, 4874, 8212, 8214, 8216, 8435, 8434, 8436, 8263, 8264, 8265, 10579, 10576, 10578, 10586, 10582, 10586, 10604, 10600, 10602, 10592, 10588, 10590, 10598, 10594, 10596];
	var emArray106 = [12898, 12899, 12900, 12901, 12902, 12903, 12904, 9819, 12818, 12820, 12819, 12816, 12811, 12815, 12812, 12821, 12813, 12814, 12817, 12823, 10010, 10179, 10180, 12845, 10181, 10182, 10183, 10184, 4894, 3764, 3765, 3767, 3766, 3762, 9173, 9174, 9175, 9176, 9177, 9179, 9180, 9182, 9181, 9184, 9183, 9186, 9185, 9187, 9190, 9189, 9188, 9452, 9453, 9454, 9455, 9460, 9461, 9462, 9463, 9456, 9457, 9458, 9459, 9464, 9467, 9466, 9465, 9468, 9470, 9469, 9471, 9475, 9473, 9474, 9472, 9446, 9447, 9448, 9449, 9450, 9451, 9234, 9235, 9236, 9237, 9238, 9239, 11160, 10861, 10863, 10862, 10860, 10859, 10858, 10936, 10937, 10878, 10879, 10880, 10864, 10865, 10866, 10867, 10876, 10868, 10869, 10870, 10871, 10872, 10873, 10874, 10875, 10950, 10949, 12273];
	var fmArray106 = [1758, 1749, 1900, 1668, 1669, 1670, 1712, 1679, 1957, 1907, 1926, 1922, 1922, 1925, 1920];
	var soArray106 = [586, 587, 483, 485, 491, 484, 448, 378, 324, 325, 439, 438, 437];
	var get_url = location.href;
	var mkto_app_url = get_url.slice(0, get_url.indexOf('/', 9));
	window.postMessage({
		type : 'ScriptMsg',
		text : 'true'
	}, mkto_app_url);
	console.log(domain_s_1);

	var superBall = document.getElementsByClassName('mkt-app-logo mkt-app-logo-menu');
	if (superBall.length > 0) {
		var superBallMenu = document.getElementsByClassName('x4-component x4-box-item x4-component-default x4-menu-item');
		var cal_view = '#CAL0-eyJlZGl0IjoxLCJkdCI6IjIwMTUwMzA4IiwiY3QiOjAsInRhZ3MiOnsic3lzLkVudHJ5U3VidHlwZSI6WyJlbWFpbCIsIndlYmluYXIiLCJudXJ0dXJlX3J1biIsImVtYWlsX3Rlc3QiLCJjYW1wYWlnbl9ydW4iLCJub25lIiwiYjMxYmE2YTYtMDk5Ni00ODMyLWJhZjQtNzk5ODQ3ZGY4YmM4IiwiZXZlbnQiLCIwNWVlZmQ0Yy05OGZiLTRhYjctOTFjZS1hYTE2NWNhZDI0YjkiLCIyNDQ2ODg5MC0yNjEwLTRkMjctYjZlYy05ODVlYjQxNzViOTUiLCI0MTU0MmJiNy1jMzQ0LTQ3NGItODU4Zi1mNGM5YWM1MzcwZjciLCJkZWVjMDkwZC1iY2U0LTQ1MjYtYjYwMy1iMmRhOTc5MzMwNmIiLCIxMzhlZmM1OS02MjU0LTRkNDYtYjdmYi0zZWVjNzA2YTU3ZTMiLCI3YmZiOThkNS05M2IzLTQxMjUtODE5Yy0xZDlkYjMxMzEwYjAiLCI2NDRjOWNiNS0yMjU2LTRlNmMtYjI1YS04ODEzNTE3NGM2MTIiLCI1ZTU4NGQ1Yi04NGI0LTQ2YTctYWIzNi1mMGJmYTE0ZWQ2YzQiXSwic3lzLldvcmtzcGFjZUlkIjpbIjEiXX19';
		superBall[0].addEventListener('click', function() {
			for (var i = 0; i < superBallMenu.length; i++) {
				if (superBallMenu[i].textContent == 'Calendar') {
					superBallMenu[i].childNodes[0].href = 'https://' + current_pod + '.marketo.com/' + cal_view;
				}
			}
		}, false);
	}

	if (domain_s_1 !== 'https://app-sjp.marketo.com/m' || location.hash !== '#CAL' || location.hash !== '#CALPR') {
		window.Mkt3 && Mkt3.onLaunch(function() {
			setTimeout(update_calendar('href'), 5000);
			prevent_autosave_smartcampaigns(scArray106);
			discard_em_drafts(emArray106);
			discard_lp_drafts(lpArray106);
			discard_fm_drafts(fmArray106);
			discard_so_drafts(soArray106);
			prevent_em_approval(emArray106);
			prevent_lp_approval(lpArray106);
			prevent_fm_approval(fmArray106);
			prevent_so_approval(soArray106);
			update_n_menus();
			update_ne_menus();
			update_pm_menus();
			update_sc_menus();
			update_em_menus();
			update_lp_menus();
			update_fm_menus();
			update_so_menus();
			update_ls_menus();
			update_sl_menus();
			prevent_renaming_assets();
			prevent_asset_cloning();
			prevent_cloning();
			prevent_streams();
			prevent_move();
			prevent_sc_create();
			prevent_pm_create()
			//constrain_nurture(ceArray106);
			prevent_nurture_cadence();
			prevent_nurture_rename();
			limit_nurture_programs();
		});
	}
	if (domain_s_1 == 'https://app-sjp.marketo.com/m') {
		var buttons = Ext4.ComponentQuery.query('button[action=approveAndClose]');
		buttons.forEach(function(button) {
			button.disable();
		});
	}
	if (domain_s_1 == 'https://app-sjp.marketo.com/') {
		if (domain_s_2 == 'AR1559A1!' || domain_s_2 == 'AR1544A1!' || domain_s_2 == 'AR1682A1!') {
			setTimeout(update_calendar('href'), 5000);
			loadScript_analyzers();
			loadHtml_analyzers();
			loadStyle_analyzers();
		}
		if (domain_s_2 == 'AR1559A1!') {
			document.getElementById('analyzerPrev').setAttribute('style', 'display: none;');
			document.getElementById('analyzerNext').setAttribute('title', 'Go to the Program Analyzer');
			document.getElementById('analyzerNext').setAttribute('onclick', 'showAnalyzer(1)');
		}
		if (domain_s_2 == 'AR1544A1!') {
			document.getElementById('analyzerPrev').setAttribute('style', 'display: block;');
			document.getElementById('analyzerPrev').setAttribute('title', 'Go to the Opportunity Analyzer');
			document.getElementById('analyzerPrev').setAttribute('onclick', 'showAnalyzer(0)');
			document.getElementById('analyzerNext').setAttribute('style', 'display: block;');
			document.getElementById('analyzerNext').setAttribute('title', 'Go to the Success Path Analyzer');
			document.getElementById('analyzerNext').setAttribute('onclick', 'showAnalyzer(2)');
		}
		if (domain_s_2 == 'AR1682A1!') {
			document.getElementById('analyzerPrev').setAttribute('title', 'Go to the Program Analyzer');
			document.getElementById('analyzerPrev').setAttribute('onclick', 'showAnalyzer(1)');
			document.getElementById('analyzerNext').setAttribute('style', 'display: none;');
		}
	}
	if (get_url == 'https://app-sjp.marketo.com/#MM0A1') {
		window.Mkt3 && Mkt3.onLaunch(function() {
			setTimeout(update_calendar('href'), 5000);
		});
	}
}
else if (cust_prefix == 'mktodemoaccount106' && isAdminUser == true) {
	window.Mkt3 && Mkt3.onLaunch(function() {
		var myMsg = 'Warning!';
		var message = 'You are logged in as Demonstration Administrator. Any changes you make will have a downstream effect on all other users of this subscription. Please exercise discipline and be responsible with any changes you make. If you have any doubt or concern about the impact of your changes, send an email to Reade Triolo.';
		var admin_messageBox = Ext.MessageBox.show({
			title : myMsg,
			msg : message,
			width : 400,
			closable : true
		});
		admin_messageBox.show;
	});
}

if (cust_prefix == 'mktodemoaccount106a' && isAdminUser == false) {
	var mkto_live_plugin_state = true;

	var ceArray106a = [11046, 11414, 11422, 13564];
	var scArray106a = ['#SC16962', '#SC16963', '#SC16964', '#SC16965', '#SC16966', '#SC14963', '#SC14949', '#SC14945', '#SC14602', '#SC14603', '#SC15639', '#SC14604', '#SC14605', '#SC5373', '#SC5372', '#SC5370', '#SC5371', '#SC13488', '#SC13496', '#SC14055', '#SC14053', '#SC14056', '#SC14054', '#SC14057', '#SC14058', '#SC13659', '#SC13657', '#SC13660', '#SC13658', '#SC13661', '#SC13662', '#SC13255', '#SC13253', '#SC13257', '#SC13254', '#SC13256', '#SC13258', '#SC13261', '#SC13260', '#SC13259', '#SC16408', '#SC2836', '#SC139', '#SC843', '#SC690', '#SC16890', '#SC16889', '#SC116', '#SC3420', '#SC115', '#SC39', '#SC15', '#SC17', '#SC2006', '#SC2005', '#SC62', '#SC3500', '#SC193', '#SC814', '#SC194', '#SC815', '#SC660', '#SC29', '#SC27', '#SC28', '#SC999', '#SC188', '#SC662', '#SC3498', '#SC16', '#SC252', '#SC251', '#SC772', '#SC3499', '#SC2728', '#SC2729', '#SC2756', '#SC2733', '#SC2760', '#SC3003', '#SC2972', '#SC2765', '#SC2790', '#SC2791', '#SC2792', '#SC2795', '#SC2794', '#SC2845', '#SC2735', '#SC2770', '#SC2747', '#SC2706', '#SC3124', '#SC2470', '#SC137', '#SC187', '#SC1099', '#SC1643', '#SC190', '#SC191', '#SC189', '#SC16079', '#SC16078', '#SC16077', '#SC16185', '#SC16184', '#SC16273', '#SC16274', '#SC16288', '#SC16088', '#SC16094', '#SC16087', '#SC16092', '#SC16093', '#SC16144', '#SC16091', '#SC16272', '#SC16271', '#SC16270', '#SC16238', '#SC16239', '#SC16240', '#SC16241', '#SC16242', '#SC16243', '#SC16228', '#SC16229', '#SC16230', '#SC16231', '#SC16232', '#SC16233', '#SC16269', '#SC16268', '#SC16267', '#SC16222', '#SC16223', '#SC16224', '#SC16225', '#SC16226', '#SC16227'];
	var lpArray106a = [8703, 8819, 8941, 4876, 4872, 4874, 8212, 8214, 8216, 8435, 8434, 8436, 8263, 8264, 8265, 10579, 10576, 10578, 10586, 10582, 10584, 10604, 10600, 10602, 10592, 10588, 10590, 10598, 10594, 10596];
	var emArray106a = [11706, 11705, 11707, 11708, 11709, 11710, 11711, 9819, 10171, 10173, 10172, 10169, 9957, 9974, 9968, 10174, 9972, 9973, 10170, 9962, 10010, 10179, 10180, 10181, 10182, 10183, 10184, 4894, 3764, 3765, 3767, 3766, 3762, 9173, 9174, 9175, 9176, 9177, 9179, 9180, 9182, 9181, 9184, 9183, 9186, 9185, 9187, 9190, 9189, 9188, 9452, 9453, 9454, 9455, 9460, 9461, 9462, 9463, 9456, 9457, 9458, 9459, 9464, 9467, 9466, 9465, 9468, 9470, 9469, 9471, 9475, 9473, 9474, 9472, 9446, 9447, 9448, 9449, 9450, 9451, 9234, 9235, 9236, 9237, 9238, 9239, 11160, 10861, 10863, 10862, 10860, 10859, 10858, 10936, 10937, 10878, 10879, 10880, 10864, 10865, 10866, 10867, 10876, 10868, 10869, 10870, 10871, 10872, 10873, 10874, 10875, 10952, 10954, 10953, 10951, 10950, 10949, 10946, 10948, 10947, 10945, 10944, 10943];
	var fmArray106a = [1758, 1749, 1900, 1668, 1669, 1670, 1712, 1679, 1957, 1907, 1926, 1922, 1921, 1925, 1920];
	var soArray106a = [483, 485, 484, 491, 448];
	var get_url = location.href;
	var mkto_app_url = get_url.slice(0, get_url.indexOf('/', 9));
	window.postMessage({
		type : 'ScriptMsg',
		text : 'true'
	}, mkto_app_url);
	if (domain_s_1 !== 'https://app-ab07.marketo.com/m') {
		window.Mkt3 && Mkt3.onLaunch(function() {
			prevent_autosave_smartcampaigns(scArray106a);
			discard_em_drafts(emArray106a);
			setTimeout(discard_lp_drafts(lpArray106a), 3000);
			discard_fm_drafts(fmArray106a);
			discard_so_drafts(soArray106a);
			prevent_em_approval(emArray106a);
			prevent_lp_approval(lpArray106a);
			prevent_fm_approval(fmArray106a);
			prevent_so_approval(soArray106a);
			update_n_menus();
			update_ne_menus();
			update_pm_menus();
			update_sc_menus();
			update_em_menus();
			update_lp_menus();
			update_fm_menus();
			update_so_menus();
			update_ls_menus();
			update_sl_menus();
			prevent_renaming_assets();
			prevent_asset_cloning();
			prevent_cloning();
			prevent_streams();
			prevent_move();
			prevent_sc_create();
			prevent_pm_create();
			//constrain_nurture(ceArray106a);
			prevent_nurture_cadence();
			prevent_nurture_rename();
			limit_nurture_programs();
		});
	}
	if (domain_s_1 == 'https://app-ab07.marketo.com/m') {
		var buttons = Ext4.ComponentQuery.query('button[action=approveAndClose]');
		buttons.forEach(function(button) {
			button.disable();
		});
	}
	if (domain_s_1 == 'https://app-ab07.marketo.com/') {
		if (domain_s_2 == 'AR1559A1!' || domain_s_2 == 'AR1544A1!' || domain_s_2 == 'AR1682A1!') {
			setTimeout(update_calendar('href'), 5000);
			loadScript_analyzers();
			loadHtml_analyzers();
			loadStyle_analyzers();
		}
		if (domain_s_2 == 'AR1559A1!') {
			document.getElementById('analyzerPrev').setAttribute('style', 'display: none;');
			document.getElementById('analyzerNext').setAttribute('title', 'Go to the Program Analyzer');
			document.getElementById('analyzerNext').setAttribute('onclick', 'showAnalyzer(1)');
		}
		if (domain_s_2 == 'AR1544A1!') {
			document.getElementById('analyzerPrev').setAttribute('style', 'display: block;');
			document.getElementById('analyzerPrev').setAttribute('title', 'Go to the Opportunity Analyzer');
			document.getElementById('analyzerPrev').setAttribute('onclick', 'showAnalyzer(0)');
			document.getElementById('analyzerNext').setAttribute('style', 'display: block;');
			document.getElementById('analyzerNext').setAttribute('title', 'Go to the Success Path Analyzer');
			document.getElementById('analyzerNext').setAttribute('onclick', 'showAnalyzer(2)');
		}
		if (domain_s_2 == 'AR1682A1!') {
			document.getElementById('analyzerPrev').setAttribute('title', 'Go to the Program Analyzer');
			document.getElementById('analyzerPrev').setAttribute('onclick', 'showAnalyzer(1)');
			document.getElementById('analyzerNext').setAttribute('style', 'display: none;');
		}
	}
	if (get_url == 'https://app-ab07.marketo.com/#MM0A1') {
		window.Mkt3 && Mkt3.onLaunch(function() {
			setTimeout(update_calendar('href'), 5000);
		});
	}
}
else if (cust_prefix == 'mktodemoaccount106a' && isAdminUser == true) {
	window.Mkt3 && Mkt3.onLaunch(function() {
		var myMsg = 'Warning!';
		var message = 'You are logged in as Demonstration Administrator. Any changes you make will have a downstream effect on all other users of this subscription. Please exercise discipline and be responsible with any changes you make. If you have any doubt or concern about the impact of your changes, send an email to Reade Triolo.';
		var admin_messageBox = Ext.MessageBox.show({
			title : myMsg,
			msg : message,
			width : 400,
			closable : true
		});
		admin_messageBox.show;
	});
}

if (cust_prefix == 'mktodemoaccount106b' && isAdminUser == false) {
	var mkto_live_plugin_state = true;

	var ceArray106b = [11046, 11414, 11422, 13564];
	var scArray106b = ['#SC16962', '#SC16963', '#SC16964', '#SC16965', '#SC16966', '#SC14963', '#SC14949', '#SC14945', '#SC14602', '#SC14603', '#SC15639', '#SC14604', '#SC14605', '#SC5373', '#SC5372', '#SC5370', '#SC5371', '#SC13488', '#SC13496', '#SC14055', '#SC14053', '#SC14056', '#SC14054', '#SC14057', '#SC14058', '#SC13659', '#SC13657', '#SC13660', '#SC13658', '#SC13661', '#SC13662', '#SC13255', '#SC13253', '#SC13257', '#SC13254', '#SC13256', '#SC13258', '#SC13261', '#SC13260', '#SC13259', '#SC16408', '#SC2836', '#SC139', '#SC843', '#SC690', '#SC16890', '#SC16889', '#SC116', '#SC3420', '#SC115', '#SC39', '#SC15', '#SC17', '#SC2006', '#SC2005', '#SC62', '#SC3500', '#SC193', '#SC814', '#SC194', '#SC815', '#SC660', '#SC29', '#SC27', '#SC28', '#SC999', '#SC188', '#SC662', '#SC3498', '#SC16', '#SC252', '#SC251', '#SC772', '#SC3499', '#SC2728', '#SC2729', '#SC2756', '#SC2733', '#SC2760', '#SC3003', '#SC2972', '#SC2765', '#SC2790', '#SC2791', '#SC2792', '#SC2795', '#SC2794', '#SC2845', '#SC2735', '#SC2770', '#SC2747', '#SC2706', '#SC3124', '#SC2470', '#SC137', '#SC187', '#SC1099', '#SC1643', '#SC190', '#SC191', '#SC189', '#SC16079', '#SC16078', '#SC16077', '#SC16185', '#SC16184', '#SC16273', '#SC16274', '#SC16288', '#SC16088', '#SC16094', '#SC16087', '#SC16092', '#SC16093', '#SC16144', '#SC16091', '#SC16272', '#SC16271', '#SC16270', '#SC16238', '#SC16239', '#SC16240', '#SC16241', '#SC16242', '#SC16243', '#SC16228', '#SC16229', '#SC16230', '#SC16231', '#SC16232', '#SC16233', '#SC16269', '#SC16268', '#SC16267', '#SC16222', '#SC16223', '#SC16224', '#SC16225', '#SC16226', '#SC16227'];
	var lpArray106b = [8703, 8819, 8941, 4876, 4872, 4874, 8212, 8214, 8216, 8435, 8434, 8436, 8263, 8264, 8265, 10579, 10576, 10578, 10586, 10582, 10584, 10604, 10600, 10602, 10592, 10588, 10590, 10598, 10594, 10596];
	var emArray106b = [9819, 10010, 10179, 10180, 10181, 10182, 10183, 10184, 4894, 3764, 3765, 3767, 3766, 3762, 9173, 9174, 9175, 9176, 9177, 9179, 9180, 9182, 9181, 9184, 9183, 9186, 9185, 9187, 9190, 9189, 9188, 9452, 9453, 9454, 9455, 9460, 9461, 9462, 9463, 9456, 9457, 9458, 9459, 9464, 9467, 9466, 9465, 9468, 9470, 9469, 9471, 9475, 9473, 9474, 9472, 9446, 9447, 9448, 9449, 9450, 9451, 9234, 9235, 9236, 9237, 9238, 9239, 11160, 10861, 10863, 10862, 10860, 10859, 10858, 10936, 10937, 10878, 10879, 10880, 10864, 10865, 10866, 10867, 10876, 10868, 10869, 10870, 10871, 10872, 10873, 10874, 10875, 10950, 10949];
	var fmArray106b = [1758, 1749, 1900, 1668, 1669, 1670, 1712, 1679, 1957, 1907, 1926, 1922, 1921, 1925, 1920];
	var soArray106b = [483, 485, 484, 491, 448];
	var get_url = location.href;
	var mkto_app_url = get_url.slice(0, get_url.indexOf('/', 9));
	window.postMessage({
		type : 'ScriptMsg',
		text : 'true'
	}, mkto_app_url);
	if (domain_s_1 !== 'https://app-ab08.marketo.com/m') {
		window.Mkt3 && Mkt3.onLaunch(function() {
			prevent_autosave_smartcampaigns(scArray106b);
			discard_em_drafts(emArray106b);
			setTimeout(discard_lp_drafts(lpArray106b), 3000);
			discard_fm_drafts(fmArray106b);
			discard_so_drafts(soArray106b);
			prevent_em_approval(emArray106b);
			prevent_lp_approval(lpArray106b);
			prevent_fm_approval(fmArray106b);
			prevent_so_approval(soArray106b);
			update_n_menus();
			update_ne_menus();
			update_pm_menus();
			update_sc_menus();
			update_em_menus();
			update_lp_menus();
			update_fm_menus();
			update_so_menus();
			update_ls_menus();
			update_sl_menus();
			prevent_renaming_assets();
			prevent_asset_cloning();
			prevent_cloning();
			prevent_streams();
			prevent_move();
			prevent_sc_create();
			prevent_pm_create();
			//constrain_nurture(ceArray106a);
			prevent_nurture_cadence();
			prevent_nurture_rename();
			limit_nurture_programs();
		});
	}
	if (domain_s_1 == 'https://app-ab08.marketo.com/m') {
		var buttons = Ext4.ComponentQuery.query('button[action=approveAndClose]');
		buttons.forEach(function(button) {
			button.disable();
		});
	}
	if (domain_s_1 == 'https://app-ab08.marketo.com/') {
		if (domain_s_2 == 'AR1559A1!' || domain_s_2 == 'AR1544A1!' || domain_s_2 == 'AR1682A1!') {
			setTimeout(update_calendar('href'), 5000);
			loadScript_analyzers();
			loadHtml_analyzers();
			loadStyle_analyzers();
		}
		if (domain_s_2 == 'AR1559A1!') {
			document.getElementById('analyzerPrev').setAttribute('style', 'display: none;');
			document.getElementById('analyzerNext').setAttribute('title', 'Go to the Program Analyzer');
			document.getElementById('analyzerNext').setAttribute('onclick', 'showAnalyzer(1)');
		}
		if (domain_s_2 == 'AR1544A1!') {
			document.getElementById('analyzerPrev').setAttribute('style', 'display: block;');
			document.getElementById('analyzerPrev').setAttribute('title', 'Go to the Opportunity Analyzer');
			document.getElementById('analyzerPrev').setAttribute('onclick', 'showAnalyzer(0)');
			document.getElementById('analyzerNext').setAttribute('style', 'display: block;');
			document.getElementById('analyzerNext').setAttribute('title', 'Go to the Success Path Analyzer');
			document.getElementById('analyzerNext').setAttribute('onclick', 'showAnalyzer(2)');
		}
		if (domain_s_2 == 'AR1682A1!') {
			document.getElementById('analyzerPrev').setAttribute('title', 'Go to the Program Analyzer');
			document.getElementById('analyzerPrev').setAttribute('onclick', 'showAnalyzer(1)');
			document.getElementById('analyzerNext').setAttribute('style', 'display: none;');
		}
	}
	if (get_url == 'https://app-ab08.marketo.com/#MM0A1') {
		window.Mkt3 && Mkt3.onLaunch(function() {
			setTimeout(update_calendar('href'), 5000);
		});
	}
}
else if (cust_prefix == 'mktodemoaccount106b' && isAdminUser == true) {
	window.Mkt3 && Mkt3.onLaunch(function() {
		var myMsg = 'Warning!';
		var message = 'You are logged in as Demonstration Administrator. Any changes you make will have a downstream effect on all other users of this subscription. Please exercise discipline and be responsible with any changes you make. If you have any doubt or concern about the impact of your changes, send an email to Reade Triolo.';
		var admin_messageBox = Ext.MessageBox.show({
			title : myMsg,
			msg : message,
			width : 400,
			closable : true
		});
		admin_messageBox.show;
	});
}

if (domain == 'marketolive.com') {
	var jscript_lib = document.createElement('script');
	jscript_lib.setAttribute('type', 'text/javascript');
	jscript_lib.setAttribute('src', '//marketolive.com/plugin/analytics.js');
	document.getElementsByTagName('head')[0].appendChild(jscript_lib);
}

if (cust_prefix == 'mktodemoaccount106' || cust_prefix == 'mktodemoaccount106a' || cust_prefix == 'mktodemoaccount106b') {
	var jscript_lib = document.createElement('script');
	jscript_lib.setAttribute('type', 'text/javascript');
	jscript_lib.setAttribute('src', '//marketolive.com/plugin/demo_ready.js');
	document.getElementsByTagName('head')[0].appendChild(jscript_lib);
}
console.log('Sales Script Loading Complete');
