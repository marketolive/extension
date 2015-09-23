var getCookie = function(cookieField) {
    var name = cookieField + "=",
        cookies = document.cookie.split(';'),
        currentCookie;
    for (var ii = 0; ii < cookies.length; ++ii) {
        var currentCookie = cookies[ii].trim();
        if (currentCookie.indexOf(name) == 0)
            return currentCookie.substring(name.length, currentCookie.length);
    }
    return null;
}

$(document).ready(function() {
    $('#page-cover-container').click(function(){
        x = 0;
        $('.side-bar').css('background-color','transparent');
        $('.side-bar-inner-container').css('display','none');  
    });
    var pod = getCookie("userPod"),
    	color = getCookie('color'),
        logo = getCookie('logo'),
        defaultLogo = RS.imagePath+'turner-tech-white.png',
        defaultColor = 'rgb(42, 83, 112)';

    if (logo == null) {
        logo = defaultLogo;
    }
    if (color == null) {
		color = defaultColor;
    }
	
	$('.logo-swap').attr('src', logo);
    $('.asset-header-mkto').css('background-color', color);
	
    $("#reminder-clone, #lp-clone, #auto-responder-clone").click(function() {
        console.log("Replicate Success > Clicked: "+this.id);
        switch (this.id) {
            case 'reminder-clone':
                $('#reminder-clone').css('display', 'none');
                $('#reminder-arrow').css('display', 'block');
                $('#reminder-arrow').animate({
                    'width': '100%'
                }, 1000);
                setTimeout(function() {
                    $('#reminder-body').fadeIn("slow", "linear");
                }, 900);
                break;
            case 'lp-clone':
                $('#lp-clone').css('display', 'none');
                $('#lp-arrow').css('display', 'block');
                $('#lp-arrow').animate({
                    'width': '100%'
                }, 1000);
                setTimeout(function() {
                    $('#landing-page-body').fadeIn("slow", "linear");
                }, 900);
                break;
            case 'auto-responder-clone':
                $('#auto-responder-clone').css('display', 'none');
                $('#auto-responder-arrow').css('display', 'block');
                $('#auto-responder-arrow').animate({
                    'width': '100%'
                }, 1000);
                setTimeout(function() {
                    $('#auto-responder-body').fadeIn("slow", "linear");
                }, 900);
                break;
            default:
                console.log("Replicate Success > Invalid: Switch statement in click callback hit default condition line 85");
                break;
        }
    });
    $("#lp-first, #auto-responder-first, #reminder-first").click(function() {
        var id = this.id;
        var content = '#' + id + '-content';
        var replace = '#' + id + '-replace';
        $(content).css('display', 'none');
        $(replace).css('display', 'block');
    });
    $("#lp-second, #auto-responder-second-img, #reminder-second-img").click(function() {
        document.getElementById('lp-second-replace').style.display = 'block';
    });
    $("#rs-image").click(function() {
        if (document.getElementById('lp-lightbox').style.display == 'block') {
            document.getElementById('lp-second-img').src = RS.secondaryImage;
            document.getElementById('lp-second-replace').style.display = "none";
        } else if (document.getElementById('auto-responder-lightbox').style.display == 'block') {
            document.getElementById('auto-responder-second-img').src = RS.secondaryImage;
            document.getElementById('lp-second-replace').style.display = "none";
        } else if (document.getElementById('reminder-lightbox').style.display == 'block') {
            document.getElementById('reminder-second-img').src = RS.secondaryImage;
            document.getElementById('lp-second-replace').style.display = "none";
        } else {}
    });
    $("#rs-save").click(function() {
        $('.background-cover').css('display', 'none');
        $('.rs-lightbox-container').css('display', 'none');
        if (document.getElementById('lp-lightbox').style.display == 'block') {
            var el = document.querySelector("#lp-textarea");
            document.getElementById('lp-text-inside').innerHTML = el.value;
            document.getElementById('original-lp-image').src = RS.secondaryImage;
        } else if (document.getElementById('auto-responder-lightbox').style.display == 'block') {
            var el = document.querySelector("#auto-responder-textarea");
            document.getElementById('auto-responder-text-inside').innerHTML = el.value;
            document.getElementById('original-auto-responder-image').src = RS.secondaryImage;
        } else if (document.getElementById('reminder-lightbox').style.display == 'block') {
            var el = document.querySelector("#reminder-textarea");
            document.getElementById('reminder-text-inside').innerHTML = el.value;
            document.getElementById('original-reminder-image').src = RS.secondaryImage;
        }
    });
    $('#landing-page-body, #auto-responder-body, #reminder-body').click(function() {
        $('.background-cover').css('display', 'block');
        $('.rs-lightbox-container').css('display', 'block');
        $('#auto-responder-lightbox').css('display', 'none');
        $('#reminder-lightbox').css('display', 'none');
        $('#lp-lightbox').css('display', 'none');
        switch (this.id) {
            case 'landing-page-body':
                $('#lp-lightbox').css('display', 'block');
                break;
            case 'auto-responder-body':
                $('#auto-responder-lightbox').css('display', 'block');
                break;
            case 'reminder-body':
                $('#reminder-lightbox').css('display', 'block');
                break;
            default:
                break;
        }
    });
    $('#onto-mkto').click(function() {
        $('#replicate-success').css('background-color', 'inherit');
        $('#competition').css('display', 'none');
        $('#mkto').fadeIn("slow", "linear");
        $('#mkto-clone').css('display', 'block');
    });
    $('#rs-close').click(function() {
        $('.background-cover').css('display', 'none');
        $('#tokens-cover').css('display', 'none');
        $('.token-city').html($("#city-value").html());
        $('.token-location').html($("#location-value").html());
        $('.token-time').html($("#time-value").html());
        $('.token-date').html($("#date-value").html());
        document.getElementById('original-lp-image-mkto').src = $("#image-value").attr("src");
        document.getElementById('original-reminder-image-mkto').src = $("#image-value").attr("src");
        document.getElementById('original-auto-responder-image-mkto').src = $("#image-value").attr("src");
        $('.assets-image').src = $("#image-value").attr("src");
        $('.assets-image').css('border', '1px solid #5a54a4');
        $('.token-city, .token-location, .token-time, .token-date').css({
            'color': '#5a54a4',
            'font-weight': 'bold'
        });
        $('#onto-mkto').hide();
    });
    $('#mkto-clone').click(function() {
        $('#mkto-clone').css('display', 'none');
        $('.campaign-arrow-mkto').css('display', 'block');
        $('.campaign-arrow-mkto').animate({
            'width': '100%'
        }, 1000);
        setTimeout(function() {
            $('#reminder-body-mkto').fadeIn('slow', 'linear');
            $('#auto-responder-body-mkto').fadeIn('slow', 'linear');
            $('#landing-page-body-mkto').fadeIn('slow', 'linear');
        }, 1000);
        setTimeout(function() {
            $('.campaign-arrow-mkto').css('display', 'none');
            $('#tokens').css('display', 'block');
        }, 1500);
    });
    $("#tokens").click(function() {
        $('.background-cover').css('display', 'block');
        $('#tokens-cover').css('display', 'block');
    });
});