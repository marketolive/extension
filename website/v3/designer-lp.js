function getCookieFunction(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

var company = getCookieFunction('company');
var color = getCookieFunction('color');
var companyName = "turner";
var logo = "http://marketolive.com/m2_update/assets/img/turner-tech-green.png";

if(company != "turner"){
  logo = "https://logo.clearbit.com/" + company;
  if(company.indexOf("com") != -1)
    companyName = company.substring(0, company.length - 4);
  else{
    companyName = company.substring(0, company.length - 3);
  }
}
console.log("Logo and color :", logo, color);

var myIframe = document.getElementById('iframeComponent-1039-body');
myIframe.onload = function() {

  var isMktPageInterval = window.setInterval(function() {
      if (typeof(MktPage) !== "undefined") {
          if (MktPage.savedState.custPrefix.search("mktodemoaccount") != -1
          && (MktPage.userid.search("\.demo@marketo\.com") != -1
          || MktPage.userid.search("admin@mktodemoaccount") != -1)) {
            var logoBkg = document.getElementsByTagName("iframe")[0].contentWindow.document.getElementById("lp-logo").src = logo;
            var background = document.getElementsByTagName("iframe")[0].contentWindow.document.getElementById("background-color").style.backgroundColor = color;
            var button = document.getElementsByTagName("iframe")[0].contentWindow.document.getElementById("bigger-background").style.backgroundColor = color;
            var subtitle = document.getElementsByTagName("iframe")[0].contentWindow.document.getElementById("sub-title").innerHTML = companyName + " invites you to join:";
            console.log(logoBkg, background, button);
          }
      window.clearInterval(isMktPageInterval);
      }
  });
}