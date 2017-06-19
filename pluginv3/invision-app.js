console.log("InVision App > Running");

/**************************************************************************************
 *
 *  This script contains all of the functionality needed for preventing unwanted
 *  manipulation of the InVision App. It handles the login process to ensure that users
 *  are entered into the correct subscription. This script is loaded by the marketoLive
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
  
  var password;
  
  switch (feature) {
    // ABM & New Capabilities > Account Insight
  case "P9BBA0KDS":
    password = "@mktgnation2017";
    break;
    
    // ABM > Comprehensive Account View
  case "TVBBAV9WU":
    password = "@mktgnation2017";
    break;
    
    // Analytics & New Capabilities > CMO Insights & Marketing Insights
  case "PYBBDHHDU":
    password = "@mktgnation2017";
    break;
    
    // Analytics & New Capabilities > Web Insights
  case "M4BAV7W6F":
    password = "@mktgnation2017";
    break;
    
    // Engagement Platform & New Capabilities > Systems Monitoring
  case "93BD9WQJX":
    password = "@mktgnation2017";
    break;
    
    // Engagement Platform & New Capabilities > Mktg Performance Benchmark
  case "KFBBABWHJ":
    password = "@mktgnation2017";
    break;
    
    // New Capabilities > Adaptive Engagement
  case "P3BBAZ3CS":
    password = "@mktgnation2017";
    break;
    
    // Marketing Performance Insights
  case "52C0GAGD4":
    password = "@mktgnation2017";
    break;
    
  default:
    password = "@mktgnation2017";
    break;
  }
  
  document.getElementById("password").value = password;
  document.getElementsByClassName("primary button")[0].click();
}

/**************************************************************************************
 *
 *  Main
 *
 **************************************************************************************/

if (document.getElementById("password")
   && document.getElementsByClassName("primary button")[0]
   && window.location.href.search("^https://marketo\.invisionapp\.com/share/") != -1) {
  INVISION.login(window.location.href.split("/share/")[1].split("#/")[0]);
}