'use strict';

/* Human readable date filter */
angular.module('app')
    .filter('humanized', ['moment', function(moment) {
        return function(value) {
            return moment(value).fromNow();
        };
    }]);
