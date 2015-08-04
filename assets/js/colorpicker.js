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

var companyName = getCookie("company");
var reload = location.search.split('reloaded=')[1];
console.log(reload);

if (reload) {
    document.getElementById('first').style.display = "none";
    document.getElementById('second').style.display = "block";
    document.getElementById('second-correct').style.display = "block";
}
var colorThief = new ColorThief();
console.log('passed to colorpicker ', localStorage.company);
console.log(companyName);
if (companyName != "turner") {
    companyNameSmall = companyName.substring(0, companyName.indexOf('.')) + " Logo";
    document.getElementById('company-image-title').innerHTML = companyNameSmall;
}
console.log("passed updating the company");
var canvas = document.getElementById('image').getContext("2d");
var img = new Image();
img.onload = function() {
    canvas.drawImage(img, 0, 0);
    originalImageData = canvas.getImageData(0, 0, width, height); //chrome will not fail
}

// TODO: fix the logic on this page to eliminate this redundancy
if (companyName != "turner") {
    img.crossOrigin = 'https://logo.clearbit.com/*'; //crossdomain xml file, this is facebook example
    img.src = "https://logo.clearbit.com/" + companyName + '?size=200';
}
else {
    img.src = "../assets/img/tuner-tech-green.png";
}
// This is set to a hard-coded expire time. Need to fix.
document.cookie = "logo=" + img.src + "; expires=Thu, 18 Dec 2016 12:00:00 UTC; path=/";

setTimeout(function() {
    var color = colorThief.getColor(img);
    var colors = colorThief.getPalette(img, 2);
    colorSet = colors[1];
    console.log(colorSet);
    console.log(color);
    var cookieColor = 'rgb(' + colorSet[0] + ',' + colorSet[1] + ',' + colorSet[2] + ')';
    document.cookie = "color=" + cookieColor + "; expires=Thu, 18 Dec 2016 12:00:00 UTC; path=/";
}, 500);

var correct = document.getElementById('correct');
var incorrect = document.getElementById('incorrect');

correct.onclick = function() {
    location.href = location+"?reloaded=1";
}
incorrect.onclick = function() {
    document.getElementById('first').style.display = "none";
    document.getElementById('second').style.display = "block";
    document.getElementById('second-incorrect').style.display = "block";
}