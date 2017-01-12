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
    console.log("Marketo Demo App > Getting: Cookie " + cookieName);
    
    var name = cookieName + '=',
    cookies = document.cookie.split(';'),
    currCookie;
    
    for (var ii = 0; ii < cookies.length; ii++) {
        currCookie = cookies[ii].trim();
        if (currCookie.indexOf(name) == 0) {
            return currCookie.substring(name.length, currCookie.length);
        }
    }
    console.log("Marketo Demo App > Getting: Cookie " + cookieName + " not found");
    return null;
};

APP.webRequest = function (url, params, method, responseType, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
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
                        listeners: {
                            boxready: function (view) {
                                var logoRegion = logoEl.getRegion();
                                
                                // shift out of the ball way
                                if (logoRegion.bottom > menuTop) {
                                    view.setBodyStyle('padding-top', logoRegion.bottom - menuTop + 10 + 'px');
                                    view.updateLayout();
                                }
                                
                                // prevent layering in front of the logo
                                menu.setZIndex(logoEl.getStyle('zIndex') - 5);
                            },
                            beforerender: function (view) {
                                view.addCls(view.componentCls + '-hidden');
                            },
                            show: function (view) {
                                view.removeCls(view.componentCls + '-hidden');
                                
                                logoEl.ignoreNextClick = true;
                                logoEl.removeClass(logoEl.attentionCls);
                                
                                if (!MktPage.savedState.isUsedSuperMenu) {
                                    MktPage.savedState.isUsedSuperMenu = true;
                                    
                                    MktSession.ajaxRequest('user/saveUserPref', {
                                        serializeParms: {
                                            key: 'isUsedSuperMenu',
                                            data: MktPage.savedState.isUsedSuperMenu
                                        }
                                    });
                                }
                            },
                            beforehide: function (view) {
                                view.addCls(view.componentCls + '-hidden');
                            },
                            hide: function () {
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
 *  This function returns the current date in a human-readable format.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.getHumanDate = function () {
    console.log("Content > Getting: Today's Date");
    
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

/**************************************************************************************
 *
 *  This function overlays an email with the user submitted company logo and color.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {String} action - The mode in which this asset is being viewed (edit/preview).
 *
 **************************************************************************************/

APP.overlayEmail = function (action) {
    console.log("Content > Overlaying: Email");
    
    var isEmailEditor2,
    clearOverlayVars,
    overlay,
    isMktoHeaderBgColorReplaced = isMktoImgReplaced = isMktoHeroBgReplaced = isMktoTextReplaced = isMktoSubTextReplaced = isMktoButtonReplaced = isMktoEmail1Replaced = editorPrevReady = desktopPrevReady = phonePrevReady = isDesktopPreviewReplaced = isPhonePreviewReplaced = false,
    logoMktoNameRegex = new RegExp("logo", "i"),
    mainTitleMktoNameRegex = new RegExp("^main title$|^mainTitle$|^main-title$|^hero title$|^heroTitle$|^hero-title$|^title$", "i"),
    subTitleMktoNameRegex = new RegExp("^subtitle$|^sub-title$|^hero subtitle$|^heroSubtitle$|^hero-subtitle$", "i"),
    buttonTextRegex = new RegExp("signup|sign up|call to action|cta|register|more|contribute", "i"),
    saveEditsToggle = APP.getCookie("saveEditsToggleState"),
    logo = APP.getCookie("logo"),
    heroBackground = APP.getCookie("heroBackground"),
    color = APP.getCookie("color"),
    defaultColor = "rgb(42, 83, 112)",
    logoMaxHeight = "55",
    mktoMainText = "You<br>PREMIER BUSINESS EVENT<br>OF THE YEAR",
    mktoSubText = APP.getHumanDate(),
    company,
    companyName,
    editorRepeatReadyCount = desktopRepeatReadyCount = phoneRepeatReadyCount = 0,
    maxRepeatReady = 2000,
    maxPreviewRepeatReady = 3000;
    
    if (saveEditsToggle == "true"
         || (logo == null
             && heroBackground == null
             && color == null)) {
        return false;
    }
    if (logo != null) {
        company = logo.split("https://logo.clearbit.com/")[1].split(".")[0];
        companyName = company.charAt(0).toUpperCase() + company.slice(1);
        mktoMainText = companyName + " Invites " + mktoMainText;
    } else {
        mktoMainText = "We Invite " + mktoMainText;
    }
    
    clearOverlayVars = function () {
        isMktoHeaderBgColorReplaced = isMktoImgReplaced = isMktoHeroBgReplaced = isMktoTextReplaced = isMktoSubTextReplaced = isMktoButtonReplaced = isMktoEmail1Replaced = false;
        emailBody = mktoImgs = mktoTexts = mktoButtons = logoSwapCompany = logoSwapContainer = logoSwapCompanyContainer = logoBkg = buttonBkg = null;
    };
    
    overlay = function (emailDocument) {
        if (emailDocument) {
            var emailBody = emailDocument.getElementsByTagName("body")[0],
            logoSwapCompany = emailDocument.getElementById("logo-swap-company"),
            logoSwapContainer = emailDocument.getElementById("logo-swap-container"),
            logoSwapCompanyContainer = emailDocument.getElementById("logo-swap-company-container"),
            logoBkg = emailDocument.getElementById("logo-bkg"),
            buttonBkg = emailDocument.getElementById("button-bkg");
            
            if (emailBody
                 && emailBody.innerHTML) {
                var mktoHeader = emailDocument.getElementsByName("header")[0],
                mktoLogo = emailDocument.getElementsByName("logo")[0],
                mktoImgs = emailBody.getElementsByClassName("mktoImg"),
                mktoHeroBg = emailDocument.getElementsByName("heroBackground")[0],
                mktoTds = emailBody.getElementsByTagName("td"),
                mktoTitle = emailDocument.getElementsByName("title")[0],
                mktoSubtitle = emailDocument.getElementsByName("subtitle")[0],
                mktoTexts = emailBody.getElementsByClassName("mktoText"),
                mktoButton = emailDocument.getElementsByName("button")[0],
                mktoButtons = emailBody.getElementsByClassName("secondary-font button");
                
                if (!isMktoHeaderBgColorReplaced
                     && color
                     && mktoHeader) {
                    
                    console.log("Content > Overlaying: Email 2.0 Header Background Company Color for Demo Svcs Template");
                    mktoHeader.style.setProperty("background-color", color);
                    mktoHeader.setAttribute("bgColor", color);
                    isMktoHeaderBgColorReplaced = true;
                }
                
                if (!isMktoImgReplaced
                     && logo
                     && (mktoLogo
                         || mktoImgs.length != 0)) {
                    
                    if (mktoLogo) {
                        console.log("Content > Overlaying: Email 2.0 Company Logo for Demo Svcs Template");
                        if (mktoLogo.style.height) {
                            mktoLogo.style.setProperty("max-height", mktoLogo.style.height);
                            console.log("Content > Overlaying: Email 2.0 Company Logo Max Height = " + mktoLogo.style.height);
                        } else {
                            mktoLogo.style.setProperty("max-height", mktoLogo.height + "px");
                            console.log("Content > Overlaying: Email 2.0 Company Logo Max Height = " + mktoLogo.height);
                        }
                        mktoLogo.setAttribute("src", logo);
                        isMktoImgReplaced = true;
                    } else {
                        for (var ii = 0; ii < mktoImgs.length; ii++) {
                            var currMktoImg = mktoImgs[ii],
                            currMktoImgMktoName;
                            
                            if (currMktoImg.getAttribute("mktoname")) {
                                currMktoImgMktoName = currMktoImg.getAttribute("mktoname");
                            } else if (currMktoImg.getAttribute("id")) {
                                currMktoImgMktoName = currMktoImg.getAttribute("id");
                            }
                            
                            if (currMktoImgMktoName
                                 && currMktoImgMktoName.search(logoMktoNameRegex) != -1) {
                                var currMktoImgTag = currMktoImg.getElementsByTagName("img")[0];
                                
                                if (currMktoImgTag
                                     && currMktoImgTag.getAttribute("src")) {
                                    console.log("Content > Overlaying: Email 2.0 Company Logo");
                                    if (currMktoImgTag.style.height) {
                                        currMktoImgTag.style.setProperty("max-height", currMktoImgTag.style.height);
                                        console.log("Content > Overlaying: Email 2.0 Company Logo Max Height = " + currMktoImgTag.style.height);
                                    } else {
                                        currMktoImgTag.style.setProperty("max-height", currMktoImgTag.height + "px");
                                        console.log("Content > Overlaying: Email 2.0 Company Logo Max Height = " + currMktoImgTag.height);
                                    }
                                    currMktoImgTag.setAttribute("src", logo);
                                    isMktoImgReplaced = true;
                                    break;
                                }
                            }
                        }
                    }
                }
                
                if (!isMktoHeroBgReplaced
                     && heroBackground
                     && (mktoHeroBg
                         || mktoTds.length != 0)) {
                    
                    if (mktoHeroBg) {
                        console.log("Content > Overlaying: Email 2.0 Hero Company Background for Demo Svcs Template");
                        mktoHeroBg.style.setProperty("background-image", "url('" + heroBackground + "')");
                        mktoHeroBg.setAttribute("background", heroBackground);
                        mktoHeroBg.style.setProperty("background-size", "cover");
                        isMktoHeroBgReplaced = true;
                    } else {
                        for (var ii = 0; ii < mktoTds.length; ii++) {
                            var currMktoTd = mktoTds[ii];
                            
                            if (currMktoTd
                                 && currMktoTd.getAttribute("background")) {
                                
                                console.log("Content > Overlaying: Email 2.0 Hero Company Background");
                                currMktoTd.setAttribute("background", heroBackground);
                                currMktoTd.style.setProperty("background-image", "url('" + heroBackground + "')");
                                currMktoTd.style.setProperty("background-size", "cover");
                                isMktoHeroBgReplaced = true;
                                break;
                            }
                        }
                    }
                }
                
                if ((!isMktoSubTextReplaced
                         || !isMktoTextReplaced)
                     && (mktoTitle
                         || mktoSubtitle
                         || mktoTexts.length != 0)) {
                    
                    if (mktoTitle) {
                        console.log("Content > Overlaying: Email 2.0 Company Name in Title for Demo Svcs Template");
                        mktoTitle.innerHTML = mktoMainText;
                        isMktoTextReplaced = true;
                    }
                    
                    if (mktoSubtitle) {
                        console.log("Content > Overlaying: Email 2.0 Company Today's Date in Subtitle for Demo Svcs Template");
                        mktoSubtitle.innerHTML = mktoSubText;
                        isMktoSubTextReplaced = true;
                    }
                    
                    if (!mktoSubtitle
                         && !mktoTitle) {
                        for (var ii = 0; ii < mktoTexts.length; ii++) {
                            var currMktoText = mktoTexts[ii],
                            currMktoTextMktoName;
                            
                            if (currMktoText.getAttribute("mktoname")) {
                                currMktoTextMktoName = currMktoText.getAttribute("mktoname");
                            } else if (currMktoText.getAttribute("id")) {
                                currMktoTextMktoName = currMktoText.getAttribute("id");
                            }
                            
                            if (currMktoTextMktoName
                                 && currMktoTextMktoName.search(mainTitleMktoNameRegex) != -1) {
                                if (currMktoText.innerHTML) {
                                    console.log("Content > Overlaying: Email 2.0 Company Name in Title");
                                    currMktoText.innerHTML = mktoMainText;
                                    isMktoTextReplaced = true;
                                }
                            } else if (currMktoTextMktoName
                                 && currMktoTextMktoName.search(subTitleMktoNameRegex) != -1) {
                                if (currMktoText.innerHTML) {
                                    console.log("Content > Overlaying: Email 2.0 Company Today's Date in Subtitle");
                                    currMktoText.innerHTML = mktoSubText;
                                    isMktoSubTextReplaced = true;
                                }
                            }
                            
                            if (isMktoSubTextReplaced
                                 && isMktoTextReplaced) {
                                break;
                            }
                        }
                    }
                }
                
                if (!isMktoButtonReplaced
                     && color
                     && (mktoButton
                         || mktoButtons.length != 0)) {
                    
                    if (mktoButton) {
                        console.log("Content > Overlaying: Email 2.0 Button Company Color for Demo Svcs Template");
                        mktoButton.style.setProperty("background-color", color);
                        
                        if (mktoButton.style.getPropertyValue("border")
                             && mktoButton.style.getPropertyValue("border") != "none") {
                            
                            mktoButton.style.setProperty("border", "1px solid " + color);
                        }
                        isMktoButtonReplaced = true;
                    } else {
                        for (var ii = 0; ii < mktoButtons.length; ii++) {
                            var currMktoButton = mktoButtons[ii];
                            
                            if (currMktoButton.innerHTML
                                 && currMktoButton.innerHTML.search(buttonTextRegex) != -1) {
                                if (currMktoButton.style
                                     && currMktoButton.style.backgroundColor) {
                                    console.log("Content > Overlaying: Email 2.0 Button Company Color");
                                    currMktoButton.style.backgroundColor = color;
                                    
                                    if (currMktoButton.style.getPropertyValue("border")
                                         && currMktoButton.style.getPropertyValue("border") != "none") {
                                        
                                        currMktoButton.style.setProperty("border", "1px solid " + color);
                                    }
                                    isMktoButtonReplaced = true;
                                    break;
                                }
                            }
                        }
                    }
                }
            }
            
            if (logoSwapCompanyContainer
                 && logoSwapContainer
                 && logoSwapCompany
                 && logoBkg) {
                console.log("Content > Overlaying: Email 1.0 Company Logo & Color");
                if (color) {
                    logoBkg.style.backgroundColor = color;
                }
                
                if (logo) {
                    logoSwapCompany.setAttribute("src", logo);
                    
                    logoSwapCompany.onload = function () {
                        var logoHeightsRatio,
                        logoWidth,
                        logoNewWidth,
                        logoNewHeight,
                        logoStyle;
                        
                        if (logoSwapCompany.naturalHeight
                             && logoSwapCompany.naturalHeight > logoMaxHeight) {
                            logoHeightsRatio = logoSwapCompany.naturalHeight / logoMaxHeight;
                            logoWidth = logoSwapCompany.naturalWidth / logoHeightsRatio;
                            logoSwapCompany.width = logoNewWidth = logoWidth;
                            logoSwapCompany.height = logoNewHeight = logoMaxHeight;
                        } else if (logoSwapCompany.naturalHeight) {
                            logoSwapCompany.width = logoNewWidth = logoSwapCompany.naturalWidth;
                            logoSwapCompany.height = logoNewHeight = logoSwapCompany.naturalHeight;
                        } else {
                            logoSwapCompany.width = logoSwapCompany.height = logoNewWidth = logoNewHeight = logoMaxHeight;
                        }
                        
                        if (emailDocument.getElementsByTagName("head")
                             && emailDocument.getElementsByTagName("head")[0]) {
                            logoStyle = document.createElement("style");
                            logoStyle.innerHTML = "#" + logoSwapCompany.id + " {width : " + logoNewWidth + "px !important; height : " + logoNewHeight + "px !important;}";
                            emailDocument.getElementsByTagName("head")[0].appendChild(logoStyle);
                        }
                        console.log("Content > Overlaying: Email 1.0 Company Logo Dimensions = " + logoNewWidth + " x " + logoNewHeight);
                    }
                    logoSwapContainer.style.display = "none";
                    logoSwapCompanyContainer.style.display = "block";
                }
                
                if (buttonBkg
                     && color) {
                    buttonBkg.style.setProperty("background-color", color);
                }
                isMktoEmail1Replaced = true;
            }
            
            if ((isMktoButtonReplaced
                     && isMktoSubTextReplaced
                     && isMktoTextReplaced
                     && isMktoImgReplaced
                     && isMktoHeroBgReplaced
                     && (!mktoHeader
                         || (mktoHeader
                             && isMktoHeaderBgColorReplaced)))
                 || isMktoEmail1Replaced) {
                clearOverlayVars();
                return true;
            }
        }
        
        return false;
    };
    
    isEmailEditor2 = window.setInterval(function () {
            if (action == "edit") {
                console.log("Content > Overlaying: Email Designer");
                if (document.getElementsByTagName("iframe")[0]
                     && document.getElementsByTagName("iframe")[0].contentWindow
                     && document.getElementsByTagName("iframe")[0].contentWindow.document
                     && document.getElementsByTagName("iframe")[0].contentWindow.document.readyState == "complete") {
                    if (overlay(document.getElementsByTagName("iframe")[0].contentWindow.document)
                         || editorRepeatReadyCount >= maxRepeatReady) {
                        
                        console.log("Content > Overlayed: Email Designer = " + editorRepeatReadyCount);
                        console.log("Content > Overlaying: Email Interval is Cleared");
                        window.clearInterval(isEmailEditor2);
                        clearOverlayVars();
                        return true;
                    } else if (editorPrevReady) {
                        editorRepeatReadyCount++;
                    } else {
                        editorRepeatReadyCount = 1;
                    }
                    editorPrevReady = true;
                } else {
                    editorPrevReady = false;
                }
            } else if (action == "preview") {
                console.log("Content > Overlaying: Email Previewer");
                
                if (!isDesktopPreviewReplaced
                     && document.getElementsByTagName("iframe")[2]
                     && document.getElementsByTagName("iframe")[2].contentWindow
                     && document.getElementsByTagName("iframe")[2].contentWindow.document
                     && document.getElementsByTagName("iframe")[2].contentWindow.document.readyState == "complete") {
                    if (overlay(document.getElementsByTagName("iframe")[2].contentWindow.document)
                         || desktopRepeatReadyCount >= maxPreviewRepeatReady) {
                        
                        console.log("Content > Overlayed: Email Desktop Preview = " + desktopRepeatReadyCount);
                        isDesktopPreviewReplaced = true;
                        clearOverlayVars();
                    } else if (desktopPrevReady) {
                        desktopRepeatReadyCount++;
                    } else {
                        desktopRepeatReadyCount = 1;
                    }
                    desktopPrevReady = true;
                } else {
                    desktopPrevReady = false;
                }
                
                if (!isPhonePreviewReplaced
                     && document.getElementsByTagName("iframe")[3]
                     && document.getElementsByTagName("iframe")[3].contentWindow
                     && document.getElementsByTagName("iframe")[3].contentWindow.document
                     && document.getElementsByTagName("iframe")[3].contentWindow.document.readyState == "complete") {
                    if (overlay(document.getElementsByTagName("iframe")[3].contentWindow.document)
                         || phoneRepeatReadyCount >= maxPreviewRepeatReady) {
                        
                        console.log("Content > Overlayed: Email Phone Preview = " + phoneRepeatReadyCount);
                        isPhonePreviewReplaced = true;
                        clearOverlayVars();
                    } else if (phonePrevReady) {
                        phoneRepeatReadyCount++;
                    } else {
                        phoneRepeatReadyCount = 1;
                    }
                    phonePrevReady = true;
                } else {
                    phonePrevReady = false;
                }
                
                if (isPhonePreviewReplaced
                     && isDesktopPreviewReplaced) {
                    console.log("Content > Overlaying: Email Interval is Cleared");
                    window.clearInterval(isEmailEditor2);
                    clearOverlayVars();
                    return true;
                }
            }
        }, 0);
};

/**************************************************************************************
 *
 *  This function overlays a landing page with the user submitted company logo and color.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {String} action - The mode in which this asset is being viewed (edit/preview).
 *
 **************************************************************************************/

APP.overlayLandingPage = function (action) {
    console.log("Content > Overlaying: Landing Page");
    
    var isLandingPageEditor,
    clearOverlayVars,
    overlay,
    isMktoFreeForm = isMktoBackgroundColorReplaced = isMktoImgReplaced = isMktoHeroBgImgReplaced = isMktoTextReplaced = isMktoSubTextReplaced = isMktoButtonReplaced = isMktoOrigReplaced = desktopPrevReady = phonePrevReady = sideBySideDesktopPrevReady = sideBySidePhonePrevReady = isDesktopReplaced = isPhoneReplaced = isSideBySideDesktopReplaced = isSideBySidePhoneReplaced = false,
    mktoBodyId = "bodyId",
    mktoFreeFormClassName = "mktoMobileShow",
    logoRegex = new RegExp("primaryImage|primary_image|primary-image|logo|image_1|image-1|image1", "i"),
    heroBgImgIdRegex = new RegExp("hero", "i"),
    mktoMainTextDivIdRegex = new RegExp("^primaryBodyHeader$|^heroHeader$|^mainTitle$|^main-title$|^hero title$|^heroTitle$|^hero-title$|^title$", "i"),
    mktoSubTextDivIdRegex = new RegExp("^section2Header$|^heroHeader2$|^subtitle$|^sub-title$|^hero subtitle$|^heroSubtitle$|^hero-subtitle$", "i"),
    mktoRichMainTextDivClassNameRegex = new RegExp("main title|main_title|mainTitle|main-title|title", "i"),
    mktoRichSubTextDivClassNameRegex = new RegExp("subtitle|sub-title", "i"),
    buttonTextRegex = new RegExp("signup|sign up|call to action|cta|register|more|contribute|submit", "i"),
    saveEditsToggle = APP.getCookie("saveEditsToggleState"),
    logo = APP.getCookie("logo"),
    heroBackground = APP.getCookie("heroBackground"),
    color = APP.getCookie("color"),
    defaultColor = "rgb(42, 83, 112)",
    logoOrigMaxHeight = "55",
    mktoMainText = "You To Our Event",
    mktoSubText = APP.getHumanDate(),
    company,
    companyName,
    linearGradient,
    desktopRepeatReadyCount = phoneRepeatReadyCount = sideBySideDesktopRepeatReadyCount = sideBySidePhoneRepeatReadyCount = 0,
    maxRepeatReady = 2000,
    maxOtherRepeatReady = 2000;
    
    if (saveEditsToggle == "true"
         || (logo == null
             && heroBackground == null
             && color == null)) {
        return false;
    }
    if (logo != null) {
        company = logo.split("https://logo.clearbit.com/")[1].split(".")[0];
        companyName = company.charAt(0).toUpperCase() + company.slice(1);
        mktoMainText = companyName + " Invites " + mktoMainText;
    } else {
        mktoMainText = "We Invite " + mktoMainText;
    }
    
    if (color) {
        var formButtonStyle = document.createElement("style");
        formButtonStyle.type = "text/css";
        formButtonStyle.innerHTML = ".mktoButton { background-image: none !important; border-radius: 0 !important; border: none !important; background-color: " + color + " !important; }";
        linearGradient = "linear-gradient(to bottom, " + color + ", rgb(242, 242, 242)) !important";
    }
    
    clearOverlayVars = function () {
        isMktoBackgroundColorReplaced = isMktoImgReplaced = isMktoHeroBgImgReplaced = isMktoTextReplaced = isMktoSubTextReplaced = isMktoButtonReplaced = isMktoOrigReplaced = false;
        iframeBody = logoImg = textBackground = bannerBackground = mainTitle = subTitle = mktoImgs = mktoTexts = mktoRichTexts = mktoButtons = null;
    };
    
    overlay = function (iframeDocument) {
        if (iframeDocument) {
            var iframeBody = iframeDocument.getElementsByTagName("body")[0],
            logoImg = iframeDocument.getElementById("lp-logo"),
            textBackground = iframeDocument.getElementById("background-color"),
            bannerBackground = iframeDocument.getElementById("bigger-background"),
            mainTitle = iframeDocument.getElementById("title"),
            subTitle = iframeDocument.getElementById("sub-title");
            
            if (iframeBody
                 && iframeBody.innerHTML) {
                var mktoHeader = iframeDocument.getElementsByName("header")[0],
                mktoLogo = iframeDocument.getElementsByName("logo")[0],
                mktoImgs = iframeBody.getElementsByClassName("lpimg"),
                mktoHeroBg = iframeDocument.getElementsByName("heroBackground")[0],
                mktoTitle = iframeDocument.getElementsByName("title")[0],
                mktoSubtitle = iframeDocument.getElementsByName("subtitle")[0],
                mktoTexts = iframeBody.getElementsByClassName("mktoText"),
                mktoRichTexts = iframeBody.getElementsByClassName("richTextSpan"),
                mktoButton = iframeDocument.getElementsByName("button")[0],
                mktoButtons = iframeBody.getElementsByTagName("button");
                
                if (!isMktoBackgroundColorReplaced
                     && color
                     && mktoHeader) {
                    
                    console.log("Content > Overlaying: Landing Page Header Background Company Color for Demo Svcs Template");
                    mktoHeader.setAttribute("style", mktoHeader.getAttribute("style") + "; background: " + linearGradient + ";");
                    //mktoHeader.style.setProperty("background", linearGradient);
                    isMktoBackgroundColorReplaced = true;
                    isMktoFreeForm = false;
                } else if (!isMktoBackgroundColorReplaced
                     && color
                     && !bannerBackground
                     && iframeBody.id == mktoBodyId
                     && iframeBody.className != null
                     && iframeBody.getElementsByTagName("div")
                     && iframeBody.getElementsByTagName("div")[0]
                     && iframeBody.getElementsByTagName("div")[0].style) {
                    if (iframeBody.className.search(mktoFreeFormClassName) != -1) {
                        console.log("Content > Overlaying: Freeform Landing Page Background Company Color");
                        iframeBody.getElementsByTagName("div")[0].style.backgroundColor = color + " !important";
                        isMktoBackgroundColorReplaced = isMktoFreeForm = true;
                    } else {
                        console.log("Content > Overlaying: Guided Landing Page Background Company Color");
                        iframeBody.getElementsByTagName("div")[0].style.background = linearGradient;
                        isMktoBackgroundColorReplaced = true;
                        isMktoFreeForm = false;
                    }
                    iframeDocument.getElementsByTagName("head")[0].appendChild(formButtonStyle);
                }
                
                if (!isMktoImgReplaced
                     && logo
                     && (mktoLogo
                         || mktoImgs.length != 0)) {
                    
                    if (mktoLogo) {
                        console.log("Content > Overlaying: Landing Page Company Logo for Demo Svcs Template");
                        if (mktoLogo.style.height) {
                            mktoLogo.style.setProperty("max-height", mktoLogo.style.height);
                            console.log("Content > Overlaying: Landing Page Company Logo Max Height = " + mktoLogo.style.height);
                        } else {
                            mktoLogo.style.setProperty("max-height", mktoLogo.height + "px");
                            console.log("Content > Overlaying: Landing Page Company Logo Max Height = " + mktoLogo.height);
                        }
                        mktoLogo.setAttribute("src", logo);
                        isMktoImgReplaced = true;
                    } else {
                        for (var ii = 0; ii < mktoImgs.length; ii++) {
                            var currMktoImg = mktoImgs[ii];
                            
                            if (currMktoImg
                                 && currMktoImg.src
                                 && currMktoImg.parentNode
                                 && currMktoImg.parentNode.tagName == "DIV"
                                 && currMktoImg.parentNode.id.search(logoRegex) != -1) {
                                console.log("Content > Overlaying: Guided Landing Page Company Logo");
                                currMktoImg.setAttribute("src", logo);
                                isMktoImgReplaced = true;
                                break;
                            } else if (currMktoImg
                                 && currMktoImg.src
                                 && currMktoImg.parentNode
                                 && currMktoImg.parentNode.tagName == "SPAN"
                                 && currMktoImg.parentNode.parentNode
                                 && currMktoImg.parentNode.parentNode.className.search(logoRegex) != -1) {
                                console.log("Content > Overlaying: Freeform Landing Page Company Logo");
                                if (currMktoImg.style.height) {
                                    currMktoImg.style.setProperty("max-height", currMktoImg.style.height);
                                    console.log("Content > Overlaying: Freeform Landing Page Company Logo Max Height = " + currMktoImg.style.height);
                                } else {
                                    currMktoImg.style.setProperty("max-height", currMktoImg.height + "px");
                                    console.log("Content > Overlaying: Freeform Landing Page Company Logo Max Height = " + currMktoImg.height);
                                }
                                currMktoImg.setAttribute("src", logo);
                                isMktoImgReplaced = true;
                                break;
                            }
                        }
                    }
                }
                
                if (!isMktoHeroBgImgReplaced
                     && heroBackground
                     && (mktoHeroBg
                         || mktoImgs.length != 0)) {
                    
                    if (mktoHeroBg
                         && mktoHeroBg.getAttribute("src")) {
                        
                        console.log("Content > Overlaying: Guided Landing Page Hero Company Background for Demo Svcs Template");
                        mktoHeroBg.setAttribute("src", heroBackground);
                        isMktoHeroBgImgReplaced = true;
                    } else {
                        for (var ii = 0; ii < mktoImgs.length; ii++) {
                            var currMktoImg = mktoImgs[ii];
                            
                            if (currMktoImg.getAttribute("src")
                                 && currMktoImg.getAttribute("id")
                                 && currMktoImg.getAttribute("id").search(heroBgImgIdRegex) != -1) {
                                
                                console.log("Content > Overlaying: Guided Landing Page Hero Company Background");
                                currMktoImg.setAttribute("src", heroBackground);
                                isMktoHeroBgImgReplaced = true;
                                break;
                            }
                        }
                    }
                }
                
                if ((!isMktoSubTextReplaced
                         || !isMktoTextReplaced)
                     && (mktoTitle
                         || mktoSubtitle
                         || mktoTexts.length != 0)
                     || mktoRichTexts.length != 0) {
                    
                    if (mktoTitle) {
                        console.log("Content > Overlaying: Landing Page Company Name in Title for Demo Svcs Template");
                        mktoTitle.innerHTML = mktoMainText;
                        isMktoTextReplaced = true;
                    }
                    
                    if (mktoSubtitle) {
                        console.log("Content > Overlaying: Landing Page Company Today's Date in Subtitle for Demo Svcs Template");
                        mktoSubtitle.innerHTML = mktoSubText;
                        isMktoSubTextReplaced = true;
                    }
                    
                    if (!mktoSubtitle
                         && !mktoTitle) {
                        
                        if (mktoTexts.length != 0) {
                            for (var ii = 0; ii < mktoTexts.length; ii++) {
                                var currMktoText = mktoTexts[ii];
                                
                                if (!isMktoTextReplaced
                                     && currMktoText
                                     && currMktoText.childNodes
                                     && currMktoText.childNodes[0]
                                     && currMktoText.childNodes[0].innerHTML
                                     && currMktoText.id.search(mktoMainTextDivIdRegex) != -1) {
                                    console.log("Content > Overlaying: Guided Landing Page Company Name in Title");
                                    currMktoText.childNodes[0].innerHTML = mktoMainText;
                                    isMktoTextReplaced = true;
                                }
                                
                                if (!isMktoSubTextReplaced
                                     && currMktoText
                                     && currMktoText.innerHTML
                                     && currMktoText.childElementCount != null
                                     && currMktoText.id.search(mktoSubTextDivIdRegex) != -1) {
                                    if (!currMktoText.childElementCount) {
                                        console.log("Content > Overlaying: Guided Landing Page Company Today's Date in Subtitle");
                                        if (currMktoText.innerHTML) {
                                            currMktoText.innerHTML = mktoSubText;
                                        } else {
                                            currMktoText.parentNode.innerHTML = mktoSubText;
                                        }
                                        isMktoSubTextReplaced = true;
                                    } else if (currMktoText.childNodes
                                         && currMktoText.childNodes[0]) {
                                        if (!currMktoText.childNodes[0].childElementCount) {
                                            console.log("Content > Overlaying: Guided Landing Page Company Today's Date in Subtitle");
                                            if (currMktoText.childNodes[0].innerHTML) {
                                                currMktoText.childNodes[0].innerHTML = mktoSubText;
                                            } else {
                                                currMktoText.innerHTML = mktoSubText;
                                            }
                                            isMktoSubTextReplaced = true;
                                        } else if (currMktoText.childNodes[0].childNodes
                                             && currMktoText.childNodes[0].childNodes[0]
                                             && !currMktoText.childNodes[0].childNodes[0].childElementCount) {
                                            console.log("Content > Overlaying: Guided Landing Page Company Today's Date in Subtitle");
                                            if (currMktoText.childNodes[0].childNodes[0].innerHTML) {
                                                currMktoText.childNodes[0].childNodes[0].innerHTML = mktoSubText;
                                            } else {
                                                currMktoText.childNodes[0].innerHTML = mktoSubText;
                                            }
                                            isMktoSubTextReplaced = true;
                                        }
                                    }
                                }
                                
                                if (isMktoSubTextReplaced
                                     && isMktoTextReplaced) {
                                    break;
                                }
                            }
                        }
                        
                        if (mktoRichTexts.length != 0) {
                            for (var ii = 0; ii < mktoRichTexts.length; ii++) {
                                var currMktoRichText = mktoRichTexts[ii];
                                
                                if (currMktoRichText
                                     && currMktoRichText.innerHTML
                                     && currMktoRichText.childElementCount != null
                                     && currMktoRichText.parentNode
                                     && currMktoRichText.parentNode.tagName == "DIV") {
                                    if (!isMktoTextReplaced
                                         && currMktoRichText.parentNode.className.search(mktoRichMainTextDivClassNameRegex) != -1) {
                                        if (!currMktoRichText.childElementCount) {
                                            console.log("Content > Overlaying: Freeform Landing Page Company Name in Title");
                                            if (currMktoRichText.innerHTML) {
                                                currMktoRichText.innerHTML = mktoMainText;
                                            } else {
                                                currMktoRichText.parentNode.innerHTML = mktoMainText;
                                            }
                                            isMktoTextReplaced = true;
                                        } else if (currMktoRichText.childNodes
                                             && currMktoRichText.childNodes[0]) {
                                            if (!currMktoRichText.childNodes[0].childElementCount) {
                                                console.log("Content > Overlaying: Freeform Landing Page Company Name in Title");
                                                if (currMktoRichText.childNodes[0].innerHTML) {
                                                    currMktoRichText.childNodes[0].innerHTML = mktoMainText;
                                                } else {
                                                    currMktoRichText.innerHTML = mktoMainText;
                                                }
                                                isMktoTextReplaced = true;
                                            } else if (currMktoRichText.childNodes[0].childNodes
                                                 && currMktoRichText.childNodes[0].childNodes[0]
                                                 && !currMktoRichText.childNodes[0].childNodes[0].childElementCount) {
                                                console.log("Content > Overlaying: Freeform Landing Page Company Name in Title");
                                                if (currMktoRichText.childNodes[0].childNodes[0].innerHTML) {
                                                    currMktoRichText.childNodes[0].childNodes[0].innerHTML = mktoMainText;
                                                } else {
                                                    currMktoRichText.childNodes[0].innerHTML = mktoMainText;
                                                }
                                                isMktoTextReplaced = true;
                                            }
                                        }
                                    }
                                    
                                    if (!isMktoSubTextReplaced
                                         && currMktoRichText.parentNode.className.search(mktoRichSubTextDivClassNameRegex) != -1) {
                                        if (!currMktoRichText.childElementCount) {
                                            console.log("Content > Overlaying: Freeform Landing Page Company Today's Date in Subtitle");
                                            if (currMktoRichText.innerHTML) {
                                                currMktoRichText.innerHTML = mktoSubText;
                                            } else {
                                                currMktoRichText.parentNode.innerHTML = mktoSubText;
                                            }
                                            isMktoSubTextReplaced = true;
                                        } else if (currMktoRichText.childNodes
                                             && currMktoRichText.childNodes[0]) {
                                            if (!currMktoRichText.childNodes[0].childElementCount) {
                                                console.log("Content > Overlaying: Freeform Landing Page Company Today's Date in Subtitle");
                                                if (currMktoRichText.childNodes[0].innerHTML) {
                                                    currMktoRichText.childNodes[0].innerHTML = mktoSubText;
                                                } else {
                                                    currMktoRichText.innerHTML = mktoSubText;
                                                }
                                                isMktoSubTextReplaced = true;
                                            } else if (currMktoRichText.childNodes[0].childNodes
                                                 && currMktoRichText.childNodes[0].childNodes[0]
                                                 && !currMktoRichText.childNodes[0].childNodes[0].childElementCount) {
                                                console.log("Content > Overlaying: Freeform Landing Page Company Today's Date in Subtitle");
                                                if (currMktoRichText.childNodes[0].childNodes[0].innerHTML) {
                                                    currMktoRichText.childNodes[0].childNodes[0].innerHTML = mktoSubText;
                                                } else {
                                                    currMktoRichText.childNodes[0].innerHTML = mktoSubText;
                                                }
                                                isMktoSubTextReplaced = true;
                                            }
                                        }
                                    }
                                }
                                
                                if (isMktoSubTextReplaced
                                     && isMktoTextReplaced) {
                                    break;
                                }
                            }
                        }
                    }
                }
                
                if (!isMktoButtonReplaced
                     && color
                     && (mktoButton
                         || mktoButtons.length != 0)) {
                    
                    if (mktoButton) {
                        console.log("Content > Overlaying: Landing Page Button Company Color for Demo Svcs Template");
                        mktoButton.setAttribute("style", currMktoButton.getAttribute("style") + "; background-color: " + color + " !important;");
                        //mktoButton.style.setProperty("background-color", color + " !important");
                        
                        if (mktoButton.style.getPropertyValue("border")
                             && mktoButton.style.getPropertyValue("border") != "none") {
                            
                            mktoButton.setAttribute("style", currMktoButton.getAttribute("style") + "; border: 1px solid " + color + " !important;");
                            //mktoButton.style.setProperty("border", "1px solid " + color + " !important");
                        }
                        isMktoButtonReplaced = true;
                    } else {
                        for (var ii = 0; ii < mktoButtons.length; ii++) {
                            var currMktoButton = mktoButtons[ii];
                            
                            if (currMktoButton
                                 && currMktoButton.style
                                 && currMktoButton.style.backgroundColor != null
                                 && currMktoButton.innerHTML
                                 && currMktoButton.innerHTML.search(buttonTextRegex) != -1) {
                                console.log("Content > Overlaying: Landing Page Button Company Color");
                                currMktoButton.setAttribute("style", currMktoButton.getAttribute("style") + "; background-color: " + color + " !important;");
                                //currMktoButton.style.backgroundColor = currMktoButton.style.background = color + " !important";
                                
                                if (currMktoButton.style.getPropertyValue("border")
                                     && currMktoButton.style.getPropertyValue("border") != "none") {
                                    
                                    currMktoButton.setAttribute("style", currMktoButton.getAttribute("style") + "; border: 1px solid " + color + " !important;");
                                    //currMktoButton.style.setProperty("border", "1px solid " + color + " !important");
                                }
                                isMktoButtonReplaced = true;
                                break;
                            }
                        }
                    }
                }
            }
            
            if (logoImg
                 && textBackground
                 && textBackground.style
                 && bannerBackground
                 && bannerBackground.style
                 && mainTitle
                 && subTitle) {
                console.log("Content > Overlaying: Original Landing Page Company Logo & Color");
                if (logo) {
                    logoImg.src = logo;
                    
                    logoImg.onload = function () {
                        var logoHeightsRatio,
                        logoWidth,
                        logoNewWidth,
                        logoNewHeight,
                        logoStyle;
                        
                        if (logoImg.naturalHeight
                             && logoImg.naturalHeight > logoOrigMaxHeight) {
                            logoHeightsRatio = logoImg.naturalHeight / logoOrigMaxHeight;
                            logoWidth = logoImg.naturalWidth / logoHeightsRatio;
                            logoImg.width = logoImg.style.width = logoNewWidth = logoWidth;
                            logoImg.height = logoImg.style.height = logoNewHeight = logoOrigMaxHeight;
                        } else if (logoImg.naturalHeight) {
                            logoImg.width = logoImg.style.width = logoNewWidth = logoImg.naturalWidth;
                            logoImg.height = logoImg.style.height = logoNewHeight = logoImg.naturalHeight;
                        } else {
                            logoImg.width = logoImg.height = logoImg.style.width = logoImg.style.height = logoNewWidth = logoNewHeight = logoOrigMaxHeight;
                        }
                        
                        if (iframeDocument.getElementsByTagName("head")
                             && iframeDocument.getElementsByTagName("head")[0]) {
                            logoStyle = document.createElement("style");
                            logoStyle.innerHTML = "#" + logoImg.id + " {width : " + logoNewWidth + "px !important; height : " + logoNewHeight + "px !important;}";
                            iframeDocument.getElementsByTagName("head")[0].appendChild(logoStyle);
                        }
                        console.log("Content > Overlaying: Original Landing Page Company Logo Dimensions = " + logoNewWidth + " x " + logoNewHeight);
                    };
                }
                
                if (color) {
                    textBackground.style.backgroundColor = color;
                    bannerBackground.style.backgroundColor = color;
                    iframeDocument.getElementsByTagName("head")[0].appendChild(formButtonStyle);
                }
                mainTitle.innerHTML = mktoMainText;
                subTitle.innerHTML = mktoSubText;
                isMktoOrigReplaced = isMktoFreeForm = true;
            }
            
            if ((isMktoButtonReplaced
                     && isMktoSubTextReplaced
                     && isMktoTextReplaced
                     && isMktoHeroBgImgReplaced
                     && isMktoImgReplaced
                     && isMktoBackgroundColorReplaced)
                 || isMktoOrigReplaced) {
                clearOverlayVars();
                return true;
            }
        }
        return false;
    };
    
    isLandingPageEditor = window.setInterval(function () {
            if (action == "edit") {
                console.log("Content > Overlaying: Landing Page Designer");
                
                if (document.getElementsByTagName("iframe")[0]
                     && document.getElementsByTagName("iframe")[0].contentWindow
                     && document.getElementsByTagName("iframe")[0].contentWindow.document
                     && document.getElementsByTagName("iframe")[0].contentWindow.document.readyState == "complete") {
                    if (overlay(document.getElementsByTagName("iframe")[0].contentWindow.document)
                         || desktopRepeatReadyCount >= maxRepeatReady) {
                        
                        console.log("Content > Overlayed: Landing Page Desktop Designer = " + desktopRepeatReadyCount);
                        isDesktopReplaced = true;
                        clearOverlayVars();
                    } else if (desktopPrevReady) {
                        desktopRepeatReadyCount++;
                    } else {
                        desktopRepeatReadyCount = 1;
                    }
                    desktopPrevReady = true;
                } else {
                    desktopPrevReady = false;
                }
                
                if (isMktoFreeForm
                     && !isPhoneReplaced
                     && document.getElementsByTagName("iframe")[1]
                     && document.getElementsByTagName("iframe")[1].contentWindow
                     && document.getElementsByTagName("iframe")[1].contentWindow.document
                     && document.getElementsByTagName("iframe")[1].contentWindow.document.readyState == "complete") {
                    if (overlay(document.getElementsByTagName("iframe")[1].contentWindow.document)
                         || phoneRepeatReadyCount >= maxRepeatReady) {
                        
                        console.log("Content > Overlayed: Freeform Landing Page Phone Designer = " + phoneRepeatReadyCount);
                        isPhoneReplaced = true;
                        clearOverlayVars();
                    } else if (phonePrevReady) {
                        phoneRepeatReadyCount++;
                    } else {
                        phoneRepeatReadyCount = 1;
                    }
                    phonePrevReady = true;
                } else {
                    phonePrevReady = false;
                }
                
                if ((!isMktoFreeForm
                         && isDesktopReplaced
                         && !document.getElementsByTagName("iframe")[1].contentWindow.document.getElementsByTagName("body")[0].innerHTML)
                     || (isMktoFreeForm
                         && isPhoneReplaced
                         && isDesktopReplaced)) {
                    
                    console.log("Content > Overlaying: Landing Page Interval is Cleared");
                    window.clearInterval(isLandingPageEditor);
                    clearOverlayVars();
                    return true;
                }
            } else if (action == "preview") {
                console.log("Content > Overlaying: Landing Page Previewer");
                
                if (!isDesktopReplaced
                     && document.getElementsByTagName("iframe")[2]
                     && document.getElementsByTagName("iframe")[2].contentWindow
                     && document.getElementsByTagName("iframe")[2].contentWindow.document
                     && document.getElementsByTagName("iframe")[2].contentWindow.document.readyState == "complete") {
                    if (overlay(document.getElementsByTagName("iframe")[2].contentWindow.document)
                         || desktopRepeatReadyCount >= maxRepeatReady) {
                        
                        console.log("Content > Overlayed: Landing Page Desktop Preview = " + desktopRepeatReadyCount);
                        isDesktopReplaced = true;
                        clearOverlayVars();
                    } else if (desktopPrevReady) {
                        desktopRepeatReadyCount++;
                    } else {
                        desktopRepeatReadyCount = 1;
                    }
                    desktopPrevReady = true;
                } else {
                    desktopPrevReady = false;
                }
                
                if (!isPhoneReplaced
                     && document.getElementsByTagName("iframe")[3]
                     && document.getElementsByTagName("iframe")[3].contentWindow
                     && document.getElementsByTagName("iframe")[3].contentWindow.document
                     && document.getElementsByTagName("iframe")[3].contentWindow.document.readyState == "complete") {
                    if (overlay(document.getElementsByTagName("iframe")[3].contentWindow.document)
                         || phoneRepeatReadyCount >= maxOtherRepeatReady) {
                        
                        console.log("Content > Overlayed: Landing Page Phone Preview = " + phoneRepeatReadyCount);
                        isPhoneReplaced = true;
                        clearOverlayVars();
                    } else if (phonePrevReady) {
                        phoneRepeatReadyCount++;
                    } else {
                        phoneRepeatReadyCount = 1;
                    }
                    phonePrevReady = true;
                } else {
                    phonePrevReady = false;
                }
                
                if (!isSideBySideDesktopReplaced
                     && document.getElementsByTagName("iframe")[0]
                     && document.getElementsByTagName("iframe")[0].contentWindow
                     && document.getElementsByTagName("iframe")[0].contentWindow.document
                     && document.getElementsByTagName("iframe")[0].contentWindow.document.readyState == "complete") {
                    if (overlay(document.getElementsByTagName("iframe")[0].contentWindow.document)
                         || sideBySideDesktopRepeatReadyCount >= maxOtherRepeatReady) {
                        
                        console.log("Content > Overlayed: Landing Page Side by Side Desktop Preview = " + sideBySideDesktopRepeatReadyCount);
                        isSideBySideDesktopReplaced = true;
                        clearOverlayVars();
                    } else if (sideBySideDesktopPrevReady) {
                        sideBySideDesktopRepeatReadyCount++;
                    } else {
                        sideBySideDesktopRepeatReadyCount = 1;
                    }
                    sideBySideDesktopPrevReady = true;
                } else {
                    sideBySideDesktopPrevReady = false;
                }
                
                if (!isSideBySidePhoneReplaced
                     && document.getElementsByTagName("iframe")[1]
                     && document.getElementsByTagName("iframe")[1].contentWindow
                     && document.getElementsByTagName("iframe")[1].contentWindow.document
                     && document.getElementsByTagName("iframe")[1].contentWindow.document.readyState == "complete") {
                    if (overlay(document.getElementsByTagName("iframe")[1].contentWindow.document)
                         || sideBySidePhoneRepeatReadyCount >= maxOtherRepeatReady) {
                        
                        console.log("Content > Overlayed: Landing Page Side by Side Phone Preview = " + sideBySidePhoneRepeatReadyCount);
                        isSideBySidePhoneReplaced = true;
                        clearOverlayVars();
                    } else if (sideBySidePhonePrevReady) {
                        sideBySidePhoneRepeatReadyCount++;
                    } else {
                        sideBySidePhoneRepeatReadyCount = 1;
                    }
                    sideBySidePhonePrevReady = true;
                } else {
                    sideBySidePhonePrevReady = false;
                }
                
                if (isSideBySidePhoneReplaced
                     && isSideBySideDesktopReplaced
                     && isPhoneReplaced
                     && isDesktopReplaced) {
                    console.log("Content > Overlaying: Landing Page Interval is Cleared");
                    window.clearInterval(isLandingPageEditor);
                    clearOverlayVars();
                    return true;
                }
            }
        }, 0);
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
    color = APP.getCookie("color");
    
    if (saveEditsToggle == "true"
         && (logo != null
             || heroBackground != null
             || color != null)) {
        
        if (assetType == "landingPage") {
            var httpRegEx = new RegExp("^http|^$", "i"),
            textRegex = new RegExp("^[^#]|^$", "i"),
            colorRegex = new RegExp("^#[0-9a-f]{3,6}$|^rgb|^$", "i"),
            logoRegex = new RegExp("logo|headerLogo|header-logo|^$", "i"),
            heroBgRegex = new RegExp("heroBackground|hero-background|heroBkg|hero-bkg|heroBg|hero-bg|hero1Bg|hero-1-bg|hero1Bkg|hero-1-bkg|hero1Background|^$", "i"),
            titleRegex = new RegExp("^(mainTitle|main-title|heroTitle|hero-title|title|)$", "i"),
            subtitleRegex = new RegExp("^(subtitle|sub-title|heroSubtitle|hero-subtitle|)$", "i"),
            buttonBgColorRegex = new RegExp("^(heroButtonBgColor|hero-button-bg-color|heroButtonBackgroundColor|hero-button-background-color|heroBkgColor|hero-bkg-color|)$", "i"),
            buttonBorderColorRegex = new RegExp("^(heroButtonBorderColor|hero-button-border-color|heroBorderColor|hero-border-color|)$", "i"),
            headerBgColor = "headerBgColor",
            headerLogoImg = "headerLogoImg",
            heroBgImg = "heroBgImg",
            heroTitle = "heroTitle",
            heroSubtitle = "heroSubtitle",
            formButtonBgColor = "formButtonBgColor",
            footerLogoImg = "footerLogoImg",
            title = "You To Our Event",
            subtitle = APP.getHumanDate(),
            company,
            companyName,
            editAssetVars,
            waitForLoadMsg,
            waitForReloadMsg;
            
            waitForLoadMsg = new Ext.Window({
                    closable: true,
                    modal: true,
                    width: 500,
                    height: 250,
                    cls: 'mktModalForm',
                    title: "Please Wait for Page to Load",
                    html: "<u>Saving Edits to Hero Background & Button Background Color</u> <br>Wait until this page completely loads before closing. <br><br><u>To Disable This Feature:</u> <br>Clear the selected company via the MarketoLive extension.",
                });
            waitForReloadMsg = new Ext.Window({
                    closable: true,
                    modal: true,
                    width: 500,
                    height: 250,
                    cls: 'mktModalForm',
                    title: "Please Wait for Page to Reload",
                    html: "<u>Saving Edits to Logo, Title, & Subtitle</u> <br>Wait for this page to reload automatically. <br><br><u>To Disable This Feature:</u> <br>Clear the selected company via the MarketoLive extension.",
                });
            
            if (logo != null) {
                company = logo.split("https://logo.clearbit.com/")[1].split(".")[0];
                companyName = company.charAt(0).toUpperCase() + company.slice(1);
                title = companyName + " Invites " + title;
            } else {
                title = "We Invite " + title;
            }
            
            editAssetVars = function (asset) {
                var assetVars = asset.getResponsiveVarValues(),
                isLandingPageEditorFragmentStore,
                count = 0,
                isTitleUpdated = isSubtitleUpdated = false;
                
                waitForLoadMsg = new Ext.Window({
                        closable: true,
                        modal: true,
                        width: 500,
                        height: 250,
                        cls: 'mktModalForm',
                        title: "Please Wait for Page to Load",
                        html: "<u>Saving Edits</u> <br>Wait until this page completely loads before closing. <br><br><u>To Disable This Feature:</u> <br>Clear the selected company via the MarketoLive extension.",
                    });
                waitForLoadMsg.show();
                
                isLandingPageEditorComponentStore = window.setInterval(function () {
                        if (asset.componentsStore
                             && asset.componentsStore.getAt
                             && asset.componentsStore.findExact
                             && Mkt3.controller
                             && Mkt3.controller.editor
                             && Mkt3.controller.editor.predefinedLayoutLandingPage
                             && Mkt3.controller.editor.predefinedLayoutLandingPage.LPEditorPredefinedLayout
                             && Mkt3.controller.editor.predefinedLayoutLandingPage.LPEditorPredefinedLayout.prototype
                             && Mkt3.controller.editor.predefinedLayoutLandingPage.LPEditorPredefinedLayout.prototype.updateRichTextComponent) {
                            if (!isTitleUpdated
                                 && asset.componentsStore.findExact("name", "title")
                                 && asset.componentsStore.getAt(asset.componentsStore.findExact("name", "title"))
                                 && asset.componentsStore.getAt(asset.componentsStore.findExact("name", "title")).fragmentsStore
                                 && asset.componentsStore.getAt(asset.componentsStore.findExact("name", "title")).fragmentsStore.data
                                 && asset.componentsStore.getAt(asset.componentsStore.findExact("name", "title")).fragmentsStore.data.items
                                 && asset.componentsStore.getAt(asset.componentsStore.findExact("name", "title")).fragmentsStore.data.items[0]) {
                                var newTitle = asset.componentsStore.getAt(asset.componentsStore.findExact("name", "title")).fragmentsStore.data.items[0];
                                
                                newTitle.data.content = newTitle.data.body = "<div>" + title + "</div>";
                                Mkt3.controller.editor.predefinedLayoutLandingPage.LPEditorPredefinedLayout.prototype.updateRichTextComponent.call(Mkt3.app.controllers.get("Mkt3.controller.editor.predefinedLayoutLandingPage.LPEditorPredefinedLayout"), newTitle);
                                isTitleUpdated = true;
                            }
                            
                            if (!isSubtitleUpdated
                                 && asset.componentsStore.findExact("name", "subtitle")
                                 && asset.componentsStore.getAt(asset.componentsStore.findExact("name", "subtitle"))
                                 && asset.componentsStore.getAt(asset.componentsStore.findExact("name", "subtitle")).fragmentsStore
                                 && asset.componentsStore.getAt(asset.componentsStore.findExact("name", "subtitle")).fragmentsStore.data
                                 && asset.componentsStore.getAt(asset.componentsStore.findExact("name", "subtitle")).fragmentsStore.data.items
                                 && asset.componentsStore.getAt(asset.componentsStore.findExact("name", "subtitle")).fragmentsStore.data.items[0]) {
                                var newSubtitle = asset.componentsStore.getAt(asset.componentsStore.findExact("name", "subtitle")).fragmentsStore.data.items[0];
                                
                                newSubtitle.data.content = newSubtitle.data.body = subtitle;
                                Mkt3.controller.editor.predefinedLayoutLandingPage.LPEditorPredefinedLayout.prototype.updateRichTextComponent.call(Mkt3.app.controllers.get("Mkt3.controller.editor.predefinedLayoutLandingPage.LPEditorPredefinedLayout"), newSubtitle);
                                isSubtitleUpdated = true;
                            }
                            
                            if (count > 1000
                                 || (isSubtitleUpdated
                                     && isTitleUpdated)) {
                                console.log("Marketo Demo App > Updated: Landing Page Title & Subtitle: " + count);
                                window.clearInterval(isLandingPageEditorComponentStore);
                            }
                            
                            count++;
                        }
                    }, 0);
                
                asset.setResponsiveVarValue(headerBgColor, color);
                asset.setResponsiveVarValue(headerLogoImg, logo);
                asset.setResponsiveVarValue(heroBgImg, heroBackground);
                //asset.setResponsiveVarValue(heroTitle, title);
                //asset.setResponsiveVarValue(heroSubtitle, subtitle);
                asset.setResponsiveVarValue(formButtonBgColor, color);
                asset.setResponsiveVarValue(footerLogoImg, logo);
                
                for (var ii = 0; ii < Object.keys(assetVars).length; ii++) {
                    var currVariableKey = Object.keys(assetVars)[ii],
                    currVariableValue = Object.values(assetVars)[ii].toString();
                    
                    if (currVariableValue == null) {
                        currVariableValue = "";
                    }
                    
                    if (currVariableKey.search(logoRegex) != -1) {
                        if (currVariableValue.search(httpRegEx) != -1) {
                            waitForLoadMsg.show();
                            asset.setResponsiveVarValue(currVariableKey, logo);
                        }
                    } else if (currVariableKey.search(heroBgRegex) != -1) {
                        if (currVariableValue.search(httpRegEx) != -1) {
                            waitForLoadMsg.show();
                            asset.setResponsiveVarValue(currVariableKey, heroBackground);
                        }
                    } else if (currVariableKey.search(titleRegex) != -1) {
                        if (currVariableValue.search(textRegex) != -1) {
                            waitForLoadMsg.show();
                            asset.setResponsiveVarValue(currVariableKey, title);
                        }
                    } else if (currVariableKey.search(subtitleRegex) != -1) {
                        if (currVariableValue.search(textRegex) != -1) {
                            waitForLoadMsg.show();
                            asset.setResponsiveVarValue(currVariableKey, subtitle);
                        }
                    } else if (currVariableKey.search(buttonBgColorRegex) != -1) {
                        if (currVariableValue.search(colorRegex) != -1) {
                            waitForLoadMsg.show();
                            asset.setResponsiveVarValue(currVariableKey, color);
                        }
                    } else if (currVariableKey.search(buttonBorderColorRegex) != -1) {
                        if (currVariableValue.search(colorRegex) != -1) {
                            waitForLoadMsg.show();
                            asset.setResponsiveVarValue(currVariableKey, color);
                        }
                    }
                }
                
                if (waitForLoadMsg.isVisible()) {
                    window.setTimeout(function () {
                        //Mkt3.app.controllers.get("Mkt3.controller.editor.LandingPage").loadEditorView();
                        waitForLoadMsg.hide();
                    }, 7500);
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
                                 && Mkt3.app.controllers.get("Mkt3.controller.editor.LandingPage").getLandingPage().setResponsiveVarValue
                                 && Mkt3.app.controllers.get("Mkt3.controller.editor.LandingPage").getLandingPage()) {
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
            var httpRegEx = new RegExp("^http|^$", "i"),
            textRegex = new RegExp("^[^#]|^$", "i"),
            colorRegex = new RegExp("^#[0-9a-f]{3,6}$|^rgb|^$", "i"),
            logoIds = ["heroLogo", "footerLogo", "headerLogo", "logoFooter", "logo"],
            heroBgRegex = new RegExp("heroBackground|hero-background|heroBkg|hero-bkg|heroBg|hero-bg", "i"),
            titleIds = ["title", "heroTitle", "mainTitle"],
            subtitleIds = ["subtitle", "herosubTitle"],
            buttonBgColorRegex = new RegExp("^(heroButtonBgColor|hero-button-bg-color|heroButtonBackgroundColor|hero-button-background-color|heroBkgColor|hero-bkg-color|)$", "i"),
            buttonBorderColorRegex = new RegExp("^(heroButtonBorderColor|hero-button-border-color|heroBorderColor|hero-border-color|)$", "i"),
            logo = APP.getCookie("logo"),
            heroBackground = APP.getCookie("heroBackground"),
            color = APP.getCookie("color"),
            title = "You To<br>PREMIER BUSINESS EVENT<br>OF THE YEAR",
            subtitle = APP.getHumanDate(),
            titleMatch,
            company,
            companyName,
            editHtml,
            editAssetVars,
            waitForLoadMsg,
            waitForReloadMsg;
            
            waitForLoadMsg = new Ext.Window({
                    closable: true,
                    modal: true,
                    width: 500,
                    height: 250,
                    cls: 'mktModalForm',
                    title: "Please Wait for Page to Load",
                    html: "<u>Saving Edits to Hero Background & Button Background Color</u> <br>Wait until this page completely loads before closing. <br><br><u>To Disable This Feature:</u> <br>Clear the selected company via the MarketoLive extension.",
                });
            waitForReloadMsg = new Ext.Window({
                    closable: true,
                    modal: true,
                    width: 500,
                    height: 250,
                    cls: 'mktModalForm',
                    title: "Please Wait for Page to Reload",
                    html: "<u>Saving Edits to Logo, Title, & Subtitle</u> <br>Wait for this page to reload automatically. <br><br><u>To Disable This Feature:</u> <br>Clear the selected company via the MarketoLive extension.",
                });
            
            if (logo != null) {
                company = logo.split("https://logo.clearbit.com/")[1].split(".")[0];
                companyName = company.charAt(0).toUpperCase() + company.slice(1);
                title = companyName + " Invites " + title;
                titleMatch = companyName + " Invites";
            } else {
                title = "We Invite " + title;
                titleMatch = "We Invite";
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
                                 && currElement.className.search("mktoImg") != -1
                                 && currElement.getElementsByTagName("img")[0]
                                 && currElement.getElementsByTagName("img")[0].getAttribute("src") != logo) {
                                console.log("Marketo Demo App > Replacing: Logo > " + logo);
                                
                                isLogoReplaced = true;
                                currElement.getElementsByTagName("img")[0].setAttribute("src", logo);
                            }
                        }
                    }
                    
                    if (title) {
                        for (var ii = 0; ii < titleIds.length; ii++) {
                            var currElement = response.getElementById(titleIds[ii]);
                            if (currElement
                                 && currElement.className.search("mktoText") != -1
                                 && currElement.innerHTML != title
                                 && currElement.innerHTML.search(titleMatch) == -1) {
                                console.log("Marketo Demo App > Replacing: Title > " + title);
                                
                                isTitleReplaced = true;
                                currElement.innerHTML = title;
                                break;
                            }
                        }
                    }
                    
                    if (subtitle) {
                        for (var ii = 0; ii < subtitleIds.length; ii++) {
                            var currElement = response.getElementById(subtitleIds[ii]);
                            if (currElement
                                 && currElement.className.search("mktoText") == -1
                                 && currElement.innerHTML != subtitle
                                 && currElement.innerHTML.search(subtitle) != -1) {
                                console.log("Marketo Demo App > Replacing: Subtitle > " + subtitle);
                                
                                isSubtitleReplaced = true;
                                currElement.innerHTML = subtitle;
                                break;
                            }
                        }
                    }
                    
                    if (isLogoReplaced
                         || isTitleReplaced
                         || isSubtitleReplaced) {
                        var updateHtml;
                        
                        updateHtml = function () {
                            APP.webRequest('/emaileditor/updateContent2', 'ajaxHandler=MktSession&mktReqUid=' + new Date().getTime() + Ext.id(null, ':') + '&emailId=' + Mkt3.DL.dl.compId + '&content=' + encodeURIComponent(new XMLSerializer().serializeToString(response)) + '&xsrfId=' + MktSecurity.getXsrfId(), 'POST', "", function (result) {
                                console.log(result);
                                window.stop();
                                window.location.reload();
                            });
                        };
                        
                        if (waitForLoadMsg.isVisible()) {
                            waitForLoadMsg.hide();
                        }
                        waitForReloadMsg.show();
                        updateHtml();
                    }
                });
            };
            
            editAssetVars = function (asset) {
                var assetVars = asset.getVariableValues();
                
                for (var ii = 0; ii < Object.keys(assetVars).length; ii++) {
                    var currVariableKey = Object.keys(assetVars)[ii]
                        currVariableValue = Object.values(assetVars)[ii];
                    
                    if (currVariableValue == null) {
                        currVariableValue = "";
                    }
                    
                    if (currVariableKey.search(heroBgRegex) != -1) {
                        if (currVariableValue != heroBackground
                             && currVariableValue.search(httpRegEx) != -1) {
                            waitForLoadMsg.show();
                            asset.setVariableValue(currVariableKey, heroBackground);
                        }
                    } else if (currVariableKey.search(buttonBgColorRegex) != -1) {
                        if (currVariableValue != color
                             && currVariableValue.search(colorRegex) != -1) {
                            waitForLoadMsg.show();
                            asset.setVariableValue(currVariableKey, color);
                        }
                    } else if (currVariableKey.search(buttonBorderColorRegex) != -1) {
                        if (currVariableValue != color
                             && currVariableValue.search(colorRegex) != -1) {
                            waitForLoadMsg.show();
                            asset.setVariableValue(currVariableKey, color);
                        }
                    }
                }
                
                if (waitForLoadMsg.isVisible()) {
                    window.setTimeout(function () {
                        Mkt3.app.controllers.get("Mkt3.controller.editor.email2.EmailEditor").reloadIframeContent();
                        waitForLoadMsg.hide();
                    }, 7500);
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
                            if (!waitForReloadMsg.isVisible()
                                 && typeof(Mkt3) !== "undefined"
                                 && Mkt3
                                 && Mkt3.app
                                 && Mkt3.app.controllers
                                 && Mkt3.app.controllers.get("Mkt3.controller.editor.email2.EmailEditor")
                                 && Mkt3.app.controllers.get("Mkt3.controller.editor.email2.EmailEditor").getEmail()
                                 && Mkt3.app.controllers.get("Mkt3.controller.editor.email2.EmailEditor").getEmail().getVariableValues()
                                 && Object.keys(Mkt3.app.controllers.get("Mkt3.controller.editor.email2.EmailEditor").getEmail().getVariableValues()).length != 0
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
                 && currCompFragment.search(mktoDesignersFragmentMatch) != -1
                 && currUrlFragment.search(/[0-9]+$/) != -1) {
                console.log("Marketo Demo App > Location: Designers/Wizards");
                
                switch (currCompFragment) {
                case mktoLandingPageEditFragment:
                    console.log("Marketo Demo App > Location: Landing Page Editor");
                    
                    APP.overlayLandingPage("edit");
                    APP.editAssetVariables("landingPage", "edit");
                    break;
                    
                case mktoLandingPagePreviewFragment:
                    console.log("Marketo Demo App > Location: Landing Page Previewer");
                    
                    APP.overlayLandingPage("preview");
                    APP.editAssetVariables("landingPage", "preview");
                    break;
                    
                case mktoLandingPagePreviewDraftFragment:
                    console.log("Marketo Demo App > Location: Landing Page Draft Previewer");
                    
                    APP.overlayLandingPage("preview");
                    APP.editAssetVariables("landingPage", "preview");
                    break;
                    
                case mktoEmailEditFragment:
                    if (currUrlFragment.search(mktoEmailPreviewFragmentRegex) == -1) {
                        console.log("Marketo Demo App > Location: Email Editor");
                        
                        APP.overlayEmail("edit");
                        APP.editAssetVariables("email", "edit");
                    } else {
                        console.log("Marketo Demo App > Location: Email Previewer");
                        
                        APP.overlayEmail("preview");
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