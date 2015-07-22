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

var DELIVERABILITY = DELIVERABILITY || {};

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
    $("#email")[0].value = "reade.demo@marketo.com";
    $("#password")[0].value = "marketo17";
    // This needs to change if another button is ever added to the login
    // page. Currently, the submit button is the only one.
    $("button")[0].click();
}

/**************************************************************************************
 *  
 *  This function removes the settings menu from the page, so that users cannot
 *  change the administrative controls on the account. This function should be called
 *  on all 250ok pages.
 *
 *  @Author Andy
 *
 *  @function
 *
 **************************************************************************************/

DELIVERABILITY.removeSettingsMenu = function () {
    console.log("Deliverability > Removing: Settings Menu");

    $(".dropdown").each(function () {
        $(this).remove();
    });
}

/**************************************************************************************
 *  
 *  This function removes the create test button from the Design Informant page. The 
 *  button is on the main page and not inside of the individual assets. This function 
 *  should only be called in the /app/design-informant/ section of the app.
 *
 *  @Author Andy
 *
 *  @function
 *
 **************************************************************************************/

DELIVERABILITY.removeCreateTestButton = function () {
    console.log("Deliverability > Removing: Create Test Button");
    
    $("#tour-design-add-anchor").remove();
}

/**************************************************************************************
 *  
 *  This function removes the delete button from the Inbox Informant page. The app
 *  toggles the display of this button depending on if an inbox is selected or not. 
 *  Currently, removing the DOM element altogether does not result in errors in the 
 *  JS console. This function should only be called in the /app/inbox-informant/ section
 *  of the app.
 *
 *  @Author Andy
 *
 *  @function
 *
 **************************************************************************************/

DELIVERABILITY.removeInboxDeleteButton = function () {
    console.log("Deliverability > Removing: Inbox Delete Button");

    $("#btndelete").remove();
}

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
    // If buttons is empty, than the selector must be mmalformed.
    if (buttons.length == 0) {
        console.log("Deliverability > Error: removeGenericButton() received an empty selector.");
        return;
    }
    
    // There is no break inside the loop because some pages have multiple
    // buttons that need to be deleted.
    for (var ii = 0; ii < buttons.length; ++ii) {
        if ($(buttons[ii]).attr(property) == null) {
            continue;
        }
        else if ($(buttons[ii]).attr(property).search(target) != -1) {
            $(buttons[ii]).remove();
        }
    }
}

/**************************************************************************************
 *  
 *  This function removes the delete buttons from a campaign's page. The button
 *  only appears if you click on one of the checkboxes. This function should only 
 *  be called in the /app/inbox-informant/campaign/ section of the app.
 *
 *  @Author Andy
 *
 *  @function
 *
 **************************************************************************************/

DELIVERABILITY.removeInboxDrillDownDeleteButtons = function () {
    console.log("Deliverability > Removing: Campaign Delete Buttons");

    DELIVERABILITY.removeGenericButton($("button"), "value", "delete");
}

/**************************************************************************************
 *  
 *  This function removes the delete button from the Design Informant page. The button
 *  only appears if you click on a specific design. This function should only be called 
 *  in the /app/design-informant/ section of the app.
 *
 *  @Author Andy
 *
 *  @function
 *
 **************************************************************************************/

DELIVERABILITY.removeDesignDeleteButton = function () {
    console.log("Deliverability > Removing: Design Delete Button");

    DELIVERABILITY.removeGenericButton($(".btn.btn-default.pull-right.vertspacerx2.spacerx2"), "href", "action=delete");
}

/**************************************************************************************
 *  
 *  This function removes the profiles button from the Inbox Informant page. This function 
 *  should only be called in the /app/inbox-informant/ section of the app.
 *
 *  @Author Andy
 *
 *  @function
 *
 **************************************************************************************/

DELIVERABILITY.removeManageProfilesButton = function () {
    console.log("Deliverability > Removing: Manage Profiles Button");

    DELIVERABILITY.removeGenericButton($(".btn.btn-sm.btn-success.vertspacerx2.spacer"), "href", "/app/inbox-informant/profiles");
}

/**************************************************************************************
 *  
 *  This function removes the save button from the Reports page. The button only appears
 *  on the custom report builder. This function should only be called in the 
 *  /app/reports/report/custom/build section of the app.
 *
 *  @Author Andy
 *
 *  @function
 *
 **************************************************************************************/

DELIVERABILITY.removeReportSaveButton = function () {
    console.log("Deliverability > Removing: Run and Save Button");

    DELIVERABILITY.removeGenericButton($(".btn.btn-success"), "value", "Run and Save");
}

/**************************************************************************************
 *  
 *  Main
 *
 **************************************************************************************/

currentUrl = window.location.href;
DELIVERABILITY.removeSettingsMenu();

if (currentUrl.search("^https:\/\/250ok.com\/login$") != -1) {
    DELIVERABILITY.login();
}
else if (currentUrl.search("\/app\/design-informant$") != -1) {
    DELIVERABILITY.removeCreateTestButton();
}
else if (currentUrl.search("\/app\/design-informant\/[0-9a-zA-Z]+$") != -1) {
    DELIVERABILITY.removeDesignDeleteButton();
}
else if (currentUrl.search("\/app\/inbox-informant$") != -1) {
    DELIVERABILITY.removeInboxDeleteButton();
    DELIVERABILITY.removeManageProfilesButton();
}
else if (currentUrl.search("app\/inbox-informant\/campaign\/[0-9a-zA-Z]+$") != -1) {
    DELIVERABILITY.removeInboxDrillDownDeleteButtons();
}
else if(currentUrl.search("\/app\/reports\/report\/custom\/build$") != -1) {
    DELIVERABILITY.removeReportSaveButton();
}
