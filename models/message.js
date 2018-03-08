module.exports = function(sequelize, DataTypes) {
	var Message = sequelize.define("Message", {
		body: DataTypes.STRING.BINARY
	});
	
	Message.associate = function(models) {
		Message.belongsTo(models.User, {
			foreignKey: {
				allowNull: false
			}
		});
		Message.belongsTo(models.MessagePool, {
			foreignKey: {
				allowNull: false
			}
		});
	}

	return Message;
}
