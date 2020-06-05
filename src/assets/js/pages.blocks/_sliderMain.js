(function ($) {
    "use strict";

    var Slider = function (options) {

        this.container = $(options.selector);
        this.carousel = this.container.find('[data-carousel]');
        this.autoplay = options.autoplay;
        this.speed = options.speed;
        this.pagination = options.pagination;
        this.init();
    };

    Slider.prototype = {

        init: function () {

            if (this.container.length > 0) {

                var pagination = this.container.find('.swiper-pagination'),
                    navigation = this.container.find('[data-nav]'),
                    navigationPrev = navigation.find('.swiper-nav__prev'),
                    navigationNext = navigation.find('.swiper-nav__next'),
                    countSlide = this.carousel.find('[data-slide]').length;

                if(countSlide > 1) {
                    navigation.removeClass('-disabled');
                }

                var mySwiper = new Swiper(this.carousel, {
                    slidesPerView: 1,
                    loop: true,
                    lazy: true,
                    allowTouchMove: (countSlide > 1),
                    pagination: {
                        el: pagination,
                        clickable: true
                    },
                    autoplay: this.autoplay ?{
                        delay: this.autoplay,
                        disableOnInteraction: false,
                    } : undefined,
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

    window.Neko.SliderMain = Slider;

})(jQuery);