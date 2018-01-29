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

let connectionUrl = (!process.env.PORT) ? 
  "mongodb://localhost/nytreactapp" : 
  "mongodb://newscraper.codingdiva.db:c0dingdiva@ds163806.mlab.com:63806/nytreact"

  var MONGODB_URI = "";
  mongoose.connect(connectionUrl, {
    useMongoClient: true
  });



// var db = mongoose.connection;
app.use("/", router);

// Start the server
app.listen(PORT, function() {
  console.log("App is listening on port " + PORT + "!");
});