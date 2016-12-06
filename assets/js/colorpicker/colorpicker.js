$('.body-container').click(function () {
    x = 0;
    $('.side-bar').css('background-color', 'transparent');
    $('.side-bar-inner-container').css('display', 'none');
});
var devExtensionId = "aahhkppadknlakhbppohbeolcfdhmocf",
prodExtensionId = "onibnnoghllldiecboelbpcaeggfiohl",
extensionId = devExtensionId,
reload = location.search.split('reloaded=')[1],
colorThief = new ColorThief(),
canvas = document.getElementById('image').getContext("2d"),
img = new Image(),
logoElement = document.getElementById("cookie-logo"),
colorElement = document.getElementById("cookie-color"),
searchBox = document.getElementById("searchBox"),
searchButton = document.getElementById("searchButton"),
key = "AIzaSyC9pdVq6GfquP_MtHCS_izS6Vijdv1ZfNc",
cx = "014680826408884315290:pmyltjjihus",
colorSet,
selectImgSrc,
loadScript,
getCompanyDomain,
companyDomain;

function resultsHandler(response) {
    var searchResults = document.getElementById("searchResults");
    
    for (var ii = 0; ii < response.items.length; ii++) {
        var item = response.items[ii],
        itemResult = document.createElement("div"),
        itemImg = document.createElement("img"),
        itemImgText = document.createElement("div");
        
        itemResult.className = "search-result";
        itemImg.className = "search-result-img";
        itemImg.src = item.link;
        itemImg.onclick = function () {
            var imgs = document.getElementsByClassName("search-result-img");
            if (!this.isSelected) {
                this.isSelected = true;
                this.style.opacity = null;
                for (var jj = 0; jj < imgs.length; jj++) {
                    if (imgs[jj].src != this.src) {
                        imgs[jj].isSelected = false;
                        imgs[jj].style.opacity = "0.5";
                    }
                }
            } else {
                this.isSelected = false;
                for (var jj = 0; jj < imgs.length; jj++) {
                    imgs[jj].style.opacity = null;
                }
            }
            selectImgSrc = this.src;
        };
        itemImgText.className = "search-result-text";
        itemImgText.innerText = item.image.width + " × " + item.image.height;
        
        itemResult.appendChild(itemImg);
        itemResult.appendChild(itemImgText);
        searchResults.appendChild(itemResult);
    }
}

searchButton.onclick = function () {
    searchResults.innerHTML = null;
    loadScript("https://www.googleapis.com/customsearch/v1?key="+key+"&cx="+cx+"&fields=items(link,image/height,image/width)&filter=1&num=10&searchType=image&imgType=photo&q="+encodeURIComponent(searchBox.value)+"&callback=resultsHandler");
};

function sendCompanyMsg() {
    chrome.runtime.sendMessage(extensionId, {
        action: "setCompanyCookies",
        logo: logoElement.innerHTML,
        color: colorElement.innerHTML,
        image: selectImgSrc
    },
        function (response) {
        console.log("Color Picker > Receiving: Message Response from Background: " + response);
        
        return response;
    });
    
    window.close();
}

loadScript = function (scriptSrc) {
    console.log("Content > Loading: Script: " + scriptSrc);
    
    var scriptElement = document.createElement("script");
    scriptElement.async = true;
    scriptElement.src = scriptSrc;
    document.getElementsByTagName("head")[0].appendChild(scriptElement);
};

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
    var colorOption1 = document.getElementById("color-option-1"),
    colorOption2 = document.getElementById("color-option-2"),
    colorOption3 = document.getElementById("color-option-3"),
    correct = document.getElementById("correct"),
    incorrect = document.getElementById("incorrect");
    
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
    
    colorOption1.onclick = colorOption2.onclick = colorOption3.onclick = function () {
        var colorOptions = document.getElementsByClassName("color-option");
        if (!this.isSelected) {
            this.isSelected = true;
            colorElement.innerHTML = this.style.backgroundColor;
            this.style.opacity = null;
            for (var jj = 0; jj < colorOptions.length; jj++) {
                if (colorOptions[jj].style.backgroundColor != this.style.backgroundColor) {
                    colorOptions[jj].isSelected = false;
                    colorOptions[jj].style.opacity = "0.5";
                }
            }
        } else {
            this.isSelected = false;
            colorElement.innerHTML = null;
            for (var jj = 0; jj < colorOptions.length; jj++) {
                colorOptions[jj].style.opacity = null;
            }
        }
    };
    
    correct.onclick = sendCompanyMsg;
    document.onkeyup = function (e) {
        if (e.which == 13) {
            searchButton.onclick();
        }
    };
    
    incorrect.onclick = function () {
        document.getElementById('first').style.display = "none";
        document.getElementById('second').style.display = "block";
        document.getElementById('second-incorrect').style.display = "block";
    };
};