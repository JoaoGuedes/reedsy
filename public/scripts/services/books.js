'use strict';

angular.module('app')
    .constant('BOOKS_URI', 'api/book')
    .service('BooksService', ['$http', '$resource', 'BOOKS_URI', function($http, $resource, BOOKS_URI) {

        //Mount endpoints for Books on the client side
        function get(id) {
            var endpoint = BOOKS_URI + '/:id',
                Service = $resource(endpoint, { id: '@id' });

                return Service.get({ id: id }).$promise;
        }

        function getSimilar(id) {
            var endpoint = BOOKS_URI + '/:id/similar',
                Service = $resource(endpoint, { id: '@id' });

                return Service.get({ id: id }).$promise;
        }

        function getByCategory(name) {
            var endpoint = BOOKS_URI + '/category/:name',
                Service = $resource(endpoint, { name: '@name' });

                return Service.get({ name: name }).$promise;
        }

        function search(term) {
            var endpoint = BOOKS_URI + '/search',
                Service = $resource(endpoint, { term: '@term' });

                return Service.get({ term: term }).$promise;
        }

        function list() {
            var endpoint = BOOKS_URI + '/list',
                Service = $resource(endpoint);

            return Service.get().$promise;
        }

        return {
            get: get,
            getSimilar: getSimilar,
            getByCategory: getByCategory,
            search: search,
            list: list
        };

    }]);
