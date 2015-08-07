var getCookie = function(cookieField) {
    console.log("Content > Getting: Cookie");

    var name = cookieField + "=",
        cookies = document.cookie.split(';'),
        currentCookie;
    for (var ii = 0; ii < cookies.length; ++ii) {
        var currentCookie = cookies[ii].trim();
        if (currentCookie.indexOf(name) == 0) {
            return currentCookie.substring(name.length, currentCookie.length);
        }
    }
    return null;
}

var companyName = getCookie("company"),
    reload = location.search.split('reloaded=')[1];

console.log("Color Picker > Reload Query String: "+reload);

if (reload) {
    document.getElementById('first').style.display = "none";
    document.getElementById('second').style.display = "block";
    document.getElementById('second-correct').style.display = "block";
}
	
console.log("Color Picker > Company Name is: "+companyName);

if (companyName != "turner"
&& companyName != null) {
    companyNameSmall = companyName.substring(0, companyName.indexOf('.')) + " Logo";
    document.getElementById('company-image-title').innerHTML = companyNameSmall;
	img.crossOrigin = 'https://logo.clearbit.com/*'; //crossdomain xml file, this is facebook example
    img.src = "https://logo.clearbit.com/" + companyName + '?size=200';
}
else {
    img.src = "../assets/img/turner-tech-green.png";
}