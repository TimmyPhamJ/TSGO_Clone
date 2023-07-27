var express = require("express");
var router = express.Router();
var auth = require("../../middlewares/authentication");
const CommonModel = require("../../models/common_model.js");
const TruckPlanningModel = require("../../models/truckPlanning");
router.get("/", auth, async function (req, res, next) {
  let dataList = await CommonModel.loadDevice(req);
  res.loadContent("planning/truckPlanning", { dataList });
});
router.post("/save", async function (req, res, next) {
  try {
    let result = await TruckPlanningModel.saveData(req);

    if (result) {
      return res.status(200).json({
        errCode: 0,
        mesage: "Lưu thành công",
      });
    }
  } catch (error) {
    console.log(error);
  }
});
router.get("/getTruckPlanning", async function (req, res, next) {
  try {
    let result = await TruckPlanningModel.getTruckPlanning(req);
    if (result.length > 0) {
      return res.status(200).json({
        errCode: 0,
        message: "sucess",
        result: result,
      });
    } else {
      return res.status(200).json({
        errCode: 1,
        message: "No data with Server",
      });
    }
  } catch (error) {}
});
module.exports = router;
