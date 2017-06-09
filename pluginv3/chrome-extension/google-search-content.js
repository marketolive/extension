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
    var adTitleSplit1 = ad.title.split("-"),
    adTitleSplit2 = ad.title.split("|"),
    bottomLinks = [];
    
    if (adTitleSplit1.length == 2
         || adTitleSplit1.length == 3) {
        bottomLinks.push(adTitleSplit1[0]);
        bottomLinks.push(adTitleSplit1[1]);
    } else if (adTitleSplit1.length > 3) {
        bottomLinks.push(adTitleSplit1[0]);
        bottomLinks.push(adTitleSplit1[1]);
        bottomLinks.push(adTitleSplit1[2]);
        bottomLinks.push(adTitleSplit1[3]);
    } else if (adTitleSplit2.length == 2
         || adTitleSplit2.length == 3) {
        bottomLinks.push(adTitleSplit2[0]);
        bottomLinks.push(adTitleSplit2[1]);
    } else if (adTitleSplit2.length > 3) {
        bottomLinks.push(adTitleSplit2[0]);
        bottomLinks.push(adTitleSplit2[1]);
        bottomLinks.push(adTitleSplit2[2]);
        bottomLinks.push(adTitleSplit2[3]);
    }
    
    if (document.getElementById("tads")) {
        console.log("Google Search > Inserting: Top Ad");
        
        var adSection = document.getElementById("tads").getElementsByTagName("ol")[0],
        topAd = document.createElement("li"),
        adHtml = '<h3><a href="' + ad.link + '" id="ad-link" class="r-iClGEAjvi27Y">' + ad.title + '</a></h3><div class="ads-visurl"><span class="_mB">Ad</span><cite id="ad-link-text" class="_WGk">' + ad.linkText + '</cite><g-bubble class="action-menu ab_ctl r-iHprqp_90NYo"><a href="#" class="g-bbll"><span class="mn-dwn-arw"></span></a></g-bubble></div><div id="ad-main-text" class="ellip ads-creative">' + ad.text + '</div>',
        bottomLinksHtml = '';
        
        for (var ii = 0; ii < bottomLinks.length; ii++) {
            bottomLinksHtml += '<li><a href="' + ad.link + '" id="ad-bottom-link-1">' + bottomLinks[ii] + '</a></li>';
        }
        
        if (bottomLinks.length > 0) {
            adHtml += '<ul class="_wEo">' + bottomLinksHtml + '</ul>';
        }
        
        topAd.className = "ads-ad";
        topAd.innerHTML = adHtml;
        adSection.insertBefore(topAd, adSection.childNodes[0]);
    } else if (document.getElementById("rso")) {
        console.log("Google Search > Inserting: Only Ad");
        
        var resultsSection = document.getElementById("rso"),
        onlyAd = document.createElement("div"),
        adHtml = '<h3 style="border-color: rgb(84, 84, 84); color: rgb(84, 84, 84); font-family: Roboto, arial, sans-serif; font-size: 18px; font-weight: normal; height: 18px; line-height: 18px; list-style-type: none; margin-bottom: 0px; margin-top: 0px; outline-color: rgb(84, 84, 84); text-align: left; text-decoration: none solid rgb(84, 84, 84); width: 600px; column-rule-color: rgb(84, 84, 84); -webkit-locale: &quot;en&quot;; perspective-origin: 300px 9px; -webkit-text-emphasis-color: rgb(84, 84, 84); -webkit-text-fill-color: rgb(84, 84, 84); -webkit-text-stroke-color: rgb(84, 84, 84); transform-origin: 300px 9px 0px; caret-color: rgb(84, 84, 84);"><a href="' + ad.link + '" id="ad-link" class="r-iClGEAjvi27Y" style="border-color: rgb(26, 13, 171); color: rgb(26, 13, 171); cursor: pointer; font-family: Roboto, arial, sans-serif; font-size: 18px; line-height: 21.6px; outline-color: rgb(26, 13, 171); text-align: left; text-decoration: none solid rgb(26, 13, 171); white-space: nowrap; column-rule-color: rgb(26, 13, 171); -webkit-locale: &quot;en&quot;; -webkit-text-emphasis-color: rgb(26, 13, 171); -webkit-text-fill-color: rgb(26, 13, 171); -webkit-text-stroke-color: rgb(26, 13, 171); caret-color: rgb(26, 13, 171);">' + ad.title + '</a></h3><div class="ads-visurl" style="border-color: rgb(0, 102, 33); color: rgb(0, 102, 33); font-family: Roboto, arial, sans-serif; font-size: 14px; height: 18px; line-height: 18px; list-style-type: none; outline-color: rgb(0, 102, 33); text-align: left; text-decoration: none solid rgb(0, 102, 33); white-space: nowrap; width: 600px; column-rule-color: rgb(0, 102, 33); -webkit-locale: &quot;en&quot;; perspective-origin: 300px 9px; -webkit-text-emphasis-color: rgb(0, 102, 33); -webkit-text-fill-color: rgb(0, 102, 33); -webkit-text-stroke-color: rgb(0, 102, 33); transform-origin: 300px 9px 0px; caret-color: rgb(0, 102, 33);"><span class="_mB" style="background-color: rgb(255, 255, 255); border-color: rgb(0, 102, 33); border-radius: 3px; border-style: solid; border-width: 1px; color: rgb(0, 102, 33); display: inline-block; font-family: Roboto, arial, sans-serif; font-size: 11px; height: 11px; line-height: 11px; list-style-type: none; margin-right: 7px; outline-color: rgb(0, 102, 33); padding-left: 2px; padding-right: 3px; padding-top: 1px; text-align: left; text-decoration: none solid rgb(0, 102, 33); white-space: nowrap; width: 13.3906px; column-rule-color: rgb(0, 102, 33); -webkit-locale: &quot;en&quot;; perspective-origin: 10.1875px 7px; -webkit-text-emphasis-color: rgb(0, 102, 33); -webkit-text-fill-color: rgb(0, 102, 33); -webkit-text-stroke-color: rgb(0, 102, 33); transform-origin: 10.1875px 7px 0px; caret-color: rgb(0, 102, 33);">Ad</span><cite id="ad-link-text" class="_WGk" style="border-color: rgb(0, 102, 33); color: rgb(0, 102, 33); display: inline-block; font-family: Roboto, arial, sans-serif; font-size: 14px; font-style: normal; height: 18px; line-height: 18px; list-style-type: none; max-width: 558px; outline-color: rgb(0, 102, 33); overflow: hidden; text-align: left; text-decoration: none solid rgb(0, 102, 33); text-overflow: ellipsis; vertical-align: bottom; white-space: nowrap; width: 103.594px; column-rule-color: rgb(0, 102, 33); -webkit-locale: &quot;en&quot;; perspective-origin: 51.7969px 9px; -webkit-text-emphasis-color: rgb(0, 102, 33); -webkit-text-fill-color: rgb(0, 102, 33); -webkit-text-stroke-color: rgb(0, 102, 33); transform-origin: 51.7969px 9px 0px; caret-color: rgb(0, 102, 33);">' + ad.linkText + '</cite><g-bubble class="action-menu ab_ctl r-iHprqp_90NYo" style="border-color: rgb(0, 102, 33); bottom: 0px; color: rgb(0, 102, 33); font-family: Roboto, arial, sans-serif; font-size: 14px; left: 0px; line-height: 0px; list-style-type: none; margin-left: 3px; margin-right: 3px; margin-top: 1px; outline-color: rgb(0, 102, 33); position: relative; right: 0px; text-align: left; text-decoration: none solid rgb(0, 102, 33); top: 0px; vertical-align: middle; white-space: nowrap; column-rule-color: rgb(0, 102, 33); -webkit-locale: &quot;en&quot;; -webkit-text-emphasis-color: rgb(0, 102, 33); -webkit-text-fill-color: rgb(0, 102, 33); -webkit-text-stroke-color: rgb(0, 102, 33); user-select: none; caret-color: rgb(0, 102, 33);"><a href="#" class="g-bbll" style="border-color: rgb(26, 13, 171); color: rgb(26, 13, 171); cursor: pointer; display: inline-block; font-family: Roboto, arial, sans-serif; font-size: 14px; height: 12px; line-height: 0px; list-style-type: none; outline-color: rgb(26, 13, 171); text-align: left; text-decoration: none solid rgb(26, 13, 171); white-space: nowrap; width: 13px; column-rule-color: rgb(26, 13, 171); -webkit-locale: &quot;en&quot;; perspective-origin: 6.5px 6px; -webkit-text-emphasis-color: rgb(0, 102, 33); -webkit-text-fill-color: rgb(0, 102, 33); -webkit-text-stroke-color: rgb(0, 102, 33); transform-origin: 6.5px 6px 0px; user-select: none; caret-color: rgb(0, 102, 33);"><span class="mn-dwn-arw" style="border-color: rgb(0, 102, 33) rgba(0, 0, 0, 0); border-style: solid; border-left-width: 4px; border-right-width: 4px; border-top-width: 5px; bottom: 8.5px; color: rgb(26, 13, 171); cursor: pointer; display: block; font-family: Roboto, arial, sans-serif; font-size: 14px; height: 0px; left: 0px; line-height: 0px; list-style-type: none; margin-left: 3px; margin-top: -4px; outline-color: rgb(26, 13, 171); position: absolute; right: 589px; text-align: left; text-decoration: none solid rgb(26, 13, 171); top: 8.5px; white-space: nowrap; width: 0px; column-rule-color: rgb(26, 13, 171); -webkit-locale: &quot;en&quot;; perspective-origin: 4px 2.5px; -webkit-text-emphasis-color: rgb(0, 102, 33); -webkit-text-fill-color: rgb(0, 102, 33); -webkit-text-stroke-color: rgb(0, 102, 33); transform-origin: 4px 2.5px 0px; user-select: none; caret-color: rgb(0, 102, 33);"></span></a></g-bubble></div><div id="ad-main-text" class="ellip ads-creative" style="border-color: rgb(84, 84, 84); color: rgb(84, 84, 84); font-family: Roboto, arial, sans-serif; font-size: 13px; height: 18px; line-height: 18px; list-style-type: none; outline-color: rgb(84, 84, 84); overflow: hidden; text-align: left; text-decoration: none solid rgb(84, 84, 84); text-overflow: ellipsis; white-space: nowrap; width: 600px; column-rule-color: rgb(84, 84, 84); -webkit-locale: &quot;en&quot;; perspective-origin: 300px 9px; -webkit-text-emphasis-color: rgb(84, 84, 84); -webkit-text-fill-color: rgb(84, 84, 84); -webkit-text-stroke-color: rgb(84, 84, 84); transform-origin: 300px 9px 0px; caret-color: rgb(84, 84, 84);">' + ad.text + '</div>',
        bottomLinksHtml = '';
        
        for (var ii = 0; ii < bottomLinks.length; ii++) {
            bottomLinksHtml += '<li style="border-color: rgb(84, 84, 84); box-sizing: border-box; color: rgb(84, 84, 84); display: inline-block; font-family: Roboto, arial, sans-serif; font-size: 13px; height: 20px; line-height: 18px; list-style-type: none; outline-color: rgb(84, 84, 84); overflow: hidden; padding-bottom: 2px; padding-right: 13px; text-decoration: none solid rgb(84, 84, 84); text-overflow: ellipsis; vertical-align: top; white-space: nowrap; width: 209px; column-rule-color: rgb(84, 84, 84); -webkit-locale: &quot;en&quot;; perspective-origin: 104.5px 10px; -webkit-text-emphasis-color: rgb(84, 84, 84); -webkit-text-fill-color: rgb(84, 84, 84); -webkit-text-stroke-color: rgb(84, 84, 84); transform-origin: 104.5px 10px 0px; caret-color: rgb(84, 84, 84);"><a href="' + ad.link + '" id="ad-bottom-link-1" style="border-color: rgb(26, 13, 171); color: rgb(26, 13, 171); cursor: pointer; font-family: Roboto, arial, sans-serif; font-size: 13px; line-height: 18px; outline-color: rgb(26, 13, 171); text-align: left; text-decoration: none solid rgb(26, 13, 171); column-rule-color: rgb(26, 13, 171); -webkit-locale: &quot;en&quot;; -webkit-text-emphasis-color: rgb(26, 13, 171); -webkit-text-fill-color: rgb(26, 13, 171); -webkit-text-stroke-color: rgb(26, 13, 171); caret-color: rgb(26, 13, 171);">' + bottomLinks[ii] + '</a></li>';
        }
        
        if (bottomLinks.length > 0) {
            adHtml += '<ul class="_wEo" style="border-color: rgb(84, 84, 84); color: rgb(84, 84, 84); font-family: Roboto, arial, sans-serif; font-size: 13px; height: 20px; line-height: 18px; list-style-type: circle; margin-bottom: -2px; margin-right: -13px; margin-top: 0px; outline-color: rgb(84, 84, 84); padding-bottom: 3px; padding-left: 28px; padding-top: 4px; text-align: left; text-decoration: none solid rgb(84, 84, 84); width: 418px; column-rule-color: rgb(84, 84, 84); -webkit-locale: &quot;en&quot;; perspective-origin: 223px 13.5px; -webkit-text-emphasis-color: rgb(84, 84, 84); -webkit-text-fill-color: rgb(84, 84, 84); -webkit-text-stroke-color: rgb(84, 84, 84); transform-origin: 223px 13.5px 0px; caret-color: rgb(84, 84, 84);">' + bottomLinksHtml + '</ul>';
        }
        
        onlyAd.className = "g";
        onlyAd.setAttribute('style', '"border-color: rgb(84, 84, 84); color: rgb(84, 84, 84); font-family: Roboto, arial, sans-serif; font-size: 13px; height: 79px; line-height: 18px; list-style-type: none; margin-bottom: 5px; outline-color: rgb(84, 84, 84); padding: 11px 16px; text-decoration: none solid rgb(84, 84, 84); width: 600px; column-rule-color: rgb(84, 84, 84); -webkit-locale: &quot;en&quot;; perspective-origin: 316px 50.5px; -webkit-text-emphasis-color: rgb(84, 84, 84); -webkit-text-fill-color: rgb(84, 84, 84); -webkit-text-stroke-color: rgb(84, 84, 84); transform-origin: 316px 50.5px 0px; caret-color: rgb(84, 84, 84);"');
        onlyAd.innerHTML = adHtml;
        resultsSection.insertBefore(onlyAd, resultsSection.childNodes[0]);
    }
};

/**************************************************************************************
 *
 *  This function gets the ad_info_google cookie value.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.getAdInfo = function () {
    var adInfo = APP.getCookie("ad_info"),
    adInfoSplit = adInfo.split(",,"),
    ad = {};
    
    ad.searchQuery = adInfoSplit[0];
    ad.title = adInfoSplit[1];
    ad.link = adInfoSplit[2];
    ad.linkText = adInfoSplit[3];
    ad.text = adInfoSplit[4];
    
    if (!ad.linkText) {
        ad.linkText = ad.link.replace(/^(http(s)?:\/\/)?(www\.)?/, "").split("?")[0];
    }
    
    return ad;
};

/**************************************************************************************
 *
 *  Main
 *
 **************************************************************************************/

var ad = APP.getAdInfo(),
origOnLoad;

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