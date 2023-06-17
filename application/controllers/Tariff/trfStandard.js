var express = require('express');
var router = express.Router();
var auth = require('../../middlewares/authentication');
const CommonModel = require('../../models/common_model.js');
const TrfModel = require('../../models/trf_model.js');
router.get('/', auth, async function (req, res, next) {
    let loadTrfStandardGroup=await TrfModel.loadTrfStandardGroup(req);
    let itemList=await CommonModel.loadItem(req);
    let unitList=await CommonModel.loadUnit(req);
    let TrfStandardList=await TrfModel.loadTrfStandard(req);
    let trfCodesList=await TrfModel.loadTrfCode(req);
    let methodList=await CommonModel.loadMethod(req);
    let transitList=await CommonModel.loadTransit(req);
    let jobTypeList=await CommonModel.loadJobType(req);
    let jobModeList=await CommonModel.loadJobMode(req);
    let classList=await CommonModel.loadClass(req);
    let serviceList=await CommonModel.loadService(req);
    let cargoTypeList=await CommonModel.loadCargoType(req);
    let invRateList=await CommonModel.loadRate(req);
    //console.error(itemList);
    res.loadContent('tariff/vsTrfStandard', {unitList,itemList,TrfStandardList,loadTrfStandardGroup,trfCodesList,methodList,transitList,jobTypeList,jobModeList,classList,serviceList,cargoTypeList,invRateList});
});


router.post('/get', auth, function (req, res, next) {
    TrfModel.loadTrfStandard(req).then((data)=>{
        res.status(200).json({data});
    }).catch((error)=>{
        res.status(200).json({error});
    });
    
});
router.post('/save', auth, async function (req, res, next) {
    TrfModel.saveTrfStandard(req).then((data)=>{
        res.status(200).json({data});
    }).catch((error)=>{
        console.log(error);
        res.status(200).json({error});
    });
});
router.post('/delete', auth, async function (req, res, next) {
    TrfModel.deleteTrfStandard(req).then((data)=>{
        res.status(200).json({data});
    }).catch((error)=>{
        res.status(200).json({error});
    });
});
module.exports = router;