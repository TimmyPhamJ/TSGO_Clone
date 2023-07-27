var express = require('express');
var router = express.Router();
var auth = require('../../middlewares/authentication');
const Utils = require('../../models/utils_model');
const CommonModel = require('../../models/common_model');
const VesselModel = require('../../models/VesselModel');
const InvoiceModel = require('../../models/invoice_model');

router.get('/', auth, async (req, res, next) => {
    // $this->data['invTemps'] = $this->mdlcre->getInvTemp();
    var items = await Utils.getItems(req);
    var paymentTypeAndMethod = await Utils.getPaymentTypeAndMethod(req);
    var paymentType = paymentTypeAndMethod.filter((obj, index, self) => self.findIndex((it) => it.PaymentTypeID === obj.PaymentTypeID) === index)
    var classCode = await Utils.getClassCode(req);
    var units = await CommonModel.loadUnit(req).catch(err => console.log(err)) || [];
    //get config from db
    var roundNums = {
        VND: 0,
        USD: 2
    };
    var roundNumQty_Unit = 2

    res.loadContent('tools/invoice_manual', { title: 'Tạo hóa đơn tay', items, paymentType, paymentTypeAndMethod, classCode, roundNums, roundNumQty_Unit, units });
});

router.post("/get-payer", auth, async (req, res, next) => {
    CommonModel.loadCustomers(req)
        .then((data) => {
            res.status(200).json({ payers: data });
        })
        .catch((error) => {
            res.status(200).json({ error });
        });
});

router.post("/get-ship", auth, function (req, res, next) {
    VesselModel.loadVesselVisit(req)
        .then((data) => {
            res.status(200).json({ vsls: data });
        })
        .catch((error) => {
            res.status(200).json({ error });
        });
});

router.post("/save", auth, async (req, res, next) => {
    InvoiceModel.saveDraftManual(req)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            res.status(200).json({ error });
        });
})

module.exports = router;