module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: { 
      type: DataTypes.STRING, 
      primaryKey: false  //TODO: remove this line and uncomment the one below, Its giving me sequelize error on my system 
      //primaryKey: true
    },
    password: DataTypes.STRING
  });
  return User;
}
