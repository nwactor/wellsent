var db = require("../models");
var passport = require("../config/passport");

const Op = db.Op

module.exports = function(app) {

  /////////Check if specific user exits////////
  app.get("/api/user/:username", function(req, res) {
    db.User.findOne({
      where: { username: req.params.username }
    }).then(function(data) {
      res.json(data);
    })
  });

  ///////////Make a New User/////////////
  app.post("/api/signup", function(req, res) {
    db.User.create({
      username: req.body.username, //////////check with front-end///////////
      password: req.body.password //////////check with front-end///////////
    }).then(function() {
      res.redirect("/main");
    }).catch(function(err){
      console.log("SIGNUP ERROR: "+err);
      res.json(err);
    });
  });

  ///////////LOGIN /////////////
  app.post("/api/login", passport.authenticate("local"), function(req,res){
    res.json("/main");
  });

  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        username: req.user.username,
        id: req.user.id
      });
    }
  });  
  
  ///////////Search Users/////////////
  app.get("/api/user/search/:username", function(req, res) {
    db.User.findAll({
      where: {
        username: {
          [Op.like]: '%' + req.params.username
        }
      }
    }).then(function(data) {
      res.json(data);
    })
  });

  ///////////Delete a User/////////////
  app.delete("/api/user/:username", function(req, res) {
    db.User.destroy({
      where: { username: req.params.username }
    }).then(function(data) {
      res.json(data);
    });
  });



}
