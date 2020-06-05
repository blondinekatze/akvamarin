(function ($) {
    "use strict";

    var Map = function (options) {
        this.options = typeof options === 'object' ? options : {};
        this.init();
    };

    Map.prototype = {
        init: function () {
            var self = this;
            ymaps.ready(function () {
                self.myMap = new ymaps.Map(self.options.idMap, {
                    center: self.options.centerMap,
                    zoom: self.options.zoom,
                    controls: ['zoomControl']
                }, {
                    searchControlProvider: 'yandex#search'
                });
                self.myMap.behaviors.disable('scrollZoom');

                if (self.options.disableDrag === true) {
                    self.myMap.behaviors.disable('drag');
                }

                if (typeof self.options.items === 'object') {
                    self.options.items.forEach(function (item) {
                        self.addPlacemark(item);
                    });
                }

                if (typeof self.options.balloon === 'object') {
                    self.options.balloon.forEach(function (balloon) {
                        self.addBalloon(balloon);
                    });
                }
                if (typeof self.options.routes === 'object') {
                    self.options.routes.forEach(function (route) {
                        self.addRoute(route);
                    });
                }

                if (typeof self.options.polygon === 'object') {
                    self.addPolygon(self.options.polygon);
                }
            });
        },
        addPlacemark: function (item) {
            var placemark = new ymaps.Placemark(
                [item.point.lat, item.point.lon],
                {
                    balloonContentBody: item.iconContent
                },
                {
                    iconLayout: 'default#image',
                    iconImageHref: item.url,
                    iconImageSize: item.iconSize,
                    iconImageOffset: item.iconOffset
                }
            );

            this.myMap.geoObjects.add(placemark);

        },

        addRoute: function (route) {
            var multiRoute = new ymaps.multiRouter.MultiRoute({
                referencePoints: route.points,
                params: {
                    results: 1
                }
            }, {
                editorDrawOver: false,
                wayPointDraggable: true,
                viaPointDraggable: true,
                routeStrokeColor: route.strokeWidth,
                routeActiveStrokeColor: route.activeStrokeColor,
                pinIconFillColor: route.iconFillColor,
                boundsAutoApply: true,
                zoomMargin: 30
            });
            this.myMap.geoObjects.add(multiRoute);
        },

        addBalloon: function (balloon) {
            var balloonMap = new ymaps.Placemark(
                [balloon.point.lat, balloon.point.lon],
                {
                    balloonContentBody: balloon.iconContent
                },
                {
                    iconLayout: 'default#image',
                    iconImageHref: balloon.url,
                    iconImageSize: balloon.iconSize,
                    iconImageOffset: balloon.iconOffset
                }
            );

            this.myMap.geoObjects.add(balloonMap);
        },

        addPolygon: function (polygon) {
            var polygonTemplate = new ymaps.GeoObject({
                geometry: {
                    type: "Polygon",
                    coordinates: [
                        polygon.coordinates
                    ],
                    fillRule: "nonZero"
                },
                properties: {
                    balloonContent: "Многоугольник"
                }
            }, {
                fillColor: polygon.fill,
                strokeColor: polygon.strokeColor,
                opacity: 1,
                strokeWidth: polygon.strokeWidth,
                strokeStyle: 'solid'
            });

            this.myMap.geoObjects.add(polygonTemplate);
        },

        getTemplateBalloon: function () {
            if (typeof this.options.templateBalloon !== 'undefined' && this.options.templateBalloon !== '') {
                return this.options.templateBalloon;
            }
            return '<div class="b-map-balloon"><div class="b-map-balloon__icon"></div><div class="b-map-balloon__txt" data-balloon-name></div></div>';
        },
        getBalloonLayout: function (name) {
            if (typeof name === 'undefined') {
                name = '';
            }

            var $nameBalloon = $('<div>' + this.getTemplateBalloon() + '</div>');

            if ($nameBalloon.find('[data-balloon-name]').length > 0) {
                $nameBalloon.find('[data-balloon-name]').html(name);
            }
            return $nameBalloon.html();
        }

    };


    if (typeof window.Neko === 'undefined') {
        window.Neko = {};
    }

    window.Neko.MapYandex = Map;

})(jQuery);