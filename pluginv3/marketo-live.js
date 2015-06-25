console.log("script loading");

// Default Workspace Check: MktCanvas.activeTab.config.accessZoneId == 1

/**************************************************************************************
 *
 *  This module contains all of the functionality needed for the
 *  manipulation of the marketolive.com website. It handles the deep
 *  linking of the tiles, manipulation of the UI, cookie checking etc.
 *  It is loaded onto the page by the Marketo Live plugin. It largely uses
 *  jQuery to interact with DOM elements and inject new bahavior.
 *
 *
 *  @Author Andy, Arrash
 *
 *  @namespace
 *
 **************************************************************************************/

var LIVE = LIVE || {};

/**************************************************************************************
 *
 *  This function injects the deep links onto the homepage based on which
 *  pod that the user is in.
 *
 *
 *  @Author Andy
 *
 *  @function
 *  @param pod {PODS.Pod} - The pod object that stores all of the
 *                          user's links for that subscription.
 *
 **************************************************************************************/

LIVE.insertDeepLinks = function (pod) {
    $(".marketo-live-option").click(function (e) {
        window.open(pod[$(this).context.id]);
    });
}

/**************************************************************************************
 *
 *  This function inserts the login credentials for 250ok. Since
 *  we only have one account for the whole team, everyone needs
 *  to use the same set of credentials.
 *
 *
 *  @Author Andy
 *
 *  @function
 *
 **************************************************************************************/

LIVE.emailDeliverabilityLogin = function () {
    $(document).ready(function () {
        $.getJSON("deliverability-login.json", function (login) {
            $("#email").value = login.username;
            $("#password").value = login.password;
        });
    });
}

/**************************************************************************************
 *
 *  This function retrieves the value of the cookie field that is
 *  given by the cname parameter.
 *
 *
 *  @Author Andy
 *
 *  @function
 *  @param cookieField {string} -   The desired cookie field such as "userPod" which
 *                                  be used to construct a user's pod object.
 *
 **************************************************************************************/

LIVE.getCookie = function (cookieField) {
    var name = cookieField + "=",
        cookies = document.cookie.split(';'),
        currentCookie;
    for (var ii = 0; ii < cookies.length; ++ii) {
        var currentCookie = cookies[ii].trim();
        if (currentCookie.indexOf(name) == 0)
            return currentCookie.substring(name.length, currentCookie.length);
    }
    return null;
}

LIVE.setCookie = function (cookieField, cookieValue, expiresIn) {
    var d = new Date(),
        expires;
    d.setTime(d.getTime() + (expiresIn * 24 * 60 * 60 * 1000));
    expires = "expires=" + d.toUTCString();
    document.cookie = cookieField + "=" + cookieValue + "; " + expires;
}

// TODO: Separate RTP code?
//    pod = new Pod(getCookie("userPod"));
//    console.log(pod);
//    insertDeepLinks(pod);

Mkt.widgets.DataPanelLayout.prototype.initComponent = function () {
    this.dpEditable = true;
    // Turn off debugging in case someone has clobbered the value
    DPDEBUG = false;
    if (this.dpSubtype) {
        this.addClass('mktDataPanelLayout-' + this.dpSubtype);
    }
    if (this.canvas) MktCanvas.mask(this.canvas);
    // Data Panel Type (dpType).
    // Data Panels currently support two modes: 'Smartlist' and 'Flow'.
    if (this.dpType == 'Smartlist') {
        this.isSmartlist = true;
        this.Flow = false;
        this.SETTINGS = 'conditions';
    } else if (this.dpType == 'Flow') {
        this.isSmartlist = false;
        this.isFlow = true;
        this.SETTINGS = 'actions';
    }

    // Create a panel framework/layout to arrange the manager and palette
    this.items = [];
    this.items.push({
        region: 'center',
        margins: !MktPage.isFeatureEnabled('carbolt') ? '7 5 10 10' : '',
        layout: 'fit',
        items: this.createManager()
    });

    if (this.dpEditable && this.canvas && this.paletteWidth > 0) {
        this.canvasWidth = MktCanvas.getWidth();
        var availableWidth = Math.min(this.canvasWidth - 700, this.maxPaletteWidth);
        this.paletteWidth = Math.max(this.paletteWidth, availableWidth);

        this.items.push({
            cls: 'mktEastPanel',
            region: 'east',
            margins: !MktPage.isFeatureEnabled('carbolt') ? '5 5 5 8' : '0 0 0 15',
            layout: 'fit',
            width: this.paletteWidth,
            items: this.createPalette()
        });
    }

    Mkt.widgets.DataPanelLayout.superclass.initComponent.apply(this);

    if (this.canvas) MktPage.canvasCleanupStack.push(this.canvasCleanup.createDelegate(this));

    if (this.canvas) this.extendCanvasToolbar();
    if (this.canvas) this.extendCanvasGutter();

    // Hook to access this object from canvas
    if (this.canvas) {
        MktCanvas.addHook(this.canvas, {
            dp: this
        });
    }
}

/**************************************************************************************
 *
 *  This function retrieves the value of the cookie field that is
 *  given by the cname parameter.
 *
 *
 *  @Author Andy
 *
 *  @function
 *  @param cookieField {string} -   The desired cookie field such as "userPod" which
 *                                  be used to construct a user's pod object.
 *
 **************************************************************************************/
LIVE.loadFlowCanvas = function () {
    var canvas = 'campaignCanvasDetailFlow';
    var lockTabs = [canvas, 'smartCampaignOverview', 'campaignCanvasDetailSchedule'];

    var tbarMessage = '';


    Mkt.apps.campaigns.loadFlowCanvas = function () {
        var dpl = new Mkt.widgets.DataPanelLayout({
            canvas: canvas,
            phpModule: 'smartcampaigns',
            appVarsBase: 'smartCampaign',
            dpType: 'Flow',
            welcomeTargetMessage: "Drag flow actions from the right",
            paletteWidth: 175,
            paletteWatermarkCls: 'mki128Cubes',
            dpEditable: true,
            tbarMessage: tbarMessage,
            beforeSaveHook: function () {
                MktPage.clearPanelContentValid('smartCampaignOverview');
                MktCanvas.lockTabs(lockTabs, "Saving Smart Campaign...");
            },
            afterSaveHook: function () {
                MktCanvas.unlockTabs(lockTabs);
            }
        });

        MktCanvas.fillCanvas(dpl, canvas);
    };

    Mkt.apps.campaigns.readyToLoadFlowCanvas = function () {
        return MktLang.currLanguage == 'en_US' || Mkt.apps.LeadAttribs.isInitialized();
    };

    MktCanvas.prepareAndFillCanvas({
        readyToLoadCanvas: Mkt.apps.campaigns.readyToLoadFlowCanvas,
        loadCanvas: Mkt.apps.campaigns.loadFlowCanvas
    });

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

LIVE.urlCheck = function (pod) {
    var location = window.location.href;
    for (var y = 0; y < pod.valueSet.length; y++) {
        console.log(location);
        console.log(pod.valueSet[y].url);
        //        if (location.indexOf(pod.valueSet[y].url) != -1){
        if (location == pod.valueSet[y].url) {

            console.log(pod.valueSet[y].position, pod.valueSet[y].url);

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

LIVE.updateCSS = function (pod) {
    $ = jQuery.noConflict();
    var currentPosition = LIVE.urlCheck(pod);
    currentPosition = '#' + currentPosition;
    $(currentPosition).parent().css('display', 'block');
    $(currentPosition).parent().siblings().css('display', 'none');
    $(currentPosition).removeClass('analyzer-button').addClass('analyzer-title');
    $(currentPosition).siblings().removeClass('analyzer-title').addClass('analyzer-button');
    $("#modeler,#success-path-analyzer,#opportunity-influence-analyzer,#program-analyzer").bind("click", function (e) {
        LIVE.chooseAnalyzer(e.target, pod);
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

LIVE.chooseAnalyzer = function (ele, pod) {
    var id = ele.id,
        currPosition;
    //updates the currPosition based on the div selected
    for (var x = 0; x < pod.valueSet.length; x++) {
        if (id == pod.valueSet[x].position)
            currPosition = x;
    }
    window.location = pod.valueSet[currPosition].url;
    LIVE.updateCSS(pod);
}

LIVE.tokenUpdated = function () {
    storage = localStorage;
    var img = $('#location-image').find("img");
    //   switch (storage.getItem('RoadshowCity')){
    switch (LIVE.getCookie('RoadshowCity')) {
        case 'Boston':
            img.src = 'http://na-sjp.marketo.com/rs/026-COU-482/images/boston-skyline.jpg';
        default:
            img.src = 'http://na-sjp.marketo.com/rs/026-COU-482/images/new-york-skyline.jpg';
    }
    document.getElementById('ext-comp-1034').innerHTML = storage.getItem('RoadshowCity');
    document.getElementById('roadshow-city').innerHTML = storage.getItem('RoadshowCity');
    document.getElementById('roadshow-date').innerHTML = storage.getItem('RoadshowDate');
}


/**************************************************************************************
 *
 *  this method will insert an HTML template and a CSS sheet inside the template directly
 *  into the header of the Turner Technologies page. This will add a button to return the user
 *  directly back to the campaign page within RTP for Turner Technologies.
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

// CORS is blocking this. Might need to do inline.
/*
LIVE.rtpToMarketo = function () {
    var jscript_lib = document.createElement('link');
    jscript_lib.setAttribute('rel', 'import');
    jscript_lib.setAttribute('href', '/pluginv3/html/turner-rtp.html');
    document.getElementsByTagName('head')[0].appendChild(jscript_lib);
    var link = document.querySelector('link[rel="import"]');
    link.addEventListener('load', function (e) {
        var importedDoc = link.import,
            el = importedDoc.querySelector('#marketo-return-button-container');
        console.log(el);
        document.body.appendChild(el.cloneNode(true));
        $("#marketo-return-button-inner-container").bind("click", function (e) {
            location.href = 'https://sjrtp6.marketo.com/app/editReaction.do?reactionId=750';
        });
    });
}
*/

//we're going to create an instance of the analyzer
//and then call showAnalyzer to actually build out the template and CSS onto the page
window.onload = function () {
    console.log("window loaded");
    var podString = LIVE.getCookie("userPod");
    if (!podString) {
        podString = "app-sjp";
        LIVE.setCookie("userPod", podString, 365);
    }
    pod = new PODS.Pod(podString);

    if (window.location.href.search("marketolive.com") != -1) {
        LIVE.insertDeepLinks(pod);
    }

    if (window.location.href.search("marketo.com") != -1) {
        console.log("About to overwrite");
        MktPage.validateDemoPlugin = function () {
            console.log("overwritten")
        }
        setTimeout(function () {
            MktPage.demoPluginWindow.hide();
        }, 3000);
    }

    if (window.location.href.search("#RCM39B2") != -1 ||
        window.location.href.search("#RCM5A1!") != -1 ||
        window.location.href.search("#AR1559A1") != -1 ||
        window.location.href.search("#AR1682A1!") != -1) {
        LIVE.updateCSS(pod);
    }

    if (window.location.href == "https://na-sjp.marketodesigner.com/email/emailPreview?emailId=10010&explictHostname=app-sjp.marketo.com") {
        LIVE.tokenUpdated();
    }

    if (window.location.href.search("#SC") != -1) {
        //        LIVE.loadSmartListCanvas();
        //        LIVE.loadFlowCanvas();
    }

    if (window.location.href.search("#ME") != -1) {
        Mkt.apps.customtoken.TokenGridPanel.prototype.createDataStore =
            function (rowEditor) {
                // JsonWriter that just submits all data as parameters rather than as Json data
                var writer = new Ext.data.JsonWriter({
                    encode: true,
                    writeAllFields: true
                });

                // JsonReader which is configured to parse the json data correctly
                var reader = new Ext.data.JsonReader({
                    root: 'data',
                    idProperty: 'id',
                    successProperty: 'success',
                    messageProperty: 'errors',
                    fields: this.tokenFields
                });

                /********** Event listeners for the HTTP Proxy **********/
                // Handler for exceptions and successful writes to the proxy.
                // Called after successful or failed writes to the server
                // Used to display errors and change any UI things in the grid or store
                var httpProxyWriteAndErrorHandler = function (proxy, response, record) {
                    MktSession.unclockCursor();

                    // If there is no row editor rendered we don't need to do anything - should not happen
                    // We enable toggling again just in case
                    if (!rowEditor.rendered) {
                        rowEditor.grid.getView().toggleGroup = MktGrids.GroupingView.prototype.toggleGroup;
                        return;
                    }

                    // On successfull write
                    if (response.success) {
                        // Take the row editor out of edit mode (needed for drag and drop) and hide it.
                        rowEditor.editing = false;
                        rowEditor.hide();

                        // Reenables toggling of groups
                        rowEditor.grid.getView().toggleGroup = MktGrids.GroupingView.prototype.toggleGroup;

                        // Reloads whole grid if the item changed groups
                        if (record.data.source != response.data[0].source) {
                            rowEditor.grid.store.reload();
                        }
                        // Just resort the grid otherwise
                        else {
                            var sortee = rowEditor.grid.store.getSortState();
                            rowEditor.grid.store.sort(sortee.field, sortee.direction);
                        }
                    }
                    // On failed write, reject changes in the store and show error message
                    else {
                        rowEditor.grid.getStore().rejectChanges();
                        rowEditor.showTooltip(rowEditor.formatTooltipErrors(response.message));
                    }
                    // Persist the tooltip if an error occurred so we keep displaying the message
                    rowEditor.persistTooltip = !response.success;
                };

                // Wrapper functions that format the parameters for write and exception notifications
                var writeCallback = function (proxy, action, data, response, rs, options) {
                    this.writeInProgress = false;
                    httpProxyWriteAndErrorHandler(proxy, response, rs);
                };

                // There are two types of exceptions that this function will handle:
                // success=false returned from the response and HTTP status codes other than 200
                var writeCallbackException = function (proxy, type, action, options, response) {
                    this.writeInProgress = false;
                    // If there is an http error set the response to false
                    if (type === 'response') {
                        response.success = true;

                        var tokenBlob = JSON.parse(options.params.data);
                        tokenBlob['token'] = tokenBlob['token'].replace(/\s/g, "");
                        //                        localStorage.setItem(tokenBlob['token'], tokenBlob['value']);
                        LIVE.setCookie(tokenBlob['token'], tokenBlob['value']);
                        //console.log(tokenBlob['token']);
                        //console.log(tokenBlob['value']);

                        // This is the hook to the Phone home message and navigating to login upong session timeout
                        //this.fireEvent('loadexception', proxy, reader, response);
                    }
                    // Handle updating the UI and store
                    httpProxyWriteAndErrorHandler(proxy, response);
                };

                // Clock the cursor before writing data to the server
                var beforeWriteCallback = function (proxy, action, rs) {
                    if (this.writeInProgress) {
                        return false;
                    } else {
                        this.writeInProgress = true;
                        MktSession.clockCursor();
                    }
                };
                /*******************************************/
                // HttpProxy configuration with configured listeners
                var proxy = new Ext.data.HttpProxy({
                    api: {
                        read: '/folder/getTokenData',
                        create: '/folder/createTokenData',
                        update: '/folder/updateTokenData',
                        destroy: '/folder/deleteTokenData'
                    },
                    listeners: {
                        exception: writeCallbackException,
                        write: writeCallback,
                        beforeWrite: beforeWriteCallback
                    }
                });
                // -----------------------------------------------//

                // Finally the grouping store is put together
                var ds = new Ext.data.GroupingStore({
                    proxy: proxy,
                    writer: writer,
                    reader: reader,
                    sortInfo: {
                        field: 'token',
                        direction: "ASC"
                    },
                    groupField: 'source',
                    baseParams: {
                        nodeId: this.nodeId
                    },
                    remoteSort: false,
                    autoSave: false // Autosave is false because we want the row editor to control saving
                });

                return ds;
            }
    }
}
