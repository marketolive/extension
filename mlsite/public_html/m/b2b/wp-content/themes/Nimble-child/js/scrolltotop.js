$.fn.center = function() {
	this.css("position", "absolute");
	this.css("top", (jQuery(window).height() - this.height() ) / 2 + jQuery(window).scrollTop() + "px");
	this.css("left", (jQuery(window).width() - this.width() ) / 2 + jQuery(window).scrollLeft() + "px");
	return this;
}

function loadModal() {
	$('#form_modal').css('display', 'block');
	$('.formModalContent').center();
}

$(document).ready(function () {
	$('body').append("<a href='#' class='scrollup' title='Back To Top'></a>");
		
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scrollup').fadeIn();
        } else {
            $('.scrollup').fadeOut();
        }
    });

    $('.scrollup').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });

});