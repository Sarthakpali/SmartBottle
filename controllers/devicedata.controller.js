const Sequelize = require('sequelize')
const sequelize = require("../config/database");
const DeviceData = require('../models/deviceData')
const message = require('../response_message/message')
const logger = require('../config/logger')

exports.postSaveDeviceData = async(req, res, next) => {
    try {
        let = {
            deviceId,
            device_data,
            date,
            time
        } = await req.body;
        let insert_data
        await sequelize.transaction(async(t) => {
            insert_data = await DeviceData.create(
              {
                deviceId,
                device_data,
                date,
                time
              },
              { transaction: t }
            );
            logger.info(`Device data ${JSON.stringify(insert_data)} saved`)
            res.status(200)
                .json({status: 200, message: message.usermessage.devicedataadd, data: insert_data})
        })
        
    } catch (err) {
        if(!err.statusCode){
            res.status(200)
                .json({status: 401, message: err.message})
        }next(err)
    }
};

exports.postGetAllDeviceData = async(req, res, next) => {
    try {
      let = { pages, limit } = await req.body;
      let offset = (pages-1)*limit;
      let get_data
      if(pages == "" && limit == ""){
        get_data = await  DeviceData.findAll({
            where: {status: true},
            order: [['dataId', 'DESC']]
        })
      }
      else{
          get_data = await  DeviceData.findAll({
            where: { status: true },
            order: [["dataId", "DESC"]],
            limit: limit,
            offset: offset,
          });
      }
      const total_count = await  DeviceData.count({
        where: { status: true },
      });
      logger.info(`Getting all device data ${JSON.stringify(get_data)}`)
      res.status(200)
        .json({status: 200, data: get_data, count: total_count})
    } catch (err) {
      if (!err.statusCode) {
        res.status(200).json({ status: 401, message: err.message });
      }next(err)
    }
};

exports.postUpdateDeviceData = async(req, res, next) => {
    try {
      let = {
        dataId,
        deviceId,
        device_data,
        date,
        time
      } = await req.body;
      let update_status
      await sequelize.transaction(async(t) => {
        update_status = await DeviceData.update({
            dataId,
            deviceId,
            device_data,
            date,
            time
        }, {
          where: {dataId: dataId},
          transaction: t
        });
        logger.info(`DeviceId data ${JSON.stringify(update_status)} updated by id ${device}`)
        if(update_status == 0){
          res.status(200)
            .json({status: 200, message: message.usermessage.devicedatanotfound})
        }
        res.status(200)
            .json({status: 200, message: message.usermessage.devicedatadupdated})
      })
    }catch(err){
      if (!err.statusCode) {
        res.status(200).json({ status: 401, message: err.message });
      }
      next(err);
    }
};

exports.postDeleteData = async(req, res, next) => {
  try{
    let = {
      dataId
    } = await req.body;
    let delete_status
    await sequelize.transaction(async(t) => {
      delete_status = await DeviceData.update({
        status: false
      }, {
        where: {dataId:dataId},
        transaction: t
      })
    })
    logger.info(`Device data deleted successfully by id ${dataId}`)
    res.status(200)
      .json({status: 200, message: message.usermessage.devicedatadeleted})
  }
  catch(err){
      if (!err.statusCode) {
        res.status(200).json({ status: 401, message: err.message });
      }
      next(err);
    }
};