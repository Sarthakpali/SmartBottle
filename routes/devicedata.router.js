const express = require('express')
const router = express.Router()
const devicedataController = require('../controllers/devicedata.controller')

router.post('/v1/add', devicedataController.postSaveDeviceData);
router.post('/v1/getAll', devicedataController.postGetAllDeviceData);
router.post("/v1/update", devicedataController.postUpdateDeviceData);
router.post("/v1/delete", devicedataController.postDeleteData );

module.exports = router;