var URL_PATH = "m3-dev",
MARKETO_LIVE_APP_SCRIPT_LOCATION = "https://marketolive.com/" + URL_PATH + "/pluginv3/marketo-app.min.js",
MARKETO_DEMO_APP_SCRIPT_LOCATION = "https://marketolive.com/" + URL_PATH + "/pluginv3/marketo-demo-app.min.js",
POD_SCRIPT_LOCATION = "https://marketolive.com/" + URL_PATH + "/pluginv3/pods.min.js",
DASHBOARD_SCRIPT_LOCATION = "https://marketolive.com/" + URL_PATH + "/pluginv3/dashboards/remote-data.min.js",
HEAP_ANALYTICS_SCRIPT_LOCATION = "https://marketolive.com/" + URL_PATH + "/pluginv3/heap-analytics.min.js",
disableDemoPluginCheck,
loadScript,
isMktoPageGlobal;

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
/*
disableDemoPluginCheck = function () {
    console.log("Marketo Global App > Disabling: Demo Plugin Check");
    
    window.mkto_live_plugin_state = true;
    
    if (MktPage
         && MktPage.validateDemoPlugin) {
        MktPage.validateDemoPlugin = function () {};
    }
};*/

/**************************************************************************************
 *
 *  This function loads the given script source.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {String} scriptSrc - The URL of the desired script.
 *
 **************************************************************************************/

loadScript = function (scriptSrc) {
    console.log("Marketo Global App > Loading: Script: " + scriptSrc);
    
    var scriptElement = document.createElement("script");
    scriptElement.async = true;
    scriptElement.src = scriptSrc;
    document.getElementsByTagName("head")[0].appendChild(scriptElement);
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
    console.log("Marketo Global App > Getting: Cookie " + cookieName);
    
    var name = cookieName + '=',
    cookies = document.cookie.split(';'),
    currCookie;
    
    for (var ii = 0; ii < cookies.length; ii++) {
        currCookie = cookies[ii].trim();
        if (currCookie.indexOf(name) == 0) {
            return currCookie.substring(name.length, currCookie.length);
        }
    }
    console.log("Marketo Global App > Getting: Cookie " + cookieName + " not found");
    return null;
};

/**************************************************************************************
 *
 *  This function edits the variables within the Landing Page Editor for custom company.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {String} mode - Mode view (edit, preview)
 *  @param {Object} asset - The email asset to be edited
 *
 **************************************************************************************/

editLandingPageVariables = function (mode, asset) {
    var httpRegEx = new RegExp("^http", "i"),
    textRegex = new RegExp("^[^#]", "i"),
    colorRegex = new RegExp("^(#[0-9a-f]{3,6}|rgb)$", "i"),
    logoRegex = new RegExp("logo|headerLogo|header-logo", "i"),
    heroBgRegex = new RegExp("heroBackground|hero-background|heroBkg|hero-bkg|heroBg|hero-bg|hero1Bg|hero-1-bg|hero1Bkg|hero-1-bkg|hero1Background", "i"),
    titleRegex = new RegExp("^(mainTitle|main-title|heroTitle|hero-title|title)$", "i"),
    subtitleRegex = new RegExp("^(subtitle|sub-title|heroSubtitle|hero-subtitle)$", "i"),
    buttonBgColorRegex = new RegExp("^(heroButtonBgColor|hero-button-bg-color|heroButtonBackgroundColor|hero-button-background-color|heroBkgColor|hero-bkg-color)$", "i"),
    buttonBorderColorRegex = new RegExp("^(heroButtonBorderColor|hero-button-border-color|heroBorderColor|hero-border-color)$", "i"),
    headerBgColor = "headerBgColor",
    formButtonBgColor = "formButtonBgColor",
    logo = getCookie("logo"),
    heroBackground = getCookie("heroBackground"),
    color = getCookie("color"),
    title = "You<br><br>PREMIER BUSINESS EVENT<br>OF THE YEAR",
    company,
    companyName,
    editAssetVars;
    
    if (logo == null
         && heroBackground == null
         && color == null) {
        return false;
    }
    if (logo != null) {
        company = logo.split("https://logo.clearbit.com/")[1].split(".")[0];
        companyName = company.charAt(0).toUpperCase() + company.slice(1);
        title = companyName + " Invites " + title;
    } else {
        title = "We Invite " + title;
    }
    
    var editAssetVars = function (asset) {
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
    
    console.log("Content > Editing: Landing Page Variables");
    
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
                        console.log("Content > Editing: Landing Page Editor Variables");
                        
                        window.clearInterval(isLandingPageEditorVariables);
                        
                        editAssetVars(Mkt3.app.controllers.get("Mkt3.controller.editor.LandingPage").getLandingPage());
                    }
                }, 0);
        }
    } else if (mode == "preview") {
        console.log("Content > Editing: Landing Page Previewer Variables");
    }
};

/**************************************************************************************
 *
 *  This function edits the variables within the Email Editor for custom company.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {String} mode - Mode view (edit, preview)
 *  @param {Object} asset - The email asset to be edited
 *
 **************************************************************************************/

editEmailVariables = function (mode, asset) {
    var httpRegEx = new RegExp("^http", "i"),
    textRegex = new RegExp("^[^#]", "i"),
    colorRegex = new RegExp("^(#[0-9a-f]{3,6}|rgb)$", "i"),
    logoRegex = new RegExp("logo|headerLogo|header-logo", "i"),
    heroBgRegex = new RegExp("heroBackground|hero-background|heroBkg|hero-bkg|heroBg|hero-bg", "i"),
    titleRegex = new RegExp("^(mainTitle|main-title|heroTitle|hero-title|title)$", "i"),
    subtitleRegex = new RegExp("^(subtitle|sub-title|heroSubtitle|hero-subtitle)$", "i"),
    buttonBgColorRegex = new RegExp("^(heroButtonBgColor|hero-button-bg-color|heroButtonBackgroundColor|hero-button-background-color|heroBkgColor|hero-bkg-color)$", "i"),
    buttonBorderColorRegex = new RegExp("^(heroButtonBorderColor|hero-button-border-color|heroBorderColor|hero-border-color)$", "i"),
    logo = getCookie("logo"),
    heroBackground = getCookie("heroBackground"),
    color = getCookie("color"),
    title = "You<br><br>PREMIER BUSINESS EVENT<br>OF THE YEAR",
    company,
    companyName,
    editAssetVars;
    
    if (logo == null
         && heroBackground == null
         && color == null) {
        return false;
    }
    if (logo != null) {
        company = logo.split("https://logo.clearbit.com/")[1].split(".")[0];
        companyName = company.charAt(0).toUpperCase() + company.slice(1);
        title = companyName + " Invites " + title;
    } else {
        title = "We Invite " + title;
    }
    
    var editAssetVars = function (asset) {
        var assetVars = asset.getVariableValues();
        
        for (var ii = 0; ii < Object.keys(assetVars).length; ii++) {
            var currVariableKey = Object.keys(assetVars)[ii],
            currVariableValue = Object.values(assetVars)[ii].toString();
            
            if (currVariableKey.search(logoRegex) != -1) {
                if (currVariableValue.search(httpRegEx) != -1) {
                    asset.setVariableValue(currVariableKey, logo);
                }
            } else if (currVariableKey.search(heroBgRegex) != -1) {
                if (currVariableValue.search(httpRegEx) != -1) {
                    asset.setVariableValue(currVariableKey, heroBackground);
                }
            } else if (currVariableKey.search(titleRegex) != -1) {
                if (currVariableValue.search(textRegex) != -1) {
                    asset.setVariableValue(currVariableKey, title);
                }
            } else if (currVariableKey.search(subtitleRegex) != -1) {
                if (currVariableValue.search(textRegex) != -1) {
                    asset.setVariableValue(currVariableKey, getHumanDate());
                }
            } else if (currVariableKey.search(buttonBgColorRegex) != -1) {
                if (currVariableValue.search(colorRegex) != -1) {
                    asset.setVariableValue(currVariableKey, color);
                }
            } else if (currVariableKey.search(buttonBorderColorRegex) != -1) {
                if (currVariableValue.search(colorRegex) != -1) {
                    asset.setVariableValue(currVariableKey, color);
                }
            }
        }
    };
    
    console.log("Content > Editing: Email Variables");
    
    if (mode == "edit") {
        if (asset) {
            editAssetVars(asset);
        } else {
            var isEmailEditorVariables = window.setInterval(function () {
                    console.log("Content > Waiting: Email Editor Variables");
                    if (typeof(Mkt3) !== "undefined"
                         && Mkt3
                         && Mkt3.app
                         && Mkt3.app.controllers
                         && Mkt3.app.controllers.get("Mkt3.controller.editor.email2.EmailEditor")
                         && Mkt3.app.controllers.get("Mkt3.controller.editor.email2.EmailEditor").getEmail()
                         && Mkt3.app.controllers.get("Mkt3.controller.editor.email2.EmailEditor").getEmail().getVariableValues()
                         && Mkt3.app.controllers.get("Mkt3.controller.editor.email2.EmailEditor").getEmail().setVariableValue) {
                        console.log("Content > Editing: Email Editor Variables");
                        
                        window.clearInterval(isEmailEditorVariables);
                        
                        editAssetVars(Mkt3.app.controllers.get("Mkt3.controller.editor.email2.EmailEditor").getEmail());
                    }
                }, 0);
        }
    } else if (mode == "preview") {
        console.log("Content > Editing: Email Previewer Variables");
    }
};

/**************************************************************************************
 *
 *  Main
 *
 **************************************************************************************/

isMktoPageGlobal = window.setInterval(function () {
        if (typeof(MktPage) !== "undefined"
             && MktPage.savedState
             && MktPage.savedState.custPrefix) {
            console.log("Marketo Global App > Location: Marketo Page");
            
            window.clearInterval(isMktoPageGlobal);
            
            var accountString = MktPage.savedState.custPrefix,
            mktoDemoAccountMatch = "^scdynamics1$|^mktodemoaccount",
            mktoAccountStringQe = "globalsales",
            mktoAccountStringsMatch106 = "^mktodemoaccount106$|^mktodemoaccount106d$|^",
            mktoAccountStringsMatch = "^mktodemoaccount106$|^mktodemoaccount106d$|^" + mktoAccountStringQe + "$",
            currentUrl = window.location.href;
            
            if (accountString.search(mktoAccountStringsMatch) != -1) {
                console.log("Marketo Global App > Location: MarketoLive Instance");
                
//                disableDemoPluginCheck();
                loadScript(MARKETO_LIVE_APP_SCRIPT_LOCATION);
                
                if (accountString.search(mktoAccountStringsMatch106) != -1) {
                    loadScript(HEAP_ANALYTICS_SCRIPT_LOCATION);
                }
                
                var mktoAppDomain = "^https:\/\/app-[a-z0-9]+\.marketo\.com",
                mktoDesignerDomain = "^https:\/\/[a-z0-9]+-[a-z0-9]+\.marketodesigner\.com",
                mktoWizardDomain = mktoAppDomain + "/m#";
                
                if (currentUrl.search(mktoWizardDomain) == -1
                     && currentUrl.search(mktoDesignerDomain) == -1) {
                    loadScript(POD_SCRIPT_LOCATION);
                    loadScript(DASHBOARD_SCRIPT_LOCATION);
                }
            } else if (accountString.search(mktoDemoAccountMatch) != -1) {
                console.log("Marketo Global App > Location: Marketo Demo Instance");
                
                loadScript(MARKETO_DEMO_APP_SCRIPT_LOCATION);
                loadScript(DASHBOARD_SCRIPT_LOCATION);
            } else if (getCookie("toggleState") == "false") {
                console.log("Marketo Global App > toggleState = false");
                
                loadScript(MARKETO_LIVE_APP_SCRIPT_LOCATION);
            }
        }
    }, 0);