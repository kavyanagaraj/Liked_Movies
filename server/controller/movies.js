var path = require('path');
var fs = require("fs");
var jsonfile = require('jsonfile')
var file = './api/data.json'

module.exports = {
    show: function(req, res) {
        //Reading the data.json file
        var json_content = jsonfile.readFileSync(file);
        //Send the movie data is it exists else send 404 response
        if(json_content.movies){
            res.json(json_content.movies);
        }
        else{
            res.status(404).send({ error: "Something went wrong"}); 
        } 
    },

    getReview: function(req,res){
        //Reading the data.json file
        var json_content = jsonfile.readFileSync(file);
        var review = json_content.reviews[req.params.id - 1];
        //Send the review data is it exists else send 404 response
        if(review){
            res.json(review)
        }else{
            res.status(404).send({ error: "Something went wrong"}); 
        }
    }

}  