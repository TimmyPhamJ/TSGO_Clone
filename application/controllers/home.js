var express = require('express');
var router = express.Router();
var auth = require('../middlewares/authentication')
var menuModel = require('../models/menu_model');

router.get('/', auth, async function (req, res, next) {
    var user = global.get_userdata() || req.session.userdata;
    var menus = await menuModel.getMenu(user['UserGroupCode'])
    if (user['UserGroupCode'] == 'GateGroup') {
        return res.render('gate');
    }

    if (user['UserGroupCode'] == 'Tally') {
        return res.render('tally');
    }

    if (user['UserGroupCode'] == 'Che') {
        return res.render('che');
    }

    res.render('tracking', { menus: menus, userName: user['UserName'] });
});

//Thoilc(*Note)-Tìm kiếm dữ liệu
router.post("/findData", auth, async function async(req, res, next) {
    menuModel.loadData(req)
        .then((data) => {
            res.status(200).json({ data });
        })
        .catch((error) => {
            res.status(200).json({ error });
        });
});

//Thoilc(*Note)-Tìm kiếm dữ liệu
router.post("/getPinCode", auth, async function async(req, res, next) {
    menuModel.getPinCode(req)
        .then((data) => {
            res.status(200).json({ data });
        })
        .catch((error) => {
            res.status(200).json({ error });
        });
});

router.get('/qrcode/:code', async function (req, res) {
    try {
        var FunctionModel = require('../models/FunctionModel');
        FunctionModel.generateQRCodeToSting((req.params.code || '')).then((result) => {
            var result = result.replace(/^data:image\/png;base64,/, "");
            var buf = new Buffer(result, 'base64');
            res.header('Content-Type', 'image/png').end(buf);
        }).catch((e) => {
            return res.status(400).json({ status: 400, message: e });
        });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
})

let normalizedPath = require("path").join(__dirname, "");
let list = require("fs").readdirSync(normalizedPath);
for (let ii = 0; ii < list.length; ii++) {
    const file = list[ii];
    if ((file + '').indexOf('.') !== -1) continue;
    router.use(`/${file}`, require(`./${file}`));
}

module.exports = router;