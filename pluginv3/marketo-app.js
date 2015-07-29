/**************************************************************************************
 *
 *  This script contains all of the functionality needed for the manipulation of the 
 *  Marekto App and handles the overwriting needed to overlay the MarketoLive 
 *  functionality onto the Marketo App. It is loaded by the MarketoLive plugin and 
 *  is responsible for the manipulation of the Marketo GUI.
 *
 *  @Author Andy, Arrash, Brian
 *
 *  @namespace
 *
 **************************************************************************************/
console.log("Marketo App > Running");

/**************************************************************************************
 *
 *  Global Constants
 *
 **************************************************************************************/

var currentUrl = window.location.href,
    mktoAppDomain = "^https:\/\/app-[a-z0-9]+\.marketo\.com",
	mktoAppMatch = "https://app-*.marketo.com",
    mktoLoginDomain = "^https:\/\/login\.marketo\.com",
    mktoAppLoginDomain = "^https:\/\/app\.marketo\.com",
    mktoDesignerDomain = "^https:\/\/[a-z0-9]+-[a-z0-9]+\.marketodesigner\.com",
	mktoDesignerMatch = "https://*.marketodesigner.com/*",
    mktoEmailDesigner = mktoDesignerDomain + "/ds",
    mktoLandingPageDesigner = mktoDesignerDomain + "/lpeditor/",
    mktoWizard = mktoAppDomain + "/m#",
    rtpDemoDomain = "^http:\/\/sjrtp1.marketo.com\/demo\/$|^http:\/\/cloud4.insightera.com\/demo\/$",
    emailDeliverabilityDomain = "^https:\/\/250ok.com/",
	mktoMyMarketoFragment = "MM0A1",
	mktoEmailDesignerFragment = "EME",
	mktoLandingPageDesignerFragment = "LPE",
	mktoFormWizardFragment = "FOE",
	mktoMobilePushNotificationWizardFragment = "MPNE",
	mktoSocialAppWizardFragment = "SOAE",
    isMktoLiveInstance = false,
	pod;

var APP = APP || {};

/**************************************************************************************
 *  
 *  This function gets the cookie for the specified user pod.
 *
 *  @Author Andy
 *
 *  @function
 *
 *  @param {String} cookieField - Represents the user's pod.
 *
 **************************************************************************************/

APP.getCookie = function(cookieField) {
	console.log ("Marketo App > Getting: Cookie");
	
	var name = cookieField + "=",
	cookies = document.cookie.split(';'),
	currentCookie;
	for (var ii = 0; ii < cookies.length; ++ii) {
		var currentCookie = cookies[ii].trim();
		if (currentCookie.indexOf(name) == 0) {
			return currentCookie.substring(name.length, currentCookie.length);
		}
	}
	return null;
}

/**************************************************************************************
 *  
 *  This function disables the demo plugin check.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.disableDemoPluginCheck = function() {
	console.log("Marketo App > Disabling: Demo Plugin Check");
	
	MktPage.validateDemoPlugin = function() {};
	isMktoLiveInstance = true;
}

/**************************************************************************************
 *  
 *  This function disables the system error message for sync errors on Landing Pages.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.disableSystemErrorMessage = function() {
	console.log("Marketo App > Disabling: System Error Message");
	
	MktMessage.showSystemError = function() {};
}

/**************************************************************************************
 *  
 *  This function overrides the target link for the Deliverability Tools tile.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.overrideDeliverabilityToolsTile = function() {
	console.log("Marketo App > Overriding: Deliverability Tools Tile");
	
	document.getElementById("homeTile-1036-btnEl").href = "https://250ok.com/login";
}

/**************************************************************************************
 *  
 *  This function enables saving of Smart Campaigns.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.enableSmartCampaignSaving = function() {
	console.log("Marketo App > Enabling: Saving for Smart Campaigns");

	Mkt.widgets.DataPanelManager.prototype.save = function (cause, dp, acceptUpdates) {
		this._updateDataPanelOrder(true);

		if (this.saveQueue.blockingSaveInProgress) {
			this.saveQueue.pendingChangesCount++;
			this.saveQueue.dataPanelMetas = this._serializeDataPanels();
			this.saveQueue.dataPanelCount = this.countDataPanels();
			return;
		}

		var dataPanelMetas;
		if (this.saveQueue.dataPanelMetas) {
			dataPanelMetas = this.saveQueue.dataPanelMetas;
		}
		else {
			dataPanelMetas = this._serializeDataPanels();
		}

		this.saveQueue.pendingChangesCount = 0;
		this.saveQueue.dataPanelMetas = null;
		this.saveQueue.dataPanelCount = 0;

		if (dataPanelMetas === null) {
			return;
		}

		if (dataPanelMetas.length === 0
		&& this.isFlow) {
		}

		if (this.dpSubtype != DPConst.RUN_ACTION
		&& dataPanelMetas) {
			if (this.lastSave.dataPanelMetas
			&& this.lastSave.dataPanelMetas == dataPanelMetas) {
				return;
			}
			else if (this.lastSave.dataPanelMetasUpdated
			&& this.lastSave.dataPanelMetasUpdated == dataPanelMetas) {
				return;
			}
		}

		console.debug('Saving ' + this.dpType + ':', MktFormat.formatJsonStr(dataPanelMetas));
		if (DPDEBUG) {
			console.debug('Current Save:', dataPanelMetas);
			if (this.lastSave.dataPanelMetas) {
				console.debug('Previous Save:', this.lastSave.dataPanelMetas);
			}
			if (this.lastSave.dataPanelMetasUpdated) {
				console.debug('Previous Update:', this.lastSave.dataPanelMetasUpdated);
			}
		}

		this.lastSave.acceptUpdates = acceptUpdates;
		this.lastSave.dataPanelMetas = dataPanelMetas;
		this.saveQueue.blockingSaveInProgress = true;
		this.beforeSaveMessage();

		var params = Ext.apply({dataPanelMetas: dataPanelMetas, accessZoneId: this.accessZoneId}, this.baseSaveParams);

		if (this.isSmartlist
		&& this.smartListRuleLogic.customMode()) {
			if (this.smartListRuleLogic.isCustomLogicValid()) {
				var smartListLogicParams = this.smartListRuleLogic.getSmartListLogicSaveParams();
				Ext.apply(params, smartListLogicParams);
		}
			else {
				console.debug('Data panel save successful. Custom rule logic is not valid');
			}
		}

		params[this.appVarsBase+'Id'] =  this.dataPanelStorageId;
		this.beforeSaveHook();
		if (DPDEBUG) {
			console.debug("Saving... ", params);
		}
		MktSession.ajaxRequest(this.saveAction, {
			serializeParms: params,
			onMySuccess:   this.saveSuccess.createDelegate(this),
			onMyFailure:   this.saveFailure.createDelegate(this)
		});
	}
}

/**************************************************************************************
 *  
 *  This function disables saving of Smart Campaigns while maintaining the correct 
 *  order of the steps (the previous bug where a flow step shows as 'undefined' has 
 *  been eradicated).
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.disableSmartCampaignSaving = function() {
    console.log("Marketo App > Disabling: Saving for Smart Campaigns");

    Mkt.widgets.DataPanelManager.prototype.save =
        function(cause, dp, acceptUpdates) {
            this._updateDataPanelOrder(true);
        }
}

/**************************************************************************************
 *  
 *  This function enables the Smart List and Flow Canvases for Smart Campaigns.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.enableSmartCampaignCanvas = function() {
	console.log("Marketo App > Enabling: Smart Campaign Canvases");
	
	Mkt.widgets.DataPanelLayout.prototype.initComponent = function () {
		this.dpEditable = true;
		DPDEBUG = false;
		
		if (this.dpSubtype) {
			this.addClass('mktDataPanelLayout-'+this.dpSubtype);
		}
		
		if (this.canvas) {
			MktCanvas.mask(this.canvas);
		}

		if (this.dpType == 'Smartlist' ) {
			this.isSmartlist = true;
			this.Flow = false;
			this.SETTINGS = 'conditions';
		}
		else if (this.dpType == 'Flow') {
			this.isSmartlist = false;
			this.isFlow = true;
			this.SETTINGS = 'actions';
		}

		this.items = [];
		this.items.push({
			region: 'center',
			margins: !MktPage.isFeatureEnabled('carbolt') ? '7 5 10 10' : '',
			layout: 'fit',
			items: this.createManager()
		});

		if (this.dpEditable && this.canvas && this.paletteWidth > 0) {
			this.canvasWidth = MktCanvas.getWidth();
			var availableWidth = Math.min(this.canvasWidth-700, this.maxPaletteWidth);
			this.paletteWidth= Math.max(this.paletteWidth, availableWidth);

			this.items.push({
				cls: 'mktEastPanel',
				region: 'east',
				margins: !MktPage.isFeatureEnabled('carbolt') ? '5 5 5 8' : '0 0 0 15',
				layout: 'fit',
				width: this.paletteWidth,
				items: this.createPalette()
			});
		}

		Mkt.widgets.DataPanelLayout.superclass.initComponent.apply(this);

		if (this.canvas) {
			MktPage.canvasCleanupStack.push(this.canvasCleanup.createDelegate(this));
		}

		if (this.canvas) {
			this.extendCanvasToolbar();
		}
		
		if (this.canvas) {
			this.extendCanvasGutter();
		}

		if (this.canvas) {
			MktCanvas.addHook(this.canvas, {dp: this});
		}
	}
}

/**************************************************************************************
 *  
 *  This function discards Landing Page drafts in DIY Design only.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {String[]} lpIds - The Mkto IDs for the Landing Pages to discard.
 *
 **************************************************************************************/

APP.discardLandingPageDrafts = function(lpIds) {
    console.log("Marketo App > Discarding: Landing Page Drafts");
	
	var lpMessageBox = Ext.MessageBox.show({
		title : "MarketoLive",
		msg : "Discarding Landing Page Drafts",
		progress : false,
		wait : false,
		width : 270,
		closable : false
	});
    mktLPLManager.doModifyPages('revert', lpIds);
	lpMessageBox.hide();
}

/**************************************************************************************
 *  
 *  This function disables the Program actions menu items: New Smart Campaign, New 
 *  Local Asset, New Folder, and Delete.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.disableProgramActionsMenu = function() {
	console.log("Marketo App > Disabling: Program Actions Menu");
	
	var previousMenu = MktMaMenu.preShowProgramActionsMenu;
	MktMaMenu.preShowProgramActionsMenu = function(menu, attr) {
		previousMenu.apply(this, arguments);
		var mItems = menu.items,
		canvas = MktCanvas.getActiveTab(),
		disable = attr.accessZoneId == 1 || !attr.accessZoneId && canvas && canvas.config && canvas.config.accessZoneId && canvas.config.accessZoneId == 1,
		itemsToDisable = ['createProgramFolder',
						  'convertToArchiveFolder',
						  'convertToCampaignFolder',
						  'shareProgramFolder',
						  'renameProgramFolder',
						  'deleteProgramFolder',
						  'newSmartCampaign',
						  'scActivate',
						  'scArchive',
						  //'scClone',
						  'scAbort',
						  'scAbort',
						  'scMove',
						  'deleteMarketingEvent',
						  'createNewMarketingProgram',
						  'newLocalAsset',
						  'deleteMarketingProgram',
						  'deleteNurtureProgram',
						  'deleteEmailBatchProgram'];
		itemsToDisable.forEach(function(itemToDisable) {
			var item = mItems.get(itemToDisable);
			if (item) {
				item.setDisabled(disable);
			}
		});
		return menu;
	}
	
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
	}
}

/**************************************************************************************
 *  
 *  This function limits each Workspace to 3 Nurture Programs.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.limitNurturePrograms = function() {
	console.log("Marketo App > Limiting: Nurture Programs");
	
    var previousMarketingEventForm = Mkt.apps.marketingEvent.MarketingEventForm.prototype.beforeSubmitCallback;
    Mkt.apps.marketingEvent.MarketingEventForm.prototype.beforeSubmitCallback = function() {
        var limit_exceeded = false,
            rootNode = MktExplorer.boundTree.root,
            compType = "Nurture Program",
            matches = [],
            node = rootNode.cascade(function() {
                var attr = this.attributes;
                if (attr && attr.xtra) {
                    if (attr.xtra.compType == compType
					&& attr.xtra.accessZoneId == MktCanvas.activeTab.config.accessZoneId) {
						matches.push(this);
					}
                }
            },
			undefined,
			[compType]);
			
        if (matches.length >= 3) {
            limit_exceeded = true;
        }
		
        if (limit_exceeded == true) {
            var nutureProgramMessageBox = Ext.MessageBox.show({
                title: "MarketoLive",
                msg: "Individual workspaces are limited to 3 nurture programs.",
                width: 400,
                closable: true
            });
            //setTimeout(nutureProgramMessageBox.show, 1000);
			nutureProgramMessageBox.show;
            return false;
        }
		else {
            return previousMarketingEventForm.apply(this, arguments);
        }
    }
}

/**************************************************************************************
 *
 *  This function contains the control logic for injecting the Analyzer Navigation Bar 
 *  and is the callback function for window.onhashchange.
 *
 *  @Author Andy
 *
 *  @function
 *
 **************************************************************************************/

APP.injectAnalyzerNavBar = function() {
    console.log("Marketo App > Injecting: Analyzer Navigation Bar");
		
	if (typeof(pod) == "undefined") {
		//pod = new PODS.Pod(PODS.getCookie("userPod"));
		pod = new PODS.Pod("app-sjp");
	}
	
	for (var y = 0; y < pod.valueSet.length; y++) {
		if (currentUrl == pod.valueSet[y].url) {
			APP.updateCSS(pod, pod.valueSet[y].position);
		}
	}
}

/**************************************************************************************
 *
 *  This function will update all the CSS around the div that is selected in the 
 *  container via jquery functions to get the parent and the siblings related to the 
 *  current position and the parent
 *
 *  @Author Arrash
 *
 *  @function
 *
 *  @param {Object} pod - The object containing the user's pod.
 *  @param {Integer} position - The current URL position.
 *
 *  @namespace currentPosition
 *
 **************************************************************************************/

APP.updateCSS = function(pod, position) {
	console.log("Marketo App > Updating: CSS for Analyzer Navigation Bar");
	
    $j = jQuery.noConflict();
    var currentPosition = '#' + position;
    $j(currentPosition).parent().css('display', 'block');
    $j(currentPosition).parent().siblings().css('display', 'none');
    $j(currentPosition).removeClass('analyzer-button').addClass('analyzer-title');
    $j(currentPosition).siblings().removeClass('analyzer-title').addClass('analyzer-button');
    $j("#modeler,#success-path-analyzer,#opportunity-influence-analyzer,#program-analyzer").bind("click", function(e) {
        APP.identifyAnalyzer(e.target, pod);
    });
}

/**************************************************************************************
 *
 *  This function listens for the user clicking on a specific div in the template, then 
 *  directs them to the correct URL.
 *
 *  @Author Arrash
 *
 *  @function
 *
 *  @param {DOM} element - The element that was clicked on the Analyzer Navigation Bar.
 *  @param {Object) pod - The object containing the user's pod.
 *
 **************************************************************************************/

APP.identifyAnalyzer = function(element, pod) {
	console.log("Marketo App > Identifying: Current Analyzer");
	
    var currPosition;
    //Updates the currPosition based on the div selected
    for (var x = 0; x < pod.valueSet.length; x++) {
        if (element.id == pod.valueSet[x].position)
            currPosition = x;
    }
    window.location = pod.valueSet[currPosition].url;
}

/**************************************************************************************
 *  
 *  This function enables saving for the Editors (emails, forms, push notifications, 
 *  and social apps).
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.enableEditorSaving = function() {
	console.log("Marketo App > Enabling: Saving for Editors");
	
	Mkt3.data.Store.prototype.sync = function() {
		if (this.autoSyncSuspended) {
			this.autoSync = true;
			this.autoSyncSuspended = false;
		}
    
		if (this.getProxy() instanceof Mkt3.data.proxy.AjaxPost) {
			Mkt3.Synchronizer.sync(this);
		}

		else {
			this.callParent(arguments);
		}
	}
	
	Ext4.data.Model.prototype.destroy = function(options) {
		options = Ext.apply({
			records: [this],
			action : 'destroy'
		}, options);

		var me = this,
			isNotPhantom = me.phantom !== true,
			scope  = options.scope || me,
			stores = me.stores,
			i = 0,
			storeCount,
            store,
            args,
            operation,
            callback;

        operation = new Ext.data.Operation(options);

        callback = function(operation) {
			args = [me, operation];
            if (operation.wasSuccessful()) {
                for (storeCount = stores.length; i < storeCount; i++) {
                    store = stores[i];
                    store.remove(me, true);
                    if (isNotPhantom) {
                        store.fireEvent('write', store, operation);
                    }
                }
                me.clearListeners();
                Ext.callback(options.success, scope, args);
            }
			else {
                Ext.callback(options.failure, scope, args);
            }
            Ext.callback(options.callback, scope, args);
        };
		
        if (isNotPhantom) {
            me.getProxy().destroy(operation, callback, me);
        }
        else {
            operation.complete = operation.success = true;
            operation.resultSet = me.getProxy().reader.nullResultSet;
            callback(operation);
        }
        return me;
    }
}

/**************************************************************************************
 *  
 *  This function disables saving for the Editors (emails, forms, push notifications, 
 *  and social apps).
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.disableEditorSaving = function() {
	console.log("Marketo App > Disabling: Saving for Editors");
	
	Mkt3.data.Store.prototype.sync = function() {};
	Ext4.data.Model.prototype.destroy = function() {};
}

/**************************************************************************************
 *  
 *  This function overlays the email designer with the submitted company logo and 
 *  color.
 *
 *  @Author Arrash
 *
 *  @function
 *
 **************************************************************************************/

APP.overlayEmailDesigner = function() {
	console.log("Marketo App > Overlaying: Email Designer");
	
	var company = APP.getCookie('company'),
	color = APP.getCookie('color'),
	logo = "http://marketolive.com/m2_update/assets/img/turner-tech-white.png";
	
	if (company != "turner") {
		console.log("Marketo App > Overlaying: Turner");
		logo = "https://logo.clearbit.com/" + company;
	}
	
	var isIframeElement = window.setInterval(function() {
		var logoBkg = document.getElementsByTagName("iframe")[0].contentWindow.document.getElementById("logo-bkg"),
			buttonBkg = document.getElementsByTagName("iframe")[0].contentWindow.document.getElementById("button-bkg"),
			logoSwapCompany = document.getElementsByTagName("iframe")[0].contentWindow.document.getElementById("logo-swap-company"),
			logoSwapContainer = document.getElementsByTagName("iframe")[0].contentWindow.document.getElementById("logo-swap-container"),
			logoSwapCompanyContainer = document.getElementsByTagName("iframe")[0].contentWindow.document.getElementById("logo-swap-company-container");
		if (logoBkg != null
		&& buttonBkg != null
		&& logoSwapCompany != null) {
			console.log("Marketo App > Overlaying: iframe");
			logoSwapContainer.style.display = "none";
			logoSwapCompanyContainer.style.display = "block";
			
			logoBkg.style.backgroundColor = color;
			buttonBkg.style.backgroundColor = color;
			logoSwapCompany.src = logo;
			window.clearInterval(isIframeElement);
		}
	}, 0);
}

/**************************************************************************************
 *  
 *  This function overlays the landing page designer with the submitted company logo 
 *  and color.
 *
 *  @Author Arrash
 *
 *  @function
 *
 **************************************************************************************/

APP.overlayLandingPageDesigner = function() {
	console.log("Marketo App > Overlaying: Landing Page Designer");
	
	var company = APP.getCookie('company'),
	color = APP.getCookie('color'),
	companyName = "turner",
	logo = "http://marketolive.com/m2_update/assets/img/turner-tech-green.png";

	if (company != "turner") {
		logo = "https://logo.clearbit.com/" + company;
		companyName = company.substring(0, company.indexOf("."));
	}
	
	var isIframeElement = window.setInterval(function() {
		var lpLogo = document.getElementsByTagName("iframe")[0].contentWindow.document.getElementById("lp-logo"),
			backgroundColor = document.getElementsByTagName("iframe")[0].contentWindow.document.getElementById("background-color"),
			biggerBackground = document.getElementsByTagName("iframe")[0].contentWindow.document.getElementById("bigger-background"),
			subTitle = document.getElementsByTagName("iframe")[0].contentWindow.document.getElementById("sub-title");
		if (lpLogo != null
		&& backgroundColor != null
		&& biggerBackground != null
		&& subTitle != null) {
			console.log("Marketo App > Overlaying: iframe");
			
			lpLogo.src = logo;
			backgroundColor.style.backgroundColor = color;
			biggerBackground.style.backgroundColor = color;
			subTitle.innerHTML = companyName + " invites you to join:";
			window.clearInterval(isIframeElement);
		}
	}, 0);
}

/**************************************************************************************
 *
 *  Main
 *  
 **************************************************************************************/

if (currentUrl.search(mktoAppDomain) != -1
|| currentUrl.search(mktoDesignerDomain) != -1
|| currentUrl.search(mktoWizard) != -1) {
    console.log("Marketo App > Location: Marketo URL");
	
    window.mkto_live_plugin_state = true;
    var isMktPage = window.setInterval(function() {
        if (typeof(MktPage) !== "undefined") {
			console.log("Marketo App > Location: Marketo Page");
			
            var accountString = MktPage.savedState.custPrefix,
				userId = MktPage.userid;
			if (accountString.search("^mktodemoaccount") != -1
			&& (userId.search("\.demo@marketo\.com$") != -1
			|| userId.search("^admin@mktodemoaccount") != -1)) {
				console.log("Marketo App > Location: MarketoLive Instance");
				
				if (userId.search("^admin@mktodemoaccount") != -1) {
					console.log("Marketo App > User: Admin");
					
					// Disabling Demo Plugin Check
					APP.disableDemoPluginCheck();
					window.clearInterval(isMktPage);
					return;
				}
				
				var currUrlFragment,
					prevWorkspaceId;
				// Disabling Demo Plugin Check
				APP.disableDemoPluginCheck();
				
				// Getting the URL fragment, the part after the #
				currUrlFragment = Mkt3.DL.getDlToken();
                
				// Email Deliverability
				if (currUrlFragment == mktoMyMarketoFragment) {
					APP.overrideDeliverabilityToolsTile();
				}
				
				if (currUrlFragment.search("^" + mktoEmailDesignerFragment) == -1
				&& currUrlFragment.search("^" + mktoLandingPageDesignerFragment) == -1
				&& currUrlFragment.search("^" + mktoFormWizardFragment) == -1
				&& currUrlFragment.search("^" + mktoMobilePushNotificationWizardFragment) == -1
				&& currUrlFragment.search("^" + mktoSocialAppWizardFragment) == -1) {
					
					// Storing previous Workspace ID
					if (currUrlFragment != mktoMyMarketoFragment) {
						prevWorkspaceId = MktCanvas.activeTab.config.accessZoneId;
						if (prevWorkspaceId == 1) {
							// Powerful Automation
							APP.disableSmartCampaignSaving();
							APP.enableSmartCampaignCanvas();
						}
					}
					
					// Marketing ROI, Funnel Analysis
					if (currUrlFragment == "RCM39B2"
					|| currUrlFragment == "RCM39B2!"
					|| currUrlFragment == "RCM5A1"
					|| currUrlFragment == "RCM5A1!"
					|| currUrlFragment == "AR1559A1"
					|| currUrlFragment == "AR1559A1!"
					|| currUrlFragment == "AR1682A1"
					|| currUrlFragment == "AR1682A1!") {
						console.log("Marketo App > Location: Analytics");
								
						APP.injectAnalyzerNavBar();
					}
					
					// Setting the Landing Page draft IDs to discard
					var lpIds = {};
					switch (accountString) {
						case "mktodemoaccount106":
							// Custom Landing Page
							lpIds["dpageid_11381"] = "dpageid_11381";
							// Landing Page
							lpIds["dpageid_8703"] = "dpageid_8703";
							// Responsive Landing Page
							lpIds["dpageid_11291"] = "dpageid_11291";
							break;
						case "mktodemoaccount106a":
							// Custom Landing Page
							lpIds["dpageid_11381"] = "dpageid_11381";
							// Landing Page
							lpIds["dpageid_8703"] = "dpageid_8703";
							// Responsive Landing Page
							lpIds["dpageid_10454"] = "dpageid_10454";
							break;
						case "mktodemoaccount106b":
							// Custom Landing Page
							lpIds["dpageid_11381"] = "dpageid_11381";
							// Landing Page
							lpIds["dpageid_10760"] = "dpageid_10760";
							// Responsive Landing Page
							lpIds["dpageid_10762"] = "dpageid_10762";
							break;
						default:
							break;
					}
					
					// DIY Design (Landing Pages)
					APP.discardLandingPageDrafts(lpIds);
					
					// Limiting Nurture Programs
					APP.limitNurturePrograms();
					
					// Disabling New Smart Campaign, New Local Asset, New Folder, and Delete
					APP.disableProgramActionsMenu();
				}
				
				else if (currUrlFragment.search("^" + mktoLandingPageDesignerFragment) != -1) {
					console.log("Marketo App > Location: Landing Page Designer");
					
					// Disabling System Error Message for sync conflicts
					APP.disableSystemErrorMessage();
					
					// Overlay Landing Page Designer w/ company logo and color
					switch (currUrlFragment) {
						case "LPE11381":
							APP.overlayLandingPageDesigner();
							break;
						case "LPP11381":
							APP.overlayLandingPageDesigner();
							break;
						default:
							break;
					}
					window.clearInterval(isMktPage);
					return;
				}
				
				else {
					console.log("Marketo App > Location: Designers/Wizards");
					
					// DIY Design (Emails, Forms, Push Notifications, Social Apps)
					var currAssetZoneId,
                        loadParameters = {
                                            filters: [{property: 'id', value: Mkt3.DL.dl.compId}],
                                            async: false,
                                            callback: function(records) {
                                                records.forEach(
                                                    function(record) {
                                                        currAssetZoneId = record.get('zoneId');
														console.log("Marketo App > currAssetZoneId = " + currAssetZoneId);
                                                        if (currAssetZoneId  == 1) {
                                                            APP.disableEditorSaving();
                                                        }
														else if (APP.getCookie("priv") != "true") {
															APP.disableEditorSaving();
														}
                                                    }
                                                );
                                            }
                                         }
                            
					switch (Mkt3.DL.dl.dlCompCode) {
						case mktoEmailDesignerFragment:
							Ext4.getStore('Email').load(loadParameters);
							// Overlay Email Designer w/ Company Logo and Color
							switch (currUrlFragment) {
								case "EME15464":
									APP.overlayEmailDesigner();
									break;
								default:
									break;
							}
							break;
						case mktoFormWizardFragment:
							Ext4.getStore('Form').load(loadParameters);
							break;
						case mktoMobilePushNotificationWizardFragment:
							Ext4.getStore('MobilePushNotification').load(loadParameters);
							break;
						case mktoSocialAppWizardFragment:
							Ext4.getStore('SocialApp').load(loadParameters);
							break;
						default:
							currAssetZoneId = -1;
                    }
				}

                window.onhashchange = function() {
					console.log("Window: Hash Changed");
					
					// Getting the URL fragment, the part after the #
					currUrlFragment = Mkt3.DL.getDlToken();
					
					if (currUrlFragment.search("^" + mktoEmailDesignerFragment) == -1
					&& currUrlFragment.search("^" + mktoLandingPageDesignerFragment) == -1
					&& currUrlFragment.search("^" + mktoFormWizardFragment) == -1
					&& currUrlFragment.search("^" + mktoMobilePushNotificationWizardFragment) == -1
					&& currUrlFragment.search("^" + mktoSocialAppWizardFragment) == -1
					&& currUrlFragment != mktoMyMarketoFragment) {
						
						var currWorkspaceId = MktCanvas.activeTab.config.accessZoneId;
						if (currWorkspaceId == prevWorkspaceId) {
						}
						
						else if (currWorkspaceId == 1) {
							// Powerful Automation
							APP.disableSmartCampaignSaving();
							APP.enableSmartCampaignCanvas();
							prevWorkspaceId = currWorkspaceId;
						}
						
						else {
							// Enable Smart Campaign Saving for their Workspace
							if (APP.getCookie("priv") != "false") {
								APP.enableSmartCampaignSaving();
							}
							prevWorkspaceId = currWorkspaceId;
						}
						
						// Marketing ROI, Funnel Analysis
						if (currUrlFragment == "RCM39B2"
						|| currUrlFragment == "RCM39B2!"
						|| currUrlFragment == "RCM5A1"
						|| currUrlFragment == "RCM5A1!"
						|| currUrlFragment == "AR1559A1"
						|| currUrlFragment == "AR1559A1!"
						|| currUrlFragment == "AR1682A1"
						|| currUrlFragment == "AR1682A1!") {
							console.log("Marketo App > Location: Analytics");
								
							APP.injectAnalyzerNavBar();
						}
					}
                }
            }
            window.clearInterval(isMktPage);
        }
    }, 0);
}