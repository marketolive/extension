console.log("Landing Page > Script: Loaded");

/**************************************************************************************
 *
 *  This script contains all of the functionality needed for automatically submitting
 *  forms on MarketoLive Landing Pages.
 *
 *  @Author Brian Fisher
 *
 *  @namespace
 *
 **************************************************************************************/
var URL_PATH = "m3-dev",
devExtensionId = "dokkjhbgengdlccldgjnbilajdbjlnhm",
prodExtensionId = "onibnnoghllldiecboelbpcaeggfiohl",
extensionId = devExtensionId,
mktoLiveDevMunchkinId = "685-BTN-772",
mktoLiveProdMunchkinId = "185-NGX-811",
mktoLiveMunchkinId = mktoLiveProdMunchkinId,

numOfVerticals = 3,
mockLeadEndpoint = "https://www.mockaroo.com/0799ab60/download?count=1&key=7d30cdf0",

origCookie,

LPAGE = LPAGE || {};

LPAGE.getUrlParam = function (param) {
  console.log("Landing Page > Getting: URL Parameter: " + param);
  
  var paramString = window.location.href.split("?")[1];
  
  if (paramString) {
    var params = paramString.split("&"),
    paramPair,
    paramName,
    paramValue;
    
    for (var ii = 0; ii < params.length; ii++) {
      paramPair = params[ii].split("=");
      paramName = paramPair[0];
      paramValue = paramPair[1];
      
      if (paramName == param) {
        console.log("Landing Page > URL Parameter: " + paramName + " = " + paramValue);
        return paramValue;
      }
    }
  }
  return "";
};

LPAGE.getCookie = function (cookieName) {
  console.log("Landing Page > Getting: Cookie " + cookieName);
  
  var name = cookieName + '=',
  cookies = document.cookie.split(';'),
  currCookie;
  
  for (var ii = 0; ii < cookies.length; ii++) {
    currCookie = cookies[ii].trim();
    if (currCookie.indexOf(name) == 0) {
      return currCookie.substring(name.length, currCookie.length);
    }
  }
  console.log("Landing Page > Getting: Cookie " + cookieName + " not found");
  return null;
};

LPAGE.webRequest = function (url, params, method, async, responseType, callback) {
  console.log("Web Request > " + url + "\n" + params);
  var xmlHttp = new XMLHttpRequest(),
  result;
  
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4) {
      if (xmlHttp.status == 200) {
        if (typeof(callback) === "function") {
          result = callback(xmlHttp.response);
        } else {
          result = xmlHttp.response;
        }
      } else {
        chrome.runtime.sendMessage(extensionId, {
          action: "demoDataPage",
          tabAction: "remove",
          currUrl: window.location.href
        });
      }
    }
  }
  
  if (async
     && xmlHttp.responseType) {
    xmlHttp.responseType = responseType;
  }
  xmlHttp.open(method, url, async); // true for asynchronous
  xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
  xmlHttp.send(params);
  return result;
};

LPAGE.getNextWebPage = function (mockLeadEmail) {
  var dayOfMonth = new Date().getDate(),
  currVerticalIndex,
  currVertical;
  
  if (dayOfMonth > numOfVerticals) {
    currVerticalIndex = (dayOfMonth - 1) % numOfVerticals;
  } else {
    currVerticalIndex = dayOfMonth - 1;
  }
  switch (currVerticalIndex) {
  case 0:
    currVertical = "coe";
    break;
  case 1:
    currVertical = "tech";
    break;
  case 2:
    currVertical = "mfg";
    break;
  }
  
  return LPAGE.webRequest('https://marketolive.com/' + URL_PATH + '/pluginv3/data/' + currVertical + '-pages-web.json', null, 'GET', false, '', function (response) {
    var webPages = JSON.parse(response);
    
    if (!mockLeadEmail) {
      mockLeadEmail = LPAGE.getUrlParam("mockLead");
    }
    
    if (webPages) {
      var webPageX = webPages[Math.floor(Math.random() * webPages.length)],
      params = "";
      
      if (URL_PATH == "m3-dev") {
        webPageX.url = webPageX.url.replace("//www\.", "//dev.");
      }
      
      if (webPageX.type == "verticals") {
        webPageX.url = webPageX.url.replace("//verticals\.", "//dev.verticals.");
        
        if (webPageX.clickRate >= 1.0
           || (Math.random()) <= webPageX.clickRate) {
          params = "click=true";
        } else {
          params = "click=false";
        }
      }
      
      if (params == "") {
        return webPageX.url + "?" + "mockLead=" + mockLeadEmail;
      } else {
        return webPageX.url + "?" + params + "&mockLead=" + mockLeadEmail;
      }
    }
    
    return "";
  });
};

/**************************************************************************************
 *
 *  Main
 *
 **************************************************************************************/

(function () {
  var didInit = false,
  s,
  origMunchkinInit;
  
  function overloadMunchkinInit() {
    if (typeof(origMunchkinInit) !== "function") {
      origMunchkinInit = Munchkin.init;
    }
    
    Munchkin.init = function (b, a, callback) {
      origMunchkinInit.apply(this, arguments);
      console.log("Loaded > Munchkin Tag");
      
      if (typeof(callback) === "function") {
        callback();
      }
    };
  }
  
  function overloadMunchkinFunction() {
    if (typeof(origMunckinFunction) !== "function") {
      origMunckinFunction = Munchkin.munchkinFunction;
    }
    
    Munchkin.munchkinFunction = function (b, a, c, callback) {
      origMunckinFunction.apply(this, arguments);
      console.log("Completed > Munchkin Function");
      
      if (typeof(callback) === "function") {
        callback();
      }
    };
  }
  
  function resetMunchkinCookie(munchkinId, cookieAnon, callback) {
    var hostSplit = window.location.host.split("."),
    currCookie = LPAGE.getCookie("_mkto_trk");
    
    if (currCookie
      && !origCookie) {
      origCookie = currCookie;
    }
    
    document.cookie = "_mkto_trk=;domain=." + hostSplit[hostSplit.length - 2] + "." + hostSplit[hostSplit.length - 1] + ";path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT";
    console.log("Removed > Cookie: _mkto_trk");
    
    overloadMunchkinInit();
    Munchkin.init(munchkinId, {
      cookieLifeDays: 365,
      cookieAnon: cookieAnon,
      disableClickDelay: true
    }, callback);
  }
  
  function resetMasterMunchkinCookie(callback) {
    var oneLoginUsername = LPAGE.getCookie("onelogin_username"),
    hostSplit = window.location.host.split(".");
    
    if (oneLoginUsername) {
      var email = "mktodemosvcs+" + oneLoginUsername + "@gmail.com";
      
      document.cookie = "_mkto_trk=;domain=" + hostSplit[hostSplit.length - 2] + "." + hostSplit[hostSplit.length - 1] + ";path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT";
      console.log("Removed > Cookie: _mkto_trk");
      
      overloadMunchkinInit();
      Munchkin.init('185-NGX-811', {
        cookieLifeDays: 365,
        cookieAnon: false,
        disableClickDelay: true
      }, function () {
        console.log("Associating > Lead : " + email);
        
        overloadMunchkinFunction();
        Munchkin.munchkinFunction("associateLead", {
          Email: email
        }, sha1("123123123" + email), callback);
      });
    } else {
      if (origCookie) {
        document.cookie = "_mkto_trk=" + origCookie + ";domain=" + hostSplit[hostSplit.length - 2] + "." + hostSplit[hostSplit.length - 1] + ";path=/;expires=" + new Date(new Date().getTime() + (365 * 24 * 60 * 60 * 1000)).toUTCString();
        console.log("Restored > Cookie: _mkto_trk = " + origCookie);
        console.log("Restored > Cookie: _mkto_trk = " + LPAGE.getCookie("_mkto_trk"));
      }
      
      if (typeof(callback) === "function") {
        callback();
      }
    }
  }
  
  function submitLeadData() {
    var cookieAnon = LPAGE.getUrlParam("submit");
    
    if (cookieAnon == "true"
       || cookieAnon == "test") {
      cookieAnon = true;
    } else {
      cookieAnon = false;
    }
    
    resetMunchkinCookie(mktoLiveMunchkinId, cookieAnon, function () {
      var isMktoForm = window.setInterval(function () {
          if (typeof(MktoForms2) !== "undefined") {
            console.log("Landing Page > Getting: Form");
            
            window.clearInterval(isMktoForm);
            
            MktoForms2.whenReady(function (form) {
              var nextUrl = "http://www.marketolive.com/data/mock-lead",
              demoMailBox = "mktodemosvcs+",
              usernameCookieName = "onelogin_username",
              firstNameCookieName = "onelogin_first_name",
              lastNameCookieName = "onelogin_last_name",
              emailCookieName = "onelogin_email",
              jobTitleCookieName = "attrib_job_title",
              companyNameCookieName = "attrib_company_name",
              industryCookieName = "attrib_industry",
              leadSourceCookieName = "attrib_lead_source",
              mobileNumberCookieName = "attrib_mobile_number",
              phoneNumberCookieName = "attrib_phone_number",
              checkBoxes = ["yes", "no"],
              submit = LPAGE.getUrlParam("submit"),
              isMockLead = LPAGE.getUrlParam("isMockLead"),
              utmTerm = LPAGE.getUrlParam("utmTerm"),
              utmMedium = LPAGE.getUrlParam("utmMedium"),
              utmCampaign = LPAGE.getUrlParam("utmCampaign"),
              answer,
              nextWebPage;
              
              if (submit == "true"
                 || submit == "test") {
                
                if (isMockLead == "true") {
                  form.onSuccess(function (values, followUpUrl) {
                    //window.close();
                    window.location.href = window.location.origin + window.location.pathname + "?submit=" + submit + "&isMockLead=false" + "&utmTerm=" + utmTerm + "&utmMedium=" + utmMedium + "&utmCampaign=" + utmCampaign + "&mockLead=" + values.Email;
                    return false;
                  });
                  
                  LPAGE.webRequest(mockLeadEndpoint, null, 'GET', true, 'json', function (response) {
                    var mockLeadX = JSON.parse(response);
                    
                    if (mockLeadX) {
                      if (mockLeadX.mobileNumber == null) {
                        mockLeadX.mobileNumber = "";
                      }
                      if (mockLeadX.phoneNumber == null) {
                        mockLeadX.phoneNumber = "";
                      }
                      
                      if (typeof(form.getValues().Email) != "undefined") {
                        var email = mockLeadX.email;
                        
                        if (email != null) {
                          form.vals({
                            Email: email
                          });
                        } else {
                          window.close();
                          return null;
                        }
                      }
                      
                      if (typeof(form.getValues().FirstName) != "undefined") {
                        var firstName = mockLeadX.firstName;
                        
                        if (firstName != null) {
                          form.vals({
                            FirstName: firstName
                          });
                        }
                      }
                      
                      if (typeof(form.getValues().LastName) != "undefined") {
                        var lastName = mockLeadX.lastName;
                        
                        if (lastName != null) {
                          form.vals({
                            LastName: lastName
                          });
                        }
                      }
                      
                      if (typeof(form.getValues().Title) != "undefined") {
                        var jobTitle = mockLeadX.jobTitle;
                        
                        if (jobTitle != null) {
                          form.vals({
                            Title: jobTitle
                          });
                        }
                      }
                      
                      if (typeof(form.getValues().Company) != "undefined") {
                        var company = mockLeadX.company;
                        
                        if (company != null) {
                          form.vals({
                            Company: company
                          });
                        }
                      }
                      
                      if (typeof(form.getValues().Industry) != "undefined") {
                        var industry = mockLeadX.industry;
                        
                        if (industry != null) {
                          form.vals({
                            Industry: industry
                          });
                        }
                      }
                      
                      if (typeof(form.getValues().LeadSource) != "undefined") {
                        var leadSource = mockLeadX.leadSource;
                        
                        if (leadSource != null) {
                          form.vals({
                            LeadSource: leadSource
                          });
                        }
                      }
                      
                      if (typeof(form.getValues().MobilePhone) != "undefined") {
                        var mobileNumber = mockLeadX.mobileNumber;
                        
                        if (mobileNumber != null) {
                          form.vals({
                            MobilePhone: mobileNumber
                          });
                        }
                      }
                      
                      if (typeof(form.getValues().Phone) != "undefined") {
                        var phoneNumber = mockLeadX.phoneNumber;
                        
                        if (phoneNumber != null) {
                          form.vals({
                            Phone: phoneNumber
                          });
                        }
                      }
                      
                      if (typeof(form.getValues().subscribedToAppMessages) != "undefined") {
                        if ((Math.random()) <= 0.80) {
                          answer = checkBoxes[0];
                        } else {
                          answer = checkBoxes[1];
                        }
                        
                        form.vals({
                          subscribedToAppMessages: answer
                        });
                      }
                      
                      if (typeof(form.getValues().subscribedToBlogPosts) != "undefined") {
                        if ((Math.random()) <= 0.80) {
                          answer = checkBoxes[0];
                        } else {
                          answer = checkBoxes[1];
                        }
                        
                        form.vals({
                          subscribedToBlogPosts: answer
                        });
                      }
                      
                      if (typeof(form.getValues().subscribedToEventInvitations) != "undefined") {
                        if ((Math.random()) <= 0.80) {
                          answer = checkBoxes[0];
                        } else {
                          answer = checkBoxes[1];
                        }
                        
                        form.vals({
                          subscribedToEventInvitations: answer
                        });
                      }
                      
                      if (typeof(form.getValues().subscribedToNewsletter) != "undefined") {
                        if ((Math.random()) <= 0.80) {
                          answer = checkBoxes[0];
                        } else {
                          answer = checkBoxes[1];
                        }
                        
                        form.vals({
                          subscribedToNewsletter: answer
                        });
                      }
                      
                      if (typeof(form.getValues().subscribedToSMS) != "undefined") {
                        if ((Math.random()) <= 0.80) {
                          answer = checkBoxes[0];
                        } else {
                          answer = checkBoxes[1];
                        }
                        
                        form.vals({
                          subscribedToSMS: answer
                        });
                      }
                      
                      if (typeof(form.getValues().subscribedToWebinarInvitations) != "undefined") {
                        if ((Math.random()) <= 0.80) {
                          answer = checkBoxes[0];
                        } else {
                          answer = checkBoxes[1];
                        }
                        
                        form.vals({
                          subscribedToWebinarInvitations: answer
                        });
                      }
                      
                      if (typeof(form.getValues().unsubscribedToAll) != "undefined") {
                        if ((Math.random()) <= 0.05) {
                          answer = checkBoxes[0];
                        } else {
                          answer = checkBoxes[1];
                        }
                        
                        form.vals({
                          unsubscribedToAll: answer
                        });
                      }
                    }
                  });
                } else {
                  form.onSuccess(function (values, followUpUrl) {
                    //window.close();
                    window.location.href = LPAGE.getNextWebPage();
                    return false;
                  });
                  
                  if (typeof(form.getValues().Email) != "undefined") {
                    var userId = LPAGE.getCookie(usernameCookieName),
                    email = demoMailBox + userId + "@gmail.com";
                    
                    if (userId != null) {
                      form.vals({
                        Email: email
                      });
                    } else {
                      window.close();
                      return null;
                    }
                  }
                  
                  if (typeof(form.getValues().FirstName) != "undefined") {
                    var firstName = LPAGE.getCookie(firstNameCookieName);
                    
                    if (firstName != null) {
                      form.vals({
                        FirstName: firstName
                      });
                    }
                  }
                  
                  if (typeof(form.getValues().LastName) != "undefined") {
                    var lastName = LPAGE.getCookie(lastNameCookieName);
                    
                    if (lastName != null) {
                      form.vals({
                        LastName: lastName
                      });
                    }
                  }
                  
                  if (typeof(form.getValues().Title) != "undefined") {
                    var jobTitle = LPAGE.getCookie(jobTitleCookieName);
                    
                    if (jobTitle != null) {
                      form.vals({
                        Title: jobTitle
                      });
                    }
                  }
                  
                  if (typeof(form.getValues().Company) != "undefined") {
                    var company = LPAGE.getCookie(companyNameCookieName);
                    
                    if (company != null) {
                      form.vals({
                        Company: company
                      });
                    }
                  }
                  
                  if (typeof(form.getValues().Industry) != "undefined") {
                    var industry = LPAGE.getCookie(industryCookieName);
                    
                    if (industry != null) {
                      form.vals({
                        Industry: industry
                      });
                    }
                  }
                  
                  if (typeof(form.getValues().LeadSource) != "undefined") {
                    var leadSource = LPAGE.getCookie(leadSourceCookieName);
                    
                    if (leadSource != null) {
                      form.vals({
                        LeadSource: leadSource
                      });
                    }
                  }
                  
                  if (typeof(form.getValues().MobilePhone) != "undefined") {
                    var mobileNumber = LPAGE.getCookie(mobileNumberCookieName);
                    
                    if (mobileNumber != null) {
                      form.vals({
                        MobilePhone: mobileNumber
                      });
                    }
                  }
                  
                  if (typeof(form.getValues().Phone) != "undefined") {
                    var phoneNumber = LPAGE.getCookie(phoneNumberCookieName);
                    
                    if (phoneNumber != null) {
                      form.vals({
                        Phone: phoneNumber
                      });
                    }
                  }
                  
                  if (typeof(form.getValues().subscribedToAppMessages) != "undefined") {
                    if ((Math.random()) <= 0.80) {
                      answer = checkBoxes[0];
                    } else {
                      answer = checkBoxes[1];
                    }
                    
                    form.vals({
                      subscribedToAppMessages: answer
                    });
                  }
                  
                  if (typeof(form.getValues().subscribedToBlogPosts) != "undefined") {
                    if ((Math.random()) <= 0.80) {
                      answer = checkBoxes[0];
                    } else {
                      answer = checkBoxes[1];
                    }
                    
                    form.vals({
                      subscribedToBlogPosts: answer
                    });
                  }
                  
                  if (typeof(form.getValues().subscribedToEventInvitations) != "undefined") {
                    if ((Math.random()) <= 0.80) {
                      answer = checkBoxes[0];
                    } else {
                      answer = checkBoxes[1];
                    }
                    
                    form.vals({
                      subscribedToEventInvitations: answer
                    });
                  }
                  
                  if (typeof(form.getValues().subscribedToNewsletter) != "undefined") {
                    if ((Math.random()) <= 0.80) {
                      answer = checkBoxes[0];
                    } else {
                      answer = checkBoxes[1];
                    }
                    
                    form.vals({
                      subscribedToNewsletter: answer
                    });
                  }
                  
                  if (typeof(form.getValues().subscribedToSMS) != "undefined") {
                    if ((Math.random()) <= 0.80) {
                      answer = checkBoxes[0];
                    } else {
                      answer = checkBoxes[1];
                    }
                    
                    form.vals({
                      subscribedToSMS: answer
                    });
                  }
                  
                  if (typeof(form.getValues().subscribedToWebinarInvitations) != "undefined") {
                    if ((Math.random()) <= 0.80) {
                      answer = checkBoxes[0];
                    } else {
                      answer = checkBoxes[1];
                    }
                    
                    form.vals({
                      subscribedToWebinarInvitations: answer
                    });
                  }
                  
                  if (typeof(form.getValues().unsubscribedToAll) != "undefined") {
                    if ((Math.random()) <= 0.05) {
                      answer = checkBoxes[0];
                    } else {
                      answer = checkBoxes[1];
                    }
                    
                    form.vals({
                      unsubscribedToAll: answer
                    });
                  }
                }
                
                //console.log(JSON.stringify(form.vals(), null, 2));
                if (submit == "true") {
                  form.submit();
                }
              } else if (submit == "false") {
                LPAGE.webRequest(mockLeadEndpoint, null, 'GET', true, 'json', function (response) {
                  var mockLeadX = JSON.parse(response);
                  
                  if (mockLeadX
                     && mockLeadX.email) {
                    window.setTimeout(function () {
                      console.log("Associating > Mock Lead: " + mockLeadX.email);
                      
                      overloadMunchkinFunction();
                      Munchkin.munchkinFunction("associateLead", {
                        Email: mockLeadX.email
                      }, sha1("123123123" + mockLeadX.email), function () {
                        console.log("Posting > Mock Lead > Visit Web Page: " + mockLeadX.email + " : " + window.location.pathname);
                        
                        overloadMunchkinFunction();
                        Munchkin.munchkinFunction("visitWebPage", {
                          url: window.location.pathname
                        }, null, function () {
                          resetMasterMunchkinCookie(function () {
                            console.log("Posting > Real Lead > Visit Web Page: " + window.location.pathname);
                            
                            overloadMunchkinFunction();
                            Munchkin.munchkinFunction("visitWebPage", {
                              url: window.location.pathname
                            }, null, function () {
                              window.setTimeout(function () {
                                window.location.href = LPAGE.getNextWebPage(mockLeadX.email);
                              }, 1000);
                            });
                          });
                        });
                      });
                    }, 1000);
                  }
                });
              }
            });
          }
        }, 0);
    });
  }
  
  function initMunchkin() {
    if (didInit === false) {
      didInit = true;
      submitLeadData();
    }
  }
  
  s = document.createElement("script");
  s.type = "text/javascript";
  s.async = true;
  s.src = "//munchkin.marketo.net/munchkin.js";
  s.onreadystatechange = function () {
    if (this.readyState == "complete" || this.readyState == "loaded") {
      initMunchkin();
    }
  };
  s.onload = initMunchkin;
  document.getElementsByTagName("head")[0].appendChild(s);
})();