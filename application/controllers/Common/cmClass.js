var express = require('express');
var router = express.Router();
var auth = require('../../middlewares/authentication');
const CommonModel = require('../../models/common_model.js');
router.get('/', auth, async function (req, res, next) {
    let dataList=await CommonModel.loadClass(req);
    res.loadContent('common/cmClass', {dataList});
});

router.post('/get', auth, function (req, res, next) {
    CommonModel.loadClass(req).then((data)=>{
        res.status(200).json({data});
    }).catch((error)=>{
        res.status(200).json({error});
    });
    
});
router.post('/save', auth, async function (req, res, next) {
    CommonModel.saveClass(req).then((data)=>{
        res.status(200).json({data});
    }).catch((error)=>{
        res.status(200).json({error});
    });
});
router.post('/delete', auth, async function (req, res, next) {
    CommonModel.deleteClass(req).then((data)=>{
        res.status(200).json({data});
    }).catch((error)=>{
        res.status(200).json({error});
    });
});
module.exports = router;