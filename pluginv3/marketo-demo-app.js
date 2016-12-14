var mktoMyMarketoFragment = "MM0A1",
mktoEmailInsightsLink = "http://www.marketolive.com/en/analytics/email-insights-summit-demo-1",
mktoEmailDeliverabilityToolsLink = "https://250ok.com/login",

mktoEmailEditFragment = "EME",
mktoEmailPreviewFragmentRegex = new RegExp("^EME[0-9]+&isPreview", "i"),
mktoEmailPreviewFragment2 = "EME[0-9]+&isPreview",
mktoEmailPreviewFragment = "EMP",
mktoLandingPageEditFragment = "LPE",
mktoLandingPagePreviewFragment = "LPP",
mktoLandingPagePreviewDraftFragment = "LPPD",
mktoPushNotificationEditFragment = "MPNE",
mktoMobilePushNotificationPreviewFragment = "MPNP",
mktoInAppMessageEditFragment = "IAME",
mktoInAppMessagePreviewFragment = "IAMP",
mktoDesignersFragmentMatch = "^" + mktoEmailEditFragment + "$|^" + mktoEmailPreviewFragment2 + "|^" + mktoEmailPreviewFragment + "$|^" + mktoLandingPageEditFragment + "$|^" + mktoLandingPagePreviewFragment + "$|^" + mktoLandingPagePreviewDraftFragment /*+ mktoPushNotificationEditFragment + "$|^" + mktoMobilePushNotificationPreviewFragment + "$|^" + mktoInAppMessageEditFragment + "$|^" + mktoInAppMessagePreviewFragment*/ + "$",

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

APP.getCookie = function (cookieName) {
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
};

APP.webRequest = function (url, params, method, responseType, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.response);
    }
    xmlHttp.open(method, url, true); // true for asynchronous
    xmlHttp.responseType = responseType;
    xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlHttp.send(params);
};

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

APP.overrideSuperballMenuItems = function () {
    console.log("Marketo Demo App > Overriding: Superball Menu Items");
    
    if (typeof(MktPage) !== "undefined"
         && MktPage.showSuperMenu) {
        MktPage.showSuperMenu = function () {
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
                        } else if (currSuperBallMenuItem.text == "Deliverability Tools") {
                            deliverabilityToolsMenuItem = currSuperBallMenuItem;
                        }
                    }
                    
                    if (emailInsightsMenuItem) {
                        emailInsightsMenuItem.href = mktoEmailInsightsLink;
                        emailInsightsMenuItem.update();
                    } else {
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
                    } else {
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
};

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

APP.overrideHomeTiles = function () {
    console.log("Marketo Demo App > Overriding: My Marketo Home Tiles");
    
    if (typeof(MktCanvas) !== "undefined"
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
            } else if (tilesTextContent[ii] == "Deliverability Tools") {
                deliverabilityToolsTile = MktCanvas.lookupComponent(container.childNodes[ii]);
            }
        }
        
        if (emailInsightsTile) {
            emailInsightsTile.el.dom.outerHTML = emailInsightsTile.el.dom.outerHTML.replace(hrefMatch, " href=\"" + mktoEmailInsightsLink + "\" ");
        } else {
            emailInsightsTileOuterHTML = '<div class="x4-btn mkt3-homeTile x4-btn-default-small x4-icon-text-left x4-btn-icon-text-left x4-btn-default-small-icon-text-left x-panel" style="height: 150px;" id="homeTile-1084"><em id="homeTile-1084-btnWrap"><a id="homeTile-1084-btnEl" href="' + mktoEmailInsightsLink + '" class="x4-btn-center" target="_blank" role="link" style="width: 150px; height: 150px;"><span id="homeTile-1084-btnInnerEl" class="x4-btn-inner" style="width: 150px; height: 150px; line-height: 150px;">Email Insights</span><span id="homeTile-1084-btnIconEl" class="x4-btn-icon mki3-email-insights-svg"></span></a></em><div class="x-panel-bwrap" id="ext-gen164"><div class="x-panel-body x-panel-body-noheader" id="ext-gen165"></div></div></div>';
            idMatch = new RegExp("homeTile-1084", "g");
            
            spareTileClone = MktCanvas.lookupComponent(container.childNodes[container.childNodes.length - 1]).cloneConfig();
            emailInsightsTileOuterHTML = emailInsightsTileOuterHTML.replace(idMatch, spareTileClone.id);
            spareTileClone.el.dom.outerHTML = emailInsightsTileOuterHTML;
            container.appendChild(container.childNodes[container.childNodes.length - 2]);
            container.appendChild(spareTileClone.el.dom);
        }
        
        if (deliverabilityToolsTile) {
            deliverabilityToolsTile.el.dom.outerHTML = deliverabilityToolsTile.el.dom.outerHTML.replace(hrefMatch, " href=\"" + mktoEmailDeliverabilityToolsLink + "\" ");
        } else {
            deliverabilityToolsTileOuterHTML = '<div class="x4-btn mkt3-homeTile x4-btn-default-small x4-icon-text-left x4-btn-icon-text-left x4-btn-default-small-icon-text-left" style="height: 150px;" id="homeTile-1036"><em id="homeTile-1036-btnWrap"><a id="homeTile-1036-btnEl" href="' + mktoEmailDeliverabilityToolsLink + '" class="x4-btn-center" target="_blank" role="link" style="width: 150px; height: 150px;"><span id="homeTile-1036-btnInnerEl" class="x4-btn-inner" style="width: 150px; height: 150px; line-height: 150px;">Deliverability Tools</span><span id="homeTile-1036-btnIconEl" class="x4-btn-icon mki3-mail-sealed-svg"></span></a></em></div>';
            idMatch = new RegExp("homeTile-1036", "g");
            
            spareTileClone = MktCanvas.lookupComponent(container.childNodes[container.childNodes.length - 1]).cloneConfig();
            deliverabilityToolsTileOuterHTML = deliverabilityToolsTileOuterHTML.replace(idMatch, spareTileClone.id);
            spareTileClone.el.dom.outerHTML = deliverabilityToolsTileOuterHTML;
            container.appendChild(container.childNodes[container.childNodes.length - 2]);
            container.appendChild(spareTileClone.el.dom);
        }
    }
};

/**************************************************************************************
 *
 *  This function edits the variables within the Landing Page & Email Editors for
 *  custom company.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {String} assetType - Asset type (landingPage, email)
 *  @param {String} mode - Mode view (edit, preview)
 *  @param {Object} asset - The asset to be edited
 *
 **************************************************************************************/

APP.editAssetVariables = function (assetType, mode, asset) {
    var saveEditsToggle = APP.getCookie("saveEditsToggleState"),
    logo = APP.getCookie("logo"),
    heroBackground = APP.getCookie("heroBackground"),
    color = APP.getCookie("color"),
    getHumanDate;
    
    if (saveEditsToggle == "true"
         && (logo != null
            || heroBackground != null
            || color != null)) {
            
            getHumanDate = function () {
                console.log("Marketo Demo App > Getting: Today's Date");
                
                var dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUNE", "JULY", "AUG", "SEPT", "OCT", "NOV", "DEC"],
                date = new Date(),
                dayOfWeek = dayNames[date.getDay()],
                month = monthNames[date.getMonth()],
                dayOfMonth,
                year = date.getFullYear();
                
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
                
                return dayOfWeek + ", " + month + " the " + dayOfMonth + " " + year;
            };
        
        if (assetType == "landingPage") {
            var httpRegEx = new RegExp("^http", "i"),
            textRegex = new RegExp("^[^#]", "i"),
            colorRegex = new RegExp("^#[0-9a-f]{3,6}$|^rgb", "i"),
            logoRegex = new RegExp("logo|headerLogo|header-logo", "i"),
            heroBgRegex = new RegExp("heroBackground|hero-background|heroBkg|hero-bkg|heroBg|hero-bg|hero1Bg|hero-1-bg|hero1Bkg|hero-1-bkg|hero1Background", "i"),
            titleRegex = new RegExp("^(mainTitle|main-title|heroTitle|hero-title|title)$", "i"),
            subtitleRegex = new RegExp("^(subtitle|sub-title|heroSubtitle|hero-subtitle)$", "i"),
            buttonBgColorRegex = new RegExp("^(heroButtonBgColor|hero-button-bg-color|heroButtonBackgroundColor|hero-button-background-color|heroBkgColor|hero-bkg-color)$", "i"),
            buttonBorderColorRegex = new RegExp("^(heroButtonBorderColor|hero-button-border-color|heroBorderColor|hero-border-color)$", "i"),
            headerBgColor = "headerBgColor",
            formButtonBgColor = "formButtonBgColor",
            title = "You To Our Event",
            company,
            companyName,
            editAssetVars;
            
            if (logo != null) {
                company = logo.split("https://logo.clearbit.com/")[1].split(".")[0];
                companyName = company.charAt(0).toUpperCase() + company.slice(1);
                title = companyName + " Invites " + title;
            } else {
                title = "We Invite " + title;
            }
            
            editAssetVars = function (asset) {
                var assetVars = asset.getResponsiveVarValues();
                asset.setResponsiveVarValue(headerBgColor, color);
                asset.setResponsiveVarValue(formButtonBgColor, color);
                
                for (var ii = 0; ii < Object.keys(assetVars).length; ii++) {
                    var currVariableKey = Object.keys(assetVars)[ii],
                    currVariableValue = Object.values(assetVars)[ii].toString();
                    
                    if (currVariableKey.search(logoRegex) != -1) {
                        if (currVariableValue.search(httpRegEx) != -1) {
                            asset.setResponsiveVarValue(currVariableKey, logo);
                        }
                    } else if (currVariableKey.search(heroBgRegex) != -1) {
                        if (currVariableValue.search(httpRegEx) != -1) {
                            asset.setResponsiveVarValue(currVariableKey, heroBackground);
                        }
                    } else if (currVariableKey.search(titleRegex) != -1) {
                        if (currVariableValue.search(textRegex) != -1) {
                            asset.setResponsiveVarValue(currVariableKey, title);
                        }
                    } else if (currVariableKey.search(subtitleRegex) != -1) {
                        if (currVariableValue.search(textRegex) != -1) {
                            asset.setResponsiveVarValue(currVariableKey, getHumanDate());
                        }
                    } else if (currVariableKey.search(buttonBgColorRegex) != -1) {
                        if (currVariableValue.search(colorRegex) != -1) {
                            asset.setResponsiveVarValue(currVariableKey, color);
                        }
                    } else if (currVariableKey.search(buttonBorderColorRegex) != -1) {
                        if (currVariableValue.search(colorRegex) != -1) {
                            asset.setResponsiveVarValue(currVariableKey, color);
                        }
                    }
                }
            };
            
            console.log("Marketo Demo App > Editing: Landing Page Variables");
            
            if (mode == "edit") {
                if (asset) {
                    editAssetVars(asset);
                } else {
                    var isLandingPageEditorVariables = window.setInterval(function () {
                            if (typeof(Mkt3) !== "undefined"
                                 && Mkt3
                                 && Mkt3.app
                                 && Mkt3.app.controllers
                                 && Mkt3.app.controllers.get("Mkt3.controller.editor.LandingPage")
                                 && Mkt3.app.controllers.get("Mkt3.controller.editor.LandingPage").getLandingPage()
                                 && Mkt3.app.controllers.get("Mkt3.controller.editor.LandingPage").getLandingPage().getResponsiveVarValues()
                                 && Mkt3.app.controllers.get("Mkt3.controller.editor.LandingPage").getLandingPage().setResponsiveVarValue) {
                                console.log("Marketo Demo App > Editing: Landing Page Editor Variables");
                                
                                window.clearInterval(isLandingPageEditorVariables);
                                
                                editAssetVars(Mkt3.app.controllers.get("Mkt3.controller.editor.LandingPage").getLandingPage());
                            }
                        }, 0);
                }
            } else if (mode == "preview") {
                console.log("Marketo Demo App > Editing: Landing Page Previewer Variables");
            }
        } else if (assetType == "email") {
            var httpRegEx = new RegExp("^http", "i"),
            textRegex = new RegExp("^[^#]", "i"),
            colorRegex = new RegExp("^#[0-9a-f]{3,6}$|^rgb", "i"),
            logoIds = ["heroLogo", "footerLogo", "headerLogo", "logo"],
            heroBgRegex = new RegExp("heroBackground|hero-background|heroBkg|hero-bkg|heroBg|hero-bg", "i"),
            titleIds = ["title", "heroTitle", "mainTitle"],
            subtitleIds = ["subtitle", "herosubTitle"],
            buttonBgColorRegex = new RegExp("^(heroButtonBgColor|hero-button-bg-color|heroButtonBackgroundColor|hero-button-background-color|heroBkgColor|hero-bkg-color)$", "i"),
            buttonBorderColorRegex = new RegExp("^(heroButtonBorderColor|hero-button-border-color|heroBorderColor|hero-border-color)$", "i"),
            logo = getCookie("logo"),
            heroBackground = getCookie("heroBackground"),
            color = getCookie("color"),
            title = "You<br>PREMIER BUSINESS EVENT<br>OF THE YEAR",
            subtitle = getHumanDate(),
            company,
            companyName,
            editHtml,
            editAssetVars;
            
            if (logo != null) {
                company = logo.split("https://logo.clearbit.com/")[1].split(".")[0];
                companyName = company.charAt(0).toUpperCase() + company.slice(1);
                title = companyName + " Invites " + title;
            } else {
                title = "We Invite " + title;
            }
            
            editHtml = function () {
                APP.webRequest('/emaileditor/downloadHtmlFile2?xsrfId=' + MktSecurity.getXsrfId() + '&emailId=' + Mkt3.DL.dl.compId, null, 'GET', 'document', function (response) {
                    var isLogoReplaced,
                    isTitleReplaced,
                    isSubtitleReplaced;
                    
                    if (logo) {
                        for (var ii = 0; ii < logoIds.length; ii++) {
                            var currElement = response.getElementById(logoIds[ii]);
                            if (currElement
                                 && currElement.getElementsByTagName("img")[0]
                                 && currElement.getElementsByTagName("img")[0].getAttribute("src") != logo) {
                                isLogoReplaced = true;
                                currElement.getElementsByTagName("img")[0].setAttribute("src", logo);
                            }
                        }
                    }
                    
                    if (title) {
                        for (var ii = 0; ii < titleIds.length; ii++) {
                            var currElement = response.getElementById(titleIds[ii]);
                            if (currElement
                                 && currElement.innerHTML != title) {
                                isTitleReplaced = true;
                                currElement.innerHTML = title;
                            }
                        }
                    }
                    
                    if (subtitle) {
                        for (var ii = 0; ii < subtitleIds.length; ii++) {
                            var currElement = response.getElementById(subtitleIds[ii]);
                            if (currElement
                                 && currElement.innerHTML != subtitle) {
                                isSubtitleReplaced = true;
                                currElement.innerHTML = subtitle;
                            }
                        }
                    }
                    
                    if (isLogoReplaced
                         || isTitleReplaced
                         || isSubtitleReplaced) {
                        APP.webRequest('/emaileditor/updateContent2', 'ajaxHandler=MktSession&mktReqUid=' + new Date().getTime() + Ext.id(null, ':') + '&emailId=' + Mkt3.DL.dl.compId + '&content=' + new XMLSerializer().serializeToString(response) + '&xsrfId=' + MktSecurity.getXsrfId(), 'POST', "", function (response) {
                            var waitMsg = new Ext.Window({
                                closable : false,
                                modal : true,
                                width : 365,
                                height : 300,
                                cls : 'mktModalForm',
                                title : "Please Wait for Page to Load",
                                html : "Wait until this page completely loads to refresh the page in order to save all Custom Company edits.",
                                buttons : [{
                                        text : "Refresh & Save",
                                        iconCls : 'mkiRefresh',
                                        cls : 'mktButtonPositive',
                                        handler : function () {
                                            window.location.reload();
                                        }
                                    }
                                ]
                            });
                            waitMsg.show();
                        });
                    }
                });
            };
            
            editAssetVars = function (asset) {
                var assetVars = asset.getVariableValues();
                
                for (var ii = 0; ii < Object.keys(assetVars).length; ii++) {
                    var currVariableKey = Object.keys(assetVars)[ii],
                    currVariableValue = Object.values(assetVars)[ii].toString();
                    
                    if (currVariableKey.search(heroBgRegex) != -1) {
                        if (currVariableValue != heroBackground
                             && currVariableValue.search(httpRegEx) != -1) {
                            asset.setVariableValue(currVariableKey, heroBackground);
                        }
                    } else if (currVariableKey.search(buttonBgColorRegex) != -1) {
                        if (currVariableValue != color
                             && currVariableValue.search(colorRegex) != -1) {
                            asset.setVariableValue(currVariableKey, color);
                        }
                    } else if (currVariableKey.search(buttonBorderColorRegex) != -1) {
                        if (currVariableValue != color
                             && currVariableValue.search(colorRegex) != -1) {
                            asset.setVariableValue(currVariableKey, color);
                        }
                    }
                }
            };
            
            console.log("Marketo Demo App > Editing: Email Variables");
            
            if (mode == "edit") {
                var isWebRequestSession = window.setInterval(function () {
                        console.log("Marketo Demo App > Waiting: Web Request Session Data");
                        if (typeof(Mkt3) !== "undefined"
                             && Mkt3
                             && Mkt3.DL
                             && Mkt3.DL.dl
                             && Mkt3.DL.dl.compId
                             && typeof(MktSecurity) !== "undefined"
                             && MktSecurity
                             && MktSecurity.getXsrfId()
                             && typeof(Ext) !== "undefined"
                             && Ext
                             && Ext.id(null, ':')) {
                            console.log("Marketo Demo App > Editing: Email HTML");
                            
                            window.clearInterval(isWebRequestSession);
                            
                            editHtml();
                        }
                    }, 0);
                
                if (asset) {
                    editAssetVars(asset);
                } else {
                    var isEmailEditorVariables = window.setInterval(function () {
                            console.log("Marketo Demo App > Waiting: Email Editor Variables");
                            if (typeof(Mkt3) !== "undefined"
                                 && Mkt3
                                 && Mkt3.app
                                 && Mkt3.app.controllers
                                 && Mkt3.app.controllers.get("Mkt3.controller.editor.email2.EmailEditor")
                                 && Mkt3.app.controllers.get("Mkt3.controller.editor.email2.EmailEditor").getEmail()
                                 && Mkt3.app.controllers.get("Mkt3.controller.editor.email2.EmailEditor").getEmail().getVariableValues()
                                 && Mkt3.app.controllers.get("Mkt3.controller.editor.email2.EmailEditor").getEmail().setVariableValue) {
                                console.log("Marketo Demo App > Editing: Email Editor Variables");
                                
                                window.clearInterval(isEmailEditorVariables);
                                
                                editAssetVars(Mkt3.app.controllers.get("Mkt3.controller.editor.email2.EmailEditor").getEmail());
                            }
                        }, 0);
                }
            } else if (mode == "preview") {
                console.log("Marketo Demo App > Editing: Email Previewer Variables");
            }
        }
    }
};

/**************************************************************************************
 *
 *  Main
 *
 **************************************************************************************/

var isMktPageDemoApp = window.setInterval(function () {
        if (typeof(MktPage) !== "undefined") {
            console.log("Marketo Demo App > Location: Marketo Page");
            
            window.clearInterval(isMktPageDemoApp);
            
            var currUrlFragment,
            currCompFragment;
            
            APP.overrideSuperballMenuItems();
            
            if (typeof(Mkt3) !== "undefined"
                 && Mkt3.DL
                 && Mkt3.DL.getDlToken()
                 && Mkt3.DL.getDlToken() != "") {
                currUrlFragment = Mkt3.DL.getDlToken();
                
                if (Mkt3.DL.dl
                     && Mkt3.DL.dl.dlCompCode) {
                    currCompFragment = Mkt3.DL.dl.dlCompCode;
                }
                
                if (currUrlFragment == mktoMyMarketoFragment) {
                    APP.overrideHomeTiles();
                }
            }
            
            if (currCompFragment
                 && currCompFragment.search(mktoDesignersFragmentMatch) != -1) {
                console.log("Marketo Demo App > Location: Designers/Wizards");
                
                switch (currCompFragment) {
                case mktoLandingPageEditFragment:
                    console.log("Marketo Demo App > Location: Landing Page Editor");
                    
                    APP.editAssetVariables("landingPage", "edit");
                    break;
                    
                case mktoLandingPagePreviewFragment:
                    console.log("Marketo Demo App > Location: Landing Page Previewer");
                    
                    APP.editAssetVariables("landingPage", "preview");
                    break;
                    
                case mktoLandingPagePreviewDraftFragment:
                    console.log("Marketo Demo App > Location: Landing Page Draft Previewer");
                    
                    APP.editAssetVariables("landingPage", "preview");
                    break;
                    
                case mktoEmailEditFragment:
                    if (currUrlFragment.search(mktoEmailPreviewFragmentRegex) == -1) {
                        console.log("Marketo Demo App > Location: Email Editor");
                        
                        APP.editAssetVariables("email", "edit");
                    } else {
                        console.log("Marketo Demo App > Location: Email Previewer");
                        
                        APP.editAssetVariables("email", "preview");
                    }
                    break;
                /*    
                case mktoPushNotificationEditFragment:
                    console.log("Marketo Demo App > Location: Push Notification Editor");
                    
                    APP.editAssetVariables("pushNotification", "edit");
                    break;
                    
                case mktoMobilePushNotificationPreviewFragment:
                    console.log("Marketo Demo App > Location: Push Notification Previewer");
                    
                    APP.editAssetVariables("pushNotification", "preview");
                    break;
                    
                case mktoInAppMessageEditFragment:
                    console.log("Marketo Demo App > Location: In-App Message Editor");
                    
                    APP.editAssetVariables("inAppMessage", "edit");
                    break;
                    
                case mktoInAppMessagePreviewFragment:
                    console.log("Marketo Demo App > Location: In-App Message Previewer");
                    
                    APP.editAssetVariables("inAppMessage", "preview");
                    break;
                */
                }
            }
            
            window.onhashchange = function () {
                var isNewUrlDemoFragment = window.setInterval(function () {
                        if (typeof(Mkt3) !== "undefined"
                             && Mkt3
                             && Mkt3.DL
                             && Mkt3.DL.getDlToken()) {
                            if (currUrlFragment != Mkt3.DL.getDlToken()) {
                                window.clearInterval(isNewUrlDemoFragment);
                                
                                currUrlFragment = Mkt3.DL.getDlToken();
                                console.log("Marketo Demo App > Loaded: New URL Fragment = " + currUrlFragment);
                                
                                if (currUrlFragment == mktoMyMarketoFragment) {
                                    APP.overrideHomeTiles();
                                }
                                
                                if (Mkt3.DL.dl
                                     && Mkt3.DL.dl.dlCompCode) {
                                    currCompFragment = Mkt3.DL.dl.dlCompCode;
                                    
                                    if (currCompFragment.search(mktoDesignersFragmentMatch) != -1) {
                                        console.log("Marketo Demo App > Location: Designers/Wizards");
                                        
                                        switch (currCompFragment) {
                                        case mktoLandingPageEditFragment:
                                            console.log("Marketo Demo App > Location: Landing Page Editor");
                                            
                                            APP.editAssetVariables("landingPage", "edit");
                                            break;
                                            
                                        case mktoLandingPagePreviewFragment:
                                            console.log("Marketo Demo App > Location: Landing Page Previewer");
                                            
                                            APP.editAssetVariables("landingPage", "preview");
                                            break;
                                            
                                        case mktoLandingPagePreviewDraftFragment:
                                            console.log("Marketo Demo App > Location: Landing Page Draft Previewer");
                                            
                                            APP.editAssetVariables("landingPage", "preview");
                                            break;
                                            
                                        case mktoEmailEditFragment:
                                            if (currUrlFragment.search(mktoEmailPreviewFragmentRegex) == -1) {
                                                console.log("Marketo Demo App > Location: Email Editor");
                                                
                                                APP.editAssetVariables("email", "edit");
                                            } else {
                                                console.log("Marketo Demo App > Location: Email Previewer");
                                                
                                                APP.editAssetVariables("email", "preview");
                                            }
                                            break;
                                        /*    
                                        case mktoPushNotificationEditFragment:
                                            console.log("Marketo Demo App > Location: Push Notification Editor");
                                            
                                            APP.editAssetVariables("pushNotification", "edit");
                                            break;
                                            
                                        case mktoMobilePushNotificationPreviewFragment:
                                            console.log("Marketo Demo App > Location: Push Notification Previewer");
                                            
                                            APP.editAssetVariables("pushNotification", "preview");
                                            break;
                                            
                                        case mktoInAppMessageEditFragment:
                                            console.log("Marketo Demo App > Location: In-App Message Editor");
                                            
                                            APP.editAssetVariables("inAppMessage", "edit");
                                            break;
                                            
                                        case mktoInAppMessagePreviewFragment:
                                            console.log("Marketo Demo App > Location: In-App Message Previewer");
                                            
                                            APP.editAssetVariables("inAppMessage", "preview");
                                            break;
                                        */
                                        }
                                    }
                                }
                            }
                        }
                    }, 0);
            };
        }
    }, 0);