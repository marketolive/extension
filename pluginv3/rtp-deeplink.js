var getCookie = function(cookieField) {
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
$jq = jQuery.noConflict();
var pod = getCookie("userPod");
console.log("RTP > Reading User Pod: " + pod);
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
            $("#modal-background").attr("style", "display: block");
        });
        $("#secret-passage").click(function() {
            $("#modal-background")[0].style.display = "none";
        });
        break;
}

$("#help-link").click(function() {
    console.log("RTP > Showing: Help Modal");
    
    $('.help-center-box').animate({
        'margin-top': '125px',
    }, 400, function() {});
    $('.help-cover').css('display', 'block');
    $('.help-center-container').css('display', 'block');
});
$('.cancel-help').click(function() {
    console.log("RTP > Hiding: Help Modal");
    
    $('.help-cover').css('display', 'none');
    $('.help-center-container').css('display', 'none');
});