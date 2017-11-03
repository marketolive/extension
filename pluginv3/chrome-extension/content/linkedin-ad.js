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
         && document.getElementsByClassName("core-rail")[0].lastElementChild.className == "ember-view"
         && document.getElementsByClassName("core-rail")[0].lastElementChild.childNodes.length > 0) {
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
  
  try {
    var coreSection = document.getElementsByClassName("core-rail")[0],
    feedSection = coreSection.lastElementChild,
    posts = feedSection.childNodes,
    topAd;
    
    for (let post of posts) {
      if (post.className == 'relative ember-view'
         && post.getAttribute('data-id').search('^urn:li:activity:') != -1
         && post.querySelector('div[class="feed-base-update__description feed-base-inline-show-more-text ember-view"]')
         && !post.querySelector('div[class="feed-base-mini-update ember-view"]')) {
        topAd = post.cloneNode(true);
        break;
      }
    }
    
    if (topAd) {
      var actorPicture = topAd.querySelector('a[data-control-name="actor_picture"]'),
      actor = topAd.querySelector('a[data-control-name="actor"]'),
      postText = topAd.querySelector('div[class="feed-base-update__description feed-base-inline-show-more-text ember-view"]'),
      postDescription = postText.querySelector('span[class="ember-view"]'),
      image = topAd.querySelector('a[class="ember-view"]'),
      imageDescription = topAd.querySelector('a[class="tap-target ember-view"]'),
      likesCount = topAd.querySelector('button[data-control-name="likes_count"]'),
      commentsCount = topAd.querySelector('button[data-control-name="comments_count"]');
      
      actorPicture.href = actor.href = ad.link;
      actorPicture.querySelector('img[src]').src = ad.logo;
      actorPicture.querySelector('img[src]').alt = ad.title;
      actorPicture.querySelector('div[data-entity-hovercard-id]').setAttribute('data-entity-hovercard-id', '');
      actor.querySelector('span[data-entity-hovercard-id]').innerText = ad.title;
      actor.querySelector('span[data-entity-hovercard-id]').setAttribute('data-entity-hovercard-id', '');
      actor.getElementsByClassName('feed-base-post-meta__headline')[0].innerText = 'Sponsored';
      postDescription.innerHTML = '<span>' + ad.text + '</span>';
      
      if (!image) {
        image = topAd.querySelector('a[class="tap-target"]');
      }
      image.href = ad.link;
      image.querySelector('div').style.backgroundImage = 'url("' + ad.image + '")';
      image.querySelector('div').setAttribute('aria-label', ad.title);
      
      if (imageDescription) {
        imageDescription.href = ad.link;
        imageDescription.getElementsByClassName('feed-base-image-description__headline')[0].innerText = ad.title;
        imageDescription.getElementsByClassName('feed-base-image-description__byline')[0].innerText = ad.linkText;
      }
      
      if (actor.getElementsByTagName('time')[0]) {
        actor.getElementsByTagName('time')[0].remove();
      }
      
      if (likesCount) {
        likesCount.querySelector('span[aria-hidden]').innerText = '212 Likes';
      }
      
      if (commentsCount) {
        commentsCount.querySelector('span[aria-hidden]').innerText = '42 Comments';
      }
      
      feedSection.insertBefore(topAd, feedSection.childNodes[0]);
      coreSection.scrollIntoView();
    } else {
      console.log('No Proper Post to Clone');
    }
  } catch (e) {
    console.error(e);
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
  window.setTimeout(function () {
    APP.waitForResults(APP.insertAd(ad));
  }, 500);
};