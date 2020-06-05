(function($) {
    'use strict';
    $(function() {
        var baseSelector = '.b-checkbox';

        $(document)
            .on('change', baseSelector + '__control', function() {
                $(this).closest(baseSelector).toggleClass('-checked', $(this).prop('checked'));
            });

    });
})(jQuery);