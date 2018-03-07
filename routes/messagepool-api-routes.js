var db = require("../models");
var generator = require("../public/assets/js/generator.js");

module.exports = function(app) {

  app.get("/api/messagePool/:username", function(req, res) {
    db.MessagePool.findAll({
      include: [{ model: db.UserPoolJunction, where: { userUsername: req.params.username } }]
    }).then(function(data) {
      res.json(data);
    });
  });

  app.post("/api/messagePool/", function(req, res) {
    db.MessagePool.create({
      key: generator
    }).then(function(data) {
        var poolId = data.id;
        db.UserPoolJunction.create({
          UserUsername: req.body.username, ////////////check with front-end/////////
          MessagePoolId: poolId
        }).then(function(data) {
          db.UserPoolJunction.create({
            UserUsername: req.body.receivername, ////////////check with front-end/////////
            MessagePoolId: poolId
          });
        }).then(function(data) {
          res.json(data);
        })
      });
  });

  app.delete("/api/messagePool/:id", function(req, res) {
    db.MessagePool.destroy({
      where: { id: req.params.id } ////////////check with front-end/////////
    }).then(function(data) {
      res.json(data);
    });
    //////////it should cascade delete everything in UserPoolJunction////////////
  });

  app.post("/api/messagePool/", function(req, res) {
    db.UserPoolJunction.create({
      UserUsername: req.body.username, ////////////check with front-end/////////
      MessagePoolId: req.body.poolId ////////////check with front-end/////////
    }).then(function(data) {
      res.json(data);
    });
  });

  app.delete("/api/messagePool/", function(req, res) {
    db.UserPoolJunction.destroy({
      where: {
        UserUsername: req.body.username, ////////////check with front-end/////////
        MessagePoolId: req.body.poolId ////////////check with front-end/////////
      }
    }).then(function(data) {
      res.json(data);
    });
  });

}