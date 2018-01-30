var express = require("express");
var router = express.Router();
var request = require("request");

var Article = require("../models/Article.js");

router.get("/", function(req, res) {
    res.render("public");
});

router.post("/save", function(req, res){
    let newArticleToSave = new Article(req.body);
    newArticleToSave.save(function(err, doc) {
        if(err) {
            console.log(err);
            res.send("ERROR: "+err);
        } else {
            console.log("Success!");
            res.send("Success!");
        }
    });
});

router.get("/savedarticles", function(req, res) {
    Article.find({}, function(error, doc) {
        if (error) {
            console.log(error);
        } else {
            res.jsonp(doc);
        }
    });
});

router.get("/deletearticle/:id", function(req, res) {
    console.log("ID is getting read for delete" + req.params.id);
    console.log("Able to activate delete function.");
    Article.findOneAndRemove({"_id": req.params.id}, function (err, offer) {
        if (err) {
            console.log("Not able to delete:" + err);
        } else {
            res.send("Success");
            console.log("Deleted!");
        }
    });
});

module.exports = router;