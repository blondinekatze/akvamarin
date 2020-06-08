(function ($) {
    'use strict';

    $(function () {

        $('.js-tabs').each(function () {
            var $container = $(this),
                $controls = $container.find('[data-tabs-property]'),
                $catalog = $container.find('[data-catalog]'),
            catalogItems = $catalog.find('[data-count]');

            $controls.on('click', function (e) {
                e.preventDefault();
                var index = $(this).data('tabsProperty');
                if (!$(this).hasClass('-active')) {
                    $controls.removeClass('-active');
                    $(this).addClass('-active');

                    if(index) {
                        catalogItems.addClass('-hidden');
                        $catalog.find('[data-count="' + index + '"]').removeClass('-hidden');
                    } else {
                        catalogItems.removeClass('-hidden');
                    }
                }

            });
        });

    });
})(jQuery);


