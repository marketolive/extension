var HEAP_ANALYTICS_SCRIPT_LOCATION = "https://marketolive.com/assets/js/global/heap-analytics.js",
loadScript;

/**************************************************************************************
 *
 *  This function loads the given script source.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {String} scriptSrc - The URL of the desired script.
 *
 **************************************************************************************/

loadScript = function (scriptSrc) {
    console.log("Loading: Script: " + scriptSrc);
    
    var scriptElement = document.createElement("script");
    scriptElement.async = true;
    scriptElement.src = scriptSrc;
    document.getElementsByTagName("head")[0].appendChild(scriptElement);
};

/**************************************************************************************
 *
 *  Main
 *
 **************************************************************************************/

$(document).ready(function() {
    var x = 0;
    $("#help-link, #sidebar-help").click(function() {
        $('.help-center-box').animate({
            'margin-top': '125px',
        }, 400, function() {});
        $('.help-cover').css('display', 'block');
        $('.help-center-container').css('display', 'block');
    });

    $("#second-option").click(function() {
        $("#audience-menu").css("display", "block");
    });

    $('.cancel-help').click(function() {
        $('.help-cover').css('display', 'none');
        $('.help-center-container').css('display', 'none');
    });

    $('.marketo-ball').click(function() {
        if (x == 0) {
            x = 1;
            $('.side-bar').css({
                'background-color': '#fff',
                'z-index': '999'
            });
            $('.side-bar-inner-container').fadeIn("slow");
        } else {
            x = 0;
            $('.side-bar').css({
                'background-color': 'transparent',
                'z-index': '-999'
            });
            $('.side-bar-inner-container').css('display', 'none');
        }
    });
    
    loadScript(HEAP_ANALYTICS_SCRIPT_LOCATION);
});