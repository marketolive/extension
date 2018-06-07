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
         && post.getAttribute('data-id')
         && post.getAttribute('data-id').search('^urn:li:activity:') != -1){
         //&& !post.querySelector('.feed-shared-update__update-content-wrapper')){
         //&& post.querySelector('article[class="feed-shared-update mh0 Elevation-2dp relative feed-shared-update--share share-update article ember-view"]')
        // && post.querySelector('div[class="feed-shared-update__description feed-shared-inline-show-more-text ember-view"]')
         //&& !post.querySelector('div[class="feed-shared-mini-update ember-view"]')) {
        topAd = post.cloneNode(true);
        break;
      }
    }
    
    if (topAd) {
      var actorPicture = topAd.querySelector('a[data-control-name="actor_picture"]'),
      actor = topAd.querySelector('a[data-control-name="actor"]'),
      postText = topAd.querySelector('.feed-shared-update__description.feed-shared-inline-show-more-text'),
      postDescription = postText.querySelector('.feed-shared-text__text-view'),
      image = topAd.querySelector('a[class="tap-target app-aware-link ember-view"]'),
      imageDescription = topAd.querySelector('.tap-target.ember-view.full-width'),
      likesCount = topAd.querySelector('button[data-control-name="likes_count"]'),
      commentsCount = topAd.querySelector('button[data-control-name="comments_count"]'),
      seeMore = topAd.querySelector('.see-more');
      
      if (actorPicture && actorPicture.querySelector('.avatar.member')) {
        actorPicture.querySelector('.avatar.member').style.backgroundImage = "url ('"+ad.logo+"')";
        actorPicture.querySelector('[data-entity-hovercard-id]').setAttribute('data-entity-hovercard-id', '');
      } else if(actorPicture){
        actorPicture.firstElementChild.innerHTML = '<img src="' + ad.logo + '" class="EntityPhoto-circle-3" alt="' + ad.title + '">'
      }
      
      if (actor && actor.getElementsByClassName('feed-shared-update__update-content-wrapper').length > 0) {
        actor.getElementsByClassName('feed-shared-update__update-content-wrapper')[0].remove();
      }
      
      if(postDescription){
        postDescription.innerHTML = '<span>' + ad.text + '</span>';
      }
      else if(postText){
        postText.innerHTML = '<span class="Sans-15px-black-70%">' + ad.text + '</span>';
      }

      if (topAd.querySelector('.feed-shared-header')) {
        topAd.querySelector('.feed-shared-header').remove();
      }
      if(seeMore){
        seeMore.remove();
      }

      if(actor){
        actor.querySelector('[data-entity-hovercard-id]').innerText = ad.title;
        actor.querySelector('[data-entity-hovercard-id]').setAttribute('data-entity-hovercard-id', '');
        if(actor.querySelector('.feed-shared-actor__description'))
          actor.querySelector('.feed-shared-actor__description').innerText = 'Promoted';
        else if(actor.querySelector('.feed-shared-post-meta__headline'))
          actor.querySelector('.feed-shared-post-meta__headline').innerText = 'Promoted';
        else
          actor.firstElementChild.insertAdjacentHTML = '<span class="feed-shared-actor__description Sans-13px-black-55%">Promoted</span>';
      }
      
      if (!image) {
        if (topAd.querySelector('a[class="app-aware-link ember-view"]')) {
          image = topAd.querySelector('a[class="app-aware-link ember-view"]');
        } else if (topAd.querySelector('a[class="tap-target"]')) {
          image = topAd.querySelector('a[class="tap-target"]');
        } else if (topAd.querySelector('a[class="feed-shared-image__image-link"]')) {
          image = topAd.querySelector('a[class="feed-shared-image__image-link"]');
        }
      }
      if(image){
        image.href = ad.link;
        image.querySelector('.ivm-view-attr__img--centered').style.backgroundImage = 'url("' + ad.image + '")';
        image.querySelector('div').setAttribute('aria-label', ad.title);
      }
      if (imageDescription) {
        imageDescription.href = ad.link;
        if(imageDescription.getElementsByClassName('feed-shared-image-description__headline').length > 0)
          imageDescription.getElementsByClassName('feed-shared-image-description__headline')[0].innerText = ad.title;
        else if(imageDescription.getElementsByClassName('feed-shared-article__title').length > 0)
          imageDescription.getElementsByClassName('feed-shared-article__title')[0].innerText = ad.title;
        if(imageDescription.getElementsByClassName('feed-shared-image-description__byline').length > 0)
          imageDescription.getElementsByClassName('feed-shared-image-description__byline')[0].innerText = ad.linkText;
        else if(imageDescription.getElementsByClassName('feed-shared-article__subtitle').length > 0)
          imageDescription.getElementsByClassName('feed-shared-article__subtitle')[0].innerText = ad.linkText;
      }
      
      if (actor && actor.getElementsByTagName('time')[0]) {
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