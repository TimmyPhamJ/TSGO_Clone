var express = require('express');
var router = express.Router();
var auth = require('../../middlewares/authentication');
const CommonModel = require('../../models/common_model.js');
const VesselModel = require('../../models/VesselModel.js');
const YardModel = require('../../models/YardModel.js');
router.get('/', auth, async function (req, res, next) {
    //console.error({dataList,oprList,nationList});
    let items = await CommonModel.loadItem(req);
    let CargoTypes = await CommonModel.loadCargoType(req);
    let Ports = await CommonModel.loadPort(req);
    res.loadContent('planning/YardPlanning', {items,CargoTypes,Ports});
});

router.post('/cancelPlan', auth, async function (req, res, next) {
    YardModel.cancelPlan(req).then((data)=>{
        res.status(200).json({data});
    }).catch((error)=>{
        console.error(error);
        res.status(200).json({error});
    });
});

router.post('/deletePlanBook', auth, async function (req, res, next) {
    YardModel.deletePlanBook(req).then((data)=>{
        res.status(200).json({data});
    }).catch((error)=>{
        console.error(error);
        res.status(200).json({error});
    });
});
router.post('/setPlan', auth, async function (req, res, next) {
    YardModel.setPlan(req).then((data)=>{
        res.status(200).json({data});
    }).catch((error)=>{
        console.error(error);
        res.status(200).json({error});
    });
});

router.post('/savePlanBook', auth, async function (req, res, next) {
    YardModel.savePlanBook(req).then((data)=>{
        res.status(200).json({data});
    }).catch((error)=>{
        console.error(error);
        res.status(200).json({error});
    });
});
router.post('/loadBlockPlanning', auth, async function (req, res, next) {
    YardModel.loadBlockPlanning(req).then((data)=>{
        res.status(200).json({data});
    }).catch((error)=>{
        console.error(error);
        res.status(200).json({error});
    });
});

router.post('/loadMNFData', auth, async function (req, res, next) {
    YardModel.loadMNFData(req).then((data)=>{
        res.status(200).json({data});
    }).catch((error)=>{
        res.status(200).json({error});
    });
});
router.post('/loadVesselVisit', auth, function (req, res, next) {
    VesselModel.loadVesselVisit(req).then((data)=>{
        res.status(200).json({data});
    }).catch((error)=>{
        res.status(200).json({error});
    });
});
router.post('/loadColorAndSeqList', auth, function (req, res, next) {
    VesselModel.loadColorAndSeqList(req).then((data)=>{
        res.status(200).json({data});
    }).catch((error)=>{
        res.status(200).json({error});
    });
    
});

router.post('/get', auth, function (req, res, next) {
    VesselModel.loadYardPlanning(req).then((data)=>{
        res.status(200).json({data});
    }).catch((error)=>{
        res.status(200).json({error});
    });
    
});
router.post('/save', auth, async function (req, res, next) {
    VesselModel.saveYardPlanning(req).then((data)=>{
        res.status(200).json({data});
    }).catch((error)=>{
        res.status(200).json({error});
    });
});
router.post('/delete', auth, async function (req, res, next) {
    VesselModel.deleteYardPlanning(req).then((data)=>{
        res.status(200).json({data});
    }).catch((error)=>{
        res.status(200).json({error});
    });
});
router.post("/loadPayer", auth, async (req, res, next) => {
    CommonModel.loadCustomers(req)
        .then((data) => {
            res.status(200).json({ payers: data });
        })
        .catch((error) => {
            res.status(200).json({ error });
        });
});
module.exports = router;