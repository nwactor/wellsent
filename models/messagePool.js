module.exports = function(sequelize, DataTypes) {
	var MessagePool = sequelize.define("MessagePool", {
		key: DataTypes.STRING
	});
	return MessagePool;
}