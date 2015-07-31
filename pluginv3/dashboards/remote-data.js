var header = document.getElementsByTagName("head")[0],
    ceeScript = document.createElement("script"),
    socialScript = document.createElement("script"),
    programScript = document.createElement("script"),
    emailDashboardScript = document.createElement("script"),
    emailAssetScript = document.createElement("script");

var isMktPage = window.setInterval(function() {
    if (typeof(MktPage) !== "undefined") {
        console.log("Dashboards > Injecting: Data Scripts");

        // Load the CEE data
        ceeScript.type = "text/javascript";
        ceeScript.async = true;
        ceeScript.onload = function() {
            console.log("Dashboards > Loading: CEE Data");
            loadCeeData();
        };
        ceeScript.src = "https://marketolive.com/m3-dev/pluginv3/dashboards/cee-data.js";
        header.appendChild(ceeScript);

        // Load social button data
        socialScript.type = "text/javascript";
        socialScript.async = true;
        socialScript.onload = function() {
            console.log("Dashboards > Loading: Social Data");
            loadSocialData();
        };
        socialScript.src = "https://marketolive.com/m3-dev/pluginv3/dashboards/social-data.js";
        header.appendChild(socialScript);

        // Load program analyzer data
        programScript.type = "text/javascript";
        programScript.async = true;
        programScript.onload = function() {
            console.log("Dashboards > Loading: Program Data");
            loadProgramData();
        };
        programScript.src = "https://marketolive.com/m3-dev/pluginv3/dashboards/program-data.js";
        header.appendChild(programScript);

        // Load email program dashboard data
        emailDashboardScript.type = "text/javascript";
        emailDashboardScript.async = true;
        emailDashboardScript.onload = function() {
            console.log("Dashboards > Loading: Email Program Data");
            loadEmailDashboardData();
        };
        emailDashboardScript.src = "https://marketolive.com/m3-dev/pluginv3/dashboards/email-dashboard-data.js";
        header.appendChild(emailDashboardScript);

        // Load email asset dashboard data
        emailAssetScript.type = "text/javascript";
        emailAssetScript.async = true;
        emailAssetScript.onload = function() {
            console.log("Dashboards > Loading: Email Asset Data");
            loadEmailAssetData();
        };
        emailAssetScript.src = "https://marketolive.com/m3-dev/pluginv3/dashboards/email-asset-data.js";
        header.appendChild(emailAssetScript);

        window.clearInterval(isMktPage);
    }
}, 0);