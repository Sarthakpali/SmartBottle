const Sequelize = require("sequelize");
const Register = require("../models/register");
const logger = require("../config/logger");
const sequelize = require("../config/database");
const message = require("../response_message/message");
const bcrypt = require('bcrypt')

/**
 * save register data.
 *
 * @body {createBy} createBy user id of user who are to be registered.
 * @body {number} createBy if any user change data then updateBy id change.
 
 */
exports.postAddRegister = async (req, res, next) => {
  try {
    let { emailID, password, name, mobileNumber, createBy, createByIp } = await req.body;
    name = name.toLowerCase()
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      // Store hash in your password DB.
      try{
        password = hash
        }catch(err){
          if(!err.statusCode){  
            res.status(200)
              .json({status: 401, message: err.message})
        }
      }
    });
    let result = await sequelize.transaction(async (t) => {
      let insert_db_status = await Register.create(
        {
          emailID,
          password,
          name,
          mobileNumber,
          createBy,
          createByIp
        },
        { transaction: t }
      );
      logger.info(`register insert data ${JSON.stringify(req.body)}`);
      res
        .status(200)
        .json({
          status: 200,
          message: message.usermessage.registeradd,
          data: insert_db_status,
        });
      return insert_db_status;
    });
  } catch (err) {
    if (!err.statusCode) {
      res.status(200).json({ status: 401, message: err.message, data: {} });
    }
    next(err);
  }
};

/**
 return all register data
 */

exports.getAllRegisterData = async (req, res, next) => {
  try {
    let = { pages, limit } = await req.body;
    let offset = (pages - 1) * limit;
    let get_data;
    if (pages == "" && limit == "") {
      get_data = await Register.findAll({
        where: { status: true },
        order: [['userID', 'DESC']],
      });
    } else {
      get_data = await Register.findAll({
        where: { status: true },
        order: [['userID', 'DESC']],
        limit: limit,
        offset: offset,
      });
    }
    const total_count = await Register.count({
      where: { status: true },
    });
    res.status(200)
      .json({status: 200, data: get_data, count: total_count})
  } catch (err) {
    if (!err.statusCode) {
      res.status(200).json({ status: 401, message: err.message, data: {} });
    }
    next(err);
  }
};

exports.postCheckName = async(req, res, next) => {
  try{
    let = { name } = await req.body;
    name = name.toLowerCase();
    let data = await Register.findOne({
      where: {
        name: name
      }
    })
    if(data){
      res.status(200)
        .json({status: 200, message: message.usermessage.namenotunique})
    } 
    // else{
    //   res.status(200)
    //     .json({status: 200, message: message.usermessage.nameunique})
    // }
  }catch(err){
    if (!err.statusCode) {
      res.status(200).json({ status: 401, message: err.message, data: {} });
    }
    next(err);
  }
};

exports.postCheckEmail = async (req, res, next) => {
  try {
    let = { email } = await req.body;
    email = email.toLowerCase();
    let data = await Register.findOne({
      where: {
        email: email,
      },
    });
    if (data) {
      res
        .status(200)
        .json({ status: 200, message: message.usermessage.emailnotunique });
     } //else {
    //   res
    //     .status(200)
    //     .json({ status: 200, message: message.usermessage.emailunique });
    // }
  } catch (err) {
    if (!err.statusCode) {
      res.status(200).json({ status: 401, message: err.message, data: {} });
    }
    next(err);
  }
};

exports.postCheckEmail = async (req, res, next) => {
  try {
    let = { mobileNumber } = await req.body;
    let data = await Register.findOne({
      where: {
        mobileNumber: mobileNumber,
      },
    });
    if (data) {
      res
        .status(200)
        .json({ status: 200, message: message.usermessage.mobileNumbernotunique });
    } //else {
    //   res
    //     .status(200)
    //     .json({ status: 200, message: message.usermessage.emailunique });
    // }
  } catch (err) {
    if (!err.statusCode) {
      res.status(200).json({ status: 401, message: err.message, data: {} });
    }
    next(err);
  }
};

/**
 * find data with user id
 *
 * @param {id} userID  to fetch user name, user emailid, user mobilenumber
 */

// exports.getRegisterById = async (req, res, next) => {
//   try {
//     let get_one_data = await RegisterModel.findOne({
//       where: {
//         userID: req.params.id,
//         status: false
//       },
//       include: [{ all: true, nested: true }],
//     });
//     logger.info(
//       `name get by id ${JSON.stringify(
//         req.params.id
//       )} Results into ${JSON.stringify(get_one_data)}`
//     );
//     if (!get_one_data)
//       res
//         .status(200)
//         .json({ status: 200, message: message.usermessage.deletedrecord });
//     res.status(200).json({ status: 200, data: get_one_data });
//   } catch (err) {
//     if (!err.statusCode) {
//       res.status(200).json({ status: 401, message: err.message, data: {} });
//     }
//     next(err);
//   }
// };

/** 
 * update data
 *
 * @param {id} userID  to update id
 */
exports.postUpdateRegister = async (req, res, next) => {
  try {
    let { userID, emailID, password, name, mobileNumber, updateBy, updateByIp } = await req.body;

    let result = await sequelize.transaction(async (t) => {
      let change_data_status = await Register.update(
        {
          emailID,
          password,
          name,
          mobileNumber,
          updateBy,
          updateByIp,
        },
        {
          where: { userID: userID },
          transaction: t,
        }
      );
      logger.info(
        `register Update Data ${JSON.stringify(
          change_data_status
        )} By update By id ${updateBy}`
      );
      res
        .status(200)
        .json({ status: 200, message: message.usermessage.registerupdate });
      return change_data_status;
    });
  } catch (err) {
    if (!err.statusCode) {
      res.status(200).json({ status: 401, message: err.message, data: {} });
    }
    next(err);
  }
};

/**
 * update status
 *
 * @param {id} userID  to update status of register
 */

// exports.poststatuschange = async (req, res, next) => {
//   try {
//     let { userID, status } = await req.body;
//     let delete_status;

//     let result = await sequelize.transaction(async (t) => {
//       if (status == "1") {
//         delete_status = await RegisterModel.update(
//           {
//             status: "1",
//           },
//           {
//             where: { userID: userID, status: ["1", "0"] },
//             transaction: t,
//           }
//         );
//       } else {
//         delete_status = await RegisterModel.update(
//           {
//             status: "0",
//           },
//           {
//             where: { userID: userID, status: ["1", "0"] },
//             transaction: t,
//           }
//         );
//       }

//       if (delete_status != 0) {
//         logger.info(
//           `register Delete by id ${delete_status} Delete By user Id 1`
//         );
//         res
//           .status(200)
//           .json({
//             status: 200,
//             message: message.usermessage.registerdelete,
//             data: {},
//           });
//       } else {
//         res
//           .status(200)
//           .json({
//             status: 200,
//             message: message.usermessage.deletedrecord,
//             data: {},
//           });
//       }
//       return delete_status;
//     });
//   } catch (err) {
//     if (!err.statusCode) {
//       err.statusCode = 200;
//     }
//     next(err);
//   }
// };

/**
 * delete by id
 *
 * @param {id} userID  to delete id
 */
exports.postDeleteRegisterById = async (req, res, next) => {
  try {
    let { userID } = await req.body;
    let result = await sequelize.transaction(async (t) => {
      let delete_status = await Register.update(
        {
          status: false,
        },
        {
          where: { userID: userID },
          transaction: t,
        }
      );
      logger.info(`register Delete by id ${delete_status} Delete By user Id 1`);
      res
        .status(200)
        .json({ status: 200, message: message.usermessage.registerdelete });
      return delete_status;
    });
  } catch (err) {
    if (!err.statusCode) {
      res.status(200).json({ status: 401, message: err.message, data: {} });
    }
    next(err);
  }
};
