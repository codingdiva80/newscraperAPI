var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var request = require("request");
var cors = require('cors');

var Article = require("./models/Article.js");
var router = require("./controllers/controllers.js");

mongoose.Promise = Promise;

var PORT = process.env.PORT || 3001;

var app = express();
app.use(cors());
var corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://newscraper.codingdiva.com"
  ],
  optionsSuccessStatus: 200
}
app.options('*', cors());
app.use(bodyParser.json());

// Configure middleware
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

mongoose.Promise = Promise;

if(!process.env.PORT){
  var MONGODB_URI = "mongodb://localhost/nytreactapp";
  mongoose.connect(MONGODB_URI, {
    useMongoClient: true
  });
}
else{
  //lets require/import the mongodb native drivers.
  var mongodb = require('mongodb');

  //We need to work with "MongoClient" interface in order to connect to a mongodb server.
  var MongoClient = mongodb.MongoClient;
  var mlabUrl = "mongodb://newscraper.codingdiva.db:c0dingdiva@ds163806.mlab.com:63806/nytreact";
  // Use connect method to connect to the Server
  MongoClient.connect(url, function (err, db) {
  if (err) {
  console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
  console.log('Connection established to', url);

}


// var db = mongoose.connection;
app.use("/", router);

// Start the server
app.listen(PORT, function() {
  console.log("App is listening on port " + PORT + "!");
});