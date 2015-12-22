'use strict';

angular.module('app')
    .directive('book', function() {
        return {
            restrict: 'E',
            scope: {
                ngModel: '='
            },
            link: function(scope, element, attrs) {

                /* The provided JSON database uses the same URL for all book covers
                   As browsers cache requested URLs, i'm generating a random one each time */
                scope.ngModel.cover += '?' + Math.random();
            },
            templateUrl: 'scripts/directives/book.html'
        }
    });
