'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    UserId: { 
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type : DataTypes.INTEGER 
    },
    FirstName: DataTypes.STRING,
    LastName: DataTypes.STRING,
    Email: { 
      type : DataTypes.STRING,
      unique : true },

    Username: {
      type: DataTypes.STRING,
      unique: true },

    Password: DataTypes.STRING,
    Admin: {
        type : DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue : false
    },
    Deleted: {
      type : DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue : false
  },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
     type: DataTypes.DATE
    }
  }, {});
  users.associate = function(models) {
    // associations can be defined here
  };
  return users;
};