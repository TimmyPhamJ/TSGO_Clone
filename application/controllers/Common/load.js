var express = require('express');
var router = express.Router();
var auth = require('../../middlewares/authentication');
const CommonModel = require('../../models/common_model.js');

router.post('/loadPlanDeviceWithVoyageKey', auth, function (req, res, next) {
    CommonModel.loadPlanDeviceWithVoyageKey(req).then((data)=>{
        res.status(200).json({data});
    }).catch((error)=>{
        res.status(200).json({error});
    });
    
});



module.exports = router;