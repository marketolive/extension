console.log("OneLogin > Running");

/**************************************************************************************
 *
 *  This script contains all of the functionality needed for retrieving the current
 *  user's name and email address from OneLogin.
 *
 *  @Author Brian Fisher
 *
 *  @namespace
 *
 **************************************************************************************/

var devExtensionId = "dokkjhbgengdlccldgjnbilajdbjlnhm",
prodExtensionId = "onibnnoghllldiecboelbpcaeggfiohl",
extensionId = prodExtensionId,

ONELOGIN = ONELOGIN || {};

/**************************************************************************************
 *
 *  This function retrieves the username, first name, last name, and email address of
 *  the current OneLogin user.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

ONELOGIN.getOneLoginUser = function () {
  var isOneLoginUser = window.setInterval(function () {
      if (typeof(Application) !== "undefined"
         && Application.user) {
        console.log("OneLogin > Getting: User");
        
        window.clearInterval(isOneLoginUser);
        
        var oneLoginUser = {
          username: Application.user.username,
          firstName: Application.user.firstname,
          lastName: Application.user.lastname,
          email: Application.user.email
        },
        isHeapAnalyticsForOneLogin;
        
        oneLoginUser.action = "setOneLoginUser";
        chrome.runtime.sendMessage(extensionId, oneLoginUser, function (response) {
          console.log("OneLogin > Receiving: Message Response from Background: " + response);
          
          return response;
        });
      } else {
        console.log("OneLogin > NOT Getting: User");
      }
    }, 0);
};

/**************************************************************************************
 *
 *  Main
 *
 **************************************************************************************/

ONELOGIN.getOneLoginUser();