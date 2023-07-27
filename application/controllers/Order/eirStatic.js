var express = require("express");
var router = express.Router();
var auth = require("../../middlewares/authentication");
const eirStaticModel = require("../../models/eir_static")
router.get("/", auth, async function (req, res, next) {
    res.loadContent("Order/eirStatic", {});
});
router.get("/getDataEirBulk", auth, async function (req, res, next) {

    try {
        let result = await eirStaticModel.getDataEirBulk(req)
        if (result?.length > 0) {
            return res.status(200).json({
                errCode: 0,
                message: "Sucess",
                length: result?.length,
                result: result
            })
        }
        else {
            return res.status(200).json({
                errCode: 1,
                message: "No data with server"
            })
        }
    } catch (error) {

    }
})
module.exports = router;