const { Model, DataTypes, BOOLEAN } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

class Message extends Model {}

Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    senderid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sendername: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    recevierid: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "message",
  }
);

module.exports = Message;
