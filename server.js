var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require('method-override');

var PORT = process.env.PORT || 3000;

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

// Set Handlebars.
// var exphbs = require("express-handlebars");

// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/wellSentMessengerController.js");

app.use("/", routes);

// app.listen(PORT);

// var express = require('express');
// var routes = require('./routes');
// var user = require('./routes/user');
// var http = require('http');
// var path = require('path');
var db = require('./models');


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
// app.set('view engine', 'jade');
// app.use(express.favicon());
// app.use(express.logger('dev'));
// app.use(express.bodyParser());
// app.use(express.methodOverride());
app.use(app.router);
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static("public"));

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

// app.get('/', routes.index);
// app.get('/users', user.list);

db.sequelize.sync().then(function() {
  http.createServer(app).listen(PORT, function() {
    console.log('Express server listening on port ' + PORT);
  });
});