const Sequelize = require('sequelize')
const sequelize = require("../config/database");
const DeviceMacId = require('../models/deviceMacId')
const message = require('../response_message/message')
const logger = require('../config/logger')

exports.postSaveDeviceMacId = async(req, res, next) => {
    try {
        let = {
            macId,
            deviceName,
            createBy,
            createByIp
        } = await req.body;
        let insert_data
        await sequelize.transaction(async(t) => {
            insert_data = await DeviceMacId.create(
              {
                macId,
                deviceName,
                createBy,
                createByIp,
              },
              { transaction: t }
            );
            logger.info(`Device Mac Id data ${JSON.stringify(insert_data)} saved`)
            res.status(200)
                .json({status: 200, message: message.usermessage.devicemasteridadd, data: insert_data})
        })
        
    } catch (err) {
        if(!err.statusCode){
            res.status(200)
                .json({status: 401, message: err.message})
        }next(err)
    }
};

exports.postGetAllDeviceMasterId = async(req, res, next) => {
    try {
      let = { pages, limit } = await req.body;
      let offset = (pages-1)*limit;
      let get_data
      if(pages == "" && limit == ""){
        get_data = await DeviceMacId.findAll({
            where: {status: true},
            order: [['deviceId', 'DESC']]
        })
      }
      else{
          get_data = await DeviceMacId.findAll({
            where: { status: true },
            order: [["deviceId", "DESC"]],
            limit: limit,
            offset: offset,
          });
      }
      const total_count = await DeviceMacId.count({
        where: { status: true },
      });
      logger.info(`Getting all device master id ${JSON.stringify(get_data)}`)
      res.status(200)
        .json({status: 200, data: get_data, count: total_count})
    } catch (err) {
      if (!err.statusCode) {
        res.status(200).json({ status: 401, message: err.message });
      }next(err)
    }
};

exports.postUpdateDeviceMacId = async(req, res, next) => {
    try {
      let = {
        deviceId,
        macId,
        deviceName,
        updateBy,
        updateByIp
      } = await req.body;
      let update_status
      await sequelize.transaction(async(t) => {
        update_status = await DeviceMacId.update({
          macId,
          deviceName,
          updateBy,
          updateByIp
        }, {
          where: {deviceId: deviceId},
          transaction: t
        });
        logger.info(`Device Mac Id data ${JSON.stringify(update_status)} updated by id ${device}`)
        if(update_status == 0){
          res.status(200)
            .json({status: 200, message: message.usermessage.devicemacidnotfound})
        }
        res.status(200)
            .json({status: 200, message: message.usermessage.devicemacidupdated})
      })
    }catch(err){
      if (!err.statusCode) {
        res.status(200).json({ status: 401, message: err.message });
      }
      next(err);
    }
};

exports.postDeleteDeviceMacId = async(req, res, next) => {
  try{
    let = {
      deviceId
    } = await req.body;
    let delete_status
    await sequelize.transaction(async(t) => {
      delete_status = await DeviceMacId.update({
        status: false
      }, {
        where: {deviceId:deviceId},
        transaction: t
      })
    })
    logger.info(`Device Mac Id data deleted successfully by id ${deviceId}`)
    res.status(200)
      .json({status: 200, message: message.usermessage.devicemaciddeleted})
  }
  catch(err){
      if (!err.statusCode) {
        res.status(200).json({ status: 401, message: err.message });
      }
      next(err);
    }
};