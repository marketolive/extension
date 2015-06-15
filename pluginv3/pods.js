// TODO: add error check for invalid pod

var PODS = PODS || {};

PODS.Pod = function (id) {
    this.id = id;
    this.appUrl = "https://" + id + ".marketo.com/";
    this.diyDesign = this.appUrl + "#PG4217A1";
    this.powerfulAutomation = this.appUrl + "#SC14945A1";
    this.actionableInsight = "https://mkto-si.na10.visual.force.com/apex/mkto_si__Dashboard";
    this.marketingROI = this.appUrl + "#AR1559A1";
    this.replicateSuccess = this.appUrl + "#MF6429A1";
    this.searchOptimization = "https://seo.marketo.com/";
    this.personalization = "http://marketolive.com/m/b2b/rtp/";
    this.emailDeliverability = "https://250ok.com/login";
    this.flexibleReporting = this.appUrl + "#AH0A1ZN17";
    this.marketoMoments = "https://marketolive.com/m2/apps/mobile_marketo_moments.html";
    this.salesInsightMobile = "https://marketolive.com/m2/apps/mobile_sales_insight.html";
    this.valueSet = [
        {
            position: 'modeler',
            url: ''
            },
        {
            position: 'success-path-analyzer',
            url: '#AR1682A1!'
            },
        {
            position: 'opportunity-influence-analyzer',
            url: '#AR1559A1!'
            },
        {
            position: 'program-analyzer',
            url: '#AR1544A1!'
            }
        ];

    switch (this.id) {
    case "app-sjp":
        this.intelligentNurturing = this.appUrl + "#NP5170B2";
        this.funnelAnalysis = this.appUrl + "#RCM39A1";
        this.valueSet[2].url = '#?preview=true&approved=true/#RCM39A1!';
        this.calendar = this.appUrl + "#CAL0-eyJlZGl0IjoxLCJkdCI6IjIwMTUwNDE4IiwiY3QiOjEsInRhZ3MiOnsic3lzLkVudHJ5U3VidHlwZSI6WyJlbWFpbCIsIndlYmluYXIiLCJudXJ0dXJlX3J1biIsImVtYWlsX3Rlc3QiLCJjYW1wYWlnbl9ydW4iLCJub25lIiwiYjMxYmE2YTYtMDk5Ni00ODMyLWJhZjQtNzk5ODQ3ZGY4YmM4IiwiZXZlbnQiLCIwNWVlZmQ0Yy05OGZiLTRhYjctOTFjZS1hYTE2NWNhZDI0YjkiLCIyNDQ2ODg5MC0yNjEwLTRkMjctYjZlYy05ODVlYjQxNzViOTUiLCI0MTU0MmJiNy1jMzQ0LTQ3NGItODU4Zi1mNGM5YWM1MzcwZjciLCJkZWVjMDkwZC1iY2U0LTQ1MjYtYjYwMy1iMmRhOTc5MzMwNmIiLCIxMzhlZmM1OS02MjU0LTRkNDYtYjdmYi0zZWVjNzA2YTU3ZTMiLCI3YmZiOThkNS05M2IzLTQxMjUtODE5Yy0xZDlkYjMxMzEwYjAiLCI2NDRjOWNiNS0yMjU2LTRlNmMtYjI1YS04ODEzNTE3NGM2MTIiLCI1ZTU4NGQ1Yi04NGI0LTQ2YTctYWIzNi1mMGJmYTE0ZWQ2YzQiLCJiMmY4YTJkMy0xMjQ1LTRkMjctYmRkZi04NjczMTExNTEwOGEiLCJlbWFpbF9jYW1wYWlnbl9ydW4iXSwic3lzLldvcmtzcGFjZUlkIjpbIjEiXX19";
        break;
    case "app-ab07":
        this.intelligentNurturing = this.appUrl + "#NP4216B2";
        this.funnelAnalysis = this.appUrl + "#RCM5A1!";
        this.valueSet[2].url = '#RCM5A1!';
        this.calendar = this.appUrl + "#CAL0-eyJlZGl0IjoxLCJkdCI6IjIwMTUwNDE2IiwiY3QiOjEsInRhZ3MiOnsic3lzLkVudHJ5U3VidHlwZSI6WyJlbWFpbCIsImVtYWlsX2NhbXBhaWduX3J1biIsImV2ZW50Iiwid2ViaW5hciIsIm51cnR1cmVfcnVuIiwiZW1haWxfdGVzdCIsImNhbXBhaWduX3J1biIsIm5vbmUiLCI1ZjE3YjY4MS04NmY2LTQ1NzAtYWZjYi1iMmE2Y2FiMWFjOWUiLCJlYzVjNDFlNS0zMTQ3LTRjMWQtOGZlZi0yNTZkMjI5ZWE4NTIiLCI5Y2UwZTViMi1hZGZmLTRjMmYtOTJiOC02MTI3YmQ3MWYzYzMiLCI5NjViZjMzYS1lOWNlLTRiNzMtODA2Zi1kMzU2ZjUwMjNmN2UiLCI0OGI1ZDhmNy05MTFkLTRlZDktYTNmZi1iNTFiNGNiOTlhZDYiLCIxNWM5ZDVlMi02MDc1LTQ1ZDMtYmYxMi0yNzZhOTk4N2ZlZDYiLCIwNDc1NTQ3YS1lOWEyLTRlOGEtYjU2YS0wMTdhMTVlZjZkZmQiLCI1NThlMGYwYi0yYTQ5LTRiNjEtODZkOS03MGUyMWViNDg5NDkiLCIwNWFhZGQ3NC1mMmE2LTQyNzEtYjY4MC1kYTVjMjRkNzE1ZjkiXSwic3lzLldvcmtzcGFjZUlkIjpbIjEiXX19";
        break;
    case "app-ab08":
        this.intelligentNurturing = this.appUrl + "#NP5170B2";
        this.funnelAnalysis = this.appUrl + "#RCM5A1!";
        this.valueSet[2].url = '?preview=true&approved=true/#RCM5A1!';
        this.calendar = this.appUrl + "#CAL0-eyJlZGl0IjoxLCJkdCI6IjIwMTUwNDE3IiwiY3QiOjEsInRhZ3MiOnsic3lzLkVudHJ5U3VisdHlwZSI6WyJlbWFpbCIsImVtYWlsX2NhbXBhaWduX3J1biIsIm5vbmUiLCJjYW1wYWlnbl9ydW4iLCJlbWFpbF90ZXN0IiwiYjJjNzE3NDUtNGU0Yi00NmY1LWFkZGYtYzBkNjQ0ZTM1OTI5IiwiY2UyNzBlOTItNDQ5YS00Mjk5LWFhMDktMTk3NzM3MmRkN2ViIiwiZTQ4OThlZTQtZWI0MS00OWUxLWJjNzMtMWZhMzYzMDE1MzlkIiwiNTI3NmU2MDctMDIyMC00ODIwLWJmNWQtOGQ1ZjQ0YmIyODUyIiwiNGRjMDhjMTctN2NjZS00ZWM0LWJiMzQtNDJkNTI3NmMxZjE0IiwiZTM4M2FkNTYtMWE3Yy00ZjcyLTllYmItOGVhMWVmNGM1ZjNmIiwiMGFlNDFhNzYtNjZmNi00Y2FiLTg5ZDEtYTAxZTI4MzQ4NThhIiwiNGY2YTI5MWEtODFhMi00YTJlLWJhYmEtMjRhOTU0MjIwOWEwIiwiNDNmNjM1OWMtNzA3My00MDYzLThlNzgtNmVhN2RkNTM1ZWY1IiwiZXZlbnQiLCJ3ZWJpbmFyIiwibnVydHVyZV9ydW4iXSwic3lzLldvcmtzcGFjZUlkIjpbIjEiXX19";
        break;
    }
};

//    var test = new Pod("app-sjp");
//    window.open(test.intelligentNurturing);
//console.log(test.id);