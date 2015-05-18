$ = jQuery.noConflict();

var toggle = new Array();

toggle[0] = 'off';
toggle[1] = 'off';
toggle[2] = 'off';

var pp;
var pa;
var pb;
var pc;

pp = "<p>In the examples below, you will be able to choose a nurture program and Marketo will nurture you with relevant content.</p>";

pa = "<p>Marvelous! You have selected a nurture program based on Persona. Fill in the information below and click Start Nurture!</p>";

pb = "<p>Far Out! You have selected a nurture program based on Buying Stage. Fill in the information below and click Start Nurture!</p>";

pc = "<p>Spectacular! You have selected a nurture program based on Product Interest. Fill in the information below and click Start Nurture!</p>";


$(function(){
	$("#stream1").css('visibility', 'hidden');
	$("#stream2").css('visibility', 'hidden');
	$("#stream3").css('visibility', 'hidden');
	$("#mktformposA").css('visibility', 'hidden');
	$("#mktformposB").css('visibility', 'hidden');
	$("#mktformposC").css('visibility', 'hidden');
});

$('#producta').toggle(function(){ //--> Uses form 1031
	$('#productb').css('border', 'none');
	$('#productb').find('img').remove();
	$('#productc').css('border', 'none');
	$('#productc').find('img').remove();
	toggle[2] = 'off';
	toggle[1] = 'off';
	if(toggle[0] == 'off'){
		$(this).css('border', '5px solid #2680FF');
		$(this).append("<img id='checked1' src='../wp-content/themes/Nimble-child/images/checked1.png'></img>");
		toggle[0] = 'on';
		$('#s1').empty().append('Executive');
		$('#t1').empty().append('1. The Business Value');
		$('#t2').empty().append('2. A Case Study');
		$('#t3').empty().append('3. An ROI Calculator');
		$('#t4').empty().append('4. Maximize Productivity');
		$('#s2').empty().append('Practitioner');
		$('#t5').empty().append('1. A Definitive Guide');
		$('#t6').empty().append('2. A Buyers Guide');
		$('#t7').empty().append('3. An Infographic');
		$('#t8').empty().append('4. Accelerate Your Career');
		$('#s3').empty().append('Technologist');
		$('#t9').empty().append('1. A Developer Blog Post');
		$('#t10').empty().append('2. The Top 5 API Use Cases');
		$('#t11').empty().append('3. The Setup Guide');
		$('#t12').empty().append('4. The Dev Community');
		$("#stream1").css('visibility', 'visible').effect('slide', { direction: "down" });
		$("#stream2").css('visibility', 'visible').effect('slide', { direction: "down" });
		$("#stream3").css('visibility', 'visible').effect('slide', { direction: "down" });
		$('#instructions').empty().append(pa);
		$("#mktformposA").css('visibility', 'visible');
		$("#mktformposB").css('visibility', 'hidden');
		$("#mktformposC").css('visibility', 'hidden');
		$('form').css('padding-top', '15px');
	}else{
		$(this).css('border', 'none');
		$(this).find('img').remove();
		toggle[0] = 'off';
		$("#stream1").css('visibility', 'hidden').effect('slide', { direction: "down" });
		$("#stream2").css('visibility', 'hidden');
		$("#stream3").css('visibility', 'hidden');
		$("#mktformposA").css('visibility', 'hidden');
		$("#mktformposB").css('visibility', 'hidden');
		$("#mktformposC").css('visibility', 'hidden');
		$('#instructions').empty().append(pp);
	}
},function(){
	$('#productb').css('border', 'none');
	$('#productb').find('img').remove();
	$('#productc').css('border', 'none');
	$('#productc').find('img').remove();
	toggle[2] = 'off';
	toggle[1] = 'off';
	if(toggle[0] == 'off'){
		$(this).css('border', '5px solid #2680FF');
		$(this).append("<img id='checked1' src='../wp-content/themes/Nimble-child/images/checked1.png'></img>");
		toggle[0] = 'on';	
		$('#s1').empty().append('Executive');
		$('#t1').empty().append('1. The Business Value');
		$('#t2').empty().append('2. A Case Study');
		$('#t3').empty().append('3. An ROI Calculator');
		$('#t4').empty().append('4. Maximize Productivity');
		$('#s2').empty().append('Practitioner');
		$('#t5').empty().append('1. A Definitive Guide');
		$('#t6').empty().append('2. A Buyers Guide');
		$('#t7').empty().append('3. An Infographic');
		$('#t8').empty().append('4. Accelerate Your Career');
		$('#s3').empty().append('Technologist');
		$('#t9').empty().append('1. A Developer Blog Post');
		$('#t10').empty().append('2. The Top 5 API Use Cases');
		$('#t11').empty().append('3. The Setup Guide');
		$('#t12').empty().append('4. The Dev Community');
		$("#stream1").css('visibility', 'visible').effect('slide', { direction: "down" });
		$("#stream2").css('visibility', 'visible').effect('slide', { direction: "down" });
		$("#stream3").css('visibility', 'visible').effect('slide', { direction: "down" });
		$('#instructions').empty().append(pa);
		$("#mktformposA").css('visibility', 'visible');
		$("#mktformposB").css('visibility', 'hidden');
		$("#mktformposC").css('visibility', 'hidden');
		$('form').css('padding-top', '15px');
	}else{
		$(this).css('border', 'none');
		$(this).find('img').remove();
		toggle[0] = 'off';
		$("#stream1").css('visibility', 'hidden').effect('slide', { direction: "down" });
		$("#stream2").css('visibility', 'hidden');
		$("#stream3").css('visibility', 'hidden');
		$("#mktformposA").css('visibility', 'hidden');
		$("#mktformposB").css('visibility', 'hidden');
		$("#mktformposC").css('visibility', 'hidden');
		$('#instructions').empty().append(pp);
		$("#mktformpos").css('visibility', 'hidden').effect('slide', { direction: "down" });
	}
});

$('#productb').toggle(function(){ //--> Uses form 1154
	$('#producta').css('border', 'none');
	$('#producta').find('img').remove();
	$('#productc').css('border', 'none');
	$('#productc').find('img').remove();
	toggle[0] = 'off';
	toggle[2] = 'off';
	if(toggle[1] == 'off'){
		$(this).css('border', '5px solid #2680FF');
		$(this).append("<img id='checked1' src='../wp-content/themes/Nimble-child/images/checked1.png'></img>");
		toggle[1] = 'on';
		$('#s1').empty().append('New Lead');
		$('#t1').empty().append('7 Rules to Live By');
		$('#t2').empty().append('Driving Conversions');
		$('#t3').empty().append('Make Engaging Emails');
		$('#t4').empty().append('Social Media & Leadership');
		$('#s2').empty().append('Sales Qualfied');
		$('#t5').empty().append('2013 CRM Market Winner');
		$('#t6').empty().append('Gartner MQ Report');
		$('#t7').empty().append('ROI of Marketing Automation');
		$('#t8').empty().append('Why Marketo: Think Big; Start Fast');
		$('#s3').empty().append('Opportunity');
		$('#t9').empty().append('3 Quick Wins');
		$('#t10').empty().append('Closed-Loop Analytics');
		$('#t11').empty().append('Customer Case Study');
		$('#t12').empty().append('Message from the CEO');
		$("#stream1").css('visibility', 'visible').effect('slide', { direction: "down" });
		$("#stream2").css('visibility', 'visible').effect('slide', { direction: "down" });
		$("#stream3").css('visibility', 'visible').effect('slide', { direction: "down" });
		$("#mktformposB").css('visibility', 'visible');
		$("#mktformposA").css('visibility', 'hidden');
		$("#mktformposC").css('visibility', 'hidden');
		$('#instructions').empty().append(pb);
	}else{
		$(this).css('border', 'none');
		$(this).find('img').remove();
		toggle[1] = 'off';
		$("#stream1").css('visibility', 'hidden').effect('slide', { direction: "down" });
		$("#stream2").css('visibility', 'hidden');
		$("#stream3").css('visibility', 'hidden');
		$("#mktformposA").css('visibility', 'hidden');
		$("#mktformposB").css('visibility', 'hidden');
		$("#mktformposC").css('visibility', 'hidden');
		$('#instructions').empty().append(pp);
	}
},function(){
	$('#producta').css('border', 'none');
	$('#producta').find('img').remove();
	$('#productc').css('border', 'none');
	$('#productc').find('img').remove();
	toggle[0] = 'off';
	toggle[2] = 'off';
	if(toggle[1] == 'off'){
		$(this).css('border', '5px solid #2680FF');
		$(this).append("<img id='checked1' src='../wp-content/themes/Nimble-child/images/checked1.png'></img>");
		toggle[1] = 'on';
		$('#s1').empty().append('New Lead');
		$('#t1').empty().append('7 Rules to Live By');
		$('#t2').empty().append('Driving Conversions');
		$('#t3').empty().append('Make Engaging Emails');
		$('#t4').empty().append('Social Media & Leadership');
		$('#s2').empty().append('Sales Qualified');
		$('#t5').empty().append('2013 CRM Market Winner');
		$('#t6').empty().append('Gartner MQ Report');
		$('#t7').empty().append('ROI of Marketing Automation');
		$('#t8').empty().append('Think Big; Start Fast');
		$('#s3').empty().append('Opportunity');
		$('#t9').empty().append('3 Quick Wins');
		$('#t10').empty().append('Closed-Loop Analytics');
		$('#t11').empty().append('Customer Case Study');
		$('#t12').empty().append('Message from the CEO');
		$("#stream1").css('visibility', 'visible').effect('slide', { direction: "down" });
		$("#stream2").css('visibility', 'visible').effect('slide', { direction: "down" });		
		$("#stream3").css('visibility', 'visible').effect('slide', { direction: "down" });
		$("#mktformposB").css('visibility', 'visible');
		$("#mktformposA").css('visibility', 'hidden');
		$("#mktformposC").css('visibility', 'hidden');
		$('#instructions').empty().append(pb);
	}else{
		$(this).css('border', 'none');
		$(this).find('img').remove();
		toggle[1] = 'off';
		$("#stream1").css('visibility', 'hidden').effect('slide', { direction: "down" });
		$("#stream2").css('visibility', 'hidden');
		$("#stream3").css('visibility', 'hidden');
		$("#mktformposA").css('visibility', 'hidden');
		$("#mktformposB").css('visibility', 'hidden');
		$("#mktformposC").css('visibility', 'hidden');
		$('#instructions').empty().append(pp);
	}
});

$('#productc').toggle(function(){ //--> Uses form 1155
	$('#productb').css('border', 'none');
	$('#productb').find('img').remove();
	$('#producta').css('border', 'none');
	$('#producta').find('img').remove();
	toggle[0] = 'off';
	toggle[1] = 'off';
	if(toggle[2] == 'off'){
		$(this).css('border', '5px solid #2680FF');
		$(this).append("<img id='checked1' src='../wp-content/themes/Nimble-child/images/checked1.png'></img>");
		toggle[2] = 'on';
		$('#s1').empty().append('Product A');
		$('#t1').empty().append('Product A Brochure');
		$('#t2').empty().append('Product A Infographic');
		$('#t3').empty().append('Product A Features');
		$('#t4').empty().append('Product A Case Study');
		$('#s2').empty().append('Product B');
		$('#t5').empty().append('Product B Brochure');
		$('#t6').empty().append('Product B Features');
		$('#t7').empty().append('Product B Case Study');
		$('#t8').empty().append('Product B Infographic');
		$('#s3').empty().append('Product C');
		$('#t9').empty().append('Product C Infographic');
		$('#t10').empty().append('Product C Case Study');
		$('#t11').empty().append('Product C Features');
		$('#t12').empty().append('Product C Brochure');		
		$("#stream1").css('visibility', 'visible').effect('slide', { direction: "down" });
		$("#stream2").css('visibility', 'visible').effect('slide', { direction: "down" });
		$("#stream3").css('visibility', 'visible').effect('slide', { direction: "down" });
		$("#mktformposC").css('visibility', 'visible');
		$("#mktformposA").css('visibility', 'hidden');
		$("#mktformposB").css('visibility', 'hidden');
		$('#instructions').empty().append(pc);
	}else{
		$(this).css('border', 'none');
		$(this).find('img').remove();
		toggle[2] = 'off';
		$("#stream1").css('visibility', 'hidden').effect('slide', { direction: "down" });
		$("#stream2").css('visibility', 'hidden');
		$("#stream3").css('visibility', 'hidden');
		$("#mktformposA").css('visibility', 'hidden');
		$("#mktformposB").css('visibility', 'hidden');
		$("#mktformposC").css('visibility', 'hidden');
		$('#instructions').empty().append(pp);
	}
},function(){
	$('#productb').css('border', 'none');
	$('#productb').find('img').remove();
	$('#producta').css('border', 'none');
	$('#producta').find('img').remove();
	toggle[0] = 'off';
	toggle[1] = 'off';
	if(toggle[2] == 'off'){
		$(this).css('border', '5px solid #2680FF');
		$(this).append("<img id='checked1' src='../wp-content/themes/Nimble-child/images/checked1.png'></img>");
		toggle[2] = 'on';
		$('#s1').empty().append('Product A');
		$('#t1').empty().append('Product A Brochure');
		$('#t2').empty().append('Product A Infographic');
		$('#t3').empty().append('Product A Features');
		$('#t4').empty().append('Product A Case Study');
		$('#s2').empty().append('Product B');
		$('#t5').empty().append('Product B Brochure');
		$('#t6').empty().append('Product B Features');
		$('#t7').empty().append('Product B Case Study');
		$('#t8').empty().append('Product B Infographic');
		$('#s3').empty().append('Product C');
		$('#t9').empty().append('Product C Infographic');
		$('#t10').empty().append('Product C Case Study');
		$('#t11').empty().append('Product C Features');
		$('#t12').empty().append('Product C Brochure');	
		$("#stream2").css('visibility', 'visible').effect('slide', { direction: "down" });
		$("#stream1").css('visibility', 'visible').effect('slide', { direction: "down" });
		$("#stream3").css('visibility', 'visible').effect('slide', { direction: "down" });
		$("#mktformposC").css('visibility', 'visible');
		$("#mktformposA").css('visibility', 'hidden');
		$("#mktformposB").css('visibility', 'hidden');
		$('#instructions').empty().append(pc);
	}else{
		$(this).css('border', 'none');
		$(this).find('img').remove();
		toggle[2] = 'off';
		$("#stream1").css('visibility', 'hidden').effect('slide', { direction: "down" });
		$("#stream2").css('visibility', 'hidden');
		$("#stream3").css('visibility', 'hidden');
		$("#mktformposA").css('visibility', 'hidden');
		$("#mktformposB").css('visibility', 'hidden');
		$("#mktformposC").css('visibility', 'hidden');
		$('#instructions').empty().append(pp);
	}
});

$(document).on('click', '.scoreitnurture', function(){
	if((toggle[0] == 'on' || toggle[1] == 'on' || toggle[2] == 'on')){
		$('.scoreitnurture').empty();
		$('.scoreitnurture').append('Please Wait');
		//get demographic score
		if (toggle[0] == 'on'){
			mktoMunchkinFunction('clickLink', {
		    	href: '/persona'
		    });
			setTimeout(function(){
				window.location.replace("http://marketosolutionsconsulting.com/m/b2b/nurture/confirmation");
				},5000);				
		}else if (toggle[1] == 'on'){
			mktoMunchkinFunction('clickLink', {
		    	href: '/stage'
		    });
			setTimeout(function(){
				window.location.replace("http://marketosolutionsconsulting.com/m/b2b/nurture/confirmation");
				},5000);
		}else{
			mktoMunchkinFunction('clickLink', {
		    	href: '/product'
		    });
			setTimeout(function(){
				window.location.replace("http://marketosolutionsconsulting.com/m/b2b/nurture/confirmation");
				},5000);
		}
	}
});