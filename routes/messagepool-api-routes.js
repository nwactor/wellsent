var db = require("../models");
var generator = require("../public/assets/js/generator.js");

module.exports = function(app) {

  //get all message pools associated with a user
  app.get("/api/messagePool/:username", function(req, res) {
    var data = [];

    db.MessagePool.findAll({
      include: [{ 
        model: db.UserPoolJunction,
        where: {
          userUsername: req.params.username 
        }
      }]
    })
    //also get all of the members in pool
    .then(function(poolData) {
      data.push(poolData);
      db.UserPoolJunction.findAll({
        attributes: ['UserUsername'],
        where: {
          MessagePoolId: poolData.id
        }
      })
      //send all the data back
      .then(function(memberData) {
        data.push(memberData);
        res.json(data);
      });
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
    var data = [];

    //create the pool
    db.MessagePool.create({
      key: generator
    })
    //create the conenction with the sender
    .then(function(poolData) {
      data.push(poolData);
      var poolId = poolData.id;
      db.UserPoolJunction.create({
        UserUsername: req.body.username,
        MessagePoolId: poolId,
        receivedKey: true
      })
      //create the connection with the reciever
      .then(function(senderData) {
        data.push(senderData);
        db.UserPoolJunction.create({
          UserUsername: req.body.receivername,
          MessagePoolId: poolId,
          receivedKey: false
        })
        //send all of the information back to the user
        .then(function(receiverData) {
          data.push(receiverData);
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

};