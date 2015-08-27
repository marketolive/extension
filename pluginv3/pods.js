console.log("Pods > Running");

// TODO: add error check for invalid pod, make sure that replicateSuccess is the same for all pods

var URL_PATH = "m3-dev",
    PODS = PODS || {};

/**************************************************************************************
 *
 *  This function retrieves the value of the cookie field that is
 *  given by the cname parameter.
 *
 *
 *  @Author Andy
 *
 *  @function
 *  @param cookieField {string} -   The desired cookie field such as "userPod" which
 *                                  be used to construct a user's pod object.
 *
 **************************************************************************************/

PODS.getCookie = function(cookieField) {
	console.log ("Pods > Getting: Cookie");
	
	var name = cookieField + "=",
	cookies = document.cookie.split(';'),
	currentCookie;
	for (var ii = 0; ii < cookies.length; ++ii) {
		var currentCookie = cookies[ii].trim();
		if (currentCookie.indexOf(name) == 0) {
			return currentCookie.substring(name.length, currentCookie.length);
		}
	}
	return null;
}

/**************************************************************************************
 *
 *  This function retrieves the value of the cookie field that is
 *  given by the cname parameter.
 *
 *
 *  @Author Andy
 *
 *  @function
 *  @param cookieField {string} -   The desired cookie field such as "userPod" which
 *                                  be used to construct a user's pod object.
 *
 **************************************************************************************/

PODS.setCookie = function(cookieField, cookieValue, expiresIn) {
	console.log("Pods > Setting Cookie");
	
    var d = new Date(),
	    expires;
    d.setTime(d.getTime() + (expiresIn * 24 * 60 * 60 * 1000));
    expires = "expires=" + d.toUTCString();
    document.cookie = cookieField + "=" + cookieValue + "; " + expires;
}

PODS.Pod = function(id) {
	console.log("Pods > Identifying: User Pod");
	
    this.id = id;
    this.appUrl = "https://" + id + ".marketo.com/";
    this.powerfulAutomation = this.appUrl + "#SC14945A1";
    this.actionableInsight = "https://mkto-si.na10.visual.force.com/apex/mkto_si__Dashboard";
    this.marketingROI = this.appUrl + "#AR1559A1!";
    this.replicateSuccess = "https://marketolive.com/"+URL_PATH+"/apps/replicate-success.html";
    this.searchOptimization = "https://seo.marketo.com/";
    this.personalization = "http://sjrtp1.marketo.com/demo/";
    this.emailDeliverability = "https://250ok.com/login";
    this.flexibleReporting = this.appUrl + "#AH0A1ZN17";
    this.marketoMoments = "https://marketolive.com/"+URL_PATH+"/apps/mobile_marketo_moments.html";
    this.salesInsightMobile = "https://marketolive.com/"+URL_PATH+"/apps/mobile_sales_insight.html";
    this.mobileEngagement = "https://marketolive.com/"+URL_PATH+"/apps/mobile-engagement-beacon.html";
    this.adbridge = "https://marketolive.com/"+URL_PATH+"/apps/adbridge.html";

    switch (this.id) {
        case "app-sjp":
            this.diyDesign = this.appUrl + "#PG4217B2";
            this.intelligentNurturing = this.appUrl + "#NP5170B2";
			this.funnelAnalysis = this.appUrl + "#RCM39A1!";
            this.calendar = this.appUrl + "#CAL0-eyJlZGl0IjoxLCJkdCI6IjIwMTUwNDE4IiwiY3QiOjEsInRhZ3MiOnsic3lzLkVudHJ5U3VidHlwZSI6WyJlbWFpbCIsIndlYmluYXIiLCJudXJ0dXJlX3J1biIsImVtYWlsX3Rlc3QiLCJjYW1wYWlnbl9ydW4iLCJub25lIiwiYjMxYmE2YTYtMDk5Ni00ODMyLWJhZjQtNzk5ODQ3ZGY4YmM4IiwiZXZlbnQiLCIwNWVlZmQ0Yy05OGZiLTRhYjctOTFjZS1hYTE2NWNhZDI0YjkiLCIyNDQ2ODg5MC0yNjEwLTRkMjctYjZlYy05ODVlYjQxNzViOTUiLCI0MTU0MmJiNy1jMzQ0LTQ3NGItODU4Zi1mNGM5YWM1MzcwZjciLCJkZWVjMDkwZC1iY2U0LTQ1MjYtYjYwMy1iMmRhOTc5MzMwNmIiLCIxMzhlZmM1OS02MjU0LTRkNDYtYjdmYi0zZWVjNzA2YTU3ZTMiLCI3YmZiOThkNS05M2IzLTQxMjUtODE5Yy0xZDlkYjMxMzEwYjAiLCI2NDRjOWNiNS0yMjU2LTRlNmMtYjI1YS04ODEzNTE3NGM2MTIiLCI1ZTU4NGQ1Yi04NGI0LTQ2YTctYWIzNi1mMGJmYTE0ZWQ2YzQiLCJiMmY4YTJkMy0xMjQ1LTRkMjctYmRkZi04NjczMTExNTEwOGEiLCJlbWFpbF9jYW1wYWlnbl9ydW4iXSwic3lzLldvcmtzcGFjZUlkIjpbIjEiXX19";
            break;
        case "app-ab07":
            this.diyDesign = this.appUrl + "#PG4217B2";
            this.intelligentNurturing = this.appUrl + "#NP4216B2";
            this.funnelAnalysis = this.appUrl + "#RCM5A1!";
            this.calendar = this.appUrl + "#CAL0-eyJlZGl0IjoxLCJkdCI6IjIwMTUwNDE2IiwiY3QiOjEsInRhZ3MiOnsic3lzLkVudHJ5U3VidHlwZSI6WyJlbWFpbCIsImVtYWlsX2NhbXBhaWduX3J1biIsImV2ZW50Iiwid2ViaW5hciIsIm51cnR1cmVfcnVuIiwiZW1haWxfdGVzdCIsImNhbXBhaWduX3J1biIsIm5vbmUiLCI1ZjE3YjY4MS04NmY2LTQ1NzAtYWZjYi1iMmE2Y2FiMWFjOWUiLCJlYzVjNDFlNS0zMTQ3LTRjMWQtOGZlZi0yNTZkMjI5ZWE4NTIiLCI5Y2UwZTViMi1hZGZmLTRjMmYtOTJiOC02MTI3YmQ3MWYzYzMiLCI5NjViZjMzYS1lOWNlLTRiNzMtODA2Zi1kMzU2ZjUwMjNmN2UiLCI0OGI1ZDhmNy05MTFkLTRlZDktYTNmZi1iNTFiNGNiOTlhZDYiLCIxNWM5ZDVlMi02MDc1LTQ1ZDMtYmYxMi0yNzZhOTk4N2ZlZDYiLCIwNDc1NTQ3YS1lOWEyLTRlOGEtYjU2YS0wMTdhMTVlZjZkZmQiLCI1NThlMGYwYi0yYTQ5LTRiNjEtODZkOS03MGUyMWViNDg5NDkiLCIwNWFhZGQ3NC1mMmE2LTQyNzEtYjY4MC1kYTVjMjRkNzE1ZjkiXSwic3lzLldvcmtzcGFjZUlkIjpbIjEiXX19";
            break;
        case "app-ab08":
            this.diyDesign = this.appUrl + "#PG5581B2";
            this.intelligentNurturing = this.appUrl + "#NP5170B2";
            this.funnelAnalysis = this.appUrl + "#RCM5A1!";
            this.calendar = this.appUrl + "#CAL0-eyJlZGl0IjoxLCJkdCI6IjIwMTUwNDE3IiwiY3QiOjEsInRhZ3MiOnsic3lzLkVudHJ5U3VisdHlwZSI6WyJlbWFpbCIsImVtYWlsX2NhbXBhaWduX3J1biIsIm5vbmUiLCJjYW1wYWlnbl9ydW4iLCJlbWFpbF90ZXN0IiwiYjJjNzE3NDUtNGU0Yi00NmY1LWFkZGYtYzBkNjQ0ZTM1OTI5IiwiY2UyNzBlOTItNDQ5YS00Mjk5LWFhMDktMTk3NzM3MmRkN2ViIiwiZTQ4OThlZTQtZWI0MS00OWUxLWJjNzMtMWZhMzYzMDE1MzlkIiwiNTI3NmU2MDctMDIyMC00ODIwLWJmNWQtOGQ1ZjQ0YmIyODUyIiwiNGRjMDhjMTctN2NjZS00ZWM0LWJiMzQtNDJkNTI3NmMxZjE0IiwiZTM4M2FkNTYtMWE3Yy00ZjcyLTllYmItOGVhMWVmNGM1ZjNmIiwiMGFlNDFhNzYtNjZmNi00Y2FiLTg5ZDEtYTAxZTI4MzQ4NThhIiwiNGY2YTI5MWEtODFhMi00YTJlLWJhYmEtMjRhOTU0MjIwOWEwIiwiNDNmNjM1OWMtNzA3My00MDYzLThlNzgtNmVhN2RkNTM1ZWY1IiwiZXZlbnQiLCJ3ZWJpbmFyIiwibnVydHVyZV9ydW4iXSwic3lzLldvcmtzcGFjZUlkIjpbIjEiXX19";
            break;
    }

    this.valueSet = [
        {
            position: 'modeler',
            url: this.funnelAnalysis
            },
        {
            position: 'success-path-analyzer',
            url: this.appUrl + '#AR1682A1!'
            },
        {
            position: 'opportunity-influence-analyzer',
            url: this.appUrl + '#AR1559A1!'
            },
        {
            position: 'program-analyzer',
            url: this.appUrl + '#AR1544A1!'
            }
        ];
};