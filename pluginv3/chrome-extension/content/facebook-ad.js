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
    if (document.querySelectorAll("[class='cxgpxx05 sj5x9vvc']")//document.querySelector('[role="complementary"]')
     /* && document.getElementById("pagelet_ego_pane").lastChild
      && ((document.getElementById("pagelet_ego_pane").lastChild.className.search(/egoOrganicColumn/) == -1
        && document.getElementById("pagelet_ego_pane").lastChild.getElementsByClassName("ego_unit_container").length > 0)
  || document.getElementById("pagelet_ego_pane").lastChild.className.search(/egoOrganicColumn/) != -1)*/) {
      window.clearInterval(isFbRightColDone);

      if (typeof (callback) === "function") {
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
  if (document.querySelectorAll("[class='cxgpxx05 sj5x9vvc']")) {
    console.log("Facebook Ad > Inserting: Top Ad");
    debugger;
    var adSection = document.querySelectorAll("[class='cxgpxx05 sj5x9vvc']")[0],
      topAd = document.createElement("div"),
      adHtml = '<div class=""><div><div><div class="l9j0dhe7"><a aria-label="Advertiser link" aria-labelledby="jsc_c_6g" class="oajrlxb2 g5ia77u1 qu0x051f esr5mh6w e9989ue4 r7d6kgcz rq0escxv nhd2j8a9 a8c37x1j p7hjln8o kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso i1ao9s8h myohyog2 f1sip0of lzcic4wl l9j0dhe7 abiwlrkh gofk2cf1 ksdfmwjs gmql0nx0 ihxqhq3m l94mrbxd aenfhxwr tm8avpzi bj9fd4vl k4urcfbm" href="' + ad.link + '" rel="nofollow noopener" role="link" tabindex="0" target="_blank"><div class="j83agx80 qu0x051f esr5mh6w e9989ue4 r7d6kgcz beltcj47 p86d2i9g aot14ch1 kzx2olss nhd2j8a9 ihxqhq3m kvgmc6g5 oi9244e8 oygrvhab h676nmdw hzawbc8m cxgpxx05 dflh9lhu sj5x9vvc scb9dxdr gfay22hk pdl3lqly"><div class="hpfvmrgz g5gj957u buofh1pr rj1gh0hx o8rfisnq"><div id="jsc_c_6g"><span aria-labelledby="jsc_c_6f"><div class="bp9cbjyn j83agx80"><div class="o8rfisnq pfnyh3mw pfqjqu37"><img alt="" class="ue3kfks5 pw54ja7n uo3d90p7 l82x9zwi a8c37x1j d2edcug0 kltspiyx" src="' + ad.image + '"></div><div class="tw6a2znq"><div class="j83agx80 cbu4d94t ew0dbk1b irj2b8pg"><div class="qzhwtbm6 knvmm38d"><span class="d2edcug0 hpfvmrgz qv66sw1b c1et5uql oi732d6d ik7dh3pa fgxwclzu a8c37x1j keod5gw0 nxhoafnm aigsh9s9 d9wwppkn fe6kdd0r mau55g9w c8b282yb iv3no6db jq4qci2q a3bd9o3v ekzkrbhg oo9gr5id hzawbc8m" dir="auto"><span class="a8c37x1j ni8dbmo4 stjgntxs l9j0dhe7" style="-webkit-box-orient: vertical; -webkit-line-clamp: 3; display: -webkit-box;">' + ad.text + '</span></span></div><div class="qzhwtbm6 knvmm38d"><span class="d2edcug0 hpfvmrgz qv66sw1b c1et5uql oi732d6d ik7dh3pa fgxwclzu a8c37x1j keod5gw0 nxhoafnm aigsh9s9 d9wwppkn fe6kdd0r mau55g9w c8b282yb mdeji52x e9vueds3 j5wam9gi knj5qynh m9osqain hzawbc8m" dir="auto"><span class="a8c37x1j ni8dbmo4 stjgntxs l9j0dhe7" style="-webkit-box-orient: vertical; -webkit-line-clamp: 2; display: -webkit-box;"><div class="gc8qjt7d">' + ad.linkText + '</div></span></span></div></div></div></div></span></div></div></div></a><div class="bp9cbjyn i09qtzwb j83agx80 cypi58rs pmk7jnqg kr520xx4"><div class="s45kfl79 emlxlaya bkmhp75w spb7xbtv kujm000c agsi23a0 pmk7jnqg ntk8zc1u tkr6xdv7 svngc6pa ay7djpcl rfua0xdk"><span aria-labelledby="jsc_c_6h"><div aria-label="Open Menu" class="oajrlxb2 hn33210v qu0x051f esr5mh6w e9989ue4 r7d6kgcz rq0escxv nhd2j8a9 j83agx80 p7hjln8o kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso i1ao9s8h esuyzwwr f1sip0of lzcic4wl l9j0dhe7 abiwlrkh p8dawk7l bp9cbjyn s45kfl79 emlxlaya bkmhp75w spb7xbtv rt8b4zig n8ej3o3l agehan2d sk4xxmp2 taijpn5t k7cz35w2 bsnbvmp4 m7msyxje m9osqain" role="button" tabindex="0"><i class="hu5pjgll m6k467ps sp_j-o8QPZPfDc sx_d11f8a"></i><div class="s45kfl79 emlxlaya bkmhp75w spb7xbtv i09qtzwb n7fi1qx3 b5wmifdl hzruof5a pmk7jnqg j9ispegn kr520xx4 c5ndavph art1omkt ot9fgl3s" data-visualcompletion="ignore"></div></div></span></div></div></div></div></div></div>';
    //adHtml = '<div class="q_35wwcc_fw"><div class="v_35wwcij3e"><div class="uiSelector inlineBlock emu_x uiChevronSelectorButton uiSelectorRight"><div class="uiToggle wrap"></div></div><a href="' + ad.link + '" target="_blank" rel="noopener" style="text-decoration: none"><div class="_4pru l_35wwcd_1o"><div class="u_35wwcd_20"><div class="m_35wwcbth1"><div class="v_35wwcd_1s"><div class="m_35wwcd_1v"><div class="uiScaledImageContainer" style="width:284px; height:149px;"><img class="scaledImageFitWidth img" src="' + ad.image + '" alt="" width="284" height="149"></div></div></div></div></div><div class="c_35wwcd_1r" title="' + ad.title + '"><div class="x_35wwcd_1q"><strong>' + ad.title + '</strong></div><div class="b_35wwcd_1t">' + ad.linkText + '</div></div><div></div><div class="i_35wwcd_1d"><div><span class="fsm fwn fcg">' + ad.text + '</span></div></div></div></a></div></div>';

    topAd.className = "cxgpxx05 sj5x9vvc";
    topAd.innerHTML = adHtml;
    adSection.insertBefore(topAd, adSection.childNodes[0]);
  }/* else {
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
  }, 500);*/
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