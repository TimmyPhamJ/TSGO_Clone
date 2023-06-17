var express = require('express');
var router = express.Router();
var auth = require('../../middlewares/authentication');
const UserModel = require('../../models/user_model.js');
router.get('/', auth, async function (req, res, next) {
    let dataList=await UserModel.loadUserGroup(req);
    res.loadContent('user/umSysGroup', {dataList});
});

router.post('/get', auth, function (req, res, next) {
    UserModel.loadUserGroup(req).then((data)=>{
        res.status(200).json({data});
    }).catch((error)=>{
        res.status(200).json({error});
    });
    
});
router.post('/save', auth, async function (req, res, next) {
    UserModel.saveUserGroup(req).then((data)=>{
        res.status(200).json({data});
    }).catch((error)=>{
        res.status(200).json({error});
    });
});
router.post('/delete', auth, async function (req, res, next) {
    UserModel.deleteUserGroup(req).then((data)=>{
        res.status(200).json({data});
    }).catch((error)=>{
        res.status(200).json({error});
    });
});
module.exports = router;