$ = jQuery.noConflict();
$(function(){
	$('.form-wrapper-twocolumn').hide();
	$('.form-wrapper-responsive').hide();
})
;(function($){
    $.fn.extend({
        donetyping: function(callback,timeout){
            timeout = timeout || 1e3; // 1 second default timeout
            var timeoutReference,
                doneTyping = function(el){
                    if (!timeoutReference) return;
                    timeoutReference = null;
                    callback.call(el);
                };
            return this.each(function(i,el){
                var $el = $(el);
                $el.is(':input') && $el.keypress(function(){
                    if (timeoutReference) clearTimeout(timeoutReference);
                    timeoutReference = setTimeout(function(){
                        doneTyping(el);
                    }, timeout);
                }).blur(function(){
                    doneTyping(el);
                });
            });
        }
    });
})(jQuery);

$(function(){
	var hiddenfields = new Array();
	var count = 0;
	$('#email').donetyping(function(){
		//done typing in email, now loop through all hidden fields and store in array
		$('#contactform *').filter(':input').each(function(i, val){
    		if(i>3){
    			if(val.value.length){
    				count += 1;
    			}
    			hiddenfields[i-4] = val.value;   			
    		}
		});
		//put those values from the array in the 'visible fields hidden by jquery'
		$('#repsform *').filter(':input').each(function(i, val){
			if(hiddenfields[i].length > 0){
				$(this).attr('value', hiddenfields[i]);
			}
		});
		$('#repsform-responsive *').filter(':input').each(function(i, val){
			if(hiddenfields[i].length > 0){
				$(this).attr('value', hiddenfields[i]);
			}
		});		
		//show to reps?
		if(count >= 3){
			$('.form-wrapper-twocolumn').show();
		}
	});	
});

$("#email").keyup(function() {
    if (!this.value) {
		$('#repsform *').filter(':input').each(function(i, val){
			$(this).attr('value', null);
		});
		$('#repsform-responsive *').filter(':input').each(function(i, val){
			$(this).attr('value', null);
		});      	
    }
});

$(window).resize(function() {
	 if ($(window).width() < 768) {
		$('.form-wrapper-twocolumn').hide();
		$('.form-wrapper-responsive').show();   		  
	  }
	 if ($(window).width() > 768){
		$('.form-wrapper-twocolumn').show();
		$('.form-wrapper-responsive').hide();
	 }
});	
