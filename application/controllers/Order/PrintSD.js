var express = require("express");
var router = express.Router();
var auth = require("../../middlewares/authentication");
const CommonModel = require("../../models/common_model");
const EirModel = require("../../models/ordeirbulk_model");
router.get("/:TerminalCode", async (req, res, next) => {
  //console.error(req);
  let data =
    (await EirModel.loadPrintSDInfo(req).catch((err) => console.log(err))) ||
    [];
  console.log(data);
  res.loadOnce("order/PrintSD", data);
});
module.exports = router;
