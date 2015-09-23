var MME = MME || {};

MME.imagePath = "../../assets/img/";
MME.defaultPush = "Summer's here! Stay cool in the heat with this discount!";

MME.getCookie = function(cookieField) {
    var name = cookieField + "=",
        cookies = document.cookie.split(';'),
        currentCookie;
    for (var ii = 0; ii < cookies.length; ++ii) {
        var currentCookie = cookies[ii].trim();
        if (currentCookie.indexOf(name) == 0)
            return currentCookie.substring(name.length, currentCookie.length);
    }
    return null;
};

$("#demo-in-marketo").click(function() {
    location.replace("https://app-sjp.marketo.com/#SC22358B2");
});