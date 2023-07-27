var express = require("express");
var router = express.Router();
var auth = require("../../middlewares/authentication");
const CommonModel = require("../../models/common_model.js");
const VesselModel = require("../../models/VesselModel.js");
router.get("/", auth, async function (req, res, next) {
  let oprList = await CommonModel.loadOpr(req);
  let portList = await CommonModel.loadPortFull(req);
  let laneList = await VesselModel.loadLane(req);
  //console.error({dataList,oprList,nationList});
  res.loadContent("vessel/vsLane", { laneList, oprList, portList });
});

router.post("/loadLaneDetails", auth, function (req, res, next) {
  VesselModel.loadLaneDetails(req)
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      res.status(200).json({ error });
    });
});

router.post("/loadLaneDetails2", auth, function (req, res, next) {
  VesselModel.loadLaneDetails2(req)
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      res.status(200).json({ error });
    });
});

router.post("/get", auth, function (req, res, next) {
  VesselModel.loadLane(req)
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      res.status(200).json({ error });
    });
});
router.post("/save", auth, async function (req, res, next) {
  VesselModel.saveLane(req)
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      console.log(error);
      res.status(200).json({ error });
    });
});
router.post("/delete", auth, async function (req, res, next) {
  VesselModel.deleteLane(req)
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      res.status(200).json({ error });
    });
});
module.exports = router;
