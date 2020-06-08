(function ($) {
    'use strict';
    $(function () {
        var headerHeight = $('.l-header').outerHeight(true);

        $('.js-scroll-to').on('click', function (e) {
            e.preventDefault();
            var id  = $(this).attr('href');
            var scroll = $(id).offset().top - headerHeight;
            $('body,html').stop(1,1).animate({scrollTop: scroll}, 1000);
        });
    });
})(jQuery);

