(function ($) {
    "use strict";

    var Slider = function (options) {

        this.container = $(options.selector);
        this.carousel = this.container.find('[data-carousel]');
        this.init();
    };

    Slider.prototype = {

        init: function () {

            if (this.container.length > 0) {

                var navigation = this.container.find('[data-nav]'),
                    navigationPrev = navigation.find('.swiper-nav__prev'),
                    navigationNext = navigation.find('.swiper-nav__next'),
                    countSlide = this.carousel.find('[data-slide]').length;

                if(countSlide > 1) {
                    navigation.removeClass('-disabled');
                }

                new Swiper(this.carousel, {
                    slidesPerView: 1,
                    loop: true,
                    lazy: true,
                    allowTouchMove: (countSlide > 1),
                    navigation: {
                        nextEl: navigationNext,
                        prevEl: navigationPrev,
                    }
                });
            }
        }
    };

    if (typeof window.Neko === 'undefined') {
        window.Neko = {};
    }

    window.Neko.SliderCardGallery = Slider;

})(jQuery);