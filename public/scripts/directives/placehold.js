'use strict'

/* This directive is used to show the 'Loading...' placeholder image
    while the original image is being loaded into the DOM */
angular.module('app')
    .directive('placehold', function() {
        return {
            restrict: 'A',
            scope: {
                imgSrc: '='
            },
            link: function(scope, element, attrs) {
                //Once element is loaded, switch 'src' attr and unbind event
                element.on('load', function() {
                    element.attr('src', scope.imgSrc);
                    element.unbind('load');
                });
            }
        }
    });
