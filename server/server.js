'use strict';

var restify = require('restify'),
    API = require('./api');

var server = restify.createServer({
    name: 'reedsy',
    version: '1.0.0',
    formatters: {
        'text/html': function(req, res, body) { //On text/html request, respond with body
            return body;
        }
    }
});

//Boilerplate stuff
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

//API Handlers
var instance = API.getInstance(); //Return singleton
instance.init(); //Initialize singleton (load JSON)

//Routes

/* BOOKS */
server.get('api/book/list', function (req, res) {
    res.json(instance.getAll());
});

server.get('api/book/search', function(req, res) {
    res.json(instance.searchBooks(req.query.term));
})

server.get('api/book/:id', function(req, res) {
    res.json(instance.getBook(req.params.id));
});

server.get('api/book/:id/similar', function(req, res) {
    res.json(instance.getSimilarBooks(req.params.id));
});

server.get('api/book/category/:name', function (req, res) {
    res.json(instance.getBooksByCategory(req.params.name));
});

/* CATEGORIES */
server.get('api/category/list', function(req, res) {
    res.json(instance.getCategories());
});

//Static file serving
server.get(/\/.*/, restify.serveStatic({
    directory: __dirname + '/../public',
    default: 'index.html'
}));

server.listen(8080, function () {
    console.log('%s server started at %s', server.name, server.url);
});
