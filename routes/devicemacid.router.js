const express = require('express')
const router = express.Router()
const devicemasteridController = require('../controllers/devicemacid.controller')

router.post('/v1/add', devicemasteridController.postSaveDeviceMacId);
router.post('/v1/getAll', devicemasteridController.postGetAllDeviceMasterId);
router.post("/v1/update", devicemasteridController.postUpdateDeviceMacId);
router.post("/v1/delete", devicemasteridController.postDeleteDeviceMacId);

module.exports = router;