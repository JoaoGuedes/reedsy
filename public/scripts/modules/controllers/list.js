'use strict';

angular.module('app')
.controller('ListController', [
    '$scope',
    '_',
    'BooksService',
    'CategoriesService',
    function($scope, _, Books, Categories, Genres) {

        //Once the controller is loaded, scroll to top
        window.scrollTo(0, 0);

        //Variables
        //Used for lazy loading rendering
        $scope.pagination = {
            per_page: 10,
            page: 0
        };
        //Holds selected Category and Genre
        $scope.options = {
            category: null,
            genre: null
        };
        //Lazy load buffered items
        $scope.buffer = [];

        //Buffer draws from this array
        $scope.books = [];

        //Flag when there are no more items to fetch
        $scope.fetchedAll = false;

        //Whenever there's a change to the items, the lazy loader must restart
        function restartLazyLoading() {
            $scope.pagination.page = 0;
            $scope.buffer = [];
            $scope.lazyLoadBooks();
        }

        /* Called whenever the user reaches the bottom of the page
           Loads items from $scope.books array */
        $scope.lazyLoadBooks = function() {
            var start = $scope.pagination.page*$scope.pagination.per_page,
            books = angular.copy($scope.books),
            pushables = books.splice(start, $scope.pagination.per_page);

            $scope.buffer = $scope.buffer.concat(pushables);
            $scope.pagination.page += 1;
            $scope.fetchedAll = ($scope.books.length === $scope.buffer.length && $scope.books.length != 0);
        };

        /* Fetch all categories from API */
        function fetchCategories() {

            return Categories.list()
                .then(function(categories) {
                    $scope.categories = categories.collection;
                })
                .catch(function(error) {
                    $scope.error = error;
                });

        }

        /* Called when category is changed.
           Change book placeholder and copy that array to another buffer.
           That way we can filter by genre without making another API call. */
        $scope.changeCategory = function(name) {

            $scope.searching = true; //Used for spinner

            return Books.getByCategory(name || 'all')
                    .then(function(books) {
                        $scope.books = books.collection;
                        $scope.bookBuffer = angular.copy($scope.books);
                    })
                    .then(filterGenre)
                    .catch(function(error) {
                        $scope.error = error;
                    })
                    .finally(function() {
                        $scope.options.genre = null; //Reset selected genre to avoid problems on filtering
                        restartLazyLoading(); //Change to model, restart lazy loader
                        $scope.searching = false; //loading is complete, hide spinner
                    });

        }

        /* Extract genres from fetched category */
        function filterGenre() {

            $scope.genres = _.chain($scope.books)
                             .pluck('genre.name')
                             .uniq()
                             .value();

        }

        /* called when genre is changed.
           The filtering is done locally as another API call is unnecessary.
           If there's no name, all the category's books are retrived and we don't want to filter anything */
        $scope.changeGenre = function(name) {

            if (name) {
                $scope.books = _.filter($scope.bookBuffer, function(book) {
                    return book.genre.name === name;
                });
            }

            restartLazyLoading(); //Change to model, restart lazy loader

        };

        /* Search book by author or title */
        $scope.search = function(term) {

            //If length < 4, don't do anything
            if ($scope.form.search.$invalid) {
                return;
            }

            //If user has emptied, fetch previous Category and Genre
            if (!term) {
                $scope.changeCategory($scope.options.category);
                $scope.changeGenre($scope.options.genre);
                return;
            }

            $scope.searching = true;

            return Books.search(term)
                    .then(function(books) {
                        $scope.books = books.collection;
                    })
                    .catch(function(error) {
                        $scope.error = error;
                    })
                    .finally(function() {
                        $scope.searching = false;
                        restartLazyLoading();
                    });
        }

        function init() {

            //Hide everything and show spinner
            $scope.loaded = false;

            fetchCategories()
                .then(function() {
                    //Force change on both selects so we can fetch data.
                    $scope.changeCategory($scope.options.category);
                })
                .then(function() {
                    $scope.changeGenre($scope.options.genre);
                })
                .finally(function() {
                    $scope.loaded = true;
                });
        }

        //Entry point
        init();

    }]);
