var express = require("express");
var router = express.Router();
var auth = require("../../middlewares/authentication");
const GateModel = require("../../models/gate_model.js");

//Thoilc(*Note)-Load trang
router.get("/", auth, async function (req, res, next) {
  let GateList = await GateModel.loadBsGate(req);
  res.loadOnce("gate/gate", { GateList });
});

//Thoilc(*Note)-Load dữ liệu lên FE
router.post("/getView", auth, async function async(req, res, next) {
  GateModel.loadOrderEirBulk(req)
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      // console.log(error);
      res.status(200).json({ error });
    });
});

//Thoilc(*Note)-Load thông tin số xe
router.post("/getCarInfo", auth, async function async(req, res, next) {
  GateModel.loadCarInfo(req)
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      res.status(200).json({ error });
    });
});

//Thoilc(*Note)-Save dữ liệu FE trả về
router.post("/saveGate", auth, async function async(req, res, next) {
  GateModel.saveJobGate(req)
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      //  console.log(error);
      res.status(200).json({ error });
    });
});

//Thoilc(*Note)-Load thông tin số xe và remooc
router.post("/loadCar_RmNum", auth, async function async(req, res, next) {
  GateModel.loadCar_RmNum(req)
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      // console.log(error);
      res.status(200).json({ error });
    });
});

//Thoilc(*Note)-Thêm danh sách backlist
router.post("/saveBacklst", auth, async function async(req, res, next) {
  GateModel.saveBacklst(req)
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      res.status(200).json({ error });
    });
});

//Thoilc(*Note)-Load danh mục cổng
router.post("/get", auth, async function async(req, res, next) {
  GateModel.loadBsGate(req)
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      res.status(200).json({ error });
    });
});

//Thoilc(*Note)-Refresh dữ liệu
router.post("/RefData", auth, async function async(req, res, next) {
  GateModel.loadRefData(req)
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      res.status(200).json({ error });
    });
});

//Thoilc(*Note)-Load dữ liệu
router.post("/loadCarTable", auth, async function async(req, res, next) {
  GateModel.loadCarTable(req)
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      // console.log(error);
      res.status(200).json({ error });
    });
});

//Thoilc(*note)-Load dữ liệu gate
router.post("/loadDataGate", auth, async function (req, res, next) {
  GateModel.loadDataGate(req)
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      res.status(200).json({ error });
    });
});
module.exports = router;
