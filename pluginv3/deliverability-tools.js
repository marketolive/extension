console.log("250ok > Running");

/**************************************************************************************
 *
 *  This script contains all of the functionality needed for preventing unwanted
 *  manipulation of the 250ok app. It handles the login process to ensure that users
 *  are entered into the correct subscription, and it hides all of the administrative
 *  buttons inside the GUI. This script is loaded by the marketoLive plugin on the
 *  250ok domain. Since the 250ok app is a website and not a single page web-app,
 *  this script needs to be loaded on every page. Instead of using display: hidden,
 *  the functions remove DOM elements from the page altogether. This is to prevent
 *  a savvy user from turning the settings menu back on for example.
 *
 *  @Author Andy
 *
 *  @namespace
 *
 **************************************************************************************/

var devExtensionId = "dokkjhbgengdlccldgjnbilajdbjlnhm",
prodExtensionId = "onibnnoghllldiecboelbpcaeggfiohl",
extensionId = prodExtensionId,

DELIVERABILITY = DELIVERABILITY || {};

/**************************************************************************************
 *
 *  This function issues an HTTP request.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {String} url - The HTTP request URL.
 *  @param {String} params - The parameters to pass in the body of the request.
 *  @param {String} method - The HTTP request method (e.g. GET, POST, PATCH).
 *  @param {String} responseType - The type of the response (e.g. document, json, text).
 *  @param {Function} callback - The callback function.
 *
 **************************************************************************************/

DELIVERABILITY.webRequest = function (url, params, method, async, responseType, callback) {
  console.log("Web Request > " + url + "\n" + params);
  var xmlHttp = new XMLHttpRequest(),
  result;
  xmlHttp.onreadystatechange = function () {
    if (typeof(callback) === "function"
       && xmlHttp.readyState == 4
       && xmlHttp.status == 200)
      result = callback(xmlHttp.response);
  }
  if (async
     && xmlHttp.responseType) {
    xmlHttp.responseType = responseType;
  }
  xmlHttp.open(method, url, async); // true for asynchronous
  xmlHttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
  xmlHttp.send(params);
  return result;
};

/**************************************************************************************
 *
 *  This function automatically fills out the 250ok login form and clicks submit.
 *
 *  @Author Andy
 *
 *  @function
 *
 **************************************************************************************/

DELIVERABILITY.login = function () {
  console.log("250ok > Login: App");
  
  // jQuery returns an array even though an id is selected, which
  // is why there is a [0] on the email and password selectors.
  $("#email")[0].value = "marketolive@marketo.com";
  $("#password")[0].value = "!Marketo17";
  // This needs to change if another button is ever added to the login
  // page. Currently, the submit button is the only one.
  $("button")[0].click();
};

/**************************************************************************************
 *
 *  This function is a generalization of some of the other functions. For buttons
 *  without ids, they have unique property values. The strategy is to create as specific
 *  of a selector as possible, loop through the elements, and search for the desired
 *  property value that uniquely identifies the element.
 *
 *  @Author Andy
 *
 *  @function
 *
 *  @param buttons {array} -    This is the array of DOM elements that is returned
 *                              by the query. The functions in this module will
 *                              use something to the effect of $(".class").
 *  @param property {string} -  The property name to search the buttons array for.
 *  @param target {string} -    The property value to search the buttons array for.
 *
 **************************************************************************************/

DELIVERABILITY.removeGenericButton = function (buttons, property, target) {
  // If buttons is empty, than the selector must be malformed.
  if (buttons.length == 0) {
    console.log("250ok > Error: removeGenericButton() received an empty selector.");
    return;
  }
  
  // There is no break inside the loop because some pages have multiple
  // buttons that need to be deleted.
  for (var ii = 0; ii < buttons.length; ++ii) {
    if (property
       && target) {
      if ($(buttons[ii]).attr(property) == null) {
        continue;
      } else if ($(buttons[ii]).attr(property).search(target) != -1) {
        $(buttons[ii]).remove();
      }
    } else {
      $(buttons[ii]).remove();
    }
  }
};

/**************************************************************************************
 *
 *  This function removes delete, save, and update buttons from all locations within
 *  250ok. Currently, removing the DOM element altogether does not result in errors in
 *  the JS console.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

DELIVERABILITY.removeDeleteButtons = function () {
  console.log("250ok > Removing: Delete Buttons");
  
  $("#btndelete").remove();
  DELIVERABILITY.removeGenericButton($(".action_copy"));
  DELIVERABILITY.removeGenericButton($(".action_delete"));
  DELIVERABILITY.removeGenericButton($(".btn.copy"));
  DELIVERABILITY.removeGenericButton($(".btn.delete"));
  DELIVERABILITY.removeGenericButton($(".btn.btn-success"), "value", /(save|update|create|upload|import)/i);
  DELIVERABILITY.removeGenericButton($("button"), "value", /delete/i);
  DELIVERABILITY.removeGenericButton($(".btn"), "onclick", "^return confirm\\(");
  //DELIVERABILITY.removeGenericButton($(".btn"), "href", /action=delete/i);
};

/**************************************************************************************
 *
 *  This function removes create, save, and add buttons from all locations within
 *  250ok. Currently, removing the DOM element altogether does not result in errors in
 *  the JS console.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

DELIVERABILITY.removeSubmitButtons = function () {
  console.log("250ok > Removing: Submit Buttons");
  
  $("#add_widget").remove();
  $("#new_dashboard").remove();
  $("#change_dashboard").remove();
  $("#create-campaign-anchor").remove();
  $("#saveFilters").remove();
  $("#tour-design-add-anchor").remove();
  $("#create_alert").remove();
};

/**************************************************************************************
 *
 *  This function sends a message to the extension to determine if the current version
 *  of the extension meets or exceeds the mininum required version given.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param minVersion {String} - minimum required version of the extension (#.#.#)
 *
 **************************************************************************************/

DELIVERABILITY.toRemoveSubmitButtons = function (minVersion) {
  chrome.runtime.sendMessage(extensionId, {
    action: "checkExtensionVersion",
    minVersion: minVersion
  }, null, function (response) {
    if (response == null
       || !response.isValidExtension) {
      DELIVERABILITY.removeSubmitButtons();
    }
  });
};

/**************************************************************************************
 *
 *  Main
 *
 **************************************************************************************/

var userId = "marketolive@marketo.com",
extensionMinVersion = "5.1.2";

if (window.location.href == ("https://250ok.com/login?submit=true")) {
  DELIVERABILITY.login();
} else if ($("#email").length == 1) {
  if ($("#email")[0].value == userId) {
    DELIVERABILITY.removeDeleteButtons();
    DELIVERABILITY.toRemoveSubmitButtons(extensionMinVersion);
  }
} else {
  DELIVERABILITY.webRequest('/app/account', null, 'GET', true, 'document', function (response) {
    var el = document.createElement("html"),
    email;
    
    el.innerHTML = response;
    email = el.querySelector("#email").value;
    if (email == userId) {
      DELIVERABILITY.removeDeleteButtons();
      DELIVERABILITY.toRemoveSubmitButtons(extensionMinVersion);
    }
  });
}