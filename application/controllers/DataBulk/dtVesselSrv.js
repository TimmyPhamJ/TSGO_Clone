var express = require('express');
var router = express.Router();
var auth = require('../../middlewares/authentication');
const DTVesselSrvModel = require('../../models/data_vessel_service_model.js');

router.get('/', auth, async function (req, res, next) {
    let dataDetail = await DTVesselSrvModel.loadDetailSrv(req);
    res.loadContent('DataBulk/dtVesselSrv', { dataDetail });
});

router.post("/getData", auth, async function async(req, res, next) {
    DTVesselSrvModel.loadData(req)
        .then((data) => {
            res.status(200).json({ data });
        })
        .catch((error) => {
            // console.log(error);
            res.status(200).json({ error });
        });
});

router.post("/saveData", auth, async function async(req, res, next) {
    DTVesselSrvModel.saveVesselSrv(req)
        .then((data) => {
            res.status(200).json({ data });
        })
        .catch((error) => {
            // console.log(error);
            res.status(200).json({ error });
        });
});

router.post("/delData", auth, async function async(req, res, next) {
    DTVesselSrvModel.delVesselSrv(req)
        .then((data) => {
            res.status(200).json({ data });
        })
        .catch((error) => {
            // console.log(error);
            res.status(200).json({ error });
        });
});
module.exports = router;