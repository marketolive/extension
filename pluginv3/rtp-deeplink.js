/*
var getCookie,
pod;*/

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
/*
getCookie = function (cookieName) {
console.log("Marketo App > Getting: Cookie " + cookieName);

var name = cookieName + '=',
cookies = document.cookie.split(';'),
currCookie;

for (var ii = 0; ii < cookies.length; ii++) {
currCookie = cookies[ii].trim();
if (currCookie.indexOf(name) == 0) {
return currCookie.substring(name.length, currCookie.length);
}
}
console.log("Marketo App > Getting: Cookie " + cookieName + " not found");
return null;
};*/

/**************************************************************************************
 *
 *  Main
 *
 **************************************************************************************/

console.log("RTP Demo Site > Deeplinking");

$("#demo-in-marketo").attr("href", "https://sjrtp1.marketo.com/app/editReaction.ext?reactionId=1760");

$(document).ready(function () {
    $("#help-link").click(function () {
        console.log("RTP > Showing: Help Modal");
        
        $('.help-center-box').animate({
            'margin-top' : '125px',
        }, 400, function () {});
        $('.help-cover').css('display', 'block');
        $('.help-center-container').css('display', 'block');
        $('#iframelive').hide();
    });
    $('.cancel-help').click(function () {
        console.log("RTP > Hiding: Help Modal");
        
        $('.help-cover').css('display', 'none');
        $('.help-center-container').css('display', 'none');
        $('#iframelive').show();
    });
});
/*
pod = getCookie("userPod");
switch (pod) {
case "app-sjp":
case "app-ab07":
console.log("RTP > Deeplinking: 106 and 106a");
$("#demo-in-marketo").attr("href", "https://sjrtp1.marketo.com/app/editReaction.ext?reactionId=1760");
break;
case "app-ab08":
console.log("RTP > Deeplinking: 106b");
$("#demo-in-marketo").attr("href", "https://sjrtp2.marketo.com/app/editReaction.ext?reactionId=886");
break;
default:
console.log("RTP > Invalid userPod cookie: " + pod);
$("#demo-in-marketo").click(function() {
location.replace("https://login.marketo.com");
});
break;
}*/