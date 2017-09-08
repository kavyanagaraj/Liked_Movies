// Change controller file name if it is changed and same with the routes as well
var movies = require('../controller/movies.js')
var path = require('path');

module.exports = function(app){
  app.get('/movies', function(req, res){
    movies.show(req,res);
  });

  app.get('/review/:id', function(req, res){
    movies.getReview(req,res);
  });

  app.all("*", function(req,res){
    res.sendFile(path.resolve("./public/dist/index.html"));
  });
};
