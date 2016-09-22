var webPages = {
        0 : {
            name : "signup",
            type : "landing",
            url : "http://na-sjdemo1.marketo.com/lp/185-NGX-811/Lead-Capture_Landing-Page.html",
            dependentOn : [],
            visitationRate : 1.0,
            conversionRate : 1.0,
        },
        1 : {
            name : "preferenceCenter",
            type : "landing",
            url : "http://na-sjdemo1.marketo.com/lp/185-NGX-811/Subscription-Management_Preference-Center.html",
            dependentOn : ["signup"],
            visitationRate : 0.05,
            conversionRate : 1.0,
        },
        2 : {
            name : "notYouPreferenceCenter",
            type : "landing",
            url : "http://na-sjdemo1.marketo.com/lp/185-NGX-811/Subscription-Management_Not-You-Preference-Center.html",
            dependentOn : ["signup"],
            visitationRate : 0.01,
            conversionRate : 1.0,
        },
        3 : {
            name : "webinarRegistration",
            type : "landing",
            url : "http://na-sjdemo1.marketo.com/lp/185-NGX-811/Webinar_Registration.html",
            dependentOn : ["signup"],
            visitationRate : 0.10,
            conversionRate : 1.0,
        },
        4 : {
            name : "webinarCheckIn",
            type : "landing",
            url : "http://na-sjdemo1.marketo.com/lp/185-NGX-811/Webinar_CheckIn.html",
            dependentOn : ["signup", "webinarRegistration"],
            visitationRate : 0.80,
            conversionRate : 1.0,
        },
        5 : {
            name : "liveEventRegistration",
            type : "landing",
            url : "http://na-sjdemo1.marketo.com/lp/185-NGX-811/Live-Event_Registration-Page.html",
            dependentOn : ["signup"],
            visitationRate : 0.10,
            conversionRate : 1.0,
        },
        6 : {
            name : "liveEventCheckIn",
            type : "landing",
            url : "http://na-sjdemo1.marketo.com/lp/185-NGX-811/Live-Event_Check-In.html",
            dependentOn : ["signup", "liveEventRegistration"],
            visitationRate : 0.80,
            conversionRate : 1.0,
        },
        7 : {
            name : "rewardsSignup",
            type : "landing",
            url : "http://na-sjdemo1.marketo.com/lp/185-NGX-811/Rewards-for-Champions_Rewards-Page.html",
            dependentOn : ["signup"],
            visitationRate : 0.05,
            conversionRate : 1.0,
        },
        8 : {
            name : "whyUs",
            type : "web",
            url : "http://www.marketolive.com/en/info/why-us",
            dependentOn : [],
            visitationRate : 0.33,
            conversionRate : 1.0,
        },
        9 : {
            name : "integrations",
            type : "web",
            url : "http://www.marketolive.com/en/info/integrations",
            dependentOn : [],
            visitationRate : 0.50,
            conversionRate : 1.0,
        },
        10 : {
            name : "contactUs",
            type : "web",
            url : "http://www.marketolive.com/en/info/contact-us",
            dependentOn : [],
            visitationRate : 0.05,
            conversionRate : 1.0,
        },
        11 : {
            name : "community",
            type : "web",
            url : "http://www.marketolive.com/en/info/community",
            dependentOn : ["signup", "rewardsSignup"],
            visitationRate : 0.03,
            conversionRate : 1.0,
        },
        12 : {
            name : "liveEvent",
            type : "web",
            url : "http://www.marketolive.com/en/info/live-event",
            dependentOn : ["signup", "liveEventRegistration"],
            visitationRate : 0.50,
            conversionRate : 1.0,
        },
        13 : {
            name : "webinar",
            type : "web",
            url : "http://www.marketolive.com/en/info/webinar",
            dependentOn : ["signup", "webinarRegistration"],
            visitationRate : 0.50,
            conversionRate : 1.0,
        },
        14 : {
            name : "products",
            type : "web",
            url : "http://www.marketolive.com/en/info/products",
            dependentOn : [],
            visitationRate : 0.75,
            conversionRate : 1.0,
        },
        15 : {
            name : "pricing",
            type : "web",
            url : "http://www.marketolive.com/en/info/pricing",
            dependentOn : [],
            visitationRate : 0.80,
            conversionRate : 1.0,
        },
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
        "Web Marketing Manager",
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
        ["Utah Instruments", "Manufacturing"],
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
        "Website",
    ],
    webPageX,
    webPageXvisitationRate,
    companyX,
    cookieMarketoLive,
    cookieMarketoLiveClassic,
    jobTitleCookieName,
    companyNameCookieName,
    industryCookieName,
    leadSourceCookieName;

/**************************************************************************************
 *
 *  Main
 *  
 **************************************************************************************/

console.log("Background > Selecting: Web Page to Visit & Lead Attributes for Form Fill");

webPageX = webPages[Math.floor((Math.random() * Object.keys(webPages).length))];
webPageXvisitationRate = webPageX.visitationRate * Object.keys(webPages).length;
companyX = companies[Math.floor((Math.random() * companies.length))];

cookieMarketoLive = {
    url : mktoLiveDomainMatch,
    domain : mktoLiveUriDomain,
    expiresInDays : 365,
};
cookieMarketoLiveClassic = {
    url : mktoLiveClassicDomainMatch,
    domain : mktoLiveClassicUriDomain,
    expiresInDays : 365,
};
cookieLandingPage = {
    url : "http://na-sjdemo1.marketo.com/*",
    domain : "na-sjdemo1.marketo.com",
    expiresInDays : 365,
};

jobTitleCookieName = "jobTitle";
companyNameCookieName = "companyName";
industryCookieName = "industry";
leadSourceCookieName = "leadSource";

if (webPageXvisitationRate > 1.0
|| (Math.random()) <= webPageXvisitationRate) {
    var visitedPagesCookieName = "visitedPages",
        visitedPagesCookieMarketoLive = {
            url : cookieMarketoLive.url,
            domain : cookieMarketoLive.domain,
            name : visitedPagesCookieName,
            expiresInDays : cookieMarketoLive.expiresInDays,
        };
    
    getCookie(visitedPagesCookieMarketoLive, function(cookie) {
        if (cookie
        && cookie.value) {
            var proceed = false;
            for (var ii = 0; ii < webPageX.dependentOn.length; ii++) {
                if (cookie.value.search("(, )\?" + webPageX.dependentOn[ii] + "(,)\?") != -1) {
                    proceed = true;
                }
                else {
                    proceed = false;
                    break;
                }
            }
            
            if (proceed) {
                console.log("Background > Visiting: " + webPageX.url);
                
                response = webRequest("GET", webPageX.url, false);
                visitedPagesCookieMarketoLive.value = cookie.value + ", " + webPageX.name;
                setCookie(visitedPagesCookieMarketoLive);
            }
            else {
                console.log("Background > NOT Visiting: " + webPageX.url + " due to dependencies not being met");
            }
        }
        else {
            console.log("Background > Visiting Initial Page: " + webPageX.url);
            
            response = webRequest("GET", webPageX.url, false);
            visitedPagesCookieMarketoLive.value = webPageX.name;
            setCookie(visitedPagesCookieMarketoLive);
        }
    });
}

getCookie(jobTitleCookieName, function(cookie) {
    if (!cookie
    || !cookie.value) {
        console.log("Background > Initializing: " + jobTitleCookieName + " Cookie");

        var jobTitleX = jobTitles[Math.floor((Math.random() * jobTitles.length))],
            jobTitleCookieMarketoLive = {
                url : cookieMarketoLive.url,
                domain : cookieMarketoLive.domain,
                name : jobTitleCookieName,
                value : jobTitleX,
                expiresInDays : cookieMarketoLive.expiresInDays,
            },
            jobTitleCookieMarketoLiveClassic = {
                url : cookieMarketoLiveClassic.url,
                domain : cookieMarketoLiveClassic.domain,
                name : jobTitleCookieName,
                value : jobTitleX,
                expiresInDays : cookieMarketoLiveClassic.expiresInDays,
            },
            jobTitleCookieLandingPage = {
                url : cookieLandingPage.url,
                domain : cookieLandingPage.domain,
                name : jobTitleCookieName,
                value : jobTitleX,
                expiresInDays : cookieLandingPage.expiresInDays,
            };
        
        setCookie(jobTitleCookieMarketoLive);
        setCookie(jobTitleCookieMarketoLiveClassic);
        setCookie(jobTitleCookieLandingPage);
    }
}

getCookie(companyNameCookieName, function(cookie) {
    if (!cookie
    || !cookie.value) {
        console.log("Background > Initializing: " + companyNameCookieName + " Cookie");

        var companyName = companyX[0],
            companyNameCookieMarketoLive = {
                url : cookieMarketoLive.url,
                domain : cookieMarketoLive.domain,
                name : companyNameCookieName,
                value : companyName,
                expiresInDays : cookieMarketoLive.expiresInDays,
            },
            companyNameCookieMarketoLiveClassic = {
                url : cookieMarketoLiveClassic.url,
                domain : cookieMarketoLiveClassic.domain,
                name : companyNameCookieName,
                value : companyName,
                expiresInDays : cookieMarketoLiveClassic.expiresInDays,
            },
            companyNameCookieLandingPage = {
                url : cookieLandingPage.url,
                domain : cookieLandingPage.domain,
                name : companyNameCookieName,
                value : companyName,
                expiresInDays : cookieLandingPage.expiresInDays,
            };
        
        setCookie(companyNameCookieMarketoLive);
        setCookie(companyNameCookieMarketoLiveClassic);
        setCookie(companyNameCookieLandingPage);
    }
}

getCookie(industryCookieName, function(cookie) {
    if (!cookie
    || !cookie.value) {
        console.log("Background > Initializing: " + industryCookieName + " Cookie");

        var industry = companyX[1],
            industryCookieMarketoLive = {
                url : cookieMarketoLive.url,
                domain : cookieMarketoLive.domain,
                name : industryCookieName,
                value : industry,
                expiresInDays : cookieMarketoLive.expiresInDays,
            },
            industryCookieMarketoLiveClassic = {
                url : cookieMarketoLiveClassic.url,
                domain : cookieMarketoLiveClassic.domain,
                name : industryCookieName,
                value : industry,
                expiresInDays : cookieMarketoLiveClassic.expiresInDays,
            },
            industryCookieLandingPage = {
                url : cookieLandingPage.url,
                domain : cookieLandingPage.domain,
                name : industryCookieName,
                value : industry,
                expiresInDays : cookieLandingPage.expiresInDays,
            };
        
        setCookie(industryCookieMarketoLive);
        setCookie(industryCookieMarketoLiveClassic);
        setCookie(industryCookieLandingPage);
    }
}

getCookie(leadSourceCookieName, function(cookie) {
    if (!cookie
    || !cookie.value) {
        console.log("Background > Initializing: " + leadSourceCookieName + " Cookie");

        var leadSourceX = leadSources[Math.floor((Math.random() * leadSources.length))],
            leadSourceCookieMarketoLive = {
                url : cookieMarketoLive.url,
                domain : cookieMarketoLive.domain,
                name : leadSourceCookieName,
                value : leadSourceX,
                expiresInDays : cookieMarketoLive.expiresInDays,
            },
            leadSourceCookieMarketoLiveClassic = {
                url : cookieMarketoLiveClassic.url,
                domain : cookieMarketoLiveClassic.domain,
                name : leadSourceCookieName,
                value : leadSourceX,
                expiresInDays : cookieMarketoLiveClassic.expiresInDays,
            },
            leadSourceCookieLandingPage = {
                url : cookieLandingPage.url,
                domain : cookieLandingPage.domain,
                name : leadSourceCookieName,
                value : leadSourceX,
                expiresInDays : cookieLandingPage.expiresInDays,
            };
        
        setCookie(leadSourceCookieMarketoLive);
        setCookie(leadSourceCookieMarketoLiveClassic);
        setCookie(leadSourceCookieLandingPage);
    }
}