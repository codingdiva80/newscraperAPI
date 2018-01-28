var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var request = require("request");

var Article = require("./models/Article.js");
var router = require("./controllers/controllers.js");

mongoose.Promise = Promise;

var PORT = process.env.PORT || 3001;
console.log(process.env.PORT);

var app = express();
var mongodbLogin = "mongodb://newscraper.codingdiva.db:c0dingdiv\@@ds163806.mlab.com:63806/nytreact";

// Configure middleware
app.use(bodyParser.urlencoded({ extended: false }));
console.log(__dirname + '/nytimes-react-app/public');
app.use(express.static(__dirname + '/nytimes-react-app/public'));

mongoose.Promise = Promise;
var MONGODB_URI = mongodbLogin || "mongodb://localhost/nytreactapp";
// mongoose.connect(MONGODB_URI, {
//   useMongoClient: true
// });

// var db = mongoose.connection;
app.use("/", router);

// Start the server
app.listen(PORT, function() {
  console.log("App is listening on port " + PORT + "!");
});
