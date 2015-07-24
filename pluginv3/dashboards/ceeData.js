function load_cee_data() {
	//var exhaustionDate = Ext4.Date.format(new Date(new Date().getTime() - 43200000), MktLang.getPatternIso8601Long());
	var exhaustionDate = '2013-10-21 09:14:47';
	var data = {}
	if (typeof(MktPage) !== 'undefined') {
		switch(MktPage.savedState.subscriptionType) {
		case 'Dialog Edition':
			data['0'] = {};
			data['0'].trendData = {};
			data['0'].trendData.data_columns = ["date", "content_1_1_es", "content_1_1_sent", "content_1_1_r", "content_1_2_es", "content_1_2_sent", "content_1_2_r", "content_1_3_es", "content_1_3_sent", "content_1_3_r", "content_1_4_es", "content_1_4_sent", "content_1_4_r", "content_1_5_es", "content_1_5_sent", "content_1_5_r", "content_1_6_es", "content_1_6_sent", "content_1_6_r", "content_1_7_es", "content_1_7_sent", "content_1_7_r", "content_1_8_es", "content_1_8_sent", "content_1_8_r", "content_1_9_es", "content_1_9_sent", "content_1_9_r", "content_1_10_es", "content_1_10_sent", "content_1_10_r", "content_1_11_es", "content_1_11_sent", "content_1_11_r", "content_1_12_es", "content_1_12_sent", "content_1_12_r", "track_1_es", "track_1_sent", "track_1_r", "program_es", "program_sent", "program_r"];
			data['0'].trendData.data = [["2013-08-23", 83, 7443, null, 69, 6713, null, 80, 6452, null, 68, 6325, null, 69, 6226, null, 68, 6160, null, 32, 5899, null, 32, 5810, null, 72, 5579, null, 50, 5230, null, 40, 4968, null, 19, 4924, null, 74, 26933, null, 74, 26933, null], ["2013-08-24", 82, null, null, 68, null, null, 79, null, null, 68, null, null, 71, null, null, 67, null, null, 31, null, null, 33, null, null, 72, null, null, 49, null, null, 39, null, null, 18, null, null, 74, null, null, 74, null, null], ["2013-08-25", 81, null, null, 67, null, null, 78, null, null, 69, null, null, 74, null, null, 69, null, null, 29, null, null, 34, null, null, 73, null, null, 49, null, null, 38, null, null, 19, null, null, 73, null, null, 73, null, null], ["2013-08-26", 79, null, null, 69, null, null, 77, null, null, 70, null, null, 76, null, null, 70, null, null, 28, null, null, 35, null, null, 75, null, null, 51, null, null, 40, null, null, 20, null, null, 72, null, null, 72, null, null], ["2013-08-27", 77, null, null, 68, null, null, 76, null, null, 71, null, null, 77, null, null, 68, null, null, 27, null, null, 34, null, null, 76, null, null, 52, null, null, 41, null, null, 22, null, null, 75, null, null, 75, null, null], ["2013-08-28", 76, null, null, 67, null, null, 74, null, null, 69, null, null, 78, null, null, 67, null, null, 26, null, null, 33, null, null, 77, null, null, 51, null, null, 43, null, null, 23, null, null, 76, null, null, 76, null, null], ["2013-08-29", 75, null, null, 66, null, null, 75, null, null, 68, null, null, 79, null, null, 66, null, null, 25, null, null, 32, null, null, 76, null, null, 50, null, null, 41, null, null, 21, null, null, 77, null, null, 77, null, null], ["2013-08-30", 73, 7443, null, 65, 6713, null, 77, 6452, null, 70, 6325, null, 81, 6226, null, 65, 6160, null, 24, 5899, null, 36, 5810, null, 78, 5579, null, 49, 5230, null, 42, 4968, null, 23, 4924, null, 82, 26933, null, 82, 26933, null], ["2013-08-31", 70, null, null, 67, null, null, 76, null, null, 72, null, null, 80, null, null, 64, null, null, 22, null, null, 35, null, null, 77, null, null, 48, null, null, 40, null, null, 24, null, null, 81, null, null, 81, null, null], ["2013-09-01", 69, null, null, 68, null, null, 75, null, null, 70, null, null, 82, null, null, 65, null, null, 20, null, null, 34, null, null, 76, null, null, 50, null, null, 39, null, null, 25, null, null, 80, null, null, 80, null, null], ["2013-09-02", 63, null, null, 70, null, null, 73, null, null, 69, null, null, 85, null, null, 67, null, null, 19, null, null, 36, null, null, 79, null, null, 51, null, null, 40, null, null, 26, null, null, 79, null, null, 79, null, null], ["2013-09-03", 62, null, null, 69, null, null, 74, null, null, 68, null, null, 86, null, null, 68, null, null, 18, null, null, 37, null, null, 78, null, null, 53, null, null, 42, null, null, 24, null, null, 82, null, null, 82, null, null], ["2013-09-04", 61, null, null, 67, null, null, 75, null, null, 67, null, null, 84, null, null, 69, null, null, 17, null, null, 35, null, null, 75, null, null, 52, null, null, 43, null, null, 23, null, null, 83, null, null, 83, null, null], ["2013-09-05", 59, null, null, 66, null, null, 77, null, null, 66, null, null, 83, null, null, 70, null, null, 16, null, null, 34, null, null, 75, null, null, 51, null, null, 41, null, null, 23, null, null, 82, null, null, 82, null, null], ["2013-09-06", 57, 7443, null, 65, 6713, null, 78, 6452, null, 66, 6325, null, 82, 6226, null, 72, 6160, null, 18, 5899, null, 34, 5810, null, 74, 5579, null, 53, 5230, null, 43, 4968, null, 25, 4924, null, 81, 26933, null, 81, 26933, null], ["2013-09-07", 55, null, null, 66, null, null, 78, null, null, 68, null, null, 83, null, null, 71, null, null, 17, null, null, 35, null, null, 76, null, null, 52, null, null, 44, null, null, 24, null, null, 80, null, null, 80, null, null], ["2013-09-08", 52, null, null, 68, null, null, 77, null, null, 69, null, null, 84, null, null, 70, null, null, 15, null, null, 36, null, null, 77, null, null, 51, null, null, 44, null, null, 23, null, null, 82, null, null, 82, null, null], ["2013-09-09", 51, null, null, 69, null, null, 76, null, null, 71, null, null, 86, null, null, 72, null, null, 14, null, null, 37, null, null, 78, null, null, 52, null, null, 45, null, null, 25, null, null, 83, null, null, 83, null, null], ["2013-09-10", 50, null, null, 70, null, null, 75, null, null, 68, null, null, 85, null, null, 73, null, null, 14, null, null, 35, null, null, 76, null, null, 54, null, null, 46, null, null, 26, null, null, 84, null, null, 84, null, null], ["2013-09-11", 49, null, null, 71, null, null, 73, null, null, 66, null, null, 83, null, null, 71, null, null, 13, null, null, 35, null, null, 75, null, null, 53, null, null, 45, null, null, 27, null, null, 82, null, null, 82, null, null], ["2013-09-12", 48, null, null, 72, null, null, 74, null, null, 65, null, null, 82, null, null, 70, null, null, 16, null, null, 34, null, null, 74, null, null, 52, null, null, 44, null, null, 25, null, null, 81, null, null, 81, null, null], ["2013-09-13", 46, 7443, null, 73, 6713, null, 76, 6452, null, 61, 6325, null, 81, 6226, null, 68, 6160, null, 17, 5899, null, 38, 5810, null, 72, 5579, null, 51, 5230, null, 45, 4968, null, 24, 4924, null, 80, 26933, null, 80, 26933, null], ["2013-09-14", 43, null, null, 74, null, null, 78, null, null, 62, null, null, 78, null, null, 67, null, null, 16, null, null, 37, null, null, 71, null, null, 51, null, null, 46, null, null, 23, null, null, 79, null, null, 79, null, null], ["2013-09-15", 41, null, null, 77, null, null, 77, null, null, 64, null, null, 79, null, null, 66, null, null, 18, null, null, 36, null, null, 73, null, null, 52, null, null, 46, null, null, 22, null, null, 81, null, null, 81, null, null], ["2013-09-16", 39, null, null, 78, null, null, 76, null, null, 65, null, null, 80, null, null, 68, null, null, 19, null, null, 38, null, null, 75, null, null, 54, null, null, 47, null, null, 24, null, null, 82, null, null, 82, null, null], ["2013-09-17", 37, null, null, 77, null, null, 75, null, null, 66, null, null, 79, null, null, 69, null, null, 17, null, null, 39, null, null, 76, null, null, 55, null, null, 48, null, null, 25, null, null, 83, null, null, 83, null, null], ["2013-09-18", 36, null, null, 76, null, null, 74, null, null, 65, null, null, 78, null, null, 67, null, null, 16, null, null, 38, null, null, 77, null, null, 54, null, null, 47, null, null, 25, null, null, 84, null, null, 84, null, null], ["2013-09-19", 35, null, null, 75, null, null, 75, null, null, 64, null, null, 77, null, null, 66, null, null, 15, null, null, 37, null, null, 76, null, null, 51, null, null, 46, null, null, 23, null, null, 82, null, null, 82, null, null], ["2013-09-20", 33, 7443, null, 75, 6713, null, 77, 6452, null, 64, 6325, null, 78, 6226, null, 65, 6160, null, 18, 5899, null, 36, 5810, null, 75, 5579, null, 50, 5230, null, 48, 4968, null, 21, 4924, null, 81, 26933, null, 81, 26933, null], ["2013-09-21", 34, null, null, 76, null, null, 76, null, null, 65, null, null, 75, null, null, 64, null, null, 17, null, null, 35, null, null, 74, null, null, 49, null, null, 48, null, null, 22, null, null, 83, null, null, 83, null, null], ["2013-09-22", 32, null, null, 78, null, null, 74, null, null, 66, null, null, 76, null, null, 63, null, null, 16, null, null, 35, null, null, 73, null, null, 48, null, null, 49, null, null, 22, null, null, 84, null, null, 84, null, null], ["2013-09-23", 33, null, null, 79, null, null, 75, null, null, 67, null, null, 75, null, null, 62, null, null, 16, null, null, 36, null, null, 75, null, null, 50, null, null, 50, null, null, 23, null, null, 85, null, null, 85, null, null], ["2013-09-24", 45, null, null, 78, null, null, 75, null, null, 65, null, null, 74, null, null, 61, null, null, 15, null, null, 37, null, null, 76, null, null, 51, null, null, 52, null, null, 24, null, null, 83, null, null, 83, null, null], ["2013-09-25", 48, null, null, 78, null, null, 77, null, null, 64, null, null, 72, null, null, 60, null, null, 15, null, null, 38, null, null, 77, null, null, 52, null, null, 53, null, null, 23, null, null, 82, null, null, 83, null, null], ["2013-09-26", 51, null, null, 77, null, null, 76, null, null, 63, null, null, 69, null, null, 61, null, null, 16, null, null, 39, null, null, 77, null, null, 51, null, null, 51, null, null, 21, null, null, 81, null, null, 81, null, null], ["2013-09-27", 53, 7443, null, 76, 6713, null, 78, 6452, null, 63, 6325, null, 68, 6226, null, 63, 6160, null, 17, 5899, null, 38, 5810, null, 78, 5579, null, 50, 5230, null, 51, 4968, null, 23, 4924, null, 79, 26933, null, 79, 26933, null], ["2013-09-28", 56, null, null, 75, null, null, 79, null, null, 64, null, null, 70, null, null, 62, null, null, 16, null, null, 37, null, null, 77, null, null, 49, null, null, 50, null, null, 21, null, null, 78, null, null, 78, null, null], ["2013-09-29", 58, null, null, 74, null, null, 78, null, null, 65, null, null, 71, null, null, 64, null, null, 15, null, null, 36, null, null, 76, null, null, 51, null, null, 49, null, null, 20, null, null, 77, null, null, 77, null, null], ["2013-09-30", 59, null, null, 75, null, null, 76, null, null, 66, null, null, 72, null, null, 65, null, null, 16, null, null, 34, null, null, 75, null, null, 52, null, null, 48, null, null, 20, null, null, 81, null, null, 81, null, null], ["2013-10-01", 60, null, null, 77, null, null, 77, null, null, 64, null, null, 73, null, null, 63, null, null, 31, null, null, 33, null, null, 77, null, null, 54, null, null, 48, null, null, 22, null, null, 82, null, null, 82, null, null], ["2013-10-02", 63, null, null, 75, null, null, 75, null, null, 63, null, null, 70, null, null, 62, null, null, 34, null, null, 35, null, null, 78, null, null, 54, null, null, 47, null, null, 23, null, null, 80, null, null, 80, null, null], ["2013-10-03", 65, null, null, 76, null, null, 76, null, null, 63, null, null, 71, null, null, 62, null, null, 35, null, null, 34, null, null, 77, null, null, 52, null, null, 46, null, null, 24, null, null, 79, null, null, 79, null, null], ["2013-10-04", 67, 7443, null, 79, 6713, null, 78, 6452, null, 65, 6325, null, 72, 6226, null, 61, 6160, null, 36, 5899, null, 35, 5810, null, 76, 5579, null, 53, 5230, null, 46, 4968, null, 25, 4924, null, 81, 26933, null, 81, 26933, null], ["2013-10-05", 69, null, null, 79, null, null, 79, null, null, 64, null, null, 73, null, null, 59, null, null, 38, null, null, 34, null, null, 75, null, null, 51, null, null, 45, null, null, 26, null, null, 80, null, null, 80, null, null], ["2013-10-06", 70, null, null, 78, null, null, 78, null, null, 63, null, null, 74, null, null, 58, null, null, 40, null, null, 33, null, null, 74, null, null, 50, null, null, 48, null, null, 26, null, null, 79, null, null, 79, null, null], ["2013-10-07", 71, null, null, 77, null, null, 77, null, null, 61, null, null, 76, null, null, 60, null, null, 41, null, null, 31, null, null, 73, null, null, 52, null, null, 47, null, null, 25, null, null, 78, null, null, 78, null, null], ["2013-10-08", 74, null, null, 76, null, null, 76, null, null, 60, null, null, 77, null, null, 62, null, null, 42, null, null, 29, null, null, 75, null, null, 53, null, null, 46, null, null, 24, null, null, 77, null, null, 77, null, null], ["2013-10-09", 76, null, null, 75, null, null, 74, null, null, 61, null, null, 74, null, null, 63, null, null, 41, null, null, 30, null, null, 76, null, null, 53, null, null, 45, null, null, 23, null, null, 76, null, null, 76, null, null], ["2013-10-10", 78, null, null, 76, null, null, 75, null, null, 62, null, null, 75, null, null, 61, null, null, 40, null, null, 29, null, null, 74, null, null, 52, null, null, 44, null, null, 22, null, null, 75, null, null, 75, null, null], ["2013-10-11", 82, 7443, null, 78, 6713, null, 77, 6452, null, 59, 6325, null, 77, 6226, null, 63, 6160, null, 42, 5899, null, 32, 5810, null, 72, 5579, null, 51, 5230, null, 44, 4968, null, 23, 4924, null, 79, 26933, null, 79, 26933, null], ["2013-10-12", 84, null, null, 80, null, null, 79, null, null, 60, null, null, 78, null, null, 64, null, null, 42, null, null, 33, null, null, 71, null, null, 50, null, null, 43, null, null, 22, null, null, 80, null, null, 80, null, null], ["2013-10-13", 86, null, null, 79, null, null, 78, null, null, 59, null, null, 79, null, null, 65, null, null, 43, null, null, 35, null, null, 69, null, null, 51, null, null, 42, null, null, 21, null, null, 81, null, null, 81, null, null], ["2013-10-14", 87, null, null, 78, null, null, 77, null, null, 60, null, null, 81, null, null, 64, null, null, 44, null, null, 36, null, null, 70, null, null, 52, null, null, 40, null, null, 20, null, null, 82, null, null, 82, null, null], ["2013-10-15", 88, null, null, 78, null, null, 76, null, null, 61, null, null, 80, null, null, 62, null, null, 46, null, null, 34, null, null, 72, null, null, 52, null, null, 41, null, null, 21, null, null, 81, null, null, 81, null, null], ["2013-10-16", 87, null, null, 76, null, null, 75, null, null, 58, null, null, 77, null, null, 63, null, null, 45, null, null, 33, null, null, 73, null, null, 51, null, null, 42, null, null, 22, null, null, 80, null, null, 80, null, null], ["2013-10-17", 88, null, null, 77, null, null, 76, null, null, 59, null, null, 78, null, null, 64, null, null, 44, null, null, 33, null, null, 73, null, null, 50, null, null, 39, null, null, 19, null, null, 79, null, null, 79, null, null], ["2013-10-18", 90, 7443, null, 79, 6713, null, 77, 6452, null, 60, 6325, null, 80, 6226, null, 65, 6160, null, 46, 5899, null, 36, 5810, null, 75, 5579, null, 49, 5230, null, 41, 4968, null, 21, 4924, null, 76, 26933, null, 76, 26933, null], ["2013-10-19", 88, null, null, 81, null, null, 78, null, null, 59, null, null, 82, null, null, 66, null, null, 49, null, null, 35, null, null, 76, null, null, 50, null, null, 40, null, null, 19, null, null, 75, null, null, 75, null, null], ["2013-10-20", 88, null, null, 82, null, null, 79, null, null, 62, null, null, 83, null, null, 67, null, null, 50, null, null, 37, null, null, 77, null, null, 51, null, null, 41, null, null, 22, null, null, 76, null, null, 76, null, null], ["2013-10-21", 87, null, null, 83, null, null, 78, null, null, 64, null, null, 84, null, null, 69, null, null, 48, null, null, 39, null, null, 78, null, null, 52, null, null, 39, null, null, 23, null, null, 78, null, null, 78, null, null]];
			data['0'].summaryData = {
				id : 0,
				name : 'Nurturing Program (Basic)',
				s : 645569,
				o : 200,
				c : 150,
				u : 1607,
				e : 78,
				r : 0,
				rs : 0,
				w : 0,
				m : 200,
				ex : 0,
				p : 0,
				ch : 243727,
				hasActivity : 0,
				tracks : [{
					id : 1,
					name : 'Content',
					s : 645569,
					o : 200,
					c : 150,
					u : 1607,
					e : 78,
					r : 0,
					rs : 0,
					w : 0,
					ch : 243727,
					m : 200,
					ex : 0,
					p : 0,
					hasActivity : 0,
					contents : [{
						id : 1,
						assetId : 3026,
						assetType : 'Email',
						name : '7 Rules to Live By for Creating Legendary Webinars',
						mod : '2013-09-19 13:18:05',
						s : 66990,
						e : 87,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 2,
						assetId : 3003,
						assetType : 'Email',
						name : 'Driving Conversions Throughout the Customer Lifecycle',
						mod : '2013-06-01 13:18:05',
						s : 60418,
						e : 83,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 3,
						assetId : 3030,
						assetType : 'Email',
						name : 'Graduating from Email to Engagement',
						mod : '2013-07-12 13:18:05',
						s : 58064,
						e : 78,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 4,
						assetId : 4033,
						assetType : 'Email',
						name : 'How Social Media is Changing Leadership',
						mod : '2013-06-01 13:18:05',
						s : 56929,
						e : 64,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 5,
						assetId : 3026,
						assetType : 'Email',
						name : 'Video Testimonial – Customer Case Study',
						mod : '2013-06-01 13:18:05',
						s : 56030,
						e : 84,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 6,
						assetId : 3003,
						assetType : 'Email',
						name : 'IDC Industry Research Workbook',
						mod : '2013-06-01 13:18:05',
						s : 55443,
						e : 69,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 7,
						assetId : 3030,
						assetType : 'Email',
						name : 'Gartner Evaluation Report',
						mod : '2013-07-12 13:18:05',
						s : 53089,
						e : 48,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 8,
						assetId : 4033,
						assetType : 'Email',
						name : 'Improve Your Lead Quality Whitepaper',
						mod : '2013-06-01 13:18:05',
						s : 52291,
						e : 39,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 9,
						assetId : 3026,
						assetType : 'Email',
						name : 'Best Practices for Launching Marketing Automation',
						mod : '2013-06-01 13:18:05',
						s : 50214,
						e : 78,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 10,
						assetId : 3003,
						assetType : 'Email',
						name : 'Tips ’n’ Tricks to Improve Your ROI',
						mod : '2013-06-01 13:18:05',
						s : 47069,
						e : 52,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 11,
						assetId : 3030,
						assetType : 'Email',
						name : 'Refer-a-Friend Gift Card Promotion',
						mod : '2013-07-12 13:18:05',
						s : 44715,
						e : 41,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 12,
						assetId : 4033,
						assetType : 'Email',
						name : 'Upgrade Cheat Sheet – Free Trial Offer',
						mod : '2013-06-01 13:18:05',
						s : 44317,
						e : 32,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}]
				}]
			};
			data['0'].contentData = [{
				programId : 0,
				trackId : 1,
				contentId : 1,
				assetType : 'Email',
				appCompId : 3026,
				date : '2013-09-19',
				name : '7 Rules to Live By for Creating Legendary Webinars'
			}, {
				programId : 0,
				trackId : 1,
				contentId : 2,
				assetType : 'Email',
				appCompId : 3003,
				date : '2013-06-23',
				name : 'Driving Conversions Throughout the Customer Lifecycle'
			}, {
				programId : 0,
				trackId : 1,
				contentId : 3,
				assetType : 'Email',
				appCompId : 3030,
				date : '2013-06-16',
				name : 'Graduating from Email to Engagement'
			}, {
				programId : 0,
				trackId : 1,
				contentId : 4,
				assetType : 'Email',
				appCompId : 4033,
				date : '2013-06-27',
				name : 'How Social Media is Changing Leadership'
			}, {
				programId : 0,
				trackId : 1,
				contentId : 5,
				assetType : 'Email',
				appCompId : 3026,
				date : '2013-08-27',
				name : 'Video Testimonial – Customer Case Study'
			}, {
				programId : 0,
				trackId : 1,
				contentId : 6,
				assetType : 'Email',
				appCompId : 3003,
				date : '2013-06-23',
				name : 'IDC Industry Research Workbook'
			}, {
				programId : 0,
				trackId : 1,
				contentId : 7,
				assetType : 'Email',
				appCompId : 3030,
				date : '2013-09-26',
				name : 'Gartner Evaluation Report'
			}, {
				programId : 0,
				trackId : 1,
				contentId : 8,
				assetType : 'Email',
				appCompId : 4033,
				date : '2013-06-27',
				name : 'Improve Your Lead Quality Whitepaper'
			}, {
				programId : 0,
				trackId : 1,
				contentId : 9,
				assetType : 'Email',
				appCompId : 3026,
				date : '2013-06-30',
				name : 'Best Practices for Launching Marketing Automation'
			}, {
				programId : 0,
				trackId : 1,
				contentId : 10,
				assetType : 'Email',
				appCompId : 3003,
				date : '2013-06-23',
				name : 'Tips ’n’ Tricks to Improve Your ROI'
			}, {
				programId : 0,
				trackId : 1,
				contentId : 11,
				assetType : 'Email',
				appCompId : 3030,
				date : '2013-06-16',
				name : 'Refer-a-Friend Gift Card Promotion'
			}, {
				programId : 0,
				trackId : 1,
				contentId : 12,
				assetType : 'Email',
				appCompId : 4033,
				date : '2013-06-27',
				name : 'Upgrade Cheat Sheet – Free Trial Offer'
			}];
			data['0'].exhaustionData = {
				id : 0,
				dt : exhaustionDate,
				"-4" : 0,
				"-3" : 0,
				"-2" : 0,
				"-1" : 0,
				"0" : 3899,
				"1" : 2331,
				"2" : 7062,
				"3" : 10304,
				"4" : 10823,
				"5" : 8772,
				"6" : 11126,
				"7" : 11713,
				"8" : 11214,
				tracks : [{
					id : 1,
					dt : exhaustionDate,
					"-4" : 0,
					"-3" : 0,
					"-2" : 0,
					"-1" : 0,
					"0" : 3899,
					"1" : 2331,
					"2" : 7062,
					"3" : 10304,
					"4" : 10823,
					"5" : 8772,
					"6" : 11126,
					"7" : 11713,
					"8" : 11214
				}]
			};
			break;
		case 'SMB - Spark':
			data['0'] = {};
			data['0'].summaryData = {
				id : 0,
				name : 'Nurturing Program (Basic)',
				s : 645569,
				o : 200,
				c : 150,
				u : 1607,
				e : 78,
				r : 0,
				rs : 0,
				w : 0,
				m : 200,
				ex : 0,
				p : 0,
				ch : 243727,
				hasActivity : 0,
				tracks : [{
					id : 1,
					name : 'Content',
					s : 645569,
					o : 200,
					c : 150,
					u : 1607,
					e : 78,
					r : 0,
					rs : 0,
					w : 0,
					ch : 243727,
					m : 200,
					ex : 0,
					p : 0,
					hasActivity : 0,
					contents : [{
						id : 1,
						assetId : 3026,
						assetType : 'Email',
						name : '7 Rules to Live By for Creating Legendary Webinars',
						mod : '2013-09-19 13:18:05',
						s : 66990,
						e : 87,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 2,
						assetId : 3003,
						assetType : 'Email',
						name : 'Driving Conversions Throughout the Customer Lifecycle',
						mod : '2013-06-01 13:18:05',
						s : 60418,
						e : 83,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 3,
						assetId : 3030,
						assetType : 'Email',
						name : 'Graduating from Email to Engagement',
						mod : '2013-07-12 13:18:05',
						s : 58064,
						e : 78,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 4,
						assetId : 4033,
						assetType : 'Email',
						name : 'How Social Media is Changing Leadership',
						mod : '2013-06-01 13:18:05',
						s : 56929,
						e : 64,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 5,
						assetId : 3026,
						assetType : 'Email',
						name : 'Video Testimonial – Customer Case Study',
						mod : '2013-06-01 13:18:05',
						s : 56030,
						e : 84,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 6,
						assetId : 3003,
						assetType : 'Email',
						name : 'IDC Industry Research Workbook',
						mod : '2013-06-01 13:18:05',
						s : 55443,
						e : 69,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 7,
						assetId : 3030,
						assetType : 'Email',
						name : 'Gartner Evaluation Report',
						mod : '2013-07-12 13:18:05',
						s : 53089,
						e : 48,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 8,
						assetId : 4033,
						assetType : 'Email',
						name : 'Improve Your Lead Quality Whitepaper',
						mod : '2013-06-01 13:18:05',
						s : 52291,
						e : 39,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 9,
						assetId : 3026,
						assetType : 'Email',
						name : 'Best Practices for Launching Marketing Automation',
						mod : '2013-06-01 13:18:05',
						s : 50214,
						e : 78,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 10,
						assetId : 3003,
						assetType : 'Email',
						name : 'Tips ’n’ Tricks to Improve Your ROI',
						mod : '2013-06-01 13:18:05',
						s : 47069,
						e : 52,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 11,
						assetId : 3030,
						assetType : 'Email',
						name : 'Refer-a-Friend Gift Card Promotion',
						mod : '2013-07-12 13:18:05',
						s : 44715,
						e : 41,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 12,
						assetId : 4033,
						assetType : 'Email',
						name : 'Upgrade Cheat Sheet – Free Trial Offer',
						mod : '2013-06-01 13:18:05',
						s : 44317,
						e : 32,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}]
				}]
			};
			data['0'].progressionData = {
				id : 0,
				data : [{
					members : 23596,
					successMembers : 0,
					statusName : 'Member',
					step : 10,
					statusSuccess : 0
				}, {
					members : 29899,
					successMembers : 0,
					statusName : 'Visited',
					step : 20,
					statusSuccess : 0
				}, {
					members : 34053,
					successMembers : 0,
					statusName : 'Engaged',
					step : 30,
					statusSuccess : 1
				}],
				tracks : [{
					id : 1,
					data : [{
						members : 23596,
						successMembers : 0,
						statusName : 'Member',
						step : 10,
						statusSuccess : 0
					}, {
						members : 29899,
						successMembers : 0,
						statusName : 'Visited',
						step : 20,
						statusSuccess : 0
					}, {
						members : 34053,
						successMembers : 0,
						statusName : 'Engaged',
						step : 30,
						statusSuccess : 1
					}]
				}]
			};
			data['0'].exhaustionData = {
				id : 0,
				dt : exhaustionDate,
				"-4" : 0,
				"-3" : 0,
				"-2" : 0,
				"-1" : 0,
				"0" : 3899,
				"1" : 2331,
				"2" : 7062,
				"3" : 10304,
				"4" : 10823,
				"5" : 8772,
				"6" : 11126,
				"7" : 11713,
				"8" : 11214,
				tracks : [{
					id : 1,
					dt : exhaustionDate,
					"-4" : 0,
					"-3" : 0,
					"-2" : 0,
					"-1" : 0,
					"0" : 3899,
					"1" : 2331,
					"2" : 7062,
					"3" : 10304,
					"4" : 10823,
					"5" : 8772,
					"6" : 11126,
					"7" : 11713,
					"8" : 11214
				}]
			};
			break;
		case 'SMB - Standard':
			data['0'] = {};
			data['0'].summaryData = {
				id : 0,
				name : 'Nurturing Program (Basic)',
				s : 645569,
				o : 200,
				c : 150,
				u : 10607,
				e : 78,
				r : 0,
				rs : 0,
				w : 0,
				m : 200,
				ex : 0,
				p : 0,
				ch : 243727,
				hasActivity : 0,
				tracks : [{
					id : 1,
					name : 'Content',
					s : 645569,
					o : 200,
					c : 150,
					u : 10607,
					e : 78,
					r : 0,
					rs : 0,
					w : 0,
					ch : 243727,
					m : 200,
					ex : 0,
					p : 0,
					hasActivity : 0,
					contents : [{
						id : 1,
						assetId : 3026,
						assetType : 'Email',
						name : '7 Rules to Live By for Creating Legendary Webinars',
						mod : '2013-09-19 13:18:05',
						s : 66990,
						e : 87,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 2,
						assetId : 3003,
						assetType : 'Email',
						name : 'Driving Conversions Throughout the Customer Lifecycle',
						mod : '2013-06-01 13:18:05',
						s : 60418,
						e : 83,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 3,
						assetId : 3030,
						assetType : 'Email',
						name : 'Graduating from Email to Engagement',
						mod : '2013-07-12 13:18:05',
						s : 58064,
						e : 78,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 4,
						assetId : 4033,
						assetType : 'Email',
						name : 'How Social Media is Changing Leadership',
						mod : '2013-06-01 13:18:05',
						s : 56929,
						e : 64,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 5,
						assetId : 3026,
						assetType : 'Email',
						name : 'Video Testimonial – Customer Case Study',
						mod : '2013-06-01 13:18:05',
						s : 56030,
						e : 84,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 6,
						assetId : 3003,
						assetType : 'Email',
						name : 'IDC Industry Research Workbook',
						mod : '2013-06-01 13:18:05',
						s : 55443,
						e : 69,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 7,
						assetId : 3030,
						assetType : 'Email',
						name : 'Gartner Evaluation Report',
						mod : '2013-07-12 13:18:05',
						s : 53089,
						e : 48,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 8,
						assetId : 4033,
						assetType : 'Email',
						name : 'Improve Your Lead Quality Whitepaper',
						mod : '2013-06-01 13:18:05',
						s : 52291,
						e : 39,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 9,
						assetId : 3026,
						assetType : 'Email',
						name : 'Best Practices for Launching Marketing Automation',
						mod : '2013-06-01 13:18:05',
						s : 50214,
						e : 78,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 10,
						assetId : 3003,
						assetType : 'Email',
						name : 'Tips ’n’ Tricks to Improve Your ROI',
						mod : '2013-06-01 13:18:05',
						s : 47069,
						e : 52,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 11,
						assetId : 3030,
						assetType : 'Email',
						name : 'Refer-a-Friend Gift Card Promotion',
						mod : '2013-07-12 13:18:05',
						s : 44715,
						e : 41,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 12,
						assetId : 4033,
						assetType : 'Email',
						name : 'Upgrade Cheat Sheet – Free Trial Offer',
						mod : '2013-06-01 13:18:05',
						s : 44317,
						e : 32,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}]
				}]
			};
			data['0'].progressionData = {
				id : 0,
				data : [{
					members : 23596,
					successMembers : 0,
					statusName : 'Member',
					step : 10,
					statusSuccess : 0
				}, {
					members : 29899,
					successMembers : 0,
					statusName : 'Visited',
					step : 20,
					statusSuccess : 0
				}, {
					members : 34053,
					successMembers : 0,
					statusName : 'Engaged',
					step : 30,
					statusSuccess : 1
				}],
				tracks : [{
					id : 1,
					data : [{
						members : 23596,
						successMembers : 0,
						statusName : 'Member',
						step : 10,
						statusSuccess : 0
					}, {
						members : 29899,
						successMembers : 0,
						statusName : 'Visited',
						step : 20,
						statusSuccess : 0
					}, {
						members : 34053,
						successMembers : 0,
						statusName : 'Engaged',
						step : 30,
						statusSuccess : 1
					}]
				}]
			};
			data['0'].exhaustionData = {
				id : 0,
				dt : exhaustionDate,
				"-4" : 0,
				"-3" : 0,
				"-2" : 0,
				"-1" : 0,
				"0" : 3899,
				"1" : 2331,
				"2" : 7062,
				"3" : 10304,
				"4" : 10823,
				"5" : 8772,
				"6" : 11126,
				"7" : 11713,
				"8" : 11214,
				tracks : [{
					id : 1,
					dt : exhaustionDate,
					"-4" : 0,
					"-3" : 0,
					"-2" : 0,
					"-1" : 0,
					"0" : 3899,
					"1" : 2331,
					"2" : 7062,
					"3" : 10304,
					"4" : 10823,
					"5" : 8772,
					"6" : 11126,
					"7" : 11713,
					"8" : 11214
				}]
			};
			break;
		case 'SMB - Select':
			data['0'] = {};
			data['0'].trendData = {};
			data['0'].trendData.data_columns = ["date", "content_1_1_es", "content_1_1_sent", "content_1_1_r", "content_1_2_es", "content_1_2_sent", "content_1_2_r", "content_1_3_es", "content_1_3_sent", "content_1_3_r", "content_1_4_es", "content_1_4_sent", "content_1_4_r", "content_1_5_es", "content_1_5_sent", "content_1_5_r", "content_1_6_es", "content_1_6_sent", "content_1_6_r", "content_1_7_es", "content_1_7_sent", "content_1_7_r", "content_1_8_es", "content_1_8_sent", "content_1_8_r", "content_1_9_es", "content_1_9_sent", "content_1_9_r", "content_1_10_es", "content_1_10_sent", "content_1_10_r", "content_1_11_es", "content_1_11_sent", "content_1_11_r", "content_1_12_es", "content_1_12_sent", "content_1_12_r", "track_1_es", "track_1_sent", "track_1_r", "program_es", "program_sent", "program_r"];
			data['0'].trendData.data = [["2013-08-23", 83, 7443, null, 69, 6713, null, 80, 6452, null, 68, 6325, null, 69, 6226, null, 68, 6160, null, 32, 5899, null, 32, 5810, null, 72, 5579, null, 50, 5230, null, 40, 4968, null, 19, 4924, null, 74, 26933, null, 74, 26933, null], ["2013-08-24", 82, null, null, 68, null, null, 79, null, null, 68, null, null, 71, null, null, 67, null, null, 31, null, null, 33, null, null, 72, null, null, 49, null, null, 39, null, null, 18, null, null, 74, null, null, 74, null, null], ["2013-08-25", 81, null, null, 67, null, null, 78, null, null, 69, null, null, 74, null, null, 69, null, null, 29, null, null, 34, null, null, 73, null, null, 49, null, null, 38, null, null, 19, null, null, 73, null, null, 73, null, null], ["2013-08-26", 79, null, null, 69, null, null, 77, null, null, 70, null, null, 76, null, null, 70, null, null, 28, null, null, 35, null, null, 75, null, null, 51, null, null, 40, null, null, 20, null, null, 72, null, null, 72, null, null], ["2013-08-27", 77, null, null, 68, null, null, 76, null, null, 71, null, null, 77, null, null, 68, null, null, 27, null, null, 34, null, null, 76, null, null, 52, null, null, 41, null, null, 22, null, null, 75, null, null, 75, null, null], ["2013-08-28", 76, null, null, 67, null, null, 74, null, null, 69, null, null, 78, null, null, 67, null, null, 26, null, null, 33, null, null, 77, null, null, 51, null, null, 43, null, null, 23, null, null, 76, null, null, 76, null, null], ["2013-08-29", 75, null, null, 66, null, null, 75, null, null, 68, null, null, 79, null, null, 66, null, null, 25, null, null, 32, null, null, 76, null, null, 50, null, null, 41, null, null, 21, null, null, 77, null, null, 77, null, null], ["2013-08-30", 73, 7443, null, 65, 6713, null, 77, 6452, null, 70, 6325, null, 81, 6226, null, 65, 6160, null, 24, 5899, null, 36, 5810, null, 78, 5579, null, 49, 5230, null, 42, 4968, null, 23, 4924, null, 82, 26933, null, 82, 26933, null], ["2013-08-31", 70, null, null, 67, null, null, 76, null, null, 72, null, null, 80, null, null, 64, null, null, 22, null, null, 35, null, null, 77, null, null, 48, null, null, 40, null, null, 24, null, null, 81, null, null, 81, null, null], ["2013-09-01", 69, null, null, 68, null, null, 75, null, null, 70, null, null, 82, null, null, 65, null, null, 20, null, null, 34, null, null, 76, null, null, 50, null, null, 39, null, null, 25, null, null, 80, null, null, 80, null, null], ["2013-09-02", 63, null, null, 70, null, null, 73, null, null, 69, null, null, 85, null, null, 67, null, null, 19, null, null, 36, null, null, 79, null, null, 51, null, null, 40, null, null, 26, null, null, 79, null, null, 79, null, null], ["2013-09-03", 62, null, null, 69, null, null, 74, null, null, 68, null, null, 86, null, null, 68, null, null, 18, null, null, 37, null, null, 78, null, null, 53, null, null, 42, null, null, 24, null, null, 82, null, null, 82, null, null], ["2013-09-04", 61, null, null, 67, null, null, 75, null, null, 67, null, null, 84, null, null, 69, null, null, 17, null, null, 35, null, null, 75, null, null, 52, null, null, 43, null, null, 23, null, null, 83, null, null, 83, null, null], ["2013-09-05", 59, null, null, 66, null, null, 77, null, null, 66, null, null, 83, null, null, 70, null, null, 16, null, null, 34, null, null, 75, null, null, 51, null, null, 41, null, null, 23, null, null, 82, null, null, 82, null, null], ["2013-09-06", 57, 7443, null, 65, 6713, null, 78, 6452, null, 66, 6325, null, 82, 6226, null, 72, 6160, null, 18, 5899, null, 34, 5810, null, 74, 5579, null, 53, 5230, null, 43, 4968, null, 25, 4924, null, 81, 26933, null, 81, 26933, null], ["2013-09-07", 55, null, null, 66, null, null, 78, null, null, 68, null, null, 83, null, null, 71, null, null, 17, null, null, 35, null, null, 76, null, null, 52, null, null, 44, null, null, 24, null, null, 80, null, null, 80, null, null], ["2013-09-08", 52, null, null, 68, null, null, 77, null, null, 69, null, null, 84, null, null, 70, null, null, 15, null, null, 36, null, null, 77, null, null, 51, null, null, 44, null, null, 23, null, null, 82, null, null, 82, null, null], ["2013-09-09", 51, null, null, 69, null, null, 76, null, null, 71, null, null, 86, null, null, 72, null, null, 14, null, null, 37, null, null, 78, null, null, 52, null, null, 45, null, null, 25, null, null, 83, null, null, 83, null, null], ["2013-09-10", 50, null, null, 70, null, null, 75, null, null, 68, null, null, 85, null, null, 73, null, null, 14, null, null, 35, null, null, 76, null, null, 54, null, null, 46, null, null, 26, null, null, 84, null, null, 84, null, null], ["2013-09-11", 49, null, null, 71, null, null, 73, null, null, 66, null, null, 83, null, null, 71, null, null, 13, null, null, 35, null, null, 75, null, null, 53, null, null, 45, null, null, 27, null, null, 82, null, null, 82, null, null], ["2013-09-12", 48, null, null, 72, null, null, 74, null, null, 65, null, null, 82, null, null, 70, null, null, 16, null, null, 34, null, null, 74, null, null, 52, null, null, 44, null, null, 25, null, null, 81, null, null, 81, null, null], ["2013-09-13", 46, 7443, null, 73, 6713, null, 76, 6452, null, 61, 6325, null, 81, 6226, null, 68, 6160, null, 17, 5899, null, 38, 5810, null, 72, 5579, null, 51, 5230, null, 45, 4968, null, 24, 4924, null, 80, 26933, null, 80, 26933, null], ["2013-09-14", 43, null, null, 74, null, null, 78, null, null, 62, null, null, 78, null, null, 67, null, null, 16, null, null, 37, null, null, 71, null, null, 51, null, null, 46, null, null, 23, null, null, 79, null, null, 79, null, null], ["2013-09-15", 41, null, null, 77, null, null, 77, null, null, 64, null, null, 79, null, null, 66, null, null, 18, null, null, 36, null, null, 73, null, null, 52, null, null, 46, null, null, 22, null, null, 81, null, null, 81, null, null], ["2013-09-16", 39, null, null, 78, null, null, 76, null, null, 65, null, null, 80, null, null, 68, null, null, 19, null, null, 38, null, null, 75, null, null, 54, null, null, 47, null, null, 24, null, null, 82, null, null, 82, null, null], ["2013-09-17", 37, null, null, 77, null, null, 75, null, null, 66, null, null, 79, null, null, 69, null, null, 17, null, null, 39, null, null, 76, null, null, 55, null, null, 48, null, null, 25, null, null, 83, null, null, 83, null, null], ["2013-09-18", 36, null, null, 76, null, null, 74, null, null, 65, null, null, 78, null, null, 67, null, null, 16, null, null, 38, null, null, 77, null, null, 54, null, null, 47, null, null, 25, null, null, 84, null, null, 84, null, null], ["2013-09-19", 35, null, null, 75, null, null, 75, null, null, 64, null, null, 77, null, null, 66, null, null, 15, null, null, 37, null, null, 76, null, null, 51, null, null, 46, null, null, 23, null, null, 82, null, null, 82, null, null], ["2013-09-20", 33, 7443, null, 75, 6713, null, 77, 6452, null, 64, 6325, null, 78, 6226, null, 65, 6160, null, 18, 5899, null, 36, 5810, null, 75, 5579, null, 50, 5230, null, 48, 4968, null, 21, 4924, null, 81, 26933, null, 81, 26933, null], ["2013-09-21", 34, null, null, 76, null, null, 76, null, null, 65, null, null, 75, null, null, 64, null, null, 17, null, null, 35, null, null, 74, null, null, 49, null, null, 48, null, null, 22, null, null, 83, null, null, 83, null, null], ["2013-09-22", 32, null, null, 78, null, null, 74, null, null, 66, null, null, 76, null, null, 63, null, null, 16, null, null, 35, null, null, 73, null, null, 48, null, null, 49, null, null, 22, null, null, 84, null, null, 84, null, null], ["2013-09-23", 33, null, null, 79, null, null, 75, null, null, 67, null, null, 75, null, null, 62, null, null, 16, null, null, 36, null, null, 75, null, null, 50, null, null, 50, null, null, 23, null, null, 85, null, null, 85, null, null], ["2013-09-24", 45, null, null, 78, null, null, 75, null, null, 65, null, null, 74, null, null, 61, null, null, 15, null, null, 37, null, null, 76, null, null, 51, null, null, 52, null, null, 24, null, null, 83, null, null, 83, null, null], ["2013-09-25", 48, null, null, 78, null, null, 77, null, null, 64, null, null, 72, null, null, 60, null, null, 15, null, null, 38, null, null, 77, null, null, 52, null, null, 53, null, null, 23, null, null, 82, null, null, 83, null, null], ["2013-09-26", 51, null, null, 77, null, null, 76, null, null, 63, null, null, 69, null, null, 61, null, null, 16, null, null, 39, null, null, 77, null, null, 51, null, null, 51, null, null, 21, null, null, 81, null, null, 81, null, null], ["2013-09-27", 53, 7443, null, 76, 6713, null, 78, 6452, null, 63, 6325, null, 68, 6226, null, 63, 6160, null, 17, 5899, null, 38, 5810, null, 78, 5579, null, 50, 5230, null, 51, 4968, null, 23, 4924, null, 79, 26933, null, 79, 26933, null], ["2013-09-28", 56, null, null, 75, null, null, 79, null, null, 64, null, null, 70, null, null, 62, null, null, 16, null, null, 37, null, null, 77, null, null, 49, null, null, 50, null, null, 21, null, null, 78, null, null, 78, null, null], ["2013-09-29", 58, null, null, 74, null, null, 78, null, null, 65, null, null, 71, null, null, 64, null, null, 15, null, null, 36, null, null, 76, null, null, 51, null, null, 49, null, null, 20, null, null, 77, null, null, 77, null, null], ["2013-09-30", 59, null, null, 75, null, null, 76, null, null, 66, null, null, 72, null, null, 65, null, null, 16, null, null, 34, null, null, 75, null, null, 52, null, null, 48, null, null, 20, null, null, 81, null, null, 81, null, null], ["2013-10-01", 60, null, null, 77, null, null, 77, null, null, 64, null, null, 73, null, null, 63, null, null, 31, null, null, 33, null, null, 77, null, null, 54, null, null, 48, null, null, 22, null, null, 82, null, null, 82, null, null], ["2013-10-02", 63, null, null, 75, null, null, 75, null, null, 63, null, null, 70, null, null, 62, null, null, 34, null, null, 35, null, null, 78, null, null, 54, null, null, 47, null, null, 23, null, null, 80, null, null, 80, null, null], ["2013-10-03", 65, null, null, 76, null, null, 76, null, null, 63, null, null, 71, null, null, 62, null, null, 35, null, null, 34, null, null, 77, null, null, 52, null, null, 46, null, null, 24, null, null, 79, null, null, 79, null, null], ["2013-10-04", 67, 7443, null, 79, 6713, null, 78, 6452, null, 65, 6325, null, 72, 6226, null, 61, 6160, null, 36, 5899, null, 35, 5810, null, 76, 5579, null, 53, 5230, null, 46, 4968, null, 25, 4924, null, 81, 26933, null, 81, 26933, null], ["2013-10-05", 69, null, null, 79, null, null, 79, null, null, 64, null, null, 73, null, null, 59, null, null, 38, null, null, 34, null, null, 75, null, null, 51, null, null, 45, null, null, 26, null, null, 80, null, null, 80, null, null], ["2013-10-06", 70, null, null, 78, null, null, 78, null, null, 63, null, null, 74, null, null, 58, null, null, 40, null, null, 33, null, null, 74, null, null, 50, null, null, 48, null, null, 26, null, null, 79, null, null, 79, null, null], ["2013-10-07", 71, null, null, 77, null, null, 77, null, null, 61, null, null, 76, null, null, 60, null, null, 41, null, null, 31, null, null, 73, null, null, 52, null, null, 47, null, null, 25, null, null, 78, null, null, 78, null, null], ["2013-10-08", 74, null, null, 76, null, null, 76, null, null, 60, null, null, 77, null, null, 62, null, null, 42, null, null, 29, null, null, 75, null, null, 53, null, null, 46, null, null, 24, null, null, 77, null, null, 77, null, null], ["2013-10-09", 76, null, null, 75, null, null, 74, null, null, 61, null, null, 74, null, null, 63, null, null, 41, null, null, 30, null, null, 76, null, null, 53, null, null, 45, null, null, 23, null, null, 76, null, null, 76, null, null], ["2013-10-10", 78, null, null, 76, null, null, 75, null, null, 62, null, null, 75, null, null, 61, null, null, 40, null, null, 29, null, null, 74, null, null, 52, null, null, 44, null, null, 22, null, null, 75, null, null, 75, null, null], ["2013-10-11", 82, 7443, null, 78, 6713, null, 77, 6452, null, 59, 6325, null, 77, 6226, null, 63, 6160, null, 42, 5899, null, 32, 5810, null, 72, 5579, null, 51, 5230, null, 44, 4968, null, 23, 4924, null, 79, 26933, null, 79, 26933, null], ["2013-10-12", 84, null, null, 80, null, null, 79, null, null, 60, null, null, 78, null, null, 64, null, null, 42, null, null, 33, null, null, 71, null, null, 50, null, null, 43, null, null, 22, null, null, 80, null, null, 80, null, null], ["2013-10-13", 86, null, null, 79, null, null, 78, null, null, 59, null, null, 79, null, null, 65, null, null, 43, null, null, 35, null, null, 69, null, null, 51, null, null, 42, null, null, 21, null, null, 81, null, null, 81, null, null], ["2013-10-14", 87, null, null, 78, null, null, 77, null, null, 60, null, null, 81, null, null, 64, null, null, 44, null, null, 36, null, null, 70, null, null, 52, null, null, 40, null, null, 20, null, null, 82, null, null, 82, null, null], ["2013-10-15", 88, null, null, 78, null, null, 76, null, null, 61, null, null, 80, null, null, 62, null, null, 46, null, null, 34, null, null, 72, null, null, 52, null, null, 41, null, null, 21, null, null, 81, null, null, 81, null, null], ["2013-10-16", 87, null, null, 76, null, null, 75, null, null, 58, null, null, 77, null, null, 63, null, null, 45, null, null, 33, null, null, 73, null, null, 51, null, null, 42, null, null, 22, null, null, 80, null, null, 80, null, null], ["2013-10-17", 88, null, null, 77, null, null, 76, null, null, 59, null, null, 78, null, null, 64, null, null, 44, null, null, 33, null, null, 73, null, null, 50, null, null, 39, null, null, 19, null, null, 79, null, null, 79, null, null], ["2013-10-18", 90, 7443, null, 79, 6713, null, 77, 6452, null, 60, 6325, null, 80, 6226, null, 65, 6160, null, 46, 5899, null, 36, 5810, null, 75, 5579, null, 49, 5230, null, 41, 4968, null, 21, 4924, null, 76, 26933, null, 76, 26933, null], ["2013-10-19", 88, null, null, 81, null, null, 78, null, null, 59, null, null, 82, null, null, 66, null, null, 49, null, null, 35, null, null, 76, null, null, 50, null, null, 40, null, null, 19, null, null, 75, null, null, 75, null, null], ["2013-10-20", 88, null, null, 82, null, null, 79, null, null, 62, null, null, 83, null, null, 67, null, null, 50, null, null, 37, null, null, 77, null, null, 51, null, null, 41, null, null, 22, null, null, 76, null, null, 76, null, null], ["2013-10-21", 87, null, null, 83, null, null, 78, null, null, 64, null, null, 84, null, null, 69, null, null, 48, null, null, 39, null, null, 78, null, null, 52, null, null, 39, null, null, 23, null, null, 78, null, null, 78, null, null]];
			data['0'].summaryData = {
				id : 0,
				name : 'Nurturing Program (Basic)',
				s : 645569,
				o : 200,
				c : 150,
				u : 10607,
				e : 78,
				r : 0,
				rs : 0,
				w : 0,
				m : 200,
				ex : 0,
				p : 0,
				ch : 243727,
				hasActivity : 0,
				tracks : [{
					id : 1,
					name : 'Content',
					s : 645569,
					o : 200,
					c : 150,
					u : 10607,
					e : 78,
					r : 0,
					rs : 0,
					w : 0,
					ch : 243727,
					m : 200,
					ex : 0,
					p : 0,
					hasActivity : 0,
					contents : [{
						id : 1,
						assetId : 3026,
						assetType : 'Email',
						name : '7 Rules to Live By for Creating Legendary Webinars',
						mod : '2013-09-19 13:18:05',
						s : 66990,
						e : 87,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 2,
						assetId : 3003,
						assetType : 'Email',
						name : 'Driving Conversions Throughout the Customer Lifecycle',
						mod : '2013-06-01 13:18:05',
						s : 60418,
						e : 83,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 3,
						assetId : 3030,
						assetType : 'Email',
						name : 'Graduating from Email to Engagement',
						mod : '2013-07-12 13:18:05',
						s : 58064,
						e : 78,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 4,
						assetId : 4033,
						assetType : 'Email',
						name : 'How Social Media is Changing Leadership',
						mod : '2013-06-01 13:18:05',
						s : 56929,
						e : 64,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 5,
						assetId : 3026,
						assetType : 'Email',
						name : 'Video Testimonial – Customer Case Study',
						mod : '2013-06-01 13:18:05',
						s : 56030,
						e : 84,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 6,
						assetId : 3003,
						assetType : 'Email',
						name : 'IDC Industry Research Workbook',
						mod : '2013-06-01 13:18:05',
						s : 55443,
						e : 69,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 7,
						assetId : 3030,
						assetType : 'Email',
						name : 'Gartner Evaluation Report',
						mod : '2013-07-12 13:18:05',
						s : 53089,
						e : 48,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 8,
						assetId : 4033,
						assetType : 'Email',
						name : 'Improve Your Lead Quality Whitepaper',
						mod : '2013-06-01 13:18:05',
						s : 52291,
						e : 39,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 9,
						assetId : 3026,
						assetType : 'Email',
						name : 'Best Practices for Launching Marketing Automation',
						mod : '2013-06-01 13:18:05',
						s : 50214,
						e : 78,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 10,
						assetId : 3003,
						assetType : 'Email',
						name : 'Tips ’n’ Tricks to Improve Your ROI',
						mod : '2013-06-01 13:18:05',
						s : 47069,
						e : 52,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 11,
						assetId : 3030,
						assetType : 'Email',
						name : 'Refer-a-Friend Gift Card Promotion',
						mod : '2013-07-12 13:18:05',
						s : 44715,
						e : 41,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 12,
						assetId : 4033,
						assetType : 'Email',
						name : 'Upgrade Cheat Sheet – Free Trial Offer',
						mod : '2013-06-01 13:18:05',
						s : 44317,
						e : 32,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}]
				}]
			};
			data['0'].contentData = [{
				programId : 0,
				trackId : 1,
				contentId : 1,
				assetType : 'Email',
				appCompId : 3026,
				date : '2013-09-19',
				name : '7 Rules to Live By for Creating Legendary Webinars'
			}, {
				programId : 0,
				trackId : 1,
				contentId : 2,
				assetType : 'Email',
				appCompId : 3003,
				date : '2013-06-23',
				name : 'Driving Conversions Throughout the Customer Lifecycle'
			}, {
				programId : 0,
				trackId : 1,
				contentId : 3,
				assetType : 'Email',
				appCompId : 3030,
				date : '2013-06-16',
				name : 'Graduating from Email to Engagement'
			}, {
				programId : 0,
				trackId : 1,
				contentId : 4,
				assetType : 'Email',
				appCompId : 4033,
				date : '2013-06-27',
				name : 'How Social Media is Changing Leadership'
			}, {
				programId : 0,
				trackId : 1,
				contentId : 5,
				assetType : 'Email',
				appCompId : 3026,
				date : '2013-08-27',
				name : 'Video Testimonial – Customer Case Study'
			}, {
				programId : 0,
				trackId : 1,
				contentId : 6,
				assetType : 'Email',
				appCompId : 3003,
				date : '2013-06-23',
				name : 'IDC Industry Research Workbook'
			}, {
				programId : 0,
				trackId : 1,
				contentId : 7,
				assetType : 'Email',
				appCompId : 3030,
				date : '2013-09-26',
				name : 'Gartner Evaluation Report'
			}, {
				programId : 0,
				trackId : 1,
				contentId : 8,
				assetType : 'Email',
				appCompId : 4033,
				date : '2013-06-27',
				name : 'Improve Your Lead Quality Whitepaper'
			}, {
				programId : 0,
				trackId : 1,
				contentId : 9,
				assetType : 'Email',
				appCompId : 3026,
				date : '2013-06-30',
				name : 'Best Practices for Launching Marketing Automation'
			}, {
				programId : 0,
				trackId : 1,
				contentId : 10,
				assetType : 'Email',
				appCompId : 3003,
				date : '2013-06-23',
				name : 'Tips ’n’ Tricks to Improve Your ROI'
			}, {
				programId : 0,
				trackId : 1,
				contentId : 11,
				assetType : 'Email',
				appCompId : 3030,
				date : '2013-06-16',
				name : 'Refer-a-Friend Gift Card Promotion'
			}, {
				programId : 0,
				trackId : 1,
				contentId : 12,
				assetType : 'Email',
				appCompId : 4033,
				date : '2013-06-27',
				name : 'Upgrade Cheat Sheet – Free Trial Offer'
			}];
			data['0'].exhaustionData = {
				id : 0,
				dt : exhaustionDate,
				"-4" : 0,
				"-3" : 0,
				"-2" : 0,
				"-1" : 0,
				"0" : 3899,
				"1" : 2331,
				"2" : 7062,
				"3" : 10304,
				"4" : 10823,
				"5" : 8772,
				"6" : 11126,
				"7" : 11713,
				"8" : 11214,
				tracks : [{
					id : 1,
					dt : exhaustionDate,
					"-4" : 0,
					"-3" : 0,
					"-2" : 0,
					"-1" : 0,
					"0" : 3899,
					"1" : 2331,
					"2" : 7062,
					"3" : 10304,
					"4" : 10823,
					"5" : 8772,
					"6" : 11126,
					"7" : 11713,
					"8" : 11214
				}]
			};
		case 'Marketo Enterprise Customer':
			data['0'] = {};
			data['0'].trendData = {};
			data['0'].trendData.data_columns = ["date", "content_1_1_es", "content_1_1_sent", "content_1_1_r", "content_1_2_es", "content_1_2_sent", "content_1_2_r", "content_1_3_es", "content_1_3_sent", "content_1_3_r", "content_1_4_es", "content_1_4_sent", "content_1_4_r", "content_1_5_es", "content_1_5_sent", "content_1_5_r", "content_1_6_es", "content_1_6_sent", "content_1_6_r", "content_1_7_es", "content_1_7_sent", "content_1_7_r", "content_1_8_es", "content_1_8_sent", "content_1_8_r", "content_1_9_es", "content_1_9_sent", "content_1_9_r", "content_1_10_es", "content_1_10_sent", "content_1_10_r", "content_1_11_es", "content_1_11_sent", "content_1_11_r", "content_1_12_es", "content_1_12_sent", "content_1_12_r", "track_1_es", "track_1_sent", "track_1_r", "program_es", "program_sent", "program_r"];
			data['0'].trendData.data = [["2013-08-23", 83, 7443, null, 69, 6713, null, 80, 6452, null, 68, 6325, null, 69, 6226, null, 68, 6160, null, 32, 5899, null, 32, 5810, null, 72, 5579, null, 50, 5230, null, 40, 4968, null, 19, 4924, null, 74, 26933, null, 74, 26933, null], ["2013-08-24", 82, null, null, 68, null, null, 79, null, null, 68, null, null, 71, null, null, 67, null, null, 31, null, null, 33, null, null, 72, null, null, 49, null, null, 39, null, null, 18, null, null, 74, null, null, 74, null, null], ["2013-08-25", 81, null, null, 67, null, null, 78, null, null, 69, null, null, 74, null, null, 69, null, null, 29, null, null, 34, null, null, 73, null, null, 49, null, null, 38, null, null, 19, null, null, 73, null, null, 73, null, null], ["2013-08-26", 79, null, null, 69, null, null, 77, null, null, 70, null, null, 76, null, null, 70, null, null, 28, null, null, 35, null, null, 75, null, null, 51, null, null, 40, null, null, 20, null, null, 72, null, null, 72, null, null], ["2013-08-27", 77, null, null, 68, null, null, 76, null, null, 71, null, null, 77, null, null, 68, null, null, 27, null, null, 34, null, null, 76, null, null, 52, null, null, 41, null, null, 22, null, null, 75, null, null, 75, null, null], ["2013-08-28", 76, null, null, 67, null, null, 74, null, null, 69, null, null, 78, null, null, 67, null, null, 26, null, null, 33, null, null, 77, null, null, 51, null, null, 43, null, null, 23, null, null, 76, null, null, 76, null, null], ["2013-08-29", 75, null, null, 66, null, null, 75, null, null, 68, null, null, 79, null, null, 66, null, null, 25, null, null, 32, null, null, 76, null, null, 50, null, null, 41, null, null, 21, null, null, 77, null, null, 77, null, null], ["2013-08-30", 73, 7443, null, 65, 6713, null, 77, 6452, null, 70, 6325, null, 81, 6226, null, 65, 6160, null, 24, 5899, null, 36, 5810, null, 78, 5579, null, 49, 5230, null, 42, 4968, null, 23, 4924, null, 82, 26933, null, 82, 26933, null], ["2013-08-31", 70, null, null, 67, null, null, 76, null, null, 72, null, null, 80, null, null, 64, null, null, 22, null, null, 35, null, null, 77, null, null, 48, null, null, 40, null, null, 24, null, null, 81, null, null, 81, null, null], ["2013-09-01", 69, null, null, 68, null, null, 75, null, null, 70, null, null, 82, null, null, 65, null, null, 20, null, null, 34, null, null, 76, null, null, 50, null, null, 39, null, null, 25, null, null, 80, null, null, 80, null, null], ["2013-09-02", 63, null, null, 70, null, null, 73, null, null, 69, null, null, 85, null, null, 67, null, null, 19, null, null, 36, null, null, 79, null, null, 51, null, null, 40, null, null, 26, null, null, 79, null, null, 79, null, null], ["2013-09-03", 62, null, null, 69, null, null, 74, null, null, 68, null, null, 86, null, null, 68, null, null, 18, null, null, 37, null, null, 78, null, null, 53, null, null, 42, null, null, 24, null, null, 82, null, null, 82, null, null], ["2013-09-04", 61, null, null, 67, null, null, 75, null, null, 67, null, null, 84, null, null, 69, null, null, 17, null, null, 35, null, null, 75, null, null, 52, null, null, 43, null, null, 23, null, null, 83, null, null, 83, null, null], ["2013-09-05", 59, null, null, 66, null, null, 77, null, null, 66, null, null, 83, null, null, 70, null, null, 16, null, null, 34, null, null, 75, null, null, 51, null, null, 41, null, null, 23, null, null, 82, null, null, 82, null, null], ["2013-09-06", 57, 7443, null, 65, 6713, null, 78, 6452, null, 66, 6325, null, 82, 6226, null, 72, 6160, null, 18, 5899, null, 34, 5810, null, 74, 5579, null, 53, 5230, null, 43, 4968, null, 25, 4924, null, 81, 26933, null, 81, 26933, null], ["2013-09-07", 55, null, null, 66, null, null, 78, null, null, 68, null, null, 83, null, null, 71, null, null, 17, null, null, 35, null, null, 76, null, null, 52, null, null, 44, null, null, 24, null, null, 80, null, null, 80, null, null], ["2013-09-08", 52, null, null, 68, null, null, 77, null, null, 69, null, null, 84, null, null, 70, null, null, 15, null, null, 36, null, null, 77, null, null, 51, null, null, 44, null, null, 23, null, null, 82, null, null, 82, null, null], ["2013-09-09", 51, null, null, 69, null, null, 76, null, null, 71, null, null, 86, null, null, 72, null, null, 14, null, null, 37, null, null, 78, null, null, 52, null, null, 45, null, null, 25, null, null, 83, null, null, 83, null, null], ["2013-09-10", 50, null, null, 70, null, null, 75, null, null, 68, null, null, 85, null, null, 73, null, null, 14, null, null, 35, null, null, 76, null, null, 54, null, null, 46, null, null, 26, null, null, 84, null, null, 84, null, null], ["2013-09-11", 49, null, null, 71, null, null, 73, null, null, 66, null, null, 83, null, null, 71, null, null, 13, null, null, 35, null, null, 75, null, null, 53, null, null, 45, null, null, 27, null, null, 82, null, null, 82, null, null], ["2013-09-12", 48, null, null, 72, null, null, 74, null, null, 65, null, null, 82, null, null, 70, null, null, 16, null, null, 34, null, null, 74, null, null, 52, null, null, 44, null, null, 25, null, null, 81, null, null, 81, null, null], ["2013-09-13", 46, 7443, null, 73, 6713, null, 76, 6452, null, 61, 6325, null, 81, 6226, null, 68, 6160, null, 17, 5899, null, 38, 5810, null, 72, 5579, null, 51, 5230, null, 45, 4968, null, 24, 4924, null, 80, 26933, null, 80, 26933, null], ["2013-09-14", 43, null, null, 74, null, null, 78, null, null, 62, null, null, 78, null, null, 67, null, null, 16, null, null, 37, null, null, 71, null, null, 51, null, null, 46, null, null, 23, null, null, 79, null, null, 79, null, null], ["2013-09-15", 41, null, null, 77, null, null, 77, null, null, 64, null, null, 79, null, null, 66, null, null, 18, null, null, 36, null, null, 73, null, null, 52, null, null, 46, null, null, 22, null, null, 81, null, null, 81, null, null], ["2013-09-16", 39, null, null, 78, null, null, 76, null, null, 65, null, null, 80, null, null, 68, null, null, 19, null, null, 38, null, null, 75, null, null, 54, null, null, 47, null, null, 24, null, null, 82, null, null, 82, null, null], ["2013-09-17", 37, null, null, 77, null, null, 75, null, null, 66, null, null, 79, null, null, 69, null, null, 17, null, null, 39, null, null, 76, null, null, 55, null, null, 48, null, null, 25, null, null, 83, null, null, 83, null, null], ["2013-09-18", 36, null, null, 76, null, null, 74, null, null, 65, null, null, 78, null, null, 67, null, null, 16, null, null, 38, null, null, 77, null, null, 54, null, null, 47, null, null, 25, null, null, 84, null, null, 84, null, null], ["2013-09-19", 35, null, null, 75, null, null, 75, null, null, 64, null, null, 77, null, null, 66, null, null, 15, null, null, 37, null, null, 76, null, null, 51, null, null, 46, null, null, 23, null, null, 82, null, null, 82, null, null], ["2013-09-20", 33, 7443, null, 75, 6713, null, 77, 6452, null, 64, 6325, null, 78, 6226, null, 65, 6160, null, 18, 5899, null, 36, 5810, null, 75, 5579, null, 50, 5230, null, 48, 4968, null, 21, 4924, null, 81, 26933, null, 81, 26933, null], ["2013-09-21", 34, null, null, 76, null, null, 76, null, null, 65, null, null, 75, null, null, 64, null, null, 17, null, null, 35, null, null, 74, null, null, 49, null, null, 48, null, null, 22, null, null, 83, null, null, 83, null, null], ["2013-09-22", 32, null, null, 78, null, null, 74, null, null, 66, null, null, 76, null, null, 63, null, null, 16, null, null, 35, null, null, 73, null, null, 48, null, null, 49, null, null, 22, null, null, 84, null, null, 84, null, null], ["2013-09-23", 33, null, null, 79, null, null, 75, null, null, 67, null, null, 75, null, null, 62, null, null, 16, null, null, 36, null, null, 75, null, null, 50, null, null, 50, null, null, 23, null, null, 85, null, null, 85, null, null], ["2013-09-24", 45, null, null, 78, null, null, 75, null, null, 65, null, null, 74, null, null, 61, null, null, 15, null, null, 37, null, null, 76, null, null, 51, null, null, 52, null, null, 24, null, null, 83, null, null, 83, null, null], ["2013-09-25", 48, null, null, 78, null, null, 77, null, null, 64, null, null, 72, null, null, 60, null, null, 15, null, null, 38, null, null, 77, null, null, 52, null, null, 53, null, null, 23, null, null, 82, null, null, 83, null, null], ["2013-09-26", 51, null, null, 77, null, null, 76, null, null, 63, null, null, 69, null, null, 61, null, null, 16, null, null, 39, null, null, 77, null, null, 51, null, null, 51, null, null, 21, null, null, 81, null, null, 81, null, null], ["2013-09-27", 53, 7443, null, 76, 6713, null, 78, 6452, null, 63, 6325, null, 68, 6226, null, 63, 6160, null, 17, 5899, null, 38, 5810, null, 78, 5579, null, 50, 5230, null, 51, 4968, null, 23, 4924, null, 79, 26933, null, 79, 26933, null], ["2013-09-28", 56, null, null, 75, null, null, 79, null, null, 64, null, null, 70, null, null, 62, null, null, 16, null, null, 37, null, null, 77, null, null, 49, null, null, 50, null, null, 21, null, null, 78, null, null, 78, null, null], ["2013-09-29", 58, null, null, 74, null, null, 78, null, null, 65, null, null, 71, null, null, 64, null, null, 15, null, null, 36, null, null, 76, null, null, 51, null, null, 49, null, null, 20, null, null, 77, null, null, 77, null, null], ["2013-09-30", 59, null, null, 75, null, null, 76, null, null, 66, null, null, 72, null, null, 65, null, null, 16, null, null, 34, null, null, 75, null, null, 52, null, null, 48, null, null, 20, null, null, 81, null, null, 81, null, null], ["2013-10-01", 60, null, null, 77, null, null, 77, null, null, 64, null, null, 73, null, null, 63, null, null, 31, null, null, 33, null, null, 77, null, null, 54, null, null, 48, null, null, 22, null, null, 82, null, null, 82, null, null], ["2013-10-02", 63, null, null, 75, null, null, 75, null, null, 63, null, null, 70, null, null, 62, null, null, 34, null, null, 35, null, null, 78, null, null, 54, null, null, 47, null, null, 23, null, null, 80, null, null, 80, null, null], ["2013-10-03", 65, null, null, 76, null, null, 76, null, null, 63, null, null, 71, null, null, 62, null, null, 35, null, null, 34, null, null, 77, null, null, 52, null, null, 46, null, null, 24, null, null, 79, null, null, 79, null, null], ["2013-10-04", 67, 7443, null, 79, 6713, null, 78, 6452, null, 65, 6325, null, 72, 6226, null, 61, 6160, null, 36, 5899, null, 35, 5810, null, 76, 5579, null, 53, 5230, null, 46, 4968, null, 25, 4924, null, 81, 26933, null, 81, 26933, null], ["2013-10-05", 69, null, null, 79, null, null, 79, null, null, 64, null, null, 73, null, null, 59, null, null, 38, null, null, 34, null, null, 75, null, null, 51, null, null, 45, null, null, 26, null, null, 80, null, null, 80, null, null], ["2013-10-06", 70, null, null, 78, null, null, 78, null, null, 63, null, null, 74, null, null, 58, null, null, 40, null, null, 33, null, null, 74, null, null, 50, null, null, 48, null, null, 26, null, null, 79, null, null, 79, null, null], ["2013-10-07", 71, null, null, 77, null, null, 77, null, null, 61, null, null, 76, null, null, 60, null, null, 41, null, null, 31, null, null, 73, null, null, 52, null, null, 47, null, null, 25, null, null, 78, null, null, 78, null, null], ["2013-10-08", 74, null, null, 76, null, null, 76, null, null, 60, null, null, 77, null, null, 62, null, null, 42, null, null, 29, null, null, 75, null, null, 53, null, null, 46, null, null, 24, null, null, 77, null, null, 77, null, null], ["2013-10-09", 76, null, null, 75, null, null, 74, null, null, 61, null, null, 74, null, null, 63, null, null, 41, null, null, 30, null, null, 76, null, null, 53, null, null, 45, null, null, 23, null, null, 76, null, null, 76, null, null], ["2013-10-10", 78, null, null, 76, null, null, 75, null, null, 62, null, null, 75, null, null, 61, null, null, 40, null, null, 29, null, null, 74, null, null, 52, null, null, 44, null, null, 22, null, null, 75, null, null, 75, null, null], ["2013-10-11", 82, 7443, null, 78, 6713, null, 77, 6452, null, 59, 6325, null, 77, 6226, null, 63, 6160, null, 42, 5899, null, 32, 5810, null, 72, 5579, null, 51, 5230, null, 44, 4968, null, 23, 4924, null, 79, 26933, null, 79, 26933, null], ["2013-10-12", 84, null, null, 80, null, null, 79, null, null, 60, null, null, 78, null, null, 64, null, null, 42, null, null, 33, null, null, 71, null, null, 50, null, null, 43, null, null, 22, null, null, 80, null, null, 80, null, null], ["2013-10-13", 86, null, null, 79, null, null, 78, null, null, 59, null, null, 79, null, null, 65, null, null, 43, null, null, 35, null, null, 69, null, null, 51, null, null, 42, null, null, 21, null, null, 81, null, null, 81, null, null], ["2013-10-14", 87, null, null, 78, null, null, 77, null, null, 60, null, null, 81, null, null, 64, null, null, 44, null, null, 36, null, null, 70, null, null, 52, null, null, 40, null, null, 20, null, null, 82, null, null, 82, null, null], ["2013-10-15", 88, null, null, 78, null, null, 76, null, null, 61, null, null, 80, null, null, 62, null, null, 46, null, null, 34, null, null, 72, null, null, 52, null, null, 41, null, null, 21, null, null, 81, null, null, 81, null, null], ["2013-10-16", 87, null, null, 76, null, null, 75, null, null, 58, null, null, 77, null, null, 63, null, null, 45, null, null, 33, null, null, 73, null, null, 51, null, null, 42, null, null, 22, null, null, 80, null, null, 80, null, null], ["2013-10-17", 88, null, null, 77, null, null, 76, null, null, 59, null, null, 78, null, null, 64, null, null, 44, null, null, 33, null, null, 73, null, null, 50, null, null, 39, null, null, 19, null, null, 79, null, null, 79, null, null], ["2013-10-18", 90, 7443, null, 79, 6713, null, 77, 6452, null, 60, 6325, null, 80, 6226, null, 65, 6160, null, 46, 5899, null, 36, 5810, null, 75, 5579, null, 49, 5230, null, 41, 4968, null, 21, 4924, null, 76, 26933, null, 76, 26933, null], ["2013-10-19", 88, null, null, 81, null, null, 78, null, null, 59, null, null, 82, null, null, 66, null, null, 49, null, null, 35, null, null, 76, null, null, 50, null, null, 40, null, null, 19, null, null, 75, null, null, 75, null, null], ["2013-10-20", 88, null, null, 82, null, null, 79, null, null, 62, null, null, 83, null, null, 67, null, null, 50, null, null, 37, null, null, 77, null, null, 51, null, null, 41, null, null, 22, null, null, 76, null, null, 76, null, null], ["2013-10-21", 87, null, null, 83, null, null, 78, null, null, 64, null, null, 84, null, null, 69, null, null, 48, null, null, 39, null, null, 78, null, null, 52, null, null, 39, null, null, 23, null, null, 78, null, null, 78, null, null]];
			data['0'].summaryData = {
				id : 0,
				name : 'Nurturing Program (Basic)',
				s : 645569,
				o : 200,
				c : 150,
				u : 10607,
				e : 78,
				r : 0,
				rs : 0,
				w : 0,
				m : 200,
				ex : 0,
				p : 0,
				ch : 243727,
				hasActivity : 0,
				tracks : [{
					id : 1,
					name : 'Content',
					s : 645569,
					o : 200,
					c : 150,
					u : 10607,
					e : 78,
					r : 0,
					rs : 0,
					w : 0,
					ch : 243727,
					m : 200,
					ex : 0,
					p : 0,
					hasActivity : 0,
					contents : [{
						id : 1,
						assetId : 3026,
						assetType : 'Email',
						name : '7 Rules to Live By for Creating Legendary Webinars',
						mod : '2013-09-19 13:18:05',
						s : 66990,
						e : 87,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 2,
						assetId : 3003,
						assetType : 'Email',
						name : 'Driving Conversions Throughout the Customer Lifecycle',
						mod : '2013-06-01 13:18:05',
						s : 60418,
						e : 83,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 3,
						assetId : 3030,
						assetType : 'Email',
						name : 'Graduating from Email to Engagement',
						mod : '2013-07-12 13:18:05',
						s : 58064,
						e : 78,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 4,
						assetId : 4033,
						assetType : 'Email',
						name : 'How Social Media is Changing Leadership',
						mod : '2013-06-01 13:18:05',
						s : 56929,
						e : 64,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 5,
						assetId : 3026,
						assetType : 'Email',
						name : 'Video Testimonial – Customer Case Study',
						mod : '2013-06-01 13:18:05',
						s : 56030,
						e : 84,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 6,
						assetId : 3003,
						assetType : 'Email',
						name : 'IDC Industry Research Workbook',
						mod : '2013-06-01 13:18:05',
						s : 55443,
						e : 69,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 7,
						assetId : 3030,
						assetType : 'Email',
						name : 'Gartner Evaluation Report',
						mod : '2013-07-12 13:18:05',
						s : 53089,
						e : 48,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 8,
						assetId : 4033,
						assetType : 'Email',
						name : 'Improve Your Lead Quality Whitepaper',
						mod : '2013-06-01 13:18:05',
						s : 52291,
						e : 39,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 9,
						assetId : 3026,
						assetType : 'Email',
						name : 'Best Practices for Launching Marketing Automation',
						mod : '2013-06-01 13:18:05',
						s : 50214,
						e : 78,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 10,
						assetId : 3003,
						assetType : 'Email',
						name : 'Tips ’n’ Tricks to Improve Your ROI',
						mod : '2013-06-01 13:18:05',
						s : 47069,
						e : 52,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 11,
						assetId : 3030,
						assetType : 'Email',
						name : 'Refer-a-Friend Gift Card Promotion',
						mod : '2013-07-12 13:18:05',
						s : 44715,
						e : 41,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 12,
						assetId : 4033,
						assetType : 'Email',
						name : 'Upgrade Cheat Sheet – Free Trial Offer',
						mod : '2013-06-01 13:18:05',
						s : 44317,
						e : 32,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}]
				}]
			};
			data['0'].contentData = [{
				programId : 0,
				trackId : 1,
				contentId : 1,
				assetType : 'Email',
				appCompId : 3026,
				date : '2013-09-19',
				name : '7 Rules to Live By for Creating Legendary Webinars'
			}, {
				programId : 0,
				trackId : 1,
				contentId : 2,
				assetType : 'Email',
				appCompId : 3003,
				date : '2013-06-23',
				name : 'Driving Conversions Throughout the Customer Lifecycle'
			}, {
				programId : 0,
				trackId : 1,
				contentId : 3,
				assetType : 'Email',
				appCompId : 3030,
				date : '2013-06-16',
				name : 'Graduating from Email to Engagement'
			}, {
				programId : 0,
				trackId : 1,
				contentId : 4,
				assetType : 'Email',
				appCompId : 4033,
				date : '2013-06-27',
				name : 'How Social Media is Changing Leadership'
			}, {
				programId : 0,
				trackId : 1,
				contentId : 5,
				assetType : 'Email',
				appCompId : 3026,
				date : '2013-08-27',
				name : 'Video Testimonial – Customer Case Study'
			}, {
				programId : 0,
				trackId : 1,
				contentId : 6,
				assetType : 'Email',
				appCompId : 3003,
				date : '2013-06-23',
				name : 'IDC Industry Research Workbook'
			}, {
				programId : 0,
				trackId : 1,
				contentId : 7,
				assetType : 'Email',
				appCompId : 3030,
				date : '2013-09-26',
				name : 'Gartner Evaluation Report'
			}, {
				programId : 0,
				trackId : 1,
				contentId : 8,
				assetType : 'Email',
				appCompId : 4033,
				date : '2013-06-27',
				name : 'Improve Your Lead Quality Whitepaper'
			}, {
				programId : 0,
				trackId : 1,
				contentId : 9,
				assetType : 'Email',
				appCompId : 3026,
				date : '2013-06-30',
				name : 'Best Practices for Launching Marketing Automation'
			}, {
				programId : 0,
				trackId : 1,
				contentId : 10,
				assetType : 'Email',
				appCompId : 3003,
				date : '2013-06-23',
				name : 'Tips ’n’ Tricks to Improve Your ROI'
			}, {
				programId : 0,
				trackId : 1,
				contentId : 11,
				assetType : 'Email',
				appCompId : 3030,
				date : '2013-06-16',
				name : 'Refer-a-Friend Gift Card Promotion'
			}, {
				programId : 0,
				trackId : 1,
				contentId : 12,
				assetType : 'Email',
				appCompId : 4033,
				date : '2013-06-27',
				name : 'Upgrade Cheat Sheet – Free Trial Offer'
			}];
			data['0'].exhaustionData = {
				id : 0,
				dt : exhaustionDate,
				"-4" : 0,
				"-3" : 0,
				"-2" : 0,
				"-1" : 0,
				"0" : 3899,
				"1" : 2331,
				"2" : 7062,
				"3" : 10304,
				"4" : 10823,
				"5" : 8772,
				"6" : 11126,
				"7" : 11713,
				"8" : 11214,
				tracks : [{
					id : 1,
					dt : exhaustionDate,
					"-4" : 0,
					"-3" : 0,
					"-2" : 0,
					"-1" : 0,
					"0" : 3899,
					"1" : 2331,
					"2" : 7062,
					"3" : 10304,
					"4" : 10823,
					"5" : 8772,
					"6" : 11126,
					"7" : 11713,
					"8" : 11214
				}]
			};

			data['1'] = {};
			data['1'].trendData = {};
			data['1'].trendData.data_columns = ["date", "content_2_1_es", "content_2_1_sent", "content_2_1_r", "content_2_2_es", "content_2_2_sent", "content_2_2_r", "content_2_3_es", "content_2_3_sent", "content_2_3_r", "content_2_4_es", "content_2_4_sent", "content_2_4_r", "content_3_5_es", "content_3_5_sent", "content_3_5_r", "content_3_6_es", "content_3_6_sent", "content_3_6_r", "content_3_7_es", "content_3_7_sent", "content_3_7_r", "content_3_8_es", "content_3_8_sent", "content_3_8_r", "content_4_9_es", "content_4_9_sent", "content_4_9_r", "content_4_10_es", "content_4_10_sent", "content_4_10_r", "content_4_11_es", "content_4_11_sent", "content_4_11_r", "content_4_12_es", "content_4_12_sent", "content_4_12_r", "track_2_es", "track_2_sent", "track_2_r", "track_3_es", "track_3_sent", "track_3_r", "track_4_es", "track_4_sent", "track_4_r", "program_es", "program_sent", "program_r"];
			data['1'].trendData.data = [["2013-08-23", 83, 7443, null, 69, 6713, null, 80, 6452, null, 68, 6325, null, 69, 6226, null, 68, 6160, null, 32, 5899, null, 32, 5810, null, 72, 5579, null, 50, 5230, null, 40, 4968, null, 19, 4924, null, 74, 26933, null, 36, 24095, null, 46, 20702, null, 58, 71728, null], ["2013-08-24", 82, null, null, 68, null, null, 79, null, null, 68, null, null, 71, null, null, 67, null, null, 31, null, null, 33, null, null, 72, null, null, 49, null, null, 39, null, null, 18, null, null, 74, null, null, 37, null, null, 45, null, null, 59, null, null], ["2013-08-25", 81, null, null, 67, null, null, 78, null, null, 69, null, null, 74, null, null, 69, null, null, 29, null, null, 34, null, null, 73, null, null, 49, null, null, 38, null, null, 19, null, null, 73, null, null, 38, null, null, 44, null, null, 61, null, null], ["2013-08-26", 79, null, null, 69, null, null, 77, null, null, 70, null, null, 76, null, null, 70, null, null, 28, null, null, 35, null, null, 75, null, null, 51, null, null, 40, null, null, 20, null, null, 72, null, null, 39, null, null, 43, null, null, 62, null, null], ["2013-08-27", 77, null, null, 68, null, null, 76, null, null, 71, null, null, 77, null, null, 68, null, null, 27, null, null, 34, null, null, 76, null, null, 52, null, null, 41, null, null, 22, null, null, 75, null, null, 41, null, null, 44, null, null, 61, null, null], ["2013-08-28", 76, null, null, 67, null, null, 74, null, null, 69, null, null, 78, null, null, 67, null, null, 26, null, null, 33, null, null, 77, null, null, 51, null, null, 43, null, null, 23, null, null, 76, null, null, 40, null, null, 44, null, null, 60, null, null], ["2013-08-29", 75, null, null, 66, null, null, 75, null, null, 68, null, null, 79, null, null, 66, null, null, 25, null, null, 32, null, null, 76, null, null, 50, null, null, 41, null, null, 21, null, null, 77, null, null, 41, null, null, 45, null, null, 61, null, null], ["2013-08-30", 73, 7443, null, 65, 6713, null, 77, 6452, null, 70, 6325, null, 81, 6226, null, 65, 6160, null, 24, 5899, null, 36, 5810, null, 78, 5579, null, 49, 5230, null, 42, 4968, null, 23, 4924, null, 82, 26933, null, 42, 24095, null, 43, 20702, null, 63, 71729, null], ["2013-08-31", 70, null, null, 67, null, null, 76, null, null, 72, null, null, 80, null, null, 64, null, null, 22, null, null, 35, null, null, 77, null, null, 48, null, null, 40, null, null, 24, null, null, 81, null, null, 42, null, null, 41, null, null, 64, null, null], ["2013-09-01", 69, null, null, 68, null, null, 75, null, null, 70, null, null, 82, null, null, 65, null, null, 20, null, null, 34, null, null, 76, null, null, 50, null, null, 39, null, null, 25, null, null, 80, null, null, 43, null, null, 40, null, null, 65, null, null], ["2013-09-02", 63, null, null, 70, null, null, 73, null, null, 69, null, null, 85, null, null, 67, null, null, 19, null, null, 36, null, null, 79, null, null, 51, null, null, 40, null, null, 26, null, null, 79, null, null, 44, null, null, 41, null, null, 67, null, null], ["2013-09-03", 62, null, null, 69, null, null, 74, null, null, 68, null, null, 86, null, null, 68, null, null, 18, null, null, 37, null, null, 78, null, null, 53, null, null, 42, null, null, 24, null, null, 82, null, null, 46, null, null, 43, null, null, 65, null, null], ["2013-09-04", 61, null, null, 67, null, null, 75, null, null, 67, null, null, 84, null, null, 69, null, null, 17, null, null, 35, null, null, 75, null, null, 52, null, null, 43, null, null, 23, null, null, 83, null, null, 44, null, null, 42, null, null, 64, null, null], ["2013-09-05", 59, null, null, 66, null, null, 77, null, null, 66, null, null, 83, null, null, 70, null, null, 16, null, null, 34, null, null, 75, null, null, 51, null, null, 41, null, null, 23, null, null, 82, null, null, 45, null, null, 41, null, null, 67, null, null], ["2013-09-06", 57, 7443, null, 65, 6713, null, 78, 6452, null, 66, 6325, null, 82, 6226, null, 72, 6160, null, 18, 5899, null, 34, 5810, null, 74, 5579, null, 53, 5230, null, 43, 4968, null, 25, 4924, null, 81, 26933, null, 47, 24095, null, 40, 20702, null, 69, 71728, null], ["2013-09-07", 55, null, null, 66, null, null, 78, null, null, 68, null, null, 83, null, null, 71, null, null, 17, null, null, 35, null, null, 76, null, null, 52, null, null, 44, null, null, 24, null, null, 80, null, null, 47, null, null, 40, null, null, 71, null, null], ["2013-09-08", 52, null, null, 68, null, null, 77, null, null, 69, null, null, 84, null, null, 70, null, null, 15, null, null, 36, null, null, 77, null, null, 51, null, null, 44, null, null, 23, null, null, 82, null, null, 48, null, null, 41, null, null, 70, null, null], ["2013-09-09", 51, null, null, 69, null, null, 76, null, null, 71, null, null, 86, null, null, 72, null, null, 14, null, null, 37, null, null, 78, null, null, 52, null, null, 45, null, null, 25, null, null, 83, null, null, 49, null, null, 41, null, null, 72, null, null], ["2013-09-10", 50, null, null, 70, null, null, 75, null, null, 68, null, null, 85, null, null, 73, null, null, 14, null, null, 35, null, null, 76, null, null, 54, null, null, 46, null, null, 26, null, null, 84, null, null, 47, null, null, 44, null, null, 73, null, null], ["2013-09-11", 49, null, null, 71, null, null, 73, null, null, 66, null, null, 83, null, null, 71, null, null, 13, null, null, 35, null, null, 75, null, null, 53, null, null, 45, null, null, 27, null, null, 82, null, null, 48, null, null, 43, null, null, 71, null, null], ["2013-09-12", 48, null, null, 72, null, null, 74, null, null, 65, null, null, 82, null, null, 70, null, null, 16, null, null, 34, null, null, 74, null, null, 52, null, null, 44, null, null, 25, null, null, 81, null, null, 49, null, null, 42, null, null, 71, null, null], ["2013-09-13", 46, 7443, null, 73, 6713, null, 76, 6452, null, 61, 6325, null, 81, 6226, null, 68, 6160, null, 17, 5899, null, 38, 5810, null, 72, 5579, null, 51, 5230, null, 45, 4968, null, 24, 4924, null, 80, 26933, null, 51, 24095, null, 43, 20702, null, 74, 71729, null], ["2013-09-14", 43, null, null, 74, null, null, 78, null, null, 62, null, null, 78, null, null, 67, null, null, 16, null, null, 37, null, null, 71, null, null, 51, null, null, 46, null, null, 23, null, null, 79, null, null, 50, null, null, 41, null, null, 73, null, null], ["2013-09-15", 41, null, null, 77, null, null, 77, null, null, 64, null, null, 79, null, null, 66, null, null, 18, null, null, 36, null, null, 73, null, null, 52, null, null, 46, null, null, 22, null, null, 81, null, null, 51, null, null, 42, null, null, 72, null, null], ["2013-09-16", 39, null, null, 78, null, null, 76, null, null, 65, null, null, 80, null, null, 68, null, null, 19, null, null, 38, null, null, 75, null, null, 54, null, null, 47, null, null, 24, null, null, 82, null, null, 52, null, null, 43, null, null, 71, null, null], ["2013-09-17", 37, null, null, 77, null, null, 75, null, null, 66, null, null, 79, null, null, 69, null, null, 17, null, null, 39, null, null, 76, null, null, 55, null, null, 48, null, null, 25, null, null, 83, null, null, 52, null, null, 45, null, null, 70, null, null], ["2013-09-18", 36, null, null, 76, null, null, 74, null, null, 65, null, null, 78, null, null, 67, null, null, 16, null, null, 38, null, null, 77, null, null, 54, null, null, 47, null, null, 25, null, null, 84, null, null, 53, null, null, 46, null, null, 68, null, null], ["2013-09-19", 35, null, null, 75, null, null, 75, null, null, 64, null, null, 77, null, null, 66, null, null, 15, null, null, 37, null, null, 76, null, null, 51, null, null, 46, null, null, 23, null, null, 82, null, null, 54, null, null, 47, null, null, 67, null, null], ["2013-09-20", 33, 7443, null, 75, 6713, null, 77, 6452, null, 64, 6325, null, 78, 6226, null, 65, 6160, null, 18, 5899, null, 36, 5810, null, 75, 5579, null, 50, 5230, null, 48, 4968, null, 21, 4924, null, 81, 26933, null, 55, 24095, null, 48, 20702, null, 69, 71730, null], ["2013-09-21", 34, null, null, 76, null, null, 76, null, null, 65, null, null, 75, null, null, 64, null, null, 17, null, null, 35, null, null, 74, null, null, 49, null, null, 48, null, null, 22, null, null, 83, null, null, 54, null, null, 47, null, null, 68, null, null], ["2013-09-22", 32, null, null, 78, null, null, 74, null, null, 66, null, null, 76, null, null, 63, null, null, 16, null, null, 35, null, null, 73, null, null, 48, null, null, 49, null, null, 22, null, null, 84, null, null, 55, null, null, 48, null, null, 67, null, null], ["2013-09-23", 33, null, null, 79, null, null, 75, null, null, 67, null, null, 75, null, null, 62, null, null, 16, null, null, 36, null, null, 75, null, null, 50, null, null, 50, null, null, 23, null, null, 85, null, null, 56, null, null, 49, null, null, 65, null, null], ["2013-09-24", 45, null, null, 78, null, null, 75, null, null, 65, null, null, 74, null, null, 61, null, null, 15, null, null, 37, null, null, 76, null, null, 51, null, null, 52, null, null, 24, null, null, 83, null, null, 57, null, null, 51, null, null, 64, null, null], ["2013-09-25", 48, null, null, 78, null, null, 77, null, null, 64, null, null, 72, null, null, 60, null, null, 15, null, null, 38, null, null, 77, null, null, 52, null, null, 53, null, null, 23, null, null, 82, null, null, 59, null, null, 50, null, null, 61, null, null], ["2013-09-26", 51, null, null, 77, null, null, 76, null, null, 63, null, null, 69, null, null, 61, null, null, 16, null, null, 39, null, null, 77, null, null, 51, null, null, 51, null, null, 21, null, null, 81, null, null, 61, null, null, 49, null, null, 60, null, null], ["2013-09-27", 53, 7443, null, 76, 6713, null, 78, 6452, null, 63, 6325, null, 68, 6226, null, 63, 6160, null, 17, 5899, null, 38, 5810, null, 78, 5579, null, 50, 5230, null, 51, 4968, null, 23, 4924, null, 79, 26933, null, 61, 24095, null, 51, 20702, null, 63, 71729, null], ["2013-09-28", 56, null, null, 75, null, null, 79, null, null, 64, null, null, 70, null, null, 62, null, null, 16, null, null, 37, null, null, 77, null, null, 49, null, null, 50, null, null, 21, null, null, 78, null, null, 60, null, null, 51, null, null, 64, null, null], ["2013-09-29", 58, null, null, 74, null, null, 78, null, null, 65, null, null, 71, null, null, 64, null, null, 15, null, null, 36, null, null, 76, null, null, 51, null, null, 49, null, null, 20, null, null, 77, null, null, 62, null, null, 50, null, null, 62, null, null], ["2013-09-30", 59, null, null, 75, null, null, 76, null, null, 66, null, null, 72, null, null, 65, null, null, 16, null, null, 34, null, null, 75, null, null, 52, null, null, 48, null, null, 20, null, null, 81, null, null, 61, null, null, 50, null, null, 60, null, null], ["2013-10-01", 60, null, null, 77, null, null, 77, null, null, 64, null, null, 73, null, null, 63, null, null, 31, null, null, 33, null, null, 77, null, null, 54, null, null, 48, null, null, 22, null, null, 82, null, null, 60, null, null, 49, null, null, 59, null, null], ["2013-10-02", 63, null, null, 75, null, null, 75, null, null, 63, null, null, 70, null, null, 62, null, null, 34, null, null, 35, null, null, 78, null, null, 54, null, null, 47, null, null, 23, null, null, 80, null, null, 58, null, null, 49, null, null, 57, null, null], ["2013-10-03", 65, null, null, 76, null, null, 76, null, null, 63, null, null, 71, null, null, 62, null, null, 35, null, null, 34, null, null, 77, null, null, 52, null, null, 46, null, null, 24, null, null, 79, null, null, 59, null, null, 48, null, null, 56, null, null], ["2013-10-04", 67, 7443, null, 79, 6713, null, 78, 6452, null, 65, 6325, null, 72, 6226, null, 61, 6160, null, 36, 5899, null, 35, 5810, null, 76, 5579, null, 53, 5230, null, 46, 4968, null, 25, 4924, null, 81, 26933, null, 60, 24095, null, 51, 20702, null, 58, 71729, null], ["2013-10-05", 69, null, null, 79, null, null, 79, null, null, 64, null, null, 73, null, null, 59, null, null, 38, null, null, 34, null, null, 75, null, null, 51, null, null, 45, null, null, 26, null, null, 80, null, null, 58, null, null, 49, null, null, 59, null, null], ["2013-10-06", 70, null, null, 78, null, null, 78, null, null, 63, null, null, 74, null, null, 58, null, null, 40, null, null, 33, null, null, 74, null, null, 50, null, null, 48, null, null, 26, null, null, 79, null, null, 59, null, null, 50, null, null, 60, null, null], ["2013-10-07", 71, null, null, 77, null, null, 77, null, null, 61, null, null, 76, null, null, 60, null, null, 41, null, null, 31, null, null, 73, null, null, 52, null, null, 47, null, null, 25, null, null, 78, null, null, 61, null, null, 50, null, null, 61, null, null], ["2013-10-08", 74, null, null, 76, null, null, 76, null, null, 60, null, null, 77, null, null, 62, null, null, 42, null, null, 29, null, null, 75, null, null, 53, null, null, 46, null, null, 24, null, null, 77, null, null, 60, null, null, 51, null, null, 62, null, null], ["2013-10-09", 76, null, null, 75, null, null, 74, null, null, 61, null, null, 74, null, null, 63, null, null, 41, null, null, 30, null, null, 76, null, null, 53, null, null, 45, null, null, 23, null, null, 76, null, null, 59, null, null, 49, null, null, 62, null, null], ["2013-10-10", 78, null, null, 76, null, null, 75, null, null, 62, null, null, 75, null, null, 61, null, null, 40, null, null, 29, null, null, 74, null, null, 52, null, null, 44, null, null, 22, null, null, 75, null, null, 58, null, null, 48, null, null, 63, null, null], ["2013-10-11", 82, 7443, null, 78, 6713, null, 77, 6452, null, 59, 6325, null, 77, 6226, null, 63, 6160, null, 42, 5899, null, 32, 5810, null, 72, 5579, null, 51, 5230, null, 44, 4968, null, 23, 4924, null, 79, 26933, null, 60, 24095, null, 49, 20702, null, 61, 71729, null], ["2013-10-12", 84, null, null, 80, null, null, 79, null, null, 60, null, null, 78, null, null, 64, null, null, 42, null, null, 33, null, null, 71, null, null, 50, null, null, 43, null, null, 22, null, null, 80, null, null, 58, null, null, 48, null, null, 63, null, null], ["2013-10-13", 86, null, null, 79, null, null, 78, null, null, 59, null, null, 79, null, null, 65, null, null, 43, null, null, 35, null, null, 69, null, null, 51, null, null, 42, null, null, 21, null, null, 81, null, null, 58, null, null, 49, null, null, 64, null, null], ["2013-10-14", 87, null, null, 78, null, null, 77, null, null, 60, null, null, 81, null, null, 64, null, null, 44, null, null, 36, null, null, 70, null, null, 52, null, null, 40, null, null, 20, null, null, 82, null, null, 59, null, null, 51, null, null, 67, null, null], ["2013-10-15", 88, null, null, 78, null, null, 76, null, null, 61, null, null, 80, null, null, 62, null, null, 46, null, null, 34, null, null, 72, null, null, 52, null, null, 41, null, null, 21, null, null, 81, null, null, 57, null, null, 52, null, null, 68, null, null], ["2013-10-16", 87, null, null, 76, null, null, 75, null, null, 58, null, null, 77, null, null, 63, null, null, 45, null, null, 33, null, null, 73, null, null, 51, null, null, 42, null, null, 22, null, null, 80, null, null, 56, null, null, 52, null, null, 66, null, null], ["2013-10-17", 88, null, null, 77, null, null, 76, null, null, 59, null, null, 78, null, null, 64, null, null, 44, null, null, 33, null, null, 73, null, null, 50, null, null, 39, null, null, 19, null, null, 79, null, null, 55, null, null, 53, null, null, 64, null, null], ["2013-10-18", 90, 7443, null, 79, 6713, null, 77, 6452, null, 60, 6325, null, 80, 6226, null, 65, 6160, null, 46, 5899, null, 36, 5810, null, 75, 5579, null, 49, 5230, null, 41, 4968, null, 21, 4924, null, 76, 26933, null, 57, 24095, null, 52, 20702, null, 65, 71729, null], ["2013-10-19", 88, null, null, 81, null, null, 78, null, null, 59, null, null, 82, null, null, 66, null, null, 49, null, null, 35, null, null, 76, null, null, 50, null, null, 40, null, null, 19, null, null, 75, null, null, 56, null, null, 51, null, null, 61, null, null], ["2013-10-20", 88, null, null, 82, null, null, 79, null, null, 62, null, null, 83, null, null, 67, null, null, 50, null, null, 37, null, null, 77, null, null, 51, null, null, 41, null, null, 22, null, null, 76, null, null, 58, null, null, 52, null, null, 62, null, null], ["2013-10-21", 87, null, null, 83, null, null, 78, null, null, 64, null, null, 84, null, null, 69, null, null, 48, null, null, 39, null, null, 78, null, null, 52, null, null, 39, null, null, 23, null, null, 78, null, null, 60, null, null, 51, null, null, 63, null, null]];
			data['1'].summaryData = {
				id : 0,
				name : 'Nurture by Persona',
				s : 645569,
				o : 200,
				c : 150,
				u : 10607,
				e : 63,
				r : 0,
				rs : 0,
				w : 0,
				m : 200,
				ex : 0,
				p : 0,
				ch : 243727,
				hasActivity : 0,
				tracks : [{
					id : 2,
					name : 'Executive',
					s : 242401,
					o : 50,
					c : 30,
					u : 6288,
					e : 78,
					r : 0,
					rs : 0,
					w : 0,
					ch : 243727,
					m : 200,
					ex : 0,
					p : 0,
					hasActivity : 0,
					contents : [{
						id : 1,
						assetId : 3026,
						assetType : 'Email',
						name : '1. The Business Value',
						mod : '2013-09-19 13:18:05',
						s : 66990,
						e : 87,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 2,
						assetId : 3003,
						assetType : 'Email',
						name : '2. A Case Study',
						mod : '2013-06-01 13:18:05',
						s : 60418,
						e : 83,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 3,
						assetId : 3030,
						assetType : 'Email',
						name : '3. An ROI Calculator',
						mod : '2013-07-12 13:18:05',
						s : 58064,
						e : 78,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 4,
						assetId : 4033,
						assetType : 'Email',
						name : '4. Maximize Productivity',
						mod : '2013-06-01 13:18:05',
						s : 56929,
						e : 64,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}]
				}, {
					id : 3,
					name : 'Practitioner',
					s : 216853,
					o : 50,
					c : 30,
					u : 1445,
					e : 60,
					r : 0,
					rs : 0,
					w : 0,
					ch : 329727,
					m : 200,
					ex : 0,
					p : 0,
					hasActivity : 0,
					contents : [{
						id : 5,
						assetId : 3026,
						assetType : 'Email',
						name : '1. A Definitive Guide',
						mod : '2013-06-01 13:18:05',
						s : 56030,
						e : 84,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 6,
						assetId : 3003,
						assetType : 'Email',
						name : '2. A Buyers Guide',
						mod : '2013-06-01 13:18:05',
						s : 55443,
						e : 69,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 7,
						assetId : 3030,
						assetType : 'Email',
						name : '3. An Infographic',
						mod : '2013-07-12 13:18:05',
						s : 53089,
						e : 48,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 8,
						assetId : 4033,
						assetType : 'Email',
						name : '4. Accelerate Your Career',
						mod : '2013-06-01 13:18:05',
						s : 52291,
						e : 39,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}]
				}, {
					id : 4,
					name : 'Technologist',
					s : 186135,
					o : 50,
					c : 30,
					u : 3875,
					e : 51,
					r : 0,
					rs : 0,
					w : 0,
					ch : 415727,
					m : 200,
					ex : 0,
					p : 0,
					hasActivity : 0,
					contents : [{
						id : 9,
						assetId : 3026,
						assetType : 'Email',
						name : '1. A Developers Blog Post',
						mod : '2013-06-01 13:18:05',
						s : 50214,
						e : 78,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 10,
						assetId : 3003,
						assetType : 'Email',
						name : '2. The Top 5 API Use Cases',
						mod : '2013-06-01 13:18:05',
						s : 47069,
						e : 52,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 11,
						assetId : 3030,
						assetType : 'Email',
						name : '3. The Setup Guide',
						mod : '2013-07-12 13:18:05',
						s : 44715,
						e : 41,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 12,
						assetId : 4033,
						assetType : 'Email',
						name : '4. The Dev Community',
						mod : '2013-06-01 13:18:05',
						s : 44317,
						e : 32,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}]
				}]
			};
			data['1'].contentData = [{
				programId : 0,
				trackId : 2,
				contentId : 1,
				assetType : 'Email',
				appCompId : 3026,
				date : '2013-09-19',
				name : '1. The Business Value'
			}, {
				programId : 0,
				trackId : 2,
				contentId : 2,
				assetType : 'Email',
				appCompId : 3003,
				date : '2013-06-23',
				name : '2. A Case Study'
			}, {
				programId : 0,
				trackId : 2,
				contentId : 3,
				assetType : 'Email',
				appCompId : 3030,
				date : '2013-06-16',
				name : '3. An ROI Calculator'
			}, {
				programId : 0,
				trackId : 2,
				contentId : 4,
				assetType : 'Email',
				appCompId : 4033,
				date : '2013-06-27',
				name : '4. Maximize Productivity'
			}, {
				programId : 0,
				trackId : 3,
				contentId : 5,
				assetType : 'Email',
				appCompId : 3026,
				date : '2013-08-27',
				name : '1. A Definitive Guide'
			}, {
				programId : 0,
				trackId : 3,
				contentId : 6,
				assetType : 'Email',
				appCompId : 3003,
				date : '2013-06-23',
				name : '2. A Buyers Guide'
			}, {
				programId : 0,
				trackId : 3,
				contentId : 7,
				assetType : 'Email',
				appCompId : 3030,
				date : '2013-09-26',
				name : '3. An Infographic'
			}, {
				programId : 0,
				trackId : 3,
				contentId : 8,
				assetType : 'Email',
				appCompId : 4033,
				date : '2013-06-27',
				name : '4. Accelerate Your Career'
			}, {
				programId : 0,
				trackId : 4,
				contentId : 9,
				assetType : 'Email',
				appCompId : 3026,
				date : '2013-06-30',
				name : '1. A Developers Blog Post'
			}, {
				programId : 0,
				trackId : 4,
				contentId : 10,
				assetType : 'Email',
				appCompId : 3003,
				date : '2013-06-23',
				name : '2. The Top 5 API Use Cases'
			}, {
				programId : 0,
				trackId : 4,
				contentId : 11,
				assetType : 'Email',
				appCompId : 3030,
				date : '2013-06-16',
				name : '3. The Setup Guide'
			}, {
				programId : 0,
				trackId : 4,
				contentId : 12,
				assetType : 'Email',
				appCompId : 4033,
				date : '2013-06-27',
				name : '4. The Development Community'
			}];
			data['1'].exhaustionData = {
				id : 0,
				dt : exhaustionDate,
				"-4" : 645,
				"-3" : 1277,
				"-2" : 674,
				"-1" : 379,
				"0" : 924,
				"1" : 2331,
				"2" : 7062,
				"3" : 10304,
				"4" : 823,
				"5" : 8772,
				"6" : 11126,
				"7" : 11713,
				"8" : 21214,
				tracks : [{
					id : 2,
					dt : exhaustionDate,
					"-4" : 0,
					"-3" : 0,
					"-2" : 0,
					"-1" : 0,
					"0" : 645,
					"1" : 1135,
					"2" : 2354,
					"3" : 6572,
					"4" : 10254,
					"5" : 0,
					"6" : 0,
					"7" : 0,
					"8" : 0
				}, {
					id : 3,
					dt : exhaustionDate,
					"-4" : 132,
					"-3" : 525,
					"-2" : 87,
					"-1" : 54,
					"0" : 25,
					"1" : 798,
					"2" : 254,
					"3" : 587,
					"4" : 254,
					"5" : 0,
					"6" : 0,
					"7" : 0,
					"8" : 0
				}, {
					id : 4,
					dt : exhaustionDate,
					"-4" : 513,
					"-3" : 752,
					"-2" : 587,
					"-1" : 325,
					"0" : 254,
					"1" : 798,
					"2" : 3254,
					"3" : 4587,
					"4" : 1254,
					"5" : 0,
					"6" : 0,
					"7" : 0,
					"8" : 0
				}]
			};

			data['2'] = {};
			data['2'].trendData = {};
			data['2'].trendData.data_columns = ["date", "content_2_1_es", "content_2_1_sent", "content_2_1_r", "content_2_2_es", "content_2_2_sent", "content_2_2_r", "content_2_3_es", "content_2_3_sent", "content_2_3_r", "content_2_4_es", "content_2_4_sent", "content_2_4_r", "content_3_5_es", "content_3_5_sent", "content_3_5_r", "content_3_6_es", "content_3_6_sent", "content_3_6_r", "content_3_7_es", "content_3_7_sent", "content_3_7_r", "content_3_8_es", "content_3_8_sent", "content_3_8_r", "content_4_9_es", "content_4_9_sent", "content_4_9_r", "content_4_10_es", "content_4_10_sent", "content_4_10_r", "content_4_11_es", "content_4_11_sent", "content_4_11_r", "content_4_12_es", "content_4_12_sent", "content_4_12_r", "track_2_es", "track_2_sent", "track_2_r", "track_3_es", "track_3_sent", "track_3_r", "track_4_es", "track_4_sent", "track_4_r", "program_es", "program_sent", "program_r"];
			data['2'].trendData.data = [["2013-08-23", 83, 7443, null, 69, 6713, null, 80, 6452, null, 68, 6325, null, 69, 6226, null, 68, 6160, null, 32, 5899, null, 32, 5810, null, 72, 5579, null, 50, 5230, null, 40, 4968, null, 19, 4924, null, 74, 26933, null, 36, 24095, null, 46, 20702, null, 58, 71728, null], ["2013-08-24", 82, null, null, 68, null, null, 79, null, null, 68, null, null, 71, null, null, 67, null, null, 31, null, null, 33, null, null, 72, null, null, 49, null, null, 39, null, null, 18, null, null, 74, null, null, 37, null, null, 45, null, null, 59, null, null], ["2013-08-25", 81, null, null, 67, null, null, 78, null, null, 69, null, null, 74, null, null, 69, null, null, 29, null, null, 34, null, null, 73, null, null, 49, null, null, 38, null, null, 19, null, null, 73, null, null, 38, null, null, 44, null, null, 61, null, null], ["2013-08-26", 79, null, null, 69, null, null, 77, null, null, 70, null, null, 76, null, null, 70, null, null, 28, null, null, 35, null, null, 75, null, null, 51, null, null, 40, null, null, 20, null, null, 72, null, null, 39, null, null, 43, null, null, 62, null, null], ["2013-08-27", 77, null, null, 68, null, null, 76, null, null, 71, null, null, 77, null, null, 68, null, null, 27, null, null, 34, null, null, 76, null, null, 52, null, null, 41, null, null, 22, null, null, 75, null, null, 41, null, null, 44, null, null, 61, null, null], ["2013-08-28", 76, null, null, 67, null, null, 74, null, null, 69, null, null, 78, null, null, 67, null, null, 26, null, null, 33, null, null, 77, null, null, 51, null, null, 43, null, null, 23, null, null, 76, null, null, 40, null, null, 44, null, null, 60, null, null], ["2013-08-29", 75, null, null, 66, null, null, 75, null, null, 68, null, null, 79, null, null, 66, null, null, 25, null, null, 32, null, null, 76, null, null, 50, null, null, 41, null, null, 21, null, null, 77, null, null, 41, null, null, 45, null, null, 61, null, null], ["2013-08-30", 73, 7443, null, 65, 6713, null, 77, 6452, null, 70, 6325, null, 81, 6226, null, 65, 6160, null, 24, 5899, null, 36, 5810, null, 78, 5579, null, 49, 5230, null, 42, 4968, null, 23, 4924, null, 82, 26933, null, 42, 24095, null, 43, 20702, null, 63, 71729, null], ["2013-08-31", 70, null, null, 67, null, null, 76, null, null, 72, null, null, 80, null, null, 64, null, null, 22, null, null, 35, null, null, 77, null, null, 48, null, null, 40, null, null, 24, null, null, 81, null, null, 42, null, null, 41, null, null, 64, null, null], ["2013-09-01", 69, null, null, 68, null, null, 75, null, null, 70, null, null, 82, null, null, 65, null, null, 20, null, null, 34, null, null, 76, null, null, 50, null, null, 39, null, null, 25, null, null, 80, null, null, 43, null, null, 40, null, null, 65, null, null], ["2013-09-02", 63, null, null, 70, null, null, 73, null, null, 69, null, null, 85, null, null, 67, null, null, 19, null, null, 36, null, null, 79, null, null, 51, null, null, 40, null, null, 26, null, null, 79, null, null, 44, null, null, 41, null, null, 67, null, null], ["2013-09-03", 62, null, null, 69, null, null, 74, null, null, 68, null, null, 86, null, null, 68, null, null, 18, null, null, 37, null, null, 78, null, null, 53, null, null, 42, null, null, 24, null, null, 82, null, null, 46, null, null, 43, null, null, 65, null, null], ["2013-09-04", 61, null, null, 67, null, null, 75, null, null, 67, null, null, 84, null, null, 69, null, null, 17, null, null, 35, null, null, 75, null, null, 52, null, null, 43, null, null, 23, null, null, 83, null, null, 44, null, null, 42, null, null, 64, null, null], ["2013-09-05", 59, null, null, 66, null, null, 77, null, null, 66, null, null, 83, null, null, 70, null, null, 16, null, null, 34, null, null, 75, null, null, 51, null, null, 41, null, null, 23, null, null, 82, null, null, 45, null, null, 41, null, null, 67, null, null], ["2013-09-06", 57, 7443, null, 65, 6713, null, 78, 6452, null, 66, 6325, null, 82, 6226, null, 72, 6160, null, 18, 5899, null, 34, 5810, null, 74, 5579, null, 53, 5230, null, 43, 4968, null, 25, 4924, null, 81, 26933, null, 47, 24095, null, 40, 20702, null, 69, 71728, null], ["2013-09-07", 55, null, null, 66, null, null, 78, null, null, 68, null, null, 83, null, null, 71, null, null, 17, null, null, 35, null, null, 76, null, null, 52, null, null, 44, null, null, 24, null, null, 80, null, null, 47, null, null, 40, null, null, 71, null, null], ["2013-09-08", 52, null, null, 68, null, null, 77, null, null, 69, null, null, 84, null, null, 70, null, null, 15, null, null, 36, null, null, 77, null, null, 51, null, null, 44, null, null, 23, null, null, 82, null, null, 48, null, null, 41, null, null, 70, null, null], ["2013-09-09", 51, null, null, 69, null, null, 76, null, null, 71, null, null, 86, null, null, 72, null, null, 14, null, null, 37, null, null, 78, null, null, 52, null, null, 45, null, null, 25, null, null, 83, null, null, 49, null, null, 41, null, null, 72, null, null], ["2013-09-10", 50, null, null, 70, null, null, 75, null, null, 68, null, null, 85, null, null, 73, null, null, 14, null, null, 35, null, null, 76, null, null, 54, null, null, 46, null, null, 26, null, null, 84, null, null, 47, null, null, 44, null, null, 73, null, null], ["2013-09-11", 49, null, null, 71, null, null, 73, null, null, 66, null, null, 83, null, null, 71, null, null, 13, null, null, 35, null, null, 75, null, null, 53, null, null, 45, null, null, 27, null, null, 82, null, null, 48, null, null, 43, null, null, 71, null, null], ["2013-09-12", 48, null, null, 72, null, null, 74, null, null, 65, null, null, 82, null, null, 70, null, null, 16, null, null, 34, null, null, 74, null, null, 52, null, null, 44, null, null, 25, null, null, 81, null, null, 49, null, null, 42, null, null, 71, null, null], ["2013-09-13", 46, 7443, null, 73, 6713, null, 76, 6452, null, 61, 6325, null, 81, 6226, null, 68, 6160, null, 17, 5899, null, 38, 5810, null, 72, 5579, null, 51, 5230, null, 45, 4968, null, 24, 4924, null, 80, 26933, null, 51, 24095, null, 43, 20702, null, 74, 71729, null], ["2013-09-14", 43, null, null, 74, null, null, 78, null, null, 62, null, null, 78, null, null, 67, null, null, 16, null, null, 37, null, null, 71, null, null, 51, null, null, 46, null, null, 23, null, null, 79, null, null, 50, null, null, 41, null, null, 73, null, null], ["2013-09-15", 41, null, null, 77, null, null, 77, null, null, 64, null, null, 79, null, null, 66, null, null, 18, null, null, 36, null, null, 73, null, null, 52, null, null, 46, null, null, 22, null, null, 81, null, null, 51, null, null, 42, null, null, 72, null, null], ["2013-09-16", 39, null, null, 78, null, null, 76, null, null, 65, null, null, 80, null, null, 68, null, null, 19, null, null, 38, null, null, 75, null, null, 54, null, null, 47, null, null, 24, null, null, 82, null, null, 52, null, null, 43, null, null, 71, null, null], ["2013-09-17", 37, null, null, 77, null, null, 75, null, null, 66, null, null, 79, null, null, 69, null, null, 17, null, null, 39, null, null, 76, null, null, 55, null, null, 48, null, null, 25, null, null, 83, null, null, 52, null, null, 45, null, null, 70, null, null], ["2013-09-18", 36, null, null, 76, null, null, 74, null, null, 65, null, null, 78, null, null, 67, null, null, 16, null, null, 38, null, null, 77, null, null, 54, null, null, 47, null, null, 25, null, null, 84, null, null, 53, null, null, 46, null, null, 68, null, null], ["2013-09-19", 35, null, null, 75, null, null, 75, null, null, 64, null, null, 77, null, null, 66, null, null, 15, null, null, 37, null, null, 76, null, null, 51, null, null, 46, null, null, 23, null, null, 82, null, null, 54, null, null, 47, null, null, 67, null, null], ["2013-09-20", 33, 7443, null, 75, 6713, null, 77, 6452, null, 64, 6325, null, 78, 6226, null, 65, 6160, null, 18, 5899, null, 36, 5810, null, 75, 5579, null, 50, 5230, null, 48, 4968, null, 21, 4924, null, 81, 26933, null, 55, 24095, null, 48, 20702, null, 69, 71730, null], ["2013-09-21", 34, null, null, 76, null, null, 76, null, null, 65, null, null, 75, null, null, 64, null, null, 17, null, null, 35, null, null, 74, null, null, 49, null, null, 48, null, null, 22, null, null, 83, null, null, 54, null, null, 47, null, null, 68, null, null], ["2013-09-22", 32, null, null, 78, null, null, 74, null, null, 66, null, null, 76, null, null, 63, null, null, 16, null, null, 35, null, null, 73, null, null, 48, null, null, 49, null, null, 22, null, null, 84, null, null, 55, null, null, 48, null, null, 67, null, null], ["2013-09-23", 33, null, null, 79, null, null, 75, null, null, 67, null, null, 75, null, null, 62, null, null, 16, null, null, 36, null, null, 75, null, null, 50, null, null, 50, null, null, 23, null, null, 85, null, null, 56, null, null, 49, null, null, 65, null, null], ["2013-09-24", 45, null, null, 78, null, null, 75, null, null, 65, null, null, 74, null, null, 61, null, null, 15, null, null, 37, null, null, 76, null, null, 51, null, null, 52, null, null, 24, null, null, 83, null, null, 57, null, null, 51, null, null, 64, null, null], ["2013-09-25", 48, null, null, 78, null, null, 77, null, null, 64, null, null, 72, null, null, 60, null, null, 15, null, null, 38, null, null, 77, null, null, 52, null, null, 53, null, null, 23, null, null, 82, null, null, 59, null, null, 50, null, null, 61, null, null], ["2013-09-26", 51, null, null, 77, null, null, 76, null, null, 63, null, null, 69, null, null, 61, null, null, 16, null, null, 39, null, null, 77, null, null, 51, null, null, 51, null, null, 21, null, null, 81, null, null, 61, null, null, 49, null, null, 60, null, null], ["2013-09-27", 53, 7443, null, 76, 6713, null, 78, 6452, null, 63, 6325, null, 68, 6226, null, 63, 6160, null, 17, 5899, null, 38, 5810, null, 78, 5579, null, 50, 5230, null, 51, 4968, null, 23, 4924, null, 79, 26933, null, 61, 24095, null, 51, 20702, null, 63, 71729, null], ["2013-09-28", 56, null, null, 75, null, null, 79, null, null, 64, null, null, 70, null, null, 62, null, null, 16, null, null, 37, null, null, 77, null, null, 49, null, null, 50, null, null, 21, null, null, 78, null, null, 60, null, null, 51, null, null, 64, null, null], ["2013-09-29", 58, null, null, 74, null, null, 78, null, null, 65, null, null, 71, null, null, 64, null, null, 15, null, null, 36, null, null, 76, null, null, 51, null, null, 49, null, null, 20, null, null, 77, null, null, 62, null, null, 50, null, null, 62, null, null], ["2013-09-30", 59, null, null, 75, null, null, 76, null, null, 66, null, null, 72, null, null, 65, null, null, 16, null, null, 34, null, null, 75, null, null, 52, null, null, 48, null, null, 20, null, null, 81, null, null, 61, null, null, 50, null, null, 60, null, null], ["2013-10-01", 60, null, null, 77, null, null, 77, null, null, 64, null, null, 73, null, null, 63, null, null, 31, null, null, 33, null, null, 77, null, null, 54, null, null, 48, null, null, 22, null, null, 82, null, null, 60, null, null, 49, null, null, 59, null, null], ["2013-10-02", 63, null, null, 75, null, null, 75, null, null, 63, null, null, 70, null, null, 62, null, null, 34, null, null, 35, null, null, 78, null, null, 54, null, null, 47, null, null, 23, null, null, 80, null, null, 58, null, null, 49, null, null, 57, null, null], ["2013-10-03", 65, null, null, 76, null, null, 76, null, null, 63, null, null, 71, null, null, 62, null, null, 35, null, null, 34, null, null, 77, null, null, 52, null, null, 46, null, null, 24, null, null, 79, null, null, 59, null, null, 48, null, null, 56, null, null], ["2013-10-04", 67, 7443, null, 79, 6713, null, 78, 6452, null, 65, 6325, null, 72, 6226, null, 61, 6160, null, 36, 5899, null, 35, 5810, null, 76, 5579, null, 53, 5230, null, 46, 4968, null, 25, 4924, null, 81, 26933, null, 60, 24095, null, 51, 20702, null, 58, 71729, null], ["2013-10-05", 69, null, null, 79, null, null, 79, null, null, 64, null, null, 73, null, null, 59, null, null, 38, null, null, 34, null, null, 75, null, null, 51, null, null, 45, null, null, 26, null, null, 80, null, null, 58, null, null, 49, null, null, 59, null, null], ["2013-10-06", 70, null, null, 78, null, null, 78, null, null, 63, null, null, 74, null, null, 58, null, null, 40, null, null, 33, null, null, 74, null, null, 50, null, null, 48, null, null, 26, null, null, 79, null, null, 59, null, null, 50, null, null, 60, null, null], ["2013-10-07", 71, null, null, 77, null, null, 77, null, null, 61, null, null, 76, null, null, 60, null, null, 41, null, null, 31, null, null, 73, null, null, 52, null, null, 47, null, null, 25, null, null, 78, null, null, 61, null, null, 50, null, null, 61, null, null], ["2013-10-08", 74, null, null, 76, null, null, 76, null, null, 60, null, null, 77, null, null, 62, null, null, 42, null, null, 29, null, null, 75, null, null, 53, null, null, 46, null, null, 24, null, null, 77, null, null, 60, null, null, 51, null, null, 62, null, null], ["2013-10-09", 76, null, null, 75, null, null, 74, null, null, 61, null, null, 74, null, null, 63, null, null, 41, null, null, 30, null, null, 76, null, null, 53, null, null, 45, null, null, 23, null, null, 76, null, null, 59, null, null, 49, null, null, 62, null, null], ["2013-10-10", 78, null, null, 76, null, null, 75, null, null, 62, null, null, 75, null, null, 61, null, null, 40, null, null, 29, null, null, 74, null, null, 52, null, null, 44, null, null, 22, null, null, 75, null, null, 58, null, null, 48, null, null, 63, null, null], ["2013-10-11", 82, 7443, null, 78, 6713, null, 77, 6452, null, 59, 6325, null, 77, 6226, null, 63, 6160, null, 42, 5899, null, 32, 5810, null, 72, 5579, null, 51, 5230, null, 44, 4968, null, 23, 4924, null, 79, 26933, null, 60, 24095, null, 49, 20702, null, 61, 71729, null], ["2013-10-12", 84, null, null, 80, null, null, 79, null, null, 60, null, null, 78, null, null, 64, null, null, 42, null, null, 33, null, null, 71, null, null, 50, null, null, 43, null, null, 22, null, null, 80, null, null, 58, null, null, 48, null, null, 63, null, null], ["2013-10-13", 86, null, null, 79, null, null, 78, null, null, 59, null, null, 79, null, null, 65, null, null, 43, null, null, 35, null, null, 69, null, null, 51, null, null, 42, null, null, 21, null, null, 81, null, null, 58, null, null, 49, null, null, 64, null, null], ["2013-10-14", 87, null, null, 78, null, null, 77, null, null, 60, null, null, 81, null, null, 64, null, null, 44, null, null, 36, null, null, 70, null, null, 52, null, null, 40, null, null, 20, null, null, 82, null, null, 59, null, null, 51, null, null, 67, null, null], ["2013-10-15", 88, null, null, 78, null, null, 76, null, null, 61, null, null, 80, null, null, 62, null, null, 46, null, null, 34, null, null, 72, null, null, 52, null, null, 41, null, null, 21, null, null, 81, null, null, 57, null, null, 52, null, null, 68, null, null], ["2013-10-16", 87, null, null, 76, null, null, 75, null, null, 58, null, null, 77, null, null, 63, null, null, 45, null, null, 33, null, null, 73, null, null, 51, null, null, 42, null, null, 22, null, null, 80, null, null, 56, null, null, 52, null, null, 66, null, null], ["2013-10-17", 88, null, null, 77, null, null, 76, null, null, 59, null, null, 78, null, null, 64, null, null, 44, null, null, 33, null, null, 73, null, null, 50, null, null, 39, null, null, 19, null, null, 79, null, null, 55, null, null, 53, null, null, 64, null, null], ["2013-10-18", 90, 7443, null, 79, 6713, null, 77, 6452, null, 60, 6325, null, 80, 6226, null, 65, 6160, null, 46, 5899, null, 36, 5810, null, 75, 5579, null, 49, 5230, null, 41, 4968, null, 21, 4924, null, 76, 26933, null, 57, 24095, null, 52, 20702, null, 65, 71729, null], ["2013-10-19", 88, null, null, 81, null, null, 78, null, null, 59, null, null, 82, null, null, 66, null, null, 49, null, null, 35, null, null, 76, null, null, 50, null, null, 40, null, null, 19, null, null, 75, null, null, 56, null, null, 51, null, null, 61, null, null], ["2013-10-20", 88, null, null, 82, null, null, 79, null, null, 62, null, null, 83, null, null, 67, null, null, 50, null, null, 37, null, null, 77, null, null, 51, null, null, 41, null, null, 22, null, null, 76, null, null, 58, null, null, 52, null, null, 62, null, null], ["2013-10-21", 87, null, null, 83, null, null, 78, null, null, 64, null, null, 84, null, null, 69, null, null, 48, null, null, 39, null, null, 78, null, null, 52, null, null, 39, null, null, 23, null, null, 78, null, null, 60, null, null, 51, null, null, 63, null, null]];
			data['2'].summaryData = {
				id : 0,
				name : 'Nurture by Persona',
				s : 645569,
				o : 200,
				c : 150,
				u : 10607,
				e : 63,
				r : 0,
				rs : 0,
				w : 0,
				m : 200,
				ex : 0,
				p : 0,
				ch : 243727,
				hasActivity : 0,
				tracks : [{
					id : 2,
					name : 'Executive',
					s : 242401,
					o : 50,
					c : 30,
					u : 6288,
					e : 78,
					r : 0,
					rs : 0,
					w : 0,
					ch : 243727,
					m : 200,
					ex : 0,
					p : 0,
					hasActivity : 0,
					contents : [{
						id : 1,
						assetId : 3026,
						assetType : 'Email',
						name : '1. The Business Value',
						mod : '2013-09-19 13:18:05',
						s : 66990,
						e : 87,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 2,
						assetId : 3003,
						assetType : 'Email',
						name : '2. A Case Study',
						mod : '2013-06-01 13:18:05',
						s : 60418,
						e : 83,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 3,
						assetId : 3030,
						assetType : 'Email',
						name : '3. An ROI Calculator',
						mod : '2013-07-12 13:18:05',
						s : 58064,
						e : 78,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 4,
						assetId : 4033,
						assetType : 'Email',
						name : '4. Maximize Productivity',
						mod : '2013-06-01 13:18:05',
						s : 56929,
						e : 64,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}]
				}, {
					id : 3,
					name : 'Practitioner',
					s : 216853,
					o : 50,
					c : 30,
					u : 1445,
					e : 60,
					r : 0,
					rs : 0,
					w : 0,
					ch : 329727,
					m : 200,
					ex : 0,
					p : 0,
					hasActivity : 0,
					contents : [{
						id : 5,
						assetId : 3026,
						assetType : 'Email',
						name : '1. A Definitive Guide',
						mod : '2013-06-01 13:18:05',
						s : 56030,
						e : 84,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 6,
						assetId : 3003,
						assetType : 'Email',
						name : '2. A Buyers Guide',
						mod : '2013-06-01 13:18:05',
						s : 55443,
						e : 69,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 7,
						assetId : 3030,
						assetType : 'Email',
						name : '3. An Infographic',
						mod : '2013-07-12 13:18:05',
						s : 53089,
						e : 48,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 8,
						assetId : 4033,
						assetType : 'Email',
						name : '4. Accelerate Your Career',
						mod : '2013-06-01 13:18:05',
						s : 52291,
						e : 39,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}]
				}, {
					id : 4,
					name : 'Technologist',
					s : 186135,
					o : 50,
					c : 30,
					u : 3875,
					e : 51,
					r : 0,
					rs : 0,
					w : 0,
					ch : 415727,
					m : 200,
					ex : 0,
					p : 0,
					hasActivity : 0,
					contents : [{
						id : 9,
						assetId : 3026,
						assetType : 'Email',
						name : '1. A Developers Blog Post',
						mod : '2013-06-01 13:18:05',
						s : 50214,
						e : 78,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 10,
						assetId : 3003,
						assetType : 'Email',
						name : '2. The Top 5 API Use Cases',
						mod : '2013-06-01 13:18:05',
						s : 47069,
						e : 52,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 11,
						assetId : 3030,
						assetType : 'Email',
						name : '3. The Setup Guide',
						mod : '2013-07-12 13:18:05',
						s : 44715,
						e : 41,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 12,
						assetId : 4033,
						assetType : 'Email',
						name : '4. The Dev Community',
						mod : '2013-06-01 13:18:05',
						s : 44317,
						e : 32,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}]
				}]
			};
			data['2'].contentData = [{
				programId : 0,
				trackId : 2,
				contentId : 1,
				assetType : 'Email',
				appCompId : 3026,
				date : '2013-09-19',
				name : '1. The Business Value'
			}, {
				programId : 0,
				trackId : 2,
				contentId : 2,
				assetType : 'Email',
				appCompId : 3003,
				date : '2013-06-23',
				name : '2. A Case Study'
			}, {
				programId : 0,
				trackId : 2,
				contentId : 3,
				assetType : 'Email',
				appCompId : 3030,
				date : '2013-06-16',
				name : '3. An ROI Calculator'
			}, {
				programId : 0,
				trackId : 2,
				contentId : 4,
				assetType : 'Email',
				appCompId : 4033,
				date : '2013-06-27',
				name : '4. Maximize Productivity'
			}, {
				programId : 0,
				trackId : 3,
				contentId : 5,
				assetType : 'Email',
				appCompId : 3026,
				date : '2013-08-27',
				name : '1. A Definitive Guide'
			}, {
				programId : 0,
				trackId : 3,
				contentId : 6,
				assetType : 'Email',
				appCompId : 3003,
				date : '2013-06-23',
				name : '2. A Buyers Guide'
			}, {
				programId : 0,
				trackId : 3,
				contentId : 7,
				assetType : 'Email',
				appCompId : 3030,
				date : '2013-09-26',
				name : '3. An Infographic'
			}, {
				programId : 0,
				trackId : 3,
				contentId : 8,
				assetType : 'Email',
				appCompId : 4033,
				date : '2013-06-27',
				name : '4. Accelerate Your Career'
			}, {
				programId : 0,
				trackId : 4,
				contentId : 9,
				assetType : 'Email',
				appCompId : 3026,
				date : '2013-06-30',
				name : '1. A Developers Blog Post'
			}, {
				programId : 0,
				trackId : 4,
				contentId : 10,
				assetType : 'Email',
				appCompId : 3003,
				date : '2013-06-23',
				name : '2. The Top 5 API Use Cases'
			}, {
				programId : 0,
				trackId : 4,
				contentId : 11,
				assetType : 'Email',
				appCompId : 3030,
				date : '2013-06-16',
				name : '3. The Setup Guide'
			}, {
				programId : 0,
				trackId : 4,
				contentId : 12,
				assetType : 'Email',
				appCompId : 4033,
				date : '2013-06-27',
				name : '4. The Development Community'
			}];
			data['2'].exhaustionData = {
				id : 0,
				dt : exhaustionDate,
				"-4" : 645,
				"-3" : 1277,
				"-2" : 674,
				"-1" : 379,
				"0" : 924,
				"1" : 2331,
				"2" : 7062,
				"3" : 10304,
				"4" : 823,
				"5" : 8772,
				"6" : 11126,
				"7" : 11713,
				"8" : 21214,
				tracks : [{
					id : 2,
					dt : exhaustionDate,
					"-4" : 0,
					"-3" : 0,
					"-2" : 0,
					"-1" : 0,
					"0" : 645,
					"1" : 1135,
					"2" : 2354,
					"3" : 6572,
					"4" : 10254,
					"5" : 0,
					"6" : 0,
					"7" : 0,
					"8" : 0
				}, {
					id : 3,
					dt : exhaustionDate,
					"-4" : 132,
					"-3" : 525,
					"-2" : 87,
					"-1" : 54,
					"0" : 25,
					"1" : 798,
					"2" : 254,
					"3" : 587,
					"4" : 254,
					"5" : 0,
					"6" : 0,
					"7" : 0,
					"8" : 0
				}, {
					id : 4,
					dt : exhaustionDate,
					"-4" : 513,
					"-3" : 752,
					"-2" : 587,
					"-1" : 325,
					"0" : 254,
					"1" : 798,
					"2" : 3254,
					"3" : 4587,
					"4" : 1254,
					"5" : 0,
					"6" : 0,
					"7" : 0,
					"8" : 0
				}]
			};
			
			data['3'] = {};
			data['3'].trendData = {};
			data['3'].trendData.data_columns = ["date", "content_2_1_es", "content_2_1_sent", "content_2_1_r", "content_2_2_es", "content_2_2_sent", "content_2_2_r", "content_2_3_es", "content_2_3_sent", "content_2_3_r", "content_2_4_es", "content_2_4_sent", "content_2_4_r", "content_3_5_es", "content_3_5_sent", "content_3_5_r", "content_3_6_es", "content_3_6_sent", "content_3_6_r", "content_3_7_es", "content_3_7_sent", "content_3_7_r", "content_3_8_es", "content_3_8_sent", "content_3_8_r", "content_4_9_es", "content_4_9_sent", "content_4_9_r", "content_4_10_es", "content_4_10_sent", "content_4_10_r", "content_4_11_es", "content_4_11_sent", "content_4_11_r", "content_4_12_es", "content_4_12_sent", "content_4_12_r", "track_2_es", "track_2_sent", "track_2_r", "track_3_es", "track_3_sent", "track_3_r", "track_4_es", "track_4_sent", "track_4_r", "program_es", "program_sent", "program_r"];
			data['3'].trendData.data = [["2013-08-23", 83, 7443, null, 69, 6713, null, 80, 6452, null, 68, 6325, null, 69, 6226, null, 68, 6160, null, 32, 5899, null, 32, 5810, null, 72, 5579, null, 50, 5230, null, 40, 4968, null, 19, 4924, null, 74, 26933, null, 36, 24095, null, 46, 20702, null, 58, 71728, null], ["2013-08-24", 82, null, null, 68, null, null, 79, null, null, 68, null, null, 71, null, null, 67, null, null, 31, null, null, 33, null, null, 72, null, null, 49, null, null, 39, null, null, 18, null, null, 74, null, null, 37, null, null, 45, null, null, 59, null, null], ["2013-08-25", 81, null, null, 67, null, null, 78, null, null, 69, null, null, 74, null, null, 69, null, null, 29, null, null, 34, null, null, 73, null, null, 49, null, null, 38, null, null, 19, null, null, 73, null, null, 38, null, null, 44, null, null, 61, null, null], ["2013-08-26", 79, null, null, 69, null, null, 77, null, null, 70, null, null, 76, null, null, 70, null, null, 28, null, null, 35, null, null, 75, null, null, 51, null, null, 40, null, null, 20, null, null, 72, null, null, 39, null, null, 43, null, null, 62, null, null], ["2013-08-27", 77, null, null, 68, null, null, 76, null, null, 71, null, null, 77, null, null, 68, null, null, 27, null, null, 34, null, null, 76, null, null, 52, null, null, 41, null, null, 22, null, null, 75, null, null, 41, null, null, 44, null, null, 61, null, null], ["2013-08-28", 76, null, null, 67, null, null, 74, null, null, 69, null, null, 78, null, null, 67, null, null, 26, null, null, 33, null, null, 77, null, null, 51, null, null, 43, null, null, 23, null, null, 76, null, null, 40, null, null, 44, null, null, 60, null, null], ["2013-08-29", 75, null, null, 66, null, null, 75, null, null, 68, null, null, 79, null, null, 66, null, null, 25, null, null, 32, null, null, 76, null, null, 50, null, null, 41, null, null, 21, null, null, 77, null, null, 41, null, null, 45, null, null, 61, null, null], ["2013-08-30", 73, 7443, null, 65, 6713, null, 77, 6452, null, 70, 6325, null, 81, 6226, null, 65, 6160, null, 24, 5899, null, 36, 5810, null, 78, 5579, null, 49, 5230, null, 42, 4968, null, 23, 4924, null, 82, 26933, null, 42, 24095, null, 43, 20702, null, 63, 71729, null], ["2013-08-31", 70, null, null, 67, null, null, 76, null, null, 72, null, null, 80, null, null, 64, null, null, 22, null, null, 35, null, null, 77, null, null, 48, null, null, 40, null, null, 24, null, null, 81, null, null, 42, null, null, 41, null, null, 64, null, null], ["2013-09-01", 69, null, null, 68, null, null, 75, null, null, 70, null, null, 82, null, null, 65, null, null, 20, null, null, 34, null, null, 76, null, null, 50, null, null, 39, null, null, 25, null, null, 80, null, null, 43, null, null, 40, null, null, 65, null, null], ["2013-09-02", 63, null, null, 70, null, null, 73, null, null, 69, null, null, 85, null, null, 67, null, null, 19, null, null, 36, null, null, 79, null, null, 51, null, null, 40, null, null, 26, null, null, 79, null, null, 44, null, null, 41, null, null, 67, null, null], ["2013-09-03", 62, null, null, 69, null, null, 74, null, null, 68, null, null, 86, null, null, 68, null, null, 18, null, null, 37, null, null, 78, null, null, 53, null, null, 42, null, null, 24, null, null, 82, null, null, 46, null, null, 43, null, null, 65, null, null], ["2013-09-04", 61, null, null, 67, null, null, 75, null, null, 67, null, null, 84, null, null, 69, null, null, 17, null, null, 35, null, null, 75, null, null, 52, null, null, 43, null, null, 23, null, null, 83, null, null, 44, null, null, 42, null, null, 64, null, null], ["2013-09-05", 59, null, null, 66, null, null, 77, null, null, 66, null, null, 83, null, null, 70, null, null, 16, null, null, 34, null, null, 75, null, null, 51, null, null, 41, null, null, 23, null, null, 82, null, null, 45, null, null, 41, null, null, 67, null, null], ["2013-09-06", 57, 7443, null, 65, 6713, null, 78, 6452, null, 66, 6325, null, 82, 6226, null, 72, 6160, null, 18, 5899, null, 34, 5810, null, 74, 5579, null, 53, 5230, null, 43, 4968, null, 25, 4924, null, 81, 26933, null, 47, 24095, null, 40, 20702, null, 69, 71728, null], ["2013-09-07", 55, null, null, 66, null, null, 78, null, null, 68, null, null, 83, null, null, 71, null, null, 17, null, null, 35, null, null, 76, null, null, 52, null, null, 44, null, null, 24, null, null, 80, null, null, 47, null, null, 40, null, null, 71, null, null], ["2013-09-08", 52, null, null, 68, null, null, 77, null, null, 69, null, null, 84, null, null, 70, null, null, 15, null, null, 36, null, null, 77, null, null, 51, null, null, 44, null, null, 23, null, null, 82, null, null, 48, null, null, 41, null, null, 70, null, null], ["2013-09-09", 51, null, null, 69, null, null, 76, null, null, 71, null, null, 86, null, null, 72, null, null, 14, null, null, 37, null, null, 78, null, null, 52, null, null, 45, null, null, 25, null, null, 83, null, null, 49, null, null, 41, null, null, 72, null, null], ["2013-09-10", 50, null, null, 70, null, null, 75, null, null, 68, null, null, 85, null, null, 73, null, null, 14, null, null, 35, null, null, 76, null, null, 54, null, null, 46, null, null, 26, null, null, 84, null, null, 47, null, null, 44, null, null, 73, null, null], ["2013-09-11", 49, null, null, 71, null, null, 73, null, null, 66, null, null, 83, null, null, 71, null, null, 13, null, null, 35, null, null, 75, null, null, 53, null, null, 45, null, null, 27, null, null, 82, null, null, 48, null, null, 43, null, null, 71, null, null], ["2013-09-12", 48, null, null, 72, null, null, 74, null, null, 65, null, null, 82, null, null, 70, null, null, 16, null, null, 34, null, null, 74, null, null, 52, null, null, 44, null, null, 25, null, null, 81, null, null, 49, null, null, 42, null, null, 71, null, null], ["2013-09-13", 46, 7443, null, 73, 6713, null, 76, 6452, null, 61, 6325, null, 81, 6226, null, 68, 6160, null, 17, 5899, null, 38, 5810, null, 72, 5579, null, 51, 5230, null, 45, 4968, null, 24, 4924, null, 80, 26933, null, 51, 24095, null, 43, 20702, null, 74, 71729, null], ["2013-09-14", 43, null, null, 74, null, null, 78, null, null, 62, null, null, 78, null, null, 67, null, null, 16, null, null, 37, null, null, 71, null, null, 51, null, null, 46, null, null, 23, null, null, 79, null, null, 50, null, null, 41, null, null, 73, null, null], ["2013-09-15", 41, null, null, 77, null, null, 77, null, null, 64, null, null, 79, null, null, 66, null, null, 18, null, null, 36, null, null, 73, null, null, 52, null, null, 46, null, null, 22, null, null, 81, null, null, 51, null, null, 42, null, null, 72, null, null], ["2013-09-16", 39, null, null, 78, null, null, 76, null, null, 65, null, null, 80, null, null, 68, null, null, 19, null, null, 38, null, null, 75, null, null, 54, null, null, 47, null, null, 24, null, null, 82, null, null, 52, null, null, 43, null, null, 71, null, null], ["2013-09-17", 37, null, null, 77, null, null, 75, null, null, 66, null, null, 79, null, null, 69, null, null, 17, null, null, 39, null, null, 76, null, null, 55, null, null, 48, null, null, 25, null, null, 83, null, null, 52, null, null, 45, null, null, 70, null, null], ["2013-09-18", 36, null, null, 76, null, null, 74, null, null, 65, null, null, 78, null, null, 67, null, null, 16, null, null, 38, null, null, 77, null, null, 54, null, null, 47, null, null, 25, null, null, 84, null, null, 53, null, null, 46, null, null, 68, null, null], ["2013-09-19", 35, null, null, 75, null, null, 75, null, null, 64, null, null, 77, null, null, 66, null, null, 15, null, null, 37, null, null, 76, null, null, 51, null, null, 46, null, null, 23, null, null, 82, null, null, 54, null, null, 47, null, null, 67, null, null], ["2013-09-20", 33, 7443, null, 75, 6713, null, 77, 6452, null, 64, 6325, null, 78, 6226, null, 65, 6160, null, 18, 5899, null, 36, 5810, null, 75, 5579, null, 50, 5230, null, 48, 4968, null, 21, 4924, null, 81, 26933, null, 55, 24095, null, 48, 20702, null, 69, 71730, null], ["2013-09-21", 34, null, null, 76, null, null, 76, null, null, 65, null, null, 75, null, null, 64, null, null, 17, null, null, 35, null, null, 74, null, null, 49, null, null, 48, null, null, 22, null, null, 83, null, null, 54, null, null, 47, null, null, 68, null, null], ["2013-09-22", 32, null, null, 78, null, null, 74, null, null, 66, null, null, 76, null, null, 63, null, null, 16, null, null, 35, null, null, 73, null, null, 48, null, null, 49, null, null, 22, null, null, 84, null, null, 55, null, null, 48, null, null, 67, null, null], ["2013-09-23", 33, null, null, 79, null, null, 75, null, null, 67, null, null, 75, null, null, 62, null, null, 16, null, null, 36, null, null, 75, null, null, 50, null, null, 50, null, null, 23, null, null, 85, null, null, 56, null, null, 49, null, null, 65, null, null], ["2013-09-24", 45, null, null, 78, null, null, 75, null, null, 65, null, null, 74, null, null, 61, null, null, 15, null, null, 37, null, null, 76, null, null, 51, null, null, 52, null, null, 24, null, null, 83, null, null, 57, null, null, 51, null, null, 64, null, null], ["2013-09-25", 48, null, null, 78, null, null, 77, null, null, 64, null, null, 72, null, null, 60, null, null, 15, null, null, 38, null, null, 77, null, null, 52, null, null, 53, null, null, 23, null, null, 82, null, null, 59, null, null, 50, null, null, 61, null, null], ["2013-09-26", 51, null, null, 77, null, null, 76, null, null, 63, null, null, 69, null, null, 61, null, null, 16, null, null, 39, null, null, 77, null, null, 51, null, null, 51, null, null, 21, null, null, 81, null, null, 61, null, null, 49, null, null, 60, null, null], ["2013-09-27", 53, 7443, null, 76, 6713, null, 78, 6452, null, 63, 6325, null, 68, 6226, null, 63, 6160, null, 17, 5899, null, 38, 5810, null, 78, 5579, null, 50, 5230, null, 51, 4968, null, 23, 4924, null, 79, 26933, null, 61, 24095, null, 51, 20702, null, 63, 71729, null], ["2013-09-28", 56, null, null, 75, null, null, 79, null, null, 64, null, null, 70, null, null, 62, null, null, 16, null, null, 37, null, null, 77, null, null, 49, null, null, 50, null, null, 21, null, null, 78, null, null, 60, null, null, 51, null, null, 64, null, null], ["2013-09-29", 58, null, null, 74, null, null, 78, null, null, 65, null, null, 71, null, null, 64, null, null, 15, null, null, 36, null, null, 76, null, null, 51, null, null, 49, null, null, 20, null, null, 77, null, null, 62, null, null, 50, null, null, 62, null, null], ["2013-09-30", 59, null, null, 75, null, null, 76, null, null, 66, null, null, 72, null, null, 65, null, null, 16, null, null, 34, null, null, 75, null, null, 52, null, null, 48, null, null, 20, null, null, 81, null, null, 61, null, null, 50, null, null, 60, null, null], ["2013-10-01", 60, null, null, 77, null, null, 77, null, null, 64, null, null, 73, null, null, 63, null, null, 31, null, null, 33, null, null, 77, null, null, 54, null, null, 48, null, null, 22, null, null, 82, null, null, 60, null, null, 49, null, null, 59, null, null], ["2013-10-02", 63, null, null, 75, null, null, 75, null, null, 63, null, null, 70, null, null, 62, null, null, 34, null, null, 35, null, null, 78, null, null, 54, null, null, 47, null, null, 23, null, null, 80, null, null, 58, null, null, 49, null, null, 57, null, null], ["2013-10-03", 65, null, null, 76, null, null, 76, null, null, 63, null, null, 71, null, null, 62, null, null, 35, null, null, 34, null, null, 77, null, null, 52, null, null, 46, null, null, 24, null, null, 79, null, null, 59, null, null, 48, null, null, 56, null, null], ["2013-10-04", 67, 7443, null, 79, 6713, null, 78, 6452, null, 65, 6325, null, 72, 6226, null, 61, 6160, null, 36, 5899, null, 35, 5810, null, 76, 5579, null, 53, 5230, null, 46, 4968, null, 25, 4924, null, 81, 26933, null, 60, 24095, null, 51, 20702, null, 58, 71729, null], ["2013-10-05", 69, null, null, 79, null, null, 79, null, null, 64, null, null, 73, null, null, 59, null, null, 38, null, null, 34, null, null, 75, null, null, 51, null, null, 45, null, null, 26, null, null, 80, null, null, 58, null, null, 49, null, null, 59, null, null], ["2013-10-06", 70, null, null, 78, null, null, 78, null, null, 63, null, null, 74, null, null, 58, null, null, 40, null, null, 33, null, null, 74, null, null, 50, null, null, 48, null, null, 26, null, null, 79, null, null, 59, null, null, 50, null, null, 60, null, null], ["2013-10-07", 71, null, null, 77, null, null, 77, null, null, 61, null, null, 76, null, null, 60, null, null, 41, null, null, 31, null, null, 73, null, null, 52, null, null, 47, null, null, 25, null, null, 78, null, null, 61, null, null, 50, null, null, 61, null, null], ["2013-10-08", 74, null, null, 76, null, null, 76, null, null, 60, null, null, 77, null, null, 62, null, null, 42, null, null, 29, null, null, 75, null, null, 53, null, null, 46, null, null, 24, null, null, 77, null, null, 60, null, null, 51, null, null, 62, null, null], ["2013-10-09", 76, null, null, 75, null, null, 74, null, null, 61, null, null, 74, null, null, 63, null, null, 41, null, null, 30, null, null, 76, null, null, 53, null, null, 45, null, null, 23, null, null, 76, null, null, 59, null, null, 49, null, null, 62, null, null], ["2013-10-10", 78, null, null, 76, null, null, 75, null, null, 62, null, null, 75, null, null, 61, null, null, 40, null, null, 29, null, null, 74, null, null, 52, null, null, 44, null, null, 22, null, null, 75, null, null, 58, null, null, 48, null, null, 63, null, null], ["2013-10-11", 82, 7443, null, 78, 6713, null, 77, 6452, null, 59, 6325, null, 77, 6226, null, 63, 6160, null, 42, 5899, null, 32, 5810, null, 72, 5579, null, 51, 5230, null, 44, 4968, null, 23, 4924, null, 79, 26933, null, 60, 24095, null, 49, 20702, null, 61, 71729, null], ["2013-10-12", 84, null, null, 80, null, null, 79, null, null, 60, null, null, 78, null, null, 64, null, null, 42, null, null, 33, null, null, 71, null, null, 50, null, null, 43, null, null, 22, null, null, 80, null, null, 58, null, null, 48, null, null, 63, null, null], ["2013-10-13", 86, null, null, 79, null, null, 78, null, null, 59, null, null, 79, null, null, 65, null, null, 43, null, null, 35, null, null, 69, null, null, 51, null, null, 42, null, null, 21, null, null, 81, null, null, 58, null, null, 49, null, null, 64, null, null], ["2013-10-14", 87, null, null, 78, null, null, 77, null, null, 60, null, null, 81, null, null, 64, null, null, 44, null, null, 36, null, null, 70, null, null, 52, null, null, 40, null, null, 20, null, null, 82, null, null, 59, null, null, 51, null, null, 67, null, null], ["2013-10-15", 88, null, null, 78, null, null, 76, null, null, 61, null, null, 80, null, null, 62, null, null, 46, null, null, 34, null, null, 72, null, null, 52, null, null, 41, null, null, 21, null, null, 81, null, null, 57, null, null, 52, null, null, 68, null, null], ["2013-10-16", 87, null, null, 76, null, null, 75, null, null, 58, null, null, 77, null, null, 63, null, null, 45, null, null, 33, null, null, 73, null, null, 51, null, null, 42, null, null, 22, null, null, 80, null, null, 56, null, null, 52, null, null, 66, null, null], ["2013-10-17", 88, null, null, 77, null, null, 76, null, null, 59, null, null, 78, null, null, 64, null, null, 44, null, null, 33, null, null, 73, null, null, 50, null, null, 39, null, null, 19, null, null, 79, null, null, 55, null, null, 53, null, null, 64, null, null], ["2013-10-18", 90, 7443, null, 79, 6713, null, 77, 6452, null, 60, 6325, null, 80, 6226, null, 65, 6160, null, 46, 5899, null, 36, 5810, null, 75, 5579, null, 49, 5230, null, 41, 4968, null, 21, 4924, null, 76, 26933, null, 57, 24095, null, 52, 20702, null, 65, 71729, null], ["2013-10-19", 88, null, null, 81, null, null, 78, null, null, 59, null, null, 82, null, null, 66, null, null, 49, null, null, 35, null, null, 76, null, null, 50, null, null, 40, null, null, 19, null, null, 75, null, null, 56, null, null, 51, null, null, 61, null, null], ["2013-10-20", 88, null, null, 82, null, null, 79, null, null, 62, null, null, 83, null, null, 67, null, null, 50, null, null, 37, null, null, 77, null, null, 51, null, null, 41, null, null, 22, null, null, 76, null, null, 58, null, null, 52, null, null, 62, null, null], ["2013-10-21", 87, null, null, 83, null, null, 78, null, null, 64, null, null, 84, null, null, 69, null, null, 48, null, null, 39, null, null, 78, null, null, 52, null, null, 39, null, null, 23, null, null, 78, null, null, 60, null, null, 51, null, null, 63, null, null]];
			data['3'].summaryData = {
				id : 0,
				name : 'Nurture by Persona',
				s : 645569,
				o : 200,
				c : 150,
				u : 10607,
				e : 63,
				r : 0,
				rs : 0,
				w : 0,
				m : 200,
				ex : 0,
				p : 0,
				ch : 243727,
				hasActivity : 0,
				tracks : [{
					id : 2,
					name : 'Executive',
					s : 242401,
					o : 50,
					c : 30,
					u : 6288,
					e : 78,
					r : 0,
					rs : 0,
					w : 0,
					ch : 243727,
					m : 200,
					ex : 0,
					p : 0,
					hasActivity : 0,
					contents : [{
						id : 1,
						assetId : 3026,
						assetType : 'Email',
						name : '1. The Business Value',
						mod : '2013-09-19 13:18:05',
						s : 66990,
						e : 87,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 2,
						assetId : 3003,
						assetType : 'Email',
						name : '2. A Case Study',
						mod : '2013-06-01 13:18:05',
						s : 60418,
						e : 83,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 3,
						assetId : 3030,
						assetType : 'Email',
						name : '3. An ROI Calculator',
						mod : '2013-07-12 13:18:05',
						s : 58064,
						e : 78,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 4,
						assetId : 4033,
						assetType : 'Email',
						name : '4. Maximize Productivity',
						mod : '2013-06-01 13:18:05',
						s : 56929,
						e : 64,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}]
				}, {
					id : 3,
					name : 'Practitioner',
					s : 216853,
					o : 50,
					c : 30,
					u : 1445,
					e : 60,
					r : 0,
					rs : 0,
					w : 0,
					ch : 329727,
					m : 200,
					ex : 0,
					p : 0,
					hasActivity : 0,
					contents : [{
						id : 5,
						assetId : 3026,
						assetType : 'Email',
						name : '1. A Definitive Guide',
						mod : '2013-06-01 13:18:05',
						s : 56030,
						e : 84,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 6,
						assetId : 3003,
						assetType : 'Email',
						name : '2. A Buyers Guide',
						mod : '2013-06-01 13:18:05',
						s : 55443,
						e : 69,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 7,
						assetId : 3030,
						assetType : 'Email',
						name : '3. An Infographic',
						mod : '2013-07-12 13:18:05',
						s : 53089,
						e : 48,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 8,
						assetId : 4033,
						assetType : 'Email',
						name : '4. Accelerate Your Career',
						mod : '2013-06-01 13:18:05',
						s : 52291,
						e : 39,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}]
				}, {
					id : 4,
					name : 'Technologist',
					s : 186135,
					o : 50,
					c : 30,
					u : 3875,
					e : 51,
					r : 0,
					rs : 0,
					w : 0,
					ch : 415727,
					m : 200,
					ex : 0,
					p : 0,
					hasActivity : 0,
					contents : [{
						id : 9,
						assetId : 3026,
						assetType : 'Email',
						name : '1. A Developers Blog Post',
						mod : '2013-06-01 13:18:05',
						s : 50214,
						e : 78,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 10,
						assetId : 3003,
						assetType : 'Email',
						name : '2. The Top 5 API Use Cases',
						mod : '2013-06-01 13:18:05',
						s : 47069,
						e : 52,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 11,
						assetId : 3030,
						assetType : 'Email',
						name : '3. The Setup Guide',
						mod : '2013-07-12 13:18:05',
						s : 44715,
						e : 41,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 12,
						assetId : 4033,
						assetType : 'Email',
						name : '4. The Dev Community',
						mod : '2013-06-01 13:18:05',
						s : 44317,
						e : 32,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}]
				}]
			};
			data['3'].contentData = [{
				programId : 0,
				trackId : 2,
				contentId : 1,
				assetType : 'Email',
				appCompId : 3026,
				date : '2013-09-19',
				name : '1. The Business Value'
			}, {
				programId : 0,
				trackId : 2,
				contentId : 2,
				assetType : 'Email',
				appCompId : 3003,
				date : '2013-06-23',
				name : '2. A Case Study'
			}, {
				programId : 0,
				trackId : 2,
				contentId : 3,
				assetType : 'Email',
				appCompId : 3030,
				date : '2013-06-16',
				name : '3. An ROI Calculator'
			}, {
				programId : 0,
				trackId : 2,
				contentId : 4,
				assetType : 'Email',
				appCompId : 4033,
				date : '2013-06-27',
				name : '4. Maximize Productivity'
			}, {
				programId : 0,
				trackId : 3,
				contentId : 5,
				assetType : 'Email',
				appCompId : 3026,
				date : '2013-08-27',
				name : '1. A Definitive Guide'
			}, {
				programId : 0,
				trackId : 3,
				contentId : 6,
				assetType : 'Email',
				appCompId : 3003,
				date : '2013-06-23',
				name : '2. A Buyers Guide'
			}, {
				programId : 0,
				trackId : 3,
				contentId : 7,
				assetType : 'Email',
				appCompId : 3030,
				date : '2013-09-26',
				name : '3. An Infographic'
			}, {
				programId : 0,
				trackId : 3,
				contentId : 8,
				assetType : 'Email',
				appCompId : 4033,
				date : '2013-06-27',
				name : '4. Accelerate Your Career'
			}, {
				programId : 0,
				trackId : 4,
				contentId : 9,
				assetType : 'Email',
				appCompId : 3026,
				date : '2013-06-30',
				name : '1. A Developers Blog Post'
			}, {
				programId : 0,
				trackId : 4,
				contentId : 10,
				assetType : 'Email',
				appCompId : 3003,
				date : '2013-06-23',
				name : '2. The Top 5 API Use Cases'
			}, {
				programId : 0,
				trackId : 4,
				contentId : 11,
				assetType : 'Email',
				appCompId : 3030,
				date : '2013-06-16',
				name : '3. The Setup Guide'
			}, {
				programId : 0,
				trackId : 4,
				contentId : 12,
				assetType : 'Email',
				appCompId : 4033,
				date : '2013-06-27',
				name : '4. The Development Community'
			}];
			data['3'].exhaustionData = {
				id : 0,
				dt : exhaustionDate,
				"-4" : 645,
				"-3" : 1277,
				"-2" : 674,
				"-1" : 379,
				"0" : 924,
				"1" : 2331,
				"2" : 7062,
				"3" : 10304,
				"4" : 823,
				"5" : 8772,
				"6" : 11126,
				"7" : 11713,
				"8" : 21214,
				tracks : [{
					id : 2,
					dt : exhaustionDate,
					"-4" : 0,
					"-3" : 0,
					"-2" : 0,
					"-1" : 0,
					"0" : 645,
					"1" : 1135,
					"2" : 2354,
					"3" : 6572,
					"4" : 10254,
					"5" : 0,
					"6" : 0,
					"7" : 0,
					"8" : 0
				}, {
					id : 3,
					dt : exhaustionDate,
					"-4" : 132,
					"-3" : 525,
					"-2" : 87,
					"-1" : 54,
					"0" : 25,
					"1" : 798,
					"2" : 254,
					"3" : 587,
					"4" : 254,
					"5" : 0,
					"6" : 0,
					"7" : 0,
					"8" : 0
				}, {
					id : 4,
					dt : exhaustionDate,
					"-4" : 513,
					"-3" : 752,
					"-2" : 587,
					"-1" : 325,
					"0" : 254,
					"1" : 798,
					"2" : 3254,
					"3" : 4587,
					"4" : 1254,
					"5" : 0,
					"6" : 0,
					"7" : 0,
					"8" : 0
				}]
			};

			data['4'] = {};
			data['4'].trendData = {};												
			data['4'].trendData.data_columns = ["date", "content_619_5868_es", "content_619_5868_sent", "content_619_5868_r", "content_619_5869_es", "content_619_5869_sent", "content_619_5869_r", "content_619_5903_es", "content_619_5903_sent", "content_619_5903_r", "content_619_5904_es", "content_619_5904_sent", "content_619_5904_r", "content_619_5872_es", "content_619_5872_sent", "content_619_5872_r", "content_619_5905_es", "content_619_5905_sent", "content_619_5905_r", "content_681_5864_es", "content_681_5864_sent", "content_681_5864_r", "content_681_5867_es", "content_681_5867_sent", "content_681_5867_r", "content_681_5865_es", "content_681_5865_sent", "content_681_5865_r", "content_681_5866_es", "content_681_5866_sent", "content_681_5866_r", "content_4_11_es", "content_4_11_sent", "content_4_11_r", "content_4_12_es", "content_4_12_sent", "content_4_12_r", "track_619_es","track_619_sent","track_619_r","track_681_es","track_681_sent","track_681_r","track_4_es","track_4_sent","track_4_r","program_es","program_sent","program_r"];
			data['4'].trendData.data = [["2013-08-23", 83, 7443, null, 69, 6713, null, 80, 6452, null, 68, 6325, null, 69, 6226, null, 68, 6160, null, 32, 5899, null, 32, 5810, null, 72, 5579, null, 50, 5230, null, 40, 4968, null, 19, 4924, null, 74, 26933, null, 36, 24095, null, 46, 20702, null, 58, 71728, null], ["2013-08-24", 82, null, null, 68, null, null, 79, null, null, 68, null, null, 71, null, null, 67, null, null, 31, null, null, 33, null, null, 72, null, null, 49, null, null, 39, null, null, 18, null, null, 74, null, null, 37, null, null, 45, null, null, 59, null, null], ["2013-08-25", 81, null, null, 67, null, null, 78, null, null, 69, null, null, 74, null, null, 69, null, null, 29, null, null, 34, null, null, 73, null, null, 49, null, null, 38, null, null, 19, null, null, 73, null, null, 38, null, null, 44, null, null, 61, null, null], ["2013-08-26", 79, null, null, 69, null, null, 77, null, null, 70, null, null, 76, null, null, 70, null, null, 28, null, null, 35, null, null, 75, null, null, 51, null, null, 40, null, null, 20, null, null, 72, null, null, 39, null, null, 43, null, null, 62, null, null], ["2013-08-27", 77, null, null, 68, null, null, 76, null, null, 71, null, null, 77, null, null, 68, null, null, 27, null, null, 34, null, null, 76, null, null, 52, null, null, 41, null, null, 22, null, null, 75, null, null, 41, null, null, 44, null, null, 61, null, null], ["2013-08-28", 76, null, null, 67, null, null, 74, null, null, 69, null, null, 78, null, null, 67, null, null, 26, null, null, 33, null, null, 77, null, null, 51, null, null, 43, null, null, 23, null, null, 76, null, null, 40, null, null, 44, null, null, 60, null, null], ["2013-08-29", 75, null, null, 66, null, null, 75, null, null, 68, null, null, 79, null, null, 66, null, null, 25, null, null, 32, null, null, 76, null, null, 50, null, null, 41, null, null, 21, null, null, 77, null, null, 41, null, null, 45, null, null, 61, null, null], ["2013-08-30", 73, 7443, null, 65, 6713, null, 77, 6452, null, 70, 6325, null, 81, 6226, null, 65, 6160, null, 24, 5899, null, 36, 5810, null, 78, 5579, null, 49, 5230, null, 42, 4968, null, 23, 4924, null, 82, 26933, null, 42, 24095, null, 43, 20702, null, 63, 71729, null], ["2013-08-31", 70, null, null, 67, null, null, 76, null, null, 72, null, null, 80, null, null, 64, null, null, 22, null, null, 35, null, null, 77, null, null, 48, null, null, 40, null, null, 24, null, null, 81, null, null, 42, null, null, 41, null, null, 64, null, null], ["2013-09-01", 69, null, null, 68, null, null, 75, null, null, 70, null, null, 82, null, null, 65, null, null, 20, null, null, 34, null, null, 76, null, null, 50, null, null, 39, null, null, 25, null, null, 80, null, null, 43, null, null, 40, null, null, 65, null, null], ["2013-09-02", 63, null, null, 70, null, null, 73, null, null, 69, null, null, 85, null, null, 67, null, null, 19, null, null, 36, null, null, 79, null, null, 51, null, null, 40, null, null, 26, null, null, 79, null, null, 44, null, null, 41, null, null, 67, null, null], ["2013-09-03", 62, null, null, 69, null, null, 74, null, null, 68, null, null, 86, null, null, 68, null, null, 18, null, null, 37, null, null, 78, null, null, 53, null, null, 42, null, null, 24, null, null, 82, null, null, 46, null, null, 43, null, null, 65, null, null], ["2013-09-04", 61, null, null, 67, null, null, 75, null, null, 67, null, null, 84, null, null, 69, null, null, 17, null, null, 35, null, null, 75, null, null, 52, null, null, 43, null, null, 23, null, null, 83, null, null, 44, null, null, 42, null, null, 64, null, null], ["2013-09-05", 59, null, null, 66, null, null, 77, null, null, 66, null, null, 83, null, null, 70, null, null, 16, null, null, 34, null, null, 75, null, null, 51, null, null, 41, null, null, 23, null, null, 82, null, null, 45, null, null, 41, null, null, 67, null, null], ["2013-09-06", 57, 7443, null, 65, 6713, null, 78, 6452, null, 66, 6325, null, 82, 6226, null, 72, 6160, null, 18, 5899, null, 34, 5810, null, 74, 5579, null, 53, 5230, null, 43, 4968, null, 25, 4924, null, 81, 26933, null, 47, 24095, null, 40, 20702, null, 69, 71728, null], ["2013-09-07", 55, null, null, 66, null, null, 78, null, null, 68, null, null, 83, null, null, 71, null, null, 17, null, null, 35, null, null, 76, null, null, 52, null, null, 44, null, null, 24, null, null, 80, null, null, 47, null, null, 40, null, null, 71, null, null], ["2013-09-08", 52, null, null, 68, null, null, 77, null, null, 69, null, null, 84, null, null, 70, null, null, 15, null, null, 36, null, null, 77, null, null, 51, null, null, 44, null, null, 23, null, null, 82, null, null, 48, null, null, 41, null, null, 70, null, null], ["2013-09-09", 51, null, null, 69, null, null, 76, null, null, 71, null, null, 86, null, null, 72, null, null, 14, null, null, 37, null, null, 78, null, null, 52, null, null, 45, null, null, 25, null, null, 83, null, null, 49, null, null, 41, null, null, 72, null, null], ["2013-09-10", 50, null, null, 70, null, null, 75, null, null, 68, null, null, 85, null, null, 73, null, null, 14, null, null, 35, null, null, 76, null, null, 54, null, null, 46, null, null, 26, null, null, 84, null, null, 47, null, null, 44, null, null, 73, null, null], ["2013-09-11", 49, null, null, 71, null, null, 73, null, null, 66, null, null, 83, null, null, 71, null, null, 13, null, null, 35, null, null, 75, null, null, 53, null, null, 45, null, null, 27, null, null, 82, null, null, 48, null, null, 43, null, null, 71, null, null], ["2013-09-12", 48, null, null, 72, null, null, 74, null, null, 65, null, null, 82, null, null, 70, null, null, 16, null, null, 34, null, null, 74, null, null, 52, null, null, 44, null, null, 25, null, null, 81, null, null, 49, null, null, 42, null, null, 71, null, null], ["2013-09-13", 46, 7443, null, 73, 6713, null, 76, 6452, null, 61, 6325, null, 81, 6226, null, 68, 6160, null, 17, 5899, null, 38, 5810, null, 72, 5579, null, 51, 5230, null, 45, 4968, null, 24, 4924, null, 80, 26933, null, 51, 24095, null, 43, 20702, null, 74, 71729, null], ["2013-09-14", 43, null, null, 74, null, null, 78, null, null, 62, null, null, 78, null, null, 67, null, null, 16, null, null, 37, null, null, 71, null, null, 51, null, null, 46, null, null, 23, null, null, 79, null, null, 50, null, null, 41, null, null, 73, null, null], ["2013-09-15", 41, null, null, 77, null, null, 77, null, null, 64, null, null, 79, null, null, 66, null, null, 18, null, null, 36, null, null, 73, null, null, 52, null, null, 46, null, null, 22, null, null, 81, null, null, 51, null, null, 42, null, null, 72, null, null], ["2013-09-16", 39, null, null, 78, null, null, 76, null, null, 65, null, null, 80, null, null, 68, null, null, 19, null, null, 38, null, null, 75, null, null, 54, null, null, 47, null, null, 24, null, null, 82, null, null, 52, null, null, 43, null, null, 71, null, null], ["2013-09-17", 37, null, null, 77, null, null, 75, null, null, 66, null, null, 79, null, null, 69, null, null, 17, null, null, 39, null, null, 76, null, null, 55, null, null, 48, null, null, 25, null, null, 83, null, null, 52, null, null, 45, null, null, 70, null, null], ["2013-09-18", 36, null, null, 76, null, null, 74, null, null, 65, null, null, 78, null, null, 67, null, null, 16, null, null, 38, null, null, 77, null, null, 54, null, null, 47, null, null, 25, null, null, 84, null, null, 53, null, null, 46, null, null, 68, null, null], ["2013-09-19", 35, null, null, 75, null, null, 75, null, null, 64, null, null, 77, null, null, 66, null, null, 15, null, null, 37, null, null, 76, null, null, 51, null, null, 46, null, null, 23, null, null, 82, null, null, 54, null, null, 47, null, null, 67, null, null], ["2013-09-20", 33, 7443, null, 75, 6713, null, 77, 6452, null, 64, 6325, null, 78, 6226, null, 65, 6160, null, 18, 5899, null, 36, 5810, null, 75, 5579, null, 50, 5230, null, 48, 4968, null, 21, 4924, null, 81, 26933, null, 55, 24095, null, 48, 20702, null, 69, 71730, null], ["2013-09-21", 34, null, null, 76, null, null, 76, null, null, 65, null, null, 75, null, null, 64, null, null, 17, null, null, 35, null, null, 74, null, null, 49, null, null, 48, null, null, 22, null, null, 83, null, null, 54, null, null, 47, null, null, 68, null, null], ["2013-09-22", 32, null, null, 78, null, null, 74, null, null, 66, null, null, 76, null, null, 63, null, null, 16, null, null, 35, null, null, 73, null, null, 48, null, null, 49, null, null, 22, null, null, 84, null, null, 55, null, null, 48, null, null, 67, null, null], ["2013-09-23", 33, null, null, 79, null, null, 75, null, null, 67, null, null, 75, null, null, 62, null, null, 16, null, null, 36, null, null, 75, null, null, 50, null, null, 50, null, null, 23, null, null, 85, null, null, 56, null, null, 49, null, null, 65, null, null], ["2013-09-24", 45, null, null, 78, null, null, 75, null, null, 65, null, null, 74, null, null, 61, null, null, 15, null, null, 37, null, null, 76, null, null, 51, null, null, 52, null, null, 24, null, null, 83, null, null, 57, null, null, 51, null, null, 64, null, null], ["2013-09-25", 48, null, null, 78, null, null, 77, null, null, 64, null, null, 72, null, null, 60, null, null, 15, null, null, 38, null, null, 77, null, null, 52, null, null, 53, null, null, 23, null, null, 82, null, null, 59, null, null, 50, null, null, 61, null, null], ["2013-09-26", 51, null, null, 77, null, null, 76, null, null, 63, null, null, 69, null, null, 61, null, null, 16, null, null, 39, null, null, 77, null, null, 51, null, null, 51, null, null, 21, null, null, 81, null, null, 61, null, null, 49, null, null, 60, null, null], ["2013-09-27", 53, 7443, null, 76, 6713, null, 78, 6452, null, 63, 6325, null, 68, 6226, null, 63, 6160, null, 17, 5899, null, 38, 5810, null, 78, 5579, null, 50, 5230, null, 51, 4968, null, 23, 4924, null, 79, 26933, null, 61, 24095, null, 51, 20702, null, 63, 71729, null], ["2013-09-28", 56, null, null, 75, null, null, 79, null, null, 64, null, null, 70, null, null, 62, null, null, 16, null, null, 37, null, null, 77, null, null, 49, null, null, 50, null, null, 21, null, null, 78, null, null, 60, null, null, 51, null, null, 64, null, null], ["2013-09-29", 58, null, null, 74, null, null, 78, null, null, 65, null, null, 71, null, null, 64, null, null, 15, null, null, 36, null, null, 76, null, null, 51, null, null, 49, null, null, 20, null, null, 77, null, null, 62, null, null, 50, null, null, 62, null, null], ["2013-09-30", 59, null, null, 75, null, null, 76, null, null, 66, null, null, 72, null, null, 65, null, null, 16, null, null, 34, null, null, 75, null, null, 52, null, null, 48, null, null, 20, null, null, 81, null, null, 61, null, null, 50, null, null, 60, null, null], ["2013-10-01", 60, null, null, 77, null, null, 77, null, null, 64, null, null, 73, null, null, 63, null, null, 31, null, null, 33, null, null, 77, null, null, 54, null, null, 48, null, null, 22, null, null, 82, null, null, 60, null, null, 49, null, null, 59, null, null], ["2013-10-02", 63, null, null, 75, null, null, 75, null, null, 63, null, null, 70, null, null, 62, null, null, 34, null, null, 35, null, null, 78, null, null, 54, null, null, 47, null, null, 23, null, null, 80, null, null, 58, null, null, 49, null, null, 57, null, null], ["2013-10-03", 65, null, null, 76, null, null, 76, null, null, 63, null, null, 71, null, null, 62, null, null, 35, null, null, 34, null, null, 77, null, null, 52, null, null, 46, null, null, 24, null, null, 79, null, null, 59, null, null, 48, null, null, 56, null, null], ["2013-10-04", 67, 7443, null, 79, 6713, null, 78, 6452, null, 65, 6325, null, 72, 6226, null, 61, 6160, null, 36, 5899, null, 35, 5810, null, 76, 5579, null, 53, 5230, null, 46, 4968, null, 25, 4924, null, 81, 26933, null, 60, 24095, null, 51, 20702, null, 58, 71729, null], ["2013-10-05", 69, null, null, 79, null, null, 79, null, null, 64, null, null, 73, null, null, 59, null, null, 38, null, null, 34, null, null, 75, null, null, 51, null, null, 45, null, null, 26, null, null, 80, null, null, 58, null, null, 49, null, null, 59, null, null], ["2013-10-06", 70, null, null, 78, null, null, 78, null, null, 63, null, null, 74, null, null, 58, null, null, 40, null, null, 33, null, null, 74, null, null, 50, null, null, 48, null, null, 26, null, null, 79, null, null, 59, null, null, 50, null, null, 60, null, null], ["2013-10-07", 71, null, null, 77, null, null, 77, null, null, 61, null, null, 76, null, null, 60, null, null, 41, null, null, 31, null, null, 73, null, null, 52, null, null, 47, null, null, 25, null, null, 78, null, null, 61, null, null, 50, null, null, 61, null, null], ["2013-10-08", 74, null, null, 76, null, null, 76, null, null, 60, null, null, 77, null, null, 62, null, null, 42, null, null, 29, null, null, 75, null, null, 53, null, null, 46, null, null, 24, null, null, 77, null, null, 60, null, null, 51, null, null, 62, null, null], ["2013-10-09", 76, null, null, 75, null, null, 74, null, null, 61, null, null, 74, null, null, 63, null, null, 41, null, null, 30, null, null, 76, null, null, 53, null, null, 45, null, null, 23, null, null, 76, null, null, 59, null, null, 49, null, null, 62, null, null], ["2013-10-10", 78, null, null, 76, null, null, 75, null, null, 62, null, null, 75, null, null, 61, null, null, 40, null, null, 29, null, null, 74, null, null, 52, null, null, 44, null, null, 22, null, null, 75, null, null, 58, null, null, 48, null, null, 63, null, null], ["2013-10-11", 82, 7443, null, 78, 6713, null, 77, 6452, null, 59, 6325, null, 77, 6226, null, 63, 6160, null, 42, 5899, null, 32, 5810, null, 72, 5579, null, 51, 5230, null, 44, 4968, null, 23, 4924, null, 79, 26933, null, 60, 24095, null, 49, 20702, null, 61, 71729, null], ["2013-10-12", 84, null, null, 80, null, null, 79, null, null, 60, null, null, 78, null, null, 64, null, null, 42, null, null, 33, null, null, 71, null, null, 50, null, null, 43, null, null, 22, null, null, 80, null, null, 58, null, null, 48, null, null, 63, null, null], ["2013-10-13", 86, null, null, 79, null, null, 78, null, null, 59, null, null, 79, null, null, 65, null, null, 43, null, null, 35, null, null, 69, null, null, 51, null, null, 42, null, null, 21, null, null, 81, null, null, 58, null, null, 49, null, null, 64, null, null], ["2013-10-14", 87, null, null, 78, null, null, 77, null, null, 60, null, null, 81, null, null, 64, null, null, 44, null, null, 36, null, null, 70, null, null, 52, null, null, 40, null, null, 20, null, null, 82, null, null, 59, null, null, 51, null, null, 67, null, null], ["2013-10-15", 88, null, null, 78, null, null, 76, null, null, 61, null, null, 80, null, null, 62, null, null, 46, null, null, 34, null, null, 72, null, null, 52, null, null, 41, null, null, 21, null, null, 81, null, null, 57, null, null, 52, null, null, 68, null, null], ["2013-10-16", 87, null, null, 76, null, null, 75, null, null, 58, null, null, 77, null, null, 63, null, null, 45, null, null, 33, null, null, 73, null, null, 51, null, null, 42, null, null, 22, null, null, 80, null, null, 56, null, null, 52, null, null, 66, null, null], ["2013-10-17", 88, null, null, 77, null, null, 76, null, null, 59, null, null, 78, null, null, 64, null, null, 44, null, null, 33, null, null, 73, null, null, 50, null, null, 39, null, null, 19, null, null, 79, null, null, 55, null, null, 53, null, null, 64, null, null], ["2013-10-18", 90, 7443, null, 79, 6713, null, 77, 6452, null, 60, 6325, null, 80, 6226, null, 65, 6160, null, 46, 5899, null, 36, 5810, null, 75, 5579, null, 49, 5230, null, 41, 4968, null, 21, 4924, null, 76, 26933, null, 57, 24095, null, 52, 20702, null, 65, 71729, null], ["2013-10-19", 88, null, null, 81, null, null, 78, null, null, 59, null, null, 82, null, null, 66, null, null, 49, null, null, 35, null, null, 76, null, null, 50, null, null, 40, null, null, 19, null, null, 75, null, null, 56, null, null, 51, null, null, 61, null, null], ["2013-10-20", 88, null, null, 82, null, null, 79, null, null, 62, null, null, 83, null, null, 67, null, null, 50, null, null, 37, null, null, 77, null, null, 51, null, null, 41, null, null, 22, null, null, 76, null, null, 58, null, null, 52, null, null, 62, null, null], ["2013-10-21", 87, null, null, 83, null, null, 78, null, null, 64, null, null, 84, null, null, 69, null, null, 48, null, null, 39, null, null, 78, null, null, 52, null, null, 39, null, null, 23, null, null, 78, null, null, 60, null, null, 51, null, null, 63, null, null]];
			data['4'].summaryData = {
				id : 4216,
				name : 'Intelligent Nurturing',
				s : 645569,
				o : 200,
				c : 150,
				u : 10607,
				e : 69,
				r : 0,
				rs : 0,
				w : 0,
				m : 200,
				ex : 0,
				p : 0,
				ch : 243727,
				hasActivity : 0,
				tracks : [{
					id : 619,
					name : 'For Prospects',
					s : 242401,
					o : 50,
					c : 30,
					u : 6288,
					e : 78,
					r : 0,
					rs : 0,
					w : 0,
					ch : 243727,
					m : 200,
					ex : 0,
					p : 0,
					hasActivity : 0,
					contents : [{
						id : 5868,
						assetId : 9957,
						assetType : 'Email',
						name : '7 Rules to Live By for Creating Legendary Webinars',
						mod : '2013-09-20 13:18:05',
						s : 66990,
						e : 87,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 5869,
						assetId : 9974,
						assetType : 'Email',
						name : 'Driving Conversions Throughout the Customer Lifecycle',
						mod : '2013-06-01 13:18:05',
						s : 60418,
						e : 83,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 5903,
						assetId : 9968,
						assetType : 'Email',
						name : 'Graduating from Email to Engagement',
						mod : '2013-06-01 13:18:05',
						s : 58064,
						e : 78,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 5904,
						assetId : 10174,
						assetType : 'Email',
						name : 'Great New Analyst Report',
						mod : '2013-06-01 13:18:05',
						s : 56929,
						e : 64,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 5872,
						assetId : 9972,
						assetType : 'Email',
						name : 'How Social Media is Changing Leadership',
						mod : '2013-06-01 13:18:05',
						s : 56929,
						e : 64,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 5905,
						assetId : 9973,
						assetType : 'Email',
						name : 'Video Testimonial – Customer Case Study',
						mod : '2013-06-01 13:18:05',
						s : 56929,
						e : 64,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}]
				}, {
					id : 681,
					name : 'For Customers',
					s : 216853,
					o : 50,
					c : 30,
					u : 1445,
					e : 60,
					r : 0,
					rs : 0,
					w : 0,
					ch : 329727,
					m : 200,
					ex : 0,
					p : 0,
					hasActivity : 0,
					contents : [{
						id : 5864,
						assetId : 10171,
						assetType : 'Email',
						name : 'Jump into the Community',
						mod : '2013-06-01 13:18:05',
						s : 56030,
						e : 84,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 5867,
						assetId : 10169,
						assetType : 'Email',
						name : 'Tips for Getting Started Quickly',
						mod : '2013-06-01 13:18:05',
						s : 55443,
						e : 69,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 5865,
						assetId : 10173,
						assetType : 'Email',
						name : 'Refer-a-Friend',
						mod : '2013-09-26 13:18:05',
						s : 53089,
						e : 48,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}, {
						id : 5866,
						assetId : 10172,
						assetType : 'Email',
						name : 'Tell Us What You Think',
						mod : '2013-06-01 13:18:05',
						s : 52291,
						e : 39,
						arch : 0,
						deac : 0,
						hasActivity : 1
					}]				
				}]
			};
			data['4'].contentData = [{
				programId : 4216,
				trackId : 619,
				contentId : 5868,
				assetType : 'Email',
				appCompId : 9957,
				date : '2013-09-20',
				name : '7 Rules to Live By for Creating Legendary Webinars'
			}, {
				programId : 4216,
				trackId : 619,
				contentId : 5869,
				assetType : 'Email',
				appCompId : 9974,
				date : '2013-06-01',
				name : 'Driving Conversions Throughout the Customer Lifecycle'
			}, {
				programId : 4216,
				trackId : 619,
				contentId : 5903,
				assetType : 'Email',
				appCompId : 9968,
				date : '2013-09-03',
				name : 'Graduating from Email to Engagement'
			}, {
				programId : 4216,
				trackId : 619,
				contentId : 5904,
				assetType : 'Email',
				appCompId : 10174,
				date : '2013-06-01',
				name : 'Great New Analyst Report'
			}, {
				programId : 4216,
				trackId : 619,
				contentId : 5872,
				assetType : 'Email',
				appCompId : 9972,
				date : '2013-06-01',
				name : 'How Social Media is Changing Leadership'
			}, {
				programId : 4216,
				trackId : 619,
				contentId : 5905,
				assetType : 'Email',
				appCompId : 9973,
				date : '2013-06-01',
				name : 'Video Testimonial – Customer Case Study'
			}, {
				programId : 4216,
				trackId : 681,
				contentId : 5864,
				assetType : 'Email',
				appCompId : 10171,
				date : '2013-09-27',
				name : 'Jump into the Community'
			}, {
				programId : 4216,
				trackId : 681,
				contentId : 5867,
				assetType : 'Email',
				appCompId : 10169,
				date : '2013-06-01',
				name : 'Tips for Getting Started Quickly'
			}, {
				programId : 4216,
				trackId : 681,
				contentId : 5865,
				assetType : 'Email',
				appCompId : 10173,
				date : '2013-06-01',
				name : 'Refer-a-Friend'
			}, {
				programId : 4216,
				trackId : 681,
				contentId : 5866,
				assetType : 'Email',
				appCompId : 10172,
				date : '2013-06-01',
				name : 'Tell Us What You Think'
			}];
			data['4'].exhaustionData = {
				id : 4216,
				dt : exhaustionDate,
				"-4" : 0,
				"-3" : 98,
				"-2" : 319,
				"-1" : 74,
				"0" : 1899,
				"1" : 2331,
				"2" : 3062,
				"3" : 3772,
				"4" : 5323,
				"5" : 6632,
				"6" : 7126,
				"7" : 9713,
				"8" : 11214,
				tracks : [{
					id : 619,
					dt : exhaustionDate,
					"-4" : 0,
					"-3" : 0,
					"-2" : 0,
					"-1" : 0,
					"0" : 1130,
					"1" : 1562,
					"2" : 2016,
					"3" : 2528,
					"4" : 3567,
					"5" : 4444,
					"6" : 4775,
					"7" : 6508,
					"8" : 7514
				}, {
					id : 681,
					dt : exhaustionDate,
					"-4" : 0,
					"-3" : 98,
					"-2" : 319,
					"-1" : 743,
					"0" : 626,
					"1" : 769,
					"2" : 1010,
					"3" : 1244,
					"4" : 1756,
					"5" : 2188,
					"6" : 2351,
					"7" : 3205,
					"8" : 3700
				}]
			};
			break;			
		}
	}

	if (typeof(Mkt3) !== 'undefined') {
		Mkt3.controller.leadNurture.NurtureDashboard.prototype.dataPrep = function() {
			//console.log(this.summaryData.id);
			//console.log(this.summaryData.name);
			if (this.summaryData.name == 'A. Nurture by Persona') {
				x = data['1'];
			} else if (this.summaryData.name == 'B. Nurture by Stage') {
				x = data['2'];
			} else if (this.summaryData.name == 'C. Nurture by Interest') {
				x = data['3'];
			} else if (this.summaryData.name == 'Intelligent Nurturing') {
				x = data['4'];
			} else {
				x = data['0'];
			}
			switch(MktPage.savedState.subscriptionType) {
			case 'SMB - Spark':
			case 'SMB - Standard':
				this.summaryData = x.summaryData;
				this.progressionData = x.progressionData;
				this.exhaustionData = x.exhaustionData;

				var canvas = MktCanvas.getTabOrActive('maMarketingProgramHome');
				var selectTrackButton = canvas.gutterToolbar.getComponent('selectedTrackButton');
				selectTrackButton.menu.removeAll();
				this.loadTrackMenu();

				if (this.summaryData && this.summaryData.tracks) {
					for (var i = 0; i < this.summaryData.tracks.length; i++) {
						var trackId = this.summaryData.tracks[i].id;
						var contents = this.summaryData.tracks[i].contents;
						for (var j = 0; j < contents.length; j++) {
							contents[j].trackId = trackId;
						}
					}
				}
				break;
			case 'Dialog Edition':
			case 'SMB - Select':
			case 'Marketo Enterprise Customer':
				this.trendData.data_columns = x.trendData.data_columns;
				this.trendData.data = x.trendData.data;
				this.summaryData = x.summaryData;
				this.contentData = x.contentData;
				this.exhaustionData = x.exhaustionData;

				var canvas = MktCanvas.getTabOrActive('maMarketingProgramHome');
				var selectTrackButton = canvas.gutterToolbar.getComponent('selectedTrackButton');
				selectTrackButton.menu.removeAll();
				this.loadTrackMenu();

				if (this.summaryData && this.summaryData.tracks) {
					for (var i = 0; i < this.summaryData.tracks.length; i++) {
						var trackId = this.summaryData.tracks[i].id;
						var contents = this.summaryData.tracks[i].contents;
						for (var j = 0; j < contents.length; j++) {
							contents[j].trackId = trackId;
						}
					}
				}
				break;
			}
		}
	}
}