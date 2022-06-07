const sequelize = require('../config/database')
const Sequelize = require('sequelize')
const table_name = 'devicemacid'

const DeviceMacId = sequelize.define(
  table_name,
  {
    deviceId: {
      type: Sequelize.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    macId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    deviceName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    status: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
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
        fields: ["deviceId"],
      },
      {
        unique: false,
        fields: ["macId"],
      }
    ]
  }
);

module.exports = DeviceMacId;
