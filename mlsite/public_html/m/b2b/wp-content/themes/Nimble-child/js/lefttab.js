$ = jQuery.noConflict();
	$(function(){
		$("#extruderLeft").buildMbExtruder({
			position:"left",
			width:300,
			extruderOpacity:1,
			hidePanelsOnClose:false,
			accordionPanels:true,
			onExtOpen:function(){
				mixpanel.track("Opened Sidetab");
				$("#accordion").onAvailable(function(){
   					$('#accordion').accordion({heightStyle: "fill",
   											   activate: function(event,ui) {
   											   	//this is a busted workaround.
   											   	$('.Default').mCustomScrollbar("destroy");
   											   	$(".Default").mCustomScrollbar({
   											   		autoHideScrollbar:true,
					                                scrollButtons:{enable:true},
					                                advanced:{updateOnContentResize:true}	                                                                      
												   });
   										       			$('.Default').mCustomScrollbar('update');
																			 }
   					});
				$(".Default").mCustomScrollbar({
					autoHideScrollbar : true,
					scrollButtons : {
						enable : true
					},
					advanced : {
						updateOnContentResize : true
					}
				}); 
				//This function is for getting the Modal Size.
				$(function() {
					var width = $(window).width();
					var height = $(window).height();
					var dlg = $(".reveal-modal");
					
					width = .6*(width-400);
					height = .6*(height);
					/*
					 		<div id="myModal" class="reveal-modal">
							<a class="close-reveal-modal">&#215;</a>
							</div>
					 */
					$(".Modallink").click(function() {
						//$(this) is powerful, it actually selects the .modallink href we need
						var iframelink = $(this).attr('href');
						$(".reveal-modal").empty();
						$(".reveal-modal").prepend("<iframe id='lolz' src=" + iframelink + "></iframe>");
						$(".reveal-modal").prepend("<a class='close-reveal-modal'>&#215;</a>");
						$(dlg.children("iframe").get(0)).css("height", height + "px");
						$(dlg.children("iframe").get(0)).css("width", width + "px");
						
					});
				}); 
				/*
				$(function(){
				$(".close-reveal-modal").click(function() {
						$(".reveal-modal").empty();
					});
				});
				*/
				});	
				/*
				This block of code runs after 5 seconds to sort of garuntee an accordion
				So this code literally means after 5 seconds run the $(accordion) method.
        		setTimeout(function(){
   					$('#accordion').accordion({heightStyle: "fill",
   											   activate: function(event,ui) {
   										       $("#Default").mCustomScrollbar({autoHideScrollbar:true,
					                                                           scrollButtons:{enable:true},
					                                                           advanced:{updateOnContentResize:true}
					                                                                      
																			  });
																			  alert("activated a tab");
																			  }
   					});
        		},5000);
        		*/
				},
			onExtContentLoad:function(){$("#extruderLeft").openPanel();},
			onExtClose:function(){
				$('#accordion').remove();
				if(sidetabdata){
					$(".containerside").append(sidetabdata);
				}
			}
		});
		$('.containerside').append("<div id='loading-image'></div>");
	});
	
	$.fn.onAvailable = function(fn){
    var sel = this.selector;
    var timer;
    var self = this;
    if (this.length > 0) {
        fn.call(this);   
    }
    else {
        timer = setInterval(function(){
            if ($(sel).length > 0) {
                fn.call($(sel));
                clearInterval(timer);  
            }
        },50);  
    }
};

$(function(){
	var image;
	var exactimage;
		$('.service-top').hover(
		function() {
			$(this).find("h3").css("color","orange");
			image = $(this).find('img');
			exactimage = image.attr('src').substring(image.attr('src').indexOf('images/'), image.attr('src').indexOf('.png')) + '_orange.png';
			if (exactimage.indexOf('images/') != -1){
				if(window.location.href.indexOf("use-case") != -1){
					image.attr('src', '../wp-content/themes/Nimble-child/' + exactimage);
				}else{
					image.attr('src', 'wp-content/themes/Nimble-child/' + exactimage);				
				}					
			}			
    },
        function() {
            $(this).find( "h3" ).css("color","#a3a2a2");
			image = $(this).find('img');
			exactimage = image.attr('src').substring(image.attr('src').indexOf('images/'), image.attr('src').indexOf('_orange')) + '.png';
			if (exactimage.indexOf('images/') != -1){
				if(window.location.href.indexOf("use-case") > -1){
					image.attr('src', '../wp-content/themes/Nimble-child/' + exactimage);
				}else{
					image.attr('src', 'wp-content/themes/Nimble-child/' + exactimage);				
				}				
			}
    }
    );
});

$(function(){
	var image;
	var exactimage;
		$('.service-white').hover(
		function() {
			$(this).find("h3").css("color","orange");
			image = $(this).find('img');
			exactimage = image.attr('src').substring(image.attr('src').indexOf('images/'), image.attr('src').indexOf('.png')) + '_orange.png';
			if (exactimage.indexOf('images/') != -1){
				if(window.location.href.indexOf("agile") != -1){
					image.attr('src', '../wp-content/themes/Nimble-child/' + exactimage);
				}else{
					image.attr('src', 'wp-content/themes/Nimble-child/' + exactimage);				
				}					
			}			
    },
        function() {
            $(this).find("h3").css("color","#636b66");
			image = $(this).find('img');
			exactimage = image.attr('src').substring(image.attr('src').indexOf('images/'), image.attr('src').indexOf('_orange')) + '.png';
			if (exactimage.indexOf('images/') != -1){
				if(window.location.href.indexOf("agile") > -1){
					image.attr('src', '../wp-content/themes/Nimble-child/' + exactimage);
				}else{
					image.attr('src', 'wp-content/themes/Nimble-child/' + exactimage);				
				}				
			}
    }
    );
});

$(function(){
	var image;
	var exactimage;
		$('.service-purple').hover(
		function() {
			$(this).find("h3").css("color","orange");
			image = $(this).find('img');
			exactimage = image.attr('src').substring(image.attr('src').indexOf('images/'), image.attr('src').indexOf('.png')) + '_orange.png';
			if (exactimage.indexOf('images/') != -1){
				if(window.location.href.indexOf("use-case") != -1){
					image.attr('src', '../wp-content/themes/Nimble-child/' + exactimage);
				}else{
					image.attr('src', 'wp-content/themes/Nimble-child/' + exactimage);				
				}					
			}			
    },
        function() {
            $(this).find("h3").css("color","#ffffff");
			image = $(this).find('img');
			exactimage = image.attr('src').substring(image.attr('src').indexOf('images/'), image.attr('src').indexOf('_orange')) + '.png';
			if (exactimage.indexOf('images/') != -1){
				if(window.location.href.indexOf("use-case") > -1){
					image.attr('src', '../wp-content/themes/Nimble-child/' + exactimage);
				}else{
					image.attr('src', 'wp-content/themes/Nimble-child/' + exactimage);				
				}				
			}
    }
    );
});

$(function(){
	var image;
	var exactimage;
		$('.lowerNav').hover(
		function() {
			$(this).find("h3").css("color","orange");
			image = $(this).css("background-image");
			exactimage = image.substring(image.indexOf('images/'), image.indexOf('.png')) + '_orange.png';
			if (exactimage.indexOf('images/') != -1){			
				$(this).css("background-image", "url('http://marketolive.com/m/b2b/wp-content/themes/Nimble-child/"+ exactimage+"')");
			}			
    },
        function() {
            $(this).find("h3").css("color","#636b66");
			image = $(this).css("background-image");			
			exactimage = image.substring(image.indexOf('images/'), image.indexOf('_orange.png')) + '.png';
			if (exactimage.indexOf('images/') != -1){
				$(this).css("background-image", "url('http://marketolive.com/m/b2b/wp-content/themes/Nimble-child/"+ exactimage+"')");
			}
    }
    );
});

$(function(){
	$('.blog-post > h3 > a').hover(
		function() {
			$(this).css("color","orange");				
    },
        function() {
            $(this).css("color","white");
    }
    );
});
	
$(function(){
	$('#loading-image').append('<div id="loadtext">Retrieving your Record...</div>');
});

/*
$(function(){
	var submitcontent = "<input class='submit-button' style='cursor: pointer;' type='submit' value='Submit' />";
	var quote1 = "'For a traveler going from any place toward the north, that pole of the daily rotation gradually climbs higher, while the opposite pole drops down an equal amount.'";
	var quote1short = 'For a traveler going...';
	var quote2 = "'Somewhere, something incredible is waiting to be known.'";
	var quote2short = "Somewhere, something incredible...";
	var quote3 = "'I can calculate the motion of heavenly bodies, but not the madness of people.'";
	var quote3short = "I can calculate the...";
	var quote4 = "'The true sign of intelligence is not knowledge but imagination.'";
	var quote4short = "The true sign...";
	var thefields = "<div class='form-title' style='margin-top:25px'>From Name: " +
	"<select class='form-field' name='fromname'><option value='Carl Sagan'>Carl Sagan</option><option value='Isaac Newton'>Isaac Newton</option><option value='Nicolaus Copernicus'>Nicolaus Copernicus</option><option value='Albert Einstein'>Albert Einstein</option></select></div>" +
					"<div class='form-title'>From Email: " +
	"<select class='form-field' name='fromemail'><option value='Carl@Sagan.com'>Carl@Sagan.com</option><option value='Isaac@Newtown.com'>INewton123@aol.com</option><option value='Nicolaus@Copernicus.com'>Nicolaus@Copernicus.com</option><option value='Albert@Einstein.com'>Albert@Einstein.com</option></select></div>" +	
					"<div class='form-title'>Subject Line: " +
	"<select class='form-field' name='subject'><option value='Here is your definitive guide!'>Here is your definitive guide!</option><option value='How teleportation revolutionized travel.'>How teleportation revolutionized travel.</option><option value='Top 10 teleportation tricks'>Top 10 teleportation tricks.</option><option value='One definitive guide to rule them all.'>One definitive guide to rule them all.</option></select></div>" +					
					"<div class='form-title'>Email Body: " +
	"<select class='form-field' name='body'><option value=" + quote1 + ">" + quote1short + "</option><option value=" + quote2 + ">" + quote2short + "</option><option value=" + quote3 + ">" + 
	quote3short + "</option><option value=" + quote4 + ">" + quote4short + "</option></select></div>";
	$('.formlengthener').toggle(function(){
		$('.formlengthener').empty();
		$('.formlengthener').append('Not that Crazy!').hide().fadeIn(2000);
		$('#morefields').append(thefields).hide().fadeIn(2000);
	},function(){
		$('.formlengthener').empty();
		$('#morefields').empty();
		$('.formlengthener').append("We're Crazy Too!");
	});
});
*/

$(function(){
	//$( "#dialog" ).dialog({ autoOpen: false });
	$('#comingsoon21').click(function(){
		alert('coming soon');
		//$( "#dialog" ).dialog( "open" );
	});
	$('#comingsoon31').click(function(){
		alert('coming soon');
		//$( "#dialog" ).dialog( "open" );
	});
	$('#comingsoon22').click(function(){
		alert('coming soon');
	});
});

$(function(){
	var values = [];
	var localflag = 0;
	$(".service-white > a").each(function(index, obj) {
		values[index] = $(this).css('padding-left');
	});
	 if ($(window).width() < 768 && localflag == 0) {
	     $('.service-white').find('a').css('padding-left', '0px');
	     localflag = 1;
	  }
	 if ($(window).width() > 768 && localflag == 1){
		$(".service-white > a").each(function(index, obj) {
			$(this).css('padding-left', values[index]);
		});
		localflag = 0;	
	 }
	$(window).resize(function() {
	 if ($(window).width() < 768 && localflag == 0) {
	     $('.service-white').find('a').css('padding-left', '0px');
	     localflag = 1;
	  }
	 if ($(window).width() > 768 && localflag == 1){
		$(".service-white > a").each(function(index, obj) {
			$(this).css('padding-left', values[index]);
		});
		localflag = 0;	
	 }
	});	
});

$(function(){
	var values = [];
	var localflag = 0;
	$(".service-purple > a").each(function(index, obj) {
		values[index] = $(this).css('padding-left');
	});
	 if ($(window).width() < 768 && localflag == 0) {
	     $('.service-purple').find('a').css('padding-left', '0px');
	     localflag = 1;
	  }
	 if ($(window).width() > 768 && localflag == 1){
		$(".service-purple > a").each(function(index, obj) {
			$(this).css('padding-left', values[index]);
		});
		localflag = 0;	
	 }
	$(window).resize(function() {
	 if ($(window).width() < 768 && localflag == 0) {
	     $('.service-purple').find('a').css('padding-left', '0px');
	     localflag = 1;
	  }
	 if ($(window).width() > 768 && localflag == 1){
		$(".service-purple > a").each(function(index, obj) {
			$(this).css('padding-left', values[index]);
		});
		localflag = 0;	
	 }
	});	
});

$(function(){
	$('#mem').click(function() {
		if ($('#mem-services').css('display') == 'block') {
			$('html, body').animate({scrollTop: 0},{easing:'swing',duration:1000});
			$('#mem-services').hide(500,'swing',function hideNext() {				
				$('div#mem-services > div[class^=service-white]').each(function(index,obj) {
					$(this).hide(250,'swing');
				});
			});
		}
		if ($('#mem-services').css('display') == 'none') {
			$('#mem-services').show(500,'swing',function showNext() {						
				$('#mem-services').each(function(index,obj) {
					$(this).show(0,'swing',function showNext() {
						$('div#mem-services > div[class^=service-white]').each(function(index,obj) {
							$(this).show(500,'swing');
						});		
					});
				});
			});
			$('html, body').animate({scrollTop:141},{easing:'swing',duration:1000});
			//console.log($(this)[0].innerText);			
			mktoMunchkinFunction('clickLink', {
				href : $(this)[0].innerText
			});
		}
		/*
		if ($('#eyc-services').css('display') == 'block') {
			$('#eyc-services').hide(500, function hideNext() {
				$('div#eyc-services > div[class^=service-purple]').each(function(index, obj) {
					$(this).hide(250, 'swing');
				});
			});
			$('#mem-services').show(500, 'swing', function showNext() {
				$('#mem-services').each(function(index, obj) {
					$(this).show(0, 'swing', function showNext() {
						$('div#mem-services > div[class^=service-white]').each(function(index, obj) {
							$(this).show(500,'swing');
						});
					});
				});				
			});
			$('html, body').animate({scrollTop:141},{easing:'swing',duration:1000});
		}*/
		if ($('div[id^=eyc-services]').css('display') == 'block') {
			$('div[id^=eyc-services]').hide(500,'swing');			
			$('#mem-services').show(500, 'swing', function showNext() {
				$('#mem-services').each(function(index,obj) {
					$(this).show(0, 'swing',function showNext() {
						$('div#mem-services > div[class^=service-white]').each(function(index, obj) {
							$(this).show(500,'swing');
						});
					});
				});				
			});
			$('html, body').animate({scrollTop:141},{easing:'swing',duration:1000});
		}
		if ($('#aws-services').css('display') == 'block') {
			$('#aws-services').hide(500, function hideNext() {
				$('div#aws-services > div[class^=service-white]').each(function(index, obj) {
					$(this).hide(250, 'swing');
				});
			});
			$('#mem-services').show(500, 'swing', function showNext() {
				$('#mem-services').each(function(index, obj) {
					$(this).show(0, 'swing', function showNext() {
						$('div#mem-services > div[class^=service-white]').each(function(index, obj) {
							$(this).show(500,'swing');
						});
					});
				});				
			});
			$('html, body').animate({scrollTop:141},{easing:'swing',duration:1000});
		}
		if ($('#mys-services').css('display') == 'block') {
			$('#mys-services').hide(500, function hideNext() {
				$('div#mys-services > div[class^=service-white]').each(function(index, obj) {
					$(this).hide(250, 'swing');
				});
			});
			$('#mem-services').show(500, 'swing', function showNext() {
				$('#mem-services').each(function(index, obj) {
					$(this).show(0, 'swing', function showNext() {
						$('div#mem-services > div[class^=service-white]').each(function(index, obj) {
							$(this).show(500,'swing');
						});
					});
				});				
			});
			$('html, body').animate({scrollTop:141},{easing:'swing',duration:1000});
		}
		if ($('#pme-services').css('display') == 'block') {
			$('#pme-services').hide(500, function hideNext() {
				$('div#pme-services > div[class^=service-white]').each(function(index, obj) {
					$(this).hide(250, 'swing');
				});
			});
			$('#mem-services').show(500, 'swing', function showNext() {
				$('#mem-services').each(function(index, obj) {
					$(this).show(0, 'swing', function showNext() {
						$('div#mem-services > div[class^=service-white]').each(function(index, obj) {
							$(this).show(500,'swing');
						});
					});
				});				
			});
			$('html, body').animate({scrollTop:141},{easing:'swing',duration:1000});
		}		
		if ($('#jtn-services').css('display') == 'block') {
			$('#jtn-services').hide(500, function hideNext() {
				$('div#jtn-services > div[class^=service-purple]').each(function(index, obj) {
					$(this).hide(250, 'swing');
				});
			});
			$('#mem-services').show(500, 'swing', function showNext() {
				$('#mem-services').each(function(index, obj) {
					$(this).show(0, 'swing', function showNext() {
						$('div#mem-services > div[class^=service-white]').each(function(index, obj) {
							$(this).show(500,'swing');
						});
					});
				});				
			});
			$('html, body').animate({scrollTop:141},{easing:'swing',duration:1000});
		}
		if ($('div[id^=emc-services]').css('display') == 'block') {
			$('div[id^=emc-services]').hide(500,'swing');			
			$('#mem-services').show(500, 'swing', function showNext() {
				$('#mem-services').each(function(index,obj) {
					$(this).show(0, 'swing',function showNext() {
						$('div#mem-services > div[class^=service-white]').each(function(index, obj) {
							$(this).show(500,'swing');
						});
					});
				});				
			});
			$('html, body').animate({scrollTop:141},{easing:'swing',duration:1000});
		}
	});
});

/*
$(function(){
	$('#eyc').click(function() {
		if ($('#eyc-services').css('display') == 'block') {
			$('html, body').animate({scrollTop: 0},{easing:'swing',duration:1000});
			$('#eyc-services').hide(500,'swing',function hideNext() {				
				$('div#eyc-services > div[class^=service-purple]').each(function(index,obj) {
					$(this).hide(250,'swing');
				});
			});
		}
		if ($('#eyc-services').css('display') == 'none') {
			$('#eyc-services').show(500,'swing',function showNext() {						
				$('#eyc-services').each(function(index,obj) {
					$(this).show(0,'swing',function showNext() {
						$('div#eyc-services > div[class^=service-purple]').each(function(index,obj) {
							$(this).show(500,'swing');
						});		
					});
				});
			});
			$('html, body').animate({scrollTop:141},{easing:'swing',duration:1000});
			//console.log($(this)[0].innerText);			
			mktoMunchkinFunction('clickLink', {
				href : $(this)[0].innerText
			});
		}
		if ($('#mem-services').css('display') == 'block') {
			$('#mem-services').hide(500, function hideNext() {
				$('div#mem-services > div[class^=service-white]').each(function(index, obj) {
					$(this).hide(250, 'swing');
				});
			});
			$('#eyc-services').show(500, 'swing', function showNext() {
				$('#eyc-services').each(function(index, obj) {
					$(this).show(0, 'swing', function showNext() {
						$('div#eyc-services > div[class^=service-purple]').each(function(index, obj) {
							$(this).show(500,'swing');
						});
					});
				});				
			});
			$('html, body').animate({scrollTop:141},{easing:'swing',duration:1000});
		}
		if ($('#aws-services').css('display') == 'block') {
			$('#aws-services').hide(500, function hideNext() {
				$('div#aws-services > div[class^=service-white]').each(function(index, obj) {
					$(this).hide(250, 'swing');
				});
			});
			$('#eyc-services').show(500, 'swing', function showNext() {
				$('#eyc-services').each(function(index, obj) {
					$(this).show(0, 'swing', function showNext() {
						$('div#eyc-services > div[class^=service-purple]').each(function(index, obj) {
							$(this).show(500,'swing');
						});
					});
				});				
			});
			$('html, body').animate({scrollTop:141},{easing:'swing',duration:1000});
		}
		if ($('#mys-services').css('display') == 'block') {
			$('#mys-services').hide(500, function hideNext() {
				$('div#mys-services > div[class^=service-white]').each(function(index, obj) {
					$(this).hide(250, 'swing');
				});
			});
			$('#eyc-services').show(500, 'swing', function showNext() {
				$('#eyc-services').each(function(index, obj) {
					$(this).show(0, 'swing', function showNext() {
						$('div#eyc-services > div[class^=service-purple]').each(function(index, obj) {
							$(this).show(500,'swing');
						});
					});
				});				
			});
			$('html, body').animate({scrollTop:141},{easing:'swing',duration:1000});
		}
		if ($('#pme-services').css('display') == 'block') {
			$('#pme-services').hide(500, function hideNext() {
				$('div#pme-services > div[class^=service-white]').each(function(index, obj) {
					$(this).hide(250, 'swing');
				});
			});
			$('#eyc-services').show(500, 'swing', function showNext() {
				$('#eyc-services').each(function(index, obj) {
					$(this).show(0, 'swing', function showNext() {
						$('div#eyc-services > div[class^=service-purple]').each(function(index, obj) {
							$(this).show(500,'swing');
						});
					});
				});				
			});
			$('html, body').animate({scrollTop:141},{easing:'swing',duration:1000});
		}
		if ($('#jtn-services').css('display') == 'block') {
			$('#jtn-services').hide(500, function hideNext() {
				$('div#jtn-services > div[class^=service-purple]').each(function(index, obj) {
					$(this).hide(250, 'swing');
				});
			});
			$('#eyc-services').show(500, 'swing', function showNext() {
				$('#eyc-services').each(function(index, obj) {
					$(this).show(0, 'swing', function showNext() {
						$('div#eyc-services > div[class^=service-purple]').each(function(index, obj) {
							$(this).show(500,'swing');
						});
					});
				});				
			});
			$('html, body').animate({scrollTop:141},{easing:'swing',duration:1000});
		}
		if ($('div[id^=emc-services]').css('display') == 'block') {
			$('div[id^=emc-services]').hide(500,'swing');
			$('#eyc-services').show(500, 'swing', function showNext() {
				$('#eyc-services').each(function(index,obj) {
					$(this).show(0, 'swing',function showNext() {
						$('div#eyc-services > div[class^=service-purple]').each(function(index, obj) {
							$(this).show(500,'swing');
						});
					});
				});				
			});
			$('html, body').animate({scrollTop:141},{easing:'swing',duration:1000});
		}
	});
});
*/
$(function(){
	$('#eyc').click(function() {
		if ($('div[id^=eyc-services]').css('display') == 'block') {
			$('div[id^=eyc-services]').hide(500,'swing');
			$('html, body').animate({scrollTop:0},{easing:'swing',duration:1000});			
		}
		if ($('div[id^=eyc-services]').css('display') == 'none') {								
			$('div[id^=eyc-services]').show(500,'swing',function showNext() {						
				$('div[id^=eyc-services]').each(function(index,obj) {
					$(this).show(0,'swing',function showNext() {
						$('div#eyc-services > div[class^=service-purple]').each(function(index,obj) {
							$(this).show(500,'swing');
						});		
					});
				});
			});
			$('html, body').animate({scrollTop:141},{easing:'swing',duration:1000});
			//console.log($(this)[0].innerText);			
			mktoMunchkinFunction('clickLink', {
				href : $(this)[0].innerText
			});
		}
		if ($('#mem-services').css('display') == 'block') {
			$('#mem-services').hide(500, function hideNext() {
				$('div#mem-services > div[class^=service-white]').each(function(index, obj) {
					$(this).hide(250, 'swing');
				});
			});
			$('div[id^=eyc-services]').show(500, 'swing', function showNext() {
				$('div[id^=eyc-services]').each(function(index, obj) {
					$(this).show(0, 'swing', function showNext() {
						$('div#eyc-services > div[class^=service-purple]').each(function(index, obj) {
							$(this).show(500, 'swing');
						});
					});
				});				
			});
			$('html, body').animate({scrollTop:141},{easing:'swing',duration:1000});
		}	
		if ($('#aws-services').css('display') == 'block') {
			$('#aws-services').hide(500,function hideNext() {
				$('div#aws-services > div[class^=service-white]').each(function(index, obj) {
					$(this).hide(250,'swing');
				});
			});
			$('div[id^=eyc-services]').show(500,'swing',function showNext() {
				$('div[id^=eyc-services]').each(function(index, obj) {
					$(this).show(0,'swing',function showNext() {
						$('div#eyc-services > div[class^=service-purple]').each(function(index, obj) {
							$(this).show(500,'swing');
						});
					});
				});
			});
			$('html, body').animate({scrollTop:141},{easing:'swing',duration:1000});
		}
		if ($('#mys-services').css('display') == 'block') {
			$('#mys-services').hide(500, 'swing');
			$('div#mys-services > div[class^=service-purple]').each(function(index, obj) {
				$(this).hide(250,'swing');
			});
			$('div[id^=eyc-services]').show(500,'swing',function showNext() {
				$(this).each(function(index, obj) {
					$(this).show(0, 'swing');
				});
			});
			$('div#eyc-services > div[class^=service-purple]').each(function(index, obj) {
				$(this).show(500,'swing');
			});
			$('html, body').animate({scrollTop:141},{easing:'swing',duration:1000});
		}
	});
});

$(function(){
	$('#aws').click(function() {
		if ($('#aws-services').css('display') == 'block') {
			$('html, body').animate({scrollTop: 0},{easing:'swing',duration:1000});
			$('#aws-services').hide(500,'swing',function hideNext() {				
				$('div#was-services > div[class^=service-white]').each(function(index,obj) {
					$(this).hide(250,'swing');
				});
			});
		}
		if ($('#aws-services').css('display') == 'none') {
			$('#aws-services').show(500,'swing',function showNext() {						
				$('#aws-services').each(function(index,obj) {
					$(this).show(0,'swing',function showNext() {
						$('div#aws-services > div[class^=service-white]').each(function(index,obj) {
							$(this).show(500,'swing');
						});
					});
				});
			});
			$('html, body').animate({scrollTop:141+157},{easing:'swing',duration:1000});
			//console.log($(this)[0].innerText);			
			mktoMunchkinFunction('clickLink', {
				href : $(this)[0].innerText
			});
		}
		if ($('#mem-services').css('display') == 'block') {
			$('#mem-services').hide(500, function hideNext() {
				$('div#mem-services > div[class^=service-white]').each(function(index, obj) {
					$(this).hide(250, 'swing');
				});
			});
			$('#aws-services').show(500, 'swing', function showNext() {
				$('#aws-services').each(function(index, obj) {
					$(this).show(0, 'swing', function showNext() {
						$('div#aws-services > div[class^=service-white]').each(function(index, obj) {
							$(this).show(500,'swing');
						});
					});
				});				
			});
			$('html, body').animate({scrollTop:141+157},{easing:'swing',duration:1000});
		}
		if ($('div[id^=eyc-services]').css('display') == 'block') {
			$('div[id^=eyc-services]').hide(500,'swing');
			$('#aws-services').show(500, 'swing', function showNext() {
				$('#aws-services').each(function(index, obj) {
					$(this).show(0, 'swing', function showNext() {
						$('div#aws-services > div[class^=service-white]').each(function(index, obj) {
							$(this).show(500,'swing');
						});
					});
				});				
			});
			$('html, body').animate({scrollTop:141+157},{easing:'swing',duration:1000});
		}
		if ($('#mys-services').css('display') == 'block') {
			$('#mys-services').hide(500, function hideNext() {
				$('div#mys-services > div[class^=service-white]').each(function(index, obj) {
					$(this).hide(250, 'swing');
				});
			});
			$('#aws-services').show(500, 'swing', function showNext() {
				$('#aws-services').each(function(index, obj) {
					$(this).show(0, 'swing', function showNext() {
						$('div#aws-services > div[class^=service-white]').each(function(index, obj) {
							$(this).show(500,'swing');
						});
					});
				});				
			});
			$('html, body').animate({scrollTop:141+157},{easing:'swing',duration:1000});
		}
		if ($('#pme-services').css('display') == 'block') {
			$('#pme-services').hide(500, function hideNext() {
				$('div#pme-services > div[class^=service-white]').each(function(index, obj) {
					$(this).hide(250, 'swing');
				});
			});
			$('#aws-services').show(500, 'swing', function showNext() {
				$('#aws-services').each(function(index, obj) {
					$(this).show(0, 'swing', function showNext() {
						$('div#aws-services > div[class^=service-white]').each(function(index, obj) {
							$(this).show(500,'swing');
						});
					});
				});				
			});
			$('html, body').animate({scrollTop:141+157},{easing:'swing',duration:1000});
		}		
		if ($('#jtn-services').css('display') == 'block') {
			$('#jtn-services').hide(500, function hideNext() {
				$('div#jtn-services > div[class^=service-purple]').each(function(index, obj) {
					$(this).hide(250, 'swing');
				});
			});
			$('#aws-services').show(500, 'swing', function showNext() {
				$('#aws-services').each(function(index, obj) {
					$(this).show(0, 'swing', function showNext() {
						$('div#aws-services > div[class^=service-white]').each(function(index, obj) {
							$(this).show(500,'swing');
						});
					});
				});				
			});
			$('html, body').animate({scrollTop:141+157},{easing:'swing',duration:1000});
		}
		if ($('div[id^=emc-services]').css('display') == 'block') {
			$('div[id^=emc-services]').hide(500,'swing');
			$('#aws-services').show(500, 'swing', function showNext() {
				$('#aws-services').each(function(index,obj) {
					$(this).show(0, 'swing',function showNext() {
						$('div#aws-services > div[class^=service-white]').each(function(index, obj) {
							$(this).show(500,'swing');
						});
					});
				});				
			});
			$('html, body').animate({scrollTop:141+157},{easing:'swing',duration:1000});
		}
	});
});

$(function(){
	$('#mys').click(function() {
		if ($('#mys-services').css('display') == 'block') {
			$('html, body').animate({scrollTop: 0},{easing:'swing',duration:1000});
			$('#mys-services').hide(500,'swing',function hideNext() {				
				$('div#mys-services > div[class^=service-white]').each(function(index,obj) {
					$(this).hide(250,'swing');
				});
			});
		}
		if ($('#mys-services').css('display') == 'none') {
			$('#mys-services').show(500,'swing',function showNext() {						
				$('#mys-services').each(function(index,obj) {
					$(this).show(0,'swing',function showNext() {
						$('div#mys-services > div[class^=service-purple]').each(function(index,obj) {
							$(this).show(500,'swing');
						});		
					});
				});
			});
			$('html, body').animate({scrollTop:141+157+157},{easing:'swing',duration:1000});
			//console.log($(this)[0].innerText);			
			mktoMunchkinFunction('clickLink', {
				href : $(this)[0].innerText
			});
		}
		if ($('#mem-services').css('display') == 'block') {
			$('#mem-services').hide(500, function hideNext() {
				$('div#mem-services > div[class^=service-white]').each(function(index, obj) {
					$(this).hide(250, 'swing');
				});
			});
			$('#mys-services').show(500, 'swing', function showNext() {
				$('#mys-services').each(function(index, obj) {
					$(this).show(0, 'swing', function showNext() {
						$('div#mys-services > div[class^=service-purple]').each(function(index, obj) {
							$(this).show(500,'swing');
						});
					});
				});				
			});
			$('html, body').animate({scrollTop:141+157+157},{easing:'swing',duration:1000});
		}
		if ($('#eyc-services').css('display') == 'block') {
			$('#eyc-services').hide(500,function hideNext() {
				$('div#eyc-services > div[class^=service-purple]').each(function(index, obj) {
					$(this).hide(250,'swing');
				});
			});
			$('#mys-services').show(500, 'swing', function showNext() {
				$('#mys-services').each(function(index,obj) {
					$(this).show(0,'swing',function showNext() {
						$('div#mys-services > div[class^=service-purple]').each(function(index, obj) {
							$(this).show(500,'swing');
						});
					});
				});				
			});
			$('html, body').animate({scrollTop:141+157+157},{easing:'swing',duration:1000});
		}
		if ($('#aws-services').css('display') == 'block') {
			$('#aws-services').hide(500,function hideNext() {
				$('div#aws-services > div[class^=service-white]').each(function(index, obj) {
					$(this).hide(250,'swing');
				});
			});
			$('#mys-services').show(500, 'swing', function showNext() {
				$('#mys-services').each(function(index,obj) {
					$(this).show(0,'swing',function showNext() {
						$('div#mys-services > div[class^=service-purple]').each(function(index, obj) {
							$(this).show(500,'swing');
						});
					});
				});				
			});
			$('html, body').animate({scrollTop:141+157+157},{easing:'swing',duration:1000});
		}
		if ($('#pme-services').css('display') == 'block') {
			$('#pme-services').hide(500,function hideNext() {
				$('div#pme-services > div[class^=service-white]').each(function(index, obj) {
					$(this).hide(250,'swing');
				});
			});
			$('#mys-services').show(500, 'swing', function showNext() {
				$('#mys-services').each(function(index,obj) {
					$(this).show(0,'swing',function showNext() {
						$('div#mys-services > div[class^=service-purple]').each(function(index, obj) {
							$(this).show(500,'swing');
						});
					});
				});				
			});
			$('html, body').animate({scrollTop:141+157+157},{easing:'swing',duration:1000});
		}
		if ($('#jtn-services').css('display') == 'block') {
			$('#jtn-services').hide(500,function hideNext() {
				$('div#jtn-services > div[class^=service-purple]').each(function(index, obj) {
					$(this).hide(250,'swing');
				});
			});
			$('#mys-services').show(500, 'swing', function showNext() {
				$('#mys-services').each(function(index,obj) {
					$(this).show(0,'swing',function showNext() {
						$('div#mys-services > div[class^=service-purple]').each(function(index, obj) {
							$(this).show(500,'swing');
						});
					});
				});				
			});
			$('html, body').animate({scrollTop:141+157+157},{easing:'swing',duration:1000});
		}				
		if ($('div[id^=emc-services]').css('display') == 'block') {
			$('div[id^=emc-services]').hide(500,'swing');
			$('#mys-services').show(500, 'swing', function showNext() {
				$('#mys-services').each(function(index,obj) {
					$(this).show(0, 'swing',function showNext() {
						$('div#mys-services > div[class^=service-purple]').each(function(index, obj) {
							$(this).show(500,'swing');
						});
					});
				});				
			});
			$('html, body').animate({scrollTop:141+157+157},{easing:'swing',duration:1000});
		}		
	});
});

$(function(){
	$('#pme').click(function() {
		if ($('#pme-services').css('display') == 'block') {
			$('html, body').animate({scrollTop: 0},{easing:'swing',duration:1000});
			$('#pme-services').hide(500,'swing',function hideNext() {				
				$('div#pme-services > div[class^=service-white]').each(function(index,obj) {
					$(this).hide(250,'swing');
				});
			});
		}
		if ($('#pme-services').css('display') == 'none') {
			$('#pme-services').show(500,'swing',function showNext() {						
				$('#pme-services').each(function(index,obj) {
					$(this).show(0,'swing',function showNext() {
						$('div#pme-services > div[class^=service-white]').each(function(index,obj) {
							$(this).show(500,'swing');
						});		
					});
				});
			});
			$('html, body').animate({scrollTop:141+157+157+157},{easing:'swing',duration:1000});
			//console.log($(this)[0].innerText);			
			mktoMunchkinFunction('clickLink', {
				href : $(this)[0].innerText
			});
		}
		if ($('#mem-services').css('display') == 'block') {
			$('#mem-services').hide(500, function hideNext() {
				$('div#mem-services > div[class^=service-white]').each(function(index, obj) {
					$(this).hide(250, 'swing');
				});
			});
			$('#pme-services').show(500, 'swing', function showNext() {
				$('#pme-services').each(function(index, obj) {
					$(this).show(0, 'swing', function showNext() {
						$('div#pme-services > div[class^=service-white]').each(function(index, obj) {
							$(this).show(500,'swing');
						});
					});
				});				
			});
			$('html, body').animate({scrollTop:141+157+157+157},{easing:'swing',duration:1000});
		}
		if ($('#eyc-services').css('display') == 'block') {
			$('#eyc-services').hide(500,function hideNext() {
				$('div#eyc-services > div[class^=service-purple]').each(function(index, obj) {
					$(this).hide(250,'swing');
				});
			});
			$('#pme-services').show(500, 'swing', function showNext() {
				$('#pme-services').each(function(index,obj) {
					$(this).show(0,'swing',function showNext() {
						$('div#pme-services > div[class^=service-white]').each(function(index, obj) {
							$(this).show(500,'swing');
						});
					});
				});				
			});
			$('html, body').animate({scrollTop:141+157+157+157},{easing:'swing',duration:1000});
		}
		if ($('#aws-services').css('display') == 'block') {
			$('#aws-services').hide(500,function hideNext() {
				$('div#aws-services > div[class^=service-white]').each(function(index, obj) {
					$(this).hide(250,'swing');
				});
			});
			$('#pme-services').show(500, 'swing', function showNext() {
				$('#pme-services').each(function(index,obj) {
					$(this).show(0,'swing',function showNext() {
						$('div#pme-services > div[class^=service-white]').each(function(index, obj) {
							$(this).show(500,'swing');
						});
					});
				});				
			});
			$('html, body').animate({scrollTop:141+157+157+157},{easing:'swing',duration:1000});
		}
		if ($('#mys-services').css('display') == 'block') {
			$('#mys-services').hide(500,function hideNext() {
				$('div#mys-services > div[class^=service-purple]').each(function(index, obj) {
					$(this).hide(250,'swing');
				});
			});
			$('#pme-services').show(500, 'swing', function showNext() {
				$('#pme-services').each(function(index,obj) {
					$(this).show(0,'swing',function showNext() {
						$('div#pme-services > div[class^=service-white]').each(function(index, obj) {
							$(this).show(500,'swing');
						});
					});
				});				
			});
			$('html, body').animate({scrollTop:141+157+157+157},{easing:'swing',duration:1000});
		}
		if ($('#jtn-services').css('display') == 'block') {
			$('#jtn-services').hide(500,function hideNext() {
				$('div#jtn-services > div[class^=service-purple]').each(function(index, obj) {
					$(this).hide(250,'swing');
				});
			});
			$('#pme-services').show(500, 'swing', function showNext() {
				$('#pme-services').each(function(index,obj) {
					$(this).show(0,'swing',function showNext() {
						$('div#pme-services > div[class^=service-white]').each(function(index, obj) {
							$(this).show(500,'swing');
						});
					});
				});				
			});
			$('html, body').animate({scrollTop:141+157+157+157},{easing:'swing',duration:1000});
		}				
		if ($('div[id^=emc-services]').css('display') == 'block') {
			$('div[id^=emc-services]').hide(500,'swing');
			$('#pme-services').show(500, 'swing', function showNext() {
				$('#pme-services').each(function(index,obj) {
					$(this).show(0, 'swing',function showNext() {
						$('div#pme-services > div[class^=service-white]').each(function(index, obj) {
							$(this).show(500,'swing');
						});
					});
				});				
			});
			$('html, body').animate({scrollTop:141+157+157+157},{easing:'swing',duration:1000});
		}		
	});
});

$(function(){
	$('#jtn').click(function() {
		if ($('#jtn-services').css('display') == 'block') {
			$('html, body').animate({scrollTop: 0},{easing:'swing',duration:1000});
			$('#jtn-services').hide(500,'swing',function hideNext() {				
				$('div#jtn-services > div[class^=service-purple]').each(function(index,obj) {
					$(this).hide(250,'swing');
				});
			});
		}
		if ($('#jtn-services').css('display') == 'none') {
			$('#jtn-services').show(500,'swing',function showNext() {						
				$('#jtn-services').each(function(index,obj) {
					$(this).show(0,'swing',function showNext() {
						$('div#jtn-services > div[class^=service-purple]').each(function(index,obj) {
							$(this).show(500,'swing');
						});		
					});
				});
			});
			$('#main-footer').css('padding-top', '200px');
			$('html, body').animate({scrollTop:141+157+157+157+157},{easing:'swing',duration:1000});
			//console.log($(this)[0].innerText);			
			mktoMunchkinFunction('clickLink', {
				href : $(this)[0].innerText
			});
		}
		if ($('#mem-services').css('display') == 'block') {
			$('#mem-services').hide(500, function hideNext() {
				$('div#mem-services > div[class^=service-white]').each(function(index, obj) {
					$(this).hide(250, 'swing');
				});
			});
			$('#jtn-services').show(500, 'swing', function showNext() {
				$('#jtn-services').each(function(index, obj) {
					$(this).show(0, 'swing', function showNext() {
						$('div#jtn-services > div[class^=service-purple]').each(function(index, obj) {
							$(this).show(500,'swing');
						});
					});
				});				
			});
			$('html, body').animate({scrollTop:141+157+157+157+157},{easing:'swing',duration:1000});
		}
		if ($('#eyc-services').css('display') == 'block') {
			$('#eyc-services').hide(500,function hideNext() {
				$('div#eyc-services > div[class^=service-purple]').each(function(index, obj) {
					$(this).hide(250,'swing');
				});
			});
			$('#jtn-services').show(500, 'swing', function showNext() {
				$('#jtn-services').each(function(index,obj) {
					$(this).show(0,'swing',function showNext() {
						$('div#jtn-services > div[class^=service-purple]').each(function(index, obj) {
							$(this).show(500,'swing');
						});
					});
				});				
			});
			$('html, body').animate({scrollTop:141+157+157+157+157},{easing:'swing',duration:1000});
		}
		if ($('#aws-services').css('display') == 'block') {
			$('#aws-services').hide(500,function hideNext() {
				$('div#aws-services > div[class^=service-white]').each(function(index, obj) {
					$(this).hide(250,'swing');
				});
			});
			$('#jtn-services').show(500, 'swing', function showNext() {
				$('#jtn-services').each(function(index,obj) {
					$(this).show(0,'swing',function showNext() {
						$('div#jtn-services > div[class^=service-purple]').each(function(index, obj) {
							$(this).show(500,'swing');
						});
					});
				});				
			});
			$('html, body').animate({scrollTop:141+157+157+157+157},{easing:'swing',duration:1000});
		}
		if ($('#mys-services').css('display') == 'block') {
			$('#mys-services').hide(500,function hideNext() {
				$('div#mys-services > div[class^=service-purple]').each(function(index, obj) {
					$(this).hide(250,'swing');
				});
			});
			$('#jtn-services').show(500, 'swing', function showNext() {
				$('#jtn-services').each(function(index,obj) {
					$(this).show(0,'swing',function showNext() {
						$('div#jtn-services > div[class^=service-purple]').each(function(index, obj) {
							$(this).show(500,'swing');
						});
					});
				});				
			});
			$('html, body').animate({scrollTop:141+157+157+157+157},{easing:'swing',duration:1000});
		}
		if ($('#pme-services').css('display') == 'block') {
			$('#pme-services').hide(500,function hideNext() {
				$('div#pme-services > div[class^=service-white]').each(function(index, obj) {
					$(this).hide(250,'swing');
				});
			});
			$('#jtn-services').show(500, 'swing', function showNext() {
				$('#jtn-services').each(function(index,obj) {
					$(this).show(0,'swing',function showNext() {
						$('div#jtn-services > div[class^=service-purple]').each(function(index, obj) {
							$(this).show(500,'swing');
						});
					});
				});				
			});
			$('html, body').animate({scrollTop:141+157+157+157+157},{easing:'swing',duration:1000});
		}				
		if ($('div[id^=emc-services]').css('display') == 'block') {
			$('div[id^=emc-services]').hide(500,'swing');
			$('#jtn-services').show(500, 'swing', function showNext() {
				$('#jtn-services').each(function(index,obj) {
					$(this).show(0, 'swing',function showNext() {
						$('div#jtn-services > div[class^=service-purple]').each(function(index, obj) {
							$(this).show(500,'swing');
						});
					});
				});				
			});
			$('html, body').animate({scrollTop:141+157+157+157+157},{easing:'swing',duration:1000});
		}		
	});
});

$(function(){
	$('#emc').click(function() {
		if ($('div[id^=emc-services]').css('display') == 'block') {
			$('div[id^=emc-services]').hide(500,'swing');
			$('html, body').animate({scrollTop:0},{easing:'swing',duration:1000});			
		}
		if ($('div[id^=emc-services]').css('display') == 'none') {								
			$('div[id^=emc-services]').show(500,'swing',function showNext() {						
				$('div[id^=emc-services]').each(function(index,obj) {
					$(this).show(0,'swing',function showNext() {
						$('div#emc-services > div[class^=service-purple]').each(function(index,obj) {
							$(this).show(500,'swing');
						});		
					});
				});
			});
			$('html, body').animate({scrollTop:141+157+157},{easing:'swing',duration:1000});
			//console.log($(this)[0].innerText);			
			mktoMunchkinFunction('clickLink', {
				href : $(this)[0].innerText
			});
		}
		if ($('#mem-services').css('display') == 'block') {
			$('#mem-services').hide(500, function hideNext() {
				$('div#mem-services > div[class^=service-white]').each(function(index, obj) {
					$(this).hide(250, 'swing');
				});
			});
			$('div[id^=emc-services]').show(500, 'swing', function showNext() {
				$('div[id^=emc-services]').each(function(index, obj) {
					$(this).show(0, 'swing', function showNext() {
						$('div#emc-services > div[class^=service-purple]').each(function(index, obj) {
							$(this).show(500, 'swing');
						});
					});
				});				
			});
			$('html, body').animate({scrollTop:141+157+157},{easing:'swing',duration:1000});
		}	
		if ($('#eyc-services').css('display') == 'block') {
			$('#eyc-services').hide(500,function hideNext() {
				$('div#eyc-services > div[class^=service-purple]').each(function(index, obj) {
					$(this).hide(250,'swing');
				});
			});
			$('div[id^=emc-services]').show(500,'swing',function showNext() {
				$('div[id^=emc-services]').each(function(index, obj) {
					$(this).show(0,'swing',function showNext() {
						$('div#emc-services > div[class^=service-purple]').each(function(index, obj) {
							$(this).show(500,'swing');
						});
					});
				});
			});
			$('html, body').animate({scrollTop:141+157+157},{easing:'swing',duration:1000});
		}
		if ($('#mys-services').css('display') == 'block') {
			$('#mys-services').hide(500, 'swing');
			$('div#mys-services > div[class^=service-white]').each(function(index, obj) {
				$(this).hide(250,'swing');
			});
			$('div[id^=emc-services]').show(500,'swing',function showNext() {
				$(this).each(function(index, obj) {
					$(this).show(0, 'swing');
				});
			});
			$('div#emc-services > div[class^=service-purple]').each(function(index, obj) {
				$(this).show(500,'swing');
			});
			$('html, body').animate({scrollTop:141+157+157},{easing:'swing',duration:1000});
		}
	});
});

$(function(){
	$(document).ready(function() {
		if (window.location.hash == ('#make-email-easy') || window.location.hash == ('#search-optimization') || window.location.hash == ('#social-promotions') || window.location.hash == ('#social-promotions')) {
			$('div[id^=eyc-services]').css('display','none');
			$('#aws-services').css('display','none');
			$('#mys-services').css('display','none');
			$('#pme-services').css('display','none');
			$('#jtn-services').css('display','none');
			$('div[id^=emc-services]').css('display','none');			
			$('#mem-services').show(500,'swing',function showNext() {						
				$('#mem-services').each(function(index,obj) {
					$(this).show(0,'swing',function showNext() {
						$('div#mem-services > div[class^=service-white]').each(function(index,obj) {
							$(this).show(500,'swing');
						});		
					});
				});
			});
			$('html, body').animate({scrollTop:0},{easing:'swing',duration:1000});
			//console.log($(this)[0].innerText);			
			mktoMunchkinFunction('clickLink', {
				href : $(this)[0].innerText
			}); 
		}
		if (window.location.hash == ('#engage-your-customers') || window.location.hash == ('#automate') || window.location.hash == ('#batch') || window.location.hash == ('#drip') || window.location.hash == ('#nurture') || window.location.hash == ('#events') || window.location.hash == ('#webinar') || window.location.hash == ('#tradeshow') || window.location.hash == ('#calendar')) {
			$('#mem-services').css('display','none');
			$('#aws-services').css('display','none');
			$('#mys-services').css('display','none');
			$('#pme-services').css('display','none');
			$('#jtn-services').css('display','none');
			$('div[id^=emc-services]').css('display','none');
			$('div[id^=eyc-services]').show(500,'swing',function showNext() {						
				$('div[id^=eyc-services]').each(function(index,obj) {
					$(this).show(0,'swing',function showNext() {
						$('div#eyc-services > div[class^=service-purple]').each(function(index,obj) {
							$(this).show(500,'swing');
						});		
					});
				});
			});
			$('html, body').animate({scrollTop:141},{easing:'swing',duration:1000});
		}
		if (window.location.hash == ('#align-with-sales') || window.location.hash == ('#lead-scoring') || window.location.hash == ('#sales-notifications') || window.location.hash == ('#actionable-insight')) {
			$('#mem-services').css('display','none');
			$('div[id^=eyc-services]').css('display','none');
			$('#mys-services').css('display','none');
			$('#pme-services').css('display','none');
			$('#jtn-services').css('display','none');
			$('div[id^=emc-services]').css('display','none');
			$('#aws-services').show(500,'swing',function showNext() {						
				$('#aws-services').each(function(index,obj) {
					$(this).show(0,'swing',function showNext() {
						$('div#aws-services > div[class^=service-white]').each(function(index,obj) {
							$(this).show(500,'swing');
						});		
					});
				});
			});
			$('html, body').animate({scrollTop:141+157},{easing:'swing',duration:1000});
		}		
		if (window.location.hash == ('#measure-your-success') || window.location.hash == ('#executive-dashboards') || window.location.hash == ('#content-analysis') || window.location.hash == ('#flexible-reporting')) {
			$('#mem-services').css('display','none');
			$('div[id^=eyc-services]').css('display','none');
			$('#aws-services').css('display','none');
			$('#pme-services').css('display','none');
			$('#jtn-services').css('display','none');
			$('div[id^=emc-services]').css('display','none');
			$('#mys-services').show(500,'swing',function showNext() {						
				$('#mys-services').each(function(index,obj) {
					$(this).show(0,'swing',function showNext() {
						$('div#mys-services > div[class^=service-white]').each(function(index,obj) {
							$(this).show(500,'swing');
						});		
					});
				});
			});
			$('html, body').animate({scrollTop:141+157+157},{easing:'swing',duration:1000});
		}
		if (window.location.hash == ('#plan-more-effectively') || window.location.hash == ('#unified') || window.location.hash == ('#specialized') || window.location.hash == ('#actionable')) {
			$('#mem-services').css('display','none');
			$('div[id^=eyc-services]').css('display','none');
			$('#aws-services').css('display','none');
			$('#mys-services').css('display','none');
			$('#jtn-services').css('display','none');
			$('div[id^=emc-services]').css('display','none');
			$('#pme-services').show(500,'swing',function showNext() {						
				$('#pme-services').each(function(index,obj) {
					$(this).show(0,'swing',function showNext() {
						$('div#pme-services > div[class^=service-white]').each(function(index,obj) {
							$(this).show(500,'swing');
						});		
					});
				});
			});
			$('html, body').animate({scrollTop:141+157+157+157},{easing:'swing',duration:1000});
		}		
		if (window.location.hash == ('#join-the-nation') || window.location.hash == ('#marketing-first') || window.location.hash == ('#launchpoint-ecosystem') || window.location.hash == ('#passionate-community')) {
			$('#mem-services').css('display','none');
			$('div[id^=eyc-services]').css('display','none');
			$('#aws-services').css('display','none');
			$('#pme-services').css('display','none');
			$('#mys-services').css('display','none');
			$('div[id^=emc-services]').css('display','none');
			$('#jtn-services').show(500,'swing',function showNext() {						
				$('#jtn-services').each(function(index,obj) {
					$(this).show(0,'swing',function showNext() {
						$('div#jtn-services > div[class^=service-purple]').each(function(index,obj) {
							$(this).show(500,'swing');
						});		
					});
				});
			});
			$('html, body').animate({scrollTop:141+157+157+157+157},{easing:'swing',duration:1000});
		}
		if (window.location.hash == ('#explore-more-channels') || window.location.hash == ('#video') || window.location.hash == ('#sms') || window.location.hash == ('#social') || window.location.hash == ('#sales-alert') || window.location.hash == ('#poll') || window.location.hash == ('#blog')) {
			$('#mem-services').css('display','none');
			$('div[id^=eyc-services]').css('display','none');
			$('#mys-services').css('display','none');
			$('div[id^=emc-services]').show(500,'swing',function showNext() {						
				$('div[id^=emc-services]').each(function(index,obj) {
					$(this).show(0,'swing',function showNext() {
						$('div#emc-services > div[class^=service-purple]').each(function(index,obj) {
							$(this).show(500,'swing');
						});		
					});
				});
			});
			$('html, body').animate({scrollTop:141+157+157},{easing:'swing',duration:1000});
		}
	});
});

$(function() {
	$('html, body').bind('scroll mousedown wheel DOMMouseScroll mousewheel keyup', function(e) {
		if (e.which > 0 || e.type == "mousedown" || e.type == "mousewheel") {
			$('html, body').stop();
		}
	});
});

$(function() {
	var hu = $('#menu-item-13 > a').attr('href');
	var cu = ($.trim($('#page-name').text())).toLowerCase();
	if (cu !== '') {
		cu = cu.replace(' ','-');
		$('#menu-item-13 > a').attr('href', hu+'#'+cu);
	} 		
});

$(function() {
	$('a.venobox_custom').click(function() {
		$('.vbox-overlay').onAvailable(function(){
			var vcnt = $.trim($('.vbox-num').html().replace(/ /g,''));
			var varr = vcnt.split('/');
			if (varr[0] == varr[1]) {
				$('.vbox-prev').remove();
				$('.vbox-next').remove();
			}
		});	
	});	
});

$(function() {
	var nurture_more = 'Delivering high quality content that is relevant and responsive requires the capability to <b>organize your content</b> in a ' +
							'cohesive manner. You need to be able to <b>prioritize your content</b> based on the value, engagement and/or relevancy of your ' + 
							'content and <b>adjust your messaging</b> based on attributes and behaviors of your customers as their engagement changes over ' + 
							'time. You also need to be confident that you <b>never mistakenly deliver the same content</b> to your customer.';						
	$('#nurture-more').toggle(function(){
		$('#nurture-more').text('Read Less...');
		$('#hide-bullet').append('<li>'+nurture_more+'<br/><br/></li>');
	},function(){
		$('#nurture-more').text('Read More...');
		$('li').remove(':contains("Delivering high quality content")');
	});		
});

$(function() {
	var score_more_1 = 'Lead scoring helps companies know whether prospects need to be fast-tracked to sales or developed with lead nurturing. ' + 
							'The best lead scoring systems use <b>demographic and firmographic</b> attributes (i.e.: company size, industry, and job title) ' +  
							'and <b>behavior</b> (i.e.: clicks, keywords, and web visits). Using this type of scoring system you can <b>better ' + 
							'understand</b> the quality of a prospect, their level of interest and their urgency to buy.';
	var score_more_2 = 'Marketo makes it easy to <b>adopt best practice scoring models</b> and setup the scoring methodology that is <b>best for your business</b>. ' + 
							'You can also easily create <b>multiple scoring models</b> that go beyond just understanding the quality of a prospect and their ' +
							'level of interest; you can create scoring models that qualify the level of interest in a specific service or product.';
	$('#score-more').toggle(function(){
		$('#score-more').text('Read Less...');
		$('#hide-bullet').append('<li>'+score_more_1+'<br/><br/></li>');
		$('#hide-bullet').append('<li>'+score_more_2+'<br/><br/></li>');
	},function(){
		$('#score-more').text('Read More...');
		$('li').remove(':contains("Lead scoring helps companies")');
		$('li').remove(':contains("Marketo makes it easy to")');
	});		
});

$(function() {
	var current_url = location.href;
	if (current_url == 'http://marketolive.com/m/b2b/') {
		$('#mem-services').hide(500, 'swing', function hideNext() {
			$('div#mem-services > div[class^=service-white]').each(function(index, obj) {
				$(this).hide(250, 'swing');
			});
		});
	}
}); 
/*
$(function() {
	var owl = $('.owl-demo');
	owl.owlCarousel({
		afterInit : function(elem) {
			var that = this;
			that.owlControls.prependTo(elem);
		},
		items : 3, //10 items above 1000px browser width
	});
});
*/
