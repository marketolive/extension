console.log("Landing Page > Script: Loaded");

var isMktoForm = window.setInterval(function () {
        if (typeof(MktoForms2) !== "undefined") {
            console.log("Landing Page > Getting: Form");
            
            window.clearInterval(isMktoForm);
            
            MktoForms2.whenReady(function (form) {
                var nextUrl = "http://www.marketolive.com/data/mock-lead",
                demoMailBox = "mktodemosvcs+",
                submitParamName = "submit",
                submitParamVal,
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
                answer;
                
                function getUrlParam(param) {
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
                    return false;
                }
                
                function getCookie(cookieName) {
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
                }
                
                submitParamVal = getUrlParam(submitParamName);
                
                if (submitParamVal == "true"
                     || submitParamVal == "test") {
                    
                    form.onSuccess(function (values, followUpUrl) {
                        if (submitParamVal == "true") {
                            //window.close();
                            window.location.href = nextUrl;
                            return false;
                        } else {
                            window.location.href = "http://www.marketolive.com";
                            return false;
                        }
                    });
                    
                    if (typeof(form.getValues().Email) != "undefined") {
                        var userId = getCookie(usernameCookieName),
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
                        var firstName = getCookie(firstNameCookieName);
                        
                        if (firstName != null) {
                            form.vals({
                                FirstName: firstName
                            });
                        }
                    }
                    
                    if (typeof(form.getValues().LastName) != "undefined") {
                        var lastName = getCookie(lastNameCookieName);
                        
                        if (lastName != null) {
                            form.vals({
                                LastName: lastName
                            });
                        }
                    }
                    
                    if (typeof(form.getValues().Title) != "undefined") {
                        var jobTitle = getCookie(jobTitleCookieName);
                        
                        if (jobTitle != null) {
                            form.vals({
                                Title: jobTitle
                            });
                        }
                    }
                    
                    if (typeof(form.getValues().Company) != "undefined") {
                        var company = getCookie(companyNameCookieName);
                        
                        if (company != null) {
                            form.vals({
                                Company: company
                            });
                        }
                    }
                    
                    if (typeof(form.getValues().Industry) != "undefined") {
                        var industry = getCookie(industryCookieName);
                        
                        if (industry != null) {
                            form.vals({
                                Industry: industry
                            });
                        }
                    }
                    
                    if (typeof(form.getValues().LeadSource) != "undefined") {
                        var leadSource = getCookie(leadSourceCookieName);
                        
                        if (leadSource != null) {
                            form.vals({
                                LeadSource: leadSource
                            });
                        }
                    }
                    
                    if (typeof(form.getValues().MobilePhone) != "undefined") {
                        var mobileNumber = getCookie(mobileNumberCookieName);
                        
                        if (mobileNumber != null) {
                            form.vals({
                                MobilePhone: mobileNumber
                            });
                        }
                    }
                    
                    if (typeof(form.getValues().Phone) != "undefined") {
                        var phoneNumber = getCookie(phoneNumberCookieName);
                        
                        if (phoneNumber != null) {
                            form.vals({
                                Phone: phoneNumber
                            });
                        }
                    }
                    
                    if (typeof(form.getValues().Subscribed_to_Newsletter__c) != "undefined") {
                        if ((Math.random()) <= 0.80) {
                            answer = checkBoxes[0];
                        } else {
                            answer = checkBoxes[1];
                        }
                        
                        form.vals({
                            Subscribed_to_Newsletter__c: answer
                        });
                    }
                    
                    if (typeof(form.getValues().Subscribed_to_Blog_Posts__c) != "undefined") {
                        if ((Math.random()) <= 0.80) {
                            answer = checkBoxes[0];
                        } else {
                            answer = checkBoxes[1];
                        }
                        
                        form.vals({
                            Subscribed_to_Blog_Posts__c: answer
                        });
                    }
                    
                    if (typeof(form.getValues().Subscribed_to_Event_Invitations__c) != "undefined") {
                        if ((Math.random()) <= 0.80) {
                            answer = checkBoxes[0];
                        } else {
                            answer = checkBoxes[1];
                        }
                        
                        form.vals({
                            Subscribed_to_Event_Invitations__c: answer
                        });
                    }
                    
                    if (typeof(form.getValues().Subscribed_to_Webinar_Invitations__c) != "undefined") {
                        if ((Math.random()) <= 0.80) {
                            answer = checkBoxes[0];
                        } else {
                            answer = checkBoxes[1];
                        }
                        
                        form.vals({
                            Subscribed_to_Webinar_Invitations__c: answer
                        });
                    }
                    
                    if (typeof(form.getValues().Subscribed_to_App_Messages__c) != "undefined") {
                        if ((Math.random()) <= 0.80) {
                            answer = checkBoxes[0];
                        } else {
                            answer = checkBoxes[1];
                        }
                        
                        form.vals({
                            Subscribed_to_App_Messages__c: answer
                        });
                    }
                    
                    if (typeof(form.getValues().Subscribed_to_SMS__c) != "undefined") {
                        if ((Math.random()) <= 0.80) {
                            answer = checkBoxes[0];
                        } else {
                            answer = checkBoxes[1];
                        }
                        
                        form.vals({
                            Subscribed_to_SMS__c: answer
                        });
                    }
                    
                    if (typeof(form.getValues().Unsubscribed_from_All__c) != "undefined") {
                        if ((Math.random()) <= 0.05) {
                            answer = checkBoxes[0];
                        } else {
                            answer = checkBoxes[1];
                        }
                        
                        form.vals({
                            Unsubscribed_from_All__c: answer
                        });
                    }
                    
                    //console.log(JSON.stringify(form.vals(), null, 2));
                    
                    if (submitParamVal == "true") {
                        var isMunchkinInitSubmit = window.setInterval(function () {
                                if (typeof(Munchkin.init) !== "undefined") {
                                    console.log("Landing Page > Munchkin is Defined");
                                    
                                    window.clearInterval(isMunchkinInitSubmit);
                                    
                                    form.submit();
                                }
                            }, 0);
                    }
                    
                } else if (submitParamVal == "false") {
                    var isMunchkinInit = window.setInterval(function () {
                            if (typeof(Munchkin.init) !== "undefined") {
                                console.log("Landing Page > Munchkin is Defined");
                                
                                window.clearInterval(isMunchkinInit);
                                
                                //window.close();
                                window.location.href = nextUrl;
                            }
                        }, 0);
                }
            });
        }
    }, 0);