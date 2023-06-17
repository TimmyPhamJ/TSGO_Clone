var express = require('express');
var router = express.Router();
var auth = require('../../middlewares/authentication');
const CommonModel = require('../../models/common_model.js');
const VesselModel = require('../../models/VesselModel.js');
router.get('/', auth, async function (req, res, next) {
    let oprList=await CommonModel.loadOpr(req);
    let blockList=await CommonModel.loadBlock(req);
    let vesselList=await VesselModel.loadVesselFull(req);
    let colorAndSeqList=await VesselModel.loadColorAndSeqList(req);
    //console.error({dataList,oprList,nationList});
    res.loadContent('vessel/vsYardPlanning', {oprList,blockList,vesselList,colorAndSeqList});
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
module.exports = router;