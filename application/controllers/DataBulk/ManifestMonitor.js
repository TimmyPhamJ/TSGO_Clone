var express = require('express');
var router = express.Router();
var auth = require('../../middlewares/authentication');
const BulkModel = require('../../models/data_bulk_model.js');
const CommonModel = require('../../models/common_model.js');
const VesselModel = require('../../models/VesselModel.js');
router.get('/', auth, async function (req, res, next) {
    let dataList=[];//await BulkModel.loadUserGroup(req);
    let jobModeList=await CommonModel.loadJobMode(req);
    let classList=await CommonModel.loadClass(req);
    let methodList=await CommonModel.loadMethod(req);
    let unitList=await CommonModel.loadUnit(req);
    let itemList=await CommonModel.loadItem(req);
    let customerList=await CommonModel.loadCustomers(req);
    let customerTypeList=await CommonModel.loadCustomerType(req);
    let transitList=await CommonModel.loadTransit(req);
    res.loadContent('DataBulk/ManifestMonitor', {dataList,jobModeList,classList,methodList,unitList,itemList,customerList,customerTypeList,transitList});
});

router.post('/loadVesselVisit', auth, function (req, res, next) {
    VesselModel.loadVesselVisit(req).then((data)=>{
        res.status(200).json({data});
    }).catch((error)=>{
        res.status(200).json({error});
    });
    
});

router.post('/setStatus', auth, function (req, res, next) {
    BulkModel.setStatus(req).then((data)=>{
        res.status(200).json({data});
    }).catch((error)=>{
        console.log(error);
        res.status(200).json({deny:error});
    });
    
});

router.post('/editTally', auth, function (req, res, next) {
    BulkModel.editTally(req).then((data)=>{
        res.status(200).json({data});
    }).catch((error)=>{
        console.log(error);
        res.status(200).json({deny:error});
    });
    
});

router.post('/loadTallyJob', auth, function (req, res, next) {
    BulkModel.loadTallyJob(req).then((data)=>{
        res.status(200).json({data});
    }).catch((error)=>{
        console.log(error);
        res.status(200).json({error});
    });
    
});
router.post('/get', auth, function (req, res, next) {
    BulkModel.loadBulkManifestFullName(req).then((data)=>{
        res.status(200).json({data});
    }).catch((error)=>{
        console.log(error);
        res.status(200).json({error});
    });
    
});
router.post('/save', auth, async function (req, res, next) {
    BulkModel.saveBulkManifest(req).then((data)=>{
        res.status(200).json({data});
    }).catch((error)=>{
        res.status(200).json({error});
    });
});
router.post('/delete', auth, async function (req, res, next) {
    BulkModel.deleteBulkManifest(req).then((data)=>{
        res.status(200).json({data});
    }).catch((error)=>{
        res.status(200).json({error});
    });
});
module.exports = router;