var express = require('express');
var router = express.Router();
var auth = require('../../middlewares/authentication');
const CommonModel = require('../../models/common_model.js');
const TrfModel = require('../../models/trf_model.js');
router.get('/', auth, async function (req, res, next) {
    let dataList=await TrfModel.loadTrfCode(req);
    let unitList=await CommonModel.loadUnit(req);
    //console.error(loadTrfStandardGroup);
    res.loadContent('tariff/trfCodes', {unitList, dataList});
});


router.post('/get', auth, function (req, res, next) {
    TrfModel.loadTrfCode(req).then((data)=>{
        res.status(200).json({data});
    }).catch((error)=>{
        res.status(200).json({error});
    });
    
});
router.post('/save', auth, async function (req, res, next) {
    TrfModel.saveTrfCode(req).then((data)=>{
        res.status(200).json({data});
    }).catch((error)=>{
        console.log(error);
        res.status(200).json({error});
    });
});
router.post('/delete', auth, async function (req, res, next) {
    TrfModel.deleteTrfCode(req).then((data)=>{
        res.status(200).json({data});
    }).catch((error)=>{
        res.status(200).json({error});
    });
});
module.exports = router;