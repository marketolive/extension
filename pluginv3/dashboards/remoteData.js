var subdomainMatch = /([([a-z0-9][a-z0-9-]+[a-z0-9]\.marketo\.com)/;
var patt = new RegExp(subdomainMatch);
var res = patt.test(current_url);

if (res == true) {

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
        load_cee_data();
    };
    ceeScript.src = "https://marketolive.com/plugin/ceeData.js";
    header.appendChild(ceeScript);

    // Load social button data
    socialScript.type = "text/javascript";
    socialScript.async = true;
    socialScript.onload = function() {
        load_social_data();
    };
    socialScript.src = "https://marketolive.com/plugin/socialData.js";
    header.appendChild(socialScript);

    // Load program analyzer data
    programScript.type = "text/javascript";
    programScript.async = true;
    programScript.onload = function() {
        load_program_data();
    };
    programScript.src = "https://marketolive.com/plugin/programData.js";
    header.appendChild(programScript);

    // Load email program dashboard data
    emailDashboardScript.type = "text/javascript";
    emailDashboardScript.async = true;
    emailDashboardScript.onload = function() {
        load_emaildashboard_data();
    };
    emailDashboardScript.src = "https://marketolive.com/plugin/emailDashboardData.js";
    header.appendChild(emailDashboardScript);

    // Load email asset dashboard data
    emailAssetScript.type = "text/javascript";
    emailAssetScript.async = true;
    emailAssetScript.onload = function() {
        load_emailasset_data();
    };
    emailAssetScript.src = "https://marketolive.com/plugin/emailAssetData.js";
    header.appendChild(emailAssetScript);
}