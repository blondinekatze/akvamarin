(function ($) {
    "use strict";
    $(function () {

        var $container = $('.l-header'),
            $controls = $container.find('[data-show-sidebar]'),
            menuItems = $container.find('.b-menu__item.-dropdown'),
            allDropdown = $container.find('.b-menu__dropdown');

        if ($(window).width() > 760 && $(window).width() < 1025)  {
            $('.l-header .b-menu__item.-dropdown').on('click', function (e) {
                if(!$(this).hasClass('-open')) {
                    e.preventDefault();
                    menuItems.removeClass('-open');
                    $(this).addClass('-open');
                }
            });
        }

        if ($(window).width() < 761) {
            $('.l-header .b-menu__icon').on('click', function (e) {

                var parentBlock = $(this).closest('.b-menu__item');

                if(!parentBlock.hasClass('-open')) {
                    e.preventDefault();
                    allDropdown.slideUp();
                    menuItems.removeClass('-open');
                    parentBlock.addClass('-open').find('.b-menu__dropdown').stop(1,1).slideDown();
                } else {
                    e.preventDefault();
                    allDropdown.slideUp();
                    menuItems.removeClass('-open');
                }

            });
        }

        $controls.on('click', function (e) {
            e.preventDefault();
            $container.toggleClass('-show-mobile-menu');
            allDropdown.slideUp();
            menuItems.removeClass('-open');

        });
    });
})(jQuery);
