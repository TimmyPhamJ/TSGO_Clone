var express = require('express');
var router = express.Router();
var auth = require('../../middlewares/authentication');
const CommonModel = require('../../models/common_model.js');
const VesselModel = require('../../models/VesselModel.js');
router.get('/', auth, async function (req, res, next) {
    let vesselList=await VesselModel.loadVesselFull(req);
    let vesselVisitList=await VesselModel.loadVesselVisit(req);
    //let oprList=await VesselModel.loadOpr(req);
    let berthList=await CommonModel.loadBerthList(req);
    let bittList=await CommonModel.loadBitt(req);
    let portList=await CommonModel.loadPort(req);
    let laneList=await VesselModel.loadLane(req);
    //console.error({dataList,oprList,nationList});
    res.loadContent('vessel/vsVesselVisit', {laneList,vesselList,vesselVisitList,berthList,bittList,portList});
});

router.post('/get', auth, function (req, res, next) {
    VesselModel.loadVesselVisit(req).then((data)=>{
        res.status(200).json({data});
    }).catch((error)=>{
        res.status(200).json({error});
    });
    
});
router.post('/save', auth, async function (req, res, next) {
    VesselModel.saveVesselVisit(req).then((data)=>{
        res.status(200).json({data});
    }).catch((error)=>{
        res.status(200).json({error});
    });
});
router.post('/delete', auth, async function (req, res, next) {
    VesselModel.deleteVesselVisit(req).then((data)=>{
        res.status(200).json({data});
    }).catch((error)=>{
        res.status(200).json({error});
    });
});
router.post('/loadLanePort', auth, async function (req, res, next) {
    VesselModel.loadLanePort(req).then((data)=>{
        res.status(200).json({data});
    }).catch((error)=>{
        res.status(200).json({error});
    });
});
module.exports = router;