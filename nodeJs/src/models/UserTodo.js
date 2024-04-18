const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class UserTodo extends Model {
        static associate(models) {
            // define association here
           UserTodo.belongsTo(models.user, { foreignKey: 'user_Id', targetKey: 'id' });
        }
    }

    UserTodo.init(
        {
            uuid: DataTypes.UUID,
            todo_text: DataTypes.STRING,
            
        },
        {
            sequelize,
            modelName: 'userTodo',
            underscored: false,
        },
    );
    return UserTodo;
};
