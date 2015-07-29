var header = document.getElementsByTagName("head")[0],
    ceeScript = document.createElement("script"),
    socialScript = document.createElement("script"),
    programScript = document.createElement("script"),
    emailDashboardScript = document.createElement("script"),
    emailAssetScript = document.createElement("script");

// Load the CEE data
ceeScript.type = "text/javascript";
ceeScript.async = true;
ceeScript.onload = function() {
    loadCeeData();
};
ceeScript.src = "https://marketolive.com/dev/plugin-bcf/dashboards/cee-data.js";
header.appendChild(ceeScript);

// Load social button data
socialScript.type = "text/javascript";
socialScript.async = true;
socialScript.onload = function() {
    loadSocialData();
};
socialScript.src = "https://marketolive.com/dev/plugin-bcf/dashboards/social-data.js";
header.appendChild(socialScript);

// Load program analyzer data
programScript.type = "text/javascript";
programScript.async = true;
programScript.onload = function() {
    loadProgramData();
};
programScript.src = "https://marketolive.com/dev/plugin-bcf/dashboards/program-data.js";
header.appendChild(programScript);

// Load email program dashboard data
emailDashboardScript.type = "text/javascript";
emailDashboardScript.async = true;
emailDashboardScript.onload = function() {
    loadEmailDashboardData();
};
emailDashboardScript.src = "https://marketolive.com/dev/plugin-bcf/dashboards/email-dashboard-data.js";
header.appendChild(emailDashboardScript);

// Load email asset dashboard data
emailAssetScript.type = "text/javascript";
emailAssetScript.async = true;
emailAssetScript.onload = function() {
    loadEmailAssetData();
};
emailAssetScript.src = "https://marketolive.com/dev/plugin-bcf/dashboards/email-asset-data.js";
header.appendChild(emailAssetScript);