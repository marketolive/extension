console.log("Marketo App > Running");

/**************************************************************************************
 *
 *  This script contains all of the functionality needed for the manipulation of the
 *  MarektoLive environments.
 *
 *  @Author Andrew Garcia, Arrash Yasavolian, Brian Fisher
 *
 *  @namespace
 *
 **************************************************************************************/

var devExtensionId = "dokkjhbgengdlccldgjnbilajdbjlnhm",
prodExtensionId = "onibnnoghllldiecboelbpcaeggfiohl",
extensionId = devExtensionId,

currentUrl = window.location.href,
extensionMinVersion = "5.0.0",
mktoAppDomain = "^https:\/\/app-[a-z0-9]+\.marketo\.com",
mktoDesignerDomain = "^https:\/\/[a-z0-9]+-[a-z0-9]+\.marketodesigner\.com",
mktoDesignerHost = "na-sjp.marketodesigner.com",
mktoWizard = mktoAppDomain + "/m#",
mktoEmailDesigner = mktoDesignerDomain + "/ds",
mktoLandingPageDesigner = mktoDesignerDomain + "/lpeditor/",
mktoEmailInsightsLink = "https://insights.marketolive.com/email",
mktoEmailDeliverabilityToolsLink = "https://250ok.com/login?submit=true",
mktoNextGenUxLink = "https://marketo.invisionapp.com/share/V2FQQBSYUPX",
mktoDemoAccountMatch = "^mktodemoaccount",
mktoMyMarketoFragment = "MM0A1",
mktoCalendarFragment = "CAL",
mktoAnalyticsFragment = "AR",
mktoReportFragmentRegex = new RegExp("^AR[^!]+!$", "i"),
mktoModelerFragmentRegex = new RegExp("^RCM[^!]+!$", "i"),
mktoAnalyticsFragmentMatch = new RegExp("^AR[^!]+!$|^RCM[^!]+!$", "i"),
mktoModelerPreviewFragmentRegex = new RegExp("preview=true&approved=true/#RCM[^!]+!$", "i"),
mktoAnalyticsHomeFragment = "AH0A1ZN",
mktoAccountBasedMarketingFragment = "ABM0A1",
mktoAdBridgeSmartListFragment = "SL1119566B2LA1",
mktoAdminSalesforceFragment = "SF0A1",
mktoAdminDynamicsFragment = "DY0A1",
mktoAdminRcaCustomFieldSync = "CFS0B2",
mktoPersonDetailPath = "/leadDatabase/loadLeadDetail",
mktoDefaultDiyLandingPageResponsiveEditFragment = "LPE11822",
/*
mktoDefaultWorkspaceAssetId = "15",
mktoJapaneseWorkspaceAssetId = "19848",
mktoFinservWorkspaceAssetId = "20806",
mktoHealthcareWorkspaceAssetId = "20826",
mktoHigherEdWorkspaceAssetId = "20846",
mktoManufacturingWorkspaceAssetId = "26410",
mktoTechnologyWorkspaceAssetId = "26489",
mktoTravelLesiureWorkspaceAssetId = "27588",
*/
waitAfterDiscard = 2000,

mktoAccountStringMaster = "mktodemolivemaster",
mktoAccountStringQe = "globalsales",
mktoAccountString106 = "mktodemoaccount106",
mktoAccountString106d = "mktodemoaccount106d",
mktoAccountStringDynamics = "mktodemoaccount408",
mktoAccountStrings106Match = "^(" + mktoAccountString106 + "|" + mktoAccountString106d + ")$",
mktoAccountStringsMatch = "^(" + mktoAccountStringMaster + "|" + mktoAccountString106 + "|" + mktoAccountString106d + "|" + mktoAccountStringDynamics + ")$",

mktoWorkingFoldersToHide = new RegExp("^Manufacturing$|\\(TEST\\)$", "i"),
mktoOperationalFolders = new RegExp("^(_Operational|_Operations)", "i"),

mktoMasterMarketingActivitiesEnglishFragment = "MA19A1",
mktoMarketingActivitiesDefaultFragment = "MA15A1",
mktoMarketingActivitiesUserFragment = "MA19802A1",
mktoMarketingActivitiesJapaneseFragment = "MA19848A1",
mktoMarketingActivitiesFinservFragment = "MA20806A1",
mktoMarketingActivitiesHealthcareFragment = "MA20826A1",
mktoMarketingActivitiesHigherEdFragment = "MA20846A1",
mktoMarketingActivitiesManufacturingFragment = "MA26410A1",
mktoMarketingActivitiesTechnologyFragment = "MA26489A1",
mktoMarketingActivitiesTravelLeisureFragment = "MA27588A1",
mktoMasterLeadDatabaseEnglishFragment = "ML0A1ZN5",
mktoLeadDatabaseDefaultFragment = "ML0A1ZN2",
mktoLeadDatabaseUserFragment = "ML0A1ZN19788",
mktoLeadDatabaseJapaneseFragment = "ML0A1ZN19834",
mktoLeadDatabaseFinservFragment = "ML0A1ZN20792",
mktoLeadDatabaseHealthcareFragment = "ML0A1ZN20812",
mktoLeadDatabaseHigherEdFragment = "ML0A1ZN20832",
mktoLeadDatabaseManufacturingFragment = "ML0A1ZN26396",
mktoLeadDatabaseTechnologyFragment = "ML0A1ZN26475",
mktoLeadDatabaseTravelLeisureFragment = "ML0A1ZN27574",
mktoAdminEmailEmailFragment = "EA0A1",
mktoAdminWebServicesFragment = "MW0A1",
mktoDisableButtonsFragmentMatch = "^(" + mktoMasterMarketingActivitiesEnglishFragment + "|" + mktoMarketingActivitiesDefaultFragment + "|" + mktoMarketingActivitiesUserFragment + "|" + mktoMarketingActivitiesJapaneseFragment + "|" + mktoMarketingActivitiesFinservFragment + "|" + mktoMarketingActivitiesHealthcareFragment + "|" + mktoMarketingActivitiesHigherEdFragment + "|" + mktoMarketingActivitiesManufacturingFragment + "|" + mktoMarketingActivitiesTechnologyFragment + "|" + mktoMarketingActivitiesTravelLeisureFragment + "|" + mktoMasterLeadDatabaseEnglishFragment + "|" + mktoLeadDatabaseDefaultFragment + "|" + mktoLeadDatabaseUserFragment + "|" + mktoLeadDatabaseJapaneseFragment + "|" + mktoLeadDatabaseFinservFragment + "|" + mktoLeadDatabaseHealthcareFragment + "|" + mktoLeadDatabaseHigherEdFragment + "|" + mktoLeadDatabaseManufacturingFragment + "|" + mktoLeadDatabaseTechnologyFragment + "|" + mktoLeadDatabaseTravelLeisureFragment + "|" + mktoAdminEmailEmailFragment + "|" + mktoAdminWebServicesFragment + ")$",

mktoOppInfluenceAnalyzerFragment = "AR1559A1!",
mktoProgramAnalyzerFragment = "AR1544A1!",
mktoModelerFragment = "RCM70A1!",
mktoSuccessPathAnalyzerFragment = "AR1682A1!",
mktoAnalyzersFragmentMatch = "^(" + mktoOppInfluenceAnalyzerFragment + "|" + mktoProgramAnalyzerFragment + "|" + mktoModelerFragment + "|" + mktoSuccessPathAnalyzerFragment + ")$",

mktoMobilePushNotificationFragment = "MPN",
mktoInAppMessageFragment = "IAM",
mktoSmsMessageFragment = "SMS",
mktoSocialAppFragment = "SOA",
mktoOtherAssetsFragmentMatch = "^(" + mktoMobilePushNotificationFragment + "|" + mktoInAppMessageFragment + "|" + mktoSmsMessageFragment + "|" + mktoSocialAppFragment + ")",

mktoAbmDiscoverMarketoCompaniesFragment = "ABMDM",
mktoAbmDiscoverCrmAccountsFragment = "ABMDC",
mktoAbmNamedAccountFragment = "NA",
mktoAbmImportNamedAccountsFragment = "ABMIA",
mktoAbmFragmentMatch = "^(" + mktoAbmDiscoverMarketoCompaniesFragment + "|" + mktoAbmDiscoverCrmAccountsFragment + "|" + mktoAbmNamedAccountFragment + "|" + mktoAbmImportNamedAccountsFragment + ")$",

mktoEmailEditFragment = "EME",
mktoEmailPreviewFragmentRegex = new RegExp("^EME[0-9]+&isPreview", "i"),
mktoEmailPreviewFragment2 = "EME[0-9]+&isPreview",
mktoEmailPreviewFragment = "EMP",
mktoEmailTemplateEditFragment = "EMTE",
mktoLandingPageEditFragment = "LPE",
mktoLandingPagePreviewFragment = "LPP",
mktoLandingPagePreviewDraftFragment = "LPPD",
mktoLandingPageTemplateEditFragment = "LPTE",
mktoLandingPageTemplatePreviewFragment = "LPTPD",
mktoFormEditFragment = "FOE",
mktoFormPreviewFragment = "FOP",
mktoFormPreviewDraftFragment = "FOPD",
mktoPushNotificationEditFragment = "MPNE",
mktoMobilePushNotificationPreviewFragment = "MPNP",
mktoInAppMessageEditFragment = "IAME",
mktoInAppMessagePreviewFragment = "IAMP",
mktoSmsMessageEditFragment = "SME",
mktoSocialAppEditFragment = "SOAE",
mktoSocialAppPreviewFragment = "SOAP",
mktoAbTestEditFragment = "EBE",
mktoEmailTestGroupEditFragment = "CCE",
mktoSnippetEditFragment = "SNE",
mktoSnippetPreviewFragment = "SNP",
mktoDesignersFragmentMatch = "^" + mktoEmailEditFragment + "$|^" + mktoEmailPreviewFragment2 + "|^" + mktoEmailPreviewFragment + "$|^" + mktoEmailTemplateEditFragment + "$|^" + mktoLandingPageEditFragment + "$|^" + mktoLandingPagePreviewFragment + "$|^" + mktoLandingPagePreviewDraftFragment + "$|^" + mktoLandingPageTemplateEditFragment + "$|^" + mktoLandingPageTemplatePreviewFragment + "$|^" + mktoFormEditFragment + "$|^" + mktoFormPreviewFragment + "$|^" + mktoFormPreviewDraftFragment + "$|^" + mktoPushNotificationEditFragment + "$|^" + mktoMobilePushNotificationPreviewFragment + "$|^" + mktoInAppMessageEditFragment + "$|^" + mktoInAppMessagePreviewFragment + "$|^" + mktoSmsMessageEditFragment + "$|^" + mktoSocialAppEditFragment + "$|^" + mktoSocialAppPreviewFragment + "$|^" + mktoAbTestEditFragment + "$|^" + mktoEmailTestGroupEditFragment + "$|^" + mktoSnippetEditFragment + "$|^" + mktoSnippetPreviewFragment + "$",

mktoDefaultWorkspaceId,
mktoJapaneseWorkspaceId,
mktoFinservWorkspaceId,
mktoHealthcareWorkspaceId,
mktoHigherEdWorkspaceId,
mktoManufacturingWorkspaceId,
mktoTechnologyWorkspaceId,
mktoTravelLesiureWorkspaceId,
mktoUnknownWorkspaceId,
mktoGoldenWorkspacesMatch,
mktoMyWorkspaceEnId,
mktoMyWorkspaceJpId,
mktoMyWorkspaceIdMatch,
mktoMyWorkspaceEnName,
mktoMyWorkspaceJpName,
mktoMyWorkspaceNameMatch,
mktoOtherWorkspaceName,
mktoEmailPerformanceReport,
mktoPeoplePerformanceReport,
mktoWebPageActivityReport,
mktoOpportunityInfluenceAnalyzer,
mktoProgramAnalyzer,
mktoSuccessPathAnalyzer,
mktoPerformanceInsightsLink,
mktoEngagmentStreamPerformaceReport,
mktoProgramPerformanceReport,
mktoEmailLinkPerformanceReport,
mktoPeopleByRevenueStageReport,
mktoLandingPagePerformanceReport,
mktoPeopleByStatusReport,
mktoCompanyWebActivityReport,
mktoSalesInsightEmailPerformanceReport,
restoreEmailInsights,
origEmailInsightsTileLink,
origEmailInsightsMenuItemLink,
currUrlFragment,
currCompFragment,
userName,
accountString,
origMenuShowAtFunc,
origAjaxRequestFunc,
origAssetSaveEdit,
origFillCanvas,
origExplorerPanelAddNode,
origExplorerPanelRemoveNodes,
origExplorerPanelUpdateNodeText,

APP = APP || {};

/**************************************************************************************
 *
 *  This function sets the instance specific variables with the proper values based
 *  upon the given accountString.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {String} accountString - Marketo instance
 *
 **************************************************************************************/

APP.setInstanceInfo = function (accountString) {
  if (accountString == mktoAccountStringMaster) {
    mktoDefaultWorkspaceId = 1;
    mktoJapaneseWorkspaceId = 3;
    mktoUnknownWorkspaceId = -1;
    mktoGoldenWorkspacesMatch = "^(" + mktoDefaultWorkspaceId + "|" + mktoJapaneseWorkspaceId + "|" + mktoUnknownWorkspaceId + ")$";
    
    mktoMyWorkspaceEnId;
    mktoMyWorkspaceJpId;
    mktoMyWorkspaceIdMatch = null;
    
    mktoMyWorkspaceEnName;
    mktoMyWorkspaceJpName;
    mktoMyWorkspaceNameMatch = null;
    
    mktoOtherWorkspaceName = "User's Workspace";
    
    mktoEmailPerformanceReport = "AR205B2";
    mktoPeoplePerformanceReport = "AR23B2";
    mktoWebPageActivityReport = "AR218B2";
    mktoOpportunityInfluenceAnalyzer = "AR207A1";
    mktoProgramAnalyzer = "AR223A1";
    mktoSuccessPathAnalyzer = "AR208A1";
    mktoPerformanceInsightsLink = "https://insights.marketolive.com/mpi";
    mktoEngagmentStreamPerformaceReport = "AR209B2";
    mktoProgramPerformanceReport = "AR216B2";
    mktoEmailLinkPerformanceReport = "AR204B2";
    mktoPeopleByRevenueStageReport = "AR26B2";
    mktoLandingPagePerformanceReport = "AR210B2";
    mktoPeopleByStatusReport = "AR225B2";
    mktoCompanyWebActivityReport = "AR221B2";
    mktoSalesInsightEmailPerformanceReport = "AR226B2";
  } else if (accountString.search(mktoAccountStrings106Match) != -1) {
    mktoDefaultWorkspaceId = 1;
    mktoJapaneseWorkspaceId = 173;
    mktoFinservWorkspaceId = 174;
    mktoHealthcareWorkspaceId = 175;
    mktoHigherEdWorkspaceId = 176;
    mktoManufacturingWorkspaceId = 184;
    mktoTechnologyWorkspaceId = 185;
    mktoTravelLesiureWorkspaceId = 186;
    mktoUnknownWorkspaceId = -1;
    mktoGoldenWorkspacesMatch = "^(" + mktoDefaultWorkspaceId + "|" + mktoJapaneseWorkspaceId + "|" + mktoFinservWorkspaceId + "|" + mktoHealthcareWorkspaceId + "|" + mktoHigherEdWorkspaceId + "|" + mktoManufacturingWorkspaceId + "|" + mktoTechnologyWorkspaceId + "|" + mktoTravelLesiureWorkspaceId + "|" + mktoUnknownWorkspaceId + ")$";
    
    mktoMyWorkspaceEnId = 172;
    mktoMyWorkspaceIdMatch = "^(" + mktoMyWorkspaceEnId + ")$";
    
    mktoMyWorkspaceEnName = "My Workspace";
    mktoMyWorkspaceNameMatch = "^(" + mktoMyWorkspaceEnName + ")$";
    
    mktoOtherWorkspaceName = "User's Workspace";
    
    mktoEmailPerformanceReport = "AR3866B2";
    mktoPeoplePerformanceReport = "AR3874B2";
    mktoWebPageActivityReport = "AR3876B2";
    mktoOpportunityInfluenceAnalyzer = "AR1559A1";
    mktoProgramAnalyzer = "AR1544A1";
    mktoSuccessPathAnalyzer = "AR1682A1";
    mktoPerformanceInsightsLink = "https://insights.marketolive.com/mpi";
    mktoEngagmentStreamPerformaceReport = "AR3881B2";
    mktoProgramPerformanceReport = "AR3882B2";
    mktoEmailLinkPerformanceReport = "AR3886B2";
    mktoPeopleByRevenueStageReport = "AR3889B2";
    mktoLandingPagePerformanceReport = "AR3891B2";
    mktoPeopleByStatusReport = "AR3893B2";
    mktoCompanyWebActivityReport = "AR3901B2";
    mktoSalesInsightEmailPerformanceReport = "AR3903B2";
  } else if (accountString == mktoAccountStringDynamics) {
    mktoDefaultWorkspaceId = 1;
    mktoUnknownWorkspaceId = -1;
    mktoGoldenWorkspacesMatch = "^(" + mktoDefaultWorkspaceId + "|" + mktoUnknownWorkspaceId + ")$";
    
    mktoMyWorkspaceIdMatch = null;
    mktoMyWorkspaceNameMatch = null;
    
    mktoPerformanceInsightsLink = "https://insights.marketolive.com/mpi";
  }
};

/**************************************************************************************
 *
 *  This function sends a message to the extension in order to create a Chrome 
 *  notification in a given instance and a user with a specific role.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {String} accountString - Marketo instance
 *  @param {String} roleName - role of the current user (Optional)
 *  @param {String} mktoUserId - user name of the current user (Optional)
 *
 **************************************************************************************/

APP.sendMktoMessage = function (accountString, roleName, mktoUserId) {
  var adTargetingMsg = {
    action: "mktoLiveMessage",
    id: "adTargeting",
    title: "New Feature: Ad Targeting",
    notify: "Now you can quickly capture ad targeting images or demo ad targeting live for:\n\nGoogle Search, Facebook, LinkedIn",
    requireInteraction: true,
    buttonTitle: "                        Learn More -->",
    buttonLink: "http://www.marketolive.com/en/learn/videos",
    startDate: "",
    endDate: "07-27-2017",
    numOfTimesPerDay: 1
  },
  userWorkspaceMsg = {
    action: "mktoLiveMessage",
    id: "userWorkspace",
    title: "New To Reloaded: User Workspace",
    notify: "Leverage your own SC workspace for creating any program/asset using the provided demo data of our shared partition in the MarketoLive Reloaded instance.\n\nUser ID: ",
    requireInteraction: true,
    startDate: "",
    endDate: "07-12-2017",
    numOfTimesPerDay: 2
  },
  extensionUpdateMsg = {
    action: "mktoLiveMessage",
    id: "extensionUpdate",
    title: "Coming Soon: Extension v5.2.0",
    notify: "Within the next day or two your extension will automatically update and be disabled due to new permissions being requested. Approve the new permission by re-enabling the extension.",
    requireInteraction: true,
    buttonTitle: "                        How to Re-enable the Extension -->",
    buttonLink: "http://www.marketolive.com/en/update/extension-update",
    startDate: "",
    endDate: "08-16-2017",
    numOfTimesPerDay: 1
  },
  changePasswordMsg = {
    action: "mktoLiveMessage",
    id: "changePasswordMsg",
    title: "MANDATORY: Change Your Password",
    notify: "As per IT security policy, passwords must expire every 60 days. Please change your password before August 18th.",
    requireInteraction: true,
    buttonTitle: "                        Change Your Password -->",
    buttonLink: "https://app-sjdemo1.marketo.com/#MC0A1",
    startDate: "",
    endDate: "08-17-2017",
    numOfTimesPerDay: 1
  },
  issueMsg = {
    action: "mktoLiveMessage",
    id: "emailInsightsMsg",
    title: "Email Insights Not Working",
    notify: "There is a known issue with Email Insights not displaying data after 07/15/17.\n\nAs a fix, I have deep linked it's tile and menu item to our Email Insights demo app.",
    requireInteraction: true,
    buttonTitle: "                        Email Insights Demo App -->",
    buttonLink: "http://www.marketolive.com/en/analytics/email-insights-summit-demo-1",
    startDate: "",
    endDate: "08-09-2017",
    numOfTimesPerDay: 1
  };
  
  chrome.runtime.sendMessage(extensionId, extensionUpdateMsg);
  
  /*
  if (accountString == mktoAccountStringMaster) {
    chrome.runtime.sendMessage(extensionId, changePasswordMsg);
  }
  */
  
  /*
  if (accountString == mktoAccountStringMaster) {
    chrome.runtime.sendMessage(extensionId, adTargetingMsg);
  } else if (accountString.search(mktoAccountStrings106Match) != -1) {
    chrome.runtime.sendMessage(extensionId, adTargetingMsg);
    
    switch (roleName) {
    case "SC":
      if (mktoUserId) {
        userWorkspaceMsg.notify += mktoUserId + "@marketolive.com)";
      } else {
        userWorkspaceMsg.notify += "@marketolive.com)";
      }
      
      chrome.runtime.sendMessage(extensionId, userWorkspaceMsg);
      break;
      
    default:
      break;
    }
  }
  */
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

APP.getCookie = function (cookieName) {
  console.log("Getting: Cookie " + cookieName);
  
  var name = cookieName + '=',
  cookies = document.cookie.split(';'),
  currCookie;
  
  for (var ii = 0; ii < cookies.length; ii++) {
    currCookie = cookies[ii].trim();
    if (currCookie.indexOf(name) == 0) {
      return currCookie.substring(name.length, currCookie.length);
    }
  }
  console.log("Marketo App > Getting: Cookie " + cookieName + " not found");
  return null;
};

/**************************************************************************************
 *
 *  This function sets the specified cookie for the current domain.
 *
 *  @Author Andrew Garcia
 *
 *  @function
 *
 *  @param {String} name - The name of the cookie.
 *  @param {String} value - The value of the cookie.
 *  @param {int} expiresInDays - The expiration date of the cookie in days.
 *  @param {String} domain - The domain of the cookie.
 *  @param {boolean} secure - Whether the cookie should be marked as Secure.
 *
 **************************************************************************************/

APP.setCookie = function (name, value, expiresInDays, domain, secure) {
  console.log("Setting: " + name + " Cookie for " + domain);
  
  var d = new Date(),
  expires;
  d.setTime(d.getTime() + (expiresInDays * 24 * 60 * 60 * 1000));
  expires = "expires=" + d.toGMTString();
  document.cookie = name + "=" + value + "; " + expires + "; " + "path=/;" + "domain=" + domain + ";secure=" + secure + ";";
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

APP.webRequest = function (url, params, method, async, responseType, callback) {
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
 *  This function formats the given text by trimming and proper capitalization.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {String} text - The string to format.
 *
 **************************************************************************************/

APP.formatText = function (text) {
  var splitText = text.trim().split(" "),
  formattedText = "";
  
  for (var ii = 0; ii < splitText.length; ii++) {
    if (ii != 0) {
      formattedText += " ";
    }
    formattedText += splitText[ii].charAt(0).toUpperCase() + splitText[ii].substring(1).toLowerCase();
  }
  
  return formattedText;
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

APP.validateDemoExtensionCheck = function (isValidExtension) {
  console.log("Marketo App > Validating: Demo Extension Check");
  
  if (isValidExtension) {
    window.mkto_live_extension_state = "MarketoLive extension is alive!";
    console.log("Marketo App > Validating: Demo Extension IS Valid");
  } else if (MktPage
     && MktPage.validateDemoExtension) {
    window.mkto_live_extension_state = null;
    MktPage.validateDemoExtension(new Date());
    console.log("Marketo App > Validating: Demo Extension IS NOT Valid");
  }
};

/**************************************************************************************
 *
 *  This function returns the workspace name given the workspace ID.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {int} workspaceId - workspace ID
 *
 **************************************************************************************/

APP.getWorkspaceName = function (workspaceId) {
  switch (parseInt(workspaceId)) {
  case mktoDefaultWorkspaceId:
    return "Default";
    break;
    
  case mktoJapaneseWorkspaceId:
    return "デモ";
    break;
    
  case mktoFinservWorkspaceId:
    return "Financial Services";
    break;
    
  case mktoHealthcareWorkspaceId:
    return "Healthcare";
    break;
    
  case mktoHigherEdWorkspaceId:
    return "Higher Education";
    break;
    
  case mktoManufacturingWorkspaceId:
    return "Manufacturing";
    break;
    
  case mktoTechnologyWorkspaceId:
    return "Technology";
    break;
    
  case mktoTravelLesiureWorkspaceId:
    return "Travel Leisure";
    break;
    
  case mktoMyWorkspaceEnId:
    return "My Workspace";
    break;
    
  default:
    return "Unknown";
    break;
  }
};

/**************************************************************************************
 *
 *  This function returns the 2-3 letter asset code for the asset type provided.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {String} compType - asset type
 *
 **************************************************************************************/

APP.getAssetCompCode = function (compType) {
  var compCode;
  
  switch (compType) {
  case "Marketing Folder":
    compCode = "MF";
    break;
  case "Marketing Program":
    compCode = "PG";
    break;
  case "Marketing Event":
    compCode = "ME";
    break;
  case "Nurture Program":
    compCode = "NP";
    break;
  case "Email Batch Program":
    compCode = "EBP";
    break;
  case "List":
    compCode = "ST";
    break;
  case "Smart List":
    compCode = "SL";
    break;
  case "Smart Campaign":
    compCode = "SC";
    break;
  case "Landing Page Form":
    compCode = "FO";
    break;
  case "Landing Page":
    compCode = "LP";
    break;
  case "Landing Page Test Group":
    compCode = "LP";
    break;
  case "Landing Page Template":
    compCode = "LT";
    break;
  case "Email":
    compCode = "EM";
    break;
  case "Test Group":
    compCode = "TG";
    break;
  case "Email Template":
    compCode = "ET";
    break;
  case "Social App":
    compCode = "SOA";
    break;
  case "Mobile Push Notification":
    compCode = "MPN";
    break;
  case "In-App Message":
    compCode = "IAM";
    break;
  case "SMS Message":
    compCode = "SMS";
    break;
  case "Segmentation":
    compCode = "SG";
    break;
  case "Report":
    compCode = "AR";
    break;
  case "Revenue Cycle Model":
    compCode = "RCM";
    break;
  case "Snippet":
    compCode = "SN";
    break;
  case "Image":
    compCode = "FI";
    break;
  }
  
  return compCode;
};

/**************************************************************************************
 *
 *  This function monitors changes to the Tree and tracks whenever a node is either
 *  added or renamed in a golden workspace and reports this to the user via an
 *  extension notification and to the Demo Services Team via marketolive-bugs private
 *  Slack channel.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.trackTreeNodeEdits = function () {
  console.log("Marketo App > Tracking: Edits to Tree Nodes");
  var violationMsg = {
    action: "mktoLiveMessage",
    id: "Not Permitted",
    title: "Not Permitted",
    notify: "",
    requireInteraction: true
  };
  
  if (typeof(Mkt) !== "undefined"
     && Mkt
     && Mkt.main
     && Mkt.main.ExplorerPanel
     && Mkt.main.ExplorerPanel.prototype
     && Mkt.main.ExplorerPanel.prototype.addNode) {
    if (typeof(origExplorerPanelAddNode) !== "function") {
      origExplorerPanelAddNode = Mkt.main.ExplorerPanel.prototype.addNode;
    }
    
    Mkt.main.ExplorerPanel.prototype.addNode = function (parentId, nodeConfig, selected) {
      if (nodeConfig
         && ((nodeConfig.z
             && nodeConfig.z.toString().search(mktoGoldenWorkspacesMatch) != -1)
           || (nodeConfig.accessZoneId
             && nodeConfig.accessZoneId.toString().search(mktoGoldenWorkspacesMatch) != -1))) {
        var changedNodeInfo = "\n>*Added Node:* " + nodeConfig.compType + " | " + nodeConfig.text + " | " + "https://" + window.location.host + "/#" + APP.getAssetCompCode(nodeConfig.compType) + nodeConfig.compId,
        workspaceId,
        workspaceName,
        workspaceInfo,
        userInfo,
        parentNodeInfo;
        
        if (nodeConfig.z) {
          workspaceId = nodeConfig.z;
          workspaceName = APP.getWorkspaceName(nodeConfig.z);
        } else {
          workspaceId = nodeConfig.accessZoneId;
          workspaceName = APP.getWorkspaceName(nodeConfig.accessZoneId);
        }
        workspaceInfo = "\n>*Workspace:* " + workspaceName;
        
        if (MktPage
           && MktPage.userName
           && MktPage.userid) {
          userInfo = "\n>*User:* " + MktPage.userName + " (" + MktPage.userid + ") ";
        }
        if (this.getNodeById(parentId)
           && this.getNodeById(parentId).attributes
           && this.getNodeById(parentId).attributes.text
           && this.getNodeById(parentId).attributes.compType
           && this.getNodeById(parentId).attributes.compId) {
          parentNodeInfo = "\n>*Parent Node:* " + this.getNodeById(parentId).attributes.compType + " | " + this.getNodeById(parentId).attributes.text + " | " + "https://" + window.location.host + "/#" + APP.getAssetCompCode(this.getNodeById(parentId).attributes.compType) + this.getNodeById(parentId).attributes.compId;
        }
        
        APP.webRequest('https://hooks.slack.com/services/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', '{"text": "*Unauthorized Changes*' + userInfo + workspaceInfo + parentNodeInfo + changedNodeInfo + '"}', 'POST', true, '');
        
        APP.heapTrack("track", {
          name: "Unauthorized Node Added",
          assetName: nodeConfig.text,
          assetId: nodeConfig.compId,
          assetType: nodeConfig.compType,
          workspaceId: workspaceId,
          workspaceName: workspaceName
        });
        
        violationMsg.notify = "Do not make changes to the " + workspaceName + " Workspace!",
        chrome.runtime.sendMessage(extensionId, violationMsg);
      }
      origExplorerPanelAddNode.apply(this, arguments);
    };
  } else {
    console.log("Marketo App > Skipping: Track Adding Tree Nodes");
  }
  
  if (typeof(Mkt) !== "undefined"
     && Mkt
     && Mkt.main
     && Mkt.main.ExplorerPanel
     && Mkt.main.ExplorerPanel.prototype
     && Mkt.main.ExplorerPanel.prototype.removeNodes) {
    if (typeof(origExplorerPanelRemoveNodes) !== "function") {
      origExplorerPanelRemoveNodes = Mkt.main.ExplorerPanel.prototype.removeNodes;
    }
    
    Mkt.main.ExplorerPanel.prototype.removeNodes = function (nodeIds) {
      if (this.getNodeById(nodeIds[0])
         && this.getNodeById(nodeIds[0]).attributes
         && this.getNodeById(nodeIds[0]).attributes.accessZoneId
         && this.getNodeById(nodeIds[0]).attributes.accessZoneId.toString().search(mktoGoldenWorkspacesMatch) != -1) {
        var nodeConfig = this.getNodeById(nodeIds[0]).attributes,
        workspaceName = APP.getWorkspaceName(nodeConfig.accessZoneId),
        workspaceInfo = "\n>*Workspace:* " + workspaceName,
        changedNodeInfo = "\n>*Removed Node:* " + nodeConfig.compType + " | " + nodeConfig.text + " | " + "https://" + window.location.host + "/#" + APP.getAssetCompCode(nodeConfig.compType) + nodeConfig.compId,
        userInfo;
        
        if (MktPage
           && MktPage.userName
           && MktPage.userid) {
          userInfo = "\n>*User:* " + MktPage.userName + " (" + MktPage.userid + ") ";
        }
        
        APP.webRequest('https://hooks.slack.com/services/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', '{"text": "*Unauthorized Changes*' + userInfo + workspaceInfo + changedNodeInfo + '"}', 'POST', true, '');
        
        APP.heapTrack("track", {
          name: "Unauthorized Node Removed",
          assetName: nodeConfig.text,
          assetId: nodeConfig.compId,
          assetType: nodeConfig.compType,
          workspaceId: nodeConfig.accessZoneId,
          workspaceName: workspaceName
        });
        
        violationMsg.notify = "Do not make changes to the " + workspaceName + " Workspace!",
        chrome.runtime.sendMessage(extensionId, violationMsg);
      }
      origExplorerPanelRemoveNodes.apply(this, arguments);
    };
  } else {
    console.log("Marketo App > Skipping: Track Removing Tree Nodes");
  }
  
  if (typeof(Mkt) !== "undefined"
     && Mkt
     && Mkt.main
     && Mkt.main.ExplorerPanel
     && Mkt.main.ExplorerPanel.prototype
     && Mkt.main.ExplorerPanel.prototype.updateNodeText) {
    if (typeof(origExplorerPanelUpdateNodeText) !== "function") {
      origExplorerPanelUpdateNodeText = Mkt.main.ExplorerPanel.prototype.updateNodeText;
    }
    
    Mkt.main.ExplorerPanel.prototype.updateNodeText = function (nodeId, text) {
      if (this.getNodeById(nodeId)
         && this.getNodeById(nodeId).attributes
         && this.getNodeById(nodeId).attributes.accessZoneId
         && this.getNodeById(nodeId).attributes.accessZoneId.toString().search(mktoGoldenWorkspacesMatch) != -1) {
        var nodeConfig = this.getNodeById(nodeId).attributes,
        workspaceName = APP.getWorkspaceName(nodeConfig.accessZoneId),
        workspaceInfo = "\n>*Workspace:* " + workspaceName,
        changedNodeInfo = "\n>*Renamed Node:* " + nodeConfig.compType + " | From '" + nodeConfig.text + "' to '" + text + "' | " + "https://" + window.location.host + "/#" + APP.getAssetCompCode(nodeConfig.compType) + nodeConfig.compId,
        userInfo;
        
        if (MktPage
           && MktPage.userName
           && MktPage.userid) {
          userInfo = "\n>*User:* " + MktPage.userName + " (" + MktPage.userid + ") ";
        }
        
        APP.webRequest('https://hooks.slack.com/services/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', '{"text": "*Unauthorized Changes*' + userInfo + workspaceInfo + changedNodeInfo + '"}', 'POST', true, '');
        
        APP.heapTrack("track", {
          name: "Unauthorized Node Renamed",
          assetName: nodeConfig.text,
          assetId: nodeConfig.compId,
          assetType: nodeConfig.compType,
          workspaceId: nodeConfig.accessZoneId,
          workspaceName: workspaceName
        });
        
        violationMsg.notify = "You are not permitted to make changes to " + workspaceName + "!\n\nThe Demo Services Team has been notified of this violation.",
        chrome.runtime.sendMessage(extensionId, violationMsg);
      }
      origExplorerPanelUpdateNodeText.apply(this, arguments);
    };
  } else {
    console.log("Marketo App > Skipping: Track Renaming Tree Nodes");
  }
};

/**************************************************************************************
 *
 *  This function disables saving of edits to the Landing Page Property Panel and also
 *  disables the system error message for sync errors on Landing Pages. These errors
 *  would occur when two users edit the same landing page simultaneously.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.disablePropertyPanelSaving = function () {
  console.log("Marketo App > Disabling: Saving of Landing Page Property Panel & Sync Error Message");
  
  if (typeof(Mkt3) !== "undefined"
     && Mkt3
     && Mkt3.controller
     && Mkt3.controller.editor
     && Mkt3.controller.editor.LandingPagePropertyPanel
     && Mkt3.controller.editor.LandingPagePropertyPanel.prototype
     && Mkt3.controller.editor.LandingPagePropertyPanel.prototype.fireSyncProperties) {
    Mkt3.controller.editor.LandingPagePropertyPanel.prototype.fireSyncProperties = function () {
      console.log("Marketo App > Executing: Disable Saving of Landing Page Property Panel & Sync Error Message");
    };
  }
  /*
  // Old way that hid other system errors
  MktMessage.showSystemError = function() {};
  
  // Original Function
  Mkt3.controller.editor.LandingPagePropertyPanel.prototype.fireSyncProperties = function(record, changes) {
  var prop = record.get('properties');
  if (prop) {
  var prop = this.normalizeProperties(Ext4.clone(prop), false, changes);
  record.set('properties', prop);
  }
  
  if (record.data.localeId.toString().search(mktoGoldenWorkspacesMatch) != -1) {
  this.application.fireEvent('message.lp.syncProperties', record, changes);
  }
  };*/
};

/**************************************************************************************
 *
 *  This function disables the confirmation message for deleting Triggers, Filters, and
 *  Flow Steps from a Smart Campaign or Smart List in the Default Worksapce.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.disableConfirmationMessage = function () {
  console.log("Marketo App > Disabling: Smart Campaign Delete Confirmation Message");
  
  if (typeof(Mkt) !== "undefined"
     && Mkt3
     && Mkt.widgets
     && Mkt.widgets.DataPanel
     && Mkt.widgets.DataPanel.prototype
     && Mkt.widgets.DataPanel.prototype.clickClose) {
    Mkt.widgets.DataPanel.prototype.clickClose = function () {
      console.log("Marketo App > Executing: Disable Smart Campaign Delete Confirmation Message");
      
      var hasChanges = this.hasSettings(),
      showTriggerWarning = false;
      if (this.isSmartlist && this.dpMeta.trigger) {
        var triggerCount = this.dpMgr.getTriggers().length;
        if (triggerCount == 1) {
          showTriggerWarning = true;
        }
      }
      
      if (hasChanges || showTriggerWarning) {
        var title = MktLang.getStr('DataFormPanel.Delete_arg0', [this.dpTypeName(true)]),
        name = this.dpMeta.displayName || this.dpMeta.name,
        msg = MktLang.getStr('DataFormPanel.Are_you_sure_you_want_to_delete_arg0_arg1', [this.dpTypeName(), MktLang.getDBStr(name)]);
        
        if (showTriggerWarning) {
          msg += MktLang.getStr("DataFormPanel.Triggered_campaigns_must_contain_trigger_remain_active");
        }
        
        if (this.dpMgr.isSmartlist && !this.dpMeta.trigger && this.dpMgr.smartListRuleLogic.customMode()) {
          msg += MktLang.getStr('DataFormPanel.Reminder') + MktLang.getStr('DataFormPanel.Check_your_advanced_filter_rules_after_any_insert_delete_reorder');
        }
        
        if (typeof(MktCanvas) !== "undefined"
           && MktCanvas
           && MktCanvas.getActiveTab()
           && MktCanvas.getActiveTab().config
           && MktCanvas.getActiveTab().config.accessZoneId) {
          console.log("Marketo App > Closing: Smart Campaign Delete Confirmation Message");
          this._doClose();
          /*
          if (hasChanges && showTriggerWarning) {
          Ext4.Msg.confirmDelete({
          title : title,
          msg : msg,
          minHeight : 300,
          fn : function (buttonId) {
          if (buttonId === 'ok') {
          this._doClose();
          }
          },
          scope : this
          });
          }
          else {
          console.log("Marketo App > Closing: Smart Campaign Delete Confirmation Message");
          this._doClose();
          }
           */
        } else {
          Ext4.Msg.confirmDelete({
            title: title,
            msg: msg,
            minHeight: 300,
            fn: function (buttonId) {
              if (buttonId === 'ok') {
                this._doClose();
              }
            },
            scope: this
          });
        }
      } else {
        this._doClose();
      }
    };
  }
};

/**************************************************************************************
 *
 *  This function overrides the target links for the Deliverability Tools and Email
 *  Insights tiles if they exist, otherwise it creates the tiles. We only have a single
 *  instance that contains usable demo data for both 250ok and Email Insights, so the
 *  plugin directs people into that instance. This function directs users to the 250ok
 *  login page where the deliverability-tools.js script will automatically login and
 *  hide the necessary buttons. This function should also run inside of SC sandbox
 *  instances.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.overrideHomeTiles = function (restoreEmailInsightsTile) {
  console.log("Marketo App > Overriding: My Marketo Home Tiles");
  
  if (typeof(MktCanvas) !== "undefined"
     && MktCanvas
     && MktCanvas.getEl()
     && MktCanvas.getEl().dom
     && MktCanvas.getEl().dom.nextSibling
     && MktCanvas.getEl().dom.nextSibling.childNodes
     && MktCanvas.getEl().dom.nextSibling.childNodes[0]
     && MktCanvas.getEl().dom.nextSibling.childNodes[0].childNodes
     && MktCanvas.getEl().dom.nextSibling.childNodes[0].childNodes[0]
     && MktCanvas.getEl().dom.nextSibling.childNodes[0].childNodes[0].childNodes
     && MktCanvas.getEl().dom.nextSibling.childNodes[0].childNodes[0].childNodes[0]
     && MktCanvas.getEl().dom.nextSibling.childNodes[0].childNodes[0].childNodes[0].childNodes
     && MktCanvas.getEl().dom.nextSibling.childNodes[0].childNodes[0].childNodes[0].childNodes[0]
     && MktCanvas.getEl().dom.nextSibling.childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes
     && MktCanvas.getEl().dom.nextSibling.childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0]
     && MktCanvas.getEl().dom.nextSibling.childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes
     && MktCanvas.getEl().dom.nextSibling.childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0]
     && MktCanvas.getEl().dom.nextSibling.childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes) {
    console.log("Marketo App > Executing: Override My Marketo Home Tiles 2");
    
    var container = MktCanvas.getEl().dom.nextSibling.childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0],
    tilesTextContent = container.textContent.replace(/([a-z])([A-Z])/g, "$1,$2").replace(/([A-Z])([A-Z][a-z])/g, "$1,$2").split(','),
    hrefMatch = new RegExp(" href=\"[^\"]*\" ", "g"),
    spareTileClone,
    performanceInsightsTile,
    emailInsightsTile,
    deliverabilityToolsTile,
    seoTile,
    nextGenUxTile,
    hiddenTile1,
    hiddenTile2;
    
    for (let ii = 0; ii < tilesTextContent.length; ii++) {
      if (tilesTextContent[ii] == "Performance Insights") {
        if (container.childNodes[ii].style.display != "none") {
          performanceInsightsTile = container.childNodes[ii];
          //performanceInsightsTile = MktCanvas.lookupComponent(container.childNodes[ii]);
        }
      } else if (tilesTextContent[ii] == "Email Insights") {
        emailInsightsTile = container.childNodes[ii];
      } else if (tilesTextContent[ii] == "Deliverability Tools") {
        deliverabilityToolsTile = container.childNodes[ii];
      } else if (tilesTextContent[ii] == "SEO") {
        seoTile = container.childNodes[ii];
      } else if (tilesTextContent[ii] == "Next Gen UX") {
        nextGenUxTile = container.childNodes[ii];
      }
    }
    
    if (performanceInsightsTile) {
      performanceInsightsTile.outerHTML = performanceInsightsTile.outerHTML.replace(hrefMatch, " href=\"" + mktoPerformanceInsightsLink + "\" ");
      //performanceInsightsTile.el.dom.outerHTML = performanceInsightsTile.el.dom.outerHTML.replace(hrefMatch, " href=\"" + mktoPerformanceInsightsLink + "\" ");
      
      document.getElementById(performanceInsightsTile.id).onclick = function () {
        APP.heapTrack("track", {
          name: "Performance Insights",
          assetArea: "Performance Insights",
          assetName: "Demo App",
          assetType: "Home Tile"
        });
      };
    } else {
      let performanceInsightsTileEl = document.createElement('div');
      performanceInsightsTileEl.className = "x4-btn mkt3-homeTile x4-btn-default-small x4-icon-text-left x4-btn-icon-text-left x4-btn-default-small-icon-text-left";
      performanceInsightsTileEl.style = "height: 150px;";
      performanceInsightsTileEl.id = "performanceInsightsTile";
      performanceInsightsTileEl.innerHTML = '<em id="performanceInsightsTile-btnWrap"><a id="performanceInsightsTile-btnEl" href="' + mktoPerformanceInsightsLink + '" class="x4-btn-center" target="_blank" role="link" style="width: 150px; height: 150px;"><span id="performanceInsightsTile-btnInnerEl" class="x4-btn-inner" style="width: 150px; height: 150px; line-height: 150px;">Performance Insights</span><span id="performanceInsightsTile-btnIconEl" class="x4-btn-icon mki3-mpi-logo-svg"></span></a></em>';
      
      //spareTileClone = MktCanvas.lookupComponent(container.childNodes[container.childNodes.length - 1]).cloneConfig();
      container.insertBefore(performanceInsightsTileEl, container.childNodes[container.childNodes.length - 1]);
      document.getElementById("performanceInsightsTile").onclick = function () {
        APP.heapTrack("track", {
          name: "Performance Insights",
          assetArea: "Performance Insights",
          assetName: "Demo App",
          assetType: "Home Tile"
        });
      };
    }
    
    if (emailInsightsTile) {
      var assetName;
      
      if (origEmailInsightsTileLink == null) {
        origEmailInsightsTileLink = emailInsightsTile.outerHTML.match(hrefMatch)[0].split('"')[1];
      }
      
      if (restoreEmailInsightsTile
         && origEmailInsightsTileLink != null) {
        emailInsightsTile.outerHTML = emailInsightsTile.outerHTML.replace(hrefMatch, " href=\"" + origEmailInsightsTileLink + "\" ");
        document.getElementById(emailInsightsTile.id).onclick = function () {
          APP.heapTrack("track", {
            name: "Email Insights",
            assetArea: "Email Insights",
            assetName: "Home",
            assetType: "Home Tile"
          });
        };
      } else {
        emailInsightsTile.outerHTML = emailInsightsTile.outerHTML.replace(hrefMatch, " href=\"" + mktoEmailInsightsLink + "\" ");
        document.getElementById(emailInsightsTile.id).onclick = function () {
          APP.heapTrack("track", {
            name: "Email Insights",
            assetArea: "Email Insights",
            assetName: "Demo App",
            assetType: "Home Tile"
          });
        };
      }
      
    } else {
      let emailInsightsTileEl = document.createElement('div');
      emailInsightsTileEl.className = "x4-btn mkt3-homeTile x4-btn-default-small x4-icon-text-left x4-btn-icon-text-left x4-btn-default-small-icon-text-left x-panel";
      emailInsightsTileEl.style = "height: 150px;";
      emailInsightsTileEl.id = "emailInsightsTile";
      emailInsightsTileEl.innerHTML = '<em id="emailInsightsTile-btnWrap"><a id="emailInsightsTile-btnEl" href="' + mktoEmailInsightsLink + '" class="x4-btn-center" target="_blank" role="link" style="width: 150px; height: 150px;"><span id="emailInsightsTile-btnInnerEl" class="x4-btn-inner" style="width: 150px; height: 150px; line-height: 150px;">Email Insights</span><span id="emailInsightsTile-btnIconEl" class="x4-btn-icon mki3-email-insights-svg"></span></a></em><div class="x-panel-bwrap" id="ext-gen164"><div class="x-panel-body x-panel-body-noheader" id="ext-gen165"></div></div>';
      
      container.insertBefore(emailInsightsTileEl, container.childNodes[container.childNodes.length - 1]);
      document.getElementById("emailInsightsTile").onclick = function () {
        APP.heapTrack("track", {
          name: "Email Insights",
          assetArea: "Email Insights",
          assetName: "Demo App",
          assetType: "Home Tile"
        });
      };
    }
    
    if (deliverabilityToolsTile) {
      deliverabilityToolsTile.outerHTML = deliverabilityToolsTile.outerHTML.replace(hrefMatch, " href=\"" + mktoEmailDeliverabilityToolsLink + "\" ");
      
      document.getElementById(deliverabilityToolsTile.id).onclick = function () {
        APP.heapTrack("track", {
          name: "Deliverability Tools",
          assetArea: "Deliverability Tools",
          assetName: "Demo Account",
          assetType: "Home Tile"
        });
      };
    } else {
      let deliverabilityToolsTileEl = document.createElement('div');
      deliverabilityToolsTileEl.className = "x4-btn mkt3-homeTile x4-btn-default-small x4-icon-text-left x4-btn-icon-text-left x4-btn-default-small-icon-text-left";
      deliverabilityToolsTileEl.style = "height: 150px;";
      deliverabilityToolsTileEl.id = "deliverabilityToolsTile";
      deliverabilityToolsTileEl.innerHTML = '<em id="deliverabilityToolsTile-btnWrap"><a id="deliverabilityToolsTile-btnEl" href="' + mktoEmailDeliverabilityToolsLink + '" class="x4-btn-center" target="_blank" role="link" style="width: 150px; height: 150px;"><span id="deliverabilityToolsTile-btnInnerEl" class="x4-btn-inner" style="width: 150px; height: 150px; line-height: 150px;">Deliverability Tools</span><span id="deliverabilityToolsTile-btnIconEl" class="x4-btn-icon mki3-mail-sealed-svg"></span></a></em>';
      
      container.insertBefore(deliverabilityToolsTileEl, container.childNodes[container.childNodes.length - 1]);
      document.getElementById("deliverabilityToolsTile").onclick = function () {
        APP.heapTrack("track", {
          name: "Deliverability Tools",
          assetArea: "Deliverability Tools",
          assetName: "Demo Account",
          assetType: "Home Tile"
        });
      };
    }
    
    if (seoTile) {
      //seoTile.el.dom.setAttribute("onclick", 'APP.heapTrack("track", {name: "SEO", assetName: "Home", assetType: "Home Tile"});');
      document.getElementById(seoTile.id).onclick = function () {
        APP.heapTrack("track", {
          name: "SEO",
          assetArea: "SEO",
          assetName: "Home",
          assetType: "Home Tile"
        });
      };
    }
    
    if (!nextGenUxTile) {
      let nextGenUxTileEl = document.createElement('div');
      nextGenUxTileEl.className = "x4-btn mkt3-homeTile x4-btn-default-small x4-icon-text-left x4-btn-icon-text-left x4-btn-default-small-icon-text-left";
      nextGenUxTileEl.style = "height: 150px;";
      nextGenUxTileEl.id = "nextGenUxTile";
      nextGenUxTileEl.innerHTML = '<em id="nextGenUxTile-btnWrap"><a id="nextGenUxTile-btnEl" href="' + mktoNextGenUxLink + '" class="x4-btn-center" target="_blank" role="link" style="width: 150px; height: 150px;"><span id="nextGenUxTile-btnInnerEl" class="x4-btn-inner" style="width: 150px; height: 150px; line-height: 150px;">Next Gen UX</span><span id="nextGenUxTile-btnIconEl" class="x4-btn-icon mki3-mercury-svg"></span></a></em>';
      
      container.insertBefore(nextGenUxTileEl, container.childNodes[container.childNodes.length - 1]);
      document.getElementById("nextGenUxTile").onclick = function () {
        APP.heapTrack("track", {
          name: "Mercury UX",
          assetArea: "Mercury UX",
          assetName: "InVision App",
          assetType: "Home Tile"
        });
      };
    }
    
    hiddenTile1 = container.querySelector('div[role="presentation"]')
    hiddenTile2 = container.querySelector('div[class="x-panel-bwrap x-panel"]')
    if (hiddenTile1) {
      hiddenTile1.remove();
    }
    if (hiddenTile2) {
      hiddenTile2.remove();
    }
  }
};

/**************************************************************************************
 *
 *  This function overrides the target links for the Email Insights and Deliverability
 *  Tools Superball menu items if they exist, otherwise it creates the menu items. By
 *  default, these menu items uses SSO to login, however, we only have one instance for
 *  each item that contains usable demo data, so the plugin directs people into that
 *  instance. This function directs users to the 250ok login page where the
 *  deliverability-tools.js script will automatically login and hide the necessary
 *  buttons. This function should also run inside of SC sandbox instances.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.overrideSuperballMenuItems = function (restoreEmailInsightsMenuItem) {
  console.log("Marketo App > Overriding: Superball Menu Items");
  
  if (typeof(MktPage) !== "undefined"
     && MktPage
     && MktPage.showSuperMenu) {
    MktPage.showSuperMenu = function () {
      console.log("Marketo App > Executing: Override Superball Menu Items");
      
      var logoEl = Ext.get(Ext.DomQuery.selectNode('.mkt-app-logo')),
      menu = logoEl.menu,
      menuTop = 55;
      
      if (!menu) {
        menu = logoEl.menu = Ext4.widget('appNavigationMenu', {
            listeners: {
              boxready: function (view) {
                var logoRegion = logoEl.getRegion();
                
                // shift out of the ball way
                if (logoRegion.bottom > menuTop) {
                  view.setBodyStyle('padding-top', logoRegion.bottom - menuTop + 10 + 'px');
                  view.updateLayout();
                }
                
                // prevent layering in front of the logo
                menu.setZIndex(logoEl.getStyle('zIndex') - 5);
              },
              beforerender: function (view) {
                view.addCls(view.componentCls + '-hidden');
              },
              show: function (view) {
                view.removeCls(view.componentCls + '-hidden');
                
                logoEl.ignoreNextClick = true;
                logoEl.removeClass(logoEl.attentionCls);
                
                if (!MktPage.savedState.isUsedSuperMenu) {
                  MktPage.savedState.isUsedSuperMenu = true;
                  
                  MktSession.ajaxRequest('user/saveUserPref', {
                    serializeParms: {
                      key: 'isUsedSuperMenu',
                      data: MktPage.savedState.isUsedSuperMenu
                    }
                  });
                }
              },
              beforehide: function (view) {
                view.addCls(view.componentCls + '-hidden');
              },
              hide: function () {
                (function () {
                  logoEl.ignoreNextClick = false;
                }).defer(250);
              }
            }
          });
        if (typeof(menu) !== "undefined"
           && menu
           && menu.items
           && menu.items.items) {
          console.log("Marketo App > Working: Override Superball Menu Items");
          
          var ii,
          currSuperBallMenuItem,
          performanceInsightsMenuItem,
          emailInsightsMenuItem,
          deliverabilityToolsMenuItem,
          seoMenuItem,
          clonedMenuItem;
          
          for (ii = 0; ii < menu.items.items.length; ii++) {
            currSuperBallMenuItem = menu.items.items[ii];
            
            if (currSuperBallMenuItem.text == "Performance Insights") {
              if (currSuperBallMenuItem.hidden != true) {
                performanceInsightsMenuItem = currSuperBallMenuItem;
              }
            } else if (currSuperBallMenuItem.text == "Email Insights") {
              emailInsightsMenuItem = currSuperBallMenuItem;
            } else if (currSuperBallMenuItem.text == "Deliverability Tools") {
              deliverabilityToolsMenuItem = currSuperBallMenuItem;
            } else if (currSuperBallMenuItem.text == "SEO") {
              seoMenuItem = currSuperBallMenuItem;
            }
          }
          
          if (performanceInsightsMenuItem) {
            var origMenuItemOnClick = performanceInsightsMenuItem.onClick;
            
            performanceInsightsMenuItem.onClick = function (e) {
              origMenuItemOnClick.apply(this, arguments);
              APP.heapTrack("track", {
                name: "Performance Insights",
                assetArea: "Performance Insights",
                assetName: "Demo App",
                assetType: "Home Tile"
              });
            };
            performanceInsightsMenuItem.href = mktoPerformanceInsightsLink;
            performanceInsightsMenuItem.update();
          } else {
            clonedMenuItem = menu.items.items[0].cloneConfig();
            clonedMenuItem.setText("Performance Insights");
            clonedMenuItem.setIconCls("mki3-mpi-logo-svg");
            clonedMenuItem.href = mktoPerformanceInsightsLink;
            clonedMenuItem.hrefTarget = "_blank";
            
            clonedMenuItem.onClick = function (e) {
              APP.heapTrack("track", {
                name: "Performance Insights",
                assetArea: "Performance Insights",
                assetName: "Demo App",
                assetType: "Home Tile"
              });
            };
            
            clonedMenuItem.update();
            menu.add(clonedMenuItem);
          }
          
          if (emailInsightsMenuItem) {
            if (origEmailInsightsMenuItemLink == null) {
              origEmailInsightsMenuItemLink = emailInsightsMenuItem.href;
            }
            
            if (restoreEmailInsightsMenuItem
               && origEmailInsightsMenuItemLink != null) {
              emailInsightsMenuItem.href = origEmailInsightsMenuItemLink;
            } else {
              emailInsightsMenuItem.href = mktoEmailInsightsLink;
            }
            emailInsightsMenuItem.update();
          } else {
            clonedMenuItem = menu.items.items[0].cloneConfig();
            clonedMenuItem.setText("Email Insights");
            clonedMenuItem.setIconCls("mki3-email-insights-svg");
            clonedMenuItem.href = mktoEmailInsightsLink;
            clonedMenuItem.hrefTarget = "_blank";
            clonedMenuItem.update();
            menu.add(clonedMenuItem);
          }
          
          if (deliverabilityToolsMenuItem) {
            var origMenuItemOnClick = deliverabilityToolsMenuItem.onClick;
            
            deliverabilityToolsMenuItem.onClick = function (e) {
              origMenuItemOnClick.apply(this, arguments);
              APP.heapTrack("track", {
                name: "Deliverability Tools",
                assetArea: "Deliverability Tools",
                assetName: "Demo Account",
                assetType: "Home Tile"
              });
            };
            deliverabilityToolsMenuItem.href = mktoEmailDeliverabilityToolsLink;
            deliverabilityToolsMenuItem.update();
          } else {
            clonedMenuItem = menu.items.items[0].cloneConfig();
            clonedMenuItem.setText("Deliverability Tools");
            clonedMenuItem.setIconCls("mki3-mail-sealed-svg");
            clonedMenuItem.href = mktoEmailDeliverabilityToolsLink;
            clonedMenuItem.hrefTarget = "_blank";
            
            //var origMenuItemOnClick = clonedMenuItem.onClick;
            
            clonedMenuItem.onClick = function (e) {
              //origMenuItemOnClick.apply(this, arguments);
              APP.heapTrack("track", {
                name: "Deliverability Tools",
                assetArea: "Deliverability Tools",
                assetName: "Demo Account",
                assetType: "Home Tile"
              });
            };
            
            clonedMenuItem.update();
            menu.add(clonedMenuItem);
          }
          
          if (seoMenuItem) {
            var origMenuItemOnClick = seoMenuItem.onClick;
            
            seoMenuItem.onClick = function (e) {
              origMenuItemOnClick.apply(this, arguments);
              APP.heapTrack("track", {
                name: "SEO",
                assetArea: "SEO",
                assetName: "Home",
                assetType: "Home Tile"
              });
            };
          }
        }
      }
      
      if (!menu.isVisible() && !logoEl.ignoreNextClick) {
        // position below app bar
        menu.showAt(0, menuTop);
        
        // prevent layering in front of the logo
        menu.setZIndex(logoEl.getStyle('zIndex') - 5);
      }
    };
  }
};

/**************************************************************************************
 *
 *  This function overrides the target link of the Analytics tiles in order to link to
 *  the Group Reports within the Default Workspace as those report settings are saved
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.overrideAnalyticsTiles = function () {
  console.log("Marketo App > Overriding: Analytics Tiles");
  
  var isAnalyticsTiles = window.setInterval(function () {
      if (typeof(MktCanvas) !== "undefined"
         && MktCanvas
         && MktCanvas.getActiveTab()
         && MktCanvas.getActiveTab().config
         && MktCanvas.getActiveTab().config.mkt3XType
         && MktCanvas.getActiveTab().config.accessZoneId
         && typeof(MktPage) !== "undefined"
         && MktPage
         && MktPage.savedState
         && MktPage.savedState.custPrefix) {
        window.clearInterval(isAnalyticsTiles);
        
        if (MktPage.savedState.custPrefix.search(mktoAccountStringsMatch) != -1
           && MktCanvas.getActiveTab().config.mkt3XType == "analyticsHome"
           && MktCanvas.getActiveTab().config.accessZoneId == mktoDefaultWorkspaceId
           && MktCanvas.getActiveTab().el
           && MktCanvas.getActiveTab().el.dom
           && MktCanvas.getActiveTab().el.dom.childNodes
           && MktCanvas.getActiveTab().el.dom.childNodes[0]
           && MktCanvas.getActiveTab().el.dom.childNodes[0].childNodes
           && MktCanvas.getActiveTab().el.dom.childNodes[0].childNodes[1]
           && MktCanvas.getActiveTab().el.dom.childNodes[0].childNodes[1].childNodes
           && MktCanvas.getActiveTab().el.dom.childNodes[0].childNodes[1].childNodes[0]
           && MktCanvas.getActiveTab().el.dom.childNodes[0].childNodes[1].childNodes[0].childNodes
           && MktCanvas.getActiveTab().el.dom.childNodes[0].childNodes[1].childNodes[0].childNodes[0]
           && MktCanvas.getActiveTab().el.dom.childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes
           && MktCanvas.getActiveTab().el.dom.childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0]
           && MktCanvas.getActiveTab().el.dom.childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes
           && MktCanvas.getActiveTab().el.dom.childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0]
           && MktCanvas.getActiveTab().el.dom.childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes) {
          console.log("Marketo App > Executing: Analytics Tiles");
          
          var container = MktCanvas.getActiveTab().el.dom.childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0],
          tiles = container.childNodes,
          performanceInsightsTileExists = false;
          
          for (var ii = 0; ii < tiles.length; ii++) {
            if (tiles[ii]
               && tiles[ii].outerHTML
               && tiles[ii].textContent) {
              var tileHTML = tiles[ii].outerHTML;
              
              switch (tiles[ii].textContent) {
              case "Performance Insights":
                var hrefMatch = new RegExp(' href=\"[^\"]*\" ', 'g');
                tiles[ii].outerHTML = tileHTML.replace(hrefMatch, ' href=\"' + mktoPerformanceInsightsLink + '\" ');
                performanceInsightsTileExists = true;
                break;
              
              case "Email Performance":
                tiles[ii].outerHTML = '<a href="/#' + mktoEmailPerformanceReport + '">' + tileHTML + '</a>';
                break;
                
              case "People Performance":
                tiles[ii].outerHTML = '<a href="/#' + mktoPeoplePerformanceReport + '">' + tileHTML + '</a>';
                break;
                
              case "Web Page Activity":
                tiles[ii].outerHTML = '<a href="/#' + mktoWebPageActivityReport + '">' + tileHTML + '</a>';
                break;
                
              case "Opportunity Influence Analyzer":
                tiles[ii].outerHTML = '<a href="/#' + mktoOpportunityInfluenceAnalyzer + '">' + tileHTML + '</a>';
                break;
                
              case "Program Analyzer":
                tiles[ii].outerHTML = '<a href="/#' + mktoProgramAnalyzer + '">' + tileHTML + '</a>';
                break;
                
              case "Success Path Analyzer":
                tiles[ii].outerHTML = '<a href="/#' + mktoSuccessPathAnalyzer + '">' + tileHTML + '</a>';
                break;
                
              case "Revenue Explorer":
                //tiles[ii].outerHTML = '<a href="/#' +  + '">' + tileHTML + '</a>';
                break;
                
              case "Email Insights":
                if (!restoreEmailInsights) {
                  var hrefMatch = new RegExp(' href=\"[^\"]*\" ', 'g');
                  tiles[ii].outerHTML = tileHTML.replace(hrefMatch, ' href=\"' + mktoEmailInsightsLink + '\" ');
                }
                break;
                
              case "Engagement Stream Performance":
                tiles[ii].outerHTML = '<a href="/#' + mktoEngagmentStreamPerformaceReport + '">' + tileHTML + '</a>';
                break;
                
              case "Program Performance":
                tiles[ii].outerHTML = '<a href="/#' + mktoProgramPerformanceReport + '">' + tileHTML + '</a>';
                break;
                
              case "Email Link Performance":
                tiles[ii].outerHTML = '<a href="/#' + mktoEmailLinkPerformanceReport + '">' + tileHTML + '</a>';
                break;
                
              case "Social Influence":
                //tiles[ii].outerHTML = '<a href="/#' +  + '">' + tileHTML + '</a>';
                break;
                
              case "People By Revenue Stage":
                tiles[ii].outerHTML = '<a href="/#' + mktoPeopleByRevenueStageReport + '">' + tileHTML + '</a>';
                break;
                
              case "Landing Page Performance":
                tiles[ii].outerHTML = '<a href="/#' + mktoLandingPagePerformanceReport + '">' + tileHTML + '</a>';
                break;
                
              case "People By Status":
                tiles[ii].outerHTML = '<a href="/#' + mktoPeopleByStatusReport + '">' + tileHTML + '</a>';
                break;
                
              case "Company Web Activity":
                tiles[ii].outerHTML = '<a href="/#' + mktoCompanyWebActivityReport + '">' + tileHTML + '</a>';
                break;
                
              case "Sales Insight Email Performance":
                tiles[ii].outerHTML = '<a href="/#' + mktoSalesInsightEmailPerformanceReport + '">' + tileHTML + '</a>';
                break;
              }
            }
          }
          
          if (!performanceInsightsTileExists) {
            var performanceInsightsTileOuterHTML = '<div class="x4-btn mkt3-analyticsTile mkt3-analyticsHomeTile x4-btn-default-small x4-icon-text-left x4-btn-icon-text-left x4-btn-default-small-icon-text-left" id="analyticsTile-1068"><em id="analyticsTile-1068-btnWrap"><a id="analyticsTile-1068-btnEl" href="' + mktoPerformanceInsightsLink + '" class="x4-btn-center" target="_blank" role="link" style="height: 160px;"><span id="analyticsTile-1068-btnInnerEl" class="x4-btn-inner">Performance Insights</span><span id="analyticsTile-1068-btnIconEl" class="x4-btn-icon mki3-mpi-logo-svg"></span></a></em></div>',
            idMatch = new RegExp("analyticsTile-1068", "g"),
            spareTileClone = MktCanvas.lookupComponent(container.childNodes[container.childNodes.length - 1]).cloneConfig();
            
            spareTileClone.el.dom.outerHTML = performanceInsightsTileOuterHTML.replace(idMatch, spareTileClone.id);
            container.appendChild(spareTileClone.el.dom);
          }
        }
      }
    }, 0);
};

/**************************************************************************************
 *
 *  This function overrides the save function of Smart Campaigns in order to disable
 *  saving within the Default Workspace at all times and within My Worksapce if the
 *  Smart Campaign is NOT within the user's root folder or if edit privileges is false
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.overrideSmartCampaignSaving = function () {
  console.log("Marketo App > Overriding: Saving for Smart Campaigns");
  
  if (typeof(Mkt) !== "undefined"
     && Mkt
     && Mkt.widgets
     && Mkt.widgets.DataPanelManager
     && Mkt.widgets.DataPanelManager.prototype
     && Mkt.widgets.DataPanelManager.prototype.save) {
    Mkt.widgets.DataPanelManager.prototype.save = function (cause, dp, acceptUpdates) {
      console.log("Marketo App > Executing: Override Saving for Smart Campaigns");
      
      this._updateDataPanelOrder(true);
      var canvas = MktCanvas.getActiveTab();
      if (!APP.evaluateMenu("button", null, canvas, null)
         && toggleState != "false") {
        
        if (this.saveQueue.blockingSaveInProgress) {
          this.saveQueue.pendingChangesCount++;
          this.saveQueue.dataPanelMetas = this._serializeDataPanels();
          this.saveQueue.dataPanelCount = this.countDataPanels();
          return;
        }
        
        var dataPanelMetas;
        if (this.saveQueue.dataPanelMetas) {
          dataPanelMetas = this.saveQueue.dataPanelMetas;
        } else {
          dataPanelMetas = this._serializeDataPanels();
        }
        
        this.saveQueue.pendingChangesCount = 0;
        this.saveQueue.dataPanelMetas = null;
        this.saveQueue.dataPanelCount = 0;
        if (dataPanelMetas === null) {
          return;
        }
        
        if (dataPanelMetas.length === 0
           && this.isFlow) {}
        
        if (this.dpSubtype != DPConst.RUN_ACTION
           && dataPanelMetas) {
          if (this.lastSave.dataPanelMetas && this.lastSave.dataPanelMetas == dataPanelMetas) {
            return;
          } else if (this.lastSave.dataPanelMetasUpdated && this.lastSave.dataPanelMetasUpdated == dataPanelMetas) {
            return;
          }
        }
        
        console.debug('Saving ' + this.dpType + ':', MktFormat.formatJsonStr(dataPanelMetas));
        if (DPDEBUG) {
          console.debug('Current Save:', dataPanelMetas);
          
          if (this.lastSave.dataPanelMetas) {
            console.debug('Previous Save:', this.lastSave.dataPanelMetas);
          }
          
          if (this.lastSave.dataPanelMetasUpdated) {
            console.debug('Previous Update:', this.lastSave.dataPanelMetasUpdated);
          }
        }
        
        this.lastSave.acceptUpdates = acceptUpdates;
        this.lastSave.dataPanelMetas = dataPanelMetas;
        this.saveQueue.blockingSaveInProgress = true;
        this.beforeSaveMessage();
        var params = Ext.apply({
            dataPanelMetas: dataPanelMetas,
            accessZoneId: this.accessZoneId
          }, this.baseSaveParams);
        
        if (this.isSmartlist && this.smartListRuleLogic.customMode()) {
          if (this.smartListRuleLogic.isCustomLogicValid()) {
            var smartListLogicParams = this.smartListRuleLogic.getSmartListLogicSaveParams();
            Ext.apply(params, smartListLogicParams);
          } else {
            console.debug('Data panel save successful. Custom rule logic is not valid');
          }
        }
        
        params[this.appVarsBase + 'Id'] = this.dataPanelStorageId;
        this.beforeSaveHook();
        if (DPDEBUG) {
          console.debug("Saving... ", params);
        }
        
        MktSession.ajaxRequest(this.saveAction, {
          serializeParms: params,
          onMySuccess: this.saveSuccess.createDelegate(this),
          onMyFailure: this.saveFailure.createDelegate(this)
        });
      } else {
        console.log("Marketo App > Disabling: Saving for Smart Campaigns");
      }
    };
  }
};

/**************************************************************************************
 *
 *  This function enables the Smart List and Flow Canvases for Smart Campaigns within
 *  the Default Workspace. In the case where a user does not have edit privileges for
 *  marketing assets, the UI palette for triggers, filters, and flow steps will not show
 *  by default.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/
/*
APP.overrideSmartCampaignCanvas = function () {
  console.log("Marketo App > Overriding: Smart Campaign Canvases");
  
  if (typeof(Mkt) !== "undefined"
     && Mkt
     && Mkt.widgets
     && Mkt.widgets.DataPanelLayout
     && Mkt.widgets.DataPanelLayout.prototype
     && Mkt.widgets.DataPanelLayout.prototype.initComponent) {
    Mkt.widgets.DataPanelLayout.prototype.initComponent = function () {
      console.log("Marketo App > Executing: Override Smart Campaign Canvases");
      
      if (typeof(MktCanvas) !== "undefined"
         && MktCanvas
         && MktCanvas.getActiveTab()
         && MktCanvas.getActiveTab().config
         && MktCanvas.getActiveTab().config.accessZoneId.toString().search(mktoGoldenWorkspacesMatch) != -1) {
        console.log("Marketo App > Enabling: Smart Campaign Canvases");
        
        this.dpEditable = true;
      }
      DPDEBUG = false;
      
      if (this.dpSubtype) {
        this.addClass('mktDataPanelLayout-' + this.dpSubtype);
      }
      
      if (this.canvas) {
        MktCanvas.mask(this.canvas);
      }
      
      if (this.dpType == 'Smartlist') {
        this.isSmartlist = true;
        this.Flow = false;
        this.SETTINGS = 'conditions';
      } else if (this.dpType == 'Flow') {
        this.isSmartlist = false;
        this.isFlow = true;
        this.SETTINGS = 'actions';
      }
      
      this.items = [];
      this.items.push({
        region: 'center',
        margins: !MktPage.isFeatureEnabled('carbolt') ? '7 5 10 10' : '',
        layout: 'fit',
        items: this.createManager()
      });
      
      if (this.dpEditable
         && this.canvas
         && this.paletteWidth > 0) {
        this.canvasWidth = MktCanvas.getWidth();
        var availableWidth = Math.min(this.canvasWidth - 700, this.maxPaletteWidth);
        this.paletteWidth = Math.max(this.paletteWidth, availableWidth);
        
        this.items.push({
          cls: 'mktEastPanel',
          region: 'east',
          margins: !MktPage.isFeatureEnabled('carbolt') ? '5 5 5 8' : '0 0 0 15',
          layout: 'fit',
          width: this.paletteWidth,
          items: this.createPalette()
        });
      }
      
      Mkt.widgets.DataPanelLayout.superclass.initComponent.apply(this);
      
      if (this.canvas) {
        MktPage.canvasCleanupStack.push(this.canvasCleanup.createDelegate(this));
      }
      
      if (this.canvas) {
        this.extendCanvasToolbar();
      }
      
      if (this.canvas) {
        this.extendCanvasGutter();
      }
      
      if (this.canvas) {
        MktCanvas.addHook(this.canvas, {
          dp: this
        });
      }
    };
  }
};
*/

/**************************************************************************************
 *
 *  This function overrides the fillCanvas function for the Program > Assets tab in
 *  order to remove the new asset buttons within the Default Workspace at all times 
 *  and within My Worksapce if the Program is NOT within the user's root folder.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.overrideCanvas = function () {
  console.log("Marketo App > Overriding: Canvas");
  
  if (typeof(MktCanvasPanelManager) !== "undefined"
     && MktCanvasPanelManager
     && MktCanvasPanelManager.prototype
     && MktCanvasPanelManager.prototype.fillCanvas) {
    if (typeof(origFillCanvas) !== "function") {
      origFillCanvas = MktCanvasPanelManager.prototype.fillCanvas;
    }
    
    MktCanvasPanelManager.prototype.fillCanvas = function (items, tabId, isGrid) {
      var tab = this.getTabOrActive(tabId),
      disable = APP.evaluateMenu("button", null, tab, null);
      
      if (disable
         && tab
         && tab.title == "Assets") {
        console.log("Marketo App > Executing: Override Assets Canvas > Removing New Asset Buttons");
        var newAssetButtons = items.find("cellCls", "pickerButton");
        
        for (var ii = 0; ii < newAssetButtons.length; ii++) {
          newAssetButtons[ii].destroy();
        }
      }
      
      origFillCanvas.apply(this, arguments);
    };
  }
};

/**************************************************************************************
 *
 *  This function overrides the updatePortletOrder function of Program > Assets tab in
 *  order to disable reordering of asset portlets within the Default Workspace at all
 *  times and within My Worksapce if the Program is NOT within the user's root folder
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.overrideUpdatePortletOrder = function () {
  console.log("Marketo App > Overriding: Updating of Portlet Order");
  
  if (typeof(Mkt) !== "undefined"
     && Mkt
     && Mkt.apps
     && Mkt.apps.localasset
     && Mkt.apps.localasset.LocalAssetPortal
     && Mkt.apps.localasset.LocalAssetPortal.prototype
     && Mkt.apps.localasset.LocalAssetPortal.prototype.updatePortletOrder) {
    console.log("Marketo App > Executing: Override Updating of Portlet Order");
    
    Mkt.apps.localasset.LocalAssetPortal.prototype.updatePortletOrder = function (e) {
      var canvas = MktCanvas.getActiveTab(),
      disable = APP.evaluateMenu("button", null, canvas, null);
      if (!disable) {
        var newPortletOrder = [];
        
        for (var i = 0; i < this.items.length; i++) {
          var itemInfo = this.items.get(i).smartCampaignMetaData;
          newPortletOrder.push(itemInfo.compTypeId + ":" + itemInfo.compId);
        }
        
        var params = {
          compId: this.programId,
          portletOrdering: Ext.encode(newPortletOrder)
        };
        
        MktSession.ajaxRequest('marketingEvent/orderLocalAssetPortlets', {
          serializeParms: params,
          localAssetManager: this,
          portletOrdering: newPortletOrder,
          onMySuccess: this.updatePortletOrderSuccess
        });
      } else {
        console.log("Marketo App > Disabling: Updating of Portlet Order");
      }
    };
  }
};

/**************************************************************************************
 *
 *  This function overrides the expand function for a Marketo tree node in order to
 *  hide each non-system folder that is in the Marketing workspace except the user's
 *  own folder
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.overrideTreeNodeExpand = function () {
  console.log("Marketo App > Overriding: Tree Node Expand");
  
  if (typeof(MktAsyncTreeNode) !== "undefined"
     && MktAsyncTreeNode
     && MktAsyncTreeNode.prototype
     && MktAsyncTreeNode.prototype.expand
     && userName) {
    MktAsyncTreeNode.prototype.expand = function () {
      var attr = this.attributes;
      
      if (this.text.search(mktoMyWorkspaceNameMatch) != -1
         || (this.parentNode.text.search(mktoMyWorkspaceNameMatch) != -1
           && this.attributes.system == true)
         || (this.parentNode.parentNode != null
           && this.parentNode.parentNode.text.search(mktoMyWorkspaceNameMatch) != -1
           && this.attributes.system == true)) {
        
        for (var ii = 0; ii < this.childNodes.length; ii++) {
          var currFolder = this.childNodes[ii];
          
          if (currFolder.attributes.system == false
             && currFolder.text.toLowerCase() !== userName) {
            currFolder.ui.hide();
            currFolder.hidden = true;
          }
        }
      } else if (accountString == mktoAccountStringMaster
         && this.attributes.accessZoneId.toString().search(mktoGoldenWorkspacesMatch) != -1
         && this.childNodes.length) {
        
        for (var ii = 0; ii < this.childNodes.length; ii++) {
          var node = this.childNodes[ii];
          
          if (node.childNodes.length == 0
             && node.attributes
             && node.attributes.children
             && node.attributes.children.length == 1
             && (node.attributes.children[0].isDraftNode == 1
               || node.attributes.children[0].isDraft)) {
            if (node.ui
               && node.ui.ecNode
               && node.ui.ecNode.className) {
              node.ui.ecNode.className = "x-tree-ec-icon x-tree-elbow";
              console.log("Removed Draft Node Of: " + node.text);
            } else {
              node.allowChildren = false;
              node.leaf = true;
              console.log("Prevented Draft Node Of: " + node.text);
            }
          } else if (node.childNodes.length == 1
             && node.childNodes[0].attributes
             && (node.childNodes[0].attributes.isDraftNode == 1
               || node.childNodes[0].attributes.isDraft)) {
            node.removeAll(true);
            console.log("Removed Child Draft Node Of: " + node.text);
          } else if (node.childNodes.length > 1
             && node.childNodes[0].attributes
             && (node.childNodes[0].attributes.isDraftNode == 1
               || node.childNodes[0].attributes.isDraft)) {
            node.childNodes[0].remove(true);
            console.log("Removed Child Draft Node Of: " + node.text);
          }
        }
        
        if (this.attributes.compType == "Zone") {
          for (var ii = 0; ii < this.childNodes.length; ii++) {
            var currFolder = this.childNodes[ii];
            
            if (currFolder.attributes.system == false
               && currFolder.attributes.compType == "Marketing Folder"
               && currFolder.text.search(mktoWorkingFoldersToHide) != -1) {
              currFolder.ui.hide();
              currFolder.hidden = true;
            }
          }
        } else if (this.parentNode
           && this.parentNode.attributes.compType == "Zone"
           && this.attributes.system == false
           && this.hidden == false
           && this.attributes.compType == "Marketing Folder") {
          for (var ii = 0; ii < this.childNodes.length; ii++) {
            var currFolder = this.childNodes[ii];
            
            if (currFolder.attributes.system == false
               && currFolder.attributes.compType == "Marketing Folder"
               && currFolder.text.search(mktoOperationalFolders) != -1) {
              currFolder.ui.hide();
              currFolder.hidden = true;
            }
          }
        } else if (this.parentNode
           && this.parentNode.parentNode
           && this.parentNode.parentNode.parentNode
           && this.parentNode.parentNode.parentNode.attributes.compType == "Zone"
           && this.attributes.system == false
           && this.hidden == false
           && this.attributes.compType != "Marketing Folder") {
          for (var ii = 0; ii < this.childNodes.length; ii++) {
            var currFolder = this.childNodes[ii];
            
            if (currFolder.attributes.system == false
               && currFolder.attributes.compType == "Marketing Folder"
               && currFolder.text.search(mktoOperationalFolders) != -1) {
              currFolder.ui.hide();
              currFolder.hidden = true;
            }
          }
        }
      }
      
      if (attr.folder) {
        if (attr.cancelFirstExpand) {
          delete this.attributes.cancelFirstExpand;
        } else if (this.childNodes
           && this.childNodes.length > 0
           && !attr.mktExpanded
           && this.attributes
           && this.attributes.accessZoneId) {
          
          if (this.attributes.accessZoneId.toString().search(mktoMyWorkspaceIdMatch) == -1) {
            MktFolder.saveExpandState(this, true);
          } else {
            console.log("Marketo App > NOT Saving: Folder Expand State");
          }
        }
      }
      MktAsyncTreeNode.superclass.expand.apply(this, arguments);
      attr.mktExpanded = true;
    };
  }
};

/**************************************************************************************
 *
 *  This function overrides the collapse function for a Marketo tree node in order to
 *  hide each non-system folder that is in the Marketing workspace except the user's
 *  own folder
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.overrideTreeNodeCollapse = function () {
  console.log("Marketo App > Overriding: Tree Node Collapse");
  
  if (typeof(MktAsyncTreeNode) !== "undefined"
     && MktAsyncTreeNode
     && MktAsyncTreeNode.prototype
     && MktAsyncTreeNode.prototype.collapse
     && userName) {
    MktAsyncTreeNode.prototype.collapse = function () {
      var attr = this.attributes;
      
      if (this.text.search(mktoMyWorkspaceNameMatch) != -1
         || (this.parentNode.text.search(mktoMyWorkspaceNameMatch) != -1
           && this.attributes.system == true)
         || (this.parentNode.parentNode != null
           && this.parentNode.parentNode.text.search(mktoMyWorkspaceNameMatch) != -1
           && this.attributes.system == true)) {
        
        for (var ii = 0; ii < this.childNodes.length; ii++) {
          var currFolder = this.childNodes[ii];
          
          if (currFolder.attributes.system == false
             && currFolder.text.toLowerCase() !== userName) {
            currFolder.ui.hide();
            currFolder.hidden = currFolder.ui.elNode.hidden = true;
          }
        }
      } else if (accountString == mktoAccountStringMaster
         && this.attributes.accessZoneId.toString().search(mktoGoldenWorkspacesMatch) != -1
         && this.childNodes.length) {
        if (this.attributes.compType == "Zone") {
          for (var ii = 0; ii < this.childNodes.length; ii++) {
            var currFolder = this.childNodes[ii];
            
            if (currFolder.attributes.system == false
               && currFolder.attributes.compType == "Marketing Folder"
               && currFolder.text.search(mktoWorkingFoldersToHide) != -1) {
              currFolder.ui.hide();
              currFolder.hidden = true;
            }
          }
        } else if (this.parentNode
           && this.parentNode.attributes.compType == "Zone"
           && this.attributes.system == false
           && this.hidden == false
           && this.attributes.compType == "Marketing Folder") {
          for (var ii = 0; ii < this.childNodes.length; ii++) {
            var currFolder = this.childNodes[ii];
            
            if (currFolder.attributes.system == false
               && currFolder.attributes.compType == "Marketing Folder"
               && currFolder.text.search(mktoOperationalFolders) != -1) {
              currFolder.ui.hide();
              currFolder.hidden = true;
            }
          }
        } else if (this.parentNode
           && this.parentNode.parentNode
           && this.parentNode.parentNode.parentNode
           && this.parentNode.parentNode.parentNode.attributes.compType == "Zone"
           && this.attributes.system == false
           && this.hidden == false
           && this.attributes.compType != "Marketing Folder") {
          for (var ii = 0; ii < this.childNodes.length; ii++) {
            var currFolder = this.childNodes[ii];
            
            if (currFolder.attributes.system == false
               && currFolder.attributes.compType == "Marketing Folder"
               && currFolder.text.search(mktoOperationalFolders) != -1) {
              currFolder.ui.hide();
              currFolder.hidden = true;
            }
          }
        }
      }
      
      if (attr.suppressAjaxCollapse) {
        delete this.attributes.suppressAjaxCollapse;
      } else if (isDefined(attr.folder)
         && attr.folder
         && attr.mktExpanded === true) {
        MktFolder.saveExpandState(this, false);
      }
      MktTreeNode.superclass.collapse.apply(this, arguments);
      attr.mktExpanded = false;
    };
  }
};

/**************************************************************************************
 *
 *  This function overrides the create function for a new Program or Segmentation in
 *  order to enforce a naming convention by appending the user's username to the name
 *  of the new program or segmentation
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.overrideNewProgramCreate = function () {
  console.log("Marketo App > Overriding: New Program/Segmentation Creation");
  
  if (typeof(Mkt) !== "undefined"
     && Mkt
     && Mkt.widgets
     && Mkt.widgets.ModalForm
     && Mkt.widgets.ModalForm.prototype
     && Mkt.widgets.ModalForm.prototype.okButtonHandler
     && userName) {
    Mkt.widgets.ModalForm.prototype.okButtonHandler = function () {
      console.log("Marketo App > Executing: New Program/Segmentation Creation");
      
      if (this.title == "New Program"
         || this.title == "New Segmentation") {
        var ii;
        
        if (this.title == "New Program") {
          if (this.getInputItems()) {
            if (this.getInputItems()[1]
               && this.getInputItems()[1].fieldLabel == "Name") {
              if (this.getInputItems()[1].getValue().toLowerCase().search(userName + "$") == -1) {
                this.getInputItems()[1].setValue(this.getInputItems()[1].getValue() + " - " + userName);
              }
            } else {
              for (ii = 0; ii < this.getInputItems().length; ii++) {
                if (this.getInputItems()[ii]
                   && this.getInputItems()[ii].fieldLabel == "Name") {
                  if (this.getInputItems()[ii].getValue().toLowerCase().search(userName + "$") == -1) {
                    this.getInputItems()[ii].setValue(this.getInputItems()[ii].getValue() + " - " + userName);
                  }
                }
              }
            }
          }
        } else if (this.title == "New Segmentation") {
          if (this.findByType("textfield")) {
            if (this.findByType("textfield")[0]
               && this.findByType("textfield")[0].fieldLabel == "Name") {
              if (this.findByType("textfield")[0].getValue().toLowerCase().search(userName + "$") == -1) {
                this.findByType("textfield")[0].setValue(this.findByType("textfield")[0].getValue() + " - " + userName);
              }
            } else {
              for (ii = 0; ii < this.findByType("textfield").length; ii++) {
                if (this.findByType("textfield")[ii]
                   && this.findByType("textfield")[ii].fieldLabel == "Name") {
                  if (this.findByType("textfield")[ii].getValue().toLowerCase().search(userName + "$") == -1) {
                    this.findByType("textfield")[ii].setValue(this.findByType("textfield")[ii].getValue() + " - " + userName);
                  }
                }
              }
            }
          }
        }
      }
      
      if (this.submitInProgress) {
        return;
      }
      
      if (this.beforeSubmitCallback() === false) {
        return;
      };
      
      if (this.okCallback
         && isFunction(this.okCallback)) {
        this.okCallback();
      }
      
      if (!this.submitUrl) {
        return;
      }
      
      if (this.showProgressModal) {
        this.hide();
        
        this.progressModal = Ext.MessageBox.show({
            title: MktLang.getStr('ModalForm.Please_wait'),
            msg: this.progressMsg,
            progress: true,
            wait: true,
            width: 200,
            closable: false
          });
      } else {
        MktSession.clockCursor();
      }
      
      this.submitInProgress = true;
      this.enableOkCancelButton(!this.submitInProgress);
      
      if (this.serializeJSON) {
        this.serializeParms = this.serializeParms || {};
        this.serializeParms._json = Ext.encode(this.serializeJSON);
      }
      
      var parms = Ext.apply({}, this.serializeParms, this.baseParams);
      MktSession.ajaxRequest(this.submitUrl, {
        serializeParms: parms,
        onMySuccess: this.submitSuccessHandler.createDelegate(this),
        onMyFailure: this.submitFailedHandler.createDelegate(this)
      });
    };
  }
};

/**************************************************************************************
 *
 *  This function overrides the save edit function for renaming exisiting Programs,
 *  Smart Campaigns, Assets, and Folders in order to enforce a naming convention by
 *  appending the user's username to the name of the program, smart campaign, asset, or
 *  folder; additionally, it prevents the renaming of the user's root folder via the
 *  Marketo canvas tab
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.overrideAssetSaveEdit = function () {
  console.log("Marketo App > Overriding: Asset Save Edit");
  
  if (typeof(Mkt) !== "undefined"
     && Mkt
     && Mkt.widgets
     && Mkt.widgets.CanvasHeader
     && Mkt.widgets.CanvasHeader.prototype
     && Mkt.widgets.CanvasHeader.prototype.saveEdit) {
    if (typeof(origAssetSaveEdit) !== "function") {
      origAssetSaveEdit = Mkt.widgets.CanvasHeader.prototype.saveEdit;
    }
    
    Mkt.widgets.CanvasHeader.prototype.saveEdit = function () {
      if (typeof(MktCanvas) !== "undefined"
         && MktCanvas
         && MktCanvas.getActiveTab()
         && MktCanvas.getActiveTab().config
         && MktCanvas.getActiveTab().config.accessZoneId
         && userName) {
        console.log("Marketo App > Executing: Asset Save Edit");
        var currWorkspaceId = MktCanvas.getActiveTab().config.accessZoneId;
        
        if (currWorkspaceId.toString().search(mktoMyWorkspaceIdMatch) != -1) {
          var isFolderEdit = false;
          
          if ((MktExplorer.getEl().dom.ownerDocument.title.search("Marketing Activities") != -1
               && (this.titleId == "mpTEName"
                 || this.titleId == "cdhTEName"
                 || this.titleId == "pname"))
             || MktExplorer.getEl().dom.ownerDocument.title.search("Marketing Activities") == -1) {
            
            if (this.titleId == "pname") {
              if (this.titleValue == userName) {
                isFolderEdit = true;
              }
            }
            
            if (this.getTitleField().getValue().toLowerCase().search(userName + "$") == -1) {
              this.getTitleField().setValue(this.getTitleField().getValue() + " - " + userName);
            }
          }
          
          if (isFolderEdit) {
            var toUpdateNodeText = false;
            
            MktSession.clockCursor(true);
            this.getTitleField().setValue(this.titleValue);
            //this.serializeParms[this.titleId] = this.getTitleField().getValue();
            //this.serializeParms[this.descId] = this.getDescField().getValue();
            
            //this.newTitleValue = MktPage.isFeatureEnabled('treeEncoding') ? this.serializeParms[this.titleId] : Ext.util.Format.htmlEncode(this.serializeParms[this.titleId]);
            //this.newDescValue = Ext.util.Format.htmlEncode(this.serializeParms[this.descId]);
            //this.updateCanvasConfig();
            
            //this.prevTitleValue = this.titleValue;
            //this.titleValue = this.newTitleValue;
            //this.descValue = this.newDescValue;
            //MktPage.updateFullTitle();
            var canvasTab = MktCanvas.getActiveTab();
            //canvasTab.updateTabTitle(this.titleValue);
            var nodeId = null;
            if (canvasTab.config.expNodeId) {
              var node = MktExplorer.getNodeById(canvasTab.config.expNodeId);
              if (node && node.attributes.compType) {
                var compType = node.attributes.compType;
                if (compType == 'Marketing Program') {
                  nodeId = canvasTab.config.expNodeId;
                  //MktExplorer.lockSubTree(nodeId);
                }
                if (compType == 'Image') {
                  toUpdateNodeText = false;
                }
              }
              if (toUpdateNodeText) {
                //MktExplorer.updateNodeText(canvasTab.config.expNodeId, this.titleValue);
              }
            }
            
            var el = this.getEl();
            var panelObj = this;
            var formPanel = this.formPanel;
            var viewPanel = this.viewPanel;
            formPanel.hide(true, 0.2);
            viewPanel.show(true, 0.2);
            viewPanel.body.update(panelObj.viewTemplate.apply(panelObj));
            
            el.animate({
              height: {
                from: this.getHeight(),
                to: this.origHeight
              }
            }, 0.25, function () {
              panelObj.setHeight(panelObj.origHeight);
              panelObj.body.setHeight(panelObj.origHeight);
              if (isFunction(panelObj.savedCallback)) {
                panelObj.savedCallback();
              }
            });
            
            MktSession.unclockCursor();
            this._saveInProgress = false;
            /*MktSession.ajaxRequest(this.actionUrl, {
            serializeParms : this.serializeParms,
            containerId : this.id,
            onMySuccess : this.saveResponse.createDelegate(this, [nodeId], true),
            onMyError : this.saveError.createDelegate(this, [nodeId])
            });*/
          } else {
            var toUpdateNodeText = true;
            
            MktSession.clockCursor(true);
            this.serializeParms[this.titleId] = this.getTitleField().getValue();
            this.serializeParms[this.descId] = this.getDescField().getValue();
            
            this.newTitleValue = MktPage.isFeatureEnabled('treeEncoding') ? this.serializeParms[this.titleId] : Ext.util.Format.htmlEncode(this.serializeParms[this.titleId]);
            this.newDescValue = Ext.util.Format.htmlEncode(this.serializeParms[this.descId]);
            this.updateCanvasConfig();
            
            this.prevTitleValue = this.titleValue;
            this.titleValue = this.newTitleValue;
            this.descValue = this.newDescValue;
            MktPage.updateFullTitle();
            var canvasTab = MktCanvas.getActiveTab();
            canvasTab.updateTabTitle(this.titleValue);
            var nodeId = null;
            if (canvasTab.config.expNodeId) {
              var node = MktExplorer.getNodeById(canvasTab.config.expNodeId);
              if (node && node.attributes.compType) {
                var compType = node.attributes.compType;
                if (compType == 'Marketing Program') {
                  nodeId = canvasTab.config.expNodeId;
                  MktExplorer.lockSubTree(nodeId);
                }
                if (compType == 'Image') {
                  toUpdateNodeText = false;
                }
              }
              if (toUpdateNodeText) {
                MktExplorer.updateNodeText(canvasTab.config.expNodeId, this.titleValue);
              }
            }
            
            var el = this.getEl();
            var panelObj = this;
            var formPanel = this.formPanel;
            var viewPanel = this.viewPanel;
            formPanel.hide(true, 0.2);
            viewPanel.show(true, 0.2);
            viewPanel.body.update(panelObj.viewTemplate.apply(panelObj));
            
            el.animate({
              height: {
                from: this.getHeight(),
                to: this.origHeight
              }
            }, 0.25, function () {
              panelObj.setHeight(panelObj.origHeight);
              panelObj.body.setHeight(panelObj.origHeight);
              if (isFunction(panelObj.savedCallback)) {
                panelObj.savedCallback();
              }
            });
            
            MktSession.unclockCursor();
            this._saveInProgress = true;
            MktSession.ajaxRequest(this.actionUrl, {
              serializeParms: this.serializeParms,
              containerId: this.id,
              onMySuccess: this.saveResponse.createDelegate(this, [nodeId], true),
              onMyError: this.saveError.createDelegate(this, [nodeId])
            });
          }
        } else if (currWorkspaceId.toString().search(mktoGoldenWorkspacesMatch) != -1) {
          var toUpdateNodeText = false;
          
          MktSession.clockCursor(true);
          this.getTitleField().setValue(this.titleValue);
          //this.serializeParms[this.titleId] = this.getTitleField().getValue();
          //this.serializeParms[this.descId] = this.getDescField().getValue();
          
          //this.newTitleValue = MktPage.isFeatureEnabled('treeEncoding') ? this.serializeParms[this.titleId] : Ext.util.Format.htmlEncode(this.serializeParms[this.titleId]);
          //this.newDescValue = Ext.util.Format.htmlEncode(this.serializeParms[this.descId]);
          //this.updateCanvasConfig();
          
          //this.prevTitleValue = this.titleValue;
          //this.titleValue = this.newTitleValue;
          //this.descValue = this.newDescValue;
          //MktPage.updateFullTitle();
          var canvasTab = MktCanvas.getActiveTab();
          //canvasTab.updateTabTitle(this.titleValue);
          var nodeId = null;
          if (canvasTab.config.expNodeId) {
            var node = MktExplorer.getNodeById(canvasTab.config.expNodeId);
            if (node && node.attributes.compType) {
              var compType = node.attributes.compType;
              if (compType == 'Marketing Program') {
                nodeId = canvasTab.config.expNodeId;
                //MktExplorer.lockSubTree(nodeId);
              }
              if (compType == 'Image') {
                toUpdateNodeText = false;
              }
            }
            if (toUpdateNodeText) {
              //MktExplorer.updateNodeText(canvasTab.config.expNodeId, this.titleValue);
            }
          }
          
          var el = this.getEl();
          var panelObj = this;
          var formPanel = this.formPanel;
          var viewPanel = this.viewPanel;
          formPanel.hide(true, 0.2);
          viewPanel.show(true, 0.2);
          viewPanel.body.update(panelObj.viewTemplate.apply(panelObj));
          
          el.animate({
            height: {
              from: this.getHeight(),
              to: this.origHeight
            }
          }, 0.25, function () {
            panelObj.setHeight(panelObj.origHeight);
            panelObj.body.setHeight(panelObj.origHeight);
            if (isFunction(panelObj.savedCallback)) {
              panelObj.savedCallback();
            }
          });
          
          MktSession.unclockCursor();
          this._saveInProgress = false;
          /*MktSession.ajaxRequest(this.actionUrl, {
          serializeParms : this.serializeParms,
          containerId : this.id,
          onMySuccess : this.saveResponse.createDelegate(this, [nodeId], true),
          onMyError : this.saveError.createDelegate(this, [nodeId])
          });*/
        } else {
          origAssetSaveEdit.apply(this, arguments);
        }
      }
    };
  }
};

/**************************************************************************************
 *
 *  This function overrides the create function for any new asset that is not a child
 *  of a program in order to enforce a naming convention by appending the user's
 *  username to the name of the new asset
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.overrideNewAssetCreate = function () {
  console.log("Marketo App > Overriding: New Asset Creation");
  
  if (typeof(Mkt) !== "undefined"
     && Mkt3
     && Mkt3.controller
     && Mkt3.controller.lib
     && Mkt3.controller.lib.AbstractModalForm
     && Mkt3.controller.lib.AbstractModalForm.prototype
     && Mkt3.controller.lib.AbstractModalForm.prototype.onSubmit
     && userName) {
    Mkt3.controller.lib.AbstractModalForm.prototype.onSubmit = function (form) {
      console.log("Marketo App > Executing: New Asset Creation");
      
      if (form == null
         || form.ownerAsset == null
         || form.ownerAsset.isOneOfProgramTypes == null
         || form.ownerAsset.isOneOfProgramTypes() == false) {
        if (form.getXType() != "nurtureTrackForm"
           && this != null
           && this.getField("name") != null
           && this.getField("name").getValue() != null) {
          var assetName = this.getField("name").getValue();
          
          if (assetName.toLowerCase().search(userName + "$") == -1) {
            this.getField("name").setValue(assetName + " - " + userName);
          }
        }
      }
      
      form = !form.isXType('modalForm') ? form.up('modalForm') : form;
      
      form.setSubmitting(true);
      
      if (this.validate(form)) {
        if (this.application.fireEvent(this.widgetId + 'BeforeSubmit', form ? form.getRecord() : null) !== false) {
          if (this.submit(form) !== false) {
            this.submitComplete(form);
          }
        } else {
          form.setSubmitting(false);
        }
      } else {
        form.showDefaultMessage();
        form.setSubmitting(false);
      }
    };
  }
};

/**************************************************************************************
 *
 *  This function overrides the new folder create function via Right-click > New
 *  Campaign Folder, New Folder in order to enforce a naming convention by appending
 *  the user's username to the new name of any folder that is not a child of a program
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.overrideNewFolders = function () {
  console.log("Marketo App > Overriding: New Folders");
  
  if (typeof(MktMa) !== "undefined"
     && MktMa
     && MktMa.newProgramFolderSubmit
     && userName) {
    MktMa.newProgramFolderSubmit = function (text, parentId, tempNodeId) {
      console.log("Marketo App > Executing: New Folders in Marketing Activities");
      
      MktSession.clockCursor(true);
      var parms = {};
      
      if ((this.currNode.parentNode.attributes.compType.search("Folder$") != -1
           && text.toLowerCase().search(userName + "$") == -1)
         || text == userName) {
        text = text + " - " + userName;
      }
      parms.text = text;
      parms.parentId = parentId;
      parms.tempNodeId = tempNodeId;
      MktSession.ajaxRequest('explorer/createProgramFolder', {
        serializeParms: parms,
        onMySuccess: MktMa.newProgramFolderDone,
        onMyFailure: function (tempNodeId) {
          var tempNode = MktExplorer.getNodeById(tempNodeId);
          if (tempNode) {
            tempNode.remove();
          }
        }
        .createDelegate(this, [tempNodeId])
      });
      if (MktMa.currNode) {
        MktMa.currNode.unselect();
      }
    };
  }
  
  if (typeof(MktFolder) !== "undefined"
     && MktFolder
     && MktFolder.newFolderSubmit
     && userName) {
    MktFolder.newFolderSubmit = function (text, parentNodeId, tempNodeId) {
      console.log("Marketo App > Executing: New Folders");
      
      MktSession.clockCursor(true);
      var parms = {};
      
      if (text.toLowerCase().search(userName + "$") == -1
         || text == userName) {
        text = text + " - " + userName;
      }
      parms.text = text;
      parms.parentNodeId = parentNodeId;
      parms.tempNodeId = tempNodeId;
      MktSession.ajaxRequest('folder/createFolderSubmit', {
        serializeParms: parms,
        onMySuccess: MktFolder.newFolderSubmitDone.createDelegate(this, [tempNodeId]),
        onMyFailure: function (tempNodeId) {
          var tempNode = MktExplorer.getNodeById(tempNodeId);
          if (tempNode) {
            tempNode.remove();
          }
        }
        .createDelegate(this, [tempNodeId])
      });
    };
  }
};

/**************************************************************************************
 *
 *  This function overrides the folder renaming functions in order to prevent renaming
 *  of the user's root folder via Right-click > Rename Folder and to enforce a naming
 *  convention by appending the user's username to the new name of any folder that is
 *  not a child of a program
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.overrideRenamingFolders = function () {
  console.log("Marketo App > Overriding: Renaming Folders");
  
  if (typeof(MktMa) !== "undefined"
     && MktMa
     && MktMa.renameProgramFolderSubmit
     && userName) {
    MktMa.renameProgramFolderSubmit = function (value, startValue, folderId) {
      console.log("Marketo App > Executing: Renaming Folders in Marketing Activities");
      
      MktSession.clockCursor(true);
      var folder = MktExplorer.getNodeById(folderId),
      parms = {};
      
      if (startValue == userName
         && this.currNode.parentNode.attributes.system == true
         && this.currNode.attributes.accessZoneId.toString().search(mktoMyWorkspaceIdMatch) != -1) {
        if (folder) {
          folder.setText(startValue);
        }
        MktSession.unclockCursor();
      } else {
        if ((this.currNode.parentNode.attributes.compType.search("Folder$") != -1
             && value.toLowerCase().search(userName + "$")) == -1
           || value == userName) {
          value = value + " - " + userName;
          if (folder) {
            folder.setText(value);
          }
        }
        parms.origProgramName = startValue;
        parms.newProgramName = value;
        parms.folderId = folderId;
        MktSession.ajaxRequest('explorer/renameProgramFolder', {
          serializeParms: parms,
          onMySuccess: MktMa.renameProgramFolderSubmitDone,
          onMyFailure: function (folderId, origName) {
            var folder = MktExplorer.getNodeById(folderId);
            if (folder) {
              folder.setText(origName);
            }
          }
          .createDelegate(this, [folderId, startValue])
        });
      }
    };
  }
  
  if (typeof(MktFolder) !== "undefined"
     && MktFolder
     && MktFolder.renameFolderSubmit
     && userName) {
    MktFolder.renameFolderSubmit = function (text, startValue, nodeId) {
      console.log("Marketo App > Executing: Renaming Folders");
      
      MktSession.clockCursor(true);
      var parms = {};
      
      if (startValue == userName
         && this.currNode.parentNode.attributes.system == true
         && this.currNode.attributes.accessZoneId.toString().search(mktoMyWorkspaceIdMatch) != -1) {
        MktFolder.currNode.setText(startValue);
        MktSession.unclockCursor();
      } else {
        if (text.toLowerCase().search(userName + "$") == -1
           || text == userName) {
          text = text + " - " + userName;
          MktFolder.currNode.setText(text);
        }
        parms.text = text;
        parms.nodeId = nodeId;
        MktSession.ajaxRequest('folder/renameFolderSubmit', {
          serializeParms: parms,
          onMySuccess: MktFolder.renameFolderSubmitDone.createDelegate({
            parms: parms,
            startValue: startValue
          }),
          onMyFailure: function () {
            MktFolder.currNode.setText(startValue);
          }
          .createDelegate(this)
        });
      }
    };
  }
};

/**************************************************************************************
 *
 *  This function hides all folders in the drop down list when importing a program
 *  except the user's own folder
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.hideFoldersOnImport = function () {
  console.log("Marketo App > Hiding: Folders On Program Import via Override");
  
  if (typeof(Ext) !== "undefined"
     && Ext
     && Ext.form
     && Ext.form.ComboBox
     && Ext.form.ComboBox.prototype
     && Ext.form.ComboBox.prototype.onTriggerClick
     && userName) {
    Ext.form.ComboBox.prototype.onTriggerClick = function () {
      console.log("Marketo App > Executing: Hide Folders On Program Import via Override");
      
      if (this.readOnly
         || this.disabled) {
        return;
      }
      if (this.isExpanded()) {
        this.collapse();
        this.el.focus();
      } else {
        this.onFocus({});
        if (this.triggerAction == 'all') {
          
          this.doQuery(this.allQuery, true);
          
          if (typeof(this) !== "undefined"
             && this
             && this.label
             && this.label.dom
             && this.label.dom.textContent == "Campaign Folder:"
             && typeof(MktCanvas) !== "undefined"
             && MktCanvas
             && MktCanvas.getActiveTab()
             && MktCanvas.getActiveTab().config
             && MktCanvas.getActiveTab().config.accessZoneId.toString().search(mktoMyWorkspaceIdMatch) != -1) {
            console.log("Marketo App > Executing: Hide Campaign Folders On Program Import via Override");
            
            var ii;
            
            for (ii = 0; ii < this.view.all.elements.length; ii++) {
              if (this.view.all.elements[ii].textContent.toLowerCase() != userName) {
                this.view.all.elements[ii].hidden = true;
              }
            }
          }
        } else {
          this.doQuery(this.getRawValue());
        }
        this.el.focus();
      }
    };
  }
};

/**************************************************************************************
 *
 *  This function hides the canvas page grid in the Marketing Workspace for:
 *  Design Studio > Landing Pages, Forms, Emails, Snippets, Images and Files;
 *  Lead Database > Any List > Lead List;
 *  Marketing Activities > Any Smart Campaign > Results View
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/
/*
APP.hidePageGrid = function () {
  console.log("Marketo App > Hiding: Page Grid via Override");
  
  if (typeof(MktGrids) !== "undefined"
     && MktGrids
     && MktGrids.CanvasGridPanel
     && MktGrids.CanvasGridPanel.prototype
     && MktGrids.CanvasGridPanel.prototype.loadPagedGrid) {
    MktGrids.CanvasGridPanel.prototype.loadPagedGrid = function () {
      if (typeof(MktCanvas) !== "undefined"
         && MktCanvas
         && MktCanvas.getActiveTab()
         && MktCanvas.getActiveTab().config
         && MktCanvas.getActiveTab().config.accessZoneId.toString().search(mktoMyWorkspaceIdMatch) != -1) {
        switch (this.canvas) {
          // Design Studio > Landing Pages
        case "landingCanvasLP":
          this.hide();
          break;
          // Design Studio > Forms
        case "landingCanvasFO":
          this.hide();
          break;
          // Design Studio > Emails
        case "landingCanvasEM":
          this.hide();
          break;
          // Design Studio > Snippets
        case "landingCanvasSnippet":
          this.hide();
          break;
          // Design Studio > Images and Files
        case "landingCanvasIM":
          this.hide();
          break;
          // Lead Database > Any List > Lead List
        case "ldbCanvasLeadList":
          this.hide();
          break;
          // Marketing Activities > Any Smart Campaign > Results View
        case "campaignCanvasDetailActivityLog":
          this.hide();
          break;
          // Analytics > Any Report > Report View
        case "atxCanvasDetailView":
          break;
        default:
          break;
        }
      }
      this.store.load({
        params: {
          start: 0,
          query: this.query
        }
      });
    };
  }
};
*/
/**************************************************************************************
 *
 *  This function disables the Default and Marketing Workspaces home buttons:
 *  New Program, New Smart Campaign, and New Smart List
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.disableButtons = function () {
  console.log("Marketo App > Disabling: Buttons");
  
  $jQ = jQuery.noConflict();
  if ($jQ
     && $jQ(".mktButtonPositive")) {
    $jQ(".mktButtonPositive").remove();
  }
};

/**************************************************************************************
 *
 *  This function evaluates the current node context being moved to determine if the
 *  item should be moved
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.evaluateMoveItem = function (nodeToMove, destNode) {
  console.log("Marketo App > Evaluating: Move Item");
  var mktoCenterOfExcellenceMovableEventCompIdsMatch = "^(1005|1003)$",
  mktoCenterOfExcellenceEventFolderCompIdsMatch = "^(3274|3275)$",
  mktoAssetManagementMovableEventCompIdsMatch = "^(1767|1785)$",
  mktoAssetManagementEventFolderCompIdsMatch = "^(3144|3145)$",
  mktoHealthcareMovableEventCompIdsMatch = "^(1671|1691)$",
  mktoHealthcareEventFolderCompIdsMatch = "^(2821|2822)$",
  mktoHigherEducationMovableEventCompIdsMatch = "^(1635|1655)$",
  mktoHigherEducationEventFolderCompIdsMatch = "^(2719|2720)$",
  mktoManufacturingMovableEventCompIdsMatch = "^(1793|1794)$",
  mktoManufacturingEventFolderCompIdsMatch = "^(3179|3180)$",
  mktoSportsMovableEventCompIdsMatch = "^(1704|1723)$",
  mktoSportsEventFolderCompIdsMatch = "^(2928|2929)$",
  mktoTechnologyMovableEventCompIdsMatch = "^(1072|1061)$",
  mktoTechnologyEventFolderCompIdsMatch = "^(2593|2594)$",
  mktoTravelMovableEventCompIdsMatch = "^(1736|1754)$",
  mktoTravelEventFolderCompIdsMatch = "^(3045|3046)$";
  
  if (userName) {
    var ii,
    currNode,
    depth;
    
    if ((nodeToMove.attributes
         && nodeToMove.attributes.accessZoneId
         && (nodeToMove.attributes.accessZoneId.toString().search(mktoGoldenWorkspacesMatch) != -1))
       || (destNode.attributes
         && destNode.attributes.accessZoneId
         && (destNode.attributes.accessZoneId.toString().search(mktoGoldenWorkspacesMatch) != -1))) {
      
      if (nodeToMove.attributes.compType == "Marketing Event"
       && destNode.attributes.compType == "Marketing Folder") {
        if ((nodeToMove.attributes.compId.toString().search(mktoCenterOfExcellenceMovableEventCompIdsMatch) != -1
             && destNode.attributes.compId.toString().search(mktoCenterOfExcellenceEventFolderCompIdsMatch) != -1)
           || (nodeToMove.attributes.compId.toString().search(mktoAssetManagementMovableEventCompIdsMatch) != -1
             && destNode.attributes.compId.toString().search(mktoAssetManagementEventFolderCompIdsMatch) != -1)
           || (nodeToMove.attributes.compId.toString().search(mktoHealthcareMovableEventCompIdsMatch) != -1
             && destNode.attributes.compId.toString().search(mktoHealthcareEventFolderCompIdsMatch) != -1)
           || (nodeToMove.attributes.compId.toString().search(mktoHigherEducationMovableEventCompIdsMatch) != -1
             && destNode.attributes.compId.toString().search(mktoHigherEducationEventFolderCompIdsMatch) != -1)
           || (nodeToMove.attributes.compId.toString().search(mktoManufacturingMovableEventCompIdsMatch) != -1
             && destNode.attributes.compId.toString().search(mktoManufacturingEventFolderCompIdsMatch) != -1)
           || (nodeToMove.attributes.compId.toString().search(mktoSportsMovableEventCompIdsMatch) != -1
             && destNode.attributes.compId.toString().search(mktoSportsEventFolderCompIdsMatch) != -1)
           || (nodeToMove.attributes.compId.toString().search(mktoTechnologyMovableEventCompIdsMatch) != -1
             && destNode.attributes.compId.toString().search(mktoTechnologyEventFolderCompIdsMatch) != -1)
           || (nodeToMove.attributes.compId.toString().search(mktoTravelMovableEventCompIdsMatch) != -1
             && destNode.attributes.compId.toString().search(mktoTravelEventFolderCompIdsMatch) != -1)) {
          return true;
        }
      } else {
        return false;
      }
    } else if (nodeToMove.attributes.accessZoneId.toString().search(mktoMyWorkspaceIdMatch) != -1
       && destNode.attributes.accessZoneId.toString().search(mktoMyWorkspaceIdMatch) != -1) {
      
      currNode = nodeToMove;
      depth = currNode.getDepth();
      for (ii = 0; ii < depth; ii++) {
        if (currNode.text == userName) {
          currNode = destNode;
          depth = currNode.getDepth();
          for (ii = 0; ii < depth; ii++) {
            if (currNode.text == userName) {
              return true;
            }
            currNode = currNode.parentNode;
          }
          return false;
        }
        currNode = currNode.parentNode;
      }
      return false;
    } else if (nodeToMove.attributes.accessZoneId.toString().search(mktoMyWorkspaceIdMatch) != -1) {
      
      currNode = nodeToMove;
      depth = currNode.getDepth();
      for (ii = 0; ii < depth; ii++) {
        if (currNode.text == userName) {
          return true;
        }
        currNode = currNode.parentNode;
      }
      return false;
    } else if (destNode.attributes.accessZoneId.toString().search(mktoMyWorkspaceIdMatch) != -1) {
      
      currNode = destNode;
      depth = currNode.getDepth();
      for (ii = 0; ii < depth; ii++) {
        if (currNode.text == userName) {
          return true;
        }
        currNode = currNode.parentNode;
      }
      return false;
    } else {
      return true;
    }
  }
};

/**************************************************************************************
 *
 *  This function disables dragging and dropping tree node items other than those that
 *  originate and are destined for a location within the user's root folder
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.disableDragAndDrop = function () {
  console.log("Marketo App > Disabling: Tree Node Drop");
  
  if (typeof(Ext) !== "undefined"
     && Ext
     && Ext.tree
     && Ext.tree.TreeDropZone
     && Ext.tree.TreeDropZone.prototype
     && Ext.tree.TreeDropZone.prototype.processDrop) {
    Ext.tree.TreeDropZone.prototype.processDrop = function (target, data, point, dd, e, dropNode) {
      console.log("Marketo App > Executing: Tree Node Drop");
      
      if (APP.evaluateMoveItem(dropNode, target)) {
        var dropEvent = {
          tree: this.tree,
          target: target,
          data: data,
          point: point,
          source: dd,
          rawEvent: e,
          dropNode: dropNode,
          cancel: !dropNode,
          dropStatus: false
        };
        var retval = this.tree.fireEvent("beforenodedrop", dropEvent);
        if (retval === false
           || dropEvent.cancel === true
           || !dropEvent.dropNode) {
          target.ui.endDrop();
          return dropEvent.dropStatus;
        }
        
        target = dropEvent.target;
        if (point == 'append'
           && !target.isExpanded()) {
          target.expand(false, null, function () {
            this.completeDrop(dropEvent);
          }
            .createDelegate(this));
        } else {
          this.completeDrop(dropEvent);
        }
        return true;
      } else {
        return false;
      }
    };
  }
};

/**************************************************************************************
 *
 *  This function evaluates the current menu context to determine if items should be
 *  disabled
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.evaluateMenu = function (triggeredFrom, menu, canvas, toolbar) {
  console.log("Marketo App > Evaluating: Menu");
  
  if (userName) {
    var toBeDisabled = false;
    
    switch (triggeredFrom) {
      
    case "tree":
      if (menu
         && menu.currNode
         && menu.currNode.attributes
         && menu.currNode.attributes.accessZoneId
         && (menu.currNode.attributes.accessZoneId.toString().search(mktoGoldenWorkspacesMatch) != -1
           || menu.currNode.attributes.accessZoneId.toString().search(mktoMyWorkspaceIdMatch) != -1)) {
        
        toBeDisabled = true;
        
        if (menu.currNode.attributes.accessZoneId.toString().search(mktoMyWorkspaceIdMatch) != -1) {
          var ii,
          currNode = menu.currNode,
          depth = currNode.getDepth();
          
          for (ii = 0; ii < depth; ii++) {
            if (currNode.attributes.text == userName) {
              toBeDisabled = false;
              break;
            }
            currNode = currNode.parentNode;
          }
        }
      } else if ((!menu
           || !menu.currNode
           || !menu.currNode.attributes
           || !menu.currNode.attributes.accessZoneId)
         && (canvas
           && canvas.config
           && canvas.config.accessZoneId
           && (canvas.config.accessZoneId.toString().search(mktoGoldenWorkspacesMatch) != -1
             || (canvas.config.accessZoneId.toString().search(mktoMyWorkspaceIdMatch) != -1
               && ((canvas.config.expNodeId
                   && MktExplorer.getNodeById(canvas.config.expNodeId))
                 || (canvas.config.dlZoneFolderId
                   && MktExplorer.getNodeById(canvas.config.dlZoneFolderId))))))) {
        
        toBeDisabled = true;
        
        if (canvas.config.accessZoneId.toString().search(mktoMyWorkspaceIdMatch) != -1) {
          var ii,
          currNode,
          depth;
          
          if (canvas.config.expNodeId) {
            currNode = MktExplorer.getNodeById(canvas.config.expNodeId);
          } else {
            currNode = MktExplorer.getNodeById(canvas.config.dlZoneFolderId);
          }
          depth = currNode.getDepth();
          
          for (ii = 0; ii < depth; ii++) {
            if (currNode.attributes.text == userName) {
              toBeDisabled = false;
              break;
            }
            currNode = currNode.parentNode;
          }
        }
      } else if ((!menu
           || !menu.currNode
           || !menu.currNode.attributes
           || !menu.currNode.attributes.accessZoneId)
         && (canvas
           && canvas.config
           && !canvas.config.accessZoneId)) {
        
        toBeDisabled = true;
      }
      return toBeDisabled;
      break;
      
    case "button":
      if (canvas
         && canvas.config
         && canvas.config.accessZoneId
         && (canvas.config.accessZoneId.toString().search(mktoGoldenWorkspacesMatch) != -1
           || (canvas.config.accessZoneId.toString().search(mktoMyWorkspaceIdMatch) != -1
             && ((canvas.config.expNodeId
                 && MktExplorer.getNodeById(canvas.config.expNodeId))
               || (canvas.config.dlZoneFolderId
                 && MktExplorer.getNodeById(canvas.config.dlZoneFolderId)))))) {
        
        toBeDisabled = true;
        
        if (canvas.config.accessZoneId.toString().search(mktoMyWorkspaceIdMatch) != -1) {
          var currNode,
          depth;
          
          if (canvas.config.expNodeId) {
            currNode = MktExplorer.getNodeById(canvas.config.expNodeId);
          } else {
            currNode = MktExplorer.getNodeById(canvas.config.dlZoneFolderId);
          }
          depth = currNode.getDepth();
          
          for (var ii = 0; ii < depth; ii++) {
            if (currNode.attributes.text == userName) {
              toBeDisabled = false;
              break;
            }
            currNode = currNode.parentNode;
          }
        }
      } else if ((!canvas
           || !canvas.config
           || !canvas.config.accessZoneId)
         && MktMainNav
         && MktMainNav.activeNav == "tnCustAdmin") {
        toBeDisabled = true;
      }
      return toBeDisabled;
      break;
      
    case "socialAppToolbar":
      if (toolbar.getSocialApp()
         && toolbar.getSocialApp().get('zoneId')
         && (toolbar.getSocialApp().get('zoneId').toString().search(mktoGoldenWorkspacesMatch) != -1)
         || (toolbar.getSocialApp().get('zoneId').toString().search(mktoMyWorkspaceIdMatch) != -1
           && toolbar.getSocialApp().getNodeJson()
           && toolbar.getSocialApp().getNodeJson().id
           && MktExplorer.getNodeById(toolbar.getSocialApp().getNodeJson().id))) {
        toBeDisabled = true;
        
        if (toolbar.getSocialApp().get('zoneId').toString().search(mktoMyWorkspaceIdMatch) != -1) {
          var ii,
          currNode = MktExplorer.getNodeById(toolbar.getSocialApp().getNodeJson().id),
          depth = currNode.getDepth();
          
          for (ii = 0; ii < depth; ii++) {
            if (currNode.attributes.text == userName) {
              toBeDisabled = false;
              break;
            }
            currNode = currNode.parentNode;
          }
        }
      }
      return toBeDisabled;
      break;
      
    case "mobilePushNotification":
      if (toolbar.getMobilePushNotification()
         && toolbar.getMobilePushNotification().get('zoneId')
         && (toolbar.getMobilePushNotification().get('zoneId').toString().search(mktoGoldenWorkspacesMatch) != -1)
         || (toolbar.getMobilePushNotification().get('zoneId').toString().search(mktoMyWorkspaceIdMatch) != -1
           && toolbar.getMobilePushNotification().getNodeJson()
           && toolbar.getMobilePushNotification().getNodeJson().id
           && MktExplorer.getNodeById(toolbar.getMobilePushNotification().getNodeJson().id))) {
        toBeDisabled = true;
        
        if (toolbar.getMobilePushNotification().get('zoneId').toString().search(mktoMyWorkspaceIdMatch) != -1) {
          var ii,
          currNode = MktExplorer.getNodeById(toolbar.getMobilePushNotification().getNodeJson().id),
          depth = currNode.getDepth();
          
          for (ii = 0; ii < depth; ii++) {
            if (currNode.attributes.text == userName) {
              toBeDisabled = false;
              break;
            }
            currNode = currNode.parentNode;
          }
        }
      }
      return toBeDisabled;
      break;
      
    case "inAppMessage":
      if (toolbar.getInAppMessage()
         && toolbar.getInAppMessage().get('zoneId')
         && (toolbar.getInAppMessage().get('zoneId').toString().search(mktoGoldenWorkspacesMatch) != -1)
         || (toolbar.getInAppMessage().get('zoneId').toString().search(mktoMyWorkspaceIdMatch) != -1
           && toolbar.getInAppMessage().getNodeJson()
           && toolbar.getInAppMessage().getNodeJson().id
           && MktExplorer.getNodeById(toolbar.getInAppMessage().getNodeJson().id))) {
        toBeDisabled = true;
        
        if (toolbar.getInAppMessage().get('zoneId').toString().search(mktoMyWorkspaceIdMatch) != -1) {
          var ii,
          currNode = MktExplorer.getNodeById(toolbar.getInAppMessage().getNodeJson().id),
          depth = currNode.getDepth();
          
          for (ii = 0; ii < depth; ii++) {
            if (currNode.attributes.text == userName) {
              toBeDisabled = false;
              break;
            }
            currNode = currNode.parentNode;
          }
        }
      }
      return toBeDisabled;
      break;
      
    case "smsMessage":
      if (toolbar.getSmsMessage()
         && toolbar.getSmsMessage().get('zoneId')
         && (toolbar.getSmsMessage().get('zoneId').toString().search(mktoGoldenWorkspacesMatch) != -1)
         || (toolbar.getSmsMessage().get('zoneId').toString().search(mktoMyWorkspaceIdMatch) != -1
           && toolbar.getSmsMessage().getNodeJson()
           && toolbar.getSmsMessage().getNodeJson().id
           && MktExplorer.getNodeById(toolbar.getSmsMessage().getNodeJson().id))) {
        toBeDisabled = true;
        
        if (toolbar.getSmsMessage().get('zoneId').toString().search(mktoMyWorkspaceIdMatch) != -1) {
          var ii,
          currNode = MktExplorer.getNodeById(toolbar.getSmsMessage().getNodeJson().id),
          depth = currNode.getDepth();
          
          for (ii = 0; ii < depth; ii++) {
            if (currNode.attributes.text == userName) {
              toBeDisabled = false;
              break;
            }
            currNode = currNode.parentNode;
          }
        }
      }
      return toBeDisabled;
      break;
      
    default:
      return true;
      break;
    }
  }
};

/**************************************************************************************
 *
 *  This function disables menu items for all asset types for all Actions Buttons and
 *  Right-click Tree menus in all areas.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.disableMenus = function () {
  console.log("Marketo App > Disabling: Menus");
  
  if (typeof(Ext) !== "undefined"
     && Ext
     && Ext.menu
     && Ext.menu.Menu
     && Ext.menu.Menu.prototype
     && Ext.menu.Menu.prototype.showAt) {
    // Disable ALL areas > ALL assets > ALL Actions and Right-click menus except Social App, Push Notification, and In-App Message Actions Buttons
    Ext.menu.Menu.prototype.showAt = function (xy, parentMenu) {
      console.log("Marketo App > Executing: Disable Actions and Right-click menus for ALL in ALL");
      
      if (this.fireEvent('beforeshow', this) !== false) {
        var disable,
        menu = this,
        mItems = this.items,
        canvas = MktCanvas.getActiveTab(),
        itemsToDisable = [
          // Global > Form > Actions Button & Right-click Tree
          //"formEditDraft",//Edit Draft
          //"formPreview",//Preview
          //"formEdit",//Edit Form
          "formApprove", //Approve
          "formClone", //Clone Form
          "formDelete", //Delete Form
          //"formEmbed",//Embed Code
          "formMove", //Move
          //"addToFavorites",//Add to Favorites
          //"removeFromFavorites",//Remove from Favorites
          //"formDraftPreview",//Preview Draft
          //"formDraftEdit",//Edit Draft
          "formDraftApprove", //Approve Draft
          //"formDraftDiscard",//Discard Draft
          
          // Global > Landing Page > Actions Button & Right-click Tree
          //"pageEdit",//Edit Draft
          //"pagePreview",//Preview
          //"deviceSwitch",//Device Switch
          "pageApprove", //Approve
          "pageUnapprove", //Unapprove
          //"publishToFacebook",//Publish To Facebook
          "pageConvertToTestGroup", //Convert to Test Group
          "pageClone", //Clone
          "pageDelete", //Delete
          //"urlTools",//URL Tools
          //"editUrlSettings",//Edit URL Settings
          //"urlBuilder",//URL Builder
          //"devicePreview",//Generate Preview URL
          "pageMove", //Move
          //"addToFavorites",//Add to Favorites
          //"removeFromFavorites",//Remove from Favorites
          //"pageDraftEdit",//Edit Draft
          //"pageDraftPreview",//Preview Draft
          "pageDraftApprove", //Approve Draft
          //"pageDraftDiscard",//Discard Draft
          
          // Global > Email > Actions Button & Right-click Tree
          //"emailEdit",//Edit Draft
          //"emailPreview",//Preview
          "emailApprove", //Approve
          "emailUnapprove", //Unapprove
          //"emailDownloadHtml",//Download HTML
          //"emailSendTest",//Send Sample
          "emailClone", //Clone
          "emailDelete", //Delete
          "emailMove", //Move
          "emailNewTest", //New Test
          //"addToFavorites",//Add to Favorites
          //"removeFromFavorites",//Remove from Favorites
          //"emailDraftEdit",//Edit Draft
          //"emailDraftPreview",//Preview Draft
          //"emailDraftSendTest",//Send Sample of Draft
          "emailDraftApprove", //Approve Draft
          //"emailDraftDiscard",//Discard Draft
          "emailApproveTest", //Approve Test
          //"emailSendSampleTest",//Send Sample Test
          //"emailEditTest",//Edit Test
          //"emailViewTestSummary",//View Test Summary
          //"emailTestDeclareChampion",//Declare Champion
          //"emailDiscardTest",//Discard Test
          
          // Global > Smart List, List, Segment > Actions Button & Right-click Tree
          //"navigateToMembership",//View Leads
          //"navigateToSmartList",//View Smart List
          //"navigateToFilterView",//Filter View
          //"showImportStatus",//Show Import Status
          //"showExportStatus",//Show Export Status
          "importList", //Import List
          //"exportList",//Export List
          //"exportAdBridge",//Send via Ad Bridge
          //"newSmartListReportSubscription",//New Smart List Subscription
          "cloneSmartlist", //Clone Smart List
          "cloneList", //Clone List
          "deleteList", //Delete List
          "showSupportHistory", //Support Tools - History
          "showSupportUsagePerf", //Support Tools - Run Stats
          "showSmartListProcessorDiag", //Processor Diagnostics
          "showSmartListProcessorOverride", //Override Processor
          //"addToFavorites",//Add to Favorites
          //"removeFromFavorites",//Remove from Favorites
          
          // Global > Report > Actions Button
          "cloneReport_atxCanvasOverview", //Clone Report
          "deleteReport", //Delete Report
          //"newDrillDown_atxCanvasOverview",//Drill-Down
          
          // Global > Report > Right-click Tree
          //"navigateToOverviewReport",//View Overview
          //"navigateToDetailReport",//View Report
          //"navigateToSmartList",//View Smart List
          //"navigateToSetup",//View Setup
          //"navigateToSubscriptions",//View Subscriptions
          "cloneReport", //Clone Report
          "deleteReport", //Delete Report
          "moveReport", //Move Report
          //"addToFavorites",//Add to Favorites
          //"removeFromFavorites",//Remove from Favorites
          
          // Global > Lead > Actions Button & Right-click Tree
          //"viewLeadDetails",//View Lead Details
          "blackCatDiag", //BlackCat Diagnostics
          "mergeLeads", //Merge Leads
          //"leadDbMenuFlowActions",//Marketing
          "sendEmail", //Send Email...
          "sendPushNotification", //Send Push Notification...
          "subscribeToVibesList", //Subscribe to Vibes List...
          "sendSMS", //Send SMS...
          "unsubscribeFromVibesList", //Unsubscribe from Vibes List...
          "addToList", //Add to List...
          "removeFromList", //Remove from List...
          "interestingMoment", //Interesting Moment...
          "sendAlert", //Send Alert...
          "changeScore", //Change Score...
          "changeDataValue", //Change Data Value...
          "addToNamedAccount", //Add to Named Account...
          "removeFromNamedAccount", //Remove from Named Account...
          //"programsFolder",//Programs
          "changeStatusInProgression", //Change Program Status...
          "addToNurture", //Add to Engagement Program...
          "changeNurtureCadence", //Change Engagement Program Cadence...
          "changeNurtureTrack", //Change Engagement Program Stream...
          //"specialFolder",//Special
          "changeLeadPartition", //Change Lead Partition...
          "changeRevenueStage", //Change Revenue Stage...
          "deleteLead", //Delete Lead...
          "giveCreditToReferrer", //Give Credit to Referrer
          "requestCampaign", //Request Campaign...
          "removeFromFlow", //Remove from Flow...
          //"salesforceFolder", //Salesforce
          "pushLeadToSFDC", //Sync Lead to SFDC...
          "createTask", //Create Task...
          "convertLead", //Convert Lead...
          "changeOwner", //Change Owner...
          "deleteLeadFromSFDC", //Delete Lead from SFDC...
          "addToSFDCCampaign", //Add to SFDC Campaign...
          "changeStatusInSFDCCampaign", //Change Status in SFDC Campaign...
          "removeFromSFDCCampaign", //Remove from SFDC Campaign...
          //"microsoftFolder", //Microsoft
          "syncLeadToMicrosoft", //Sync Lead to Microsoft
          
          // Global > Programs, Analyzers, and Reports > Setup Right-click Tree
          //"editItem",//Edit
          "deleteItem", //Delete
          
          // Marketing Activities > New Button
          "createProgramFolder", //New Campaign Folder
          "newSmartCampaign", //New Smart Campaign
          "createNewMarketingProgram", //New Program
          "importProgram", //Import Program
          
          // Marketing Activities > Default & Email Send Programs > Actions Button
          "entryRescheduleEntries", //Reschedule Entries
          "sfdcCampaignSync", //Salesforce Campaign Sync
          "cloneMarketingProgram", //Clone
          "deleteMarketingProgram", //Delete
          //"showImportMemberStatus",//Show Import Status
          //"showExportMemberStatus",//Show Export Status
          
          // Marketing Activities > Event Program > Actions Button
          "eventSchedule", //Schedule
          "entryRescheduleEntries", //Reschedule Entries
          "webinarSettings", //Event Settings
          "sfdcCampaignSync", //Salesforce Campaign Sync
          "cloneMarketingEvent", //Clone
          "deleteMarketingEvent", //Delete
          "refreshFromWebinarProvider", //Refresh from Webinar Provider
          //"showImportMemberStatus",//Show Import Status
          //"showExportMemberStatus",//Show Export Status
          
          // Marketing Activities > Nurturing Program > Actions Button
          "sfdcCampaignSync", //Salesforce Campaign Sync
          "cloneNurtureProgram", //Clone
          "deleteNurtureProgram", //Delete
          "testNurtureProgram", //Test Stream
          //"showImportMemberStatus",//Show Import Status
          //"showExportMemberStatus",//Show Export Status
          
          // Marketing Activities > Smart Campaign > Actions Button
          // Default, Email Send, Event, and Nurturing Programs; Smart Campaign, Folder > Right-click Tree
          //"navigateToNurtureTracks",//View Streams
          //"navigateToCFSmartCamp",//View Smart Campaigns
          //"navigateToLocalAssets",//View Assets
          //"navigateToProgramSmartList",//View Smart List
          //"navigateToEventSettings",//View Setup
          //"navigateToCFTokens",//View My Tokens
          //"navigateToEventMembers",//View Members
          //"navigateToCFResults",//View Results
          //"navigateToSmartCampaign",//View Campaign
          //"navigateToSmartList",//View Smart List
          //"navigateToFlow",//View Flow
          //"navigateToSchedule",//View Schedule
          //"navigateToResults",//View Results
          //"navigateToCampaignMembers",//View Campaign Members
          "newSmartCampaign", //New Smart Campaign
          "createNewMarketingProgram", //New Program
          "newLocalAsset", //New Local Asset
          "createProgramFolder", //New Campaign Folder
          "renameProgramFolder", //Rename Folder
          "deleteProgramFolder", //Delete Folder
          "convertToArchiveFolder", //Convert To Archive Folder
          "convertToCampaignFolder", //Convert To Campaign Folder
          "scClone", //Clone
          "scArchive", //Delete
          "scMove", //Move
          "cloneMarketingProgram", //Clone
          "deleteMarketingProgram", //Delete
          "cloneMarketingEvent", //Clone
          "deleteMarketingEvent", //Delete
          "cloneNurtureProgram", //Clone
          "deleteNurtureProgram", //Delete
          "cloneEmailBatchProgram", //Clone
          "deleteEmailBatchProgram", //Delete
          "cloneInAppProgram", //Clone
          "deleteInAppProgram", //Delete
          "shareProgramFolder", //Share Folder
          "scActivate", //Activate
          "scAbort", //Abort Campaign
          //"addToFavorites",//Add to Favorites
          //"removeFromFavorites",//Remove from Favorites
          //"importProgramStatus",//Import Program Status
          "scCampChangeHistory", //Support Tools - Change History
          "scCampRunHistory", //Support Tools - Run History
          "scClearPalette", //Clear Palette Cache
          "scClearSmartList", //Clear Smart List
          "scClearFlow", //Clear Flow
          "progGenerateRef", //Build Campaign References
          "checkForCorruptEmails", //Check For Corrupt Emails
          
          // Marketing Activities > Social App: Poll, Referral Offer, Social Button, Sweepstakes, Video > Right-click Tree
          //"socialAppEdit",//Edit Draft
          //"socialAppPreview",//Preview
          "socialAppApprove", //Approve
          "socialAppClone", //Clone
          "socialAppDelete", //Delete
          //"socialAppWidgetCode",//Embed Code
          //"addToFavorites",//Add to Favorites
          //"removeFromFavorites",//Remove from Favorites
          //"socialAppDraftEdit",//Edit Draft
          //"socialAppDraftPreview",//Preview Draft
          "socialAppDraftApprove", //Approve Draft
          //"socialAppDraftDiscard",//Discard Draft
          
          // Marketing Activities > Push Notification > Right-click Tree
          //"pushNotificationEdit", //Edit Draft
          //"pushNotificationPreview", //Preview
          "pushNotificationUnapprove", //Unapprove
          "pushNotificationApprove", //Approve
          "pushNotificationSendSample", //Send Sample
          "pushNotificationClone", //Clone
          "pushNotificationDelete", //Delete
          //"pushNotificationDraftEdit", //Edit Draft
          //"pushNotificationDraftPreview", //Preview Draft
          "pushNotificationDraftSendSample", //Send Sample of Draft
          "pushNotificationDraftApprove", //Approve Draft
          //"pushNotificationDraftDiscard", //Discard Draft
          
          // Marketing Activities > In-App Message > Right-click Tree
          //"inAppMessageEdit", //Edit Draft
          //"inAppMessagePreview", //Preview
          "inAppMessageUnapprove", //Unapprove
          "inAppMessageApprove", //Approve
          "inAppMessageSendSample", //Send Sample
          "inAppMessageClone", //Clone
          "inAppMessageDelete", //Delete
          //"inAppMessageDraftEdit", //Edit Draft
          //"inAppMessageDraftPreview", //Preview Draft
          "inAppMessageDraftSendSample", //Send Sample of Draft
          "inAppMessageDraftApprove", //Approve Draft
          //"inAppMessageDraftDiscard", //Discard Draft
          
          // Marketing Activities > SMS Message > Right-click Tree
          //"smsMessageEdit", //Edit Draft
          "smsMessageUnapprove", //Unapprove
          "smsMessageApprove", //Approve
          "smsMessageClone", //Clone
          "smsMessageDelete", //Delete
          //"smsMessageDraftEdit", //Edit Draft
          "smsMessageDraftApprove", //Approve Draft
          //"smsMessageDraftDiscard", //Discard Draft
          
          // Marketing Activities > ALL Programs & Folders > My Tokens Right-click Tree
          //"editCustomToken",//Edit Token
          "deleteCustomToken", //Delete Token
          
          // Design Studio > Folder > Right-click Tree
          "newLandingPage", //New Landing Page
          "newTestGroup", //New Test Group
          "newPageTemplate", //New Landing Page Template
          "pageTemplateImport", //Import Template
          "newForm", //New Form
          "newVideoShare", //New YouTube Video
          "newShareButton", //New Social Button
          "newReferralOffer", //New Referral Offer
          "newEmail", //New Email
          "newEmailTemplate", //New Email Template
          "newSnippet", //New Snippet
          "uploadImage", //Upload Image or File
          //"grabFromWebPage",//Grab Images from Web
          "share", //Share Folder
          "createFolder", //New Folder
          "renameFolder", //Rename Folder
          "deleteFolder", //Delete Folder
          "convertToArchiveFolder", //Convert To Archive Folder
          "convertToFolder", //Convert To Folder
          
          // Design Studio > Landing Page Template > Actions Button & Right-click Tree
          //"editPageTemplate",//Edit Draft
          //"previewPageTemplate",//Preview
          "approvePageTemplate", //Approve
          "unapprovePageTemplate", //Unapprove
          "clonePageTemplate", //Clone
          "pageTemplateDelete", //Delete
          //"pageTemplateExport",//Export
          //"addToFavorites",//Add to Favorites
          //"removeFromFavorites",//Remove from Favorites
          //"editPageTemplateDraft",//Edit Draft
          //"previewDraftPageTemplate",//Preview Draft
          "approveDraftPageTemplate", //Approve Draft
          //"discardDraftPageTemplate",//Discard Draft
          
          // Design Studio > Email Template > Actions Button & Right-click Tree
          //"emailTemplateEdit",//Edit Draft
          //"emailTemplatePreview",//Preview
          //"emailTemplateSendTest",//Send Sample
          "emailTemplateApprove", //Approve
          "emailTemplateUnapprove", //Unapprove
          "emailTemplateClone", //Clone
          "emailTemplateDelete", //Delete
          //"addToFavorites",//Add to Favorites
          //"removeFromFavorites",//Remove from Favorites
          //"emailTemplateDraftEdit",//Edit Draft
          //"emailTemplateDraftPreview",//Preview Draft
          //"emailTemplateDraftSendTest",//Send Sample of Draft
          "emailTemplateDraftApprove", //Approve Draft
          //"emailTemplateDraftDiscard",//Discard Draft
          
          // Design Studio > Snippet > Actions Button & Right-click Tree
          //"snippetNoDraftApprovalStatus",//Show Approval Status
          //"snippetEdit",//Edit Draft
          //"snippetPreview",//Preview
          "snippetApprove", //Approve
          "snippetUnapprove", //Unapprove
          "snippetClone", //Clone
          "snippetDelete", //Delete
          //"addToFavorites",//Add to Favorites
          //"removeFromFavorites",//Remove from Favorites
          //"snippetDraftEdit",//Edit Draft
          //"snippetDraftPreview",//Preview Draft
          "snippetDraftApprove", //Approve Draft
          //"snippetDraftDiscard",//Discard Draft
          
          // Design Studio > Image & File > Actions Button
          "uploadImage", //Upload Image or File
          //"grabFromWebPage",//Grab Images from Web
          //"imagePreview",//View
          "imageDelete", //Delete
          "replaceImage", //Replace Image or File
          
          // Lead Database > New Button
          "newSmartList", //New Smart List
          "newList", //New List
          "newSegmentation", //New Segmentation
          "importList", //Import List
          "newLead", //New Lead
          "newDataMgr", //New Field Organizer
          
          // Lead Database > Folder > Right-click Tree
          "newSegmentation", //New Segmentation
          "newSmartList", //New Smart List
          "share", //Share Folder
          "createFolder", //New Folder
          "renameFolder", //Rename Folder
          "deleteFolder", //Delete Folder
          "convertToArchiveFolder", //Convert To Archive Folder
          "convertToFolder", //Convert To Folder
          
          // Lead Database > Segmentation > Actions Button & Right-click Tree
          "createDraftSegmentation", //Create Draft
          //"editSegmentation", //Edit Segments
          "approveSegmentation", //Approve
          "unapproveSegmentation", //Unapprove
          "deleteSegmentation", //Delete
          "refreshSegmentation", //Refresh Status
          //"editDraftSegmentation", //Edit Segments
          "approveDraftSegmentation", //Approve Draft
          //"discardDraftSegmentation", //Discard Draft
          
          // Analytics > New Button
          //"newSubscription_rcmCanvasOverview", //New Report Subscription
          //"newSubscription_atxCanvasOverview", //New Report Subscription
          //"newSubscription_atxCanvasDetailView", //New Report Subscription (Report Tab)
          //"newSubscription_atxCanvasSmartlist", //New Report Subscription (Smart List Tab)
          //"newSubscription_atxCanvasSetup", //New Report Subscription (Setup Tab)
          //"newSubscription_atxCanvasSubscriptions", //New Report Subscription (Subscriptions Tab)
          //"newSubscription_rcmMembersCanvas", //New Report Subscription (Members Tab)
          "newRcm_rcmCanvasOverview", //New Revenue Cycle Model
          "newRcm_atxCanvasOverview", //New Revenue Cycle Model
          "newRcm_atxCanvasDetailView", //New Revenue Cycle Model (Report Tab)
          "newRcm_atxCanvasSmartlist", //New Revenue Cycle Model (Smart List Tab)
          "newRcm_atxCanvasSetup", //New Revenue Cycle Model (Setup Tab)
          "newRcm_atxCanvasSubscriptions", //New Revenue Cycle Model (Subscriptions Tab)
          "newRcm_rcmMembersCanvas", //New Revenue Cycle Model (Members Tab)
          
          // Analytics > Folder > Right-click Tree
          "newRcm", //New Revenue Cycle Model
          "share", //Share Folder
          "createFolder", //New Folder
          "renameFolder", //Rename Folder
          "deleteFolder", //Delete Folder
          "convertToArchiveFolder", //Convert To Archive Folder
          "convertToFolder", //Convert To Folder
          
          // Analytics > Analyzer & Report > Actions Button
          "newReport_atxCanvasOverview", //Export Data
          "newReport_atxCanvasSetup", //Export Data (Setup Tab)
          "cloneReport_atxCanvasOverview", //Clone Analyzer
          "cloneReport_atxCanvasDetailView", //Clone Analyzer (Report Tab)
          "cloneReport_atxCanvasSmartlist", //Clone Analyzer (Smart List Tab)
          "cloneReport_atxCanvasSetup", //Clone Analyzer (Setup Tab)
          "cloneReport_atxCanvasSubscriptions", //Clone Analyzer (Subscriptions Tab)
          "deleteReport", //Delete Analyzer
          
          // Analytics > Analyzer > Right-click Tree
          //"navigateToAnalyzer",//View Analyzer
          //"navigateToAnalyzerSetup",//View Setup
          "cloneReport", //Clone Analyzer
          "deleteReport", //Delete Analyzer
          //"addToFavorites",//Add to Favorites
          //"removeFromFavorites",//Remove from Favorites
          
          // Analytics > Report > Right-click Tree
          //"navigateToOverviewReport",//View Overview
          //"navigateToDetailReport",//View Report
          //"navigateToSmartList",//View Smart List
          //"navigateToSetup",//View Setup
          //"navigateToSubscriptions",//View Subscriptions
          "cloneReport", //Clone Report
          "deleteReport", //Delete Report
          "moveReport", //Move Report
          //"addToFavorites",//Add to Favorites
          //"removeFromFavorites",//Remove from Favorites
          
          // Analytics > Model > Actions Button & Right-click Tree
          "rcmEdit", //Edit Draft
          //"rcmPreview",//Preview Model
          "rcmApproveStages", //Approve Stages
          "rcmUnapproveStages", //Unapprove Stages
          "rcmApprove", //Approve Model
          "rcmUnapprove", //Unapprove Model
          "rcmClone", //Clone Model
          "rcmDelete", //Delete Model
          //"rcmExport",//Export Model
          //"addToFavorites",//Add to Favorites
          //"removeFromFavorites",//Remove from Favorites
          "rcmEditDraft", //Edit Draft
          //"rcmPreviewDraft",//Preview Draft
          "rcmApproveDraft", //Approve Model Draft
          //"rcmDiscardDraft",//Discard Model Draft
          "rcmAassignmentRules", //Assignment Rules
          
          // Analytics > Model > Stage > Actions Button & Right-click
          "Delete", //Delete
          
          // Analytics > Model > Transition > Actions Button & Right-click
          //"Edit Transition", //Edit Transition
          "Delete", //Delete
          
          // Admin > Tags > Tags > New Button
          //"newDescriptor",//New Tag Type
          //"newDescriptorValue",//New Tag Value
          //"newChannel",//New Channel
          
          // Admin > Tags > Tags > Actions Button & Right-click Tree
          //"editDescriptor",//Edit
          "deleteDescriptor", //Delete
          "deleteDescriptorValue", //Delete
          "hideDescriptorValue", //Hide
          "unhideDescriptorValue", //Unhide
          
          // Admin > Tags > Calendar Entry Types > New Button
          //"newEntry",//Entry Type
          
          // Admin > Tags > Calendar Entry Types > Actions Button
          //"editEntry",//Edit
          "unhideEntry", //Unhide
          "hideEntry", //Hide
          
          // Admin > Field Management > Actions Button
          "hideFieldFmFields", //Hide field
          //"blockFieldUpdatesFmFields",//Block Field Updates
          //"changeTypeFmFields",//Change Type
          //"exportFieldsFmFields",//Export Field Names
          
          // Admin > Landing Pages > Landing Pages > New Button
          //"newAlias",//New Domain Alias
          //"newRule",//New Redirect Rule
          
          // Admin > Landing Pages > Rules > Actions Button
          //"editRule",//Edit Rule
          "deleteRule", //Delete Rule
          
          // Admin > LaunchPoint > New Button
          //"newWebinarLogin",//New Service
          
          // Admin > LaunchPoint > Actions Button
          //"editWebinarLogin",//Edit Service
          "cloneWebinarLogin", //Clone Login
          "deleteWebinarLogin", //Delete Service
          
          // Admin > Webhooks > Actions Button
          //"newWebhookLogin",//New Webhook
          //"editWebhook",//Edit Webhook
          "cloneWebhook", //Clone Webhook
          "deleteWebhook", //Delete Webhook
          //"customHeader",//Set Custom Header
        ],
        itemsToDisableAlways = [
          // Default, Email Send, Event, and Nurturing Programs; Smart Campaign, Folder > Right-click Tree
          "shareProgramFolder", //Share Folder
          
          // Lead Database > Segmentation > Actions Button & Right-click Tree
          "approveSegmentation", //Approve
          "unapproveSegmentation", //Unapprove
          "refreshSegmentation", //Refresh Status
          "approveDraftSegmentation", //Approve Draft
          
          // Analytics > Folder > Right-click Tree
          "share", //Share Folder
          
          // Analytics > Model > Actions Button & Right-click Tree
          "rcmApproveStages", //Approve Stages
          "rcmUnapproveStages", //Unapprove Stages
          "rcmApprove", //Approve Model
          "rcmUnapprove", //Unapprove Model
          "rcmApproveDraft", //Approve Model Draft
        ];
        
        if (this.id == "leadDbListMenu"
           || this.id == "segmentationMenu") {
          disable = APP.evaluateMenu("tree", this, canvas, null);
        } else if (this.id == "leadDbLeadMenu"
           || (this.ownerCt
           && this.ownerCt.parentMenu
           && this.ownerCt.parentMenu.id == "leadDbLeadMenu")) {
          disable = true;
        } else if (this.triggeredFrom != "tree"
           && this.triggeredFrom != "button") {
          disable = APP.evaluateMenu("tree", this, canvas, null);
        } else {
          disable = APP.evaluateMenu(this.triggeredFrom, this, canvas, null);
        }
        
        itemsToDisable.forEach(function (itemToDisable) {
          var item;
          
          if (itemToDisable == "Delete") {
            item = menu.find("text", itemToDisable)[0];
          } else {
            item = mItems.get(itemToDisable);
          }
          
          if (item) {
            item.setDisabled(disable);
          }
        });
        
        itemsToDisableAlways.forEach(function (itemToDisable) {
          var item;
          
          if (itemToDisable == "Delete") {
            item = menu.find("text", itemToDisable)[0];
          } else {
            item = mItems.get(itemToDisable);
          }
          
          if (item) {
            item.setDisabled(true);
          }
        });
        
        if (this.ownerCt
             && this.ownerCt.text) {
          
          switch (this.ownerCt.text) {
          case "Change Status":
            for (var ii = 0; ii < this.items.items.length; ii++) {
              this.items.items[ii].setDisabled(true);
            }
            break;
          
          case "Field Actions":
            for (var ii = 0; ii < this.items.items.length; ii++) {
              if (this.items.items[ii].text == "New Custom Field") {
                this.items.items[ii].setDisabled(true);
                break;
              }
            }
          }
          
          if (this.ownerCt.text.search("^View:") != -1) {
            
            for (var ii = 0; ii < this.items.items.length; ii++) {
              switch (this.items.items[ii].text) {
              case "Create View":
                this.items.items[ii].setDisabled(true);
                break;
                
              case "Edit Default":
                this.items.items[ii].setDisabled(true);
                break;
                
              default:
                break;
              }
            }
          }
        }
        
        this.parentMenu = parentMenu;
        if (!this.el) {
          this.render();
        }
        if (this.enableScrolling) {
          this.el.setXY(xy);
          xy[1] = this.constrainScroll(xy[1]);
          xy = [this.el.adjustForConstraints(xy)[0], xy[1]];
        } else {
          xy = this.el.adjustForConstraints(xy);
        }
        this.el.setXY(xy);
        this.el.show();
        Ext.menu.Menu.superclass.onShow.call(this);
        if (Ext.isIE) {
          this.fireEvent('autosize', this);
          if (!Ext.isIE8) {
            this.el.repaint();
          }
        }
        this.hidden = false;
        this.focus();
        this.fireEvent('show', this);
      }
    };
  } else {
    console.log("Marketo App > Skipped: Disable Actions and Right-click menus for ALL in ALL");
  }
  
  if (typeof(Mkt3) !== "undefined"
     && Mkt3
     && Mkt3.controller
     && Mkt3.controller.editor
     && Mkt3.controller.editor.wizard
     && Mkt3.controller.editor.wizard.Editor
     && Mkt3.controller.editor.wizard.Editor.prototype
     && Mkt3.controller.editor.wizard.Editor.prototype.loadStep) {
    Mkt3.controller.editor.wizard.Editor.prototype.loadStep = function (step) {
      console.log("Marketo App > Executing: Disable Create button in Wizard Editors");
      var editor = this.getEditor(),
      tree = this.getTree(),
      previousStep = tree.getCurrentStep(),
      previousStepId = previousStep ? previousStep.getId() : null,
      stepId = step.getId(),
      titleItem = this.getNavBar().getComponent('title'),
      steps = editor.items.items,
      i = 0,
      il = steps.length;
      
      Ext4.suspendLayouts();
      
      // update navigation title
      titleItem.setText(step.get('titleText') || step.get('text'));
      
      // update content
      for (; i < il; i++) {
        steps[i].setVisible(Ext4.Array.contains(Ext4.Array.from(steps[i].stepIds), stepId));
      }
      
      // update custom token
      Mkt3.DlManager.setCustomToken(step.getId());
      
      tree.expandPath(step.parentNode.getPath());
      tree.getView().getSelectionModel().select(step);
      
      this.updateFlowButtons();
      
      editor.fireEvent('stepchange', stepId, previousStepId);
      
      Ext4.resumeLayouts(true);
      
      if (editor.down) {
        if (editor.down("[action=create]")
           && editor.down("[action=create]").isVisible()) {
          editor.down("[action=create]").setDisabled(true);
        } else if (editor.down("[action=import]")
           && editor.down("[action=import]").isVisible()) {
          editor.down("[action=import]").setDisabled(true);
        }
      }
    };
  } else {
    console.log("Marketo App > Skipped: Disable Create button in Wizard Editors");
  }
  
  if (typeof(Ext4) !== "undefined"
     && Ext4
     && Ext4.button
     && Ext4.button.Button
     && Ext4.button.Button.prototype
     && Ext4.button.Button.prototype.showMenu) {
    Ext4.button.Button.prototype.showMenu = function (fromEvent) {
      console.log("Marketo App > Executing: Disable Toolbar Buttons & Actions Menu in ABM & Admin Sections");
      var mItems = this.menu.items,
      menuItems,
      itemsToDisable = [
        // Account Based Marketing > Named Accounts > New Button
        //"discoverCrmAccounts", //Discover CRM Accounts
        //"discoverMarketoCompanies", //Discover Marketo Companies
        //"importNamedAccounts", //Import Named Accounts
        //"newNamedAccount", //Create Named Account
        
        // Account Based Marketing > Named Accounts > Actions Button
        //"addToAccountList", //Add to Account List
        "deleteNamedAccount", //Delete Named Account
        //"checkImportStatus", //Check Import Status
        
        // Account Based Marketing > Named Accounts > Account Team Actions
        //"assignAccountOwner", //Assign Account Owner
        //"assignAccountMember", //Assign Account Member
        "deleteAccountMember", //Remove Account Member
        
        // Admin > Marketo Custom Objects > Marketo Custom Objects > Actions Button
        //"mktoCustomObjectEditBtn", //Edit Object
        "mktoCustomObjectPublishBtn", //Approve Object
        //"mktoCustomObjectDiscardDraftBtn", //Discard Draft
        "mktoCustomObjectDeleteBtn", //Delete Object
        
        // Admin > Marketo Custom Objects > Fields > Actions Button
        //"mktoCustomObjectFieldEditBtn", //Edit Field
        "mktoCustomObjectFieldDeleteBtn", // Delete Field
        
        // Admin > Marketo Custom Activities > Marketo Custom Activities > Actions Button
        //"mktoCustomActivityEditBtn",//Edit Activity
        "mktoCustomActivityPublishBtn", //Approve Activity
        //"mktoCustomActivityDiscardDraftBtn",//Discard Draft
        "mktoCustomActivityDeleteBtn", //Delete Activity
        
        // Admin > Marketo Custom Activities > Fields > Actions Button
        //"mktoCustomActivityFieldEditBtn",//Edit Field
        "mktoCustomActivityFieldDeleteBtn", //Delete Field
      ];
      
      if (mItems) {
        itemsToDisable.forEach(function (itemToDisable) {
          var item = mItems.get(itemToDisable);
          if (item) {
            item.setDisabled(true);
          }
        });
      }
      menuItems = [
        // Account Based Marketing > Account Lists > New Button
        //"contextMenu [action=newAccountList]", //Create New Account List
        
        // Account Based Marketing > Account Lists > Actions Button
        //"contextMenu [action=renameAccountList]", //Rename Account List
        "contextMenu [action=deleteAccountList]", //Delete Account List
        
        // Admin > Mobile Apps & Devices > Mobile Apps > Actions Button
        //"menu [action=create]", //New Mobile App
        //"menu [action=edit]", //Edit Mobile App
        "menu [action=delete]", //Delete Mobile App
        //"menu [action=send]", //Send To Developer
        //"menu [action=verify]", //Verify Push Configuration
        
        // Admin > Mobile Apps & Devices > Test Devices > Actions Button
        //"menu [action=createTestDevice]", //New Test Device
        "menu [action=editTestDevice]", //Edit Test Device
        "menu [action=deleteTestDevice]", //Delete Test Device
      ];
      mItems = Ext4.ComponentQuery.query(menuItems.toString());
      
      if (mItems) {
        mItems.forEach(function (item) {
          if (item) {
            item.setDisabled(true);
          }
        });
      }
      
      var me = this,
      menu = me.menu;
      if (me.rendered) {
        if (me.tooltip
           && Ext.quickTipsActive
           && me.getTipAttr() != "title") {
          Ext.tip.QuickTipManager.getQuickTip().cancelShow(me.btnEl);
        }
        if (menu.isVisible()) {
          menu.hide();
        }
        if (!fromEvent
           || me.showEmptyMenu
           || menu.items.getCount() > 0) {
          menu.showBy(me.el, me.menuAlign, ((!Ext.isStrict && Ext.isIE) || Ext.isIE6) ? [-2, -2] : undefined);
        }
      }
      return me;
    };
  } else {
    console.log("Marketo App > Skipped: Disable Toolbar Buttons & Actions Menu in ABM & Admin Sections");
  }
  
  if (typeof(Mkt3) !== "undefined"
     && Mkt3
     && Mkt3.controller
     && Mkt3.controller.abm
     && Mkt3.controller.abm.namedAccount
     && Mkt3.controller.abm.namedAccount.Dashboard
     && Mkt3.controller.abm.namedAccount.Dashboard.prototype
     && Mkt3.controller.abm.namedAccount.Dashboard.prototype.loadToolBar) {
    Mkt3.controller.abm.namedAccount.Dashboard.prototype.loadToolBar = function () {
      console.log("Marketo App > Executing: Disable Toolbar Buttons for ABM > Named Accounts");
      
      var menuItems = [
        // Named Account Toolbar Buttons
        "abmNamedAccountToolbar [action=linkPeople]", //Add People to Named Account
      ],
      mItems = Ext4.ComponentQuery.query(menuItems.toString());
      
      if (mItems) {
        mItems.forEach(function (item) {
          if (item) {
            item.setDisabled(true);
          }
        });
      }
      
      var canvas = this.getCanvas(),
      toolbar = canvas.down('abmNamedAccountToolbar');
      
      toolbar.down('#newMenu').hide();
      toolbar.down('#peopleLink').hide();
      toolbar.down('#deleteNamedAccount').hide();
    };
  } else {
    console.log("Marketo App > Skipped: Disable Toolbar Buttons for ABM > Named Accounts");
  }
  
  if (typeof(Mkt3) !== "undefined"
     && Mkt3
     && Mkt3.controller
     && Mkt3.controller.abm
     && Mkt3.controller.abm.accountList
     && Mkt3.controller.abm.accountList.Dashboard
     && Mkt3.controller.abm.accountList.Dashboard.prototype
     && Mkt3.controller.abm.accountList.Dashboard.prototype.loadToolBar) {
    Mkt3.controller.abm.accountList.Dashboard.prototype.loadToolBar = function () {
      console.log("Marketo App > Executing: Disable Toolbar Buttons for ABM > Account Lists > Named Accounts");
      
      var menuItems = [
        // Account Based Marketing > Account Lists > Named Account > Toolbar Buttons
        "abmAccountListToolbar [action=removeNamedAccount]", //Remove Named Accounts
      ],
      mItems = Ext4.ComponentQuery.query(menuItems.toString());
      
      if (mItems) {
        mItems.forEach(function (item) {
          if (item) {
            item.destroy();
          }
        });
      }
      
      var dashboard = this.getDashboard(),
      toolbar = dashboard.query('abmAccountListToolbar');
      
      for (var i = 0; i < toolbar.length; i++) {
        toolbar[i].down('#newMenu').hide();
      }
    };
  } else {
    console.log("Marketo App > Skipped: Disable Toolbar Buttons for ABM > Account Lists > Named Accounts");
  }
  
  if (typeof(Mkt3) !== "undefined"
     && Mkt3
     && Mkt3.controller
     && Mkt3.controller.socialApp
     && Mkt3.controller.socialApp.SocialApp
     && Mkt3.controller.socialApp.SocialApp.prototype
     && Mkt3.controller.socialApp.SocialApp.prototype.loadToolbar) {
    // Disable Marketing Activities > Social App > Toolbar buttons & Actions menu
    var prevSocialAppToolbar = Mkt3.controller.socialApp.SocialApp.prototype.loadToolbar;
    Mkt3.controller.socialApp.SocialApp.prototype.loadToolbar = function (menu, attr) {
      console.log("Marketo App > Executing: Disable Toolbar Buttons & Actions Menu for Marketing Activities > Social Apps");
      prevSocialAppToolbar.apply(this, arguments);
      
      var disable = APP.evaluateMenu("socialAppToolbar", null, null, this),
      menuItems = [
        //"socialAppToolbar [action=edit]", //Edit Draft
        //"socialAppToolbar [action=preview]", //Preview
        //"socialAppToolbar [action=pickWinners]", //Pick Winners
        
        //"socialAppToolbar contextMenu [action=edit]", //Edit Draft
        //"socialAppToolbar contextMenu [action=preview]", //Preview
        "socialAppToolbar contextMenu [action=approve]", //Approve
        "socialAppToolbar contextMenu [action=clone]", //Clone
        "socialAppToolbar contextMenu [action=delete]", //Delete
        //"socialAppToolbar contextMenu [action=getWidgetEmbedCode]", //Embed Code
        //"socialAppToolbar contextMenu [action=editDraft]", //Edit Draft
        //"socialAppToolbar contextMenu [action=previewDraft]", //Preview Draft
        "socialAppToolbar contextMenu [action=approveDraft]", //Approve Draft
        //"socialAppToolbar contextMenu [action=discardDraft]", //Discard Draft
      ],
      mItems = Ext4.ComponentQuery.query(menuItems.toString());
      
      if (mItems) {
        mItems.forEach(function (item) {
          if (item) {
            item.setDisabled(disable);
          }
        });
      }
      
      return menu;
    };
  } else {
    console.log("Marketo App > Skipped: Disable Toolbar Buttons & Actions Menu for Marketing Activities > Social Apps");
  }
  
  if (typeof(Mkt3) !== "undefined"
     && Mkt3
     && Mkt3.controller
     && Mkt3.controller.mobilePushNotification
     && Mkt3.controller.mobilePushNotification.MobilePushNotification
     && Mkt3.controller.mobilePushNotification.MobilePushNotification.prototype
     && Mkt3.controller.mobilePushNotification.MobilePushNotification.prototype.loadToolbar) {
    // Disable Marketing Activities > Push Notification > Toolbar buttons & Actions menu
    var prevMobilePushNotificationToolbar = Mkt3.controller.mobilePushNotification.MobilePushNotification.prototype.loadToolbar;
    Mkt3.controller.mobilePushNotification.MobilePushNotification.prototype.loadToolbar = function (menu, attr) {
      console.log("Marketo App > Executing: Disable Toolbar Buttons & Actions Menu for Marketing Activities > Push Notifications");
      prevMobilePushNotificationToolbar.apply(this, arguments);
      
      var disable = APP.evaluateMenu("mobilePushNotification", null, null, this),
      menuItems = [
        //"mobilePushNotification mobilePushNotificationToolbar [action=edit]", //Edit Draft
        //"mobilePushNotification mobilePushNotificationToolbar [action=preview]", //Preview
        
        //"mobilePushNotification contextMenu [action=edit]", //Edit Draft
        //"mobilePushNotification contextMenu [action=preview]", //Preview
        "mobilePushNotification contextMenu [action=sendSample]", //Send Sample
        "mobilePushNotification contextMenu [action=unapprove]", //Unapprove
        "mobilePushNotification contextMenu [action=approve]", //Approve
        "mobilePushNotification contextMenu [action=clone]", //Clone
        "mobilePushNotification contextMenu [action=delete]", //Delete
        //"mobilePushNotification contextMenu [action=editDraft]", //Edit Draft
        //"mobilePushNotification contextMenu [action=previewDraft]", //Preview Draft
        "mobilePushNotification contextMenu [action=sendDraftSample]", //Send Sample of Draft
        "mobilePushNotification contextMenu [action=approveDraft]", //Approve Draft
        //"mobilePushNotification contextMenu [action=discardDraft]", //Discard Draft
      ],
      mItems = Ext4.ComponentQuery.query(menuItems.toString());
      
      if (mItems) {
        mItems.forEach(function (item) {
          if (item) {
            item.setDisabled(disable);
          }
        });
      }
      
      return menu;
    };
  } else {
    console.log("Marketo App > Skipped: Disable Toolbar Buttons & Actions Menu for Marketing Activities > Push Notifications");
  }
  
  if (typeof(Mkt3) !== "undefined"
     && Mkt3
     && Mkt3.controller
     && Mkt3.controller.inAppMessage
     && Mkt3.controller.inAppMessage.InAppMessage
     && Mkt3.controller.inAppMessage.InAppMessage.prototype
     && Mkt3.controller.inAppMessage.InAppMessage.prototype.loadToolbar) {
    // Disable Marketing Activities > In-App Messages > Toolbar buttons & Actions menu
    var prevInAppMessageToolbar = Mkt3.controller.inAppMessage.InAppMessage.prototype.loadToolbar;
    Mkt3.controller.inAppMessage.InAppMessage.prototype.loadToolbar = function () {
      console.log("Marketo App > Executing: Disable Toolbar Buttons & Actions Menu for Marketing Activities > In-App Messages");
      prevInAppMessageToolbar.apply(this, arguments);
      
      var toolbar = this.getToolbar(),
      inAppMessage = this.getInAppMessage(),
      actionsMenu = toolbar.down('.contextMenu'),
      toolbarComponents = toolbar.query('component') || [],
      i = 0,
      il = toolbarComponents.length,
      toolbarComponent,
      text;
      
      // set record
      actionsMenu.record = inAppMessage;
      
      // update text and icons
      for (; i < il; i++) {
        toolbarComponent = toolbarComponents[i];
        
        // update icons
        if (Ext4.isDefined(toolbarComponent.iconCls)
           && Ext4.isFunction(toolbarComponent.setIconCls)) {
          toolbarComponent.setIconCls(toolbarComponent.iconCls);
        }
        
        // update text
        if ((Ext4.isDefined(toolbarComponent.text)
             || Ext4.isFunction(toolbarComponent.getText))
           && Ext4.isFunction(toolbarComponent.setText)) {
          text = Ext4.isFunction(toolbarComponent.getText) ? toolbarComponent.getText() : toolbarComponent.text;
          toolbarComponent.setText(text);
        }
      }
      
      var disable = APP.evaluateMenu("inAppMessage", null, null, this),
      menuItems = [
        //"inAppMessage inAppMessageToolbar [action=edit]", //Edit Draft
        //"inAppMessage inAppMessageToolbar [action=preview]", //Preview
        
        //"inAppMessage contextMenu [action=edit]", //Edit Draft
        //"inAppMessage contextMenu [action=preview]", //Preview
        "inAppMessage contextMenu [action=sendSample]", //Send Sample
        "inAppMessage contextMenu [action=unapprove]", //Unapprove
        "inAppMessage contextMenu [action=approve]", //Approve
        "inAppMessage contextMenu [action=clone]", //Clone
        "inAppMessage contextMenu [action=delete]", //Delete
        //"inAppMessage contextMenu [action=editDraft]", //Edit Draft
        //"inAppMessage contextMenu [action=previewDraft]", //Preview Draft
        "inAppMessage contextMenu [action=sendDraftSample]", //Send Sample of Draft
        "inAppMessage contextMenu [action=approveDraft]", //Approve Draft
        //"inAppMessage contextMenu [action=discardDraft]", //Discard Draft
      ],
      mItems = Ext4.ComponentQuery.query(menuItems.toString());
      
      if (mItems) {
        mItems.forEach(function (item) {
          if (item) {
            item.setDisabled(disable);
          }
        });
      }
    };
  } else {
    console.log("Marketo App > Skipped: Disable Toolbar Buttons & Actions Menu for Marketing Activities > In-App Messages");
  }
  
  if (typeof(Mkt3) !== "undefined"
     && Mkt3
     && Mkt3.controller
     && Mkt3.controller.smsMessage
     && Mkt3.controller.smsMessage.SmsMessage
     && Mkt3.controller.smsMessage.SmsMessage.prototype
     && Mkt3.controller.smsMessage.SmsMessage.prototype.loadToolbar) {
    // Disable Marketing menuItemsActivities > SMS Messages > Toolbar buttons & Actions menu
    var prevSmsMessageToolbar = Mkt3.controller.smsMessage.SmsMessage.prototype.loadToolbar;
    Mkt3.controller.smsMessage.SmsMessage.prototype.loadToolbar = function () {
      console.log("Marketo App > Executing: Disable Toolbar Buttons & Actions Menu for Marketing Activities > SMS Messages");
      prevSmsMessageToolbar.apply(this, arguments);
      
      var toolbar = this.getToolbar(),
      smsMessage = this.getSmsMessage(),
      actionsMenu = toolbar.down('.contextMenu'),
      toolbarComponents = toolbar.query('component') || [],
      i = 0,
      il = toolbarComponents.length,
      toolbarComponent,
      text;
      
      actionsMenu.record = smsMessage;
      
      for (; i < il; i++) {
        toolbarComponent = toolbarComponents[i];
        
        if (Ext4.isDefined(toolbarComponent.iconCls) && Ext4.isFunction(toolbarComponent.setIconCls)) {
          toolbarComponent.setIconCls(toolbarComponent.iconCls);
        }
        
        if ((Ext4.isDefined(toolbarComponent.text) || Ext4.isFunction(toolbarComponent.getText)) && Ext4.isFunction(toolbarComponent.setText)) {
          text = Ext4.isFunction(toolbarComponent.getText) ? toolbarComponent.getText() : toolbarComponent.text;
          toolbarComponent.setText(text);
        }
      }
      
      var disable = APP.evaluateMenu("smsMessage", null, null, this),
      menuItems = [
        //"smsMessage toolbar [action=edit]", //Edit Draft
        
        //"smsMessage contextMenu [action=edit]", //Edit Draft
        "smsMessage contextMenu [action=unapprove]", //Unapprove
        "smsMessage contextMenu [action=approve]", //Approve
        "smsMessage contextMenu [action=clone]", //Clone
        "smsMessage contextMenu [action=delete]", //Delete
        //"smsMessage contextMenu [action=editDraft]", //Edit Draft
        //"smsMessage contextMenu [action=previewDraft]", //Preview Draft
        "smsMessage contextMenu [action=approveDraft]", //Approve Draft
        //"smsMessage contextMenu [action=discardDraft]", //Discard Draft
      ],
      mItems = Ext4.ComponentQuery.query(menuItems.toString());
      
      if (mItems) {
        mItems.forEach(function (item) {
          if (item) {
            item.setDisabled(disable);
          }
        });
      }
    };
  } else {
    console.log("Marketo App > Skipped: Disable Toolbar Buttons & Actions Menu for Marketing Activities > SMS Messages");
  }
  
  if (typeof(Ext4) !== "undefined"
     && Ext4
     && Ext4.Component
     && Ext4.Component.prototype
     && Ext4.Component.prototype.showAt) {
    // Disable Marketing Activities > Nurture Program > Stream & Content Actions menus
    Ext4.Component.prototype.showAt = function (x, y, animate) {
      console.log("Marketo App > Executing: Disable Content & Actions Menus for Marketing Activities > Nurture Program Stream");
      
      var me = this;
      if (!me.rendered
         && (me.autoRender
           || me.floating)) {
        
        me.doAutoRender();
        me.hidden = true
      }
      if (me.floating) {
        me.setPosition(x, y, animate)
      } else {
        me.setPagePosition(x, y, animate)
      }
      me.show();
      
      if (typeof(MktCanvas) !== "undefined"
         && MktCanvas
         && MktCanvas.getActiveTab()) {
        var ii,
        disable = APP.evaluateMenu("button", null, MktCanvas.getActiveTab(), null);
        for (ii = 0; ii < me.items.items.length; ii++) {
          switch (me.items.items[ii].action) {
            
            // Marketing Activities > Nurture Program > Stream Actions
            // Edit Name
          case "edit":
            //me.items.items[ii].setDisabled(disable);
            break;
            // Clone
          case "clone":
            me.items.items[ii].setDisabled(disable);
            break;
            // Activate all content
          case "activateAllContent":
            //me.items.items[ii].setDisabled(disable);
            break;
            // Show archived content
          case "showArchivedContent":
            //me.items.items[ii].setDisabled(disable);
            break;
            // Hide archived content
          case "hideArchivedContent":
            //me.items.items[ii].setDisabled(disable);
            break;
            // Edit Transition Rules
          case "editTransitionRules":
            //me.items.items[ii].setDisabled(disable);
            break;
            // Delete
          case "delete":
            me.items.items[ii].setDisabled(disable);
            break;
            
            // Marketing Activities > Nurture Program > Content Actions
            // All //
            // Activate
          case "activate":
            //me.items.items[ii].setDisabled(disable);
            break;
            // Deactivate
          case "deactivate":
            //me.items.items[ii].setDisabled(disable);
            break;
            // Edit Availability
          case "schedule":
            //me.items.items[ii].setDisabled(disable);
            break;
            // Archive
          case "archive":
            me.items.items[ii].setDisabled(disable);
            break;
            // Unarchive
          case "unarchive":
            me.items.items[ii].setDisabled(disable);
            break;
            // Remove
          case "remove":
            //me.items.items[ii].setDisabled(disable);
            break;
            // Email //
            // Edit Draft
          case "emailEditDraft":
            //me.items.items[ii].setDisabled(disable);
            break;
            // Preview
          case "emailPreview":
            //me.items.items[ii].setDisabled(disable);
            break;
            // Approve
          case "emailApproveDraft":
            me.items.items[ii].setDisabled(disable);
            break;
            // Send Sample
          case "emailSendTest":
            //me.items.items[ii].setDisabled(disable);
            break;
            // Go to Email
          case "goToEmail":
            //me.items.items[ii].setDisabled(disable);
            break;
            // Email Draft //
            // Edit Draft
          case "emailEditDraft":
            //me.items.items[ii].setDisabled(disable);
            break;
            // Preview Draft
          case "emailPreviewDraft":
            //me.items.items[ii].setDisabled(disable);
            break;
            // Send Sample of Draft
          case "emailSendTestOfDraft":
            //me.items.items[ii].setDisabled(disable);
            break;
            // Approve Draft
          case "emailApproveDraft":
            me.items.items[ii].setDisabled(disable);
            break;
            // Program //
            // View Assets
          case "programViewAssets":
            //me.items.items[ii].setDisabled(disable);
            break;
            // View Setup
          case "programViewSetup":
            //me.items.items[ii].setDisabled(disable);
            break;
            // View My Tokens
          case "programViewTokens":
            //me.items.items[ii].setDisabled(disable);
            break;
            // View Members
          case "programViewMembers":
            //me.items.items[ii].setDisabled(disable);
            break;
            // Go to Program
          case "goToProgram":
            //me.items.items[ii].setDisabled(disable);
            break;
            // Push Notification //
            // Edit Draft
          case "mobilePushEditDraft":
            //me.items.items[ii].setDisabled(disable);
            break;
            // Preview
          case "mobilePushPreview":
            //me.items.items[ii].setDisabled(disable);
            break;
            // Approve
          case "mobilePushApprove":
            me.items.items[ii].setDisabled(disable);
            break;
            // Send Sample
          case "mobilePushSendTest":
            //me.items.items[ii].setDisabled(disable);
            break;
            // Go to Push Notification
          case "goToPushNotification":
            //me.items.items[ii].setDisabled(disable);
            break;
            
            // Admin > Tags > Calendar Entry Types > Right-click Menu
            // Edit
          case "edit":
            //me.items.items[ii].setDisabled(disable);
            break;
            // Hide
          case "hide":
            me.items.items[ii].setDisabled(disable);
            break;
            // Unhide
          case "unhide":
            me.items.items[ii].setDisabled(disable);
            break;
            
          default:
            break;
          }
        }
      } else {
        var ii,
        disable = APP.evaluateMenu("button", null, null, null);
        for (ii = 0; ii < me.items.items.length; ii++) {
          switch (me.items.items[ii].action) {
            // Admin > Marketo Custom Activities/Objects & Mobile Apps > Activities/Objects & Mobile Apps Tree > Right-click Menu
            // Edit Activity/Object/App
          case "edit":
            //me.items.items[ii].setDisabled(disable);
            break;
            // Approve Activity/Object
          case "publish":
            me.items.items[ii].setDisabled(disable);
            break;
            // Discard Draft
          case "discardDraft":
            //me.items.items[ii].setDisabled(disable);
            break;
            // Delete Activity/Object/App
          case "delete":
            me.items.items[ii].setDisabled(disable);
            break;
            
            // Send To Developer
          case "send":
            me.items.items[ii].setDisabled(disable);
            break;
            // Verify Push Configuration
          case "verify":
            me.items.items[ii].setDisabled(disable);
            break;
            
          default:
            break;
          }
        }
      }
    };
  } else {
    console.log("Marketo App > Skipped: Disable Content & Actions Menus for Marketing Activities > Nurture Program Stream");
  }
};

/**************************************************************************************
 *
 *  This function override the draft edit menu items in all areas.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.overrideDraftEdits = function () {
  console.log("Marketo App > Overriding: Draft Edit Menu Items");
  
  if (typeof(MktDsMenu) !== "undefined"
     && MktDsMenu) {
    console.log("Marketo App > Executing: Override Draft Edit Menu Items");
    var origExtMessageBoxShow = Ext.MessageBox.show;
    origExt4MessageBoxShow = Ext4.MessageBox.show;
    origMktMessageShow = MktMessage.show;
    origPageEditHandler = MktDsMenu.getPageMenu().get("pageEdit").handler,
    origPageDraftEditHandler = MktDsMenu.getPageMenu().get("pageDraftEdit").handler,
    origEmailEditHandler = MktDsMenu.getEmailMenu().get("emailEdit").handler,
    origEmailDraftEditHandler = MktDsMenu.getEmailMenu().get("emailDraftEdit").handler;
    /*
    origFormEditHandler = MktDsMenu.getFormMenu().get("formEdit").handler,
    origFormDraftEditHandler = MktDsMenu.getFormMenu().get("formDraftEdit").handler,
    origSocialAppEditHandler = MktDsMenu.getSocialAppMenu().get("socialAppEdit").handler,
    origSocialAppDraftEditHandler = MktDsMenu.getSocialAppMenu().get("socialAppDraftEdit").handler,
    origPushEditHandler = MktDsMenu.getPushNotificationMenu().get("pushNotificationEdit").handler,
    origPushDraftEditHandler = MktDsMenu.getPushNotificationMenu().get("pushNotificationDraftEdit").handler,
    origInAppEditHandler = MktDsMenu.getInAppMessageMenu().get("inAppMessageEdit").handler,
    origInAppDraftEditHandler = MktDsMenu.getInAppMessageMenu().get("inAppMessageDraftEdit").handler,
    origSmsEditHandler = MktDsMenu.getSmsMessageMenu().get("smsMessageEdit").handler;
    origSmsDraftEditHandler = MktDsMenu.getSmsMessageMenu().get("smsMessageDraftEdit").handler;
     */
    
    // Landing Page Edit
    /*
    MktDsMenu.getPageMenu().get("pageEdit").setHandler(function (el) {
    if (attr
    && attr.accessZoneId.toString().search(mktoGoldenWorkspacesMatch) != -1) {
    origPageEditHandler.apply(this, arguments);
    Ext4.MessageBox.hide();
    } else {
    origPageEditHandler.apply(this, arguments);
    }
    });
     */
    // Landing Page Draft Edit
    MktDsMenu.getPageMenu().get("pageDraftEdit").setHandler(function (el) {
      if (attr
         && attr.accessZoneId.toString().search(mktoGoldenWorkspacesMatch) != -1) {
        console.log("Marketo App > Executing: Override Draft Edit Menu Items > Landing Page Draft Edit");
        var triggeredFrom = this.parentMenu.triggeredFrom,
        xtra = el.parentMenu.xtra;
        Mkt.app.DesignStudio.Pages.discardDraft({
          triggeredFrom: triggeredFrom,
          xtra: xtra
        });
        el.parentMenu.hide(true);
        Ext.MessageBox.hide();
        Mkt.app.DesignStudio.Pages.editPageDraft({
          triggeredFrom: triggeredFrom,
          xtra: xtra
        });
      } else {
        origPageDraftEditHandler.apply(this, arguments);
      }
    });
    
    // Email Edit
    MktDsMenu.getEmailMenu().get("emailEdit").setHandler(function (el) {
      if (attr
         && attr.accessZoneId.toString().search(mktoGoldenWorkspacesMatch) != -1) {
        console.log("Marketo App > Executing: Override Draft Edit Menu Items > Email Edit");
        var triggeredFrom = this.parentMenu.triggeredFrom,
        xtra = el.parentMenu.xtra,
        newEl = this.getEl();
        Ext.MessageBox.show = Ext4.MessageBox.show = MktMessage.show = function () {};
        Mkt.app.DesignStudio.Emails.discardDraft({
          triggeredFrom: triggeredFrom,
          xtra: xtra
        });
        el.parentMenu.hide(true);
        Mkt.app.DesignStudio.Emails.editDraft({
          triggeredFrom: triggeredFrom,
          xtra: xtra,
          el: newEl
        });
        window.setTimeout(function () {
          console.log("Marketo App > Restoring: System Messages");
          Ext.MessageBox.show = origExtMessageBoxShow;
          Ext4.MessageBox.show = origExt4MessageBoxShow;
          MktMessage.show = origMktMessageShow;
        }, 5000);
      } else {
        origEmailEditHandler.apply(this, arguments);
      }
    });
    // Email Draft Edit
    MktDsMenu.getEmailMenu().get("emailDraftEdit").setHandler(function (el) {
      if (attr
         && attr.accessZoneId.toString().search(mktoGoldenWorkspacesMatch) != -1) {
        console.log("Marketo App > Executing: Override Draft Edit Menu Items > Email Draft Edit");
        var triggeredFrom = this.parentMenu.triggeredFrom,
        xtra = el.parentMenu.xtra,
        newEl = this.getEl();
        Mkt.app.DesignStudio.Emails.discardDraft({
          triggeredFrom: triggeredFrom,
          xtra: xtra
        });
        el.parentMenu.hide(true);
        Mkt.app.DesignStudio.Emails.editDraft({
          triggeredFrom: triggeredFrom,
          xtra: xtra,
          el: newEl
        });
      } else {
        origEmailDraftEditHandler.apply(this, arguments);
      }
    });
    
    /*
    // Form Edit
    MktDsMenu.getFormMenu().get("formEdit").setHandler(function (el) {
    if (attr
    && attr.accessZoneId.toString().search(mktoGoldenWorkspacesMatch) != -1) {
    Ext4.Msg.forbid = function () {};
    origFormEditHandler.apply(this, arguments);
    window.setTimeout(function () {
    Ext4.Msg.forbid = origForbidMsg;
    }, 1000);
    } else {
    origFormEditHandler.apply(this, arguments);
    }
    });
    // Form Draft Edit
    MktDsMenu.getFormMenu().get("formDraftEdit").setHandler(function (el) {
    if (attr
    && attr.accessZoneId.toString().search(mktoGoldenWorkspacesMatch) != -1) {
    var triggeredFrom = this.parentMenu.triggeredFrom,
    xtra = el.parentMenu.xtra,
    newEl = this.getEl();
    Mkt.app.DesignStudio.Forms.discardDraft({
    triggeredFrom: triggeredFrom,
    xtra: xtra,
    el: newEl
    });
    el.parentMenu.hide(true);
    Ext.MessageBox.hide();
    window.setTimeout(function (el) {
    Mkt.app.DesignStudio.Forms.editDraft({
    triggeredFrom: triggeredFrom,
    xtra: xtra,
    el: newEl
    });
    }, 1);
    } else {
    origFormDraftEditHandler.apply(this, arguments);
    }
    });
    
    // Social App Edit
    MktDsMenu.getSocialAppMenu().get("socialAppEdit").setHandler(function (el) {
    if (attr
    && attr.accessZoneId.toString().search(mktoGoldenWorkspacesMatch) != -1) {
    origSocialAppEditHandler.apply(this, arguments);
    Ext4.MessageBox.hide();
    } else {
    origSocialAppEditHandler.apply(this, arguments);
    }
    });
    // Social App Draft Edit
    MktDsMenu.getSocialAppMenu().get("socialAppEdit").setHandler(function (el) {
    if (attr
    && attr.accessZoneId.toString().search(mktoGoldenWorkspacesMatch) != -1) {
    var triggeredFrom = this.parentMenu.triggeredFrom,
    xtra = el.parentMenu.xtra,
    newEl = this.getEl();
    Mkt.app.DesignStudio.SocialApp.discardDraft({
    triggeredFrom: triggeredFrom,
    xtra: xtra,
    el: newEl
    });
    el.parentMenu.hide(true);
    window.setTimeout(function(el) {
    Mkt.app.DesignStudio.SocialApp.editDraft({
    triggeredFrom: triggeredFrom,
    xtra: xtra,
    el: newEl
    });
    }, 1);
    } else {
    origSocialAppDraftEditHandler.apply(this, arguments);
    }
    });
    
    // Push Notification Edit
    MktDsMenu.getPushNotificationMenu().get("pushNotificationEdit").setHandler(function (el) {
    if (attr
    && attr.accessZoneId.toString().search(mktoGoldenWorkspacesMatch) != -1) {
    origPushEditHandler.apply(this, arguments);
    Ext4.MessageBox.hide();
    } else {
    origPushEditHandler.apply(this, arguments);
    }
    });
    // Push Notification Draft Edit
    MktDsMenu.getPushNotificationMenu().get("pushNotificationDraftEdit").setHandler(function (el) {
    if (attr
    && attr.accessZoneId.toString().search(mktoGoldenWorkspacesMatch) != -1) {
    var triggeredFrom = this.parentMenu.triggeredFrom,
    xtra = el.parentMenu.xtra,
    newEl = this.getEl();
    Mkt.app.DesignStudio.PushNotifications.discardDraft({
    triggeredFrom: triggeredFrom,
    xtra: xtra,
    el: newEl
    });
    el.parentMenu.hide(true);
    window.setTimeout(function(el) {
    Mkt.app.DesignStudio.PushNotifications.editDraft({
    triggeredFrom: triggeredFrom,
    xtra: xtra,
    el: newEl
    });
    }, 1);
    } else {
    origPushDraftEditHandler.apply(this, arguments);
    }
    });
    
    // In-App Message Edit
    MktDsMenu.getInAppMessageMenu().get("inAppMessageEdit").setHandler(function (el) {
    if (attr
    && attr.accessZoneId.toString().search(mktoGoldenWorkspacesMatch) != -1) {
    origInAppEditHandler.apply(this, arguments);
    Ext4.MessageBox.hide();
    } else {
    origInAppEditHandler.apply(this, arguments);
    }
    });
    // In-App Message Draft Edit
    MktDsMenu.getInAppMessageMenu().get("inAppMessageDraftEdit").setHandler(function (el) {
    if (attr
    && attr.accessZoneId.toString().search(mktoGoldenWorkspacesMatch) != -1) {
    var triggeredFrom = this.parentMenu.triggeredFrom,
    xtra = el.parentMenu.xtra,
    newEl = this.getEl();
    Mkt.app.DesignStudio.InAppMessage.discardDraft({
    triggeredFrom: triggeredFrom,
    xtra: xtra,
    el: newEl
    });
    el.parentMenu.hide(true);
    window.setTimeout(function(el) {
    Mkt.app.DesignStudio.InAppMessage.editDraft({
    triggeredFrom: triggeredFrom,
    xtra: xtra,
    el: newEl
    });
    }, 1);
    } else {
    origInAppDraftEditHandler.apply(this, arguments);
    }
    });
    
    // SMS Message Edit
    MktDsMenu.getSmsMessageMenu().get("smsMessageEdit").setHandler(function (el) {
    if (attr
    && attr.accessZoneId.toString().search(mktoGoldenWorkspacesMatch) != -1) {
    origSmsEditHandler.apply(this, arguments);
    Ext4.MessageBox.hide();
    } else {
    origSmsEditHandler.apply(this, arguments);
    }
    });
    // SMS Message Draft Edit
    MktDsMenu.getSmsMessageMenu().get("smsMessageDraftEdit").setHandler(function (el) {
    if (attr
    && attr.accessZoneId.toString().search(mktoGoldenWorkspacesMatch) != -1) {
    var triggeredFrom = this.parentMenu.triggeredFrom,
    xtra = el.parentMenu.xtra,
    newEl = this.getEl();
    Mkt.app.DesignStudio.SmsMessage.discardDraft({
    triggeredFrom: triggeredFrom,
    xtra: xtra,
    el: newEl
    });
    el.parentMenu.hide(true);
    window.setTimeout(function(el) {
    Mkt.app.DesignStudio.SmsMessage.editDraft({
    triggeredFrom: triggeredFrom,
    xtra: xtra,
    el: newEl
    });
    }, 1);
    } else {
    origSmsDraftEditHandler.apply(this, arguments);
    }
    });
     */
  } else {
    console.log("Marketo App > Skipping: Override Draft Edit Menu Items");
  }
};

/**************************************************************************************
 *
 *  This function disables or hides Toolbar items for all asset types in all areas.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.hideToolbarItems = function () {
  console.log("Marketo App > Hiding: Toolbar Items");
  
  if (typeof(Ext) !== "undefined"
     && Ext
     && Ext.layout
     && Ext.layout.ContainerLayout
     && Ext.layout.ContainerLayout.prototype
     && Ext.layout.ContainerLayout.prototype.renderItem) {
    // Disable ALL areas > ALL assets > ALL Toolbar items except for Smart Campaigns, Smart Lists, Lists, Social Apps, and Push Notifications
    Ext.layout.ContainerLayout.prototype.renderItem = function (c, position, target) {
      if (c) {
        if (!c.rendered) {
          c.render(target, position);
          this.configureItem(c, position);
        } else if (!this.isValidParent(c, target)) {
          if (Ext.isNumber(position)) {
            position = target.dom.childNodes[position];
          }
          
          target.dom.insertBefore(c.getPositionEl().dom, position || null);
          c.container = target;
          this.configureItem(c, position);
        }
      }
      
      if (typeof(c) !== "undefined"
         && c
         && c.topToolbar
         && c.topToolbar.items) {
        console.log("Marketo App > Executing: Disable Toolbar items for ALL in ALL");
        
        var origExtMessageBoxShow = Ext.MessageBox.show,
        origExt4MessageBoxShow = Ext4.MessageBox.show,
        origMktMessageShow = MktMessage.show,
        item,
        canvas = MktCanvas.getActiveTab(),
        disable = APP.evaluateMenu("button", null, canvas, null),
        itemsToHide = [
          /*{
          // Global > Programs, Analyzers, and Reports > Setup
          "id" : "editItem",//Edit
          "action" : "setVisible",
          },*/
          {
            "id": "deleteItem", //Delete
            "action": "setVisible",
          },
          
          // Global > Analyzers & Reports > Subscriptions
          /*{
          "id" : "newSubscription_atxCanvasSubscriptions",//New Report Subscription
          "action" : "setDisabled",
          },*/
          {
            "id": "deleteSubscription_atxCanvasSubscriptions", //Delete Subscription
            "action": "setVisible",
          },
          
          // Global > Form
          {
            "id": "formEdit_landingFODetail", //Edit Form
            "action": "handler",
          },
          
          // Global > Landing Page
          {
            "id": "pageEdit_landingLPDetail", //Edit Draft
            "action": "handler",
          },
          /*{
          "id" : "pagePreview_landingLPDetail",//Preview Page
          "action" : "setVisible",
          },*/
          
          // Global > Email
          {
            "id": "emailEdit_landingEMDetail", //Edit Draft
            "action": "handler",
          },
          /*{
          "id" : "emailPreview_landingEMDetail",//Preview Email
          "action" : "setVisible",
          },*/
          {
            "id": "gotoDeliverability_landingEMDetail", //Deliverability Tools
            "action": "setVisible",
          },
          
          // Marketing Activities > Programs & Folders > My Tokens
          /*{
          "id" : "editCustomToken",//Edit Token
          "action" : "setVisible",
          },*/
          {
            "id": "deleteCustomToken", //Delete Token
            "action": "setVisible",
          },
          
          // Marketing Activities > Programs > Members
          {
            "id": "importMembers", //Import Members
            "action": "setDisabled",
          },
          
          // Design Studio > Forms (System Folder)
          /*{
          "id" : "formEdit_landingCanvasFO",//Edit Form
          "action" : "setVisible",
          },*/
          
          // Design Studio > Landing Pages (System Folder)
          /*{
          "id" : "pageEdit_landingCanvasLP",//Edit Draft
          "action" : "setVisible",
          },*/
          /*{
          "id" : "pagePreview_landingCanvasLP",//Preview Page
          "action" : "setVisible",
          },*/
          
          // Design Studio > Landing Page Templates (System Folder)
          /*{
          "id" : "pageTemplateEditDraft_landingCanvasTM",//Edit Draft
          "action" : "setVisible",
          },*/
          /*{
          "id" : "pageTemplatePreview_landingCanvasTM",//Preview Template
          "action" : "setVisible",
          },*/
          {
            "id": "importTemplate_landingCanvasTM", //Import Template
            "action": "setDisabled",
          },
          
          // Design Studio > Landing Page Template
          /*{
          "id" : "pageTemplateEditDraft_landingTMDetail",//Edit Draft
          "action" : "setVisible",
          },*/
          /*{
          "id" : "pageTemplatePreview_landingTMDetail",//Preview Template
          "action" : "setVisible",
          },*/
          {
            "id": "importTemplate_landingTMDetail", //Import Template
            "action": "setDisabled",
          },
          
          // Design Studio > Emails (System Folder)
          /*{
          "id" : "emailEdit_landingCanvasEM",//Edit Draft
          "action" : "setVisible",
          },*/
          /*{
          "id" : "emailPreview_landingCanvasEM",//Preview Email
          "action" : "setVisible",
          },*/
          {
            "id": "gotoDeliverability_landingCanvasEM", //Deliverability Tools
            "action": "setVisible",
          },
          
          // Design Studio > Email Templates (System Folder)
          /*{
          "id" : "emailTemplateEdit_emailTemplates",//Edit Draft
          "action" : "setVisible",
          },*/
          /*{
          "id" : "emailTemplatePreview_emailTemplates",//Preview Template
          "action" : "setVisible",
          },*/
          
          // Design Studio > Email Template
          /*{
          "id" : "emailTemplateEdit_EMTemplateDetail",//Edit Draft
          "action" : "setVisible",
          },*/
          /*{
          "id" : "emailTemplatePreview_EMTemplateDetail",//Preview Template
          "action" : "setVisible",
          },*/
          
          // Design Studio > Snippets (System Folder)
          /*{
          "id" : "snippetEdit_landingCanvasSnippet",//Edit Draft
          "action" : "setVisible",
          },*/
          /*{
          "id" : "snippetPreview_landingCanvasSnippet",//Preview Snippet
          "action" : "setVisible",
          },*/
          
          // Design Studio > Snippet
          /*{
          "id" : "snippetEdit_snippetDetail",//Edit Draft
          "action" : "setVisible",
          },*/
          /*{
          "id" : "snippetPreview_snippetDetail",//Preview Snippet
          "action" : "setVisible",
          },*/
          
          // Design Studio > Images and Files
          {
            "id": "imageUpload_landingCanvasIM", //Upload Image or File
            "action": "setDisabled",
          }, {
            "id": "imageReplace_landingCanvasIM", //Replace Image or File
            "action": "setVisible",
          }, {
            "id": "imageUpload_landingIMDetail", //Upload Image or File
            "action": "setDisabled",
          }, {
            "id": "imageReplace_landingIMDetail", //Replace Image or File
            "action": "setVisible",
          },
          
          // Analytics > Model
          {
            "id": "editDraft_rcmCanvasOverview", //Edit Draft
            "action": "setVisible",
          },
          /*{
          "id" : "previewModel_rcmCanvasOverview",//Preview Model
          "action" : "setVisible",
          },*/
          
          // Admin > Admin
          /*{
          "text" : "Change Password",//Change Password
          "action" : "setDisabled",
          },*/
          /*{
          "text" : "Invite New User",//Invite New User
          "action" : "setDisabled",
          },*/
          
          // Admin > My Account
          /*{
          "text" : "Change Password",//Change Password
          "action" : "setDisabled",
          },*/
          /*{
          "id" : "caadEditButton",//Edit Account Settings
          "action" : "setDisabled",
          },*/
          
          // Admin > Login Settings
          /*{
          "id" : "caadEditSecurityButton",//Edit Security Settings
          "action" : "setDisabled",
          },*/
          /*{
          "id" : "caadEditurlButton",//Edit URL Expiration
          "action" : "setDisabled",
          },*/
          /*{
          "id" : "caadEditRestrictedLoginButton",//Edit IP Restrictions
          "action" : "setDisabled",
          },*/
          /*{
          "id" : "caadEditSmartListReportSettingsButton",//Smart List Report Settings
          "action" : "setDisabled",
          },*/
          
          // Admin > Users & Roles > Users
          /*{
          "text" : "Invite New User",//Invite New User
          "action" : "setDisabled",
          },*/
          {
            "id": "editLicenses", //Issue License
            "action": "setVisible",
          },
          /*{
          "id" : "editUser",//Edit User
          "action" : "setVisible",
          },*/
          {
            "id": "deleteUser", //Delete User
            "action": "setVisible",
          }, {
            "id": "resetPassword", //Reset Password
            "action": "setVisible",
          },
          
          // Admin > Users & Roles > Roles
          /*{
          "id" : "newRole",//New Role
          "action" : "setDisabled",
          },*/
          /*{
          "id" : "editRole",//Edit Role
          "action" : "setVisible",
          },*/
          {
            "id": "deleteRole", //Delete Role
            "action": "setVisible",
          },
          
          // Admin > Workspaces & Partitions > Workspaces
          /*{
          "id" : "newZone",//New Workspace
          "action" : "setDisabled",
          },*/
          /*{
          "id" : "editZone",//Edit Workspace
          "action" : "setVisible",
          },*/
          {
            "id": "deleteZone", //Delete Workspace
            "action": "setVisible",
          },
          
          // Admin > Workspaces & Partitions > Partitions
          /*{
          "id" : "newPartition",//New Lead Partition
          "action" : "setDisabled",
          },*/
          /*{
          "id" : "editPartition",//Edit Lead Partition
          "action" : "setVisible",
          },*/
          {
            "id": "deletePartition", //Delete Lead Partition
            "action": "setVisible",
          },
          /*{
          "id" : "assignmentRules",//Assignment Rules
          "action" : "setDisabled",
          },*/
          
          // Admin > Location
          /*{
          "id" : "capdChangeButton",//Change Location Settings
          "action" : "setDisabled",
          },*/
          
          // Admin > Email > Email
          /*{
          "text" : "Edit IP Settings",//Edit IP Settings
          "action" : "setDisabled",
          },*/
          /*{
          "text" : "Edit Text Editor Settings",//Edit Text Editor Settings
          "action" : "setDisabled",
          },*/
          /*{
          "text" : "Edit Email Editor Settings",//Edit Email Editor Settings
          "action" : "setDisabled",
          },*/
          
          // Admin > Email > SPF/DKIM
          /*{
          "id" : "addDomain",//Add Domain
          "action" : "setDisabled",
          },*/
          {
            "id": "deleteDomain", //Delete Domain
            "action": "setVisible",
          }, {
            "id": "dkimDetails", //DKIM Details
            "action": "setDisabled",
          },
          /*{
          "id" : "checkDNS",//Check DNS
          "action" : "setDisabled",
          },*/
          
          // Admin > Tags > Tags
          /*{
          "id" : "newButton",//New
          "action" : "setDisabled",
          },*/
          /*{
          "id" : "actionsButton",//Tag Actions
          "action" : "setVisible",
          },*/
          
          // Admin > Tags > Calendar Entry Types
          /*{
          "id" : "newButton",//New
          "action" : "setDisabled",
          },*/
          /*{
          "id" : "actionsButton",//Entry Actions
          "action" : "setVisible",
          },*/
          
          // Admin > Field Management
          /*{
          "id" : "fieldManagement_fmFields",//Field Actions
          "action" : "setDisabled",
          },*/
          {
          "text" : "New Custom Field",//New Custom Field
          "action" : "setDisabled",
          },
          /*{
          "id" : "exportFieldsFmFields",//Export Field Names
          "action" : "setDisabled",
          },*/
          
          // Admin > Salesforce Object Sync
          {
            "id": "refreshCadSfdcObjectSync", //Refresh Schema
            "action": "setDisabled",
          },
          /*{
          "id" : "syncOjbectCadSfdcObjectSync",//Enable Sync
          "action" : "setVisible",
          },*/
          /*{
          "id" : "editVisibleFieldsCadSfdcObjectSync",//Edit Visible Fields
          "action" : "setVisible",
          },*/
          
          // Admin > Salesforce
          {
            "id": "enableSync", //Enable/Disable Sync
            "action": "setVisible",
          },
          /*{
          "id" : "editCredentials",//Edit Credentials
          "action" : "setDisabled",
          },*/
          /*{
          "id" : "editSyncOptions",//Edit Sync Options
          "action" : "setDisabled",
          },*/
          
          // Admin > Sales Insight > Sales Insight
          /*{
          "text" : "Edit API Configuration",//Edit API Configuration
          "action" : "setDisabled",
          },*/
          /*{
          "text" : "Edit Settings",//Edit Settings
          "action" : "setDisabled",
          },*/
          
          // Admin > Sales Insight > Email Add-in
          /*{
          "id" : "issueLicenseCadLisAdmin",//Issue License
          "action" : "setDisabled",
          },*/
          {
            "id": "revokeLicenseCadLisAdmin", //Revoke License
            "action": "setVisible",
          }, {
            "id": "resendLicenseCadLisAdmin", //Resend Invitation
            "action": "setVisible",
          },
          /*{
          "id" : "addSeatsCadLisAdmin",//Purchase More Seats
          "action" : "setDisabled",
          },*/
          {
            "id": "configAddinCadLisAdmin", //Config Add-in
            "action": "setVisible",
          },
          
          // Admin > Landing Pages > Landing Pages
          /*{
          "id" : "editDomainSettings",//Edit Settings
          "action" : "setVisible",
          },*/
          
          // Admin > Landing Pages > Rules
          {
            "text": "Rules Actions", //Rules Actions
            "action": "setVisible",
          },
          /*{
          "id" : "editRule",//Edit Rule
          "action" : "setVisible",
          },*/
          {
            "id": "deleteRule", //Delete Rule
            "action": "setVisible",
          },
          
          // Admin > Web Services
          /*{
          "id" : "editIpRestriction",//Edit IP Restrictions
          "action" : "setDisabled",
          },*/
          
          // Admin > LaunchPoint
          /*{
          "id" : "newLaunchpoint",//New
          "action" : "setDisabled",
          },*/
          {
            "id": "launchpointActions", //Service Actions
            "action": "setVisible",
          },
          /*{
          "id" : "editWebinarLogin",//Edit Service
          "action" : "setVisible",
          },*/
          
          // Admin > Webhooks
          /*{
          "id" : "newWebhookLogin",//New Webhook
          "action" : "setDisabled",
          },*/
          /*{
          "text" : "Webhooks Actions",//Webhooks Actions
          "action" : "setVisible",
          },*/
          
          // Admin > Revenue Cycle Analytics > Custom Field Sync
          {
            "id": "cadChangeButton", //Edit Sync Option
            "action": "setVisible",
          },
        ];
        
        itemsToHide.forEach(function (itemToHide) {
          if (itemToHide.id) {
            item = c.topToolbar.items.get(itemToHide.id);
          } else if (itemToHide.text) {
            item = c.topToolbar.find("text", itemToHide.text)[0];
          }
          if (item) {
            if (itemToHide.id == "gotoDeliverability_landingEMDetail") {
              item.setVisible(false);
            } else if (itemToHide.action == "setVisible") {
              item.setVisible(!disable);
            } else if (itemToHide.action == "setDisabled") {
              item.setDisabled(disable);
            }
            
            switch (itemToHide.id) {
              /*
              case "formEdit_landingFODetail":
              var origHandler = item.handler;
              item.setHandler(function () {
              if (attr
              && attr.accessZoneId.toString().search(mktoGoldenWorkspacesMatch) != -1) {
              var parent = this.findParentBy(function (item) {
              return item.xtra && item.xtra.subType
              }),
              xtra = parent ? parent.xtra : attr,
              discardMsg = Ext.MessageBox.show({
              title: "MarketoLive",
              msg: "Discarding Draft",
              progress: false,
              wait: false,
              width: 270,
              closable: true
              });
              Mkt.app.DesignStudio.Forms.discardDraft({
              triggeredFrom: "button",
              xtra: xtra,
              el: this.getEl()
              });
              discardMsg.hide();
              Ext.MessageBox.hide();
              window.setTimeout(function () {
              Mkt.app.DesignStudio.Forms.editForm({
              triggeredFrom: "button",
              xtra: xtra
              });
              MktMessage.hide();
              Ext.MessageBox.hide();
              }, waitAfterDiscard);
              } else {
              origHandler.apply(this, arguments);
              }
              });
              break;
               */
            case "pageEdit_landingLPDetail":
              var origHandler = item.handler;
              item.setHandler(function () {
                if (attr
                   && attr.accessZoneId.toString().search(mktoGoldenWorkspacesMatch) != -1) {
                  console.log("Marketo App > Executing: Override Edit Draft Toolbar Button > Landing Page");
                  var discardMsg = Ext.MessageBox.show({
                      title: "MarketoLive",
                      msg: "Discarding Draft",
                      progress: false,
                      wait: false,
                      width: 270,
                      closable: true
                    });
                  Mkt.app.DesignStudio.Pages.discardDraft({
                    triggeredFrom: "button",
                    xtra: attr
                  });
                  discardMsg.hide();
                  Mkt.app.DesignStudio.Pages.editPage({
                    triggeredFrom: "button",
                    el: this.getEl()
                  });
                } else {
                  origHandler.apply(this, arguments);
                }
              });
              break;
              
            case "emailEdit_landingEMDetail":
              var origHandler = item.handler;
              item.setHandler(function (button, e) {
                if (attr
                   && attr.accessZoneId.toString().search(mktoGoldenWorkspacesMatch) != -1) {
                  console.log("Marketo App > Executing: Override Edit Draft Toolbar Button > Email");
                  Ext.MessageBox.show = Ext4.MessageBox.show = MktMessage.show = function () {};
                  Mkt.app.DesignStudio.Emails.discardDraft({
                    triggeredFrom: 'button',
                    xtra: attr,
                    el: this.getEl()
                  });
                  Mkt.app.DesignStudio.Emails.editDraft({
                    triggeredFrom: 'button',
                    panelId: attr.panelId
                  });
                  window.setTimeout(function () {
                    console.log("Marketo App > Restoring: System Messages");
                    Ext.MessageBox.show = origExtMessageBoxShow;
                    Ext4.MessageBox.show = origExt4MessageBoxShow;
                    MktMessage.show = origMktMessageShow;
                  }, 5000);
                } else {
                  origHandler.apply(this, arguments);
                }
              });
              break;
            }
          }
        });
      }
    };
  }
};

/**************************************************************************************
 *
 *  This function disables or hides toggled Toolbar items such as in Admin
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {Array} - An array of objects which contain the following attributes:
 *                   id - ID of the item to disable
 *                    OR
 *                   text - name of the item to disable
 *                   action - action to take on the item (setVisisble, setDisabled)
 **************************************************************************************/

APP.hideOtherToolbarItems = function (itemsToHide) {
  var isTopToolbarActive = window.setInterval(function () {
      console.log("Marketo App > Hiding: Other Toolbar Items");
      
      if (typeof(MktCanvas) !== "undefined"
         && MktCanvas
         && MktCanvas.getActiveTab()
         && MktCanvas.getActiveTab().getTopToolbar()) {
        console.log("Marketo App > Executing: Hiding Other Toolbar Items");
        
        window.clearInterval(isTopToolbarActive);
        
        var topToolbar = MktCanvas.getActiveTab().getTopToolbar();
        itemsToHide.forEach(function (itemToHide) {
          if (itemToHide.id) {
            item = topToolbar.items.get(itemToHide.id);
          } else if (itemToHide.text) {
            item = topToolbar.find("text", itemToHide.text)[0];
          }
          if (item) {
            if (itemToHide.action == "setVisible") {
              item.setVisible(false);
            } else if (itemToHide.action == "setDisabled") {
              item.setDisabled(true);
            }
          }
        });
      }
    }, 0);
};

/**************************************************************************************
 *
 *  This function returns the current date in a human-readable format.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.getHumanDate = function () {
  console.log("Marketo Demo App > Getting: Date 4 Weeks From Now");
  
  var dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUNE", "JULY", "AUG", "SEPT", "OCT", "NOV", "DEC"],
  date = new Date(),
  dayOfWeek,
  month,
  dayOfMonth,
  year;
  
  date.setDate(date.getDate() + 28);
  dayOfWeek = dayNames[date.getDay()];
  month = monthNames[date.getMonth()];
  year = date.getFullYear();
  
  switch (date.getDate()) {
  case 1:
    dayOfMonth = "1st";
    break;
  case 2:
    dayOfMonth = "2nd";
    break;
  case 3:
    dayOfMonth = "3rd";
    break;
  default:
    dayOfMonth = date.getDate() + "th";
    break;
  }
  
  return dayOfWeek + ", " + month + " the " + dayOfMonth + " " + year;
};

/**************************************************************************************
 *
 *  This function overlays a landing page with the user submitted company logo and color.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {String} action - The mode in which this asset is being viewed (edit/preview).
 *
 **************************************************************************************/

APP.overlayLandingPage = function (action) {
  console.log("Marketo App > Overlaying: Landing Page");
  
  var isLandingPageEditor,
  clearOverlayVars,
  overlay,
  isMktoFreeForm = isMktoBackgroundColorReplaced = isMktoImgReplaced = isMktoHeroBgImgReplaced = isMktoTextReplaced = isMktoSubTextReplaced = isMktoButtonReplaced = isMktoOrigReplaced = desktopPrevReady = phonePrevReady = sideBySideDesktopPrevReady = sideBySidePhonePrevReady = isDesktopReplaced = isPhoneReplaced = isSideBySideDesktopReplaced = isSideBySidePhoneReplaced = false,
  mktoBodyId = "bodyId",
  mktoFreeFormClassName = "mktoMobileShow",
  logoRegex = new RegExp("primaryImage|primary_image|primary-image|logo|image_1|image-1|image1", "i"),
  heroBgImgIdRegex = new RegExp("hero", "i"),
  //mktoMainTextDivIdRegex = new RegExp("^primaryBodyHeader$|^heroHeader$|^mainTitle$|^main-title$|^hero title$|^heroTitle$|^hero-title$|^title$", "i"),
  //mktoSubTextDivIdRegex = new RegExp("^section2Header$|^heroHeader2$|^subtitle$|^sub-title$|^hero subtitle$|^heroSubtitle$|^hero-subtitle$", "i"),
  //mktoRichMainTextDivClassNameRegex = new RegExp("main title|main_title|mainTitle|main-title|title", "i"),
  //mktoRichSubTextDivClassNameRegex = new RegExp("subtitle|sub-title", "i"),
  buttonTextRegex = new RegExp("signup|sign up|call to action|cta|register|more|contribute|submit", "i"),
  saveEditsToggle = APP.getCookie("saveEditsToggleState"),
  logo = APP.getCookie("logo"),
  heroBackground = APP.getCookie("heroBackground"),
  color = APP.getCookie("color"),
  defaultColor = "rgb(42, 83, 112)",
  logoOrigMaxHeight = "55",
  mktoMainText = "You To Our Event",
  mktoSubText = APP.getHumanDate(),
  company,
  companyName,
  linearGradient,
  desktopRepeatReadyCount = phoneRepeatReadyCount = sideBySideDesktopRepeatReadyCount = sideBySidePhoneRepeatReadyCount = 0,
  maxRepeatReady = 2000,
  maxOtherRepeatReady = 2000;
  
  if (saveEditsToggle == "true"
     || (logo == null
       && heroBackground == null
       && color == null)) {
    return false;
  }
  if (logo != null) {
    company = logo.split("https://logo.clearbit.com/")[1].split(".")[0];
    companyName = company.charAt(0).toUpperCase() + company.slice(1);
    mktoMainText = companyName + " Invites " + mktoMainText;
  } else {
    mktoMainText = "We Invite " + mktoMainText;
  }
  
  if (color) {
    var formButtonStyle = document.createElement("style");
    formButtonStyle.type = "text/css";
    formButtonStyle.innerHTML = ".mktoButton { background-image: none !important; border-radius: 0 !important; border: none !important; background-color: " + color + " !important; }";
    linearGradient = "linear-gradient(to bottom, " + color + ", rgb(242, 242, 242)) !important";
  }
  
  clearOverlayVars = function () {
    isMktoBackgroundColorReplaced = isMktoImgReplaced = isMktoHeroBgImgReplaced = isMktoTextReplaced = isMktoSubTextReplaced = isMktoButtonReplaced = isMktoOrigReplaced = false;
    iframeBody = logoImg = textBackground = bannerBackground = mainTitle = subTitle = mktoImgs = mktoTexts = mktoRichTexts = mktoButtons = null;
  };
  
  overlay = function (iframeDocument) {
    if (iframeDocument) {
      var iframeBody = iframeDocument.getElementsByTagName("body")[0],
      logoImg = iframeDocument.getElementById("lp-logo"),
      textBackground = iframeDocument.getElementById("background-color"),
      bannerBackground = iframeDocument.getElementById("bigger-background"),
      mainTitle = iframeDocument.getElementById("title"),
      subTitle = iframeDocument.getElementById("sub-title");
      
      if (iframeBody
         && iframeBody.innerHTML) {
        var mktoHeader = iframeDocument.getElementsByName("header")[0],
        mktoLogo1 = iframeDocument.getElementsByName("logo")[0],
        mktoLogo2 = iframeDocument.getElementsByName("logo")[1],
        mktoImgs = iframeBody.getElementsByClassName("lpimg"),
        mktoHeroBg = iframeDocument.getElementsByName("heroBackground")[0],
        mktoTitle = iframeDocument.getElementsByName("title")[0],
        mktoSubtitle = iframeDocument.getElementsByName("subtitle")[0],
        mktoTexts = iframeBody.getElementsByClassName("mktoText"),
        mktoRichTexts = iframeBody.getElementsByClassName("richTextSpan"),
        mktoButton = iframeDocument.getElementsByName("button")[0],
        mktoButtons = iframeBody.getElementsByTagName("button");
        
        if (!isMktoBackgroundColorReplaced
           && color
           && mktoHeader) {
          
          console.log("Marketo App > Overlaying: Landing Page Header Background Company Color for Demo Svcs Template");
          mktoHeader.setAttribute("style", mktoHeader.getAttribute("style") + "; background: " + linearGradient + ";");
          isMktoBackgroundColorReplaced = true;
          isMktoFreeForm = false;
        } else if (!isMktoBackgroundColorReplaced
           && color
           && !bannerBackground
           && iframeBody.id == mktoBodyId
           && iframeBody.className != null
           && iframeBody.getElementsByTagName("div")
           && iframeBody.getElementsByTagName("div")[0]
           && iframeBody.getElementsByTagName("div")[0].style) {
          if (iframeBody.className.search(mktoFreeFormClassName) != -1) {
            console.log("Marketo App > Overlaying: Freeform Landing Page Background Company Color");
            iframeBody.getElementsByTagName("div")[0].style.backgroundColor = color + " !important";
            isMktoBackgroundColorReplaced = isMktoFreeForm = true;
          } else {
            console.log("Marketo App > Overlaying: Guided Landing Page Background Company Color");
            iframeBody.getElementsByTagName("div")[0].style.background = linearGradient;
            isMktoBackgroundColorReplaced = true;
            isMktoFreeForm = false;
          }
          iframeDocument.getElementsByTagName("head")[0].appendChild(formButtonStyle);
        }
        
        if (!isMktoImgReplaced
           && logo
           && ((mktoLogo1
               || mktoLogo2)
             || mktoImgs.length != 0)) {
          
          if (mktoLogo1
             || mktoLogo2) {
            console.log("Marketo App > Overlaying: Landing Page Company Logo for Demo Svcs Template");
            
            if (mktoLogo1
               && mktoLogo1.getAttribute("display") != "none") {
              console.log("Marketo App > Overlaying: Landing Page Company Logo 1");
              mktoLogo1.style.width = "auto";
              mktoLogo1.style.height = "auto";
              mktoLogo1.setAttribute("src", logo);
              isMktoImgReplaced = true;
            }
            
            if (mktoLogo2
               && mktoLogo2.getAttribute("display") != "none") {
              console.log("Marketo App > Overlaying: Landing Page Company Logo 2");
              mktoLogo2.style.width = "auto";
              mktoLogo2.style.height = "auto";
              mktoLogo2.setAttribute("src", logo);
              isMktoImgReplaced = true;
            }
          } else {
            for (var ii = 0; ii < mktoImgs.length; ii++) {
              var currMktoImg = mktoImgs[ii];
              
              if (currMktoImg
                 && currMktoImg.src
                 && currMktoImg.parentNode
                 && currMktoImg.parentNode.tagName == "DIV"
                 && currMktoImg.parentNode.id.search(logoRegex) != -1) {
                console.log("Marketo App > Overlaying: Guided Landing Page Company Logo");
                currMktoImg.style.width = "auto";
                currMktoImg.style.height = "auto";
                currMktoImg.setAttribute("src", logo);
                isMktoImgReplaced = true;
                break;
              } else if (currMktoImg
                 && currMktoImg.src
                 && currMktoImg.parentNode
                 && currMktoImg.parentNode.tagName == "SPAN"
                 && currMktoImg.parentNode.parentNode
                 && currMktoImg.parentNode.parentNode.className.search(logoRegex) != -1) {
                console.log("Marketo App > Overlaying: Freeform Landing Page Company Logo");
                currMktoImg.style.width = "auto";
                currMktoImg.style.height = "auto";
                currMktoImg.setAttribute("src", logo);
                isMktoImgReplaced = true;
                break;
              }
            }
          }
        }
        
        if (!isMktoHeroBgImgReplaced
           && heroBackground
           && (mktoHeroBg
             || mktoImgs.length != 0)) {
          
          if (mktoHeroBg
             && mktoHeroBg.getAttribute("src")) {
            
            console.log("Marketo App > Overlaying: Guided Landing Page Hero Company Background for Demo Svcs Template");
            mktoHeroBg.setAttribute("src", heroBackground);
            isMktoHeroBgImgReplaced = true;
          } else {
            for (var ii = 0; ii < mktoImgs.length; ii++) {
              var currMktoImg = mktoImgs[ii];
              
              if (currMktoImg.getAttribute("src")
                 && currMktoImg.getAttribute("id")
                 && currMktoImg.getAttribute("id").search(heroBgImgIdRegex) != -1) {
                
                console.log("Marketo App > Overlaying: Guided Landing Page Hero Company Background");
                currMktoImg.setAttribute("src", heroBackground);
                isMktoHeroBgImgReplaced = true;
                break;
              }
            }
          }
        }
        
        /*
        if ((!isMktoSubTextReplaced
             || !isMktoTextReplaced)
           && (mktoTitle
             || mktoSubtitle
             || mktoTexts.length != 0)
           || mktoRichTexts.length != 0) {
          
          if (mktoTitle) {
            console.log("Marketo App > Overlaying: Landing Page Company Name in Title for Demo Svcs Template");
            mktoTitle.innerHTML = mktoMainText;
            isMktoTextReplaced = true;
          }
          
          if (mktoSubtitle) {
            console.log("Marketo App > Overlaying: Landing Page Company Today's Date in Subtitle for Demo Svcs Template");
            mktoSubtitle.innerHTML = mktoSubText;
            isMktoSubTextReplaced = true;
          }
          
          if (!mktoSubtitle
             && !mktoTitle) {
            
            if (mktoTexts.length != 0) {
              for (var ii = 0; ii < mktoTexts.length; ii++) {
                var currMktoText = mktoTexts[ii];
                
                if (!isMktoTextReplaced
                   && currMktoText
                   && currMktoText.childNodes
                   && currMktoText.childNodes[0]
                   && currMktoText.childNodes[0].innerHTML
                   && currMktoText.id.search(mktoMainTextDivIdRegex) != -1) {
                  console.log("Marketo App > Overlaying: Guided Landing Page Company Name in Title");
                  currMktoText.childNodes[0].innerHTML = mktoMainText;
                  isMktoTextReplaced = true;
                }
                
                if (!isMktoSubTextReplaced
                   && currMktoText
                   && currMktoText.innerHTML
                   && currMktoText.childElementCount != null
                   && currMktoText.id.search(mktoSubTextDivIdRegex) != -1) {
                  if (!currMktoText.childElementCount) {
                    console.log("Marketo App > Overlaying: Guided Landing Page Company Today's Date in Subtitle");
                    if (currMktoText.innerHTML) {
                      currMktoText.innerHTML = mktoSubText;
                    } else {
                      currMktoText.parentNode.innerHTML = mktoSubText;
                    }
                    isMktoSubTextReplaced = true;
                  } else if (currMktoText.childNodes
                     && currMktoText.childNodes[0]) {
                    if (!currMktoText.childNodes[0].childElementCount) {
                      console.log("Marketo App > Overlaying: Guided Landing Page Company Today's Date in Subtitle");
                      if (currMktoText.childNodes[0].innerHTML) {
                        currMktoText.childNodes[0].innerHTML = mktoSubText;
                      } else {
                        currMktoText.innerHTML = mktoSubText;
                      }
                      isMktoSubTextReplaced = true;
                    } else if (currMktoText.childNodes[0].childNodes
                       && currMktoText.childNodes[0].childNodes[0]
                       && !currMktoText.childNodes[0].childNodes[0].childElementCount) {
                      console.log("Marketo App > Overlaying: Guided Landing Page Company Today's Date in Subtitle");
                      if (currMktoText.childNodes[0].childNodes[0].innerHTML) {
                        currMktoText.childNodes[0].childNodes[0].innerHTML = mktoSubText;
                      } else {
                        currMktoText.childNodes[0].innerHTML = mktoSubText;
                      }
                      isMktoSubTextReplaced = true;
                    }
                  }
                }
                
                if (isMktoSubTextReplaced
                   && isMktoTextReplaced) {
                  break;
                }
              }
            }
            
            if (mktoRichTexts.length != 0) {
              for (var ii = 0; ii < mktoRichTexts.length; ii++) {
                var currMktoRichText = mktoRichTexts[ii];
                
                if (currMktoRichText
                   && currMktoRichText.innerHTML
                   && currMktoRichText.childElementCount != null
                   && currMktoRichText.parentNode
                   && currMktoRichText.parentNode.tagName == "DIV") {
                  if (!isMktoTextReplaced
                     && currMktoRichText.parentNode.className.search(mktoRichMainTextDivClassNameRegex) != -1) {
                    if (!currMktoRichText.childElementCount) {
                      console.log("Marketo App > Overlaying: Freeform Landing Page Company Name in Title");
                      if (currMktoRichText.innerHTML) {
                        currMktoRichText.innerHTML = mktoMainText;
                      } else {
                        currMktoRichText.parentNode.innerHTML = mktoMainText;
                      }
                      isMktoTextReplaced = true;
                    } else if (currMktoRichText.childNodes
                       && currMktoRichText.childNodes[0]) {
                      if (!currMktoRichText.childNodes[0].childElementCount) {
                        console.log("Marketo App > Overlaying: Freeform Landing Page Company Name in Title");
                        if (currMktoRichText.childNodes[0].innerHTML) {
                          currMktoRichText.childNodes[0].innerHTML = mktoMainText;
                        } else {
                          currMktoRichText.innerHTML = mktoMainText;
                        }
                        isMktoTextReplaced = true;
                      } else if (currMktoRichText.childNodes[0].childNodes
                         && currMktoRichText.childNodes[0].childNodes[0]
                         && !currMktoRichText.childNodes[0].childNodes[0].childElementCount) {
                        console.log("Marketo App > Overlaying: Freeform Landing Page Company Name in Title");
                        if (currMktoRichText.childNodes[0].childNodes[0].innerHTML) {
                          currMktoRichText.childNodes[0].childNodes[0].innerHTML = mktoMainText;
                        } else {
                          currMktoRichText.childNodes[0].innerHTML = mktoMainText;
                        }
                        isMktoTextReplaced = true;
                      }
                    }
                  }
                  
                  if (!isMktoSubTextReplaced
                     && currMktoRichText.parentNode.className.search(mktoRichSubTextDivClassNameRegex) != -1) {
                    if (!currMktoRichText.childElementCount) {
                      console.log("Marketo App > Overlaying: Freeform Landing Page Company Today's Date in Subtitle");
                      if (currMktoRichText.innerHTML) {
                        currMktoRichText.innerHTML = mktoSubText;
                      } else {
                        currMktoRichText.parentNode.innerHTML = mktoSubText;
                      }
                      isMktoSubTextReplaced = true;
                    } else if (currMktoRichText.childNodes
                       && currMktoRichText.childNodes[0]) {
                      if (!currMktoRichText.childNodes[0].childElementCount) {
                        console.log("Marketo App > Overlaying: Freeform Landing Page Company Today's Date in Subtitle");
                        if (currMktoRichText.childNodes[0].innerHTML) {
                          currMktoRichText.childNodes[0].innerHTML = mktoSubText;
                        } else {
                          currMktoRichText.innerHTML = mktoSubText;
                        }
                        isMktoSubTextReplaced = true;
                      } else if (currMktoRichText.childNodes[0].childNodes
                         && currMktoRichText.childNodes[0].childNodes[0]
                         && !currMktoRichText.childNodes[0].childNodes[0].childElementCount) {
                        console.log("Marketo App > Overlaying: Freeform Landing Page Company Today's Date in Subtitle");
                        if (currMktoRichText.childNodes[0].childNodes[0].innerHTML) {
                          currMktoRichText.childNodes[0].childNodes[0].innerHTML = mktoSubText;
                        } else {
                          currMktoRichText.childNodes[0].innerHTML = mktoSubText;
                        }
                        isMktoSubTextReplaced = true;
                      }
                    }
                  }
                }
                
                if (isMktoSubTextReplaced
                   && isMktoTextReplaced) {
                  break;
                }
              }
            }
          }
        }
        */
        
        if (!isMktoButtonReplaced
           && color
           && (mktoButton
             || mktoButtons.length != 0)) {
          
          if (mktoButton) {
            console.log("Marketo App > Overlaying: Landing Page Button Company Color for Demo Svcs Template");
            mktoButton.setAttribute("style", currMktoButton.getAttribute("style") + "; background-color: " + color + " !important; border-color: " + color + " !important;");
            isMktoButtonReplaced = true;
          } else {
            for (var ii = 0; ii < mktoButtons.length; ii++) {
              var currMktoButton = mktoButtons[ii];
              
              if (currMktoButton
                 && currMktoButton.style
                 && currMktoButton.style.backgroundColor != null
                 && currMktoButton.innerHTML
                 && currMktoButton.innerHTML.search(buttonTextRegex) != -1) {
                console.log("Marketo App > Overlaying: Landing Page Button Company Color");
                currMktoButton.setAttribute("style", currMktoButton.getAttribute("style") + "; background-color: " + color + " !important; border-color: " + color + " !important;");
                isMktoButtonReplaced = true;
                break;
              }
            }
          }
        }
      }
      
      if (logoImg
         && textBackground
         && textBackground.style
         && bannerBackground
         && bannerBackground.style
         && mainTitle
         && subTitle) {
        console.log("Marketo App > Overlaying: Original Landing Page Company Logo & Color");
        if (logo) {
          logoImg.src = logo;
          
          logoImg.onload = function () {
            var logoHeightsRatio,
            logoWidth,
            logoNewWidth,
            logoNewHeight,
            logoStyle;
            
            if (logoImg.naturalHeight
               && logoImg.naturalHeight > logoOrigMaxHeight) {
              logoHeightsRatio = logoImg.naturalHeight / logoOrigMaxHeight;
              logoWidth = logoImg.naturalWidth / logoHeightsRatio;
              logoImg.width = logoImg.style.width = logoNewWidth = logoWidth;
              logoImg.height = logoImg.style.height = logoNewHeight = logoOrigMaxHeight;
            } else if (logoImg.naturalHeight) {
              logoImg.width = logoImg.style.width = logoNewWidth = logoImg.naturalWidth;
              logoImg.height = logoImg.style.height = logoNewHeight = logoImg.naturalHeight;
            } else {
              logoImg.width = logoImg.height = logoImg.style.width = logoImg.style.height = logoNewWidth = logoNewHeight = logoOrigMaxHeight;
            }
            
            if (iframeDocument.getElementsByTagName("head")
               && iframeDocument.getElementsByTagName("head")[0]) {
              logoStyle = document.createElement("style");
              logoStyle.innerHTML = "#" + logoImg.id + " {width : " + logoNewWidth + "px !important; height : " + logoNewHeight + "px !important;}";
              iframeDocument.getElementsByTagName("head")[0].appendChild(logoStyle);
            }
            console.log("Marketo App > Overlaying: Original Landing Page Company Logo Dimensions = " + logoNewWidth + " x " + logoNewHeight);
          };
        }
        
        if (color) {
          textBackground.style.backgroundColor = color;
          bannerBackground.style.backgroundColor = color;
          iframeDocument.getElementsByTagName("head")[0].appendChild(formButtonStyle);
        }
        mainTitle.innerHTML = mktoMainText;
        subTitle.innerHTML = mktoSubText;
        isMktoOrigReplaced = isMktoFreeForm = true;
      }
      
      if ((isMktoButtonReplaced
           //&& isMktoSubTextReplaced
           //&& isMktoTextReplaced
           && isMktoHeroBgImgReplaced
           && isMktoImgReplaced
           && isMktoBackgroundColorReplaced)
         || isMktoOrigReplaced) {
        clearOverlayVars();
        return true;
      }
    }
    return false;
  };
  
  isLandingPageEditor = window.setInterval(function () {
      if (action == "edit") {
        console.log("Marketo App > Overlaying: Landing Page Designer");
        
        if (document.getElementsByTagName("iframe")[0]
           && document.getElementsByTagName("iframe")[0].contentWindow
           && document.getElementsByTagName("iframe")[0].contentWindow.document
           && document.getElementsByTagName("iframe")[0].contentWindow.document.readyState == "complete") {
          if (overlay(document.getElementsByTagName("iframe")[0].contentWindow.document)
             || desktopRepeatReadyCount >= maxRepeatReady) {
            
            console.log("Marketo App > Overlayed: Landing Page Desktop Designer = " + desktopRepeatReadyCount);
            isDesktopReplaced = true;
            clearOverlayVars();
          } else if (desktopPrevReady) {
            desktopRepeatReadyCount++;
          } else {
            desktopRepeatReadyCount = 1;
          }
          desktopPrevReady = true;
        } else {
          desktopPrevReady = false;
        }
        
        if (isMktoFreeForm
           && !isPhoneReplaced
           && document.getElementsByTagName("iframe")[1]
           && document.getElementsByTagName("iframe")[1].contentWindow
           && document.getElementsByTagName("iframe")[1].contentWindow.document
           && document.getElementsByTagName("iframe")[1].contentWindow.document.readyState == "complete") {
          if (overlay(document.getElementsByTagName("iframe")[1].contentWindow.document)
             || phoneRepeatReadyCount >= maxRepeatReady) {
            
            console.log("Marketo App > Overlayed: Freeform Landing Page Phone Designer = " + phoneRepeatReadyCount);
            isPhoneReplaced = true;
            clearOverlayVars();
          } else if (phonePrevReady) {
            phoneRepeatReadyCount++;
          } else {
            phoneRepeatReadyCount = 1;
          }
          phonePrevReady = true;
        } else {
          phonePrevReady = false;
        }
        
        if ((!isMktoFreeForm
             && isDesktopReplaced
             && !document.getElementsByTagName("iframe")[1].contentWindow.document.getElementsByTagName("body")[0].innerHTML)
           || (isMktoFreeForm
             && isPhoneReplaced
             && isDesktopReplaced)) {
          
          console.log("Marketo App > Overlaying: Landing Page Interval is Cleared");
          window.clearInterval(isLandingPageEditor);
          clearOverlayVars();
          return true;
        }
      } else if (action == "preview") {
        console.log("Marketo App > Overlaying: Landing Page Previewer");
        
        if (!isDesktopReplaced
           && document.getElementsByTagName("iframe")[2]
           && document.getElementsByTagName("iframe")[2].contentWindow
           && document.getElementsByTagName("iframe")[2].contentWindow.document
           && document.getElementsByTagName("iframe")[2].contentWindow.document.readyState == "complete") {
          if (overlay(document.getElementsByTagName("iframe")[2].contentWindow.document)
             || desktopRepeatReadyCount >= maxRepeatReady) {
            
            console.log("Marketo App > Overlayed: Landing Page Desktop Preview = " + desktopRepeatReadyCount);
            isDesktopReplaced = true;
            clearOverlayVars();
          } else if (desktopPrevReady) {
            desktopRepeatReadyCount++;
          } else {
            desktopRepeatReadyCount = 1;
          }
          desktopPrevReady = true;
        } else {
          desktopPrevReady = false;
        }
        
        if (!isPhoneReplaced
           && document.getElementsByTagName("iframe")[3]
           && document.getElementsByTagName("iframe")[3].contentWindow
           && document.getElementsByTagName("iframe")[3].contentWindow.document
           && document.getElementsByTagName("iframe")[3].contentWindow.document.readyState == "complete") {
          if (overlay(document.getElementsByTagName("iframe")[3].contentWindow.document)
             || phoneRepeatReadyCount >= maxOtherRepeatReady) {
            
            console.log("Marketo App > Overlayed: Landing Page Phone Preview = " + phoneRepeatReadyCount);
            isPhoneReplaced = true;
            clearOverlayVars();
          } else if (phonePrevReady) {
            phoneRepeatReadyCount++;
          } else {
            phoneRepeatReadyCount = 1;
          }
          phonePrevReady = true;
        } else {
          phonePrevReady = false;
        }
        
        if (!isSideBySideDesktopReplaced
           && document.getElementsByTagName("iframe")[0]
           && document.getElementsByTagName("iframe")[0].contentWindow
           && document.getElementsByTagName("iframe")[0].contentWindow.document
           && document.getElementsByTagName("iframe")[0].contentWindow.document.readyState == "complete") {
          if (overlay(document.getElementsByTagName("iframe")[0].contentWindow.document)
             || sideBySideDesktopRepeatReadyCount >= maxOtherRepeatReady) {
            
            console.log("Marketo App > Overlayed: Landing Page Side by Side Desktop Preview = " + sideBySideDesktopRepeatReadyCount);
            isSideBySideDesktopReplaced = true;
            clearOverlayVars();
          } else if (sideBySideDesktopPrevReady) {
            sideBySideDesktopRepeatReadyCount++;
          } else {
            sideBySideDesktopRepeatReadyCount = 1;
          }
          sideBySideDesktopPrevReady = true;
        } else {
          sideBySideDesktopPrevReady = false;
        }
        
        if (!isSideBySidePhoneReplaced
           && document.getElementsByTagName("iframe")[1]
           && document.getElementsByTagName("iframe")[1].contentWindow
           && document.getElementsByTagName("iframe")[1].contentWindow.document
           && document.getElementsByTagName("iframe")[1].contentWindow.document.readyState == "complete") {
          if (overlay(document.getElementsByTagName("iframe")[1].contentWindow.document)
             || sideBySidePhoneRepeatReadyCount >= maxOtherRepeatReady) {
            
            console.log("Marketo App > Overlayed: Landing Page Side by Side Phone Preview = " + sideBySidePhoneRepeatReadyCount);
            isSideBySidePhoneReplaced = true;
            clearOverlayVars();
          } else if (sideBySidePhonePrevReady) {
            sideBySidePhoneRepeatReadyCount++;
          } else {
            sideBySidePhoneRepeatReadyCount = 1;
          }
          sideBySidePhonePrevReady = true;
        } else {
          sideBySidePhonePrevReady = false;
        }
        
        if (isSideBySidePhoneReplaced
           && isSideBySideDesktopReplaced
           && isPhoneReplaced
           && isDesktopReplaced) {
          console.log("Marketo App > Overlaying: Landing Page Interval is Cleared");
          window.clearInterval(isLandingPageEditor);
          clearOverlayVars();
          return true;
        }
      }
    }, 0);
};

/**************************************************************************************
 *
 *  This function overlays an email with the user submitted company logo and color.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {String} action - The mode in which this asset is being viewed (edit/preview).
 *
 **************************************************************************************/

APP.overlayEmail = function (action) {
  console.log("Marketo App > Overlaying: Email");
  
  var isEmailEditor2,
  clearOverlayVars,
  overlay,
  isMktoHeaderBgColorReplaced = isMktoImgReplaced = isMktoHeroBgReplaced = isMktoTextReplaced = isMktoSubTextReplaced = isMktoButtonReplaced = isMktoEmail1Replaced = editorPrevReady = desktopPrevReady = phonePrevReady = isDesktopPreviewReplaced = isPhonePreviewReplaced = false,
  logoMktoNameRegex = new RegExp("logo", "i"),
  //mainTitleMktoNameRegex = new RegExp("^main title$|^mainTitle$|^main-title$|^hero title$|^heroTitle$|^hero-title$|^title$", "i"),
  //subTitleMktoNameRegex = new RegExp("^subtitle$|^sub-title$|^hero subtitle$|^heroSubtitle$|^hero-subtitle$", "i"),
  buttonTextRegex = new RegExp("signup|sign up|call to action|cta|register|more|contribute", "i"),
  saveEditsToggle = APP.getCookie("saveEditsToggleState"),
  logo = APP.getCookie("logo"),
  heroBackground = APP.getCookie("heroBackground"),
  color = APP.getCookie("color"),
  defaultColor = "rgb(42, 83, 112)",
  logoMaxHeight = "55",
  mktoMainText = "You To The<br><br>PREMIER BUSINESS EVENT<br>OF THE YEAR",
  mktoSubText = APP.getHumanDate(),
  company,
  companyName,
  editorRepeatReadyCount = desktopRepeatReadyCount = phoneRepeatReadyCount = 0,
  maxRepeatReady = 2000,
  maxPreviewRepeatReady = 3000;
  
  if (saveEditsToggle == "true"
     || (logo == null
       && heroBackground == null
       && color == null)) {
    return false;
  }
  if (logo != null) {
    company = logo.split("https://logo.clearbit.com/")[1].split(".")[0];
    companyName = company.charAt(0).toUpperCase() + company.slice(1);
    mktoMainText = companyName + " Invites " + mktoMainText;
  } else {
    mktoMainText = "We Invite " + mktoMainText;
  }
  
  clearOverlayVars = function () {
    isMktoHeaderBgColorReplaced = isMktoImgReplaced = isMktoHeroBgReplaced = isMktoTextReplaced = isMktoSubTextReplaced = isMktoButtonReplaced = isMktoEmail1Replaced = false;
    emailBody = mktoImgs = mktoTexts = mktoButtons = logoSwapCompany = logoSwapContainer = logoSwapCompanyContainer = logoBkg = buttonBkg = null;
  };
  
  overlay = function (emailDocument) {
    if (emailDocument) {
      var emailBody = emailDocument.getElementsByTagName("body")[0],
      logoSwapCompany = emailDocument.getElementById("logo-swap-company"),
      logoSwapContainer = emailDocument.getElementById("logo-swap-container"),
      logoSwapCompanyContainer = emailDocument.getElementById("logo-swap-company-container"),
      logoBkg = emailDocument.getElementById("logo-bkg"),
      buttonBkg = emailDocument.getElementById("button-bkg");
      
      if (emailBody
         && emailBody.innerHTML) {
        var mktoHeader = emailDocument.getElementsByName("header")[0],
        mktoLogo1 = emailDocument.getElementsByName("logo")[0],
        mktoLogo2 = emailDocument.getElementsByName("logo")[1],
        mktoImgs = emailBody.getElementsByClassName("mktoImg"),
        mktoHeroBg = emailDocument.getElementsByName("heroBackground")[0],
        mktoTds = emailBody.getElementsByTagName("td"),
        mktoTitle = emailDocument.getElementsByName("title")[0],
        mktoSubtitle = emailDocument.getElementsByName("subtitle")[0],
        mktoTexts = emailBody.getElementsByClassName("mktoText"),
        mktoButton = emailDocument.getElementsByName("button")[0],
        mktoButtons = emailBody.getElementsByClassName("secondary-font button");
        
        if (!isMktoHeaderBgColorReplaced
           && color
           && mktoHeader) {
          
          console.log("Marketo App > Overlaying: Email 2.0 Header Background Company Color for Demo Svcs Template");
          mktoHeader.style.setProperty("background-color", color);
          mktoHeader.setAttribute("bgColor", color);
          isMktoHeaderBgColorReplaced = true;
        }
        
        if (!isMktoImgReplaced
           && logo
           && ((mktoLogo1
               || mktoLogo2)
             || mktoImgs.length != 0)) {
          
          if (mktoLogo1
             || mktoLogo2) {
            console.log("Marketo App > Overlaying: Email 2.0 Company Logo for Demo Svcs Template");
            
            if (mktoLogo1
               && mktoLogo1.getAttribute("display") != "none") {
              console.log("Marketo App > Overlaying: Email 2.0 Company Logo 1");
              mktoLogo1.style.width = "auto";
              mktoLogo1.style.height = "auto";
              mktoLogo1.setAttribute("src", logo);
              isMktoImgReplaced = true;
            }
            
            if (mktoLogo2
               && mktoLogo2.getAttribute("display") != "none") {
              console.log("Marketo App > Overlaying: Email 2.0 Company Logo 2");
              mktoLogo2.style.width = "auto";
              mktoLogo2.style.height = "auto";
              mktoLogo2.setAttribute("src", logo);
              isMktoImgReplaced = true;
            }
          } else {
            for (var ii = 0; ii < mktoImgs.length; ii++) {
              var currMktoImg = mktoImgs[ii],
              currMktoImgMktoName;
              
              if (currMktoImg.getAttribute("mktoname")) {
                currMktoImgMktoName = currMktoImg.getAttribute("mktoname");
              } else if (currMktoImg.getAttribute("id")) {
                currMktoImgMktoName = currMktoImg.getAttribute("id");
              }
              
              if (currMktoImgMktoName
                 && currMktoImgMktoName.search(logoMktoNameRegex) != -1) {
                var currMktoImgTag = currMktoImg.getElementsByTagName("img")[0];
                
                if (currMktoImgTag
                   && currMktoImgTag.getAttribute("src")) {
                  console.log("Marketo App > Overlaying: Email 2.0 Company Logo");
                  currMktoImgTag.style.width = "auto";
                  currMktoImgTag.style.height = "auto";
                  currMktoImgTag.setAttribute("src", logo);
                  isMktoImgReplaced = true;
                  break;
                }
              }
            }
          }
        }
        
        if (!isMktoHeroBgReplaced
           && heroBackground
           && (mktoHeroBg
             || mktoTds.length != 0)) {
          
          if (mktoHeroBg) {
            console.log("Marketo App > Overlaying: Email 2.0 Hero Company Background for Demo Svcs Template");
            mktoHeroBg.style.setProperty("background-image", "url('" + heroBackground + "')");
            mktoHeroBg.setAttribute("background", heroBackground);
            //mktoHeroBg.style.setProperty("background-size", "cover");
            isMktoHeroBgReplaced = true;
          } else {
            for (var ii = 0; ii < mktoTds.length; ii++) {
              var currMktoTd = mktoTds[ii];
              
              if (currMktoTd
                 && currMktoTd.getAttribute("background")) {
                
                console.log("Marketo App > Overlaying: Email 2.0 Hero Company Background");
                currMktoTd.setAttribute("background", heroBackground);
                currMktoTd.style.setProperty("background-image", "url('" + heroBackground + "')");
                //currMktoTd.style.setProperty("background-size", "cover");
                isMktoHeroBgReplaced = true;
                break;
              }
            }
          }
        }
        
        /*
        if ((!isMktoSubTextReplaced
             || !isMktoTextReplaced)
           && (mktoTitle
             || mktoSubtitle
             || mktoTexts.length != 0)) {
          
          if (mktoTitle) {
            console.log("Marketo App > Overlaying: Email 2.0 Company Name in Title for Demo Svcs Template");
            mktoTitle.innerHTML = mktoMainText;
            isMktoTextReplaced = true;
          }
          
          if (mktoSubtitle) {
            console.log("Marketo App > Overlaying: Email 2.0 Company Today's Date in Subtitle for Demo Svcs Template");
            mktoSubtitle.innerHTML = mktoSubText;
            isMktoSubTextReplaced = true;
          }
          
          if (!mktoSubtitle
             && !mktoTitle) {
            for (var ii = 0; ii < mktoTexts.length; ii++) {
              var currMktoText = mktoTexts[ii],
              currMktoTextMktoName;
              
              if (currMktoText.getAttribute("mktoname")) {
                currMktoTextMktoName = currMktoText.getAttribute("mktoname");
              } else if (currMktoText.getAttribute("id")) {
                currMktoTextMktoName = currMktoText.getAttribute("id");
              }
              
              if (currMktoTextMktoName
                 && currMktoTextMktoName.search(mainTitleMktoNameRegex) != -1) {
                if (currMktoText.innerHTML) {
                  console.log("Marketo App > Overlaying: Email 2.0 Company Name in Title");
                  currMktoText.innerHTML = mktoMainText;
                  isMktoTextReplaced = true;
                }
              } else if (currMktoTextMktoName
                 && currMktoTextMktoName.search(subTitleMktoNameRegex) != -1) {
                if (currMktoText.innerHTML) {
                  console.log("Marketo App > Overlaying: Email 2.0 Company Today's Date in Subtitle");
                  currMktoText.innerHTML = mktoSubText;
                  isMktoSubTextReplaced = true;
                }
              }
              
              if (isMktoSubTextReplaced
                 && isMktoTextReplaced) {
                break;
              }
            }
          }
        }
        */
        
        if (!isMktoButtonReplaced
           && color
           && (mktoButton
             || mktoButtons.length != 0)) {
          
          if (mktoButton) {
            console.log("Marketo App > Overlaying: Email 2.0 Button Company Color for Demo Svcs Template");
            mktoButton.style.setProperty("background-color", color);
            mktoButton.style.setProperty("border-color", color);
            isMktoButtonReplaced = true;
          } else {
            for (var ii = 0; ii < mktoButtons.length; ii++) {
              var currMktoButton = mktoButtons[ii];
              
              if (currMktoButton.innerHTML
                 && currMktoButton.innerHTML.search(buttonTextRegex) != -1) {
                if (currMktoButton.style
                   && currMktoButton.style.backgroundColor) {
                  console.log("Marketo App > Overlaying: Email 2.0 Button Company Color");
                  currMktoButton.style.backgroundColor = color;
                  currMktoButton.style.borderColor = color;
                  isMktoButtonReplaced = true;
                  break;
                }
              }
            }
          }
        }
      }
      
      if (logoSwapCompanyContainer
         && logoSwapContainer
         && logoSwapCompany
         && logoBkg) {
        console.log("Marketo App > Overlaying: Email 1.0 Company Logo & Color");
        if (color) {
          logoBkg.style.backgroundColor = color;
        }
        
        if (logo) {
          logoSwapCompany.setAttribute("src", logo);
          
          logoSwapCompany.onload = function () {
            var logoHeightsRatio,
            logoWidth,
            logoNewWidth,
            logoNewHeight,
            logoStyle;
            
            if (logoSwapCompany.naturalHeight
               && logoSwapCompany.naturalHeight > logoMaxHeight) {
              logoHeightsRatio = logoSwapCompany.naturalHeight / logoMaxHeight;
              logoWidth = logoSwapCompany.naturalWidth / logoHeightsRatio;
              logoSwapCompany.width = logoNewWidth = logoWidth;
              logoSwapCompany.height = logoNewHeight = logoMaxHeight;
            } else if (logoSwapCompany.naturalHeight) {
              logoSwapCompany.width = logoNewWidth = logoSwapCompany.naturalWidth;
              logoSwapCompany.height = logoNewHeight = logoSwapCompany.naturalHeight;
            } else {
              logoSwapCompany.width = logoSwapCompany.height = logoNewWidth = logoNewHeight = logoMaxHeight;
            }
            
            if (emailDocument.getElementsByTagName("head")
               && emailDocument.getElementsByTagName("head")[0]) {
              logoStyle = document.createElement("style");
              logoStyle.innerHTML = "#" + logoSwapCompany.id + " {width : " + logoNewWidth + "px !important; height : " + logoNewHeight + "px !important;}";
              emailDocument.getElementsByTagName("head")[0].appendChild(logoStyle);
            }
            console.log("Marketo App > Overlaying: Email 1.0 Company Logo Dimensions = " + logoNewWidth + " x " + logoNewHeight);
          }
          logoSwapContainer.style.display = "none";
          logoSwapCompanyContainer.style.display = "block";
        }
        
        if (buttonBkg
           && color) {
          buttonBkg.style.setProperty("background-color", color);
        }
        isMktoEmail1Replaced = true;
      }
      
      if ((isMktoButtonReplaced
           //&& isMktoSubTextReplaced
           //&& isMktoTextReplaced
           && isMktoImgReplaced
           && isMktoHeroBgReplaced
           && (!mktoHeader
             || (mktoHeader
               && isMktoHeaderBgColorReplaced)))
         || isMktoEmail1Replaced) {
        clearOverlayVars();
        return true;
      }
    }
    
    return false;
  };
  
  isEmailEditor2 = window.setInterval(function () {
      if (action == "edit") {
        console.log("Marketo App > Overlaying: Email Designer");
        if (document.getElementsByTagName("iframe")[0]
           && document.getElementsByTagName("iframe")[0].contentWindow
           && document.getElementsByTagName("iframe")[0].contentWindow.document
           && document.getElementsByTagName("iframe")[0].contentWindow.document.readyState == "complete") {
          if (overlay(document.getElementsByTagName("iframe")[0].contentWindow.document)
             || editorRepeatReadyCount >= maxRepeatReady) {
            
            console.log("Marketo App > Overlayed: Email Designer = " + editorRepeatReadyCount);
            console.log("Marketo App > Overlaying: Email Interval is Cleared");
            window.clearInterval(isEmailEditor2);
            clearOverlayVars();
            return true;
          } else if (editorPrevReady) {
            editorRepeatReadyCount++;
          } else {
            editorRepeatReadyCount = 1;
          }
          editorPrevReady = true;
        } else {
          editorPrevReady = false;
        }
      } else if (action == "preview") {
        console.log("Marketo App > Overlaying: Email Previewer");
        
        if (!isDesktopPreviewReplaced
           && document.getElementsByTagName("iframe")[2]
           && document.getElementsByTagName("iframe")[2].contentWindow
           && document.getElementsByTagName("iframe")[2].contentWindow.document
           && document.getElementsByTagName("iframe")[2].contentWindow.document.readyState == "complete") {
          if (overlay(document.getElementsByTagName("iframe")[2].contentWindow.document)
             || desktopRepeatReadyCount >= maxPreviewRepeatReady) {
            
            console.log("Marketo App > Overlayed: Email Desktop Preview = " + desktopRepeatReadyCount);
            isDesktopPreviewReplaced = true;
            clearOverlayVars();
          } else if (desktopPrevReady) {
            desktopRepeatReadyCount++;
          } else {
            desktopRepeatReadyCount = 1;
          }
          desktopPrevReady = true;
        } else {
          desktopPrevReady = false;
        }
        
        if (!isPhonePreviewReplaced
           && document.getElementsByTagName("iframe")[3]
           && document.getElementsByTagName("iframe")[3].contentWindow
           && document.getElementsByTagName("iframe")[3].contentWindow.document
           && document.getElementsByTagName("iframe")[3].contentWindow.document.readyState == "complete") {
          if (overlay(document.getElementsByTagName("iframe")[3].contentWindow.document)
             || phoneRepeatReadyCount >= maxPreviewRepeatReady) {
            
            console.log("Marketo App > Overlayed: Email Phone Preview = " + phoneRepeatReadyCount);
            isPhonePreviewReplaced = true;
            clearOverlayVars();
          } else if (phonePrevReady) {
            phoneRepeatReadyCount++;
          } else {
            phoneRepeatReadyCount = 1;
          }
          phonePrevReady = true;
        } else {
          phonePrevReady = false;
        }
        
        if (isPhonePreviewReplaced
           && isDesktopPreviewReplaced) {
          console.log("Marketo App > Overlaying: Email Interval is Cleared");
          window.clearInterval(isEmailEditor2);
          clearOverlayVars();
          return true;
        }
      }
    }, 0);
};

/**************************************************************************************
 *
 *  This function edits the variables within the Landing Page Editor for custom company.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {String} mode - Mode view (edit, preview)
 *  @param {Object} asset - The asset to be edited
 *
 **************************************************************************************/

APP.saveLandingPageEdits = function (mode, asset) {
  var saveEditsToggle = APP.getCookie("saveEditsToggleState"),
  logo = APP.getCookie("logo"),
  heroBackground = APP.getCookie("heroBackground"),
  color = APP.getCookie("color");
  
  if (saveEditsToggle == "true"
     && (logo != null
       || heroBackground != null
       || color != null)) {
    
    var httpRegEx = new RegExp("^http|^$", "i"),
    //textRegex = new RegExp("^[^#]|^$", "i"),
    colorRegex = new RegExp("^#[0-9a-f]{3,6}$|^rgb|^$", "i"),
    logoRegex = new RegExp("logo|headerLogo|header-logo|^$", "i"),
    heroBgRegex = new RegExp("heroBackground|hero-background|heroBkg|hero-bkg|heroBg|hero-bg|hero1Bg|hero-1-bg|hero1Bkg|hero-1-bkg|hero1Background|^$", "i"),
    //titleRegex = new RegExp("^(mainTitle|main-title|heroTitle|hero-title|title|)$", "i"),
    //subtitleRegex = new RegExp("^(subtitle|sub-title|heroSubtitle|hero-subtitle|)$", "i"),
    buttonBgColorRegex = new RegExp("^(heroButtonBgColor|hero-button-bg-color|heroButtonBackgroundColor|hero-button-background-color|heroBkgColor|hero-bkg-color|)$", "i"),
    buttonBorderColorRegex = new RegExp("^(heroButtonBorderColor|hero-button-border-color|heroBorderColor|hero-border-color|)$", "i"),
    headerBgColor = "headerBgColor",
    headerLogoImg = "headerLogoImg",
    heroBgImg = "heroBgImg",
    //heroTitle = "heroTitle",
    //heroSubtitle = "heroSubtitle",
    formButtonBgColor = "formButtonBgColor",
    footerLogoImg = "footerLogoImg",
    //title = "You To Our Event",
    //subtitle = APP.getHumanDate(),
    //company,
    //companyName,
    editAssetVars,
    waitForLoadMsg;
    
    waitForLoadMsg = new Ext.Window({
        closable: true,
        modal: true,
        width: 500,
        height: 250,
        cls: 'mktModalForm',
        title: "Please Wait for Page to Load",
        html: "<u>Saving Edits</u> <br>Wait until this page completely loads before closing. <br><br><u>To Disable This Feature:</u> <br>Clear the selected company via the MarketoLive extension.",
      });
    
    /*
    if (logo != null) {
      company = logo.split("https://logo.clearbit.com/")[1].split(".")[0];
      companyName = company.charAt(0).toUpperCase() + company.slice(1);
      title = companyName + " Invites " + title;
    } else {
      title = "We Invite " + title;
    }
    */
    
    editAssetVars = function (asset) {
      var assetVars = asset.getResponsiveVarValues();
      //isLandingPageEditorFragmentStore,
      //count = 0,
      //isTitleUpdated = isSubtitleUpdated = false;
      
      waitForLoadMsg.show();
      
      /*
      isLandingPageEditorComponentStore = window.setInterval(function () {
          if (asset.componentsStore
             && asset.componentsStore.getAt
             && asset.componentsStore.findExact
             && Mkt3.controller
             && Mkt3.controller.editor
             && Mkt3.controller.editor.predefinedLayoutLandingPage
             && Mkt3.controller.editor.predefinedLayoutLandingPage.LPEditorPredefinedLayout
             && Mkt3.controller.editor.predefinedLayoutLandingPage.LPEditorPredefinedLayout.prototype
             && Mkt3.controller.editor.predefinedLayoutLandingPage.LPEditorPredefinedLayout.prototype.updateRichTextComponent) {
            if (!isTitleUpdated
               && asset.componentsStore.findExact("name", "title")
               && asset.componentsStore.getAt(asset.componentsStore.findExact("name", "title"))
               && asset.componentsStore.getAt(asset.componentsStore.findExact("name", "title")).fragmentsStore
               && asset.componentsStore.getAt(asset.componentsStore.findExact("name", "title")).fragmentsStore.data
               && asset.componentsStore.getAt(asset.componentsStore.findExact("name", "title")).fragmentsStore.data.items
               && asset.componentsStore.getAt(asset.componentsStore.findExact("name", "title")).fragmentsStore.data.items[0]) {
              var newTitle = asset.componentsStore.getAt(asset.componentsStore.findExact("name", "title")).fragmentsStore.data.items[0];
              
              newTitle.data.content = newTitle.data.body = "<div>" + title + "</div>";
              Mkt3.controller.editor.predefinedLayoutLandingPage.LPEditorPredefinedLayout.prototype.updateRichTextComponent.call(Mkt3.app.controllers.get("Mkt3.controller.editor.predefinedLayoutLandingPage.LPEditorPredefinedLayout"), newTitle);
              isTitleUpdated = true;
            }
            
            if (!isSubtitleUpdated
               && asset.componentsStore.findExact("name", "subtitle")
               && asset.componentsStore.getAt(asset.componentsStore.findExact("name", "subtitle"))
               && asset.componentsStore.getAt(asset.componentsStore.findExact("name", "subtitle")).fragmentsStore
               && asset.componentsStore.getAt(asset.componentsStore.findExact("name", "subtitle")).fragmentsStore.data
               && asset.componentsStore.getAt(asset.componentsStore.findExact("name", "subtitle")).fragmentsStore.data.items
               && asset.componentsStore.getAt(asset.componentsStore.findExact("name", "subtitle")).fragmentsStore.data.items[0]) {
              var newSubtitle = asset.componentsStore.getAt(asset.componentsStore.findExact("name", "subtitle")).fragmentsStore.data.items[0];
              
              newSubtitle.data.content = newSubtitle.data.body = subtitle;
              Mkt3.controller.editor.predefinedLayoutLandingPage.LPEditorPredefinedLayout.prototype.updateRichTextComponent.call(Mkt3.app.controllers.get("Mkt3.controller.editor.predefinedLayoutLandingPage.LPEditorPredefinedLayout"), newSubtitle);
              isSubtitleUpdated = true;
            }
            
            if (count > 1000
               || (isSubtitleUpdated
                 && isTitleUpdated)) {
              console.log("Marketo App > Updated: Landing Page Title & Subtitle: " + count);
              window.clearInterval(isLandingPageEditorComponentStore);
            }
            
            count++;
          }
        }, 0);
        */
      
      asset.setResponsiveVarValue(headerBgColor, color);
      asset.setResponsiveVarValue(headerLogoImg, logo);
      asset.setResponsiveVarValue(heroBgImg, heroBackground);
      //asset.setResponsiveVarValue(heroTitle, title);
      //asset.setResponsiveVarValue(heroSubtitle, subtitle);
      asset.setResponsiveVarValue(formButtonBgColor, color);
      asset.setResponsiveVarValue(footerLogoImg, logo);
      
      for (var ii = 0; ii < Object.keys(assetVars).length; ii++) {
        var currVariableKey = Object.keys(assetVars)[ii],
        currVariableValue = Object.values(assetVars)[ii].toString();
        
        if (currVariableValue == null) {
          currVariableValue = "";
        }
        
        if (currVariableKey.search(logoRegex) != -1) {
          if (currVariableValue.search(httpRegEx) != -1) {
            waitForLoadMsg.show();
            asset.setResponsiveVarValue(currVariableKey, logo);
          }
        } else if (currVariableKey.search(heroBgRegex) != -1) {
          if (currVariableValue.search(httpRegEx) != -1) {
            waitForLoadMsg.show();
            asset.setResponsiveVarValue(currVariableKey, heroBackground);
          }
        /*} else if (currVariableKey.search(titleRegex) != -1) {
          if (currVariableValue.search(textRegex) != -1) {
            waitForLoadMsg.show();
            asset.setResponsiveVarValue(currVariableKey, title);
          }
        } else if (currVariableKey.search(subtitleRegex) != -1) {
          if (currVariableValue.search(textRegex) != -1) {
            waitForLoadMsg.show();
            asset.setResponsiveVarValue(currVariableKey, subtitle);
          }*/
        } else if (currVariableKey.search(buttonBgColorRegex) != -1) {
          if (currVariableValue.search(colorRegex) != -1) {
            waitForLoadMsg.show();
            asset.setResponsiveVarValue(currVariableKey, color);
          }
        } else if (currVariableKey.search(buttonBorderColorRegex) != -1) {
          if (currVariableValue.search(colorRegex) != -1) {
            waitForLoadMsg.show();
            asset.setResponsiveVarValue(currVariableKey, color);
          }
        }
      }
      
      if (waitForLoadMsg.isVisible()) {
        window.setTimeout(function () {
          //Mkt3.app.controllers.get("Mkt3.controller.editor.LandingPage").loadEditorView();
          waitForLoadMsg.hide();
        }, 7500);
      }
    };
    
    console.log("Marketo App > Editing: Landing Page Variables");
    
    if (mode == "edit") {
      if (asset) {
        editAssetVars(asset);
      } else {
        var isLandingPageEditorVariables = window.setInterval(function () {
            if (typeof(Mkt3) !== "undefined"
               && Mkt3
               && Mkt3.app
               && Mkt3.app.controllers
               && Mkt3.app.controllers.get("Mkt3.controller.editor.LandingPage")
               && Mkt3.app.controllers.get("Mkt3.controller.editor.LandingPage").getLandingPage()
               && Mkt3.app.controllers.get("Mkt3.controller.editor.LandingPage").getLandingPage().getResponsiveVarValues()
               && Mkt3.app.controllers.get("Mkt3.controller.editor.LandingPage").getLandingPage().setResponsiveVarValue
               && Mkt3.app.controllers.get("Mkt3.controller.editor.LandingPage").getLandingPage()) {
              console.log("Marketo App > Editing: Landing Page Editor Variables");
              
              window.clearInterval(isLandingPageEditorVariables);
              
              editAssetVars(Mkt3.app.controllers.get("Mkt3.controller.editor.LandingPage").getLandingPage());
            }
          }, 0);
      }
    } else if (mode == "preview") {
      console.log("Marketo App > Editing: Landing Page Previewer Variables");
    }
  }
};

/**************************************************************************************
 *
 *  This function edits the variables within the Email Editor for custom company.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {String} mode - Mode view (edit, preview)
 *  @param {Object} asset - The asset to be edited
 *
 **************************************************************************************/

APP.saveEmailEdits = function (mode, asset) {
  var saveEditsToggle = APP.getCookie("saveEditsToggleState"),
  logo = APP.getCookie("logo"),
  heroBackground = APP.getCookie("heroBackground"),
  color = APP.getCookie("color");
  
  if (saveEditsToggle == "true"
     && (logo != null
       || heroBackground != null
       || color != null)) {
    
    var httpRegEx = new RegExp("^http|^$", "i"),
    //textRegex = new RegExp("^[^#]|^$", "i"),
    colorRegex = new RegExp("^#[0-9a-f]{3,6}$|^rgb|^$", "i"),
    logoIds = ["heroLogo", "footerLogo", "headerLogo", "logoFooter", "logo"],
    heroBgRegex = new RegExp("heroBackground|hero-background|heroBkg|hero-bkg|heroBg|hero-bg", "i"),
    //titleIds = ["title", "heroTitle", "mainTitle"],
    //subtitleIds = ["subtitle", "herosubTitle"],
    headerBgColorRegex = new RegExp("^(headerBgColor|header-bg-color|headerBackgroundColor|header-background-color|headerBkgColor|header-bkg-color|)$", "i"),
    buttonBgColorRegex = new RegExp("^(heroButtonBgColor|hero-button-bg-color|heroButtonBackgroundColor|hero-button-background-color|heroBkgColor|hero-bkg-color|)$", "i"),
    buttonBorderColorRegex = new RegExp("^(heroButtonBorderColor|hero-button-border-color|heroBorderColor|hero-border-color|)$", "i"),
    logo = APP.getCookie("logo"),
    heroBackground = APP.getCookie("heroBackground"),
    color = APP.getCookie("color"),
    //title = "You To<br>PREMIER BUSINESS EVENT<br>OF THE YEAR",
    //subtitle = APP.getHumanDate(),
    //titleMatch,
    //company,
    //companyName,
    editHtml,
    editAssetVars,
    waitForLoadMsg,
    waitForReloadMsg;
    
    waitForLoadMsg = new Ext.Window({
        closable: true,
        modal: true,
        width: 500,
        height: 250,
        cls: 'mktModalForm',
        title: "Please Wait for Page to Load",
        html: "<u>Saving Edits to Hero Background & Button Background Color</u> <br>Wait until this page completely loads before closing. <br><br><u>To Disable This Feature:</u> <br>Clear the selected company via the MarketoLive extension.",
      });
    waitForReloadMsg = new Ext.Window({
        closable: true,
        modal: true,
        width: 500,
        height: 250,
        cls: 'mktModalForm',
        title: "Please Wait for Page to Reload",
        html: "<u>Saving Edits to Logo, Title, & Subtitle</u> <br>Wait for this page to reload automatically. <br><br><u>To Disable This Feature:</u> <br>Clear the selected company via the MarketoLive extension.",
      });
    
    /*
    if (logo != null) {
      company = logo.split("https://logo.clearbit.com/")[1].split(".")[0];
      companyName = company.charAt(0).toUpperCase() + company.slice(1);
      title = companyName + " Invites " + title;
      titleMatch = companyName + " Invites";
    } else {
      title = "We Invite " + title;
      titleMatch = "We Invite";
    }
    */
    
    editHtml = function () {
      APP.webRequest('/emaileditor/downloadHtmlFile2?xsrfId=' + MktSecurity.getXsrfId() + '&emailId=' + Mkt3.DL.dl.compId, null, 'GET', true, 'document', function (response) {
        var isLogoReplaced;
        //isTitleReplaced,
        //isSubtitleReplaced;
        
        if (logo) {
          for (var ii = 0; ii < logoIds.length; ii++) {
            var currElement = response.getElementById(logoIds[ii]);
            if (currElement
               && currElement.className.search("mktoImg") != -1
               && currElement.getElementsByTagName("img")[0]
               && currElement.getElementsByTagName("img")[0].getAttribute("src") != logo) {
              console.log("Marketo App > Replacing: Logo > " + logo);
              
              isLogoReplaced = true;
              currElement.getElementsByTagName("img")[0].setAttribute("src", logo);
            }
          }
        }
        
        /*
        if (title) {
          for (var ii = 0; ii < titleIds.length; ii++) {
            var currElement = response.getElementById(titleIds[ii]);
            if (currElement
               && currElement.className.search("mktoText") != -1
               && currElement.innerHTML != title
               && currElement.innerHTML.search(titleMatch) == -1) {
              console.log("Marketo App > Replacing: Title > " + title);
              
              isTitleReplaced = true;
              currElement.innerHTML = title;
              break;
            }
          }
        }
        
        if (subtitle) {
          for (var ii = 0; ii < subtitleIds.length; ii++) {
            var currElement = response.getElementById(subtitleIds[ii]);
            if (currElement
               && currElement.className.search("mktoText") == -1
               && currElement.innerHTML != subtitle
               && currElement.innerHTML.search(subtitle) != -1) {
              console.log("Marketo App > Replacing: Subtitle > " + subtitle);
              
              isSubtitleReplaced = true;
              currElement.innerHTML = subtitle;
              break;
            }
          }
        }
        */
        
        if (isLogoReplaced
           //|| isTitleReplaced
           //|| isSubtitleReplaced
           ) {
          var updateHtml;
          
          updateHtml = function () {
            APP.webRequest('/emaileditor/updateContent2', 'ajaxHandler=MktSession&mktReqUid=' + new Date().getTime() + Ext.id(null, ':') + '&emailId=' + Mkt3.DL.dl.compId + '&content=' + encodeURIComponent(new XMLSerializer().serializeToString(response)) + '&xsrfId=' + MktSecurity.getXsrfId(), 'POST', true, "", function (result) {
              console.log(result);
              window.stop();
              window.location.reload();
            });
          };
          
          if (waitForLoadMsg.isVisible()) {
            waitForLoadMsg.hide();
          }
          waitForReloadMsg.show();
          updateHtml();
        }
      });
    };
    
    editAssetVars = function (asset) {
      var assetVars = asset.getVariableValues();
      
      for (var ii = 0; ii < Object.keys(assetVars).length; ii++) {
        var currVariableKey = Object.keys(assetVars)[ii]
          currVariableValue = Object.values(assetVars)[ii];
        
        if (currVariableValue == null) {
          currVariableValue = "";
        }
        
        if (currVariableKey.search(heroBgRegex) != -1) {
          if (currVariableValue != heroBackground
             && currVariableValue.search(httpRegEx) != -1) {
            waitForLoadMsg.show();
            asset.setVariableValue(currVariableKey, heroBackground);
          }
        } else if (currVariableKey.search(headerBgColorRegex) != -1) {
          if (currVariableValue != color
             && currVariableValue.search(colorRegex) != -1) {
            waitForLoadMsg.show();
            asset.setVariableValue(currVariableKey, color);
          }
        } else if (currVariableKey.search(buttonBgColorRegex) != -1) {
          if (currVariableValue != color
             && currVariableValue.search(colorRegex) != -1) {
            waitForLoadMsg.show();
            asset.setVariableValue(currVariableKey, color);
          }
        } else if (currVariableKey.search(buttonBorderColorRegex) != -1) {
          if (currVariableValue != color
             && currVariableValue.search(colorRegex) != -1) {
            waitForLoadMsg.show();
            asset.setVariableValue(currVariableKey, color);
          }
        }
      }
      
      if (waitForLoadMsg.isVisible()) {
        window.setTimeout(function () {
          Mkt3.app.controllers.get("Mkt3.controller.editor.email2.EmailEditor").reloadEmail();
          waitForLoadMsg.hide();
        }, 7500);
      }
    };
    
    console.log("Marketo App > Editing: Email Variables");
    
    if (mode == "edit") {
      var isWebRequestSession = window.setInterval(function () {
          console.log("Marketo App > Waiting: Web Request Session Data");
          if (typeof(Mkt3) !== "undefined"
             && Mkt3
             && Mkt3.DL
             && Mkt3.DL.dl
             && Mkt3.DL.dl.compId
             && typeof(MktSecurity) !== "undefined"
             && MktSecurity
             && MktSecurity.getXsrfId()
             && typeof(Ext) !== "undefined"
             && Ext
             && Ext.id(null, ':')) {
            console.log("Marketo App > Editing: Email HTML");
            
            window.clearInterval(isWebRequestSession);
            
            editHtml();
          }
        }, 0);
      
      if (asset) {
        editAssetVars(asset);
      } else {
        var isEmailEditorVariables = window.setInterval(function () {
            console.log("Marketo App > Waiting: Email Editor Variables");
            if (!waitForReloadMsg.isVisible()
               && typeof(Mkt3) !== "undefined"
               && Mkt3
               && Mkt3.app
               && Mkt3.app.controllers
               && Mkt3.app.controllers.get("Mkt3.controller.editor.email2.EmailEditor")
               && Mkt3.app.controllers.get("Mkt3.controller.editor.email2.EmailEditor").getEmail()
               && Mkt3.app.controllers.get("Mkt3.controller.editor.email2.EmailEditor").getEmail().getVariableValues()
               && Object.keys(Mkt3.app.controllers.get("Mkt3.controller.editor.email2.EmailEditor").getEmail().getVariableValues()).length != 0
               && Mkt3.app.controllers.get("Mkt3.controller.editor.email2.EmailEditor").getEmail().setVariableValue) {
              console.log("Marketo App > Editing: Email Editor Variables");
              
              window.clearInterval(isEmailEditorVariables);
              
              editAssetVars(Mkt3.app.controllers.get("Mkt3.controller.editor.email2.EmailEditor").getEmail());
            }
          }, 0);
      }
    } else if (mode == "preview") {
      console.log("Marketo App > Editing: Email Previewer Variables");
    }
  }
};

/**************************************************************************************
 *
 *  This function disables saving for Revenue Cycle Models and issues a tracking
 *  request to Heap Analytics.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {String} assetType - Asset type (report, model)
 *  @param {String} mode - Mode view (edit, preview)
 *
 **************************************************************************************/

APP.disableAnalyticsSaving = function (assetType, mode) {
  console.log("Marketo App > Disabling: Analytics Saving for " + assetType);
  
  var isAnalyticsAsset;
  
  isAnalyticsAsset = window.setInterval(function () {
      if (typeof(MktCanvas) !== "undefined"
         && MktCanvas
         && MktCanvas.getActiveTab()
         && MktCanvas.getActiveTab().config
         && MktCanvas.getActiveTab().config.accessZoneId) {
        
        window.clearInterval(isAnalyticsAsset);
        
        var assetNode = MktCanvas.getActiveTab().config,
        heapEvent = {
          name: "",
          assetName: "",
          assetType: assetNode.compType,
          assetId: assetNode.expNodeId,
          workspaceId: assetNode.accessZoneId,
          workspaceName: ""
        },
        titleReplaceRegex = new RegExp("\\([^\\)]+\\)$");
        
        switch (mode) {
        case "edit":
          APP.disableSaving();
          APP.disableMenus();
          APP.hideToolbarItems();
          APP.disableFormSaveButtons();
          heapEvent.assetArea = "Editor";
          break;
          
        case "preview":
          APP.disableFormSaveButtons();
          heapEvent.assetArea = "Previewer";
          break;
          
        default:
          APP.disableSaving();
          APP.disableMenus();
          APP.hideToolbarItems();
          APP.disableFormSaveButtons();
          heapEvent.assetArea = "Full Screen";
        }
        
        switch (assetType) {
        case "report":
          heapEvent.assetName = assetNode.title;
          break;
          
        case "model":
          heapEvent.assetName = assetNode.satelliteTitle;
          if (heapEvent.assetName.search(titleReplaceRegex) != -1) {
            heapEvent.assetName = heapEvent.assetName.replace(titleReplaceRegex, "").trimRight();
          }
          
          if (heapEvent.assetName.search(/"/) != -1) {
            heapEvent.assetName = heapEvent.assetName.replace(/"/g, "");
          }
          break;
        }
        
        if (heapEvent.assetType.charAt(0).search(/[a-z]/) != -1) {
          var firstChar = heapEvent.assetType.charAt(0);
          
          heapEvent.assetType = firstChar.toUpperCase() + heapEvent.assetType.slice(1);
        }
        
        heapEvent.workspaceName = APP.getWorkspaceName(assetNode.accessZoneId);
        
        if (assetNode.accessZoneId.toString().search(mktoGoldenWorkspacesMatch) != -1) {
          heapEvent.name = heapEvent.workspaceName;
        } else if (assetNode.accessZoneId.toString().search(mktoMyWorkspaceIdMatch) != -1) {
          heapEvent.name = heapEvent.workspaceName;
          heapEvent.userFolder = userName;
        } else {
          heapEvent.name = mktoOtherWorkspaceName
        }
        
        APP.heapTrack("track", heapEvent);
      }
    }, 0);
};

/**************************************************************************************
 *
 *  This function disables saving for all asset types within the Designers edit mode
 *  and disables the harmful toolbar menu items and buttons in both edit and preview
 *  modes. It also issues a tracking request to Heap Analytics.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {String} assetType - Asset type (landingPage, email, form, pushNotification,
 *                              inAppMessage, smsMessage, socialApp, abTest)
 *  @param {String} mode - Mode view (edit, preview)
 *
 **************************************************************************************/

APP.disableDesignerSaving = function (assetType, mode) {
  console.log("Marketo App > Disabling: Designer (Edit/Preview) Saving & Toolbar Menus for " + assetType);
  
  var isAppController;
  
  isAppController = window.setInterval(function () {
      if (typeof(Mkt3) !== "undefined"
         && Mkt3
         && Mkt3.app
         && Mkt3.app.controllers
         && Mkt3.app.controllers.get) {
        
        window.clearInterval(isAppController);
        
        var disableDesignerAsset,
        assetNode,
        menuItems;
        
        disableDesignerAsset = function (assetNode, menuItems, disableFunc) {
          console.log("Marketo App > Executing: Disabling Designer (Edit/Preview)");
          
          var heapEvent = {
            name: "",
            assetName: "",
            assetType: assetNode.compType,
            assetId: assetNode.id,
            workspaceId: assetNode.accessZoneId,
            workspaceName: ""
          };
          
          switch (mode) {
          case "edit":
            heapEvent.assetArea = "Editor";
            break;
            
          case "preview":
            heapEvent.assetArea = "Previewer";
            break;
            
          default:
            heapEvent.assetArea = "Designer";
            break;
          }
          
          heapEvent.workspaceName = APP.getWorkspaceName(assetNode.accessZoneId);
          
          if (assetNode.accessZoneId.toString().search(mktoGoldenWorkspacesMatch) != -1) {
            heapEvent.name = heapEvent.workspaceName;
          } else if (assetNode.accessZoneId.toString().search(mktoMyWorkspaceIdMatch) != -1) {
            heapEvent.name = heapEvent.workspaceName;
            heapEvent.userFolder = userName;
          } else {
            heapEvent.name = mktoOtherWorkspaceName
          }
          
          if (assetNode.text.search(".") != -1) {
            heapEvent.assetName = assetNode.text.split(".")[1];
          } else {
            heapEvent.assetName = assetNode.text;
          }
          
          APP.heapTrack("track", heapEvent);
          
          if (assetNode.accessZoneId.toString().search(mktoGoldenWorkspacesMatch) != -1
             || toggleState == "false") {
            
            if (disableFunc) {
              disableFunc();
            }
            
            if (typeof(Ext4) !== "undefined"
               && Ext4
               && Ext4.ComponentQuery
               && Ext4.ComponentQuery.query) {
              var mItems = Ext4.ComponentQuery.query(menuItems.toString());
              
              if (mItems) {
                console.log("Marketo App > Disabling Designer Toolbar Menus");
                mItems.forEach(function (item) {
                  if (item) {
                    if (item.itemId == "createButton") {
                      item.setVisible(false);
                    } else {
                      item.setDisabled(true);
                    }
                  }
                });
              }
            }
          }
        };
        
        switch (assetType) {
        case "landingPage":
          switch (mode) {
          case "edit":
            var isLandingPageEditor = window.setInterval(function () {
                if (typeof(Mkt3.app.controllers.get("Mkt3.controller.editor.LandingPage")) !== "undefined"
                   && Mkt3.app.controllers.get("Mkt3.controller.editor.LandingPage")
                   && Mkt3.app.controllers.get("Mkt3.controller.editor.LandingPage").getLandingPage()
                   && Mkt3.app.controllers.get("Mkt3.controller.editor.LandingPage").getLandingPage().getNodeJson()) {
                  console.log("Marketo App > Disabling: Landing Page Editor: Saving & Toolbar Menus");
                  
                  window.clearInterval(isLandingPageEditor);
                  
                  var asset = Mkt3.app.controllers.get("Mkt3.controller.editor.LandingPage").getLandingPage();
                  assetNode = asset.getNodeJson();
                  menuItems = [
                    // Toolbar Menu
                    //"lpEditor toolbar [action=preview]", // Preview Draft
                    // Actions Menu
                    "lpEditor menu [action=approveAndClose]", // Approve and Close
                    "lpEditor menu [action=disableMobileVersion]", // Turn Off Mobile Version
                    //"lpEditor menu [action=editPageMeta]", // Edit Page Meta Tags
                    //"lpEditor menu [action=editFormSettings]", // Edit Form Settings
                    "lpEditor menu [action=uploadImage]", // Upload Image or File
                    "lpEditor menu [action=grabImages]", // Grab Images from Web
                    //"lpEditor menu [action=toggleGuides]", // Show Guides
                  ];
                  
                  disableDesignerAsset(assetNode, menuItems, APP.disablePropertyPanelSaving);
                  APP.overlayLandingPage("edit");
                  APP.saveLandingPageEdits("edit", asset);
                }
              }, 0);
            break;
            
          case "preview":
            var isLandingPagePreviewer = window.setInterval(function () {
                if (typeof(Mkt3.app.controllers.get("Mkt3.controller.previewer.LandingPage")) !== "undefined"
                   && Mkt3.app.controllers.get("Mkt3.controller.previewer.LandingPage")
                   && Mkt3.app.controllers.get("Mkt3.controller.previewer.LandingPage").getLandingPage()
                   && Mkt3.app.controllers.get("Mkt3.controller.previewer.LandingPage").getLandingPage().getNodeJson()) {
                  console.log("Marketo App > Disabling: Landing Page Previewer: Saving & Toolbar Menus");
                  
                  window.clearInterval(isLandingPagePreviewer);
                  
                  assetNode = Mkt3.app.controllers.get("Mkt3.controller.previewer.LandingPage").getLandingPage().getNodeJson();
                  menuItems = [
                    // Tab Menu
                    //"landingPagePreviewer toolbar [action=showDesktop]", // Desktop
                    //"landingPagePreviewer toolbar [action=showMobile]", // Mobile
                    //"landingPagePreviewer toolbar [action=showSideBySide]", // Side by Side
                    //"landingPagePreviewer toolbar [action=edit]", // Edit Draft
                    // Toolbar Menu
                    //"landingPagePreviewer toolbar [action=viewMenu]", // View Default
                    //"landingPagePreviewer toolbar [action=maximize]", // (Expand Arrows)
                    // Actions Menu
                    "landingPagePreviewer menu [action=approveAndClose]", // Approve and Close
                    //"landingPagePreviewer menu [action=devicePreview]", // Generate Preview URL
                  ];
                  
                  disableDesignerAsset(assetNode, menuItems);
                  APP.overlayLandingPage("preview");
                }
              }, 0);
            break;
            
          case "templateEdit":
            var isLandingPageTemplateEditor = window.setInterval(function () {
                if (typeof(Mkt3.app.controllers.get("Mkt3.controller.editor.landingPageTemplate.LandingPageTemplate")) !== "undefined"
                   && Mkt3.app.controllers.get("Mkt3.controller.editor.landingPageTemplate.LandingPageTemplate")
                   && Mkt3.app.controllers.get("Mkt3.controller.editor.landingPageTemplate.LandingPageTemplate").getTemplate()
                   && Mkt3.app.controllers.get("Mkt3.controller.editor.landingPageTemplate.LandingPageTemplate").getTemplate().get
                   && Mkt3.app.controllers.get("Mkt3.controller.editor.landingPageTemplate.LandingPageTemplate").getTemplate().getNodeJson) {
                  console.log("Marketo App > Disabling: Landing Page Template Editor: Saving & Toolbar Menus");
                  
                  window.clearInterval(isLandingPageTemplateEditor);
                  
                  var asset = Mkt3.app.controllers.get("Mkt3.controller.editor.landingPageTemplate.LandingPageTemplate").getTemplate();
                  
                  if (asset.get("zoneId")) {
                    assetNode = asset.getNodeJson();
                  } else {
                    assetNode = {
                      text: asset.get("name"),
                      compType: "Landing Page Template",
                      id: "LT" + asset.getId(),
                      accessZoneId: -1
                    };
                  }
                  
                  menuItems = [
                    // Toolbar Menu
                    "toolbar [action=upgrade]", // Make Mobile Compatible
                    //"toolbar [action=preview]", // Preview Draft
                    // Actions Menu
                    "menu [action=showMunchkinToggler]", // Disable Munchkin Tracking
                    //"menu [action=validate]", // Validate Mobile Compatibility
                    //"menu [action=checkSyntax]", // Validate Syntax
                    "menu [action=approve]", // Approve and Close
                  ];
                  
                  disableDesignerAsset(assetNode, menuItems, APP.disableSaving);
                }
              }, 0);
            break;
            
          case "templatePreview":
            var isLandingPageTemplatePreview = window.setInterval(function () {
                if (typeof(Mkt3.app.controllers.get("Mkt3.controller.previewer.LandingPageTemplate")) !== "undefined"
                   && Mkt3.app.controllers.get("Mkt3.controller.previewer.LandingPageTemplate")
                   && Mkt3.app.controllers.get("Mkt3.controller.previewer.LandingPageTemplate").getTemplate()
                   && Mkt3.app.controllers.get("Mkt3.controller.previewer.LandingPageTemplate").getTemplate().get
                   && Mkt3.app.controllers.get("Mkt3.controller.previewer.LandingPageTemplate").getTemplate().getNodeJson) {
                  console.log("Marketo App > Disabling: Landing Page Template Previewer: Saving & Toolbar Menus");
                  
                  window.clearInterval(isLandingPageTemplatePreview);
                  
                  var asset = Mkt3.app.controllers.get("Mkt3.controller.previewer.LandingPageTemplate").getTemplate();
                  
                  if (asset.get("zoneId")) {
                    assetNode = asset.getNodeJson();
                  } else {
                    assetNode = {
                      text: asset.get("name"),
                      compType: "Landing Page Template",
                      id: "LT" + asset.getId(),
                      accessZoneId: -1
                    };
                  }
                  
                  menuItems = [
                    // Toolbar Menu
                    //"toolbar [action=edit]", // Edit Draft
                  ];
                  
                  disableDesignerAsset(assetNode, menuItems);
                }
              }, 0);
            break;
          }
          break;
          
        case "email":
          switch (mode) {
          case "edit":
            var isEmailEditor = window.setInterval(function () {
                if (typeof(Mkt3.app.controllers.get("Mkt3.controller.editor.email2.EmailEditor")) !== "undefined"
                   && Mkt3.app.controllers.get("Mkt3.controller.editor.email2.EmailEditor")
                   && Mkt3.app.controllers.get("Mkt3.controller.editor.email2.EmailEditor").getEmail()
                   && Mkt3.app.controllers.get("Mkt3.controller.editor.email2.EmailEditor").getEmail().getNodeJson()) {
                  console.log("Marketo App > Disabling: Email Editor: Saving & Toolbar Menus");
                  
                  window.clearInterval(isEmailEditor);
                  
                  var asset = Mkt3.app.controllers.get("Mkt3.controller.editor.email2.EmailEditor").getEmail();
                  assetNode = asset.getNodeJson();
                  menuItems = [
                    // Toolbar Menu
                    //"email2EditorToolbar [action=editSettings]", // Email Settings
                    //"email2EditorToolbar [action=editCode]", // Edit Code
                    //"email2EditorToolbar [action=preview]", // Preview
                    // Actions Menu
                    "emailEditor2 menu [action=approveEmail]", // Approve and Close
                    "emailEditor2 menu [action=sendTestEmail]", // Send Sample
                    //"emailEditor2 menu [action=editSettings]", // Email Settings
                    //"emailEditor2 menu [action=editCode]", // Edit Code
                    //"emailEditor2 menu [action=downloadHtml]", // Download HTML
                    "emailEditor2 menu [action=uploadImage]", // Upload Image or File
                    "emailEditor2 menu [action=grabImages]", // Grab Images from Web
                    "emailEditor2 menu [action=saveAsTemplate]", // Save as Template
                  ];
                  
                  disableDesignerAsset(assetNode, menuItems);
                  APP.overlayEmail("edit");
                  APP.saveEmailEdits("edit", asset);
                }
              }, 0);
            break;
            
          case "preview":
            var isEmailPreviewer = window.setInterval(function () {
                if (typeof(Mkt3.app.controllers.get("Mkt3.controller.editor.email2.Preview")) !== "undefined"
                   && Mkt3.app.controllers.get("Mkt3.controller.editor.email2.Preview")
                   && Mkt3.app.controllers.get("Mkt3.controller.editor.email2.Preview").getEmail()
                   && Mkt3.app.controllers.get("Mkt3.controller.editor.email2.Preview").getEmail().getNodeJson()) {
                  console.log("Marketo App > Disabling: Email Previewer: Saving & Toolbar Menus");
                  
                  window.clearInterval(isEmailPreviewer);
                  
                  assetNode = Mkt3.app.controllers.get("Mkt3.controller.editor.email2.Preview").getEmail().getNodeJson();
                  menuItems = [
                    // Toolbar Menu
                    "email2EditorPreviewToolbar [action=sendSampleEmail]", // Send Sample
                    //"email2EditorPreviewToolbar [action=editDesign]", // Edit Draft
                    // Actions Menu
                    "emailPreview menu [action=approveEmail]", // Approve and Close
                    "emailPreview menu [action=sendSampleEmail]", // Send Sample
                    //"emailPreview menu [action=viewSummary]", // View Summary
                  ];
                  
                  disableDesignerAsset(assetNode, menuItems);
                  APP.overlayEmail("preview");
                }
              }, 0);
            break;
            
          case "templateEdit":
            var isEmailTemplateEditor = window.setInterval(function () {
                if (typeof(Mkt3.app.controllers.get("Mkt3.controller.editor.email2.EmailTemplate")) !== "undefined"
                   && Mkt3.app.controllers.get("Mkt3.controller.editor.email2.EmailTemplate")
                   && Mkt3.app.controllers.get("Mkt3.controller.editor.email2.EmailTemplate").getTemplate()
                   && Mkt3.app.controllers.get("Mkt3.controller.editor.email2.EmailTemplate").getTemplate().getNodeJson()) {
                  console.log("Marketo App > Disabling: Email Template Editor: Saving & Toolbar Menus");
                  
                  window.clearInterval(isEmailTemplateEditor);
                  
                  var asset = Mkt3.app.controllers.get("Mkt3.controller.editor.email2.EmailTemplate").getTemplate();
                  assetNode = asset.getNodeJson();
                  menuItems = [
                    // Toolbar Menu
                    //"toolbar [action=preview]", // Preview Draft
                    // Actions Menu
                    "menu [action=approveTemplate]", // Approve and Close
                    "menu [action=sendSample]", // Send Sample Email
                    "menu [action=inlineCss]", // Inline CSS
                    //"menu [action=checkSyntax]", // Validate HTML
                  ];
                  
                  disableDesignerAsset(assetNode, menuItems, APP.disableSaving);
                }
              }, 0);
            break;
            
          case "templatePicker":
            var isEmailTemplatePicker = window.setInterval(function () {
                if (typeof(Mkt3.app.controllers.get("Mkt3.controller.editor.email2.EmailTemplatePicker")) !== "undefined"
                   && Mkt3.app.controllers.get("Mkt3.controller.editor.email2.EmailTemplatePicker")
                   && Mkt3.app.controllers.get("Mkt3.controller.editor.email2.EmailTemplatePicker").getEmailTemplatePicker()
                   && Mkt3.app.controllers.get("Mkt3.controller.editor.email2.EmailTemplatePicker").getEmailTemplatePicker().accessZoneId) {
                  console.log("Marketo App > Disabling: Email Template Picker: Saving & Toolbar Menus");
                  
                  window.clearInterval(isEmailTemplatePicker);
                  
                  var asset = Mkt3.app.controllers.get("Mkt3.controller.editor.email2.EmailTemplatePicker").getEmailTemplatePicker();
                  
                  assetNode = {
                    text: "Email Template Picker",
                    compType: "Email Template Picker",
                    id: "EM",
                    accessZoneId: parseInt(asset.accessZoneId)
                  };
                  
                  menuItems = [
                    // Toolbar Menu
                    "toolbar [itemId=createButton]", // Create
                  ];
                  
                  disableDesignerAsset(assetNode, menuItems);
                }
              }, 0);
            break;
          }
          break;
          
        case "form":
          switch (mode) {
          case "edit":
            var isFormEditor = window.setInterval(function () {
                if (typeof(Mkt3.app.controllers.get("Mkt3.controller.editor.Form")) !== "undefined"
                   && Mkt3.app.controllers.get("Mkt3.controller.editor.Form")
                   && Mkt3.app.controllers.get("Mkt3.controller.editor.Form").getForm()
                   && Mkt3.app.controllers.get("Mkt3.controller.editor.Form").getForm().getNodeJson()) {
                  console.log("Marketo App > Disabling: Form Editor: Saving & Toolbar Menus");
                  
                  window.clearInterval(isFormEditor);
                  
                  assetNode = Mkt3.app.controllers.get("Mkt3.controller.editor.Form").getForm().getNodeJson();
                  menuItems = [
                    // Toolbar Menu
                    //"formEditor toolbar [action=preview]", // Preview Draft
                    // Navigation Menu
                    //"formEditor toolbar [action=back]", // Back
                    //"formEditor toolbar [action=next]", // Next
                    //"formEditor toolbar [action=close]", // Close
                    "formEditor toolbar [action=approveAndClose]", // Approve & Close
                    "formEditor toolbar [action=finish]", // Finish
                  ];
                  
                  disableDesignerAsset(assetNode, menuItems, APP.disableSaving);
                }
              }, 0);
            break;
            
          case "preview":
            var isFormPreviewer = window.setInterval(function () {
                if (typeof(Mkt3.app.controllers.get("Mkt3.controller.previewer.Form")) !== "undefined"
                   && Mkt3.app.controllers.get("Mkt3.controller.previewer.Form")
                   && Mkt3.app.controllers.get("Mkt3.controller.previewer.Form").getForm()
                   && Mkt3.app.controllers.get("Mkt3.controller.previewer.Form").getForm().getNodeJson()) {
                  console.log("Marketo App > Disabling: Form Previewer: Saving & Toolbar Menus");
                  
                  window.clearInterval(isFormPreviewer);
                  
                  assetNode = Mkt3.app.controllers.get("Mkt3.controller.previewer.Form").getForm().getNodeJson();
                  menuItems = [
                    // Toolbar Menu
                    //"formPreviewer toolbar [action=edit]", // Edit Draft
                  ];
                  
                  disableDesignerAsset(assetNode, menuItems);
                }
              }, 0);
            break;
          }
          break;
          
        case "pushNotification":
          switch (mode) {
          case "edit":
            var isPushNotificationEditor = window.setInterval(function () {
                if (typeof(Mkt3.app.controllers.get("Mkt3.controller.editor.mobilePushNotification.MobilePushNotification")) !== "undefined"
                   && Mkt3.app.controllers.get("Mkt3.controller.editor.mobilePushNotification.MobilePushNotification")
                   && Mkt3.app.controllers.get("Mkt3.controller.editor.mobilePushNotification.MobilePushNotification").getMobilePushNotification()
                   && Mkt3.app.controllers.get("Mkt3.controller.editor.mobilePushNotification.MobilePushNotification").getMobilePushNotification().getNodeJson()) {
                  console.log("Marketo App > Disabling: Push Notification Editor: Saving & Toolbar Menus");
                  
                  window.clearInterval(isPushNotificationEditor);
                  
                  assetNode = Mkt3.app.controllers.get("Mkt3.controller.editor.mobilePushNotification.MobilePushNotification").getMobilePushNotification().getNodeJson();
                  menuItems = [
                    // Toolbar Menu
                    "mobilePushNotificationEditor toolbar [action=sendDraftSample]", // Send Sample
                    //"mobilePushNotificationEditor toolbar [action=preview]", // Preview Draft
                    // Navigation Menu
                    //"mobilePushNotificationEditor toolbar [action=back]", // Back
                    //"mobilePushNotificationEditor toolbar [action=next]", // Next
                    //"mobilePushNotificationEditor toolbar [action=close]", // Close
                    "mobilePushNotificationEditor toolbar [action=finish]", // Finish
                    "mobilePushNotificationEditor toolbar [action=approveAndClose]", // Approve & Close
                  ];
                  
                  disableDesignerAsset(assetNode, menuItems, APP.disableSaving);
                }
              }, 0);
            break;
            
          case "preview":
            var isPushNotificationPreview = window.setInterval(function () {
                if (typeof(Mkt3.app.controllers.get("Mkt3.controller.previewer.MobilePushNotification")) !== "undefined"
                   && Mkt3.app.controllers.get("Mkt3.controller.previewer.MobilePushNotification")
                   && Mkt3.app.controllers.get("Mkt3.controller.previewer.MobilePushNotification").getMobilePushNotification()
                   && Mkt3.app.controllers.get("Mkt3.controller.previewer.MobilePushNotification").getMobilePushNotification().getNodeJson()) {
                  console.log("Marketo App > Disabling: Push Notification Previewer: Saving & Toolbar Menus");
                  
                  window.clearInterval(isPushNotificationPreview);
                  
                  assetNode = Mkt3.app.controllers.get("Mkt3.controller.previewer.MobilePushNotification").getMobilePushNotification().getNodeJson();
                  menuItems = [
                    // Toolbar Menu
                    "mobilePushNotificationPreviewer toolbar [action=sendDraftSample]", // Send Sample
                    //"mobilePushNotificationPreviewer toolbar [action=edit]", // Edit Draft
                  ];
                  
                  disableDesignerAsset(assetNode, menuItems);
                }
              }, 0);
            break;
          }
          break;
          
        case "inAppMessage":
          switch (mode) {
          case "edit":
            var isInAppMessageEditor = window.setInterval(function () {
                if (typeof(Mkt3.app.controllers.get("Mkt3.controller.editor.inAppMessage.InAppMessage")) !== "undefined"
                   && Mkt3.app.controllers.get("Mkt3.controller.editor.inAppMessage.InAppMessage")
                   && Mkt3.app.controllers.get("Mkt3.controller.editor.inAppMessage.InAppMessage").getInAppMessage()
                   && Mkt3.app.controllers.get("Mkt3.controller.editor.inAppMessage.InAppMessage").getInAppMessage().getNodeJson()) {
                  console.log("Marketo App > Disabling: In-App Message Editor: Saving & Toolbar Menus");
                  
                  window.clearInterval(isInAppMessageEditor);
                  
                  assetNode = Mkt3.app.controllers.get("Mkt3.controller.editor.inAppMessage.InAppMessage").getInAppMessage().getNodeJson();
                  menuItems = [
                    // Toolbar Menu
                    "inAppMessageEditor toolbar [action=sendSample]", // Send Sample
                    //"inAppMessageEditor toolbar [action=preview]", // Preview
                    // Actions Menu
                    "inAppMessageEditor menu [action=sendSample]", // Send Sample
                    //"inAppMessageEditor menu [action=preview]", // Preview
                    "inAppMessageEditor menu [action=approveAndClose]", // Approve & Close
                  ];
                  
                  disableDesignerAsset(assetNode, menuItems, APP.disableSaving);
                }
              }, 0);
            break;
            
          case "preview":
            var isInAppMessagePreviewer = window.setInterval(function () {
                if (typeof(Mkt3.app.controllers.get("Mkt3.controller.previewer.InAppMessage")) !== "undefined"
                   && Mkt3.app.controllers.get("Mkt3.controller.previewer.InAppMessage")
                   && Mkt3.app.controllers.get("Mkt3.controller.previewer.InAppMessage").getInAppMessage()
                   && Mkt3.app.controllers.get("Mkt3.controller.previewer.InAppMessage").getInAppMessage().getNodeJson()) {
                  console.log("Marketo App > Disabling: In-App Message Previewer: Saving & Toolbar Menus");
                  
                  window.clearInterval(isInAppMessagePreviewer);
                  
                  assetNode = Mkt3.app.controllers.get("Mkt3.controller.previewer.InAppMessage").getInAppMessage().getNodeJson();
                  menuItems = [
                    // Toolbar Menu
                    "inAppMessagePreviewer toolbar [action=approveAndClose]", // Approve & Close
                    //"inAppMessagePreviewer toolbar [action=edit]", // Edit Draft
                  ];
                  
                  disableDesignerAsset(assetNode, menuItems);
                }
              }, 0);
            break;
            
          default:
            break;
          }
          break;
          
        case "smsMessage":
          switch (mode) {
          case "edit":
            var isSmsMessageEditor = window.setInterval(function () {
                if (typeof(Mkt3.app.controllers.get("Mkt3.controller.editor.SmsMessage")) !== "undefined"
                   && Mkt3.app.controllers.get("Mkt3.controller.editor.SmsMessage")
                   && Mkt3.app.controllers.get("Mkt3.controller.editor.SmsMessage").getSmsMessage()
                   && Mkt3.app.controllers.get("Mkt3.controller.editor.SmsMessage").getSmsMessage().getNodeJson()) {
                  console.log("Marketo App > Disabling: SMS Message Editor: Saving & Toolbar Menus");
                  
                  window.clearInterval(isSmsMessageEditor);
                  
                  assetNode = Mkt3.app.controllers.get("Mkt3.controller.editor.SmsMessage").getSmsMessage().getNodeJson();
                  menuItems = [
                    // Actions Menu
                    "smsMessageEditor menu [action=approveAndClose]", // Approve and Close
                  ];
                  
                  disableDesignerAsset(assetNode, menuItems, APP.disableSaving);
                }
              }, 0);
            break;
            
          case "preview":
            break;
          }
          break;
          
        case "socialApp":
          switch (mode) {
          case "edit":
            var isSocialAppEditor = window.setInterval(function () {
                if (typeof(Mkt3.app.controllers.get("Mkt3.controller.editor.SocialApp")) !== "undefined"
                   && Mkt3.app.controllers.get("Mkt3.controller.editor.SocialApp")
                   && Mkt3.app.controllers.get("Mkt3.controller.editor.SocialApp").getSocialApp()
                   && Mkt3.app.controllers.get("Mkt3.controller.editor.SocialApp").getSocialApp().getNodeJson()) {
                  console.log("Marketo App > Disabling: Social App Editor: Saving & Toolbar Menus");
                  
                  window.clearInterval(isSocialAppEditor);
                  
                  assetNode = Mkt3.app.controllers.get("Mkt3.controller.editor.SocialApp").getSocialApp().getNodeJson();
                  menuItems = [
                    // Toolbar Menu
                    //"socialAppEditor toolbar [action=preview]", // Preview Draft
                    // Navigation Menu
                    //"socialAppEditor toolbar [action=back]", // Back
                    //"socialAppEditor toolbar [action=next]", // Next
                    //"socialAppEditor toolbar [action=close]", // Close
                    "socialAppEditor toolbar [action=approveAndClose]", // Approve and Close
                    "socialAppEditor toolbar [action=finish]", // Finish
                  ];
                  
                  disableDesignerAsset(assetNode, menuItems, APP.disableSaving);
                }
              }, 0);
            break;
            
          case "preview":
            var isSocialAppPreviewer = window.setInterval(function () {
                if (typeof(Mkt3.app.controllers.get("Mkt3.controller.previewer.SocialApp")) !== "undefined"
                   && Mkt3.app.controllers.get("Mkt3.controller.previewer.SocialApp")
                   && Mkt3.app.controllers.get("Mkt3.controller.previewer.SocialApp").getSocialApp()
                   && Mkt3.app.controllers.get("Mkt3.controller.previewer.SocialApp").getSocialApp().getNodeJson()) {
                  console.log("Marketo App > Disabling: Social App Previewer: Saving & Toolbar Menus");
                  
                  window.clearInterval(isSocialAppPreviewer);
                  
                  assetNode = Mkt3.app.controllers.get("Mkt3.controller.previewer.SocialApp").getSocialApp().getNodeJson();
                  menuItems = [
                    // Toolbar Menu
                    //"socialAppPreviewer toolbar [action=edit]", // Edit Draft
                  ];
                  
                  disableDesignerAsset(assetNode, menuItems);
                }
              }, 0);
            break;
          }
          break;
          
        case "abTest":
          switch (mode) {
          case "edit":
            console.log("Marketo App > Executing: A/B Test Editor: Saving & Toolbar Menus");
            var isAbTestEditor = window.setInterval(function () {
                if (typeof(Mkt3.app.controllers.get("Mkt3.controller.editor.testGroup.TestGroup")) !== "undefined"
                   && Mkt3.app.controllers.get("Mkt3.controller.editor.testGroup.TestGroup")
                   && Mkt3.app.controllers.get("Mkt3.controller.editor.testGroup.TestGroup").getTestGroup()
                   && Mkt3.app.controllers.get("Mkt3.controller.editor.testGroup.TestGroup").getTestGroup().getNodeJson()) {
                  console.log("Marketo App > Disabling: A/B Test Editor: Saving & Toolbar Menus");
                  
                  window.clearInterval(isAbTestEditor);
                  
                  assetNode = Mkt3.app.controllers.get("Mkt3.controller.editor.testGroup.TestGroup").getTestGroup().getNodeJson();
                  menuItems = [
                    // Navigation menu
                    //"testGroupEditor toolbar [action=back]", // Back
                    //"testGroupEditor toolbar [action=next]", // Next
                    "testGroupEditor toolbar [action=finish]", // Finish
                    //"testGroupEditor toolbar [action=close]", // Close
                  ];
                  
                  disableDesignerAsset(assetNode, menuItems, APP.disableSaving);
                }
              }, 0);
            break;
            
          case "preview":
            break;
          }
          break;
          
        case "snippet":
          switch (mode) {
          case "edit":
            console.log("Marketo App > Executing: Snippet Editor: Saving & Toolbar Menus");
            var isSnippetEditor = window.setInterval(function () {
                if (typeof(Mkt3.app.controllers.get("Mkt3.controller.editor.Snippet")) !== "undefined"
                   && Mkt3.app.controllers.get("Mkt3.controller.editor.Snippet")
                   && Mkt3.app.controllers.get("Mkt3.controller.editor.Snippet").getSnippet()
                   && Mkt3.app.controllers.get("Mkt3.controller.editor.Snippet").getSnippet().getNodeJson()) {
                  console.log("Marketo App > Disabling: Snippet Editor: Saving & Toolbar Menus");
                  
                  window.clearInterval(isSnippetEditor);
                  
                  assetNode = Mkt3.app.controllers.get("Mkt3.controller.editor.Snippet").getSnippet().getNodeJson();
                  menuItems = [
                    // Toolbar
                    //"toolbar [action=preview]", // Preview Draft
                  ];
                  
                  disableDesignerAsset(assetNode, menuItems, APP.disableSaving);
                }
              }, 0);
            break;
            
          case "preview":
            console.log("Marketo App > Executing: Snippet Previewer: Saving & Toolbar Menus");
            var isSnippetEditor = window.setInterval(function () {
                if (typeof(Mkt3.app.controllers.get("Mkt3.controller.previewer.Snippet")) !== "undefined"
                   && Mkt3.app.controllers.get("Mkt3.controller.previewer.Snippet")
                   && Mkt3.app.controllers.get("Mkt3.controller.previewer.Snippet").getSnippet()
                   && Mkt3.app.controllers.get("Mkt3.controller.previewer.Snippet").getSnippet().getNodeJson()) {
                  console.log("Marketo App > Disabling: Snippet Previewer: Saving & Toolbar Menus");
                  
                  window.clearInterval(isSnippetEditor);
                  
                  assetNode = Mkt3.app.controllers.get("Mkt3.controller.previewer.Snippet").getSnippet().getNodeJson();
                  menuItems = [
                    // Toolbar Menu
                    //"toolbar [action=edit]", // Edit Draft
                    // Actions Menu
                    //"menu [action=showHtmlVersion]", // HTML
                    //"menu [action=showTextVersion]", // Text
                  ];
                  
                  disableDesignerAsset(assetNode, menuItems);
                }
              }, 0);
            break;
          }
          break;
        }
      }
    }, 0);
};

/**************************************************************************************
 *
 *  This function disables the Save, Create, Add ... buttons in Form windows.
 *  It can be used to disable any generic Form save window.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.disableFormSaveButtons = function () {
  console.log("Marketo App > Disabling: Form Window Save Buttons");
  
  if (typeof(Ext4) !== "undefined"
     && Ext4
     && Ext4.Component
     && Ext4.Component.prototype
     && Ext4.Component.prototype.show) {
    Ext4.Component.prototype.show = function (animateTarget, cb, scope) {
      var me = this,
      menuItems,
      mItems,
      toDisable;
      
      if (this.getXType() == "createNamedAccountForm" //ABM > Named Accounts > New Named Account
         || this.getXType() == "addToAccountListForm" //ABM > Named Accounts > Add To Account List
         || this.getXType() == "assignTeamMemberForm" //ABM > Named Accounts > Assign Account Member
         || this.getXType() == "createAccountListForm" //ABM > Account Lists > Create New/Rename Account List
         || this.getXType() == "adBridgeForm" //Global > List & Smart List > Actions > Send via Ad Bridge
         || this.getXType() == "smartlistReportSubscriptionForm" //Global > List & Smart List > Actions > New Smart List Subscription
         || this.getXType() == "analyticsReportSubscriptionForm" //Global > Report > New Actions & Subscriptions > New Report Subscription
         || this.getXType() == "emailBlastCommunicationLimitForm" //Marketing Activities > Program > Setup > Edit Communication Limit Settings
         || this.getXType() == "calendarEntryRescheduleForm" //Marketing Activities > Event > Actions > Reschedule Entries
         || this.getXType() == "programOperationalModeForm" //Marketing Activities > Program > Setup > Edit Analytics Behavior Settings
         || this.getXType() == "trackCadenceForm" //Marketing Activities > Nurture Program > Streams > Set Stream Cadence
         || this.getXType() == "fileUploadForm" //Design Studio > Images & Files > Grab Images from Web
         || this.getXType() == "leadComponentForm" //Database > ALL > New > New Person
         || this.getXType() == "analyticsReportSubscriptionForm" //Analytics > Analyzer & Report > New Report Subscription
         || this.getXType() == "lpMetaDataForm" //Designer > Landing Page Editor > Edit Page Meta Tags
         || this.getXType() == "lpFormSettings" //Designer > Landing Page Editor > Edit Form Settings
         || this.getXType() == "emailSettingsForm" //Designer > Email Editor > Edit Settings
         || this.getXType() == "adminUserInviteWizard" //Admin > User & Roles > Users > Invite New User
         || this.getXType() == "adminEditLicensesForm" //Admin > User & Roles > Users > Issue License
         || this.getXType() == "adminSalesUserInviteWizard" //Admin > User & Roles > Sales Users > Invite New Sales User
         || this.getXType() == "adminEditLicensesForm" //Admin > User & Roles > Sales Users > Manage License > Account Insight
         || this.getXType() == "adminSubscriptionInformationForm" //Admin > My Account > Subcription Information
         || this.getXType() == "adminAccountSettingsForm" //Admin > My Account > Account Settings
        //|| this.getXType() == "localePicker" //Admin > My Account/Location > Location Settings
         || this.getXType() == "deleteZoneForm" //Admin > Workspaces & Partitions > Workspaces > Delete Workspace
         || this.getXType() == "adminTinyMceSettingForm" //Admin > *Email > Email > Edit Text Editor Settings
         || this.getXType() == "emailEditorSettingsForm" //Admin > Email > Email > Edit Email Editor Settings
         || this.getXType() == "emailAddMultipleDomainForm" //Admin > Email > Email > Add/Edit Branding Domains
         || this.getXType() == "adminAddDomainForm" //Admin > Email > SPF/DKIM > Add Domain
         || this.getXType() == "adminScoreSettingsForm" //Admin > ABM > Account Score Settings
         || this.getXType() == "adminCrmFieldSettingsForm" //Admin > ABM > CRM Mapping
         || this.getXType() == "adminAccountTeamForm" //Admin > ABM > Account Team Settings
         || this.getXType() == "adminAccountInsightSettingsForm" //Admin > ABM > ABM Sales > Account Insight Settings
         || this.getXType() == "adminAbmReportSettingsForm" //Admin > ABM > Weekly Report
         || this.getXType() == "adminFieldHtmlEncodeForm" //Admin > Field Management > Field Management > HTML Encode Settings
         || this.getXType() == "mktocustomactivityActivityTypeForm" //Admin > Marketo Custom Activities > Marketo Custom Activities > New Custom Activity
         || this.getXType() == "mktocustomactivityActivityTypeEditForm" //Admin > Marketo Custom Activities > Marketo Custom Activities > Edit Activity
         || this.getXType() == "mktocustomactivityActivityTypeFormStepThree" //Admin > Marketo Custom Activities > Fields > New/Edit Field
         || this.getXType() == "mktocustomobjectObjectForm" //Admin > Marketo Custom Objects > Marketo Custom Objects > New/Edit Custom Object
         || this.getXType() == "mktocustomobjectFieldForm" //Admin > Marketo Custom Objects > Fields > New/Edit Field
         || this.getXType() == "crmEditCredentialsForm" //Admin > Microsoft Dynamics > Credentials > Edit
         || this.getXType() == "adminSpecifyPluginContactForm" //Admin > Sales Insight > Email Add-in > Specify Plugin Contact
         || this.getXType() == "wildcardRedirectForm" //Admin > Landing Pages > New Wildcard Redirect
         || this.getXType() == "mktowsEditIpRestrictionForm" //Admin > Web Services > IP Restrictions
         || this.getXType() == "launchpointServiceIntegrationSettingsForm" //Admin > LaunchPoint > Installed Services > Edit Service
         || this.getXType() == "vespaAppForm" //Admin > Mobile Apps & Devices > Mobile Apps > New/Edit Mobile App
         || this.getXType() == "vespaSendForm" //Admin > Mobile Apps & Devices > Mobile Apps > Send To Developer
         || this.getXType() == "vespaConfigurePushAccessForm" //Admin > Mobile Apps & Devices > Mobile Apps > Configure Push Access
         || this.getXType() == "vespaNewDeviceForm" //Admin > Mobile Apps & Devices > Test Devices > New Test Device
         || this.getXType() == "adminTagsAddCalendarEntryTypeForm" //Admin > Tags > Calendar Entry Types > New Entry Type
         || this.getXType() == "featureSwitchForm" //Admin > Feature Manager > Edit Feature
      ) {
        menuItems = [
          "[action=submit]", //Create, Add, Save
          "[action=import]", //Import
        ];
        mItems = this.query(menuItems.toString());
        toDisable = true;
        
      } else if (typeof(MktCanvas) !== "undefined"
         && MktCanvas
         && MktCanvas.getActiveTab
         && MktCanvas.getActiveTab()
         && this.getXType() == "nurtureTrackForm" //Marketing Activities > Nurture Program > Streams > Edit Name
         && this.getXType() == "inAppMessageAssetForm" //Marketing Activities > Mobile In-App Program > Control Panel > New In-App Message
      )
      {
        menuItems = [
          "[action=submit]", //Create, Add, Save
        ];
        mItems = this.query(menuItems.toString());
        toDisable = APP.evaluateMenu("button", null, MktCanvas.getActiveTab(), null);
      }
      
      if (toDisable
         && mItems) {
        console.log("Marketo App > Executing: Disable Form Window Save Buttons");
        
        mItems.forEach(function (item) {
          if (item) {
            item.setDisabled(toDisable);
            
            if (me.getXType() == "emailAddMultipleDomainForm") {
              item.stayDisabled = true;
            } else if (me.getXType() == "adminEditLicensesForm") {
              item.setVisible(false);
            }
          }
        });
      }
      
      var rendered = me.rendered;
      if (rendered
         && me.isVisible()) {
        if (me.toFrontOnShow
           && me.floating) {
          me.toFront();
        }
      } else {
        if (me.fireEvent("beforeshow", me) !== false) {
          me.hidden = false;
          if (!rendered
             && (me.autoRender
               || me.floating)) {
            
            me.doAutoRender();
            rendered = me.rendered;
          }
          if (rendered) {
            me.beforeShow();
            me.onShow.apply(me, arguments);
            me.afterShow.apply(me, arguments);
          }
        } else {
          me.onShowVeto();
        }
      }
      if (me.stayDisabled) {
        me.setVisible(false);
      }
      return me;
    };
  }
};

/**************************************************************************************
 *
 *  This function disables the Delete buttons in Form windows.
 *  It can be used to disable any generic Form save window.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.disableFormDeleteButtons = function () {
  console.log("Marketo App > Disabling: Form Window Delete Buttons");
  
  if (typeof(Ext4) !== "undefined"
     && Ext4
     && Ext4.window
     && Ext4.window.MessageBox.prototype
     && Ext4.window.MessageBox.prototype.confirmDelete) {
    Ext4.window.MessageBox.prototype.confirmDelete = function (cfg, msg, fn, scope) {
      var menuItems,
      mItems,
      toDisable;
      
      if (cfg.title == "Remove Named Accounts" //ABM > Account Lists > Select Account
      ) {
        menuItems = [
          "[itemId=ok]", //Delete
          "[text=Delete]", //Delete
        ];
        mItems = this.query(menuItems.toString());
        toDisable = true;
        
      }
      
      if (toDisable
         && mItems) {
        console.log("Marketo App > Executing: Disable Form Window Delete Buttons");
        
        mItems.forEach(function (item) {
          if (item) {
            item.setDisabled(toDisable);
          }
        });
      }
      
      if (Ext4.isString(cfg)) {
        cfg = {
          title: cfg,
          msg: msg,
          fn: fn,
          scope: scope
        };
      }
      
      cfg = Ext4.apply({
          icon: this.INFO,
          buttons: this.OKCANCEL,
          buttonText: {
            ok: MktLang.getStr('messagebox.Delete')
          }
        }, cfg);
      
      // TODO-legacy
      if (!Mkt3.Config.isFeatureEnabled('mkt3Ds')) {
        cfg.fn = Ext4.Function.bind(cfg.fn, cfg.scope || this, ['ok']);
        return MktMessage.confirmDelete(cfg.title, cfg.msg, cfg.fn, cfg.animateTarget);
      }
      
      return this.show(cfg);
    };
  }
};

/**************************************************************************************
 *
 *  This function disables the Save, Apply, Change ... buttons in the Admin Section.
 *  It can be used to disable any generic Save window.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.disableHarmfulSaveButtons = function () {
  console.log("Marketo App > Disabling: Harmful Save Buttons");
  
  if (typeof(Ext) !== "undefined"
     && Ext
     && Ext.Window
     && Ext.Window.prototype
     && Ext.Window.prototype.show) {
    Ext.Window.prototype.show = function (animateTarget, cb, scope) {
      // Disable ALL areas > ALL assets > ALL Save windows
      
      if (typeof(this) !== "undefined"
         && this
         && this.buttons
         && this.buttons.length > 0
         && typeof(MktCanvas) !== "undefined"
         && MktCanvas
         && MktCanvas.getActiveTab
         && MktCanvas.getActiveTab()) {
        var toDisable;
        
        if (typeof(MktMainNav) !== "undefined"
           && MktMainNav
           && MktMainNav.activeNav == "tnCustAdmin"
           && MktCanvas.getActiveTab().title) {
          var activeTabTitle = MktCanvas.getActiveTab().title;
          // Admin
          switch (activeTabTitle) {
          case "Login Settings":
            // Users & Roles
          case "Users":
          case "Roles":
            // Workspaces & Partitions
          case "Workspaces":
          case "Lead Partitions":
          case "Person Partitions":
            //
          case "Location":
          case "Smart Campaign":
          case "Communication Limits":
          case "Tags":
          case "Field Management":
          case "Salesforce Objects Sync":
          case "Salesforce":
          case "Microsoft Dynamics":
          case "Dynamics Entities Sync":
            // Sales Insight
          case "Sales Insight":
          case "Email Add-in":
            // Landing Pages
          case "Landing Pages":
          case "Rules":
          case "Munchkin":
            // LaunchPoint
          case "Installed Services":
            //
          case "Webhooks":
          case "Single Sign-On":
          case "Revenue Cycle Analytics":
          case "Treasure Chest":
            toDisable = true;
            break;
          }
          
        } else if (this.title) {
          switch (this.title) {
          // Marketing Activities
          // Program > Actions
          case "Salesforce Campaign Sync":
          case "Event Settings":
          // Program > Setup
          case "New Reporting":
          case "Edit Reporting":
          case "New Vertical":
          case "Edit Vertical":
          // Program > Members & List > Actions
          case "Import List":
          // Nurture Program > Setup
          case "Program Status":
          case "Edit Exhausted Content Notification Settings":
          // Smart Campaign > Schedule
          case "Activate Triggered Campaign":
          case "Schedule Recurrence":
          case "Run Once":
          case "Edit Qualification Rules":
          // Database
          // ALL > New
          case "New Field Organizer":
            toDisable = true;
            break;
          // Program > Actions
          case "Event Schedule":
          // Program > Setup
          case "Edit Channel":
          case "New Cost":
          case "Edit Cost":
            toDisable = APP.evaluateMenu("button", null, MktCanvas.getActiveTab(), null);
            break;
          
          // Marketing Activities & Analytics
          // Report
          case "Date of Activity":
          case "Group by Segmentations":
          case "Global Reporting":
          case "Export Rows Available":
          case "Filter by Model":
          case "Filter by Period Cost":
          // Email Performance Report
          case "Sent Date":
          case "Group by Segmentations":
          case "Email Filter":
          case "Archived Email Filter":
          // Email via MSI Performance Report
          case "Group Emails by":
          // Engagement Stream Performance Report
          case "Engagement Program Email Filter":
          // People Performance Report
          case "Person Created At":
          case "Group People by":
          case "Opportunity Columns":
          case "Manage Custom Smart List Columns":
          // Program Performance Report
          case "Program Filter":
          case "Archived Program Filter":
          // Web Activity Report
          case "Activity Source":
          // Opp Influence Analyzer & Success Path Analyzer
          case "Time Frame":
          // Opp Influence Analyzer
          case "Show Interesting Moments":
            toDisable = APP.evaluateMenu("button", null, MktCanvas.getActiveTab(), null);
            break;
          }
          
          if (this.title.search(/Filter by .+/) != -1) {
            toDisable = APP.evaluateMenu("button", null, MktCanvas.getActiveTab(), null);
          }
        }
        
        if (toDisable) {
          console.log("Marketo App > Executing: Disable Harmful Save Buttons");
          
          var currButton;
          
          for (var ii = this.buttons.length - 1; ii >= 0; ii--) {
            currButton = this.buttons[ii];
            if (currButton.cls == "mktButtonPositive"
               || currButton.iconCls == "mkiOk") {
              currButton.setDisabled(true);
              break;
            }
          }
        }
      }
      
      if (!this.rendered) {
        this.render(Ext.getBody());
      }
      if (this.hidden === false) {
        this.toFront();
        return this;
      }
      if (this.fireEvent('beforeshow', this) === false) {
        return this;
      }
      if (cb) {
        this.on('show', cb, scope, {
          single: true
        });
      }
      this.hidden = false;
      if (Ext.isDefined(animateTarget)) {
        this.setAnimateTarget(animateTarget);
      }
      this.beforeShow();
      if (this.animateTarget) {
        this.animShow();
      } else {
        this.afterShow();
      }
      return this;
    };
  }
};

/**************************************************************************************
 *
 *  This function limits each Workspace to 3 Nurture Programs. Basically, each time
 *  a nuture program is created, it first searches the folder tree to see if the user
 *  already has 3 programs. If so, it displays an error message. The reason this exists
 *  is because there is a limit of 300 nurture programs per subscription, and up to
 *  100 workspaces per subscription. 300 programs divided by 100 workspaces equals 3
 *  nurture programs per workspace.
 *
 *  @Author Andrew Garcia
 *
 *  @function
 *
 **************************************************************************************/
/*
APP.limitNurturePrograms = function () {
  console.log("Marketo App > Limiting: Nurture Programs");
  
  if (typeof(Mkt) !== "undefined"
     && Mkt
     && Mkt.apps
     && Mkt.apps.marketingEvent
     && Mkt.apps.marketingEvent.MarketingEventForm
     && Mkt.apps.marketingEvent.MarketingEventForm.prototype
     && Mkt.apps.marketingEvent.MarketingEventForm.prototype.beforeSubmitCallback) {
    var previousMarketingEventForm = Mkt.apps.marketingEvent.MarketingEventForm.prototype.beforeSubmitCallback;
    Mkt.apps.marketingEvent.MarketingEventForm.prototype.beforeSubmitCallback = function () {
      console.log("Marketo App > Executing: Limit Nurture Programs");
      
      var limit_exceeded = false,
      rootNode = MktExplorer.boundTree.root,
      compType = "Nurture Program",
      matches = [],
      node = rootNode.cascade(function () {
          var attr = this.attributes;
          if (attr && attr.xtra) {
            if (attr.xtra.compType == compType && attr.xtra.accessZoneId == MktCanvas.getActiveTab().config.accessZoneId) {
              matches.push(this);
            }
          }
        },
          undefined, [compType]);
      
      if (matches.length >= 3) {
        limit_exceeded = true;
      }
      
      if (limit_exceeded == true) {
        var nutureProgramMessageBox = Ext.MessageBox.show({
            title: "MarketoLive",
            msg: "Users are limited to 3 nurture programs each.",
            width: 400,
            closable: true
          });
        nutureProgramMessageBox.show;
        return false;
      } else {
        return previousMarketingEventForm.apply(this, arguments);
      }
    };
  }
};
*/
/**************************************************************************************
 *
 *  This function contains the control logic for injecting the Analyzer Navigation Bar
 *  that allows for easy switching between analyzers without returning to the folder tree.
 *
 *  @Author Arrash Yasavolian
 *
 *  @function
 *
 **************************************************************************************/

APP.updateNavBar = function () {
  var isPodsLoaded = window.setInterval(function () {
      if (typeof(PODS) !== "undefined") {
        console.log("Marketo App > Injecting: Analyzer Navigation Bar");
        
        window.clearInterval(isPodsLoaded);
        
        var pod = new PODS.Pod(PODS.getCookie("userPod"));
        
        for (var y = 0; y < pod.valueSet.length; y++) {
          if (currentUrl == pod.valueSet[y].url) {
            console.log("Marketo App > Updating: CSS for Analyzer Navigation Bar");
            
            // This code block swaps the colors of the analyzer labels depending on which one the user is currently viewing.
            $j = jQuery.noConflict();
            var currPosition = '#' + pod.valueSet[y].position;
            $j(currPosition).parent().css('display', 'block');
            $j(currPosition).parent().siblings().css('display', 'none');
            $j(currPosition).removeClass('analyzer-button').addClass('analyzer-title');
            $j(currPosition).siblings().removeClass('analyzer-title').addClass('analyzer-button');
            $j("#modeler,#success-path-analyzer,#opportunity-influence-analyzer,#program-analyzer").bind("click", function (e) {
              console.log("Marketo App > Identifying: Current Analyzer");
              
              // Updates the currPosition based on the div selected
              for (var x = 0; x < pod.valueSet.length; x++) {
                if (e.target.id == pod.valueSet[x].position) {
                  currPosition = x;
                }
              }
              window.location = pod.valueSet[currPosition].url;
            });
          }
        }
      }
    }, 0);
};

/**************************************************************************************
 *
 *  This function overrides the function for saving additions and deletions to Nurture
 *  Streams.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.overrideSaving = function () {
  console.log("Marketo App > Overriding: Saving for Nurture Streams");
  
  if (typeof(Mkt3) !== "undefined"
     && Mkt3
     && Mkt3.data
     && Mkt3.data.Store
     && Mkt3.data.Store.prototype
     && Mkt3.data.Store.prototype.sync) {
    var prevDataStoreSync = Mkt3.data.Store.prototype.sync;
    Mkt3.data.Store.prototype.sync = function () {
      //console.log("Marketo App > Executing: Override Saving for Nurture Streams (sync)");
      
      if (this.storeId == "CalendarView"
         || window.location.href.search("\/#" + mktoCalendarFragment) != -1) {
        console.log("Marketo App > Restoring: Original sync Function");
        prevDataStoreSync.apply(this, arguments);
      } else {
        
        var disable;
        if (typeof(MktCanvas) !== "undefined"
           && MktCanvas
           && MktCanvas.getActiveTab()
           && toggleState != "false") {
          disable = APP.evaluateMenu("button", null, MktCanvas.getActiveTab(), null);
        } else if (toggleState == "false") {
          disable = true;
        }
        
        if (!disable) {
          if (this.autoSyncSuspended) {
            this.autoSync = true;
            this.autoSyncSuspended = false;
          }
          
          if (this.getProxy() instanceof Mkt3.data.proxy.AjaxPost) {
            Mkt3.Synchronizer.sync(this);
          } else {
            this.callParent(arguments);
          }
        } else {
          //console.log("Marketo App > Disabling: Saving for Nurture Streams (sync)");
        }
      }
    };
  }
  
  if (typeof(Ext4) !== "undefined"
     && Ext4
     && Ext4.data
     && Ext4.data.Model
     && Ext4.data.Model.prototype
     && Ext4.data.Model.prototype.destroy) {
    Ext4.data.Model.prototype.destroy = function (options) {
      //console.log("Marketo App > Executing: Override Saving for Nurture Streams (destroy)");
      
      var disable;
      if (typeof(MktCanvas) !== "undefined"
         && MktCanvas
         && MktCanvas.getActiveTab()
         && toggleState != "false") {
        disable = APP.evaluateMenu("button", null, MktCanvas.getActiveTab(), null);
      } else if (toggleState == "false") {
        disable = true;
      }
      
      if (!disable) {
        options = Ext.apply({
            records: [this],
            action: 'destroy'
          }, options);
        
        var me = this,
        isNotPhantom = me.phantom !== true,
        scope = options.scope || me,
        stores = me.stores,
        i = 0,
        storeCount,
        store,
        args,
        operation,
        callback;
        
        operation = new Ext.data.Operation(options);
        
        callback = function (operation) {
          args = [me, operation];
          if (operation.wasSuccessful()) {
            for (storeCount = stores.length; i < storeCount; i++) {
              store = stores[i];
              store.remove(me, true);
              if (isNotPhantom) {
                store.fireEvent('write', store, operation);
              }
            }
            me.clearListeners();
            Ext.callback(options.success, scope, args);
          } else {
            Ext.callback(options.failure, scope, args);
          }
          Ext.callback(options.callback, scope, args);
        };
        
        if (isNotPhantom) {
          me.getProxy().destroy(operation, callback, me);
        } else {
          operation.complete = operation.success = true;
          operation.resultSet = me.getProxy().reader.nullResultSet;
          callback(operation);
        }
        return me;
      } else {
        //console.log("Marketo App > Disabling: Saving for Nurture Streams (destroy)");
      }
    };
  }
};

/**************************************************************************************
 *
 *  This function enables saving for the Editors (emails, forms, push notifications,
 *  and social apps) and Nurture Streams.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/
/*
APP.enableSaving = function () {
  console.log("Marketo App > Enabling: Saving for Editors");
  
  if (typeof(Mkt3) !== "undefined"
     && Mkt3
     && Mkt3.data
     && Mkt3.data.Store
     && Mkt3.data.Store.prototype
     && Mkt3.data.Store.prototype.sync) {
    Mkt3.data.Store.prototype.sync = function () {
      console.log("Marketo App > Executing: Enable Saving for Editors (sync)");
      
      if (this.autoSyncSuspended) {
        this.autoSync = true;
        this.autoSyncSuspended = false;
      }
      
      if (this.getProxy()instanceof Mkt3.data.proxy.AjaxPost) {
        Mkt3.Synchronizer.sync(this);
      } else {
        this.callParent(arguments);
      }
    };
  }
  
  if (typeof(Ext4) !== "undefined"
     && Ext4
     && Ext4.data
     && Ext4.data.Model
     && Ext4.data.Model.prototype
     && Ext4.data.Model.prototype.destroy) {
    Ext4.data.Model.prototype.destroy = function (options) {
      console.log("Marketo App > Executing: Enable Saving for Editors (destroy)");
      
      options = Ext.apply({
          records: [this],
          action: 'destroy'
        }, options);
      
      var me = this,
      isNotPhantom = me.phantom !== true,
      scope = options.scope || me,
      stores = me.stores,
      i = 0,
      storeCount,
      store,
      args,
      operation,
      callback;
      
      operation = new Ext.data.Operation(options);
      
      callback = function (operation) {
        args = [me, operation];
        if (operation.wasSuccessful()) {
          for (storeCount = stores.length; i < storeCount; i++) {
            store = stores[i];
            store.remove(me, true);
            if (isNotPhantom) {
              store.fireEvent('write', store, operation);
            }
          }
          me.clearListeners();
          Ext.callback(options.success, scope, args);
        } else {
          Ext.callback(options.failure, scope, args);
        }
        Ext.callback(options.callback, scope, args);
      };
      
      if (isNotPhantom) {
        me.getProxy().destroy(operation, callback, me);
      } else {
        operation.complete = operation.success = true;
        operation.resultSet = me.getProxy().reader.nullResultSet;
        callback(operation);
      }
      return me;
    };
  }
};
*/
/**************************************************************************************
 *
 *  This function disables saving for the Editors (emails, forms, push notifications,
 *  and social apps) and the Nurture Streams.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.disableSaving = function () {
  console.log("Marketo App > Disabling: Saving for Editors");
  
  if (typeof(Mkt3) !== "undefined"
     && Mkt3
     && Mkt3.data
     && Mkt3.data.Store
     && Mkt3.data.Store.prototype
     && Mkt3.data.Store.prototype.sync) {
    Mkt3.data.Store.prototype.sync = function () {
      console.log("Marketo App > Executing: Disable Saving for Editors (sync)");
    };
  }
  
  if (typeof(Ext4) !== "undefined"
     && Ext4
     && Ext4.data
     && Ext4.data.Model
     && Ext4.data.Model.prototype
     && Ext4.data.Model.prototype.destroy) {
    Ext4.data.Model.prototype.destroy = function () {
      console.log("Marketo App > Executing: Disable Saving for Editors (destroy)");
    };
  }
  
  if (typeof(Mkt3) !== "undefined"
     && Mkt3
     && Mkt3.controller
     && Mkt3.controller.editor) {
    
    if (Mkt3.controller.editor.email2
       && Mkt3.controller.editor.email2.EmailEditor
       && Mkt3.controller.editor.email2.EmailEditor.prototype
       && Mkt3.controller.editor.email2.EmailEditor.prototype.changeModuleOrder) {
      Mkt3.controller.editor.email2.EmailEditor.prototype.changeModuleOrder = function (moduleComponent, orderDelta) {
        console.log("Marketo App > Executing: Disable Saving for Editors (changeModuleOrder)");
      };
    }
    
    if (Mkt3.controller.editor.form
       && Mkt3.controller.editor.form.settings
       && Mkt3.controller.editor.form.settings.FieldSelection
       && Mkt3.controller.editor.form.settings.FieldSelection.prototype
       && Mkt3.controller.editor.form.settings.FieldSelection.prototype.deleteFormField) {
      Mkt3.controller.editor.form.settings.FieldSelection.prototype.deleteFormField = function (formField) {
        console.log("Marketo App > Executing: Enable Deleting Form Field");
        
        var formFieldWidget = formField.getFieldWidget(),
        formFieldId,
        childFieldIndex,
        childFormField,
        allFormFields;
        
        if (formFieldWidget
           && formFieldWidget.get('datatype') === 'fieldset') {
          allFormFields = this.getForm().getFormFields();
          formFieldId = formField.get('id');
          for (childFieldIndex = 0; childFieldIndex < allFormFields.getCount(); childFieldIndex++) {
            childFormField = allFormFields.getAt(childFieldIndex);
            if (childFormField.get('fieldsetFieldId') == formFieldId) {
              this.deleteFormField(childFormField);
            }
          }
        }
        
        formField.destroy({
          scope: this,
          callback: function (field, response) {
            if (response.success) {
              if (formFieldWidget) {
                formFieldWidget.destroy();
              }
            }
          }
        });
        // This allows for multiple form fields to be deleted
        this.renumberWidgets();
      };
    }
  }
};

/**************************************************************************************
 *
 *  This function disables specific requests from completing to prevent saving.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.disableRequests = function () {
  console.log("Marketo App > Disabling: Specific Requests");
  
  if (typeof(MktSession) !== "undefined"
     && MktSession
     && MktSession.ajaxRequest) {
    if (typeof(origAjaxRequestFunc) !== "function") {
      origAjaxRequestFunc = MktSession.ajaxRequest;
    }
    MktSession.ajaxRequest = function (url, opts) {
      switch (url) {
      case "crm/enableSync":
      case "leadDatabase/updateLead":
      case "fieldManagement/analyticsOptionsSubmit":
        console.log("Marketo App > Executing: Disable Specific Requests");
        return null;
        break;
      case "analytics/editReportSettings":
      case "analytics/applyComponentFilter":
      case "analytics/setReportSegmentation":
        if (typeof(MktExplorer) !== "undefined"
           && MktExplorer
           && MktExplorer.getNodeById
           && opts
           && opts.serializeParms) {
          if (opts.serializeParms.nodeId
             && MktExplorer.getNodeById(opts.serializeParms.nodeId)
             && MktExplorer.getNodeById(opts.serializeParms.nodeId).attributes
             && MktExplorer.getNodeById(opts.serializeParms.nodeId).attributes.accessZoneId.toString().search(mktoGoldenWorkspacesMatch) != -1) {
            console.log("Marketo App > Executing: Disable Specific Requests");
            return null;
          } else if (opts.serializeParms.reportId
             && MktExplorer.getNodeById(mktoAnalyticsFragment + opts.serializeParms.reportId)
             && MktExplorer.getNodeById(mktoAnalyticsFragment + opts.serializeParms.reportId).attributes
             && MktExplorer.getNodeById(mktoAnalyticsFragment + opts.serializeParms.reportId).attributes.accessZoneId.toString().search(mktoGoldenWorkspacesMatch) != -1) {
            console.log("Marketo App > Executing: Disable Specific Requests");
            return null;
          }
        }
        break;
      }
      
      if (url.search("^salesforce/enableSynch") != -1) {
        console.log("Marketo App > Executing: Disable Specific Requests");
        return null;
      };
      origAjaxRequestFunc.apply(this, arguments);
    };
  }
};

/**************************************************************************************
 *
 *  This function sets the Program Status to off for Nurture Programs
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.disableNurturePrograms = function () {
  console.log("Marketo App > Disabling: Nurture Programs");
  
  if (typeof(MktCanvas) !== "undefined"
     && MktCanvas
     && MktCanvas.getActiveTab
     && MktCanvas.getActiveTab()
     && MktCanvas.getActiveTab().config
     && MktCanvas.getActiveTab().config.accessZoneId.toString().search(mktoGoldenWorkspacesMatch) == -1
     && MktCanvas.getActiveTab().config.compId) {
    var compId = MktCanvas.getActiveTab().config.compId;
    console.log("Marketo App > Executing: Disabling Nurture Program");
    
    APP.webRequest('/marketingEvent/setProgramStatusSubmit', 'ajaxHandler=MktSession&mktReqUid=' + new Date().getTime() + Ext.id(null, ':') + '&compId=' + compId + '&_json=' + '{"programId":' + compId + ',"statusValue":"off"}' + '&xsrfId=' + MktSecurity.getXsrfId(), 'POST', true, 'json', function (response) {
      var result = JSON.parse(response);
      
      if (result.JSONResults.appvars.result == "Success") {
        console.log("Marketo App > Success: Disabled Nurture Program: " + result.JSONResults.actions[0].parameters[0][0].text);
      }
    });
  }
};

/**************************************************************************************
 *
 *  This function opens the Send via Ad Bridge modal window
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.openAdBridgeModal = function () {
  console.log("Marketo App > Opening: Ad Bridge Modal Window");
  
  var isAdBridgeSmartList = window.setInterval(function () {
      if (typeof(document.getElementsByClassName("x-btn-text mkiUserTarget")[0]) !== "undefined") {
        
        window.clearInterval(isAdBridgeSmartList);
        
        if (document
           && document.getElementsByClassName("x-btn-text mkiUserTarget")
           && document.getElementsByClassName("x-btn-text mkiUserTarget")[0]
           && document.getElementsByClassName("x-btn-text mkiUserTarget")[0].type == "button") {
          console.log("Marketo App > Executing: Open Ad Bridge Modal Window");
          
          document.getElementsByClassName("x-btn-text mkiUserTarget")[0].click();
        }
      }
    }, 0);
};

/**************************************************************************************
 *
 *  This function resets the golden Landing Pages properties/variables
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.resetGoldenLandingPageProps = function () {
  console.log("Marketo App > Resetting: Golden Landing Pages Properties/Variables");
  
  if (typeof(MktSecurity) !== "undefined"
     && MktSecurity
     && MktSecurity.getXsrfId()) {
    
    switch (currUrlFragment) {
    case mktoDefaultDiyLandingPageResponsiveEditFragment:
      console.log("Marketo App > Executing: Resetting Landing Page Responsive Properties/Variables");
      
      APP.webRequest('/data/landingPage/update?context=LPE11822&data=%5B%7B%22id%22%3A11822%2C%22responsiveOptions%22%3A%7B%22variables%22%3A%7B%22gradient1%22%3A%22%232A5370%22%2C%22gradient2%22%3A%22%23F2F2F2%22%2C%22showSection2%22%3Atrue%2C%22showSection3%22%3Atrue%2C%22showSection4%22%3Atrue%2C%22showFooter%22%3Atrue%2C%22showSocialButtons%22%3Atrue%2C%22section4ButtonLabel%22%3A%22Need%20More%20Info%3F%22%2C%22section4ButtonLink%22%3A%22%23%22%2C%22section3LeftButtonLabel%22%3A%22Join%20Us%22%2C%22section4BgColor%22%3A%22%23F2F2F2%22%2C%22footerBgColor%22%3A%22%232A5370%22%2C%22section2BgColor%22%3A%22%23F2F2F2%22%2C%22section3BgColor%22%3A%22%232A5370%22%2C%22section3LeftButtonLink%22%3A%22https%3A%2F%2Fwww.marketo.com%22%2C%22section3RightButtonLabel%22%3A%22Sign%20Up%22%7D%7D%7D%5D&xsrfId=' + MktSecurity.getXsrfId(), null, 'POST', true, "", function (result) {
        console.log(result);
      });
      break;
    }
  }
};

/**************************************************************************************
 *
 *  This function discards Landing Page drafts in DIY Design only.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {String[]} lpIds - The Mkto IDs for the Landing Pages to discard.
 *
 **************************************************************************************/
/*
APP.discardLandingPageDrafts = function (lpIds) {
  console.log("Marketo App > Discarding: Landing Page Drafts");
  
  if (typeof(mktLPLManager) !== "undefined"
     && mktLPLManager
     && mktLPLManager.doModifyPages) {
    console.log("Marketo App > Executing: Discard Landing Page Drafts");
    
    var ii,
    prevForbiddenMsg,
    prevNotFoundMsg,
    prevSystemErrorMsg,
    lpMessageBox = Ext.MessageBox.show({
        title: "MarketoLive",
        msg: "Discarding Landing Page Drafts",
        progress: false,
        wait: false,
        width: 270,
        closable: true
      });
    
    if (typeof(MktMessage) !== "undefined"
       && MktMessage) {
      
      if (MktMessage.show403Forbidden) {
        prevForbiddenMsg = MktMessage.show403Forbidden;
        MktMessage.show403Forbidden = function () {};
      }
      
      if (MktMessage.showNotFound) {
        prevNotFoundMsg = MktMessage.showNotFound;
        MktMessage.showNotFound = function () {};
      }
      
      if (MktMessage.showSystemError) {
        prevSystemErrorMsg = MktMessage.showSystemError;
        MktMessage.showSystemError = function () {};
      }
    }
    
    for (ii = 0; ii < Object.keys(lpIds).length; ii++) {
      //            console.log("Marketo App > Executing: Discard Landing Page Draft: " + ii);
      
      var lpIdKey = Object.keys(lpIds)[ii],
      lpIdVal = lpIds[lpIdKey],
      lpIdKeyString = '[' + lpIdKey + ']';
      
      mktLPLManager.doModifyPages('revert', {
        lpIdKeyString: lpIdVal,
        beForDemoAccount: true
      });
      
      if (lpMessageBox
         && lpMessageBox.hide) {
        lpMessageBox.hide();
      }
    }
    console.log("Marketo App > Finished: Discarding Landing Pages");
    window.setTimeout(function () {
      console.log("Marketo App > Re-enabling: System Messages");
      
      MktMessage.show403Forbidden = prevForbiddenMsg;
      MktMessage.showNotFound = prevNotFoundMsg;
      MktMessage.showSystemError = prevSystemErrorMsg;
    }, 15000);
  }
};
*/
/**************************************************************************************
 *
 *  This function discards Email drafts in DIY Design only.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {String[]} emIds - The Mkto IDs for the Landing Pages to discard.
 *
 **************************************************************************************/
/*
APP.discardEmailDrafts = function (emIds) {
  console.log("Marketo App > Discarding: Email Drafts");
  
  if (typeof(mktEmManager) !== "undefined"
     && mktEmManager
     && mktEmManager.discardDraft) {
    console.log("Marketo App > Executing: Discard Email Drafts");
    
    var emMessageBox = Ext.MessageBox.show({
        title: "MarketoLive",
        msg: "Discarding Email Drafts",
        progress: false,
        wait: false,
        width: 270,
        closable: true
      });
    mktEmManager.discardDraft(emIds);
    if (emMessageBox
       && emMessageBox.hide) {
      emMessageBox.hide();
    }
  }
};
*/
/**************************************************************************************
 *
 *  This function discards Form, Push Notification, In-App Message, SMS Message,
 *  Social App drafts.
 *
 *  @Author Andy Garcia
 *
 *  @function
 *
 *  @param {String} assetType - The type of asset to discard (Form,
 *                              MobilePushNotification, InAppMessage, SmsMessage,
 *                              SocialApp).
 *  @param {int[]} assetIds -   The array of asset ids to discard. These should
 *                              be in integer form not string.
 *
 **************************************************************************************/
/*
APP.discardOtherDrafts = function (assetType, assetIds) {
  console.log("Marketo App > Discarding: " + assetType + " Drafts");
  
  if (typeof(Ext4) !== "undefined"
     && Ext4
     && Ext4.getStore
     && Ext4.create
     && typeof(Mkt3) !== "undefined"
     && Mkt3) {
    console.log("Marketo App > Executing: Discard " + assetType + " Drafts");
    
    var assetStore = Ext4.getStore(assetType),
    otherMessageBox = Ext.MessageBox.show({
        title: "MarketoLive",
        msg: "Discarding Other Drafts",
        progress: false,
        wait: false,
        width: 270,
        closable: true
      });
    
    if (otherMessageBox
       && otherMessageBox.hide) {
      otherMessageBox.hide();
    }
    
    if (!assetStore) {
      assetStore = Ext4.create('Mkt3.store.' + assetType, {
          storeId: assetType
        });
    }
    assetStore.load({
      filters: [{
          property: 'id',
          value: assetIds
        }
      ],
      callback: function (assets) {
        for (var i = 0; i < assets.length; i++) {
          var asset = assets[i];
          asset.discard(function (success) {
            if (success) {
              asset.updateNode();
            }
          }, this);
        }
      }
    });
  }
};
*/
/**************************************************************************************
 *
 *  This function discards all drafts of golden assets for the specified instance.
 *
 *  @Author Andrew Garcia
 *
 *  @function
 *
 *  @param {String} accountString - instance account string (mktodemoaccount106,
 *                                  mktodemoaccount106d)
 *  @param {String} assetType - type of asset to discard (landingPage, email, other, all)
 *
 **************************************************************************************/
/*
APP.discardDrafts = function (accountString, assetType) {
  console.log("Marketo App > Discarding: Golden Assets for instance: " + accountString);
  
  // Setting the asset draft IDs to discard
  var lpIds = {},
  emIds = [],
  formIds = [],
  pushIds = [],
  inAppIds = [],
  smsIds = [],
  socIds = [];
  
  switch (accountString) {
  case mktoAccountString106:
    
    // DEFAULT
    // DIY Design: Landing Page, Landing Page Responsive
    lpIds["dpageid_11826"] = "dpageid_11826";
    lpIds["dpageid_11822"] = "dpageid_11822";
    // Replicate Success Roadshow Example: Registration Page, Thank You for Registering
    lpIds["dpageid_8819"] = "dpageid_8819";
    lpIds["dpageid_8941"] = "dpageid_8941";
    // Replicate Success Webinar Example: Recorded Webinar LP, Registration Landing Page, Thank You LP
    lpIds["dpageid_4876"] = "dpageid_4876";
    lpIds["dpageid_4872"] = "dpageid_4872";
    lpIds["dpageid_4874"] = "dpageid_4874";
    
    // Default: DIY Design: Email
    emIds.push(15464);
    // Default: DIY Design: Email (Modular)
    emIds.push(21424);
    // Default: DIY Design: Email (Responsive)
    emIds.push(20931);
    // Default: Email Marketing: AB Test Configuration, AB Test Dashboard, Champion/Chalenger, Email Program Dashboard
    emIds.push(18113, 18106, 18111, 18110);
    // Default: Replicate Success: Roadshow Example
    emIds.push(10010, 10179, 10180, 12845, 10181, 10182, 10183, 10184);
    // Default: Replicate Success: Webinar Example
    emIds.push(4894, 3764, 3765, 3767, 3766, 3762);
    // Default: Intelligent Nurturing
    emIds.push(12818, 12820, 12819, 12816, 12811, 12815, 12812, 12813, 12814, 12821, 12817, 12823);
    // Default: Actionable Insight: BANT Nurture for Sales
    emIds.push(12900, 12901, 12899, 12898);
    // Default: Actionable Insight: Sales Auto Reach Out
    emIds.push(12902, 12903, 12904);
    
    // Default: DIY Design, Replicate Success Roadshow Example, Replicate Success Webinar Example
    formIds.push(3576, 1749, 1900);
    
    // Default: DIY Design, Mobile Engagement
    pushIds.push(29, 23);
    
    // Default: Mobile Engagement
    inAppIds.push(309, 446);
    
    // Default: Mobile Engagement
    smsIds.push(1);
    
    // Default: DIY Design
    socIds.push(587, 491, 484);
    
    // JAPANESE
    // Japanese DIY Design: 1
    lpIds["dpageid_11856"] = "dpageid_11856";
    // Japanese Event Roadshow Unknown: 1, 2
    lpIds["dpageid_12420"] = "dpageid_12420";
    lpIds["dpageid_12418"] = "dpageid_12418";
    // Japanese Replicate Success Webinar Example: 1, 2, 3
    lpIds["dpageid_11552"] = "dpageid_11552";
    lpIds["dpageid_11550"] = "dpageid_11550";
    lpIds["dpageid_11553"] = "dpageid_11553";
    // Japanese Replicate Success Roadshow Example: 1, 2
    lpIds["dpageid_12345"] = "dpageid_12345";
    lpIds["dpageid_11556"] = "dpageid_11556";
    
    // Japanese: Content Unknown
    emIds.push(16474);
    // Japanese: Event Roadshow Unknown
    emIds.push(18117, 18118, 18122, 18119, 18116, 18123, 18120, 18121, 18124);
    // Japanese: Replicate Success Webinar
    emIds.push(16118, 16119, 16120, 16122, 16121, 16117);
    // Japanese: Replicate Success Roadshow
    emIds.push(16331, 16332, 16338, 16333, 16123, 16339, 16335, 16336, 17868);
    // Japanese: Intelligent Nurturing
    emIds.push(16125, 16129, 16126, 16124, 16132, 16131, 16130, 16128, 16127, 16133, 16137, 16136);
    // Japanese: Email Blast Unknown
    emIds.push(18126);
    
    // Japanese Default: DIY Design, Japanese Event Roadshow Unknown, Japanese Replicate Success Webinar Example, Japanese Replicate Success Roadshow Example
    formIds.push(3018, 3708, 3020, 3021);
    
    // Japanese: DIY Design, Mobile Engagement, Unknown
    pushIds.push(99, 216, 103, 218);
    
    // Japanese: DIY Design
    socIds.push(853);
    
    // FINANCIAL SERVICES
    // Financial Services DIY Design: Mortgage Landing Page, Banking Landing Page, Preferences Page
    lpIds["dpageid_13187"] = "dpageid_13187";
    lpIds["dpageid_13185"] = "dpageid_13185";
    lpIds["dpageid_12709"] = "dpageid_12709";
    // Financial Services Event Management Home Buyinng Seminar: Recorded Webinar LP, Reg LP, Thank You LP
    lpIds["dpageid_12720"] = "dpageid_12720";
    lpIds["dpageid_12717"] = "dpageid_12717";
    lpIds["dpageid_12719"] = "dpageid_12719";
    
    // Financial Services > Asset Management: DIY Design
    emIds.push(22818);
    // Financial Services > Retail Banking: DIY Design
    emIds.push(20350, 20368);
    
    // Financial Services > Asset Management: DIY Design
    formIds.push(4970, 4968, 4969);
    // Financial Services > Retail Banking: DIY Design
    formIds.push(3952, 4476, 3953);
    
    // Financial Services > Asset Management: Mobile Engagement
    //pushIds.push();
    // Financial Services > Retail Banking: Mobile Engagement
    pushIds.push(465, 189);
    
    // Financial Services > Asset Management
    inAppIds.push(464);
    // Financial Services > Retail Banking
    inAppIds.push(448);
    
    // Financial Services > Asset Management: DIY Design
    socIds.push(1238, 1239, 1240, 1241, 1242);
    // Financial Services > Retail Banking: DIY Design
    socIds.push(1091, 1090, 1093, 1092, 1094);
    
    // HEALTHCARE
    // Healthcare DIY Design: Landing Page, Landing Page Offer, Landing Page Responsive, Preference Page
    lpIds["dpageid_12569"] = "dpageid_12569";
    lpIds["dpageid_12932"] = "dpageid_12932";
    lpIds["dpageid_13165"] = "dpageid_13165";
    lpIds["dpageid_12586"] = "dpageid_12586";
    // Healthcare Event Management HC - Tour the Clinic: Recorded Webinar LP
    lpIds["dpageid_12517"] = "dpageid_12517";
    
    // Healthcare Services: DIY Design
    emIds.push(20327, 21812);
    
    // Healthcare DIY Design
    formIds.push(3816, 3818, 3828);
    
    // Healthcare DIY: Mobile Engagement
    pushIds.push(164);
    
    // Healthcare: Mobile Engagement
    inAppIds.push(449);
    
    // Healthcare: DIY Design
    socIds.push(1021, 1023, 1025, 1022, 1020);
    
    // HIGHER EDUCATION
    // Higher Education DIY Design: Landing Page, Landing Page - In State, Landing Page - Video, Landing Page Responsive, Preference Page
    lpIds["dpageid_12250"] = "dpageid_12250";
    lpIds["dpageid_12934"] = "dpageid_12934";
    lpIds["dpageid_12401"] = "dpageid_12401";
    lpIds["dpageid_13167"] = "dpageid_13167";
    lpIds["dpageid_12248"] = "dpageid_12248";
    // Higher Education Event Management HE - Event: Thanks and Next Event
    lpIds["dpageid_12177"] = "dpageid_12177";
    
    // Higher Ed Services: DIY Design
    emIds.push(20329);
    
    // Higher Ed DIY Design
    formIds.push(3313, 4125, 3559);
    
    // Higher Ed: Mobile Engagement
    pushIds.push(132);
    
    // Higher Ed: Mobile Engagement
    inAppIds.push(450);
    
    // Higher Ed: DIY Design
    socIds.push(860, 1024, 861, 859, 858);
    
    // MANUFACTURING
    
    
    // TRAVEL LESIURE
    break;
    
  case mktoAccountString106d:
    
    // DEFAULT
    // DIY Design: Landing Page, Landing Page Responsive
    lpIds["dpageid_11826"] = "dpageid_11826";
    lpIds["dpageid_11822"] = "dpageid_11822";
    // Replicate Success Roadshow Example: Registration Page, Thank You for Registering
    lpIds["dpageid_8819"] = "dpageid_8819";
    lpIds["dpageid_8941"] = "dpageid_8941";
    // Replicate Success Webinar Example: Recorded Webinar LP, Registration Landing Page, Thank You LP
    lpIds["dpageid_4876"] = "dpageid_4876";
    lpIds["dpageid_4872"] = "dpageid_4872";
    lpIds["dpageid_4874"] = "dpageid_4874";
    
    // Default DIY Design
    emIds.push(15464);
    // Default Email Marketing: AB Test Configuration, AB Test Dashboard, Champion/Chalenger, Email Program Dashboard
    emIds.push(18113, 18106, 18111, 18110);
    // Default Replicate Success: Roadshow Example
    emIds.push(10010, 10179, 10180, 12845, 10181, 10182, 10183, 10184);
    // Default Replicate Success: Webinar Example
    emIds.push(4894, 3764, 3765, 3767, 3766, 3762);
    // Default Intelligent Nurturing
    emIds.push(12818, 12820, 12819, 12816, 12811, 12815, 12812, 12813, 12814, 12821, 12817, 12823);
    // Default Actionable Insight: BANT Nurture for Sales
    emIds.push(12900, 12901, 12899, 12898);
    // Default Actionable Insight: Sales Auto Reach Out
    emIds.push(12902, 12903, 12904);
    
    // Default: DIY Design, Replicate Success Roadshow Example, Replicate Success Webinar Example
    formIds.push(3576, 1749, 1900);
    
    // Default: DIY Design, Mobile Engagement
    pushIds.push(29, 23);
    
    // Default DIY Design
    socIds.push(586, 587, 491, 484);
    
    // JAPANESE
    // Japanese DIY Design: 1
    lpIds["dpageid_11856"] = "dpageid_11856";
    // Japanese Event Roadshow Unknown: 1, 2
    lpIds["dpageid_12420"] = "dpageid_12420";
    lpIds["dpageid_12418"] = "dpageid_12418";
    // Japanese Replicate Success Webinar Example: 1, 2, 3
    lpIds["dpageid_11552"] = "dpageid_11552";
    lpIds["dpageid_11550"] = "dpageid_11550";
    lpIds["dpageid_11553"] = "dpageid_11553";
    // Japanese Replicate Success Roadshow Example: 1, 2
    lpIds["dpageid_12345"] = "dpageid_12345";
    lpIds["dpageid_11556"] = "dpageid_11556";
    
    // Japanese Default Content Unknown
    emIds.push(16474, 17254, 16403);
    // Japanese Event Roadshow Unknown
    emIds.push(18117, 18118, 18122, 18119, 18116, 18123, 18120, 18121, 18124);
    // Japanese Replicate Success Webinar
    emIds.push(16118, 16119, 16120, 16122, 16121, 16117);
    // Japanese Replicate Success Roadshow
    emIds.push(16331, 16332, 16338, 16333, 16123, 16339, 16335, 16336, 17868);
    // Japanese Intelligent Nurturing
    emIds.push(16125, 16129, 16126, 16124, 16132, 16131, 16130, 16128, 16127, 16133, 16137, 16136);
    // Japanese Default Email Blast Unknown
    emIds.push(18126);
    
    // Japanese: Default DIY Design, Japanese Event Roadshow Unknown, Japanese Replicate Success Webinar Example, Japanese Replicate Success Roadshow Example
    formIds.push(3018, 3708, 3020, 3021);
    
    // Japanese: DIY Design, Mobile Engagement, Unknown
    pushIds.push(99, 216, 103, 218);
    
    // Japanese DIY Design
    socIds.push(853);
    
    // FINANCIAL SERVICES
    // Financial Services DIY Design: Mortgage Landing Page, Banking Landing Page, Preferences Page
    lpIds["dpageid_13187"] = "dpageid_13187";
    lpIds["dpageid_13185"] = "dpageid_13185";
    lpIds["dpageid_12709"] = "dpageid_12709";
    // Financial Services Event Management Home Buyinng Seminar: Recorded Webinar LP, Reg LP, Thank You LP
    lpIds["dpageid_12720"] = "dpageid_12720";
    lpIds["dpageid_12717"] = "dpageid_12717";
    lpIds["dpageid_12719"] = "dpageid_12719";
    
    // Financial Services DIY Design
    emIds.push(20350, 20368);
    
    // Financial Services: DIY Design
    formIds.push(3952, 3955, 3953);
    
    // Financial Services: DIY Design, Mobile Engagement
    pushIds.push(187);
    
    // Financial Services DIY Design
    socIds.push(1091, 1090, 1093, 1092, 1094);
    
    // HEALTHCARE
    // Healthcare DIY Design: Landing Page, Landing Page Offer, Landing Page Responsive, Preference Page
    lpIds["dpageid_12569"] = "dpageid_12569";
    lpIds["dpageid_12932"] = "dpageid_12932";
    lpIds["dpageid_13165"] = "dpageid_13165";
    lpIds["dpageid_12586"] = "dpageid_12586";
    // Healthcare Event Management HC - Tour the Clinic: Recorded Webinar LP
    lpIds["dpageid_12517"] = "dpageid_12517";
    
    // Healthcare Services DIY Design
    emIds.push(20327);
    
    // Healthcare: DIY Design
    formIds.push(3816, 3818, 3828);
    
    // Healthcare: DIY Design, Mobile Engagement
    pushIds.push(169);
    
    // Healthcare DIY Design
    socIds.push(1021, 1023, 1025, 1022, 1020);
    
    // HIGHER EDUCATION
    // Higher Education DIY Design: Landing Page, Landing Page - In State, Landing Page - Video, Landing Page Responsive, Preference Page
    lpIds["dpageid_12250"] = "dpageid_12250";
    lpIds["dpageid_12934"] = "dpageid_12934";
    lpIds["dpageid_12401"] = "dpageid_12401";
    lpIds["dpageid_13167"] = "dpageid_13167";
    lpIds["dpageid_12248"] = "dpageid_12248";
    // Higher Education Event Management HE - Event: Thanks and Next Event
    lpIds["dpageid_12177"] = "dpageid_12177";
    
    // Higher Ed Services DIY Design
    emIds.push(20329);
    
    // Higher Ed: DIY Design
    formIds.push(3313, 4125, 3559);
    
    // Higher Ed: DIY Design, Mobile Engagement
    pushIds.push(131);
    
    // Higher Ed DIY Design
    socIds.push(860, 1024, 861, 859, 858);
    
    // MANUFACTURING
    // DIY Design
    lpIds["dpageid_13280"] = "dpageid_13280";
    lpIds["dpageid_13278"] = "dpageid_13278";
    lpIds["dpageid_13276"] = "dpageid_13276";
    lpIds["dpageid_13503"] = "dpageid_13503";
    lpIds["dpageid_13505"] = "dpageid_13505";
    // Event Management
    lpIds["dpageid_13283"] = "dpageid_13283";
    lpIds["dpageid_13282"] = "dpageid_13282";
    lpIds["dpageid_13289"] = "dpageid_13289";
    lpIds["dpageid_13286"] = "dpageid_13286";
    lpIds["dpageid_13288"] = "dpageid_13288";
    
    // TECHNOLOGY
    // DIY Design
    lpIds["dpageid_13346"] = "dpageid_13346";
    lpIds["dpageid_13345"] = "dpageid_13345";
    lpIds["dpageid_13347"] = "dpageid_13347";
    // Event Management
    lpIds["dpageid_13319"] = "dpageid_13319";
    lpIds["dpageid_13332"] = "dpageid_13332";
    lpIds["dpageid_13329"] = "dpageid_13329";
    lpIds["dpageid_13331"] = "dpageid_13331";
    
    // TRAVEL LESIURE
    // DIY Design:
    lpIds["dpageid_13528"] = "dpageid_13528";
    lpIds["dpageid_13563"] = "dpageid_13563";
    lpIds["dpageid_13529"] = "dpageid_13529";
    // Event Management
    lpIds["dpageid_13475"] = "dpageid_13475";
    break;
  }
  
  switch (assetType) {
  case "landingPage":
    var canDiscardLandingPageDrafts = window.setInterval(function () {
        if (typeof(mktLPLManager) !== "undefined"
           && mktLPLManager) {
          window.clearInterval(canDiscardLandingPageDrafts);
          
          APP.discardLandingPageDrafts(lpIds);
        }
      }, 0);
    break;
    
  case "email":
    var canDiscardEmailDrafts = window.setInterval(function () {
        if (typeof(mktEmManager) !== "undefined"
           && mktEmManager.discardDraft) {
          window.clearInterval(canDiscardEmailDrafts);
          
          APP.discardEmailDrafts(emIds);
        }
      }, 0);
    break;
    
  case "other":
    var canDiscardOtherDrafts = window.setInterval(function () {
        if (typeof(Ext4) !== "undefined"
           && Ext4
           && Ext4.getStore
           && Ext4.create
           && typeof(Mkt3) !== "undefined"
           && Mkt3) {
          window.clearInterval(canDiscardOtherDrafts);
          
          APP.discardOtherDrafts("Form", formIds);
          APP.discardOtherDrafts("MobilePushNotification", pushIds);
          APP.discardOtherDrafts("InAppMessage", inAppIds);
          APP.discardOtherDrafts("SmsMessage", smsIds);
          APP.discardOtherDrafts("SocialApp", socIds);
        }
      }, 0);
    break;
    
  case "all":
    var canDiscardLandingPageDrafts,
    canDiscardEmailDrafts,
    canDiscardOtherDrafts;
    
    canDiscardLandingPageDrafts = window.setInterval(function () {
        if (typeof(mktLPLManager) !== "undefined"
           && mktLPLManager) {
          window.clearInterval(canDiscardLandingPageDrafts);
          
          APP.discardLandingPageDrafts(lpIds);
        }
      }, 0);
    
    canDiscardEmailDrafts = window.setInterval(function () {
        if (typeof(mktEmManager) !== "undefined"
           && mktEmManager.discardDraft) {
          window.clearInterval(canDiscardEmailDrafts);
          
          APP.discardEmailDrafts(emIds);
        }
      }, 0);
    
    canDiscardOtherDrafts = window.setInterval(function () {
        if (typeof(Ext4) !== "undefined"
           && Ext4
           && Ext4.getStore
           && Ext4.create
           && typeof(Mkt3) !== "undefined"
           && Mkt3) {
          window.clearInterval(canDiscardOtherDrafts);
          
          APP.discardOtherDrafts("Form", formIds);
          APP.discardOtherDrafts("MobilePushNotification", pushIds);
          APP.discardOtherDrafts("InAppMessage", inAppIds);
          APP.discardOtherDrafts("SmsMessage", smsIds);
          APP.discardOtherDrafts("SocialApp", socIds);
        }
      }, 0);
    break;
  }
};
*/

/**************************************************************************************
 *
 *  This function tracks tree node clicks for Heap Analytics.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

APP.trackNodeClick = function () {
  console.log("Marketo App > Tracking: Tree Node Click");
  
  if (typeof(Ext) !== "undefined"
     && Ext
     && Ext.tree
     && Ext.tree.TreeEventModel
     && Ext.tree.TreeEventModel.prototype
     && Ext.tree.TreeEventModel.prototype.onNodeClick) {
    //console.log("Marketo App > Executing: Tracking Tree Node Click");
    Ext.tree.TreeEventModel.prototype.onNodeClick = function (e, node) {
      
      if (node
         && node.text
         && node.attributes
         && node.attributes.accessZoneId) {
        
        var currNode = node,
        heapEvent = {
          name: "",
          assetName: currNode.text,
          assetId: currNode.attributes.id,
          assetType: currNode.attributes.compType,
          assetPath: "",
          workspaceId: currNode.attributes.accessZoneId,
          workspaceName: ""
        };
        
        heapEvent.assetPath = currNode.text;
        
        for (var ii = 0; ii < node.getDepth() - 1; ii++) {
          currNode = currNode.parentNode;
          heapEvent.assetPath = currNode.text + " > " + heapEvent.assetPath;
        }
        
        heapEvent.workspaceName = APP.getWorkspaceName(currNode.attributes.accessZoneId);
        
        if (currNode.attributes.accessZoneId.toString().search(mktoGoldenWorkspacesMatch) != -1) {
          heapEvent.name = heapEvent.workspaceName;
          
          if (heapEvent.workspaceName == "Admin") {
            heapEvent.assetType = "Admin Area";
            heapEvent.workspaceId = 0;
          }
        } else if (currNode.attributes.accessZoneId.toString().search(mktoMyWorkspaceIdMatch) != -1) {
          heapEvent.name = heapEvent.workspaceName;
          heapEvent.userFolder = userName;
        } else {
          heapEvent.name = mktoOtherWorkspaceName
        }
        
        APP.heapTrack("track", heapEvent);
      }
      
      node.ui.onClick(e);
    }
  }
};

/**************************************************************************************
 *
 *  This function tracks and identifies the current user via Heap Analytics
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {String} action - The desired action (id, track).
 *  @param {Object} event - The object of the event to be tracked.
 *
 **************************************************************************************/

APP.heapTrack = function (action, event) {
  var isHeapAnalytics = window.setInterval(function () {
      if (typeof(heap) !== "undefined"
         && heap
         && heap.loaded) {
        
        window.clearInterval(isHeapAnalytics);
        
        switch (action) {
          // Heap Analytics Identify User
        case "id":
          var oneLoginEmail = APP.getCookie("onelogin_email"),
          oneLoginFirstName = APP.getCookie("onelogin_first_name"),
          oneLoginLastName = APP.getCookie("onelogin_last_name");
          
          if (MktPage
             && MktPage.userid) {
            console.log("Marketo App > Heap Analytics ID: " + MktPage.userid);
            heap.identify(MktPage.userid);
          }
          
          if (oneLoginFirstName
             && oneLoginLastName) {
            heap.addUserProperties({
              Name: oneLoginFirstName + " " + oneLoginLastName
            });
          } else if (MktPage
             && MktPage.userName) {
            heap.addUserProperties({
              Name: MktPage.userName.replace(/ ?\[[^\]]+\]/, "")
            });
          }
          
          if (MktPage
             && MktPage.userName) {
            var roleSubstring = MktPage.userName.search(/\[[^\]]+\]/);
            
            if (roleSubstring != -1) {
              heap.addUserProperties({
                Role: MktPage.userName.substring(roleSubstring).replace(/^\[([^\]]+)]$/, "$1")
              });
            }
          }
          
          if (oneLoginEmail) {
            heap.addUserProperties({
              Email: oneLoginEmail
            });
          }
          
          if (MktPage
             && MktPage.savedState
             && MktPage.savedState.custPrefix) {
            if (MktPage.savedState.custPrefix == mktoAccountString106) {
              heap.addEventProperties({
                Environment: "Internal"
              });
            } else if (MktPage.savedState.custPrefix == mktoAccountString106d) {
              heap.addEventProperties({
                Environment: "Partner"
              });
            } else if (MktPage.savedState.custPrefix == mktoAccountStringMaster) {
              heap.addEventProperties({
                Environment: "Master"
              });
            }
          }
          break;
          
          // Heap Analytics Event Tracking
        case "track":
          var heapApp,
          heapArea,
          heapEventProps;
          
          if (MktPage
             && MktPage.friendlyName) {
            heapApp = MktPage.friendlyName;
          } else {
            heapApp = "Marketo";
          }
          
          if (MktPage
             && MktPage.baseTitle) {
            heapArea = MktPage.baseTitle.split("•")[0].trimRight();
          } else {
            heapArea = "Unknown";
          }
          
          if (event) {
            heapEventProps = {
              app: heapApp,
              assetName: event.assetName,
              assetId: event.assetId,
              assetType: event.assetType,
              assetPath: event.assetPath,
              workspaceId: event.workspaceId,
              workspaceName: event.workspaceName,
              userFolder: event.userFolder,
              area: "",
              environment: "",
              url: currentUrl
            };
            
            if (event.assetArea) {
              heapEventProps.area = event.assetArea;
            } else {
              heapEventProps.area = heapArea;
            }
            
            if (MktPage
               && MktPage.savedState
               && MktPage.savedState.custPrefix) {
              if (MktPage.savedState.custPrefix == mktoAccountString106) {
                heapEventProps.environment = "Internal";
              } else if (MktPage.savedState.custPrefix == mktoAccountString106d) {
                heapEventProps.environment = "Partner";
              } else if (MktPage.savedState.custPrefix == mktoAccountStringMaster) {
                heapEventProps.environment = "Master";
              }
            }
            
            console.log("Marketo App > Tracking: Heap Event: " + event.name + "\n" + JSON.stringify(heapEventProps, null, 2));
            heap.track(event.name, heapEventProps);
          }
          break;
        case "addProp":
          console.log("Marketo App > Adding: Heap Event Properties: " + JSON.stringify(event, null, 2));
          heap.addEventProperties(event);
          break;
        }
      }
    }, 0);
};

/**************************************************************************************
 *
 *  Main
 *
 **************************************************************************************/

window.mkto_live_extension_state = "MarketoLive extension is alive!";

var toggleState = APP.getCookie("toggleState");

if (toggleState == null) {
  toggleState = "true";
}

var isMktPageApp = window.setInterval(function () {
    if (typeof(MktPage) !== "undefined") {
      console.log("Marketo App > Location: Marketo Page");
      
      var userId;
      
      if (MktPage.savedState
         && MktPage.savedState.custPrefix
         && MktPage.savedState.custPrefix != ""
         && MktPage.userid
         && MktPage.userid != ""
         && Mkt3
         && Mkt3.DL
         && Mkt3.DL.getDlToken()
         && Mkt3.DL.getDlToken() != "") {
        
        window.clearInterval(isMktPageApp);
        
        accountString = MktPage.savedState.custPrefix;
        userId = MktPage.userid.toLowerCase();
        currUrlFragment = Mkt3.DL.getDlToken();
        
        if (Mkt3.DL.dl
           && Mkt3.DL.dl.dlCompCode) {
          currCompFragment = Mkt3.DL.dl.dlCompCode;
        }
        
        if (userId.search("\.demo@(marketo\.com|marketolive\.com)$") != -1) {
          userName = userId.split(".demo")[0];
        } else {
          userName = userId.split("@")[0];
          if (userName == "marketolive") {
            userName = userId.split("@")[1].split(".")[0];
          }
        }
      }
      
      APP.setInstanceInfo(accountString);
      
      chrome.runtime.sendMessage(extensionId, {
        action: "checkExtensionVersion",
        minVersion: extensionMinVersion
      }, null, function (response) {
        if (response
           && response.isValidExtension) {
          chrome.runtime.sendMessage(extensionId, {
            action: "checkBadExtension"
          }, null, function (response) {
            if (response
               && response.isValidExtension) {
              APP.validateDemoExtensionCheck(response.isValidExtension);
              if (accountString == mktoAccountStringMaster) {
                APP.overrideSuperballMenuItems(response.isValidExtension);
                //restoreEmailInsights = true;
                if (currUrlFragment
                   && currUrlFragment == mktoMyMarketoFragment) {
                  APP.overrideHomeTiles(response.isValidExtension);
                }
              }
              console.log("Marketo App > checkBadExtension Msg > Response: " + JSON.stringify(response));
            } else {
              if (!response) {
                APP.validateDemoExtensionCheck(true);
              } else {
                APP.validateDemoExtensionCheck(false);
              }
            }
            if (chrome.runtime.lastError) {
              console.log("Marketo App > checkBadExtension Msg > Error: " + JSON.stringify(chrome.runtime.lastError));
            }
          });
        } else {
          if (!response) {
            APP.validateDemoExtensionCheck(true);
          } else {
            APP.validateDemoExtensionCheck(false);
          }
        }
        if (chrome.runtime.lastError) {
          console.log("Marketo App > checkExtensionVersion Msg > Error: " + JSON.stringify(chrome.runtime.lastError));
        }
      });
      
      if (MktPage.userid
         && MktPage.userName) {
        var mktoRole = MktPage.userName.match(/\[[^\]]+\]/);
        
        if (mktoRole != null) {
          mktoRole = mktoRole[0].replace(/^\[([^\]]+)]$/, "$1");
        }
        chrome.runtime.sendMessage(extensionId, {
          action: "setMktoCookies",
          mktoUserId: MktPage.userid,
          mktoName: MktPage.userName.replace(/ ?\[[^\]]+\]/, ""),
          mktoRole: mktoRole
        });
        
        APP.sendMktoMessage(accountString, mktoRole, userName);
      }
      
      if (currUrlFragment) {
        if (currUrlFragment == mktoAccountBasedMarketingFragment) {
          var navItems = document.getElementsByClassName("x4-tab-center"),
          origNavItemOnClick;
          
          for (var ii = 0; ii < navItems.length; ii++) {
            var navButton = navItems[ii].parentNode.parentNode,
            navItem = navItems[ii].getElementsByClassName("x4-tab-inner");
            
            if (navItem.length > 0
               && navItem[0].innerHTML) {
              if (typeof(origNavItemOnClick) !== "function") {
                origNavItemOnClick = navButton.onclick;
              }
              navButton.onclick = function () {
                APP.heapTrack("addProp", {
                  area: "ABM",
                  assetType: APP.formatText(this.getElementsByClassName("x4-tab-inner")[0].innerHTML)
                });
                
                if (typeof(origNavItemOnClick) == "function") {
                  origNavItemOnClick.apply(this, arguments);
                }
              };
            }
          }
          
          if (document.getElementsByClassName("x4-tab-top-active").length > 0
             && document.getElementsByClassName("x4-tab-top-active")[0].getElementsByClassName("x4-tab-inner").length > 0) {
            APP.heapTrack("addProp", {
              area: "ABM",
              assetType: APP.formatText(document.getElementsByClassName("x4-tab-top-active")[0].getElementsByClassName("x4-tab-inner")[0].innerHTML)
            });
          }
        } else if (currUrlFragment == mktoMyMarketoFragment) {
          APP.overrideHomeTiles(restoreEmailInsights);
          APP.heapTrack("track", {
            name: "My Marketo",
            assetName: "Home"
          });
        } else if (currUrlFragment.search(mktoDisableButtonsFragmentMatch) != -1) {
          APP.disableButtons();
        } else if (currUrlFragment.search(mktoAnalyticsHomeFragment) != -1) {
          APP.overrideAnalyticsTiles();
        } else if (currUrlFragment.search("^" + APP.getAssetCompCode("Nurture Program") + "[0-9]+A1$") != -1) {
          APP.disableNurturePrograms();
        } else if (currUrlFragment == mktoAdBridgeSmartListFragment) {
          console.log("Marketo App > Location: Ad Bridge Smart List");
          
          APP.openAdBridgeModal();
        } else if (currUrlFragment == mktoAdminSalesforceFragment
           || currUrlFragment == mktoAdminDynamicsFragment) {
          console.log("Marketo App > Location: Admin > CRM");
          
          APP.hideOtherToolbarItems([{
                id: "enableSync", //Enable/Disable Sync
                action: "setVisible"
              }
            ]);
        } else if (currUrlFragment == mktoAdminRcaCustomFieldSync) {
          console.log("Marketo App > Location: Admin > Revenue Cycle Analytics > Custom Field Sync");
          
          APP.hideOtherToolbarItems([{
                id: "cadChangeButton", //Edit Sync Option
                action: "setVisible"
              }
            ]);
        }
      }
      
      // Only execute this block if the user is not on an editor page.
      if (currUrlFragment
         && currUrlFragment.search(mktoAnalyticsFragmentMatch) == -1
         && (!currCompFragment
           || (currCompFragment.search(mktoAbmFragmentMatch) == -1
             && currCompFragment.search(mktoDesignersFragmentMatch) == -1))) {
        
        if (accountString.search(mktoAccountStrings106Match) != -1) {
          //APP.discardDrafts(accountString, "landingPage");
          APP.overrideTreeNodeExpand();
          APP.overrideTreeNodeCollapse();
          APP.overrideSaving();
          APP.disableDragAndDrop();
          APP.disableMenus();
          APP.hideToolbarItems();
          APP.overrideDraftEdits();
          APP.disableFormSaveButtons();
          APP.disableFormDeleteButtons();
          APP.disableHarmfulSaveButtons();
          APP.overrideSmartCampaignSaving();
          APP.trackNodeClick();
          APP.trackTreeNodeEdits();
          APP.overrideAssetSaveEdit();
          APP.overrideRenamingFolders();
          APP.overrideCanvas();
          APP.overrideUpdatePortletOrder();
          APP.disableConfirmationMessage();
          APP.disableRequests();
          APP.overrideNewProgramCreate();
          APP.overrideNewAssetCreate();
          APP.overrideNewFolders();
          APP.hideFoldersOnImport();
          //APP.overrideSmartCampaignCanvas();
          //APP.hidePageGrid();
          //APP.limitNurturePrograms();
          APP.heapTrack("track", {
            name: "Last Loaded",
            assetName: "Page"
          });
        } else if (accountString == mktoAccountStringMaster) {
          APP.overrideTreeNodeExpand();
          APP.overrideTreeNodeCollapse();
          APP.overrideSaving();
          APP.disableDragAndDrop();
          APP.disableMenus();
          APP.hideToolbarItems();
          APP.overrideDraftEdits();
          APP.disableFormSaveButtons();
          APP.disableFormDeleteButtons();
          APP.disableHarmfulSaveButtons();
          APP.overrideSmartCampaignSaving();
          APP.trackNodeClick();
          APP.trackTreeNodeEdits();
          APP.overrideAssetSaveEdit();
          APP.overrideRenamingFolders();
          APP.overrideCanvas();
          APP.overrideUpdatePortletOrder();
          APP.disableConfirmationMessage();
          APP.disableRequests();
          APP.heapTrack("track", {
            name: "Last Loaded",
            assetName: "Page"
          });
        } else if (accountString == mktoAccountStringDynamics) {
          APP.overrideTreeNodeExpand();
          APP.overrideTreeNodeCollapse();
          APP.overrideSaving();
          APP.disableDragAndDrop();
          APP.disableMenus();
          APP.hideToolbarItems();
          APP.overrideDraftEdits();
          APP.disableFormSaveButtons();
          APP.disableFormDeleteButtons();
          APP.disableHarmfulSaveButtons();
          APP.overrideSmartCampaignSaving();
          APP.trackTreeNodeEdits();
          APP.overrideAssetSaveEdit();
          APP.overrideRenamingFolders();
          APP.overrideCanvas();
          APP.overrideUpdatePortletOrder();
          APP.disableConfirmationMessage();
          APP.disableRequests();
          APP.heapTrack("track", {
            name: "Last Loaded",
            assetName: "Page"
          });
        } else if (accountString == mktoAccountStringQe) {
          APP.disableMenus();
          APP.hideToolbarItems();
          APP.disableFormSaveButtons();
          APP.disableFormDeleteButtons();
          APP.disableHarmfulSaveButtons();
          APP.overrideAssetSaveEdit();
          APP.overrideRenamingFolders();
        } else if (toggleState == "false") {
          APP.overrideSaving();
          APP.overrideSmartCampaignSaving();
          APP.overrideUpdatePortletOrder();
          APP.disableConfirmationMessage();
        }
      } else if (currCompFragment) {
        console.log("Marketo App > Location: Designers, ABM Areas");
        
        switch (currCompFragment) {
        case mktoAbmDiscoverMarketoCompaniesFragment:
          console.log("Marketo App > Location: ABM > Discover Marketo Companies");
          APP.disableMenus();
          APP.hideToolbarItems();
          APP.disableFormSaveButtons();
          APP.disableFormDeleteButtons();
          APP.disableHarmfulSaveButtons();
          APP.heapTrack("track", {
            name: "Last Loaded",
            assetName: "Page"
          });
          APP.heapTrack("addProp", {
            area: "ABM",
            assetType: "Discover Marketo Companies"
          });
          break;
        case mktoAbmDiscoverCrmAccountsFragment:
          console.log("Marketo App > Location: ABM > Discover CRM Accounts");
          APP.disableMenus();
          APP.hideToolbarItems();
          APP.disableFormSaveButtons();
          APP.disableFormDeleteButtons();
          APP.disableHarmfulSaveButtons();
          APP.heapTrack("track", {
            name: "Last Loaded",
            assetName: "Page"
          });
          APP.heapTrack("addProp", {
            area: "ABM",
            assetType: "Discover CRM Accounts"
          });
          break;
        case mktoAbmNamedAccountFragment:
          console.log("Marketo App > Location: ABM > Named Account");
          APP.disableMenus();
          APP.hideToolbarItems();
          APP.disableFormSaveButtons();
          APP.disableFormDeleteButtons();
          APP.disableHarmfulSaveButtons();
          APP.heapTrack("track", {
            name: "Last Loaded",
            assetName: "Page"
          });
          APP.heapTrack("addProp", {
            area: "ABM",
            assetType: "Named Account"
          });
          break;
        case mktoAbmImportNamedAccountsFragment:
          console.log("Marketo App > Location: ABM > Import Named Accounts");
          APP.disableMenus();
          APP.hideToolbarItems();
          APP.disableFormSaveButtons();
          APP.disableFormDeleteButtons();
          APP.disableHarmfulSaveButtons();
          APP.heapTrack("track", {
            name: "Last Loaded",
            assetName: "Page"
          });
          APP.heapTrack("addProp", {
            area: "ABM",
            assetType: "Import Named Accounts"
          });
          break;
          
        case mktoLandingPageEditFragment:
          console.log("Marketo App > Location: Landing Page Editor");
          
          APP.resetGoldenLandingPageProps();
          APP.disableDesignerSaving("landingPage", "edit");
          APP.disableFormSaveButtons();
          break;
          
        case mktoLandingPagePreviewFragment:
          console.log("Marketo App > Location: Landing Page Previewer");
          
          APP.disableDesignerSaving("landingPage", "preview");
          break;
          
        case mktoLandingPagePreviewDraftFragment:
          console.log("Marketo App > Location: Landing Page Draft Previewer");
          
          APP.disableDesignerSaving("landingPage", "preview");
          break;
          
        case mktoLandingPageTemplateEditFragment:
          console.log("Marketo App > Location: Landing Page Template Editor");
          
          APP.disableDesignerSaving("landingPage", "templateEdit");
          break;
          
        case mktoLandingPageTemplatePreviewFragment:
          console.log("Marketo App > Location: Landing Page Template Previewer");
          
          APP.disableDesignerSaving("landingPage", "templatePreview");
          break;
          
        case mktoEmailEditFragment:
          if (currUrlFragment == mktoEmailEditFragment) {
            console.log("Marketo App > Location: Email Template Picker");
            
            APP.disableDesignerSaving("email", "templatePicker");
          } else if (currUrlFragment.search(mktoEmailPreviewFragmentRegex) == -1) {
            console.log("Marketo App > Location: Email Editor");
            
            APP.disableDesignerSaving("email", "edit");
            APP.disableFormSaveButtons();
          } else {
            console.log("Marketo App > Location: Email Previewer");
            
            APP.disableDesignerSaving("email", "preview");
          }
          break;
          
        case mktoEmailTemplateEditFragment:
          console.log("Marketo App > Location: Email Template Editor");
          
          APP.disableDesignerSaving("email", "templateEdit");
          break;
          
        case mktoFormEditFragment:
          console.log("Marketo App > Location: Form Editor");
          
          APP.disableDesignerSaving("form", "edit");
          break;
          
        case mktoFormPreviewFragment:
          console.log("Marketo App > Location: Form Previewer");
          
          APP.disableDesignerSaving("form", "preview");
          break;
          
        case mktoFormPreviewDraftFragment:
          console.log("Marketo App > Location: Form Draft Previewer");
          
          APP.disableDesignerSaving("form", "preview");
          break;
          
        case mktoPushNotificationEditFragment:
          console.log("Marketo App > Location: Push Notification Editor");
          
          APP.disableDesignerSaving("pushNotification", "edit");
          break;
          
        case mktoMobilePushNotificationPreviewFragment:
          console.log("Marketo App > Location: Push Notification Previewer");
          
          APP.disableDesignerSaving("pushNotification", "preview");
          break;
          
        case mktoInAppMessageEditFragment:
          console.log("Marketo App > Location: In-App Message Editor");
          
          APP.disableDesignerSaving("inAppMessage", "edit");
          break;
          
        case mktoInAppMessagePreviewFragment:
          console.log("Marketo App > Location: In-App Message Previewer");
          
          APP.disableDesignerSaving("inAppMessage", "preview");
          break;
          
        case mktoSmsMessageEditFragment:
          console.log("Marketo App > Location: SMS Message Editor");
          
          APP.disableDesignerSaving("smsMessage", "edit");
          break;
          
        case mktoSocialAppEditFragment:
          console.log("Marketo App > Location: Social App Editor");
          
          APP.disableDesignerSaving("socialApp", "edit");
          break;
          
        case mktoSocialAppPreviewFragment:
          console.log("Marketo App > Location: Social App Previewer");
          
          APP.disableDesignerSaving("socialApp", "preview");
          break;
          
        case mktoAbTestEditFragment:
          console.log("Marketo App > Location: A/B Test Wizard");
          
          APP.disableDesignerSaving("abTest", "edit");
          break;
          
        case mktoEmailTestGroupEditFragment:
          console.log("Marketo App > Location: Email Test Group Wizard");
          
          APP.disableDesignerSaving("abTest", "edit");
          break;
          
        case mktoSnippetEditFragment:
          console.log("Marketo App > Location: Snippet Editor");
          
          APP.disableDesignerSaving("snippet", "edit");
          break;
          
        case mktoSnippetPreviewFragment:
          console.log("Marketo App > Location: Snippet Previewer");
          
          APP.disableDesignerSaving("snippet", "preview");
          break;
          
        default:
          break;
        }
      } else if (currUrlFragment
         && currUrlFragment.search(mktoAnalyticsFragmentMatch) != -1) {
        if (currUrlFragment.search(mktoAnalyzersFragmentMatch) != -1) {
          console.log("Marketo App > Location: Golden Analytics");
          
          APP.updateNavBar();
        }
        
        if (currUrlFragment.search(mktoReportFragmentRegex) != -1) {
          console.log("Marketo App > Location: Fullscreen Report");
          
          APP.disableAnalyticsSaving("report");
        } else if (currUrlFragment.search(mktoModelerFragmentRegex) != -1) {
          if (currentUrl.search(mktoModelerPreviewFragmentRegex) == -1) {
            console.log("Marketo App > Location: Revenue Cycle Model Editor");
            
            APP.disableAnalyticsSaving("model", "edit");
          } else {
            console.log("Marketo App > Location: Revenue Cycle Model Previewer");
            
            APP.disableAnalyticsSaving("model", "preview");
          }
        }
      } else if (document.location.pathname == mktoPersonDetailPath) {
        console.log("Marketo App > Location: Lead Database > Person Detail");
        
        window.clearInterval(isMktPageApp);
        
        if (MktPage.savedState
           && MktPage.savedState.munchkinId) {
          console.log("Marketo App > checkMktoCookie Msg");
          chrome.runtime.sendMessage(extensionId, {
            action: "checkMktoCookie",
            munchkinId: MktPage.savedState.munchkinId
          }, null, function (response) {
            if (!response
               || !response.isAdmin) {
              APP.disableRequests();
            } else {
              console.log("Marketo App > checkMktoCookie Msg > Saving Enabled for Admin");
            }
            if (chrome.runtime.lastError) {
              console.log("Marketo App > checkMktoCookie Msg > Error: " + JSON.stringify(chrome.runtime.lastError));
            }
          });
        } else {
          APP.disableRequests();
        }
        
        APP.heapTrack("track", {
          name: "Last Loaded",
          assetName: "Page"
        });
      }
      
      window.onhashchange = function () {
        console.log("Marketo App > Window: Hash Changed");
        
        currentUrl = window.location.href;
        //                    console.log("Marketo App > Window: URL = " + currentUrl);
        // Getting the URL fragment, the part after the #
        var isNewUrlFragment = window.setInterval(function () {
            if (typeof(Mkt3) !== "undefined"
               && Mkt3
               && Mkt3.DL
               && Mkt3.DL.getDlToken()) {
              if (currUrlFragment != Mkt3.DL.getDlToken()) {
                window.clearInterval(isNewUrlFragment);
                
                currUrlFragment = Mkt3.DL.getDlToken();
                console.log("Marketo App > Loaded: New URL Fragment = " + currUrlFragment);
                
                if (currUrlFragment == mktoMyMarketoFragment) {
                  APP.overrideHomeTiles(restoreEmailInsights);
                  APP.heapTrack("track", {
                    name: "My Marketo",
                    assetName: "Home"
                  });
                } else if (currUrlFragment.search(mktoDisableButtonsFragmentMatch) != -1) {
                  APP.disableButtons();
                } else if (currUrlFragment.search(mktoAnalyticsHomeFragment) != -1) {
                  APP.overrideAnalyticsTiles();
                } else if (currUrlFragment.search("^" + APP.getAssetCompCode("Nurture Program") + "[0-9]+A1$") != -1) {
                  APP.disableNurturePrograms();
                } else if (currUrlFragment == mktoAdminSalesforceFragment
                   || currUrlFragment == mktoAdminDynamicsFragment) {
                  console.log("Marketo App > Location: Admin > CRM");
                  
                  APP.hideOtherToolbarItems([{
                        id: "enableSync", //Enable/Disable Sync
                        action: "setVisible"
                      }
                    ]);
                } else if (currUrlFragment == mktoAdminRcaCustomFieldSync) {
                  console.log("Marketo App > Location: Admin > Revenue Cycle Analytics > Custom Field Sync");
                  
                  APP.hideOtherToolbarItems([{
                        id: "cadChangeButton", //Edit Sync Option
                        action: "setVisible"
                      }
                    ]);
                } else if (currUrlFragment.search(mktoAnalyzersFragmentMatch) != -1) {
                  console.log("Marketo App > Location: Golden Analytics");
                  
                  APP.updateNavBar();
                }
                
                if (Mkt3.DL.dl
                   && Mkt3.DL.dl.dlCompCode) {
                  currCompFragment = Mkt3.DL.dl.dlCompCode;
                  //                                    console.log("Marketo App > Window: Comp Fragment = " + currCompFragment);
                  
                  if (currCompFragment.search(mktoDesignersFragmentMatch) != -1) {
                    console.log("Marketo App > Location: Designers/Wizards");
                    
                    switch (currCompFragment) {
                    case mktoLandingPageEditFragment:
                      console.log("Marketo App > Location: Landing Page Editor");
                      
                      APP.resetGoldenLandingPageProps();
                      APP.disableDesignerSaving("landingPage", "edit");
                      APP.disableFormSaveButtons();
                      break;
                      
                    case mktoLandingPagePreviewFragment:
                      console.log("Marketo App > Location: Landing Page Previewer");
                      
                      APP.disableDesignerSaving("landingPage", "preview");
                      break;
                      
                    case mktoLandingPagePreviewDraftFragment:
                      console.log("Marketo App > Location: Landing Page Draft Previewer");
                      
                      APP.disableDesignerSaving("landingPage", "preview");
                      break;
                      
                    case mktoLandingPageTemplateEditFragment:
                      console.log("Marketo App > Location: Landing Page Template Editor");
                      
                      APP.disableDesignerSaving("landingPage", "templateEdit");
                      break;
                      
                    case mktoLandingPageTemplatePreviewFragment:
                      console.log("Marketo App > Location: Landing Page Template Previewer");
                      
                      APP.disableDesignerSaving("landingPage", "templatePreview");
                      break;
                      
                    case mktoEmailEditFragment:
                      if (currUrlFragment == mktoEmailEditFragment) {
                        console.log("Marketo App > Location: Email Template Picker");
                        
                        APP.disableDesignerSaving("email", "templatePicker");
                      } else if (currUrlFragment.search(mktoEmailPreviewFragmentRegex) == -1) {
                        console.log("Marketo App > Location: Email Editor");
                        
                        APP.disableDesignerSaving("email", "edit");
                        APP.disableFormSaveButtons();
                      } else {
                        console.log("Marketo App > Location: Email Previewer");
                        
                        APP.disableDesignerSaving("email", "preview");
                      }
                      break;
                      
                    case mktoEmailTemplateEditFragment:
                      console.log("Marketo App > Location: Email Template Editor");
                      
                      APP.disableDesignerSaving("email", "templateEdit");
                      break;
                      
                    case mktoFormEditFragment:
                      console.log("Marketo App > Location: Form Editor");
                      
                      APP.disableDesignerSaving("form", "edit");
                      break;
                      
                    case mktoFormPreviewFragment:
                      console.log("Marketo App > Location: Form Previewer");
                      
                      APP.disableDesignerSaving("form", "preview");
                      break;
                      
                    case mktoFormPreviewDraftFragment:
                      console.log("Marketo App > Location: Form Draft Previewer");
                      
                      APP.disableDesignerSaving("form", "preview");
                      break;
                      
                    case mktoPushNotificationEditFragment:
                      console.log("Marketo App > Location: Push Notification Editor");
                      
                      APP.disableDesignerSaving("pushNotification", "edit");
                      break;
                      
                    case mktoMobilePushNotificationPreviewFragment:
                      console.log("Marketo App > Location: Push Notification Previewer");
                      
                      APP.disableDesignerSaving("pushNotification", "preview");
                      break;
                      
                    case mktoInAppMessageEditFragment:
                      console.log("Marketo App > Location: In-App Message Editor");
                      
                      APP.disableDesignerSaving("inAppMessage", "edit");
                      break;
                      
                    case mktoInAppMessagePreviewFragment:
                      console.log("Marketo App > Location: In-App Message Previewer");
                      
                      APP.disableDesignerSaving("inAppMessage", "preview");
                      break;
                      
                    case mktoSmsMessageEditFragment:
                      console.log("Marketo App > Location: SMS Message Editor");
                      
                      APP.disableDesignerSaving("smsMessage", "edit");
                      break;
                      
                    case mktoSocialAppEditFragment:
                      console.log("Marketo App > Location: Social App Editor");
                      
                      APP.disableDesignerSaving("socialApp", "edit");
                      break;
                      
                    case mktoSocialAppPreviewFragment:
                      console.log("Marketo App > Location: Social App Previewer");
                      
                      APP.disableDesignerSaving("socialApp", "preview");
                      break;
                      
                    case mktoAbTestEditFragment:
                      console.log("Marketo App > Location: A/B Test Wizard");
                      
                      APP.disableDesignerSaving("abTest", "edit");
                      break;
                      
                    case mktoEmailTestGroupEditFragment:
                      console.log("Marketo App > Location: Email Test Group Wizard");
                      
                      APP.disableDesignerSaving("abTest", "edit");
                      break;
                      
                    case mktoSnippetEditFragment:
                      console.log("Marketo App > Location: Snippet Editor");
                      
                      APP.disableDesignerSaving("snippet", "edit");
                      break;
                      
                    case mktoSnippetPreviewFragment:
                      console.log("Marketo App > Location: Snippet Previewer");
                      
                      APP.disableDesignerSaving("snippet", "preview");
                      break;
                      
                    default:
                      break;
                    }
                  }
                }
              }
            }
          }, 0);
      };
      APP.overrideSuperballMenuItems();
      
      // Heap Analytics ID
      APP.heapTrack("id");
    }
  }, 0);