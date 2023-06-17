var express = require('express');
var router = express.Router();
var auth = require('../../middlewares/authentication');
const CommonModel = require('../../models/common_model.js');
const VesselModel = require('../../models/VesselModel.js');
router.get('/', auth, async function (req, res, next) {
    let dataList=await VesselModel.loadVessel(req);
    let oprList=await CommonModel.loadOpr(req);
    let nationList=await CommonModel.loadNational(req);
    //console.error({dataList,oprList,nationList});
    res.loadContent('vessel/vsVessel', {dataList,oprList,nationList});
});

router.post('/get', auth, function (req, res, next) {
    VesselModel.loadVessel(req).then((data)=>{
        res.status(200).json({data});
    }).catch((error)=>{
        res.status(200).json({error});
    });
    
});
router.post('/save', auth, async function (req, res, next) {
    VesselModel.saveVessel(req).then((data)=>{
        res.status(200).json({data});
    }).catch((error)=>{
        res.status(200).json({error});
    });
});
router.post('/save_row', auth, async function (req, res, next) {
    VesselModel.saveRowVessel(req).then((data)=>{
        res.status(200).json({data});
    }).catch((error)=>{
        res.status(200).json({error});
    });
});
router.post('/delete', auth, async function (req, res, next) {
    VesselModel.deleteVessel(req).then((data)=>{
        res.status(200).json({data});
    }).catch((error)=>{
        res.status(200).json({error});
    });
});
module.exports = router;