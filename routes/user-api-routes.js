var db = require("../models");

const Op = Sequelize.Op

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
  app.post("/api/user", function(req, res) {
    db.User.create({
      username: req.body.username, //////////check with front-end///////////
      password: req.body.password //////////check with front-end///////////
    }).then(function(data) {
      res.json(data);
    })
  });

  ///////////Make a New User/////////////
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