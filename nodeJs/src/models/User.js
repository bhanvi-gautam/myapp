const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            // define association here
           User.hasMany(models.userTodo, { foreignKey: 'user_Id', targetKey: 'id' });
        }
    }

    User.init(
        {
            uuid: DataTypes.UUID,
            first_name: DataTypes.STRING,
            last_name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            username: DataTypes.STRING,
            email_verified: DataTypes.INTEGER,
            phone_number: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'user',
            underscored: false,
        },
    );
    return User;
};
