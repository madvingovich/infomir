;$(document).ready(function() {
    let
        resizeStartValue = 1018, //wrapper width
        slider = $('.slider__items'),
        items = $('.slider__item'),
        sliderItem = $('.slider__item'),
        currentSlide = 1;

    resizeSliderImg();

    $('.slider__btn_next').click(function() {
        currentSlide++;
        if(currentSlide > items.length) {
            currentSlide = 1;
        }
        changeSlide(currentSlide);
    });

    $('.slider__btn_prev').click(function() {
        currentSlide--;
        if(currentSlide < 1) {
            currentSlide = items.length;
        }
        changeSlide(currentSlide);
    });

    $(window).on('resize', function() {
        resizeSliderImg();
    });

    function changeSlide(slide) {
        slider.css('transform','translateX('+ -items.width() * (slide - 1) +'px)');
    }

    //resize slider item to screen width
    function resizeSliderImg() {
        if($(window).width() < resizeStartValue) {
            sliderItem.width($(window).width());
            slider.css('transform','translateX(0)');
        } else {
            sliderItem.width(resizeStartValue);
        }
    }
});