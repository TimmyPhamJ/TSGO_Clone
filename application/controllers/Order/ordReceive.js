var express = require('express');
var router = express.Router();
var auth = require('../../middlewares/authentication');
const CommonModel = require("../../models/common_model");
const VesselModel = require("../../models/VesselModel");
const EirModel = require("../../models/ord_eir_bulk_model");
const Utils = require("../../models/utils_model");
router.get('/', auth, async (req, res, next) => {
    //console.error(loadTrfStandardGroup);
    let items = await CommonModel.loadItem(req).catch(err => console.log(err)) || [];
    let units = await CommonModel.loadUnit(req).catch(err => console.log(err)) || [];
    let transits = await CommonModel.loadTransit(req).catch(err => console.log(err)) || [];

    res.loadContent('order/ordReceive', {
        title: "Lệnh hạ hàng",
        currentTerminal: req.user_info.CurrentTerminalCode,
        items: items,
        units: units,
        transits: transits
    });
});

router.post("/get-payer", auth, async (req, res, next) => {
    CommonModel.loadCustomers(req)
        .then((data) => {
            res.status(200).json({ payers: data });
        })
        .catch((error) => {
            res.status(200).json({ error });
        });
});

router.post("/get-ship", auth, function (req, res, next) {
    VesselModel.loadVesselVisit(req)
        .then((data) => {
            res.status(200).json({ vsls: data });
        })
        .catch((error) => {
            res.status(200).json({ error });
        });
});

router.post("/get-barge", auth, function (req, res, next) {
    req.body.VesselType = "2";
    VesselModel.loadVesselVisit(req)
        .then((data) => {
            res.status(200).json({ barges: data });
        })
        .catch((error) => {
            res.status(200).json({ error });
        });
});

router.post("/get-lane", auth, function (req, res, next) {
    Utils.getLanePort(req)
        .then((data) => {
            res.status(200).json({ data });
        })
        .catch((error) => {
            res.status(200).json({ error });
        });
});

router.post("/save", auth, function (req, res, next) {
    EirModel.saveEirBulk(req)
        .then((data) => {
            res.status(200).json({ data });
        })
        .catch((error) => {
            console.log(error);
            res.status(200).json({ error });
        });
});

module.exports = router;