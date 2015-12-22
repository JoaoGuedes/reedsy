'use strict';

angular.module('app')
.controller('ViewController', ['$scope', '$stateParams', 'BooksService', function($scope, $stateParams, Books) {

    //Scroll to top when entering page
    window.scrollTo(0, 0);

    //Fetch book passed by route parameter
    function fetchBook() {
        Books.get($stateParams.id)
            .then(function(book) {
                $scope.book = book;
            })
            .catch(function(error) {
                $scope.error = error;
            });
    }

    /*Fetch similar books (equal category and genre)
      At most 3 books are fetched*/    
    function fetchSimilars() {
        Books.getSimilar($stateParams.id)
            .then(function(result) {
                $scope.similars = result.collection;
            })
            .catch(function(error) {
                $scope.error = error;
            });
    }

    fetchBook();
    fetchSimilars();

}]);
