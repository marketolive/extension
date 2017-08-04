console.log("ToutApp > Running");

/**************************************************************************************
 *
 *  This module contains all of the functionality needed for preventing unwanted
 *  manipulation of the ToutApp.
 *
 *  @Author Brian Fisher
 *
 *  @namespace
 *
 **************************************************************************************/

var TOUT = TOUT || {};

/**************************************************************************************
 *
 *  This function removes harmful toolbar buttons in ToutApp
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

TOUT.removeToolbarButtons = function () {
  var startTime = new Date(),
  isToolbar = window.setInterval(function () {
      var currTime = new Date();
      
      if (document.getElementById("nav-win")) {
        console.log("ToutApp > Removing: Harmful Toolbar Buttons");
        
        window.clearInterval(isToolbar);
        
        document.getElementById("nav-win").remove();
      } else if (parseInt((currTime - startTime) / 1000) > 5) {
        console.log("ToutApp > NOT Removing: Harmful Toolbar Buttons");
        
        window.clearInterval(isToolbar);
      }
    });
};

/**************************************************************************************
 *
 *  Main
 *
 **************************************************************************************/

TOUT.removeToolbarButtons();