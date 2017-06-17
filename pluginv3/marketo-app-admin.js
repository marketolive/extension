console.log("Marketo App Admin > Running");

/**************************************************************************************
 *
 *  This content script contains all of the functionality needed for loading external
 *  scripts on the Marketo App.
 *
 *  @Author Brian Fisher
 *
 *  @namespace
 *
 **************************************************************************************/

var URL_PATH = "m3-dev",

MARKETO_LIVE_APP = "https://marketolive.com/" + URL_PATH + "/pluginv3/marketo-app.min.js",

ADMIN = ADMIN || {};

/**************************************************************************************
 *
 *  This function loads the given script source.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {String} scriptSrc - The URL of the desired script.
 *
 **************************************************************************************/

ADMIN.loadScript = function (scriptSrc) {
  console.log("Loading: Script: " + scriptSrc);
  
  var scriptElement = document.createElement("script");
  scriptElement.async = true;
  scriptElement.src = scriptSrc;
  document.getElementsByTagName("head")[0].appendChild(scriptElement);
};

/**************************************************************************************
 *
 *  This function gets the specified cookie for the current domain. It loops through
 *  the string contained in document.cookie and looks for the given cookie.
 *
 *  @Author Andrew Garcia
 *
 *  @function
 *
 *  @param {String} cookieName - Represents the key to search for inside document.cookie
 *
 **************************************************************************************/

ADMIN.getCookie = function (cookieName) {
  console.log("Marketo App Admin > Getting: Cookie " + cookieName);
  
  var name = cookieName + '=',
  cookies = document.cookie.split(';'),
  currCookie;
  
  for (var ii = 0; ii < cookies.length; ii++) {
    currCookie = cookies[ii].trim();
    if (currCookie.indexOf(name) == 0) {
      return currCookie.substring(name.length, currCookie.length);
    }
  }
  console.log("Getting: Cookie " + cookieName + " not found");
  return null;
};

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

ADMIN.webRequest = function (url, params, method, async, responseType, callback) {
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
  xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
  if (url.search(/^\//) != -1
     || url.replace(/^[a-z]+:\/\/([^\/]+)\/?.*$/, "$1") == window.location.host) {
    xmlHttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  }
  xmlHttp.send(params);
  return result;
};

/**************************************************************************************
 *
 *  This function validates the demo extension check that the Marketo subscription uses
 *  to enforce having the extension installed. The user experience with the Marketo
 *  feature as implemented today isn't ideal, so this function disables it altogether.
 *  Obviously, only having the extension could disable the check, so it's guaranteed
 *  that the user has the extension (unless they're very Javascript savvy and paste this
 *  in the console).
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

ADMIN.validateDemoExtensionCheck = function (isValidExtension) {
  console.log("Marketo App Admin > Validating: Demo Extension Check");
  
  if (isValidExtension) {
    window.mkto_live_extension_state = "MarketoLive extension is alive!";
    console.log("Marketo App Admin > Validating: Demo Extension IS Valid");
  } else if (MktPage
     && MktPage.validateDemoExtension) {
    window.mkto_live_extension_state = null;
    MktPage.validateDemoExtension(new Date());
    console.log("Marketo App Admin > Validating: Demo Extension IS NOT Valid");
  }
};

/**************************************************************************************
 *
 *  This function returns the difference in days between two dates.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

ADMIN.dateDiffInDays = function (a, b) {
  var _MS_PER_DAY = 1000 * 60 * 60 * 24,
  utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate()),
  utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  
  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
};

/**************************************************************************************
 *
 *  This function returns the appropriate user roles for the given language and
 *  instance.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {String} language - the languge of the user, English or 日本語（日本）
 *
 **************************************************************************************/

ADMIN.getUserRoles = function (language) {
  var roles;
  
  switch (MktPage.savedState.custPrefix) {
  case mktoAccountStringMaster:
    if (language == "日本語（日本）") {
      roles = '[{"id":1,"allzones":false,"zones":[]},{"id":1003,"allzones":true,"zones":[]},{"id":101,"allzones":false,"zones":[]},{"id":1001,"allzones":false,"zones":[]},{"id":102,"allzones":false,"zones":[]},{"id":1002,"allzones":true,"zones":[]},{"id":25,"allzones":false,"zones":[]},{"id":24,"allzones":false,"zones":[]},{"id":2,"allzones":false,"zones":[]},{"id":103,"allzones":false,"zones":[]}]';
    } else {
      roles = '[{"id":1,"allzones":false,"zones":[]},{"id":1003,"allzones":true,"zones":[]},{"id":101,"allzones":false,"zones":[]},{"id":1001,"allzones":false,"zones":[]},{"id":102,"allzones":false,"zones":[]},{"id":1002,"allzones":false,"zones":[{"id":1}]},{"id":25,"allzones":false,"zones":[]},{"id":24,"allzones":false,"zones":[]},{"id":2,"allzones":false,"zones":[]},{"id":103,"allzones":false,"zones":[]}]';
    }
    break;
  case mktoAccountString106:
    if (language == "日本語（日本）") {
      roles = '[{"id":1,"allzones":false,"zones":[]},{"id":113,"allzones":true,"zones":[{"id":"43"},{"id":"145"},{"id":"188"},{"id":"170"},{"id":"166"},{"id":"181"},{"id":"39"},{"id":"100"},{"id":"25"},{"id":"1"},{"id":"2"},{"id":"187"},{"id":"174"},{"id":"51"},{"id":"59"},{"id":"175"},{"id":"176"},{"id":"179"},{"id":"177"},{"id":"178"},{"id":"155"},{"id":"183"},{"id":"101"},{"id":"184"},{"id":"172"},{"id":"169"},{"id":"15"},{"id":"14"},{"id":"189"},{"id":"104"},{"id":"136"},{"id":"153"},{"id":"185"},{"id":"134"},{"id":"186"},{"id":"95"},{"id":"18"},{"id":"173"}]},{"id":104,"allzones":false,"zones":[]},{"id":107,"allzones":false,"zones":[]},{"id":102,"allzones":false,"zones":[{"id":"172"}]},{"id":109,"allzones":false,"zones":[{"id":"1"},{"id":"174"},{"id":"175"},{"id":"176"},{"id":"184"},{"id":"185"},{"id":"186"},{"id":"173"}]},{"id":105,"allzones":false,"zones":[]},{"id":25,"allzones":false,"zones":[]},{"id":24,"allzones":false,"zones":[]},{"id":2,"allzones":false,"zones":[]}]';
    } else {
      roles = '[{"id":1,"allzones":false,"zones":[]},{"id":113,"allzones":true,"zones":[{"id":"43"},{"id":"145"},{"id":"188"},{"id":"170"},{"id":"166"},{"id":"181"},{"id":"39"},{"id":"100"},{"id":"25"},{"id":"1"},{"id":"2"},{"id":"187"},{"id":"174"},{"id":"51"},{"id":"59"},{"id":"175"},{"id":"176"},{"id":"179"},{"id":"177"},{"id":"178"},{"id":"155"},{"id":"183"},{"id":"101"},{"id":"184"},{"id":"172"},{"id":"169"},{"id":"15"},{"id":"14"},{"id":"189"},{"id":"104"},{"id":"136"},{"id":"153"},{"id":"185"},{"id":"134"},{"id":"186"},{"id":"95"},{"id":"18"},{"id":"173"}]},{"id":104,"allzones":false,"zones":[]},{"id":107,"allzones":false,"zones":[]},{"id":102,"allzones":false,"zones":[{"id":"172"}]},{"id":109,"allzones":false,"zones":[{"id":"1"},{"id":"174"},{"id":"175"},{"id":"176"},{"id":"184"},{"id":"185"},{"id":"186"}]},{"id":105,"allzones":false,"zones":[]},{"id":25,"allzones":false,"zones":[]},{"id":24,"allzones":false,"zones":[]},{"id":2,"allzones":false,"zones":[]}]';
    }
    break;
  case mktoAccountString106d:
    if (language == "日本語（日本）") {
      roles = '[{"id":1,"allzones":false,"zones":[]},{"id":101,"allzones":false,"zones":[]},{"id":105,"allzones":false,"zones":[]},{"id":107,"allzones":false,"zones":[]},{"id":102,"allzones":false,"zones":[{"id":183}]},{"id":106,"allzones":false,"zones":[]},{"id":104,"allzones":false,"zones":[{"id":1},{"id":174},{"id":175},{"id":176},{"id":200},{"id":173}]},{"id":25,"allzones":false,"zones":[]},{"id":24,"allzones":false,"zones":[]},{"id":2,"allzones":false,"zones":[]},{"id":103,"allzones":false,"zones":[]}]';
    } else {
      roles = '[{"id":1,"allzones":false,"zones":[]},{"id":101,"allzones":false,"zones":[]},{"id":105,"allzones":false,"zones":[]},{"id":107,"allzones":false,"zones":[]},{"id":102,"allzones":false,"zones":[{"id":183}]},{"id":106,"allzones":false,"zones":[]},{"id":104,"allzones":false,"zones":[{"id":1},{"id":174},{"id":175},{"id":176},{"id":200}]},{"id":25,"allzones":false,"zones":[]},{"id":24,"allzones":false,"zones":[]},{"id":2,"allzones":false,"zones":[]},{"id":103,"allzones":false,"zones":[]}]';
    }
    break;
  }
  
  return roles;
};

/**************************************************************************************
 *
 *  This function invites a user, by default sending the invitation to marketodemo.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {Object} user - the user's information
 *          (required) email, userId, firstName, lastName, role
 *          (optional) directInvite - boolean, if true sends invite directly to user
 *
 **************************************************************************************/

ADMIN.inviteUser = function (user) {
  var userId = user.userId.replace(/\+/, "%2B"),
  firstName = user.firstName,
  lastName = user.lastName,
  email = user.email.replace(/\+/, "%2B"),
  role = user.role,
  message = '{{FirstName}} {{LastName}},<br><br>Welcome to Marketo!, Click this link to set your password and begin.<br><br>{{LoginToMarketoLink}}<br><br>Not sure where to start? Visit <a href="https://docs.marketo.com/display/DOCS/Getting+Started" target="_blank">Getting Started with Marketo page</a> for tutorials and other resources. You are already set up - dive right into Step 2!<br><br>Happy Marketing!',
  roles = ADMIN.getUserRoles(user.language);
  
  if (!user.directInvite) {
    email = "marketodemo%2B" + userId.split("@")[0] + "@gmail.com";
  }
  console.log("Inviting User: " + email + ", " + userId + ", " + firstName + ", " + lastName + ' [' + role + ']');
  ADMIN.webRequest('/custAdmin/inviteUserSubmit', 'ajaxHandler=MktSession&mktReqUid=' + new Date().getTime() + Ext.id(null, ':') + '&cadEmail=' + email + '&cadUserId=' + userId + '&cadFirstName=' + firstName + '&cadLastName=' + lastName + ' [' + role + ']' + '&cadApiOnly=false' + '&cadRole=' + roles + '&cadMessage=' + message + '&xsrfId=' + MktSecurity.getXsrfId(), 'POST', true, 'json', function (response) {
    console.log("Invited User");
  });
};

/**************************************************************************************
 *
 *  This function issues a Calendar license for the given user.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {String} userId - the ID of the user (aka Login ID)
 *
 **************************************************************************************/

ADMIN.issueCalendarLicense = function (userId) {
  console.log("Issuing Calendar License: " + userId);
  ADMIN.webRequest('/calendar/issueLicensesSubmit', 'ajaxHandler=MktSession&mktReqUid=' + new Date().getTime() + Ext.id(null, ':') + '&userIds=["' + userId + '"]' + '&xsrfId=' + MktSecurity.getXsrfId(), 'POST', true, 'json', function (response) {
    console.log("Issued Calendar License");
  });
};

/**************************************************************************************
 *
 *  This function revokes a Calendar license for the given user.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {String} userId - the ID of the user (aka Login ID)
 *
 **************************************************************************************/

ADMIN.revokeCalendarLicense = function (userId) {
  console.log("Revoking Calendar License: " + userId);
  ADMIN.webRequest('/calendar/revokeLicensesSubmit', 'ajaxHandler=MktSession&mktReqUid=' + new Date().getTime() + Ext.id(null, ':') + '&userIds=["' + userId + '"]' + '&xsrfId=' + MktSecurity.getXsrfId(), 'POST', true, 'json', function (response) {
    console.log("Revoked Calendar License");
  });
};

/**************************************************************************************
 *
 *  This function issues an ABM license for the given user.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {String} userId - the ID of the user (aka Login ID)
 *
 **************************************************************************************/

ADMIN.issueAbmLicense = function (userId) {
  console.log("Issuing ABM License: " + userId);
  ADMIN.webRequest('/abm/issueLicensesSubmit', 'ajaxHandler=MktSession&mktReqUid=' + new Date().getTime() + Ext.id(null, ':') + '&userIds=["' + userId + '"]' + '&xsrfId=' + MktSecurity.getXsrfId(), 'POST', true, 'json', function (response) {
    console.log("Issued ABM License");
  });
};

/**************************************************************************************
 *
 *  This function revokes an ABM license for the given user.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {String} userId - the ID of the user (aka Login ID)
 *
 **************************************************************************************/

ADMIN.revokeAbmLicense = function (userId) {
  console.log("Revoking ABM License: " + userId);
  ADMIN.webRequest('/abm/revokeLicensesSubmit', 'ajaxHandler=MktSession&mktReqUid=' + new Date().getTime() + Ext.id(null, ':') + '&userIds=["' + userId + '"]' + '&xsrfId=' + MktSecurity.getXsrfId(), 'POST', true, 'json', function (response) {
    console.log("Revoked ABM License");
  });
};

/**************************************************************************************
 *
 *  This function invites multiple users, by default sending the invitation to
 *  marketodemo.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param [Array of {Object}] users - the users' information
 *          (required) email, userId, firstName, lastName, role
 *          (optional) directInvite - boolean, if true sends invite directly to user
 *
 **************************************************************************************/

ADMIN.inviteUsers = function (users) {
  for (var ii = 0; ii < users.length; ii++) {
    var user = users[ii];
    
    console.log("Inviting User (" + (ii + 1) + "/" + users.length + ")");
    ADMIN.inviteUser(user);
  }
};

/**************************************************************************************
 *
 *  This function edits a user by resetting their information, importantly their roles
 *  and email. Used to reset their email from marketodemo to their real email.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param [Array of {Object}] users - the users' information
 *          (required) email, userId, firstName, lastName, role
 *
 **************************************************************************************/

ADMIN.editUser = function (user) {
  var userId = user.userId.replace(/\+/, "%2B"),
  firstName = user.firstName,
  lastName = user.lastName,
  role = user.role,
  newEmail = user.email.replace(/\+/, "%2B"),
  id = user.id,
  roles = ADMIN.getUserRoles(user.language);
  
  console.log("Editing User: " + userId + ", " + firstName + ", " + lastName + ", " + newEmail);
  ADMIN.webRequest('/custAdmin/editUserSubmit', 'ajaxHandler=MktSession&mktReqUid=' + new Date().getTime() + Ext.id(null, ':') + '&cadUserId=' + userId + '&cadFirstName=' + firstName + '&cadLastName=' + lastName + ' [' + role + ']' + '&cadEmail=' + newEmail + '&cadRole=' + roles + '&cadId=' + id + '&cadApiOnly=false&cadIsDeviceAuthEnabled=0' + '&xsrfId=' + MktSecurity.getXsrfId(), 'POST', true, 'json', function (response) {
    console.log("Edited User");
  });
};

/**************************************************************************************
 *
 *  This function id for editing new users in order to issue them licenses and reset
 *  their email from marketodemo to their real email.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param [Array of {Object}] users - the users' information
 *          (required) email, userId, firstName, lastName, role
 *
 **************************************************************************************/

ADMIN.editNewUsers = function (users) {
  var editUsers = [];
  
  for (var ii = 0; ii < users.length; ii++) {
    var userId = users[ii].userId.replace(/\+/, "%2B");
    
    console.log("Editing New User (" + (ii + 1) + "/" + users.length + ")");
    ADMIN.issueCalendarLicense(userId);
    ADMIN.issueAbmLicense(userId);
    
    if (!users[ii].directInvite) {
      editUsers.push(users[ii]);
    }
  }
  
  if (editUsers.length > 0) {
    console.log("Getting Users to Edit (" + editUsers.length + ") ...");
    ADMIN.webRequest('/custAdmin/getAllUsers', 'xsrfId=' + MktSecurity.getXsrfId(), 'POST', true, 'json', function (response) {
      var result = JSON.parse(response).data,
      num = 0;
      
      for (var ii = result.length - 1; ii >= 0; ii--) {
        for (var jj = 0; jj < editUsers.length; jj++) {
          if (result[ii].userid == editUsers[jj].userId.replace("%2B", "+")) {
            var user = editUsers[jj];
            user.id = result[ii].id;
            num += 1;
            
            console.log("Editing User: (" + num + "/" + editUsers.length + ")");
            ADMIN.editUser(user);
            break;
          }
        }
      }
      
      console.log("Finished Sending Edit User Requests");
    });
  }
};

/**************************************************************************************
 *
 *  This function deletes a given user.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {Integer} id - the server-side ID of the user
 *
 **************************************************************************************/

ADMIN.deleteUser = function (id) {
  console.log("Deleting User");
  ADMIN.webRequest('/custAdmin/deleteUserSubmit', 'ajaxHandler=MktSession&mktReqUid=' + new Date().getTime() + Ext.id(null, ':') + '&cadUserId=' + id + '&cadIsUser=true' + '&xsrfId=' + MktSecurity.getXsrfId(), 'POST', true, 'json', function (response) {
    console.log("Deleted User");
  });
};

/**************************************************************************************
 *
 *  This function deletes multiple given users.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param [Array of {Object}] users - the users' information
 *          (required) userId
 *
 **************************************************************************************/

ADMIN.deleteUsers = function (users) {
  console.log("Getting User IDs to Delete ...");
  ADMIN.webRequest('/custAdmin/getAllUsers', 'xsrfId=' + MktSecurity.getXsrfId(), 'POST', true, 'json', function (response) {
    var result = JSON.parse(response).data,
    num = 0;
    
    for (var ii = 0; ii < result.length; ii++) {
      var userId = result[ii].userid;
      
      for (var jj = 0; jj < users.length; jj++) {
        if (userId == users[jj].userId.replace("%2B", "+")) {
          var id = result[ii].id,
          name = result[ii].name;
          num += 1;
          
          console.log("Deleting User (" + num + "/" + users.length + "): " + userId + ", " + name);
          ADMIN.deleteUser(id);
          break;
        }
      }
    }
    
    console.log("Finished Sending Delete User Requests");
  });
};

/**************************************************************************************
 *
 *  This function deletes users who have been inactive for more than the given number
 *  of days.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {Integer} maxDaysSinceLastLogin - max days since last login, greater than
 *   which the user will be deleted
 *
 **************************************************************************************/

ADMIN.deleteInactiveUsers = function (maxDaysSinceLastLogin) {
  console.log("Getting Inactive Users to Delete ...");
  ADMIN.webRequest('/custAdmin/getAllUsers', 'xsrfId=' + MktSecurity.getXsrfId(), 'POST', true, 'json', function (response) {
    var result = JSON.parse(response).data;
    
    for (var ii = 0; ii < result.length; ii++) {
      var lastLogin = result[ii].lastLogin,
      daysSinceLastLogin = ADMIN.dateDiffInDays(new Date(lastLogin), new Date());
      
      if (daysSinceLastLogin > maxDaysSinceLastLogin) {
        var id = result[ii].id,
        userId = result[ii].userid,
        name = result[ii].name;
        
        console.log("Deleting User: " + userId + ", " + name + ", " + daysSinceLastLogin + " days since last login");
        ADMIN.deleteUser(id);
      }
    }
    
    console.log("Finished Sending Delete User Requests");
  });
};

/**************************************************************************************
 *
 *  This function reloads the Marketing Activites Tree
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

ADMIN.reloadMarketingActivites = function () {
  var context = {
    compSubtype: null,
    customToken: "",
    dlCompCode: "MA",
    type: "MA"
  };
  customToken = Mkt3.DlManager.getCustomToken(),
  params = Ext.urlDecode(customToken);
  
  if (context && (context.compType === 'Marketing Event' || context.compType === 'Marketing Program' ||
      context.compSubtype === 'marketingprogram' || context.compSubtype === 'marketingevent')) {
    Mkt3.MKNodeContext.timingReport = {
      navLoadCal: Ext4.Date.now(),
      calendarMode: 'Program'
    };
  }
  
  var alreadyInMA = MktMainNav.activeNav == "tnMA";
  var ajopts = MktMainNav.commonPreLoad("tnMA", context);
  if (MktPage.initNav == 'yes') {
    MktExplorer.clear();
    MktExplorer.mask();
    var parms = context;
    if (!MktPage.satellite) {
      MktViewport.setExplorerVisible(true);
      
      MktExplorer.loadTree(
        'explorer/generateFullMaExplorer', {
        serializeParms: parms,
        onMyFailure: MktMainNav.expFailureResponse.createDelegate(this)
      });
    }
    
    parms = {};
    ajopts.serializeParms = parms;
    if (isDefined(context.panelIndex)) {
      parms.panelIndex = context.panelIndex;
    }
    
    if (context.isProgramImport) {
      params.id = context.compId;
      
      if (MktPage.hasWorkspaces()) {
        // we are forced to load default MA, otherwise the modal form is not aligned properly
        MktCanvas.canvasAjaxRequest('explorer/programCanvas', {
          onMySuccess: function () {
            Ext4.widget('programOneClickImportForm', {
              formData: params
            });
            
            MktViewport.setAppMask(false);
          }
        });
        
        return true;
      }
      
      MktSession.ajaxRequest('/impExp/downloadTemplate', {
        serializeParms: params,
        onMySuccess: function (response, request) {
          if (response.JSONResults) {
            if (response.JSONResults.showImportStatus === true) {
              MktCanvas.canvasAjaxRequest('explorer/programCanvas', {
                onMySuccess: function () {
                  Mkt.apps.impExp.importProgramStatus();
                  MktViewport.setAppMask(false);
                }
              });
            } else if (response.JSONResults.errorMessage) {
              // just load MA
              window.location.hash = '#MA';
              MktPage.showAlertMessage(MktLang.getStr('page.Import_Warning'), MktLang.getStr('page.Import_Failed') +
                response.JSONResults.errorMessage, '/images/icons32/error.png');
            }
          }
        }
      });
    } else if ((context.compSubtype == "marketingfolder" || context.compType == "Marketing Folder") || context.subType == "marketingfolder") {
      MktMainNav.loadPE(context);
    } else if ((context.compSubtype == "smartcampaign") ||
      (context.subType == "smartcampaign") ||
      (context.compType == "Smart Campaign")) {
      MktMainNav.loadSmartCampaign(context);
    } else if ((context.compSubtype == "marketingevent") ||
      (context.subType == "marketingevent") ||
      (context.compType == "Marketing Event")) {
      MktMainNav.loadMarketingEvent(context);
    } else if ((context.compSubtype == "marketingprogram") ||
      (context.subType == "marketingprogram") ||
      (context.compType == "Marketing Program")) {
      MktMainNav.loadMarketingProgram(context);
    } else if ((context.compSubtype == "nurtureprogram") ||
      (context.subType == "nurtureprogram") ||
      (context.compType == "Nurture Program")) {
      MktMainNav.loadNurtureProgram(context);
    } else if (context.compSubtype === 'emailbatchprogram' ||
      (context.subType === "emailbatchprogram") ||
      (context.compType === "Email Batch Program")) {
      MktMainNav.loadEmailBatchProgram(context);
    } else if (context.compSubtype === 'inApp' ||
      (context.subType === "inAppProgram") ||
      (context.compType === "In-App Program")) {
      MktMainNav.loadInAppProgram(context);
    } else if (context.nodeType == 'Flow') { //This is just temporary till Crash get the stuff for my tree
      MktMainNav.loadFlow();
    } else {
      if (isUndefined(context.nodeId) && isUndefined(context.selectedNode)) {
        var pass;
        // MktExplorer.selectNodeById(1);
        //ajopts.accessZoneId = MktPage.savedState.ActiveZone;
      }
      /*else{
      // Getting ZoneId from SavedState
      context.accessZoneId = MktPage.savedState.ActiveZone;
      }*/
      //MktCanvas.canvasAjaxRequest('explorer/programCanvas', ajopts);
      ajopts.cacheRequest = true;
      ajopts.onMySuccess = MktMainNav.canvasAjaxRequestComplete.createDelegate(MktMainNav);
      ajopts.onMyFailure = MktMainNav.canvasAjaxRequestComplete.createDelegate(MktMainNav);
      MktCanvas.canvasAjaxRequest('explorer/programCanvas', ajopts);
    }
  }
  return true;
};

/**************************************************************************************
 *
 *  This function adds a right-click menu item that performs a mass clone of all
 *  Programs from the selected root folder that have a folder depth level 1 or less:
 *    Clones the folder structure
 *    Clones all Programs
 *    Sets Period Costs for the next 24 months using the source Program's first Cost
 *    Sets the Vertical Tag using the name of the destination folder
 *    Clones the Stream Cadences using the source Nurture Program
 *    Clones the activation state of trigger Smart Campaigns
 *    Clones the recurring schedule of batch Smart Campaigns
 *    Sets the asset filter for cloned reports to the destination folder
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

ADMIN.cloneFolder = function (origFolderName, cloneToSuffix, cloneToFolderId) {
  var newFolderName,
  result;
  
  if (origFolderName.search(/\([^\)]*\)$/) != -1) {
    newFolderName = origFolderName.replace(/\([^\)]*\)$/, "(" + cloneToSuffix + ")");
  } else {
    newFolderName = origFolderName.text + " (" + cloneToSuffix + ")";
  }
  
  result = ADMIN.webRequest('/explorer/createProgramFolder', 'ajaxHandler=MktSession&mktReqUid=' + new Date().getTime() + Ext.id(null, ':') + '&text=' + newFolderName + '&parentId=' + cloneToFolderId + '&tempNodeId=ext-' + cloneToFolderId + '&xsrfId=' + MktSecurity.getXsrfId(), 'POST', false, "", function (response) {
      console.log(response);
      response = JSON.parse(response);
      
      if (response
         && response.JSONResults
         && response.JSONResults.appvars
         && response.JSONResults.appvars.createProgramFolderResult == "success") {
        return response;
      } else {
        return false;
      }
    });
  
  return result;
};

ADMIN.cloneProgram = function (cloneToSuffix, cloneToFolderId, origProgramTreeNode) {
  var newProgramName,
  newProgramType,
  result;
  
  if (origProgramTreeNode.text.search(/\([^\)]*\)$/) != -1) {
    newProgramName = origProgramTreeNode.text.replace(/\([^\)]*\)$/, "(" + cloneToSuffix + ")");
  } else {
    newProgramName = origProgramTreeNode.text + " (" + cloneToSuffix + ")";
  }
  
  switch (origProgramTreeNode.compType) {
  case "Marketing Program":
    newProgramType = "program";
    break;
  case "Nurture Program":
    newProgramType = "nurture";
    break;
  case "Marketing Event":
    newProgramType = "event";
    break;
  case "Email Batch Program":
    newProgramType = "emailBatchProgram";
    break;
  case "In-App Program":
    newProgramType = "inAppProgram";
    break;
  }
  
  if (newProgramType) {
    result = ADMIN.webRequest('/marketingEvent/createMarketingProgramSubmit', 'ajaxHandler=MktSession&mktReqUid=' + new Date().getTime() + Ext.id(null, ':') + '&name=' + newProgramName + '&description=' + '&parentFolderId=' + cloneToFolderId + '&cloneFromId=' + origProgramTreeNode.compId + '&type=' + newProgramType + '&xsrfId=' + MktSecurity.getXsrfId(), 'POST', false, "", function (response) {
        console.log(response);
        response = JSON.parse(response);
        //response = JSON.parse(response.match(/{\"JSONResults\":.*}/)[0]);
        
        if (response
           && response.JSONResults
           && response.JSONResults.appvars
           && response.JSONResults.appvars.result == "Success") {
          return response;
        } else {
          return false;
        }
      });
    
    return result;
  } else {
    return false;
  }
};

ADMIN.getProgramSettings = function (programTreeNode) {
  var result = ADMIN.webRequest('/marketingEvent/getProgramSettingsData', '&start=0' + '&query=' + '&compId=' + programTreeNode.compId + '&compType=' + programTreeNode.compType + '&xsrfId=' + MktSecurity.getXsrfId(), 'POST', false, "", function (response) {
      console.log(response);
      response = JSON.parse(response);
      
      if (response
         && response.success) {
        return response;
      } else {
        return false;
      }
    });
  
  return result;
};

ADMIN.clonePeriodCost = function (origProgramSettingsData, newProgramCompId, numOfMonths, offset, inherit) {
  var currYear = new Date().getFullYear(),
  currMonth = new Date().getMonth() + 1,
  setPeriodCost;
  
  setPeriodCost = function (newProgramCompId, costDate, costAmount) {
    ADMIN.webRequest('/marketingEvent/setCostSubmit', 'ajaxHandler=MktSession&mktReqUid=' + new Date().getTime() + Ext.id(null, ':') + '&compId=' + newProgramCompId + '&costId=' + '&type=period' + '&startDate=' + costDate + '&amount=' + costAmount.toString() + '&description=' + '&xsrfId=' + MktSecurity.getXsrfId(), 'POST', false, "", function (response) {
      console.log(response);
    });
  };
  
  if (inherit
     && origProgramSettingsData) {
    var currPeriodCost;
    
    for (var ii = 0; ii < origProgramSettingsData.length; ii++) {
      currPeriodCost = origProgramSettingsData[ii];
      
      if (currPeriodCost.itemType == "period"
         && currPeriodCost.summaryData.amount
         && currPeriodCost.summaryData.startDate) {
        var currCostMonth = currPeriodCost.summaryData.startDate.replace(/^[0-9][0-9][0-9][0-9]-/, ''),
        currCostAmount = currPeriodCost.summaryData.amount,
        currCostYear,
        currCostDate;
        
        if (currYear > parseInt(currPeriodCost.summaryData.startDate.match(/^[0-9][0-9][0-9][0-9]/))) {
          currCostYear = currYear + (currYear - parseInt(currPeriodCost.summaryData.startDate.match(/^[0-9][0-9][0-9][0-9]/)));
        } else {
          currCostYear = parseInt(currPeriodCost.summaryData.startDate.match(/^[0-9][0-9][0-9][0-9]/));
        }
        currCostDate = currCostYear.toString() + '-' + currCostMonth.toString();
        setPeriodCost(newProgramCompId, currCostDate, currCostAmount);
      }
    }
  } else if (origProgramSettingsData
     && origProgramSettingsData[0]
     && origProgramSettingsData[0].summaryData
     && origProgramSettingsData[0].summaryData.amount) {
    if (!numOfMonths) {
      numOfMonths = 24;
    }
    
    for (var ii = 0; ii < numOfMonths; ii++) {
      var currCostDate,
      currCostAmount;
      
      if (currMonth > 12) {
        currMonth = 1;
        currYear += 1;
      }
      currCostDate = currYear.toString() + '-' + currMonth.toString();
      currMonth += 1;
      currCostAmount = parseInt(origProgramSettingsData[0].summaryData.amount);
      
      if (offset) {
        if (Math.random() <= 0.5) {
          currCostAmount += Math.ceil(Math.random() * offset);
        } else {
          currCostAmount -= Math.ceil(Math.random() * offset);
        }
      }
      
      setPeriodCost(newProgramCompId, currCostDate, currCostAmount);
    }
  }
};

ADMIN.setProgramTag = function (origProgramSettingsData, newProgramCompId, tagName, tagValue) {
  var currSetting,
  tagData;
  
  for (var ii = 0; ii < origProgramSettingsData.length; ii++) {
    currSetting = origProgramSettingsData[ii];
    
    if (currSetting.summaryData.name == tagName) {
      tagData = encodeURIComponent('{"programId":' + newProgramCompId + ',"programDescriptorId":' + parseInt(currSetting.id.replace(/^PD-/, '')) + ',"descriptorId":' + currSetting.descriptorId + ',"descriptorValue":"' + tagValue + '"}');
      break;
    }
  }
  
  if (tagData) {
    ADMIN.webRequest('/marketingEvent/setProgramDescriptorSubmit', 'ajaxHandler=MktSession&mktReqUid=' + new Date().getTime() + Ext.id(null, ':') + '&compId=' + newProgramCompId + '&_json=' + tagData + '&xsrfId=' + MktSecurity.getXsrfId(), 'POST', false, "", function (response) {
      console.log(response);
    });
  }
};

ADMIN.cloneNurtureCadence = function (origProgramCompId, newProgramCompId) {
  var getNurtureCadence,
  getOrigNurtureCadenceResponse,
  getNewNurtureCadenceResponse;
  
  getNurtureCadence = function (programCompId) {
    var programFilter = encodeURIComponent('[{"property":"id","value":' + programCompId + '}]'),
    fields = encodeURIComponent('["+tracks"]'),
    result;
    
    result = ADMIN.webRequest('/data/nurture/retrieve', 'filter=' + programFilter + '&fields=' + fields + '&xsrfId=' + MktSecurity.getXsrfId(), 'POST', false, "", function (response) {
        console.log(response);
        response = JSON.parse(response);
        
        if (response
           && response.success) {
          return response;
        } else {
          return false;
        }
      });
    
    return result;
  };
  
  getOrigNurtureCadenceResponse = getNurtureCadence(origProgramCompId);
  getNewNurtureCadenceResponse = getNurtureCadence(newProgramCompId);
  
  if (getOrigNurtureCadenceResponse
     && getNewNurtureCadenceResponse
     && getOrigNurtureCadenceResponse.data[0].tracks.length == getNewNurtureCadenceResponse.data[0].tracks.length) {
    var currOrigStream,
    currNewStream,
    streamCadences = '[';
    
    for (var ii = 0; ii < getOrigNurtureCadenceResponse.data[0].tracks.length; ii++) {
      currOrigStream = getOrigNurtureCadenceResponse.data[0].tracks[ii];
      currNewStream = getNewNurtureCadenceResponse.data[0].tracks[ii];
      
      if (ii != 0) {
        streamCadences += ',';
      }
      streamCadences += '{"id":' + currNewStream.id + ',"recurrenceType":"' + currOrigStream.recurrenceType + '","everyNUnit":' + currOrigStream.everyNUnit + ',"weekMask":"' + currOrigStream.weekMask + '","startDate":"' + currOrigStream.startDate + '"}';
    }
    streamCadences += ']';
    streamCadences = streamCadences.replace(/\"null\"/g, 'null');
    
    ADMIN.webRequest('/data/nurtureTrack/update', 'data=' + encodeURIComponent(streamCadences) + '&xsrfId=' + MktSecurity.getXsrfId(), 'POST', false, "", function (response) {
      console.log(response);
    });
  }
};

ADMIN.getProgramAssetDetails = function (programCompId) {
  var result = ADMIN.webRequest('/marketingEvent/getLocalAssetDetails', 'ajaxHandler=MktSession&mktReqUid=' + new Date().getTime() + Ext.id(null, ':') + '&compId=' + programCompId + '&xsrfId=' + MktSecurity.getXsrfId(), 'POST', false, "", function (response) {
      console.log(response);
      response = JSON.parse(response);
      
      if ((response
           && response.JSONResults
           && response.JSONResults.localAssetInfo)
         && (response.JSONResults.localAssetInfo.smartCampaigns
           || (response.JSONResults.localAssetInfo.assetList[0]
             && response.JSONResults.localAssetInfo.assetList[0].tree))) {
        return response.JSONResults.localAssetInfo;
      } else {
        return false;
      }
    });
  
  return result;
};

ADMIN.cloneSmartCampaignState = function (origProgramCompId, newProgramCompId, forceActivate) {
  var getOrigProgramAssetDetailsResponse,
  getNewProgramAssetDetailsResponse;
  
  getOrigProgramAssetDetailsResponse = ADMIN.getProgramAssetDetails(origProgramCompId);
  getNewProgramAssetDetailsResponse = ADMIN.getProgramAssetDetails(newProgramCompId);
  
  if (getOrigProgramAssetDetailsResponse
     && getNewProgramAssetDetailsResponse) {
    var setSmartCampaignState;
    
    setSmartCampaignState = function (getOrigProgramAssetDetailsResponse, getNewProgramAssetDetailsResponse) {
      var currOrigProgramSmartCampaign,
      currNewProgramSmartCampaign,
      getScheduleResponse;
      
      for (var ii = 0; ii < getOrigProgramAssetDetailsResponse.smartCampaigns.length; ii++) {
        currOrigProgramSmartCampaign = getOrigProgramAssetDetailsResponse.smartCampaigns[ii];
        currNewProgramSmartCampaign = getNewProgramAssetDetailsResponse.smartCampaigns[ii];
        
        if (currOrigProgramSmartCampaign.compType == currNewProgramSmartCampaign.compType
           && currOrigProgramSmartCampaign.compType == "Smart Campaign"
           && currOrigProgramSmartCampaign.name == currNewProgramSmartCampaign.name) {
          
          if (currOrigProgramSmartCampaign.status == 7
             || (currOrigProgramSmartCampaign.status == 6
               && forceActivate)) {
            ADMIN.webRequest('/smartcampaigns/toggleActiveStatus', 'ajaxHandler=MktSession&mktReqUid=' + new Date().getTime() + Ext.id(null, ':') + '&smartCampaignId=' + currNewProgramSmartCampaign.compId + '&xsrfId=' + MktSecurity.getXsrfId(), 'POST', false, "", function (result) {
              console.log(result);
            });
          }
          if (currOrigProgramSmartCampaign.status == 3
             || currOrigProgramSmartCampaign.status == 5) {
            ADMIN.webRequest('/smartcampaigns/editScheduleRS', 'ajaxHandler=MktSession&mktReqUid=' + new Date().getTime() + Ext.id(null, ':') + '&isRequest=1' + '&smartCampaignId=' + currOrigProgramSmartCampaign.compId + '&xsrfId=' + MktSecurity.getXsrfId(), 'POST', false, "", function (response) {
              console.log(response);
              if (response.match(/MktPage\.appVars\.scheduleData = {([^=]|\n|\\n)*}/)[0]) {
                getScheduleResponse = JSON.parse(response.match(/MktPage\.appVars\.scheduleData = {([^=]|\n|\\n)*}/)[0].replace(/MktPage\.appVars\.scheduleData = {/, '{').replace(/\'/g, '"').replace(/\\n */g, '"').replace(/: +/g, '": ').replace(/\"\/\/[^\"]+\"/g, '"').replace(/\"}$/, '}'));
              }
            });
            
            if (getScheduleResponse) {
              var startAtDate = new Date(Date.parse(getScheduleResponse.start_at)),
              startAt = startAtDate.getFullYear() + "-" + parseInt(startAtDate.getMonth() + 1) + "-" + startAtDate.getDate() + " " + startAtDate.getHours() + ":" + startAtDate.getMinutes() + ":" + startAtDate.getSeconds();
              
              ADMIN.webRequest('/smartcampaigns/recurCampSchedule', 'ajaxHandler=MktSession&mktReqUid=' + new Date().getTime() + Ext.id(null, ':') + '&smartCampaignId=' + currNewProgramSmartCampaign.compId + '&recurrence_type=' + getScheduleResponse.recurrence_type + '&every_n_unit=' + getScheduleResponse.every_n_unit + '&start_at=' + startAt + '&end_at=' + '&every_weekday=' + getScheduleResponse.every_weekday + '&week_mask=' + getScheduleResponse.week_mask + '&recurDay_of_month=' + getScheduleResponse.recurDay_of_month + '&recurMonth_day_type=' + getScheduleResponse.recurMonth_day_type + '&recurMonth_week_type=' + getScheduleResponse.recurMonth_week_type + '&xsrfId=' + MktSecurity.getXsrfId(), 'POST', false, "", function (result) {
                console.log(result);
              });
            }
          }
        }
      }
    };
    
    if (getOrigProgramAssetDetailsResponse.smartCampaigns.length == getNewProgramAssetDetailsResponse.smartCampaigns.length) {
      setSmartCampaignState(getOrigProgramAssetDetailsResponse, getNewProgramAssetDetailsResponse);
    }
    
    if (getOrigProgramAssetDetailsResponse.assetList[0].tree.length == getNewProgramAssetDetailsResponse.assetList[0].tree.length) {
      var currOrigProgramAsset,
      currNewProgramAsset;
      
      for (var ii = 0; ii < getOrigProgramAssetDetailsResponse.assetList[0].tree.length; ii++) {
        currOrigProgramAsset = getOrigProgramAssetDetailsResponse.assetList[0].tree[ii];
        currNewProgramAsset = getNewProgramAssetDetailsResponse.assetList[0].tree[ii];
        
        if (currOrigProgramAsset.navType == "MA"
           && currNewProgramAsset.navType == "MA") {
          setSmartCampaignState(ADMIN.getProgramAssetDetails(currOrigProgramAsset.compId), ADMIN.getProgramAssetDetails(currNewProgramAsset.compId));
        }
      }
    }
  }
  
  return getNewProgramAssetDetailsResponse;
};

ADMIN.setProgramReportFilter = function (getNewProgramAssetDetailsResponse, cloneToFolderId, newProgramCompId) {
  var applyProgramReportFilter;
  
  applyProgramReportFilter = function (getNewProgramAssetDetailsResponse, cloneToFolderId) {
    var currNewReport;
    
    for (var ii = 0; ii < getNewProgramAssetDetailsResponse.assetList[0].tree.length; ii++) {
      currNewReport = getNewProgramAssetDetailsResponse.assetList[0].tree[ii];
      
      if (currNewReport.compType == "Report") {
        var reportFilterType,
        selectedNodes;
        
        if ((/^Email/i).test(currNewReport.text)) {
          reportFilterType = "maEmail";
          selectedNodes = '["' + cloneToFolderId + '"]';
        } else if ((/^(Engagement|Nurtur)/i).test(currNewReport.text)) {
          reportFilterType = "nurtureprogram";
          selectedNodes = '["' + cloneToFolderId + '"]';
        } else if ((/^Landing/i).test(currNewReport.text)) {
          reportFilterType = "maLanding";
          selectedNodes = '["' + cloneToFolderId + '"]';
        } else if ((/^Program/i).test(currNewReport.text)) {
          reportFilterType = "program";
          selectedNodes = '["' + cloneToFolderId + '"]';
        }
        
        if (reportFilterType
           && selectedNodes) {
          ADMIN.webRequest('/analytics/applyComponentFilter', 'ajaxHandler=MktSession&mktReqUid=' + new Date().getTime() + Ext.id(null, ':') + '&nodeIds=' + selectedNodes + '&filterType=' + reportFilterType + '&reportId=' + currNewReport.compId + '&xsrfId=' + MktSecurity.getXsrfId(), 'POST', false, "", function (response) {
            console.log(response);
          });
        }
      }
    }
  };
  
  if (cloneToFolderId) {
    if (getNewProgramAssetDetailsResponse) {
      applyProgramReportFilter(getNewProgramAssetDetailsResponse, cloneToFolderId);
    } else if (newProgramCompId) {
      applyProgramReportFilter(ADMIN.getProgramAssetDetails(newProgramCompId), cloneToFolderId);
    }
  }
};

ADMIN.getTags = function () {
  var result = ADMIN.webRequest('/marketingEvent/getAllDescriptors', '&start=0' + '&xsrfId=' + MktSecurity.getXsrfId(), 'POST', false, "", function (response) { ;
      console.log(response);
      response = JSON.parse(response);
      
      if (response.success) {
        var currTag,
        jj = 0,
        customTags = [];
        
        for (var ii = 0; ii < response.data.descriptors.length; ii++) {
          currTag = response.data.descriptors[ii];
          
          if (currTag.type != "channel") {
            customTags[jj] = currTag;
            jj++;
          }
        }
        return customTags;
      } else {
        return false;
      }
    });
  
  return result;
};

ADMIN.applyMassClone = function (forceReload) {
  console.log("Marketo App Admin > Applying: Mass Clone Menu Item");
  
  var massClone = function () {
    if (this.triggeredFrom == "tree"
       && this.get("newLocalAsset")) {
      var massCloneItem = this.get("newLocalAsset").cloneConfig(),
      massCloneItemId = "cloneVertical",
      currExpNode = MktExplorer.getNodeById(this.currNode.attributes.id);
      
      if (!this.get(massCloneItemId)) {
        massCloneItem.itemId = massCloneItemId;
        massCloneItem.text = "Mass Clone";
        massCloneItem.setHandler(function (el) {
          var cloneForm = new Mkt.apps.marketingEvent.MarketingEventForm({
              cloneFromId: this.ownerCt.currNode.attributes.compId,
              cloneName: this.ownerCt.currNode.attributes.text,
              accessZoneId: this.ownerCt.currNode.attributes.accessZoneId
            }),
          cloneFromField = cloneForm.find("fieldLabel", "Clone From")[0].cloneConfig(),
          scActivationField = cloneForm.find("fieldLabel", "Clone To")[0].cloneConfig(),
          showMoreOptionsField = new Mkt.apps.marketingEvent.MarketingEventForm({
              cloneFromId: this.ownerCt.currNode.attributes.compId,
              cloneName: this.ownerCt.currNode.attributes.text,
              accessZoneId: this.ownerCt.currNode.attributes.accessZoneId
            }).find("fieldLabel", "Clone To")[0].cloneConfig(),
          periodCostCloneField = new Mkt.apps.marketingEvent.MarketingEventForm({
              cloneFromId: this.ownerCt.currNode.attributes.compId,
              cloneName: this.ownerCt.currNode.attributes.text,
              accessZoneId: this.ownerCt.currNode.attributes.accessZoneId
            }).find("fieldLabel", "Clone To")[0].cloneConfig(),
          periodCostMonthField = new Mkt.apps.marketingEvent.MarketingEventForm({
              cloneFromId: this.ownerCt.currNode.attributes.compId,
              cloneName: this.ownerCt.currNode.attributes.text,
              accessZoneId: this.ownerCt.currNode.attributes.accessZoneId
            }).find("fieldLabel", "Clone To")[0].cloneConfig(),
          periodCostOffsetField = new Mkt.apps.marketingEvent.MarketingEventForm({
              cloneFromId: this.ownerCt.currNode.attributes.compId,
              cloneName: this.ownerCt.currNode.attributes.text,
              accessZoneId: this.ownerCt.currNode.attributes.accessZoneId
            }).find("fieldLabel", "Name")[0].cloneConfig(),
          tagNameField = new Mkt.apps.marketingEvent.MarketingEventForm({
              cloneFromId: this.ownerCt.currNode.attributes.compId,
              cloneName: this.ownerCt.currNode.attributes.text,
              accessZoneId: this.ownerCt.currNode.attributes.accessZoneId
            }).find("fieldLabel", "Clone To")[0].cloneConfig(),
          tagValueField = new Mkt.apps.marketingEvent.MarketingEventForm({
              cloneFromId: this.ownerCt.currNode.attributes.compId,
              cloneName: this.ownerCt.currNode.attributes.text,
              accessZoneId: this.ownerCt.currNode.attributes.accessZoneId
            }).find("fieldLabel", "Clone To")[0].cloneConfig(),
          massCloneForm = new Mkt.apps.marketingEvent.MarketingEventForm({
              currNode: this.ownerCt.currNode
            }),
          customTags,
          currCustomTag,
          currCustomTagName,
          currCustomTagValue;
          el.parentMenu.hide(true);
          
          var isCloneVerticalForm = window.setInterval(function () {
              if (massCloneForm
                 && massCloneForm.buttons[1]
                 && massCloneForm.buttons[1].setHandler
                 && massCloneForm.find("fieldLabel", "Channel")[0]
                 && massCloneForm.find("fieldLabel", "Channel")[0].destroy
                 && massCloneForm.find("fieldLabel", "Description")[0]
                 && massCloneForm.find("fieldLabel", "Description")[0].destroy
                 && massCloneForm.find("fieldLabel", "Program Type")[0]
                 && massCloneForm.find("fieldLabel", "Program Type")[0].destroy
                 && massCloneForm.find("fieldLabel", "Campaign Folder")[0]
                 && massCloneForm.find("fieldLabel", "Campaign Folder")[0].fieldLabel
                 && massCloneForm.find("fieldLabel", "Name")[0]
                 && massCloneForm.find("fieldLabel", "Name")[0].fieldLabel
                 && massCloneForm.items.last().setText
                 && massCloneForm.items.last().setVisible
                 && massCloneForm.setWidth
                 && massCloneForm.setHeight) {
                window.clearInterval(isCloneVerticalForm);
                
                massCloneForm.setTitle("Mass Clone");
                massCloneForm.buttons[1].setText("Clone");
                massCloneForm.buttons[1].currNode = massCloneForm.currNode;
                massCloneForm.find("fieldLabel", "Channel")[0].destroy();
                massCloneForm.find("fieldLabel", "Description")[0].destroy();
                massCloneForm.find("fieldLabel", "Program Type")[0].destroy();
                massCloneForm.find("fieldLabel", "Campaign Folder")[0].fieldLabel = "Clone To";
                massCloneForm.find("fieldLabel", "Name")[0].fieldLabel = "Program Suffix";
                
                showMoreOptionsField.fieldLabel = "Show More Options";
                showMoreOptionsField.itemCls = "";
                showMoreOptionsField.store.data.items[0].set("text", "No");
                showMoreOptionsField.store.data.items[1].set("text", "Yes");
                
                scActivationField.fieldLabel = "SC Activation State";
                scActivationField.itemCls = "";
                scActivationField.store.data.items[0].set("text", "Inherit State");
                scActivationField.store.data.items[1].set("text", "Force Activate");
                
                periodCostCloneField.fieldLabel = "Period Cost Data";
                periodCostCloneField.itemCls = "";
                periodCostCloneField.store.data.items[0].set("text", "Inherit Data");
                periodCostCloneField.store.data.items[1].set("text", "Baseline Data");
                
                periodCostMonthField.fieldLabel = "Period Cost Months";
                periodCostMonthField.itemCls = "mktRequired";
                periodCostMonthField.store.data.items[0].set("text", "12 Months");
                periodCostMonthField.store.data.items[1].set("text", "24 Months");
                
                periodCostOffsetField.fieldLabel = "Period Cost Offset";
                periodCostOffsetField.itemCls = "";
                
                tagNameField.fieldLabel = "Change Tag Type";
                tagNameField.itemCls = "";
                
                tagValueField.fieldLabel = "New Tag Value";
                tagValueField.itemCls = "mktRequired";
                
                var origOnSelect = showMoreOptionsField.onSelect;
                showMoreOptionsField.onSelect = function (doFocus) {
                  origOnSelect.apply(this, arguments);
                  if (this.value == 2) {
                    this.ownerCt.find("fieldLabel", "SC Activation State")[0].label.setVisible(true);
                    this.ownerCt.find("fieldLabel", "SC Activation State")[0].setVisible(true);
                    this.ownerCt.find("fieldLabel", "Period Cost Data")[0].label.setVisible(true);
                    this.ownerCt.find("fieldLabel", "Period Cost Data")[0].setVisible(true);
                    this.ownerCt.find("fieldLabel", "Change Tag Type")[0].label.setVisible(true);
                    this.ownerCt.find("fieldLabel", "Change Tag Type")[0].setVisible(true);
                  } else {
                    this.ownerCt.find("fieldLabel", "SC Activation State")[0].label.setVisible(false);
                    this.ownerCt.find("fieldLabel", "SC Activation State")[0].setVisible(false);
                    this.ownerCt.find("fieldLabel", "Period Cost Data")[0].label.setVisible(false);
                    this.ownerCt.find("fieldLabel", "Period Cost Data")[0].setVisible(false);
                    this.ownerCt.find("fieldLabel", "Change Tag Type")[0].setVisible(false);
                    this.ownerCt.find("fieldLabel", "Change Tag Type")[0].label.setVisible(false);
                    this.ownerCt.find("fieldLabel", "Period Cost Offset")[0].setVisible(false);
                    this.ownerCt.find("fieldLabel", "Period Cost Offset")[0].label.setVisible(false);
                    this.ownerCt.find("fieldLabel", "Period Cost Months")[0].setVisible(false);
                    this.ownerCt.find("fieldLabel", "Period Cost Months")[0].label.setVisible(false);
                  }
                };
                periodCostCloneField.onSelect = function (doFocus) {
                  origOnSelect.apply(this, arguments);
                  if (this.value == 2) {
                    this.ownerCt.find("fieldLabel", "Period Cost Months")[0].label.setVisible(true);
                    this.ownerCt.find("fieldLabel", "Period Cost Months")[0].setVisible(true);
                    this.ownerCt.find("fieldLabel", "Period Cost Offset")[0].label.setVisible(true);
                    this.ownerCt.find("fieldLabel", "Period Cost Offset")[0].setVisible(true);
                  } else {
                    this.ownerCt.find("fieldLabel", "Period Cost Offset")[0].setVisible(false);
                    this.ownerCt.find("fieldLabel", "Period Cost Offset")[0].label.setVisible(false);
                    this.ownerCt.find("fieldLabel", "Period Cost Months")[0].setVisible(false);
                    this.ownerCt.find("fieldLabel", "Period Cost Months")[0].label.setVisible(false);
                  }
                };
                tagNameField.onSelect = function (doFocus) {
                  origOnSelect.apply(this, arguments);
                  if (this.value) {
                    this.ownerCt.find("fieldLabel", "New Tag Value")[0].label.setVisible(true);
                    this.ownerCt.find("fieldLabel", "New Tag Value")[0].setVisible(true);
                  } else {
                    this.ownerCt.find("fieldLabel", "New Tag Value")[0].setVisible(false);
                    this.ownerCt.find("fieldLabel", "New Tag Value")[0].label.setVisible(false);
                  }
                };
                
                massCloneForm.insert(0, cloneFromField);
                massCloneForm.insert(massCloneForm.items.length - 1, showMoreOptionsField);
                massCloneForm.insert(massCloneForm.items.length - 1, scActivationField);
                scActivationField.setVisible(false);
                massCloneForm.insert(massCloneForm.items.length - 1, periodCostCloneField);
                periodCostCloneField.setVisible(false);
                massCloneForm.insert(massCloneForm.items.length - 1, periodCostMonthField);
                periodCostMonthField.setVisible(false);
                massCloneForm.insert(massCloneForm.items.length - 1, periodCostOffsetField);
                periodCostOffsetField.setVisible(false);
                massCloneForm.insert(massCloneForm.items.length - 1, tagNameField);
                tagNameField.setVisible(false);
                massCloneForm.insert(massCloneForm.items.length - 1, tagValueField);
                tagValueField.setVisible(false);
                
                massCloneForm.buttons[1].setHandler(function () {
                  var waitMsg = new Ext.Window({
                      closable: true,
                      modal: true,
                      width: 520,
                      height: 225,
                      cls: 'mktModalForm',
                      title: 'Please Wait ...',
                      html: '<b>Mass Cloning:</b>  <i>' + massCloneForm.currNode.text + '</i><br><br>This may take several minutes depending on the quantity of programs and assets contained therein.'
                    }),
                  cloneToFolderId = massCloneForm.find("fieldLabel", "Clone To")[0].getValue(),
                  cloneToSuffix = massCloneForm.find("fieldLabel", "Program Suffix")[0].getValue(),
                  cloneToTreeNode = MktExplorer.getNodeById(cloneToFolderId),
                  scActivationState = scActivationField.getValue(),
                  periodCostClone = periodCostCloneField.getValue(),
                  periodCostOffset = periodCostOffsetField.getValue(),
                  tagName = tagNameField.getValue(),
                  tagValue = tagValueField.getValue(),
                  scForceActivate,
                  inheritPeriodCost,
                  periodCostMonth,
                  numOfPeriodCostMonths,
                  _this = this,
                  waitMsgShow;
                  
                  if (scActivationState == 2) {
                    scForceActivate = true;
                  } else {
                    scForceActivate = false;
                  }
                  
                  if (periodCostClone == 1) {
                    inheritPeriodCost = true;
                  } else {
                    inheritPeriodCost = false;
                    periodCostMonth = periodCostMonthField.getValue();
                    
                    if (periodCostMonth == 1) {
                      numOfPeriodCostMonths = 12;
                    } else if (periodCostMonth == 2) {
                      numOfPeriodCostMonths = 24;
                    } else {
                      numOfPeriodCostMonths = 0;
                    }
                    
                    if (!isNumber(parseInt(periodCostOffset))) {
                      periodCostOffset = null;
                    }
                  }
                  
                  massCloneForm.close();
                  waitMsgShow = waitMsg.show();
                  
                  var isWaitMsgShow = window.setInterval(function () {
                      if (waitMsgShow) {
                        window.clearInterval(isWaitMsgShow);
                        var currTreeNode,
                        cloneFolderResponse,
                        cloneProgramResponse,
                        getOrigProgramSettingsResponse,
                        getNewProgramSettingsResponse,
                        getNewProgramAssetDetailsResponse;
                        
                        if (_this.currNode.attributes.compType == "Marketing Folder") {
                          // Mass Clone @ Folder
                          for (var ii = 0; _this.currNode.attributes.children && ii < _this.currNode.attributes.children.length; ii++) {
                            currTreeNode = _this.currNode.attributes.children[ii];
                            
                            if (currTreeNode.compType == "Marketing Folder") {
                              // Mass Clone @ Folder with Folder children
                              cloneFolderResponse = ADMIN.cloneFolder(currTreeNode.text, cloneToSuffix, cloneToFolderId);
                              
                              if (cloneFolderResponse) {
                                for (var jj = 0; currTreeNode.children && jj < currTreeNode.children.length; jj++) {
                                  if (currTreeNode.children[jj].compType == "Marketing Folder") {
                                    // Mass Clone @ Folder with Folder depth of 2
                                    var currFolderTreeNode = currTreeNode.children[jj];
                                    
                                    cloneFolderResponse = ADMIN.cloneFolder(currFolderTreeNode.text, cloneToSuffix, currFolderTreeNode.id);
                                    
                                    if (cloneFolderResponse) {
                                      var currOrigProgramTreeNode;
                                      
                                      for (var kk = 0; currFolderTreeNode.children && kk < currFolderTreeNode.children.length; kk++) {
                                        currOrigProgramTreeNode = currFolderTreeNode.children[kk];
                                        
                                        cloneProgramResponse = ADMIN.cloneProgram(cloneToSuffix, cloneFolderResponse.JSONResults.actions[0].parameters[0][0].id, currOrigProgramTreeNode);
                                        
                                        if (cloneProgramResponse) {
                                          getOrigProgramSettingsResponse = ADMIN.getProgramSettings(currOrigProgramTreeNode);
                                          
                                          if (getOrigProgramSettingsResponse
                                             && getOrigProgramSettingsResponse.data
                                             && (inheritPeriodCost
                                               || numOfPeriodCostMonths > 0)) {
                                            ADMIN.clonePeriodCost(getOrigProgramSettingsResponse.data, cloneProgramResponse.JSONResults.actions[0].parameters[0][0].compId, numOfPeriodCostMonths, parseInt(periodCostOffset), inheritPeriodCost);
                                          }
                                          
                                          getNewProgramSettingsResponse = ADMIN.getProgramSettings({
                                              "compId": cloneProgramResponse.JSONResults.actions[0].parameters[0][0].compId,
                                              "compType": cloneProgramResponse.JSONResults.actions[0].parameters[0][0].compType
                                            });
                                          
                                          if (getNewProgramSettingsResponse
                                             && getNewProgramSettingsResponse.data
                                             && tagName
                                             && tagValue) {
                                            ADMIN.setProgramTag(getNewProgramSettingsResponse.data, cloneProgramResponse.JSONResults.actions[0].parameters[0][0].compId, tagName, tagValue);
                                          }
                                          
                                          if (cloneProgramResponse.JSONResults.actions[0].parameters[0][0].compType == "Nurture Program") {
                                            ADMIN.cloneNurtureCadence(currOrigProgramTreeNode.compId, cloneProgramResponse.JSONResults.actions[0].parameters[0][0].compId);
                                          }
                                          
                                          getNewProgramAssetDetailsResponse = ADMIN.cloneSmartCampaignState(currOrigProgramTreeNode.compId, cloneProgramResponse.JSONResults.actions[0].parameters[0][0].compId, scForceActivate);
                                          
                                          ADMIN.setProgramReportFilter(getNewProgramAssetDetailsResponse, cloneToFolderId);
                                        }
                                      }
                                    }
                                  } else {
                                    // Mass Clone @ Folder with Folder depth of 1
                                    currOrigProgramTreeNode = currTreeNode.children[jj];
                                    
                                    cloneProgramResponse = ADMIN.cloneProgram(cloneToSuffix, cloneFolderResponse.JSONResults.actions[0].parameters[0][0].id, currOrigProgramTreeNode);
                                    
                                    if (cloneProgramResponse) {
                                      getOrigProgramSettingsResponse = ADMIN.getProgramSettings(currOrigProgramTreeNode);
                                      
                                      if (getOrigProgramSettingsResponse
                                         && getOrigProgramSettingsResponse.data
                                         && (inheritPeriodCost
                                           || numOfPeriodCostMonths > 0)) {
                                        ADMIN.clonePeriodCost(getOrigProgramSettingsResponse.data, cloneProgramResponse.JSONResults.actions[0].parameters[0][0].compId, numOfPeriodCostMonths, parseInt(periodCostOffset), inheritPeriodCost);
                                      }
                                      
                                      getNewProgramSettingsResponse = ADMIN.getProgramSettings({
                                          "compId": cloneProgramResponse.JSONResults.actions[0].parameters[0][0].compId,
                                          "compType": cloneProgramResponse.JSONResults.actions[0].parameters[0][0].compType
                                        });
                                      
                                      if (getNewProgramSettingsResponse
                                         && getNewProgramSettingsResponse.data
                                         && tagName
                                         && tagValue) {
                                        ADMIN.setProgramTag(getNewProgramSettingsResponse.data, cloneProgramResponse.JSONResults.actions[0].parameters[0][0].compId, tagName, tagValue);
                                      }
                                      
                                      if (cloneProgramResponse.JSONResults.actions[0].parameters[0][0].compType == "Nurture Program") {
                                        ADMIN.cloneNurtureCadence(currOrigProgramTreeNode.compId, cloneProgramResponse.JSONResults.actions[0].parameters[0][0].compId);
                                      }
                                      
                                      getNewProgramAssetDetailsResponse = ADMIN.cloneSmartCampaignState(currOrigProgramTreeNode.compId, cloneProgramResponse.JSONResults.actions[0].parameters[0][0].compId, scForceActivate);
                                      
                                      ADMIN.setProgramReportFilter(getNewProgramAssetDetailsResponse, cloneToFolderId);
                                    }
                                  }
                                }
                              }
                            } else {
                              // Mass Clone @ Folder with Program children
                              var currOrigProgramTreeNode = currTreeNode;
                              
                              cloneProgramResponse = ADMIN.cloneProgram(cloneToSuffix, cloneToFolderId, currOrigProgramTreeNode);
                              
                              if (cloneProgramResponse) {
                                getOrigProgramSettingsResponse = ADMIN.getProgramSettings(currOrigProgramTreeNode);
                                
                                if (getOrigProgramSettingsResponse
                                   && getOrigProgramSettingsResponse.data
                                   && (inheritPeriodCost
                                     || numOfPeriodCostMonths > 0)) {
                                  ADMIN.clonePeriodCost(getOrigProgramSettingsResponse.data, cloneProgramResponse.JSONResults.actions[0].parameters[0][0].compId, numOfPeriodCostMonths, parseInt(periodCostOffset), inheritPeriodCost);
                                }
                                
                                getNewProgramSettingsResponse = ADMIN.getProgramSettings({
                                    "compId": cloneProgramResponse.JSONResults.actions[0].parameters[0][0].compId,
                                    "compType": cloneProgramResponse.JSONResults.actions[0].parameters[0][0].compType
                                  });
                                
                                if (getNewProgramSettingsResponse
                                   && getNewProgramSettingsResponse.data
                                   && tagName
                                   && tagValue) {
                                  ADMIN.setProgramTag(getNewProgramSettingsResponse.data, cloneProgramResponse.JSONResults.actions[0].parameters[0][0].compId, tagName, tagValue);
                                }
                                
                                if (cloneProgramResponse.JSONResults.actions[0].parameters[0][0].compType == "Nurture Program") {
                                  ADMIN.cloneNurtureCadence(currOrigProgramTreeNode.compId, cloneProgramResponse.JSONResults.actions[0].parameters[0][0].compId);
                                }
                                
                                getNewProgramAssetDetailsResponse = ADMIN.cloneSmartCampaignState(currOrigProgramTreeNode.compId, cloneProgramResponse.JSONResults.actions[0].parameters[0][0].compId, scForceActivate);
                                
                                ADMIN.setProgramReportFilter(getNewProgramAssetDetailsResponse, cloneToFolderId);
                              }
                            }
                          }
                        } else {
                          // Mass Clone @ Program
                          var currOrigProgramTreeNode = _this.currNode.attributes;
                          
                          cloneProgramResponse = ADMIN.cloneProgram(cloneToSuffix, cloneToFolderId, currOrigProgramTreeNode);
                          
                          if (cloneProgramResponse) {
                            getOrigProgramSettingsResponse = ADMIN.getProgramSettings(currOrigProgramTreeNode);
                            
                            if (getOrigProgramSettingsResponse
                               && getOrigProgramSettingsResponse.data
                               && (inheritPeriodCost
                                 || numOfPeriodCostMonths > 0)) {
                              ADMIN.clonePeriodCost(getOrigProgramSettingsResponse.data, cloneProgramResponse.JSONResults.actions[0].parameters[0][0].compId, numOfPeriodCostMonths, parseInt(periodCostOffset), inheritPeriodCost);
                            }
                            
                            getNewProgramSettingsResponse = ADMIN.getProgramSettings({
                                "compId": cloneProgramResponse.JSONResults.actions[0].parameters[0][0].compId,
                                "compType": cloneProgramResponse.JSONResults.actions[0].parameters[0][0].compType
                              });
                            
                            if (getNewProgramSettingsResponse
                               && getNewProgramSettingsResponse.data
                               && tagName
                               && tagValue) {
                              ADMIN.setProgramTag(getNewProgramSettingsResponse.data, cloneProgramResponse.JSONResults.actions[0].parameters[0][0].compId, tagName, tagValue);
                            }
                            
                            if (cloneProgramResponse.JSONResults.actions[0].parameters[0][0].compType == "Nurture Program") {
                              ADMIN.cloneNurtureCadence(currOrigProgramTreeNode.compId, cloneProgramResponse.JSONResults.actions[0].parameters[0][0].compId);
                            }
                            
                            getNewProgramAssetDetailsResponse = ADMIN.cloneSmartCampaignState(currOrigProgramTreeNode.compId, cloneProgramResponse.JSONResults.actions[0].parameters[0][0].compId, scForceActivate);
                            
                            ADMIN.setProgramReportFilter(getNewProgramAssetDetailsResponse, cloneToFolderId);
                          }
                        }
                        ADMIN.reloadMarketingActivites();
                        waitMsg.close();
                      }
                    }, 0);
                });
                
                massCloneForm.show();
                showMoreOptionsField.onSelect(showMoreOptionsField.findRecord("text", "No"));
                scActivationField.onSelect(scActivationField.findRecord("text", "Inherit State"));
                periodCostCloneField.onSelect(periodCostCloneField.findRecord("text", "Inherit Data"));
                massCloneForm.setWidth(525);
                massCloneForm.setHeight(560);
                massCloneForm.items.last().setText("Programs that have a folder depth greater than 2 will not be cloned.");
                massCloneForm.items.last().setVisible(true);
                tagValueField.label.setVisible(false);
                tagNameField.label.setVisible(false);
                periodCostMonthField.label.dom.innerHTML = "&nbsp;&nbsp;&nbsp; Months:";
                periodCostMonthField.label.setVisible(false);
                periodCostOffsetField.label.dom.innerHTML = "&nbsp;&nbsp;&nbsp; Cost Offset (+/-):";
                periodCostOffsetField.label.setVisible(false);
                tagValueField.label.dom.innerHTML = "&nbsp;&nbsp;&nbsp; New Tag Value:";
                periodCostCloneField.label.setVisible(false);
                scActivationField.label.setVisible(false);
                customTags = ADMIN.getTags();
                currCustomTagName = tagNameField.store.data.items[0].copy(0);
                currCustomTagValue = tagValueField.store.data.items[0].copy(0);
                tagNameField.store.removeAll(true);
                tagValueField.store.removeAll(true);
                var isCustomTags = window.setInterval(function () {
                    if (customTags) {
                      window.clearInterval(isCustomTags);
                      
                      for (var ii = 0; ii < customTags.length; ii++) {
                        currCustomTag = customTags[ii];
                        currCustomTagName = currCustomTagName.copy(currCustomTag.name);
                        currCustomTagName.set("text", currCustomTag.name);
                        currCustomTagName.data.id = currCustomTag.name;
                        tagNameField.store.add(currCustomTagName);
                        
                        for (var jj = 0; jj < currCustomTag.values.length; jj++) {
                          currCustomTagValue = currCustomTagValue.copy(currCustomTag.values[jj].value);
                          currCustomTagValue.set("text", currCustomTag.values[jj].value);
                          currCustomTagValue.data.id = currCustomTag.values[jj].value;
                          tagValueField.store.add(currCustomTagValue);
                        }
                      }
                    }
                  }, 0);
              }
            }, 0);
        });
      }
      
      if (this.get(massCloneItemId)) {
        if ((this.currNode.attributes.compType == "Marketing Folder"
             && !this.currNode.attributes.marketingProgramId
             && currExpNode
             && currExpNode.isExpandable())
           || (this.currNode.attributes.compType == "Marketing Program"
             || this.currNode.attributes.compType == "Nurture Program"
             || this.currNode.attributes.compType == "Marketing Event"
             || this.currNode.attributes.compType == "Email Batch Program"
             || this.currNode.attributes.compType == "In-App Program")) {
          if (forceReload) {
            this.get(massCloneItemId).destroy();
            this.addItem(massCloneItem);
          } else {
            this.get(massCloneItemId).setVisible(true);
          }
        } else {
          this.get(massCloneItemId).setVisible(false);
        }
      } else if ((this.currNode.attributes.compType == "Marketing Folder"
           && !this.currNode.attributes.marketingProgramId
           && currExpNode
           && currExpNode.isExpandable())
         || (this.currNode.attributes.compType == "Marketing Program"
           || this.currNode.attributes.compType == "Nurture Program"
           || this.currNode.attributes.compType == "Marketing Event"
           || this.currNode.attributes.compType == "Email Batch Program"
           || this.currNode.attributes.compType == "In-App Program")) {
        this.addItem(massCloneItem);
      }
    }
  };
  
  if (typeof(Ext) !== "undefined"
     && Ext
     && Ext.menu
     && Ext.menu.Menu
     && Ext.menu.Menu.prototype
     && Ext.menu.Menu.prototype.showAt) {
    console.log("Marketo App Admin > Executing: Applying Mass Clone Menu Item");
    if (!origMenuShowAtFunc) {
      origMenuShowAtFunc = Ext.menu.Menu.prototype.showAt;
    }
    
    Ext.menu.Menu.prototype.showAt = function (xy, parentMenu) {
      massClone.apply(this, arguments);
      origMenuShowAtFunc.apply(this, arguments);
    };
  } else {
    console.log("Marketo App Admin > Skipping: Applying Mass Clone Menu Item");
  }
};

/**************************************************************************************
 *
 *  Main
 *
 **************************************************************************************/

var toggleState = ADMIN.getCookie("toggleState");

ADMIN.validateDemoExtensionCheck(true);

// This check ensures that an admin can login and test the extension as a normal user.
if (toggleState == "false") {
  console.log("Marketo App Admin > User: Admin is now a normal user");
  
  ADMIN.loadScript(MARKETO_LIVE_APP);
} else {
  ADMIN.applyMassClone();
}