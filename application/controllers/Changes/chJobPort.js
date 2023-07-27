var express = require('express');
var router = express.Router();
var auth = require('../../middlewares/authentication');
const JobModelModel = require("../../models/changes_job_port_model.js");

//Thoilc(*Note)-Load trang
router.get("/", auth, async function (req, res, next) {
    let dataDetail = await JobModelModel.loadDetailPort(req);
    res.loadContent("Changes/chJobPort", { dataDetail });
});

//Thoilc(*Note)-Tìm kiếm dữ liệu
router.post("/getData", auth, async function async(req, res, next) {
    JobModelModel.loadDataPort(req)
        .then((data) => {
            res.status(200).json({ data });
        })
        .catch((error) => {
            // console.log(error);
            res.status(200).json({ error });
        });
});
//Thoilc(*Note)-Lưu dữ liệu
router.post("/saveData", auth, async function async(req, res, next) {
    JobModelModel.savePort(req)
        .then((data) => {
            res.status(200).json({ data });
        })
        .catch((error) => {
            // console.log(error);
            res.status(200).json({ error });
        });
});
module.exports = router;