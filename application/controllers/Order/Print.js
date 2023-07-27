var express = require("express");
var router = express.Router();
var auth = require("../../middlewares/authentication");
const CommonModel = require("../../models/common_model");
const EirModel = require("../../models/ordeirbulk_model");
router.get("/:PinCode", async (req, res, next) => {
  //console.error(loadTrfStandardGroup);
  let data =
    (await EirModel.loadPrintEirInfo(req).catch((err) => console.log(err))) ||
    [];
  console.log(data);
  res.loadOnce("order/Print", data);
});
module.exports = router;
