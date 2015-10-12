$(document).ready(function() {

    var moving = false;
    function MouseWheelHandler(e) {
        // cross-browser wheel delta
        e = window.event || e;
        var delta = Math.max(-1, Math.min(1,
                (e.wheelDelta || -e.deltaY || -e.detail)));
        //scrolling down?
        if (delta < 0 && moving == false) {
            console.log("test");
            if(firstSection.style.display == "" || firstSection.style.display == "block"){
                moving = true;
                $('#main-body').animate({
                    "margin-top" : "-800px"
                }, 800, function(){
                    $('#main-body').css({
                        "display" : "none"
                    });
                    $('.page-option').css({
                        "background-color" : "transparent"
                    });
                    $('#second-option').css({
                        "background-color" : "#5a54a4"
                    });
                    $('#partdeux').css({
                        "margin" : "0px"
                    });
                    $('#partdeux').fadeIn( "medium", function() {});
                });
                window.setTimeout(function(){
                    moving = false;
                }, 2000);
            }
            else if(secondSection.style.display == "block"){
                moving = true;
                $('#partdeux').animate({
                    "margin-top" : "-800px"
                }, 800, function(){
                    $('#partdeux').css({
                        "display" : "none"
                    });
                    $('#parttrois').css({
                        "margin" : "0px"
                    });
                    $('.page-option').css({
                        "background-color" : "transparent"
                    });
                    $('#third-option').css({
                        "background-color" : "#5a54a4"
                    });
                    $('#parttrois').fadeIn( "medium", function() {});
                });
                window.setTimeout(function(){
                    moving = false;
                }, 2000);
            }
        //scrolling up?
        }
        else if(moving == false){
            if(secondSection.style.display == "block"){
                moving = true;
                $('#partdeux').animate({
                    "margin-top" : "800px"
                }, 800, function(){
                    console.log("test4");
                    $('#partdeux').css({
                        "display" : "none"
                    });
                    $('#main-body').css({
                        "margin" : "0px"
                    });
                    $('.page-option').css({
                        "background-color" : "transparent"
                    });
                    $('#first-option').css({
                        "background-color" : "#5a54a4"
                    });
                    $('#main-body').fadeIn( "medium", function() {});
                });
                window.setTimeout(function(){
                    moving = false;
                }, 2000);
            }
            else if(thirdSection.style.display == "block"){
                moving = true;
                $('#parttrois').animate({
                    "margin-top" : "800px"
                }, 800, function(){
                    $('#parttrois').css({
                        "display" : "none"
                    });
                    $('#partdeux').css({
                        "margin" : "0px"
                    });
                    $('.page-option').css({
                        "background-color" : "transparent"
                    });
                    $('#second-option').css({
                        "background-color" : "#5a54a4"
                    });
                    $('#partdeux').fadeIn( "medium", function() {});
                });
                window.setTimeout(function(){
                    moving = false;
                }, 2000);
            }            
        }
    }
    var firstSection = document.getElementById('main-body');
    var secondSection = document.getElementById('partdeux');
    var thirdSection = document.getElementById('parttrois');
    if (firstSection.addEventListener) {
        firstSection.addEventListener("mousewheel", MouseWheelHandler, false);
        secondSection.addEventListener("mousewheel", MouseWheelHandler, false);
        thirdSection.addEventListener("mousewheel", MouseWheelHandler, false);
    }
    var body = document.getElementById('mme');
    var windowHeight = $(window).height();
    var docHeight = $(document).height();
    $('.main-body-options').click(function(){
        x = 0;
        $('.side-bar').css('background-color','transparent');
        $('.side-bar-inner-container').css('display','none');  
    });
    $("#first-down, #second-up, #second-down, #third-up").click(function(e) {
        if(e.currentTarget.id == "first-down"){
            $('#main-body').animate({
                "margin-top" : "-800px"
            }, 800, function(){
                $('#main-body').css({
                    "display" : "none"
                });
                $('#partdeux').css({
                    "margin" : "0px"
                });
                $('.page-option').css({
                    "background-color" : "transparent"
                });
                $('#second-option').css({
                    "background-color" : "#5a54a4"
                });
                $('#partdeux').fadeIn( "medium", function() {});
            });
        }
        else if(e.currentTarget.id == "second-up"){
            $('#partdeux').animate({
                "margin-top" : "800px"
            }, 800, function(){
                console.log("test4");
                $('#partdeux').css({
                    "display" : "none"
                });
                $('#main-body').css({
                    "margin" : "0px"
                });
                $('.page-option').css({
                    "background-color" : "transparent"
                });
                $('#first-option').css({
                    "background-color" : "#5a54a4"
                });
                $('#main-body').fadeIn( "medium", function() {});
            });
        }
        else if(e.currentTarget.id == "second-down"){
            $('#partdeux').animate({
                "margin-top" : "-800px"
            }, 800, function(){
                $('#partdeux').css({
                    "display" : "none"
                });
                $('#parttrois').css({
                    "margin" : "0px"
                });
                $('.page-option').css({
                    "background-color" : "transparent"
                });
                $('#third-option').css({
                    "background-color" : "#5a54a4"
                });
                $('#parttrois').fadeIn( "medium", function() {});
            });
        }
        else if(e.currentTarget.id == "third-up"){
            $('#parttrois').animate({
                "margin-top" : "800px"
            }, 800, function(){
                $('#parttrois').css({
                    "display" : "none"
                });
                $('#partdeux').css({
                    "margin" : "0px"
                });
                $('.page-option').css({
                    "background-color" : "transparent"
                });
                $('#second-option').css({
                    "background-color" : "#5a54a4"
                });
                $('#partdeux').fadeIn( "medium", function() {});
            });
        }
        else{}
    });

    $(".live-option").hover(
        function() {
            var ele = "#" + this.id + "-words";
            $(ele).css('color','rgb(247, 151, 51)');
        },
        function() {
            var ele = "#" + this.id + "-words";
            $(ele).css('color','#fff');
        }
    );
});