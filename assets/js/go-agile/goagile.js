$(window).resize(function() {
    var windowHeight = $(window).height();
    $('#main-body, #partdeux, #parttrois').css({
        'height': windowHeight
    });

    var updateHeight = function(ele, height) {
        ele = '#' + ele;
        var thirdHeight = $(window).height() * 1 / 3;
        var elementOffSet = $(ele).offset().top;
        var totalHeight = thirdHeight + elementOffSet - height;
        var mainContainer = '.marketo-live-guide-option-container-home-next';
        $(ele).find(mainContainer).css({
            'margin-top': height,
            'position': 'absolute',
            'top': totalHeight,
            'left': '0%'
        });
    }
    updateHeight('main-body', '0');
    updateHeight('partdeux', '50');
    updateHeight('parttrois', '50');
});

$(document).ready(function() {
    $('.main-body-options').click(function(){
        x = 0;
        $('.side-bar').css('background-color','transparent');
        $('.side-bar-inner-container').css('display','none');  
    });
    var windowHeight = $(window).height();
    //console.log(windowHeight);
    $('#main-body, #partdeux, #parttrois').css({
        'height': windowHeight
    });
    $("#first-down, #second-up, #second-down, #third-up").click(function(e) {
        if(e.currentTarget.id == "first-down" || e.currentTarget.id == "third-up"){
            $('html, body').animate({
                scrollTop: $("#partdeux").offset().top
            }, 600);
        }
        else if(e.currentTarget.id == "second-up"){
            $('html, body').animate({
                scrollTop: $("#main-body").offset().top
            }, 600);            
        }
        else{
            $('html, body').animate({
                scrollTop: $("#parttrois").offset().top
            }, 600);   
        }
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

    var updateHeight = function(ele) {
        ele = '#' + ele;
        var thirdHeight = $(window).height() * 1 / 3;
        var elementOffSet = $(ele).offset().top;
        var totalHeight = thirdHeight + elementOffSet;
        var mainContainer = '.marketo-live-guide-option-container-home-next';
        $(ele).find(mainContainer).css({
            'margin-top': '0px;',
            'position': 'absolute',
            'top': totalHeight,
            'left': '0%'
        });
    }
    updateHeight('main-body');
    updateHeight('partdeux');
    updateHeight('parttrois');


});