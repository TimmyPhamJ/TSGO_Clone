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


let normalizedPath = require("path").join(__dirname, "");
let list = require("fs").readdirSync(normalizedPath);
for (let ii = 0; ii < list.length; ii++) {
    const file = list[ii];
    if ((file+'').indexOf('.')!==-1) continue;
    router.use(`/${file}`, require(`./${file}`));
}

module.exports = router;