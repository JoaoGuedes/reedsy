'use strict';

var fs = require('fs'),
    _ = require('lodash');

var API = (function () {

    // Instance stores a reference to the Singleton
    var instance;

    function init() {

        // Singleton
        // Private methods and variables
        var _model;

        //Load JSON into memory
        function _loadJSON(file) {
            _model = JSON.parse(fs.readFileSync(file));
        }

        //Fetch all books
        function getAll() {
            return { collection: _model };
        }

        //Fetch book by id
        function getBook(id) {

            if (!_model) {
                return false;
            }

            return _.find(_model, function(book) {
                return book.id === id;
            });

        }

        //Fetch books by category
        function getBooksByCategory(category) {

            if (!_model) {
                return false;
            }

            //Return all books
            if (category.toLowerCase() === 'all') {
                return getAll();
            }

            var filtered = _.filter(_model, function(book) {
                //Convert to uppercase so there are no equality checking problems
                return book.genre.category.toUpperCase() === category.toUpperCase();
            });

            return { collection: filtered };
        }

        //Fetch similar books
        function getSimilarBooks(id) {

            if (!_model) {
                return false;
            }

            var reference = getBook(id);

            //If category and genre are the same, and id is different, add to array
            var filtered = _.filter(_model, function(book) {
                return book.genre.category === reference.genre.category
                && book.genre.name === reference.genre.name
                && reference.id !== book.id;
            });

            return { collection: _.take(filtered, 3) }; //Return at most 3

        }

        function searchBooks(term) {

            //Abort mission if the model is empty or the search term's length < 4
            if (!_model || term.length < 4) {
                return false;
            }

            //Once again, for equality checking
            term = term.toLowerCase();

            var filtered = _.filter(_model, function(book) {
                return (book.author.name.toLowerCase().indexOf(term) > -1 || book.name.toLowerCase().indexOf(term) > -1);
            });

            return { collection: filtered };
        }

        function getCategories() {

            if (!_model) {
                return false;
            }

            //Pluck categories as it's the only attribute we're interested in
            var categories = _.chain(_model)
                            .pluck('genre.category')
                            .uniq()
                            .value();

            return { collection: categories };
        }

        return {

            init: function() {
                _loadJSON(__dirname + '/books.json');
            },
            // Public methods and variables
            getAll: getAll,
            getBook: getBook,
            getBooksByCategory: getBooksByCategory,
            getSimilarBooks: getSimilarBooks,
            getCategories: getCategories,
            searchBooks: searchBooks,
        };

    };

    return {

        // Get the Singleton instance if one exists
        // or create one if it doesn't
        getInstance: function () {

            if ( !instance ) {
                instance = init();
            }

            return instance;
        }

    };

})();

module.exports = API;
