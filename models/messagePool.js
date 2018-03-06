module.exports = function(sequelize, DataTypes) {
	var MessagePool = sequelize.define("MessagePool");
	return MessagePool;
}