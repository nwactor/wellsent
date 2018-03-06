var db = require("../models");
var passport = require("../config/passport");

const Op = db.Op

module.exports = function(app) {

  /////////Check for specific user exits////////
  app.get("/api/user/:username", function(req, res) {
    db.User.findOne({
      where: { username: req.params.username }
    }).then(function(data) {
      res.json(data);
    })
  });

  ///////////Search User/////////////
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

  ///////////Delete a User/////////////
  app.delete("/api/user/:username", function(req, res) {
    db.User.destroy({
      where: { username: req.params.username }
    }).then(function(data) {
      res.json(data);
    })
  });

  app.get("/api/user/authenticate", function(req, res) {
    db.User.findOne({
      where: {
        username: req.body.username, //////////check with front-end///////////
        password: req.body.password //////////check with front-end///////////
      }.then(function(data) {
        res.json(data);
      })
    })
  })

}
