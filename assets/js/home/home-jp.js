$(document).ready(function() {
    $('#home-main-body-0, #home-main-body-1, #home-main-body-2, .main-logo').click(function() {
        x = 0;
        $('.side-bar').css('background-color', 'transparent');
        $('.side-bar-inner-container').css('display', 'none');
    });
    $('.main-logo').animate({
        'top': '10%'
    }, 600);
    $('.home-page-option-container').animate({
        'margin-bottom': '5%'
    }, 600);
    document.getElementById('home-main-body-jp').style.display = 'block';

    $("second-option").click(function() {
        $("#audience-menu")[0].style.display = "block";
    });
})