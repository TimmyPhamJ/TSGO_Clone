var express = require("express");
var router = express.Router();
var auth = require("../../middlewares/authentication");
const VesselModel = require("../../models/VesselModel.js");
router.get("/", auth, async function (req, res, next) {
  res.loadContent("vessel/vsVesselChart", {});
});

router.post("/get", auth, async function (req, res, next) {
  try {
    var data = await VesselModel.loadVesselChart(req);
    var arrVoyakey = [];
    data.DATA.map((value) => {
      value.values.map((item) => {
        arrVoyakey.push(item.dataObj.vdata.VoyageKey);
      });
    });
    req.body.voyageKey = arrVoyakey;
    data.disload = await VesselModel.getDisLoad(req);
    res.status(200).json({ ...data });
  } catch (error) {
    console.log(error)
    res.status(200).json({ error });
  }
});

router.get("/get-berth", auth, async function (req, res, next) {
  try {
    let result = await VesselModel.getBerth(req);
    if (result) {
      return res.status(200).json({
        errCode: 1,
        message: "Sucess",
        result: result,
      });
    } else {
      return res.status(200).json({
        errCode: 0,
        messgage: "No data with Sever",
      });
    }
  } catch (error) {
    console.log(error);
  }
});
router.get("/get-bitt", auth, async function (req, res, next) {
  try {
    let result = await VesselModel.getBitt(req);
    if (result) {
      return res.status(200).json({
        errCode: 1,
        result: result,
        message: "Sucess",
      });
    } else {
      return res.status(200).json({
        errCode: 0,
        message: "No Data with server",
      });
    }
  } catch (error) { }
});
router.get("/get-disload", auth, async function (req, res, next) {
  try {
    let result = await VesselModel.getDisLoad(req);
    console.log(result);
    if (result) {
      return res.status(200).json({
        errCode: 1,
        result: result,
        message: "Sucess",
      });
    } else {
      return res.status(200).json({
        errCode: 0,
        message: "No Data with server",
      });
    }
  } catch (error) { }
});
module.exports = router;
