
var express = require('express');
var router = express.Router();
const FunctionModel = require('../../models/FunctionModel.js');
router.use('/:code', async function (req, res) {
    try {
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
module.exports = router;