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
	var URL_PATH = "m3",
        background = chrome.extension.getBackgroundPage(),
	    priv = "true",
        tags = document.getElementsByClassName("link"),
		submit = document.getElementById('company-submit'),
		toggle = document.getElementById('option-toggle'),
		clear = document.getElementById('clear-submit'),
		settings = document.getElementById('settings'),
		close = document.getElementById('close'),
		data = {'company' : 'turner'};
	
	chrome.storage.sync.get(["editPrivileges"], function(storage) {
		console.log("storage.editPrivileges = " + storage.editPrivileges);
		var editPriv = storage.editPrivileges;
		if (typeof(editPriv) == "undefined") {
			priv = "true";
			background.savePriv({"editPrivileges" : "true"});
		}
		else {
			priv = editPriv;
		}
		console.log(editPriv);
	});
	
	// getElementsByClassName() returns an array, so the click
	// listener needs to be added to each one individually.
	for (var ii = 0; ii < tags.length; ++ii) {
		tags[ii].onclick = function () {
			chrome.tabs.create({ url: this.href, selected : true });
       }
	}

	settings.onclick = function() {
		document.getElementById('settings-container').style.display = "block";
		document.getElementById('status').style.display = "block";
		if (priv == "true") {
			document.getElementById('toggle').src = "https://marketolive.com/"+URL_PATH+"/assets/img/toggle-on.png";
			document.getElementById('button-display').style.display = "inline-block";
		}
		else if (priv == "false") {
			document.getElementById('toggle').src = "https://marketolive.com/"+URL_PATH+"/assets/img/toggle-off.png";
			document.getElementById('button-display').style.display = "inline-block";
		}
	}

	close.onclick = function() {
		document.getElementById('settings-container').style.display = "none";
	}

	clear.onclick = function() {
		background.submitCompany(data);
        document.getElementById('settings-container').style.display = "none";
	}
	
	submit.onclick = function() {
		if (document.querySelector('#name-entered').value != "") {
			background.submitCompany({'company': document.querySelector('#name-entered').value});
		}
		else {
			console.log("Popup > Error: Submitting Company");
		}
   }
   
   toggle.onclick = function() {
		if (priv == "true") {
			document.getElementById('toggle').src = "https://marketolive.com/"+URL_PATH+"/assets/img/toggle-off.png";
			background.savePriv({'editPrivileges' : "false"});
		}
		else if (priv == "false") {
			document.getElementById('toggle').src = "https://marketolive.com/"+URL_PATH+"/assets/img/toggle-on.png";
			background.savePriv({'editPrivileges' : "true"});
		}
	}
}