var b2bId = 1544,
    b2cId = 4168,
    b2bChannelX = "costs",
    b2bChannelY = "pipelinedollarsgen",
    b2bChannelZ = "none",
    b2bChannelW = "none",
    b2bProgramX = "costs",
    b2bProgramY = "newnames",
    b2bProgramZ = "none",
    b2bProgramW = "none",
    b2cChannelX = "costs",
    b2cChannelY = "newnames",
    b2cChannelZ = "none",
    b2cChannelW = "none",
    b2cProgramX = "costs",
    b2cProgramY = "newnamesuccesses",
    b2cProgramZ = "none",
    b2cProgramW = "none";
    

function loadProgramData() {
	var data = [];
	
    // Program Analyzer data
    data[b2bId] = {};
	data[b2bId].summarydata = {};
	data[b2bId].summarydata = {
		"programs" : [["Tradeshow", "", ""], ["Content", "", ""], ["Direct Mail", "", ""], ["Webinar", "", ""], ["Telemarketing", "", ""], ["Online Advertising", "", ""], ["Roadshow", "", ""], ["Social Media", "", ""], ["Blog", "", ""], ["List Purchase", "", ""]],
		"newnamecurrentsaleslead" : ["N/A", "N/A", "N/A", "N/A", "N/A", 0, "N/A", 0, "N/A", "N/A"],
		"multitouchrois" : [1.195849582172702, 0, 0.348, 1.5224102564102564, 0.20805555555555555, 1.4810079726651482, 0.35, 1.4218604651162792, 1.75435, 0.7666165413533834],
		"newnameeverpercentlead" : [null, null, null, 0.0011580775911986102, null, 0.00794912559618442, null, 0.0021945866861741038, 0.006785934608266502, 0.003469210754553339],
		"costperprospect" : ["N/A", "N/A", "N/A", 16714.285714285714, 6000, 3080.7017543859647, "N/A", 877.5510204081633, 500, 863.6363636363636],
		"newnameeverpercentpipeline" : [null, null, null, null, null, null, null, 0.000731528895391368, null, 0.0008673026886383347],
		"newnameeverpercentsaleslead" : [null, null, null, null, null, 0.001589825119236884, null, 0.000731528895391368, null, null],
		"multitouchrevenue" : [214655, 0, 6264, 178122, 7490, 260065, 0, 61140, 70174, 50980],
		"percentnewnamesuccesses" : [0.6002101392172314, 0, 1, 0.6004632310364795, 0.42857142857142855, 1, 0, 1, 1, 0.5993061578490894],
		"multitouchpipelinedollars" : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		"newnamecurrentlead" : ["N/A", "N/A", "N/A", 0, "N/A", 0, "N/A", 0, 1, 0],
		"newnameeversalesacceptedopportunity" : ["N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 2, 1, 3],
		"costpernewnamesuccesses" : [78.55579868708972, "Infinity", 41.37931034482759, 112.82545805207329, 857.1428571428571, 139.5866454689984, "Infinity", 31.455742501828823, 24.676125848241828, 96.23733719247467],
		"newnamecurrentpercentpipeline" : [null, null, null, null, null, null, null, 0, null, 0],
		"newnameeverpercentsalesacceptedopportunity" : [null, null, null, null, null, null, null, 0.001463057790782736, 0.0006169031462060457, 0.0026019080659150044],
		"costpernewnames" : [47.149986866298924, "Infinity", 41.37931034482759, 67.7475390851187, 367.3469387755102, 139.5866454689984, "Infinity", 31.455742501828823, 24.676125848241828, 57.67562879444926],
		"pipelinedollarsgen" : [976552, 50000, 42240, 175132, 31280, 452572, 100000, 114394, 228800, 62780],
		"successes" : [3931, 0, 500, 4026, 42, 2151, 0, 1562, 3600, 1208],
		"newnamecurrentcustomer" : ["N/A", "N/A", "N/A", "N/A", 2, 17, "N/A", 25, 35, 6],
		"newnameeverprospect" : ["N/A", "N/A", "N/A", 7, 6, 57, "N/A", 49, 80, 77],
		"newnames" : [3807, 0, 435, 1727, 98, 1258, 0, 1367, 1621, 1153],
		"costperpipeline" : ["N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 43000, "N/A", 66500],
		"multitouchpipelinedollarsgen" : [298392, 20000, 55704, 1900224, 54960, 416892, 20000, 102250, 582624, 49772],
		"percentsuccesses" : [0.6034694504144918, 0, 0.36496350364963503, 0.6, 0.32061068702290074, 0.849861714737258, 0, 0.6130298273155416, 1, 0.5939036381514258],
		"newnamecurrentpercentsaleslead" : [null, null, null, null, null, 0, null, 0, null, null],
		"newnameeverlead" : ["N/A", "N/A", "N/A", 2, "N/A", 10, "N/A", 3, 11, 4],
		"costpersalesacceptedopportunity" : ["N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 21500, 40000, 22166.666666666668],
		"newnamecurrentpipeline" : ["N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 0, "N/A", 0],
		"newnameeversaleslead" : ["N/A", "N/A", "N/A", "N/A", "N/A", 2, "N/A", 1, "N/A", "N/A"],
		"newnamecurrentprospect" : ["N/A", "N/A", "N/A", 1, 0, 2, "N/A", 4, 8, 7],
		"newnameeverpercentcustomer" : [null, null, null, null, 0.02040816326530612, 0.018282988871224166, null, 0.024140453547915143, 0.07217766810610735, 0.005203816131830009],
		"costpersuccesses" : [45.66268125158992, "Infinity", 36, 29.061102831594635, 857.1428571428571, 81.63644816364481, "Infinity", 27.528809218950062, 11.11111111111111, 55.049668874172184],
		"pipelinedollars" : [0, 0, 0, 0, 0, 55092, 0, 7680, 0, 0],
		"expectedrevenue" : [763784, 0, 29760, 519144, 9920, 330674, 0, 75178, 168080, 39180],
		"percentnewnames" : [0.5844335277863064, 0, 0.3175182481751825, 0.2573770491803279, 0.7480916030534351, 0.4970367443698143, 0, 0.5364992150706437, 0.4502777777777778, 0.5668633235004916],
		"newnameeverpipeline" : ["N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 1, "N/A", 1],
		"costpercustomer" : ["N/A", "N/A", "N/A", "N/A", 18000, 7634.782608695652, "N/A", 1303.030303030303, 341.88034188034186, 11083.333333333334],
		"rois" : [1.4976044568245126, 0, 0.37222222222222223, 1.676119658119658, 0.14, 1.5036560364464693, 0.75, 1.079860465116279, 1.60435, 0.7996992481203008],
		"costs" : [179500, 6000, 18000, 117000, 36000, 175600, 12000, 43000, 40000, 66500],
		"costpersaleslead" : ["N/A", "N/A", "N/A", "N/A", "N/A", 87800, "N/A", 43000, "N/A", "N/A"],
		"newnamecurrentpercentprospect" : [null, null, null, 0.0005790387955993051, 0, 0.001589825119236884, null, 0.002926115581565472, 0.004935225169648365, 0.006071118820468344],
		"newnamecurrentpercentlead" : [null, null, null, 0, null, 0, null, 0, 0.0006169031462060457, 0],
		"newnamecurrentpercentcustomer" : [null, null, null, null, 0.02040816326530612, 0.013513513513513514, null, 0.018288222384784197, 0.0215916101172116, 0.005203816131830009],
		"members" : [6514, 0, 1370, 6710, 131, 2531, 0, 2548, 3600, 2034],
		"revenue" : [268820, 0, 6700, 196106, 5040, 264042, 0, 46434, 64174, 53180],
		"costperlead" : ["N/A", "N/A", "N/A", 58500, "N/A", 17560, "N/A", 14333.333333333334, 3636.3636363636365, 16625],
		"newnamesuccesses" : [2285, 0, 435, 1037, 42, 1258, 0, 1367, 1621, 691],
		"multitouchexpectedrevenue" : [230224, 0, 41944, 1069240, 31040, 316114, 0, 72234, 450624, 34036],
		"costpermembers" : [27.556033159349095, "Infinity", 13.138686131386862, 17.43666169895678, 274.80916030534354, 69.37969182141445, "Infinity", 16.875981161695446, 11.11111111111111, 32.694198623402166],
		"newnameeverpercentprospect" : [null, null, null, 0.004053271569195136, 0.061224489795918366, 0.04531001589825119, null, 0.03584491587417703, 0.049352251696483655, 0.06678230702515178],
		"newnameevercustomer" : ["N/A", "N/A", "N/A", "N/A", 2, 23, "N/A", 33, 117, 6],
		"newnamecurrentpercentsalesacceptedopportunity" : [null, null, null, null, null, null, null, 0, 0, 0.0008673026886383347],
		"newnamecurrentsalesacceptedopportunity" : ["N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 0, 0, 1]
	};
	data[b2bId].detaildata = {};
	data[b2bId].detaildata = {
		"programs" : [["Webinar", "Lead Scoring Best Practices", "1009"], ["Online Advertising", "Emedia Sponsorship", "1015"], ["Tradeshow", "Paper Fest 12", "1031"], ["Content", "Revenue Cycle Analytics Whitepaper Download", "50007"], ["Online Advertising", "GOOG Adwords PPC", "1012"], ["Online Advertising", "B2B Marketer Revenue Rock Star Banner", "1013"], ["Content", "Get Sales Insight Whitepaper Download", "50005"], ["Tradeshow", "Printer World 12", "1031"], ["Content", "Marketing Lead Funnel Whitepaper Download", "50004"], ["Social Media", "Facebook Advertisement", "50001"], ["Social Media", "SlideShare", "1021"], ["Webinar", "MarketingProfs Secret Sauce", "1008"], ["Webinar", "MarketingProfs Business Marketer's Secrets", "1007"], ["Direct Mail", "Destination CRM", "1035"], ["Direct Mail", "Target Accounts", "1037"], ["Webinar", "Lead Generation Best Practices", "1010"], ["Webinar", "Revenue Masters Series", "1001"], ["Tradeshow", "Pulp and Paper Council", "1032"], ["Online Advertising", "Customer Think Sponsorship", "1014"], ["Webinar", "Focus.com B2B Buyer Webinar", "1006"], ["Social Media", "Twitter", "1023"], ["Webinar", "Content Marketing Best Practices", "1003"], ["Tradeshow", "Paper Virtual Show", "1024"], ["Tradeshow", "Global Forest & Paper Tradeshow", "1025"], ["Online Advertising", "Marketing Sherpa Sponsorship", "1017"], ["Webinar", "Program Attribution Analytics", "50010"], ["Social Media", "LinkedIn", "1020"], ["Telemarketing", "Prospecting", "1041"], ["Tradeshow", "Specialty Paper Conference", "1030"], ["Tradeshow", "Origami Expo", "1026"], ["Online Advertising", "Marketing Profs Sponsorship", "1018"], ["Content", "Lead to Opportunity Win Whitepaper Download", "50006"], ["Social Media", "Facebook", "1022"], ["Webinar", "Streamline Your Marketing and Sales Process", "50008"], ["Roadshow", "Rock Your Revenue", "50011"], ["Webinar", "ClickZ Revenue Masters", "1005"], ["List Purchase", "Demandbase", "1039"], ["Online Advertising", "Keyword - Lead Management", "50002"], ["Blog", "Revenue Marketers Blog", "1019"], ["Tradeshow", "International Paper Conference", "1028"], ["Tradeshow", "Paper Technology East", "1029"], ["Webinar", "Metrics that Matter Series (Topical)", "1002"], ["Online Advertising", "Sales 2.0 Blog Sponsorship", "1016"], ["Content", "Improve ROI Whitepaper Download", "50003"], ["Webinar", "How to Leverage Sales Insights to Close Deals Faster", "50009"], ["Direct Mail", "Marketing Forecasting", "1036"], ["List Purchase", "CMO World", "1040"], ["Webinar", "Online Event Best Practices", "1004"], ["Tradeshow", "American Paper Conference", "50012"], ["Webinar", "Nurturing Best Practices", "1011"], ["List Purchase", "Marketing Sherpa", "1038"]],
		"newnamecurrentsaleslead" : ["N/A", "N/A", "N/A", "N/A", 0, 0, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 0, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A"],
		"multitouchrois" : [0.157, 1.6691, 2.825, 0, 1.764888888888889, 1.2244444444444444, 0, 1, 0, 0, 1.1666666666666667, 4.5, 0, 0.1583, 0.6, 5.6, 0.6585666666666666, 1.2, 0.7512, 0, 1.065, 0.692, 0.051, 0.05, 1.05, 0, 1.1910714285714286, 0.49933333333333335, 1.3, 0.0877, 0.4545, 0, 2.4233333333333333, 0, 0, 1.5, 0.35, 0, 1.75435, 1.7, 0.61, 0, 2.0588, 0, 0, 0.3593, 0.6296296296296297, 5.1537, 0, 5.578, 1.26],
		"newnameeverpercentlead" : [null, null, null, null, 0.017777777777777778, 0.011560693641618497, null, null, null, null, 0.0053475935828877, null, null, null, null, null, 0.011428571428571429, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 0.021052631578947368, null, null, null, null, null, 0.006785934608266502, null, null, null, null, null, null, null, null, null, null, null, 0.005555555555555556],
		"costperprospect" : ["N/A", "N/A", "N/A", "N/A", 1836.734693877551, 5625, "N/A", "N/A", "N/A", "N/A", 240, "N/A", "N/A", "N/A", "N/A", "N/A", 4285.714285714285, "N/A", "N/A", "N/A", 3333.3333333333335, "N/A", "N/A", "N/A", "N/A", "N/A", 420, 2500, "N/A", "N/A", "N/A", "N/A", 12000, "N/A", "N/A", "N/A", "N/A", "N/A", 500, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 233.76623376623377],
		"newnameeverpercentpipeline" : [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 0.0024509803921568627, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 0.001388888888888889],
		"multitouchrevenue" : [785, 23368, 50850, 0, 158840, 55100, 0, 6000, 0, 0, 1400, 45000, 0, 1108, 3000, 28000, 19757, 24000, 4507, 0, 10650, 3460, 51, 500, 5250, 0, 20010, 7490, 13000, 789, 2500, 0, 29080, 0, 0, 12000, 2800, 0, 70174, 17000, 3965, 0, 10500, 0, 0, 2156, 25500, 41230, 0, 27890, 22680],
		"percentnewnamesuccesses" : [0.6012, 1, 0.1588235294117647, 0, 1, 1, 0, 0.6061, 0, 0, 1, 0.6, 0.5983, 1, 1, 0.6009, 0.6, 0.6014, 1, 0.6, 1, 0.5996, 0.6047, 0.5997, 1, 0, 1, 1, 0.5995, 0.6003, 1, 0, 1, 0, 0, 0.6009, 0.5985, 0, 1, 0.6, 0.5995, 0, 1, 0, 0, 1, 0.5976331360946746, 0.6087, 0, 0.6038, 0.6],
		"newnameeverpercentsaleslead" : [null, null, null, null, 0.0022222222222222222, 0.005780346820809248, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 0.0024509803921568627, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
		"multitouchpipelinedollars" : [0, 0, 0, 0, 0, 8320, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		"newnamecurrentlead" : ["N/A", "N/A", "N/A", "N/A", 0, 0, "N/A", "N/A", "N/A", "N/A", 0, "N/A", "N/A", "N/A", "N/A", "N/A", 0, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 0, "N/A", "N/A", "N/A", "N/A", "N/A", 1, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 0],
		"newnameeversalesacceptedopportunity" : ["N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 2, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 1, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 3],
		"costpernewnamesuccesses" : [48.08, 71.79, 333.3333333333333, "Infinity", 200, 260.11560693641616, "Infinity", 300, "Infinity", "Infinity", 6.4171122994652405, 107.53, 114.29, 40, 41.67, 35.71, 285.7142857142857, 114.29, 39.22, 235.29, 14.771048744460856, 18.25, 19.23, 21.46, 63.29, "Infinity", 41.1764705882353, 357.14285714285717, 42.55, 11.61, 70.51, "Infinity", 126.3157894736842, "Infinity", "Infinity", 57.14, 50.63, "Infinity", 24.676125848241828, 81.3, 26.97, "Infinity", 39.23, "Infinity", "Infinity", 42.86, 400.990099009901, 285.71, "Infinity", 156.25, 41.666666666666664],
		"newnameeverpercentsalesacceptedopportunity" : [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 0.004901960784313725, null, null, null, null, null, null, null, null, null, null, null, 0.0006169031462060457, null, null, null, null, null, null, null, null, null, null, null, 0.004166666666666667],
		"newnamecurrentpercentpipeline" : [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 0],
		"costpernewnames" : [28.9, 71.79, 52.94117647058823, "Infinity", 200, 260.11560693641616, "Infinity", 181.82, "Infinity", "Infinity", 6.4171122994652405, 64.52, 68.38, 40, 41.67, 21.46, 171.42857142857142, 68.73, 39.22, 141.18, 14.771048744460856, 10.94, 11.63, 12.87, 63.29, "Infinity", 41.1764705882353, 357.14285714285717, 25.51, 6.97, 70.51, "Infinity", 126.3157894736842, "Infinity", "Infinity", 34.33, 30.3, "Infinity", 24.676125848241828, 48.78, 16.17, "Infinity", 39.23, "Infinity", "Infinity", 42.86, 239.6449704142012, 173.91, "Infinity", 94.34, 25],
		"pipelinedollarsgen" : [81972, 110880, 114576, 0, 188152, 80880, 0, 29568, 0, 0, 13840, 73656, 13536, 18480, 10560, 105600, 83160, 167640, 42240, 40392, 38544, 160000, 2640, 85008, 8000, 0, 27690, 16560, 92400, 73920, 14000, 0, 34320, 0, 0, 110484, 2800, 0, 228800, 29568, 0, 0, 8420, 0, 0, 13200, 31900, 21384, 0, 24948, 28080],
		"successes" : [228, 266, 103, 0, 1021, 296, 0, 38, 0, 0, 217, 203, 163, 201, 138, 308, 1208, 335, 156, 212, 766, 480, 99, 684, 184, 0, 470, 42, 298, 1485, 83, 0, 109, 0, 0, 198, 214, 0, 3600, 236, 377, 804, 145, 0, 0, 161, 174, 144, 0, 78, 820],
		"newnamecurrentcustomer" : ["N/A", "N/A", "N/A", "N/A", 15, 2, "N/A", "N/A", "N/A", "N/A", 2, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 4, "N/A", "N/A", "N/A", "N/A", "N/A", 19, 2, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 35, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 6],
		"newnameeverprospect" : ["N/A", "N/A", "N/A", "N/A", 49, 8, "N/A", "N/A", "N/A", "N/A", 5, "N/A", "N/A", "N/A", "N/A", "N/A", 7, "N/A", "N/A", "N/A", 3, "N/A", "N/A", "N/A", "N/A", "N/A", 40, 6, "N/A", "N/A", "N/A", "N/A", 1, "N/A", "N/A", "N/A", "N/A", "N/A", 80, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 77],
		"newnames" : [173, 195, 340, 0, 450, 173, 0, 33, 0, 0, 187, 155, 117, 175, 120, 233, 175, 291, 153, 85, 677, 457, 86, 777, 79, 0, 408, 42, 392, 1291, 78, 0, 95, 0, 0, 233, 264, 0, 1621, 205, 402, 0, 130, 0, 0, 140, 169, 46, 47, 53, 720],
		"costperpipeline" : ["N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 16800, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 18000],
		"multitouchpipelinedollarsgen" : [121176, 89760, 37224, 0, 188152, 80880, 0, 9240, 0, 0, 13840, 107712, 13056, 23760, 10560, 139920, 717948, 47520, 31680, 89760, 26400, 300000, 4752, 27984, 8000, 0, 27690, 54960, 35640, 23232, 10000, 0, 34320, 0, 0, 60588, 2800, 0, 582624, 9240, 0, 296208, 8420, 0, 0, 21384, 31900, 17952, 0, 35904, 15072],
		"percentsuccesses" : [0.6, 0.8498, 0.6776315789473685, 0, 0.8508333333333333, 0.8505747126436781, 0, 0.6667, 0, 0, 0.32533733133433285, 0.6006, 0.5971, 0.3589, 0.3943, 0.6004, 0.6003976143141153, 0.6754, 0.8478, 0.5989, 0.8063157894736842, 0.6, 0.7174, 0.6874, 0.8479, 0, 0.888468809073724, 0.7636363636363637, 0.6549, 0.6965, 0.8469, 0, 0.27114427860696516, 0, 0, 0.6, 0.6688, 0, 1, 0.6982, 0.7007, 0.6, 0.848, 0, 0, 0.35, 0.6850393700787402, 0.6, 0, 0.6, 0.5616438356164384],
		"newnamecurrentpercentsaleslead" : [null, null, null, null, 0, 0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
		"newnameeverlead" : ["N/A", "N/A", "N/A", "N/A", 8, 2, "N/A", "N/A", "N/A", "N/A", 1, "N/A", "N/A", "N/A", "N/A", "N/A", 2, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 2, "N/A", "N/A", "N/A", "N/A", "N/A", 11, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 4],
		"costpersalesacceptedopportunity" : ["N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 8400, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 40000, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 6000],
		"newnamecurrentpipeline" : ["N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 0, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 0],
		"newnameeversaleslead" : ["N/A", "N/A", "N/A", "N/A", 1, 1, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 1, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A"],
		"newnameeverpercentcustomer" : [null, null, null, null, 0.04666666666666667, 0.011560693641618497, null, null, null, null, 0.026737967914438502, null, null, null, null, null, null, null, null, null, 0.007385524372230428, null, null, null, null, null, 0.056372549019607844, 0.047619047619047616, null, null, null, null, null, null, null, null, null, null, 0.07217766810610735, null, null, null, null, null, null, null, null, null, null, null, 0.008333333333333333],
		"newnamecurrentprospect" : ["N/A", "N/A", "N/A", "N/A", 2, 0, "N/A", "N/A", "N/A", "N/A", 0, "N/A", "N/A", "N/A", "N/A", "N/A", 1, "N/A", "N/A", "N/A", 0, "N/A", "N/A", "N/A", "N/A", "N/A", 4, 0, "N/A", "N/A", "N/A", "N/A", 0, "N/A", "N/A", "N/A", "N/A", "N/A", 8, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 7],
		"costpersuccesses" : [21.93, 52.63, 174.75728155339806, "Infinity", 88.1488736532811, 152.02702702702703, "Infinity", 157.89, "Infinity", "Infinity", 5.529953917050691, 49.26, 49.08, 34.83, 36.23, 16.23, 24.834437086092716, 59.7, 38.46, 56.6, 13.054830287206267, 10.42, 10.1, 14.62, 27.17, "Infinity", 35.744680851063826, 357.14285714285717, 33.56, 6.06, 66.27, "Infinity", 110.09174311926606, "Infinity", "Infinity", 40.4, 37.38, "Infinity", 11.11111111111111, 42.37, 17.24, 18.65671641791045, 35.17, "Infinity", "Infinity", 37.27, 232.75862068965517, 55.56, "Infinity", 64.1, 21.951219512195124],
		"pipelinedollars" : [0, 0, 0, 0, 29312, 25780, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7680, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		"expectedrevenue" : [81972, 0, 114576, 0, 182290, 75724, 0, 29568, 0, 0, 4000, 0, 0, 14000, 2560, 80000, 47772, 167640, 42240, 30600, 17344, 160000, 2000, 0, 8000, 0, 26154, 9920, 92400, 0, 14000, 0, 27680, 0, 0, 83700, 2800, 0, 168080, 7168, 0, 0, 8420, 0, 0, 13200, 25500, 16200, 0, 18900, 10880],
		"percentnewnames" : [0.4553, 0.623, 2.236842105263158, 0, 0.375, 0.49712643678160917, 0, 0.5789, 0, 0, 0.280359820089955, 0.4586, 0.4286, 0.3125, 0.3429, 0.4542, 0.08697813121272366, 0.5867, 0.8315, 0.2401, 0.7126315789473684, 0.5713, 0.6232, 0.7809, 0.3641, 0, 0.7712665406427222, 0.7636363636363637, 0.8615, 0.6055, 0.7959, 0, 0.236318407960199, 0, 0, 0.7061, 0.825, 0, 0.4502777777777778, 0.6065, 0.7472, 0, 0.7602, 0, 0, 0.3043, 0.6653543307086615, 0.1917, 0, 0.4077, 0.4931506849315068],
		"costpercustomer" : ["N/A", "N/A", "N/A", "N/A", 4285.714285714285, 22500, "N/A", "N/A", "N/A", "N/A", 240, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 2000, "N/A", "N/A", "N/A", "N/A", "N/A", 730.4347826086956, 7500, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 341.88034188034186, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 3000],
		"newnameeverpipeline" : ["N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 1, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 1],
		"rois" : [0.0992, 2, 3.377222222222222, 0, 1.764888888888889, 1.2244444444444444, 0, 1.1833, 0, 0, 0.995, 4.8907, 0, 0.1583, 0.6872, 5.6, 1.1567666666666667, 1.2545, 0.642, 0, 1.105, 0, 0.0163, 0.05, 1.05, 0, 1.1910714285714286, 0.336, 1.1, 0.0877, 0.4545, 0, 1.1816666666666666, 0, 0, 1.75, 0.35, 0, 1.60435, 1.5965, 0.7185, 0, 2.0588, 0, 0, 0.3593, 0.6296296296296297, 5.625, 0, 5, 1.3822222222222222],
		"costs" : [5000, 14000, 18000, 200, 90000, 45000, 200, 6000, 200, 3000, 1200, 10000, 8000, 7000, 5000, 5000, 30000, 20000, 6000, 12000, 10000, 5000, 1000, 10000, 5000, 2000, 16800, 15000, 10000, 9000, 5500, 200, 12000, 2000, 15000, 8000, 8000, 5000, 40000, 10000, 6500, 15000, 5100, 200, 2000, 6000, 40500, 8000, 8000, 5000, 18000],
		"costpersaleslead" : ["N/A", "N/A", "N/A", "N/A", 90000, 45000, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 16800, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A"],
		"newnamecurrentpercentprospect" : [null, null, null, null, 0.0044444444444444444, 0, null, null, null, null, 0, null, null, null, null, null, 0.005714285714285714, null, null, null, 0, null, null, null, null, null, 0.00980392156862745, 0, null, null, null, null, 0, null, null, null, null, null, 0.004935225169648365, null, null, null, null, null, null, null, null, null, null, null, 0.009722222222222222],
		"newnamecurrentpercentlead" : [null, null, null, null, 0, 0, null, null, null, null, 0, null, null, null, null, null, 0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 0, null, null, null, null, null, 0.0006169031462060457, null, null, null, null, null, null, null, null, null, null, null, 0],
		"newnamecurrentpercentcustomer" : [null, null, null, null, 0.03333333333333333, 0.011560693641618497, null, null, null, null, 0.0106951871657754, null, null, null, null, null, null, null, null, null, 0.005908419497784343, null, null, null, null, null, 0.04656862745098039, 0.047619047619047616, null, null, null, null, null, null, null, null, null, null, 0.0215916101172116, null, null, null, null, null, null, null, null, null, null, null, 0.008333333333333333],
		"members" : [380, 313, 152, 0, 1200, 348, 0, 57, 0, 0, 667, 338, 273, 560, 350, 513, 2012, 496, 184, 354, 950, 800, 138, 995, 217, 0, 529, 55, 455, 2132, 98, 0, 402, 0, 0, 330, 320, 0, 3600, 338, 538, 1340, 171, 0, 0, 460, 254, 240, 0, 130, 1460],
		"revenue" : [496, 28000, 60790, 0, 158840, 55100, 0, 7100, 0, 0, 1194, 48907, 0, 1108, 3436, 28000, 34703, 25090, 3852, 0, 11050, 0, 16, 500, 5250, 0, 20010, 5040, 11000, 789, 2500, 0, 14180, 0, 0, 14000, 2800, 0, 64174, 15965, 4670, 0, 10500, 0, 0, 2156, 25500, 45000, 0, 25000, 24880],
		"costperlead" : ["N/A", "N/A", "N/A", "N/A", 11250, 22500, "N/A", "N/A", "N/A", "N/A", 1200, "N/A", "N/A", "N/A", "N/A", "N/A", 15000, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 6000, "N/A", "N/A", "N/A", "N/A", "N/A", 3636.3636363636365, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 4500],
		"newnamesuccesses" : [104, 195, 54, 0, 450, 173, 0, 20, 0, 0, 187, 93, 70, 175, 120, 140, 105, 175, 153, 51, 677, 274, 52, 466, 79, 0, 408, 42, 235, 775, 78, 0, 95, 0, 0, 140, 158, 0, 1621, 123, 241, 0, 130, 0, 0, 140, 101, 28, 0, 32, 432],
		"multitouchexpectedrevenue" : [121176, 0, 37224, 0, 182290, 75724, 0, 9240, 0, 0, 4000, 0, 0, 18000, 2560, 106000, 387364, 47520, 31680, 68000, 14400, 300000, 3600, 0, 8000, 0, 26154, 31040, 35640, 0, 10000, 0, 27680, 0, 0, 45900, 2800, 0, 450624, 2240, 0, 0, 8420, 0, 0, 21384, 25500, 13600, 0, 27200, 5736],
		"costpermembers" : [13.16, 44.73, 118.42105263157895, "Infinity", 75, 129.31034482758622, "Infinity", 105.26, "Infinity", "Infinity", 1.7991004497751124, 29.59, 29.3, 12.5, 14.29, 9.75, 14.910536779324056, 40.32, 32.61, 33.9, 10.526315789473685, 6.25, 7.25, 10.05, 23.04, "Infinity", 31.75803402646503, 272.72727272727275, 21.98, 4.22, 56.12, "Infinity", 29.850746268656717, "Infinity", "Infinity", 24.24, 25, "Infinity", 11.11111111111111, 29.59, 12.08, 11.194029850746269, 29.82, "Infinity", "Infinity", 13.04, 159.4488188976378, 33.33, "Infinity", 38.46, 12.32876712328767],
		"newnameeverpercentprospect" : [null, null, null, null, 0.10888888888888888, 0.046242774566473986, null, null, null, null, 0.026737967914438502, null, null, null, null, null, 0.04, null, null, null, 0.004431314623338257, null, null, null, null, null, 0.09803921568627451, 0.14285714285714285, null, null, null, null, 0.010526315789473684, null, null, null, null, null, 0.049352251696483655, null, null, null, null, null, null, null, null, null, null, null, 0.10694444444444444],
		"newnamecurrentpercentsalesacceptedopportunity" : [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 0, null, null, null, null, null, null, null, null, null, null, null, 0, null, null, null, null, null, null, null, null, null, null, null, 0.001388888888888889],
		"newnameevercustomer" : ["N/A", "N/A", "N/A", "N/A", 21, 2, "N/A", "N/A", "N/A", "N/A", 5, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 5, "N/A", "N/A", "N/A", "N/A", "N/A", 23, 2, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 117, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 6],
		"newnamecurrentsalesacceptedopportunity" : ["N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 0, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 0, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 1]
	};
    
    // Program Analyzer (B2C) data
    data[b2cId] = {};
    data[b2cId].summarydata = {};
    data[b2cId].summarydata = {
		"programs" : [["Social Media", "", ""], ["Email", "", ""], ["Mobile App", "", ""], ["PPC", "", ""], ["SEO", "", ""], ["Online Advertising", "", ""], ["SMS", "", ""], ["Loyalty", "", ""], ["Referral", "", ""], ["Web Personalization", "", ""]],
		"newnamecurrentsaleslead" : ["N/A", "N/A", "N/A", "N/A", "N/A", 0, "N/A", 0, "N/A", "N/A"],
		"multitouchrois" : [1.195849582172702, 0, 0.348, 1.5224102564102564, 0.20805555555555555, 1.4810079726651482, 0.35, 1.4218604651162792, 1.75435, 0.7666165413533834],
		"newnameeverpercentlead" : [null, null, null, 0.0011580775911986102, null, 0.00794912559618442, null, 0.0021945866861741038, 0.006785934608266502, 0.003469210754553339],
		"costperprospect" : ["N/A", "N/A", "N/A", 16714.285714285714, 6000, 3080.7017543859647, "N/A", 877.5510204081633, 500, 863.6363636363636],
		"newnameeverpercentpipeline" : [null, null, null, null, null, null, null, 0.000731528895391368, null, 0.0008673026886383347],
		"newnameeverpercentsaleslead" : [null, null, null, null, null, 0.001589825119236884, null, 0.000731528895391368, null, null],
		"multitouchrevenue" : [214655, 0, 6264, 178122, 7490, 260065, 0, 61140, 70174, 50980],
		"percentnewnamesuccesses" : [0.6002101392172314, 0, 1, 0.6004632310364795, 0.42857142857142855, 1, 0, 1, 1, 0.5993061578490894],
		"multitouchpipelinedollars" : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		"newnamecurrentlead" : ["N/A", "N/A", "N/A", 0, "N/A", 0, "N/A", 0, 1, 0],
		"newnameeversalesacceptedopportunity" : ["N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 2, 1, 3],
		"costpernewnamesuccesses" : [78.55579868708972, "Infinity", 41.37931034482759, 112.82545805207329, 857.1428571428571, 139.5866454689984, "Infinity", 31.455742501828823, 24.676125848241828, 96.23733719247467],
		"newnamecurrentpercentpipeline" : [null, null, null, null, null, null, null, 0, null, 0],
		"newnameeverpercentsalesacceptedopportunity" : [null, null, null, null, null, null, null, 0.001463057790782736, 0.0006169031462060457, 0.0026019080659150044],
		"costpernewnames" : [47.149986866298924, "Infinity", 41.37931034482759, 67.7475390851187, 367.3469387755102, 139.5866454689984, "Infinity", 31.455742501828823, 24.676125848241828, 57.67562879444926],
		"pipelinedollarsgen" : [976552, 50000, 42240, 175132, 31280, 452572, 100000, 114394, 228800, 62780],
		"successes" : [3931, 0, 500, 4026, 42, 2151, 0, 1562, 3600, 1208],
		"newnamecurrentcustomer" : ["N/A", "N/A", "N/A", "N/A", 2, 17, "N/A", 25, 35, 6],
		"newnameeverprospect" : ["N/A", "N/A", "N/A", 7, 6, 57, "N/A", 49, 80, 77],
		"newnames" : [3807, 0, 435, 1727, 98, 1258, 0, 1367, 1621, 1153],
		"costperpipeline" : ["N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 43000, "N/A", 66500],
		"multitouchpipelinedollarsgen" : [298392, 20000, 55704, 1900224, 54960, 416892, 20000, 102250, 582624, 49772],
		"percentsuccesses" : [0.6034694504144918, 0, 0.36496350364963503, 0.6, 0.32061068702290074, 0.849861714737258, 0, 0.6130298273155416, 1, 0.5939036381514258],
		"newnamecurrentpercentsaleslead" : [null, null, null, null, null, 0, null, 0, null, null],
		"newnameeverlead" : ["N/A", "N/A", "N/A", 2, "N/A", 10, "N/A", 3, 11, 4],
		"costpersalesacceptedopportunity" : ["N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 21500, 40000, 22166.666666666668],
		"newnamecurrentpipeline" : ["N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 0, "N/A", 0],
		"newnameeversaleslead" : ["N/A", "N/A", "N/A", "N/A", "N/A", 2, "N/A", 1, "N/A", "N/A"],
		"newnamecurrentprospect" : ["N/A", "N/A", "N/A", 1, 0, 2, "N/A", 4, 8, 7],
		"newnameeverpercentcustomer" : [null, null, null, null, 0.02040816326530612, 0.018282988871224166, null, 0.024140453547915143, 0.07217766810610735, 0.005203816131830009],
		"costpersuccesses" : [45.66268125158992, "Infinity", 36, 29.061102831594635, 857.1428571428571, 81.63644816364481, "Infinity", 27.528809218950062, 11.11111111111111, 55.049668874172184],
		"pipelinedollars" : [0, 0, 0, 0, 0, 55092, 0, 7680, 0, 0],
		"expectedrevenue" : [763784, 0, 29760, 519144, 9920, 330674, 0, 75178, 168080, 39180],
		"percentnewnames" : [0.5844335277863064, 0, 0.3175182481751825, 0.2573770491803279, 0.7480916030534351, 0.4970367443698143, 0, 0.5364992150706437, 0.4502777777777778, 0.5668633235004916],
		"newnameeverpipeline" : ["N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 1, "N/A", 1],
		"costpercustomer" : ["N/A", "N/A", "N/A", "N/A", 18000, 7634.782608695652, "N/A", 1303.030303030303, 341.88034188034186, 11083.333333333334],
		"rois" : [1.4976044568245126, 0, 0.37222222222222223, 1.676119658119658, 0.14, 1.5036560364464693, 0.75, 1.079860465116279, 1.60435, 0.7996992481203008],
		"costs" : [179500, 6000, 18000, 117000, 36000, 175600, 12000, 43000, 40000, 66500],
		"costpersaleslead" : ["N/A", "N/A", "N/A", "N/A", "N/A", 87800, "N/A", 43000, "N/A", "N/A"],
		"newnamecurrentpercentprospect" : [null, null, null, 0.0005790387955993051, 0, 0.001589825119236884, null, 0.002926115581565472, 0.004935225169648365, 0.006071118820468344],
		"newnamecurrentpercentlead" : [null, null, null, 0, null, 0, null, 0, 0.0006169031462060457, 0],
		"newnamecurrentpercentcustomer" : [null, null, null, null, 0.02040816326530612, 0.013513513513513514, null, 0.018288222384784197, 0.0215916101172116, 0.005203816131830009],
		"members" : [6514, 0, 1370, 6710, 131, 2531, 0, 2548, 3600, 2034],
		"revenue" : [268820, 0, 6700, 196106, 5040, 264042, 0, 46434, 64174, 53180],
		"costperlead" : ["N/A", "N/A", "N/A", 58500, "N/A", 17560, "N/A", 14333.333333333334, 3636.3636363636365, 16625],
		"newnamesuccesses" : [2285, 0, 435, 1037, 42, 1258, 0, 1367, 1621, 691],
		"multitouchexpectedrevenue" : [230224, 0, 41944, 1069240, 31040, 316114, 0, 72234, 450624, 34036],
		"costpermembers" : [27.556033159349095, "Infinity", 13.138686131386862, 17.43666169895678, 274.80916030534354, 69.37969182141445, "Infinity", 16.875981161695446, 11.11111111111111, 32.694198623402166],
		"newnameeverpercentprospect" : [null, null, null, 0.004053271569195136, 0.061224489795918366, 0.04531001589825119, null, 0.03584491587417703, 0.049352251696483655, 0.06678230702515178],
		"newnameevercustomer" : ["N/A", "N/A", "N/A", "N/A", 2, 23, "N/A", 33, 117, 6],
		"newnamecurrentpercentsalesacceptedopportunity" : [null, null, null, null, null, null, null, 0, 0, 0.0008673026886383347],
		"newnamecurrentsalesacceptedopportunity" : ["N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 0, 0, 1]
	};
	data[b2cId].detaildata = {};
	data[b2cId].detaildata = {
		"programs" : [["PPC", "Icecream Kingdom", "1009"], ["Online Advertising", "Facebook Ads: Engagement", "1015"], ["Social Media", "Facebook: Engagement", "1031"], ["Email", "Sign Up", "50007"], ["Online Advertising", "Facebook Display Ads: Targeting", "1012"], ["Online Advertising", "Google Display Ads: Targeting", "1013"], ["Email", "Try Another Flavor for Free", "50005"], ["Social Media", "Twitter: Engagement", "1031"], ["Email", "10% Discount on Next Visit", "50004"], ["Loyalty", "Frequent Purchase Offer", "50001"], ["Loyalty", "Class Upgraded", "1021"], ["PPC", "Ice-cream Kingdom", "1008"], ["PPC", "Ice Cream Kingdom", "1007"], ["Mobile App", "App Download Offer", "1035"], ["Mobile App", "Free 1,000 Tokens", "1037"], ["PPC", "Icecream Treat", "1010"], ["PPC", "Icecream Sweet", "1001"], ["Social Media", "Pinterest: Engagement", "1032"], ["Online Advertising", "Facebook Display Ads: Retargeting", "1014"], ["PPC", "Kingdom of Icecream", "1006"], ["Loyalty", "Discount Offer", "1023"], ["PPC", "ICK Treat", "1003"], ["Social Media", "Google+: Engagement", "1024"], ["Social Media", "Instagram: Engagement", "1025"], ["Online Advertising", "Google Display Ads: Retargeting", "1017"], ["PPC", "ICK Sweet", "50010"], ["Loyalty", "Birthday Offer", "1020"], ["SEO", "Icecream", "1041"], ["Social Media", "Twitter: Offers", "1030"], ["Social Media", "Facebook: Offers", "1026"], ["Online Advertising", "Facebook Ads: Offers", "1018"], ["Email", "Free Toppings with App Download", "50006"], ["Loyalty", "Engaged with Us Offer", "1022"], ["PPC", "Icecream Cones", "50008"], ["SMS", "Treat Yourself to ICK", "50011"], ["PPC", "Icecream Store", "1005"], ["Web Personalization", "Flavor Profile", "1039"], ["Online Advertising", "YouTube Ads: Engagement", "50002"], ["Referral", "Referr a Friend", "1019"], ["Social Media", "Pinterest: Offers", "1028"], ["Social Media", "Google+: Offers", "1029"], ["PPC", "Icecream Shop", "1002"], ["Online Advertising", "YouTube Ads: Offers", "1016"], ["Email", "Free Icecream on 10th Purchase", "50003"], ["PPC", "Icecream Shoppe", "50009"], ["Mobile App", "Social Post Offer", "1036"], ["Web Personalization", "Advocate Profile", "1040"], ["PPC", "Best Icecream", "1004"], ["Social Media", "YouTube: Engagement", "50012"], ["PPC", "Best Icecream Flavors", "1011"], ["Web Personalization", "App User Profile", "1038"]],
		"newnamecurrentsaleslead" : ["N/A", "N/A", "N/A", "N/A", 0, 0, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 0, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A"],
		"multitouchrois" : [0.157, 1.6691, 2.825, 0, 1.764888888888889, 1.2244444444444444, 0, 1, 0, 0, 1.1666666666666667, 4.5, 0, 0.1583, 0.6, 5.6, 0.6585666666666666, 1.2, 0.7512, 0, 1.065, 0.692, 0.051, 0.05, 1.05, 0, 1.1910714285714286, 0.49933333333333335, 1.3, 0.0877, 0.4545, 0, 2.4233333333333333, 0, 0, 1.5, 0.35, 0, 1.75435, 1.7, 0.61, 0, 2.0588, 0, 0, 0.3593, 0.6296296296296297, 5.1537, 0, 5.578, 1.26],
		"newnameeverpercentlead" : [null, null, null, null, 0.017777777777777778, 0.011560693641618497, null, null, null, null, 0.0053475935828877, null, null, null, null, null, 0.011428571428571429, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 0.021052631578947368, null, null, null, null, null, 0.006785934608266502, null, null, null, null, null, null, null, null, null, null, null, 0.005555555555555556],
		"costperprospect" : ["N/A", "N/A", "N/A", "N/A", 1836.734693877551, 5625, "N/A", "N/A", "N/A", "N/A", 240, "N/A", "N/A", "N/A", "N/A", "N/A", 4285.714285714285, "N/A", "N/A", "N/A", 3333.3333333333335, "N/A", "N/A", "N/A", "N/A", "N/A", 420, 2500, "N/A", "N/A", "N/A", "N/A", 12000, "N/A", "N/A", "N/A", "N/A", "N/A", 500, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 233.76623376623377],
		"newnameeverpercentpipeline" : [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 0.0024509803921568627, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 0.001388888888888889],
		"multitouchrevenue" : [785, 23368, 50850, 0, 158840, 55100, 0, 6000, 0, 0, 1400, 45000, 0, 1108, 3000, 28000, 19757, 24000, 4507, 0, 10650, 3460, 51, 500, 5250, 0, 20010, 7490, 13000, 789, 2500, 0, 29080, 0, 0, 12000, 2800, 0, 70174, 17000, 3965, 0, 10500, 0, 0, 2156, 25500, 41230, 0, 27890, 22680],
		"percentnewnamesuccesses" : [0.6012, 1, 0.1588235294117647, 0, 1, 1, 0, 0.6061, 0, 0, 1, 0.6, 0.5983, 1, 1, 0.6009, 0.6, 0.6014, 1, 0.6, 1, 0.5996, 0.6047, 0.5997, 1, 0, 1, 1, 0.5995, 0.6003, 1, 0, 1, 0, 0, 0.6009, 0.5985, 0, 1, 0.6, 0.5995, 0, 1, 0, 0, 1, 0.5976331360946746, 0.6087, 0, 0.6038, 0.6],
		"newnameeverpercentsaleslead" : [null, null, null, null, 0.0022222222222222222, 0.005780346820809248, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 0.0024509803921568627, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
		"multitouchpipelinedollars" : [0, 0, 0, 0, 0, 8320, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		"newnamecurrentlead" : ["N/A", "N/A", "N/A", "N/A", 0, 0, "N/A", "N/A", "N/A", "N/A", 0, "N/A", "N/A", "N/A", "N/A", "N/A", 0, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 0, "N/A", "N/A", "N/A", "N/A", "N/A", 1, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 0],
		"newnameeversalesacceptedopportunity" : ["N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 2, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 1, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 3],
		"costpernewnamesuccesses" : [48.08, 71.79, 333.3333333333333, "Infinity", 200, 260.11560693641616, "Infinity", 300, "Infinity", "Infinity", 6.4171122994652405, 107.53, 114.29, 40, 41.67, 35.71, 285.7142857142857, 114.29, 39.22, 235.29, 14.771048744460856, 18.25, 19.23, 21.46, 63.29, "Infinity", 41.1764705882353, 357.14285714285717, 42.55, 11.61, 70.51, "Infinity", 126.3157894736842, "Infinity", "Infinity", 57.14, 50.63, "Infinity", 24.676125848241828, 81.3, 26.97, "Infinity", 39.23, "Infinity", "Infinity", 42.86, 400.990099009901, 285.71, "Infinity", 156.25, 41.666666666666664],
		"newnameeverpercentsalesacceptedopportunity" : [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 0.004901960784313725, null, null, null, null, null, null, null, null, null, null, null, 0.0006169031462060457, null, null, null, null, null, null, null, null, null, null, null, 0.004166666666666667],
		"newnamecurrentpercentpipeline" : [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 0],
		"costpernewnames" : [28.9, 71.79, 52.94117647058823, "Infinity", 200, 260.11560693641616, "Infinity", 181.82, "Infinity", "Infinity", 6.4171122994652405, 64.52, 68.38, 40, 41.67, 21.46, 171.42857142857142, 68.73, 39.22, 141.18, 14.771048744460856, 10.94, 11.63, 12.87, 63.29, "Infinity", 41.1764705882353, 357.14285714285717, 25.51, 6.97, 70.51, "Infinity", 126.3157894736842, "Infinity", "Infinity", 34.33, 30.3, "Infinity", 24.676125848241828, 48.78, 16.17, "Infinity", 39.23, "Infinity", "Infinity", 42.86, 239.6449704142012, 173.91, "Infinity", 94.34, 25],
		"pipelinedollarsgen" : [81972, 110880, 114576, 0, 188152, 80880, 0, 29568, 0, 0, 13840, 73656, 13536, 18480, 10560, 105600, 83160, 167640, 42240, 40392, 38544, 160000, 2640, 85008, 8000, 0, 27690, 16560, 92400, 73920, 14000, 0, 34320, 0, 0, 110484, 2800, 0, 228800, 29568, 0, 0, 8420, 0, 0, 13200, 31900, 21384, 0, 24948, 28080],
		"successes" : [228, 266, 103, 0, 1021, 296, 0, 38, 0, 0, 217, 203, 163, 201, 138, 308, 1208, 335, 156, 212, 766, 480, 99, 684, 184, 0, 470, 42, 298, 1485, 83, 0, 109, 0, 0, 198, 214, 0, 3600, 236, 377, 804, 145, 0, 0, 161, 174, 144, 0, 78, 820],
		"newnamecurrentcustomer" : ["N/A", "N/A", "N/A", "N/A", 15, 2, "N/A", "N/A", "N/A", "N/A", 2, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 4, "N/A", "N/A", "N/A", "N/A", "N/A", 19, 2, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 35, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 6],
		"newnameeverprospect" : ["N/A", "N/A", "N/A", "N/A", 49, 8, "N/A", "N/A", "N/A", "N/A", 5, "N/A", "N/A", "N/A", "N/A", "N/A", 7, "N/A", "N/A", "N/A", 3, "N/A", "N/A", "N/A", "N/A", "N/A", 40, 6, "N/A", "N/A", "N/A", "N/A", 1, "N/A", "N/A", "N/A", "N/A", "N/A", 80, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 77],
		"newnames" : [173, 195, 340, 0, 450, 173, 0, 33, 0, 0, 187, 155, 117, 175, 120, 233, 175, 291, 153, 85, 677, 457, 86, 777, 79, 0, 408, 42, 392, 1291, 78, 0, 95, 0, 0, 233, 264, 0, 1621, 205, 402, 0, 130, 0, 0, 140, 169, 46, 47, 53, 720],
		"costperpipeline" : ["N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 16800, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 18000],
		"multitouchpipelinedollarsgen" : [121176, 89760, 37224, 0, 188152, 80880, 0, 9240, 0, 0, 13840, 107712, 13056, 23760, 10560, 139920, 717948, 47520, 31680, 89760, 26400, 300000, 4752, 27984, 8000, 0, 27690, 54960, 35640, 23232, 10000, 0, 34320, 0, 0, 60588, 2800, 0, 582624, 9240, 0, 296208, 8420, 0, 0, 21384, 31900, 17952, 0, 35904, 15072],
		"percentsuccesses" : [0.6, 0.8498, 0.6776315789473685, 0, 0.8508333333333333, 0.8505747126436781, 0, 0.6667, 0, 0, 0.32533733133433285, 0.6006, 0.5971, 0.3589, 0.3943, 0.6004, 0.6003976143141153, 0.6754, 0.8478, 0.5989, 0.8063157894736842, 0.6, 0.7174, 0.6874, 0.8479, 0, 0.888468809073724, 0.7636363636363637, 0.6549, 0.6965, 0.8469, 0, 0.27114427860696516, 0, 0, 0.6, 0.6688, 0, 1, 0.6982, 0.7007, 0.6, 0.848, 0, 0, 0.35, 0.6850393700787402, 0.6, 0, 0.6, 0.5616438356164384],
		"newnamecurrentpercentsaleslead" : [null, null, null, null, 0, 0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
		"newnameeverlead" : ["N/A", "N/A", "N/A", "N/A", 8, 2, "N/A", "N/A", "N/A", "N/A", 1, "N/A", "N/A", "N/A", "N/A", "N/A", 2, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 2, "N/A", "N/A", "N/A", "N/A", "N/A", 11, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 4],
		"costpersalesacceptedopportunity" : ["N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 8400, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 40000, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 6000],
		"newnamecurrentpipeline" : ["N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 0, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 0],
		"newnameeversaleslead" : ["N/A", "N/A", "N/A", "N/A", 1, 1, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 1, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A"],
		"newnameeverpercentcustomer" : [null, null, null, null, 0.04666666666666667, 0.011560693641618497, null, null, null, null, 0.026737967914438502, null, null, null, null, null, null, null, null, null, 0.007385524372230428, null, null, null, null, null, 0.056372549019607844, 0.047619047619047616, null, null, null, null, null, null, null, null, null, null, 0.07217766810610735, null, null, null, null, null, null, null, null, null, null, null, 0.008333333333333333],
		"newnamecurrentprospect" : ["N/A", "N/A", "N/A", "N/A", 2, 0, "N/A", "N/A", "N/A", "N/A", 0, "N/A", "N/A", "N/A", "N/A", "N/A", 1, "N/A", "N/A", "N/A", 0, "N/A", "N/A", "N/A", "N/A", "N/A", 4, 0, "N/A", "N/A", "N/A", "N/A", 0, "N/A", "N/A", "N/A", "N/A", "N/A", 8, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 7],
		"costpersuccesses" : [21.93, 52.63, 174.75728155339806, "Infinity", 88.1488736532811, 152.02702702702703, "Infinity", 157.89, "Infinity", "Infinity", 5.529953917050691, 49.26, 49.08, 34.83, 36.23, 16.23, 24.834437086092716, 59.7, 38.46, 56.6, 13.054830287206267, 10.42, 10.1, 14.62, 27.17, "Infinity", 35.744680851063826, 357.14285714285717, 33.56, 6.06, 66.27, "Infinity", 110.09174311926606, "Infinity", "Infinity", 40.4, 37.38, "Infinity", 11.11111111111111, 42.37, 17.24, 18.65671641791045, 35.17, "Infinity", "Infinity", 37.27, 232.75862068965517, 55.56, "Infinity", 64.1, 21.951219512195124],
		"pipelinedollars" : [0, 0, 0, 0, 29312, 25780, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7680, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		"expectedrevenue" : [81972, 0, 114576, 0, 182290, 75724, 0, 29568, 0, 0, 4000, 0, 0, 14000, 2560, 80000, 47772, 167640, 42240, 30600, 17344, 160000, 2000, 0, 8000, 0, 26154, 9920, 92400, 0, 14000, 0, 27680, 0, 0, 83700, 2800, 0, 168080, 7168, 0, 0, 8420, 0, 0, 13200, 25500, 16200, 0, 18900, 10880],
		"percentnewnames" : [0.4553, 0.623, 2.236842105263158, 0, 0.375, 0.49712643678160917, 0, 0.5789, 0, 0, 0.280359820089955, 0.4586, 0.4286, 0.3125, 0.3429, 0.4542, 0.08697813121272366, 0.5867, 0.8315, 0.2401, 0.7126315789473684, 0.5713, 0.6232, 0.7809, 0.3641, 0, 0.7712665406427222, 0.7636363636363637, 0.8615, 0.6055, 0.7959, 0, 0.236318407960199, 0, 0, 0.7061, 0.825, 0, 0.4502777777777778, 0.6065, 0.7472, 0, 0.7602, 0, 0, 0.3043, 0.6653543307086615, 0.1917, 0, 0.4077, 0.4931506849315068],
		"costpercustomer" : ["N/A", "N/A", "N/A", "N/A", 4285.714285714285, 22500, "N/A", "N/A", "N/A", "N/A", 240, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 2000, "N/A", "N/A", "N/A", "N/A", "N/A", 730.4347826086956, 7500, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 341.88034188034186, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 3000],
		"newnameeverpipeline" : ["N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 1, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 1],
		"rois" : [0.0992, 2, 3.377222222222222, 0, 1.764888888888889, 1.2244444444444444, 0, 1.1833, 0, 0, 0.995, 4.8907, 0, 0.1583, 0.6872, 5.6, 1.1567666666666667, 1.2545, 0.642, 0, 1.105, 0, 0.0163, 0.05, 1.05, 0, 1.1910714285714286, 0.336, 1.1, 0.0877, 0.4545, 0, 1.1816666666666666, 0, 0, 1.75, 0.35, 0, 1.60435, 1.5965, 0.7185, 0, 2.0588, 0, 0, 0.3593, 0.6296296296296297, 5.625, 0, 5, 1.3822222222222222],
		"costs" : [5000, 14000, 18000, 200, 90000, 45000, 200, 6000, 200, 3000, 1200, 10000, 8000, 7000, 5000, 5000, 30000, 20000, 6000, 12000, 10000, 5000, 1000, 10000, 5000, 2000, 16800, 15000, 10000, 9000, 5500, 200, 12000, 2000, 15000, 8000, 8000, 5000, 40000, 10000, 6500, 15000, 5100, 200, 2000, 6000, 40500, 8000, 8000, 5000, 18000],
		"costpersaleslead" : ["N/A", "N/A", "N/A", "N/A", 90000, 45000, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 16800, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A"],
		"newnamecurrentpercentprospect" : [null, null, null, null, 0.0044444444444444444, 0, null, null, null, null, 0, null, null, null, null, null, 0.005714285714285714, null, null, null, 0, null, null, null, null, null, 0.00980392156862745, 0, null, null, null, null, 0, null, null, null, null, null, 0.004935225169648365, null, null, null, null, null, null, null, null, null, null, null, 0.009722222222222222],
		"newnamecurrentpercentlead" : [null, null, null, null, 0, 0, null, null, null, null, 0, null, null, null, null, null, 0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 0, null, null, null, null, null, 0.0006169031462060457, null, null, null, null, null, null, null, null, null, null, null, 0],
		"newnamecurrentpercentcustomer" : [null, null, null, null, 0.03333333333333333, 0.011560693641618497, null, null, null, null, 0.0106951871657754, null, null, null, null, null, null, null, null, null, 0.005908419497784343, null, null, null, null, null, 0.04656862745098039, 0.047619047619047616, null, null, null, null, null, null, null, null, null, null, 0.0215916101172116, null, null, null, null, null, null, null, null, null, null, null, 0.008333333333333333],
		"members" : [380, 313, 152, 0, 1200, 348, 0, 57, 0, 0, 667, 338, 273, 560, 350, 513, 2012, 496, 184, 354, 950, 800, 138, 995, 217, 0, 529, 55, 455, 2132, 98, 0, 402, 0, 0, 330, 320, 0, 3600, 338, 538, 1340, 171, 0, 0, 460, 254, 240, 0, 130, 1460],
		"revenue" : [496, 28000, 60790, 0, 158840, 55100, 0, 7100, 0, 0, 1194, 48907, 0, 1108, 3436, 28000, 34703, 25090, 3852, 0, 11050, 0, 16, 500, 5250, 0, 20010, 5040, 11000, 789, 2500, 0, 14180, 0, 0, 14000, 2800, 0, 64174, 15965, 4670, 0, 10500, 0, 0, 2156, 25500, 45000, 0, 25000, 24880],
		"costperlead" : ["N/A", "N/A", "N/A", "N/A", 11250, 22500, "N/A", "N/A", "N/A", "N/A", 1200, "N/A", "N/A", "N/A", "N/A", "N/A", 15000, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 6000, "N/A", "N/A", "N/A", "N/A", "N/A", 3636.3636363636365, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 4500],
		"newnamesuccesses" : [104, 195, 54, 0, 450, 173, 0, 20, 0, 0, 187, 93, 70, 175, 120, 140, 105, 175, 153, 51, 677, 274, 52, 466, 79, 0, 408, 42, 235, 775, 78, 0, 95, 0, 0, 140, 158, 0, 1621, 123, 241, 0, 130, 0, 0, 140, 101, 28, 0, 32, 432],
		"multitouchexpectedrevenue" : [121176, 0, 37224, 0, 182290, 75724, 0, 9240, 0, 0, 4000, 0, 0, 18000, 2560, 106000, 387364, 47520, 31680, 68000, 14400, 300000, 3600, 0, 8000, 0, 26154, 31040, 35640, 0, 10000, 0, 27680, 0, 0, 45900, 2800, 0, 450624, 2240, 0, 0, 8420, 0, 0, 21384, 25500, 13600, 0, 27200, 5736],
		"costpermembers" : [13.16, 44.73, 118.42105263157895, "Infinity", 75, 129.31034482758622, "Infinity", 105.26, "Infinity", "Infinity", 1.7991004497751124, 29.59, 29.3, 12.5, 14.29, 9.75, 14.910536779324056, 40.32, 32.61, 33.9, 10.526315789473685, 6.25, 7.25, 10.05, 23.04, "Infinity", 31.75803402646503, 272.72727272727275, 21.98, 4.22, 56.12, "Infinity", 29.850746268656717, "Infinity", "Infinity", 24.24, 25, "Infinity", 11.11111111111111, 29.59, 12.08, 11.194029850746269, 29.82, "Infinity", "Infinity", 13.04, 159.4488188976378, 33.33, "Infinity", 38.46, 12.32876712328767],
		"newnameeverpercentprospect" : [null, null, null, null, 0.10888888888888888, 0.046242774566473986, null, null, null, null, 0.026737967914438502, null, null, null, null, null, 0.04, null, null, null, 0.004431314623338257, null, null, null, null, null, 0.09803921568627451, 0.14285714285714285, null, null, null, null, 0.010526315789473684, null, null, null, null, null, 0.049352251696483655, null, null, null, null, null, null, null, null, null, null, null, 0.10694444444444444],
		"newnamecurrentpercentsalesacceptedopportunity" : [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 0, null, null, null, null, null, null, null, null, null, null, null, 0, null, null, null, null, null, null, null, null, null, null, null, 0.001388888888888889],
		"newnameevercustomer" : ["N/A", "N/A", "N/A", "N/A", 21, 2, "N/A", "N/A", "N/A", "N/A", 5, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 5, "N/A", "N/A", "N/A", "N/A", "N/A", 23, 2, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 117, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 6],
		"newnamecurrentsalesacceptedopportunity" : ["N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 0, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 0, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 1]
	};
    
	/*
	 break;
	 }
	 */
	/*
	 Mkt.apps.ProgramAnalyzer.demoRemoveData = function() {
	 //--> Remove Program Labels <--//
	 for (var i = this.analyzerData.summarydata.programs.length - 1; i > -1; i--) {
	 this.analyzerData.summarydata.programs.splice(i, 1);
	 }
	 };
	 */

	if (typeof (Mkt) !== 'undefined') {
		if (typeof (Mkt.apps.ProgramAnalyzer) !== 'undefined') {
			Mkt.apps.ProgramAnalyzer.demoLoadData = function() {
	
				if (data[this.compId]) {
					x = data[this.compId];
				} else {
					x = data[b2bId];
				}
	
				x = Ext.decode(Ext.encode(x));
	
				//--> Remove Metric Labels <--//
				/*
				 var metricsToRemove = x.metricsToRemove;
				 for (var i = 0; i < metricsToRemove.length; i++) {
				 this.analyzerData.programmetadata.metricsdata.splice(metricsToRemove[i], 1);
				 }
				 */
				this.analyzerData.summarydata = x.summarydata;
				this.analyzerData.detaildata = x.detaildata;
			};
	
			Mkt.apps.ProgramAnalyzer.setData = function() {
				var result = MktPage.appVars.analyzerData.GET_PROGRAM_DATA;
				this.analyzerData = this.parseData(result);
				//--> Define default metrics <--//
				//debugger;
				//alert(this.analyzerData.programmetadata.defaultXMetric);
				/*
				 this.analyzerData.programmetadata.defaultXMetric = "costs";
				 this.analyzerData.programmetadata.defaultYMetric = "newnames";
				 this.analyzerData.programmetadata.defaultZMetric = "none";
				 this.analyzerData.programmetadata.defaultWMetric = "none";
				 this.analyzerData.programmetadata = null;
				 */
				if (this.view == "by_channel") {
					if (this.compId == b2bId) {
                        this.analyzerPanelSettings.channelviewData = {
                            metrics : [{
                                comboname : b2bChannelX,
                                datarange : [6000, 179500]
                            }],
                            xCombo : b2bChannelX,
                            yCombo : b2bChannelY,
                            zCombo : b2bChannelZ,
                            wCombo : b2bChannelW
                        };
                    }
                    else if (this.compId == b2cId) {
                        this.analyzerPanelSettings.channelviewData = {
                            metrics : [{
                                comboname : b2cChannelX,
                                datarange : [6000, 179500]
                            }],
                            xCombo : b2cChannelX,
                            yCombo : b2cChannelY,
                            zCombo : b2cChannelZ,
                            wCombo : b2cChannelW
                        };
                    }
				}
	
				else if (this.view == "by_program") {
                    if (this.compId == b2bId) {
                        this.analyzerPanelSettings.programviewData = {
                            metrics : [{
                                comboname : b2bProgramX,
                                datarange : [200, 20000]
                            }],
                            xCombo : b2bProgramX,
                            yCombo : b2bProgramY,
                            zCombo : b2bProgramZ,
                            wCombo : b2bProgramW
                        };
                    }
                    else if (this.compId == b2cId) {
                        this.analyzerPanelSettings.programviewData = {
                            metrics : [{
                                comboname : b2cProgramX,
                                datarange : [200, 20000]
                            }],
                            xCombo : b2cProgramX,
                            yCombo : b2cProgramY,
                            zCombo : b2cProgramZ,
                            wCombo : b2cProgramW
                        };
                    }
				}
				//this.demoRemoveData();
				this.demoLoadData();
	
				//--> No Changes Below This Line <--//
				if (MktPage.appVars.analyzerData.status == "error") {
					Ext4.Msg.error(MktPage.appVars.analyzerData.msg);
				} else {
					this.rcaendpoint = MktPage.appVars.analyzerData.endpoint;
					this.rcacustprefix = MktPage.appVars.analyzerData.custprefix;
	
					if (this.validateData()) {
						var metrics = this.getProgramMetricsData();
						this.resetSettingsMenu();
						this.buildSettings();
						this.resetSliderSize('xSlider');
						this.resetSliderSize('ySlider');
						this.resetSliderSize('zSlider');
						this.resetPanel();
						this.compactSettingsPanel();
						//Set all the values and then draw the chart.
						this.bubbleChartData = this.setStoreData();
						Mkt.charts.bubbleChart.setChartSettings();
						Mkt.charts.bubbleChart.setChartData(this.bubbleChartData);
						Mkt.charts.bubbleChart.renderChart();
					}
				}
				this.channelExcludeList = ["Content", "Direct Mail", "Telemarketing", "Online Advertising", "Roadshow", "Blog", "List Purchase", "Webinar", "Social Media"];
				this.checkMenuItems();
				//this.view = "by_program";
				//this.byChannel = false;
				//this.byProgram = true;
				this.logscale = false;
				this.switchView();
				MktCanvas.unmask();
			};
	
			Mkt.apps.ProgramAnalyzer.saveView = function() {
				//debugger;
				if (this.view == "by_channel") {
                    if (this.compId == b2bId) {
                        this.channelViewSettings = {
                            xCombo : b2bChannelX, //this.xcombovalue,
                            yCombo : b2bChannelY, //this.ycombovalue,
                            zCombo : b2bChannelZ, //this.zcombovalue,
                            wCombo : b2bChannelW, //this.wcombovalue,
                            metrics : this.channelRangeSettings
                        };
                    }
                    else if (this.compId == b2cId) {
                        this.channelViewSettings = {
                            xCombo : b2cChannelX, //this.xcombovalue,
                            yCombo : b2cChannelY, //this.ycombovalue,
                            zCombo : b2cChannelZ, //this.zcombovalue,
                            wCombo : b2cChannelW, //this.wcombovalue,
                            metrics : this.channelRangeSettings
                        };
                    }
				}
                else if (this.view == "by_program") {
                    if (this.compId == b2bId) {
                        this.programViewSettings = {
                            xCombo : b2bProgramX, //this.xcombovalue,
                            yCombo : b2bProgramY, //this.ycombovalue,
                            zCombo : b2bProgramZ, //this.zcombovalue,
                            wCombo : b2bProgramW, //this.wcombovalue,
                            metrics : this.programRangeSettings
                        };
                    }
                    else if (this.compId == b2cId) {
                        this.programViewSettings = {
                            xCombo : b2cProgramX, //this.xcombovalue,
                            yCombo : b2cProgramY, //this.ycombovalue,
                            zCombo : b2cProgramZ, //this.zcombovalue,
                            wCombo : b2cProgramW, //this.wcombovalue,
                            metrics : this.programRangeSettings
                        };
                    }
				}
			}
		}
	}	
}