function load_emailasset_data() {
	/* start of data section */
	var data = {
		0 : {
			sentCount : 265560,
			deliveredCount : 262904,
			bouncedCount : 2655, //1%
			opensCount : 86758, //33%
			clicksCount : 17680, //6.7%
			unsubscribesCount : 850,
			conversionsCount : 0,
			engagementScore : 72,
			variants : [{//Champion
				sentCount : 239004, //90%
				deliveredCount : 236613,
				bouncedCount : 132, //1%
				opensCount : 78082, //33%
				clicksCount : 15853, //6.7%
				unsubscribesCount : 9464, //4%
				conversionsCount : 6182 //39%
			}, {//Challenger 1
				sentCount : 13278, //5%
				deliveredCount : 13145,
				bouncedCount : 132, //1%
				opensCount : 2891, //22%
				clicksCount : 630, //4.8%
				unsubscribesCount : 262, //2%
				conversionsCount : 182 //29%
			}, {//Challenger 2
				sentCount : 13278, //5%
				deliveredCount : 13415,
				bouncedCount : 132, //1%
				opensCount : 5783, //44%
				clicksCount : 1196, //9.1%
				unsubscribesCount : 131, //1%
				conversionsCount : 598 //50%
			}]
		}
	};
/*
	var data = {
		0 : {
			sentCount : 217054,
			deliveredCount : 215081,
			bouncedCount : 1973,
			opensCount : 38333,
			clicksCount : 5855,
			unsubscribesCount : 1954,
			conversionsCount : 100,
			engagementScore : 65,
			variants : [{
				sentCount : 11541,
				deliveredCount : 6238,
				bouncedCount : 5303,
				opensCount : 517,
				clicksCount : 287,
				unsubscribesCount : 25,
				conversionsCount : 10
			}, {
				sentCount : 10500,
				deliveredCount : 5303,
				bouncedCount : 5500,
				opensCount : 900,
				clicksCount : 873,
				unsubscribesCount : 125,
				conversionsCount : 14
			}, {
				sentCount : 10500,
				deliveredCount : 5303,
				bouncedCount : 5500,
				opensCount : 900,
				clicksCount : 873,
				unsubscribesCount : 125,
				conversionsCount : 2
			}, {
				sentCount : 10500,
				deliveredCount : 5303,
				bouncedCount : 5500,
				opensCount : 900,
				clicksCount : 873,
				unsubscribesCount : 125,
				conversionsCount : 32
			}]
		}
	};
*/
	/* end of data section */

	/* do not modify below */
	if (typeof(Ext4) !== 'undefined') {
		Ext4.getStore('Email').on('load', function(store, records) {
			var i = 0, il = records.length, email, emailStatsData, testGroup, variantStats, variantStatsData;
	
			for (; i < il; i++) {
				email = records[i];
				emailStatsData = data[email.getId()] || data[0];
				testGroup = email.getTestGroup();
	
				if (testGroup && emailStatsData.variants) {
					testGroup.variants().each(function(variant) {
						variantStats = variant.getStats();
						variantStatsData = emailStatsData.variants[variant.get('order')];
	
						if (variantStats) {
							variantStats.beginEdit();
							variantStats.set(variantStatsData);
		
							// calculated data
							variantStats.set({
								sentPercentage : variantStats.get('sentCount') / emailStatsData.sentCount * 100,
								deliveredPercentage : variantStats.get('deliveredCount') / emailStatsData.deliveredCount * 100,
								bouncedPercentage : variantStats.get('bouncedCount') / emailStatsData.bouncedCount * 100,
								opensPercentage : variantStats.get('opensCount') / emailStatsData.opensCount * 100,
								clicksPercentage : variantStats.get('clicksCount') / emailStatsData.clicksCount * 100,
								unsubscribesPercentage : variantStats.get('unsubscribesCount') / emailStatsData.unsubscribesCount * 100,
								conversionsPercentage : variantStats.get('conversionsCount') / emailStatsData.conversionsCount * 100,
								deliveredToSent : variantStats.get('deliveredCount') / emailStatsData.sentCount,
								opensToDelivered : variantStats.get('opensCount') / variantStats.get('deliveredCount'),
								clicksToDelivered : variantStats.get('clicksCount') / variantStats.get('deliveredCount'),
								unsubscribesToDelivered : variantStats.get('unsubscribesCount') / variantStats.get('deliveredCount'),
								conversionsToDelivered : variantStats.get('conversionsCount') / variantStats.get('deliveredCount'),
								//clicksToOpens : variantStats.get('clicksCount') / emailStatsData.opensCount
								clicksToOpens : variantStats.get('clicksCount') / variantStats.get('opensCount')
							});
							
							variantStats.endEdit(true);
							variantStats.commit();
						}
					});
				}
			}
		});
	}
}