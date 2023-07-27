var express = require('express');
var router = express.Router();
var normalizedPath = require("path").join(__dirname, "");
var menuModel = require('../../models/menu_model');
var auth = require('../../middlewares/authentication')
let list = require("fs").readdirSync(normalizedPath);

for (let ii = 0; ii < list.length; ii++) {
    const file = list[ii];
    if (file == 'index.js') continue;

    let fileName = file.substring(0, file.length - 3);
    router.use(`/${fileName}`, require(`./${fileName}`));
}

router.use('/success', auth, async (req, res, next) => {
    var user = req.session.userdata;
    var menus = await menuModel.getMenu(user['UserGroupCode'])

    var draftInfo = JSON.parse(req?.body?.dftInfo || '{}');
    var invInfo = '';// JSON.parse(req?.body?.invInfo || '{}');
    var title = `${invInfo ? (invInfo?.inv || "Thành công!") : (draftInfo?.DraftNo || 'Thành công!')}`;
    res.render('order_success', { title: title, menus: menus, userName: user['UserName'], invInfo: invInfo, draftInfo: draftInfo });
});

module.exports = router;