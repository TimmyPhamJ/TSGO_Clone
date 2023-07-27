var express = require('express');
var router = express.Router();
var auth = require('../../middlewares/authentication');
const JobModel = require("../../models/job_model.js");
const TrfModel = require('../../models/trf_model.js');
const CommonModel = require('../../models/common_model.js');
const TrfTemplate = require('../../models/trf_template_model.js');
//Thoilc(*Note)-Load trang
router.get("/", auth, async function (req, res, next) {
    let dataDetail = await JobModel.loadPortJob(req);
    let loadTrfCode = await TrfModel.loadTrfStandardGroup(req);
    let loadRate = await CommonModel.loadRate(req);
    let loadTemplate = await TrfTemplate.loadTemplate(req);
    let loadUnit = await CommonModel.loadUnit(req);
    let loadItem = await CommonModel.loadItem(req);
    let loadClass = await CommonModel.loadClass(req);
    //get config from db
    let roundNums = {
        VND: 0,
        USD: 2
    };
    let roundNumQty_Unit = 2
    res.loadContent("Job/JobQuay", { title: 'Tạo hóa đơn xếp dỡ hàng với tàu', dataDetail, loadTrfCode, loadRate, loadTemplate, loadUnit, loadItem, loadClass, roundNums, roundNumQty_Unit });
});

router.post("/getData", auth, function (req, res, next) {
    JobModel.loadDataJob(req)
        .then((data) => {
            res.status(200).json({ data });
        })
        .catch((error) => {
            res.status(200).json({ error });
        });
});

router.post("/getTrfStandard", auth, function (req, res, next) {
    JobModel.calTrfStandard(req)
        .then((data) => {
            res.status(200).json({ data });
        })
        .catch((error) => {
            res.status(200).json({ error });
        });
});

router.post("/getTrfTemplate", auth, function (req, res, next) {
    JobModel.selTrfTemplate(req)
        .then((data) => {
            res.status(200).json({ data });
        })
        .catch((error) => {
            res.status(200).json({ error });
        });
});
module.exports = router;