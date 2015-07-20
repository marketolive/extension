console.log("Loading: Marketo App script");

/**************************************************************************************
 *
 *  Global Constants
 *
 **************************************************************************************/

var currentUrl = window.location.href,
    mktoAppDomain = "^https:\/\/app-[a-z0-9]+\.marketo\.com",
    mktoLiveDomain = "^https:\/\/marketolive.com",
    mktoLoginDomain = "^https:\/\/login\.marketo\.com",
    mktoAppLoginDomain = "^https:\/\/app\.marketo\.com",
    mktoDesigner = "^https:\/\/.*\.marketodesigner\.com/",
    mktoWizard = mktoAppDomain+"/m#",
    rtpDemoDomain = "^http://sjrtp1.marketo.com/demo/$|^http://cloud4.insightera.com/demo/$",
    emailDeliverabilityDomain = "^https:\/\/250ok.com/",
    isMktoLiveInstance = false;

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
 *  This function disables saving of Smart Campaigns while maintaining the correct 
 *  order of the steps (the previous bug where a flow step shows as 'undefined' has  
 *  been eradicated).
 *
 *  @Author Brian
 *
 *  @function
 *
 **************************************************************************************/

DEMO.disableSmartCampaignSaving = function () {
	console.log("Disabling: Saving for Smart Campaigns");
    Mkt.widgets.DataPanelManager.prototype.save =
        function (cause, dp, acceptUpdates) {
            this._updateDataPanelOrder(true);
        }
}

/**************************************************************************************
 *  
 *  This function disables saving for the Editors (emails, forms, push notifications, 
 *  and social apps).
 *
 *  @Author Brian
 *
 *  @function
 *
 **************************************************************************************/

DEMO.disableEditorSaving = function () {
	console.log("Disabling: Saving for Editors");
	Mkt3.data.Store.prototype.sync = function () {};
	Ext4.data.Model.prototype.destroy = function () {};
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
    $j = jQuery.noConflict();
    var currentPosition = DEMO.urlCheck(pod);
    currentPosition = '#' + currentPosition;
    $j(currentPosition).parent().css('display', 'block');
    $j(currentPosition).parent().siblings().css('display', 'none');
    $j(currentPosition).removeClass('analyzer-button').addClass('analyzer-title');
    $j(currentPosition).siblings().removeClass('analyzer-title').addClass('analyzer-button');
    $j("#modeler,#success-path-analyzer,#opportunity-influence-analyzer,#program-analyzer").bind("click", function (e) {
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

DEMO.discardLandingPageDrafts(lpIds) {
	console.log("Discarding: Landing Page drafts");
    mktLPLManager.doModifyPages('revert', lpIds);
}

//<---- This function limits the capability to create more than 3 nurture programs in the target workspace
DEMO.limitNurturePrograms = function () {
    var myMsg = 'Demo Only';
    var originalFn = Mkt.apps.marketingEvent.MarketingEventForm.prototype.beforeSubmitCallback;
    Mkt.apps.marketingEvent.MarketingEventForm.prototype.beforeSubmitCallback = function () {
        var limit_exceeded = false,
            rootNode = MktExplorer.boundTree.root,
            compType = "Nurture Program",
            matches = [],
            node = rootNode.cascade(function () {
                var attr = this.attributes;
                if (attr && attr.xtra) {
                    if (attr.xtra.compType == compType && attr.xtra.accessZoneId == MktCanvas.activeTab.config.accessZoneId) {
                        matches.push(this);
                    }
                }
            }, undefined, [compType]);
        //console.log(matches.length);
        if (matches.length >= 3) {
            limit_exceeded = true;
        }
        if (limit_exceeded == true) {
            var message = 'Demo workspaces are limited to 3 nurture programs.';
            var a_nl_messageBox = Ext.MessageBox.show({
                title: myMsg,
                msg: message,
                width: 400,
                closable: true
            });
            setTimeout(a_nl_messageBox.show, 1000);
            return false;
        } else {
            return originalFn.apply(this, arguments);
        }
    }
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

    // Marketing ROI, Funnel Analysis
    if (currentUrl.search(mktoAppDomain + "/#RCM39B2") != -1 
    || currentUrl.search(mktoAppDomain + "/#RCM5A1") != -1 
    || currentUrl.search(mktoAppDomain + "/#AR1559A1") != -1 
    || currentUrl.search(mktoAppDomain + "/#AR1682A1") != -1) {
        DEMO.updateCSS(pod);
    }

    // DIY Design (Emails, Forms, Push Notifications, Social Apps)
    else if (currentUrl.search(mktoDesigner) != -1 
    || currentUrl.search(mktoWizard) != -1) {
        DEMO.disableEditorSaving;
    }
}

/**************************************************************************************
 *
 *  Main
 *  
 **************************************************************************************/

if (window.location.href.search(mktoAppDomain) != -1 && window.location.href.search(mktoLoginDomain) == -1 && window.location.href.search(mktoAppLoginDomain) == -1) {
    //console.log("Location: Marketo URL");
    window.mkto_live_plugin_state = true;
    var isMktPageInterval = window.setInterval(function () {
        //console.log("MktPage = "+typeof(MktPage));
        if (typeof (MktPage) !== "undefined") {
            if (MktPage.savedState.custPrefix.search("mktodemoaccount") != -1 && (MktPage.userid.search("\.demo@marketo\.com") != -1 || MktPage.userid.search("admin@mktodemoaccount") != -1)) {
                console.log("Overwriting: MktPage.validateDemoPlugin");
                MktPage.demoPluginWindow.hide();
                MktPage.validateDemoPlugin = function () {};
                isMktoLiveInstance = true;
				
				// Powerful Automation
				DEMO.disableSmartCampaignSaving();

                var pod = new PODS.Pod(PODS.getCookie("userPod")),
					lpIds = {};

                switch (MktPage.savedState.custPrefix) {
                    case "mktodemoaccount106":
                        // Landing Page
                        lpIds["dpageid_8703"] = "dpageid_8703";
                        // Responsive Landing Page
                        lpIds["dpageid_11291"] = "dpageid_11291";
                        break;
                    case "mktodemoaccount106a":
                        // Landing Page
                        lpIds["dpageid_8703"] = "dpageid_8703";
                        // Responsive Landing Page
                        lpIds["dpageid_10454"] = "dpageid_10454";
                        break;
                    case "mktodemoaccount106b":
                        // Landing Page
                        lpIds["dpageid_10760"] = "dpageid_10760;
						// Responsive Landing Page
                        lpIds["dpageid_10762"] = "dpageid_10762";
                        break;
                }

                // DIY Design (Landing Pages)
				DEMO.discardLandingPageDrafts(lpIds);
				
                DEMO.limitNurturePrograms();
                DEMO.demo(pod);

                window.onhashchange = function () {
                    DEMO.demo(pod);
                }
            }
            window.clearInterval(isMktPageInterval);
        }
    }, 0);
}