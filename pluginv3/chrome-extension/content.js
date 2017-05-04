var URL_PATH = "m3",
MARKETO_GLOBAL_APP_LOCATION = "https://marketolive.com/" + URL_PATH + "/pluginv3/marketo-global-app.min.js",
GLOBAL_LANDING_PAGE_SCRIPT_LOCATION = "https://marketolive.com/" + URL_PATH + "/pluginv3/global-landing-page.min.js",
MARKETO_OTHER_APP_SCRIPT_LOCATION = "https://marketolive.com/" + URL_PATH + "/pluginv3/marketo-other-app.min.js",
ASSET_NAV_BAR_LOCATION = "https://marketolive.com/" + URL_PATH + "/v3/assets.html",
currentUrl = window.location.href,
mktoAppDomain = "^https:\/\/app-[a-z0-9]+\.marketo\.com",
mktoLoginDomain = "^https:\/\/login\.marketo\.com|^https:\/\/app\.marketo\.com",
mktoLoginPathName = "/homepage/login",
mktoDesignerDomain = "^https:\/\/[a-z0-9]+-[a-z0-9]+\.marketodesigner\.com",
mktoWizardDomain = mktoAppDomain + "/m#",
mktoEmailInsightsDomain = "^https://sj-ee-api\.marketo\.com",
mktoWebPersonalizationUrl = "^https://(sjrtp3\.marketo\.com|sjrtp1\.marketo\.com)/app/",
mktoPredictiveContentUrl = "^https://(sjrtp3\.marketo\.com|sjrtp1\.marketo\.com)/app/predictive-app/",
mktoSeoDomain = "^https://seo.marketo.com",

mktoLiveDevLandingPageDomain = "^http:\/\/pages-dev\.marketolive\.com",
mktoLiveProdLandingPageDomain = "^http:\/\/pages\.marketolive\.com",
mktoLandingPageDomain = "^http:\/\/[^\.]+\.marketo\.com\/lp\/[0-9]{3}-[a-zA-Z]{3}-[0-9]{3}\/.*",
mktoGlobalLandingPageDomains = "(" + mktoLiveDevLandingPageDomain + "|" + mktoLiveProdLandingPageDomain + "|" + mktoLandingPageDomain + ")",

loadScript,
getCookie,
setCookie,
sendBackgroundMsg,
isExtensionError,
displayProgressModal,
grayOutCompletedStories;

/**************************************************************************************
 *
 *  This function loads the given script source.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {String} scriptSrc - The URL of the desired script.
 *  @param {String} onLoad - The onload function to be set.
 *
 **************************************************************************************/

loadScript = function (scriptSrc) {
    console.log("Content > Loading: Script: " + scriptSrc);
    
    var scriptElement = document.createElement("script");
    scriptElement.async = true;
    scriptElement.src = scriptSrc;
    document.getElementsByTagName("head")[0].appendChild(scriptElement);
};

/**************************************************************************************
 *
 *  This function sets the specified cookie for the current domain.
 *
 *  @Author Andrew Garcia
 *
 *  @function
 *
 *  @param {String} name - The name of the cookie.
 *  @param {String} value - The value of the cookie.
 *  @param {int} expiresInDays - The expiration date of the cookie in days.
 *  @param {String} domain - The domain of the cookie.
 *  @param {boolean} secure - Whether the cookie should be marked as Secure.
 *
 **************************************************************************************/

setCookie = function (name, value, expiresInDays, domain, secure) {
    console.log("Content > Setting: " + name + " Cookie for " + domain);
    
    var d = new Date(),
    expires;
    d.setTime(d.getTime() + (expiresInDays * 24 * 60 * 60 * 1000));
    expires = "expires=" + d.toGMTString();
    document.cookie = name + "=" + value + "; " + expires + "; " + "path=/;" + "domain=" + domain + ";secure=" + secure + ";";
};

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

getCookie = function (cookieName) {
    console.log("Content > Getting: Cookie " + cookieName);
    
    var name = cookieName + '=',
    cookies = document.cookie.split(';'),
    currCookie;
    
    for (var ii = 0; ii < cookies.length; ii++) {
        currCookie = cookies[ii].trim();
        if (currCookie.indexOf(name) == 0) {
            return currCookie.substring(name.length, currCookie.length);
        }
    }
    console.log("Content > Getting: Cookie " + cookieName + " not found");
    return null;
};

/**************************************************************************************
 *
 *  Main
 *
 **************************************************************************************/

console.log("Content > Running");

window.onload = function () {
    console.log("Content > Window: Loaded");
    
    if ((currentUrl.search(mktoAppDomain) != -1
             || currentUrl.search(mktoDesignerDomain) != -1
             || currentUrl.search(mktoWizardDomain) != -1)
         && window.location.pathname != mktoLoginPathName
         && currentUrl.search(mktoLoginDomain) == -1) {
        console.log("Content > Location: Marketo URL");
        
        loadScript(MARKETO_GLOBAL_APP_LOCATION);
        
        if (currentUrl.search(mktoDesignerDomain) != -1) {
            console.log("Content > Location: Marketo Designer");
            
            var getHumanDate,
            overlayEmail,
            overlayLandingPage;
            
            /**************************************************************************************
             *
             *  This function returns the current date in a human-readable format.
             *
             *  @Author Brian Fisher
             *
             *  @function
             *
             **************************************************************************************/
            
            getHumanDate = function () {
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
             *  This function overlays a landing page with the user submitted company logo and color.
             *
             *  @Author Brian Fisher
             *
             *  @function
             *
             *  @param {String} action - The mode in which this asset is being viewed (edit/preview).
             *
             **************************************************************************************/
            
            overlayLandingPage = function (action) {
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
                saveEditsToggle = getCookie("saveEditsToggleState"),
                logo = getCookie("logo"),
                heroBackground = getCookie("heroBackground"),
                color = getCookie("color"),
                defaultColor = "rgb(42, 83, 112)",
                logoOrigMaxHeight = "55",
                mktoMainText = "You To Our Event",
                mktoSubText = getHumanDate(),
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
             *  This function overlays an email with the user submitted company logo and color.
             *
             *  @Author Brian Fisher
             *
             *  @function
             *
             *  @param {String} action - The mode in which this asset is being viewed (edit/preview).
             *
             **************************************************************************************/
            
            overlayEmail = function (action) {
                console.log("Content > Overlaying: Email");
                
                var isEmailEditor2,
                clearOverlayVars,
                overlay,
                isMktoHeaderBgColorReplaced = isMktoImgReplaced = isMktoHeroBgReplaced = isMktoTextReplaced = isMktoSubTextReplaced = isMktoButtonReplaced = isMktoEmail1Replaced = editorPrevReady = desktopPrevReady = phonePrevReady = isDesktopPreviewReplaced = isPhonePreviewReplaced = false,
                logoMktoNameRegex = new RegExp("logo", "i"),
                mainTitleMktoNameRegex = new RegExp("^main title$|^mainTitle$|^main-title$|^hero title$|^heroTitle$|^hero-title$|^title$", "i"),
                subTitleMktoNameRegex = new RegExp("^subtitle$|^sub-title$|^hero subtitle$|^heroSubtitle$|^hero-subtitle$", "i"),
                buttonTextRegex = new RegExp("signup|sign up|call to action|cta|register|more|contribute", "i"),
                saveEditsToggle = getCookie("saveEditsToggleState"),
                logo = getCookie("logo"),
                heroBackground = getCookie("heroBackground"),
                color = getCookie("color"),
                defaultColor = "rgb(42, 83, 112)",
                logoMaxHeight = "55",
                mktoMainText = "You<br>PREMIER BUSINESS EVENT<br>OF THE YEAR",
                mktoSubText = getHumanDate(),
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
             *  This function creates an event listener in order to capture the setting of a new
             *  value for the company logo cookie when a new company has been submitted via popup.
             *  This enables the overlay for both emails and landing pages to change accordingly
             *  without requiring a tab refresh.
             *
             *  @Author Brian Fisher
             *
             *  @function
             *
             *  @param [Object] message - JSON object that contains the following key/value pairs:
             *      {String} action - The name of the requested action.
             *      {String} assetType - The type of the asset for this request.
             *      {String} assetView - The mode in which this asset is being viewed (edit/preview).
             *  @param {MessageSender} sender - An object containing information about the script
             *      context that sent a message.
             *  @param {function} sendResponse - Function to call when you have a response.
             *
             **************************************************************************************/
            
            chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
                switch (message.action) {
                case "newCompany":
                    console.log("Content > Capturing: New Company");
                    switch (message.assetType) {
                    case "email":
                        if (message.assetView == "edit") {
                            console.log("Content > Capturing: New Company for Email Designer");
                            overlayEmail("edit");
                        } else if (message.assetView == "preview") {
                            console.log("Content > Capturing: New Company for Email Previewer");
                            overlayEmail("preview");
                        }
                        break;
                    case "landingPage":
                        if (message.assetView == "edit") {
                            console.log("Content > Capturing: New Company for Landing Page Designer");
                            overlayLandingPage("edit");
                        } else if (message.assetView == "preview") {
                            console.log("Content > Capturing: New Company for Landing Page Previewer");
                            overlayLandingPage("preview");
                        }
                        break;
                    }
                    break;
                }
            });
            
        } else if (currentUrl.search(mktoWizardDomain) == -1
             && currentUrl.search(mktoDesignerDomain) == -1) {
            
            var oppInfluenceAnalyzerFragment = "#AR1559A1!",
            programAnalyzerFragment = "#AR1544A1!",
            modelerFragment = "#RCM70A1!",
            modelerPreviewFragment = "\\?preview=true&approved=true/#RCM70A1!",
            successPathAnalyzerFragment = "#AR1682A1!",
            analyzerFragmentsMatch = mktoAppDomain + "/(" + oppInfluenceAnalyzerFragment + "|" + programAnalyzerFragment + "|" + modelerFragment + "|" + modelerPreviewFragment + "|" + successPathAnalyzerFragment + ")";
            
            if (currentUrl.search(analyzerFragmentsMatch) != -1) {
                console.log("Content > Location: Analyzers");
                
                var Analyzer;
                
                /**************************************************************************************
                 *
                 *  main object that will pass the variables for which analyzer should be present using
                 *  currPosition as the current position in the object array.
                 *
                 *  @Author Arrash
                 *
                 *  @class
                 *
                 **************************************************************************************/
                
                Analyzer = function (pod) {
                    console.log("Content > Constructor: Analyzer");
                    
                    this.currPosition = 0;
                    this.pod = pod;
                };
                
                /**************************************************************************************
                 *
                 *  This method will insert an HTML template and a CSS sheet inside the template
                 *  directly into the header of the Marketo page via "Import" and runs asynchronously.
                 *  Then it binds the 'prev' and 'next' elements with a click function so that whenever
                 *  they are clicked it will call chooseAnalyzer and pass the element clicked.
                 *
                 *  @Author Arrash
                 *
                 *  @function
                 *
                 *  @namespace link
                 *  @namespace importedDoc
                 *  @namespace el
                 *
                 **************************************************************************************/
                
                Analyzer.prototype.showAnalyzer = function () {
                    console.log("Content > Displaying: Analyzer Navigation Bar");
                    
                    var xmlHttp = new XMLHttpRequest(),
                    pageLoaded,
                    newElement;
                    
                    xmlHttp.open("GET", "https://marketolive.com/dev/pluginv3/html/analyzer.html", false);
                    xmlHttp.send();
                    pageLoaded = function () {
                        newElement = document.createElement("div");
                        newElement.innerHTML = xmlHttp.responseText;
                        document.body.appendChild(newElement);
                    };
                    window.onload = pageLoaded();
                };
                
                Analyzer.prototype.showAnalyzer();
            }
        }
    } else if (currentUrl.search(mktoGlobalLandingPageDomains) != -1) {
        console.log("Content > Location: Global Landing Page");
        
        loadScript(GLOBAL_LANDING_PAGE_SCRIPT_LOCATION);
    
    } else if (currentUrl.search(mktoEmailInsightsDomain) != -1
         || currentUrl.search(mktoWebPersonalizationUrl) != -1
         || currentUrl.search(mktoSeoDomain) != -1) {
        console.log("Content > Location: Marketo Other App");
        
        loadScript(MARKETO_OTHER_APP_SCRIPT_LOCATION);
    }
};