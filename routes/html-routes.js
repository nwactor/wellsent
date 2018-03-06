var path = require("path");
var isAuthenticated = require("../config/middleware/isAuthenticated");

// Routes
// =============================================================
module.exports = function(app) {

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/login.html"));
  });


  app.get("/main", function(req, res) {
    if(req.user){
      res.redirect("/main");
    }
    res.sendFile(path.join(__dirname, "../views/login.html"));
  });

  app.get("/signup", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/signup.html"));
  });

  app.get("/logout", function(req,res){
    res.redirect("/");
  });

  //To trap those users that arent logged in trying to access this page
  app.get("/main", isAuthenticated, function(req, res){
    res.sendFile(path.join(__dirname,"../views/main.html"));
  });

};
