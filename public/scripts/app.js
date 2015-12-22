
angular.module('app', ['ui.router', 'infinite-scroll', 'ngResource'])
    .value('_', _) //Load lodash as dependency to avoid fetching it from the global scope
    .value('moment', moment) //The same for MomentJS
    .config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('list', { //Default route, book list.
                url: '/',
                controller: 'ListController',
                templateUrl: 'scripts/modules/views/list.html'
            })
            .state('view', { //Book view page, has parameter named 'id'
                url: '/book/:id',
                controller: 'ViewController',
                templateUrl: 'scripts/modules/views/view.html'
            });

    });
