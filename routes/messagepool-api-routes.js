var db = require("../models");
var generator = require("../public/assets/js/generator.js");

module.exports = function(app) {

  //get all message pools associated with a user
  app.get("/api/messagePool/:username", function(req, res) {
    db.MessagePool.findAll({
      include: [{ 
        model: db.UserPoolJunction,
        where: { 
          userUsername: req.params.username 
        } 
      }]
    }).then(function(data) {
      res.json(data);
    });
  });

  //get all users associated with a message pool
  app.get("/api/messagePool/:id", function(req, res) {
    db.UserPoolJunction.findAll({
      attributes: ['UserUsername'],
      where: {
        MessagePoolId: req.params.id
      }
    }).then(function(data) {
      res.json(data);
    });
  });

  app.post("/api/messagePool/", function(req, res) {
    db.MessagePool.create({
      key: generator
    }).then(function(data) {
      var poolId = data.id;
      console.log(req.body);
      db.UserPoolJunction.create({
        UserUsername: req.body.username,
        MessagePoolId: poolId,
        receivedKey: true
      }).then(function(data) {
        db.UserPoolJunction.create({
          UserUsername: req.body.receivername,
          MessagePoolId: poolId,
          receivedKey: false
        }).then(function(data) {
          res.json(data);
        });
      });
    });
  });

  //delete a pool by id
  app.delete("/api/messagePool/:id", function(req, res) {
    db.MessagePool.destroy({
      where: { id: req.params.id } ////////////check with front-end/////////
    }).then(function(data) {
      res.json(data);
    });
    //////////it should cascade delete everything in UserPoolJunction////////////
  });

  app.post("/api/messagePool", function(req, res) {
    db.UserPoolJunction.create({
      UserUsername: req.body.username, ////////////check with front-end/////////
      MessagePoolId: req.body.poolId ////////////check with front-end/////////
    }).then(function(data) {
      res.json(data);
    });
  });

  //delete all pools associated with user
  app.delete("/api/messagePool", function(req, res) {
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