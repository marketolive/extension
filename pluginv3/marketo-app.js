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
    rtpDemoDomain = "^http:\/\/sjrtp1.marketo.com\/demo\/$|^http:\/\/cloud4.insightera.com\/demo\/$",
    emailDeliverabilityDomain = "^https:\/\/250ok.com/",
    mktoWizard = mktoAppDomain + "/m#",
    mktoEmailDesigner = mktoDesignerDomain + "/ds",
    mktoLandingPageDesigner = mktoDesignerDomain + "/lpeditor/",
    defaultTurnerLogoGreen = "http://marketolive.com/m3-dev/assets/img/turner-tech-green.png",
    defaultTurnerLogoWhite = "http://marketolive.com/m3-dev/assets/img/turner-tech-white.png",
    defaultColor = "rgb(42, 83, 112)",
    mktoAccountString106 = "mktodemoaccount106",
    mktoAccountString106a = "mktodemoaccount106a",
    mktoAccountString106b = "mktodemoaccount106b",
    mktoAccountString106d = "mktodemoaccount106d",
    mktoAccountStringsMatch = "^"+mktoAccountString106+"$|^"+mktoAccountString106a+"$|^"+mktoAccountString106b+"$|^"+mktoAccountString106d+"$",
    mktoAccountStrings106and106dMatch = "^"+mktoAccountString106+"$|^"+mktoAccountString106d+"$",
    mktoEmailInsightsLink = "http://www.marketolive.com/en/analytics/email-insights-summit-demo-1",
    mktoEmailDeliverabilityToolsLink = "https://250ok.com/login",
    mktoMyMarketoFragment = "MM0A1",
	mktoMarketingActivitiesDefaultFragment = "MA15A1",
    mktoMarketingActivitiesMarketingFragment = "MA19802A1",
    mktoMarketingActivitiesJapaneseFragment = "MA19848A1",
    mktoMarketingActivitiesFinservFragment = "MA20806A1",
    mktoMarketingActivitiesHealthcareFragment = "MA20826A1",
    mktoMarketingActivitiesHigherEdFragment = "MA20846A1",
	mktoLeadDatabaseDefaultFragment = "ML0A1ZN2",
    mktoLeadDatabaseMarketingFragment = "ML0A1ZN19788",
    mktoLeadDatabaseJapaneseFragment = "ML0A1ZN19834",
    mktoLeadDatabaseFinservFragment = "ML0A1ZN20792",
    mktoLeadDatabaseHealthcareFragment = "ML0A1ZN20812",
    mktoLeadDatabaseHigherEdFragment = "ML0A1ZN20832",
    mktoAnalyticsDefaultFragment = "AH0A1ZN17",
    mktoOppInfluenceAnalyzerFragment = "AR1559A1!",
    mktoProgramAnalyzerFragment = "AR1544A1!",
    mktoModeler106Fragment = "RCM70A1!",
    mktoModeler106abFragment = "RCM5A1!",
    mktoSuccessPathAnalyzerFragment = "AR1682A1!",
    mktoAdBridgeSmartListFragment = "SL1119566B2LA1",
    mktoEmailDesignerFragment = "EME",
    mktoEmailPreviewFragment = "EMP",
    mktoLandingPageDesignerFragment = "LPE",
    mktoLandingPagePreviewFragment = "LPP",
    mktoFormWizardFragment = "FOE",
    mktoMobilePushNotificationWizardFragment = "MPNE",
    mktoSocialAppWizardFragment = "SOAE",
    mktoABtestWizardFragment = "EBE",
    mktoEmailTestWizardFragment = "CCE",
    mktoCalendarFragment = "CAL",
    mktoAnalyticsFragment = "AR",
    mktoDefaultWorkspaceId = 1,
    mktoMarketingWorkspaceId = 172,
    mktoJapaneseWorkspaceId = 173,
    mktoFinservWorkspaceId = 174,
    mktoHealthcareWorkspaceId = 175,
    mktoHigherEdWorkspaceId = 176,
    userWorkspaceName = "My Workspace",
    isMktoLiveInstance = false,
    userName,
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
 *  @param {String} cookieName - Represents the key to search for inside document.cookie
 *
 **************************************************************************************/

APP.getCookie = function(cookieName) {
    console.log("Marketo App > Getting: Cookie " + cookieName);
    
    var name = cookieName + '=',
        cookies = document.cookie.split(';'),
        currCookie;
    
    for (var ii = 0; ii < cookies.length; ii++) {
        currCookie = cookies[ii].trim();
        if (currCookie.indexOf(name) == 0) {
            return currCookie.substring(name.length, currCookie.length);
        }
    }
    console.log("Marketo App > Getting: Cookie " + cookieName + " not found");
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

    if (window
    && window.mkto_live_plugin_state) {
        window.mkto_live_plugin_state = true;
    }
    
    if (MktPage
    && MktPage.validateDemoPlugin) {
        MktPage.validateDemoPlugin = function() {};
    }
    
    isMktoLiveInstance = true;
}

/**************************************************************************************
 *  
 *  This function disables saving of edits to the Landing Page Property Panel and also
 *  disables the system error message for sync errors on Landing Pages. These errors 
 *  would occur when two users edit the same landing page simultaneously.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.disablePropertyPanelSaving = function() {
    console.log("Marketo App > Disabling: Saving of Landing Page Property Panel & Sync Error Message");
    
    if (Mkt3
    && Mkt3.controller
    && Mkt3.controller.editor
    && Mkt3.controller.editor.LandingPagePropertyPanel
    && Mkt3.controller.editor.LandingPagePropertyPanel.prototype
    && Mkt3.controller.editor.LandingPagePropertyPanel.prototype.fireSyncProperties) {
        Mkt3.controller.editor.LandingPagePropertyPanel.prototype.fireSyncProperties = function() {
            console.log("Marketo App > Executing: Disable Saving of Landing Page Property Panel & Sync Error Message");
        };
    }

    // Old way that hid other system errors
    //MktMessage.showSystemError = function() {};
    /*
    Mkt3.controller.editor.LandingPagePropertyPanel.prototype.fireSyncProperties = function(record, changes) {
        var prop = record.get('properties');
        if (prop) {
            var prop = this.normalizeProperties(Ext4.clone(prop), false, changes);
            record.set('properties', prop);
        }
        
        if (record.data.localeId != mktoDefaultWorkspaceId) { 
            this.application.fireEvent('message.lp.syncProperties', record, changes);
        }
    }
    */
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
    
    if (Mkt
    && Mkt.widgets
    && Mkt.widgets.DataPanel
    && Mkt.widgets.DataPanel.prototype
    && Mkt.widgets.DataPanel.prototype.clickClose) {
        Mkt.widgets.DataPanel.prototype.clickClose = function() {
            console.log("Marketo App > Executing: Disable Smart Campaign Delete Confirmation Message");
            
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
}

/**************************************************************************************
 *  
 *  This function overrides the target links for the Deliverability Tools and Email 
 *  Insights tiles if they exist, otherwise it creates the tiles. We only have a single  
 *  instance that contains usable demo data for both 250ok and Email Insights, so the 
 *  plugin directs people into that instance. This function directs users to the 250ok 
 *  login page where the deliverability-tools.js script will automatically login and 
 *  hide the necessary buttons. This function should also run inside of SC sandbox 
 *  instances.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.overrideHomeTiles = function() {
    console.log("Marketo App > Overriding: My Marketo Home Tiles");
    
    if (MktCanvas
    && MktCanvas.getEl()
    && MktCanvas.getEl().dom
    && MktCanvas.getEl().dom.nextSibling
    && MktCanvas.getEl().dom.nextSibling.childNodes
    && MktCanvas.getEl().dom.nextSibling.childNodes[0]
    && MktCanvas.getEl().dom.nextSibling.childNodes[0].childNodes
    && MktCanvas.getEl().dom.nextSibling.childNodes[0].childNodes[0]
    && MktCanvas.getEl().dom.nextSibling.childNodes[0].childNodes[0].childNodes
    && MktCanvas.getEl().dom.nextSibling.childNodes[0].childNodes[0].childNodes[0]
    && MktCanvas.getEl().dom.nextSibling.childNodes[0].childNodes[0].childNodes[0].childNodes
    && MktCanvas.getEl().dom.nextSibling.childNodes[0].childNodes[0].childNodes[0].childNodes[0]
    && MktCanvas.getEl().dom.nextSibling.childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes
    && MktCanvas.getEl().dom.nextSibling.childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0]
    && MktCanvas.getEl().dom.nextSibling.childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes
    && MktCanvas.getEl().dom.nextSibling.childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0]
    && MktCanvas.getEl().dom.nextSibling.childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes) {
        console.log("Marketo App > Executing: Override My Marketo Home Tiles");
        
        var container = MktCanvas.getEl().dom.nextSibling.childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0],
            containerComponent = MktCanvas.lookupComponent(container),
            tilesTextContent = containerComponent.el.dom.textContent.replace(/([a-z])([A-Z])/g, "$1,$2").replace(/([A-Z])([A-Z][a-z])/g, "$1,$2").split(','),
            hrefMatch = new RegExp(" href=\"[^\"]*\" ", "g"),
            idMatch,
            spareTileClone,
            emailInsightsTile,
            emailInsightsTileOuterHTML,
            deliverabilityToolsTile,
            deliverabilityToolsTileOuterHTML,
            ii;
        
        for (ii = 0; ii < tilesTextContent.length; ii++) {
            if (tilesTextContent[ii] == "Email Insights") {
                emailInsightsTile = MktCanvas.lookupComponent(container.childNodes[ii]);
            }
            else if (tilesTextContent[ii] == "Deliverability Tools") {
                deliverabilityToolsTile = MktCanvas.lookupComponent(container.childNodes[ii]);
            }
        }
        
        if (emailInsightsTile) {
            emailInsightsTile.el.dom.outerHTML = emailInsightsTile.el.dom.outerHTML.replace(hrefMatch, " href=\""+mktoEmailInsightsLink+"\" ");
        }
        else {
            emailInsightsTileOuterHTML = '<div class="x4-btn mkt3-homeTile x4-btn-default-small x4-icon-text-left x4-btn-icon-text-left x4-btn-default-small-icon-text-left x-panel" style="height: 150px;" id="homeTile-1084"><em id="homeTile-1084-btnWrap"><a id="homeTile-1084-btnEl" href="'+mktoEmailInsightsLink+'" class="x4-btn-center" target="_blank" role="link" style="width: 150px; height: 150px;"><span id="homeTile-1084-btnInnerEl" class="x4-btn-inner" style="width: 150px; height: 150px; line-height: 150px;">Email Insights</span><span id="homeTile-1084-btnIconEl" class="x4-btn-icon mki3-email-insights-svg"></span></a></em><div class="x-panel-bwrap" id="ext-gen164"><div class="x-panel-body x-panel-body-noheader" id="ext-gen165"></div></div></div>';
            idMatch = new RegExp("homeTile-1084", "g");
            
            spareTileClone = MktCanvas.lookupComponent(container.childNodes[container.childNodes.length - 1]).cloneConfig();
            emailInsightsTileOuterHTML = emailInsightsTileOuterHTML.replace(idMatch, spareTileClone.id);
            spareTileClone.el.dom.outerHTML = emailInsightsTileOuterHTML;
            container.appendChild(container.childNodes[container.childNodes.length - 2]);
            container.appendChild(spareTileClone.el.dom);
        }
        
        if (deliverabilityToolsTile) {
            deliverabilityToolsTile.el.dom.outerHTML = deliverabilityToolsTile.el.dom.outerHTML.replace(hrefMatch, " href=\""+mktoEmailDeliverabilityToolsLink+"\" ");
        }
        else {
            deliverabilityToolsTileOuterHTML = '<div class="x4-btn mkt3-homeTile x4-btn-default-small x4-icon-text-left x4-btn-icon-text-left x4-btn-default-small-icon-text-left" style="height: 150px;" id="homeTile-1036"><em id="homeTile-1036-btnWrap"><a id="homeTile-1036-btnEl" href="'+mktoEmailDeliverabilityToolsLink+'" class="x4-btn-center" target="_blank" role="link" style="width: 150px; height: 150px;"><span id="homeTile-1036-btnInnerEl" class="x4-btn-inner" style="width: 150px; height: 150px; line-height: 150px;">Deliverability Tools</span><span id="homeTile-1036-btnIconEl" class="x4-btn-icon mki3-mail-sealed-svg"></span></a></em></div>';
            idMatch = new RegExp("homeTile-1036", "g");
            
            spareTileClone = MktCanvas.lookupComponent(container.childNodes[container.childNodes.length - 1]).cloneConfig();
            deliverabilityToolsTileOuterHTML = deliverabilityToolsTileOuterHTML.replace(idMatch, spareTileClone.id);
            spareTileClone.el.dom.outerHTML = deliverabilityToolsTileOuterHTML;
            container.appendChild(container.childNodes[container.childNodes.length - 2]);
            container.appendChild(spareTileClone.el.dom);
        }
    }
}

/**************************************************************************************
 *  
 *  This function overrides the target links for the Email Insights and Deliverability   
 *  Tools Superball menu items if they exist, otherwise it creates the menu items. By 
 *  default, these menu items uses SSO to login, however, we only have one instance for 
 *  each item that contains usable demo data, so the plugin directs people into that 
 *  instance. This function directs users to the 250ok login page where the 
 *  deliverability-tools.js script will automatically login and hide the necessary 
 *  buttons. This function should also run inside of SC sandbox instances.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.overrideSuperballMenuItems = function() {
    console.log("Marketo App > Overriding: Superball Menu Items");
    
    if (MktPage
    && MktPage.showSuperMenu) {
        MktPage.showSuperMenu = function() {
            console.log("Marketo App > Executing: Override Superball Menu Items");

            var logoEl = Ext.get(Ext.DomQuery.selectNode('.mkt-app-logo')),
            menu = logoEl.menu,
            menuTop = 55;
            
            if (!menu) {
                menu = logoEl.menu = Ext4.widget('appNavigationMenu', {
                        listeners : {
                            boxready : function (view) {
                                var logoRegion = logoEl.getRegion();
                                
                                // shift out of the ball way
                                if (logoRegion.bottom > menuTop) {
                                    view.setBodyStyle('padding-top', logoRegion.bottom - menuTop + 10 + 'px');
                                    view.updateLayout();
                                }
                                
                                // prevent layering in front of the logo
                                menu.setZIndex(logoEl.getStyle('zIndex') - 5);
                            },
                            beforerender : function (view) {
                                view.addCls(view.componentCls + '-hidden');
                            },
                            show : function (view) {
                                view.removeCls(view.componentCls + '-hidden');
                                
                                logoEl.ignoreNextClick = true;
                                logoEl.removeClass(logoEl.attentionCls);
                                
                                if (!MktPage.savedState.isUsedSuperMenu) {
                                    MktPage.savedState.isUsedSuperMenu = true;
                                    
                                    MktSession.ajaxRequest('user/saveUserPref', {
                                        serializeParms : {
                                            key : 'isUsedSuperMenu',
                                            data : MktPage.savedState.isUsedSuperMenu
                                        }
                                    });
                                }
                            },
                            beforehide : function (view) {
                                view.addCls(view.componentCls + '-hidden');
                            },
                            hide : function () {
                                (function () {
                                    logoEl.ignoreNextClick = false;
                                }).defer(250);
                            }
                        }
                    });
                if (menu
                && menu.items
                && menu.items.items) {
                    console.log("Marketo App > Working: Override Superball Menu Items");
                    
                    var ii,
                        currSuperBallMenuItem,
                        emailInsightsMenuItem,
                        deliverabilityToolsMenuItem,
                        clonedMenuItem;
                        
                    for (ii = 0; ii < menu.items.items.length; ii++) {
                        currSuperBallMenuItem = menu.items.items[ii];
                        
                        if (currSuperBallMenuItem.text == "Email Insights") {
                            emailInsightsMenuItem = currSuperBallMenuItem;
                        }
                        else if (currSuperBallMenuItem.text == "Deliverability Tools") {
                            deliverabilityToolsMenuItem = currSuperBallMenuItem;
                        }
                    }
                    
                    if (emailInsightsMenuItem) {
                        emailInsightsMenuItem.href = mktoEmailInsightsLink;
                        emailInsightsMenuItem.update();
                    }
                    else {
                        clonedMenuItem = menu.items.items[0].cloneConfig();
                        clonedMenuItem.setText("Email Insights");
                        clonedMenuItem.setIconCls("mki3-email-insights-svg");
                        clonedMenuItem.href = mktoEmailInsightsLink;
                        clonedMenuItem.hrefTarget = "_blank";
                        clonedMenuItem.update();
                        menu.add(clonedMenuItem);
                    }
                    
                    if (deliverabilityToolsMenuItem) {
                        deliverabilityToolsMenuItem.href = mktoEmailDeliverabilityToolsLink;
                        deliverabilityToolsMenuItem.update();
                    }
                    else {
                        clonedMenuItem = menu.items.items[0].cloneConfig();
                        clonedMenuItem.setText("Deliverability Tools");
                        clonedMenuItem.setIconCls("mki3-mail-sealed-svg");
                        clonedMenuItem.href = mktoEmailDeliverabilityToolsLink;
                        clonedMenuItem.hrefTarget = "_blank";
                        clonedMenuItem.update();
                        menu.add(clonedMenuItem);
                    }
                }
            }
            
            if (!menu.isVisible() && !logoEl.ignoreNextClick) {
                // position below app bar
                menu.showAt(0, menuTop);
                
                // prevent layering in front of the logo
                menu.setZIndex(logoEl.getStyle('zIndex') - 5);
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
            
            if (MktPage
            && MktPage.savedState
            && MktPage.savedState.custPrefix.search(mktoAccountStrings106and106dMatch) != -1
            && MktCanvas
            && MktCanvas.getActiveTab()
            && MktCanvas.getActiveTab().config
            && MktCanvas.getActiveTab().config.mkt3XType == "analyticsHome"
            && MktCanvas.getActiveTab().config.accessZoneId == mktoDefaultWorkspaceId
            && MktCanvas.getActiveTab().el
            && MktCanvas.getActiveTab().el.dom
            && MktCanvas.getActiveTab().el.dom.childNodes
            && MktCanvas.getActiveTab().el.dom.childNodes[0]
            && MktCanvas.getActiveTab().el.dom.childNodes[0].childNodes
            && MktCanvas.getActiveTab().el.dom.childNodes[0].childNodes[1]
            && MktCanvas.getActiveTab().el.dom.childNodes[0].childNodes[1].childNodes
            && MktCanvas.getActiveTab().el.dom.childNodes[0].childNodes[1].childNodes[0]
            && MktCanvas.getActiveTab().el.dom.childNodes[0].childNodes[1].childNodes[0].childNodes
            && MktCanvas.getActiveTab().el.dom.childNodes[0].childNodes[1].childNodes[0].childNodes[0]
            && MktCanvas.getActiveTab().el.dom.childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes
            && MktCanvas.getActiveTab().el.dom.childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0]
            && MktCanvas.getActiveTab().el.dom.childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes
            && MktCanvas.getActiveTab().el.dom.childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0]
            && MktCanvas.getActiveTab().el.dom.childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes) {
                console.log("Marketo App > Executing: Analytics Tiles");
                
                var ii,
                    currTileHTML,
                    tiles = MktCanvas.getActiveTab().el.dom.childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes,
                    host = "https://app-sjp.marketo.com";
                
                for (ii = 0; ii < tiles.length; ii++) {
                    if (tiles[ii]
                    && tiles[ii].outerHTML
                    && tiles[ii].textContent) {
                        currTileHTML = tiles[ii].outerHTML;
                        switch (tiles[ii].textContent) {
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
                                currTileHTML = '<a href="' + host + '/#AR1559A1">' + currTileHTML + '</a>';
                                MktCanvas.getActiveTab().el.dom.childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[ii].outerHTML = currTileHTML;
                                break;

                            case "Program Analyzer":
                                currTileHTML = '<a href="' + host + '/#AR1544A1">' + currTileHTML + '</a>';
                                MktCanvas.getActiveTab().el.dom.childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[ii].outerHTML = currTileHTML;
                                break;

                            case "Success Path Analyzer":
                                currTileHTML = '<a href="' + host + '/#AR1682A1">' + currTileHTML + '</a>';
                                MktCanvas.getActiveTab().el.dom.childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[ii].outerHTML = currTileHTML;
                                break;

                            case "Revenue Explorer":
                                //currTileHTML = '<a href="' + host + '/#">' + currTileHTML + '</a>';
                                //MktCanvas.getActiveTab().el.dom.childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[ii].outerHTML = currTileHTML;
                                break;
                                
                            case "Email Insights":
                                var hrefMatch = new RegExp(' href=\"[^\"]*\" ', 'g');
                                currTileHTML = currTileHTML.replace(hrefMatch, ' href=\"'+mktoEmailInsightsLink+'\" ');
                                MktCanvas.getActiveTab().el.dom.childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[ii].outerHTML = currTileHTML;
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
        }
    }, 0);
}

/**************************************************************************************
 *  
 *  This function overrides the save function of Smart Campaigns in order to disable   
 *  saving within the Default Workspace at all times and within My Worksapce if the 
 *  Smart Campaign is NOT within the user's root folder or if edit privileges is false
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.overrideSmartCampaignSaving = function() {
    console.log("Marketo App > Overriding: Saving for Smart Campaigns");
    
    if (Mkt
    && Mkt.widgets
    && Mkt.widgets.DataPanelManager
    && Mkt.widgets.DataPanelManager.prototype
    && Mkt.widgets.DataPanelManager.prototype.save) {
        Mkt.widgets.DataPanelManager.prototype.save = function(cause, dp, acceptUpdates) {
            console.log("Marketo App > Executing: Override Saving for Smart Campaigns");
            
            this._updateDataPanelOrder(true);
            var canvas = MktCanvas.getActiveTab();
            if (!APP.evaluateMenu("button", null, canvas, null)
            && APP.getCookie("toggleState") != "false") {
                
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

    if (Mkt
    && Mkt.widgets
    && Mkt.widgets.DataPanelLayout
    && Mkt.widgets.DataPanelLayout.prototype
    && Mkt.widgets.DataPanelLayout.prototype.initComponent) {
        Mkt.widgets.DataPanelLayout.prototype.initComponent = function() {
            console.log("Marketo App > Executing: Override Smart Campaign Canvases");
            
            if (MktCanvas
            && MktCanvas.getActiveTab()
            && MktCanvas.getActiveTab().config
            && MktCanvas.getActiveTab().config.accessZoneId == mktoDefaultWorkspaceId) {
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
}

/**************************************************************************************
 *  
 *  This function overrides the updatePortletOrder function of Program > Assets tab in 
 *  order to disable reordering of asset portlets within the Default Workspace at all 
 *  times and within My Worksapce if the Program is NOT within the user's root folder
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.overrideUpdatePortletOrder = function() {
    console.log("Marketo App > Overriding: Updating of Portlet Order");

    if (Mkt
    && Mkt.apps
    && Mkt.apps.localasset
    && Mkt.apps.localasset.LocalAssetPortal
    && Mkt.apps.localasset.LocalAssetPortal.prototype
    && Mkt.apps.localasset.LocalAssetPortal.prototype.updatePortletOrder) {
        console.log("Marketo App > Executing: Override Updating of Portlet Order");
        
        Mkt.apps.localasset.LocalAssetPortal.prototype.updatePortletOrder = function (e) {
            var canvas = MktCanvas.getActiveTab(),
                disable = APP.evaluateMenu("button", null, canvas, null);
            if (!disable) {
                // Gets the current portlet order array
                var newPortletOrder = [];
                for (var i = 0; i < this.items.length; i++) {
                    var itemInfo = this.items.get(i).smartCampaignMetaData;
                    newPortletOrder.push(itemInfo.compTypeId + ":" + itemInfo.compId);
                }
                
                // Save the current order on the server
                var params = {
                    compId : this.programId,
                    portletOrdering : Ext.encode(newPortletOrder)
                };
                MktSession.ajaxRequest('marketingEvent/orderLocalAssetPortlets', {
                    serializeParms : params,
                    localAssetManager : this,
                    portletOrdering : newPortletOrder,
                    onMySuccess : this.updatePortletOrderSuccess
                });
            }
            else {
                console.log("Marketo App > Disabling: Updating of Portlet Order");
            }
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
    
    if (mktLPLManager
    && mktLPLManager.doModifyPages) {
        console.log("Marketo App > Executing: Discard Landing Page Drafts");
        
        var lpMessageBox = Ext.MessageBox.show({
            title: "Marketo Live",
            msg: "Discarding Landing Page Drafts",
            progress: false,
            wait: false,
            width: 270,
            closable: false
        });
        mktLPLManager.doModifyPages('revert', lpIds);
        if (lpMessageBox
        && lpMessageBox.hide) {
            lpMessageBox.hide();
        }
    }
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

    if (mktEmManager
    && mktEmManager.discardDraft) {
        console.log("Marketo App > Executing: Discard Email Drafts");
        
        var emMessageBox = Ext.MessageBox.show({
            title: "Marketo Live",
            msg: "Discarding Email Drafts",
            progress: false,
            wait: false,
            width: 270,
            closable: false
        });
        mktEmManager.discardDraft(emIds);
        if (emMessageBox
        && emMessageBox.hide) {
            emMessageBox.hide();
        }
    }
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
    
    if (Ext4
    && Ext4.getStore
    && Ext4.create
    && Mkt3) {
        console.log("Marketo App > Executing: Discard "+assetType+" Drafts");
        
        var assetStore = Ext4.getStore(assetType);
        
        if (MktMessage
        && MktMessage.showSystemError) {
            MktMessage.showSystemError = function() {};
        }
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
 
    if (MktAsyncTreeNode
    && MktAsyncTreeNode.prototype
    && MktAsyncTreeNode.prototype.expand
    && userName) {
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
/*                
                var userId = MktPage.userid.toLowerCase(),
                    userName;
                if (userId.search("\.demo@marketo.com$") != -1) {
                    userName = userId.split(".demo")[0];
                }
                else {
                    userName = userId.split("@")[0];
                }
*/
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
    
    if (MktAsyncTreeNode
    && MktAsyncTreeNode.prototype
    && MktAsyncTreeNode.prototype.collapse
    && userName) {
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
/*                
                var userId = MktPage.userid.toLowerCase(),
                    userName;
                if (userId.search("\.demo@marketo.com$") != -1) {
                    userName = userId.split(".demo")[0];
                }
                else {
                    userName = userId.split("@")[0];
                }
*/                
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
    
    if (Mkt
    && Mkt.widgets
    && Mkt.widgets.ModalForm
    && Mkt.widgets.ModalForm.prototype
    && Mkt.widgets.ModalForm.prototype.okButtonHandler
    && userName) {
        Mkt.widgets.ModalForm.prototype.okButtonHandler = function() {
            console.log("Marketo App > Executing: New Program/Segmentation Creation");
        
            if (this.title == "New Program"
            || this.title == "New Segmentation") {
                var ii;
/*                
                var userId = MktPage.userid.toLowerCase(),
                    userName;
                if (userId.search("\.demo@marketo.com$") != -1) {
                    userName = userId.split(".demo")[0];
                }
                else {
                    userName = userId.split("@")[0];
                }
*/              
                if (this.title == "New Program") {
                    if (this.getInputItems()) {
                        if (this.getInputItems()[1]
                        && this.getInputItems()[1].fieldLabel == "Name") {
                            if (this.getInputItems()[1].getValue().toLowerCase().search(userName + "$") == -1) {
                                this.getInputItems()[1].setValue(this.getInputItems()[1].getValue() + " - " + userName);
                            }
                        }
                        else {
                            for (ii = 0; ii < this.getInputItems().length; ii++) {
                                if (this.getInputItems()[ii]
                                && this.getInputItems()[ii].fieldLabel == "Name") {
                                    if (this.getInputItems()[ii].getValue().toLowerCase().search(userName + "$") == -1) {
                                        this.getInputItems()[ii].setValue(this.getInputItems()[ii].getValue() + " - " + userName);
                                    }
                                }
                            }
                        }
                    }
                }
                else if (this.title == "New Segmentation") {
                    if (this.findByType("textfield")) {
                        if (this.findByType("textfield")[0]
                        && this.findByType("textfield")[0].fieldLabel == "Name") {
                            if (this.findByType("textfield")[0].getValue().toLowerCase().search(userName + "$") == -1) {
                                this.findByType("textfield")[0].setValue(this.findByType("textfield")[0].getValue() + " - " + userName);
                            }
                        }
                        else {
                            for (ii = 0; ii < this.findByType("textfield").length; ii++) {
                                if (this.findByType("textfield")[ii]
                                && this.findByType("textfield")[ii].fieldLabel == "Name") {
                                    if (this.findByType("textfield")[ii].getValue().toLowerCase().search(userName + "$") == -1) {
                                        this.findByType("textfield")[ii].setValue(this.findByType("textfield")[ii].getValue() + " - " + userName);
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
}

/**************************************************************************************
 *  
 *  This function overrides the save edit function for renaming exisiting Programs, 
 *  Smart Campaigns, Assets, and Folders in order to enforce a naming convention by 
 *  appending the user's username to the name of the program, smart campaign, asset, or 
 *  folder; additionally, it prevents the renaming of the user's root folder via the 
 *  Marketo canvas tab
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/
 
APP.overrideAssetSaveEdit = function() {
    console.log("Marketo App > Overriding: Asset Save Edit");

    if (Mkt
    && Mkt.widgets
    && Mkt.widgets.CanvasHeader
    && Mkt.widgets.CanvasHeader.prototype
    && Mkt.widgets.CanvasHeader.prototype.saveEdit) {
        Mkt.widgets.CanvasHeader.prototype.saveEdit = function() {
            if (MktCanvas
            && MktCanvas.getActiveTab()
            && MktCanvas.getActiveTab().config
            && MktCanvas.getActiveTab().config.accessZoneId
            && userName) {
                console.log("Marketo App > Executing: Asset Save Edit");
                var currWorkspaceId = MktCanvas.getActiveTab().config.accessZoneId;
                
                if (currWorkspaceId != mktoDefaultWorkspaceId
                && currWorkspaceId != mktoJapaneseWorkspaceId
                && currWorkspaceId != mktoFinservWorkspaceId
                && currWorkspaceId != mktoHealthcareWorkspaceId
                && currWorkspaceId != mktoHigherEdWorkspaceId) {
                    var isFolderEdit = false;
                
                    if ((MktExplorer.getEl().dom.ownerDocument.title.search("Marketing Activities") != -1
                        && (this.titleId == "mpTEName"
                            || this.titleId == "cdhTEName"
                            || this.titleId == "pname"))
                    || MktExplorer.getEl().dom.ownerDocument.title.search("Marketing Activities") == -1) {
/*                        
                        var userId = MktPage.userid.toLowerCase(),
                            userName;
                        if (userId.search("\.demo@marketo.com$") != -1) {
                            userName = userId.split(".demo")[0];
                        }
                        else {
                            userName = userId.split("@")[0];
                        }
*/                        
                        if (MktCanvas.getActiveTab().config.accessZoneId == mktoMarketingWorkspaceId
                        && this.titleId == "pname") {
                            if (this.titleValue == userName) {
                                isFolderEdit = true;
                            }
                        }
                        
                        if (this.getTitleField().getValue().toLowerCase().search(userName + "$") == -1) {
                            this.getTitleField().setValue(this.getTitleField().getValue() + " - " + userName);
                        }
                    }
                    
                    if (isFolderEdit) {
                        var toUpdateNodeText = false;

                        MktSession.clockCursor(true);
                        this.getTitleField().setValue(this.titleValue);
                        //this.serializeParms[this.titleId] = this.getTitleField().getValue();
                        //this.serializeParms[this.descId] = this.getDescField().getValue();

                        //this.newTitleValue = MktPage.isFeatureEnabled('treeEncoding') ? this.serializeParms[this.titleId] : Ext.util.Format.htmlEncode(this.serializeParms[this.titleId]);
                        //this.newDescValue = Ext.util.Format.htmlEncode(this.serializeParms[this.descId]);
                        //this.updateCanvasConfig();

                        //this.prevTitleValue = this.titleValue;
                        //this.titleValue = this.newTitleValue;
                        //this.descValue = this.newDescValue;
                        //MktPage.updateFullTitle();
                        var canvasTab = MktCanvas.getActiveTab();
                        //canvasTab.updateTabTitle(this.titleValue);
                        var nodeId = null;
                        if (canvasTab.config.expNodeId) {
                            var node = MktExplorer.getNodeById(canvasTab.config.expNodeId);
                            if (node && node.attributes.compType) {
                                var compType = node.attributes.compType;
                                if (compType == 'Marketing Program') {
                                    nodeId = canvasTab.config.expNodeId;
                                    //MktExplorer.lockSubTree(nodeId);
                                }
                                if (compType == 'Image') {
                                    toUpdateNodeText = false;
                                }
                            }
                            if (toUpdateNodeText) {
                                //MktExplorer.updateNodeText(canvasTab.config.expNodeId, this.titleValue);
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
                        }, 0.25, function() {
                            panelObj.setHeight(panelObj.origHeight);
                            panelObj.body.setHeight(panelObj.origHeight);
                            if (isFunction(panelObj.savedCallback)) {
                                panelObj.savedCallback();
                            }
                        });

                        MktSession.unclockCursor();
                        this._saveInProgress = false;
                        /*MktSession.ajaxRequest(this.actionUrl, {
                        serializeParms : this.serializeParms,
                        containerId : this.id,
                        onMySuccess : this.saveResponse.createDelegate(this, [nodeId], true),
                        onMyError : this.saveError.createDelegate(this, [nodeId])
                        });*/
                    }
                    else {
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
                        }, 0.25, function() {
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
                
                if (currWorkspaceId == mktoDefaultWorkspaceId
                || currWorkspaceId == mktoJapaneseWorkspaceId
                || currWorkspaceId == mktoFinservWorkspaceId
                || currWorkspaceId == mktoHealthcareWorkspaceId
                || currWorkspaceId == mktoHigherEdWorkspaceId) {
                    var toUpdateNodeText = false;

                    MktSession.clockCursor(true);
                    this.getTitleField().setValue(this.titleValue);
                    //this.serializeParms[this.titleId] = this.getTitleField().getValue();
                    //this.serializeParms[this.descId] = this.getDescField().getValue();

                    //this.newTitleValue = MktPage.isFeatureEnabled('treeEncoding') ? this.serializeParms[this.titleId] : Ext.util.Format.htmlEncode(this.serializeParms[this.titleId]);
                    //this.newDescValue = Ext.util.Format.htmlEncode(this.serializeParms[this.descId]);
                    //this.updateCanvasConfig();

                    //this.prevTitleValue = this.titleValue;
                    //this.titleValue = this.newTitleValue;
                    //this.descValue = this.newDescValue;
                    //MktPage.updateFullTitle();
                    var canvasTab = MktCanvas.getActiveTab();
                    //canvasTab.updateTabTitle(this.titleValue);
                    var nodeId = null;
                    if (canvasTab.config.expNodeId) {
                        var node = MktExplorer.getNodeById(canvasTab.config.expNodeId);
                        if (node && node.attributes.compType) {
                            var compType = node.attributes.compType;
                            if (compType == 'Marketing Program') {
                                nodeId = canvasTab.config.expNodeId;
                                //MktExplorer.lockSubTree(nodeId);
                            }
                            if (compType == 'Image') {
                                toUpdateNodeText = false;
                            }
                        }
                        if (toUpdateNodeText) {
                            //MktExplorer.updateNodeText(canvasTab.config.expNodeId, this.titleValue);
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
                    }, 0.25, function() {
                        panelObj.setHeight(panelObj.origHeight);
                        panelObj.body.setHeight(panelObj.origHeight);
                        if (isFunction(panelObj.savedCallback)) {
                            panelObj.savedCallback();
                        }
                    });

                    MktSession.unclockCursor();
                    this._saveInProgress = false;
                    /*MktSession.ajaxRequest(this.actionUrl, {
                    serializeParms : this.serializeParms,
                    containerId : this.id,
                    onMySuccess : this.saveResponse.createDelegate(this, [nodeId], true),
                    onMyError : this.saveError.createDelegate(this, [nodeId])
                    });*/
                }
            }
        }
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
    
    if (Mkt3
    && Mkt3.controller
    && Mkt3.controller.lib
    && Mkt3.controller.lib.AbstractModalForm
    && Mkt3.controller.lib.AbstractModalForm.prototype
    && Mkt3.controller.lib.AbstractModalForm.prototype.onSubmit
    && userName) {
        Mkt3.controller.lib.AbstractModalForm.prototype.onSubmit = function(form) {
            console.log("Marketo App > Executing: New Asset Creation");
            
            if (form == null
            || form.ownerAsset == null
            || form.ownerAsset.isOneOfProgramTypes == null
            || form.ownerAsset.isOneOfProgramTypes() == false) {
                if (this != null
                && this.getField("name") != null
                && this.getField("name").getValue() != null) {
                    var assetName = this.getField("name").getValue();
/*                    
                    var userId = MktPage.userid.toLowerCase(),
                        userName;
                    if (userId.search("\.demo@marketo.com$") != -1) {
                        userName = userId.split(".demo")[0];
                    }
                    else {
                        userName = userId.split("@")[0];
                    }
*/                    
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
}

/**************************************************************************************
 *  
 *  This function overrides the new folder create function via Right-click > New  
 *  Campaign Folder, New Folder in order to enforce a naming convention by appending 
 *  the user's username to the new name of any folder that is not a child of a program
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/
 
APP.overrideNewFolders = function() {
    console.log("Marketo App > Overriding: New Folders");
    
    if (MktMa
    && MktMa.newProgramFolderSubmit
    && userName) {
        MktMa.newProgramFolderSubmit = function (text, parentId, tempNodeId) {
            console.log("Marketo App > Executing: New Folders in Marketing Activities");
            
            MktSession.clockCursor(true);
            var parms = {};
/*            
            var userId = MktPage.userid.toLowerCase(),
                userName;
            if (userId.search("\.demo@marketo.com$") != -1) {
                userName = userId.split(".demo")[0];
            }
            else {
                userName = userId.split("@")[0];
            }
*/            
            if ((this.currNode.parentNode.attributes.compType.search("Folder$") != -1
                && text.toLowerCase().search(userName + "$") == -1)
            || text == userName) {
                text = text + " - " + userName;
            }
            parms.text = text;
            parms.parentId = parentId;
            parms.tempNodeId = tempNodeId;
            MktSession.ajaxRequest('explorer/createProgramFolder', {
                serializeParms : parms,
                onMySuccess : MktMa.newProgramFolderDone,
                onMyFailure : function (tempNodeId) {
                    var tempNode = MktExplorer.getNodeById(tempNodeId);
                    if (tempNode) {
                        tempNode.remove();
                    }
                }.createDelegate(this, [tempNodeId])
            });
            if (MktMa.currNode) {
                MktMa.currNode.unselect();
            }
        }
    }
    
    if (MktFolder
    && MktFolder.newFolderSubmit
    && userName) {
        MktFolder.newFolderSubmit = function (text, parentNodeId, tempNodeId) {
            console.log("Marketo App > Executing: New Folders");
            
            MktSession.clockCursor(true);
            var parms = {};
/*            
            var userId = MktPage.userid.toLowerCase(),
                userName;
            if (userId.search("\.demo@marketo.com$") != -1) {
                userName = userId.split(".demo")[0];
            }
            else {
                userName = userId.split("@")[0];
            }
*/            
            if (text.toLowerCase().search(userName + "$") == -1
            || text == userName) {
                text = text + " - " + userName;
            }
            parms.text = text;
            parms.parentNodeId = parentNodeId;
            parms.tempNodeId = tempNodeId;
            MktSession.ajaxRequest('folder/createFolderSubmit', {
                serializeParms : parms,
                onMySuccess : MktFolder.newFolderSubmitDone.createDelegate(this, [tempNodeId]),
                onMyFailure : function (tempNodeId) {
                    var tempNode = MktExplorer.getNodeById(tempNodeId);
                    if (tempNode) {
                        tempNode.remove();
                    }
                }.createDelegate(this, [tempNodeId])
            });
        }
    }
}

/**************************************************************************************
 *  
 *  This function overrides the folder renaming functions in order to prevent renaming 
 *  of the user's root folder via Right-click > Rename Folder and to enforce a naming 
 *  convention by appending the user's username to the new name of any folder that is 
 *  not a child of a program
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/
 
APP.overrideRenamingFolders = function() {
    console.log("Marketo App > Overriding: Renaming Folders");
    
    if (MktMa
    && MktMa.renameProgramFolderSubmit
    && userName) {
        MktMa.renameProgramFolderSubmit = function (value, startValue, folderId) {
            console.log("Marketo App > Executing: Renaming Folders in Marketing Activities");
            
            MktSession.clockCursor(true);
            var folder = MktExplorer.getNodeById(folderId),
                parms = {};
/*            
            var userId = MktPage.userid.toLowerCase(),
                userName;
            if (userId.search("\.demo@marketo.com$") != -1) {
                userName = userId.split(".demo")[0];
            }
            else {
                userName = userId.split("@")[0];
            }
*/            
            if (startValue == userName
            && this.currNode.parentNode.attributes.system == true
            && this.currNode.attributes.accessZoneId == mktoMarketingWorkspaceId) {
                if (folder) {
                    folder.setText(startValue);
                }
                MktSession.unclockCursor();
            }
            else {
                if ((this.currNode.parentNode.attributes.compType.search("Folder$") != -1
                    && value.toLowerCase().search(userName + "$")) == -1
                || value == userName) {
                    value = value + " - " + userName;
                    if (folder) {
                        folder.setText(value);
                    }
                }
                parms.origProgramName = startValue;
                parms.newProgramName = value;
                parms.folderId = folderId;
                MktSession.ajaxRequest('explorer/renameProgramFolder', {
                    serializeParms : parms,
                    onMySuccess : MktMa.renameProgramFolderSubmitDone,
                    onMyFailure : function (folderId, origName) {
                        var folder = MktExplorer.getNodeById(folderId);
                        if (folder) {
                            folder.setText(origName);
                        }
                    }.createDelegate(this, [folderId, startValue])
                });
            }
        }
    }
    
    if (MktFolder
    && MktFolder.renameFolderSubmit
    && userName) {
        MktFolder.renameFolderSubmit = function (text, startValue, nodeId) {
            console.log("Marketo App > Executing: Renaming Folders");
            
            MktSession.clockCursor(true);
            var parms = {};
/*            
            var userId = MktPage.userid.toLowerCase(),
                userName;
            if (userId.search("\.demo@marketo.com$") != -1) {
                userName = userId.split(".demo")[0];
            }
            else {
                userName = userId.split("@")[0];
            }
*/            
            if (startValue == userName
            && this.currNode.parentNode.attributes.system == true
            && this.currNode.attributes.accessZoneId == mktoMarketingWorkspaceId) {
                MktFolder.currNode.setText(startValue);
                MktSession.unclockCursor();
            }
            else {
                if (text.toLowerCase().search(userName + "$") == -1
                || text == userName) {
                    text = text + " - " + userName;
                    MktFolder.currNode.setText(text);
                }
                parms.text = text;
                parms.nodeId = nodeId;
                MktSession.ajaxRequest('folder/renameFolderSubmit', {
                    serializeParms : parms,
                    onMySuccess : MktFolder.renameFolderSubmitDone.createDelegate({
                        parms : parms,
                        startValue : startValue
                    }),
                    onMyFailure : function() {
                        MktFolder.currNode.setText(startValue);
                    }.createDelegate(this)
                });
            }
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
     
    if (Ext
    && Ext.form
    && Ext.form.ComboBox
    && Ext.form.ComboBox.prototype
    && Ext.form.ComboBox.prototype.onTriggerClick
    && userName) {
        Ext.form.ComboBox.prototype.onTriggerClick = function() {
            console.log("Marketo App > Executing: Hide Folders On Program Import via Override");
            
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
                    
                    if (this
                    && this.label
                    && this.label.dom
                    && this.label.dom.textContent == "Campaign Folder:"
                    && MktCanvas
                    && MktCanvas.getActiveTab()
                    && MktCanvas.getActiveTab().config
                    && MktCanvas.getActiveTab().config.accessZoneId == mktoMarketingWorkspaceId) {
                        console.log("Marketo App > Executing: Hide Campaign Folders On Program Import via Override");
                        
                        var ii;
/*                        
                        var userId = MktPage.userid.toLowerCase(),
                            userName;
                        if (userId.search("\.demo@marketo.com$") != -1) {
                            userName = userId.split(".demo")[0];
                        }
                        else {
                            userName = userId.split("@")[0];
                        }
*/                        
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
    
    if (MktGrids
    && MktGrids.CanvasGridPanel
    && MktGrids.CanvasGridPanel.prototype
    && MktGrids.CanvasGridPanel.prototype.loadPagedGrid) {
        MktGrids.CanvasGridPanel.prototype.loadPagedGrid = function() {
            if (MktCanvas
            && MktCanvas.getActiveTab()
            && MktCanvas.getActiveTab().config
            && MktCanvas.getActiveTab().config.accessZoneId == mktoMarketingWorkspaceId) {
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
    if ($jQ
    && $jQ(".mktButtonPositive")) {
        $jQ(".mktButtonPositive").remove();
    }
}

/**************************************************************************************
 *  
 *  This function evaluates the current node context being moved to determine if the 
 *  item should be moved
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.evaluateMoveItem = function (nodeToMove, destNode) {
    console.log("Marketo App > Evaluating: Move Item");
    
    if (userName) {
        var ii,
            currNode,
            depth;
/*    
        var userId = MktPage.userid.toLowerCase(),
            userName;
        if (userId.search("\.demo@marketo.com$") != -1) {
            userName = userId.split(".demo")[0];
        }
        else {
            userName = userId.split("@")[0];
        }
*/    
        if ((nodeToMove.attributes
            && (nodeToMove.attributes.accessZoneId == mktoDefaultWorkspaceId
                || nodeToMove.attributes.accessZoneId == mktoJapaneseWorkspaceId
                || nodeToMove.attributes.accessZoneId == mktoFinservWorkspaceId
                || nodeToMove.attributes.accessZoneId == mktoHealthcareWorkspaceId
                || nodeToMove.attributes.accessZoneId == mktoHigherEdWorkspaceId))
        || (destNode.attributes
            && (destNode.attributes.accessZoneId == mktoDefaultWorkspaceId
                || destNode.attributes.accessZoneId == mktoJapaneseWorkspaceId
                || destNode.attributes.accessZoneId == mktoFinservWorkspaceId
                || destNode.attributes.accessZoneId == mktoHealthcareWorkspaceId
                || destNode.attributes.accessZoneId == mktoHigherEdWorkspaceId))) {
            
            return false;
        }
        else if (nodeToMove.attributes.accessZoneId == mktoMarketingWorkspaceId
        && destNode.attributes.accessZoneId == mktoMarketingWorkspaceId) {
        
            currNode = nodeToMove;
            depth = currNode.getDepth();
            for (ii = 0; ii < depth; ii++) {
                if (currNode.text == userName) {
                    currNode = destNode;
                    depth = currNode.getDepth();
                    for (ii = 0; ii < depth; ii++) {
                        if (currNode.text == userName) {
                            return true;
                        }
                        currNode = currNode.parentNode;
                    }
                    return false;
                }
                currNode = currNode.parentNode;
            }
            return false;
        }
        else if (nodeToMove.attributes.accessZoneId == mktoMarketingWorkspaceId) {
            
            currNode = nodeToMove;
            depth = currNode.getDepth();
            for (ii = 0; ii < depth; ii++) {
                if (currNode.text == userName) {
                    return true;
                }
                currNode = currNode.parentNode;
            }
            return false;
        }
        else if (destNode.attributes.accessZoneId == mktoMarketingWorkspaceId) {
            
            currNode = destNode;
            depth = currNode.getDepth();
            for (ii = 0; ii < depth; ii++) {
                if (currNode.text == userName) {
                    return true;
                }
                currNode = currNode.parentNode;
            }
            return false;
        }
        else {
            return true;
        }
    }
}

/**************************************************************************************
 *  
 *  This function disables dragging and dropping tree node items other than those that 
 *  originate and are destined for a location within the user's root folder
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.disableDragAndDrop = function() {
    console.log("Marketo App > Disabling: Tree Node Drop");

    if (Ext
    && Ext.tree
    && Ext.tree.TreeDropZone
    && Ext.tree.TreeDropZone.prototype
    && Ext.tree.TreeDropZone.prototype.processDrop) {
        Ext.tree.TreeDropZone.prototype.processDrop = function (target, data, point, dd, e, dropNode) {
            console.log("Marketo App > Executing: Tree Node Drop");
            
            if (APP.evaluateMoveItem(dropNode, target)) {
                var dropEvent = {
                    tree : this.tree,
                    target : target,
                    data : data,
                    point : point,
                    source : dd,
                    rawEvent : e,
                    dropNode : dropNode,
                    cancel : !dropNode,
                    dropStatus : false
                };
                var retval = this.tree.fireEvent("beforenodedrop", dropEvent);
                if (retval === false
                || dropEvent.cancel === true
                || !dropEvent.dropNode) {
                    target.ui.endDrop();
                    return dropEvent.dropStatus;
                }
                
                target = dropEvent.target;
                if (point == 'append'
                && !target.isExpanded()) {
                    target.expand(false, null, function () {
                        this.completeDrop(dropEvent);
                    }
                        .createDelegate(this));
                }
                else {
                    this.completeDrop(dropEvent);
                }
                return true;
            }
            else {
                return false;
            }
        }
    }
}

/**************************************************************************************
 *  
 *  This function evaluates the current menu context to determine if items should be 
 *  disabled
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.evaluateMenu = function (triggeredFrom, menu, canvas, toolbar) {
    console.log("Marketo App > Evaluating: Menu");
    
    if (userName) {
        var toBeDisabled = false;
/*    
        var userId = MktPage.userid.toLowerCase(),
            userName;
        if (userId.search("\.demo@marketo.com$") != -1) {
            userName = userId.split(".demo")[0];
        }
        else {
            userName = userId.split("@")[0];
        }
*/    
        switch (triggeredFrom) {
            
            case "tree":
                if (menu
                && menu.currNode
                && menu.currNode.attributes
                && (menu.currNode.attributes.accessZoneId == mktoDefaultWorkspaceId
                    || menu.currNode.attributes.accessZoneId == mktoJapaneseWorkspaceId
                    || menu.currNode.attributes.accessZoneId == mktoFinservWorkspaceId
                    || menu.currNode.attributes.accessZoneId == mktoHealthcareWorkspaceId
                    || menu.currNode.attributes.accessZoneId == mktoHigherEdWorkspaceId
                    || menu.currNode.attributes.accessZoneId == mktoMarketingWorkspaceId)) {
                
                    toBeDisabled = true;
                    
                    if (menu.currNode.attributes.accessZoneId == mktoMarketingWorkspaceId) {
                        var ii,
                            currNode = menu.currNode,
                            depth = currNode.getDepth();
                            
                        for (ii = 0; ii < depth; ii++) {
                            if (currNode.attributes.text == userName) {
                                toBeDisabled = false;
                                break;
                            }
                            currNode = currNode.parentNode;
                        }
                    }
                }
                else if ((!menu
                            || !menu.currNode
                            || !menu.currNode.attributes
                            || !menu.currNode.attributes.accessZoneId)
                        && (canvas
                            && canvas.config
                            && (canvas.config.accessZoneId == mktoDefaultWorkspaceId
                                || canvas.config.accessZoneId == mktoJapaneseWorkspaceId
                                || canvas.config.accessZoneId == mktoFinservWorkspaceId
                                || canvas.config.accessZoneId == mktoHealthcareWorkspaceId
                                || canvas.config.accessZoneId == mktoHigherEdWorkspaceId
                                || (canvas.config.accessZoneId == mktoMarketingWorkspaceId
                                    && ((canvas.config.expNodeId
                                            && MktExplorer.getNodeById(canvas.config.expNodeId))
                                        || (canvas.config.dlZoneFolderId
                                            && MktExplorer.getNodeById(canvas.config.dlZoneFolderId))))))) {
                    
                    toBeDisabled = true;
                                    
                    if (canvas.config.accessZoneId == mktoMarketingWorkspaceId) {
                        var ii,
                            currNode,
                            depth;
                            
                        if (canvas.config.expNodeId) {
                            currNode = MktExplorer.getNodeById(canvas.config.expNodeId);
                        }
                        else {
                            currNode = MktExplorer.getNodeById(canvas.config.dlZoneFolderId);
                        }
                        depth = currNode.getDepth();
                            
                        for (ii = 0; ii < depth; ii++) {
                            if (currNode.attributes.text == userName) {
                                toBeDisabled = false;
                                break;
                            }
                            currNode = currNode.parentNode;
                        }
                    }
                }
                return toBeDisabled;
            break;
            
            case "button":
                if ((canvas
                    && canvas.config
                    && (canvas.config.accessZoneId == mktoDefaultWorkspaceId
                        || canvas.config.accessZoneId == mktoJapaneseWorkspaceId
                        || canvas.config.accessZoneId == mktoFinservWorkspaceId
                        || canvas.config.accessZoneId == mktoHealthcareWorkspaceId
                        || canvas.config.accessZoneId == mktoHigherEdWorkspaceId
                        || (canvas.config.accessZoneId == mktoMarketingWorkspaceId
                            && ((canvas.config.expNodeId
                                    && MktExplorer.getNodeById(canvas.config.expNodeId))
                                || (canvas.config.dlZoneFolderId
                                    && MktExplorer.getNodeById(canvas.config.dlZoneFolderId))))))
                || (MktMainNav
                    && MktMainNav.activeNav == "tnCustAdmin")) {
                    
                    toBeDisabled = true;
                                    
                    if (canvas.config.accessZoneId == mktoMarketingWorkspaceId) {
                        var ii,
                            currNode,
                            depth;
                            
                        if (canvas.config.expNodeId) {
                            currNode = MktExplorer.getNodeById(canvas.config.expNodeId);
                        }
                        else {
                            currNode = MktExplorer.getNodeById(canvas.config.dlZoneFolderId);
                        }
                        depth = currNode.getDepth();
                            
                        for (ii = 0; ii < depth; ii++) {
                            if (currNode.attributes.text == userName) {
                                toBeDisabled = false;
                                break;
                            }
                            currNode = currNode.parentNode;
                        }
                    }
                }
                return toBeDisabled;
            break;
            
            case "socialAppToolbar":
                if (toolbar.getSocialApp()
                    && (toolbar.getSocialApp().get('zoneId') == mktoDefaultWorkspaceId
                        || toolbar.getSocialApp().get('zoneId') == mktoJapaneseWorkspaceId
                        || toolbar.getSocialApp().get('zoneId') == mktoFinservWorkspaceId
                        || toolbar.getSocialApp().get('zoneId') == mktoHealthcareWorkspaceId
                        || toolbar.getSocialApp().get('zoneId') == mktoHigherEdWorkspaceId)
                    || (toolbar.getSocialApp().get('zoneId') == mktoMarketingWorkspaceId
                        && toolbar.getSocialApp().getNodeJson()
                        && toolbar.getSocialApp().getNodeJson().id
                        && MktExplorer.getNodeById(toolbar.getSocialApp().getNodeJson().id))) {
                    toBeDisabled = true;
                    
                    if (toolbar.getSocialApp().get('zoneId') == mktoMarketingWorkspaceId) {
                        var ii,
                            currNode = MktExplorer.getNodeById(toolbar.getSocialApp().getNodeJson().id),
                            depth = currNode.getDepth();
                        
                        for (ii = 0; ii < depth; ii++) {
                            if (currNode.attributes.text == userName) {
                                toBeDisabled = false;
                                break;
                            }
                            currNode = currNode.parentNode;
                        }
                    }
                }
                return toBeDisabled;
            break;
            
            case "mobilePushNotification":
                if (toolbar.getMobilePushNotification()
                    && (toolbar.getMobilePushNotification().get('zoneId') == mktoDefaultWorkspaceId
                        || toolbar.getMobilePushNotification().get('zoneId') == mktoJapaneseWorkspaceId
                        || toolbar.getMobilePushNotification().get('zoneId') == mktoFinservWorkspaceId
                        || toolbar.getMobilePushNotification().get('zoneId') == mktoHealthcareWorkspaceId
                        || toolbar.getMobilePushNotification().get('zoneId') == mktoHigherEdWorkspaceId)
                    || (toolbar.getMobilePushNotification().get('zoneId') == mktoMarketingWorkspaceId
                        && toolbar.getMobilePushNotification().getNodeJson()
                        && toolbar.getMobilePushNotification().getNodeJson().id
                        && MktExplorer.getNodeById(toolbar.getMobilePushNotification().getNodeJson().id))) {
                    toBeDisabled = true;
                    
                    if (toolbar.getMobilePushNotification().get('zoneId') == mktoMarketingWorkspaceId) {
                        var ii,
                            currNode = MktExplorer.getNodeById(toolbar.getMobilePushNotification().getNodeJson().id),
                            depth = currNode.getDepth();
                        
                        for (ii = 0; ii < depth; ii++) {
                            if (currNode.attributes.text == userName) {
                                toBeDisabled = false;
                                break;
                            }
                            currNode = currNode.parentNode;
                        }
                    }
                }
                return toBeDisabled;
            break;
            
            default:
                return true;
            break;
        }
    }
}

/**************************************************************************************
 *  
 *  This function disables menu items for all asset types for all Actions Buttons and 
 *  Right-click Tree menus in all areas.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.disableMenus = function() {
    console.log("Marketo App > Disabling: Menus");
    
    if (Ext
    && Ext.menu
    && Ext.menu.Menu
    && Ext.menu.Menu.prototype
    && Ext.menu.Menu.prototype.showAt) {
        // Disable ALL areas > ALL assets > ALL menus except Social App & Push Notification Actions Buttons
        Ext.menu.Menu.prototype.showAt = function (xy, parentMenu) {
            console.log ("Marketo App > Executing: Disable Actions and Right-click menus for ALL in ALL");
            
            if (this.fireEvent('beforeshow', this) !== false) {
                var disable,
                    mItems = this.items,
                    canvas = MktCanvas.getActiveTab(),
                    itemsToDisable = [
                        // Global > Form > Actions Button & Right-click Tree
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
                        //"formDraftDiscard",//Discard Draft
                                    
                        // Global > Landing Page > Actions Button & Right-click Tree
                        //"pageEdit",//Edit Draft
                        //"pagePreview",//Preview
                        //"deviceSwitch",//Device Switch
                        "pageApprove",//Approve
                        "pageUnapprove",//Unapprove
                        //"publishToFacebook",//Publish To Facebook
                        "pageConvertToTestGroup",//Convert to Test Group
                        "pageClone",//Clone
                        "pageDelete",//Delete
                        //"urlTools",//URL Tools
                            //"editUrlSettings",//Edit URL Settings
                            //"urlBuilder",//URL Builder
                            //"devicePreview",//Generate Preview URL
                        "pageMove",//Move
                        //"addToFavorites",//Add to Favorites
                        //"removeFromFavorites",//Remove from Favorites
                        //"pageDraftEdit",//Edit Draft
                        //"pageDraftPreview",//Preview Draft
                        "pageDraftApprove",//Approve Draft
                        //"pageDraftDiscard",//Discard Draft
                                    
                        // Global > Email > Actions Button & Right-click Tree
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
                        //"emailDraftSendTest",//Send Sample of Draft
                        "emailDraftApprove",//Approve Draft
                        //"emailDraftDiscard",//Discard Draft
                        "emailApproveTest",//Approve Test
                        //"emailSendSampleTest",//Send Sample Test
                        //"emailEditTest",//Edit Test
                        //"emailViewTestSummary",//View Test Summary
                        //"emailTestDeclareChampion",//Declare Champion
                        //"emailDiscardTest",//Discard Test
                                    
                        // Global > Smart List, List, Segment > Actions Button & Right-click Tree
                        //"navigateToMembership",//View Leads
                        //"navigateToSmartList",//View Smart List
                        //"navigateToFilterView",//Filter View
                        //"showImportStatus",//Show Import Status
                        //"showExportStatus",//Show Export Status
                        "importList",//Import List
                        //"exportList",//Export List
                        //"exportAdBridge",//Send via Ad Bridge
                        //"newSmartListReportSubscription",//New Smart List Subscription
                        "cloneSmartlist",//Clone Smart List
                        "cloneList",//Clone List
                        "deleteList",//Delete List
                        "showSupportHistory",//Support Tools - History
                        "showSupportUsagePerf",//Support Tools - Run Stats
                        "showSmartListProcessorDiag",//Processor Diagnostics
                        "showSmartListProcessorOverride",//Override Processor
                        //"addToFavorites",//Add to Favorites
                        //"removeFromFavorites",//Remove from Favorites
                                    
                        // Global > Report > Actions Button
                        "cloneReport_atxCanvasOverview",//Clone Report
                        "deleteReport",//Delete Report
                        //"newDrillDown_atxCanvasOverview",//Drill-Down
                                    
                        // Global > Report > Right-click Tree
                        //"navigateToOverviewReport",//View Overview
                        //"navigateToDetailReport",//View Report
                        //"navigateToSmartList",//View Smart List
                        //"navigateToSetup",//View Setup
                        //"navigateToSubscriptions",//View Subscriptions
                        "cloneReport",//Clone Report
                        "deleteReport",//Delete Report
                        "moveReport",//Move Report
                        //"addToFavorites",//Add to Favorites
                        //"removeFromFavorites",//Remove from Favorites
                                    
                        // Global > Lead > Actions Button & Right-click Tree
                        //"viewLeadDetails",//View Lead Details
                        "blackCatDiag",//BlackCat Diagnostics
                        "mergeLeads",//Merge Leads
                        //"leadDbMenuFlowActions",//Marketing
                            "sendEmail",//Send Email...
                            "sendPushNotification",//Send Push Notification...
                            "addToList",//Add to List...
                            "removeFromList",//Remove from List...
                            "interestingMoment",//Interesting Moment...
                            "sendAlert",//Send Alert...
                            "changeScore",//Change Score...
                            "changeDataValue",//Change Data Value...
                        //"programsFolder",//Programs
                            "changeStatusInProgression",//Change Program Status...
                            "addToNurture",//Add to Engagement Program...
                            "changeNurtureCadence",//Change Engagement Program Cadence...
                            "changeNurtureTrack",//Change Engagement Program Stream...
                        //"specialFolder",//Special
                            "changeLeadPartition",//Change Lead Partition...
                            "changeRevenueStage",//Change Revenue Stage...
                            "deleteLead",//Delete Lead...
                            "giveCreditToReferrer",//Give Credit to Referrer
                            "requestCampaign",//Request Campaign...
                            "removeFromFlow",//Remove from Flow...
                        //"salesforceFolder",//Salesforce
                            "pushLeadToSFDC",//Sync Lead to SFDC...
                            "createTask",//Create Task...
                            "convertLead",//Convert Lead...
                            "changeOwner",//Change Owner...
                            "deleteLeadFromSFDC",//Delete Lead from SFDC...
                            "addToSFDCCampaign",//Add to SFDC Campaign...
                            "changeStatusInSFDCCampaign",//Change Status in SFDC Campaign...
                            "removeFromSFDCCampaign",//Remove from SFDC Campaign...
                                    
                        // Global > Programs, Analyzers, and Reports > Setup Right-click Tree
                        //"editItem",//Edit
                        "deleteItem",//Delete
                                    
                        // Marketing Activities > New Button
                        "createProgramFolder",//New Campaign Folder
                        "newSmartCampaign",//New Smart Campaign
                        "createNewMarketingProgram",//New Program
                        "importProgram",//Import Program
                                    
                        // Marketing Activities > Default & Email Send Programs > Actions Button
                        "entryRescheduleEntries",//Reschedule Entries
                        "sfdcCampaignSync",//Salesforce Campaign Sync
                        "cloneMarketingProgram",//Clone
                        "deleteMarketingProgram",//Delete
                        //"showImportMemberStatus",//Show Import Status
                        //"showExportMemberStatus",//Show Export Status
                                    
                        // Marketing Activities > Event Program > Actions Button
                        "eventSchedule",//Schedule
                        "entryRescheduleEntries",//Reschedule Entries
                        "webinarSettings",//Event Settings
                        "sfdcCampaignSync",//Salesforce Campaign Sync
                        "cloneMarketingEvent",//Clone
                        "deleteMarketingEvent",//Delete
                        "refreshFromWebinarProvider",//Refresh from Webinar Provider
                        //"showImportMemberStatus",//Show Import Status
                        //"showExportMemberStatus",//Show Export Status
                                    
                        // Marketing Activities > Nurturing Program > Actions Button
                        "sfdcCampaignSync",//Salesforce Campaign Sync
                        "cloneNurtureProgram",//Clone
                        "deleteNurtureProgram",//Delete
                        "testNurtureProgram",//Test Stream
                        //"showImportMemberStatus",//Show Import Status
                        //"showExportMemberStatus",//Show Export Status
                                    
                        // Marketing Activities > Smart Campaign > Actions Button
                        // Default, Email Send, Event, and Nurturing Programs; Smart Campaign, Folder > Right-click Tree
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
                        "createNewMarketingProgram",//New Program
                        "newLocalAsset",//New Local Asset
                        "createProgramFolder",//New Campaign Folder
                        "renameProgramFolder",//Rename Folder
                        "deleteProgramFolder",//Delete Folder
                        "convertToArchiveFolder",//Convert To Archive Folder
                        "convertToCampaignFolder",//Convert To Campaign Folder
                        "scClone",//Clone
                        "scArchive",//Delete
                        "scMove",//Move
                        "cloneMarketingProgram",//Clone
                        "deleteMarketingProgram",//Delete
                        "cloneMarketingEvent",//Clone
                        "deleteMarketingEvent",//Delete
                        "cloneNurtureProgram",//Clone
                        "deleteNurtureProgram",//Delete
                        "cloneEmailBatchProgram",//Clone
                        "deleteEmailBatchProgram",//Delete
                        "cloneInAppProgram",//Clone
                        "deleteInAppProgram",//Delete
                        "shareProgramFolder",//Share Folder
                        "scActivate",//Activate
                        "scAbort",//Abort Campaign
                        //"addToFavorites",//Add to Favorites
                        //"removeFromFavorites",//Remove from Favorites
                        //"importProgramStatus",//Import Program Status
                        "scCampChangeHistory",//Support Tools - Change History
                        "scCampRunHistory",//Support Tools - Run History
                        "scClearPalette",//Clear Palette Cache
                        "scClearSmartList",//Clear Smart List
                        "scClearFlow",//Clear Flow
                        "progGenerateRef",//Build Campaign References
                        "checkForCorruptEmails",//Check For Corrupt Emails
                                    
                        // Marketing Activities > Social App: Poll, Referral Offer, Social Button, Sweepstakes, Video > Right-click Tree
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
                        //"socialAppDraftDiscard",//Discard Draft
                                    
                        // Marketing Activities > Push Notification > Right-click Tree
                        //"pushNotificationEdit",//Edit Draft
                        //"pushNotificationPreview",//Preview
                        "pushNotificationUnapprove",//Unapprove
                        "pushNotificationApprove",//Approve
                        //"pushNotificationSendSample",//Send Sample
                        "pushNotificationClone",//Clone
                        "pushNotificationDelete",//Delete
                        //"pushNotificationDraftEdit",//Edit Draft
                        //"pushNotificationDraftPreview",//Preview Draft
                        //"pushNotificationDraftSendSample",//Send Sample of Draft
                        "pushNotificationDraftApprove",//Approve Draft
                        //"pushNotificationDraftDiscard",//Discard Draft
                                    
                        // Marketing Activities > ALL Programs > Change Status Button
                        "Not in ProgramStatusMarketingEvent",//Not in Program
                        "SentStatusMarketingEvent",//Sent
                        "VisitedStatusMarketingEvent",//Visited
                        "EngagedStatusMarketingEvent",//Engaged
                                    
                        // Marketing Activities > ALL Programs & Folders > My Tokens Right-click Tree
                        //"editCustomToken",//Edit Token
                        "deleteCustomToken",//Delete Token
                                    
                        // Design Studio > Folder > Right-click Tree
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
                        "uploadImage",//Upload Image or File
                        //"grabFromWebPage",//Grab Images from Web
                        "share",//Share Folder
                        "createFolder",//New Folder
                        "renameFolder",//Rename Folder
                        "deleteFolder",//Delete Folder
                        "convertToArchiveFolder",//Convert To Archive Folder
                        "convertToFolder",//Convert To Folder
                                    
                        // Design Studio > Landing Page Template > Actions Button & Right-click Tree
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
                                    
                        // Design Studio > Email Template > Actions Button & Right-click Tree
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
                        //"emailTemplateDraftSendTest",//Send Sample of Draft
                        "emailTemplateDraftApprove",//Approve Draft
                        //"emailTemplateDraftDiscard",//Discard Draft
                                    
                        // Design Studio > Snippet > Actions Button & Right-click Tree
                        //"snippetNoDraftApprovalStatus",//Show Approval Status
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
                                    
                        // Design Studio > Image & File > Actions Button
                        "uploadImage",//Upload Image or File
                        //"grabFromWebPage",//Grab Images from Web
                        //"imagePreview",//View
                        "imageDelete",//Delete
                        "replaceImage",//Replace Image or File
                                    
                        // Lead Database > New Button
                        "newSmartList",//New Smart List
                        "newList",//New List
                        "newSegmentation",//New Segmentation
                        "importList",//Import List
                        "newLead",//New Lead
                        "newDataMgr",//New Field Organizer
                                    
                        // Lead Database > Folder > Right-click Tree
                        "newSegmentation",//New Segmentation
                        "newSmartList",//New Smart List
                        "share",//Share Folder
                        "createFolder",//New Folder
                        "renameFolder",//Rename Folder
                        "deleteFolder",//Delete Folder
                        "convertToArchiveFolder",//Convert To Archive Folder
                        "convertToFolder",//Convert To Folder
                                    
                        // Lead Database > Segmentation > Actions Button & Right-click Tree
                        "createDraftSegmentation",//Create Draft
                        //"editSegmentation",//Edit Segments
                        "approveSegmentation",//Approve
                        "unapproveSegmentation",//Unapprove
                        "deleteSegmentation",//Delete
                        "refreshSegmentation",//Refresh Status
                        //"editDraftSegmentation",//Edit Segments
                        "approveDraftSegmentation",//Approve Draft
                        //"discardDraftSegmentation",//Discard Draft
                                    
                        // Analytics > New Button
                        //"newSubscription_atxCanvasOverview",//New Report Subscription
                        "newRcm_atxCanvasOverview",//New Revenue Cycle Model
                        //"newSubscription_rcmCanvasOverview",//New Report Subscription
                        "newRcm_rcmCanvasOverview",//New Revenue Cycle Model
                        //"newSubscription_atxCanvasSubscriptions",//New Report Subscription
                        "newRcm_atxCanvasSubscriptions",//New Revenue Cycle Model
                                    
                        // Analytics > Folder > Right-click Tree
                        "newRcm",//New Revenue Cycle Model
                        "share",//Share Folder
                        "createFolder",//New Folder
                        "renameFolder",//Rename Folder
                        "deleteFolder",//Delete Folder
                        "convertToArchiveFolder",//Convert To Archive Folder
                        "convertToFolder",//Convert To Folder
                                    
                        // Analytics > Analyzer & Report > Actions Button
                        "newReport_atxCanvasOverview",//Export Data
                        "cloneReport_atxCanvasOverview",//Clone Analyzer
                        "deleteReport",//Delete Analyzer
                                    
                        // Analytics > Analyzer > Right-click Tree
                        //"navigateToAnalyzer",//View Analyzer
                        //"navigateToAnalyzerSetup",//View Setup
                        "cloneReport",//Clone Analyzer
                        "deleteReport",//Delete Analyzer
                        //"addToFavorites",//Add to Favorites
                        //"removeFromFavorites",//Remove from Favorites
                                    
                        // Analytics > Report > Right-click Tree
                        //"navigateToOverviewReport",//View Overview
                        //"navigateToDetailReport",//View Report
                        //"navigateToSmartList",//View Smart List
                        //"navigateToSetup",//View Setup
                        //"navigateToSubscriptions",//View Subscriptions
                        "cloneReport",//Clone Report
                        "deleteReport",//Delete Report
                        "moveReport",//Move Report
                        //"addToFavorites",//Add to Favorites
                        //"removeFromFavorites",//Remove from Favorites
                                    
                        // Analytics > Model > Actions Button & Right-click Tree
                        //"rcmEdit",//Edit Draft
                        //"rcmPreview",//Preview Model
                        "rcmApproveStages",//Approve Stages
                        "rcmUnapproveStages",//Unapprove Stages
                        "rcmApprove",//Approve Model
                        "rcmUnapprove",//Unapprove Model
                        "rcmClone",//Clone Model
                        "rcmDelete",//Delete Model
                        //"rcmExport",//Export Model
                        //"addToFavorites",//Add to Favorites
                        //"removeFromFavorites",//Remove from Favorites
                        //"rcmEditDraft",//Edit Draft
                        //"rcmPreviewDraft",//Preview Draft
                        "rcmApproveDraft",//Approve Model Draft
                        //"rcmDiscardDraft",//Discard Model Draft
                        "rcmAassignmentRules",//Assignment Rules
                        
                        // Admin > Tags > Tags > New Button
                        //"newDescriptor",//New Tag Type
                        //"newDescriptorValue",//New Tag Value
                        //"newChannel",//New Channel
                        
                        // Admin > Tags > Tags > Actions Button & Right-click Tree
                        "editDescriptor",//Edit
                        "deleteDescriptor",//Delete
                        "deleteDescriptorValue",//Delete
                        "hideDescriptorValue",//Hide
                        "unhideDescriptorValue",//Unhide
                        
                        // Admin > Tags > Calendar Entry Types > New Button
                        "newEntry",//Entry Type
                        
                        // Admin > Tags > Calendar Entry Types > Actions Button
                        "editEntry",//Edit
                        "unhideEntry",//Unhide
                        "hideEntry",//Hide
                        
                        // Admin > Field Management > Actions Button
                        "hideFieldFmFields",//Hide field
                        //"blockFieldUpdatesFmFields",//Block Field Updates
                        "changeTypeFmFields",//Change Type
                        //"exportFieldsFmFields",//Export Field Names
                        
                        // Admin > Landing Pages > Landing Pages > New Button
                        "newAlias",//New Domain Alias
                        "newRule",//New Redirect Rule
                        
                        // Admin > Landing Pages > Rules > Actions Button
                        "editRule",//Edit Rule
                        "deleteRule",//Delete Rule
                        
                        // Admin > LaunchPoint > New Button
                        "newWebinarLogin",//New Service
                        
                        // Admin > LaunchPoint > Actions Button
                        "editWebinarLogin",//Edit Service
                        "cloneWebinarLogin",//Clone Login
                        "deleteWebinarLogin",//Delete Service
                        
                        // Admin > Webhooks > Actions Button
                        //"newWebhookLogin",//New Webhook
                        "editWebhook",//Edit Webhook
                        "cloneWebhook",//Clone Webhook
                        "deleteWebhook",//Delete Webhook
                        "customHeader",//Set Custom Header
                    ];
                if (this.triggeredFrom != "tree"
                && this.triggeredFrom != "button") {
                    disable = APP.evaluateMenu("tree", this, canvas, null);
                }
                else if (this.id == "leadDbListMenu"
                || this.id == "segmentationMenu") {
                    disable = APP.evaluateMenu("tree", this, canvas, null);
                }
                else {
                    disable = APP.evaluateMenu(this.triggeredFrom, this, canvas, null);
                }

                itemsToDisable.forEach(function(itemToDisable) {
                    var item = mItems.get(itemToDisable);
                    if (item) {
                        item.setDisabled(disable);
                    }
                });
                
                if (mItems.get("shareProgramFolder")) {
                    mItems.get("shareProgramFolder").setDisabled(true);
                }
                else if (mItems.get("share")) {
                    mItems.get("share").setDisabled(true);
                }
                
                if (this.ownerCt
                && this.ownerCt.text.search("^View:") != -1) {
                    var ii;
                    for (ii = 0; ii < this.items.items.length; ii++) {
                        switch (this.items.items[ii].text) {
                            case "Create View":
                                this.items.items[ii].setDisabled(true);
                                break;
                            
                            case "Edit Default":
                                this.items.items[ii].setDisabled(true);
                                break;
                            
                            default:
                                break;
                        }
                    }
                }
                
                this.parentMenu = parentMenu;
                if (!this.el) {
                    this.render();
                }
                if (this.enableScrolling) {
                    this.el.setXY(xy);
                    xy[1] = this.constrainScroll(xy[1]);
                    xy = [this.el.adjustForConstraints(xy)[0], xy[1]];
                }
                else {
                    xy = this.el.adjustForConstraints(xy);
                }
                this.el.setXY(xy);
                this.el.show();
                Ext.menu.Menu.superclass.onShow.call(this);
                if (Ext.isIE) {
                    this.fireEvent('autosize', this);
                    if (!Ext.isIE8) {
                        this.el.repaint();
                    }
                }
                this.hidden = false;
                this.focus();
                this.fireEvent('show', this);
            }
        }
    }
    
    if (Mkt3
    && Mkt3.controller
    && Mkt3.controller.socialApp
    && Mkt3.controller.socialApp.SocialApp
    && Mkt3.controller.socialApp.SocialApp.prototype
    && Mkt3.controller.socialApp.SocialApp.prototype.loadToolbar) {
        // Disable Marketing Activities > Social App > Actions menu
        var prevSocialAppToolbar = Mkt3.controller.socialApp.SocialApp.prototype.loadToolbar;
        Mkt3.controller.socialApp.SocialApp.prototype.loadToolbar = function(menu, attr) {
            console.log ("Marketo App > Executing: Disable Actions menu for Social Apps in Marketing Activities");
            prevSocialAppToolbar.apply(this, arguments);

            var disable = APP.evaluateMenu("socialAppToolbar", null, null, this),
                mItems = Ext4.ComponentQuery.query(
                    /*"socialAppToolbar contextMenu [action=edit]," +*/ //Edit
                    /*"socialAppToolbar contextMenu [action=preview]," +*/ //Preview
                    "socialAppToolbar contextMenu [action=approve]," + //Approve
                    "socialAppToolbar contextMenu [action=clone]," + //Clone
                    "socialAppToolbar contextMenu [action=delete]," + //Delete
                    /*"socialAppToolbar contextMenu [action=getWidgetEmbedCode]," +*/ //Embed Code
                    /*"socialAppToolbar contextMenu [action=editDraft]," +*/ //Edit Draft
                    /*"socialAppToolbar contextMenu [action=previewDraft]," +*/ //Preview Draft
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
    }
    
    if (Mkt3
    && Mkt3.controller
    && Mkt3.controller.mobilePushNotification
    && Mkt3.controller.mobilePushNotification.MobilePushNotification
    && Mkt3.controller.mobilePushNotification.MobilePushNotification.prototype
    && Mkt3.controller.mobilePushNotification.MobilePushNotification.prototype.loadToolbar) {
        // Disable Marketing Activities > Push Notification > Actions menu
        var prevMobilePushNotificationToolbar = Mkt3.controller.mobilePushNotification.MobilePushNotification.prototype.loadToolbar;
        Mkt3.controller.mobilePushNotification.MobilePushNotification.prototype.loadToolbar = function(menu, attr) {
            console.log ("Marketo App > Executing: Disable Actions menu for Push Notifications in Marketing Activities");
            prevMobilePushNotificationToolbar.apply(this, arguments);

            var disable = APP.evaluateMenu("mobilePushNotification", null, null, this),
                mItems = Ext4.ComponentQuery.query(
                    /*"mobilePushNotification contextMenu [action=edit]," +*/ //Edit
                    /*"mobilePushNotification contextMenu [action=sendSample]," +*/ //Send Sample
                    "mobilePushNotification contextMenu [action=approve]," + //Approve
                    "mobilePushNotification contextMenu [action=unapprove]," + //Unapprove
                    "mobilePushNotification contextMenu [action=clone]," + //Clone
                    "mobilePushNotification contextMenu [action=delete]," + //Delete
                    /*"mobilePushNotification contextMenu [action=editDraft]," +*/ //Edit Draft
                    /*"mobilePushNotification contextMenu [action=sendDraftSample]," +*/ //Send Sample of Draft
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
    }
    
    if (Ext4
    && Ext4.Component
    && Ext4.Component.prototype
    && Ext4.Component.prototype.showAt) {
        // Disable Marketing Activities > Nurture Program > Stream & Content Actions menus
        Ext4.Component.prototype.showAt = function (x, y, animate) {
            console.log ("Marketo App > Executing: Disable Content & Actions menu for a Nurture Program Stream in Marketing Activities");
            
            var me = this;
            if (!me.rendered
            && (me.autoRender
                || me.floating)) {
                
                me.doAutoRender();
                me.hidden = true
            }
            if (me.floating) {
                me.setPosition(x, y, animate)
            }
            else {
                me.setPagePosition(x, y, animate)
            }
            me.show()
            
            if (MktCanvas
            && MktCanvas.getActiveTab()) {
                var ii,
                    disable = APP.evaluateMenu("button", null, MktCanvas.getActiveTab(), null);
                for (ii = 0; ii < me.items.items.length; ii++) {
                    switch (me.items.items[ii].action) {
                        
                        // Marketing Activities > Nurture Program > Stream Actions
                        // Edit Name
                        case "edit":
                            //me.items.items[ii].setDisabled(disable);
                            break;
                        // Clone
                        case "clone":
                            me.items.items[ii].setDisabled(disable);
                            break;
                        // Activate all content
                        case "activateAllContent":
                            //me.items.items[ii].setDisabled(disable);
                            break;
                        // Show archived content
                        case "showArchivedContent":
                            //me.items.items[ii].setDisabled(disable);
                            break;
                        // Hide archived content
                        case "hideArchivedContent":
                            //me.items.items[ii].setDisabled(disable);
                            break;
                        // Edit Transition Rules
                        case "editTransitionRules":
                            //me.items.items[ii].setDisabled(disable);
                            break;
                        // Delete
                        case "delete":
                            me.items.items[ii].setDisabled(disable);
                            break;
                        
                        // Marketing Activities > Nurture Program > Content Actions
                        // All //
                        // Activate
                        case "activate":
                            //me.items.items[ii].setDisabled(disable);
                            break;
                        // Deactivate
                        case "deactivate":
                            //me.items.items[ii].setDisabled(disable);
                            break;
                        // Edit Availability
                        case "schedule":
                            //me.items.items[ii].setDisabled(disable);
                            break;
                        // Archive
                        case "archive":
                            me.items.items[ii].setDisabled(disable);
                            break;
                        // Unarchive
                        case "unarchive":
                            me.items.items[ii].setDisabled(disable);
                            break;
                        // Remove
                        case "remove":
                            //me.items.items[ii].setDisabled(disable);
                            break;
                        // Email //
                        // Edit Draft
                        case "emailEditDraft":
                            //me.items.items[ii].setDisabled(disable);
                            break;
                        // Preview
                        case "emailPreview":
                            //me.items.items[ii].setDisabled(disable);
                            break;
                        // Approve
                        case "emailApproveDraft":
                            me.items.items[ii].setDisabled(disable);
                            break;
                        // Send Sample
                        case "emailSendTest":
                            //me.items.items[ii].setDisabled(disable);
                            break;
                        // Go to Email
                        case "goToEmail":
                            //me.items.items[ii].setDisabled(disable);
                            break;
                        // Email Draft //
                        // Edit Draft
                        case "emailEditDraft":
                            //me.items.items[ii].setDisabled(disable);
                            break;
                        // Preview Draft
                        case "emailPreviewDraft":
                            //me.items.items[ii].setDisabled(disable);
                            break;
                        // Send Sample of Draft
                        case "emailSendTestOfDraft":
                            //me.items.items[ii].setDisabled(disable);
                            break;
                        // Approve Draft
                        case "emailApproveDraft":
                            me.items.items[ii].setDisabled(disable);
                            break;
                        // Program //
                        // View Assets
                        case "programViewAssets":
                            //me.items.items[ii].setDisabled(disable);
                            break;
                        // View Setup
                        case "programViewSetup":
                            //me.items.items[ii].setDisabled(disable);
                            break;
                        // View My Tokens
                        case "programViewTokens":
                            //me.items.items[ii].setDisabled(disable);
                            break;
                        // View Members
                        case "programViewMembers":
                            //me.items.items[ii].setDisabled(disable);
                            break;
                        // Go to Program
                        case "goToProgram":
                            //me.items.items[ii].setDisabled(disable);
                            break;
                        // Push Notification //
                        // Edit Draft
                        case "mobilePushEditDraft":
                            //me.items.items[ii].setDisabled(disable);
                            break;
                        // Preview
                        case "mobilePushPreview":
                            //me.items.items[ii].setDisabled(disable);
                            break;
                        // Approve
                        case "mobilePushApprove":
                            me.items.items[ii].setDisabled(disable);
                            break;
                        // Send Sample
                        case "mobilePushSendTest":
                            //me.items.items[ii].setDisabled(disable);
                            break;
                        // Go to Push Notification
                        case "goToPushNotification":
                            //me.items.items[ii].setDisabled(disable);
                            break;
                        
                        default:
                            break;
                    }
                }
            }
        }
    }
}

/**************************************************************************************
 *  
 *  This function hides Toolbar items for all asset types in all areas.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.hideToolbarItems = function() {
    console.log("Marketo App > Hiding: Toolbar Items");
    
    if (Ext
    && Ext.layout
    && Ext.layout.ContainerLayout
    && Ext.layout.ContainerLayout.prototype
    && Ext.layout.ContainerLayout.prototype.renderItem) {
        // Disable ALL areas > ALL assets > ALL Toolbar items except for Smart Campaigns, Smart Lists, Lists, Social Apps, and Push Notifications
        Ext.layout.ContainerLayout.prototype.renderItem = function (c, position, target) {
            if (c
            && c.topToolbar
            && c.topToolbar.items) {
                console.log("Marketo App > Executing: Disable Toolbar items for ALL in ALL");
                
                var item,
                    canvas = MktCanvas.getActiveTab(),
                    visible = !APP.evaluateMenu("button", null, canvas, null),
                    itemsToHide = [
                    /*{
                    // Global > Programs, Analyzers, and Reports > Setup
                        "id" : "editItem",//Edit
                        "action" : "setVisible",
                    },*/
                    {
                        "id" : "deleteItem",//Delete
                        "action" : "setVisible",
                    },
                        
                    // Global > Analyzers & Reports > Subscriptions
                    /*{
                        "id" : "newSubscription_atxCanvasSubscriptions",//New Report Subscription
                        "action" : "setDisabled",
                    },*/
                    {
                        "id" : "deleteSubscription_atxCanvasSubscriptions",//Delete Subscription
                        "action" : "setVisible",
                    },
                        
                    // Global > Form
                    /*{
                        "id" : "formEdit_landingFODetail",//Edit Form
                        "action" : "setVisible",
                    },*/
                        
                    // Global > Landing Page
                    /*{
                        "id" : "pageEdit_landingLPDetail",//Edit Draft
                        "action" : "setVisible",
                    },*/
                    /*{
                        "id" : "pagePreview_landingLPDetail",//Preview Page
                        "action" : "setVisible",
                    },*/
                        
                    // Global > Email
					/*{
                        "id" : "emailEdit_landingEMDetail",//Edit Draft
                        "action" : "setVisible",
					},*/
					/*{
                        "id" : "emailPreview_landingEMDetail",//Preview Email
                        "action" : "setVisible",
					},*/
					{
                        "id" : "gotoDeliverability_landingEMDetail",//Deliverability Tools
                        "action" : "setVisible",
					},
                        
                    // Marketing Activities > Programs & Folders > My Tokens
					/*{
                        "id" : "editCustomToken",//Edit Token
                        "action" : "setVisible",
					},*/
					{
                        "id" : "deleteCustomToken",//Delete Token
                        "action" : "setVisible",
					},
                        
                    // Marketing Activities > Programs > Members
					{
                        "id" : "importMembers",//Import Members
                        "action" : "setDisabled",
					},
                        
                    // Design Studio > Forms (System Folder)
					/*{
                        "id" : "formEdit_landingCanvasFO",//Edit Form
                        "action" : "setVisible",
					},*/
                        
                    // Design Studio > Landing Pages (System Folder)
					/*{
                        "id" : "pageEdit_landingCanvasLP",//Edit Draft
                        "action" : "setVisible",
					},*/
					/*{
                        "id" : "pagePreview_landingCanvasLP",//Preview Page
                        "action" : "setVisible",
					},*/
                        
                    // Design Studio > Landing Page Templates (System Folder)
					/*{
                        "id" : "pageTemplateEditDraft_landingCanvasTM",//Edit Draft
                        "action" : "setVisible",
					},*/
					/*{
                        "id" : "pageTemplatePreview_landingCanvasTM",//Preview Template
                        "action" : "setVisible",
					},*/
					{
                        "id" : "importTemplate_landingCanvasTM",//Import Template
                        "action" : "setDisabled",
					},
                        
                    // Design Studio > Landing Page Template
					/*{
                        "id" : "pageTemplateEditDraft_landingTMDetail",//Edit Draft
                        "action" : "setVisible",
					},*/
					/*{
                        "id" : "pageTemplatePreview_landingTMDetail",//Preview Template
                        "action" : "setVisible",
					},*/
					{
                        "id" : "importTemplate_landingTMDetail",//Import Template
                        "action" : "setDisabled",
					},
                        
                    // Design Studio > Emails (System Folder)
					/*{
                        "id" : "emailEdit_landingCanvasEM",//Edit Draft
                        "action" : "setVisible",
					},*/
					/*{
                        "id" : "emailPreview_landingCanvasEM",//Preview Email
                        "action" : "setVisible",
					},*/
					{
                        "id" : "gotoDeliverability_landingCanvasEM",//Deliverability Tools
                        "action" : "setVisible",
					},
                        
                    // Design Studio > Email Templates (System Folder)
					/*{
                        "id" : "emailTemplateEdit_emailTemplates",//Edit Draft
                        "action" : "setVisible",
					},*/
					/*{
                        "id" : "emailTemplatePreview_emailTemplates",//Preview Template
                        "action" : "setVisible",
					},*/
                        
                    // Design Studio > Email Template
					/*{
                        "id" : "emailTemplateEdit_EMTemplateDetail",//Edit Draft
                        "action" : "setVisible",
					},*/
					/*{
                        "id" : "emailTemplatePreview_EMTemplateDetail",//Preview Template
                        "action" : "setVisible",
					},*/
                        
                    // Design Studio > Snippets (System Folder)
					/*{
                        "id" : "snippetEdit_landingCanvasSnippet",//Edit Draft
                        "action" : "setVisible",
					},*/
					/*{
                        "id" : "snippetPreview_landingCanvasSnippet",//Preview Snippet
                        "action" : "setVisible",
					},*/
                        
                    // Design Studio > Snippet
					/*{
                        "id" : "snippetEdit_snippetDetail",//Edit Draft
                        "action" : "setVisible",
					},*/
					/*{
                        "id" : "snippetPreview_snippetDetail",//Preview Snippet
                        "action" : "setVisible",
					},*/
                        
                    // Design Studio > Images and Files
					{
                        "id" : "imageUpload_landingCanvasIM",//Upload Image or File
                        "action" : "setDisabled",
					},
					{
                        "id" : "imageReplace_landingCanvasIM",//Replace Image or File
                        "action" : "setVisible",
					},
                        
                    // Analytics > Model
					/*{
                        "id" : "editDraft_rcmCanvasOverview",//Edit Draft
                        "action" : "setVisible",
					},*/
					/*{
                        "id" : "previewModel_rcmCanvasOverview",//Preview Model
                        "action" : "setVisible",
					},*/
                        
                    // Admin > Admin
                    {
                        "text" : "Change Password",//Change Password
                        "action" : "setDisabled",
					},
					{
                        "text" : "Invite New User",//Invite New User
                        "action" : "setDisabled",
					},
                        
                    // Admin > My Account
                    {
                        "text" : "Change Password",//Change Password
                        "action" : "setDisabled",
					},
					{
                        "id" : "caadEditButton",//Edit Account Settings
                        "action" : "setDisabled",
					},
                        
                    // Admin > Login Settings
					{
                        "id" : "caadEditSecurityButton",//Edit Security Settings
                        "action" : "setDisabled",
					},
					/*{
                        "id" : "caadEditurlButton",//Edit URL Expiration
                        "action" : "setDisabled",
					},*/
					{
                        "id" : "caadEditRestrictedLoginButton",//Edit IP Restrictions
                        "action" : "setDisabled",
					},
					/*{
                        "id" : "caadEditSmartListReportSettingsButton",//Smart List Report Settings
                        "action" : "setDisabled",
					},*/
                        
                    // Admin > Users & Roles > Users
					{
                        "text" : "Invite New User",//Invite New User
                        "action" : "setDisabled",
					},
					{
                        "id" : "editLicenses",//Issue License
                        "action" : "setVisible",
					},
					{
                        "id" : "editUser",//Edit User
                        "action" : "setVisible",
					},
					{
                        "id" : "deleteUser",//Delete User
                        "action" : "setVisible",
					},
					{
                        "id" : "resetPassword",//Reset Password
                        "action" : "setVisible",
					},
                        
                    // Admin > Users & Roles > Roles
					/*{
                        "id" : "newRole",//New Role
                        "action" : "setDisabled",
					},*/
					{
                        "id" : "editRole",//Edit Role
                        "action" : "setVisible",
					},
					{
                        "id" : "deleteRole",//Delete Role
                        "action" : "setVisible",
					},
                        
                    // Admin > Workspaces & Partitions > Workspaces
					/*{
                        "id" : "newZone",//New Workspace
                        "action" : "setDisabled",
					},*/
					{
                        "id" : "editZone",//Edit Workspace
                        "action" : "setVisible",
					},
					{
                        "id" : "deleteZone",//Delete Workspace
                        "action" : "setVisible",
					},
                        
                    // Admin > Workspaces & Partitions > Partitions
					/*{
                        "id" : "newPartition",//New Lead Partition
                        "action" : "setDisabled",
					},*/
					{
                        "id" : "editPartition",//Edit Lead Partition
                        "action" : "setVisible",
					},
					{
                        "id" : "deletePartition",//Delete Lead Partition
                        "action" : "setVisible",
					},
					/*{
                        "id" : "assignmentRules",//Assignment Rules
                        "action" : "setDisabled",
					},*/
                        
                    // Admin > Location
					/*{
                        "id" : "capdChangeButton",//Change Location Settings
                        "action" : "setDisabled",
					},*/
                        
                    // Admin > Email > Email
					{
                        "text" : "Edit IP Settings",//Edit IP Settings
                        "action" : "setDisabled",
					},
					{
                        "text" : "Edit Text Editor Settings",//Edit Text Editor Settings
                        "action" : "setDisabled",
					},
					{
                        "text" : "Edit Email Editor Settings",//Edit Email Editor Settings
                        "action" : "setDisabled",
					},
                        
                    // Admin > Email > SPF/DKIM
					{
                        "id" : "addDomain",//Add Domain
                        "action" : "setDisabled",
					},
					{
                        "id" : "deleteDomain",//Delete Domain
                        "action" : "setVisible",
					},
					/*{
                        "id" : "dkimDetails",//DKIM Details
                        "action" : "setDisabled",
					},*/
					/*{
                        "id" : "checkDNS",//Check DNS
                        "action" : "setDisabled",
					},*/
                        
                    // Admin > Tags > Tags
					/*{
                        "id" : "newButton",//New
                        "action" : "setDisabled",
					},*/
					/*{
                        "id" : "actionsButton",//Tag Actions
                        "action" : "setVisible",
					},*/
                        
                    // Admin > Tags > Calendar Entry Types
					/*{
                        "id" : "newButton",//New
                        "action" : "setDisabled",
					},*/
					/*{
                        "id" : "actionsButton",//Entry Actions
                        "action" : "setVisible",
					},*/
                        
                    // Admin > Field Management
					/*{
                        "id" : "fieldManagement_fmFields",//Field Actions
                        "action" : "setDisabled",
					},*/
					/*{
                        "text" : "New Custom Field",//New Custom Field
                        "action" : "setDisabled",
					},*/
					/*{
                        "id" : "exportFieldsFmFields",//Export Field Names
                        "action" : "setDisabled",
					},*/
                        
                    // Admin > Salesforce Object Sync
					{
                        "id" : "refreshCadSfdcObjectSync",//Refresh Schema
                        "action" : "setDisabled",
					},
					/*{
                        "id" : "syncOjbectCadSfdcObjectSync",//Enable Sync
                        "action" : "setVisible",
					},*/
					{
                        "id" : "editVisibleFieldsCadSfdcObjectSync",//Edit Visible Fields
                        "action" : "setVisible",
					},
                        
                    // Admin > Salesforce
					{
                        "id" : "enableSync",//Enable/Disable Sync
                        "action" : "setVisible",
					},
					/*{
                        "id" : "editCredentials",//Edit Credentials
                        "action" : "setDisabled",
					},*/
					/*{
                        "id" : "editSyncOptions",//Edit Sync Options
                        "action" : "setDisabled",
					},*/
                        
                    // Admin > Sales Insight > Sales Insight
					{
                        "text" : "Edit API Configuration",//Edit API Configuration
                        "action" : "setDisabled",
					},
					{
                        "text" : "Edit Settings",//Edit Settings
                        "action" : "setDisabled",
					},
                        
                    // Admin > Sales Insight > Email Add-in
					{
                        "id" : "issueLicenseCadLisAdmin",//Issue License
                        "action" : "setDisabled",
					},
					{
                        "id" : "revokeLicenseCadLisAdmin",//Revoke License
                        "action" : "setVisible",
					},
					{
                        "id" : "resendLicenseCadLisAdmin",//Resend Invitation
                        "action" : "setVisible",
					},
					/*{
                        "id" : "addSeatsCadLisAdmin",//Purchase More Seats
                        "action" : "setDisabled",
					},*/
					{
                        "id" : "configAddinCadLisAdmin",//Config Add-in
                        "action" : "setVisible",
					},
                        
                    // Admin > Landing Pages > Landing Pages
					/*{
                        "id" : "editDomainSettings",//Edit Settings
                        "action" : "setVisible",
					},*/
                        
                    // Admin > Landing Pages > Rules
					/*{
                        "text" : "Rules Actions",//Rules Actions
                        "action" : "setVisible",
					},*/
					{
                        "id" : "editRule",//Edit Rule
                        "action" : "setVisible",
					},
					{
                        "id" : "deleteRule",//Delete Rule
                        "action" : "setVisible",
					},
                        
                    // Admin > Web Services
					{
                        "id" : "editIpRestriction",//Edit IP Restrictions
                        "action" : "setDisabled",
					},
                        
                    // Admin > LaunchPoint
					/*{
                        "id" : "newLaunchpoint",//New
                        "action" : "setDisabled",
					},*/
					/*{
                        "id" : "launchpointActions",//Service Actions
                        "action" : "setVisible",
					},*/
					{
                        "id" : "editWebinarLogin",//"Edit Service"
                        "action" : "setVisible",
					},
                        
                    // Admin > Webhooks
					/*{
                        "id" : "newWebhookLogin",//New Webhook
                        "action" : "setDisabled",
					},*/
					/*{
                        "text" : "Webhooks Actions",//Webhooks Actions
                        "action" : "setVisible",
					},*/
                        
                    // Admin > Revenue Cycle Analytics > Custom Field Sync
					{
                        "id" : "cadChangeButton",//Edit Sync Option
                        "action" : "setVisible",
					},
                ];
                
                itemsToHide.forEach(function(itemToHide) {
                    if (itemToHide.id) {
                        item = c.topToolbar.items.get(itemToHide.id);
                    }
                    else if (itemToHide.text) {
                        item = c.topToolbar.find("text", itemToHide.text)[0];
                    }
                    if (item) {
                        if (itemToHide.id == "gotoDeliverability_landingEMDetail") {
                            item.setVisible(false);
                        }
                        else if (itemToHide.action == "setVisible") {
                            item.setVisible(visible);
                        }
                        else if (itemToHide.action == "setDisabled") {
                            item.setDisabled(!visible);
                        }
                    }
                });
            }
            
            if (c) {
                if (!c.rendered) {
                    c.render(target, position);
                    this.configureItem(c, position);
                }
                else if (!this.isValidParent(c, target)) {
                    if (Ext.isNumber(position)) {
                        position = target.dom.childNodes[position];
                    }
                    
                    target.dom.insertBefore(c.getPositionEl().dom, position || null);
                    c.container = target;
                    this.configureItem(c, position);
                }
            }
        }
    }
}

/**************************************************************************************
 *  
 *  This function disables the Save, Apply, Change ... buttons in the Admin Section. 
 *  It can be used to disable any generic Save window.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.disableAdminSaveButtons = function() {
    console.log("Marketo App > Disabling: Admin Section Save Buttons");

    if (Ext
    && Ext.Window
    && Ext.Window.prototype
    && Ext.Window.prototype.show) {
        Ext.Window.prototype.show = function (animateTarget, cb, scope) {
            // Disable ALL areas > ALL assets > ALL Save windows
            console.log("Marketo App > Executing: Disable Admin Section Save Buttons");
            
            if (MktCanvas
            && MktCanvas.getActiveTab()
            && MktCanvas.getActiveTab().title) {
                var activeTabTitle = MktCanvas.getActiveTab().title,
                    toDisable,
                    ii,
                    currButton;
                switch (activeTabTitle) {
                    // Login Settings
                    case "Login Settings":
                        toDisable = true;
                        break;
                    // Users & Roles > Roles 
                    case "Roles":
                        toDisable = true;
                        break;
                    // Workspaces & Partitions > Workspaces
                    case "Workspaces":
                        toDisable = true;
                        break;
                    // Workspaces & Partitions > Partitions
                    case "Lead Partitions":
                        toDisable = true;
                        break;
                    // Location > Subscription Currency Settings
                    case "Location":
                        toDisable = true;
                        break;
                    // Smart Campaign
                    case "Smart Campaign":
                        toDisable = true;
                        break;
                    // Communication Limits
                    case "Communication Limits":
                        toDisable = true;
                        break;
                    // Tags > Tags
                    case "Tags":
                        toDisable = true;
                        break;
                    // Field Management > New Custom Field, Block Field Updates, Edit Import Aliases, Change Type
                    case "Field Management":
                        toDisable = true;
                        break;
                    // Salesforce Objects Sync
                    case "Salesforce Objects Sync":
                        toDisable = true;
                        break;
                    // Salesforce
                    case "Salesforce":
                        toDisable = true;
                        break;
                    // Sales Insight > Sales Insight
                    case "Sales Insight":
                        toDisable = true;
                        break;
                    // Sales Insight > Email Add-in
                    case "Email Add-in":
                        toDisable = true;
                        break;
                    // Landing Pages > Landing Pages
                    case "Landing Pages":
                        toDisable = true;
                        break;
                    // Landing Pages > Rules
                    case "Rules":
                        toDisable = true;
                        break;
                    // Munchkin
                    case "Munchkin":
                        toDisable = true;
                        break;
                    // LaunchPoint > Delete Service
                    case "Installed Services":
                        toDisable = true;
                        break;
                    // Webhooks
                    case "Webhooks":
                        toDisable = true;
                        break;
                    // Single Sign-On
                    case "Single Sign-On":
                        toDisable = true;
                        break;
                    // Revenue Cycle Analytics > Attribution
                    case "Revenue Cycle Analytics":
                        toDisable = true;
                        break;
                    // Treasure Chest
                    case "Treasure Chest":
                        toDisable = true;
                        break;
                    default:
                        break;
                }
                if (toDisable) {
                    for (ii = this.buttons.length-1; ii >= 0; ii--) {
                        currButton = this.buttons[ii];
                        switch (currButton.text) {
                            case "Save":
                                currButton.setDisabled(true);
                                break;
                            case "Create":
                                currButton.setDisabled(true);
                                break;
                            case "Apply":
                                currButton.setDisabled(true);
                                break;
                            case "Change":
                                currButton.setDisabled(true);
                                break;
                            case "Disable Global Sync":
                                currButton.setDisabled(true);
                                break;
                            case "Enable Sync":
                                currButton.setDisabled(true);
                                break;
                            case "Disable Sync":
                                currButton.setDisabled(true);
                                break;
                            case "Issue License":
                                currButton.setDisabled(true);
                                break;
                            case "Revoke License":
                                currButton.setDisabled(true);
                                break;
                            case "Resend Invitation":
                                currButton.setDisabled(true);
                                break;
                            case "Delete":
                                currButton.setDisabled(true);
                                break;
                            case "Clone":
                                currButton.setDisabled(true);
                                break;
                            default:
                                break;
                        }
                    }
                }
            }
            
            if (!this.rendered) {
                this.render(Ext.getBody());
            }
            if (this.hidden === false) {
                this.toFront();
                return this;
            }
            if (this.fireEvent('beforeshow', this) === false) {
                return this;
            }
            if (cb) {
                this.on('show', cb, scope, {
                    single : true
                });
            }
            this.hidden = false;
            if (Ext.isDefined(animateTarget)) {
                this.setAnimateTarget(animateTarget);
            }
            this.beforeShow();
            if (this.animateTarget) {
                this.animShow();
            }
            else {
                this.afterShow();
            }
            return this;
        }
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

    if (Mkt
    && Mkt.apps
    && Mkt.apps.marketingEvent
    && Mkt.apps.marketingEvent.MarketingEventForm
    && Mkt.apps.marketingEvent.MarketingEventForm.prototype
    && Mkt.apps.marketingEvent.MarketingEventForm.prototype.beforeSubmitCallback) {
        var previousMarketingEventForm = Mkt.apps.marketingEvent.MarketingEventForm.prototype.beforeSubmitCallback;
        Mkt.apps.marketingEvent.MarketingEventForm.prototype.beforeSubmitCallback = function() {
            console.log("Marketo App > Executing: Limit Nurture Programs");
            
            var limit_exceeded = false,
                rootNode = MktExplorer.boundTree.root,
                compType = "Nurture Program",
                matches = [],
                node = rootNode.cascade(function() {
                        var attr = this.attributes;
                        if (attr && attr.xtra) {
                            if (attr.xtra.compType == compType && attr.xtra.accessZoneId == MktCanvas.getActiveTab().config.accessZoneId) {
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
 *  This function overrides the function for saving additions and deletions to Nurture 
 *  Streams.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.overrideSaving = function() {
    console.log("Marketo App > Overriding: Saving for Nurture Streams");
    
    if (Mkt3
    && Mkt3.data
    && Mkt3.data.Store
    && Mkt3.data.Store.prototype
    && Mkt3.data.Store.prototype.sync) {
        var prevDataStoreSync = Mkt3.data.Store.prototype.sync;
        Mkt3.data.Store.prototype.sync = function() {
            console.log("Marketo App > Executing: Override Saving for Nurture Streams (sync)");
            
            if (window.location.href.search("\/#" + mktoCalendarFragment) != -1) {
                Mkt3.data.Store.prototype.sync = prevDataStoreSync;
            }
            
            else {
            
                var disable;
                if (MktCanvas
                && MktCanvas.getActiveTab()
                && APP.getCookie("toggleState") != "false") {
                    disable = APP.evaluateMenu("button", null, MktCanvas.getActiveTab(), null);
                }
                else if (APP.getCookie("toggleState") == "false") {
                    disable = true;
                }
                
                if (!disable) {
                    if (this.autoSyncSuspended) {
                        this.autoSync = true;
                        this.autoSyncSuspended = false;
                    }

                    if (this.getProxy()instanceof Mkt3.data.proxy.AjaxPost) {
                        Mkt3.Synchronizer.sync(this);
                    }
                    else {
                        this.callParent(arguments);
                    }
                }
                else {
                    console.log("Marketo App > Disabling: Saving for Nurture Streams (sync)");
                }
            }
        }
    }

    if (Ext4
    && Ext4.data
    && Ext4.data.Model
    && Ext4.data.Model.prototype
    && Ext4.data.Model.prototype.destroy) {
        Ext4.data.Model.prototype.destroy = function(options) {
            console.log("Marketo App > Executing: Override Saving for Nurture Streams (destroy)");
            
            var disable;
            if (MktCanvas
            && MktCanvas.getActiveTab()
            && APP.getCookie("toggleState") != "false") {
                disable = APP.evaluateMenu("button", null, MktCanvas.getActiveTab(), null);
            }
            else if (APP.getCookie("toggleState") == "false") {
                disable = true;
            }
            
            if (!disable) {
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
            else {
                console.log("Marketo App > Disabling: Saving for Nurture Streams (destroy)");
            }
        }
    }
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
    console.log("Marketo App > Enabling: Saving for Editors");

    if (Mkt3
    && Mkt3.data
    && Mkt3.data.Store
    && Mkt3.data.Store.prototype
    && Mkt3.data.Store.prototype.sync) {
        Mkt3.data.Store.prototype.sync = function() {
            console.log("Marketo App > Executing: Enable Saving for Editors (sync)");
            
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
    }

    if (Ext4
    && Ext4.data
    && Ext4.data.Model
    && Ext4.data.Model.prototype
    && Ext4.data.Model.prototype.destroy) {
        Ext4.data.Model.prototype.destroy = function(options) {
            console.log("Marketo App > Executing: Enable Saving for Editors (destroy)");
            
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
    console.log("Marketo App > Disabling: Saving for Editors");
    
    if (Mkt3
    && Mkt3.data
    && Mkt3.data.Store
    && Mkt3.data.Store.prototype
    && Mkt3.data.Store.prototype.sync) {
        Mkt3.data.Store.prototype.sync = function() {
            console.log("Marketo App > Executing: Disable Saving for Editors (sync)");
        };
    }
    
    if (Ext4
    && Ext4.data
    && Ext4.data.Model
    && Ext4.data.Model.prototype
    && Ext4.data.Model.prototype.destroy) {
        Ext4.data.Model.prototype.destroy = function() {
            console.log("Marketo App > Executing: Disable Saving for Editors (destroy)");
        };
    }
    
	if (Mkt3
    && Mkt3.controller
    && Mkt3.controller.editor
    && Mkt3.controller.editor.form
    && Mkt3.controller.editor.form.settings
    && Mkt3.controller.editor.form.settings.FieldSelection
    && Mkt3.controller.editor.form.settings.FieldSelection.prototype
    && Mkt3.controller.editor.form.settings.FieldSelection.prototype.deleteFormField) {
        Mkt3.controller.editor.form.settings.FieldSelection.prototype.deleteFormField = function(formField) {
            console.log("Marketo App > Executing: Enable Deleting Form Field");
            
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
}

/**************************************************************************************
 *  
 *  This function overlays an email with the user submitted company logo and color.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.overlayEmail = function(action) {
    console.log("Marketo App > Overlaying: Email");

    var isEmailEditor2,
        overlay,
        emailDocuments,
        currEmailDocument,
        mktoImgs,
        mktoTexts,
        mktoButtons,
        logoSwapCompany,
        logoSwapContainer,
        logoSwapCompanyContainer,
        ii,
        isMktoImgReplaced = false,
        isMktoTextReplaced = false,
        isMktoSubTextReplaced = false,
        isMktoButtonReplaced = false,
        isMktoEmail1Replaced = false,
        dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUNE", "JULY", "AUG", "SEPT", "OCT", "NOV", "DEC"],
        date = new Date(),
        dayOfWeek = dayNames[date.getDay()],
        month = monthNames[date.getMonth()],
        dayOfMonth,
        year = date.getFullYear(),
        logoMktoNameRegex = new RegExp("logo", "i"),
        mainTitleMktoNameRegex = new RegExp("main title", "i"),
        subTitleMktoNameRegex = new RegExp("subtitle", "i"),
        buttonTextRegex = new RegExp("signup|sign up|call to action|cta", "i"),
        logo = APP.getCookie("logo"),
        color = APP.getCookie("color"),
        company,
        companyName;
    
    switch (date.getDate()) {
        case 1:
            dayOfMonth = "1st";
            break;
        case 2:
            dayOfMonth = "2nd";
            break;
        case 3:
            dayOfMonth = "3rd";
            break;
        default:
            dayOfMonth = date.getDate() + "th";
            break;
    }
    
    if (logo == null) {
        logo = defaultTurnerLogoWhite;
        companyName = "Turner";
    }
    else {
        company = logo.split("https://logo.clearbit.com/")[1].split(".")[0];
        companyName = company.charAt(0).toUpperCase() + company.slice(1);
    }
    
    if (color == null) {
        color = defaultColor;
    }

    isEmailEditor2 = window.setInterval(function() {
        overlay = function(emailDocument) {
            mktoImgs = emailDocument.getElementsByClassName("mktoImg");
            mktoTexts = emailDocument.getElementsByClassName("mktoText");
            mktoButtons = emailDocument.getElementsByClassName("secondary-font button");
            logoSwapCompany = emailDocument.getElementById("logo-swap-company");
            logoSwapContainer = emailDocument.getElementById("logo-swap-container");
            logoSwapCompanyContainer = emailDocument.getElementById("logo-swap-company-container");
            logoBkg = emailDocument.getElementById("logo-bkg");
            buttonBkg = emailDocument.getElementById("button-bkg");
            
            if (mktoImgs
            && !isMktoImgReplaced) {
                for (ii = 0; ii < mktoImgs.length; ii++) {
                    currMktoImg = mktoImgs[ii];
                    
                    if (currMktoImg.getAttribute("mktoname").search(logoMktoNameRegex) != -1) {
                        console.log("Marketo App > Overlaying: Email 2.0 Company Logo");
                        currMktoImg.getElementsByTagName("img")[0].setAttribute("src", logo);
                        isMktoImgReplaced = true;
                        break;
                    }
                }
            }
            
            if (mktoTexts
            && !isMktoSubTextReplaced
            && !isMktoTextReplaced) {
                for (ii = 0; ii < mktoTexts.length; ii++) {
                    currMktoText = mktoTexts[ii];
                    
                    if (currMktoText.getAttribute("mktoname").search(mainTitleMktoNameRegex) != -1) {
                        console.log("Marketo App > Overlaying: Email 2.0 Company Name");
                        currMktoText.innerHTML = companyName + " Invites You<br><br>PREMIER BUSINESS EVENT<br>OF THE YEAR";
                        isMktoTextReplaced = true;
                    }
                    else if (currMktoText.getAttribute("mktoname").search(subTitleMktoNameRegex) != -1) {
                        console.log("Marketo App > Overlaying: Email 2.0 Today's Date");
                        currMktoText.innerHTML = dayOfWeek + ", " + month + " the " + dayOfMonth + " " + year;
                        isMktoSubTextReplaced = true;
                    }
                }
                
                if (isMktoSubTextReplaced
                && isMktoTextReplaced) {
                    break;
                }
            }
            
            if (mktoButtons
            && !isMktoButtonReplaced) {
                for (ii = 0; ii < mktoButtons.length; ii++) {
                    currMktoButton = mktoButtons[ii];
                    
                    if (currMktoButton.innerHTML.search(buttonTextRegex) != -1) {
                        console.log("Marketo App > Overlaying: Email 2.0  Company Color");
                        currMktoButton.style.backgroundColor = color;
                        isMktoButtonReplaced = true;
                        break;
                    }
                }
            }
            
            if (logoSwapCompanyContainer
            && logoSwapContainer
            && logoSwapCompany
            && logoBkg) {
                console.log("Marketo App > Overlaying: Email 1.0 Company Logo & Color");
                logoBkg.style.backgroundColor = color;
                logoSwapCompany.setAttribute("src", logo);
                logoSwapContainer.style.display = "none";
                logoSwapCompanyContainer.style.display = "block";
                if (buttonBkg) {
                    buttonBkg.style.backgroundColor = color;
                }
                isMktoEmail1Replaced = true;
            }
            
            if ((isMktoButtonReplaced
                && isMktoSubTextReplaced
                && isMktoTextReplaced
                && isMktoImgReplaced)
            || isMktoEmail1Replaced) {
                window.clearInterval(isEmailEditor2);
            }
        }
        
        if (action == "edit") {
            overlay(document.getElementsByTagName("iframe")[0].contentWindow.document);
        }
        else if (action == "preview") {
            emailDocuments = document.getElementsByTagName("iframe");
            for (ii = 0; ii < emailDocuments.length; ii++) {
                currEmailDocument = emailDocuments[ii];
                
                if (currEmailDocument.getAttribute("id").search("^iframeComponent-") != -1) {
                    overlay(currEmailDocument);
                }
            }
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
        company,
        companyName,
        isLandingPageIframeElement,
        lpLogo,
        backgroundColor,
        biggerBackground,
        subTitle;
    
    if (logo == null
    || logo.value == null) {
        logo = defaultTurnerLogoGreen;
        companyName = "Turner";
    }
    else {
        company = logo.split("https://logo.clearbit.com/")[1].split(".")[0];
        companyName = company.charAt(0).toUpperCase() + company.slice(1);
    }
    
    if (color == null
    || color.value == null) {
        color = defaultColor;
    }
    
    isLandingPageIframeElement = window.setInterval(function() {
        lpLogo = document.getElementsByTagName("iframe")[0].contentWindow.document.getElementById("lp-logo");
        backgroundColor = document.getElementsByTagName("iframe")[0].contentWindow.document.getElementById("background-color");
        biggerBackground = document.getElementsByTagName("iframe")[0].contentWindow.document.getElementById("bigger-background");
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
    console.log("Marketo App > Opening: Ad Bridge Modal Window");
    
    if (document
    && document.getElementsByClassName("x-btn-text mkiUserTarget")
    && document.getElementsByClassName("x-btn-text mkiUserTarget")[0]
    && document.getElementsByClassName("x-btn-text mkiUserTarget")[0].type == "button") {
        console.log("Marketo App > Executing: Open Ad Bridge Modal Window");
        
        document.getElementsByClassName("x-btn-text mkiUserTarget")[0].click();
    }
}

/**************************************************************************************
 *  
 *  This function returns the email IDs of all the email assets in a given instance. 
 *
 *  @Author Andrew Garcia
 *
 *  @function
 *
 **************************************************************************************/

APP.getEmailIds = function(accountString) {
    console.log("Marketo App > Getting: Email IDs for account string: " + accountString);
    
    var emIds = [];
    switch (accountString) {
        case mktoAccountString106:
            // Default DIY Design: Email
            emIds.push(15464);
            // Default DIY Design: Email (Modular)
            emIds.push(21424);
            // Default DIY Design: Email (Responsive)
            emIds.push(20931);
            // Default Email Marketing: AB Test Configuration, AB Test Dashboard, Champion/Chalenger, Email Program Dashboard
            emIds.push(18113, 18106, 18111, 18110);
            // Default Replicate Success: Roadshow Example
            emIds.push(10010, 10179, 10180, 12845, 10181, 10182, 10183, 10184);
            // Default Replicate Success: Webinar Example
            emIds.push(4894, 3764, 3765, 3767, 3766, 3762);
            // Default Intelligent Nurturing
            emIds.push(12818, 12820, 12819, 12816, 12811, 12815, 12812, 12813, 12814, 12821, 12817, 12823);
            // Default Actionable Insight: BANT Nurture for Sales
            emIds.push(12900, 12901, 12899, 12898);
            // Default Actionable Insight: Sales Auto Reach Out
            emIds.push(12902, 12903, 12904);
            // Japanese Default Content Unknown
            emIds.push(16474, 17254, 16403);
            // Japanese Event Roadshow Unknown
            emIds.push(18117, 18118, 18122, 18119, 18116, 18123, 18120, 18121, 18124);
            // Japanese Replicate Success Webinar
            emIds.push(16118, 16119, 16120, 16122, 16121, 16117);
            // Japanese Replicate Success Roadshow
            emIds.push(16331, 16332, 16338, 16333, 16123, 16339, 16335, 16336, 17868);
            // Japanese Intelligent Nurturing
            emIds.push(16125, 16129, 16126, 16124, 16132, 16131, 16130, 16128, 16127, 16133, 16137, 16136);
            // Japanese Default Email Blast Unknown
            emIds.push(18126);
            // Financial Services DIY Design
            emIds.push(20350, 20368)
            // Healthcare Services DIY Design
            emIds.push(20327)
            // Higher Ed Services DIY Design
            emIds.push(20329)
            break;
        case mktoAccountString106a:
            // DIY Design
            emIds.push(14240);
            // Intelligent Nurturing
            emIds.push(10171, 10173, 10172, 10169, 9957, 9974, 9968, 10174, 9972, 9973, 10170, 9962);
            // Replicate Success Roadshow
            emIds.push(10010, 10179, 10180, 10181, 10182, 10183, 10184);
            // Replicate Success Webinar
            emIds.push(4894, 3764, 3765, 3767, 3766, 3762);
            break;
        case mktoAccountString106b:
            // DIY Design
            emIds.push(13924);
            // Intelligent Nurturing
            emIds.push(12818, 12820, 12819, 12816, 12811, 12815, 12812, 12821, 12813, 12814, 12817, 12823);
            // Replicate Success Roadshow
            emIds.push(10010, 10179, 10180, 12845, 10181, 10182, 10183, 10184);
            // Replicate Success Webinar
            emIds.push(4894, 3764, 3765, 3767, 3766, 3762);
            break;
        case mktoAccountString106d:
            // Default DIY Design
            emIds.push(15464);
            // Default Email Marketing: AB Test Configuration, AB Test Dashboard, Champion/Chalenger, Email Program Dashboard
            emIds.push(18113, 18106, 18111, 18110);
            // Default Replicate Success: Roadshow Example
            emIds.push(10010, 10179, 10180, 12845, 10181, 10182, 10183, 10184);
            // Default Replicate Success: Webinar Example
            emIds.push(4894, 3764, 3765, 3767, 3766, 3762);
            // Default Intelligent Nurturing
            emIds.push(12818, 12820, 12819, 12816, 12811, 12815, 12812, 12813, 12814, 12821, 12817, 12823);
            // Default Actionable Insight: BANT Nurture for Sales
            emIds.push(12900, 12901, 12899, 12898);
            // Default Actionable Insight: Sales Auto Reach Out
            emIds.push(12902, 12903, 12904);
            // Japanese Default Content Unknown
            emIds.push(16474, 17254, 16403);
            // Japanese Event Roadshow Unknown
            emIds.push(18117, 18118, 18122, 18119, 18116, 18123, 18120, 18121, 18124);
            // Japanese Replicate Success Webinar
            emIds.push(16118, 16119, 16120, 16122, 16121, 16117);
            // Japanese Replicate Success Roadshow
            emIds.push(16331, 16332, 16338, 16333, 16123, 16339, 16335, 16336, 17868);
            // Japanese Intelligent Nurturing
            emIds.push(16125, 16129, 16126, 16124, 16132, 16131, 16130, 16128, 16127, 16133, 16137, 16136);
            // Japanese Default Email Blast Unknown
            emIds.push(18126);
            // Financial Services DIY Design
            emIds.push(20350, 20368)
            // Healthcare Services DIY Design
            emIds.push(20327)
            // Higher Ed Services DIY Design
            emIds.push(20329)
            break;
        default:
            console.log("Marketp App > Invalid: account string in getEmailIds(): " + accountString);
            break;
    }
    return emIds;
}

/**************************************************************************************
 *
 *  Main
 *  
 **************************************************************************************/

if ((currentUrl.search(mktoAppDomain) != -1
|| currentUrl.search(mktoDesignerDomain) != -1
|| currentUrl.search(mktoWizard) != -1)
//&& currentUrl.search("#CAL") == -1
) {
    console.log("Marketo App > Location: Marketo URL");

    var isMktPageApp = window.setInterval(function() {
        if (typeof(MktPage) !== "undefined") {
            console.log("Marketo App > Location: Marketo Page");
            
            var accountString,
                userId,
                currUrlFragment,
                currCompFragment;
            
            if (MktPage.savedState
            && MktPage.savedState.custPrefix
            && MktPage.userid
            && Mkt3
            && Mkt3.DL
            && Mkt3.DL.getDlToken()) {
            
                window.clearInterval(isMktPageApp);
                    
                accountString = MktPage.savedState.custPrefix;
                userId = MktPage.userid.toLowerCase();
                currUrlFragment = Mkt3.DL.getDlToken();
                
                if (Mkt3.DL.dl
                && Mkt3.DL.dl.dlCompCode) {
                    currCompFragment = Mkt3.DL.dl.dlCompCode;
                }
                
                if (userId.search("\.demo@marketo.com$") != -1) {
                    userName = userId.split(".demo")[0];
                }
                else {
                    userName = userId.split("@")[0];
                }
            }
            
            // This checks to see if the username is one that would be associated
            // with a MarketoLive subscription.
            if (accountString.search(mktoAccountStringsMatch) != -1
            || APP.getCookie("toggleState") == "false") {
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
                    if (APP.getCookie("toggleState") != "false") {
                        return;
                    } 
                    else {
                        console.log("Marketo App > User: Admin is now a normal user");
                    }
                }

//                var prevWorkspaceId;
                
                // Disabling Demo Plugin Check
                APP.disableDemoPluginCheck();

                // Email Deliverability
                if (currUrlFragment == mktoMyMarketoFragment) {
                    APP.overrideHomeTiles();
                }
				else if (currUrlFragment == mktoMarketingActivitiesDefaultFragment
				|| currUrlFragment == mktoMarketingActivitiesMarketingFragment
                || currUrlFragment == mktoMarketingActivitiesJapaneseFragment
                || currUrlFragment == mktoMarketingActivitiesFinservFragment
                || currUrlFragment == mktoMarketingActivitiesHealthcareFragment
                || currUrlFragment == mktoMarketingActivitiesHigherEdFragment
                || currUrlFragment == mktoLeadDatabaseDefaultFragment
                || currUrlFragment == mktoLeadDatabaseMarketingFragment
                || currUrlFragment == mktoLeadDatabaseJapaneseFragment
                || currUrlFragment == mktoLeadDatabaseFinservFragment
                || currUrlFragment == mktoLeadDatabaseHealthcareFragment
                || currUrlFragment == mktoLeadDatabaseHigherEdFragment) {
					APP.disableButtons();
				}
                else if (currUrlFragment == mktoAnalyticsDefaultFragment) {
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
                if (currCompFragment != mktoEmailDesignerFragment
                && currCompFragment != mktoEmailPreviewFragment
                && currCompFragment != mktoLandingPageDesignerFragment
                && currCompFragment != mktoLandingPagePreviewFragment
                && currCompFragment != mktoFormWizardFragment
                && currCompFragment != mktoMobilePushNotificationWizardFragment
                && currCompFragment != mktoSocialAppWizardFragment
                && currCompFragment != mktoABtestWizardFragment
                && currCompFragment != mktoEmailTestWizardFragment) {
                    
                    if (accountString.search(mktoAccountStringsMatch) != -1) {
                        APP.overrideTreeNodeExpand();
                        APP.overrideTreeNodeCollapse();
                        APP.overrideSaving();
                        APP.disableDragAndDrop();
                        APP.disableMenus();
                        APP.hideToolbarItems();
                        APP.disableAdminSaveButtons();
                        APP.overrideSmartCampaignSaving();
//                        APP.overrideSmartCampaignCanvas();
                        APP.overrideUpdatePortletOrder();
                        APP.overrideNewProgramCreate();
                        APP.overrideAssetSaveEdit();
                        APP.overrideNewAssetCreate();
                        APP.overrideNewFolders();
                        APP.overrideRenamingFolders();
//                        APP.hidePageGrid();
                        APP.hideFoldersOnImport();
                        APP.disableConfirmationMessage();
                    }
                    else {
                        APP.overrideSaving();
                        APP.overrideSmartCampaignSaving();
                        APP.overrideUpdatePortletOrder();
                        APP.disableConfirmationMessage();
                    }
/*
                    // Storing previous Workspace ID
                    if (currUrlFragment != mktoMyMarketoFragment) {
						var isMktCanvas = window.setInterval(function() {
							if (MktCanvas
                            && MktCanvas.getActiveTab()
                            && MktCanvas.getActiveTab().config) {
								console.log("Marketo App > Location: Marketo Canvas Active Tab");
								
                                window.clearInterval(isMktCanvas);
								prevWorkspaceId = MktCanvas.getActiveTab().config.accessZoneId;
							}
						}, 0);
					}
*/
                    // Marketing ROI, Funnel Analysis
                    if (currUrlFragment == mktoOppInfluenceAnalyzerFragment
					|| currUrlFragment == mktoProgramAnalyzerFragment
					|| currUrlFragment == mktoModeler106Fragment
					|| currUrlFragment == mktoModeler106abFragment
					|| currUrlFragment == mktoSuccessPathAnalyzerFragment) {
                        console.log("Marketo App > Location: Analytics");

                        APP.injectAnalyzerNavBar();
                    }

                    // Setting the asset draft IDs to discard
                    var lpIds = {},
                        formIds = [],
                        pushIds = [],
                        socIds = [],
                        emIds = APP.getEmailIds(accountString);
                    switch (accountString) {
                        case mktoAccountString106:
                            // DIY Design: Landing Page, Landing Page Responsive
                            lpIds["dpageid_11826"] = "dpageid_11826";
                            lpIds["dpageid_11822"] = "dpageid_11822";
                            // Replicate Success Roadshow Example: Registration Page, Thank You for Registering
                            lpIds["dpageid_8819"] = "dpageid_8819";
                            lpIds["dpageid_8941"] = "dpageid_8941";
                            // Replicate Success Webinar Example: Recorded Webinar LP, Registration Landing Page, Thank You LP
                            lpIds["dpageid_4876"] = "dpageid_4876";
                            lpIds["dpageid_4872"] = "dpageid_4872";
                            lpIds["dpageid_4874"] = "dpageid_4874";
                            // Japanese DIY Design: 1, 2, 3
                            lpIds["dpageid_11856"] = "dpageid_11856";
                            lpIds["dpageid_11548"] = "dpageid_11548";
                            lpIds["dpageid_11546"] = "dpageid_11546";
                            // Japanese Event Roadshow Unknown: 1, 2
                            lpIds["dpageid_12420"] = "dpageid_12420";
                            lpIds["dpageid_12418"] = "dpageid_12418";
                            // Japanese Replicate Success Webinar Example: 1, 2, 3
                            lpIds["dpageid_11552"] = "dpageid_11552";
                            lpIds["dpageid_11550"] = "dpageid_11550";
                            lpIds["dpageid_11553"] = "dpageid_11553";
                            // Japanese Replicate Success Roadshow Example: 1, 2
                            lpIds["dpageid_12345"] = "dpageid_12345";
                            lpIds["dpageid_11556"] = "dpageid_11556";
                            // Financial Services DIY Design: Mortgage Landing Page, Banking Landing Page, Preferences Page
                            lpIds["dpageid_13187"] = "dpageid_13187";
                            lpIds["dpageid_13185"] = "dpageid_13185";
                            lpIds["dpageid_12709"] = "dpageid_12709";
                            // Financial Services Event Management Home Buyinng Seminar: Recorded Webinar LP, Reg LP, Thank You LP
                            lpIds["dpageid_12720"] = "dpageid_12720";
                            lpIds["dpageid_12717"] = "dpageid_12717";
                            lpIds["dpageid_12719"] = "dpageid_12719";
                            // Healthcare DIY Design: Landing Page, Landing Page Offer, Landing Page Responsive, Preference Page
                            lpIds["dpageid_12569"] = "dpageid_12569";
                            lpIds["dpageid_12932"] = "dpageid_12932";
                            lpIds["dpageid_13165"] = "dpageid_13165";
                            lpIds["dpageid_12586"] = "dpageid_12586";
                            // Healthcare Event Management HC - Tour the Clinic: Recorded Webinar LP
                            lpIds["dpageid_12517"] = "dpageid_12517";
                            // Higher Education DIY Design: Landing Page, Landing Page - In State, Landing Page - Video, Landing Page Responsive, Preference Page
                            lpIds["dpageid_12250"] = "dpageid_12250";
                            lpIds["dpageid_12934"] = "dpageid_12934";
                            lpIds["dpageid_12401"] = "dpageid_12401";
                            lpIds["dpageid_13167"] = "dpageid_13167";
                            lpIds["dpageid_12248"] = "dpageid_12248";
                            // Higher Education Event Management HE - Event: Thanks and Next Event
                            lpIds["dpageid_12177"] = "dpageid_12177";

                            // Forms: Default DIY Design, Replicate Success Roadshow Example, Replicate Success Webinar Example
                            formIds.push(3576, 1749, 1900);
                            // Forms: Japanese Default DIY Design, Japanese Event Roadshow Unknown, Japanese Replicate Success Webinar Example, Japanese Replicate Success Roadshow Example
                            formIds.push(3018, 3708, 3020, 3021);
                            // Forms: Financial Services DIY Design
                            formIds.push(3952, 3955, 3953);
                            // Forms: Healthcare DIY Design
                            formIds.push(3816, 3818, 3828);
                            // Forms: Higher Ed DIY Design
                            formIds.push(3313, 4125, 3559);
                            
                            // Push Notifications: Default DIY Design, Mobile Engagement
                            pushIds.push(29, 23);
                            // Push Notifications: Japanese DIY Design, Mobile Engagement, Unknown
                            pushIds.push(99, 216, 103, 218);
                            // Push Notifications: Financial Services DIY Design, Mobile Engagement
                            pushIds.push(187);
                            // Push Notifications: Healthcare DIY Design, Mobile Engagement
                            pushIds.push(169);
                            // Push Notifications: Higher Ed DIY Design, Mobile Engagement
                            pushIds.push(131);
                            
                            // Social Apps: Default DIY Design
                            socIds.push(586, 587, 491, 484, 448);
                            // Social Apps: Japanese DIY Design
                            socIds.push(853);
                            // Social Apps: Financial Services DIY Design
                            socIds.push(1091, 1090, 1093, 1092, 1094);
                            // Social Apps: Healthcare DIY Design
                            socIds.push(1021, 1023, 1025, 1022, 1020);
                            // Social Apps: Higher Ed DIY Design
                            socIds.push(860, 1024, 861, 859, 858);
                            break;
                        case mktoAccountString106a:
                            // Custom Landing Page
                            lpIds["dpageid_10672"] = "dpageid_10672";
                            // Responsive Landing Page
                            lpIds["dpageid_10454"] = "dpageid_10454";
                            // DIY Design and Replicate Success Forms
                            formIds.push(2532, 1749, 1900);
                            // DIY Design and Mobile Engagement Push Notifications 
                            pushIds.push(29, 26);
                            break;
                        case mktoAccountString106b:
                            // Landing Page
                            lpIds["dpageid_10760"] = "dpageid_10768";
                            // Responsive Landing Page
                            lpIds["dpageid_10762"] = "dpageid_10762";
                            // DIY Design and Replicate Success Forms
                            formIds.push(2472, 1749, 1900);
                            // DIY Design and Mobile Engagement Push Notifications 
                            pushIds.push(2, 1);
                            break;
                        case mktoAccountString106d:
                            // DIY Design: Landing Page, Landing Page Responsive
                            lpIds["dpageid_11826"] = "dpageid_11826";
                            lpIds["dpageid_11822"] = "dpageid_11822";
                            // Replicate Success Roadshow Example: Registration Page, Thank You for Registering
                            lpIds["dpageid_8819"] = "dpageid_8819";
                            lpIds["dpageid_8941"] = "dpageid_8941";
                            // Replicate Success Webinar Example: Recorded Webinar LP, Registration Landing Page, Thank You LP
                            lpIds["dpageid_4876"] = "dpageid_4876";
                            lpIds["dpageid_4872"] = "dpageid_4872";
                            lpIds["dpageid_4874"] = "dpageid_4874";
                            // Japanese DIY Design: 1, 2, 3
                            lpIds["dpageid_11856"] = "dpageid_11856";
                            lpIds["dpageid_11548"] = "dpageid_11548";
                            lpIds["dpageid_11546"] = "dpageid_11546";
                            // Japanese Event Roadshow Unknown: 1, 2
                            lpIds["dpageid_12420"] = "dpageid_12420";
                            lpIds["dpageid_12418"] = "dpageid_12418";
                            // Japanese Replicate Success Webinar Example: 1, 2, 3
                            lpIds["dpageid_11552"] = "dpageid_11552";
                            lpIds["dpageid_11550"] = "dpageid_11550";
                            lpIds["dpageid_11553"] = "dpageid_11553";
                            // Japanese Replicate Success Roadshow Example: 1, 2
                            lpIds["dpageid_12345"] = "dpageid_12345";
                            lpIds["dpageid_11556"] = "dpageid_11556";
                            // Financial Services DIY Design: Mortgage Landing Page, Banking Landing Page, Preferences Page
                            lpIds["dpageid_13187"] = "dpageid_13187";
                            lpIds["dpageid_13185"] = "dpageid_13185";
                            lpIds["dpageid_12709"] = "dpageid_12709";
                            // Financial Services Event Management Home Buyinng Seminar: Recorded Webinar LP, Reg LP, Thank You LP
                            lpIds["dpageid_12720"] = "dpageid_12720";
                            lpIds["dpageid_12717"] = "dpageid_12717";
                            lpIds["dpageid_12719"] = "dpageid_12719";
                            // Healthcare DIY Design: Landing Page, Landing Page Offer, Landing Page Responsive, Preference Page
                            lpIds["dpageid_12569"] = "dpageid_12569";
                            lpIds["dpageid_12932"] = "dpageid_12932";
                            lpIds["dpageid_13165"] = "dpageid_13165";
                            lpIds["dpageid_12586"] = "dpageid_12586";
                            // Healthcare Event Management HC - Tour the Clinic: Recorded Webinar LP
                            lpIds["dpageid_12517"] = "dpageid_12517";
                            // Higher Education DIY Design: Landing Page, Landing Page - In State, Landing Page - Video, Landing Page Responsive, Preference Page
                            lpIds["dpageid_12250"] = "dpageid_12250";
                            lpIds["dpageid_12934"] = "dpageid_12934";
                            lpIds["dpageid_12401"] = "dpageid_12401";
                            lpIds["dpageid_13167"] = "dpageid_13167";
                            lpIds["dpageid_12248"] = "dpageid_12248";
                            // Higher Education Event Management HE - Event: Thanks and Next Event
                            lpIds["dpageid_12177"] = "dpageid_12177";

                            // Forms: Default DIY Design, Replicate Success Roadshow Example, Replicate Success Webinar Example
                            formIds.push(3576, 1749, 1900);
                            // Forms: Japanese Default DIY Design, Japanese Event Roadshow Unknown, Japanese Replicate Success Webinar Example, Japanese Replicate Success Roadshow Example
                            formIds.push(3018, 3708, 3020, 3021);
                            // Forms: Financial Services DIY Design
                            formIds.push(3952, 3955, 3953);
                            // Forms: Healthcare DIY Design
                            formIds.push(3816, 3818, 3828);
                            // Forms: Higher Ed DIY Design
                            formIds.push(3313, 4125, 3559);
                            
                            // Push Notifications: Default DIY Design, Mobile Engagement
                            pushIds.push(29, 23);
                            // Push Notifications: Japanese DIY Design, Mobile Engagement, Unknown
                            pushIds.push(99, 216, 103, 218);
                            // Push Notifications: Financial Services DIY Design, Mobile Engagement
                            pushIds.push(187);
                            // Push Notifications: Healthcare DIY Design, Mobile Engagement
                            pushIds.push(169);
                            // Push Notifications: Higher Ed DIY Design, Mobile Engagement
                            pushIds.push(131);
                            
                            // Social Apps: Default DIY Design
                            socIds.push(586, 587, 491, 484, 448);
                            // Social Apps: Japanese DIY Design
                            socIds.push(853);
                            // Social Apps: Financial Services DIY Design
                            socIds.push(1091, 1090, 1093, 1092, 1094);
                            // Social Apps: Healthcare DIY Design
                            socIds.push(1021, 1023, 1025, 1022, 1020);
                            // Social Apps: Higher Ed DIY Design
                            socIds.push(860, 1024, 861, 859, 858);
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
                            // DIY Design (Social)
                            APP.discardFormPushDrafts("SocialApp", socIds);
                            // Limiting Nurture Programs
                            APP.limitNurturePrograms();
                        }
                    }, 0);
                } 
                else if (currCompFragment == mktoLandingPageDesignerFragment) {
                    console.log("Marketo App > Location: Landing Page Designer");

                    var customCompanyLandingPage106Fragment = "LPE11826",
                        customCompanyLandingPagePreview106Fragment = "LPP11826",
                        customCompanyLandingPage106aFragment = "LPE10672",
                        customCompanyLandingPagePreview106aFragment = "LPP10672",
                        customCompanyLandingPage106bFragment = "LPE10768",
                        customCompanyLandingPagePreview106bFragment = "LPP10768";
/*                      
                        lpParameters = {
                            filters: [{
                                property: 'id',
                                value: Mkt3.DL.dl.compId
                            }],
                            callback: function(records) {
                                records.forEach(
                                    function(record) {
                                        if (record.get('zoneId')) {
                                            var currAssetWorkspaceId = record.get('zoneId');
                                            console.log("Marketo App > currAssetWorkspaceId = " + currAssetWorkspaceId);
                                            if (currAssetWorkspaceId == mktoDefaultWorkspaceId
                                            || currAssetWorkspaceId == mktoJapaneseWorkspaceId
                                            || currAssetWorkspaceId == mktoFinservWorkspaceId
                                            || currAssetWorkspaceId == mktoHealthcareWorkspaceId
                                            || currAssetWorkspaceId == mktoHigherEdWorkspaceId
                                            || APP.getCookie("toggleState") == "false") {
                                                APP.disablePropertyPanelSaving();
                                            }
                                        }
                                    }
                                );
                            }
                        };
                        
                    if (Ext4
                    && Ext4.getStore('LandingPage')
                    && Ext4.getStore('LandingPage').load) {
                        console.log("Callback for Landing Page Editor");
                        Ext4.getStore('LandingPage').load(lpParameters);
                    }
*/                  
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
                    
                    var isLandingPageDesigner = window.setInterval(function() {
                        if (Mkt3
                        && Mkt3.app
                        && Mkt3.app.controllers
                        && Mkt3.app.controllers.get("Mkt3.controller.editor.LandingPage")
                        && Mkt3.app.controllers.get("Mkt3.controller.editor.LandingPage").getLandingPage()
                        && (Mkt3.app.controllers.get("Mkt3.controller.editor.LandingPage").getLandingPage().get("zoneId") == mktoDefaultWorkspaceId
                            || Mkt3.app.controllers.get("Mkt3.controller.editor.LandingPage").getLandingPage().get("zoneId") == mktoJapaneseWorkspaceId
                            || Mkt3.app.controllers.get("Mkt3.controller.editor.LandingPage").getLandingPage().get("zoneId") == mktoFinservWorkspaceId
                            || Mkt3.app.controllers.get("Mkt3.controller.editor.LandingPage").getLandingPage().get("zoneId") == mktoHealthcareWorkspaceId
                            || Mkt3.app.controllers.get("Mkt3.controller.editor.LandingPage").getLandingPage().get("zoneId") == mktoHigherEdWorkspaceId)) {
                                
                            console.log("Marketo App > Loaded: Landing Page Designer");
                                    
                            window.clearInterval(isLandingPageDesigner);
                            APP.disablePropertyPanelSaving();
                        }
                    }, 0);
                    
                    return;
                } 
                else {
                    console.log("Marketo App > Location: Designers/Wizards");

                    // DIY Design (Emails, Forms, Push Notifications, Social Apps)
                    var customCompanyEmail106Fragment = "EME15464",
                        customCompanyEmail106aFragment = "EME14240",
                        customCompanyEmail106bFragment = "EME13924",
                        customCompanyHealthcareFragment = "EME20327",
                        customCompanyFinservMFragment = "EME20350",
                        customCompanyFinservPFragment ="EME20368",
                        customCompanyHigherEdFragment = "EME20329",
                        loadParameters = {
                            filters: [{
                                property: 'id',
                                value: Mkt3.DL.dl.compId
                            }],
                            callback: function(records) {
                                records.forEach(
                                    function(record) {
                                        if (record.get('zoneId')) {
                                            var currAssetWorkspaceId = record.get('zoneId');
                                            console.log("Marketo App > currAssetWorkspaceId = " + currAssetWorkspaceId);
                                            if (currAssetWorkspaceId == mktoDefaultWorkspaceId
                                            || currAssetWorkspaceId == mktoJapaneseWorkspaceId
                                            || currAssetWorkspaceId == mktoFinservWorkspaceId
                                            || currAssetWorkspaceId == mktoHealthcareWorkspaceId
                                            || currAssetWorkspaceId == mktoHigherEdWorkspaceId
                                            || APP.getCookie("toggleState") == "false") {
                                                APP.disableSaving();
                                            }
                                        }
                                    }
                                );
                            }
                        };

                    switch (currCompFragment) {
                        case mktoEmailDesignerFragment:
                            if (Mkt3.DL.getToken().search("&isPreview") == -1) {
                                if (Ext4
                                && Ext4.getStore('Email')
                                && Ext4.getStore('Email').load) {
                                    console.log("Callback for Email Editor");
                                    Ext4.getStore('Email').load(loadParameters);
                                }
                                APP.overlayEmail("edit");
                                // Overlay Email Designer w/ Company Logo and Color                          
    /*                            switch (currUrlFragment) {
                                    case customCompanyEmail106Fragment:
                                        APP.overlayEmail("edit");
                                        break;
                                    case customCompanyHealthcareFragment:
                                        APP.overlayEmail("edit");
                                        break;
                                    case customCompanyFinservMFragment:
                                        APP.overlayEmail("edit");
                                        break;
                                    case customCompanyFinservPFragment:
                                        APP.overlayEmail("edit");
                                        break;
                                    case customCompanyHigherEdFragment:
                                        APP.overlayEmail("edit");
                                        break;
                                    case customCompanyEmail106aFragment:
                                        APP.overlayEmail("edit");
                                        break;
                                    case customCompanyEmail106bFragment:
                                        APP.overlayEmail("edit");
                                        break;
                                    default:
                                        break;
                                }*/
                            }
                            else {
                                APP.overlayEmail("preview");
                            }
                            break;
                        case mktoFormWizardFragment:
                            if (Ext4
                            && Ext4.getStore('Form')
                            && Ext4.getStore('Form').load) {
                                console.log("Callback for Form Editor");
                                Ext4.getStore('Form').load(loadParameters);
                            }
                            break;
                        case mktoMobilePushNotificationWizardFragment:
                            if (Ext4
                            && Ext4.getStore('MobilePushNotification')
                            && Ext4.getStore('MobilePushNotification').load) {
                                console.log("Callback for Push Notification Editor");
                                Ext4.getStore('MobilePushNotification').load(loadParameters);
                            }
                            break;
                        case mktoSocialAppWizardFragment:
                            if (Ext4
                            && Ext4.getStore('SocialApp')
                            && Ext4.getStore('SocialApp').load) {
                                console.log("Callback for Social App Editor");
                                Ext4.getStore('SocialApp').load(loadParameters);
                            }
                            break;
                        case mktoABtestWizardFragment:
                            var isABtestWizard = window.setInterval(function() {
                                if (Mkt3
                                && Mkt3.app
                                && Mkt3.app.controllers
                                && Mkt3.app.controllers.get("Mkt3.controller.editor.wizard.Editor")
                                && Mkt3.app.controllers.get("Mkt3.controller.editor.wizard.Editor").getEditor()
                                && Mkt3.app.controllers.get("Mkt3.controller.editor.wizard.Editor").getEditor().record
                                && (Mkt3.app.controllers.get("Mkt3.controller.editor.wizard.Editor").getEditor().record.get("zoneId") == mktoDefaultWorkspaceId
                                    || Mkt3.app.controllers.get("Mkt3.controller.editor.wizard.Editor").getEditor().record.get("zoneId") == mktoJapaneseWorkspaceId
                                    || Mkt3.app.controllers.get("Mkt3.controller.editor.wizard.Editor").getEditor().record.get("zoneId") == mktoFinservWorkspaceId
                                    || Mkt3.app.controllers.get("Mkt3.controller.editor.wizard.Editor").getEditor().record.get("zoneId") == mktoHealthcareWorkspaceId
                                    || Mkt3.app.controllers.get("Mkt3.controller.editor.wizard.Editor").getEditor().record.get("zoneId") == mktoHigherEdWorkspaceId)) {
                                        
                                    console.log("Marketo App > Location: A/B Test Wizard");
                                    
                                    window.clearInterval(isABtestWizard);
                                    APP.disableSaving();
                                }
                            }, 0);
//                            console.log("Callback for A/B Test Editor");
//                            Ext4.getStore('EmailBlastTestGroup').load(loadParameters);
                            break;
                        case mktoEmailTestWizardFragment:
                            var isEmailTestWizard = window.setInterval(function() {
                                if (Mkt3
                                && Mkt3.app
                                && Mkt3.app.controllers
                                && Mkt3.app.controllers.get("Mkt3.controller.editor.wizard.Editor")
                                && Mkt3.app.controllers.get("Mkt3.controller.editor.wizard.Editor").getEditor()
                                && Mkt3.app.controllers.get("Mkt3.controller.editor.wizard.Editor").getEditor().record
                                && (Mkt3.app.controllers.get("Mkt3.controller.editor.wizard.Editor").getEditor().record.get("zoneId") == mktoDefaultWorkspaceId
                                    || Mkt3.app.controllers.get("Mkt3.controller.editor.wizard.Editor").getEditor().record.get("zoneId") == mktoJapaneseWorkspaceId
                                    || Mkt3.app.controllers.get("Mkt3.controller.editor.wizard.Editor").getEditor().record.get("zoneId") == mktoFinservWorkspaceId
                                    || Mkt3.app.controllers.get("Mkt3.controller.editor.wizard.Editor").getEditor().record.get("zoneId") == mktoHealthcareWorkspaceId
                                    || Mkt3.app.controllers.get("Mkt3.controller.editor.wizard.Editor").getEditor().record.get("zoneId") == mktoHigherEdWorkspaceId)) {
                                        
                                    console.log("Marketo App > Location: Email Test Group Wizard");
                                    
                                    window.clearInterval(isEmailTestWizard);
                                    APP.disableSaving();
                                }
                            }, 0);
//                            console.log("Callback for A/B Test Editor");
//                            Ext4.getStore('EmailBlastTestGroup').load(loadParameters);
                            break;
                        
                        default:
                            break;
                    }
                }

                window.onhashchange = function() {
                    console.log("Window: Hash Changed");

                    currentUrl = window.location.href;
                    // Getting the URL fragment, the part after the #
                    currUrlFragment = Mkt3.DL.getDlToken();
                    
                    if (Mkt3.DL.dl
                    && Mkt3.DL.dl.dlCompCode) {
                        currCompFragment = Mkt3.DL.dl.dlCompCode;
                    }
                    
                    // Email Deliverability
                    if (currUrlFragment == mktoMyMarketoFragment) {
                        APP.overrideHomeTiles();
                    }
					else if (currUrlFragment == mktoMarketingActivitiesDefaultFragment
                    || currUrlFragment == mktoMarketingActivitiesMarketingFragment
                    || currUrlFragment == mktoMarketingActivitiesJapaneseFragment
                    || currUrlFragment == mktoMarketingActivitiesFinservFragment
                    || currUrlFragment == mktoMarketingActivitiesHealthcareFragment
                    || currUrlFragment == mktoMarketingActivitiesHigherEdFragment
                    || currUrlFragment == mktoLeadDatabaseDefaultFragment
                    || currUrlFragment == mktoLeadDatabaseMarketingFragment
                    || currUrlFragment == mktoLeadDatabaseJapaneseFragment
                    || currUrlFragment == mktoLeadDatabaseFinservFragment
                    || currUrlFragment == mktoLeadDatabaseHealthcareFragment
                    || currUrlFragment == mktoLeadDatabaseHigherEdFragment) {
						APP.disableButtons();
					}
                    else if (currUrlFragment == mktoAnalyticsDefaultFragment) {
                        APP.overrideAnalyticsTiles();
                    }

                    if (currCompFragment != mktoEmailDesignerFragment
                    && currCompFragment != mktoEmailPreviewFragment
                    && currCompFragment != mktoLandingPageDesignerFragment
                    && currCompFragment != mktoLandingPagePreviewFragment
                    && currCompFragment != mktoFormWizardFragment
                    && currCompFragment != mktoMobilePushNotificationWizardFragment
                    && currCompFragment != mktoSocialAppWizardFragment
                    && currCompFragment != mktoABtestWizardFragment
                    && currCompFragment != mktoEmailTestWizardFragment
					&& currUrlFragment != mktoMyMarketoFragment) {
/*
                        var isMktCanvasHash = window.setInterval(function() {
							if (MktCanvas
                            && MktCanvas.getActiveTab()
                            && MktCanvas.getActiveTab().config) {
								console.log("Marketo App > Location: Marketo Canvas Active Tab");
								
								window.clearInterval(isMktCanvasHash);
								var currWorkspaceId = MktCanvas.getActiveTab().config.accessZoneId;
								if (currWorkspaceId != prevWorkspaceId) {
                                    prevWorkspaceId = currWorkspaceId
								}
							}
						}, 0);
*/
                        // Marketing ROI, Funnel Analysis
                        if (currUrlFragment == mktoOppInfluenceAnalyzerFragment
						|| currUrlFragment == mktoProgramAnalyzerFragment
						|| currUrlFragment == mktoModeler106Fragment
						|| currUrlFragment == mktoModeler106abFragment
						|| currUrlFragment == mktoSuccessPathAnalyzerFragment) {
                            console.log("Marketo App > Location: Analytics");

                            APP.injectAnalyzerNavBar();
                        }
                    }
                }
            }
            else {
                APP.overrideSuperballMenuItems();
                
                if (currUrlFragment == mktoMyMarketoFragment) {
                    APP.overrideHomeTiles();
                }
                window.onhashchange = function () {
                    // Getting the URL fragment, the part after the #
                    currUrlFragment = Mkt3.DL.getDlToken();
                
                    if (currUrlFragment == mktoMyMarketoFragment) {
                        APP.overrideHomeTiles();
                    }
                }
            }
            APP.overrideSuperballMenuItems();
        }
    }, 0);
}