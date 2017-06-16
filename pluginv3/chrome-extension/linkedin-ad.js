console.log("LinkedIn > Running");

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
 *  This function waits for LinkedIn to return it's feed and then executes the given 
 *  callback function.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {Function} callback
 *
 **************************************************************************************/

APP.waitForResults = function (callback) {
    var isLinkedInFeed = window.setInterval(function () {
            if (document.getElementsByClassName("core-rail").length > 0
                 && document.getElementsByClassName("core-rail")[0].lastElementChild
                 && document.getElementsByClassName("core-rail")[0].lastElementChild.className == "ember-view") {
                window.clearInterval(isLinkedInFeed);
                
                if (typeof(callback) === "function") {
                    callback();
                }
            }
        }, 0);
};

/**************************************************************************************
 *
 *  This function inserts a new top ad in the LinkedIn feed with the given details.
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
    console.log("Inserting: Top Ad");
    
    var coreSection = document.getElementsByClassName("core-rail")[0],
    feedSection = coreSection.lastElementChild,
    topAd = document.createElement("div"),
    adHtml = '<article class="feed-s-update mh0 Elevation-2dp relative feed-s-update--is-sponsored is-sponsored feed-s-update--share share-update article ember-view"><div class="feed-s-update__scroll"><div class="feed-s-post-meta feed-s-post-meta--is-sponsored ember-view"><a data-control-name="actor_picture" href="' + ad.link + '" class="tap-target feed-s-post-meta__actor-link ember-view"><div class="feed-s-avatar-image b0 company ember-view"><img src="' + ad.logo + '" class="avatar company EntityPhoto-square-3"></div></a><a data-control-name="actor" href="' + ad.link + '" class="feed-s-post-meta__profile-link Sans-17px-black-85%-semibold tap-target ember-view"><h3 class="feed-s-post-meta__actor Sans-13px-black-55%"><span class="feed-s-post-meta__name Sans-15px-black-85%-semibold hoverable-link-text">' + ad.title + '</span><span class="feed-s-post-meta__headline Sans-13px-black-55%">Sponsored</span></h3></a><button data-control-name="actor_follow_toggle" class="feed-s-update__follow-button feed-s-post-meta__follow-button follow ember-view"><span class="svg-icon-wrap"><li-icon aria-hidden="true" type="plus-icon" size="small"><svg viewBox="0 0 24 24" width="24px" height="24px" x="0" y="0" preserveAspectRatio="xMinYMin meet" class="artdeco-icon"><g class="small-icon" style="fill-opacity: 1"><path d="M14,9H9v5H7V9H2V7H7V2H9V7h5V9Z"></path></g></svg></li-icon></span><span aria-hidden="true">Follow</span></button></div><div class="feed-s-update__description feed-s-inline-show-more-text ember-view"><p dir="ltr" class="Sans-15px-black-70% feed-s-main-content ember-view"><span class="ember-view"><span>' + ad.text + '</span></span></p></div><div class="feed-s-update__update-content-wrapper Elevation-0dp"><div class="display-content ember-view"><div class="ember-view"></div><div class="feed-s-hero-entity feed-s-hero-entity--constrained feed-s-hero-entity--article-share ember-view"><div class="feed-s-hero-entity__image-container"><a target="_blank" href="##" class="ember-view"><div class="feed-s-hero-entity__image ember-view" style="background-image: url(&quot;' + ad.image + '&quot;);"></div></a></div><a target="_blank" href="' + ad.link + '" class="tap-target ember-view"><article class="feed-s-image-description ember-view"><h2 class="feed-s-image-description__headline Sans-15px-black-85%-semibold ember-view"><div class="truncate-multiline--truncation-target"><span class="truncate-multiline--last-line-wrapper"><span>' + ad.title + '</span></span></div></h2><h3 class="feed-s-image-description__byline Sans-13px-black-55%">' + ad.linkText + '</h3></article></a></div></div></div><div class="feed-s-update__social-info"><ul class="feed-s-social-counts ember-view"><li class="feed-s-social-counts__item"><button data-control-name="likes_count" class="feed-s-social-counts__num-likes feed-s-social-counts__count-value Sans-13px-black-55% hoverable-link-text"><span aria-hidden="true">212 Likes</span></button></li></ul><div class="feed-s-update__social-actions feed-s-social-action-bar ember-view"><button data-control-name="like_toggle" class="like-button button like feed-s-social-action-bar__action-btn social-action-btn mr5 ember-view"><span class="like-icon svg-icon-wrap"><li-icon aria-hidden="true" type="like-icon" size="small"><svg viewBox="0 0 24 24" width="24px" height="24px" x="0" y="0" preserveAspectRatio="xMinYMin meet" class="artdeco-icon"><path d="M11.6,7L9.7,3.8C9.4,3.3,9.2,2.7,9,2.1L8.8,1c0,0,0,0,0,0H7C5.9,1,5,1.9,5,3v0.4C5,4,5.1,4.7,5.3,5.3L5.5,6c0,0,0,0,0,0l-3,0C1.7,6,1,6.7,1,7.5c0,0.4,0.1,0.7,0.4,1c0,0,0,0,0,0C1.1,8.8,1,9.1,1,9.5c0,0.5,0.3,1,0.7,1.3c0,0,0,0,0,0c-0.1,0.2-0.2,0.5-0.2,0.7c0,0.8,0.6,1.4,1.3,1.5c0,0,0,0,0,0c-0.1,0.3-0.1,0.6,0,1c0.2,0.6,0.9,1,1.5,1H7c0.9,0,1.5-0.1,2.1-0.3l2.1-0.7c0,0,0,0,0,0H14c0,0,0,0,0,0V7c0,0,0,0,0,0L11.6,7C11.6,7,11.6,7,11.6,7zM3.4,10.1L3,9.6C2.9,9.4,2.8,9.2,2.9,8.9L3,8c0,0,0,0,0,0l5.1,0c0,0,0,0,0,0L7,4.7C6.9,4.3,6.9,3.8,6.9,3.4V3.1c0-0.2,0.2-0.4,0.4-0.4c0,0,0.1,0,0.1,0c0.1,0.7,0.4,1.5,0.7,2L10.7,9c0,0,0,0,0,0H12c0,0,0,0,0,0v3c0,0,0,0,0,0h-0.6c0,0,0,0,0,0l-2.5,0.8C8.5,12.9,8.1,13,7.7,13H4.9c-0.2,0-0.4-0.2-0.5-0.4l-0.1-0.5l-0.6-0.5c-0.2-0.2-0.4-0.5-0.3-0.8L3.4,10.1z" class="small-icon" style="fill-opacity: 1;"></path></svg></li-icon></span><span class="unlike-icon svg-icon-wrap"><li-icon aria-hidden="true" type="like-filled-icon" size="small"><svg viewBox="0 0 24 24" width="24px" height="24px" x="0" y="0" preserveAspectRatio="xMinYMin meet" class="artdeco-icon"><g class="small-icon" style="fill-opacity: 1;"><path d="M11.64,7L9.71,3.77A6,6,0,0,1,9,2.13L8.75,1H8A2,2,0,0,0,6,3V3.15A7.81,7.81,0,0,0,6.43,5.3L6.66,6a0,0,0,0,1,0,0H2.5A1.49,1.49,0,0,0,1.38,8.49a0,0,0,0,1,0,0,1.49,1.49,0,0,0,.31,2.25,0,0,0,0,1,0,0A1.48,1.48,0,0,0,2.83,13a0,0,0,0,1,0,0,1.38,1.38,0,0,0,0,1,1.62,1.62,0,0,0,1.51,1H7a6.47,6.47,0,0,0,2.14-.31L11.25,14H14V7H11.64Z"></path></g></svg></li-icon></span><span aria-hidden="true">Like</span></button><button data-control-name="comment" class="button comment feed-s-social-action-bar__action-btn social-action-btn Sans-15px-black-55%-semibold ember-view"><span class="svg-icon-wrap"><li-icon aria-hidden="true" type="speech-bubble-icon" size="small"><svg viewBox="0 0 24 24" width="24px" height="24px" x="0" y="0" preserveAspectRatio="xMinYMin meet" class="artdeco-icon"><g class="small-icon" style="fill-opacity: 1;"><path d="M14,3H2A1,1,0,0,0,1,4v7a1,1,0,0,0,1,1h9l4,3V4A1,1,0,0,0,14,3ZM3,10V5H13v6.11L11.52,10H3ZM5,7h6V8H5V7Z"></path></g></svg></li-icon></span><span aria-hidden="true">Comment</span></button><button data-control-name="reshare" class="feed-s-social-action-bar__action-btn feed-s-social-action-bar__reshare-button reshare-button button reshare social-action-btn ember-view"><span class="svg-icon-wrap"><li-icon aria-hidden="true" type="share-linkedin-icon" size="small"><svg viewBox="0 0 24 24" width="24px" height="24px" x="0" y="0" preserveAspectRatio="xMinYMin meet" class="artdeco-icon"><g class="small-icon" style="fill-opacity: 1;"><path d="M15.7,7.3L9,1v4H7c-3.9,0-7,3.1-7,7v3h1.4c0-2.2,1.9-4,4.1-4c0,0,0.1,0,0.1,0H9v4l0,0l6.7-6.3C16.1,8.4,16.1,7.7,15.7,7.3C15.7,7.3,15.7,7.3,15.7,7.3z M11,10.6V9H5.6c-1.2,0-2.4,0.4-3.4,1.1C3.1,8.2,4.9,7,7,7h4V5.4L13.7,8L11,10.6z"></path></g></svg></li-icon></span><span aria-hidden="true">Share</span></button></div></div></div></article>';
    
    topAd.className = "relative ember-view";
    topAd.innerHTML = adHtml;
    feedSection.insertBefore(topAd, feedSection.childNodes[0]);
    window.setTimeout(function () {
        coreSection.scrollIntoView();
    }, 500);
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
    
    ad.title = adInfoSplit[1];
    ad.link = adInfoSplit[2];
    ad.linkText = adInfoSplit[3];
    ad.text = adInfoSplit[4];
    ad.logo = adInfoSplit[5];
    ad.image = adInfoSplit[6];
    
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

var ad = APP.getAdInfo();

window.onload = function () {
    APP.waitForResults(APP.insertAd(ad));
};