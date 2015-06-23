console.log('Plugin Loading MarketoDemo Complete');
console.log('MarketoDemo Script Executing...');

var cust_prefix = '';
var current_user = '';

var current_url = location.href;
var url_cnt = current_url.split('/');
var domain = url_cnt[2];
var url_cnt_s = current_url.split('#');
var url_len_s = url_cnt_s.length;
var domain_s_1 = url_cnt_s[0];
var domain_s_2 = url_cnt_s[1];

var mkto_app_url = current_url.slice(0, current_url.indexOf('/', 9));

var subdomain_s1 = domain_s_1.split('//');
var subdomain_s2 = subdomain_s1[1].split('.');
var subdomain_s3 = subdomain_s2[0].split('-');
var pod = subdomain_s3[1];

var subdomainMatch = /([([a-z0-9][a-z0-9-]+[a-z0-9]\.marketo\.com)/;
var patt = new RegExp(subdomainMatch);
var res = patt.test(current_url);

if (typeof(MktPage) !== "undefined") {
	cust_prefix = MktPage.savedState.custPrefix;
	console.log(cust_prefix);
	window.postMessage({
		type : 'DemoMsg',
		text : cust_prefix
	}, mkto_app_url);
	current_user = MktPage.userid;
	console.log(current_user);
}

var current_pod = getCookie('userPod');
if (current_pod == '') {
	//current_pod = 'app-sjp';
}

if (res == true && url_cnt[3] !== 'mobile') {
	loadDashboard();	
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
//<---- Load Marketo Dashboard Data Script
function loadDashboard() {
	var jscript_lib = document.createElement('script');
	jscript_lib.setAttribute('type', 'text/javascript');
	jscript_lib.setAttribute('src', '//marketolive.com/plugin/remote_data.js');
	document.getElementsByTagName('head')[0].appendChild(jscript_lib);
}
//<---- These functions add the demo button functionality to the Marketo Analyzers
//<---- This function gets the current URLs of each Analyzer and sets the onclick location 
function showAnalyzer(id) {
	//console.log(current_pod);
	if (current_pod == 'app-sjp') {
		if (id == 0) { // Opportunity Analyzer is displayed
			window.location = 'https://'+current_pod+'.marketo.com/#AR1559A1!';
			document.getElementById('analyzerPrev').setAttribute('style', 'display: none;');
			document.getElementById('analyzerNext').setAttribute('style', 'display: block;');
			document.getElementById('analyzerNext').setAttribute('title', 'Go to the Program Analyzer');
			document.getElementById('analyzerNext').setAttribute('onclick', 'showAnalyzer(1)');
		}
		if (id == 1) { // Program Analyzer is displayed
			window.location = 'https://'+current_pod+'.marketo.com/#AR1544A1!';
			document.getElementById('analyzerPrev').setAttribute('style', 'display: block;');
			document.getElementById('analyzerPrev').setAttribute('title', 'Go to the Opportunity Analyzer');
			document.getElementById('analyzerPrev').setAttribute('onclick', 'showAnalyzer(0)');
			document.getElementById('analyzerNext').setAttribute('style', 'display: none;');
		}
		if (id == 2) { // Modeler is displayed
			window.location = 'https://'+current_pod+'.marketo.com/?preview=true&approved=true/#RCM39A1!';
			document.getElementById('analyzerPrev').setAttribute('style', 'display: none;');
			document.getElementById('analyzerNext').setAttribute('style', 'display: block;');
			document.getElementById('analyzerNext').setAttribute('title', 'Go to the Success Path Analyzer');
			document.getElementById('analyzerNext').setAttribute('onclick', 'showAnalyzer(3)');	
		}
		if (id == 3) { // Success Path Analyzer is displayed
			window.location = 'https://'+current_pod+'.marketo.com/#AR1682A1!';
			document.getElementById('analyzerPrev').setAttribute('style', 'display: block;');
			document.getElementById('analyzerPrev').setAttribute('title', 'Go to the Modeler');
			document.getElementById('analyzerPrev').setAttribute('onclick', 'showAnalyzer(2)');
			document.getElementById('analyzerNext').setAttribute('style', 'display: none;');
		}		
	}
	if (current_pod == 'app-ab07') {
		if (id == 0) { // Opportunity Analyzer is displayed
			window.location = 'https://'+current_pod+'.marketo.com/#AR1559A1!';
			document.getElementById('analyzerPrev').setAttribute('style', 'display: none;');
			document.getElementById('analyzerNext').setAttribute('style', 'display: block;');
			document.getElementById('analyzerNext').setAttribute('title', 'Go to the Program Analyzer');
			document.getElementById('analyzerNext').setAttribute('onclick', 'showAnalyzer(1)');
		}
		if (id == 1) { // Program Analyzer is displayed
			window.location = 'https://'+current_pod+'.marketo.com/#AR1544A1!';
			document.getElementById('analyzerPrev').setAttribute('style', 'display: block;');
			document.getElementById('analyzerPrev').setAttribute('title', 'Go to the Opportunity Analyzer');
			document.getElementById('analyzerPrev').setAttribute('onclick', 'showAnalyzer(0)');
			document.getElementById('analyzerNext').setAttribute('style', 'display: none;');
		}
		if (id == 2) { // Modeler is displayed
			window.location = 'https://'+current_pod+'.marketo.com/#RCM5A1!';
			document.getElementById('analyzerPrev').setAttribute('style', 'display: none;');
			document.getElementById('analyzerNext').setAttribute('style', 'display: block;');
			document.getElementById('analyzerNext').setAttribute('title', 'Go to the Success Path Analyzer');
			document.getElementById('analyzerNext').setAttribute('onclick', 'showAnalyzer(3)');	
		}
		if (id == 3) { // Success Path Analyzer is displayed
			window.location = 'https://'+current_pod+'.marketo.com/#AR1682A1!';
			document.getElementById('analyzerPrev').setAttribute('style', 'display: block;');
			document.getElementById('analyzerPrev').setAttribute('title', 'Go to the Modeler');
			document.getElementById('analyzerPrev').setAttribute('onclick', 'showAnalyzer(2)');
			document.getElementById('analyzerNext').setAttribute('style', 'display: none;');
		}		
	}
	if (current_pod == 'app-ab08') {
		if (id == 0) { // Opportunity Analyzer is displayed
			window.location = 'https://'+current_pod+'.marketo.com/#AR1559A1!';
			document.getElementById('analyzerPrev').setAttribute('style', 'display: none;');
			document.getElementById('analyzerNext').setAttribute('style', 'display: block;');
			document.getElementById('analyzerNext').setAttribute('title', 'Go to the Program Analyzer');
			document.getElementById('analyzerNext').setAttribute('onclick', 'showAnalyzer(1)');
		}
		if (id == 1) { // Program Analyzer is displayed
			window.location = 'https://'+current_pod+'.marketo.com/#AR1544A1!';
			document.getElementById('analyzerPrev').setAttribute('style', 'display: block;');
			document.getElementById('analyzerPrev').setAttribute('title', 'Go to the Opportunity Analyzer');
			document.getElementById('analyzerPrev').setAttribute('onclick', 'showAnalyzer(0)');
			document.getElementById('analyzerNext').setAttribute('style', 'display: none;');
		}
		if (id == 2) { // Modeler is displayed
			window.location = 'https://'+current_pod+'.marketo.com/?preview=true&approved=true/#RCM5A1!';
			document.getElementById('analyzerPrev').setAttribute('style', 'display: none;');
			document.getElementById('analyzerNext').setAttribute('style', 'display: block;');
			document.getElementById('analyzerNext').setAttribute('title', 'Go to the Success Path Analyzer');
			document.getElementById('analyzerNext').setAttribute('onclick', 'showAnalyzer(3)');
		}
		if (id == 3) { // Success Path Analyzer is displayed
			window.location = 'https://'+current_pod+'.marketo.com/#AR1682A1!';
			document.getElementById('analyzerPrev').setAttribute('style', 'display: block;');
			document.getElementById('analyzerPrev').setAttribute('title', 'Go to the Modeler');
			document.getElementById('analyzerPrev').setAttribute('onclick', 'showAnalyzer(2)');
			document.getElementById('analyzerNext').setAttribute('style', 'display: none;');
		}		
	}
}
//<---- This function adds HTML for the Demo Button in the Analyzers
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
//<---- This function adds Stylesheet to the Demon Button in the Analyzers
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
//<---- This function adds JavaScript to the Demo Button in the Analyzers
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
//<---- This function prevents smart campaigns from saving 
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
//<---- This function discards email drafts
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
//<---- This function discards landing page drafts
function discard_lp_drafts(lpArray) {
	var myMsg = 'Discarding Landing Page Drafts';
	console.log(myMsg);
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
		//debugger;				
		mktLPLManager.doModifyPages('revert', parms);
		d_lp_messageBox.hide();			
	}
}
//<---- This function discards form drafts
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
				//debugger;
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
//<---- This function discards social drafts
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
//<---- This function prevents email approvals
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
//<---- This function prevents landing page approvals
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
//<---- This function prevents form approvals
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
//<---- This function prevents social approvals
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
//<---- This function limits the capabilities of the new menu in the default workspace
function update_n_menus() {
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
//<---- This function limits the capabilities of the new menu in the default workspace
function update_ne_menus() {
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
//<---- This function limits the capabilities of the program actions menu in the default workspace
function update_pm_menus() {
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
//<---- This function limits the capabilities of the smart campaign menu in the default workspace
function update_sc_menus() {
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
//<---- This function limits the capabilities of the email menu in the default workspace
function update_em_menus() {
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
//<---- This function limits the capabilities of the landing page menu in the default workspace 
function update_lp_menus() {
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
//<---- This function limits the capabilities of the forms menu in the default workspace
function update_fm_menus() {
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
//<---- This function limits the capabilities of the social menu in the default workspace
function update_so_menus() {
	var originalFnA = Mkt3.controller.socialApp.SocialApp.prototype.loadToolbar;
	Mkt3.controller.socialApp.SocialApp.prototype.loadToolbar = function(menu, attr) {
		originalFnA.apply(this, arguments);

		var disable = this.getSocialApp().get('zoneId') == 1, items = Ext4.ComponentQuery.query('socialAppToolbar contextMenu [action=clone],' + 'socialAppToolbar contextMenu [action=delete],');
		items.forEach(function(item) {
			item.setDisabled(disable);
		});
	}
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
//<---- This function limits the capabilities of the list menu in the default workspace
function update_ls_menus() {
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
//<---- This function limits the capabilities of the smart list menu in the default workspace
function update_sl_menus() {
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
//<---- This function udpates the calendar tile in My Marketo in the default workspace
function update_calendar(var_cal_view) {
	var cal_view = var_cal_view;
	var cal_url = 'https://'+current_pod+'.marketo.com/';
	var matchingElements = [];
	var targetEl; 
	var allElements = document.getElementsByTagName('a');
	for (var i = 0, n = allElements.length; i < n; i++) {
		if (allElements[i].getAttribute('href')) {
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
//<---- This function prevents renaming assets in the default workspace
function prevent_renaming_assets() {
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
//<---- This function prevents creating or cloning programs and fires a custom warning message in the default workspace 
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
//<---- This function prevents creating new smart campaigns and fires a custom warning message in the default workspace
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
//<---- This function prevents creating new programs and fires a custom warning message in the default workspace 
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
//<---- This function prevents moving assets in the default workspace
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
//<---- This function prevents creating new streams in the default workspace
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
//<---- This function prevents changing the cadence of nurture programs in the default workspace
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
//<---- This function prevents renaming the nurture programs in the default workspace
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
//<---- This function constrains the ability to add content outside of the target nurture program
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
//<---- This function limits the capability to create more than 3 nurture programs in the target workspace
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
//<---- This function prevents the cloning of any asset in the default workspace
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
//<---- This function adds new javascript functionality to the marketo login screen
function loadScript_login() {
	var script = document.createElement('script');
	script.setAttribute('type', 'text/javascript');
	var script_data = document.createTextNode(
		'function setSubscription(subName) {' +
			'var subscriptionType = capitaliseFirstLetter(subName);' +
			'document.getElementById("subscription").value = subscriptionType;' +
			'hideSubscriptionList();' +
		'}' +
		'function capitaliseFirstLetter(string) {' +
		    'return string.charAt(0).toUpperCase() + string.slice(1);' +
		'}' +
		'function showSubscriptionList() {' +
			'document.getElementById("demoSubscriptions").style.display = "block";' +
		'}' +
		'function hideSubscriptionList() {' +
			'document.getElementById("demoSubscriptions").style.display = "none";' +
		'}' +
		'function OnMouseIn (elem) {' +
            'elem.style.border = "1px solid #e77519";' +
           	'elem.style.backgroundColor = "#e77519";' +
           	'elem.style.cursor = "pointer";' +
       	'}' +
       	'function OnMouseOut (elem) {' +
           	'elem.style.border = "1px solid #ffffff";' +
           	'elem.style.backgroundColor = "#ffffff";' +
       	'};' +
       	//'var loginState = loginDetection();' +
       	//'console.log(loginState);' +
		'var selectedSubscription;' +
		'(function() {' +
			'document.getElementById("subscription").onfocus = function(e) {' +				
				'document.getElementById("demoSubscriptions").style.position = "absolute";' +
				'document.getElementById("demoSubscriptions").style.display = "block";' +
				'document.getElementById("demoSubscriptions").style.border = "1px solid #e77519";' +
				'document.getElementById("demoSubscriptions").style.cursor = "pointer";' +
				'document.getElementById("subscription").onclick = function(e) {' +
					'document.getElementById("loginUsername").focus();' +
				'};' +	
			'};' +
			'document.getElementById("demoSubscriptions").onclick = function(e) {' +
				'selectedSubscription = e.target.id;' +
				'setSubscription(selectedSubscription);' +
				'document.getElementById("loginUsername").focus();' +
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
			'document.getElementById("frame").onclick = function(e) {' +
				'var subStatus = document.getElementById("demoSubscriptions");' +
				'if (subStatus == null) {' +
				'}' +
				'else if (subStatus.style.display = "block") {' +
					'subStatus.style.display = "none";' +
				'}' +
			'};' +
		'})();'
	);
	script.appendChild(script_data);
	document.getElementsByTagName('head')[0].appendChild(script);
}
//<---- This function adds new html content to the marketo login page
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
	html_input_1.setAttribute('autocomplete', 'off');
	html_input_1.setAttribute('readonly', 'true;');
	html_td_1.appendChild(html_input_1);
	var html_div_1 = document.createElement('div');
	html_div_1.setAttribute('id', 'demoSubscriptions');
	html_div_1.setAttribute('style', 'cursor: pointer; display:none; position: absolute; background-color: #ffffff; font-size: 16px; bottom: -40px; top: 127px; left: 0; z-index: 101; width: 100%;');
	html_td_1.appendChild(html_div_1);
	var html_div_2 = document.createElement('div');
	html_div_2.setAttribute('id', 'business');
	html_div_2.setAttribute('class', 'demoSubscription');
	html_div_2.setAttribute('style', 'padding: 15px 15px 15px 10px; border: 1px solid #ffffff;');
	html_div_2.setAttribute('onmouseover', 'OnMouseIn(this)');
	html_div_2.setAttribute('onmouseout', 'OnMouseOut(this)');
	var html_div_2_text = document.createTextNode('Business');
	html_div_2.appendChild(html_div_2_text);
	html_div_1.appendChild(html_div_2);
	var html_div_3 = document.createElement('div');
	html_div_3.setAttribute('id', 'ecommerce');
	html_div_3.setAttribute('class', 'demoSubscription');
	html_div_3.setAttribute('style', 'padding: 15px 15px 15px 10px; border: 1px solid #ffffff;');
	html_div_3.setAttribute('onmouseover', 'OnMouseIn(this)');
	html_div_3.setAttribute('onmouseout', 'OnMouseOut(this)');
	var html_div_3_text = document.createTextNode('Ecommerce');
	html_div_3.appendChild(html_div_3_text);
	html_div_1.appendChild(html_div_3);
	var html_div_4 = document.createElement('div');
	html_div_4.setAttribute('id', 'healthcare');
	html_div_4.setAttribute('class', 'demoSubscription');
	html_div_4.setAttribute('style', 'padding: 15px 15px 15px 10px; border: 1px solid #ffffff;');
	html_div_4.setAttribute('onmouseover', 'OnMouseIn(this)');
	html_div_4.setAttribute('onmouseout', 'OnMouseOut(this)');
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
//<---- This function displays an error message if the user does not select a subscription 
function loadHtml_loginError(state, message) {
	var error = document.getElementById('custLoginMessage');
	if (state == 'visible') {
		error.style.visibility = 'visible';
		error.style.fontWeight = 'bold';
		error.style.fontStyle = 'normal';
		error.style.fontVariant = 'normal';
		error.style.fontStretch = 'normal';
		error.style.fontSize = '16px';
		error.style.lineHeight = 'normal';
		error.style.fontFamily = 'arial';
		error.style.bottom = '296px';
		error.style.height = '64px';
		error.style.display = 'block';
		error.style.backgroundColor = 'rgb(194, 79, 79)';
		if (error.childNodes[0] !== undefined) {
			error.removeChild(error.childNodes[0]);	
		}
		error.appendChild(document.createTextNode(message));	
	}
	else if(state == 'hidden') {
		error.style.visibility = 'hidden';
		error.style.removeProperty('background-color');
		error.style.removeProperty('display');
	}
	
}
//<---- This function detects the current username and augments the normal login page behavior 
function loginDetection() {
	var isDemoUser = false;
	var userName = document.getElementById('loginUsername');
	var userNameValue;
	if (userName == '' || userName == undefined || userName == null) {
		return false;
	}
	if (userName) {
		userNameValue = document.getElementById('loginUsername').value;
		if (userNameValue.length > 1) {
			userNameValue = (userNameValue.slice(0, userNameValue.search('@')).search('.demo'));			
			if (parseInt(userNameValue) > 0) {
				isDemoUser = true;
				document.getElementById("subscription").style.display = "block";
				return true;
			}
			else {
				document.getElementById("subscription").style.display = "none";
				return false;
			}
		}
	}
}
//<---- This function detects whether the user selected a subscription from the new subscription field on the login page
function subDetection() {
	var subType;
	var object = document.getElementById('subscription');
	if (object == null) {
		return false;
	}else{
		subType = document.getElementById('subscription').value;
		if (subType == '' || subType == undefined || subType == null) {
			return false;
		}else{
			return subType;
		}
	}
}
//<---- Check for subscription customization
function subDisplay() {
	var object_state = document.getElementById("subscription").style.display;
	console.log(object_state);
	if (object_state == 'block') {
		return true;
	}
	else if (object_state == 'none') {
		return false;
	}
}
//<---- Get the input values for the current user and subscription
function authenticUser() {
	var username = document.getElementById('loginUsername').value;
	var password = document.getElementById('loginPassword').value;
	var subscription = document.getElementById('subscription').value;
	return [username, password, subscription];
}
//<---- Change Forgot Password Link
function changePasswordLink() {
	var elementList = document.querySelectorAll('a.small');
	console.log(elementList);
	elementList[0].setAttribute('onclick', 'forgotPassword();');
}
//<---- New Forgot Password function
function forgotPassword() {
	if (demoUser == true) {
		alert('MarketoLive User');
		changePasswordLink();
	}
	else {
		alert('Non-MarketoLive User');
	}
}

function inIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

function cleanLogin() {
	function hideElementByClassName(className, element) {
		var elements = document.getElementsByClassName(className);
		elements[element].style.display = 'none';
	}	
	document.getElementById('logo').style.display = 'none';
	document.getElementById('footer').style.display = 'none';
	
	hideElementByClassName('top', 0);
	hideElementByClassName('bottom', 1);
	var targetObject = document.getElementById('login-container');
	function hideMyElement(targetObject) {
		if (targetObject.nextElementSibling == null) {
			location.reload();
		}else{
		targetObject.nextElementSibling.style.display = 'none';
		targetObject.style.position = 'absolute';
		targetObject.style.top = '0';
		targetObject.style.left = '0';
		}
	}
	hideMyElement(targetObject);

	var login_error = checkErrorState();
	if (login_error == true) {
		window.postMessage({
			type : 'DemoMsg',
			text : 'login_failed'
		}, mkto_app_url)
	}

}

function getError() {
	var demoError = document.getElementById('custLoginMessage').innerHTML;
	console.log(demoError);
	return demoError;
}

function checkErrorState() {
	var demoError = document.getElementById('custLoginMessage').style.display;
	console.log('Login Error State = ' + demoError);
	if (demoError !== 'none') {
		return false;
	}else{
		return true;
	}
}

function interceptLogin(type) {
	var demoUser, demoType, demoSub, currentError;
	//var mkto_app_url = current_url.slice(0, current_url.indexOf('/', 9));
	loadHtml_login();
	loadScript_login();	
	document.getElementById('loginButton').onclick = function(e) {
		console.log('Login Button Clicked');
		demoUser = loginDetection();
		demoType = subDetection();
		demoSub = subDisplay();
		console.log(demoUser);
		console.log(demoType);
		console.log(demoSub);
		if (type == 'live') {			
			if (demoUser == true && demoType == 'Business') {
				console.log('Login Name Validated; Subscription Selected');
				document.getElementById('login-container').style.top = ('64px');
				currentError = setTimeout(getError, 3000);
				console.log(currentError);
				window.postMessage({
					type : 'DemoMsg',
					text : 1
				}, mkto_app_url);
			} 
			else if (demoUser == true && demoType == 'Ecommerce') {
				console.log('Login Name Validated; Ecommerce Subscription Selected');
				e.preventDefault();
				document.getElementById('login-container').style.top = ('64px');
				currentError = setTimeout(getError, 3000);
				console.log(currentError);	
				var state = 'visible';
				var message = 'This subscription is not available (yet)';
				loadHtml_loginError(state, message);
				window.postMessage({
					type : 'DemoMsg',
					text : 1
				}, mkto_app_url);
			}
			else if (demoUser == true && demoType == 'Healthcare') {
				console.log('Login Name Validated; Healthcare Subscription Selected');
				e.preventDefault();
				document.getElementById('login-container').style.top = ('64px');
				currentError = setTimeout(getError, 3000);
				console.log(currentError);			
				var state = 'visible';
				var message = 'This subscription is not available (yet)';
				loadHtml_loginError(state, message);
				window.postMessage({
					type : 'DemoMsg',
					text : 1
				}, mkto_app_url)
			}
			else if (demoUser == true && demoType == false) {
				console.log('Login Name Validated; No Subscription Selected');
				e.preventDefault();
				document.getElementById('login-container').style.top = ('64px');
				currentError = setTimeout(getError, 3000);
				console.log(currentError);
				var state = 'visible';
				var message = 'Please choose a subscription from the list';
				loadHtml_loginError(state, message);
				window.postMessage({
					type : 'DemoMsg',
					text : 1
				}, mkto_app_url)
			} 
			else if (demoUser == false) {
				console.log('Login Name Not Validated');
				e.preventDefault();
				document.getElementById('login-container').style.top = ('64px');
				currentError = setTimeout(getError, 3000);
				console.log(currentError);
				var state = 'visible';
				var message = 'Please choose a subscription from the list';
				loadHtml_loginError(state, message);
				window.postMessage({
					type : 'DemoMsg',
					text : 1
				}, mkto_app_url)
			} 
			else {
				document.getElementById('login-container').style.top = ('64px');
				currentError = setTimeout(getError, 3000);
				console.log(currentError);
				window.postMessage({
					type : 'DemoMsg',
					text : currentError
				}, mkto_app_url);
				//loadHtml_loginError(state, message);
				console.log('Something Else Happened?');
			}
		}
		else if (type == 'demo') {
			if (demoSub == true) {
				console.log('Subscription option is displayed');
				if (demoUser == true && demoType == 'Business') {
					console.log('Login Name Validated; Subscription Selected');
					currentError = setTimeout(getError, 3000);
					console.log(currentError);
					window.postMessage({
						type : 'DemoMsg',
						text : 1
					}, mkto_app_url);
				} 
				else if (demoUser == true && demoType == 'Ecommerce') {
					console.log('Login Name Validated; Ecommerce Subscription Selected');
					e.preventDefault();
					currentError = setTimeout(getError, 3000);
					console.log(currentError);	
					var state = 'visible';
					var message = 'This subscription is not available (yet)';
					loadHtml_loginError(state, message);
					window.postMessage({
						type : 'DemoMsg',
						text : 1
					}, mkto_app_url);
				}
				else if (demoUser == true && demoType == 'Healthcare') {
					console.log('Login Name Validated; Healthcare Subscription Selected');
					e.preventDefault();
					currentError = setTimeout(getError, 3000);
					console.log(currentError);			
					var state = 'visible';
					var message = 'This subscription is not available (yet)';
					loadHtml_loginError(state, message);
					window.postMessage({
						type : 'DemoMsg',
						text : 1
					}, mkto_app_url)
				}
				else if (demoUser == true && demoType == false) {
					console.log('Login Name Validated; No Subscription Selected');
					e.preventDefault();
					currentError = setTimeout(getError, 3000);
					console.log(currentError);
					var state = 'visible';
					var message = 'Please choose a subscription from the list';
					loadHtml_loginError(state, message);
					window.postMessage({
						type : 'DemoMsg',
						text : 1
					}, mkto_app_url)
				} 
				else if (demoUser == false) {
					console.log('Login Name Not Validated');
					e.preventDefault();
					//document.getElementById('login-container').style.top = ('64px');
					currentError = setTimeout(getError, 3000);
					console.log(currentError);
					var state = 'visible';
					var message = 'Please choose a subscription from the list';
					loadHtml_loginError(state, message);
					window.postMessage({
						type : 'DemoMsg',
						text : 1
					}, mkto_app_url)
				} 
				else {
					document.getElementById('login-container').style.top = ('64px');
					currentError = setTimeout(getError, 3000);
					console.log(currentError);
					window.postMessage({
						type : 'DemoMsg',
						text : currentError
					}, mkto_app_url);
					//loadHtml_loginError(state, message);
					console.log('Something Else Happened?');
				}
			}else{
				console.log('Subscription option is not displayed');
			}
		}
	}
}

function protectMarketingActivities(cal, sc, em, lp, fm, so, ce) {
	window.Mkt3 && Mkt3.onLaunch(function() {
		update_calendar(cal);
		prevent_autosave_smartcampaigns(sc);
		discard_em_drafts(em);
		discard_lp_drafts(lp);
		discard_fm_drafts(fm);
		discard_so_drafts(so);
		prevent_em_approval(em);
		prevent_lp_approval(lp);
		prevent_fm_approval(fm);
		prevent_so_approval(so);
		//constrain_nurture(ce);
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
		prevent_nurture_cadence();
		prevent_nurture_rename();
		limit_nurture_programs();
	});
}

function demonstrationAdministrator() {
	window.Mkt3 && Mkt3.onLaunch(function() {
		var myMsg = 'Warning!';
		var message = 'You are logged in as Demonstration Administrator. Any changes you make will have a downstream effect on all other users of this subscription. Please exercise discipline and be responsible with any changes you make. If you have any doubt or concern about the impact of your changes, send an email to <a href="mailto:marketolive@marketo.com?Subject=Demonstration Administrator Question" target="_top">marketolive@marketo.com</a>.';
		var admin_messageBox = Ext.MessageBox.show({
			title : myMsg,
			msg : message,
			width : 400,
			closable : true
		});
		admin_messageBox.show
	});
}

var loginScreen = document.getElementById("login-container");
var ghostLoginURL = 'https://login.marketo.com/homepage/malogin';
var forgotPasswordURL = 'https://login.marketo.com/index.php/homepage/forgotPasswordRequest';
//<---- This code detects the marketo login page 
//console.log(current_url);
console.log(mkto_app_url);
if (current_url == ghostLoginURL) {
	console.log('Ghost Login Detected');
} 
else if (current_url == forgotPasswordURL) {
	console.log('Forgot Password Detected');
}
else{
	if (loginScreen !== null) {
		console.log('Marketo Login Screen Detected');
		
		(function() {
			var login_window = inIframe();
			console.log('Framed Login Window = '+login_window);
			if (login_window == true) {
				window.postMessage({
					type : 'DemoMsg',
					text : 'mkto_live_login_loaded'
				}, mkto_app_url);
				console.log('MarketoLive Login Detected');
				cleanLogin();
				interceptLogin('live');
			}else{
				window.postMessage({
					type : 'DemoMsg',
					text : 'mkto_app_login_loaded'
				}, mkto_app_url);
				console.log('MarketoDemo Login Detected');
				interceptLogin('demo');
			}
			var validUser;
			document.getElementById("subscription").disabled = true;
			document.getElementById("loginUsername").onblur = function(e) { 
				validUser = loginDetection();
				if (validUser == true) {
					document.getElementById("subscription").disabled = false;
				}				
			};
			document.getElementById("loginUsername").onblur = function(e) { 
				validUser = loginDetection();
				if (validUser == true) {
					document.getElementById("subscription").disabled = false;
				}				
			};
			document.getElementById("subscription").onclick = function(e) {
				validUser = loginDetection();
				if (validUser == true) {
					document.getElementById("subscription").disabled = false;
				}
			};
			document.getElementById("frame").onclick = function(e) {
				validUser = loginDetection();
				if (validUser == true) {
					document.getElementById("subscription").disabled = false;
				}
			};   
		})();
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
function removeDesignDelete() {
	var matchingElements = [];
	var targetEl; 
	var allElements = document.getElementsByTagName('a');
	for (var i = 0, n = allElements.length; i < n; i++) {
		if (allElements[i].getAttribute('href')) {
			// Element exists with attribute. Add to array.
			matchingElements.push(allElements[i]);
		}
	}
	var targetElements = Array.prototype.slice.call(matchingElements);
	var button = '?action=delete';
	for (var j = 0, o = targetElements.length; j < o; j++) {
		if (targetElements[j].href.indexOf(button) > 0) {			
			targetEl = targetElements[j];
			break;
		}
	}
	if (targetEl == undefined) {
		return;
	}else{
		targetEl.style.display = 'none';	
	}
}
function removeInboxDelete() {
	var inputs = document.getElementsByTagName('input');
	for (var i = 0; i < inputs.length; i++) {
		if (inputs[i].type == 'checkbox') {
			console.log(inputs[i]);
			inputs[i].addEventListener('click', function() {
				var targetEl1 = document.getElementById('btndelete');
				if (targetEl1 !== null) {
					targetEl1.style.display = 'none';	
				}			
				var targetEl2 = document.getElementsByClassName('btn btn-sm btn-default vertspacerx2 spacerx2 delete');
				console.log(targetEl2);
				if (targetEl2 !== null) {
					for (var j = 0; j < targetEl2.length; j++) {
						targetEl2[j].style.display = 'none';
					}
				}
			}); 
		}
	}
}

if (domain == '250ok.com') {
	console.log(current_url);
	console.log(current_url.indexOf('https://250ok.com/app/inbox-informant'));
	if (current_url.indexOf('https://250ok.com/login') == 0) {
		emailDeliverability('email', 'password');	
	}
	if (current_url == 'https://250ok.com/app/account') {
		removeSettings();
	}
	if (current_url.indexOf('https://250ok.com/app/design-informant') == 0) {
		removeDesignDelete();
	}
	if (current_url.indexOf('https://250ok.com/app/inbox-informant') == 0) {
		removeInboxDelete();
	}
}
if (domain == 'go.app.io') {
	$ = jQuery.noConflict();
	$(document).ready(function() {
		$('body').css({
			'background-color' : '#ccc',
			'zoom' : '.60'
		});
	});
}

var mkto_live_admin_user = ['admin@mktodemoaccount106.com', 'admin@mktodemoaccount106a.com', 'admin@mktodemoaccount106b.com'];

var isAdminUser	= mkto_live_admin_user.indexOf(current_user) > -1; 
console.log(isAdminUser);
if (cust_prefix == 'mktodemoaccount106' && isAdminUser == false) {
	var mkto_live_plugin_state = true;

	var cal_view = '#CAL0-eyJlZGl0IjoxLCJkdCI6IjIwMTUwNDIyIiwiY3QiOjEsInRhZ3MiOnsic3lzLkVudHJ5U3VidHlwZSI6WyJlbWFpbCIsIndlYmluYXIiLCJudXJ0dXJlX3J1biIsImVtYWlsX3Rlc3QiLCJjYW1wYWlnbl9ydW4iLCJub25lIiwiYjMxYmE2YTYtMDk5Ni00ODMyLWJhZjQtNzk5ODQ3ZGY4YmM4IiwiZXZlbnQiLCIwNWVlZmQ0Yy05OGZiLTRhYjctOTFjZS1hYTE2NWNhZDI0YjkiLCIyNDQ2ODg5MC0yNjEwLTRkMjctYjZlYy05ODVlYjQxNzViOTUiLCI0MTU0MmJiNy1jMzQ0LTQ3NGItODU4Zi1mNGM5YWM1MzcwZjciLCJkZWVjMDkwZC1iY2U0LTQ1MjYtYjYwMy1iMmRhOTc5MzMwNmIiLCIxMzhlZmM1OS02MjU0LTRkNDYtYjdmYi0zZWVjNzA2YTU3ZTMiLCI3YmZiOThkNS05M2IzLTQxMjUtODE5Yy0xZDlkYjMxMzEwYjAiLCI2NDRjOWNiNS0yMjU2LTRlNmMtYjI1YS04ODEzNTE3NGM2MTIiLCI1ZTU4NGQ1Yi04NGI0LTQ2YTctYWIzNi1mMGJmYTE0ZWQ2YzQiXSwic3lzLldvcmtzcGFjZUlkIjpbIjEiXX19';
	var scArray106 = ['#SC18518', '#SC18519', '#SC18520', '#SC18521', '#SC18522', '#SC18394', '#SC18393', '#SC14945', '#SC14602', '#SC14603', '#SC15639', '#SC14604', '#SC14605', '#SC5373', '#SC5372', '#SC5370', '#SC5371', '#SC5374', '#SC13488', '#SC13496', '#SC14055', '#SC14053', '#SC14056', '#SC14054', '#SC14057', '#SC14058', '#SC13659', '#SC13657', '#SC13660', '#SC13658', '#SC13661', '#SC13662', '#SC13255', '#SC13253', '#SC13257', '#SC13254', '#SC13256', '#SC13258', '#SC13261', '#SC13260', '#SC13259', '#SC16408', '#SC2836', '#SC1426', '#SC139', '#SC843', '#SC690', '#SC17168', '#SC17167', '#SC16890', '#SC16889', '#SC17420', '#SC17419', '#SC116', '#SC3420', '#SC115', '#SC39', '#SC15', '#SC17', '#SC2006', '#SC2005', '#SC62', '#SC3500', '#SC193', '#SC814', '#SC194', '#SC815', '#SC660', '#SC29', '#SC27', '#SC28', '#SC999', '#SC188', '#SC3498', '#SC16', '#SC252', '#SC251', '#SC772', '#SC3499', '#SC2728', '#SC2729', '#SC2756', '#SC2733', '#SC2760', '#SC3003', '#SC2972', '#SC2765', '#SC2790', '#SC2791', '#SC2792', '#SC2795', '#SC2794', '#SC2845', '#SC2735', '#SC2770', '#SC2747', '#SC2706', '#SC3124', '#SC2470', '#SC137', '#SC187', '#SC1099', '#SC1643', '#SC190', '#SC191', '#SC189', '#SC17370', '#SC17369', '#SC17368', '#SC17367', '#SC17366', '#SC17365', '#SC17364', '#SC17363', '#SC17376', '#SC17375', '#SC17372', '#SC17373', '#SC17374', '#SC17371', '#SC17356', '#SC17353', '#SC17354', '#SC17355', '#SC17357', '#SC17358', '#SC17359', '#SC17360', '#SC17361', '#SC17362', '#SC18198', '#SC18197', '#SC18196', '#SC18195', '#SC18194', '#SC18193', '#SC18192', '#SC18191', '#SC18204', '#SC18203', '#SC18200', '#SC18201', '#SC18202', '#SC18199', '#SC18181', '#SC18182', '#SC18183', '#SC18184', '#SC18185', '#SC18186', '#SC18187', '#SC18188', '#SC18189', '#SC18190', '#SC16079', '#SC16078', '#SC16077', '#SC16185', '#SC16184', '#SC16273', '#SC16274', '#SC16288', '#SC16094', '#SC16087', '#SC16092', '#SC16093', '#SC16144', '#SC16091', '#SC16272', '#SC16271', '#SC16270', '#SC16238', '#SC16239', '#SC16240', '#SC16241', '#SC16242', '#SC16243', '#SC16229', '#SC16230', '#SC16231', '#SC16232', '#SC16233', '#SC16269', '#SC16268', '#SC16267', '#SC16222', '#SC16223', '#SC16224', '#SC16225', '#SC16226', '#SC16227', '#SC17680', '#SC17622'];
	var emArray106 = [12898, 12899, 12900, 12901, 12902, 12903, 12904, 9819, 12818, 12820, 12819, 12816, 12811, 12815, 12812, 12821, 12813, 12814, 12817, 12823, 10010, 10179, 10180, 12845, 10181, 10182, 10183, 10184, 4894, 3764, 3765, 3767, 3766, 3762, 9173, 9174, 9175, 9176, 9177, 9179, 9180, 9182, 9181, 9184, 9183, 9186, 9185, 9187, 9190, 9189, 9188, 9452, 9453, 9454, 9455, 9460, 9461, 9462, 9463, 9456, 9457, 9458, 9459, 9464, 9467, 9466, 9465, 9468, 9470, 9469, 9471, 9475, 9473, 9474, 9472, 9446, 9447, 9448, 9449, 9450, 9451, 9234, 9235, 9236, 9237, 9238, 9239, 11160, 10861, 10863, 10862, 10860, 10859, 10858, 10936, 10937, 10878, 10879, 10880, 10864, 10865, 10866, 10867, 10876, 10868, 10869, 10870, 10871, 10872, 10873, 10874, 10875, 10950, 10949];
	var lpArray106 = [11291, 8703, 8819, 8941, 4876, 4872, 4874, 8212, 8214, 8216, 8435, 8434, 8436, 8263, 8264, 8265, 10579, 10576, 10578, 10586, 10582, 10586, 10604, 10600, 10602, 10592, 10588, 10590, 10598, 10594, 10596];
	var fmArray106 = [1758, 1749, 1900, 1668, 1669, 1670, 1712, 1679, 1957, 1907, 1926, 1922, 1922, 1925, 1920];
	var soArray106 = [586, 587, 483, 485, 491, 484, 448, 378, 324, 325, 439, 438, 437];
	var ceArray106 = [11046, 11414, 11422, 13564];
	
	var get_url = location.href;
	var mkto_app_url = get_url.slice(0, get_url.indexOf('/', 9));
	
	window.postMessage({
		type : 'DemoMsg',
		text : 'login_success'
	}, mkto_app_url);

	var superBall = document.getElementsByClassName('mkt-app-logo mkt-app-logo-menu');	
	if (superBall.length > 0) {
		var superBallMenu = document.getElementsByClassName('x4-component x4-box-item x4-component-default x4-menu-item');		
		superBall[0].addEventListener('click', function() {
			for (var i = 0; i < superBallMenu.length; i++) {
				if (superBallMenu[i].textContent == 'Calendar') {
					superBallMenu[i].childNodes[0].href = 'https://' + current_pod + '.marketo.com/' + cal_view;
				}
				if (superBallMenu[i].textContent == 'My Marketo') {
					superBallMenu[i].addEventListener('click', function(event) {
						console.log('My Marketo Clicked');						
						update_calendar(cal_view);								
						/*
						console.log(current_pod);
						var marketoCalTile = document.getElementById('canvas-frame').childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[5].childNodes[0].childNodes[0];
						console.log(marketoCalTile);
						marketoCalTile.setAttribute('href', 'https://'+current_pod+'.marketo.com/'+cal_view);					

						//var cal_view = '#CAL0-eyJlZGl0IjoxLCJkdCI6IjIwMTUwMzA4IiwiY3QiOjAsInRhZ3MiOnsic3lzLkVudHJ5U3VidHlwZSI6WyJlbWFpbCIsIndlYmluYXIiLCJudXJ0dXJlX3J1biIsImVtYWlsX3Rlc3QiLCJjYW1wYWlnbl9ydW4iLCJub25lIiwiYjMxYmE2YTYtMDk5Ni00ODMyLWJhZjQtNzk5ODQ3ZGY4YmM4IiwiZXZlbnQiLCIwNWVlZmQ0Yy05OGZiLTRhYjctOTFjZS1hYTE2NWNhZDI0YjkiLCIyNDQ2ODg5MC0yNjEwLTRkMjctYjZlYy05ODVlYjQxNzViOTUiLCI0MTU0MmJiNy1jMzQ0LTQ3NGItODU4Zi1mNGM5YWM1MzcwZjciLCJkZWVjMDkwZC1iY2U0LTQ1MjYtYjYwMy1iMmRhOTc5MzMwNmIiLCIxMzhlZmM1OS02MjU0LTRkNDYtYjdmYi0zZWVjNzA2YTU3ZTMiLCI3YmZiOThkNS05M2IzLTQxMjUtODE5Yy0xZDlkYjMxMzEwYjAiLCI2NDRjOWNiNS0yMjU2LTRlNmMtYjI1YS04ODEzNTE3NGM2MTIiLCI1ZTU4NGQ1Yi04NGI0LTQ2YTctYWIzNi1mMGJmYTE0ZWQ2YzQiXSwic3lzLldvcmtzcGFjZUlkIjpbIjEiXX19';
						var cal_url = 'https://' + current_pod + '.marketo.com/';
						var matchingElements = [];
						var targetEl;
						var allElements = document.getElementsByTagName('a');
						for (var i = 0,
						    n = allElements.length; i < n; i++) {
							if (allElements[i].getAttribute('href')) {
								// Element exists with attribute. Add to array.
								matchingElements.push(allElements[i]);
							}
						}
						var targetElements = Array.prototype.slice.call(matchingElements);
						var cal_hash = '#CAL';
						for (var j = 0,
						    o = targetElements.length; j < o; j++) {
							if (targetElements[j].hash === cal_hash) {
								targetEl = targetElements[j];
								console.log(targetEl);
								targetEl.setAttribute('href', 'https://'+current_pod+'.marketo.com/'+cal_view);
								break;
							}
						}
						*/
					}, false); 
				}
			}
		}, false);
	}
	console.log(domain_s_1.indexOf('https://app-sjp.marketo.com/m'));
	if (domain_s_1.indexOf('https://app-sjp.marketo.com/m') !== 0) {
		if (location.hash !== '#CAL' || location.hash !== '#CALPR') {
			window.Mkt3 && Mkt3.onLaunch(function() {
				protectMarketingActivities(cal_view, scArray106, emArray106, lpArray106, fmArray106, soArray106, ceArray106);
			});	
		}
	}
	if (domain_s_1.indexOf('https://app-sjp.marketo.com/m') == 0) {
		var buttons = Ext4.ComponentQuery.query('button[action=approveAndClose]');
		buttons.forEach(function(button) {
			button.disable();
		});
	}
	if (domain_s_1 == 'https://app-sjp.marketo.com/' || domain_s_1 == 'https://app-sjp.marketo.com/?preview=true&approved=true/') {
		if (domain_s_2 == 'AR1559A1!' || domain_s_2 == 'AR1544A1!' || domain_s_2 == 'AR1682A1!' || domain_s_2 == 'RCM39A1!') {
			loadScript_analyzers();
			loadHtml_analyzers();
			loadStyle_analyzers();
		}
		if (domain_s_2 == 'AR1559A1!') {
			document.getElementById('analyzerPrev').setAttribute('style', 'display: none;');
			document.getElementById('analyzerNext').setAttribute('title', 'Go to the Program Analyzer');
			document.getElementById('analyzerNext').setAttribute('onclick', 'showAnalyzer(1)');
			document.getElementById('analyzerNext').setAttribute('style', 'display: block;');
		}
		if (domain_s_2 == 'AR1544A1!') {
			document.getElementById('analyzerPrev').setAttribute('style', 'display: block;');
			document.getElementById('analyzerPrev').setAttribute('title', 'Go to the Opportunity Analyzer');
			document.getElementById('analyzerPrev').setAttribute('onclick', 'showAnalyzer(0)');
			document.getElementById('analyzerNext').setAttribute('style', 'display: none;');
		}
		if (domain_s_2 == 'RCM39A1!') {
			document.getElementById('analyzerPrev').setAttribute('style', 'display: none;');			
			document.getElementById('analyzerNext').setAttribute('title', 'Go to the Success Path Analyzer');
			document.getElementById('analyzerNext').setAttribute('onclick', 'showAnalyzer(3)');
			document.getElementById('analyzerNext').setAttribute('style', 'display: block;');
		}
		if (domain_s_2 == 'AR1682A1!') {
			document.getElementById('analyzerPrev').setAttribute('style', 'display: block;');
			document.getElementById('analyzerPrev').setAttribute('title', 'Go to the Modeler');
			document.getElementById('analyzerPrev').setAttribute('onclick', 'showAnalyzer(2)');
			document.getElementById('analyzerNext').setAttribute('style', 'display: none;');
		}
	}
	if (get_url == 'https://app-sjp.marketo.com/#MM0A1') {
		window.Mkt3 && Mkt3.onLaunch(function() {
			//setTimeout(update_calendar('href'), 5000);
		});
	}
}
else if (cust_prefix == 'mktodemoaccount106' && isAdminUser == true) {
	demonstrationAdministrator();
}

if (cust_prefix == 'mktodemoaccount106a' && isAdminUser == false) {
	var mkto_live_plugin_state = true;

	var cal_view = '#CAL0-eyJlZGl0IjoxLCJkdCI6IjIwMTUwNDE2IiwiY3QiOjEsInRhZ3MiOnsic3lzLkVudHJ5U3VidHlwZSI6WyJlbWFpbCIsImVtYWlsX2NhbXBhaWduX3J1biIsImV2ZW50Iiwid2ViaW5hciIsIm51cnR1cmVfcnVuIiwiZW1haWxfdGVzdCIsImNhbXBhaWduX3J1biIsIm5vbmUiLCI1ZjE3YjY4MS04NmY2LTQ1NzAtYWZjYi1iMmE2Y2FiMWFjOWUiLCJlYzVjNDFlNS0zMTQ3LTRjMWQtOGZlZi0yNTZkMjI5ZWE4NTIiLCI5Y2UwZTViMi1hZGZmLTRjMmYtOTJiOC02MTI3YmQ3MWYzYzMiLCI5NjViZjMzYS1lOWNlLTRiNzMtODA2Zi1kMzU2ZjUwMjNmN2UiLCI0OGI1ZDhmNy05MTFkLTRlZDktYTNmZi1iNTFiNGNiOTlhZDYiLCIxNWM5ZDVlMi02MDc1LTQ1ZDMtYmYxMi0yNzZhOTk4N2ZlZDYiLCIwNDc1NTQ3YS1lOWEyLTRlOGEtYjU2YS0wMTdhMTVlZjZkZmQiLCI1NThlMGYwYi0yYTQ5LTRiNjEtODZkOS03MGUyMWViNDg5NDkiLCIwNWFhZGQ3NC1mMmE2LTQyNzEtYjY4MC1kYTVjMjRkNzE1ZjkiXSwic3lzLldvcmtzcGFjZUlkIjpbIjEiXX19';
	var scArray106a = ['#SC16962', '#SC16963', '#SC16964', '#SC16965', '#SC16966', '#SC14963', '#SC14949', '#SC14945', '#SC14602', '#SC14603', '#SC15639', '#SC14604', '#SC14605', '#SC5373', '#SC5372', '#SC5370', '#SC5371', '#SC13488', '#SC13496', '#SC14055', '#SC14053', '#SC14056', '#SC14054', '#SC14057', '#SC14058', '#SC13659', '#SC13657', '#SC13660', '#SC13658', '#SC13661', '#SC13662', '#SC13255', '#SC13253', '#SC13257', '#SC13254', '#SC13256', '#SC13258', '#SC13261', '#SC13260', '#SC13259', '#SC16408', '#SC2836', '#SC139', '#SC843', '#SC690', '#SC16890', '#SC16889', '#SC116', '#SC3420', '#SC115', '#SC39', '#SC15', '#SC17', '#SC2006', '#SC2005', '#SC62', '#SC3500', '#SC193', '#SC814', '#SC194', '#SC815', '#SC660', '#SC29', '#SC27', '#SC28', '#SC999', '#SC188', '#SC662', '#SC3498', '#SC16', '#SC252', '#SC251', '#SC772', '#SC3499', '#SC2728', '#SC2729', '#SC2756', '#SC2733', '#SC2760', '#SC3003', '#SC2972', '#SC2765', '#SC2790', '#SC2791', '#SC2792', '#SC2795', '#SC2794', '#SC2845', '#SC2735', '#SC2770', '#SC2747', '#SC2706', '#SC3124', '#SC2470', '#SC137', '#SC187', '#SC1099', '#SC1643', '#SC190', '#SC191', '#SC189', '#SC16079', '#SC16078', '#SC16077', '#SC16185', '#SC16184', '#SC16273', '#SC16274', '#SC16288', '#SC16088', '#SC16094', '#SC16087', '#SC16092', '#SC16093', '#SC16144', '#SC16091', '#SC16272', '#SC16271', '#SC16270', '#SC16238', '#SC16239', '#SC16240', '#SC16241', '#SC16242', '#SC16243', '#SC16228', '#SC16229', '#SC16230', '#SC16231', '#SC16232', '#SC16233', '#SC16269', '#SC16268', '#SC16267', '#SC16222', '#SC16223', '#SC16224', '#SC16225', '#SC16226', '#SC16227'];	
	var emArray106a = [11706, 11705, 11707, 11708, 11709, 11710, 11711, 9819, 10171, 10173, 10172, 10169, 9957, 9974, 9968, 10174, 9972, 9973, 10170, 9962, 10010, 10179, 10180, 10181, 10182, 10183, 10184, 4894, 3764, 3765, 3767, 3766, 3762, 9173, 9174, 9175, 9176, 9177, 9179, 9180, 9182, 9181, 9184, 9183, 9186, 9185, 9187, 9190, 9189, 9188, 9452, 9453, 9454, 9455, 9460, 9461, 9462, 9463, 9456, 9457, 9458, 9459, 9464, 9467, 9466, 9465, 9468, 9470, 9469, 9471, 9475, 9473, 9474, 9472, 9446, 9447, 9448, 9449, 9450, 9451, 9234, 9235, 9236, 9237, 9238, 9239, 11160, 10861, 10863, 10862, 10860, 10859, 10858, 10936, 10937, 10878, 10879, 10880, 10864, 10865, 10866, 10867, 10876, 10868, 10869, 10870, 10871, 10872, 10873, 10874, 10875, 10952, 10954, 10953, 10951, 10950, 10949];
	var lpArray106a = [10454, 8703, 8819, 8941, 4876, 4872, 4874, 8212, 8214, 8216, 8435, 8434, 8436, 8263, 8264, 8265, 10579, 10576, 10578, 10586, 10582, 10584, 10604, 10600, 10602, 10592, 10588, 10590, 10598, 10594, 10596];
	var fmArray106a = [1758, 1749, 1900, 1668, 1669, 1670, 1712, 1679, 1957, 1907, 1926, 1922, 1921, 1925, 1920];
	var soArray106a = [483, 485, 484, 491, 448];
	var ceArray106a = [11046, 11414, 11422, 13564];

	var get_url = location.href;
	var mkto_app_url = get_url.slice(0, get_url.indexOf('/', 9));
	
	window.postMessage({
		type : 'DemoMsg',
		text : 'login_success'
	}, mkto_app_url);
	
	var superBall = document.getElementsByClassName('mkt-app-logo mkt-app-logo-menu');	
	if (superBall.length > 0) {
		var superBallMenu = document.getElementsByClassName('x4-component x4-box-item x4-component-default x4-menu-item');
		superBall[0].addEventListener('click', function() {
			for (var i = 0; i < superBallMenu.length; i++) {
				if (superBallMenu[i].textContent == 'Calendar') {
					superBallMenu[i].childNodes[0].href = 'https://' + current_pod + '.marketo.com/' + cal_view;
				}
				if (superBallMenu[i].textContent == 'My Marketo') {
					superBallMenu[i].addEventListener('click', function(event) {
						console.log('My Marketo Clicked');
						
						setTimeout(update_calendar(cal_view), 1000);								
						/*
						console.log(current_pod);
						var marketoCalTile = document.getElementById('canvas-frame').childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[5].childNodes[0].childNodes[0];
						console.log(marketoCalTile);
						marketoCalTile.setAttribute('href', 'https://'+current_pod+'.marketo.com/'+cal_view);					

						//var cal_view = '#CAL0-eyJlZGl0IjoxLCJkdCI6IjIwMTUwMzA4IiwiY3QiOjAsInRhZ3MiOnsic3lzLkVudHJ5U3VidHlwZSI6WyJlbWFpbCIsIndlYmluYXIiLCJudXJ0dXJlX3J1biIsImVtYWlsX3Rlc3QiLCJjYW1wYWlnbl9ydW4iLCJub25lIiwiYjMxYmE2YTYtMDk5Ni00ODMyLWJhZjQtNzk5ODQ3ZGY4YmM4IiwiZXZlbnQiLCIwNWVlZmQ0Yy05OGZiLTRhYjctOTFjZS1hYTE2NWNhZDI0YjkiLCIyNDQ2ODg5MC0yNjEwLTRkMjctYjZlYy05ODVlYjQxNzViOTUiLCI0MTU0MmJiNy1jMzQ0LTQ3NGItODU4Zi1mNGM5YWM1MzcwZjciLCJkZWVjMDkwZC1iY2U0LTQ1MjYtYjYwMy1iMmRhOTc5MzMwNmIiLCIxMzhlZmM1OS02MjU0LTRkNDYtYjdmYi0zZWVjNzA2YTU3ZTMiLCI3YmZiOThkNS05M2IzLTQxMjUtODE5Yy0xZDlkYjMxMzEwYjAiLCI2NDRjOWNiNS0yMjU2LTRlNmMtYjI1YS04ODEzNTE3NGM2MTIiLCI1ZTU4NGQ1Yi04NGI0LTQ2YTctYWIzNi1mMGJmYTE0ZWQ2YzQiXSwic3lzLldvcmtzcGFjZUlkIjpbIjEiXX19';
						var cal_url = 'https://' + current_pod + '.marketo.com/';
						var matchingElements = [];
						var targetEl;
						var allElements = document.getElementsByTagName('a');
						for (var i = 0,
						    n = allElements.length; i < n; i++) {
							if (allElements[i].getAttribute('href')) {
								// Element exists with attribute. Add to array.
								matchingElements.push(allElements[i]);
							}
						}
						var targetElements = Array.prototype.slice.call(matchingElements);
						var cal_hash = '#CAL';
						for (var j = 0,
						    o = targetElements.length; j < o; j++) {
							if (targetElements[j].hash === cal_hash) {
								targetEl = targetElements[j];
								console.log(targetEl);
								targetEl.setAttribute('href', 'https://'+current_pod+'.marketo.com/'+cal_view);
								break;
							}
						}
						*/
					}, false); 
				}
			}
		}, false);
	}

	if (domain_s_1.indexOf('https://app-ab07.marketo.com/m') !== 0) {
		if (location.hash !== '#CAL' || location.hash !== '#CALPR') {
			window.Mkt3 && Mkt3.onLaunch(function() {
				protectMarketingActivities(cal_view, scArray106a, emArray106a, lpArray106a, fmArray106a, soArray106a, ceArray106a);
			});	
		}		
	}
	if (domain_s_1.indexOf('https://app-ab07.marketo.com/m') !== 0) {
		var buttons = Ext4.ComponentQuery.query('button[action=approveAndClose]');
		buttons.forEach(function(button) {
			button.disable();
		});
	}
	if (domain_s_1 == 'https://app-ab07.marketo.com/' || domain_s_1 == 'https://app-ab07.marketo.com/?preview=true&approved=true/') {
		if (domain_s_2 == 'AR1559A1!' || domain_s_2 == 'AR1544A1!' || domain_s_2 == 'AR1682A1!' || domain_s_2 == 'RCM5A1!') {
			loadScript_analyzers();
			loadHtml_analyzers();
			loadStyle_analyzers();
		}
		if (domain_s_2 == 'AR1559A1!') {
			document.getElementById('analyzerPrev').setAttribute('style', 'display: none;');
			document.getElementById('analyzerNext').setAttribute('title', 'Go to the Program Analyzer');
			document.getElementById('analyzerNext').setAttribute('onclick', 'showAnalyzer(1)');
			document.getElementById('analyzerNext').setAttribute('style', 'display: block;');
		}
		if (domain_s_2 == 'AR1544A1!') {
			document.getElementById('analyzerPrev').setAttribute('style', 'display: block;');
			document.getElementById('analyzerPrev').setAttribute('title', 'Go to the Opportunity Analyzer');
			document.getElementById('analyzerPrev').setAttribute('onclick', 'showAnalyzer(0)');
			document.getElementById('analyzerNext').setAttribute('style', 'display: none;');
		}
		if (domain_s_2 == 'RCM5A1!') {
			document.getElementById('analyzerPrev').setAttribute('style', 'display: none;');			
			document.getElementById('analyzerNext').setAttribute('title', 'Go to the Success Path Analyzer');
			document.getElementById('analyzerNext').setAttribute('onclick', 'showAnalyzer(3)');
			document.getElementById('analyzerNext').setAttribute('style', 'display: block;');
		}
		if (domain_s_2 == 'AR1682A1!') {
			document.getElementById('analyzerPrev').setAttribute('style', 'display: block;');
			document.getElementById('analyzerPrev').setAttribute('title', 'Go to the Modeler');
			document.getElementById('analyzerPrev').setAttribute('onclick', 'showAnalyzer(2)');
			document.getElementById('analyzerNext').setAttribute('style', 'display: none;');
		}
	}
	if (get_url == 'https://app-ab07.marketo.com/#MM0A1') {
		window.Mkt3 && Mkt3.onLaunch(function() {
			//setTimeout(update_calendar, 5000);
		});
	}
}
else if (cust_prefix == 'mktodemoaccount106a' && isAdminUser == true) {
	demonstrationAdministrator();
}

if (cust_prefix == 'mktodemoaccount106b' && isAdminUser == false) {
	var mkto_live_plugin_state = true;
	
	var cal_view = '#CAL0-eyJlZGl0IjoxLCJkdCI6IjIwMTUwNDE3IiwiY3QiOjEsInRhZ3MiOnsic3lzLkVudHJ5U3VidHlwZSI6WyJlbWFpbCIsImVtYWlsX2NhbXBhaWduX3J1biIsIm5vbmUiLCJjYW1wYWlnbl9ydW4iLCJlbWFpbF90ZXN0IiwiYjJjNzE3NDUtNGU0Yi00NmY1LWFkZGYtYzBkNjQ0ZTM1OTI5IiwiY2UyNzBlOTItNDQ5YS00Mjk5LWFhMDktMTk3NzM3MmRkN2ViIiwiZTQ4OThlZTQtZWI0MS00OWUxLWJjNzMtMWZhMzYzMDE1MzlkIiwiNTI3NmU2MDctMDIyMC00ODIwLWJmNWQtOGQ1ZjQ0YmIyODUyIiwiNGRjMDhjMTctN2NjZS00ZWM0LWJiMzQtNDJkNTI3NmMxZjE0IiwiZTM4M2FkNTYtMWE3Yy00ZjcyLTllYmItOGVhMWVmNGM1ZjNmIiwiMGFlNDFhNzYtNjZmNi00Y2FiLTg5ZDEtYTAxZTI4MzQ4NThhIiwiNGY2YTI5MWEtODFhMi00YTJlLWJhYmEtMjRhOTU0MjIwOWEwIiwiNDNmNjM1OWMtNzA3My00MDYzLThlNzgtNmVhN2RkNTM1ZWY1IiwiZXZlbnQiLCJ3ZWJpbmFyIiwibnVydHVyZV9ydW4iXSwic3lzLldvcmtzcGFjZUlkIjpbIjEiXX19';
	var scArray106b = ['#SC16962', '#SC16963', '#SC16964', '#SC16965', '#SC16966', '#SC14963', '#SC14949', '#SC14945', '#SC14602', '#SC14603', '#SC15639', '#SC14604', '#SC14605', '#SC5373', '#SC5372', '#SC5370', '#SC5371', '#SC13488', '#SC13496', '#SC14055', '#SC14053', '#SC14056', '#SC14054', '#SC14057', '#SC14058', '#SC13659', '#SC13657', '#SC13660', '#SC13658', '#SC13661', '#SC13662', '#SC13255', '#SC13253', '#SC13257', '#SC13254', '#SC13256', '#SC13258', '#SC13261', '#SC13260', '#SC13259', '#SC16408', '#SC2836', '#SC139', '#SC843', '#SC690', '#SC16890', '#SC16889', '#SC116', '#SC3420', '#SC115', '#SC39', '#SC15', '#SC17', '#SC2006', '#SC2005', '#SC62', '#SC3500', '#SC193', '#SC814', '#SC194', '#SC815', '#SC660', '#SC29', '#SC27', '#SC28', '#SC999', '#SC188', '#SC662', '#SC3498', '#SC16', '#SC252', '#SC251', '#SC772', '#SC3499', '#SC2728', '#SC2729', '#SC2756', '#SC2733', '#SC2760', '#SC3003', '#SC2972', '#SC2765', '#SC2790', '#SC2791', '#SC2792', '#SC2795', '#SC2794', '#SC2845', '#SC2735', '#SC2770', '#SC2747', '#SC2706', '#SC3124', '#SC2470', '#SC137', '#SC187', '#SC1099', '#SC1643', '#SC190', '#SC191', '#SC189', '#SC16079', '#SC16078', '#SC16077', '#SC16185', '#SC16184', '#SC16273', '#SC16274', '#SC16288', '#SC16088', '#SC16094', '#SC16087', '#SC16092', '#SC16093', '#SC16144', '#SC16091', '#SC16272', '#SC16271', '#SC16270', '#SC16238', '#SC16239', '#SC16240', '#SC16241', '#SC16242', '#SC16243', '#SC16228', '#SC16229', '#SC16230', '#SC16231', '#SC16232', '#SC16233', '#SC16269', '#SC16268', '#SC16267', '#SC16222', '#SC16223', '#SC16224', '#SC16225', '#SC16226', '#SC16227'];
	var emArray106b = [9819, 10010, 10179, 10180, 10181, 10182, 10183, 10184, 4894, 3764, 3765, 3767, 3766, 3762, 9173, 9174, 9175, 9176, 9177, 9179, 9180, 9182, 9181, 9184, 9183, 9186, 9185, 9187, 9190, 9189, 9188, 9452, 9453, 9454, 9455, 9460, 9461, 9462, 9463, 9456, 9457, 9458, 9459, 9464, 9467, 9466, 9465, 9468, 9470, 9469, 9471, 9475, 9473, 9474, 9472, 9446, 9447, 9448, 9449, 9450, 9451, 9234, 9235, 9236, 9237, 9238, 9239, 11160, 10861, 10863, 10862, 10860, 10859, 10858, 10936, 10937, 10878, 10879, 10880, 10864, 10865, 10866, 10867, 10876, 10868, 10869, 10870, 10871, 10872, 10873, 10874, 10875, 10950, 10949];	
	var lpArray106b = [8703, 8819, 8941, 4876, 4872, 4874, 8212, 8214, 8216, 8435, 8434, 8436, 8263, 8264, 8265, 10579, 10576, 10578, 10586, 10582, 10584, 10604, 10600, 10602, 10592, 10588, 10590, 10598, 10594, 10596];	
	var fmArray106b = [1758, 1749, 1900, 1668, 1669, 1670, 1712, 1679, 1957, 1907, 1926, 1922, 1921, 1925, 1920];
	var soArray106b = [483, 485, 484, 491, 448];	
	var ceArray106b = [11046, 11414, 11422, 13564];
	
	var get_url = location.href;
	var mkto_app_url = get_url.slice(0, get_url.indexOf('/', 9));
	window.postMessage({
		type : 'DemoMsg',
		text : 'login_success'
	}, mkto_app_url);
	console.log(domain_s_1);
	
	var superBall = document.getElementsByClassName('mkt-app-logo mkt-app-logo-menu');
	//console.log(superBall);
	if (superBall.length > 0) {
		var superBallMenu = document.getElementsByClassName('x4-component x4-box-item x4-component-default x4-menu-item');
		superBall[0].addEventListener('click', function() {
			for (var i = 0; i < superBallMenu.length; i++) {
				if (superBallMenu[i].textContent == 'Calendar') {
					superBallMenu[i].childNodes[0].href = 'https://' + current_pod + '.marketo.com/' + cal_view;
				}
				if (superBallMenu[i].textContent == 'My Marketo') {
					superBallMenu[i].addEventListener('click', function(event) {
						console.log('My Marketo Clicked');
						
						setTimeout(update_calendar(cal_view), 1000);								
						/*
						console.log(current_pod);
						var marketoCalTile = document.getElementById('canvas-frame').childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[5].childNodes[0].childNodes[0];
						console.log(marketoCalTile);
						marketoCalTile.setAttribute('href', 'https://'+current_pod+'.marketo.com/'+cal_view);					

						//var cal_view = '#CAL0-eyJlZGl0IjoxLCJkdCI6IjIwMTUwMzA4IiwiY3QiOjAsInRhZ3MiOnsic3lzLkVudHJ5U3VidHlwZSI6WyJlbWFpbCIsIndlYmluYXIiLCJudXJ0dXJlX3J1biIsImVtYWlsX3Rlc3QiLCJjYW1wYWlnbl9ydW4iLCJub25lIiwiYjMxYmE2YTYtMDk5Ni00ODMyLWJhZjQtNzk5ODQ3ZGY4YmM4IiwiZXZlbnQiLCIwNWVlZmQ0Yy05OGZiLTRhYjctOTFjZS1hYTE2NWNhZDI0YjkiLCIyNDQ2ODg5MC0yNjEwLTRkMjctYjZlYy05ODVlYjQxNzViOTUiLCI0MTU0MmJiNy1jMzQ0LTQ3NGItODU4Zi1mNGM5YWM1MzcwZjciLCJkZWVjMDkwZC1iY2U0LTQ1MjYtYjYwMy1iMmRhOTc5MzMwNmIiLCIxMzhlZmM1OS02MjU0LTRkNDYtYjdmYi0zZWVjNzA2YTU3ZTMiLCI3YmZiOThkNS05M2IzLTQxMjUtODE5Yy0xZDlkYjMxMzEwYjAiLCI2NDRjOWNiNS0yMjU2LTRlNmMtYjI1YS04ODEzNTE3NGM2MTIiLCI1ZTU4NGQ1Yi04NGI0LTQ2YTctYWIzNi1mMGJmYTE0ZWQ2YzQiXSwic3lzLldvcmtzcGFjZUlkIjpbIjEiXX19';
						var cal_url = 'https://' + current_pod + '.marketo.com/';
						var matchingElements = [];
						var targetEl;
						var allElements = document.getElementsByTagName('a');
						for (var i = 0,
						    n = allElements.length; i < n; i++) {
							if (allElements[i].getAttribute('href')) {
								// Element exists with attribute. Add to array.
								matchingElements.push(allElements[i]);
							}
						}
						var targetElements = Array.prototype.slice.call(matchingElements);
						var cal_hash = '#CAL';
						for (var j = 0,
						    o = targetElements.length; j < o; j++) {
							if (targetElements[j].hash === cal_hash) {
								targetEl = targetElements[j];
								console.log(targetEl);
								targetEl.setAttribute('href', 'https://'+current_pod+'.marketo.com/'+cal_view);
								break;
							}
						}
						*/
					}, false); 
				}
			}
		}, false);
	}

	if (domain_s_1.indexOf('https://app-ab08.marketo.com/m') !== 0) {
		if (location.hash !== '#CAL' || location.hash !== '#CALPR') {
			window.Mkt3 && Mkt3.onLaunch(function() {
				protectMarketingActivities(cal_view, scArray106b, emArray106b, lpArray106b, fmArray106b, soArray106b, ceArray106b);
			});	
		}		
	}
	if (domain_s_1.indexOf('https://app-ab08.marketo.com/m') !== 0) {
		var buttons = Ext4.ComponentQuery.query('button[action=approveAndClose]');
		buttons.forEach(function(button) {
			button.disable();
		});
	}
	if (domain_s_1 == 'https://app-ab08.marketo.com/' || domain_s_1 == 'https://app-ab08.marketo.com/?preview=true&approved=true/') {
		if (domain_s_2 == 'AR1559A1!' || domain_s_2 == 'AR1544A1!' || domain_s_2 == 'AR1682A1!' || domain_s_2 == 'RCM5A1!') {
			console.log('Boom!');
			loadScript_analyzers();
			loadHtml_analyzers();
			loadStyle_analyzers();
		}
		if (domain_s_2 == 'AR1559A1!') {
			document.getElementById('analyzerPrev').setAttribute('style', 'display: none;');
			document.getElementById('analyzerNext').setAttribute('title', 'Go to the Program Analyzer');
			document.getElementById('analyzerNext').setAttribute('onclick', 'showAnalyzer(1)');
			document.getElementById('analyzerNext').setAttribute('style', 'display: block;');
		}
		if (domain_s_2 == 'AR1544A1!') {
			document.getElementById('analyzerPrev').setAttribute('style', 'display: block;');
			document.getElementById('analyzerPrev').setAttribute('title', 'Go to the Opportunity Analyzer');
			document.getElementById('analyzerPrev').setAttribute('onclick', 'showAnalyzer(0)');
			document.getElementById('analyzerNext').setAttribute('style', 'display: none;');
		}
		if (domain_s_2 == 'RCM5A1!') {
			document.getElementById('analyzerPrev').setAttribute('style', 'display: none;');			
			document.getElementById('analyzerNext').setAttribute('title', 'Go to the Success Path Analyzer');
			document.getElementById('analyzerNext').setAttribute('onclick', 'showAnalyzer(3)');
			document.getElementById('analyzerNext').setAttribute('style', 'display: block;');
		}
		if (domain_s_2 == 'AR1682A1!') {
			document.getElementById('analyzerPrev').setAttribute('style', 'display: block;');
			document.getElementById('analyzerPrev').setAttribute('title', 'Go to the Modeler');
			document.getElementById('analyzerPrev').setAttribute('onclick', 'showAnalyzer(2)');
			document.getElementById('analyzerNext').setAttribute('style', 'display: none;');
		}
	}
	if (get_url == 'https://app-ab08.marketo.com/#MM0A1') {
		window.Mkt3 && Mkt3.onLaunch(function() {
			setTimeout(update_calendar(cal_view), 5000);
		});
	}
}
else if (cust_prefix == 'mktodemoaccount106b' && isAdminUser == true) {
	demonstrationAdministrator();
}

if (cust_prefix == 'mktodemoaccount106' || cust_prefix == 'mktodemoaccount106a' || cust_prefix == 'mktodemoaccount106b') {
	var jscript_lib = document.createElement('script');
	jscript_lib.setAttribute('type', 'text/javascript');
	jscript_lib.setAttribute('src', '//marketolive.com/plugin/demo_ready.js');
	document.getElementsByTagName('head')[0].appendChild(jscript_lib);
}
console.log('Sales Script Loading Complete');
