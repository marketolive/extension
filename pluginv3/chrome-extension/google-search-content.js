console.log("Google Search > Running");

/**************************************************************************************
 *
 *  This module contains all of the functionality needed for enabling dynamic ads
 *  within Google search.
 *
 *  @Author Brian Fisher
 *
 *  @namespace
 *
 **************************************************************************************/

var APP = APP || {};

/**************************************************************************************
 *
 *  This function gets the specified cookie for the current domain. It loops through
 *  the string contained in document.cookie and looks for the given cookie.
 *
 *  @Author Andrew Garcia
 *
 *  @function
 *
 *  @param {String} cookieName - Represents the key to search for inside document.cookie
 *
 **************************************************************************************/

APP.getCookie = function (cookieName) {
    console.log("Getting: Cookie " + cookieName);
    
    var name = cookieName + '=',
    cookies = document.cookie.split(';'),
    currCookie;
    
    for (var ii = 0; ii < cookies.length; ii++) {
        currCookie = cookies[ii].trim();
        if (currCookie.indexOf(name) == 0) {
            return currCookie.substring(name.length, currCookie.length);
        }
    }
    console.log("Getting: Cookie " + cookieName + " not found");
    return null;
};

/**************************************************************************************
 *
 *  This function returns the value of the specified URL parameter.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {String} param - name of the URL parameter
 *
 **************************************************************************************/

APP.getUrlParam = function (param) {
    console.log("Getting: URL Parameter: " + param);
    
    var paramString = window.location.href.split("?")[1];
    
    if (paramString) {
        var params = paramString.split("&"),
        paramPair,
        paramName,
        paramValue;
        
        for (var ii = 0; ii < params.length; ii++) {
            paramPair = params[ii].split("=");
            paramName = paramPair[0];
            paramValue = paramPair[1];
            
            if (paramName == param) {
                paramValue = paramValue.replace(/%20/g, "+");
                console.log("URL Parameter: " + paramName + " = " + paramValue);
                return paramValue;
            }
        }
    }
    return false;
};

/**************************************************************************************
 *
 *  This function waits for the Google search to return it's results and then executes
 *  the given callback function.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {Function} callback
 *
 **************************************************************************************/

APP.waitForResults = function (callback) {
    var isGoogleSearchDone = window.setInterval(function () {
            if (document.getElementById("rso")
                 || document.getElementById("tads")
                 && document.getElementById("tads").getElementsByTagName("ol").length > 0) {
                window.clearInterval(isGoogleSearchDone);
                
                if (typeof(callback) === "function") {
                    callback();
                }
            }
        }, 0);
};

/**************************************************************************************
 *
 *  This function inserts a new top ad in a Google search with the given details.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {Object} ad - the ad information
 *    {String} title - title for the ad's a tag innerHTML
 *    {String} link - URL for the ad's a tag href
 *    {String} linkText - visible URL for the ad's cite tag innerHTML
 *    {String} text - the main text for the ad's div tag innerHTML
 *
 **************************************************************************************/

APP.insertAd = function (ad) {
    if (document.getElementById("tads")) {
        console.log("Google Search > Inserting: Top Ad");
        
        var adSection = document.getElementById("tads").getElementsByTagName("ol")[0],
        topAd = document.createElement("li"),
        adHtml = '<h3><a href="' + ad.link + '" id="ad-link" class="r-iClGEAjvi27Y">' + ad.title + '</a></h3><div class="ads-visurl"><span class="_mB">Ad</span><cite id="ad-link-text" class="_WGk">' + ad.linkText + '</cite><g-bubble class="action-menu ab_ctl r-iHprqp_90NYo"><a href="#" class="g-bbll"><span class="mn-dwn-arw"></span></a></g-bubble></div><div id="ad-main-text" class="ellip ads-creative">' + ad.text + '</div>';
        
        if (ad.title.split("-").length > 1) {
            adHtml += '<ul class="_wEo"><li><a href="' + ad.link + '" id="ad-bottom-link-1">' + ad.title.split("-")[0] + '</a></li><li><a href="' + ad.link + '" id="ad-bottom-link-2">' + ad.title.split("-")[1] + '</a></li></ul>';
        }
        
        topAd.className = "ads-ad";
        topAd.innerHTML = adHtml;
        adSection.insertBefore(topAd, adSection.childNodes[0]);
    } else if (document.getElementById("rso")) {
        console.log("Google Search > Inserting: Only Ad");
        
        var resultsSection = document.getElementById("rso"),
        onlyAd = document.createElement("div"),
        adHtml = '<h3 style="border-color: rgb(84, 84, 84); color: rgb(84, 84, 84); font-family: Roboto, arial, sans-serif; font-size: 18px; font-weight: normal; height: 18px; line-height: 18px; list-style-type: none; margin-bottom: 0px; margin-top: 0px; outline-color: rgb(84, 84, 84); text-align: left; text-decoration: none solid rgb(84, 84, 84); width: 600px; column-rule-color: rgb(84, 84, 84); -webkit-locale: &quot;en&quot;; perspective-origin: 300px 9px; -webkit-text-emphasis-color: rgb(84, 84, 84); -webkit-text-fill-color: rgb(84, 84, 84); -webkit-text-stroke-color: rgb(84, 84, 84); transform-origin: 300px 9px 0px; caret-color: rgb(84, 84, 84);"><a href="' + ad.link + '" id="ad-link" class="r-iClGEAjvi27Y" style="border-color: rgb(26, 13, 171); color: rgb(26, 13, 171); cursor: pointer; font-family: Roboto, arial, sans-serif; font-size: 18px; line-height: 21.6px; outline-color: rgb(26, 13, 171); text-align: left; text-decoration: none solid rgb(26, 13, 171); white-space: nowrap; column-rule-color: rgb(26, 13, 171); -webkit-locale: &quot;en&quot;; -webkit-text-emphasis-color: rgb(26, 13, 171); -webkit-text-fill-color: rgb(26, 13, 171); -webkit-text-stroke-color: rgb(26, 13, 171); caret-color: rgb(26, 13, 171);">' + ad.title + '</a></h3><div class="ads-visurl" style="border-color: rgb(0, 102, 33); color: rgb(0, 102, 33); font-family: Roboto, arial, sans-serif; font-size: 14px; height: 18px; line-height: 18px; list-style-type: none; outline-color: rgb(0, 102, 33); text-align: left; text-decoration: none solid rgb(0, 102, 33); white-space: nowrap; width: 600px; column-rule-color: rgb(0, 102, 33); -webkit-locale: &quot;en&quot;; perspective-origin: 300px 9px; -webkit-text-emphasis-color: rgb(0, 102, 33); -webkit-text-fill-color: rgb(0, 102, 33); -webkit-text-stroke-color: rgb(0, 102, 33); transform-origin: 300px 9px 0px; caret-color: rgb(0, 102, 33);"><span class="_mB" style="background-color: rgb(255, 255, 255); border-color: rgb(0, 102, 33); border-radius: 3px; border-style: solid; border-width: 1px; color: rgb(0, 102, 33); display: inline-block; font-family: Roboto, arial, sans-serif; font-size: 11px; height: 11px; line-height: 11px; list-style-type: none; margin-right: 7px; outline-color: rgb(0, 102, 33); padding-left: 2px; padding-right: 3px; padding-top: 1px; text-align: left; text-decoration: none solid rgb(0, 102, 33); white-space: nowrap; width: 13.3906px; column-rule-color: rgb(0, 102, 33); -webkit-locale: &quot;en&quot;; perspective-origin: 10.1875px 7px; -webkit-text-emphasis-color: rgb(0, 102, 33); -webkit-text-fill-color: rgb(0, 102, 33); -webkit-text-stroke-color: rgb(0, 102, 33); transform-origin: 10.1875px 7px 0px; caret-color: rgb(0, 102, 33);">Ad</span><cite id="ad-link-text" class="_WGk" style="border-color: rgb(0, 102, 33); color: rgb(0, 102, 33); display: inline-block; font-family: Roboto, arial, sans-serif; font-size: 14px; font-style: normal; height: 18px; line-height: 18px; list-style-type: none; max-width: 558px; outline-color: rgb(0, 102, 33); overflow: hidden; text-align: left; text-decoration: none solid rgb(0, 102, 33); text-overflow: ellipsis; vertical-align: bottom; white-space: nowrap; width: 103.594px; column-rule-color: rgb(0, 102, 33); -webkit-locale: &quot;en&quot;; perspective-origin: 51.7969px 9px; -webkit-text-emphasis-color: rgb(0, 102, 33); -webkit-text-fill-color: rgb(0, 102, 33); -webkit-text-stroke-color: rgb(0, 102, 33); transform-origin: 51.7969px 9px 0px; caret-color: rgb(0, 102, 33);">' + ad.linkText + '</cite><g-bubble class="action-menu ab_ctl r-iHprqp_90NYo" style="border-color: rgb(0, 102, 33); bottom: 0px; color: rgb(0, 102, 33); font-family: Roboto, arial, sans-serif; font-size: 14px; left: 0px; line-height: 0px; list-style-type: none; margin-left: 3px; margin-right: 3px; margin-top: 1px; outline-color: rgb(0, 102, 33); position: relative; right: 0px; text-align: left; text-decoration: none solid rgb(0, 102, 33); top: 0px; vertical-align: middle; white-space: nowrap; column-rule-color: rgb(0, 102, 33); -webkit-locale: &quot;en&quot;; -webkit-text-emphasis-color: rgb(0, 102, 33); -webkit-text-fill-color: rgb(0, 102, 33); -webkit-text-stroke-color: rgb(0, 102, 33); user-select: none; caret-color: rgb(0, 102, 33);"><a href="#" class="g-bbll" style="border-color: rgb(26, 13, 171); color: rgb(26, 13, 171); cursor: pointer; display: inline-block; font-family: Roboto, arial, sans-serif; font-size: 14px; height: 12px; line-height: 0px; list-style-type: none; outline-color: rgb(26, 13, 171); text-align: left; text-decoration: none solid rgb(26, 13, 171); white-space: nowrap; width: 13px; column-rule-color: rgb(26, 13, 171); -webkit-locale: &quot;en&quot;; perspective-origin: 6.5px 6px; -webkit-text-emphasis-color: rgb(0, 102, 33); -webkit-text-fill-color: rgb(0, 102, 33); -webkit-text-stroke-color: rgb(0, 102, 33); transform-origin: 6.5px 6px 0px; user-select: none; caret-color: rgb(0, 102, 33);"><span class="mn-dwn-arw" style="border-color: rgb(0, 102, 33) rgba(0, 0, 0, 0); border-style: solid; border-left-width: 4px; border-right-width: 4px; border-top-width: 5px; bottom: 8.5px; color: rgb(26, 13, 171); cursor: pointer; display: block; font-family: Roboto, arial, sans-serif; font-size: 14px; height: 0px; left: 0px; line-height: 0px; list-style-type: none; margin-left: 3px; margin-top: -4px; outline-color: rgb(26, 13, 171); position: absolute; right: 589px; text-align: left; text-decoration: none solid rgb(26, 13, 171); top: 8.5px; white-space: nowrap; width: 0px; column-rule-color: rgb(26, 13, 171); -webkit-locale: &quot;en&quot;; perspective-origin: 4px 2.5px; -webkit-text-emphasis-color: rgb(0, 102, 33); -webkit-text-fill-color: rgb(0, 102, 33); -webkit-text-stroke-color: rgb(0, 102, 33); transform-origin: 4px 2.5px 0px; user-select: none; caret-color: rgb(0, 102, 33);"></span></a></g-bubble></div><div id="ad-main-text" class="ellip ads-creative" style="border-color: rgb(84, 84, 84); color: rgb(84, 84, 84); font-family: Roboto, arial, sans-serif; font-size: 13px; height: 18px; line-height: 18px; list-style-type: none; outline-color: rgb(84, 84, 84); overflow: hidden; text-align: left; text-decoration: none solid rgb(84, 84, 84); text-overflow: ellipsis; white-space: nowrap; width: 600px; column-rule-color: rgb(84, 84, 84); -webkit-locale: &quot;en&quot;; perspective-origin: 300px 9px; -webkit-text-emphasis-color: rgb(84, 84, 84); -webkit-text-fill-color: rgb(84, 84, 84); -webkit-text-stroke-color: rgb(84, 84, 84); transform-origin: 300px 9px 0px; caret-color: rgb(84, 84, 84);">' + ad.text + '</div>';
        
        if (ad.title.split("-").length > 1) {
            adHtml += '<ul class="_wEo" style="border-color: rgb(84, 84, 84); color: rgb(84, 84, 84); font-family: Roboto, arial, sans-serif; font-size: 13px; height: 20px; line-height: 18px; list-style-type: circle; margin-bottom: -2px; margin-right: -13px; margin-top: 0px; outline-color: rgb(84, 84, 84); padding-bottom: 3px; padding-left: 28px; padding-top: 4px; text-align: left; text-decoration: none solid rgb(84, 84, 84); width: 418px; column-rule-color: rgb(84, 84, 84); -webkit-locale: &quot;en&quot;; perspective-origin: 223px 13.5px; -webkit-text-emphasis-color: rgb(84, 84, 84); -webkit-text-fill-color: rgb(84, 84, 84); -webkit-text-stroke-color: rgb(84, 84, 84); transform-origin: 223px 13.5px 0px; caret-color: rgb(84, 84, 84);"><li style="border-color: rgb(84, 84, 84); box-sizing: border-box; color: rgb(84, 84, 84); display: inline-block; font-family: Roboto, arial, sans-serif; font-size: 13px; height: 20px; line-height: 18px; list-style-type: none; outline-color: rgb(84, 84, 84); overflow: hidden; padding-bottom: 2px; padding-right: 13px; text-decoration: none solid rgb(84, 84, 84); text-overflow: ellipsis; vertical-align: top; white-space: nowrap; width: 209px; column-rule-color: rgb(84, 84, 84); -webkit-locale: &quot;en&quot;; perspective-origin: 104.5px 10px; -webkit-text-emphasis-color: rgb(84, 84, 84); -webkit-text-fill-color: rgb(84, 84, 84); -webkit-text-stroke-color: rgb(84, 84, 84); transform-origin: 104.5px 10px 0px; caret-color: rgb(84, 84, 84);"><a href="' + ad.link + '" id="ad-bottom-link-1" style="border-color: rgb(26, 13, 171); color: rgb(26, 13, 171); cursor: pointer; font-family: Roboto, arial, sans-serif; font-size: 13px; line-height: 18px; outline-color: rgb(26, 13, 171); text-align: left; text-decoration: none solid rgb(26, 13, 171); column-rule-color: rgb(26, 13, 171); -webkit-locale: &quot;en&quot;; -webkit-text-emphasis-color: rgb(26, 13, 171); -webkit-text-fill-color: rgb(26, 13, 171); -webkit-text-stroke-color: rgb(26, 13, 171); caret-color: rgb(26, 13, 171);">' + ad.title.split("-")[0] + '</a></li><li style="border-color: rgb(84, 84, 84); box-sizing: border-box; color: rgb(84, 84, 84); display: inline-block; font-family: Roboto, arial, sans-serif; font-size: 13px; height: 20px; line-height: 18px; list-style-type: none; outline-color: rgb(84, 84, 84); overflow: hidden; padding-bottom: 2px; padding-right: 13px; text-decoration: none solid rgb(84, 84, 84); text-overflow: ellipsis; vertical-align: top; white-space: nowrap; width: 209px; column-rule-color: rgb(84, 84, 84); -webkit-locale: &quot;en&quot;; perspective-origin: 104.5px 10px; -webkit-text-emphasis-color: rgb(84, 84, 84); -webkit-text-fill-color: rgb(84, 84, 84); -webkit-text-stroke-color: rgb(84, 84, 84); transform-origin: 104.5px 10px 0px; caret-color: rgb(84, 84, 84);"><a href="' + ad.link + '" id="ad-bottom-link-2" style="border-color: rgb(26, 13, 171); color: rgb(26, 13, 171); cursor: pointer; font-family: Roboto, arial, sans-serif; font-size: 13px; line-height: 18px; outline-color: rgb(26, 13, 171); text-align: left; text-decoration: none solid rgb(26, 13, 171); column-rule-color: rgb(26, 13, 171); -webkit-locale: &quot;en&quot;; -webkit-text-emphasis-color: rgb(26, 13, 171); -webkit-text-fill-color: rgb(26, 13, 171); -webkit-text-stroke-color: rgb(26, 13, 171); caret-color: rgb(26, 13, 171);">' + ad.title.split("-")[1] + '</a></li></ul>';
        }
        
        onlyAd.className = "g";
        onlyAd.setAttribute('style', '"border-color: rgb(84, 84, 84); color: rgb(84, 84, 84); font-family: Roboto, arial, sans-serif; font-size: 13px; height: 79px; line-height: 18px; list-style-type: none; margin-bottom: 5px; outline-color: rgb(84, 84, 84); padding: 11px 16px; text-decoration: none solid rgb(84, 84, 84); width: 600px; column-rule-color: rgb(84, 84, 84); -webkit-locale: &quot;en&quot;; perspective-origin: 316px 50.5px; -webkit-text-emphasis-color: rgb(84, 84, 84); -webkit-text-fill-color: rgb(84, 84, 84); -webkit-text-stroke-color: rgb(84, 84, 84); transform-origin: 316px 50.5px 0px; caret-color: rgb(84, 84, 84);"');
        onlyAd.innerHTML = adHtml;
        resultsSection.insertBefore(onlyAd, resultsSection.childNodes[0]);
    }
};

/**************************************************************************************
 *
 *  This function replaces the top ad in a Google search with the given ad.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {Object} ad - the ad information
 *    {String} title - title for the ad's a tag innerHTML
 *    {String} link - URL for the ad's a tag href
 *    {String} linkText - visible URL for the ad's cite tag innerHTML
 *    {String} text - the main text for the ad's div tag innerHTML
 *
 **************************************************************************************/

APP.replaceAd = function (ad) {
    console.log("Google Search > Replacing: Top Ad");
    
    var topAdId = "vs0p1c0",
    adsVisibleUrlTagName = "cite",
    adsTextClassName = "ellip",
    adsEndTextClassName = "_end",
    topAd = document.getElementById(topAdId);
    
    if (topAd) {
        if (ad.title) {
            topAd.innerHTML = ad.title;
            console.log("Google Search > Replaced: Top Ad Title");
        }
        
        if (ad.link) {
            topAd.href = ad.link;
            console.log("Google Search > Replaced: Top Ad Link");
        }
        
        if (ad.linkText
             || ad.text
             && topAd.parentNode
             && topAd.parentNode.parentNode) {
            var topAdEl = topAd.parentNode.parentNode;
            
            if (ad.linkText
                 && topAdEl.getElementsByTagName(adsVisibleUrlTagName).length > 0) {
                topAdEl.getElementsByTagName(adsVisibleUrlTagName)[0].innerHTML = ad.linkText;
                console.log("Google Search > Replaced: Top Ad Link Text");
            }
            
            if (ad.text
                 && topAdEl.getElementsByClassName(adsTextClassName).length > 0) {
                var topAdTexts = topAdEl.getElementsByClassName(adsTextClassName);
                
                for (var ii = 0; ii < topAdTexts.length; ii++) {
                    var topAdText = topAdTexts[ii];
                    
                    if (ii == 0) {
                        topAdText.innerHTML = ad.text;
                        
                        if (topAdEl.getElementsByClassName(adsEndTextClassName).length > 0) {
                            topAdEl.getElementsByClassName(adsEndTextClassName)[0].remove();
                        }
                        console.log("Google Search > Replaced: Top Ad Text");
                    } else {
                        topAdText.remove();
                    }
                }
            }
        }
    } else {
        alert('The provided search query "' + ad.searchQuery + '" does not return any ads to replace! Please change the search query or fill in all ad fields requested in the extension\'s popup window.');
    }
};

/**************************************************************************************
 *
 *  This function overloads the window.onhaschange function to listen for changed hash
 *  values that match the given search query in order to replace the top ad.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.setOnHashChange = function (ad, searchQuery) {
    if (typeof(window.onchange) === "function"
         && typeof(origOnHasChange) !== "function") {
        origOnChange = window.onchange;
    }
    
    window.onchange = function () {
        console.log("Google Search > Window Changed");
        APP.waitForResults(APP.insertAd(ad));
        
        if (typeof(origOnChange) === "function") {
            origOnChange.apply(this, arguments);
        }
    };
};

/**************************************************************************************
 *
 *  This function gets the ad_replacement_info cookie value.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.getAdReplacementCookies = function () {
    var adReplacementInfo = APP.getCookie("ad_info"),
    adReplacementInfoSplit = adReplacementInfo.split("|"),
    ad = {};
    
    ad.searchQuery = adReplacementInfoSplit[0];
    ad.title = adReplacementInfoSplit[1];
    ad.link = adReplacementInfoSplit[2];
    ad.linkText = adReplacementInfoSplit[3];
    ad.text = adReplacementInfoSplit[4];
    
    if (!ad.linkText) {
        ad.linkText = ad.link.replace(/^(http(s)?:\/\/)?(www\.)?/, "").split("?")[0];
    }
    
    if (ad.title
         && ad.link
         && ad.text) {
        ad.complete = true;
    } else {
        ad.complete = false;
    }
    
    return ad;
};

/**************************************************************************************
 *
 *  Main
 *
 **************************************************************************************/

var ad = APP.getAdReplacementCookies(),
origOnLoad,
origOnChange;

if (typeof(window.onload) === "function"
     && typeof(origOnLoad) !== "function") {
    origOnLoad = window.onload;
}

window.onload = function () {
    APP.waitForResults(APP.insertAd(ad));
    
    if (typeof(origOnLoad) === "function") {
        origOnLoad.apply(this, arguments);
    }
};