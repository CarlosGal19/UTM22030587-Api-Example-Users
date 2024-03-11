module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define(
      "user",
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: Sequelize.STRING,
        },
        last_name: {
          type: Sequelize.STRING,
        },
        major: {
          type: Sequelize.STRING,
        },
        created_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        updated_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        deleted_at: {
          type: Sequelize.DATE,
        },
      },
      {
        timestamps: false,
        freezeTableName: true,
        tableName: "user",
      }
    );

    return User;
  };
