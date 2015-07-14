/**************************************************************************************
 *
 *  This module contains all of the functionality needed for the
 *  manipulation of the Marekto GUI. It handles the overwriting needed
 *  to overlay the MarketoLive functionality onto the Marketo product. It
 *  is loaded by the MarketoLive plugin, and largely involved manipulation 
 *  of the Marketo GUI itself.
 *
 *  @Author Andy, Arrash, Brian
 *
 *  @namespace
 *
 **************************************************************************************/

var DEMO = DEMO || {}

/**************************************************************************************
 *  
 *  This function disables auto-save of Smart Campaigns while maintaining the
 *  correct order of the steps. I.E. The old bug where a flow step shows as 'undefined'
 *  will be erradicated.
 *
 *  @Author Brian
 *
 *  @function
 *
 **************************************************************************************/

DEMO.disableAutoSave = function () {
    Mkt.widgets.DataPanelManager.prototype.save =
        function (cause, dp, acceptUpdates) {
            this._updateDataPanelOrder(true);
        }
}

/**************************************************************************************
 *
 *  This will run inside the updateCSS function and will see if what analyzer the user is on
 *  which will aid in setting the CSS around the selected analyzer
 *
 *
 *  @Author Arrash
 *
 *  @function
 *  @param pod {PODS.Pod} - The object representing the user's pod. This will determine
 *                          which URLs that the scripts should be using.
 *
 *  @namespace location
 *  @namespace urlCompare
 *
 **************************************************************************************/

DEMO.urlCheck = function (pod) {
    var location = window.location.href;
    for (var y = 0; y < pod.valueSet.length; y++) {
        if (location == pod.valueSet[y].url) {
            return pod.valueSet[y].position;
        }
    }
}

/**************************************************************************************
 *
 *  This will update all the CSS around the div that is selected in the container
 *  It does this using Jquery functions to get the parent and the siblings related
 *  to the current position and the parent
 *
 *  @Author Arrash
 *
 *  @function
 *
 *  @namespace currentPosition
 *
 **************************************************************************************/

DEMO.updateCSS = function (pod) {
    $ = jQuery.noConflict();
    var currentPosition = DEMO.urlCheck(pod);
    currentPosition = '#' + currentPosition;
    $(currentPosition).parent().css('display', 'block');
    $(currentPosition).parent().siblings().css('display', 'none');
    $(currentPosition).removeClass('analyzer-button').addClass('analyzer-title');
    $(currentPosition).siblings().removeClass('analyzer-title').addClass('analyzer-button');
    $("#modeler,#success-path-analyzer,#opportunity-influence-analyzer,#program-analyzer").bind("click", function (e) {
        DEMO.chooseAnalyzer(e.target, pod);
    });
}

/**************************************************************************************
 *
 *  this method will listen for the user clicking on a specific div in the
 *  template. We are then going to direct them to the correct URL.
 *
 *  @Author Arrash
 *
 *  @function
 *
 *  @namespace id
 *
 *  @param {ele} passes in the element that was clicked from the
 *
 **************************************************************************************/

DEMO.chooseAnalyzer = function (ele, pod) {
    var id = ele.id,
        currPosition;
    //updates the currPosition based on the div selected
    for (var x = 0; x < pod.valueSet.length; x++) {
        if (id == pod.valueSet[x].position)
            currPosition = x;
    }
    window.location = pod.valueSet[currPosition].url;
    DEMO.updateCSS(pod);
}

/**************************************************************************************
 *
 *  This function contains the control logic for which of the above functions to
 *  call. This compensates for users staying inside of Marketo instead of exiting
 *  the product page to click on another MarketoLive use case tile. It will be used
 *  as the callback function for window.onload and window.onhashchange.
 *
 *  @Author Andy
 *
 *  @function
 *
 *  @namespace id
 *
 *  @param {ele} passes in the element that was clicked from the
 *
 **************************************************************************************/

DEMO.demo = function (pod) {

    var currentUrl = window.location.href;

//    if (currentUrl.search("#ME") != -1) {
//        DEMO.enableTokenEditing();
//    }

/************************************************************************************
    // This section just overwrites the Marketo function that
    // is checking for the demo plugin to be installed. This will
    // be deprecated when we go live.
    else if (currentUrl.search("marketo.com") != -1) {
        console.log("About to overwrite");
        MktPage.validateDemoPlugin = function () {
            console.log("overwritten")
        }
        setTimeout(function () {
            MktPage.demoPluginWindow.hide();
        }, 3000);
    }
************************************************************************************/
    // Replicate Success
    //    else if (currentUrl == "https://na-sjp.marketodesigner.com/email/emailPreview?emailId=10010&explictHostname=app-sjp.marketo.com") {
    //        DEMO.tokenUpdated();
    //    }

    // Powerful Automation
//    else if (currentUrl.search("#SC") != -1) {
//        DEMO.loadSmartListCanvas();
//        DEMO.loadFlowCanvas();
//    }

    // Marketing ROI, Funnel Analysis
    else if (currentUrl.search("#RCM39B2") != -1 ||
             currentUrl.search("#RCM5A1!") != -1 ||
             currentUrl.search("#AR1559A1") != -1 ||
             currentUrl.search("#AR1682A1!") != -1) {
        DEMO.updateCSS(pod);
    }

    // DIY Design -- ASK BRIAN ABOUT THIS
    else if (currentUrl.search(".marketodesigner.com") != -1 ||
             currentUrl.search(".marketo.com/m#") != -1) {
        Mkt3.data.Store.prototype.sync = function () {};
        Ext4.data.Model.prototype.destroy = function () {};
    }
}

/**************************************************************************************
 *
 *  Main
 *  
 **************************************************************************************/

var pod = new PODS.Pod(PODS.getCookie("userPod"));

window.onload = function () {
    MktPage.validateDemoPlugin = function () {};
    DEMO.disableAutoSave();
    DEMO.demo(pod);
}

window.onhashchange = DEMO.demo(pod);
