$ = jQuery.noConflict();
(function(){
	//do something here
	var innerlowerrightheight = 515 - $('.innerupperright').height();
	$('.innerlowerright').css('height', innerlowerrightheight);
})();
//my code here
var contselected = new Array();
var toggle = new Array();
var count = 0;
var contnum;
var demoscore;
var behavscore = 0;
var totalscore;
toggle[0] = 'off';
toggle[1] = 'off';
toggle[2] = 'off';
contselected[0] = 'none';
contselected[1] = 'none';
contselected[2] = 'none';
contselected[3] = 'none';
contselected[4] = 'none';
contselected[5] = 'none';
//if count is 3 or more do not work anymore. until count is decreased.
$('#cont1').toggle(function(){
	if (count < 3 && contselected[0] == 'none') {
		contselected[0] = 'cont1';
		count = count + 1;
		$(this).css('border', '2px solid #2680FF');
		$(this).append("<img id='checked1' src='../wp-content/themes/Nimble-child/images/checked1.png'></img>");
		$(this).css('background', 'url("../wp-content/themes/Nimble-child/images/attended_webinar_orange.png") no-repeat 6px -12px / 160px 160px rgba(0, 0, 0, 0)');
	}
	else if (count == 3){
		if ($(this).find('img').length){
			//if box is checked, uncheck and subtract 1
			contselected[0] = 'none';
			count = count - 1;
			$(this).css('border', 'none');
			$(this).find('img').remove();
			$(this).removeAttr('style');		
		}
	}
	else {
		count = count - 1;	
		contselected[0] = 'none';
		$(this).css('border', 'none');
		$(this).find('img').remove();
		$(this).removeAttr('style');			
	}
	},function(){
	if (contselected[0] == 'none' && count < 3) {
		$(this).css('border', '2px solid #2680FF');
		$(this).append("<img id='checked1' src='../wp-content/themes/Nimble-child/images/checked1.png'></img>");
		$(this).css('background', 'url("../wp-content/themes/Nimble-child/images/attended_webinar_orange.png") no-repeat 6px -12px / 160px 160px rgba(0, 0, 0, 0)');
		count = count + 1;	
		contselected[0] = 'cont1';
	}
	else if (count == 3){
		if ($(this).find('img').length){
			//if box is checked, uncheck and subtract 1
			contselected[0] = 'none';
			count = count - 1;
			$(this).css('border', 'none');
			$(this).find('img').remove();
			$(this).removeAttr('style');		
		}
	}
	else{
		count = count - 1;	
		contselected[0] = 'none';
		$(this).css('border', 'none');
		$(this).find('img').remove();
		$(this).removeAttr('style');	
	}
});

$('#cont2').toggle(function(){
	if (count < 3 && contselected[1] == 'none'){
	contselected[1] = 'cont2';
	count = count + 1;
	$(this).css('border', '2px solid #2680FF');	
	$(this).append("<img id='checked1' src='../wp-content/themes/Nimble-child/images/checked1.png'></img>");
	$(this).css('background', 'url("../wp-content/themes/Nimble-child/images/unsubscribe_orange.png") no-repeat 6px -12px / 160px 160px rgba(0, 0, 0, 0)');
	}else if (count == 3){
		if ($(this).find('img').length){
		//if box is checked, uncheck and subtract 1
		contselected[1] = 'none';
		count = count - 1;
		$(this).css('border', 'none');
		$(this).find('img').remove();
		$(this).removeAttr('style');		
		}
	}
	else{
		count = count - 1;	
		contselected[0] = 'none';
		$(this).css('border', '1px solid #000000');
		$(this).find('img').remove();
		$(this).removeAttr('style');	
	}
	},function(){
	if (contselected[1] == 'none' && count < 3){
		$(this).css('border', '2px solid #2680FF');
		$(this).append("<img id='checked1' src='../wp-content/themes/Nimble-child/images/checked1.png'></img>");
		$(this).css('background', 'url("../wp-content/themes/Nimble-child/images/unsubscribe_orange.png") no-repeat 6px -12px / 160px 160px rgba(0, 0, 0, 0)');
		count = count + 1;	
		contselected[1] = 'cont2';
	}else if (count == 3){
		if ($(this).find('img').length){
		//if box is checked, uncheck and subtract 1
		contselected[1] = 'none';
		count = count - 1;
		$(this).css('border', 'none');
		$(this).find('img').remove();
		$(this).removeAttr('style');		
		}
	}
	else{
		count = count - 1;
		contselected[1] = 'none';
		$(this).css('border', 'none');
		$(this).find('img').remove();
		$(this).removeAttr('style');		
	}
});

$('#cont3').toggle(function(){
	if (count < 3 && contselected[2] == 'none'){
	contselected[2] = 'cont3';
	count = count + 1;
	$(this).css('border', '2px solid #2680FF');
	$(this).append("<img id='checked1' src='../wp-content/themes/Nimble-child/images/checked1.png'></img>");
	$(this).css('background', 'url("../wp-content/themes/Nimble-child/images/contact_form_orange.png") no-repeat 6px -12px / 160px 160px rgba(0, 0, 0, 0)');
	}else if (count == 3){
		if ($(this).find('img').length){
		//if box is checked, uncheck and subtract 1
		contselected[2] = 'none';
		count = count - 1;
		$(this).css('border', 'none');
		$(this).find('img').remove();
		$(this).removeAttr('style');		
		}
	}
	else{
		count = count - 1;	
		contselected[0] = 'none';
		$(this).css('border', 'none');
		$(this).find('img').remove();
		$(this).removeAttr('style');	
	}
	},function(){
	if (contselected[2] == 'none' && count < 3){
		$(this).css('border', '2px solid #2680FF');
		$(this).append("<img id='checked1' src='../wp-content/themes/Nimble-child/images/checked1.png'></img>");
		$(this).css('background', 'url("../wp-content/themes/Nimble-child/images/contact_form_orange.png") no-repeat 6px -12px / 160px 160px rgba(0, 0, 0, 0)');
		count = count + 1;	
		contselected[2] = 'cont3';
	}else if (count == 3){
		if ($(this).find('img').length){
			//if box is checked, uncheck and subtract 1
			contselected[2] = 'none';
			count = count - 1;
			$(this).css('border', 'none');
			$(this).find('img').remove();
			$(this).removeAttr('style');		
		}
	}
	else{
		count = count - 1;
		contselected[2] = 'none';
		$(this).css('border', 'none');
		$(this).find('img').remove();
		$(this).removeAttr('style');		
	}
});

$('#cont4').toggle(function(){
	if (count < 3 && contselected[3] == 'none'){
	contselected[3] = 'cont4';
	count = count + 1;
	$(this).css('border', '2px solid #2680FF');
	$(this).append("<img id='checked1' src='../wp-content/themes/Nimble-child/images/checked1.png'></img>");
	$(this).css('background', 'url("../wp-content/themes/Nimble-child/images/career_page_orange.png") no-repeat 6px -12px / 160px 160px rgba(0, 0, 0, 0)');
	}else if (count == 3){
		if ($(this).find('img').length){
			//if box is checked, uncheck and subtract 1
			contselected[3] = 'none';
			count = count - 1;
			$(this).css('border', 'none');
			$(this).find('img').remove();
			$(this).removeAttr('style');		
		}
	}
	else{
		count = count - 1;	
		contselected[0] = 'none';
		$(this).css('border', 'none');
		$(this).find('img').remove();
		$(this).removeAttr('style');	
	}
	},function(){
	if (contselected[3] == 'none' && count < 3){
		$(this).css('border', '2px solid #2680FF');
		$(this).append("<img id='checked1' src='../wp-content/themes/Nimble-child/images/checked1.png'></img>");
		$(this).css('background', 'url("../wp-content/themes/Nimble-child/images/career_page_orange.png") no-repeat 6px -12px / 160px 160px rgba(0, 0, 0, 0)');
		count = count + 1;	
		contselected[3] = 'cont4';
	}else if (count == 3){
		if ($(this).find('img').length){
			//if box is checked, uncheck and subtract 1
			contselected[3] = 'none';
			count = count - 1;
			$(this).css('border', 'none');
			$(this).find('img').remove();
			$(this).removeAttr('style');		
		}
	}
	else{
		count = count - 1;
		contselected[3] = 'none';
		$(this).css('border', 'none');
		$(this).find('img').remove();
		$(this).removeAttr('style');		
	}
});

$('#cont5').toggle(function(){
	if (count < 3 && contselected[4] == 'none'){
	contselected[4] = 'cont5';
	count = count + 1;
	$(this).css('border', '2px solid #2680FF');
	$(this).append("<img id='checked1' src='../wp-content/themes/Nimble-child/images/checked1.png'></img>");
	$(this).css('background', 'url("../wp-content/themes/Nimble-child/images/visit_ten_orange.png") no-repeat 6px -12px / 160px 160px rgba(0, 0, 0, 0)');
	}else if (count == 3){
		if ($(this).find('img').length){
			//if box is checked, uncheck and subtract 1
			contselected[4] = 'none';
			count = count - 1;
			$(this).css('border', 'none');
			$(this).find('img').remove();
			$(this).removeAttr('style');		
		}
	}
	else{
		count = count - 1;	
		contselected[0] = 'none';
		$(this).css('border', 'none');
		$(this).find('img').remove();
		$(this).removeAttr('style');	
	}
	},function(){
	if (contselected[4] == 'none' && count < 3){
		$(this).css('border', '2px solid #2680FF');
		$(this).append("<img id='checked1' src='../wp-content/themes/Nimble-child/images/checked1.png'></img>");
		$(this).css('background', 'url("../wp-content/themes/Nimble-child/images/visit_ten_orange.png") no-repeat 6px -12px / 160px 160px rgba(0, 0, 0, 0)');
		count = count + 1;	
		contselected[4] = 'cont5';
	}else if (count == 3){
		if ($(this).find('img').length){
			//if box is checked, uncheck and subtract 1
			contselected[4] = 'none';
			count = count - 1;
			$(this).css('border', 'none');
			$(this).find('img').remove();
			$(this).removeAttr('style');		
		}
	}
	else{
		count = count - 1;
		contselected[4] = 'none';
		$(this).css('border', 'none');
		$(this).find('img').remove();
		$(this).removeAttr('style');		
	}
});

$('#cont6').toggle(function(){
	if (count < 3 && contselected[5] == 'none'){
	contselected[5] = 'cont6';
	count = count + 1;
	$(this).css('border', '2px solid #2680FF');
	$(this).append("<img id='checked1' src='../wp-content/themes/Nimble-child/images/checked1.png'></img>");
	$(this).css('background', 'url("../wp-content/themes/Nimble-child/images/pricing_page_orange.png") no-repeat 6px -12px / 160px 160px rgba(0, 0, 0, 0)');
	}else if (count == 3){
		if ($(this).find('img').length){
			//if box is checked, uncheck and subtract 1
			contselected[5] = 'none';
			count = count - 1;
			$(this).css('border', 'none');
			$(this).find('img').remove();
			$(this).removeAttr('style');		
		}
	}
	else{
		count = count - 1;	
		contselected[0] = 'none';
		$(this).css('border', 'none');
		$(this).find('img').remove();
		$(this).removeAttr('style');	
	}
	},function(){
	if (contselected[5] == 'none' && count < 3){
		$(this).css('border', '2px solid #2680FF');
		$(this).append("<img id='checked1' src='../wp-content/themes/Nimble-child/images/checked1.png'></img>");
		$(this).css('background', 'url("../wp-content/themes/Nimble-child/images/pricing_page_orange.png") no-repeat 6px -12px / 160px 160px rgba(0, 0, 0, 0)');
		count = count + 1;	
		contselected[5] = 'cont6';
	}else if (count == 3){
		if ($(this).find('img').length){
			//if box is checked, uncheck and subtract 1
			contselected[5] = 'none';
			count = count - 1;
			$(this).css('border', 'none');
			$(this).find('img').remove();
			$(this).removeAttr('style');		
			}
	}
	else{
		count = count - 1;
		contselected[5] = 'none';
		$(this).css('border', 'none');
		$(this).find('img').remove();
		$(this).removeAttr('style');		
	}
});

$('#avatar1').toggle(function(){
	$('#avatar2').css('border', 'none');
	$('#avatar2').find('img').remove();
	$('#avatar3').css('border', 'none');
	$('#avatar3').find('img').remove();
	toggle[2] = 'off';
	toggle[1] = 'off';
	if(toggle[0] == 'off'){
		$(this).css('border', '2px solid #2680FF');
		$(this).append("<img id='checked' src='../wp-content/themes/Nimble-child/images/checked.png'></img>");
		toggle[0] = 'on';
	}else{
		$(this).css('border', 'none');
		$(this).find('img').remove();
		toggle[0] = 'off';
	}
},function(){
	$('#avatar2').css('border', 'none');
	$('#avatar2').find('img').remove();
	$('#avatar3').css('border', 'none');
	$('#avatar3').find('img').remove();
	toggle[2] = 'off';
	toggle[1] = 'off';
	if(toggle[0] == 'off'){
		$(this).css('border', '2px solid #2680FF');
		$(this).append("<img id='checked' src='../wp-content/themes/Nimble-child/images/checked.png'></img>");
		toggle[0] = 'on';
	}else{
		$(this).css('border', 'none');
		$(this).find('img').remove();
		toggle[0] = 'off';
	}
});

$('#avatar2').toggle(function(){
	$('#avatar1').css('border', 'none');
	$('#avatar1').find('img').remove();
	$('#avatar3').css('border', 'none');
	$('#avatar3').find('img').remove();
	toggle[0] = 'off';
	toggle[2] = 'off';
	if(toggle[1] == 'off'){
		$(this).css('border', '2px solid #2680FF');
		$(this).append("<img id='checked' src='../wp-content/themes/Nimble-child/images/checked.png'></img>");
		toggle[1] = 'on';
	}else{
		$(this).css('border', 'none');
		$(this).find('img').remove();
		toggle[1] = 'off';
	}
},function(){
	$('#avatar1').css('border', 'none');
	$('#avatar1').find('img').remove();
	$('#avatar3').css('border', 'none');
	$('#avatar3').find('img').remove();
	toggle[0] = 'off';
	toggle[2] = 'off';
	if(toggle[1] == 'off'){
		$(this).css('border', '2px solid #2680FF');
		$(this).append("<img id='checked' src='../wp-content/themes/Nimble-child/images/checked.png'></img>");
		toggle[1] = 'on';
	}else{
		$(this).css('border', 'none');
		$(this).find('img').remove();
		toggle[1] = 'off';
	}
});

$('#avatar3').toggle(function(){
	$('#avatar2').css('border', 'none');
	$('#avatar2').find('img').remove();
	$('#avatar1').css('border', 'none');
	$('#avatar1').find('img').remove();
	toggle[0] = 'off';
	toggle[1] = 'off';
	if(toggle[2] == 'off'){
		$(this).css('border', '2px solid #2680FF');
		$(this).append("<img id='checked' src='../wp-content/themes/Nimble-child/images/checked.png'></img>");
		toggle[2] = 'on';
	}else{
		$(this).css('border', 'none');
		$(this).find('img').remove();
		toggle[2] = 'off';
	}
},function(){
	$('#avatar2').css('border', 'none');
	$('#avatar2').find('img').remove();
	$('#avatar1').css('border', 'none');
	$('#avatar1').find('img').remove();
	toggle[0] = 'off';
	toggle[1] = 'off';
	if(toggle[2] == 'off'){
		$(this).css('border', '2px solid #2680FF');
		$(this).append("<img id='checked' src='../wp-content/themes/Nimble-child/images/checked.png'></img>");
		toggle[2] = 'on';
	}else{
		$(this).css('border', 'none');
		$(this).find('img').remove();
		toggle[2] = 'off';
	}
});

//Score it!
//on click, if toggle[0],toggle[1],or toggle[2] == 'on' and if count == 3, remove the button and compute score and show a try again button.
//else, display, you didn't pick a demographic and behavioral fit for your guy.

$(document).on('click', '.scoreit', function(){
	behavscore = 0;
	behaval = '';
	demoscore = 0;
	demoval = '';
	totalscore = 0;
	if((toggle[0] == 'on' || toggle[1] == 'on' || toggle[2] == 'on') && count == 3){
		//get demographic score
		if (toggle[0] == 'on'){
			demoscore = 25;
			demoval = 'ne=99&i=Financial%20Services&jf=Practitioner&';
		}else if (toggle[1] == 'on'){
			demoscore = 15;
			demoval = 'ne=499&i=Healthcare&jf=Executive&';
		}else{
			demoscore = 50;
			demoval = 'ne=999&i=Software&jf=Technologist&';
		}
		//get behavior score
		$.each(contselected, function(index, value){
			//12, -20, 15, -10, 30, 20
			if (value != 'none'){
				if (index == 0){
					behavscore = behavscore + 12; //--> Attended a Webinar
					behaval = behaval + 'a';
				}
				if (index == 1){
					behavscore = behavscore + -20; // --> Unsubscribe
					behaval = behaval + 'b';
				}
				if (index == 2){
					behavscore = behavscore + 15; //--> Visit 10 Page in 1 Hour
					behaval = behaval + 'c';
				}
				if (index == 3){
					behavscore = behavscore + -10; //--> Visit Career Page
					behaval = behaval + 'd';
				}
				if (index == 4){
					behavscore = behavscore + 30; //--> Complete Contact Me Form
					behaval = behaval + 'e';
				}
				if (index == 5){
					behavscore = behavscore + 20; //--> Visit Pricing Page
					behaval = behaval + 'f';
				}
			}
		});
		//get total score
		totalscore = demoscore + behavscore;
		combineval = demoval + behaval;
		//step 1: empty contents inside DIV
		$('.innerlowerright').empty();
		//step 2: write demographic and behavioral score.
		scoreappend = "<div id='dembah'><p style='float:left'>Demographic Score: " + demoscore + "</p><p style='float:right'>Behavior Score: " + behavscore + "</p></div>";
		$('.innerlowerright').append(scoreappend);
		//step 3: create total score
		pbappend = "<div id='progressbar'></div>";
		$('.innerlowerright').append(pbappend);
		tsappend = "<div id='tscore'><p>Total: " + totalscore + " / 70</p></div>";
		$(function() {
		    $("#progressbar").progressbar({
		      value: totalscore
		    });
		 });
		 $('.innerlowerright').append(tsappend);
		//step 4: create try again button
		//$('.innerlowerright').append("<div class='retry'>Again!</div>");
		if (totalscore >= 70){
			$('.innerlowerright').append("<div id='youwin'>Congratulations! You Won!</div>");
			$('.innerlowerright').append("<div class='retry'>Winner!</div>");
			setTimeout(function(){
				window.location.href = "http://pages.marketosolutionsconsulting.com/submit-your-score-now.html?"+ combineval;
			},1000);
		}else{
			$('.innerlowerright').append("<div class='retry'>Again!</div>");
			$('.innerlowerright').append("<div id='youwin'>Not quite a fit! Try Again?</div>");	
		}
	}
	else{
		if (!$('#tryagain').length){
		$('.innerlowerright').append("<div id='tryagain'>Oops! You must choose 1 Profile and 3 Behavior!</div>");
		}
	}
});

$(document).on('click', '.retry', function(){
	//step 1: empty contents of innerlowerright
	$('.innerlowerright').empty();
	//step 2: append the score it button
	$('.innerlowerright').append("<div class='scoreit'>Score it!</div>");
	//step 3: clear the checkboxes
	$('#avatar1').css('border', 'none');
	$('#avatar1').find('img').remove();
	$('#avatar2').css('border', 'none');
	$('#avatar2').find('img').remove();
	$('#avatar3').css('border', 'none');
	$('#avatar3').find('img').remove();
	toggle[0] = 'off';
	toggle[1] = 'off';
	toggle[2] = 'off';
	$.each(contselected, function(index, value){
		contselected[index] = 'none';
		index = index + 1;
		contnum = '' + index;
		if (value == 'cont' + contnum){
			contid = '#cont' + contnum;
			$(contid).css('border', '1px solid #000000');
			$(contid).find('img').remove();
			$(contid).removeAttr('style');
		}
	});
	count = 0;
});
