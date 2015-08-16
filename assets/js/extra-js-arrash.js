
function guideOption(option){
	var optionSelected = option + '-guide-option-words';
	var optionSelectedId = document.getElementById(optionSelected);
	optionSelectedId.style.color = '#ff7139';
}

function guideOptionOff(option){
	var optionSelected = option + '-guide-option-words';
	var optionSelectedId = document.getElementById(optionSelected);
	optionSelectedId.style.color = '#fff';
}
function showTitle(image){
	var imageTitleChosen = document.getElementById(image);
	var automate = document.getElementById('automate-image-title-container');
	var nurture = document.getElementById('nurture-image-title-container');
	var batch = document.getElementById('batch-image-title-container');
	if(image == 'batch-image-title-container'){
		$(automate).fadeOut("slow", "linear");
		$(nurture).fadeOut("slow", "linear");
		$(imageTitleChosen).fadeIn("slow", "linear");
	}
	else if(image == 'automate-image-title-container'){
		$(batch).fadeOut("slow", "linear");
		$(nurture).fadeOut("slow", "linear");
		$(imageTitleChosen).fadeIn("slow", "linear");
	}
	else if(image == 'nurture-image-title-container'){
		$(batch).fadeOut("slow", "linear");
		$(automate).fadeOut("slow", "linear");
		$(imageTitleChosen).fadeIn("slow", "linear");
	}
	else{}
}

function hideTitle(image){
	var imageTitleChosen = document.getElementById(image);
	//$(imageTitleChosen).hide( "slow");
}

function show_picklist1(section){
	var values = [];
	var sectionSelected = section;
	var bool = true;
	var x = 1;
	while(bool){
		var y = x+1;
		var picklistChosen = 'show_picklist-' + sectionSelected;
		var picklistChosenId = document.getElementById(picklistChosen);
		picklistChosenId.style.display = 'none';
		var originalElementString = sectionSelected + '-picklist-value-';
		var elementString = originalElementString + x.toString();
		var nextElementString = originalElementString + y.toString();
		var elementId = document.getElementById(elementString);
		elementId.style.display = 'block';
		if(!document.getElementById(nextElementString))
			bool = false;
		x++;
	}
}

function bubble_hover(chosenStep){
	var currValues = getPicklistValue(chosenStep);

	var stepChosen = currValues.step + '-bubble-option-value-' + currValues.number;
	var stepContainerChosen = currValues.step + '-bubble-option-' + currValues.number;
	var stepWords = currValues.step + '-words-' + currValues.number;
	var stepImage = currValues.step + '-image-' + currValues.number;
	var batchSubTitle = currValues.step + '-sub-title';
	//define the values, first of the picklist, then of the image and words
	var stepChosen = document.getElementById(stepChosen);
	var stepContainerChosen = document.getElementById(stepContainerChosen);
	//variables for values
	var stepWords = document.getElementById(stepWords);
	var stepImage = document.getElementById(stepImage);
	//define the values, first of the picklist, then of the image and words
	//change the images and words appearing

	for(var a = 1; a < 8; a++){
	if(a == currValues.number){
		stepContainerChosen.style.backgroundColor = '#5a54a4';
		stepChosen.style.color = '#fff';
		document.getElementById(batchSubTitle).innerHTML = stepChosen.innerHTML;
		$(stepWords).fadeTo(2000,1);
		$(stepImage).fadeTo(2000,1);
	}
	else{
		var notStepContainerChosen = currValues.step + '-bubble-option-' + a;
		if(document.getElementById(notStepContainerChosen)){
			var notStepChosen = currValues.step + '-bubble-option-value-' + a;
			var notStepWords = currValues.step + '-words-' + a;
			var notStepImage = currValues.step + '-image-' + a;
			notStepContainerChosen = document.getElementById(notStepContainerChosen);
			notStepChosen = document.getElementById(notStepChosen);
			notStepWords = document.getElementById(notStepWords);
			notStepImage = document.getElementById(notStepImage);
			notStepChosen.style.color = '#5a54a4';
			notStepContainerChosen.style.backgroundColor = '#fff';
			notStepWords.style.display = 'none';
			notStepImage.style.display = 'none';
		}
		else{
			break;
		}
	}
	}
}


function picklist_chosen(chosenStep){
	var currValues = getPicklistValue(chosenStep);

	var stepChosen = currValues.step + '-picklist-drop-down-value-' + currValues.number;
	var stepContainerChosen = currValues.step + '-picklist-value-' + currValues.number;

	//define the values, first of the picklist, then of the image and words
	var step = document.getElementById(chosenStep).innerHTML;
	var stepChosen = document.getElementById(stepChosen);
	var stepContainerChosen = document.getElementById(stepContainerChosen);
	//variables for values
	var picklistChosen = 'show_picklist-' + currValues.step;
	var stepWords = document.getElementById(stepWords);
	var stepImage = document.getElementById(stepImage);
	//define the values, first of the picklist, then of the image and words
	//change the images and words appearing
	var picklistChosenId = document.getElementById(picklistChosen);
	picklistChosenId.style.display = 'block';
	document.getElementById('dd-value').innerHTML = step;

	for(var a = 1; a < 5; a++){
	if(a == currValues.number){
		stepContainerChosen.style.display = 'none';
		$(stepWords).fadeTo(2000,1);
		$(stepImage).fadeTo(2000,1);
	}
	else{
		var notStepContainerChosen = currValues.step + '-picklist-value-' + a;
		if(document.getElementById(notStepContainerChosen)){
			var notStepWords = currValues.step + '-words-' + a;
			var notStepImage = currValues.step + '-image-' + a;
			notStepContainerChosen = document.getElementById(notStepContainerChosen);
			notStepWords = document.getElementById(notStepWords);
			notStepImage = document.getElementById(notStepImage);
			notStepContainerChosen.style.display = 'none';
			notStepWords.style.display = 'none';
			notStepImage.style.display = 'none';
		}
		else{
			break;
		}
	}

}
	//change words and image
	//make the picklist disappear
}

function picklist_chosen1(chosenStep){
	var currValues = getPicklistValue(chosenStep);

	//variables for values
	var stepChosen = currValues.step + '-picklist-drop-down-value-' + currValues.number;
	var stepContainerChosen = currValues.step + '-picklist-value-' + currValues.number;
	var stepWords = currValues.step + '-words-' + currValues.number;
	var stepImage = currValues.step + '-image-' + currValues.number;

	//define the values, first of the picklist, then of the image and words
	var step = document.getElementById(chosenStep).innerHTML;
	var stepChosen = document.getElementById(stepChosen);
	var stepWords = document.getElementById(stepWords);
	var stepImage = document.getElementById(stepImage);
	var stepContainerChosen = document.getElementById(stepContainerChosen);

	//change the images and words appearing
	for(var a = 1; a < 5; a++){
		if(a == currValues.number){
			$(stepWords).fadeTo(2000,1);
			$(stepImage).fadeTo(2000,1);
		}
		else{
			var notStepContainerChosen = currValues.step + '-picklist-value-' + a;
			if(document.getElementById(notStepContainerChosen)){
				var notStepWords = currValues.step + '-words-' + a;
				var notStepImage = currValues.step + '-image-' + a;
				notStepWords = document.getElementById(notStepWords);
				notStepImage = document.getElementById(notStepImage);
				notStepWords.style.display = 'none';
				notStepImage.style.display = 'none';
			}
			else{
				break;
			}
		}

	}

	//change words and image
	//make the picklist disappear
}

function getPicklistValue(chosenStep){
	var bool = true;
	var charbool = true;
	var x = 0;
	var y = 0;
	var nextChar = "";
	var currChar = "";
	var currNum = 0;
	while(bool){
		y = x+1;
		if(charbool == true)
			currChar = currChar + chosenStep[x];
		else{}
		if(chosenStep[y] == '-')
			charbool = false;
		else{}
		if(parseInt(chosenStep[x])){
			currNum = chosenStep[x];
			bool = false;
		}
		x++;
	}
	var neededValues = {number: currNum, step: currChar};
	return neededValues;
}

$( document ).ready(function() {
  function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  }

  var engagementWords = [
		'With Marketo Mobile Engagement, designing and delivering push notifications and in-app messages is as simple as creating an email.', 
		'Beacon technology allows Mobile Apps to understand their position on a micro-local scale, and deliver hyper-contextual content to users based on location. This means users can be messaged when they pass by a location with a beacon',
		'In-app messaging allows you to deliver engaging and relevant messages to your users.  As soon as your users open your app, they will see their personalized message.',
		'Close the loop by synchronizing purchase data back to Marketo to report on how impactful each mobile campaign is to  your overall Marketing strategy.'
	]


  $('#marketo-live-home').animate({'top' : '10%'}, 600);
  $('#marketo-live-home-option').animate({'margin-bottom' : '5%'}, 600);
  	
	$("#help-link").click(function(){
		var bkg = document.getElementsByClassName('help-cover');
		var container = document.getElementsByClassName('help-center-container');
		var centerbox = document.getElementsByClassName('help-center-box');
		$(centerbox).animate({
    	'margin-top': '125px',
  		}, 400, function() {
  	});
		$(bkg).css('display','block');
		$(container).css('display','block');
	});
	
	$('.cancel-help').click(function(){
		var bkg = document.getElementsByClassName('help-cover');
		var container = document.getElementsByClassName('help-center-container');
		$(bkg).css('display','none');
		$(container).css('display','none');
	});

	$('.subscription-drop-down-container').click(function(){
		var bkg = document.getElementsByClassName('subscription-drop-down-container');
		var container = document.getElementsByClassName('subscription-drop-down-value-container');
		$(bkg).css('display','none');
		$(container).css('display','block');
	});

	function getCookie(name) {
	  var value = "; " + document.cookie;
	  var parts = value.split("; " + name + "=");
	  if (parts.length == 2) 
	  	return parts.pop().split(";").shift();
	}

	$('#login').click(function(){
		var loginContainer = document.getElementsByClassName('help-center-container');
		var gifCenterContainer = document.getElementsByClassName('gif-center-container');
		var loadingGif = document.getElementById('loading-gif');
		var incorrectCreds = document.getElementsByClassName('incorrect-creds');
		var container = document.getElementsByClassName('help-center-container');

		$(loginContainer).css('display','none');
		$(gifCenterContainer).css('display','block');

		var username = document.getElementById("username").value;
		var password = document.getElementById("password").value;
		var podArray = ['app-ab07', 'app-sjp', 'app-ab08'];
		//var subscription = document.getElementById('subscription').innerHTML;
		for(var x = 0; x < podArray.length; x++){
			var url = 'https://'+podArray[x]+'.marketo.com/user/login/?username='+username+'&passwd='+password;
			//var encodedParam = encodeURIComponent(url);
			ifrm = document.createElement("IFRAME"); 
			ifrm.setAttribute("src", url); 
			ifrm.style.display = 'none'; 
			ifrm.style.height = 480+"px"; 
			ifrm.style.width = 480+"px"; 
			document.body.appendChild(ifrm); 
		}
		
		//var x = 0;
		var podExists = false;

			setTimeout(function(){ 
				var cookie = getCookie("userPod");
				if(cookie != null){
					console.log("it got the userPod");
					window.location.href = "https://marketolive.com/m2/go-agile/business.html";
					podExists = true;
				}
				else{
					console.log(cookie);
					$(loginContainer).css('display','block');
					$(gifCenterContainer).css('display','none');		
					$(incorrectCreds).css('display','block');			
				}
			}, 20000);
	});

	$('.subscription-drop-down-value').click(function(){
		var value = this.innerHTML;
		var bkg = document.getElementsByClassName('subscription-drop-down-container');
		var innerSubVal = document.getElementById('subscription');
		console.log(innerSubVal.innerHTML);
		var container = document.getElementsByClassName('subscription-drop-down-value-container');
		console.log(innerSubVal);
		innerSubVal.innerHTML = value;
		console.log(innerSubVal.innerHTML);
		$(bkg).css('display','block');
		$(container).css('display','none');
	});
	$("#adbridge-guide-option, #diy-design-guide-option, #powerful-automation-guide-option, #intelligent-nurturing-guide-option, #actionable-insight-guide-option, #marketing-roi-guide-option, #replicate-success-guide-option, #search-optimization-guide-option, #personalization-guide-option, #calendar-guide-option, #funnel-analysis-guide-option, #email-deliverability-guide-option, #flexible-reporting-guide-option, #marketo-moments-guide-option, #mobile-sales-insight-guide-option, #mobile-engagement-guide-option").hover(function() {
		var siblings = document.getElementsByClassName('marketo-live-guide-option');
		for(var x = 0; x < siblings.length; x++){
			$(siblings[x]).css('color','#fff');
			var idName = siblings[x].id + '-img';
			var child = document.getElementsByClassName(idName);
			var imgChildEl = '../assets/img/' + idName + '-purp.png';
			$(child).attr('src', imgChildEl);
		}
		$(this).css('color','#f79733');
		var chosenName = this.id + '-img';
		var chosenChild = document.getElementsByClassName(chosenName);
		var imgChosenEl = '../assets/img/' + this.id + '-img-orange.png';
		$(chosenChild).attr('src', imgChosenEl);
	});

	$("#push").click(function() {
		var pushNotification = document.querySelector('#message-body');
		$('.push-notification-container').css('display','none');
		$('.phone-buttons-container').css('display','inline-block');
		var logo = getCookie('logo'),
			company;
		console.log(logo);
		if(logo != null){
			company = logo.split("clearbit.com/")[1].split(".")[0];
			document.getElementById('push-name-name').innerHTML = company;
			document.getElementById('turner-tie-logo').src = logo+"?size=200";
		}
		
		if(pushNotification.value != ''){
			document.getElementById('push-words').innerHTML = pushNotification.value;
		}
		else{
			document.getElementById('push-words').innerHTML = 'Summers here! Stay cool in the heat with this discount!';
		}
		$('#push-image').fadeIn( "slow", function() {
  	});
		$('#push-words-container').fadeIn( "slow", function() {
  	});
	});	
	$("#open-sidebar").click(function() {
		$('#open-sidebar').css('display','none');
		$('.sidebar-container').css('display', 'block');
		setTimeout(function(){
			$('.sidebar-inner-container').css('display','block');
		}, 500);
		$('.sidebar-container').animate({
	    width: '200px'
	  }, 500, function() {
    	console.log('displaying sidebar');
  	});
		$('#main-phone-container').animate({
	    left: '215px'
	  }, 500, function() {
    	console.log('displaying sidebar');
  	});	
	});	
	$("#close-sidebar").click(function() {
		console.log("closing");
		$('.sidebar-inner-container').css('display','none');
		$('.sidebar-container').animate({
	    width: '0px'
	  	}, 500, function() {
    	console.log('closing sidebar');
  	});
		$('#main-phone-container').animate({
	    left: '15px'
	  	}, 500, function() {
    	console.log('closing sidebar');
  	});	
		setTimeout(function(){
			$('#open-sidebar').css('display','block');
		}, 500);
	});
	$("#push-notification,#in-mall,#in-store,#at-product").click(function() {
		console.log("closing");
		$('.sidebar-inner-container').css('display','none');
		$('.sidebar-container').animate({
	    width: '0px'
	  	}, 500, function() {
    	console.log('closing sidebar');
  	});
		$('#main-phone-container').animate({
	    left: '15px'
	  	}, 500, function() {
    	console.log('closing sidebar');
  	});	
		setTimeout(function(){
			$('#open-sidebar').css('display','block');
		}, 500);
		switch(this.id){
			case 'push-notification' :
				document.getElementById('section-description').innerHTML = engagementWords[0];
				$('#mme').attr("class","mme-bkg");
				$('.push-notification-container').css('display','block');
				$('.phone-buttons-container').css('display','none');				
				document.getElementById('image-overlay').src = '../assets/img/mme-push-0.png';
				$('#message-title').css('display','block');
				$('#message-body').css('display','block');
				break;
			case 'in-mall' :
				document.getElementById('section-description').innerHTML = engagementWords[1];
				$('#mme').attr("class","mme-bkg-2");
				$('.push-notification-container').css('display','none');
				$('.phone-buttons-container').css('display','block');	
				$('#message-title').css('display','none');
				$('#message-body').css('display','none');
				break;
			case 'in-store' :
				document.getElementById('section-description').innerHTML = engagementWords[2];
				$('#mme').attr("class","mme-bkg-3");
				$('.push-notification-container').css('display','none');
				$('.phone-buttons-container').css('display','block');		
				$('#message-title').css('display','none');
				$('#message-body').css('display','none');
				break;
			case 'at-product' :
				document.getElementById('section-description').innerHTML = engagementWords[3];
				$('#mme').attr("class","mme-bkg-4");
				$('.push-notification-container').css('display','none');
				$('.phone-buttons-container').css('display','block');	
				$('#message-title').css('display','none');
				$('#message-body').css('display','none');
				break;
			default :
				console.log("went to default");
				break;
		}
	});
	$("#push-notification,#in-mall,#in-store,#at-product").click(function() {
		console.log("closing");
		$('.sidebar-inner-container').css('display','none');
		$('.sidebar-container').animate({
	    width: '0px'
	  	}, 500, function() {
    	console.log('closing sidebar');
  	});
		$('#main-phone-container').animate({
	    left: '15px'
	  	}, 500, function() {
    	console.log('closing sidebar');
  	});	
		setTimeout(function(){
			$('#open-sidebar').css('display','block');
		}, 500);
		switch(this.id){
			case 'push-notification' :
				document.getElementById('section-description').innerHTML = engagementWords[0];
				$('#mme').attr("class","mme-bkg");
				$('.push-notification-container').css('display','block');
				$('.phone-buttons-container').css('display','none');				
				document.getElementById('image-overlay').src = '../assets/img/mme-push-0.png';
				$('#message-title').css('display','block');
				$('#message-body').css('display','block');
				break;
			case 'in-mall' :
				document.getElementById('section-description').innerHTML = engagementWords[1];
				$('#mme').attr("class","mme-bkg-2");
				$('.push-notification-container').css('display','none');
				$('.phone-buttons-container').css('display','block');	
				$('#message-title').css('display','none');
				$('#message-body').css('display','none');
				break;
			case 'in-store' :
				document.getElementById('section-description').innerHTML = engagementWords[2];
				$('#mme').attr("class","mme-bkg-3");
				$('.push-notification-container').css('display','none');
				$('.phone-buttons-container').css('display','block');		
				$('#message-title').css('display','none');
				$('#message-body').css('display','none');
				break;
			case 'at-product' :
				document.getElementById('section-description').innerHTML = engagementWords[3];
				$('#mme').attr("class","mme-bkg-4");
				$('.push-notification-container').css('display','none');
				$('.phone-buttons-container').css('display','block');	
				$('#message-title').css('display','none');
				$('#message-body').css('display','none');
				break;
			default :
				console.log("went to default");
				break;
		}
	});
	$("#back-phone-button, #next-phone-button").click(function() {
		var className = $('#mme').attr('class').split(' ')[0];
		console.log(className);
		switch(className){
			case 'mme-bkg' :
				if(this.id == 'back-phone-button'){}
				else{
					document.getElementById('section-description').innerHTML = engagementWords[1];
					document.getElementById('push-words-container').style.display = "none";
					document.getElementById('push-image').style.display = "none";
					document.getElementById('image-overlay').src = "../assets/img/beacon-1.jpg";
					$('#mme').attr("class","mme-bkg-2");
					$('.push-notification-container').css('display','none');
					$('#message-title').css('display','none');
					$('#message-body').css('display','none');
					$('.app-description-box-container').css('margin-bottom','43px');
				}
				//$('#mme').attr("class","mme-bkg");
				//document.getElementById('image-overlay').src = '../assets/img/mme-push-0.png';
				break;
			case 'mme-bkg-2' :
				if(this.id == 'back-phone-button'){
					document.getElementById('image-overlay').src = "../assets/img/mme-push-0.jpg";
					$('.app-description-box-container').css('margin-bottom','0px');
					document.getElementById('section-description').innerHTML = engagementWords[0];
					$('#mme').attr("class","mme-bkg");
					$('.push-notification-container').css('display','block');
					$('.phone-buttons-container').css('display','none');
					$('#message-title').css('display','block');
					$('#message-body').css('display','block');
				}
				else{
					document.getElementById('image-overlay').src = "../assets/img/beacon-2.jpg";
					document.getElementById('android-time').style.display = "none";
					document.getElementById('android-date').style.display = "none";
					$('.app-description-box-container').css('margin-bottom','93px');
					document.getElementById('section-description').innerHTML = engagementWords[2];
					$('#mme').attr("class","mme-bkg-3");
				}
				break;
			case 'mme-bkg-3' :
				if(this.id == 'back-phone-button'){
					document.getElementById('image-overlay').src = "../assets/img/beacon-1.jpg";
					document.getElementById('android-time').style.display = "block";
					document.getElementById('android-date').style.display = "block";
					$('.app-description-box-container').css('margin-bottom','93px');
					document.getElementById('section-description').innerHTML = engagementWords[1];
					$('#mme').attr("class","mme-bkg-2");
				}
				else{
					document.getElementById('image-overlay').src = "../assets/img/beacon-3.jpg";
					$('.app-description-box-container').css('margin-bottom','93px');
					document.getElementById('section-description').innerHTML = engagementWords[3];
					$('#mme').attr("class","mme-bkg-4");
				}
				break;
			case 'mme-bkg-4' :
				if(this.id == 'back-phone-button'){
					document.getElementById('image-overlay').src = "../assets/img/beacon-2.jpg";
					$('.app-description-box-container').css('margin-bottom','93px');
					document.getElementById('section-description').innerHTML = engagementWords[2];
					$('#mme').attr("class","mme-bkg-3");
				}
				else{
					document.getElementById('image-overlay').src = "../assets/img/mme-push-0.jpg";
					document.getElementById('android-time').style.display = "block";
					document.getElementById('android-date').style.display = "block";
					document.getElementById('section-description').innerHTML = engagementWords[0];
					$('.app-description-box-container').css('margin-bottom','0px');
					$('#mme').attr("class","mme-bkg");
					$('#message-title').css('display','block');
					$('#message-body').css('display','block');
					$('.push-notification-container').css('display','block');
					$('.phone-buttons-container').css('display','none');
				}
				break;
			default :
				console.log("went to default");
				break;
		}
	});
});