var URL_PATH = "m3",
    CEE_SCRIPT_LOCATION = "https://marketolive.com/"+URL_PATH+"/pluginv3/dashboards/cee-data.min.js",
    SOCIAL_SCRIPT_LOCATION = "https://marketolive.com/"+URL_PATH+"/pluginv3/dashboards/social-data.min.js",
    PROGRAM_SCRIPT_LOCATION = "https://marketolive.com/"+URL_PATH+"/pluginv3/dashboards/program-data.min.js",
    EMAIL_DASHBOARD_SCRIPT_LOCATION = "https://marketolive.com/"+URL_PATH+"/pluginv3/dashboards/email-dashboard-data.min.js",
    EMAIL_ASSET_SCRIPT_LOCATION = "https://marketolive.com/"+URL_PATH+"/pluginv3/dashboards/email-asset-data.min.js",
    header = document.getElementsByTagName("head")[0],
    ceeScript = document.createElement("script"),
    socialScript = document.createElement("script"),
    programScript = document.createElement("script"),
    emailDashboardScript = document.createElement("script"),
    emailAssetScript = document.createElement("script"),
    isMktPageDashboards;

isMktPageDashboards = window.setInterval(function() {
    if (typeof(MktPage) !== "undefined") {
        console.log("Dashboards > Injecting: Data Scripts");
        
        window.clearInterval(isMktPageDashboards);
        
        console.log("Dashboards > Cleared: Window Interval");

        // Load the CEE data
        ceeScript.type = "text/javascript";
        ceeScript.async = true;
        ceeScript.onload = function() {
            console.log("Dashboards > Loading: CEE Data");
            loadCeeData();
        };
        ceeScript.src = CEE_SCRIPT_LOCATION;
        header.appendChild(ceeScript);

        // Load social button data
        socialScript.type = "text/javascript";
        socialScript.async = true;
        socialScript.onload = function() {
            console.log("Dashboards > Loading: Social Data");
            loadSocialData();
        };
        socialScript.src = SOCIAL_SCRIPT_LOCATION;
        header.appendChild(socialScript);

        // Load program analyzer data
        programScript.type = "text/javascript";
        programScript.async = true;
        programScript.onload = function() {
            console.log("Dashboards > Loading: Program Data");
            loadProgramData();
        };
        programScript.src = PROGRAM_SCRIPT_LOCATION;
        header.appendChild(programScript);

        // Load email program dashboard data
        emailDashboardScript.type = "text/javascript";
        emailDashboardScript.async = true;
        emailDashboardScript.onload = function() {
            console.log("Dashboards > Loading: Email Program Data");
            loadEmailDashboardData();
        };
        emailDashboardScript.src = EMAIL_DASHBOARD_SCRIPT_LOCATION;
        header.appendChild(emailDashboardScript);

        // Load email asset dashboard data
        emailAssetScript.type = "text/javascript";
        emailAssetScript.async = true;
        emailAssetScript.onload = function() {
            console.log("Dashboards > Loading: Email Asset Data");
            loadEmailAssetData();
        };
        emailAssetScript.src = EMAIL_ASSET_SCRIPT_LOCATION;
        header.appendChild(emailAssetScript);
    }
}, 0);