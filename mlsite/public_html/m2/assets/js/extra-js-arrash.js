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
/*
Old one
function show_picklist(section){
	var values = [];
	var sectionSelected = section;
	var bool = true;
	var x = 1;
	while(bool){
		var y = x+1;
		var originalElementString = sectionSelected + '-picklist-value-';
		var elementString = originalElementString + x.toString();
		var nextElementString = originalElementString + y.toString();
		var elementId = document.getElementById(elementString);
		if(x == 2)
			$(elementId).delay(300).show(500);
		else if(x == 3)
			$(elementId).delay(600).show(500);
		else{
			$(elementId).show(500);				
		}
		if(!document.getElementById(nextElementString))
			bool = false;
		x++;
	}
}
*/

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
/*
Old one

function picklist_chosen(chosenStep){
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
*/

//bubbles

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
	console.log("ready!");
  $('#marketo-live-home').animate({'top' : '30%'}, 600);
  $('#marketo-live-home-option').animate({'margin-bottom' : '5%'}, 600);
});