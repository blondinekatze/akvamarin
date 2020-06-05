//=require ../../blocks/**/*.js
//=require pages.blocks/**/*.js

(function ($) {
    'use strict';
    $(function () {
        $('.js-fancybox').fancybox();

        $(':text').inputmask();

        new LazyLoad({
            elements_selector: ".lazy"
        });
    });
})(jQuery);