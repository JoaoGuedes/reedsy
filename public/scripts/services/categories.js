'use strict';

angular.module('app')
    .constant('CATEGORIES_URI', 'api/category')
    .service('CategoriesService', ['$http', '$resource', 'CATEGORIES_URI', function($http, $resource, CATEGORIES_URI) {

        //Mount endpoints for Categories on the client side
        function list() {
            var endpoint = CATEGORIES_URI + '/list',
                Service = $resource(endpoint);

            return Service.get().$promise;
        }

        return {
            list: list
        };

    }]);
