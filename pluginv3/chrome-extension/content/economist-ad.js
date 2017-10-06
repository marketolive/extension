console.log('Economist Ad > Running');

/**************************************************************************************
 *
 *  This module contains all of the functionality needed for enabling dynamic ads
 *  within the Economist.
 *
 *  @Author Brian Fisher
 *
 *  @namespace
 *
 **************************************************************************************/

var APP = APP || {};

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
  console.log('Getting: URL Parameter: ' + param);
  
  let paramString = window.location.href.split('?')[1];
  
  if (paramString) {
    let params = paramString.split('&'),
    paramPair,
    paramName,
    paramValue;
    
    for (let ii = 0; ii < params.length; ii++) {
      paramPair = params[ii].split('=');
      paramName = paramPair[0];
      paramValue = paramPair[1];
      
      if (paramName == param) {
        paramValue = decodeURIComponent(paramValue);
        if (paramValue.search(/^http(s)?:\/\//) == -1) {
          paramValue = paramValue.replace(/\+/g, " ");
        }
        console.log('URL Parameter: ' + paramName + ' = ' + paramValue);
        return paramValue;
      }
    }
  }
  return false;
};

/**************************************************************************************
 *
 *  This function waits for the Google display ad to load and then executes the given 
 *  callback function.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {Function} callback
 *
 **************************************************************************************/

APP.waitForGoogleAd = function (callback) {
  var isGoogleAd = window.setInterval(function () {
      if (document.getElementsByClassName('ad-panel__googlead')[0]) {
        window.clearInterval(isGoogleAd);
        
        if (typeof(callback) === 'function') {
          callback();
        }
      }
    }, 0);
};

/**************************************************************************************
 *
 *  This function inserts a new top ad in the Economist with the given details.
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
  let adElement = document.getElementsByClassName('ad-panel__googlead')[0],
  topAd = document.createElement('div');
  
  topAd.id = 'topGoogleAd';
  topAd.style = 'width: 970px; height: 250px;';
  topAd.innerHTML = '<a target="_blank" href="'+ad.link+'" style="text-decoration: none;"><div style="z-index: 0; width: 100%; height: 100%; background-image: linear-gradient(rgb(238, 238, 238) 3%, rgb(17, 17, 17) 50%);"><div style="width: 100%; height: 100%; background-image: url(\''+ad.image+'\'); background-size: cover; opacity: 0.7;"></div></div><div style="z-index: 1; position: relative; top: -137px; left: 35px; width: 900px; height: 40px; color: #ffffff; font-family: Roboto, Helvetica Neue, Helvetica, Arial, sans-serif; font-weight: normal; font-size: 24px; text-align: center;">'+ad.title+'</div></a>';
  adElement.parentElement.style.width = '';
  adElement.replaceWith(topAd);
};

/**************************************************************************************
 *
 *  This function gets the ad_info URL parameter values.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.getAdInfo = function () {
  let ad = {};
  
  ad.title = APP.getUrlParam('title');
  ad.link = APP.getUrlParam('link');
  ad.image = APP.getUrlParam('image');
  
  return ad;
};

/**************************************************************************************
 *
 *  Main
 *
 **************************************************************************************/

let ad = APP.getAdInfo();

window.addEventListener("load", function () {
  APP.waitForGoogleAd(APP.insertAd(ad));
});