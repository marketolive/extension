window.onresize = function () {
  
    console.log("Marketo App > Window: Resize");
    currentUrl = window.location.href;

    if (currentUrl.indexOf(mktoMyMarketoFragment) >= 0) {
      setTimeout(APP.overrideHomeTilesResize, 1000);

    }else if (currentUrl.indexOf(mktoAnalyticsHomeFragment) >= 0) {
        setTimeout(APP.overrideAnalyticsTilesResize, 1000);
    }
  }

APP.overrideAnalyticsTilesResize = function () {
  console.log("Marketo App > Overriding: Analytics Tiles");

    if (typeof (MktCanvas) !== "undefined"
      && MktCanvas
      && MktCanvas.getActiveTab()
      && MktCanvas.getActiveTab().config
      && MktCanvas.getActiveTab().config.mkt3XType
      && MktCanvas.getActiveTab().config.accessZoneId
      && typeof (MktPage) !== "undefined"
      && MktPage
      && MktPage.savedState
      && MktPage.savedState.custPrefix) {

      if (MktPage.savedState.custPrefix.search(mktoAccountStringsMatch) != -1
        && MktCanvas.getActiveTab().config.mkt3XType == "analyticsHome"
        && MktCanvas.getActiveTab().config.accessZoneId == mktoDefaultWorkspaceId
        && MktCanvas.getActiveTab().el
        && MktCanvas.getActiveTab().el.dom
        && MktCanvas.getActiveTab().el.dom.childNodes
        && MktCanvas.getActiveTab().el.dom.childNodes[0]
        && MktCanvas.getActiveTab().el.dom.childNodes[0].childNodes
        && MktCanvas.getActiveTab().el.dom.childNodes[0].childNodes[1]
        && MktCanvas.getActiveTab().el.dom.childNodes[0].childNodes[1].childNodes
        && MktCanvas.getActiveTab().el.dom.childNodes[0].childNodes[1].childNodes[0]
        && MktCanvas.getActiveTab().el.dom.childNodes[0].childNodes[1].childNodes[0].childNodes
        && MktCanvas.getActiveTab().el.dom.childNodes[0].childNodes[1].childNodes[0].childNodes[0]
        && MktCanvas.getActiveTab().el.dom.childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes
        && MktCanvas.getActiveTab().el.dom.childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0]
        && MktCanvas.getActiveTab().el.dom.childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes
        && MktCanvas.getActiveTab().el.dom.childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0]
        && MktCanvas.getActiveTab().el.dom.childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes) {

        var container = MktCanvas.getActiveTab().el.dom.childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0],
          tiles = container.childNodes,
          performanceInsightsTileExists = false;
        var toBeRemoved = [],piRepeat=false,epRepeat=false,ppRepeat=false,wpRepeat=false,oiRepeat=false,paRepeat=false,spRepeat=false,eiRepeat=false,
                        esRepeat=false,proRepeat=false,elRepeat=false,prRepeat=false,lpRepeat=false,psRepeat=false,cwRepeat=false,sieRepeat=false;
console.log("LENGTH "+tiles.length);
        for (var ii = 0; ii < tiles.length; ii++) {
          if (tiles[ii]
            && tiles[ii].outerHTML
            && tiles[ii].textContent) {
            var tileHTML = tiles[ii].outerHTML;
console.log(ii);
console.log("piRepeat "+piRepeat+',epRepeat'+epRepeat+',ppRepeat'+ppRepeat+',wpRepeat'+wpRepeat+',oiRepeat'+oiRepeat+',paRepeat'+paRepeat+',spRepeat'+spRepeat+',eiRepeat'+eiRepeat+',esRepeat'+
                        esRepeat+',proRepeat'+proRepeat+',elRepeat'+elRepeat+',prRepeat'+prRepeat+',lpRepeat'+lpRepeat+',psRepeat'+psRepeat+',cwRepeat'+cwRepeat+',sieRepeat'+sieRepeat);
            switch (tiles[ii].textContent) {
              case "Performance Insights":
                var hrefMatch = new RegExp(' href=\"[^\"]*\" ', 'g');
                if(piRepeat){
                  tiles[ii].parentnode.remove();
                  ii--;
                }
                else{piRepeat=true;
                  tiles[ii].outerHTML = tileHTML.replace(hrefMatch, ' href=\"' + mktoPerformanceInsightsLink + '\" ');
                }
                break;

              case "Email Performance":
                if(epRepeat){
                  tiles[ii].parentnode.remove();
                  ii--;
                }
                else{epRepeat=true;
                  tiles[ii].outerHTML = '<a href="/#' + mktoEmailPerformanceReport + '">' + tileHTML + '</a>';
                }
                break;

              case "People Performance":
                if(ppRepeat){
                  tiles[ii].parentnode.remove();
                  ii--;
                }
                else{ppRepeat=true;
                  tiles[ii].outerHTML = '<a href="/#' + mktoPeoplePerformanceReport + '">' + tileHTML + '</a>';
                }
                break;

              case "Web Page Activity":
                if(wpRepeat){
                  tiles[ii].parentnode.remove();
                  ii--;
                }
                else{wpRepeat=true;
                  tiles[ii].outerHTML = '<a href="/#' + mktoWebPageActivityReport + '">' + tileHTML + '</a>';
                }
                break;

              case "Opportunity Influence Analyzer":
                if(oiRepeat){
                  tiles[ii].parentnode.remove();
                  ii--;
                }
                else{oiRepeat=true;
                  tiles[ii].outerHTML = '<a href="/#' + mktoOpportunityInfluenceAnalyzer + '">' + tileHTML + '</a>';
                }
                break;

              case "Program Analyzer":
                if(paRepeat){
                  tiles[ii].parentnode.remove();
                  ii--;
                }
                else{paRepeat=true;
                 tiles[ii].outerHTML = '<a href="/#' + mktoProgramAnalyzer + '">' + tileHTML + '</a>';
                }
                break;

              case "Success Path Analyzer":
                if(spRepeat){
                  tiles[ii].parentnode.remove();
                  ii--;
                }
                else{spRepeat=true;
                  tiles[ii].outerHTML = '<a href="/#' + mktoSuccessPathAnalyzer + '">' + tileHTML + '</a>';
                }
                break;

              case "Email Insights":
                if (!restoreEmailInsights) {
                  var hrefMatch = new RegExp(' href=\"[^\"]*\" ', 'g');
                  if(eiRepeat){
                    tiles[ii].parentnode.remove();
                  ii--;
                  }
                  else{eiRepeat=true;
                    tiles[ii].outerHTML = tileHTML.replace(hrefMatch, ' href=\"' + mktoEmailInsightsLink + '\" ');
                  }
                }
                break;

              case "Engagement Stream Performance":
                if(esRepeat){
                  tiles[ii].parentnode.remove();
                  ii--;
                }
                else{esRepeat=true;
                  tiles[ii].outerHTML = '<a href="/#' + mktoEngagmentStreamPerformaceReport + '">' + tileHTML + '</a>';
                }
                break;

              case "Program Performance":
                if(proRepeat){
                  tiles[ii].parentnode.remove();
                  ii--;
                }
                else{proRepeat=true;
                  tiles[ii].outerHTML = '<a href="/#' + mktoProgramPerformanceReport + '">' + tileHTML + '</a>';
                }
                break;

              case "Email Link Performance":
                if(elRepeat){
                  tiles[ii].parentnode.remove();
                  ii--;
                }
                else{elRepeat=true;
                  tiles[ii].outerHTML = '<a href="/#' + mktoEmailLinkPerformanceReport + '">' + tileHTML + '</a>';
                }
                break;

              case "People By Revenue Stage":
                if(prRepeat){
                  tiles[ii].parentnode.remove();
                  ii--;
                }
                else{prRepeat=true;
                  tiles[ii].outerHTML = '<a href="/#' + mktoPeopleByRevenueStageReport + '">' + tileHTML + '</a>';
                }
                break;

              case "Landing Page Performance":
                if(lpRepeat){
                  tiles[ii].parentnode.remove();
                  ii--;
                }
                else{lpRepeat=true;
                  tiles[ii].outerHTML = '<a href="/#' + mktoLandingPagePerformanceReport + '">' + tileHTML + '</a>';
                }
                break;

              case "People By Status":
                if(psRepeat){
                  tiles[ii].parentnode.remove();
                  ii--;
                }
                else{psRepeat=true;
                 tiles[ii].outerHTML = '<a href="/#' + mktoPeopleByStatusReport + '">' + tileHTML + '</a>';
                }
                break;

              case "Company Web Activity":
                if(cwRepeat){
                  tiles[ii].parentnode.remove();
                  ii--;
                }
                else{cwRepeat=true;
                  tiles[ii].outerHTML = '<a href="/#' + mktoCompanyWebActivityReport + '">' + tileHTML + '</a>';
                }
                break;

              case "Sales Insight Email Performance":
                if(sieRepeat){
                  tiles[ii].parentnode.remove();
                  ii--;
                }
                else{sieRepeat=true;
                  tiles[ii].outerHTML = '<a href="/#' + mktoSalesInsightEmailPerformanceReport + '">' + tileHTML + '</a>';
                }
                break;
            }
          }
        }
      }
    }
};