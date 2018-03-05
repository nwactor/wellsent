module.exports = function(sequelize, DataTypes) {
	var UserPoolJunction = sequelize.define("UserPoolJunction");

	UserPoolJunction.associate = function(models) {
		models.User.belongsToMany(models.MessagePool, {through: UserPoolJunction});
		models.MessagePool.belongsToMany(models.User, {through: UserPoolJunction});
	}

	return UserPoolJunction;
}