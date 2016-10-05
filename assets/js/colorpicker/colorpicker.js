$('.body-container').click(function () {
    x = 0;
    $('.side-bar').css('background-color', 'transparent');
    $('.side-bar-inner-container').css('display', 'none');
});
var reload = location.search.split('reloaded=')[1],
colorThief = new ColorThief(),
canvas = document.getElementById('image').getContext("2d"),
img = new Image(),
colorSet,
getCompanyDomain,
companyDomain;

getCompanyDomain = function () {
    console.log("Color Picker > Getting: Company Domain");
    
    var params = window.location.href.split("?")[1].split("&"),
    paramPair,
    paramName,
    paramValue,
    ii;
    
    for (ii = 0; ii < params.length; ii++) {
        paramPair = params[ii].split("=");
        paramName = paramPair[0];
        paramValue = paramPair[1];
        
        if (paramName == "company") {
            console.log("Color Picker > Company Domain is: " + companyDomain);
            return paramValue;
        }
    }
    return false;
}
companyDomain = getCompanyDomain();

if (reload) {
    console.log("Color Picker > Reload Query String: " + reload);
    
    document.getElementById('first').style.display = "none";
    document.getElementById('second').style.display = "block";
    document.getElementById('second-correct').style.display = "block";
}

if (companyDomain) {
    document.getElementById('company-image-title').innerHTML = companyDomain.substring(0, companyDomain.indexOf('.')) + " Logo";
    img.crossOrigin = 'https://logo.clearbit.com/*'; //crossdomain xml file, this is facebook example
    img.src = "https://logo.clearbit.com/" + companyDomain + '?size=200';
} else {
    document.getElementById('company-image-title').innerHTML = "No Logo Found";
    img.src = "";
}

img.onload = function () {
    var logoElement = document.getElementById("cookie-logo"),
    colorElement = document.getElementById("cookie-color"),
    correct = document.getElementById("correct"),
    incorrect = document.getElementById("incorrect"),
    devExtensionId = "aahhkppadknlakhbppohbeolcfdhmocf",
    prodExtensionId = "onibnnoghllldiecboelbpcaeggfiohl",
    extensionId = devExtensionId,
    sendCompanyMsg;
    
    sendCompanyMsg = function () {
        
        chrome.runtime.sendMessage(extensionId, {
            action : "setCompanyCookies",
            logo : logoElement.innerHTML,
            color : colorElement.innerHTML
        },
            function (response) {
            console.log("Color Picker > Receiving: Message Response from Background: " + response);
            
            return response;
        });
        
        window.close();
    };
    
    canvas.drawImage(img, 0, 0);
    colorSet = colorThief.getPalette(img, 2)[1];
    console.log("Color Picker > The Company Secondary Color is: " + colorSet);
    colorElement.innerHTML = 'rgb(' + colorSet[0] + ',' + colorSet[1] + ',' + colorSet[2] + ')';
    console.log("Color Picker > The Company Logo is: " + img.src);
    logoElement.innerHTML = img.src;
    
    correct.onclick = sendCompanyMsg;
    document.onkeyup = function (e) {
        if (e.which == 13) {
            sendCompanyMsg();
        }
    };
    
    incorrect.onclick = function () {
        document.getElementById('first').style.display = "none";
        document.getElementById('second').style.display = "block";
        document.getElementById('second-incorrect').style.display = "block";
    };
}