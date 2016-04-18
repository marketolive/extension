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
    var pod = getCookie("userPod");
    console.log("AdBridge > Reading User Pod: " + pod);
    switch (pod) {
        case "app-sjp":
            console.log("AdBridge > Deeplinking: 106");
            $("#demo-in-marketo").click(function () {
                location.replace("https://app-sjp.marketo.com/#SL1119566B2LA1");
            });
            break;
        case "app-ab07":
            console.log("AdBridge > Deeplinking: 106a");
            $("#demo-in-marketo").click(function () {
                location.replace("https://app-ab07.marketo.com/#SL984037B2");
            });
            break;
        case "app-ab08":
            console.log("AdBridge > Deeplinking: 106b");
            $("#demo-in-marketo").click(function () {
                location.replace("https://app-ab08.marketo.com/#SL978341B2");
            });
            break;
        default:
            console.log("AdBridge > Invalid userPod cookie: " + pod);
            $("#demo-in-marketo").click(function() {
                location.replace("https://login.marketo.com");
            });
            break;
    }
    setTimeout(function() {
        $('#adbridge-two').animate({
            'margin-left': '-17%'
        }, 1000);
    }, 500);
    $('.margin-left').fadeIn("slow", "linear");

    document.onscroll = function() {
        var currHeight = $(document).scrollTop();
        if (currHeight > 550)
            $('#adbridge-top').css('display', 'block');
        else {
            $('#adbridge-top').css('display', 'none');
        }
    };
    var currentPosition = 1;
    $("#adbridge-top").click(function() {
        var currHeight = $(document).scrollTop();
        if (currHeight > 550 && currHeight < 800) {
            $('html,body').animate({
                scrollTop: $("#adbridge-space").offset().top
            });
            $('#adbridge-top').css('display', 'none');
        } else if (currHeight > 850) {
            $('html,body').animate({
                scrollTop: $("#cloud-container").offset().top
            });
        } else {}
    });
    $("#adbridge-back,#adbridge-next").click(function() {
        console.log("AdBridge > Clicked: "+this.id);
        switch (this.id) {
            case 'adbridge-next':
                switch (currentPosition) {
                    case 0:
                        $('#adbridge-bkg-line-1').css('display', 'inline-block');
                        setTimeout(function() {
                            $('#adbridge-bkg-line-1').animate({
                                'width': '30%'
                            }, 1500);
                        }, 500);
                        $('#adbridge-description-first').css('display', 'none');
                        $('#adbridge-two').fadeIn("slow", "linear");
                        $('#adbridge-two').css("display", "inline-block");
                        $('#adbridge-description-second').fadeIn("slow", "linear");
                        currentPosition++;
                        break;
                    case 1:
                        $('#adbridge-one').animate({
                            'margin-left': '1%'
                        });
                        $('.part-one-section').css('width', '40%');
                        $('.part-one-middle-section').css('width', '40%');
                        $('#adbridge-bkg-line-2').css('display', 'inline-block');
                        setTimeout(function() {
                            $('#adbridge-bkg-line-2').animate({
                                'width': '40%'
                            }, 1500);
                            setTimeout(function() {
                                $('#adbridge-bkg-line-2').css('min-width', '500px');
                            }, 1500);
                        }, 500);
                        $('#adbridge-description-first').css('display', 'none');
                        $('#adbridge-three').fadeIn("slow", "linear");
                        $('#adbridge-three').css("display", "inline-block");
                        $('#adbridge-description-third').fadeIn("slow", "linear");
                        currentPosition++;
                        break;
                    case 2:
                        $('#adbridge-top').css('display', 'block');
                        $('.add-spacing').css('display', 'block');
                        $('#adbridge-arrow').fadeIn("slow", "linear");
                        setTimeout(function() {
                            $('html,body').animate({
                                scrollTop: $("#cloud-container").offset().top
                            });
                        }, 1500);
                        $('#adbridge-description-third').css('display', 'none');
                        setTimeout(function() {
                            $('#cloud-img').fadeIn("slow", "linear");
                            $('#adbridge-description-fourth').fadeIn("slow", "linear");
                        }, 1500);
                        currentPosition++;
                        break;
                    case 3:
                        $('#adbridge-next').css('display', 'none');
                        $('.arrow-from-cloud-container').css('height', '350px');
                        $('#last-arrow').css("display", "inline-block");
                        $('#last-arrow').animate({
                            "height": "350px"
                        });
                        setTimeout(function() {
                            $('html,body').animate({
                                scrollTop: $("#fb-container").offset().top
                            });
                        }, 1500);
                        setTimeout(function() {
                            $('#fb-img').fadeIn("slow", "linear");
                            $('#adbridge-description-fifth').fadeIn("slow", "linear");
                        }, 1500);
                        currentPosition++;
                        break;
                    default:
                        break;
                        break;
                }
            default:
                console.log("AdBridge > Clicked: Back Button");
                break;
        }
    });


});