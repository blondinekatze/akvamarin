(function($){
    "use strict";
    $(function() {

        var $container = $('.l-header'),
            $controls = $container.find('[data-show-mobile]');

        $controls.on('click', function (e) {
            e.preventDefault();
            $container.toggleClass('-show-mobile-menu');
        });

    });
})(jQuery);