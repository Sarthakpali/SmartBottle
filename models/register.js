const Sequelize = require("sequelize");
const sequelize = require("../config/database");
const table_name = "register";
const Register = sequelize.define(
  table_name,
  {
    userID: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    emailID: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    mobileNumber: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    status: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    createBy: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    updateBy: {
      type: Sequelize.BIGINT,
      allowNull: true,
    },
    createByIp: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    updateByIp: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  {
    indexes: [
      {
        unique: false,
        fields: ["userID"],
      },

      {
        unique: false,
        fields: ["name"],
      },
    ],
  }
);

module.exports = Register;
