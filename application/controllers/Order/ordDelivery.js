var express = require("express");
var router = express.Router();
var auth = require("../../middlewares/authentication");
const BulkModel = require("../../models/data_bulk_model.js");
const CommonModel = require("../../models/common_model.js");
const VesselModel = require("../../models/VesselModel.js");
const DiscountModel = require("../../models/trf_model.js");
const CustomerModel = require("../../models/Customer_model.js");
const EirModel = require("../../models/ord_eir_bulk_model");
const LdBulkModel = require("../../models/MNF_LD_Bulk_model.js");
const FunctionModel = require('../../models/FunctionModel.js');
router.get("/", auth, async function (req, res, next) {
  let dataList = []; //await BulkModel.loadUserGroup(req);
  let jobModeList = await CommonModel.loadJobMode(req);
  let classList = await CommonModel.loadClass(req);
  let methodList = await CommonModel.loadMethod(req);
  let unitList = await CommonModel.loadUnit(req);
  let itemList = await CommonModel.loadItem(req);
  let customerList = await CommonModel.loadCustomers(req);
  let customerTypeList = await CommonModel.loadCustomerType(req);
  let transitList = await CommonModel.loadTransit(req);
  res.loadContent("/Order/ordDelivery", {
    dataList,
    jobModeList,
    classList,
    methodList,
    unitList,
    itemList,
    customerList,
    customerTypeList,
    transitList,
    title: 'Lệnh giao hàng'
  });
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

router.post("/get", auth, function (req, res, next) {
  LdBulkModel.LoadManiFestBulk(req)
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      console.log(error);
      res.status(200).json({ error });
    });
});
router.post("/save", auth, async function (req, res, next) {
  EirModel.saveEirBulk(req)
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      console.log(error);
      res.status(200).json({ error });
    });
});
router.post("/delete", auth, async function (req, res, next) {
  BulkModel.deleteBulkManifest(req)
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      res.status(200).json({ error });
    });
});
router.post("/dis", auth, async function (req, res, next) {
  DiscountModel.loadTrfDiscount(req)
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      res.status(200).json({ error });
    });
});
router.post("/cus", auth, async function (req, res, next) {
  CustomerModel.loadCustomer(req)
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      res.status(200).json({ error });
    });
});

router.post("/filter", auth, async function (req, res, next) {
  LdBulkModel.LoadBill(req)
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      res.status(200).json({ error });
    });
});

router.use('/qrcode/:code', async function (req, res) {
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
