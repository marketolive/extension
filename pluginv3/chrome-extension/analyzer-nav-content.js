console.log("Analyzer Nav > Running");

/**************************************************************************************
 *
 *  This module contains all of the functionality needed for enabling dynamic landing 
 *  pages and emails within Marketo's Designer.
 *
 *  @Author Brian Fisher
 *
 *  @namespace
 *
 **************************************************************************************/

var URL_PATH = "m3-dev",
MARKETO_GLOBAL_APP_LOCATION = "https://marketolive.com/" + URL_PATH + "/pluginv3/marketo-global-app.min.js",

ANALYZER = ANALYZER || {};

/**************************************************************************************
 *
 *  This function loads the given script source.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {String} scriptSrc - The URL of the desired script.
 *  @param {String} onLoad - The onload function to be set.
 *
 **************************************************************************************/

ANALYZER.loadScript = function (scriptSrc) {
    console.log("Analyzer Nav > Loading: Script: " + scriptSrc);
    
    var scriptElement = document.createElement("script");
    scriptElement.async = true;
    scriptElement.src = scriptSrc;
    document.getElementsByTagName("head")[0].appendChild(scriptElement);
};

/**************************************************************************************
 *
 *  This function issues an HTTP request.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {String} url - The HTTP request URL.
 *  @param {String} params - The parameters to pass in the body of the request.
 *  @param {String} method - The HTTP request method (e.g. GET, POST, PATCH).
 *  @param {String} responseType - The type of the response (e.g. document, json, text).
 *  @param {Function} callback - The callback function.
 *
 **************************************************************************************/

ANALYZER.webRequest = function (url, params, method, async, responseType, callback) {
    //console.log("Web Request > " + url + "\n" + params);
    var xmlHttp = new XMLHttpRequest(),
    result;
    xmlHttp.onreadystatechange = function () {
        if (typeof(callback) === "function"
             && xmlHttp.readyState == 4
             && xmlHttp.status == 200)
            result = callback(xmlHttp.response);
    }
    if (async
         && xmlHttp.responseType) {
        xmlHttp.responseType = responseType;
    }
    xmlHttp.open(method, url, async); // true for asynchronous
    xmlHttp.send(params);
    return result;
};

/**************************************************************************************
 *
 *  This method will insert an HTML template and a CSS sheet inside the template
 *  directly into the header of the Marketo page via "Import" and runs asynchronously.
 *  Then it binds the 'prev' and 'next' elements with a click function so that whenever
 *  they are clicked it will call chooseAnalyzer and pass the element clicked.
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

ANALYZER.showNavBar = function () {
    ANALYZER.webRequest('https://marketolive.com/dev/pluginv3/html/analyzer.html', null, 'GET', true, 'text', function (response) {
        var newElement = document.createElement("div");
        
        newElement.innerHTML = response;
        document.body.appendChild(newElement);
        ANALYZER.updateNavBar();
    };
    
    /*
    var xmlHttp = new XMLHttpRequest(),
    pageLoaded,
    newElement;
    
    xmlHttp.open("GET", "https://marketolive.com/dev/pluginv3/html/analyzer.html", false);
    xmlHttp.send();
    pageLoaded = function () {
        newElement = document.createElement("div");
        newElement.innerHTML = xmlHttp.responseText;
        document.body.appendChild(newElement);
    };
    */
};

/**************************************************************************************
 *
 *  This function contains the control logic for injecting the Analyzer Navigation Bar
 *  that allows for easy switching between analyzers without returning to the folder tree.
 *
 *  @Author Arrash Yasavolian
 *
 *  @function
 *
 **************************************************************************************/

ANALYZER.updateNavBar = function () {
    var isPodsLoaded = window.setInterval(function () {
            if (typeof(PODS) !== "undefined") {
                console.log("Marketo App > Injecting: Analyzer Navigation Bar");
                
                window.clearInterval(isPodsLoaded);
                
                var pod = new PODS.Pod(PODS.getCookie("userPod"));
                
                for (var y = 0; y < pod.valueSet.length; y++) {
                    if (currentUrl == pod.valueSet[y].url) {
                        console.log("Marketo App > Updating: CSS for Analyzer Navigation Bar");
                        
                        // This code block swaps the colors of the analyzer labels depending on which one the user is currently viewing.
                        $j = jQuery.noConflict();
                        var currPosition = '#' + pod.valueSet[y].position;
                        $j(currPosition).parent().css('display', 'block');
                        $j(currPosition).parent().siblings().css('display', 'none');
                        $j(currPosition).removeClass('analyzer-button').addClass('analyzer-title');
                        $j(currPosition).siblings().removeClass('analyzer-title').addClass('analyzer-button');
                        $j("#modeler,#success-path-analyzer,#opportunity-influence-analyzer,#program-analyzer").bind("click", function (e) {
                            console.log("Marketo App > Identifying: Current Analyzer");
                            
                            // Updates the currPosition based on the div selected
                            for (var x = 0; x < pod.valueSet.length; x++) {
                                if (e.target.id == pod.valueSet[x].position) {
                                    currPosition = x;
                                }
                            }
                            window.location = pod.valueSet[currPosition].url;
                        });
                    }
                }
            }
        }, 0);
};

/**************************************************************************************
 *
 *  Main
 *
 **************************************************************************************/

var origOnLoad;

if (typeof(window.onload) === "function"
     && typeof(origOnLoad) !== "function") {
    origOnLoad = window.onload;
}

window.onload = function () {
    //DESIGN.loadScript(MARKETO_GLOBAL_APP_LOCATION);
    ANALYZER.showNavBar();
    
    if (typeof(origOnLoad) === "function") {
        origOnLoad.apply(this, arguments);
    }
};