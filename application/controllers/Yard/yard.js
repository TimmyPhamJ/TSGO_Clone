var express = require('express');
var router = express.Router();
var auth = require('../../middlewares/authentication');
const CommonModel = require('../../models/common_model.js');
const VesselModel = require('../../models/VesselModel.js');
const YardModel = require('../../models/YardModel.js');
router.get('/', auth, async function (req, res, next) {
    let loadVesselVisit = await VesselModel.loadVesselVisit(req);
    let loadWorkerGroup = await CommonModel.loadWorkerGroup(req);
    let loadDevice = await CommonModel.loadDevice(req);
    //console.log(loadVesselVisit);
    res.loadOnce('yard/yard', {loadVesselVisit,loadWorkerGroup,loadDevice});
});
router.post('/loadTallyData', auth, async function (req, res, next) {
    YardModel.loadTallyData(req).then((data)=>{
        res.status(200).json({data});
    }).catch((error)=>{
        res.status(200).json({error});
    });
});
router.post('/loadGateData', auth, async function (req, res, next) {
    YardModel.loadGateData(req).then((data)=>{
        res.status(200).json({data});
    }).catch((error)=>{
        res.status(200).json({error});
    });
});
router.post('/loadBlockData', auth, async function (req, res, next) {
    YardModel.loadBlockData(req).then((data)=>{
        res.status(200).json({data});
    }).catch((error)=>{
        res.status(200).json({error});
    });
});
router.post('/loadYardData', auth, async function (req, res, next) {
    YardModel.loadYardData(req).then((data)=>{
        res.status(200).json({data});
    }).catch((error)=>{
        res.status(200).json({error});
    });
});
router.post('/saveYardData', auth, async function (req, res, next) {
    YardModel.saveYardData(req).then((data)=>{
        res.status(200).json({data});
    }).catch((error)=>{
        console.log(error);
        res.status(200).json({error});
    });
});

router.post('/viewHis', auth, async function (req, res, next) {
    YardModel.viewHis(req).then((data)=>{
        res.status(200).json({data});
    }).catch((error)=>{
        console.log(error);
        res.status(200).json({error});
    });
});

module.exports = router;