var restify = require('restify');

var server = restify.createServer({
    'name': 'le API name',
    'version': '0.1.0'
});

server.use(restify.fullResponse());
server.use(restify.bodyParser());

// DB
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/node-restify-api'); // connect to our database

// CONTROLLERS
var controllers = {};
controllers.article = require('./app/controllers/ArticleController');

// ROUTES
server.post('/api/articles', controllers.article.createArticle);
server.get('/api/articles', controllers.article.getArticles);
server.get('/api/articles/:id', controllers.article.getArticle);
server.put('/api/articles/:id', controllers.article.updateArticle);
server.del('/api/articles/:id', controllers.article.deleteArticle);

// print this out whenever there is any request
server.pre(function (req, res, next) {
    console.log('Something is happening.');
    next();
});

server.get('/api', function(req, res, next) {
    res.send(200, {
        hello: 'world'
    });
    next();
});

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});