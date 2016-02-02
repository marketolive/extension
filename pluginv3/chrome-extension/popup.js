/**************************************************************************************
 *
 *  For whatever reason, Chrome does not allow the opening of links from inside
 *  popup.html. The workaround for this is contained below. We select all of the
 *  <a> tags, and then add a click listener that calls window.open() on the <a>
 *  tag's target URL. Jquery is also not allowed by Chrome in this context.
 *
 *  @Author Andy
 *
 *  @function
 *
 **************************************************************************************/
console.log("Popup > Running");

window.onload = function() {

    // This is a strange idiosyncrasy with chrome plugins. You cannot directly reference the local
    // folders without hard-coding the unique id of the plugin, which may potentially change. This is
    // the alternative to using <img src="whatever">
    document.getElementById("logo-size").src = chrome.extension.getURL("images/marketo-live-image-purp.png");
    document.getElementById("gear-size").src = chrome.extension.getURL("images/popupsettings.png");
    document.getElementById("toggle").src = chrome.extension.getURL("images/toggle-on.png");
    document.getElementById("rtp").src = chrome.extension.getURL("images/rtp-image.png");
    document.getElementById("ecommerce").src = chrome.extension.getURL("images/shopping-cart-purple.png");
    document.getElementById("mobile-moments").src = chrome.extension.getURL("images/marketo_moments.png");
    document.getElementById("mobile-engagement").src = chrome.extension.getURL("images/mobile_engagement.png");
    document.getElementById("mobile-msi").src = chrome.extension.getURL("images/mobile_msi.png");
    document.getElementById("event-check-in").src = chrome.extension.getURL("images/marketoball.png");
    document.getElementById('toggle').src = chrome.extension.getURL("images/toggle-on.png");
    document.getElementById('help-size').src = chrome.extension.getURL("images/help-white.png");
    document.getElementById('training').src = chrome.extension.getURL("images/training-icon-purple-small.png");
    document.getElementById('report-a-bug').src = chrome.extension.getURL("images/report-a-bug-img-purp.png");

    var URL_PATH = "m3-dev",
        background = chrome.extension.getBackgroundPage(),
        priv = true,
        tags = document.getElementsByClassName("link"),
        company = document.getElementById("name-entered"),
        submit = document.getElementById('company-submit'),
        toggle = document.getElementById('option-toggle'),
        clear = document.getElementById('clear-submit'),
        settings = document.getElementById('settings'),
        help = document.getElementById('help'),
        settingsOpen = false,
        helpOpen = false,
        close = document.getElementById('close'),
        data = {
            'company': 'turner'
        },
        goToColorPicker = function(parameter) {
            window.open("https://marketolive.com/"+URL_PATH+"/apps/color-picker.html?company=" + parameter);
        }

    // getElementsByClassName() returns an array, so the click
    // listener needs to be added to each one individually.
    for (var ii = 0; ii < tags.length; ++ii) {
        // This is for running the Android apps inside the Chrome browser
//        if (tags[ii].id == "mobile-moments-app") {
//			tags[ii].onclick = function() {chrome.management.launchApp("eljfcfjdjcjilbhnjnimaigfaankeolk")};
//		} 
//		else {
           tags[ii].onclick = function() {
               chrome.tabs.create({
                   url: this.href,
                   selected: true
				});
			}
//		}
	}

    help.onclick = function () {
        if (!helpOpen) {
            helpOpen = true;
            document.getElementById('help-container').style.display = "block";
        } 
        else {
            helpOpen = false;
            document.getElementById('help-container').style.display = "none";
        }
    }

    settings.onclick = function () {
        if (!settingsOpen) {
            settingsOpen = true;
            document.getElementById('settings-container').style.display = "block";
        } 
        else {
            settingsOpen = false;
            document.getElementById('settings-container').style.display = "none";
        }
    }

    clear.onclick = function () {
        background.resetLogo();
        background.resetColor();
        document.getElementById('settings-container').style.display = "none";
    }

    submit.onclick = function (e) {
        goToColorPicker(company.value);
    }
    
    company.onkeyup = function (e) {
        if (e.keyCode == 13) {
            goToColorPicker(this.value);
            return;
        }
        else {
            return;
        }
    }

    toggle.onclick = function() {
        if (priv) {
            priv = false;
            document.getElementById('toggle').src = chrome.extension.getURL("images/toggle-off.png");
            background.savePriv({
                'editPrivileges': "false"
            });
        } 
        else {
            priv = true;
            document.getElementById('toggle').src = chrome.extension.getURL("images/toggle-on.png");
            background.savePriv({
                'editPrivileges': "true"
            });
        }
    }
}