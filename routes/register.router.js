const express = require("express");
const registerController = require("../controllers/register.controller");
const router = express.Router();

router.post("/v1/add", registerController.postAddRegister); // save data
router.post("/v1/getalldata", registerController.getAllRegisterData); //get all register data
//router.get("/v1/getbyid/:id", registerController.getRegisterById); //get by id
router.post("/v1/updatebyid", registerController.postUpdateRegister); //update register data
router.post("/v1/deletebyid", registerController.postDeleteRegisterById); //delete by id
router.post('/v1/namecheck', registerController.postCheckName);
//router.post("/v1/statuschanges", registerController.poststatuschange); //status change

module.exports = router;
