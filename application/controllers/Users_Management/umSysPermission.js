var express = require('express');
var router = express.Router();
var auth = require('../../middlewares/authentication');
const UserModel = require('../../models/user_model.js');
const FunctionModel = require('../../models/FunctionModel.js');
router.get('/', auth, async function (req, res, next) {
    let userGroupList=await UserModel.loadUserGroup(req);
    let TerminalList=await FunctionModel.getTerminalList(req);
    let UserTerminalList=await FunctionModel.getTerminalList(req);
    res.loadContent('user/umSysPermission', {userGroupList,UserTerminalList,TerminalList});
});


router.post('/loadACCESSRIGHTMenu', auth, function (req, res, next) {
    UserModel.loadACCESSRIGHTMenu(req).then((data)=>{
        res.status(200).json({data});
    }).catch((error)=>{
        res.status(200).json({error});
    });
    
});

router.post('/get', auth, function (req, res, next) {
    UserModel.loadACCESSRIGHTMenu(req).then((data)=>{
        res.status(200).json({data});
    }).catch((error)=>{
        res.status(200).json({error});
    });
    
});
router.post('/save', auth, async function (req, res, next) {
    UserModel.saveACCESSRIGHT(req).then((data)=>{
        res.status(200).json({data});
    }).catch((error)=>{
        console.log(error);
        res.status(200).json({error});
    });
});
router.post('/delete', auth, async function (req, res, next) {
    UserModel.deleteACCESSRIGHT(req).then((data)=>{
        res.status(200).json({data});
    }).catch((error)=>{
        res.status(200).json({error});
    });
});
module.exports = router;