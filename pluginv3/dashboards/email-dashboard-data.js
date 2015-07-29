function loadEmailDashboardData() {
	data = {
		0 : {
			sentCount : 217054,
			deliveredCount : 214883,
			bouncedCount : 2170,
			opensCount : 38333, //17.8%
			clicksCount : 5855,
			unsubscribesCount : 1954, //<1%
			conversionsCount : 6659,
			engagementScore : 91,
			intervals : [{//40%
				opensCount : 15333,
				clicksCount : 1218
			}, {//30%
				opensCount : 11499,
				clicksCount : 913
			}, {//29%
				opensCount : 11116,
				clicksCount : 883
			}, {//24%
				opensCount : 9199,
				clicksCount : 731
			}, {//18%
				opensCount : 6900,
				clicksCount : 548
			}, {//14%
				opensCount : 5366,
				clicksCount : 426
			}, {//11%
				opensCount : 4216,
				clicksCount : 335
			}, {//8%
				opensCount : 3066,
				clicksCount : 243
			}, {//5%
				opensCount : 1916,
				clicksCount : 152
			}, {//3%
				opensCount : 1150,
				clicksCount : 91
			}, {//1%
				opensCount : 383,
				clicksCount : 30
			}, {//.5%
				opensCount : 169,
				clicksCount : 15
			}],
			variants : [{//Variant A
				sentCount : 11286,
				deliveredCount : 10744,
				bouncedCount : 542, //1%
				opensCount : 1181, //11%
				clicksCount : 366, //31%
				unsubscribesCount : 127,
				conversionsCount : 179 //49%
			}, {//Variant B
				sentCount : 11286,
				deliveredCount : 10744,
				bouncedCount : 542, //1%
				opensCount : 2471, //23%%
				clicksCount : 1087, //44%
				unsubscribesCount : 47,
				conversionsCount : 418 //38%
			}, {//Variant C
				sentCount : 11286,
				deliveredCount : 10744,
				bouncedCount : 542, //1%
				opensCount : 1074, //10%
				clicksCount : 311, //29%%
				unsubscribesCount : 137,
				conversionsCount : 152 //49%
			}, {//Variant D
				sentCount : 11286,
				deliveredCount : 10744,
				bouncedCount : 542, //1%
				opensCount : 1933, //18%
				clicksCount : 734, //38%
				unsubscribesCount : 19,
				conversionsCount : 624 //85%
			}]
		}
	};

	/* end of data section */

	/* do not modify below */
	if (typeof (Ext4) !== 'undefined') {
		Ext4.getStore('EmailBlast').on('load', function(store, records) {
			var i = 0, il = records.length, emailBlast, emailBlastStats, emailBlastStatsData, intervalStatsData, testGroup, variantStats, variantStatsData;

			for (; i < il; i++) {
				emailBlast = records[i];
				emailBlastStats = emailBlast.getStats();
				emailBlastStatsData = data[emailBlast.getId()] || data[0];
				testGroup = emailBlast.getTestGroup();

				if (emailBlastStats) {
					emailBlastStats.beginEdit();
					emailBlastStats.set(emailBlastStatsData);

					// calculated data
					emailBlastStats.set({
						deliveredToSent : emailBlastStats.get('deliveredCount') / emailBlastStats.get('sentCount'),
						opensToDelivered : emailBlastStats.get('opensCount') / emailBlastStats.get('deliveredCount'),
						clicksToDelivered : emailBlastStats.get('clicksCount') / emailBlastStats.get('deliveredCount'),
						unsubscribesToDelivered : emailBlastStats.get('unsubscribesCount') / emailBlastStats.get('deliveredCount'),
						conversionsToDelivered : emailBlastStats.get('conversionsCount') / emailBlastStats.get('deliveredCount'),
						clicksToOpens : emailBlastStats.get('clicksCount') / emailBlastStats.get('opensCount')
					});

					emailBlastStats.endEdit(true);
					emailBlastStats.commit();

					// interval stats
					intervalStats = emailBlastStats.intervals();
					emailBlastStats.intervals().each(function(intervalStats, index) {
						intervalStatsData = emailBlastStatsData.intervals[index];

						if (intervalStatsData) {
							intervalStats.beginEdit();
							intervalStats.set(intervalStatsData);
							intervalStats.endEdit(true);
							intervalStats.commit();
						}
					});

					if (testGroup && emailBlastStatsData.variants) {
						testGroup.variants().each(function(variant) {
							variantStats = variant.getStats();
							variantStatsData = emailBlastStatsData.variants[variant.get('order')];

							variantStats.beginEdit();
							variantStats.set(variantStatsData);

							// calculated data
							variantStats.set({
								sentPercentage : variantStats.get('sentCount') / emailBlastStats.get('sentCount') * 100,
								deliveredPercentage : variantStats.get('deliveredCount') / emailBlastStats.get('deliveredCount') * 100,
								bouncedPercentage : variantStats.get('bouncedCount') / emailBlastStats.get('bouncedCount') * 100,
								opensPercentage : variantStats.get('opensCount') / emailBlastStats.get('opensCount') * 100,
								clicksPercentage : variantStats.get('clicksCount') / emailBlastStats.get('clicksCount') * 100,
								unsubscribesPercentage : variantStats.get('unsubscribesCount') / emailBlastStats.get('unsubscribesCount') * 100,
								conversionsPercentage : variantStats.get('conversionsCount') / emailBlastStats.get('conversionsCount') * 100,
								deliveredToSent : variantStats.get('deliveredCount') / variantStats.get('sentCount'),
								opensToDelivered : variantStats.get('opensCount') / variantStats.get('deliveredCount'),
								clicksToDelivered : variantStats.get('clicksCount') / variantStats.get('deliveredCount'),
								unsubscribesToDelivered : variantStats.get('unsubscribesCount') / variantStats.get('deliveredCount'),
								conversionsToDelivered : variantStats.get('conversionsCount') / variantStats.get('deliveredCount'),
								clicksToOpens : variantStats.get('clicksCount') / variantStats.get('opensCount')
							});

							variantStats.endEdit(true);
							variantStats.commit();
						});
					}
				}
			}
		});
	}
}