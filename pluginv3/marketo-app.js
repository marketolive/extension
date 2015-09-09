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
window.mkto_live_plugin_state = true;

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
    defaultTurnerLogoGreen = "http://marketolive.com/m3/assets/img/turner-tech-green.png",
    defaultTurnerLogoWhite = "http://marketolive.com/m3/assets/img/turner-tech-white.png",
    defaultColor = "rgb(42, 83, 112)",
    mktoWizard = mktoAppDomain + "/m#",
    rtpDemoDomain = "^http:\/\/sjrtp1.marketo.com\/demo\/$|^http:\/\/cloud4.insightera.com\/demo\/$",
    emailDeliverabilityDomain = "^https:\/\/250ok.com/",
    mktoMyMarketoFragment = "MM0A1",
	mktoMarketingActivitiesDefaultFragment = "MA15A1",
	mktoLeadDatabaseDefaultFragment = "ML0A1ZN2",
    mktoEmailDesignerFragment = "EME",
    mktoEmailPreviewFragment = "EMP",
    mktoLandingPageDesignerFragment = "LPE",
    mktoLandingPagePreviewFragment = "LPP",
    mktoFormWizardFragment = "FOE",
    mktoMobilePushNotificationWizardFragment = "MPNE",
    mktoSocialAppWizardFragment = "SOAE",
    isMktoLiveInstance = false,
    pod,

    APP = APP || {};

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
    console.log("Marketo App > Getting: Cookie "+cookieField);

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

    var tiles = document.getElementsByTagName("a"),
        ii = 0;
    
    for (ii=0; ii<tiles.length; ++ii) {
        // The question mark below needs to be escaped with two slashes
        // in order for the search function to work.
        if (tiles[ii].href.search("homepage/sso\\?sso=250ok") != -1) {
            tiles[ii].href = "https://250ok.com/login";
            break;
        }
    }
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

    Mkt.widgets.DataPanelManager.prototype.save = function(cause, dp, acceptUpdates) {
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
            if (this.lastSave.dataPanelMetas && this.lastSave.dataPanelMetas == dataPanelMetas) {
                return;
            }
			else if (this.lastSave.dataPanelMetasUpdated && this.lastSave.dataPanelMetasUpdated == dataPanelMetas) {
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
        var params = Ext.apply({
            dataPanelMetas: dataPanelMetas,
            accessZoneId: this.accessZoneId
        }, this.baseSaveParams);

        if (this.isSmartlist && this.smartListRuleLogic.customMode()) {
            if (this.smartListRuleLogic.isCustomLogicValid()) {
                var smartListLogicParams = this.smartListRuleLogic.getSmartListLogicSaveParams();
                Ext.apply(params, smartListLogicParams);
            } else {
                console.debug('Data panel save successful. Custom rule logic is not valid');
            }
        }

        params[this.appVarsBase + 'Id'] = this.dataPanelStorageId;
        this.beforeSaveHook();
        if (DPDEBUG) {
            console.debug("Saving... ", params);
        }
		
        MktSession.ajaxRequest(this.saveAction, {
            serializeParms: params,
            onMySuccess: this.saveSuccess.createDelegate(this),
            onMyFailure: this.saveFailure.createDelegate(this)
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

    Mkt.widgets.DataPanelLayout.prototype.initComponent = function() {
        this.dpEditable = true;
        DPDEBUG = false;

        if (this.dpSubtype) {
            this.addClass('mktDataPanelLayout-' + this.dpSubtype);
        }

        if (this.canvas) {
            MktCanvas.mask(this.canvas);
        }

        if (this.dpType == 'Smartlist') {
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

        if (this.dpEditable
		&& this.canvas
		&& this.paletteWidth > 0) {
            this.canvasWidth = MktCanvas.getWidth();
            var availableWidth = Math.min(this.canvasWidth - 700, this.maxPaletteWidth);
            this.paletteWidth = Math.max(this.paletteWidth, availableWidth);

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
            MktCanvas.addHook(this.canvas, {
                dp: this
            });
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
        title: "MarketoLive",
        msg: "Discarding Landing Page Drafts",
        progress: false,
        wait: false,
        width: 270,
        closable: false
    });
    mktLPLManager.doModifyPages('revert', lpIds);
    lpMessageBox.hide();
}

/**************************************************************************************
 *  
 *  This function discards Email drafts in DIY Design only.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {String[]} lpIds - The Mkto IDs for the Landing Pages to discard.
 *
 **************************************************************************************/

APP.discardEmailDrafts = function(emIds) {
    console.log("Marketo App > Discarding: Email Drafts");

    var emMessageBox = Ext.MessageBox.show({
        title: "MarketoLive",
        msg: "Discarding Email Drafts",
        progress: false,
        wait: false,
        width: 270,
        closable: false
    });
    mktEmManager.discardDraft(emIds);
    emMessageBox.hide();
}

/**************************************************************************************
 *  
 *  This function discards Form or Push Notification drafts
 *
 *  @Author Andy Garcia
 *
 *  @function
 *
 *  @param {String} assetType - The type of asset to discard. Can be "Form" 
 *                              or "MobilePushNotification"
 *  @param {int[]} assetIds -   The array of asset ids to discard. These should
 *                              be in integer form not string.
 *
 **************************************************************************************/

APP.discardFormPushDrafts = function(assetType, assetIds) {
    console.log("Marketo App > Discarding: "+assetType+" Drafts");
    
    var assetStore = Ext4.getStore(assetType),
		originalExceptionFn = MktMessage.showSystemError;
    MktMessage.showSystemError = Ext4.emptyFn;
    if (typeof(Mkt3) !== 'undefined') {
        if (!assetStore) {
                assetStore = Ext4.create('Mkt3.store.'+assetType, {
                    storeId : assetType
                });
        }
        assetStore.load({
            filters : [{
                property : 'id',
                value : assetIds
            }],
            callback : function(assets) {
                //debugger;
                for (var i = 0; i < assets.length; i++) {
                    var asset = assets[i];
                    asset.discard(function(success) {
                        if (success) {
                            asset.updateNode();
                        }
                    }, this);
                }
            }
        });		
    }
}

/**************************************************************************************
 *  
 *  This function disables the Default Workspace home buttons: New Program, and New  
 *  Smart Campaign
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.disableButtons = function() {
	console.log("Marketo App > Disabling: Buttons");
	
	$jQ = jQuery.noConflict();
	console.log($jQ(".mktButtonPositive"));
	$jQ(".mktButtonPositive").remove();
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

APP.disableMenus = function() {
    console.log("Marketo App > Disabling: Menus");
	
	//Disables Marketing Activities > Marketing Program, Nurture Program, Event Program, and Email Batch Program > New menu
	var prevMarketingNewEventMenu = Mkt.app.MarketingActivities.Toolbar.getNewEventMenuButton;
	Mkt.app.MarketingActivities.Toolbar.getNewEventMenuButton = function() {
		prevMarketingNewEventMenu.apply(this, arguments);
		return {
			text : MktLang.getStr('mktMaMenu.New'),
			iconCls : 'mkiBooksBlue',
			xtype : 'mkttbbutton',
			menu : MktMaMenu.maMenu(),
			handler : function(button) {
				var canvas = MktCanvas.getActiveTab(),
				disableMenu = canvas
							&& canvas.config
							&& canvas.config.accessZoneId
							&& canvas.config.accessZoneId == 1;
				button.menu.items.each(function(item) {
					item.setDisabled(disableMenu);
				});
			}
		};
	}
	
	// Disables Marketing Activities > Folder and Smart Campaign > New menu
	var prevMarketingNewMenu = Mkt.app.MarketingActivities.Toolbar.getNewMenuButton;
	Mkt.app.MarketingActivities.Toolbar.getNewMenuButton = function() {
		prevMarketingNewMenu.apply(this, arguments);
		return {
			text : MktLang.getStr('mktMaMenu.New'),
			iconCls : 'mkiBooksBlue',
			xtype : 'mkttbbutton',
			menu : MktMaMenu.maMenu(),
			handler : function(button) {
				var canvas = MktCanvas.getActiveTab(),
				disableMenu = canvas
							&& canvas.config
							&& canvas.config.accessZoneId
							&& canvas.config.accessZoneId == 1;
				button.menu.items.each(function(item) {
					item.setDisabled(disableMenu);
				});
			}
		};
	}
	
	// Disables Design Studio > ALL > New menu
	var prevDesignNewMenu = Mkt.app.DesignStudio.Toolbar.getNewMenuButton;
	Mkt.app.DesignStudio.Toolbar.getNewMenuButton = function() {
		prevDesignNewMenu.apply(this, arguments);
		return {
			text : MktLang.getStr('mktDsMenu.New'),
			iconCls : 'mkiColorsCmyk',
			xtype : 'mkttbbutton',
			menu : MktMaMenu.maMenu(),
			handler : function(button) {
				var canvas = MktCanvas.getActiveTab(),
				disableMenu = canvas
							&& canvas.config
							&& canvas.config.accessZoneId
							&& canvas.config.accessZoneId == 1;
				button.menu.items.each(function(item) {
					item.setDisabled(disableMenu);
				});
			}
		};
	}
	
	// Disables Lead Database > ALL > New menu
	/*
	var prevLeadDatabaseNewMenu = MktLeadDbMenu.leadDbMenu;
	MktLeadDbMenu.leadDbMenu = function() {
		//prevLeadDatabaseNewMenu.apply(this, arguments);
		var mItems = MktLeadDbMenu.leadDbMenu().items,
			canvas = MktCanvas.getActiveTab(),
			disable = canvas
					&& canvas.config
					&& canvas.config.accessZoneId
					&& canvas.config.accessZoneId == 1,
			itemsToDisable = [
							"newSmartList",//New Smart List
							"newList",//New List
							"newSegmentation",//New Segmentation
							"newLead",//New Lead
							"newDataMgr"//New Field Organizer
							];
		itemsToDisable.forEach(function(itemToDisable) {
			var item = mItems.get(itemToDisable);
			if (item) {
				item.setDisabled(disable);
			}
		});
	}
	*/
	
	// Disables Marketing Activities > Marketing Program, Nurture Program, Event Program, and Email Batch Program > Actions menus
	var prevActionsMenu = Mkt.menus.marketingEvent.Toolbar.preShowMarketingProgramActions;
	Mkt.menus.marketingEvent.Toolbar.preShowMarketingProgramActions = Mkt.menus.marketingEvent.Toolbar.preShowMarketingEventActions = function(menu) {
		prevActionsMenu.apply(this, arguments);
		var mItems = menu.items,
			canvas = MktCanvas.getActiveTab(),
			disable = canvas
					&& canvas.config
					&& canvas.config.accessZoneId
					&& canvas.config.accessZoneId == 1,
			itemsToDisable = [
							"cloneMarketingProgram",//Clone
							"cloneMarketingEvent",//Clone
							"cloneNurtureProgram",//Clone
							"cloneEmailBatchProgram",//Clone
							"deleteMarketingProgram",//Delete
							"deleteMarketingEvent",//Delete
							"deleteNurtureProgram",//Delete
							"deleteEmailBatchProgram",//Delete
							"testNurtureProgram",//Test Stream
							"eventSchedule",//Schedule
							"entryRescheduleEntries",//Reschedule Entries
							//"webinarSettings",//Event Settings
							"sfdcCampaignSync",//Salesforce Campaign Sync
							"refreshFromWebinarProvider",//Refresh from Webinar Provider
							//"showImportMemberStatus",//Show Import Status
							//"showExportMemberStatus"//Show Export Status
							];

		itemsToDisable.forEach(function(itemToDisable) {
			var item = mItems.get(itemToDisable);
			if (item) {
				item.setDisabled(disable);
			}
		});
	}
	
	// Disables Marketing Activities > Marketing Program, Nurture Program, Event Program, and Email Batch Program > Right-click menus
	var prevRightClickMenu = MktMaMenu.preShowProgramActionsMenu;
    MktMaMenu.preShowProgramActionsMenu = function(menu, attr) {
        prevRightClickMenu.apply(this, arguments);
		
        var mItems = menu.items,
            canvas = MktCanvas.getActiveTab(),
            disable = attr.accessZoneId == 1
					|| !attr.accessZoneId
					&& canvas
					&& canvas.config
					&& canvas.config.accessZoneId
					&& canvas.config.accessZoneId == 1,
            itemsToDisable = [
							//"navigateToNurtureTracks",//View Streams
							//"navigateToCFSmartCamp",//View Smart Campaigns
							//"navigateToLocalAssets",//View Assets
							//"navigateToProgramSmartList",//View Smart List
							//"navigateToEventSettings",//View Setup
							//"navigateToCFTokens",//View My Tokens
							//"navigateToEventMembers",//View Members
							//"navigateToCFResults",//View Results
							//"navigateToSmartCampaign",//View Campaign
							//"navigateToSmartList",//View Smart List
							//"navigateToFlow",//View Flow
							//"navigateToSchedule",//View Schedule
							//"navigateToResults",//View Results
							//"navigateToCampaignMembers",//View Campaign Members
							"newSmartCampaign",//New Smart Campaign
							"newLocalAsset",//New Local Asset
							"createNewMarketingProgram", //New Program
							"createProgramFolder",//New Folder
							"renameProgramFolder",//Rename Folder
							"deleteProgramFolder",//Delete Folder
							"convertToArchiveFolder",//Convert To Archive Folder
							"convertToCampaignFolder",//Convert To Campaign Folder
							"scClone",//Clone
							"cloneMarketingProgram",//Clone
							"cloneMarketingEvent",//Clone
							"cloneNurtureProgram",//Clone
							"cloneEmailBatchProgram",//Clone
							"scArchive",//Delete
							"deleteMarketingProgram",//Delete
							"deleteMarketingEvent",//Delete
							"deleteNurtureProgram",//Delete
							"deleteEmailBatchProgram",//Delete
							"scMove",//Move
							"scActivate",//Activate
							"scAbort",//Abort Campaign
							"scClearPalette",//Clear Palette Cache
							"scClearSmartList",//Clear Smart List
							"scClearFlow",//Clear Flow
							"shareProgramFolder",//Share Folder
							//"addToFavorites",//Add to Favorites
							//"removeFromFavorites",//Remove from Favorites
							"progGenerateRef",//Build Campaign References
							"checkForCorruptEmails"//Check For Corrupt Emails
							];
							
        itemsToDisable.forEach(function(itemToDisable) {
            var item = mItems.get(itemToDisable);
            if (item) {
                item.setDisabled(disable);
            }
        });
        return menu;
    }
	
	// Disables Marketing Activities > Email > Right-click menu
	var prevEmailRightClickMenu = MktDsMenu.preShowEmailMenu;
	MktDsMenu.preShowEmailMenu = function(menu, attr) {
		prevEmailRightClickMenu.apply(this, arguments);
		var mItems = menu.items,
			canvas = MktCanvas.getActiveTab(),
			disable = attr.accessZoneId == 1
					|| !attr.accessZoneId
					&& canvas
					&& canvas.config
					&& canvas.config.accessZoneId
					&& canvas.config.accessZoneId == 1,
			itemsToDisable = [
							//"emailEdit",//Edit Draft
							//"emailPreview",//Preview
							"emailApprove",//Approve
							"emailUnapprove",//Unapprove
							//"emailDownloadHtml",//Download HTML
							//"emailSendTest",//Send Sample
							"emailClone",//Clone
							"emailDelete",//Delete
							"emailMove",//Move
							"emailNewTest",//New Test
							//"addToFavorites",//Add to Favorites
							//"removeFromFavorites",//Remove from Favorites
							//"emailDraftEdit",//Edit Draft
							//"emailDraftPreview",//Preview Draft
							"emailDraftSendTest",//Send Sample of Draft
							"emailDraftApprove",//Approve Draft
							//"emailDraftDiscard",//Discard Draft
							"emailApproveTest",//Approve Test
							//"emailSendSampleTest",//Send Sample Test
							//"emailEditTest",//Edit Test
							//"emailViewTestSummary",//View Test Summary
							//"emailTestDeclareChampion",//Declare Champion
							"emailDiscardTest"//Discard Test
									];
								
		itemsToDisable.forEach(function(itemToDisable) {
			var item = mItems.get(itemToDisable);
			if (item) {
				item.setDisabled(disable);
			}
		});
		return menu;
	}

	// Disables Marketing Activities > Landing Page > Right-click menu
	var prevLandingPageRightClickMenu = MktDsMenu.preShowPageMenu;
	MktDsMenu.preShowPageMenu = function(menu, attr) {
		prevLandingPageRightClickMenu.apply(this, arguments);
		
		var mItems = menu.items,
			canvas = MktCanvas.getActiveTab(),
			disable = attr.accessZoneId == 1
					|| !attr.accessZoneId
					&& canvas
					&& canvas.config
					&& canvas.config.accessZoneId
					&& canvas.config.accessZoneId == 1,
			itemsToDisable = [
							//"pageEdit",//Edit Draft
							//"pagePreview",//Preview
							//"deviceSwitch",//Device Switch
							"pageApprove",//Approve
							"pageUnapprove",//Unapprove
							//"publishToFacebook",//Publish To Facebook
							"pageConvertToTestGroup",//Convert to Test Group
							"pageClone",//Clone
							"pageDelete",//Delete
							"urlTools",//URL Tools
							"pageMove",//Move
							//"addToFavorites",//Add to Favorites
							//"removeFromFavorites",//Remove from Favorites
							//"pageDraftEdit",//Edit Draft
							//"pageDraftPreview",//Preview Draft
							"pageDraftApprove",//Approve Draft
							//"pageDraftDiscard"//Discard Draft
							];

		itemsToDisable.forEach(function(itemToDisable) {
			var item = mItems.get(itemToDisable);
			if (item) {
				item.setDisabled(disable);
			}
		});
		return menu;
	}
	
	// Disables Marketing Activities > Form > Right-click menu
	var prevFormRightClickMenu = MktDsMenu.preShowFormMenu;
	MktDsMenu.preShowFormMenu = function(menu, attr) {
		prevFormRightClickMenu.apply(this, arguments);

		var mItems = menu.items,
			canvas = MktCanvas.getActiveTab(),
			disable = attr.accessZoneId == 1
					|| !attr.accessZoneId
					&& canvas
					&& canvas.config
					&& canvas.config.accessZoneId
					&& canvas.config.accessZoneId == 1,
			itemsToDisable = [
							//"formEditDraft",//Edit Draft
							//"formPreview",//Preview
							//"formEdit",//Edit Form
							"formApprove",//Approve
							"formClone",//Clone Form
							"formDelete",//Delete Form
							//"formEmbed",//Embed Code
							"formMove",//Move
							//"addToFavorites",//Add to Favorites
							//"removeFromFavorites",//Remove from Favorites
							//"formDraftPreview",//Preview Draft
							//"formDraftEdit",//Edit Draft
							"formDraftApprove",//Approve Draft
							//"formDraftDiscard"//Discard Draft
							];

		itemsToDisable.forEach(function(itemToDisable) {
			var item = mItems.get(itemToDisable);
			if (item) {
				item.setDisabled(disable);
			}
		});
		return menu;
	}
	
	// Disables Marketing Activities > Social App > Right-click menu
	var prevSocialAppRightClickMenu = MktDsMenu.preShowSocialAppMenu;
	MktDsMenu.preShowSocialAppMenu = function(menu, attr) {
		prevSocialAppRightClickMenu.apply(this, arguments);
		
		var mItems = menu.items,
			canvas = MktCanvas.getActiveTab(),
			disable = attr.accessZoneId == 1
				|| !attr.accessZoneId
				&& canvas
				&& canvas.config
				&& canvas.config.accessZoneId
				&& canvas.config.accessZoneId == 1,
			itemsToDisable = [
							//"socialAppEdit",//Edit Draft
							//"socialAppPreview",//Preview
							"socialAppApprove",//Approve
							"socialAppClone",//Clone
							"socialAppDelete",//Delete
							//"socialAppWidgetCode",//Embed Code
							//"addToFavorites",//Add to Favorites
							//"removeFromFavorites",//Remove from Favorites
							//"socialAppDraftEdit",//Edit Draft
							//"socialAppDraftPreview",//Preview Draft
							"socialAppDraftApprove",//Approve Draft
							//"socialAppDraftDiscard"//Discard Draft
							];
			
		itemsToDisable.forEach(function(itemToDisable) {
			var item = mItems.get(itemToDisable);
			if (item) {
				item.setDisabled(disable);
			}
		});
		return menu;
	}
	
	// Disable Marketing Activities > Social App > Action menu
	var prevSocialAppActionsMenu = Mkt3.controller.socialApp.SocialApp.prototype.loadToolbar;
	Mkt3.controller.socialApp.SocialApp.prototype.loadToolbar = function(menu, attr) {
		prevSocialAppActionsMenu.apply(this, arguments);

		var disable = this.getSocialApp().get('zoneId') == 1,
			mItems = Ext4.ComponentQuery.query(
							/*"socialAppToolbar contextMenu [action=edit]," +*/ //Edit
							/*"socialAppToolbar contextMenu [action=preview]," +*/ //Preview
							"socialAppToolbar contextMenu [action=approve]," + //Approve
							"socialAppToolbar contextMenu [action=clone]," + //Clone
							"socialAppToolbar contextMenu [action=delete]," + //Delete
							/*"socialAppToolbar contextMenu [action=getWidgetEmbedCode]," +*/ //Embed Code
							"socialAppToolbar contextMenu [action=editDraft]," + //Edit Draft
							"socialAppToolbar contextMenu [action=previewDraft]," + //Preview Draft
							"socialAppToolbar contextMenu [action=approveDraft]," /*+*/ //Approve Draft
							/*"socialAppToolbar contextMenu [action=discardDraft],"*/ //Discard Draft
							);
		
		mItems.forEach(function(item) {
			if (item) {
				item.setDisabled(disable);
			}
		});
		return menu;
	}
	
	// Disables Marketing Activities > Push Notification > Right-click menu
	var prevPushNotificationRightClickMenu = MktDsMenu.preShowPushNotificationMenu;
	MktDsMenu.preShowPushNotificationMenu = function(menu, attr) {
		prevPushNotificationRightClickMenu.apply(this, arguments);
		
		var mItems = menu.items,
			canvas = MktCanvas.getActiveTab(),
			disable = attr.accessZoneId == 1
				|| !attr.accessZoneId
				&& canvas
				&& canvas.config
				&& canvas.config.accessZoneId
				&& canvas.config.accessZoneId == 1,
			itemsToDisable = [
							//"pushNotificationEdit",//Edit Draft
							"pushNotificationApprove",//Approve
							//"pushNotificationSendSample",//Send Sample
							"pushNotificationUnapprove",//Unapprove
							"pushNotificationDelete",//Delete
							"pushNotificationDraftEdit",//Edit Draft
							"pushNotificationDraftSendSample",//Send Sample of Draft
							"pushNotificationDraftApprove",//Approve Draft
							//"pushNotificationDraftDiscard",//Discard Draft
							];
			
		itemsToDisable.forEach(function(itemToDisable) {
			var item = mItems.get(itemToDisable);
			if (item) {
				item.setDisabled(disable);
			}
		});
		return menu;
	}
	
	// Disable Marketing Activities > Push Notification > Action menu
	var prevPushNotificationActionsMenu = Mkt3.controller.mobilePushNotification.MobilePushNotification.prototype.loadToolbar;
	Mkt3.controller.mobilePushNotification.MobilePushNotification.prototype.loadToolbar = function(menu, attr) {
		prevPushNotificationActionsMenu.apply(this, arguments);

		var disable = this.getMobilePushNotification().get('zoneId') == 1,
			mItems = Ext4.ComponentQuery.query(
							/*"mobilePushNotification contextMenu [action=edit]," +*/ //Edit Draft
							/*"mobilePushNotification contextMenu [action=sendSample]," +*/ //Send Sample
							"mobilePushNotification contextMenu [action=approve]," + //Approve
							"mobilePushNotification contextMenu [action=unapprove]," + //Unapprove
							"mobilePushNotification contextMenu [action=clone]," + //Clone
							"mobilePushNotification contextMenu [action=delete]," + //Delete
							"mobilePushNotification contextMenu [action=editDraft]," + //Edit Draft
							"mobilePushNotification contextMenu [action=sendDraftSample]," + //Send Sample of Draft
							"mobilePushNotification contextMenu [action=approveDraft]," /*+*/ //Approve Draft
							/*"mobilePushNotification contextMenu [action=discardDraft],"*/ //Discard Draft
							);
		
		mItems.forEach(function(item) {
			if (item) {
				item.setDisabled(disable);
			}
		});
		return menu;
	}
	
	// Disables Design Studio > ALL > Right-click menus
	var prevContextMenu = MktDsMenu.preShowContextMenu;
	MktDsMenu.preShowContextMenu = function(menu, attr) {
		prevContextMenu.apply(this, arguments);
		
		var mItems = menu.items,
			canvas = MktCanvas.getActiveTab(),
			disable = attr.accessZoneId == 1
				|| !attr.accessZoneId
				&& canvas
				&& canvas.config
				&& canvas.config.accessZoneId
				&& canvas.config.accessZoneId == 1,
			itemsToDisable = [
							"newLandingPage",//New Landing Page
							"newTestGroup",//New Test Group
							"newPageTemplate",//New Landing Page Template
							"pageTemplateImport",//Import Template
							"newForm",//New Form
							"newVideoShare",//New YouTube Video
							"newShareButton",//New Social Button
							"newReferralOffer",//New Referral Offer
							"newEmail",//New Email
							"newEmailTemplate",//New Email Template
							"newSnippet",//New Snippet
							"uploadImage",//"Upload Image or File"
							//"grabFromWebPage",//Grab Images from Web
							"share",//Share Folder
							"createFolder",//New Folder
							"renameFolder",//Rename Folder
							"deleteFolder",//Delete Folder
							"convertToArchiveFolder",//Convert To Archive Folder
							"convertToFolder",//Convert To Folder
							];
			
		itemsToDisable.forEach(function(itemToDisable) {
			var item = mItems.get(itemToDisable);
			if (item) {
				item.setDisabled(disable);
			}
		});
		return menu;
	}
	
	// Disables Design Studio > Landing Page Template > Right-click and Actions menus
	var prevLandingPageTemplateMenu = MktDsMenu.preShowTemplateMenu;
	MktDsMenu.preShowTemplateMenu = function(menu, attr) {
		prevLandingPageTemplateMenu.apply(this, arguments);
		
		var mItems = menu.items,
			canvas = MktCanvas.getActiveTab(),
			disable = attr.accessZoneId == 1
				|| !attr.accessZoneId
				&& canvas
				&& canvas.config
				&& canvas.config.accessZoneId
				&& canvas.config.accessZoneId == 1,
			itemsToDisable = [
							//"editPageTemplate",//Edit Draft
							//"previewPageTemplate",//Preview
							"approvePageTemplate",//Approve
							"unapprovePageTemplate",//Unapprove
							"clonePageTemplate",//Clone
							"pageTemplateDelete",//Delete
							//"pageTemplateExport",//Export
							//"addToFavorites",//Add to Favorites
							//"removeFromFavorites",//Remove from Favorites
							//"editPageTemplateDraft",//Edit Draft
							//"previewDraftPageTemplate",//Preview Draft
							"approveDraftPageTemplate",//Approve Draft
							//"discardDraftPageTemplate",//Discard Draft
							];
			
		itemsToDisable.forEach(function(itemToDisable) {
			var item = mItems.get(itemToDisable);
			if (item) {
				item.setDisabled(disable);
			}
		});
		return menu;
	}
	
	// Disables Design Studio > ALL > Right-click menus
	var prevContextMenu = MktDsMenu.preShowContextMenu;
	MktDsMenu.preShowContextMenu = function(menu, attr) {
		prevContextMenu.apply(this, arguments);
		
		var mItems = menu.items,
			canvas = MktCanvas.getActiveTab(),
			disable = attr.accessZoneId == 1
				|| !attr.accessZoneId
				&& canvas
				&& canvas.config
				&& canvas.config.accessZoneId
				&& canvas.config.accessZoneId == 1,
			itemsToDisable = [
							"newLandingPage",//New Landing Page
							"newTestGroup",//New Test Group
							"newPageTemplate",//New Landing Page Template
							"pageTemplateImport",//Import Template
							"newForm",//New Form
							"newVideoShare",//New YouTube Video
							"newShareButton",//New Social Button
							"newReferralOffer",//New Referral Offer
							"newEmail",//New Email
							"newEmailTemplate",//New Email Template
							"newSnippet",//New Snippet
							"uploadImage",//"Upload Image or File"
							//"grabFromWebPage",//Grab Images from Web
							"share",//Share Folder
							"createFolder",//New Folder
							"renameFolder",//Rename Folder
							"deleteFolder",//Delete Folder
							"convertToArchiveFolder",//Convert To Archive Folder
							"convertToFolder",//Convert To Folder
							];
			
		itemsToDisable.forEach(function(itemToDisable) {
			var item = mItems.get(itemToDisable);
			if (item) {
				item.setDisabled(disable);
			}
		});
		return menu;
	}
	
	// Disables Design Studio > Email Template > Right-click and Actions menus
	var prevEmailTemplateMenu = MktDsMenu.preShowEmailTemplateMenu;
	MktDsMenu.preShowEmailTemplateMenu = function(menu, attr) {
		prevEmailTemplateMenu.apply(this, arguments);
		
		var mItems = menu.items,
			canvas = MktCanvas.getActiveTab(),
			disable = attr.accessZoneId == 1
				|| !attr.accessZoneId
				&& canvas
				&& canvas.config
				&& canvas.config.accessZoneId
				&& canvas.config.accessZoneId == 1,
			itemsToDisable = [
							//"emailTemplateEdit",//Edit Draft
							//"emailTemplatePreview",//Preview
							//"emailTemplateSendTest",//Send Sample
							"emailTemplateApprove",//Approve
							"emailTemplateUnapprove",//Unapprove
							"emailTemplateClone",//Clone
							"emailTemplateDelete",//Delete
							//"addToFavorites",//Add to Favorites
							//"removeFromFavorites",//Remove from Favorites
							//"emailTemplateDraftEdit",//Edit Draft
							//"emailTemplateDraftPreview",//Preview Draft
							"emailTemplateDraftSendTest",//Send Sample of Draft
							"emailTemplateDraftApprove",//Approve Draft
							//"emailTemplateDraftDiscard",//Discard Draft
							];
			
		itemsToDisable.forEach(function(itemToDisable) {
			var item = mItems.get(itemToDisable);
			if (item) {
				item.setDisabled(disable);
			}
		});
		return menu;
	}
	
	// Disables Design Studio > Snippet > Right-click and Actions menus
	var prevSnippetMenu = MktDsMenu.preShowSnippetMenu;
	MktDsMenu.preShowSnippetMenu = function(menu, attr) {
		prevSnippetMenu.apply(this, arguments);
		
		var mItems = menu.items,
			canvas = MktCanvas.getActiveTab(),
			disable = attr.accessZoneId == 1
				|| !attr.accessZoneId
				&& canvas
				&& canvas.config
				&& canvas.config.accessZoneId
				&& canvas.config.accessZoneId == 1,
			itemsToDisable = [
							//"snippetEdit",//Edit Draft
							//"snippetPreview",//Preview
							"snippetApprove",//Approve
							"snippetUnapprove",//Unapprove
							"snippetClone",//Clone
							"snippetDelete",//Delete
							//"addToFavorites",//Add to Favorites
							//"removeFromFavorites",//Remove from Favorites
							//"snippetDraftEdit",//Edit Draft
							//"snippetDraftPreview",//Preview Draft
							"snippetDraftApprove",//Approve Draft
							//"snippetDraftDiscard",//Discard Draft
							];
			
		itemsToDisable.forEach(function(itemToDisable) {
			var item = mItems.get(itemToDisable);
			if (item) {
				item.setDisabled(disable);
			}
		});
		return menu;
	}
	
	// Disables Design Studio > Image > Right-click and Actions menus
	var prevImageMenu = MktDsMenu.preShowImageMenu;
	MktDsMenu.preShowImageMenu = function(menu, attr) {
		prevImageMenu.apply(this, arguments);
		
		var mItems = menu.items,
			canvas = MktCanvas.getActiveTab(),
			disable = attr.accessZoneId == 1
				|| !attr.accessZoneId
				&& canvas
				&& canvas.config
				&& canvas.config.accessZoneId
				&& canvas.config.accessZoneId == 1,
			itemsToDisable = [
							"uploadImage",//Upload Image or File
							//"grabFromWebPage",//Grab Images from Web
							//"imagePreview",//View
							"imageDelete",//Delete
							"replaceImage",//Replace Image or File
							];
			
		itemsToDisable.forEach(function(itemToDisable) {
			var item = mItems.get(itemToDisable);
			if (item) {
				item.setDisabled(disable);
			}
		});
		return menu;
	}
	
	// Disables Lead Database > List > Right-click and Actions menu
	var prevListMenu = MktLeadDbMenu.preShowListListMenu;
	MktLeadDbMenu.preShowListListMenu = function(menu, attr) {
		prevListMenu.apply(this, arguments);
		
		var mItems = menu.items,
			canvas = MktCanvas.getActiveTab(),
			disable = menu.currNode
					&& menu.currNode.attributes
					&& menu.currNode.attributes.accessZoneId == 1
					|| !menu.currNode
					&& canvas
					&& canvas.config
					&& canvas.config.accessZoneId
					&& canvas.config.accessZoneId == 1,
			itemsToDisable = [
							//"navigateToMembership",//View Leads
							//"navigateToSmartList",//View Smart List
							//"navigateToFilterView",//Filter View
							//"showImportStatus",//Show Import Status
							//"showExportStatus",//Show Export Status
							//"importList",//Import List
							//"exportList",//Export List
							//"exportAdBridge",//Send via Ad Bridge
							"cloneSmartlist",//Clone Smart List
							"cloneList",//Clone List
							"deleteList",//Delete List
							//"addToFavorites",//Add to Favorites
							//"removeFromFavorites"//Remove from Favorites
							];

		itemsToDisable.forEach(function(itemToDisable) {
			var item = mItems.get(itemToDisable);
			if (item) {
				item.setDisabled(disable);
			}
		});
		return menu;
	}
	
	// Disables Lead Database > Segmentation > Right-click and Actions menu
	var prevSegmentationMenu = MktLeadDbMenu.preShowSegmentationMenu;
	MktLeadDbMenu.preShowSegmentationMenu = function(menu, attr) {
		prevSegmentationMenu.apply(this, arguments);
		
		var mItems = menu.items,
			canvas = MktCanvas.getActiveTab(),
			disable = menu.currNode
					&& menu.currNode.attributes
					&& menu.currNode.attributes.accessZoneId == 1
					|| !menu.currNode
					&& canvas
					&& canvas.config
					&& canvas.config.accessZoneId
					&& canvas.config.accessZoneId == 1,
			itemsToDisable = [
							"createDraftSegmentation",//Create Draft
							//"editSegmentation",//Edit Segments
							"approveSegmentation",//Approve
							"unapproveSegmentation",//Unapprove
							"deleteSegmentation",//Delete
							//"refreshSegmentation",//Refresh Status
							//"editDraftSegmentation",//Edit Segments
							"approveDraftSegmentation",//Approve Draft
							//"discardDraftSegmentation",//Discard Draft
							];

		itemsToDisable.forEach(function(itemToDisable) {
			var item = mItems.get(itemToDisable);
			if (item) {
				item.setDisabled(disable);
			}
		});
		return menu;
	}
	
	// Disables Lead Database > Segmentation Folder > Right-click and Actions menu
	var prevSegmentationFolderMenu = MktLeadDbMenu.preShowSegmentationFolderMenu;
	MktLeadDbMenu.preShowSegmentationFolderMenu = function(menu, attr) {
		prevSegmentationFolderMenu.apply(this, arguments);
		
		var mItems = menu.items,
			canvas = MktCanvas.getActiveTab(),
			disable = menu.currNode
					&& menu.currNode.attributes
					&& menu.currNode.attributes.accessZoneId == 1
					|| !menu.currNode
					&& canvas
					&& canvas.config
					&& canvas.config.accessZoneId
					&& canvas.config.accessZoneId == 1,
			itemsToDisable = [
							"newSegmentation",//New Segmentation
							"share",//Share Folder
							"createFolder",//New Folder
							"renameFolder",//Rename Folder
							"deleteFolder",//Delete Folder
							"convertToArchiveFolder",//Convert To Archive Folder
							"convertToFolder",//Convert To Folder
							];

		itemsToDisable.forEach(function(itemToDisable) {
			var item = mItems.get(itemToDisable);
			if (item) {
				item.setDisabled(disable);
			}
		});
		return menu;
	}
	
	// Disables Lead Database > Smart List and Segments > Right-click and Actions menu
	var prevSmartListMenu = MktLeadDbMenu.preShowUserListMenu;
	MktLeadDbMenu.preShowUserListMenu = function(menu, attr) {
		prevSmartListMenu.apply(this, arguments);
		
		var mItems = menu.items,
			canvas = MktCanvas.getActiveTab(),
			disable = menu.currNode
					&& menu.currNode.attributes
					&& menu.currNode.attributes.accessZoneId == 1
					|| !menu.currNode
					&& canvas
					&& canvas.config
					&& canvas.config.accessZoneId
					&& canvas.config.accessZoneId == 1,
			itemsToDisable = [
							//"navigateToMembership",//View Leads
							//"navigateToSmartList",//View Smart List
							//"navigateToFilterView",//Filter View
							//"showImportStatus",//Show Import Status
							//"showExportStatus",//Show Export Status
							//"importList",//Import List
							//"exportList",//Export List
							//"exportAdBridge",//Send via Ad Bridge
							"cloneSmartlist",//Clone Smart List
							"cloneList",//Clone List
							"deleteList",//Delete List
							//"addToFavorites",//Add to Favorites
							//"removeFromFavorites"//Remove from Favorites
							];
			/*
			itemsToRemove = [
							
							];
			*/

		itemsToDisable.forEach(function(itemToDisable) {
			var item = mItems.get(itemToDisable);
			if (item) {
				item.setDisabled(disable);
			}
		});

		/* Use itemsToRemove to disable visibility of menu items rather than graying-out
		itemsToRemove.forEach(function(itemToRemove) {
			var item = mItems.get(itemToRemove);
			if (item) {
				item.setVisible(!disable);
			}
		});
		*/
		return menu;
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
                        if (attr.xtra.compType == compType && attr.xtra.accessZoneId == MktCanvas.activeTab.config.accessZoneId) {
                            matches.push(this);
                        }
                    }
                },
                undefined, [compType]);

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
            nutureProgramMessageBox.show;
            return false;
        } else {
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
    var isPodsLoaded = window.setInterval(function() {
        if (typeof(PODS) !== "undefined") {
            console.log("Marketo App > Injecting: Analyzer Navigation Bar");

            if (typeof(pod) == "undefined") {
                pod = new PODS.Pod(PODS.getCookie("userPod"));
            }

            for (var y = 0; y < pod.valueSet.length; y++) {
                if (currentUrl == pod.valueSet[y].url) {
                    console.log("Marketo App > Updating: CSS for Analyzer Navigation Bar");

                    $j = jQuery.noConflict();
                    var currPosition = '#' + pod.valueSet[y].position;
                    $j(currPosition).parent().css('display', 'block');
                    $j(currPosition).parent().siblings().css('display', 'none');
                    $j(currPosition).removeClass('analyzer-button').addClass('analyzer-title');
                    $j(currPosition).siblings().removeClass('analyzer-title').addClass('analyzer-button');
                    $j("#modeler,#success-path-analyzer,#opportunity-influence-analyzer,#program-analyzer").bind("click", function(e) {
                        console.log("Marketo App > Identifying: Current Analyzer");

                        //Updates the currPosition based on the div selected
                        for (var x = 0; x < pod.valueSet.length; x++) {
                            if (e.target.id == pod.valueSet[x].position)
                                currPosition = x;
                        }
                        window.location = pod.valueSet[currPosition].url;
                    });
                }
            }
            window.clearInterval(isPodsLoaded);
        }
    }, 0);
}

/**************************************************************************************
 *  
 *  This function enables saving for the Editors (emails, forms, push notifications, 
 *  and social apps) and Nurture Streams.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.enableSaving = function() {
    console.log("Marketo App > Enabling: Saving for Editors & Nurture Streams");

    Mkt3.data.Store.prototype.sync = function() {
        if (this.autoSyncSuspended) {
            this.autoSync = true;
            this.autoSyncSuspended = false;
        }

        if (this.getProxy() instanceof Mkt3.data.proxy.AjaxPost) {
            Mkt3.Synchronizer.sync(this);
        } else {
            this.callParent(arguments);
        }
    }

    Ext4.data.Model.prototype.destroy = function(options) {
        options = Ext.apply({
            records: [this],
            action: 'destroy'
        }, options);

        var me = this,
            isNotPhantom = me.phantom !== true,
            scope = options.scope || me,
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
            } else {
                Ext.callback(options.failure, scope, args);
            }
            Ext.callback(options.callback, scope, args);
        };

        if (isNotPhantom) {
            me.getProxy().destroy(operation, callback, me);
        } else {
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
 *  and social apps) and the Nurture Streams.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.disableSaving = function() {
    console.log("Marketo App > Disabling: Saving for Editors & Nurture Streams");

    Mkt3.data.Store.prototype.sync = function() {};
    Ext4.data.Model.prototype.destroy = function() {};
	Mkt3.controller.editor.form.settings.FieldSelection.prototype.deleteFormField = function(formField) {
		var formFieldWidget = formField.getFieldWidget(),
			formFieldId,
			childFieldIndex,
			childFormField,
			allFormFields;
			
		if (formFieldWidget
		&& formFieldWidget.get('datatype') === 'fieldset') {
			allFormFields = this.getForm().getFormFields();
			formFieldId = formField.get('id');
			for (childFieldIndex = 0; childFieldIndex < allFormFields.getCount(); childFieldIndex++) {
				childFormField = allFormFields.getAt(childFieldIndex);
				if (childFormField.get('fieldsetFieldId') == formFieldId) {
					this.deleteFormField(childFormField);
				}
			}
		}
		
		formField.destroy({
			scope: this,
			callback: function(field, response) {
				if (response.success) {
					if (formFieldWidget) {
						formFieldWidget.destroy();
					}
				}
			}
		});
		// This allows for multiple form fields to be deleted
		this.renumberWidgets();
	}
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

    var logo = APP.getCookie("logo"),
        color = APP.getCookie("color");

    if (logo == null) {
        logo = defaultTurnerLogoWhite;
    }
    if (color == null) {
        color = defaultColor;
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

    var logo = APP.getCookie("logo"), 
        color = APP.getCookie("color");
        
    
    if (logo == null) {
        logo = defaultTurnerLogoGreen;
    }
    if (color == null) {
        color = defaultColor;
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

APP.getEmailIds = function (pod) {
    console.log("Marketo App > Getting Email Ids for Pod: " + pod);
    
    var emIds = [];
    switch (pod) {
        case "app-sjp":
            // DIY Design
            emIds.push(15464);
            // Intelligent Nurturing
            emIds.push(12818, 12820, 12819, 12816, 12811, 12815, 12812, 12821, 12813, 12814, 12817, 12823);
            // Replicate Success Roadshow
            emIds.push(10010, 10179, 10180, 12845, 10181, 10182, 10183, 10184);
            // Replicate Success Webinar
            emIds.push(4894, 3764, 3765, 3767, 3766, 3762);
            break;
        case "app-ab07":
            // DIY Design
            emIds.push(14240);
            // Intelligent Nurturing
            emIds.push(10171, 10173, 10172, 10169, 9957, 9974, 9968, 10174, 9972, 9973, 10170, 9962);
            // Replicate Success Roadshow
            emIds.push(10010, 10179, 10180, 10181, 10182, 10183, 10184);
            // Replicate Success Webinar
            emIds.push(4894, 3764, 3765, 3767, 3766, 3762);
            break;
        case "app-ab08":
            // DIY Design
            emIds.push(13924);
            // Intelligent Nurturing
            emIds.push(12818, 12820, 12819, 12816, 12811, 12815, 12812, 12821, 12813, 12814, 12817, 12823);
            // Replicate Success Roadshow
            emIds.push(10010, 10179, 10180, 12845, 10181, 10182, 10183, 10184);
            // Replicate Success Webinar
            emIds.push(4894, 3764, 3765, 3767, 3766, 3762);
            break;
        default:
            console.error("Marketp App > Invalid: User Pod in getEmailIds()");
            break;
    }
    return emIds;
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

    var isMktPageApp = window.setInterval(function() {
        if (typeof(MktPage) !== "undefined") {
            console.log("Marketo App > Location: Marketo Page");
            
            window.clearInterval(isMktPageApp);

            var accountString = MktPage.savedState.custPrefix,
                userId = MktPage.userid;
            if (accountString.search("^mktodemoaccount") != -1
			&& (userId.search("\.demo@marketo\.com$") != -1
			|| userId.search("^admin@mktodemoaccount") != -1
            || userId.search("^mktodemoaccount[a-z0-9]*@marketo\.com") != -1)) {
                console.log("Marketo App > Location: MarketoLive Instance");

                if (userId.search("^admin@mktodemoaccount") != -1
                || userId.search("^mktodemoaccount[a-z0-9]*@marketo\.com") != -1) {
                    console.log("Marketo App > User: Admin");

                    // Disabling Demo Plugin Check
                    APP.disableDemoPluginCheck();

                    if (APP.getCookie("priv") != "false") {
                        return;
                    } 
                    else {
                        console.log("Marketo App > User: Admin is now a normal user");
                    }
                }

                var currUrlFragment,
                    prevWorkspaceId,
                    oppInfluenceAnalyzerFragment = "AR1559A1!",
                    programAnalyzerFragment = "AR1544A1!",
                    modeler106Fragment = "RCM39A1!",
                    modeler106abFragment = "RCM5A1!",
                    successPathAnalyzerFragment = "AR1682A1!";
                // Disabling Demo Plugin Check
                APP.disableDemoPluginCheck();

                // Getting the URL fragment, the part after the #
                currUrlFragment = Mkt3.DL.getDlToken();

                // Email Deliverability
                if (currUrlFragment == mktoMyMarketoFragment) {
                    APP.overrideDeliverabilityToolsTile();
                }
				else if (currUrlFragment == mktoMarketingActivitiesDefaultFragment
				|| currUrlFragment == mktoLeadDatabaseDefaultFragment) {
					APP.disableButtons();
				}

                if (currUrlFragment.search("^" + mktoEmailDesignerFragment) == -1
                && currUrlFragment.search("^" + mktoEmailPreviewFragment)
                && currUrlFragment.search("^" + mktoLandingPageDesignerFragment) == -1
                && currUrlFragment.search("^" + mktoLandingPagePreviewFragment) == -1
                && currUrlFragment.search("^" + mktoFormWizardFragment) == -1 
                && currUrlFragment.search("^" + mktoMobilePushNotificationWizardFragment) == -1 
                && currUrlFragment.search("^" + mktoSocialAppWizardFragment) == -1) {
                    // Storing previous Workspace ID
                    if (currUrlFragment != mktoMyMarketoFragment) {
						var isMktCanvas = window.setInterval(function() {
							if (MktCanvas.activeTab !== null) {
								console.log("Marketo App > Location: Marketo Canvas");
								
								window.clearInterval(isMktCanvas);
								prevWorkspaceId = MktCanvas.activeTab.config.accessZoneId;
								if (prevWorkspaceId == 1) {
									// Powerful Automation
									APP.disableSmartCampaignSaving();
									APP.enableSmartCampaignCanvas();

									// Intelligent Nurturing
									APP.disableSaving();
								}
							}
						}, 0);
					}

                    // Marketing ROI, Funnel Analysis
                    if (currUrlFragment == oppInfluenceAnalyzerFragment
					|| currUrlFragment == programAnalyzerFragment
					|| currUrlFragment == modeler106Fragment
					|| currUrlFragment == modeler106abFragment
					|| currUrlFragment == successPathAnalyzerFragment) {
                        console.log("Marketo App > Location: Analytics");

                        APP.injectAnalyzerNavBar();
                    }

                    // Setting the asset draft IDs to discard
                    var lpIds = {},
                        formIds = [],
                        pushIds = [],
                        emIds = APP.getEmailIds(APP.getCookie("userPod"));
                    switch (accountString) {
                        case "mktodemoaccount106":
                            // Landing Page
                            lpIds["dpageid_11381"] = "dpageid_11381";
                            // Responsive Landing Page
                            lpIds["dpageid_11291"] = "dpageid_11291";
                            // DIY Design and Replicate Success Forms
                            formIds.push(2892, 1749, 1900);  
                            // DIY Design and Mobile Engagement Push Notifications 
                            pushIds.push(29, 23);               
                            break;
                        case "mktodemoaccount106a":
                            // Custom Landing Page
                            lpIds["dpageid_10672"] = "dpageid_10672";
                            // Responsive Landing Page
                            lpIds["dpageid_10454"] = "dpageid_10454";
                            // DIY Design and Replicate Success Forms
                            formIds.push(2532, 1749, 1900);  
                            // DIY Design and Mobile Engagement Push Notifications 
                            pushIds.push(29, 26); 
                            break;
                        case "mktodemoaccount106b":
                            // Landing Page
                            lpIds["dpageid_10760"] = "dpageid_10768";
                            // Responsive Landing Page
                            lpIds["dpageid_10762"] = "dpageid_10762";
                            // DIY Design and Replicate Success Forms
                            formIds.push(2472, 1749, 1900);  
                            // DIY Design and Mobile Engagement Push Notifications 
                            pushIds.push(2, 1); 
                            break;
                        default:
                            break;
                    }
                    var canDiscardDrafts = window.setInterval(function () {
                        if (typeof(mktLPLManager) !== "undefined") {
                            window.clearInterval(canDiscardDrafts);
                            // DIY Design (Landing Pages)
                            APP.discardLandingPageDrafts(lpIds);
                            // DIY Design (Email)
                            APP.discardEmailDrafts(emIds);
                            // DIY Design (Forms)
                            APP.discardFormPushDrafts("Form", formIds);
                            // DIY Design (Push Notifications)
                            APP.discardFormPushDrafts("MobilePushNotification", pushIds);
                            // Limiting Nurture Programs
                            APP.limitNurturePrograms();
                            // Disabling New Smart Campaign, New Local Asset, New Folder, and Delete
                            APP.disableMenus();
                        }
                    }, 0);
                } 
                else if (currUrlFragment.search("^" + mktoLandingPageDesignerFragment) != -1) {
                    console.log("Marketo App > Location: Landing Page Designer");

                    var customCompanyLandingPage106Fragment = "LPE11381",
                        customCompanyLandingPagePreview106Fragment = "LPP11381",
                        customCompanyLandingPage106aFragment = "LPE10672",
                        customCompanyLandingPagePreview106aFragment = "LPP10672",
                        customCompanyLandingPage106bFragment = "LPE10768",
                        customCompanyLandingPagePreview106bFragment = "LPP10768";
                    // Disabling System Error Message for sync conflicts
                    APP.disableSystemErrorMessage();
                    
                    // Overlay Landing Page Designer w/ company logo and color
                    switch (currUrlFragment) {
                        case customCompanyLandingPage106Fragment:
                            APP.overlayLandingPageDesigner();
                            break;
                        case customCompanyLandingPagePreview106Fragment:
                            APP.overlayLandingPageDesigner();
                            break;
                        case customCompanyLandingPage106aFragment:
                            APP.overlayLandingPageDesigner();
                            break;
                        case customCompanyLandingPagePreview106aFragment:
                            APP.overlayLandingPageDesigner();
                            break;
                        case customCompanyLandingPage106bFragment:
                            APP.overlayLandingPageDesigner();
                            break;
                        case customCompanyLandingPagePreview106bFragment:
                            APP.overlayLandingPageDesigner();
                            break;
                        default:
                            break;
                    }
                    return;
                } 
                else {
                    console.log("Marketo App > Location: Designers/Wizards");

                    // DIY Design (Emails, Forms, Push Notifications, Social Apps)
                    var currAssetZoneId,
                        customCompanyEmail106Fragment = "EME15464",
                        customCompanyEmail106aFragment = "EME14240",
                        customCompanyEmail106bFragment = "EME13924",
                        loadParameters = {
                            filters: [{
                                property: 'id',
                                value: Mkt3.DL.dl.compId
                            }],
                            callback: function(records) {
                                records.forEach(
                                    function(record) {
                                        currAssetZoneId = record.get('zoneId');
                                        console.log("Marketo App > currAssetZoneId = " + currAssetZoneId);
                                        if (currAssetZoneId == 1) {
                                            APP.disableSaving();
                                        } else if (APP.getCookie("priv") == "false") {
                                            APP.disableSaving();
                                        }
                                    }
                                );
                            }
                        };

                    switch (Mkt3.DL.dl.dlCompCode) {
                        case mktoEmailDesignerFragment:
                            console.log("Callback for email editor");
                            Ext4.getStore('Email').load(loadParameters);
                            // Overlay Email Designer w/ Company Logo and Color
                            switch (currUrlFragment) {
                                case customCompanyEmail106Fragment:
                                    APP.overlayEmailDesigner();
                                    break;
                                case customCompanyEmail106aFragment:
                                    APP.overlayEmailDesigner();
                                    break;
                                case customCompanyEmail106bFragment:
                                    APP.overlayEmailDesigner();
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case mktoFormWizardFragment:
                            console.log("Callback for form editor");
                            Ext4.getStore('Form').load(loadParameters);
                            break;
                        case mktoMobilePushNotificationWizardFragment:
                            console.log("Callback for push editor");
                            Ext4.getStore('MobilePushNotification').load(loadParameters);
                            break;
                        case mktoSocialAppWizardFragment:
                            console.log("Callback for social editor");
                            Ext4.getStore('SocialApp').load(loadParameters);
                            break;
                        default:
                            currAssetZoneId = -1;
                            break;
                    }
                }

                window.onhashchange = function() {
                    console.log("Window: Hash Changed");

                    currentUrl = window.location.href;
                    // Getting the URL fragment, the part after the #
                    currUrlFragment = Mkt3.DL.getDlToken();
                    
                    // Email Deliverability
                    if (currUrlFragment == mktoMyMarketoFragment) {
                        APP.overrideDeliverabilityToolsTile();
                    }
					else if (currUrlFragment == mktoMarketingActivitiesDefaultFragment
					|| currUrlFragment == mktoLeadDatabaseDefaultFragment) {
						APP.disableButtons();
					}

                    if (currUrlFragment.search("^" + mktoEmailDesignerFragment) == -1
					&& currUrlFragment.search("^" + mktoLandingPageDesignerFragment) == -1
					&& currUrlFragment.search("^" + mktoFormWizardFragment) == -1
					&& currUrlFragment.search("^" + mktoMobilePushNotificationWizardFragment) == -1
					&& currUrlFragment.search("^" + mktoSocialAppWizardFragment) == -1
					&& currUrlFragment != mktoMyMarketoFragment) {

                        var isMktCanvasHash = window.setInterval(function() {
							if (MktCanvas.activeTab !== null) {
								console.log("Marketo App > Location: Marketo Canvas");
								
								window.clearInterval(isMktCanvasHash);
								var currWorkspaceId = MktCanvas.activeTab.config.accessZoneId;
								if (currWorkspaceId == prevWorkspaceId) {
								}
								else if (currWorkspaceId == 1) {
									// Powerful Automation
									APP.disableSmartCampaignSaving();
									APP.enableSmartCampaignCanvas();

									// Intelligent Nurturing
									APP.disableSaving();
									prevWorkspaceId = currWorkspaceId;
								} 
								else {
									// Enable Smart Campaign & Nurture Stream Saving for their Workspace
									if (APP.getCookie("priv") != "false") {
										APP.enableSmartCampaignSaving();
										APP.enableSaving();
									}
									prevWorkspaceId = currWorkspaceId;
								}
							}
						}, 0);

                        // Marketing ROI, Funnel Analysis
                        if (currUrlFragment == oppInfluenceAnalyzerFragment
						|| currUrlFragment == programAnalyzerFragment
						|| currUrlFragment == modeler106Fragment
						|| currUrlFragment == modeler106abFragment
						|| currUrlFragment == successPathAnalyzerFragment) {
                            console.log("Marketo App > Location: Analytics");

                            APP.injectAnalyzerNavBar();
                        }
                    }
                }
            }
        }
    }, 0);
}