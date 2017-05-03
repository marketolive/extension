console.log("Deliverability > Running");

/**************************************************************************************
 *
 *  This module contains all of the functionality needed for preventing unwanted
 *  manipulation of the 250ok app. It handles the login process to ensure that users
 *  are entered into the correct subscription, and it hides all of the administrative
 *  buttons inside the GUI. This module is loaded by the marketoLive plugin on the
 *  250ok domain. Since the 250ok app is a website and not a single page web-app,
 *  this module needs to be loaded on every page. Instead of using display: hidden,
 *  the functions remove DOM elements from the page altogether. This is to prevent
 *  a savvy user from turning the settings menu back on for example.
 *
 *  @Author Andy
 *
 *  @namespace
 *
 **************************************************************************************/

var currentUrl = window.location.href,

DELIVERABILITY = DELIVERABILITY || {};

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
    console.log("Deliverability > Login: App");
    
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
        console.log("Deliverability > Error: removeGenericButton() received an empty selector.");
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
    console.log("Deliverability > Removing: Delete Buttons");
    
    $("#btndelete").remove();
    DELIVERABILITY.removeGenericButton($(".action_copy"));
    DELIVERABILITY.removeGenericButton($(".action_delete"));
    DELIVERABILITY.removeGenericButton($(".btn.copy"));
    DELIVERABILITY.removeGenericButton($(".btn.delete"));
    DELIVERABILITY.removeGenericButton($(".btn.btn-success"), "value", /save/i);
    DELIVERABILITY.removeGenericButton($(".btn.btn-success"), "value", /update/i);
    DELIVERABILITY.removeGenericButton($("button"), "value", /delete/i);
    DELIVERABILITY.removeGenericButton($(".btn"), "onclick", "^return confirm\\(");
    //DELIVERABILITY.removeGenericButton($(".btn"), "href", /action=delete/i);
};

/**************************************************************************************
 *
 *  Main
 *
 **************************************************************************************/

if (currentUrl.search("^https:\/\/250ok.com\/login\\?submit=true$") != -1) {
    DELIVERABILITY.login();
} else {
    DELIVERABILITY.removeDeleteButtons();
}