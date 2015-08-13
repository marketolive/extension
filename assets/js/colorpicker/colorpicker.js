$('.body-container').click(function(){
    x = 0;
    $('.side-bar').css('background-color','transparent');
    $('.side-bar-inner-container').css('display','none');  
});
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
    },

    reload = location.search.split('reloaded=')[1],
    companyName = getCookie("company"),
    colorThief = new ColorThief(),
    canvas = document.getElementById('image').getContext("2d"),
    img = new Image(),
    colorSet;

console.log("Color Picker > Reload Query String: " + reload);
if (reload) {
    document.getElementById('first').style.display = "none";
    document.getElementById('second').style.display = "block";
    document.getElementById('second-correct').style.display = "block";
}

console.log("Color Picker > Company Name is: " + companyName);

if (companyName != "turner" && companyName != null) {
    var companyNameSmall = companyName.substring(0, companyName.indexOf('.')) + " Logo";
    document.getElementById('company-image-title').innerHTML = companyNameSmall;
    img.crossOrigin = 'https://logo.clearbit.com/*'; //crossdomain xml file, this is facebook example
    img.src = "https://logo.clearbit.com/" + companyName + '?size=200';
} 
else {
    img.src = "../assets/img/turner-tech-green.png";
}

img.onload = function() {
    canvas.drawImage(img, 0, 0);
    colorSet = colorThief.getPalette(img, 2)[1];
    document.getElementById("cookie-color").innerHTML = 'rgb(' + colorSet[0] + ',' + colorSet[1] + ',' + colorSet[2] + ')';
    console.log("Color Picker > The Secondary Color is: " + colorSet);
    document.getElementById("cookie-logo").innerHTML = img.src;
    console.log("Color Picker > The Logo is: " + img.src);
}