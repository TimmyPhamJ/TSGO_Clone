const FunctionModel = require("./FunctionModel");
const { gtos, gtosglobal } = require("../config/database");
const moment = require("moment-timezone");

module.exports.LoadPaymentMethod = async (req) => {
  let query = req
    .gtos("BS_PAYMENT_METHOD")
    .distinct("BS_PAYMENT_METHOD.PaymentMethod");
  query = FunctionModel.KnexWhere(query, req.body.filter, "BS_WORKER_GROUP");
  return (await query.catch((err) => console.log(err))) || [];
};

module.exports.LoadInvoice = async (req) => {
  try {
    let query = req
      .gtos("INV_INVOICE as A")
      .leftJoin("DT_VESSEL_VISIT as B", "A.VoyageKey", "B.VoyageKey")
      .leftJoin("INV_DRAFT as C", "A.InvoiceNo", "C.InvoiceNo")
      .leftJoin("INV_DRAFT_DETAILS as D", "C.DraftNo", "D.DraftNo")
      .select(
        "A.InvoiceNo",
        "A.InvoiceDate",
        "A.ExchangeRate",
        "A.VesselInfo",
        "B.ATA",
        "A.CusID",
        "A.CusName",
        "D.Quantity",
        "A.Amount",
        "A.DiscountAmount",
        "D.VatRate",
        "A.VatAmount",
        "A.TotalAmount",
        "A.Remark",
        "C.DraftNo",
        "A.VoyageKey",
        "A.CurrencyCode",
        "A.PaymentMethod",
        "A.CreatedBy"
      )
      .orderBy("A.InvoiceDate", "desc");
    // console.log(req.body);
    //trường hợp truy vấn theo thời gian  điểm đầu
    if (req.body.Timein) {
      query.where("A.InvoiceDate", ">=", req.body.Timein.toString());
    }
    //Trường hợp truy vấn theo thời gian điểm cuối
    if (req.body.TimeOut) {
      query.where("A.InvoiceDate", "<", req.body.TimeOut.toString());
    }
    //Trường hợp truy vấn theo Tàu
    if (req.body.VoyageKey) {
      query.where("A.VoyageKey", req.body.VoyageKey);
    }
    //Trường hợp truy vấn theo ĐTTT
    if (req.body.Payer) {
      query.where("A.CusID", req.body.Payer);
    }
    //trường hợp truy vấn theo hình thức thanh toán
    if (req.body.PaymentMethod) {
      query.where("A.PaymentMethod", req.body.PaymentMethod);
    }
    //trường hợp truy vấn theo laoij tiền tệ
    if (req.body.CurrencyID) {
      query.where("A.CurrencyCode", req.body.CurrencyID);
    }
    // Trường hợp truy vấn bới người tạo
    if (req.body.CreatedBy) {
      query.where("A.CreatedBy", req.body.CreatedBy);
    }
    let result = (await query.catch((err) => console.log(err))) || [];
    return result;
  } catch (error) {
    // console.log(error);
  }
};
