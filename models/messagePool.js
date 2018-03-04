module.exports = function(sequelize, DataTypes) {
	var MessagePool = sequelize.define("MessagePool", {
		created_at: DataTypes.DATE,
		updated_at: DataTypes.DATE
	});
	return MessagePool;
}