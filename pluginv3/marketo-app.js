/**************************************************************************************
 *
 *  This script contains all of the functionality needed for the manipulation of the 
 *  Marekto App and handles the overwriting needed to overlay the MarketoLive 
 *  functionality onto the Marketo App. It is loaded by the MarketoLive plugin and 
 *  is responsible for the manipulation of the Marketo GUI.
 *
 *  @Author Andrew Garcia, Arrash Yasavolian, Brian Fisher
 *
 *  @namespace
 *
 **************************************************************************************/
console.log("Marketo App > Running");
// This is the value that the demo plugin check looks for
window.mkto_live_plugin_state = true;

/**************************************************************************************
 *
 *  Global Constants
 *
 **************************************************************************************/

// These are all expressed in regex notation. 
var currentUrl = window.location.href,
    currentProtocol = window.location.protocol,
    currentHost = window.location.host,
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
    mktoMarketingActivitiesMarketingFragment = "MA19802A1",
    mktoMarketingActivitiesJapaneseFragment = "MA19848A1",
	mktoLeadDatabaseDefaultFragment = "ML0A1ZN2",
    mktoLeadDatabaseMarketingFragment = "ML0A1ZN19788",
    mktoLeadDatabaseJapaneseFragment = "ML0A1ZN19834",
    mktoAnalyticsFragment = "AH0A1ZN17",
    mktoAdBridgeSmartListFragment = "SL1B2",
    mktoEmailDesignerFragment = "EME",
    mktoEmailPreviewFragment = "EMP",
    mktoLandingPageDesignerFragment = "LPE",
    mktoLandingPagePreviewFragment = "LPP",
    mktoFormWizardFragment = "FOE",
    mktoMobilePushNotificationWizardFragment = "MPNE",
    mktoSocialAppWizardFragment = "SOAE",
    mktoMarketingWorkspaceId = 172,
    mktoJapaneseWorkspaceId = 173,
    userWorkspaceName = "Marketing",
    isMktoLiveInstance = false,
    pod,

    APP = APP || {};

/**************************************************************************************
 *  
 *  This function gets the specified cookie for the current domain. It loops through
 *  the string contained in document.cookie and looks for the given cookie.
 *
 *  @Author Andrew Garcia
 *
 *  @function
 *
 *  @param {String} cookieField - Represents the key to search for inside document.cookie
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
 *  This function disables the demo plugin check that the Marketo subscription uses
 *  to enforce having the plugin installed. The user experience with the Marketo
 *  feature as implemented today isn't ideal, so this function disables it altogether.
 *  Obviously, only having the plugin could disable the check, so it's guaranteed that
 *  the user has the plugin (unless they're very Javascript savvy and paste this in the
 *  console).
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.disableDemoPluginCheck = function() {
    console.log("Marketo App > Disabling: Demo Plugin Check");

    window.mkto_live_plugin_state = true;
    MktPage.validateDemoPlugin = function() {};
    isMktoLiveInstance = true;
}

/**************************************************************************************
 *  
 *  This function disables the system error message for sync errors on Landing Pages.
 *  These errors would occur when two users edit the same landing page simultaneously.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.disableSyncErrorMessage = function() {
    console.log("Marketo App > Disabling: Landing Page Sync Error Message");

    // Old way that hid other system errors
    //MktMessage.showSystemError = function() {};
    Mkt3.controller.editor.LandingPagePropertyPanel.prototype.fireSyncProperties = function(record, changes) {
        var prop = record.get('properties');
        if (prop) {
            var prop = this.normalizeProperties(Ext4.clone(prop), false, changes);
            record.set('properties', prop);
        }
        
        if (record.data.localeId != 1) { 
            this.application.fireEvent('message.lp.syncProperties', record, changes);
        }
    }
}

/**************************************************************************************
 *  
 *  This function disables the confirmation message for deleting Triggers, Filters, and
 *  Flow Steps from a Smart Campaign or Smart List in the Default Worksapce.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.disableConfirmationMessage = function() {
    console.log("Marketo App > Disabling: Smart Campaign Delete Confirmation Message");
    
    Mkt.widgets.DataPanel.prototype.clickClose = function() {
        var hasChanges = this.hasSettings(),
            showTriggerWarning = false;
        if (this.isSmartlist && this.dpMeta.trigger) {
            var triggerCount = this.dpMgr.getTriggers().length;
            if (triggerCount == 1) {
                showTriggerWarning = true;
            }
        }
        
        if (hasChanges || showTriggerWarning) {
            var title = MktLang.getStr('DataFormPanel.Delete_arg0', [this.dpTypeName(true)]),
                name = this.dpMeta.displayName || this.dpMeta.name,
                msg = MktLang.getStr('DataFormPanel.Are_you_sure_you_want_to_delete_arg0_arg1', [this.dpTypeName(), MktLang.getDBStr(name)]);
            
            if (showTriggerWarning) {
                msg += MktLang.getStr("DataFormPanel.Triggered_campaigns_must_contain_trigger_remain_active");
            }
            
            if (this.dpMgr.isSmartlist && !this.dpMeta.trigger && this.dpMgr.smartListRuleLogic.customMode()) {
                msg += MktLang.getStr('DataFormPanel.Reminder') +
                MktLang.getStr('DataFormPanel.Check_your_advanced_filter_rules_after_any_insert_delete_reorder');
            }
            
            if (MktCanvas
            && MktCanvas.getActiveTab()
            && MktCanvas.getActiveTab().config
            && MktCanvas.getActiveTab().config.accessZoneId) {
                console.log("Marketo App > Closing: Smart Campaign Delete Confirmation Message");
                this._doClose();
                /*
                if (hasChanges && showTriggerWarning) {
                    Ext4.Msg.confirmDelete({
                        title : title,
                        msg : msg,
                        minHeight : 300,
                        fn : function (buttonId) {
                            if (buttonId === 'ok') {
                                this._doClose();
                            }
                        },
                        scope : this
                    });
                }
                else {
                    console.log("Marketo App > Closing: Smart Campaign Delete Confirmation Message");
                    this._doClose();
                }
                */
            }
            else {
                Ext4.Msg.confirmDelete({
                    title : title,
                    msg : msg,
                    minHeight : 300,
                    fn : function (buttonId) {
                        if (buttonId === 'ok') {
                            this._doClose();
                        }
                    },
                    scope : this
                });
            }
        }
        else {
            this._doClose();
        }
    }
}

/**************************************************************************************
 *  
 *  This function overrides the target link for the Deliverability Tools tile if it 
 *  exists, otherwise it creates the tile. By default, the tile uses SSO to login to 
 *  250ok. However, we only have one 250ok instance that contains usable demo data, so 
 *  the plugin directs people into that instance. This function directs users to the 
 *  250ok login page where the deliverability-tools.js script will automatically login 
 *  and hide the necessary buttons. This function should also run inside of SC sandbox 
 *  instances.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.overrideDeliverabilityToolsTile = function() {
    console.log("Marketo App > Overriding: Deliverability Tools Tile");
    
    var tiles = MktCanvas.getEl().dom.nextSibling.childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes,
        currTileSpanTags,
        currTileAtags,
        spareTile,
        deliverabilityToolsTile,
        ii,
        jj;
        
    for (ii = 0; ii < tiles.length; ii++) {
        if (tiles[ii].getAttribute("role") == "presentation") {
            spareTile = tiles[ii];
            break;
        }
        currTileSpanTags = tiles[ii].getElementsByTagName("span");
        for (jj = 0; jj < currTileSpanTags.length; jj++) {
            if (currTileSpanTags[jj].innerHTML == "Deliverability Tools") {
                deliverabilityToolsTile = tiles[ii];
                break;
            }
        }
        currTileAtags = tiles[ii].getElementsByTagName("a");
        for (jj = 0; jj < currTileAtags.length; jj++) {
            if (currTileAtags[jj].href.search("/homepage/sso\\?sso=250ok$") != -1) {
                currTileAtags[jj].href = "https://250ok.com/login";
                break;
            }
        }
    }
    
    if (deliverabilityToolsTile == null && spareTile != null) {
        tiles[tiles.length] = spareTile;
        tiles[tiles.length].outerHTML = '<div class="x4-btn mkt3-homeTile x4-btn-default-small x4-icon-text-left x4-btn-icon-text-left x4-btn-default-small-icon-text-left" style="height: 150px;" id="homeTile-1036"><em id="homeTile-1036-btnWrap"><a id="homeTile-1036-btnEl" href="https://250ok.com/login" class="x4-btn-center" target="_blank" role="link" style="width: 150px; height: 150px;"><span id="homeTile-1036-btnInnerEl" class="x4-btn-inner" style="width: 150px; height: 150px; line-height: 150px;">Deliverability Tools</span><span id="homeTile-1036-btnIconEl" class="x4-btn-icon mki3-mail-sealed-svg"></span></a></em></div>';
    }
}

/**************************************************************************************
 *  
 *  This function overrides the target link for the Deliverability Tools Superball menu  
 *  item if it exists, otherwise it creates the tile. By default, the tile uses SSO to 
 *  login to 250ok. However, we only have one 250ok instance that contains usable demo 
 *  data, so the plugin directs people into that instance. This function directs users 
 *  to the 250ok login page where the deliverability-tools.js script will automatically 
 *  login and hide the necessary buttons. This function should also run inside of SC 
 *  sandbox instances.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.overrideDeliverabilityToolsMenuItem = function() {
    console.log("Marketo App > Overriding: Deliverability Superball Menu Item");
    
    var superBallMenuItems,
        currSuperBallMenuItemSpanTags,
        currSuperBallMenuItemAtags,
        deliverabilityToolsMenuItem,
        communityMenuItemNum,
        communityMenuItemSpanTags,
        communityMenuItemAtags,
        ii,
        jj;
    
    MktPage.showSuperMenu();
    if (MktCanvas.getEl().dom.ownerDocument.body.childNodes[17].id == "ext4-ext-gen1024") {
        superBallMenuItems = MktCanvas.getEl().dom.ownerDocument.body.childNodes[17].childNodes[1].childNodes[0].childNodes[1].childNodes[1].childNodes;
    }
    else if (MktCanvas.getEl().dom.ownerDocument.body.childNodes[18].id == "ext4-ext-gen1024") {
        superBallMenuItems = MktCanvas.getEl().dom.ownerDocument.body.childNodes[18].childNodes[1].childNodes[0].childNodes[1].childNodes[1].childNodes;
    }
    
    for (ii = 0; ii < superBallMenuItems.length; ii++) {
        currSuperBallMenuItemSpanTags = superBallMenuItems[ii].getElementsByTagName("span");
        for (jj = 0; jj < currSuperBallMenuItemSpanTags.length; jj++) {
            if (currSuperBallMenuItemSpanTags[jj].innerHTML == "My Marketo") {
                superBallMenuItems[ii].click();
                break;
            }
            else if (currSuperBallMenuItemSpanTags[jj].innerHTML == "Deliverability Tools") {
                deliverabilityToolsMenuItem = superBallMenuItems[ii];
                break;
            }
            else if (currSuperBallMenuItemSpanTags[jj].innerHTML == "Community") {
                communityMenuItemNum = ii;
                break;
            }
        }
        currSuperBallMenuItemAtags = superBallMenuItems[ii].getElementsByTagName("a");
        for (jj = 0; jj < currSuperBallMenuItemAtags.length; jj++) {
            if (currSuperBallMenuItemAtags[jj].href.search("/homepage/sso\\?sso=250ok$") != -1) {
                currSuperBallMenuItemAtags[jj].href = "https://250ok.com/login";
                break;
            }
        }
    }
    
    if (deliverabilityToolsMenuItem == null && communityMenuItemNum != null) {
        communityMenuItemSpanTags = superBallMenuItems[communityMenuItemNum].getElementsByTagName("span");
        for (jj = 0; jj < communityMenuItemSpanTags.length; jj++) {
            if (communityMenuItemSpanTags[jj].innerHTML == "Community") {
                communityMenuItemSpanTags[jj].innerHTML = "Deliverability Tools";
                break;
            }
        }
        communityMenuItemAtags = superBallMenuItems[communityMenuItemNum].getElementsByTagName("a");
        for (jj = 0; jj < communityMenuItemAtags.length; jj++) {
            if (communityMenuItemAtags[jj].href.search("/guide/displaySuccessContent\\?contentTag=main_MarketoCommunityHome$") != -1) {
                communityMenuItemAtags[jj].href = "https://250ok.com/login";
                break;
            }
        }
    }
}

/**************************************************************************************
 *  
 *  This function overrides the target link of the Analytics tiles in order to link to   
 *  the Group Reports within the Default Workspace as those report settings are saved
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/
 
APP.overrideAnalyticsTiles = function() {
    console.log("Marketo App > Overriding: Analytics Tiles");
    
    var isAnalyticsTiles = window.setInterval(function() {
        if (typeof(MktPage) !== "undefined"
        && typeof(MktCanvas) !== "undefined"
        && typeof(MktCanvas.getActiveTab().config.mkt3XType) !== "undefined") {
            window.clearInterval(isAnalyticsTiles);
            if (MktPage != null
            && MktPage.savedState != null
            && MktPage.savedState.custPrefix != null
            && MktPage.savedState.custPrefix == "mktodemoaccount106"
            && MktCanvas != null
            && MktCanvas.getActiveTab().config.mkt3XType == "analyticsHome"
            && MktCanvas.getActiveTab().config.accessZoneId != null
            && MktCanvas.getActiveTab().config.accessZoneId == 1
            && MktCanvas.getActiveTab().el != null
            && MktCanvas.getActiveTab().el.dom != null
            && MktCanvas.getActiveTab().el.dom.childNodes != null) {
                console.log("Marketo App > Executing: Analytics Tiles");
                
                var ii,
                    host = "https://app-sjp.marketo.com",
                    numOfTiles = MktCanvas.getActiveTab().el.dom.childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes.length;
                for (ii = 0; ii < numOfTiles; ii++) {
                    var currTileHTML = MktCanvas.getActiveTab().el.dom.childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[ii].outerHTML;
                    switch (MktCanvas.getActiveTab().el.dom.childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[ii].textContent) {
                        case "Email Performance":
                            currTileHTML = '<a href="' + host + '/#AR3866B2">' + currTileHTML + '</a>';
                            MktCanvas.getActiveTab().el.dom.childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[ii].outerHTML = currTileHTML;
                            break;
                        
                        case "Lead Performance":
                            currTileHTML = '<a href="' + host + '/#AR3874B2">' + currTileHTML + '</a>';
                            MktCanvas.getActiveTab().el.dom.childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[ii].outerHTML = currTileHTML;
                            break;

                        case "Web Page Activity":
                            currTileHTML = '<a href="' + host + '/#AR3876B2">' + currTileHTML + '</a>';
                            MktCanvas.getActiveTab().el.dom.childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[ii].outerHTML = currTileHTML;
                            break;

                        case "Opportunity Influence Analyzer":
                            currTileHTML = '<a href="' + host + '/#AR1559A1!">' + currTileHTML + '</a>';
                            MktCanvas.getActiveTab().el.dom.childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[ii].outerHTML = currTileHTML;
                            break;

                        case "Program Analyzer":
                            currTileHTML = '<a href="' + host + '/#AR1544A1!">' + currTileHTML + '</a>';
                            MktCanvas.getActiveTab().el.dom.childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[ii].outerHTML = currTileHTML;
                            break;

                        case "Success Path Analyzer":
                            currTileHTML = '<a href="' + host + '/#AR1682A1!">' + currTileHTML + '</a>';
                            MktCanvas.getActiveTab().el.dom.childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[ii].outerHTML = currTileHTML;
                            break;

                        case "Revenue Explorer":
                            //currTileHTML = '<a href="' + host + '/#">' + currTileHTML + '</a>';
                            //MktCanvas.getActiveTab().el.dom.childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[ii].outerHTML = currTileHTML;
                            break;

                        case "Engagement Stream Performance":
                            currTileHTML = '<a href="' + host + '/#AR3881B2">' + currTileHTML + '</a>';
                            MktCanvas.getActiveTab().el.dom.childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[ii].outerHTML = currTileHTML;
                            break;

                        case "Program Performance":
                            currTileHTML = '<a href="' + host + '/#AR3882B2">' + currTileHTML + '</a>';
                            MktCanvas.getActiveTab().el.dom.childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[ii].outerHTML = currTileHTML;
                            break;

                        case "Email Link Performance":
                            currTileHTML = '<a href="' + host + '/#AR3886B2">' + currTileHTML + '</a>';
                            MktCanvas.getActiveTab().el.dom.childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[ii].outerHTML = currTileHTML;
                            break;

                        case "Social Influence":
                            //currTileHTML = '<a href="' + host + '/#">' + currTileHTML + '</a>';
                            //MktCanvas.getActiveTab().el.dom.childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[ii].outerHTML = currTileHTML;
                            break;

                        case "Leads By Revenue Stage":
                            currTileHTML = '<a href="' + host + '/#AR3889B2">' + currTileHTML + '</a>';
                            MktCanvas.getActiveTab().el.dom.childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[ii].outerHTML = currTileHTML;
                            break;

                        case "Landing Page Performance":
                            currTileHTML = '<a href="' + host + '/#AR3891B2">' + currTileHTML + '</a>';
                            MktCanvas.getActiveTab().el.dom.childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[ii].outerHTML = currTileHTML;
                            break;

                        case "Leads By Status":
                            currTileHTML = '<a href="' + host + '/#AR3893B2">' + currTileHTML + '</a>';
                            MktCanvas.getActiveTab().el.dom.childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[ii].outerHTML = currTileHTML;
                            break;

                        case "Company Web Activity":
                            currTileHTML = '<a href="' + host + '/#AR3901B2">' + currTileHTML + '</a>';
                            MktCanvas.getActiveTab().el.dom.childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[ii].outerHTML = currTileHTML;
                            break;

                        case "Sales Insight Email Performance":
                            currTileHTML = '<a href="' + host + '/#AR3903B2">' + currTileHTML + '</a>';
                            MktCanvas.getActiveTab().el.dom.childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[ii].outerHTML = currTileHTML;
                            break;
                            
                        default:
                            break;
                    }
                }
            }
        }
    }, 0);
}

/**************************************************************************************
 *  
 *  This function overrides the save function of Smart Campaigns in order to disable   
 *  saving within the Default Workspace at all times and within the Marketing Worksapce 
 *  if edit privileges is false
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.overrideSmartCampaignSaving = function() {
    console.log("Marketo App > Overriding: Saving for Smart Campaigns");
    
    Mkt.widgets.DataPanelManager.prototype.save = function(cause, dp, acceptUpdates) {
        this._updateDataPanelOrder(true);
        var workspaceId = MktCanvas.getActiveTab().config.accessZoneId;
        if (workspaceId != 1
        && workspaceId != mktoJapaneseWorkspaceId
        && APP.getCookie("priv") != "false") {
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
        else {
            console.log("Marketo App > Disabling: Saving for Smart Campaigns");
        }
    }
}

/**************************************************************************************
 *  
 *  This function enables the Smart List and Flow Canvases for Smart Campaigns within 
 *  the Default Workspace. In the case where a user does not have edit privileges for 
 *  marketing assets, the UI palette for triggers, filters, and flow steps will not show 
 *  by default.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.overrideSmartCampaignCanvas = function() {
    console.log("Marketo App > Overriding: Smart Campaign Canvases");

    Mkt.widgets.DataPanelLayout.prototype.initComponent = function() {
        if (MktCanvas.getActiveTab().config.accessZoneId == 1) {
            console.log("Marketo App > Enabling: Smart Campaign Canvases");
            
            this.dpEditable = true;
        }
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
 *  This function overrides the expand function for a Marketo tree node in order to 
 *  hide each non-system folder that is in the Marketing workspace except the user's 
 *  own folder
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/
 
APP.overrideTreeNodeExpand = function() {
    console.log("Marketo App > Overriding: Tree Node Expand");
 
    MktAsyncTreeNode.prototype.expand = function() {
        console.log("Marketo App > Executing: Tree Node Expand");
        
        var attr = this.attributes,
            ii;
            
        if (this.text == userWorkspaceName
        || (this.parentNode.text == userWorkspaceName
            && this.attributes.system == true)
        || (this.parentNode.parentNode != null
            && this.parentNode.parentNode.text == userWorkspaceName
            && this.attributes.system == true)) {
            var userId = MktPage.userid.toLowerCase(),
            userName;
            
            if (userId.search("\.demo@marketo.com$") != -1) {
                userName = userId.split(".demo")[0];
            }
            else {
                userName = userId.split("@")[0];
            }
            for (ii = 0; ii < this.childNodes.length; ii++) {
                if (this.childNodes[ii].attributes.system == false) {
                    if (this.childNodes[ii].text.toLowerCase() !== userName) {
                        this.childNodes[ii].hidden = true;
                    }
                    else {
                    }
                }
            }
        }
        
        if (attr.folder) {
            if (attr.cancelFirstExpand) {
                delete this.attributes.cancelFirstExpand;
            }
            else if (this.childNodes
            && this.childNodes.length > 0
            && !attr.mktExpanded) {
                
                if (this.text != userWorkspaceName
                && this.parentNode.text != userWorkspaceName
                && this.parentNode.parentNode != null
                && this.parentNode.parentNode.text != userWorkspaceName) {
                    console.log("Marketo App > Saving: Folder Expand State");
                    MktFolder.saveExpandState(this, true);
                }
            }
        }
        MktAsyncTreeNode.superclass.expand.apply(this, arguments);
        attr.mktExpanded = true;
    }
}

/**************************************************************************************
 *  
 *  This function overrides the collapse function for a Marketo tree node in order to 
 *  hide each non-system folder that is in the Marketing workspace except the user's 
 *  own folder
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/
 
APP.overrideTreeNodeCollapse = function() {
    console.log("Marketo App > Overriding: Tree Node Collapse");
    
        MktAsyncTreeNode.prototype.collapse = function() {
        console.log("Marketo App > Executing: Tree Node Collapse");
        
        var attr = this.attributes,
            ii;
            
        if (this.text == userWorkspaceName
        || (this.parentNode.text == userWorkspaceName
            && this.attributes.system == true)
        || (this.parentNode.parentNode != null
            && this.parentNode.parentNode.text == userWorkspaceName
            && this.attributes.system == true)) {
            var userId = MktPage.userid.toLowerCase(),
            userName;
            
            if (userId.search("\.demo@marketo.com$") != -1) {
                userName = userId.split(".demo")[0];
            }
            else {
                userName = userId.split("@")[0];
            }
            for (ii = 0; ii < this.childNodes.length; ii++) {
                if (this.childNodes[ii].attributes.system == false) {
                    if (this.childNodes[ii].text.toLowerCase() !== userName) {
                        this.childNodes[ii].ui.elNode.hidden = true;
                    }
                    else {
                    }
                }
            }
        }
        
        if (attr.suppressAjaxCollapse) {
            delete this.attributes.suppressAjaxCollapse;
        }
        else if (isDefined(attr.folder)
        && attr.folder
        && attr.mktExpanded === true) {
            MktFolder.saveExpandState(this, false);
        }
        MktTreeNode.superclass.collapse.apply(this, arguments);
        attr.mktExpanded = false;
    }
}

/**************************************************************************************
 *  
 *  This function overrides the create function for a new Program or Segmentation in 
 *  order to enforce a naming convention by appending the user's username to the name 
 *  of the new program or segmentation
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/
 
APP.overrideNewProgramCreate = function() {
    console.log("Marketo App > Overriding: New Program/Segmentation Creation");
    
    Mkt.widgets.ModalForm.prototype.okButtonHandler = function() {
        console.log("Marketo App > Executing: New Program/Segmentation Creation");
    
        if (this.title == "New Program"
        || this.title == "New Segmentation") {
            var userId = MktPage.userid.toLowerCase(),
            userName,
            ii;
            if (userId.search("\.demo@marketo.com$") != -1) {
                userName = userId.split(".demo")[0];
            }
            else {
                userName = userId.split("@")[0];
            }
                
            if (this.title == "New Program") {
                if (this.items.items[2].fieldLabel == "Name") {
                    if (this.items.items[2].getValue().toLowerCase().search(userName + "$") == -1) {
                        this.items.items[2].setValue(this.items.items[2].getValue() + " - " + userName);
                    }
                }
                else {
                    for (ii = 0; ii < this.items.items.length; ii++) {
                        if (this.items.items[ii].fieldLabel == "Name") {
                            if (this.items.items[ii].getValue().toLowerCase().search(userName + "$") == -1) {
                                this.items.items[ii].setValue(this.items.items[ii].getValue() + " - " + userName);
                            }
                        }
                    }
                }
            }
            else if (this.title == "New Segmentation") {
                if (this.items.items[1].items.items[0].fieldLabel == "Name") {
                    if (this.items.items[1].items.items[0].getValue().toLowerCase().search(userName + "$") == -1) {
                        this.items.items[1].items.items[0].setValue(this.items.items[1].items.items[0].getValue() + " - " + userName);
                    }
                }
                else {
                    for (ii = 0; ii < this.items.items.length; ii++) {
                        for (jj = 0; jj < this.items.items[ii].items.items.length; jj++) {
                            if (this.items.items[ii].items.items[jj].fieldLabel == "Name") {
                                if (this.items.items[ii].items.items[jj].getValue().toLowerCase().search(userName + "$") == -1) {
                                    this.items.items[ii].items.items[jj].setValue(this.items.items[ii].items.items[jj].getValue() + " - " + userName);
                                }
                            }
                        }
                    }
                }
            }
        }
        
        if (this.submitInProgress) {
            return;
        }
        
        if (this.beforeSubmitCallback() === false) {
            return;
        };
        
        if (this.okCallback
             && isFunction(this.okCallback)) {
            this.okCallback();
        }
        
        if (!this.submitUrl) {
            return;
        }
        
        if (this.showProgressModal) {
            this.hide();
            
            this.progressModal = Ext.MessageBox.show({
                    title : MktLang.getStr('ModalForm.Please_wait'),
                    msg : this.progressMsg,
                    progress : true,
                    wait : true,
                    width : 200,
                    closable : false
                });
        }
        else {
            MktSession.clockCursor();
        }
        
        this.submitInProgress = true;
        this.enableOkCancelButton(!this.submitInProgress);
        
        if (this.serializeJSON) {
            this.serializeParms = this.serializeParms || {};
            this.serializeParms._json = Ext.encode(this.serializeJSON);
        }
        
        var parms = Ext.apply({}, this.serializeParms, this.baseParams);
        MktSession.ajaxRequest(this.submitUrl, {
            serializeParms : parms,
            onMySuccess : this.submitSuccessHandler.createDelegate(this),
            onMyFailure : this.submitFailedHandler.createDelegate(this)
        });
    }
}

/**************************************************************************************
 *  
 *  This function overrides the save edit function for renaming exisiting Programs, 
 *  Smart Campaigns, and Assets in order to enforce a naming convention by appending the 
 *  user's username to the name of the program, smart campaign, or asset
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/
 
APP.overrideAssetSaveEdit = function() {
    console.log("Marketo App > Overriding: Asset Save Edit");
    
    Mkt.widgets.CanvasHeader.prototype.saveEdit = function() {
        console.log("Marketo App > Executing: Asset Save Edit");
        
        if ((MktExplorer.getEl().dom.ownerDocument.title.search("Marketing Activities") != -1
            && (this.titleId == "mpTEName"
                || this.titleId == "cdhTEName"))
        || MktExplorer.getEl().dom.ownerDocument.title.search("Marketing Activities") == -1) {
            var userId = MktPage.userid.toLowerCase(),
            userName,
            ii;
            if (userId.search("\.demo@marketo.com$") != -1) {
                userName = userId.split(".demo")[0];
            }
            else {
                userName = userId.split("@")[0];
            }
                
            if (this.items.items[1].items.items[0].name.search("Name$") != -1) {
                if (this.items.items[1].items.items[0].getValue().toLowerCase().search(userName + "$") == -1) {
                    this.items.items[1].items.items[0].setValue(this.items.items[1].items.items[0].getValue() + " - " + userName);
                }
            }
            else {
                for (ii = 0; ii < this.items.items.length; ii++) {
                    if (this.items.items[ii].defaultType == "textfield") {
                        var jj;
                        for (jj = 0; jj < this.items.items[ii].items.items.length; jj++) {
                            if (this.items.items[ii].items.items[jj].name.search("Name$") != -1) {
                                if (this.items.items[ii].items.items[jj].getValue().toLowerCase().search(userName + "$") == -1) {
                                    this.items.items[ii].items.items[jj].setValue(this.items.items[ii].items.items[jj].getValue() + "-" + userName);
                                }
                            }
                        }
                    }
                }
            }
        }
        
        var toUpdateNodeText = true;
        
        MktSession.clockCursor(true);
        this.serializeParms[this.titleId] = this.getTitleField().getValue();
        this.serializeParms[this.descId] = this.getDescField().getValue();
        
        this.newTitleValue = MktPage.isFeatureEnabled('treeEncoding') ? this.serializeParms[this.titleId] : Ext.util.Format.htmlEncode(this.serializeParms[this.titleId]);
        this.newDescValue = Ext.util.Format.htmlEncode(this.serializeParms[this.descId]);
        this.updateCanvasConfig();
        
        this.prevTitleValue = this.titleValue;
        this.titleValue = this.newTitleValue;
        this.descValue = this.newDescValue;
        MktPage.updateFullTitle();
        var canvasTab = MktCanvas.getActiveTab();
        canvasTab.updateTabTitle(this.titleValue);
        var nodeId = null;
        if (canvasTab.config.expNodeId) {
            var node = MktExplorer.getNodeById(canvasTab.config.expNodeId);
            if (node && node.attributes.compType) {
                var compType = node.attributes.compType;
                if (compType == 'Marketing Program') {
                    nodeId = canvasTab.config.expNodeId;
                    MktExplorer.lockSubTree(nodeId);
                }
                if (compType == 'Image') {
                    toUpdateNodeText = false;
                }
            }
            if (toUpdateNodeText) {
                MktExplorer.updateNodeText(canvasTab.config.expNodeId, this.titleValue);
            }
        }
        
        var el = this.getEl();
        var panelObj = this;
        var formPanel = this.formPanel;
        var viewPanel = this.viewPanel;
        formPanel.hide(true, 0.2);
        viewPanel.show(true, 0.2);
        viewPanel.body.update(panelObj.viewTemplate.apply(panelObj));
        
        el.animate({
            height : {
                from : this.getHeight(),
                to : this.origHeight
            }
        }, 0.25, function () {
            panelObj.setHeight(panelObj.origHeight);
            panelObj.body.setHeight(panelObj.origHeight);
            if (isFunction(panelObj.savedCallback)) {
                panelObj.savedCallback();
            }
        });
        
        MktSession.unclockCursor();
        this._saveInProgress = true;
        MktSession.ajaxRequest(this.actionUrl, {
            serializeParms : this.serializeParms,
            containerId : this.id,
            onMySuccess : this.saveResponse.createDelegate(this, [nodeId], true),
            onMyError : this.saveError.createDelegate(this, [nodeId])
        });
    }
}

/**************************************************************************************
 *  
 *  This function overrides the create function for any new asset that is not a child 
 *  of a program in order to enforce a naming convention by appending the user's  
 *  username to the name of the new asset
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/
 
APP.overrideNewAssetCreate = function() {
    console.log("Marketo App > Overriding: New Asset Creation");
    
    Mkt3.controller.lib.AbstractModalForm.prototype.onSubmit = function(form) {
        console.log("Marketo App > Executing: New Asset Creation");
        
        if (form == null
        || form.ownerAsset == null
        || form.ownerAsset.isOneOfProgramTypes == null
        || form.ownerAsset.isOneOfProgramTypes() == false) {
            if (this != null
            && this.getField("name") != null
            && this.getField("name").getValue() != null) {
                var assetName = this.getField("name").getValue(),
                userId = MktPage.userid.toLowerCase(),
                userName;
                if (userId.search("\.demo@marketo.com$") != -1) {
                    userName = userId.split(".demo")[0];
                }
                else {
                    userName = userId.split("@")[0];
                }
                if (assetName.toLowerCase().search(userName + "$") == -1) {
                    this.getField("name").setValue(assetName + " - " + userName);
                }
            }
        }
        
        form = !form.isXType('modalForm') ? form.up('modalForm') : form;
        
        form.setSubmitting(true);
        
        if (this.validate(form)) {
            if (this.application.fireEvent(this.widgetId + 'BeforeSubmit', form ? form.getRecord() : null) !== false) {
                if (this.submit(form) !== false) {
                    this.submitComplete(form);
                }
            }
            else {
                form.setSubmitting(false);
            }
        }
        else {
            form.showDefaultMessage();
            form.setSubmitting(false);
        }
    }
}

/**************************************************************************************
 *  
 *  This function hides all folders in the drop down list when importing a program 
 *  except the user's own folder
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/
 
APP.hideFoldersOnImport = function() {
    console.log("Marketo App > Hiding: Folders On Program Import via Override");
     
    Ext.form.ComboBox.prototype.onTriggerClick = function() {
        if (this.readOnly
        || this.disabled) {
            return;
        }
        if (this.isExpanded()) {
            this.collapse();
            this.el.focus();
        }
        else {
            this.onFocus({});
            if (this.triggerAction == 'all') {
                
                this.doQuery(this.allQuery, true);
                
                if (this != null
                && this.label != null
                && this.label.dom != null
                && this.label.dom.textContent != null
                && this.label.dom.textContent == "Campaign Folder:"
                && MktCanvas != null
                && MktCanvas.getActiveTab() != null
                && MktCanvas.getActiveTab().config != null
                && MktCanvas.getActiveTab().config.accessZoneId != null
                && MktCanvas.getActiveTab().config.accessZoneId == mktoMarketingWorkspaceId) {
                    var userId = MktPage.userid.toLowerCase(),
                        userName,
                        ii;
                    if (userId.search("\.demo@marketo.com$") != -1) {
                        userName = userId.split(".demo")[0];
                    }
                    else {
                        userName = userId.split("@")[0];
                    }
                    for (ii = 0; ii < this.view.all.elements.length; ii++) {
                        if (this.view.all.elements[ii].textContent.toLowerCase() != userName) {
                            this.view.all.elements[ii].hidden = true;
                        }
                    }
                }
            }
            else {
                this.doQuery(this.getRawValue());
            }
            this.el.focus();
        }
    }
}

/**************************************************************************************
 *  
 *  This function hides the canvas page grid in the Marketing Workspace for:
 *  Design Studio > Landing Pages, Forms, Emails, Snippets, Images and Files;
 *  Lead Database > Any List > Lead List;
 *  Marketing Activities > Any Smart Campaign > Results View
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.hidePageGrid = function() {
    console.log("Marketo App > Hiding: Page Grid via Override");
    
    MktGrids.CanvasGridPanel.prototype.loadPagedGrid = function() {
        if (MktCanvas.activeTab.config.accessZoneId == mktoMarketingWorkspaceId) {
            switch (this.canvas) {
                // Design Studio > Landing Pages
                case "landingCanvasLP":
                    this.hide();
                    break;
                // Design Studio > Forms
                case "landingCanvasFO":
                    this.hide();
                    break;
                // Design Studio > Emails
                case "landingCanvasEM":
                    this.hide();
                    break;
                // Design Studio > Snippets
                case "landingCanvasSnippet":
                    this.hide();
                    break;
                // Design Studio > Images and Files
                case "landingCanvasIM":
                    this.hide();
                    break;
                // Lead Database > Any List > Lead List
                case "ldbCanvasLeadList":
                    this.hide();
                    break;
                // Marketing Activities > Any Smart Campaign > Results View
                case "campaignCanvasDetailActivityLog":
                    this.hide();
                    break;
                // Analytics > Any Report > Report View
                case "atxCanvasDetailView":
                    break;
                default:
                    break;
            }
        }
        this.store.load({params:{start: 0, query: this.query}});
    }
}

/**************************************************************************************
 *  
 *  This function disables the Default and Marketing Workspaces home buttons:   
 *  New Program, New Smart Campaign, and New Smart List
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.disableButtons = function() {
	console.log("Marketo App > Disabling: Buttons");
	
	$jQ = jQuery.noConflict();
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
							&& (canvas.config.accessZoneId == 1
                                || canvas.config.accessZoneId == mktoJapaneseWorkspaceId);
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
				disableMenu = (canvas
							&& canvas.config
							&& canvas.config.accessZoneId)
							&& ((canvas.config.accessZoneId == 1
                                    || canvas.config.accessZoneId == mktoJapaneseWorkspaceId)
                                || (canvas.config.title == "Marketing Activities"
                                    && canvas.config.accessZoneId == mktoMarketingWorkspaceId))
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
							&& (canvas.config.accessZoneId == 1
                                || canvas.config.accessZoneId == mktoJapaneseWorkspaceId);
				button.menu.items.each(function(item) {
					item.setDisabled(disableMenu);
				});
			}
		};
	}
	
	// Disables Marketing Activities > Marketing Program, Nurture Program, Event Program, and Email Batch Program > Actions menus
	var prevActionsMenu = Mkt.menus.marketingEvent.Toolbar.preShowMarketingProgramActions;
	Mkt.menus.marketingEvent.Toolbar.preShowMarketingProgramActions = Mkt.menus.marketingEvent.Toolbar.preShowMarketingEventActions = function(menu) {
		prevActionsMenu.apply(this, arguments);
		var mItems = menu.items,
			canvas = MktCanvas.getActiveTab(),
			disable = canvas
					&& canvas.config
					&& canvas.config.accessZoneId
					&& (canvas.config.accessZoneId == 1
                        || canvas.config.accessZoneId == mktoJapaneseWorkspaceId),
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
            disable = (attr
                        && attr.accessZoneId 
                        && (attr.accessZoneId == 1
                            || attr.accessZoneId == mktoJapaneseWorkspaceId))
                    || (attr
                        && attr.depth
                        && attr.depth == 1
                        && attr.accessZoneId
                        && attr.accessZoneId == mktoMarketingWorkspaceId)
                    || (!attr
                        || !attr.accessZoneId
                        && menu
                        && menu.currNode
                        && menu.currNode.attributes
                        && menu.currNode.attributes.accessZoneId
                        && (menu.currNode.attributes.accessZoneId == 1
                            || menu.currNode.attributes.accessZoneId == mktoJapaneseWorkspaceId))
                    || (!menu
                        || !menu.currNode
                        && canvas
                        && canvas.config
                        && canvas.config.accessZoneId
                        && (canvas.config.accessZoneId == 1
                            || canvas.config.accessZoneId == mktoJapaneseWorkspaceId)),
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
			disable = (attr
                        && attr.accessZoneId 
                        && (attr.accessZoneId == 1
                            || attr.accessZoneId == mktoJapaneseWorkspaceId))
                    || (attr
                        && attr.depth
                        && attr.depth == 1
                        && attr.accessZoneId
                        && attr.accessZoneId == mktoMarketingWorkspaceId)
                    || (!attr
                        || !attr.accessZoneId
                        && menu
                        && menu.currNode
                        && menu.currNode.attributes
                        && menu.currNode.attributes.accessZoneId
                        && (menu.currNode.attributes.accessZoneId == 1
                            || menu.currNode.attributes.accessZoneId == mktoJapaneseWorkspaceId))
                    || (!menu
                        || !menu.currNode
                        && canvas
                        && canvas.config
                        && canvas.config.accessZoneId
                        && (canvas.config.accessZoneId == 1
                            || canvas.config.accessZoneId == mktoJapaneseWorkspaceId)),
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
			disable = (attr
                        && attr.accessZoneId 
                        && (attr.accessZoneId == 1
                            || attr.accessZoneId == mktoJapaneseWorkspaceId))
                    || (attr
                        && attr.depth
                        && attr.depth == 1
                        && attr.accessZoneId
                        && attr.accessZoneId == mktoMarketingWorkspaceId)
                    || (!attr
                        || !attr.accessZoneId
                        && menu
                        && menu.currNode
                        && menu.currNode.attributes
                        && menu.currNode.attributes.accessZoneId
                        && (menu.currNode.attributes.accessZoneId == 1
                            || menu.currNode.attributes.accessZoneId == mktoJapaneseWorkspaceId))
                    || (!menu
                        || !menu.currNode
                        && canvas
                        && canvas.config
                        && canvas.config.accessZoneId
                        && (canvas.config.accessZoneId == 1
                            || canvas.config.accessZoneId == mktoJapaneseWorkspaceId)),
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
			disable = (attr
                        && attr.accessZoneId 
                        && (attr.accessZoneId == 1
                            || attr.accessZoneId == mktoJapaneseWorkspaceId))
                    || (attr
                        && attr.depth
                        && attr.depth == 1
                        && attr.accessZoneId
                        && attr.accessZoneId == mktoMarketingWorkspaceId)
                    || (!attr
                        || !attr.accessZoneId
                        && menu
                        && menu.currNode
                        && menu.currNode.attributes
                        && menu.currNode.attributes.accessZoneId
                        && (menu.currNode.attributes.accessZoneId == 1
                            || menu.currNode.attributes.accessZoneId == mktoJapaneseWorkspaceId))
                    || (!menu
                        || !menu.currNode
                        && canvas
                        && canvas.config
                        && canvas.config.accessZoneId
                        && (canvas.config.accessZoneId == 1
                            || canvas.config.accessZoneId == mktoJapaneseWorkspaceId)),
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
			disable = (attr
                        && attr.accessZoneId 
                        && (attr.accessZoneId == 1
                            || attr.accessZoneId == mktoJapaneseWorkspaceId))
                    || (attr
                        && attr.depth
                        && attr.depth == 1
                        && attr.accessZoneId
                        && attr.accessZoneId == mktoMarketingWorkspaceId)
                    || (!attr
                        || !attr.accessZoneId
                        && menu
                        && menu.currNode
                        && menu.currNode.attributes
                        && menu.currNode.attributes.accessZoneId
                        && (menu.currNode.attributes.accessZoneId == 1
                            || menu.currNode.attributes.accessZoneId == mktoJapaneseWorkspaceId))
                    || (!menu
                        || !menu.currNode
                        && canvas
                        && canvas.config
                        && canvas.config.accessZoneId
                        && (canvas.config.accessZoneId == 1
                            || canvas.config.accessZoneId == mktoJapaneseWorkspaceId)),
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

		var disable = (this.getSocialApp().get('zoneId') == 1
                    || this.getSocialApp().get('zoneId') == mktoJapaneseWorkspaceId),
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
			disable = (attr
                        && attr.accessZoneId 
                        && (attr.accessZoneId == 1
                            || attr.accessZoneId == mktoJapaneseWorkspaceId))
                    || (attr
                        && attr.depth
                        && attr.depth == 1
                        && attr.accessZoneId
                        && attr.accessZoneId == mktoMarketingWorkspaceId)
                    || (!attr
                        || !attr.accessZoneId
                        && menu
                        && menu.currNode
                        && menu.currNode.attributes
                        && menu.currNode.attributes.accessZoneId
                        && (menu.currNode.attributes.accessZoneId == 1
                            || menu.currNode.attributes.accessZoneId == mktoJapaneseWorkspaceId))
                    || (!menu
                        || !menu.currNode
                        && canvas
                        && canvas.config
                        && canvas.config.accessZoneId
                        && (canvas.config.accessZoneId == 1
                            || canvas.config.accessZoneId == mktoJapaneseWorkspaceId)),
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

		var disable = (this.getSocialApp().get('zoneId') == 1
                    || this.getSocialApp().get('zoneId') == mktoJapaneseWorkspaceId),
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
	var prevDesignStudioContextMenu = MktDsMenu.preShowContextMenu;
	MktDsMenu.preShowContextMenu = function(menu, attr) {
		prevDesignStudioContextMenu.apply(this, arguments);
		
		var mItems = menu.items,
			canvas = MktCanvas.getActiveTab(),
			disable = (attr
                        && attr.accessZoneId 
                        && (attr.accessZoneId == 1
                            || attr.accessZoneId == mktoJapaneseWorkspaceId))
                    || (attr
                        && attr.depth
                        && attr.depth == 1
                        && attr.accessZoneId
                        && attr.accessZoneId == mktoMarketingWorkspaceId)
                    || (!attr
                        || !attr.accessZoneId
                        && menu
                        && menu.currNode
                        && menu.currNode.attributes
                        && menu.currNode.attributes.accessZoneId
                        && (menu.currNode.attributes.accessZoneId == 1
                            || menu.currNode.attributes.accessZoneId == mktoJapaneseWorkspaceId))
                    || (!menu
                        || !menu.currNode
                        && canvas
                        && canvas.config
                        && canvas.config.accessZoneId
                        && (canvas.config.accessZoneId == 1
                            || canvas.config.accessZoneId == mktoJapaneseWorkspaceId)),
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
            disable = (attr
                        && attr.accessZoneId 
                        && (attr.accessZoneId == 1
                            || attr.accessZoneId == mktoJapaneseWorkspaceId))
                    || (attr
                        && attr.depth
                        && attr.depth == 1
                        && attr.accessZoneId
                        && attr.accessZoneId == mktoMarketingWorkspaceId)
                    || (!attr
                        || !attr.accessZoneId
                        && menu
                        && menu.currNode
                        && menu.currNode.attributes
                        && menu.currNode.attributes.accessZoneId
                        && (menu.currNode.attributes.accessZoneId == 1
                            || menu.currNode.attributes.accessZoneId == mktoJapaneseWorkspaceId))
                    || (!menu
                        || !menu.currNode
                        && canvas
                        && canvas.config
                        && canvas.config.accessZoneId
                        && (canvas.config.accessZoneId == 1
                            || canvas.config.accessZoneId == mktoJapaneseWorkspaceId)),
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
	
	// Disables Design Studio > Email Template > Right-click and Actions menus
	var prevEmailTemplateMenu = MktDsMenu.preShowEmailTemplateMenu;
	MktDsMenu.preShowEmailTemplateMenu = function(menu, attr) {
		prevEmailTemplateMenu.apply(this, arguments);
		
		var mItems = menu.items,
			canvas = MktCanvas.getActiveTab(),
			disable = (attr
                        && attr.accessZoneId 
                        && (attr.accessZoneId == 1
                            || attr.accessZoneId == mktoJapaneseWorkspaceId))
                    || (attr
                        && attr.depth
                        && attr.depth == 1
                        && attr.accessZoneId
                        && attr.accessZoneId == mktoMarketingWorkspaceId)
                    || (!attr
                        || !attr.accessZoneId
                        && menu
                        && menu.currNode
                        && menu.currNode.attributes
                        && menu.currNode.attributes.accessZoneId
                        && (menu.currNode.attributes.accessZoneId == 1
                            || menu.currNode.attributes.accessZoneId == mktoJapaneseWorkspaceId))
                    || (!menu
                        || !menu.currNode
                        && canvas
                        && canvas.config
                        && canvas.config.accessZoneId
                        && (canvas.config.accessZoneId == 1
                            || canvas.config.accessZoneId == mktoJapaneseWorkspaceId)),
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
			disable = (attr
                        && attr.accessZoneId 
                        && (attr.accessZoneId == 1
                            || attr.accessZoneId == mktoJapaneseWorkspaceId))
                    || (attr
                        && attr.depth
                        && attr.depth == 1
                        && attr.accessZoneId
                        && attr.accessZoneId == mktoMarketingWorkspaceId)
                    || (!attr
                        || !attr.accessZoneId
                        && menu
                        && menu.currNode
                        && menu.currNode.attributes
                        && menu.currNode.attributes.accessZoneId
                        && (menu.currNode.attributes.accessZoneId == 1
                            || menu.currNode.attributes.accessZoneId == mktoJapaneseWorkspaceId))
                    || (!menu
                        || !menu.currNode
                        && canvas
                        && canvas.config
                        && canvas.config.accessZoneId
                        && (canvas.config.accessZoneId == 1
                            || canvas.config.accessZoneId == mktoJapaneseWorkspaceId)),
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
			disable = (attr
                        && attr.accessZoneId 
                        && (attr.accessZoneId == 1
                            || attr.accessZoneId == mktoJapaneseWorkspaceId))
                    || (attr
                        && attr.depth
                        && attr.depth == 1
                        && attr.accessZoneId
                        && attr.accessZoneId == mktoMarketingWorkspaceId)
                    || (!attr
                        || !attr.accessZoneId
                        && menu
                        && menu.currNode
                        && menu.currNode.attributes
                        && menu.currNode.attributes.accessZoneId
                        && (menu.currNode.attributes.accessZoneId == 1
                            || menu.currNode.attributes.accessZoneId == mktoJapaneseWorkspaceId))
                    || (!menu
                        || !menu.currNode
                        && canvas
                        && canvas.config
                        && canvas.config.accessZoneId
                        && (canvas.config.accessZoneId == 1
                            || canvas.config.accessZoneId == mktoJapaneseWorkspaceId)),
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
	
	// Disables Lead Database > System Smart List, Smart List, List, Segment > Right-click menus
	var prevLeadDatabaseContextMenu = MktLeadDbMenu.preShowContextMenu;
	MktLeadDbMenu.preShowContextMenu = function(menu, attr) {
		prevLeadDatabaseContextMenu.apply(this, arguments);
		
		var mItems = menu.items,
			canvas = MktCanvas.getActiveTab(),
			disable = (attr
                        && attr.accessZoneId 
                        && (attr.accessZoneId == 1
                            || attr.accessZoneId == mktoJapaneseWorkspaceId))
                    || (attr
                        && attr.depth
                        && attr.depth == 1
                        && attr.accessZoneId
                        && attr.accessZoneId == mktoMarketingWorkspaceId)
                    || (!attr
                        || !attr.accessZoneId
                        && menu
                        && menu.currNode
                        && menu.currNode.attributes
                        && menu.currNode.attributes.accessZoneId
                        && (menu.currNode.attributes.accessZoneId == 1
                            || menu.currNode.attributes.accessZoneId == mktoJapaneseWorkspaceId))
                    || (!menu
                        || !menu.currNode
                        && canvas
                        && canvas.config
                        && canvas.config.accessZoneId
                        && (canvas.config.accessZoneId == 1
                            || canvas.config.accessZoneId == mktoJapaneseWorkspaceId)),
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
							"showSupportHistory",//Support Tools - History
							"showSupportUsagePerf",//Support Tools - Run Stats
							"showSmartListProcessorDiag",//Processor Diagnostics
							"showSmartListProcessorOverride",//Override Processor
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
	
	// Disables Lead Database > List > Right-click and Actions menu
	var prevListMenu = MktLeadDbMenu.preShowListListMenu;
	MktLeadDbMenu.preShowListListMenu = function(menu, attr) {
		prevListMenu.apply(this, arguments);
		
		var mItems = menu.items,
			canvas = MktCanvas.getActiveTab(),
			disable = (attr
                        && attr.accessZoneId 
                        && (attr.accessZoneId == 1
                            || attr.accessZoneId == mktoJapaneseWorkspaceId))
                    || (attr
                        && attr.depth
                        && attr.depth == 1
                        && attr.accessZoneId
                        && attr.accessZoneId == mktoMarketingWorkspaceId)
                    || (!attr
                        || !attr.accessZoneId
                        && menu
                        && menu.currNode
                        && menu.currNode.attributes
                        && menu.currNode.attributes.accessZoneId
                        && (menu.currNode.attributes.accessZoneId == 1
                            || menu.currNode.attributes.accessZoneId == mktoJapaneseWorkspaceId))
                    || (!menu
                        || !menu.currNode
                        && canvas
                        && canvas.config
                        && canvas.config.accessZoneId
                        && (canvas.config.accessZoneId == 1
                            || canvas.config.accessZoneId == mktoJapaneseWorkspaceId)),
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
							"showSupportHistory",//Support Tools - History
							"showSupportUsagePerf",//Support Tools - Run Stats
							"showSmartListProcessorDiag",//Processor Diagnostics
							"showSmartListProcessorOverride",//Override Processor
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
			disable = (attr
                        && attr.accessZoneId 
                        && (attr.accessZoneId == 1
                            || attr.accessZoneId == mktoJapaneseWorkspaceId))
                    || (attr
                        && attr.depth
                        && attr.depth == 1
                        && attr.accessZoneId
                        && attr.accessZoneId == mktoMarketingWorkspaceId)
                    || (!attr
                        || !attr.accessZoneId
                        && menu
                        && menu.currNode
                        && menu.currNode.attributes
                        && menu.currNode.attributes.accessZoneId
                        && (menu.currNode.attributes.accessZoneId == 1
                            || menu.currNode.attributes.accessZoneId == mktoJapaneseWorkspaceId))
                    || (!menu
                        || !menu.currNode
                        && canvas
                        && canvas.config
                        && canvas.config.accessZoneId
                        && (canvas.config.accessZoneId == 1
                            || canvas.config.accessZoneId == mktoJapaneseWorkspaceId)),
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
			disable = (attr
                        && attr.accessZoneId 
                        && (attr.accessZoneId == 1
                            || attr.accessZoneId == mktoJapaneseWorkspaceId))
                    || (attr
                        && attr.depth
                        && attr.depth == 1
                        && attr.accessZoneId
                        && attr.accessZoneId == mktoMarketingWorkspaceId)
                    || (!attr
                        || !attr.accessZoneId
                        && menu
                        && menu.currNode
                        && menu.currNode.attributes
                        && menu.currNode.attributes.accessZoneId
                        && (menu.currNode.attributes.accessZoneId == 1
                            || menu.currNode.attributes.accessZoneId == mktoJapaneseWorkspaceId))
                    || (!menu
                        || !menu.currNode
                        && canvas
                        && canvas.config
                        && canvas.config.accessZoneId
                        && (canvas.config.accessZoneId == 1
                            || canvas.config.accessZoneId == mktoJapaneseWorkspaceId)),
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
			disable = (attr
                        && attr.accessZoneId 
                        && (attr.accessZoneId == 1
                            || attr.accessZoneId == mktoJapaneseWorkspaceId))
                    || (attr
                        && attr.depth
                        && attr.depth == 1
                        && attr.accessZoneId
                        && attr.accessZoneId == mktoMarketingWorkspaceId)
                    || (!attr
                        || !attr.accessZoneId
                        && menu
                        && menu.currNode
                        && menu.currNode.attributes
                        && menu.currNode.attributes.accessZoneId
                        && (menu.currNode.attributes.accessZoneId == 1
                            || menu.currNode.attributes.accessZoneId == mktoJapaneseWorkspaceId))
                    || (!menu
                        || !menu.currNode
                        && canvas
                        && canvas.config
                        && canvas.config.accessZoneId
                        && (canvas.config.accessZoneId == 1
                            || canvas.config.accessZoneId == mktoJapaneseWorkspaceId)),
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
	
	// Disables Analytics > Analyzer and Report > Right-click menus
	var prevReportMenu = MktAnalyticsMenu.preShowReportMenu;
	MktAnalyticsMenu.preShowReportMenu = function(menu, attr) {
		prevReportMenu.apply(this, arguments);
		
		var mItems = menu.items,
			canvas = MktCanvas.getActiveTab(),
			disable = (attr
                        && attr.accessZoneId 
                        && (attr.accessZoneId == 1
                            || attr.accessZoneId == mktoJapaneseWorkspaceId))
                    || (attr
                        && attr.depth
                        && attr.depth == 1
                        && attr.accessZoneId
                        && attr.accessZoneId == mktoMarketingWorkspaceId)
                    || (!attr
                        || !attr.accessZoneId
                        && menu
                        && menu.currNode
                        && menu.currNode.attributes
                        && menu.currNode.attributes.accessZoneId
                        && (menu.currNode.attributes.accessZoneId == 1
                            || menu.currNode.attributes.accessZoneId == mktoJapaneseWorkspaceId))
                    || (!menu
                        || !menu.currNode
                        && canvas
                        && canvas.config
                        && canvas.config.accessZoneId
                        && (canvas.config.accessZoneId == 1
                            || canvas.config.accessZoneId == mktoJapaneseWorkspaceId)),
			itemsToDisable = [
							//"navigateToAnalyzer",//View Analyzer
							//"navigateToSmartList",//View Smart List
							//"navigateToAnalyzerSetup",//View Setup
							//"navigateToSetup",//View Setup
							//"navigateToSubscriptions",//View Subscriptions
							"cloneReport",//Clone Analyzer or Report
							"deleteReport",//Delete Analyzer or Report
							"moveReport",//Move Report
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
	
	// Disables Analytics > Folder > Right-click menu
	var prevReportFolderMenu = MktAnalyticsMenu.preshowReportFolderMenu ;
	MktAnalyticsMenu.preshowReportFolderMenu  = function(menu, attr) {
		prevReportFolderMenu.apply(this, arguments);
		
		var mItems = menu.items,
			canvas = MktCanvas.getActiveTab(),
			disable = (attr
                        && attr.accessZoneId 
                        && (attr.accessZoneId == 1
                            || attr.accessZoneId == mktoJapaneseWorkspaceId))
                    || (attr
                        && attr.depth
                        && attr.depth == 1
                        && attr.accessZoneId
                        && attr.accessZoneId == mktoMarketingWorkspaceId)
                    || (!attr
                        || !attr.accessZoneId
                        && menu
                        && menu.currNode
                        && menu.currNode.attributes
                        && menu.currNode.attributes.accessZoneId
                        && (menu.currNode.attributes.accessZoneId == 1
                            || menu.currNode.attributes.accessZoneId == mktoJapaneseWorkspaceId))
                    || (!menu
                        || !menu.currNode
                        && canvas
                        && canvas.config
                        && canvas.config.accessZoneId
                        && (canvas.config.accessZoneId == 1
                            || canvas.config.accessZoneId == mktoJapaneseWorkspaceId)),
			itemsToDisable = [
							"createFolder",//New Folder
							"renameFolder",//Rename Folder
							"deleteFolder",//Delete Folder
							"convertToArchiveFolder",//Convert To Archive Folder
							"convertToFolder",//Convert To Folder
							"newRcm",//New Revenue Cycle Model
							"share",//Share Folder
							"moveReport",//Move Report
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
    
    Mkt.widgets.ToolbarButton.prototype.showMenu = function() {
        var ii;
            
        if (MktCanvas
            && MktCanvas.getActiveTab()
            && MktCanvas.getActiveTab().config
            && MktCanvas.getActiveTab().config.accessZoneId
            && (MktCanvas.getActiveTab().config.accessZoneId == 1
                || MktCanvas.getActiveTab().config.accessZoneId == mktoJapaneseWorkspaceId)) {
        
            // Lead Database > Lead Actions > Sub-menu
            if (this.menu.itemId == "leadDbLeadMenu") {
                for (ii = 0; ii < this.menu.items.items.length; ii++) {
                    if (typeof(this.menu.items.items[ii].menu) != "undefined") {
                        var jj;
                        
                        for (jj = 0; jj < this.menu.items.items[ii].menu.items.items.length; jj++) {
                            this.menu.items.items[ii].menu.items.items[jj].disable(true);
                        }
                    }
                }
            }
            
            for (ii = 0; ii < this.menu.items.items.length; ii++) {
                switch (this.menu.items.items[ii].itemId) {
                
                // Marketing Activities & Design Studio > New
                // New Campaign Folder
                case "createProgramFolder":
                    this.menu.items.items[ii].disable(true);
                    break;
                // New Smart Campaign
                case "newSmartCampaign":
                    this.menu.items.items[ii].disable(true);
                    break;
                // New Program
                case "createNewMarketingProgram":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Import Program
                case "importProgram":
                    this.menu.items.items[ii].disable(true);
                    break;
                // New Campaign Folder
                case "createProgramFolder":
                    this.menu.items.items[ii].disable(true);
                    break;
                    
                // Marketing Activities > Program Actions
                // Reschedule Entries
                case "entryRescheduleEntries":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Salesforce Campaign Sync
                case "sfdcCampaignSync":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Clone
                case "cloneMarketingProgram":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Delete
                case "deleteMarketingProgram":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Show Import Status
                case "showImportMemberStatus":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // Show Export Status
                case "showExportMemberStatus":
                    //this.menu.items.items[ii].disable(true);
                    break;
                    
                // Marketing Activities > Change Status
                // Not in Program
                case "Not in ProgramStatusMarketingEvent":
                    this.menu.disable(true);
                    this.menu.items.items[ii].disable(true);
                    break;
                // Member
                case "MemberStatusMarketingEvent":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Sent
                case "SentStatusMarketingEvent":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Visited
                case "VisitedStatusMarketingEvent":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Engaged
                case "EngagedStatusMarketingEvent":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Invited
                case "InvitedStatusMarketingEvent":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Registered
                case "RegisteredStatusMarketingEvent":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Attended
                case "AttendedStatusMarketingEvent":
                    this.menu.items.items[ii].disable(true);
                    break;
                // No Show
                case "No ShowStatusMarketingEvent":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Opened
                case "OpenedStatusMarketingEvent":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Clicked
                case "ClickedStatusMarketingEvent":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Bounced
                case "BouncedStatusMarketingEvent":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Unsubscribed
                case "UnsubscribedStatusMarketingEvent":
                    this.menu.items.items[ii].disable(true);
                    break;
                    
                // Marketing Activities > Email Batch Program
                // Clone
                case "cloneEmailBatchProgram":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Delete
                case "deleteEmailBatchProgram":
                    this.menu.items.items[ii].disable(true);
                    break;
                    
                // Marketing Activities > Nurture Program Actions
                // Clone
                case "cloneNurtureProgram":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Delete
                case "deleteNurtureProgram":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Test Stream
                case "testNurtureProgram":
                    this.menu.items.items[ii].disable(true);
                    break;
                    
                // Marketing Activities > Event Program Actions
                // Schedule
                case "eventSchedule":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // Reschedule Entries
                case "entryRescheduleEntries":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // Clone
                case "cloneMarketingEvent":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Delete
                case "deleteMarketingEvent":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Refresh from Webinar Provider
                case "refreshFromWebinarProvider":
                    this.menu.items.items[ii].disable(true);
                    break;
                    
                // Marketing Activities > Smart Campaign Actions
                // View Streams
                case "navigateToNurtureTracks":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // View Smart Campaigns
                case "navigateToCFSmartCamp":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // View Assets
                case "navigateToLocalAssets":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // View Smart List
                case "navigateToProgramSmartList":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // View Setup
                case "navigateToEventSettings":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // View My Tokens
                case "navigateToCFTokens":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // View Members
                case "navigateToEventMembers":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // View Results
                case "navigateToCFResults":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // View Campaign
                case "navigateToSmartCampaign":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // View Smart List
                case "navigateToSmartList":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // View Flow
                case "navigateToFlow":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // View Schedule
                case "navigateToSchedule":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // View Results
                case "navigateToResults":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // View Campaign Members
                case "navigateToCampaignMembers":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // New Local Asset
                case "newLocalAsset":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Rename Folder
                case "renameProgramFolder":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Delete Folder
                case "deleteProgramFolder":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Convert To Archive Folder
                case "convertToArchiveFolder":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Convert To Campaign Folder
                case "convertToCampaignFolder":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Clone
                case "scClone":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Delete
                case "scArchive":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Move
                case "scMove":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Clone
                case "cloneMarketingEvent":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Delete
                case "deleteMarketingEvent":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Clone
                case "cloneNurtureProgram":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Delete
                case "deleteNurtureProgram":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Clone
                case "cloneEmailBatchProgram":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Delete
                case "deleteEmailBatchProgram":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Activate
                case "scActivate":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // Abort Campaign
                case "scAbort":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // Add To Favorites
                case "addToFavorites":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // Remove From Favorites
                case "removeFromFavorites":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // Import Program Status
                case "importProgramStatus":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // Support Tools - Change History
                case "scCampChangeHistory":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Support Tools - Run History
                case "scCampRunHistory":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Clear Palette Cache
                case "scClearPalette":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Clear Smart List
                case "scClearSmartList":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Clear Flow
                case "scClearFlow":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Build Campaign References
                case "progGenerateRef":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Check For Corrupt Emails
                case "checkForCorruptEmails":
                    this.menu.items.items[ii].disable(true);
                    break;
                    
                // Marketing Activities & Design Studio > Email Actions
                // Edit Draft
                case "emailEdit":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // Preview
                case "emailPreview":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // Approve
                case "emailApprove":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Unapprove
                case "emailUnapprove":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Download HTML
                case "emailDownloadHtml":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // Send Sample
                case "emailSendTest":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // Clone
                case "emailClone":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Delete
                case "emailDelete":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Move
                case "emailMove":
                    this.menu.items.items[ii].disable(true);
                    break;
                // New Test
                case "emailNewTest":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Edit Draft
                case "emailDraftEdit":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // Preview Draft
                case "emailDraftPreview":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // Send Sample of Draft
                case "emailDraftSendTest":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // Approve Draft
                case "emailDraftApprove":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Discard Draft
                case "emailDraftDiscard":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // Approve Test
                case "emailApproveTest":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Send Sample Test
                case "emailSendSampleTest":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // Edit Test
                case "emailEditTest":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // View Test Summary
                case "emailViewTestSummary":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // Declare Champion
                case "emailTestDeclareChampion":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // Discard Test
                case "emailDiscardTest":
                    //this.menu.items.items[ii].disable(true);
                    break;
                    
                // Design Studio > Email Template Actions
                // Edit Draft
                case "emailTemplateEdit":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // Preview
                case "emailTemplatePreview":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // Send Sample
                case "emailTemplateSendTest":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // Approve
                case "emailTemplateApprove":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Unapprove
                case "emailTemplateUnapprove":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Clone
                case "emailTemplateClone":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Delete
                case "emailTemplateDelete":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Edit Draft
                case "emailTemplateDraftEdit":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // Preview Draft
                case "emailTemplateDraftPreview":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // Send Sample of Draft
                case "emailTemplateDraftSendTest":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // Approve Draft
                case "emailTemplateDraftApprove":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Discard Draft
                case "emailTemplateDraftDiscard":
                    //this.menu.items.items[ii].disable(true);
                    break;
                    
                // Marketing Activities & Design Studio > Form Actions
                // Edit Draft
                case "formEditDraft":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // Preview
                case "formPreview":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // Edit Form
                case "formEdit":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // Approve
                case "formApprove":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Clone Form
                case "formClone":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Delete Form
                case "formDelete":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Embed Code
                case "formEmbed":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // Move
                case "formMove":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Preview Draft
                case "formDraftPreview":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // Edit Draft
                case "formDraftEdit":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // Approve Draft
                case "formDraftApprove":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Discard Draft
                case "formDraftDiscard":
                    //this.menu.items.items[ii].disable(true);
                    break;
                    
                // Marketing Activities & Design Studio > Landing Page Actions
                // Edit Draft
                case "pageEdit":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // Preview
                case "pagePreview":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // Device Switch
                case "deviceSwitch":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // Approve
                case "pageApprove":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Unapprove
                case "pageUnapprove":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Publish To Facebook
                case "publishToFacebook":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Convert to Test Group
                case "pageConvertToTestGroup":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Clone
                case "pageClone":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Delete
                case "pageDelete":
                    this.menu.items.items[ii].disable(true);
                    break;
                // URL Tools
                case "urlTools":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Move
                case "pageMove":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Edit Draft
                case "pageDraftEdit":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // Preview Draft
                case "pageDraftPreview":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // Approve Draft
                case "pageDraftApprove":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Discard Draft
                case "pageDraftDiscard":
                    //this.menu.items.items[ii].disable(true);
                    break;
                    
                // Design Studio > Landing Page Template Actions
                // Edit Draft
                case "editPageTemplate":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // Preview
                case "previewPageTemplate":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // Approve
                case "approvePageTemplate":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Unapprove
                case "unapprovePageTemplate":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Clone
                case "clonePageTemplate":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Delete
                case "pageTemplateDelete":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Export
                case "pageTemplateExport":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // Edit Draft
                case "editPageTemplateDraft":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // Preview Draft
                case "previewDraftPageTemplate":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // Approve Draft
                case "approveDraftPageTemplate":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Discard Draft
                case "discardDraftPageTemplate":
                    //this.menu.items.items[ii].disable(true);
                    break;
                    
                // Design Studio > Snippet Actions
                // Edit Draft
                case "snippetEdit":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // Preview
                case "snippetPreview":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // Approve
                case "snippetApprove":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Unapprove
                case "snippetUnapprove":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Clone
                case "snippetClone":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Delete
                case "snippetDelete":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Edit Draft
                case "snippetDraftEdit":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // Preview Draft
                case "snippetDraftPreview":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // Approve Draft
                case "snippetDraftApprove":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Discard Draft
                case "snippetDraftDiscard":
                    //this.menu.items.items[ii].disable(true);
                    break;
                    
                // Design Studio > File Actions
                // Upload Image or File
                case "uploadImage":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Grab Images from Web
                case "grabFromWebPage":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // View
                case "imagePreview":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // Delete
                case "imageDelete":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Replace Image or File
                case "replaceImage":
                    this.menu.items.items[ii].disable(true);
                    break;
                    
                // Lead Database > New
                // New Smart List
                case "newSmartList":
                    this.menu.items.items[ii].disable(true);
                    break;
                // New List
                case "newList":
                    this.menu.items.items[ii].disable(true);
                    break;
                // New Segmentation
                case "newSegmentation":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Import List
                case "importList":
                    this.menu.items.items[ii].disable(true);
                    break;
                // New Lead
                case "newLead":
                    this.menu.items.items[ii].disable(true);
                    break;
                // New Field Organizer
                case "newDataMgr":
                    this.menu.items.items[ii].disable(true);
                    break;
                
                // Lead Database > Smart List / List Actions
                // View Leads
                case "navigateToMembership":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // View Smart List
                case "navigateToSmartList":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // Filter View
                case "navigateToFilterView":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // Show Import Status
                case "showImportStatus":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // showExportStatus
                case "showExportStatus":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // Import List
                case "importList":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Export List
                case "exportList":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // Send via Ad Bridge
                case "exportAdBridge":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // New Smart List Subscription
                case "newSmartListReportSubscription":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // Clone Smart List
                case "cloneSmartlist":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Clone List
                case "cloneList":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Delete List
                case "deleteList":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Support Tools - History
                case "showSupportHistory":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Support Tools - Run Stats
                case "showSupportUsagePerf":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Processor Diagnostics
                case "showSmartListProcessorDiag":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Override Processor
                case "showSmartListProcessorOverride":
                    this.menu.items.items[ii].disable(true);
                    break;
                    
                // Lead Database > Lead Actions
                // View Lead Details
                case "viewLeadDetails":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // BlackCat Diagnostics
                case "blackCatDiag":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Merge Leads
                case "mergeLeads":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Marketing
                case "leadDbMenuFlowActions":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // Programs
                case "programsFolder":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // Special
                case "specialFolder":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // Salesforce
                case "salesforceFolder":
                    //this.menu.items.items[ii].disable(true);
                    break;
                    
                // Lead Database > Segmentation Actions
                // Create Draft
                case "createDraftSegmentation":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Edit Segments
                case "editSegmentation":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // Approve
                case "approveSegmentation":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Unapprove
                case "unapproveSegmentation":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Delete
                case "deleteSegmentation":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Refresh Status
                case "refreshSegmentation":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // Edit Segments
                case "editDraftSegmentation":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // Approve Draft
                case "approveDraftSegmentation":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Discard Draft
                case "discardDraftSegmentation":
                    //this.menu.items.items[ii].disable(true);
                    break;
                default:
                    break;
                    
                // Analytics > Report Actions
                // Delete Report
                case "deleteReport":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Drill-Down
                case "newDrillDown_atxCanvasOverview":
                    this.menu.items.items[ii].disable(true);
                    break;
                    
                // Analytics > Analyzer Actions
                // Export Data
                case "newReport_atxCanvasOverview":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // Delete Analyzer
                case "deleteReport":
                    this.menu.items.items[ii].disable(true);
                    break;
                
                // Analytics > Model Actions
                // Edit Draft
                case "rcmEdit":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // Preview Model
                case "rcmPreview":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // Approve Stages
                case "rcmApproveStages":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Unapprove Stages
                case "rcmUnapproveStages":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Approve Model
                case "rcmApprove":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Unapprove Model
                case "rcmUnapprove":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Clone Model
                case "rcmClone":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Delete Model
                case "rcmDelete":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Export Model
                case "rcmExport":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // Edit Draft
                case "rcmEditDraft":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // Preview Draft
                case "rcmPreviewDraft":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // Approve Model Draft
                case "rcmApproveDraft":
                    this.menu.items.items[ii].disable(true);
                    break;
                // Discard Model Draft
                case "rcmDiscardDraft":
                    //this.menu.items.items[ii].disable(true);
                    break;
                // Assignment Rules
                case "rcmAassignmentRules":
                    this.menu.items.items[ii].disable(true);
                    break;
                }
            }
        }
            
        this.showingMenu = true;
        if (this.menu.xtra) {
            delete this.menu.xtra;
        }
        this.menu.triggeredFrom = 'button';
        this.fireEvent('beforemenushow', this.menu);
        Mkt.widgets.ToolbarButton.superclass.showMenu.call(this);
        this.showingMenu = false;
    }
}

/**************************************************************************************
 *  
 *  This function limits each Workspace to 3 Nurture Programs. Basically, each time
 *  a nuture program is created, it first searches the folder tree to see if the user
 *  already has 3 programs. If so, it displays an error message. The reason this exists
 *  is because there is a limit of 300 nurture programs per subscription, and up to
 *  100 workspaces per subscription. 300 programs divided by 100 workspaces equals 3 
 *  nurture programs per workspace.
 *
 *  @Author Andrew Garcia
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
                msg: "Users are limited to 3 nurture programs each.",
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
 *  that allows for easy switching between analyzers without returning to the folder tree.
 *
 *  @Author Arrash Yasavolian
 *
 *  @function
 *
 **************************************************************************************/

APP.injectAnalyzerNavBar = function() {
    var isPodsLoaded = window.setInterval(function() {
        if (typeof(PODS) !== "undefined") {
            console.log("Marketo App > Injecting: Analyzer Navigation Bar");
            
            window.clearInterval(isPodsLoaded);
            if (typeof(pod) == "undefined") {
                pod = new PODS.Pod(PODS.getCookie("userPod"));
            }

            for (var y = 0; y < pod.valueSet.length; y++) {
                if (currentUrl == pod.valueSet[y].url) {
                    console.log("Marketo App > Updating: CSS for Analyzer Navigation Bar");

                    // This code block swaps the colors of the analyzer labels depending
                    // on which one the user is currently viewing.
                    $j = jQuery.noConflict();
                    var currPosition = '#' + pod.valueSet[y].position;
                    $j(currPosition).parent().css('display', 'block');
                    $j(currPosition).parent().siblings().css('display', 'none');
                    $j(currPosition).removeClass('analyzer-button').addClass('analyzer-title');
                    $j(currPosition).siblings().removeClass('analyzer-title').addClass('analyzer-button');
                    $j("#modeler,#success-path-analyzer,#opportunity-influence-analyzer,#program-analyzer").bind("click", function(e) {
                        console.log("Marketo App > Identifying: Current Analyzer");

                        // Updates the currPosition based on the div selected
                        for (var x = 0; x < pod.valueSet.length; x++) {
                            if (e.target.id == pod.valueSet[x].position)
                                currPosition = x;
                        }
                        window.location = pod.valueSet[currPosition].url;
                    });
                }
            }
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
 *  @Author Arrash Yasavolian
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

    var isEmailIframeElement = window.setInterval(function() {
        var logoBkg = document.getElementsByTagName("iframe")[0].contentWindow.document.getElementById("logo-bkg"),
            buttonBkg = document.getElementsByTagName("iframe")[0].contentWindow.document.getElementById("button-bkg"),
            logoSwapCompany = document.getElementsByTagName("iframe")[0].contentWindow.document.getElementById("logo-swap-company"),
            logoSwapContainer = document.getElementsByTagName("iframe")[0].contentWindow.document.getElementById("logo-swap-container"),
            logoSwapCompanyContainer = document.getElementsByTagName("iframe")[0].contentWindow.document.getElementById("logo-swap-company-container");
        
        if (logoBkg != null
		&& buttonBkg != null
		&& logoSwapCompany != null) {
            console.log("Marketo App > Overlaying: iframe");
            window.clearInterval(isEmailIframeElement);
            
            logoSwapContainer.style.display = "none";
            logoSwapCompanyContainer.style.display = "block";
            logoBkg.style.backgroundColor = color;
            buttonBkg.style.backgroundColor = color;
            logoSwapCompany.src = logo;
        }
    }, 0);
}

/**************************************************************************************
 *  
 *  This function overlays the landing page designer with the submitted company logo 
 *  and color.
 *
 *  @Author Arrash Yasavolian
 *
 *  @function
 *
 **************************************************************************************/

APP.overlayLandingPageDesigner = function() {
    console.log("Marketo App > Overlaying: Landing Page Designer");

    var logo = APP.getCookie("logo"),
        color = APP.getCookie("color"),
        company = logo.split("https://logo.clearbit.com/")[1].split(".")[0],
        companyName = company.charAt(0).toUpperCase() + company.slice(1);    
    
    if (logo == null) {
        logo = defaultTurnerLogoGreen;
    }
    if (color == null) {
        color = defaultColor;
    }

    var isLandingPageIframeElement = window.setInterval(function() {
        var lpLogo = document.getElementsByTagName("iframe")[0].contentWindow.document.getElementById("lp-logo"),
            backgroundColor = document.getElementsByTagName("iframe")[0].contentWindow.document.getElementById("background-color"),
            biggerBackground = document.getElementsByTagName("iframe")[0].contentWindow.document.getElementById("bigger-background"),
            subTitle = document.getElementsByTagName("iframe")[0].contentWindow.document.getElementById("sub-title");
        if (lpLogo != null
		&& backgroundColor != null
		&& biggerBackground != null
		&& subTitle != null) {
            console.log("Marketo App > Overlaying: iframe");
            window.clearInterval(isLandingPageIframeElement);

            lpLogo.src = logo;
            backgroundColor.style.backgroundColor = color;
            biggerBackground.style.backgroundColor = color;
            subTitle.innerHTML = companyName + " invites you to join:";
        }
    }, 0);
}

/**************************************************************************************
 *  
 *  This function opens the Send via Ad Bridge modal window
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/
 
APP.openAdBridgeModal = function() {
    console.log("Marketo App > Opening Ad Bridge Modal Window");
    
    if (document.getElementsByClassName("x-btn-text mkiUserTarget")[0].type == "button") {
        document.getElementsByClassName("x-btn-text mkiUserTarget")[0].click();
    }
}

/**************************************************************************************
 *  
 *  This function returns the email ids of all the email assets in a given instance. 
 *
 *  @Author Andrew Garcia
 *
 *  @function
 *
 **************************************************************************************/

APP.getEmailIds = function(pod) {
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
            // Japanese Replicate Success Webinar
            emIds.push(16118, 16119, 16120, 16122, 16121, 16117);
            // Japanese Replicate Success Roadshow
            emIds.push(16123);
            // Japanese Intelligent Nurturing
            emIds.push(16137, 16129, 16125, 16126, 16124, 16136, 16128, 16130, 16131, 16132, 16127, 16133);
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
                userId = MktPage.userid.toLowerCase();
            
            // This checks to see if the username is one that would be associated
            // with a MarketoLive subscription.
            if (accountString == "mktodemoaccount106"
            || accountString == "mktodemoaccount106a"
            || accountString == "mktodemoaccount106b") {
                console.log("Marketo App > Location: MarketoLive Instance");
                
                window.mkto_live_plugin_state = true;

                // If the user is the admin or ghost, disable
                if (userId.search("^admin@mktodemoaccount") != -1
                || userId.search("^mktodemoaccount[a-z0-9]*@marketo\.com") != -1
                || userId.search("^marketodemo.*@gmail\.com$") != -1) {
                    console.log("Marketo App > User: Admin");

                    // Disabling Demo Plugin Check
                    APP.disableDemoPluginCheck();

                    // This check ensures that an admin can login and test the 
                    // plugin as a normal user. 
                    if (APP.getCookie("priv") != "false") {
                        return;
                    } 
                    else {
                        console.log("Marketo App > User: Admin is now a normal user");
                    }
                }

                var currUrlFragment,
                    prevWorkspaceId,
                    japanWorkspaceId = 173,
                    oppInfluenceAnalyzerFragment = "AR1559A1!",
                    programAnalyzerFragment = "AR1544A1!",
                    modeler106Fragment = "RCM70A1!",
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
				|| currUrlFragment == mktoMarketingActivitiesMarketingFragment
                || currUrlFragment == mktoMarketingActivitiesJapaneseFragment
                || currUrlFragment == mktoLeadDatabaseDefaultFragment
                || currUrlFragment == mktoLeadDatabaseMarketingFragment
                || currUrlFragment == mktoLeadDatabaseJapaneseFragment) {
					APP.disableButtons();
				}
                
                else if (currUrlFragment == mktoAnalyticsFragment) {
                    APP.overrideAnalyticsTiles();
                }
                
                else if (currUrlFragment == mktoAdBridgeSmartListFragment) {
                    var isAdBridgeSmartList = window.setInterval(function() {
                        if (typeof(document.getElementsByClassName("x-btn-text mkiUserTarget")[0]) !== "undefined") {
                            console.log("Marketo App > Location: Ad Bridge Smart List");
                            
                            window.clearInterval(isAdBridgeSmartList);
                            APP.openAdBridgeModal();
                        }
                    }, 0);
                }

                // Only execute this block if the user is not on an editor page.
                if (currUrlFragment.search("^" + mktoEmailDesignerFragment) == -1
                && currUrlFragment.search("^" + mktoEmailPreviewFragment)
                && currUrlFragment.search("^" + mktoLandingPageDesignerFragment) == -1
                && currUrlFragment.search("^" + mktoLandingPagePreviewFragment) == -1
                && currUrlFragment.search("^" + mktoFormWizardFragment) == -1 
                && currUrlFragment.search("^" + mktoMobilePushNotificationWizardFragment) == -1 
                && currUrlFragment.search("^" + mktoSocialAppWizardFragment) == -1) {
                    
                    APP.overrideTreeNodeExpand();
                    APP.overrideTreeNodeCollapse();
                    APP.disableMenus();
                    APP.overrideSmartCampaignSaving();
                    APP.overrideSmartCampaignCanvas();
                    APP.overrideNewProgramCreate();
                    APP.overrideAssetSaveEdit();
                    APP.overrideNewAssetCreate();
                    //APP.hidePageGrid();
                    APP.hideFoldersOnImport();
                    APP.disableConfirmationMessage();
                    
                    // Storing previous Workspace ID
                    if (currUrlFragment != mktoMyMarketoFragment) {
						var isMktCanvas = window.setInterval(function() {
							if (MktCanvas.activeTab !== null) {
								console.log("Marketo App > Location: Marketo Canvas");
								
                                window.clearInterval(isMktCanvas);
								prevWorkspaceId = MktCanvas.activeTab.config.accessZoneId;
								if (prevWorkspaceId == 1 || prevWorkspaceId == japanWorkspaceId) {
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
                            lpIds["dpageid_11826"] = "dpageid_11826";
                            // Responsive Landing Page
                            lpIds["dpageid_11291"] = "dpageid_11291";
                            // Japanese Landing Page
                            lpIds["dpageid_11548"] = "dpageid_11548";
                            // Japanese Landing Page 2
                            lpIds["dpageid_11546"] = "dpageid_11546";
                            // DIY Design and Replicate Success Forms
                            formIds.push(2892, 1749, 1900, 3018, 3020, 3021);  
                            // DIY Design and Mobile Engagement Push Notifications 
                            pushIds.push(29, 23, 88, 89);               
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
                        }
                    }, 0);
                } 
                else if (currUrlFragment.search("^" + mktoLandingPageDesignerFragment) != -1) {
                    console.log("Marketo App > Location: Landing Page Designer");

                    var customCompanyLandingPage106Fragment = "LPE11826",
                        customCompanyLandingPagePreview106Fragment = "LPP11826",
                        customCompanyLandingPage106aFragment = "LPE10672",
                        customCompanyLandingPagePreview106aFragment = "LPP10672",
                        customCompanyLandingPage106bFragment = "LPE10768",
                        customCompanyLandingPagePreview106bFragment = "LPP10768";
                    // Disabling System Error Message for sync conflicts
                    APP.disableSyncErrorMessage();
                    
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
                    || currUrlFragment == mktoMarketingActivitiesMarketingFragment
                    || currUrlFragment == mktoMarketingActivitiesJapaneseFragment
                    || currUrlFragment == mktoLeadDatabaseDefaultFragment
                    || currUrlFragment == mktoLeadDatabaseMarketingFragment
                    || currUrlFragment == mktoLeadDatabaseJapaneseFragment) {
						APP.disableButtons();
					}
                    
                    else if (currUrlFragment == mktoAnalyticsFragment) {
                        APP.overrideAnalyticsTiles();
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
								else if (currWorkspaceId == 1 || currWorkspaceId == japanWorkspaceId) {
									// Intelligent Nurturing
									APP.disableSaving();
									prevWorkspaceId = currWorkspaceId;
								} 
								else {
									// Enable Smart Campaign & Nurture Stream Saving for their Workspace
									if (APP.getCookie("priv") != "false") {
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
            else {
                APP.overrideDeliverabilityToolsMenuItem();
                
                if (currUrlFragment == mktoMyMarketoFragment) {
                    APP.overrideDeliverabilityToolsTile();
                }
                window.onhashchange = function () {
                    if (currUrlFragment == mktoMyMarketoFragment) {
                        APP.overrideDeliverabilityToolsTile();
                    }
                }
            }
        }
    }, 0);
}