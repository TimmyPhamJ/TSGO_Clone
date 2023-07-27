var express = require("express");
var router = express.Router();
var auth = require("../../middlewares/authentication");
const { InvoiceManagementVT } = require("../../thirdparty/einvoice_viettel");

router.post("/publish", auth, async function (req, res, next) {
  var InvoiceManagement = new InvoiceManagementVT();
  try {
    var invoiceResult = await InvoiceManagement.publish(req);
    res.status(200).json(invoiceResult);
  } catch (error) {
    res.status(200).json({ error });
  }
});

router.post("/draft", auth, async function (req, res, next) {
  var InvoiceManagement = new InvoiceManagementVT();
  try {
    var invoiceResult = await InvoiceManagement.viewDraftInv(req);
    res.status(200).json(invoiceResult);
  } catch (error) {
    res.status(200).json({ error });
  }
});

router.get("/downloadInvPDF", auth, async function (req, res, next) {
  var InvoiceManagement = new InvoiceManagementVT();
  try {
    var invoiceResult = await InvoiceManagement.downloadInvPDF(req);
    res.status(200).json(invoiceResult);
  } catch (error) {
    res.status(200).json({ error });
  }
});

router.get("/getInvView", async function (req, res, next) {
  var InvoiceManagement = new InvoiceManagementVT();
  var tempHtml = `<div style='width: 100vw;text-align: center;margin: -8px 0 0 -8px;font-weight: 600;font-size: 27px;color: white;background-color:#614040;line-height: 2;'>Không tải được hóa đơn!</div>`;
  try {
    var result = await InvoiceManagement.getInvView(req);
    if (!result.success) {
      res.send(result.warning_html || tempHtml);
      return;
    }

    res.header("Content-Length", String(result.content).length);
    res.header("Content-Type", "application/pdf");
    res.header(
      "Content-disposition",
      'inline; filename="' + result["fileName"] + '"'
    );
    res.send(result.content);
  } catch (error) {
    res.send(error.warning_html || tempHtml);
  }
});

//Thoilc(*Note)-HDDT Misa
router.get("/downloadMSInvPDF", auth, async function (req, res, next) {
  var InvoiceManagement = new InvoiceManagementMS();
  try {
    var invoiceResult = await InvoiceManagement.downloadMSInvPDF(req);
    res.status(200).json(invoiceResult);
  } catch (error) {
    res.status(200).json({ error });
  }
});

router.get("/getMSInvView", async function (req, res, next) {
  var InvoiceManagement = new InvoiceManagementMS();
  var tempHtml = `<div style='width: 100vw;text-align: center;margin: -8px 0 0 -8px;font-weight: 600;font-size: 27px;color: white;background-color:#614040;line-height: 2;'>Không tải được hóa đơn!</div>`;
  try {
    var result = await InvoiceManagement.getMSInvView(req);
    if (!result.success) {
      res.send(result.warning_html || tempHtml);
      return;
    }

    res.header("Content-Length", String(result.content).length);
    res.header("Content-Type", "application/pdf");
    res.header(
      "Content-disposition",
      'inline; filename="' + result["fileName"] + '"'
    );
    res.send(result.content);
  } catch (error) {
    res.send(error.warning_html || tempHtml);
  }
});
module.exports = router;
