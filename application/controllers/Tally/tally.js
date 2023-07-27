var express = require('express');
var router = express.Router();
var auth = require('../../middlewares/authentication');
const CommonModel = require('../../models/common_model.js');
const VesselModel = require('../../models/VesselModel.js');
const TallyModel = require('../../models/TallyModel.js');
router.get('/', auth, async function (req, res, next) {
    let loadVesselVisit = await VesselModel.loadVesselVisit(req);
    let loadWorkerGroup = await CommonModel.loadWorkerGroup(req);
    let loadDevice = await CommonModel.loadDevice({...req,body:{filter:{DeviceTypeID:{operation:'!=',value:'YT'}}}});
    //console.log(loadDevice);
    res.loadOnce('tally/tally', {loadVesselVisit,loadWorkerGroup,loadDevice});
});
router.post('/loadTallyData', auth, async function (req, res, next) {
    TallyModel.loadTallyData(req).then((data)=>{
        res.status(200).json({data});
    }).catch((error)=>{
        res.status(200).json({error});
    });
});
router.post('/saveTallyData', auth, async function (req, res, next) {
    TallyModel.saveTallyData(req).then((data)=>{
        res.status(200).json({data});
    }).catch((error)=>{
        console.log(error);
        res.status(200).json({error});
    });
});

router.post('/viewHis', auth, async function (req, res, next) {
    TallyModel.viewHis(req).then((data)=>{
        res.status(200).json({data});
    }).catch((error)=>{
        console.log(error);
        res.status(200).json({error});
    });
});
module.exports = router;