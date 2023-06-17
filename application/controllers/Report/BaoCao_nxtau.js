var express = require("express");
var router = express.Router();
var auth = require("../../middlewares/authentication");
const VesselModel = require("../../models/VesselModel.js");
// const ReportModel = require("../../models/Report_tau_module.js");
const ReportInOutModel = require("../../models/Report_In_Out_Tau_model.js");
router.get("/", auth, async function (req, res, next) {
  res.loadContent("report/InOut_tau", {});
});

router.post("/loadVesselVisit", auth, function (req, res, next) {
  VesselModel.loadVesselVisit(req)
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      res.status(200).json({ error });
    });
});

router.post("/Device", auth, function (req, res, next) {
  ReportInOutModel.LoadDevice(req)
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      res.status(200).json({ error });
    });
});

router.post("/Worker", auth, function (req, res, next) {
  ReportInOutModel.LoadWorker(req)
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      res.status(200).json({ error });
    });
});

// router.post("/get", auth, function (req, res, next) {
//   ReportModel.LoadReportTally(req)
//     .then((data) => {
//       res.status(200).json({ data });
//     })
//     .catch((error) => {
//       res.status(200).json({ error });
//     });
// });

module.exports = router;
