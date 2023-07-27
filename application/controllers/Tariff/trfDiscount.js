var express = require('express');
var router = express.Router();
var auth = require('../../middlewares/authentication');
const moment = require("moment-timezone");
const CommonModel = require('../../models/common_model.js');
const VesselModel = require('../../models/VesselModel.js');
const TrfModel = require('../../models/trf_model.js');
const trfDiscountModel = require('../../models/trf_discount_model');
const { resolve } = require('path');
const { rejects } = require('assert');
router.get('/', auth, async function (req, res, next) {
  let dataList = await TrfModel.loadTrfDiscountGroup(req);
  let loadTrfCode = await TrfModel.loadTrfCode(req);
  let loadMethod = await CommonModel.loadMethod(req);
  let loadTransit = await CommonModel.loadTransit(req);
  let loadJobType = await CommonModel.loadJobType(req);
  let loadJobMode = await CommonModel.loadJobMode(req);
  let loadClass = await CommonModel.loadClass(req);
  let loadCargoType = await CommonModel.loadCargoType(req);
  let loadService = await CommonModel.loadService(req);
  let loadUnit = await CommonModel.loadUnit(req);
  let loadRate = await CommonModel.loadRate(req);
  let classList = await CommonModel.loadClass(req)
  let loadTrfStandardGroup = await TrfModel.loadTrfStandardGroup(req);
  let jobModeList = await CommonModel.loadJobMode(req);
  let jobTypeList = await CommonModel.loadJobType(req);
  let serviceList = await CommonModel.loadService(req);
  let transitList = await CommonModel.loadTransit(req);
  let cargoTypeList = await CommonModel.loadCargoType(req);
  let itemList = await CommonModel.loadItem(req);
  let unitList = await CommonModel.loadUnit(req);
  let dataContractForm = await trfDiscountModel.loadContractForm(req)
  let formatDatacontractForm = dataContractForm.map(item => {
    return { ...item, ApplyDate: moment(item.ApplyDate).format("DD/MM/YYYY"), ExpireDate: moment(item.ExpireDate).format("DD/MM/YYYY") }
  })
  res.loadContent('tariff/trfDiscount', {
    dataList,
    loadTrfCode,
    loadMethod,
    loadTransit,
    loadJobType,
    loadJobMode,
    loadClass,
    loadCargoType,
    loadService,
    loadUnit,
    loadRate,
    loadTrfStandardGroup,
    classList,
    jobModeList,
    jobTypeList,
    serviceList,
    transitList,
    cargoTypeList,
    itemList,
    unitList,
    dataContractForm,
    formatDatacontractForm
  });
});
router.post('/get', auth, function (req, res, next) {
  TrfModel.loadTrfDiscount(req).then((data) => {
    res.status(200).json({ data });
  }).catch((error) => {
    res.status(200).json({ error });
  });
});

//viết hàm mới getdata và đẩy dữ liệu request vào 

router.post('/get1', auth, function (req, res, next) {
  const { applyDate, expireDate, discountID, cusID } = req.body;

  TrfModel.loadDataTrfDiscount(req, applyDate, expireDate, cusID, discountID)
    .then(data => res.status(200).json({ data }))
    .catch(error => res.status(500).json({ error }));
});
router.post('/save', auth, async function (req, res, next) {
  TrfModel.saveTrfDiscount(req).then((data) => {
    res.status(200).json({ data });
  }).catch((error) => {
    res.status(200).json({ error });
  });
});
router.post('/delete', auth, async function (req, res, next) {
  TrfModel.deleteTrfDiscount(req).then((data) => {
    res.status(200).json({ data });
  }).catch((error) => {
    res.status(200).json({ error });
  });
});
router.get("/getDataContractForm", auth, async function (req, res, next) {
  try {
    let result = await trfDiscountModel.getDataContractForm(req)
    if (result?.length > 0) {
      return res.status(200).json({
        errCode: 0,
        result: result,
        message: "Sucess"
      })
    }
    else {
      return res.status(400).json({
        errCode: 1,
        message: "No data with Server"
      })
    }
  } catch (error) {

  }
})

module.exports = router;