var express = require('express');
var router = express.Router();
var auth = require('../../middlewares/authentication');
const UserModel = require('../../models/user_model.js');
const FunctionModel = require('../../models/FunctionModel.js');
router.get('/', auth, async function (req, res, next) {
    let dataList=await UserModel.loadUser(req);
    let TerminalList=await FunctionModel.getTerminalList(req);
    let userGroupList=await UserModel.loadUserGroup(req);
    res.loadContent('user/umSysUsers', {dataList,userGroupList,TerminalList});
});

router.post('/get', auth, function (req, res, next) {
    UserModel.loadUser(req).then((data)=>{
        res.status(200).json({data});
    }).catch((error)=>{
        res.status(200).json({error});
    });
    
});
router.post('/save', auth, async function (req, res, next) {
    UserModel.saveUser(req).then((data)=>{
        res.status(200).json({data});
    }).catch((error)=>{
        console.log(error);
        res.status(200).json({error});
    });
});
router.post('/delete', auth, async function (req, res, next) {
    UserModel.deleteUser(req).then((data)=>{
        res.status(200).json({data});
    }).catch((error)=>{
        res.status(200).json({error});
    });
});
module.exports = router;