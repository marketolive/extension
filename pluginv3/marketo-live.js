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

// TODO: Separate RTP code?
//    pod = new Pod(getCookie("userPod"));
//    console.log(pod);
//    insertDeepLinks(pod);

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
    var location = window.location.href,
    for (var y = 0; y < pod.valueSet.length; y++) {
        if (location.indexOf(pod.valueSet[y].url) != -1)
            return pod.valueSet[y].position;
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
    var currentPosition = LIVE.urlCheck(pod);
    currentPosition = '#' + currentPosition;
    $(currentPosition).parent().css('display', 'block');
    $(currentPosition).parent().siblings().css('display', 'none');
    $(currentPosition).removeClass('analyzer-button').addClass('analyzer-title');
    $(currentPosition).siblings().removeClass('analyzer-title').addClass('analyzer-button');
}

/**************************************************************************************
 *
 *  main object that will pass the variables for which analyzer should be present using
 *  currPosition as the current position in the object array.
 *
 *  @Author Arrash
 *
 *  @class
 *
 *  @namespace Analyzer.currPosition
 *  @namespace Analyzer.url
 *
 **************************************************************************************/

LIVE.Analyzer = function (pod) {
    this.currPosition = 0;
    this.pod = pod;
}

/**************************************************************************************
 *
 *  this method will insert an HTML template and a CSS sheet inside the template directly
 *  into the header of the Marketo page. It accomplishes this using "Import" and runs
 *  asynchronously. It will then bind the 'prev' and 'next' elements with a click function
 *  so that whenever theyre clicked it will call chooseAnalyzer and pass the element clicked
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

LIVE.Analyzer.prototype.showAnalyzer = function () {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "http://marketolive.com/dev/pluginv3/html/analyzer.html", false );
    xmlHttp.send( null );
    var pageLoaded = function(){
        var newElement = document.createElement('div');
        newElement.innerHTML = xmlHttp.responseText;
        document.body.appendChild(newElement);
    }
    window.onload = pageLoaded();
}

//we're going to create an instance of the analyzer
//and then call showAnalyzer to actually build out the template and CSS onto the page


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

LIVE.Analyzer.prototype.chooseAnalyzer = function (ele) {
    var id = ele.id;
    //updates the currPosition based on the div selected
    for (var x = 0; x < this.pod.valueSet.length; x++) {
        if (id == this.pod.valueSet[x].position)
            this.currPosition = x;
    }
    window.location = 'https://' + currentPod + '.marketo.com/' + this.pod.valueSet[this.currPosition];
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
$(document).ready(function () {
    LIVE.rtpToMarketo();
});