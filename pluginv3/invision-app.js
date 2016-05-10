console.log("InVision App > Running");

/**************************************************************************************
 *
 *  This module contains all of the functionality needed for preventing unwanted
 *  manipulation of the InVision App. It handles the login process to ensure that users
 *  are entered into the correct subscription. This module is loaded by the marketoLive 
 *  plugin on the InVision App domain.
 *
 *  @Author Brian Fisher
 *
 *  @namespace
 *
 **************************************************************************************/

var INVISION = INVISION || {};

/**************************************************************************************
 *  
 *  This function automatically fills out the InVision App login form and clicks submit.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

INVISION.login = function (feature) {
    console.log("InVision App > Login: App");
    
    switch (feature) {
        // MME In App Messaging & Dashboard
        case "JR790G0CX":
            document.getElementById("password").value = "MME";
            document.getElementsByClassName("primary button")[0].click();
            break;
        // MME In App Messaging & Dashboard (Old)
        case "MW5CE0YHS":
            document.getElementById("password").value = "MME";
            document.getElementsByClassName("primary button")[0].click();
            break;
        default:
            break;
    }
}

/**************************************************************************************
 *  
 *  Main
 *
 **************************************************************************************/
 
var currentUrl = window.location.href;

if (currentUrl.search("^https:\/\/marketo\.invisionapp\.com\/share\/") != -1) {
    INVISION.login(currentUrl.split("/share/")[1].split("#/")[0]);
}