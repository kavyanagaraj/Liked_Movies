var path = require('path');
var fs = require("fs");
var jsonfile = require('jsonfile')
var file = './api/data.json'

module.exports = {
    show: function(req, res) {
        //Reading the data.json file
        var jsonContent = jsonfile.readFileSync(file);
        //Send the movie data is it exists else send 404 response
        if(jsonContent.movies){
            res.json(jsonContent.movies);
        }
        else{
            res.status(404).send({ error: "Something went wrong"}); 
        } 
    },

    getReview: function(req,res){
        //Reading the data.json file
        var jsonContent = jsonfile.readFileSync(file);
        var review = jsonContent.reviews[req.params.id - 1];
        //Send the review data is it exists else send 404 response
        if(review){
            res.json(review)
        }else{
            res.status(404).send({ error: "Something went wrong"}); 
        }
    }

}  