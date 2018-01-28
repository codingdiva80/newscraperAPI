var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var request = require("request");
var cors = require('cors');
var mongodb = require("mongodb");

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
  var db;

// Connect to the database before starting the application server.
mongoose.connect(process.env.MONGODB_URI, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  });
}


// var db = mongoose.connection;
app.use("/", router);

// Start the server
app.listen(PORT, function() {
  console.log("App is listening on port " + PORT + "!");
});