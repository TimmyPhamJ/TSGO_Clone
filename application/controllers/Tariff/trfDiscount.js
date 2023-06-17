var express = require('express');
var router = express.Router();
var auth = require('../../middlewares/authentication');
const CommonModel = require('../../models/common_model.js');
const VesselModel = require('../../models/VesselModel.js');
const TrfModel = require('../../models/trf_model.js');
router.get('/', auth, async function (req, res, next) {
   let dataList=await TrfModel.loadTrfDiscountGroup(req);
   let loadTrfCode=await TrfModel.loadTrfCode(req);
   let loadMethod=await CommonModel.loadMethod(req);
   let loadTransit=await CommonModel.loadTransit(req);
   let loadJobType=await CommonModel.loadJobType(req);
   let loadJobMode=await CommonModel.loadJobMode(req);
   let loadClass=await CommonModel.loadClass(req);
   let loadCargoType=await CommonModel.loadCargoType(req);
   let loadService=await CommonModel.loadService(req);
   let loadUnit=await CommonModel.loadUnit(req);
   let loadRate=await CommonModel.loadRate(req);



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
      loadRate


    });
});
router.post('/get', auth, function (req, res, next) {
    TrfModel.loadTrfDiscount(req).then((data)=>{
      res.status(200).json({data});
  }).catch((error)=>{
      res.status(200).json({error});
  });
});

//viết hàm mới getdata và đẩy dữ liệu request vào 

router.post('/get1', auth, function(req, res, next) {
  const { applyDate, expireDate, discountID, cusID } = req.body;

  TrfModel.loadDataTrfDiscount(req, applyDate, expireDate, cusID,discountID)
    .then(data => res.status(200).json({ data }))
    .catch(error => res.status(500).json({ error }));
});
router.post('/save', auth, async function (req, res, next) {
    TrfModel.saveTrfDiscount(req).then((data)=>{
      res.status(200).json({data});
  }).catch((error)=>{
      res.status(200).json({error});
  });
});
router.post('/delete', auth, async function (req, res, next) {
    TrfModel.deleteTrfDiscount(req).then((data)=>{
      res.status(200).json({data});
  }).catch((error)=>{
      res.status(200).json({error});
  });
});



    module.exports = router;