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

var currentUrl = window.location.href,
INVISION = INVISION || {};

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
        // ABM & New Capabilities > Account Insight
    case "P9BBA0KDS":
        document.getElementById("password").value = "@mktgnation2017";
        break;
        // ABM > Comprehensive Account View
    case "TVBBAV9WU":
        document.getElementById("password").value = "@mktgnation2017";
        break;
        // Analytics & New Capabilities > CMO Insights & Marketing Insights
    case "PYBBDHHDU":
        document.getElementById("password").value = "@mktgnation2017";
        break;
        // Analytics & New Capabilities > Web Insights
    case "M4BAV7W6F":
        document.getElementById("password").value = "@mktgnation2017";
        break;
        // Engagement Platform & New Capabilities > Systems Monitoring
    case "":
        document.getElementById("password").value = "@mktgnation2017";
        break;
        // Engagement Platform & New Capabilities > Mktg Performance Benchmark
    case "KFBBABWHJ":
        document.getElementById("password").value = "@mktgnation2017";
        break;
        // New Capabilities > New User Experience
    case "":
        document.getElementById("password").value = "@mktgnation2017";
        break;
        // New Capabilities > Adaptive Engagement
    case "P3BBAZ3CS":
        document.getElementById("password").value = "@mktgnation2017";
        break;
    default:
        document.getElementById("password").value = "@mktgnation2017";
        break;
    }
    document.getElementsByClassName("primary button")[0].click();
}

/**************************************************************************************
 *  
 *  Main
 *
 **************************************************************************************/

if (document.getElementById("password")
    && document.getElementsByClassName("primary button")[0]
    && currentUrl.search("^https:\/\/marketo\.invisionapp\.com\/share\/") != -1) {
    INVISION.login(currentUrl.split("/share/")[1].split("#/")[0]);
}