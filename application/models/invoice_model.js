const moment = require("moment-timezone");
const FunctionModel = require("./FunctionModel");
const EirModel = require("./ordeirbulk_model");

const saveDraftManual = async (req) => {
  var args = req.body.args;
  var output = {
    success: true,
    message: "",
  };

  if (!args || Object.keys(args).length == 0) {
    output.message = "Dữ liệu đầu vào không hợp lệ!";
    output.success = false;
    return output;
  }

  var draft_details = [];
  if (args["draft_detail"] && args["draft_detail"].length > 0) {
    draft_details = args["draft_detail"];
  }

  var draft_total = {};
  if (args["draft_total"] && Object.keys(args["draft_total"]).length > 0) {
    draft_total = args["draft_total"];
  }

  var invInfo = args["invInfo"];
  var draftNo = await EirModel.generateDraftID(req);

  if (args["pubType"] == "e-inv") {
    invInfo["DraftNo"] = draftNo;
    output["invInfo"] = invInfo;
    draft_total["InvoiceNo"] = invInfo["inv"];
    draft_total["PinCode"] = invInfo["fkey"];
    draft_total["InvoiceDate"] =
      invInfo["invoiceDate"] || moment().format("YYYY-MM-DD HH:mm:ss");
    let saveInvResult = await saveInvoiceManual(req, draft_total);
    if (!saveInvResult.success) {
      return saveInvResult;
    }
  }

  var pinCode = draft_total["PinCode"] || (await EirModel.generatePinCode(req));
  output["dftInfo"] = {
    DraftNo: draftNo,
    PinCode: pinCode,
  };

  var inv_draft = {
    DraftNo: draftNo,
    DraftDate: FunctionModel.dbDateTime(draft_total["InvoiceDate"]), //them moi hd thu sau
    InvoiceNo: draft_total["InvoiceNo"] || null,
    OrderNo: draft_total["OrderNo"] || null,
    PinCode: pinCode,
    VoyageKey: draft_total["VoyageKey"] || null,
    VesselID: draft_total["VesselID"] || null,
    VesselInfo: draft_total["VesselInfo"]
      ? JSON.stringify(draft_total["VesselInfo"])
      : null,
    CusTypeID: draft_total["CusTypeID"],
    CusID: draft_total["CusID"],
    CusName: draft_total["CusName"],
    TaxCode: draft_total["TaxCode"],
    Address: draft_total["Address"],
    PaymentTypeID: draft_total["PaymentTypeID"],
    DraftStatus: "Y",
    TariffTempID: draft_total["TariffTempID"] || null,
    ExchangeRate: parseFloat(draft_total["RATE"] || 1),

    Amount: draft_total["Amount"],
    VatAmount: draft_total["VatAmount"],
    TotalAmount: draft_total["TotalAmount"],
    CurrencyCode: draft_total["CurrencyCode"],
    IsManualInvoice: true,
    ModifiedBy: req.session.userdata["UserID"],
    CreateTime: FunctionModel.moment().format("YYYY-MM-DD HH:mm:ss"),
    CreatedBy: req.session.userdata["UserID"],
  };

  //get inv draft details
  var inv_draft_details = [];
  var seq = 1;
  for await (let dd of draft_details) {
    dd["DraftNo"] = draftNo;
    dd["Seq"] = seq;
    dd["VatAmount"] = parseFloat(dd["VatAmount"] || 0);
    dd["VatRate"] = parseFloat(dd["VatRate"] || 0);
    dd["ModifiedBy"] = req.session.userdata["UserID"];
    dd["CreatedBy"] = req.session.userdata["UserID"];

    delete dd["rowguid"];
    inv_draft_details.push(dd);
  }

  try {
    await req.gtos("INV_DRAFT").insert(inv_draft);
    await req.gtos("INV_DRAFT_DETAILS").insert(inv_draft_details);
  } catch (error) {
    console.log(error);
    output.success = false;
    output.message = error.message || "Lưu mới dữ liệu không thành công!";
  }

  return output;
};

const saveInvoiceManual = async (req, draftTotal) => {
  //get inv VAT
  var inv_vat = {
    InvoiceNo: draftTotal["InvoiceNo"],
    OrderNoMrk: draftTotal["OrderNo"] || null,
    InvoiceDate: FunctionModel.dbDateTime(draftTotal["InvoiceDate"]), //them moi hd thu sau
    VoyageKey: draftTotal["VoyageKey"] || null,
    VesselID: draftTotal["VesselID"] || null,
    VesselInfo: draftTotal["VesselInfo"]
      ? JSON.stringify(draftTotal["VesselInfo"])
      : null,

    //payer + payertype theo payer được chọn trên gdien
    CusTypeID: draftTotal["CusTypeID"],
    CusID: draftTotal["CusID"],
    CusName: draftTotal["CusName"],
    TaxCode: draftTotal["TaxCode"],
    Address: draftTotal["Address"],
    PaymentTypeID: draftTotal["PaymentTypeID"],
    PaymentMethod: draftTotal["PaymentMethod"],
    InvoiceStatus: "Y",
    TariffTempID: draftTotal["TariffTempID"] || null,
    ExchangeRate: parseFloat(draftTotal["ExchangeRate"] || 0),

    Amount: draftTotal["Amount"],
    DiscountAmount: draftTotal["DiscountAmount"],
    VatAmount: draftTotal["VatAmount"],
    TotalAmount: draftTotal["TotalAmount"],
    CurrencyCode: draftTotal["CurrencyCode"],
    PinCode: draftTotal["PinCode"],
    IsManual: true,
    CreatedBy: req.session.userdata["UserID"],
    CreateTime: FunctionModel.moment().format("YYYY-MM-DD HH:mm:ss"),
  };

  if (draftTotal["AdjustInvNo"]) {
    inv_vat["AdjustInvNo"] = draftTotal["AdjustInvNo"];
    switch (draftTotal["AdjustType"]) {
      case "1": //thay thế - vnpt
      case "3": //thay thế - vt
        inv_vat["AdjustType"] = "1";
        break;
      case "2": //dc tăng - vnpt
      case "5.1.1": //dc tăng - vt
        inv_vat["AdjustType"] = "2";
        break;
      case "3": //dc giam - vnpt
      case "5.1.2": //dc giam - vt
        inv_vat["AdjustType"] = "3";
        break;
      case "4": //dc thong tin - vnpt
      case "5.2": //dc thong tin - vt
        inv_vat["AdjustType"] = "4";
        break;
      default:
        inv_vat["AdjustType"] = "0";
        break;
    }
    //1 thay the                1               3
    //2 tang                    2               5.1.1
    //3 giam                    3               5.1.2
    //4 dc thong tin        4               5.2

    inv_vat["AdjustRemark"] =
      req.session.userdata["UserID"] + " :: " + draftTotal["AdjustRemark"];
  }

  try {
    await req.gtos("INV_INVOICE").insert(inv_vat);
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error.message || "Lưu mới hóa đơn không thành công!",
    };
  }
  return { success: true };
};

module.exports = {
  saveDraftManual,
  saveInvoiceManual,
};
