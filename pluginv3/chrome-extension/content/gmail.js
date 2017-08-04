console.log("Gmail > Running");

/**************************************************************************************
 *
 *  This module contains all of the functionality needed for manipulating the DOM on 
 *  gmail.
 *
 *  @Author Brian Fisher
 *
 *  @namespace
 *
 **************************************************************************************/

var APP = APP || {};

/**************************************************************************************
 *
 *  This function removes the Tout App Toolbar banner in Gmail.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.removeToutAppBanner = function () {
  var startTime = new Date(),
  isToutAppBanner = window.setInterval(function () {
      var currTime = new Date();
      
      if (document.getElementById("mailToolbarDiv")) {
        console.log("Gmail > Removing: ToutApp Banner");
        
        window.clearInterval(isToutAppBanner);
        
        document.getElementById("mailToolbarDiv").remove();
      } else if (parseInt((currTime - startTime) / 1000) > 5) {
        console.log("Gmail > NOT Removing: ToutApp Banner");
        
        window.clearInterval(isToutAppBanner);
      }
    });
};

/**************************************************************************************
 *
 *  Main
 *
 **************************************************************************************/

window.onload = function () {
  APP.removeToutAppBanner();
};