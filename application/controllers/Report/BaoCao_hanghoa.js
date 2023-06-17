var express = require("express");
var router = express.Router();
var auth = require("../../middlewares/authentication");
const ReportgoodModal = require("../../models/report_good_model");
router.get("/", auth, async function (req, res, next) {
  try {
    let result = await ReportgoodModal.getItemName(req);
    console.log("check", result);
    res.loadContent("report/reportGoods", { result });
  } catch (error) {}
});
router.post("/get-entranceReport", auth, async function (req, res, next) {
  try {
    console.log(req.body);
    let result = await ReportgoodModal.getEntranceReport(req);
  } catch (error) {}
});
module.exports = router;
