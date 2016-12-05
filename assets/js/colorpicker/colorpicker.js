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
};
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
    colorOption1 = document.getElementById("color-option-1"),
    colorOption2 = document.getElementById("color-option-2"),
    colorOption3 = document.getElementById("color-option-3"),
    colorElement = document.getElementById("cookie-color"),
    correct = document.getElementById("correct"),
    incorrect = document.getElementById("incorrect"),
    devExtensionId = "aahhkppadknlakhbppohbeolcfdhmocf",
    prodExtensionId = "onibnnoghllldiecboelbpcaeggfiohl",
    extensionId = devExtensionId,
    selectColor,
    sendCompanyMsg;
    
    selectColor = function () {
        colorOption1.style.border = null;
        colorOption2.style.border = null;
        colorOption3.style.border = null;
        this.style.border = "2px solid #000000";
        colorElement.innerHTML = this.style.backgroundColor;
        console.log("Color Picker > The Selected Color is: " + colorElement.innerHTML);
    };
    
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
    colorSet = colorThief.getPalette(img, 3);
    colorOption1.style.backgroundColor = "rgb(" + colorSet[0][0] + ", " + colorSet[0][1] + ", " + colorSet[0][2] + ")";
    colorOption2.style.backgroundColor = "rgb(" + colorSet[1][0] + ", " + colorSet[1][1] + ", " + colorSet[1][2] + ")";
    colorOption3.style.backgroundColor = "rgb(" + colorSet[2][0] + ", " + colorSet[2][1] + ", " + colorSet[2][2] + ")";
    secondaryColor = colorSet[1];
    //console.log("Color Picker > The Company Secondary Color is: " + secondaryColor);
    //colorElement.innerHTML = 'rgb(' + secondaryColor[0] + ',' + secondaryColor[1] + ',' + secondaryColor[2] + ')';
    console.log("Color Picker > The Company Logo is: " + img.src);
    logoElement.innerHTML = img.src;
    
    colorOption1.onmouseenter = colorOption2.onmouseenter = colorOption3.onmouseenter = function () {
        this.style.backgroundColor = this.style.backgroundColor.substr(0, 3).concat("a").concat(this.style.backgroundColor.substring(3).replace(")", ", 0.8)"));
    };
    colorOption1.onmouseleave = colorOption2.onmouseleave = colorOption3.onmouseleave = function () {
        this.style.backgroundColor = this.style.backgroundColor.replace(/,[^,\)]+\)$/, ", 1)");
    };
    colorOption1.onclick = colorOption2.onclick = colorOption3.onclick = selectColor;
    
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
};