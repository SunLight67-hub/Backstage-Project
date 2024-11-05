module.exports = (sequelize, DataTypes) => {
    const userData = sequelize.define(
      'users',
      {
        userId: {
          field: 'userid',
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        userName: {
          field: 'username',
          type: DataTypes.STRING,
        }
      },
      {
        timestamps: false,
        schema: 'public',
        tableName: 'users',
      },
    );
    return userData;
  };
  