var mktoLiveLandingPageHost = "na-sjdemo1.marketo.com",
    mktoLiveDevMunchkinId = "685-BTN-772",
    mktoLiveProdMunchkinId = "185-NGX-811",
    mktoLiveMunchkinId = mktoLiveDevMunchkinId,
    mktoLiveDevHost = "www.marketolive-dev.com",
    mktoLiveProdHost = "www.marketolive.com",
    mktoLiveHost = mktoLiveDevHost,
    landingPageType = "landing",
    webPageType = "web",
    webPages = {
        0 : {
            name : "signup",
            type : landingPageType,
            url : "http://"+mktoLiveLandingPageHost+"/lp/"+mktoLiveMunchkinId+"/Lead-Capture_Landing-Page.html",
            dependentOn : [],
            visitationRate : 1.0,
            conversionRate : 1.0
        },
        1 : {
            name : "preferenceCenter",
            type : landingPageType,
            url : "http://"+mktoLiveLandingPageHost+"/lp/"+mktoLiveMunchkinId+"/Subscription-Management_Preference-Center.html",
            dependentOn : ["signup"],
            visitationRate : 0.05,
            conversionRate : 1.0
        },
        2 : {
            name : "notYouPreferenceCenter",
            type : landingPageType,
            url : "http://"+mktoLiveLandingPageHost+"/lp/"+mktoLiveMunchkinId+"/Subscription-Management_Not-You-Preference-Center.html",
            dependentOn : ["signup"],
            visitationRate : 0.01,
            conversionRate : 1.0
        },
        3 : {
            name : "webinarRegistration",
            type : landingPageType,
            url : "http://"+mktoLiveLandingPageHost+"/lp/"+mktoLiveMunchkinId+"/Webinar_Registration.html",
            dependentOn : ["signup"],
            visitationRate : 0.10,
            conversionRate : 1.0
        },
        4 : {
            name : "webinarCheckIn",
            type : landingPageType,
            url : "http://"+mktoLiveLandingPageHost+"/lp/"+mktoLiveMunchkinId+"/Webinar_CheckIn.html",
            dependentOn : ["signup", "webinarRegistration"],
            visitationRate : 0.80,
            conversionRate : 1.0
        },
        5 : {
            name : "liveEventRegistration",
            type : landingPageType,
            url : "http://"+mktoLiveLandingPageHost+"/lp/"+mktoLiveMunchkinId+"/Live-Event_Registration-Page.html",
            dependentOn : ["signup"],
            visitationRate : 0.10,
            conversionRate : 1.0
        },
        6 : {
            name : "liveEventCheckIn",
            type : landingPageType,
            url : "http://"+mktoLiveLandingPageHost+"/lp/"+mktoLiveMunchkinId+"/Live-Event_Check-In.html",
            dependentOn : ["signup", "liveEventRegistration"],
            visitationRate : 0.80,
            conversionRate : 1.0
        },
        7 : {
            name : "rewardsSignup",
            type : landingPageType,
            url : "http://"+mktoLiveLandingPageHost+"/lp/"+mktoLiveMunchkinId+"/Rewards-for-Champions_Rewards-Page.html",
            dependentOn : ["signup"],
            visitationRate : 0.05,
            conversionRate : 1.0
        },
/*        8 : {
            name : "whyUs",
            type : webPageType,
            url : "http://"+mktoLiveHost+"/en/info/why-us",
            dependentOn : [],
            visitationRate : 0.33,
            conversionRate : 1.0
        },
        9 : {
            name : "integrations",
            type : webPageType,
            url : "http://"+mktoLiveHost+"/en/info/integrations",
            dependentOn : [],
            visitationRate : 0.50,
            conversionRate : 1.0
        },
        10 : {
            name : "contactUs",
            type : webPageType,
            url : "http://"+mktoLiveHost+"/en/info/contact-us",
            dependentOn : [],
            visitationRate : 0.05,
            conversionRate : 1.0
        },
        11 : {
            name : "community",
            type : webPageType,
            url : "http://"+mktoLiveHost+"/en/info/community",
            dependentOn : ["signup", "rewardsSignup"],
            visitationRate : 0.03,
            conversionRate : 1.0
        },
        12 : {
            name : "liveEvent",
            type : webPageType,
            url : "http://"+mktoLiveHost+"/en/info/live-event",
            dependentOn : ["signup", "liveEventRegistration"],
            visitationRate : 0.50,
            conversionRate : 1.0
        },
        13 : {
            name : "webinar",
            type : webPageType,
            url : "http://"+mktoLiveHost+"/en/info/webinar",
            dependentOn : ["signup", "webinarRegistration"],
            visitationRate : 0.50,
            conversionRate : 1.0
        },
        14 : {
            name : "products",
            type : webPageType,
            url : "http://"+mktoLiveHost+"/en/info/products",
            dependentOn : [],
            visitationRate : 0.75,
            conversionRate : 1.0
        },
        15 : {
            name : "pricing",
            type : webPageType,
            url : "http://"+mktoLiveHost+"/en/info/pricing",
            dependentOn : [],
            visitationRate : 0.80,
            conversionRate : 1.0
        }*/
    },
    jobTitles = [
        "Account Director",
        "Account Executive",
        "Account Management",
        "Account Manager",
        "Account Specialist",
        "Area Vice President, Corporate Sales",
        "Business Operations",
        "Business Systems Analyst",
        "Campaign Analyst",
        "Channels Manager",
        "Chief Marketing Officer",
        "Computer Software Professional",
        "Corporate Marketing Manager",
        "Corporate Sales, Media & Communications",
        "Customer Success Manager",
        "Customer Success Manager, Media & Communications",
        "Delivery Engagment Manager",
        "Development Manager",
        "Director, Alliances Central",
        "Director, International Marketing",
        "Director, Marketing",
        "Director, Purchasing",
        "Director, Sales",
        "Director, User Experience",
        "Director, World Wide Field Operations",
        "Engagement Manager",
        "Founding Partner",
        "General Manager",
        "Key Account Manager",
        "Managing Editor",
        "Market Research Analyst",
        "Marketing",
        "Marketing Communications Manager",
        "Marketing Communications Specialist",
        "Marketing Coordinator",
        "Marketing Executive",
        "Marketing Lead",
        "Marketing Manager",
        "Marketing Professional",
        "Marketing Programs Manager",
        "Marketing Specialist",
        "Marketing Writer",
        "Online Marketing Manager",
        "Partner Program Manager",
        "Principal Architect",
        "Product Marketing Manager",
        "Public Relations Manager",
        "Purchasing",
        "Purchasing & Logistics Coordinator",
        "Purchasing Manager",
        "Regional Account Executive, Non-profits & Education",
        "Regional Vice President",
        "Regional Vice President, Corporate Sales",
        "Sales Engineer",
        "Sales Manager",
        "Sales Manager, Financial Services",
        "Sales Representative, Mid Market",
        "Search Marketing Analyst",
        "Search Marketing Strategist",
        "Senior Account Executive",
        "Senior Account Executive, Technology",
        "Senior Account Manager",
        "Senior Customer Success Manager",
        "Senior Director, Partner Success",
        "Senior Marketing Manager",
        "Senior Organic Search Marketing Strategist",
        "Senior Segment Analyst",
        "Senior Vice President, World Wide Sales & Marketing",
        "Vice President",
        "Vice President, Corporate Sales",
        "Vice President, Marketing",
        "Vice President, Sales",
        "Vice President, Sales Engineering",
        "Vice President, World Wide Marketing & Corporate Strategy",
        "Web Marketing Manager"
    ],
    companies = [
        ["Healthy4Life", "Healthcare"],
        ["Investo Banking", "Financial Services"],
        ["Kinetic Therapy", "Healthcare"],
        ["LexCorp Industries", "Manufacturing"],
        ["Luxury Escapes", "Travel & Leisure"],
        ["Marketing College", "Higher Education"],
        ["Rainmaker Investments", "Financial Services"],
        ["Scale.io", "Technology"],
        ["Travel4Life", "Travel & Leisure"],
        ["Turner Technologies", "Technology"],
        ["University of Marketing", "Higher Education"],
        ["Utah Instruments", "Manufacturing"]
    ],
    leadSources = [
        "Inbound Call",
        "LinkedIn",
        "List Import",
        "Live Event",
        "Online Ad",
        "Other",
        "Partner",
        "PPC",
        "Referral",
        "Sales Outbound",
        "Webinar",
        "Website"
    ],
    webPageX,
    webPageXvisitationRate,
    companyX,
    cookieExpiresInDays,
    jobTitleCookieName,
    companyNameCookieName,
    industryCookieName,
    leadSourceCookieName;

/**************************************************************************************
 *
 *  Main
 *  
 **************************************************************************************/

console.log("Selecting: Web Page to Visit & Lead Attributes for Form Fill");

webPageX = webPages[Math.floor((Math.random() * Object.keys(webPages).length))];
webPageXvisitationRate = webPageX.visitationRate * Object.keys(webPages).length;
companyX = companies[Math.floor((Math.random() * companies.length))];

cookieExpiresInDays = 365;
jobTitleCookieName = "attrib_job_title";
companyNameCookieName = "attrib_company_name";
industryCookieName = "attrib_industry";
leadSourceCookieName = "attrib_lead_source";

getCookie({url : mktoAppDomainMatch, name : jobTitleCookieName}, function(cookie) {
    if (!cookie
    || !cookie.value) {
        console.log("Initializing: " + jobTitleCookieName + " Cookie");

        var jobTitleX = jobTitles[Math.floor((Math.random() * jobTitles.length))],
            jobTitleCookieMarketoLive = {
                url : mktoLiveDomainMatch,
                domain : mktoLiveUriDomain,
                name : jobTitleCookieName,
                value : jobTitleX,
                expiresInDays : cookieExpiresInDays
            },
            jobTitleCookieMarketoLiveClassic = {
                url : mktoLiveClassicDomainMatch,
                domain : mktoLiveClassicUriDomain,
                name : jobTitleCookieName,
                value : jobTitleX,
                expiresInDays : cookieExpiresInDays
            },
            jobTitleCookieLandingPage = {
                url : mktoAppDomainMatch,
                domain : mktoAppUriDomain,
                name : jobTitleCookieName,
                value : jobTitleX,
                expiresInDays : cookieExpiresInDays
            };
        
        setCookie(jobTitleCookieMarketoLive);
        setCookie(jobTitleCookieMarketoLiveClassic);
        setCookie(jobTitleCookieLandingPage);
    }
});

getCookie({url : mktoAppDomainMatch, name : companyNameCookieName}, function(cookie) {
    if (!cookie
    || !cookie.value) {
        console.log("Initializing: " + companyNameCookieName + " Cookie");

        var companyName = companyX[0],
            companyNameCookieMarketoLive = {
                url : mktoLiveDomainMatch,
                domain : mktoLiveUriDomain,
                name : companyNameCookieName,
                value : companyName,
                expiresInDays : cookieExpiresInDays
            },
            companyNameCookieMarketoLiveClassic = {
                url : mktoLiveClassicDomainMatch,
                domain : mktoLiveClassicUriDomain,
                name : companyNameCookieName,
                value : companyName,
                expiresInDays : cookieExpiresInDays
            },
            companyNameCookieLandingPage = {
                url : mktoAppDomainMatch,
                domain : mktoAppUriDomain,
                name : companyNameCookieName,
                value : companyName,
                expiresInDays : cookieExpiresInDays
            };
        
        setCookie(companyNameCookieMarketoLive);
        setCookie(companyNameCookieMarketoLiveClassic);
        setCookie(companyNameCookieLandingPage);
    }
});

getCookie({url : mktoAppDomainMatch, name : industryCookieName}, function(cookie) {
    if (!cookie
    || !cookie.value) {
        console.log("Initializing: " + industryCookieName + " Cookie");

        var industry = companyX[1],
            industryCookieMarketoLive = {
                url : mktoLiveDomainMatch,
                domain : mktoLiveUriDomain,
                name : industryCookieName,
                value : industry,
                expiresInDays : cookieExpiresInDays
            },
            industryCookieMarketoLiveClassic = {
                url : mktoLiveClassicDomainMatch,
                domain : mktoLiveClassicUriDomain,
                name : industryCookieName,
                value : industry,
                expiresInDays : cookieExpiresInDays
            },
            industryCookieLandingPage = {
                url : mktoAppDomainMatch,
                domain : mktoAppUriDomain,
                name : industryCookieName,
                value : industry,
                expiresInDays : cookieExpiresInDays
            };
        
        setCookie(industryCookieMarketoLive);
        setCookie(industryCookieMarketoLiveClassic);
        setCookie(industryCookieLandingPage);
    }
});

getCookie({url : mktoAppDomainMatch, name : leadSourceCookieName}, function(cookie) {
    if (!cookie
    || !cookie.value) {
        console.log("Initializing: " + leadSourceCookieName + " Cookie");

        var leadSourceX = leadSources[Math.floor((Math.random() * leadSources.length))],
            leadSourceCookieMarketoLive = {
                url : mktoLiveDomainMatch,
                domain : mktoLiveUriDomain,
                name : leadSourceCookieName,
                value : leadSourceX,
                expiresInDays : cookieExpiresInDays
            },
            leadSourceCookieMarketoLiveClassic = {
                url : mktoLiveClassicDomainMatch,
                domain : mktoLiveClassicUriDomain,
                name : leadSourceCookieName,
                value : leadSourceX,
                expiresInDays : cookieExpiresInDays
            },
            leadSourceCookieLandingPage = {
                url : mktoAppDomainMatch,
                domain : mktoAppUriDomain,
                name : leadSourceCookieName,
                value : leadSourceX,
                expiresInDays : cookieExpiresInDays
            };
        
        setCookie(leadSourceCookieMarketoLive);
        setCookie(leadSourceCookieMarketoLiveClassic);
        setCookie(leadSourceCookieLandingPage);
    }
});

if (webPageXvisitationRate >= 1.0
|| (Math.random()) <= webPageXvisitationRate) {
    var submitParam,
        visitedPagesCookieName = "visitedPages",
        visitedPagesCookieMarketoLive = {
            url : mktoLiveDomainMatch,
            domain : mktoLiveUriDomain,
            name : visitedPagesCookieName,
            expiresInDays : cookieExpiresInDays
        };
    
    getCookie(visitedPagesCookieMarketoLive, function(cookie) {
        if (cookie
        && cookie.value) {
            var proceed = false;
            
            if (webPageX.dependentOn.length > 0) {
                for (var ii = 0; ii < webPageX.dependentOn.length; ii++) {
                    if (cookie.value.search("(, )\?" + webPageX.dependentOn[ii] + "(,)\?") != -1) {
                        proceed = true;
                    }
                    else {
                        proceed = false;
                        break;
                    }
                }
            }
            else {
                proceed = true;
            }
            
            if (proceed) {
                console.log("Visiting: " + webPageX.url);
                
                if (webPageX.type == landingPageType
                && (webPageX.conversionRate >= 1.0
                    || (Math.random()) <= webPageX.conversionRate)) {
                    
                    submitParam = "submit=true";
                }
                else {
                    submitParam = "submit=false";
                }
                
                response = webRequest("GET", webPageX.url + "?" + submitParam, false);
                console.log("Response: " + webPageX.url + "?" + submitParam + ": " + response);
                visitedPagesCookieMarketoLive.value = cookie.value + ", " + webPageX.name;
                setCookie(visitedPagesCookieMarketoLive);
            }
            else {
                console.log("NOT Visiting: " + webPageX.url + " due to dependencies not being met (" + webPageX.dependentOn.toString() + ")");
            }
        }
        else {
            if (webPageX.dependentOn.length == 0) {
                console.log("Visiting Initial Page: " + webPageX.url);
                
                if (webPageX.type == landingPageType
                && (webPageX.conversionRate >= 1.0
                    || (Math.random()) <= webPageX.conversionRate)) {
                    
                    submitParam = "submit=true";
                }
                else {
                    submitParam = "submit=false";
                }
                
                response = webRequest("GET", webPageX.url + "?" + submitParam, false);
                console.log("Response: " + webPageX.url + "?" + submitParam + ": " + response);
                visitedPagesCookieMarketoLive.value = webPageX.name;
                setCookie(visitedPagesCookieMarketoLive);
            }
            else {
                console.log("NOT Visiting: " + webPageX.url + " due to dependencies not being met");
            }
        }
    });
}
else {
    console.log("NOT Visiting: " + webPageX.url + " due to web page visitation rate (" + webPageXvisitationRate + ")");
}