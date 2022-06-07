const sequelize  = require('../config/database')
const logger = require('../config/logger')
const Sequelize = require('sequelize')
const Register = require('../models/register')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const message = require('../response_message/message')

exports.login = async(req, res, next) => {
    try{
        let = {name, password} = await req.body;
        let check
        let user = await Register.findOne({
            where: {
                name, 
            }
        })
        if(!user){
            res.status(200)
                .json({status: 200, message: message.usermessage.usernotfound})
        }
        // bcrypt.compare(password, user.password, async (err, result) => {
        //      check = result    
        //     // result == true
        // });
        let result = bcrypt.compare(password, user.password);
        check = result
        console.log(check)
        if(!check){
            res.status(200)
                .json({status: 200, message: message.usermessage.wrongpassword})
        }

        if(check && user){
           const token = await jwt.sign({ user }, process.env.SECRETKEY)
           res.json({token: token})
        }
        
    }catch(err){
        if(!err.statusCode){
            res.status(200)
                .json({status: 401, message: err.message})
        }next(err)
    }
}

exports.postTest = (req, res) => {
    res.status(200)
        .json({message: 'token verified'})
}