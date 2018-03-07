module.exports = function(sequelize, DataTypes) {
  var UserPoolJunction = sequelize.define("UserPoolJunction", {
    receivedKey: DataTypes.BOOLEAN
  });

  UserPoolJunction.associate = function(models) {
    models.User.belongsToMany(models.MessagePool, { through: UserPoolJunction });
    models.MessagePool.belongsToMany(models.User, { through: UserPoolJunction });
  }

  return UserPoolJunction;
}