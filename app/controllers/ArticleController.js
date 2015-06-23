var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var Article = require('../models/article');
 
exports.createArticle = function(req, res, next) {
    var articleModel = new Article();
    articleModel.title = req.params.title;
    articleModel.content = req.params.content;
    articleModel.save(function(err, article) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: 'error occured: ' + err
            });
        } else {
            res.json({
                type: true,
                data: article
            });
        }
    });
}

exports.getArticles = function(req, res, next) {
    Article.find(function(err, articles) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: 'error occured: ' + err
            });
        } else {
            res.json({
                type: true,
                data: articles
            });
        }
    });
}
 
exports.getArticle = function(req, res, next) {
    Article.findById(new ObjectId(req.params.id), function(err, article) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
            if (article) {
                res.json({
                    type: true,
                    data: article
                })
            } else {
                res.json({
                    type: false,
                    data: "Article: " + req.params.id + " not found"
                })
            }
        }
    })
}
 
// exports.updateArticle = function(req, res, next) {
//     console.log('request params');
//     console.log(req.params);
//     console.log('request body');
//     console.log(req.body);
//     console.log('_________________________');
//     var updatedArticleModel = new Article(req.body);
//     Article.findByIdAndUpdate(new ObjectId(req.params.id), updatedArticleModel, function(err, article) {
//         if (err) {
//             res.status(500);
//             res.json({
//                 type: false,
//                 data: "Error occured: " + err
//             })
//         } else {
//             if (article) {
//                 res.json({
//                     type: true,
//                     data: article
//                 })
//             } else {
//                 res.json({
//                     type: false,
//                     data: "Article: " + req.params.id + " not found"
//                 })
//             }
//         }
//     })
// }
 
exports.deleteArticle = function(req, res, next) {
    Article.findByIdAndRemove(new Object(req.params.id), function(err, article) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
            res.json({
                type: true,
                data: "Article: " + req.params.id + " deleted successfully"
            })
        }
    })
}