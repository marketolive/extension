function editEmailVariables (assetView) {
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
    companyName;
    
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
    
    console.log("Content > Editing: Email Variables");
    
    if (assetView == "edit") {
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
                    
                    asset = Mkt3.app.controllers.get("Mkt3.controller.editor.email2.EmailEditor").getEmail();
                    assetVars = asset.getVariableValues();
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
                }
            }, 0);
    } else if (assetView == "preview") {
        console.log("Content > Editing: Email Previewer Variables");
    }
}

function editLandingPageVariables (assetView) {
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
    companyName;
    
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
    
    console.log("Content > Editing: Landing Page Variables");
    
    if (assetView == "edit") {
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
                    
                    asset = Mkt3.app.controllers.get("Mkt3.controller.editor.LandingPage").getLandingPage();
                    assetVars = asset.getResponsiveVarValues();
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
                }
            }, 0);
    } else if (assetView == "preview") {
        console.log("Content > Editing: Landing Page Previewer Variables");
    }
}

function editAssetVariables(assetType, assetView) {
    if (assetType == "email") {
        editEmailVariables(assetView);
    } else if (assetType == "landingPage") {
        editLandingPageVariables(assetView);
    }
}