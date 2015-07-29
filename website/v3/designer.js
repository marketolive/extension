function getCookieFunction(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

var company = getCookieFunction('company');
var color = getCookieFunction('color');

var logo = "http://marketolive.com/m2_update/assets/img/turner-tech-white.png";
if(company != "turner")
  var logo = "https://logo.clearbit.com/" + company;
console.log("Logo and color :", logo, color);

var myIframe = document.getElementById('iframeComponent-1038-body');
myIframe.onload = function() {

  var isMktPageInterval = window.setInterval(function() {
      if (typeof(MktPage) !== "undefined") {
          if (MktPage.savedState.custPrefix.search("mktodemoaccount") != -1
          && (MktPage.userid.search("\.demo@marketo\.com") != -1
          || MktPage.userid.search("admin@mktodemoaccount") != -1)) {
            var logoBkg = document.getElementsByTagName("iframe")[0].contentWindow.document.getElementById("logo-bkg").style.backgroundColor = color;
            var buttonBkg = document.getElementsByTagName("iframe")[0].contentWindow.document.getElementById("301593").style.backgroundColor = color;
            var imageSwap = document.getElementsByTagName("iframe")[0].contentWindow.document.getElementById("logo-swap").src = logo;
            console.log(imageSwap);
          }
      window.clearInterval(isMktPageInterval);
      }
  });
}