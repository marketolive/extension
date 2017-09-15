$('.body-container').click(function () {
    x = 0;
    $('.side-bar').css('background-color', 'transparent');
    $('.side-bar-inner-container').css('display', 'none');
});
var devExtensionId = "dokkjhbgengdlccldgjnbilajdbjlnhm",
prodExtensionId = "onibnnoghllldiecboelbpcaeggfiohl",
extensionId = devExtensionId,
reload = location.search.split('reloaded=')[1],
colorThief = new ColorThief(),
canvas = document.getElementById('image').getContext("2d"),
heroBackground = getCookie("heroBackground"),
heroBackgroundRes = getCookie("heroBackgroundRes"),
img = new Image(),
logoElement = document.getElementById("cookie-logo"),
colorElement = document.getElementById("cookie-color"),
searchBox = document.getElementById("searchBox"),
searchButton = document.getElementById("searchButton"),
prevButton = document.getElementById("prevButton"),
nextButton = document.getElementById("nextButton"),
searchResults = document.getElementById("searchResults"),
key = "AIzaSyC9pdVq6GfquP_MtHCS_izS6Vijdv1ZfNc",
cx = "014680826408884315290:pmyltjjihus",
startIndex = 1,
colorSet,
selectImgSrc,
selectImgRes,
getCompanyDomain,
companyDomain;

function loadScript (scriptSrc) {
    console.log("Color Picker > Loading: Script: " + scriptSrc);
    
    var scriptElement = document.createElement("script");
    scriptElement.async = true;
    scriptElement.src = scriptSrc;
    document.getElementsByTagName("head")[0].appendChild(scriptElement);
}

function getCookie(cookieName) {
    console.log("Color Picker > Getting: Cookie " + cookieName);
    
    var name = cookieName + '=',
    cookies = document.cookie.split(';'),
    currCookie;
    
    for (var ii = 0; ii < cookies.length; ii++) {
        currCookie = cookies[ii].trim();
        if (currCookie.indexOf(name) == 0) {
            return currCookie.substring(name.length, currCookie.length);
        }
    }
    console.log("Color Picker > Getting: Cookie " + cookieName + " not found");
    return null;
}

function resultsHandler(response) {
    if (response.queries) {
        if (response.queries.request
             && response.queries.request[0]
             && response.queries.request[0].startIndex > 1
             && response.queries.previousPage
             && response.queries.previousPage[0]
             && response.queries.previousPage[0].startIndex) {
            
            prevButton.onclick = function () {
                searchButton.onclick(response.queries.previousPage[0].startIndex);
            }
            prevButton.style.display = "inline-block";
        } else {
            prevButton.style.display = "none";
        }
        
        if (response.queries.nextPage
             && response.queries.nextPage[0]
             && response.queries.nextPage[0].startIndex) {
            
            nextButton.onclick = function () {
                searchButton.onclick(response.queries.nextPage[0].startIndex);
            }
            nextButton.style.display = "inline-block";
            
        } else {
            nextButton.style.display = "none";
        }
    }
    
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
                selectImgSrc = this.src;
                this.parentElement.style.opacity = null;
                for (var jj = 0; jj < imgs.length; jj++) {
                    if (imgs[jj].src != this.src) {
                        imgs[jj].isSelected = false;
                        imgs[jj].parentElement.style.opacity = "0.5";
                    }
                }
                console.log("Color Picker > Hero Image: " + selectImgSrc);
            } else {
                this.isSelected = false;
                selectImgSrc = null;
                for (var jj = 0; jj < imgs.length; jj++) {
                    imgs[jj].parentElement.style.opacity = null;
                }
            }
        };
        itemImgText.className = "search-result-text";
        itemImgText.innerText = selectImgRes = item.image.width + " × " + item.image.height;
        
        itemResult.appendChild(itemImg);
        itemResult.appendChild(itemImgText);
        searchResults.appendChild(itemResult);
    }
}

searchButton.onclick = function (startIndex) {
    if (!Number.isInteger(startIndex)) {
        startIndex = 1;
    }
    searchResults.innerHTML = null;
    loadScript("https://www.googleapis.com/customsearch/v1?key="+key+"&cx="+cx+"&fields=queries(request/startIndex,previousPage/startIndex,nextPage/startIndex),items(link,image/height,image/width)&filter=1&num=10&searchType=image&imgType=photo&callback=resultsHandler&q="+encodeURIComponent(searchBox.value)+"&start=" + startIndex);
};

function sendCompanyMsg() {
    chrome.runtime.sendMessage(extensionId, {
        action: "setCompanyCookies",
        logo: logoElement.innerHTML,
        color: colorElement.innerHTML,
        image: selectImgSrc,
        imageRes: selectImgRes
    },
        function (response) {
        console.log("Color Picker > Receiving: Message Response from Background: " + response);
        
        return response;
    });
    
    chrome.runtime.sendMessage(devExtensionId, {
        action: "setCompanyCookies",
        logo: logoElement.innerHTML,
        color: colorElement.innerHTML,
        image: selectImgSrc,
        imageRes: selectImgRes
    },
        function (response) {
        console.log("Color Picker > Receiving: Message Response from Background: " + response);
        
        return response;
    });
    
    window.close();
}
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
            console.log("Color Picker > Company Domain: " + companyDomain);
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
    img.src = "https://logo.clearbit.com/" + companyDomain + '?size=100';
} else {
    document.getElementById('company-image-title').innerHTML = "No Logo Found";
    img.src = "";
}

if (heroBackground) {
    var itemResult = document.createElement("div"),
    itemImg = document.createElement("img"),
    itemImgText = document.createElement("div");
    
    itemResult.className = "search-result";
    itemImg.className = "search-result-img";
    itemImg.src = heroBackground;
    itemImg.isSelected = true;
    selectImgSrc = heroBackground;
    itemImgText.className = "search-result-text";
    itemImgText.innerText = heroBackgroundRes;
    itemImg.onclick = function () {
        if (!this.isSelected) {
            this.isSelected = true;
            this.parentElement.style.opacity = null;
            selectImgSrc = heroBackground;
            console.log("Color Picker > Hero Image: " + selectImgSrc);
        } else {
            this.isSelected = false;
            this.parentElement.style.opacity = "0.5";
            selectImgSrc = null;
        }
    };
        
    itemResult.appendChild(itemImg);
    itemResult.appendChild(itemImgText);
    searchResults.appendChild(itemResult);
}

img.onload = function () {
    var color = getCookie("color"),
    logo = getCookie("logo"),
    colorOption1 = document.getElementById("color-option-1"),
    colorOption2 = document.getElementById("color-option-2"),
    colorOption3 = document.getElementById("color-option-3"),
    colorOption4 = document.getElementById("color-option-4"),
    correct = document.getElementById("correct"),
    incorrect = document.getElementById("incorrect");
    
    canvas.drawImage(img, 0, 0);
    colorSet = colorThief.getPalette(img, 3);
    colorOption1.style.backgroundColor = "rgb(" + colorSet[0][0] + ", " + colorSet[0][1] + ", " + colorSet[0][2] + ")";
    colorOption2.style.backgroundColor = "rgb(" + colorSet[1][0] + ", " + colorSet[1][1] + ", " + colorSet[1][2] + ")";
    colorOption3.style.backgroundColor = "rgb(" + colorSet[2][0] + ", " + colorSet[2][1] + ", " + colorSet[2][2] + ")";
    colorOption4.style.backgroundColor = "rgb(255, 255, 255)";
    console.log("Color Picker > Company Logo: " + img.src);
    logoElement.innerHTML = img.src;
    if (img.src == logo) {
        colorElement.innerHTML = null;
    }
    
    colorOption1.onclick = colorOption2.onclick = colorOption3.onclick = colorOption4.onclick = function () {
        var colorOptions = document.getElementsByClassName("color-option");
        if (!this.isSelected) {
            this.isSelected = true;
            colorElement.innerHTML = this.style.backgroundColor;
            this.style.opacity = null;
            for (var jj = 0; jj < colorOptions.length; jj++) {
                if (colorOptions[jj].style.backgroundColor != this.style.backgroundColor) {
                    colorOptions[jj].isSelected = false;
                    colorOptions[jj].style.opacity = "0.33";
                }
            }
            console.log("Color Picker > Company Color: " + colorElement.innerHTML);
        } else {
            this.isSelected = false;
            colorElement.innerHTML = null;
            for (var jj = 0; jj < colorOptions.length; jj++) {
                colorOptions[jj].style.opacity = null;
            }
        }
    };
    
    switch (color) {
    case colorOption1.style.backgroundColor:
        colorOption1.click();
        break;
    
    case colorOption2.style.backgroundColor:
        colorOption2.click();
        break;
    
    case colorOption3.style.backgroundColor:
        colorOption3.click();
        break;
    
    case colorOption4.style.backgroundColor:
        colorOption4.click();
        break;
    }
    
    correct.onclick = sendCompanyMsg;
    document.onkeyup = function (e) {
        if (e.which == 13) {
            startIndex = 1;
            searchButton.onclick(startIndex);
        }
    };
    
    incorrect.onclick = function () {
        document.getElementById('first').style.display = "none";
        document.getElementById('second').style.display = "block";
        document.getElementById('second-incorrect').style.display = "block";
    };
};