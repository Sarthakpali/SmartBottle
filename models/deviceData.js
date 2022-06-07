const sequelize = require('../config/database')
const Sequelize = require('sequelize')
const deviceMacId = require('./deviceMacId');

const table_name="devicedata"
const DeviceData=sequelize.define(
    table_name,
     {
        dataId:{
            type:Sequelize.BIGINT,
            allowNull:false,
            primaryKey:true,
            autoIncrement: true,
        },
        deviceId:{
            type: Sequelize.BIGINT,
            allowNull: false,
        },
        device_data:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        date:{
            type: Sequelize.DATE,
            allowNull: false,
        },
        time:{
            type: Sequelize.TIME,
            allowNull: false,
        } 
     } 
);
DeviceData.belongsTo(deviceMacId, { foreignKey: { name: "deviceId" } });

module.exports = DeviceData;