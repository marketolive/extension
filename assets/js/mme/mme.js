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
    var pod = getCookie("userPod");
    console.log("MME > Reading User Pod: " + pod);
    
    switch (pod) {
        case "app-sjp":
            console.log("MME > Deeplinking: 106");
            $("#demo-in-marketo").click(function () {
            location.replace("https://" + pod + ".marketo.com/#SC21914B2");
            });
            break;
        case "app-ab07":
            console.log("MME > Deeplinking: 106a");
            $("#demo-in-marketo").click(function () {
                location.replace("https://" + pod + ".marketo.com/#SC20920B2");
            });
            break;
        case "app-ab08":
            console.log("MME > Deeplinking: 106b");
            $("#demo-in-marketo").click(function () {
                location.replace("https://" + pod + ".marketo.com/#SC19745B2");
            });
            break;
        default:
            console.log("MME > Invalid userPod cookie: " + pod);
            $("#demo-in-marketo").click(function() {
                $("#modal-background").attr("style", "display: block");
            });
            $("#secret-passage").click(function() {
                $("#modal-background")[0].style.display = "none";
            });
            break;
    }
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
            document.getElementById('image-overlay').src = "../assets/img/beacon.jpg";
            document.getElementById('android-time').style.display = "none";
            document.getElementById('android-date').style.display = "none";
            //$('.app-description-box-container').css('margin-bottom','93px');
            //document.getElementById('section-description').innerHTML = engagementWords[2];
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
        //document.getElementById('image-overlay').src = '../assets/img/mme-push-1.png';
        $('.push-notification-container').css('display', 'none');
        $('.phone-buttons-container').css('display', 'inline-block');
        var logo = getCookie('logo');
        var company = getCookie('company');
        if (company != null && company != "turner") {
            var company = company.substring(0, company.indexOf('.'));
            document.getElementById('push-name-name').innerHTML = company;
            document.getElementById('turner-tie-logo').src = logo;
        }
        if (pushNotification.value != '') {
            document.getElementById('push-words').innerHTML = pushNotification.value;
        } else {
            document.getElementById('push-words').innerHTML = 'Summers here! Stay cool in the heat with this discount!';
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
                    document.getElementById('image-overlay').src = "../assets/img/beacon-1.jpg";
                    document.getElementById('section-description').innerHTML = engagementWords[1];
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