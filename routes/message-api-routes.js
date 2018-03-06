var db = require("../models");

module.exports = function(app) {

  app.get("/api/message", function(req, res) {
    db.Message.findAll({
      where: { MessagePoolId: req.body.poolId } ////////////check with front-end/////////
    }).then(function(data) {
      res.json(data);
    });
  });

  app.post("/api/message", function(req, res) {
    db.Message.create({
      body: req.body.body,
      UserUsername: req.body.sender, ///////////////check with front-end///////////
      MessagePoolId: req.body.poolId ///////////////check with front-end///////////
    }).then(function(data) {
      res.json(data);
    });
  });

  app.delete("/api/message/:id", function(req, res) {
    db.Message.destroy({
      where: { id: req.params.id } ////////////check with front-end/////////
    }).then(function(data) {
      res.json(data);
    });
  });


}