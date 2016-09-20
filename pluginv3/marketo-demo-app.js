var mktoMyMarketoFragment = "MM0A1",
    mktoEmailInsightsLink = "http://www.marketolive.com/en/analytics/email-insights-summit-demo-1",
    mktoEmailDeliverabilityToolsLink = "https://250ok.com/login",
    currUrlFragment;

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
    console.log("Marketo Demo App > Overriding: Superball Menu Items");
    
    if (MktPage
    && MktPage.showSuperMenu) {
        MktPage.showSuperMenu = function() {
            console.log("Marketo Demo App > Executing: Override Superball Menu Items");

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
                    console.log("Marketo Demo App > Working: Override Superball Menu Items");
                    
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
    console.log("Marketo Demo App > Overriding: My Marketo Home Tiles");
    
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
        console.log("Marketo Demo App > Executing: Override My Marketo Home Tiles");
        
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
 *  Main
 *  
 **************************************************************************************/

APP.overrideSuperballMenuItems();

if (Mkt3
&& Mkt3.DL
&& Mkt3.DL.getDlToken()) {
    currUrlFragment = Mkt3.DL.getDlToken();
    
    if (currUrlFragment == mktoMyMarketoFragment) {
        APP.overrideHomeTiles();
    }
}

window.onhashchange = function() {
    if (Mkt3
    && Mkt3.DL
    && Mkt3.DL.getDlToken()) {
        currUrlFragment = Mkt3.DL.getDlToken();
        
        if (currUrlFragment == mktoMyMarketoFragment) {
            APP.overrideHomeTiles();
        }
    }
}