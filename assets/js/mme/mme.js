// This script is dependent on mme-constants-<lang> being include on the page beforehand. 
// It allows this script to run independent of which language the page is in.

$(document).ready(function() {
    $('#page-cover-container').click(function() {
        x = 0;
        $('.side-bar').css('background-color', 'transparent');
        $('.side-bar-inner-container').css('display', 'none');
    });
    $('#push-container').click(function() {
        $(this).hide('slide', {
            direction: 'right'
        }, 800, function() {
            $(this).css('display', 'none');
            document.getElementById('image-overlay').src = MME.imagePath+"beacon.jpg";
            document.getElementById('android-time').style.display = "none";
            document.getElementById('android-date').style.display = "none";
            $('#mme').attr("class", "mme-bkg-3");
            $('.beacon-overlay').css('display', 'block');
        });
    });
    $('.beacon-overlay').click(function() {
        $('.beacon-overlay').hide('slide', {
            direction: 'down'
        }, 800, function() {
            $(this).css('display', 'none');
        });
        $('.beacon-overlay-1').show('slide', {
            direction: 'up'
        }, 800, function() {
            $('#mme').attr("class", "mme-bkg-4");
        });
    });
    $('#message-body').keyup(function(e) {
        var enterKey = 13;
        if (e.which == enterKey) {
            push();
        }
    });
    $("#push").click(function() {
        push()
    });
    var push = function() {
        var audio = document.getElementById("audio");
        var audio2 = document.getElementById("audio2");
        audio.play();
        audio2.play();
        var pushNotification = document.querySelector('#message-body');
        $('.push-notification-container').css('display', 'none');
        $('.phone-buttons-container').css('display', 'inline-block');
        var logo = MME.getCookie('logo');
        var company = MME.getCookie('company');
        if (company != null && company != "turner") {
            var company = company.substring(0, company.indexOf('.'));
            document.getElementById('push-name-name').innerHTML = company;
            document.getElementById('turner-tie-logo').src = logo;
        }
        if (pushNotification.value != '') {
            document.getElementById('push-words').innerHTML = pushNotification.value;
        } else {
            document.getElementById('push-words').innerHTML = MME.defaultPush;
        }
        $('#push-image').fadeIn("slow", function() {});
        $('#push-words-container').fadeIn("slow", function() {});
    }
    $("#back-phone-button, #next-phone-button").click(function() {
        var className = $('#mme').attr('class').split(' ')[0];
        console.log("MME > Clicked: "+className);
        switch (className) {
            case 'mme-bkg':
                if (this.id == 'back-phone-button') {} else {
                    document.getElementById('image-overlay').src = MME.imagePath+"beacon-1.jpg";
                    document.getElementById('push-words-container').style.display = "none";
                    document.getElementById('push-image').style.display = "none";
                    $('#mme').attr("class", "mme-bkg-2");
                    $('.push-notification-container').css('display', 'none');
                    $('#message-title').css('display', 'none');
                    $('#message-body').css('display', 'none');
                    $('.app-description-box-container').css('display', 'none');
                    $('#push-container').css({
                        'display': 'block',
                        'width': '409px',
                        'left': '4px',
                        'top': '235px'
                    });
                    $('#back-phone-button').css('display', 'none');
                    $('#next-phone-button').css('display', 'none');
                    $('#main-inner-phone-container').css('width', '450px');
                    $('#android-background').css('width', '100%');
                    $('#android-container').css('width', '100%');
                    $('#phone').css('width', '100%');
                    $('#image-overlay').css({
                        'width': '408px',
                        'height': '728px',
                        'top': '17px',
                        'left': '5px'
                    });
                    $('#android-time-container').css({
                        'width': '408px',
                        'top': '75px',
                        'left': '5px'
                    });
                    $('#android-time').css('font-size', '76px');
                    $('#android-date').css('font-size', '22px');
                    $('#image-push-1').css('width', '100%');
                }
                break;
            default:
                console.log("MME > Background is the Default");
                break;
        }
    });
});