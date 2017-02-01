var mktoLiveLandingPageHost = "na-sjdemo1.marketo.com",
mktoLiveDevLandingPageDomain = "pages-dev.marketolive.com",
mktoLiveProdLandingPageDomain = "pages.marketolive.com",
mktoLiveLandingPageDomain = mktoLiveDevLandingPageDomain,
mktoLiveDevMunchkinId = "685-BTN-772",
mktoLiveProdMunchkinId = "185-NGX-811",
mktoLiveMunchkinId = mktoLiveDevMunchkinId,
mktoLiveDevHost = "www.marketolive-dev.com",
mktoLiveProdHost = "www.marketolive.com",
mktoLiveHost = mktoLiveProdHost,
landingPageType = "landing",
webPageType = "web",
webPages = [{
        acquire: true,
        type: landingPageType,
        url: "http://" + mktoLiveLandingPageDomain + "/google-adwords-acquire.html",
        lpUrl: "http://" + mktoLiveLandingPageHost + "/lp/" + mktoLiveMunchkinId + "/google-adwords-acquire.html",
        conversionRate: 0.5
    }, {
        acquire: true,
        type: landingPageType,
        url: "http://" + mktoLiveLandingPageDomain + "/contact-us.html",
        lpUrl: "http://" + mktoLiveLandingPageHost + "/lp/" + mktoLiveMunchkinId + "/contact-us.html",
        conversionRate: 0.5
    }, {
        acquire: true,
        type: landingPageType,
        url: "http://" + mktoLiveLandingPageDomain + "/google-display-ads-acquire.html",
        lpUrl: "http://" + mktoLiveLandingPageHost + "/lp/" + mktoLiveMunchkinId + "/google-display-ads-acquire.html",
        conversionRate: 0.5
    }, {
        acquire: true,
        type: landingPageType,
        url: "http://" + mktoLiveLandingPageDomain + "/turner-contact-us.html",
        lpUrl: "http://" + mktoLiveLandingPageHost + "/lp/" + mktoLiveMunchkinId + "/turner-contact-us.html",
        conversionRate: 0.5
    }, {
        type: webPageType,
        url: "http://" + mktoLiveHost + "/info/contact-us",
        conversionRate: 0.5
    }, {
        acquire: true,
        type: landingPageType,
        url: "http://" + mktoLiveLandingPageDomain + "/facebook-lead-ads-acquire.html",
        lpUrl: "http://" + mktoLiveLandingPageHost + "/lp/" + mktoLiveMunchkinId + "/facebook-lead-ads-acquire.html",
        conversionRate: 0.5
    }, {
        acquire: true,
        type: landingPageType,
        url: "http://" + mktoLiveLandingPageDomain + "/monthly-digest-signup.html",
        lpUrl: "http://" + mktoLiveLandingPageHost + "/lp/" + mktoLiveMunchkinId + "/monthly-digest-signup.html",
        conversionRate: 0.5
    }, {
        acquire: true,
        type: landingPageType,
        url: "http://" + mktoLiveLandingPageDomain + "/facebook-news-feed-ads-acquire.html",
        lpUrl: "http://" + mktoLiveLandingPageHost + "/lp/" + mktoLiveMunchkinId + "/facebook-news-feed-ads-acquire.html",
        conversionRate: 0.5
    }, {
        acquire: true,
        type: landingPageType,
        url: "http://" + mktoLiveLandingPageDomain + "/turner-monthly-digest-signup.html",
        lpUrl: "http://" + mktoLiveLandingPageHost + "/lp/" + mktoLiveMunchkinId + "/turner-monthly-digest-signup.html",
        conversionRate: 0.5
    }, {
        type: webPageType,
        url: "http://" + mktoLiveHost + "/info/why-us",
        conversionRate: 0.5
    }, {
        acquire: true,
        type: landingPageType,
        url: "http://" + mktoLiveLandingPageDomain + "/linkedin-lead-ads-acquire.html",
        lpUrl: "http://" + mktoLiveLandingPageHost + "/lp/" + mktoLiveMunchkinId + "/linkedin-lead-ads-acquire.html",
        conversionRate: 0.5
    }, {
        acquire: true,
        type: landingPageType,
        url: "http://" + mktoLiveLandingPageDomain + "/blog-signup.html",
        lpUrl: "http://" + mktoLiveLandingPageHost + "/lp/" + mktoLiveMunchkinId + "/blog-signup.html",
        conversionRate: 0.5
    }, {
        acquire: true,
        type: landingPageType,
        url: "http://" + mktoLiveLandingPageDomain + "/demand-side-platform-acquire.html",
        lpUrl: "http://" + mktoLiveLandingPageHost + "/lp/" + mktoLiveMunchkinId + "/demand-side-platform-acquire.html",
        conversionRate: 0.5
    }, {
        acquire: true,
        type: landingPageType,
        url: "http://" + mktoLiveLandingPageDomain + "/cloud-storage-blog-signup.html",
        lpUrl: "http://" + mktoLiveLandingPageHost + "/lp/" + mktoLiveMunchkinId + "/cloud-storage-blog-signup.html",
        conversionRate: 0.5
    }, {
        type: webPageType,
        url: "http://" + mktoLiveHost + "/info/products",
        conversionRate: 0.5
    }, {
        acquire: true,
        type: landingPageType,
        url: "http://" + mktoLiveLandingPageDomain + "/whitepaper-download.html",
        lpUrl: "http://" + mktoLiveLandingPageHost + "/lp/" + mktoLiveMunchkinId + "/whitepaper-download.html",
        conversionRate: 0.5
    }, {
        acquire: true,
        type: landingPageType,
        url: "http://" + mktoLiveLandingPageDomain + "/cloud-backup-whitepaper-download.html",
        lpUrl: "http://" + mktoLiveLandingPageHost + "/lp/" + mktoLiveMunchkinId + "/cloud-backup-whitepaper-download.html",
        conversionRate: 0.5
    }, {
        type: webPageType,
        url: "http://" + mktoLiveHost + "/info/integrations",
        conversionRate: 0.5
    }, {
        type: landingPageType,
        url: "http://" + mktoLiveLandingPageDomain + "/best-practices-webinar-registration.html",
        lpUrl: "http://" + mktoLiveLandingPageHost + "/lp/" + mktoLiveMunchkinId + "/best-practices-webinar-registration.html",
        conversionRate: 0.5
    }, {
        type: landingPageType,
        url: "http://" + mktoLiveLandingPageDomain + "/cloud-management-demo-registration.html",
        lpUrl: "http://" + mktoLiveLandingPageHost + "/lp/" + mktoLiveMunchkinId + "/cloud-management-demo-registration.html",
        conversionRate: 0.5
    }, {
        type: webPageType,
        url: "http://" + mktoLiveHost + "/info/webinar",
        conversionRate: 0.5
    }, {
        type: landingPageType,
        url: "http://" + mktoLiveLandingPageDomain + "/best-practices-webinar-check-in.html",
        lpUrl: "http://" + mktoLiveLandingPageHost + "/lp/" + mktoLiveMunchkinId + "/best-practices-webinar-check-in.html",
        conversionRate: 0.5
    }, {
        type: landingPageType,
        url: "http://" + mktoLiveLandingPageDomain + "/cloud-management-demo-check-in.html",
        lpUrl: "http://" + mktoLiveLandingPageHost + "/lp/" + mktoLiveMunchkinId + "/cloud-management-demo-check-in.html",
        conversionRate: 0.5
    }, {
        type: webPageType,
        url: "http://" + mktoLiveHost + "/info/pricing",
        conversionRate: 0.5
    }, {
        type: landingPageType,
        url: "http://" + mktoLiveLandingPageDomain + "/roadshow-event-registration.html",
        lpUrl: "http://" + mktoLiveLandingPageHost + "/lp/" + mktoLiveMunchkinId + "/roadshow-event-registration.html",
        conversionRate: 0.5
    }, {
        type: landingPageType,
        url: "http://" + mktoLiveLandingPageDomain + "/cloud-storage-launch-registration.html",
        lpUrl: "http://" + mktoLiveLandingPageHost + "/lp/" + mktoLiveMunchkinId + "/cloud-storage-launch-registration.html",
        conversionRate: 0.5
    }, {
        type: webPageType,
        url: "http://" + mktoLiveHost + "/info/live-event",
        conversionRate: 0.5
    }, {
        type: landingPageType,
        url: "http://" + mktoLiveLandingPageDomain + "/roadshow-event-check-in.html",
        lpUrl: "http://" + mktoLiveLandingPageHost + "/lp/" + mktoLiveMunchkinId + "/roadshow-event-check-in.html",
        conversionRate: 0.5
    }, {
        type: landingPageType,
        url: "http://" + mktoLiveLandingPageDomain + "/cloud-storage-launch-check-in.html",
        lpUrl: "http://" + mktoLiveLandingPageHost + "/lp/" + mktoLiveMunchkinId + "/cloud-storage-launch-check-in.html",
        conversionRate: 0.5
    }, {
        type: landingPageType,
        url: "http://" + mktoLiveLandingPageDomain + "/data-compliance-demo-registration.html",
        lpUrl: "http://" + mktoLiveLandingPageHost + "/lp/" + mktoLiveMunchkinId + "/data-compliance-demo-registration.html",
        conversionRate: 0.5
    }, {
        type: webPageType,
        url: "http://" + mktoLiveHost + "/info/webinar",
        conversionRate: 0.5
    }, {
        type: landingPageType,
        url: "http://" + mktoLiveLandingPageDomain + "/data-compliance-demo-check-in.html",
        lpUrl: "http://" + mktoLiveLandingPageHost + "/lp/" + mktoLiveMunchkinId + "/data-compliance-demo-check-in.html",
        conversionRate: 0.5
    }, {
        type: landingPageType,
        url: "http://" + mktoLiveLandingPageDomain + "/data-protection-webinar-registration.html",
        lpUrl: "http://" + mktoLiveLandingPageHost + "/lp/" + mktoLiveMunchkinId + "/data-protection-webinar-registration.html",
        conversionRate: 0.5
    }, {
        type: webPageType,
        url: "http://" + mktoLiveHost + "/info/webinar",
        conversionRate: 0.5
    }, {
        type: landingPageType,
        url: "http://" + mktoLiveLandingPageDomain + "/data-protection-webinar-check-in.html",
        lpUrl: "http://" + mktoLiveLandingPageHost + "/lp/" + mktoLiveMunchkinId + "/data-protection-webinar-check-in.html",
        conversionRate: 0.5
    }, {
        type: landingPageType,
        url: "http://" + mktoLiveLandingPageDomain + "/champions-on-demand-signup.html",
        lpUrl: "http://" + mktoLiveLandingPageHost + "/lp/" + mktoLiveMunchkinId + "/champions-on-demand-signup.html",
        conversionRate: 0.5
    }, {
        type: webPageType,
        url: "http://" + mktoLiveHost + "/info/community",
        conversionRate: 0.5
    }, {
        type: landingPageType,
        url: "http://" + mktoLiveLandingPageDomain + "/preference-center.html",
        lpUrl: "http://" + mktoLiveLandingPageHost + "/lp/" + mktoLiveMunchkinId + "/preference-center.html",
        conversionRate: 0.5
    }, {
        type: landingPageType,
        url: "http://" + mktoLiveLandingPageDomain + "/not-you-preference-center.html",
        lpUrl: "http://" + mktoLiveLandingPageHost + "/lp/" + mktoLiveMunchkinId + "/not-you-preference-center.html",
        conversionRate: 0.5
    }
],
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
    ["Turing Technologies", "Technology"],
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
utm = [{
        "terms": [
            "marketo",
            "marketo demo",
            "marketo webinar",
            "marketo event",
            "marketo blog",
            "marketing automation",
            "marketing solutions",
            "marketing analytics",
            "marketing nation",
            "engagement platform",
            "engagement engine",
            "account based marketing",
            "lead management",
            "email marketing",
            "consumer marketing",
            "customer base marketing",
            "mobile marketing"
        ],
        "campaigns": [
            "Marketing Automation",
            "Account Based Marketing",
            "Email Engagement",
            "Mobile Engagement",
            "Social Integration",
            "Digital Ad Targeting",
            "Web Personalization",
            "Marketing Analytics",
            "Predictive Content"
        ]
    }, {
        "terms": [
            "turner tech",
            "turner demo",
            "turner webinar",
            "turner event",
            "turner blog",
            "cloud storage",
            "cloud backup",
            "cloud management",
            "data protection",
            "data compliance"
        ],
        "campaigns": [
            "Data Protection",
            "HIPPA Data Compliance",
            "Cloud Backup",
            "Cloud Storage",
            "Virtualized Backup",
            "Hybrid Cloud Backup",
            "Data Continuity",
            "Instant Data Recovery"
        ]
    }
],
utmMediums = [
    "CPC",
    "CPM",
    "CPA"
],
usAreaCodes = [201, 202, 203, 205, 206, 207, 208, 209, 210, 212, 213, 214, 215, 216, 217, 218, 219, 224, 225, 228, 229, 231, 234, 239, 240, 248, 251, 252, 253, 254, 256, 260, 262, 267, 269, 270, 272, 276, 281, 301, 302, 303, 304, 305, 307, 308, 309, 310, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321, 323, 325, 330, 331, 334, 336, 337, 339, 340, 346, 347, 351, 352, 360, 361, 385, 386, 401, 402, 404, 405, 406, 407, 408, 409, 410, 412, 413, 414, 415, 417, 419, 423, 424, 425, 430, 432, 434, 435, 440, 442, 443, 458, 469, 470, 475, 478, 479, 480, 484, 501, 502, 503, 504, 505, 507, 508, 509, 510, 512, 513, 515, 516, 517, 518, 520, 530, 531, 534, 539, 540, 541, 551, 559, 561, 562, 563, 567, 570, 571, 573, 574, 575, 580, 585, 586, 601, 602, 603, 605, 606, 607, 608, 609, 610, 612, 614, 615, 616, 617, 618, 619, 620, 623, 626, 630, 631, 636, 641, 646, 650, 651, 657, 660, 661, 662, 667, 669, 670, 671, 678, 681, 682, 684, 701, 702, 703, 704, 706, 707, 708, 712, 713, 714, 715, 716, 717, 718, 719, 720, 724, 725, 727, 731, 732, 734, 737, 740, 747, 754, 757, 760, 762, 763, 765, 769, 770, 772, 773, 774, 775, 779, 781, 785, 786, 787, 801, 802, 803, 804, 805, 806, 808, 810, 812, 813, 814, 815, 816, 817, 818, 828, 830, 831, 832, 843, 845, 847, 848, 850, 856, 857, 858, 859, 860, 862, 863, 864, 865, 870, 872, 878, 901, 903, 904, 906, 907, 908, 909, 910, 912, 913, 914, 915, 916, 917, 918, 919, 920, 925, 928, 929, 931, 936, 937, 938, 939, 940, 941, 947, 949, 951, 952, 954, 956, 970, 971, 972, 973, 978, 979, 980, 984, 985, 989],
frMobile = "+33 06 55 55 55 55",
ukMobile = "+44 070 5555 5555",
deMobile = "+49 0151 5555555",
auMobile = "+61 04011 555 555",
jpMobile = "+81 070 5555  5555",
frPhone = "+33 01 55 55 55 55",
ukPhone = "+44 020 5555 5555",
dePhone = "+49 030 5555 5555",
auPhone = "+61 02 5555 5555",
jpPhone = "+81 03 5555 5555",
mobileNumbers = [frMobile, ukMobile, deMobile, auMobile, jpMobile],
phoneNumbers = [frPhone, ukPhone, dePhone, auPhone, jpPhone],
mobileNumberConversionRate = 0.25,
phoneNumberConversionRate = 0.5,
usNumberRate = 0.75,
webPageX,
companyX,
submitParams,
cookieExpiresInDays = 365,
jobTitleCookieName = "attrib_job_title",
companyNameCookieName = "attrib_company_name",
industryCookieName = "attrib_industry",
leadSourceCookieName = "attrib_lead_source",
mobileNumberCookieName = "attrib_mobile_number",
phoneNumberCookieName = "attrib_phone_number",
usernameCookieName = "onelogin_username",
visitedPagesCookieMarketoLive = {
    url: mktoLiveDomainMatch,
    domain: mktoLiveUriDomain,
    name: "visitedPages",
    expiresInDays: cookieExpiresInDays
};

/**************************************************************************************
 *
 *  Main
 *
 **************************************************************************************/

console.log("Selecting: Web Page to Visit & Lead Attributes for Form Fill");
companyX = companies[Math.floor(Math.random() * companies.length)];

getCookie({
    url: mktoAppDomainMatch,
    name: jobTitleCookieName
}, function (cookie) {
    if (!cookie
         || !cookie.value) {
        console.log("Initializing: " + jobTitleCookieName + " Cookie");
        
        var jobTitleX = jobTitles[Math.floor(Math.random() * jobTitles.length)];
        
        setCookie({
            url: mktoLiveDomainMatch,
            domain: mktoLiveUriDomain,
            name: jobTitleCookieName,
            value: jobTitleX,
            expiresInDays: cookieExpiresInDays
        });
        setCookie({
            url: mktoLiveClassicDomainMatch,
            domain: mktoLiveClassicUriDomain,
            name: jobTitleCookieName,
            value: jobTitleX,
            expiresInDays: cookieExpiresInDays
        });
        setCookie({
            url: mktoAppDomainMatch,
            domain: mktoAppUriDomain,
            name: jobTitleCookieName,
            value: jobTitleX,
            expiresInDays: cookieExpiresInDays
        });
    }
});

getCookie({
    url: mktoAppDomainMatch,
    name: companyNameCookieName
}, function (cookie) {
    if (!cookie
         || !cookie.value) {
        console.log("Initializing: " + companyNameCookieName + " Cookie");
        
        var companyName = companyX[0];
        
        setCookie({
            url: mktoLiveDomainMatch,
            domain: mktoLiveUriDomain,
            name: companyNameCookieName,
            value: companyName,
            expiresInDays: cookieExpiresInDays
        });
        setCookie({
            url: mktoLiveClassicDomainMatch,
            domain: mktoLiveClassicUriDomain,
            name: companyNameCookieName,
            value: companyName,
            expiresInDays: cookieExpiresInDays
        });
        setCookie({
            url: mktoAppDomainMatch,
            domain: mktoAppUriDomain,
            name: companyNameCookieName,
            value: companyName,
            expiresInDays: cookieExpiresInDays
        });
    }
});

getCookie({
    url: mktoAppDomainMatch,
    name: industryCookieName
}, function (cookie) {
    if (!cookie
         || !cookie.value) {
        console.log("Initializing: " + industryCookieName + " Cookie");
        
        var industry = companyX[1];
        
        setCookie({
            url: mktoLiveDomainMatch,
            domain: mktoLiveUriDomain,
            name: industryCookieName,
            value: industry,
            expiresInDays: cookieExpiresInDays
        });
        setCookie({
            url: mktoLiveClassicDomainMatch,
            domain: mktoLiveClassicUriDomain,
            name: industryCookieName,
            value: industry,
            expiresInDays: cookieExpiresInDays
        });
        setCookie({
            url: mktoAppDomainMatch,
            domain: mktoAppUriDomain,
            name: industryCookieName,
            value: industry,
            expiresInDays: cookieExpiresInDays
        });
    }
});

getCookie({
    url: mktoAppDomainMatch,
    name: leadSourceCookieName
}, function (cookie) {
    if (!cookie
         || !cookie.value) {
        console.log("Initializing: " + leadSourceCookieName + " Cookie");
        
        var leadSourceX = leadSources[Math.floor(Math.random() * leadSources.length)];
        
        setCookie({
            url: mktoLiveDomainMatch,
            domain: mktoLiveUriDomain,
            name: leadSourceCookieName,
            value: leadSourceX,
            expiresInDays: cookieExpiresInDays
        });
        setCookie({
            url: mktoLiveClassicDomainMatch,
            domain: mktoLiveClassicUriDomain,
            name: leadSourceCookieName,
            value: leadSourceX,
            expiresInDays: cookieExpiresInDays
        });
        setCookie({
            url: mktoAppDomainMatch,
            domain: mktoAppUriDomain,
            name: leadSourceCookieName,
            value: leadSourceX,
            expiresInDays: cookieExpiresInDays
        });
    }
});

getCookie({
    url: mktoAppDomainMatch,
    name: mobileNumberCookieName
}, function (cookie) {
    if (!cookie
         || !cookie.value) {
        
        if ((Math.random()) <= mobileNumberConversionRate) {
            console.log("Initializing: " + mobileNumberCookieName + " Cookie");
            
            var mobileNumberX;
            if ((Math.random()) <= usNumberRate) {
                mobileNumberX = "+1-" + usAreaCodes[Math.floor(Math.random() * usAreaCodes.length)] + "-555-" + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10);
            } else {
                mobileNumberX = mobileNumbers[Math.floor(Math.random() * mobileNumbers.length)];
            }
            
            setCookie({
                url: mktoLiveDomainMatch,
                domain: mktoLiveUriDomain,
                name: mobileNumberCookieName,
                value: mobileNumberX,
                expiresInDays: cookieExpiresInDays
            });
            setCookie({
                url: mktoLiveClassicDomainMatch,
                domain: mktoLiveClassicUriDomain,
                name: mobileNumberCookieName,
                value: mobileNumberX,
                expiresInDays: cookieExpiresInDays
            });
            setCookie({
                url: mktoAppDomainMatch,
                domain: mktoAppUriDomain,
                name: mobileNumberCookieName,
                value: mobileNumberX,
                expiresInDays: cookieExpiresInDays
            });
        } else {
            console.log("NOT Initializing: " + mobileNumberCookieName + " Cookie due to conversion rate " + mobileNumberConversionRate);
        }
    }
});

getCookie({
    url: mktoAppDomainMatch,
    name: phoneNumberCookieName
}, function (cookie) {
    if (!cookie
         || !cookie.value) {
        
        if ((Math.random()) <= phoneNumberConversionRate) {
            console.log("Initializing: " + phoneNumberCookieName + " Cookie");
            
            var phoneNumberX;
            if ((Math.random()) <= usNumberRate) {
                phoneNumberX = "+1-" + usAreaCodes[Math.floor(Math.random() * usAreaCodes.length)] + "-555-" + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10);
            } else {
                phoneNumberX = phoneNumbers[Math.floor(Math.random() * phoneNumbers.length)];
            }
            
            setCookie({
                url: mktoLiveDomainMatch,
                domain: mktoLiveUriDomain,
                name: phoneNumberCookieName,
                value: phoneNumberX,
                expiresInDays: cookieExpiresInDays
            });
            setCookie({
                url: mktoLiveClassicDomainMatch,
                domain: mktoLiveClassicUriDomain,
                name: phoneNumberCookieName,
                value: phoneNumberX,
                expiresInDays: cookieExpiresInDays
            });
            setCookie({
                url: mktoAppDomainMatch,
                domain: mktoAppUriDomain,
                name: phoneNumberCookieName,
                value: phoneNumberX,
                expiresInDays: cookieExpiresInDays
            });
        } else {
            console.log("NOT Initializing: " + phoneNumberCookieName + " Cookie due to conversion rate " + phoneNumberConversionRate);
        }
    }
});

function visitPage(index) {
    var visitedPagesCookie = visitedPagesCookieMarketoLive,
    tabId;
    
    chrome.tabs.create({
        url: webPageX.url + "?" + submitParams,
        active: false,
        selected: false,
        pinned: true
    }, function (tab) {
        tabId = tab.id;
    });
    
    window.setTimeout(function () {
        chrome.tabs.remove(tabId);
    }, 10000);
    
    visitedPagesCookie.value = index.toString();
    setCookie(visitedPagesCookie);
}

getCookie(visitedPagesCookieMarketoLive, function (cookie) {
    var visitedPagesIndex;
    if (cookie
         && cookie.value
         && Number.isInteger(parseInt(cookie.value))
         && parseInt(cookie.value) < webPages.length) {
        visitedPagesIndex = parseInt(cookie.value) + 1;
        webPageX = webPages[visitedPagesIndex];
    } else {
        var acquirePages = [];
        for (var ii = 0; ii < webPages.length; ii++) {
            if (webPages[ii].acquire) {
                acquirePages.push(ii);
            }
        }
        visitedPagesIndex = acquirePages[Math.floor(Math.random() * acquirePages.length)];
        webPageX = webPages[visitedPagesIndex];
    }
    if (webPageX.lpUrl) {
        webPageX.url = webPageX.lpUrl;
    }
    if (webPageX.type == landingPageType) {
        getCookie({
            url: mktoAppDomainMatch,
            name: usernameCookieName
        }, function (cookie) {
            if (cookie
                 && cookie.value) {
                if (webPageX.conversionRate >= 1.0
                     || (Math.random()) <= webPageX.conversionRate) {
                    submitParams = "submit=true";
                    if (webPageX.url.search(/-acquire\.html$/) != -1) {
                        var utmIndex = Math.floor(Math.random() * utm.length),
                        utmTermX = utm[utmIndex].terms[Math.floor(Math.random() * utm[utmIndex].terms.length)],
                        utmMediumX = utmMediums[Math.floor(Math.random() * utmMediums.length)],
                        utmCampaignX = utm[utmIndex].campaigns[Math.floor(Math.random() * utm[utmIndex].campaigns.length)];
                        submitParams = submitParams + "&utmTerm=" + encodeURIComponent(utmTermX) + "&utmMedium=" + encodeURIComponent(utmMediumX) + "&utmCampaign=" + encodeURIComponent(utmCampaignX);
                    }
                } else {
                    submitParams = "submit=false";
                }
                console.log("Visiting Page Index (" + visitedPagesIndex + "): " + webPageX.url + "?" + submitParams);
                visitPage(visitedPagesIndex);
            } else {
                console.log("NOT Visiting: " + webPageX.url + " due to " + usernameCookieName + " cookie is null");
            }
        });
    } else if (webPageX.type == webPageType) {
        getCookie({
            url: mktoLiveDomainMatch,
            name: usernameCookieName
        }, function (cookie) {
            if (cookie
                 && cookie.value) {
                console.log("Visiting Page Index (" + visitedPagesIndex + "): " + webPageX.url);
                visitPage(visitedPagesIndex);
            } else {
                console.log("NOT Visiting: " + webPageX.url + " due to " + usernameCookieName + " cookie is null");
            }
        });
    }
});