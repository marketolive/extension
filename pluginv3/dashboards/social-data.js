function loadSocialData() {
	var data = {};

	data[0] = {
		social_visits : 3152,
		social_interactions : 1421,
		social_shares : 965,
		social_clicks : 2124,
		social_registrations : 87,
		total_profiles : 972,
		social_influencers : 625,
		social_reach : 13524,
		social_impressions : 8754,
		social_share_rate : 124,
		social_clickback_rate : 10,
		social_lift : 125
	};
	if (typeof(Mkt3) !== 'undefined') {
		Mkt3.controller.socialApp.Dashboard.prototype.getSocialApp = function() {

			var canvas = this.getCanvas(), dashboard = this.getDashboard(), socialApp = dashboard.socialApp;
			if (!socialApp) {
				var socialAppId = canvas.compId;
				socialApp = this.getSocialAppStore().getById(socialAppId);
				dashboard.socialApp = socialApp;
			}

			var x;

			if (data[canvas.compId]) {
				x = data[canvas.compId];
			} else {
				x = data[0];
			}

			var stats = socialApp && socialApp.stats().first();
			if (stats) {

				stats.set({
					visits : x.social_visits,
					interactions : x.social_interactions,
					interactionsPercent : Math.floor((x.social_interactions / x.social_visits) * 100),
					shares : x.social_shares,
					sharesPercent : Math.floor((x.social_shares / x.social_interactions) * 100),
					resultingClicks : x.social_clicks,
					resultingClicksPercent : Math.floor((x.social_clicks / x.social_shares) * 100),
					registrations : x.social_registrations,
					registrationsPercent : Math.floor((x.social_registrations / x.social_clicks) * 100),

					totalProfiles : x.total_profiles,

					influencers : x.social_influencers,
					influencersPercent : null,
					socialReach : x.social_reach,
					socialReachPercent : null,
					socialImpressions : x.social_impressions,
					socialImpressionsPercent : null,

					shareRate : x.social_share_rate,
					shareRatePercent : null,
					clickbackRate : x.social_clickback_rate,
					clickbackRatePercent : null,
					socialLift : x.social_lift,
					socialLiftPercent : null
				});
			}
			return socialApp;
		};
	}
}
