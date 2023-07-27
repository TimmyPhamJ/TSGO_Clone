var express = require('express');
var router = express.Router();
var auth = require('../../middlewares/authentication');
const TrfTemplate = require('../../models/trf_template_model.js');
const TrfModel = require('../../models/trf_model.js');

router.get('/', auth, async function (req, res, next) {
    let loadTrfCode = await TrfModel.loadTrfStandardGroup(req);
    // let loadTrfStandard = await TrfModel.loadTrfStandard(req);
    res.loadContent('Tariff/trfTemplate', { loadTrfCode });
});

router.post("/getData", auth, function (req, res, next) {
    TrfTemplate.loadTrfStandard(req)
        .then((data) => {
            res.status(200).json({ data });
        })
        .catch((error) => {
            res.status(200).json({ error });
        });
});

router.post("/loadDataTemplate", auth, function (req, res, next) {
    TrfTemplate.loadTrfTemplate(req)
        .then((data) => {
            res.status(200).json({ data });
        })
        .catch((error) => {
            res.status(200).json({ error });
        });
});

router.post("/saveDataTemplate", auth, function (req, res, next) {
    TrfTemplate.saveTrfTemplate(req)
        .then((data) => {
            res.status(200).json({ data });
        })
        .catch((error) => {
            res.status(200).json({ error });
        });
});

router.post("/delDataTemplate", auth, async function async(req, res, next) {
    TrfTemplate.delTrfTemplate(req)
        .then((data) => {
            res.status(200).json({ data });
        })
        .catch((error) => {
            // console.log(error);
            res.status(200).json({ error });
        });
});
module.exports = router;