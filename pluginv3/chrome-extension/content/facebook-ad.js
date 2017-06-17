console.log("Facebook Ad > Running");

/**************************************************************************************
 *
 *  This module contains all of the functionality needed for enabling dynamic ads
 *  within Facebook.
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
        paramValue = decodeURIComponent(paramValue);
        if (paramValue.search(/^http(s)?:\/\//) == -1) {
          paramValue = paramValue.replace(/\+/g, " ");
        }
        console.log("URL Parameter: " + paramName + " = " + paramValue);
        return paramValue;
      }
    }
  }
  return false;
};

/**************************************************************************************
 *
 *  This function waits for the Facebook right-column to load and then executes the
 *  given callback function.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {Function} callback
 *
 **************************************************************************************/

APP.waitForRightCol = function (callback) {
  var isFbRightColDone = window.setInterval(function () {
      if (document.getElementById("pagelet_ego_pane")
         && document.getElementById("pagelet_ego_pane").lastChild
         && ((document.getElementById("pagelet_ego_pane").lastChild.className.search(/egoOrganicColumn/) == -1
             && document.getElementById("pagelet_ego_pane").lastChild.getElementsByClassName("ego_unit_container").length > 0)
           || document.getElementById("pagelet_ego_pane").lastChild.className.search(/egoOrganicColumn/) != -1)) {
        window.clearInterval(isFbRightColDone);
        
        if (typeof(callback) === "function") {
          callback();
        }
      }
    }, 0);
};

/**************************************************************************************
 *
 *  This function inserts a new top right-column ad in Facebook with the given details.
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
  if (document.getElementById("pagelet_ego_pane").lastChild.className.search(/egoOrganicColumn/) == -1) {
    console.log("Facebook Ad > Inserting: Top Ad");
    
    var adSection = document.getElementById("pagelet_ego_pane").lastChild.getElementsByClassName("ego_unit_container")[0],
    topAd = document.createElement("div"),
    adHtml = '<div class="q_35wwcc_fw"><div class="v_35wwcij3e"><div class="uiSelector inlineBlock emu_x uiChevronSelectorButton uiSelectorRight"><div class="uiToggle wrap"></div></div><a href="' + ad.link + '" target="_blank" rel="noopener" style="text-decoration: none"><div class="_4pru l_35wwcd_1o"><div class="u_35wwcd_20"><div class="m_35wwcbth1"><div class="v_35wwcd_1s"><div class="m_35wwcd_1v"><div class="uiScaledImageContainer" style="width:284px; height:149px;"><img class="scaledImageFitWidth img" src="' + ad.image + '" alt="" width="284" height="149"></div></div></div></div></div><div class="c_35wwcd_1r" title="' + ad.title + '"><div class="x_35wwcd_1q"><strong>' + ad.title + '</strong></div><div class="b_35wwcd_1t">' + ad.linkText + '</div></div><div></div><div class="i_35wwcd_1d"><div><span class="fsm fwn fcg">' + ad.text + '</span></div></div></div></a></div></div>';
    
    topAd.className = "ego_unit";
    topAd.innerHTML = adHtml;
    adSection.insertBefore(topAd, adSection.childNodes[0]);
  } else {
    console.log("Facebook Ad > Inserting: Only Ad");
    
    var resultsSection = document.getElementById("pagelet_ego_pane"),
    onlyAd = document.createElement("div"),
    adHtml = '<div class="_1-ia"><div class="_4-u2 _1-ib _2tyk _20os _4-u8"><div class="ego_section"><div class="_3652"><div class="_3653"><a class="adsCategoryTitleLink" href="' + ad.link + '">Sponsored</a></div><a href="/campaign/landing.php?placement=emuca&amp;campaign_id=282141474901&amp;extra_1=auto">Create Ad</a><div class="_45hc _3a3e"></div></div><div class="ego_unit_container"><div class="ego_unit"><div class="q_35wwcc_fw"><div class="v_35wwcij3e"><div class="uiSelector inlineBlock emu_x uiChevronSelectorButton uiSelectorRight"><div class="uiToggle wrap"></div></div><a href="' + ad.link + '" target="_blank" rel="noopener" style="text-decoration: none"><div class="_4pru l_35wwcd_1o"><div class="u_35wwcd_20"><div class="m_35wwcbth1"><div class="v_35wwcd_1s"><div class="m_35wwcd_1v"><div class="uiScaledImageContainer" style="width:284px; height:149px;"><img class="scaledImageFitWidth img" src="' + ad.image + '" alt="" width="284" height="149"></div></div></div></div></div><div class="c_35wwcd_1r" title="' + ad.title + '"><div class="x_35wwcd_1q"><strong>' + ad.title + '</strong></div><div class="b_35wwcd_1t">' + ad.linkText + '</div></div><div></div><div class="i_35wwcd_1d"><div><span class="fsm fwn fcg">' + ad.text + '</span></div></div></div></a></div></div></div></div></div></div></div>';
    
    onlyAd.className = "_1-ia";
    onlyAd.innerHTML = adHtml;
    resultsSection.insertBefore(onlyAd, resultsSection.childNodes[0]);
  }
  
  window.setTimeout(function () {
    document.getElementsByClassName("adsCategoryTitleLink")[0].scrollIntoView();
  }, 500);
};

/**************************************************************************************
 *
 *  This function gets the ad_info cookie value.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.getAdInfo = function () {
  var ad = {};
  
  ad.title = APP.getUrlParam("title");
  ad.link = APP.getUrlParam("link");
  ad.linkText = APP.getUrlParam("linkText");
  ad.text = APP.getUrlParam("text");
  ad.image = APP.getUrlParam("image");
  
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
  APP.waitForRightCol(APP.insertAd(ad));
};