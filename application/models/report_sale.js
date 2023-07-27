const { rejects } = require("assert");
const { query } = require("express");
const moment = require("moment-timezone");
const { resolve } = require("path");
module.exports.loadPaymentMethod = async (req) => {
    return new Promise(async (resolve, rejects) => {
        try {
            let result = await req.gtos("BS_PAYMENT_METHOD").distinct("PaymentMethod")
            resolve(result)
        } catch (error) {
            rejects(error)
        }
    })
}
module.exports.getdataInvoice = async (req) => {
    return new Promise(async (resolve, rejects) => {
        try {
            let query = req.gtos("INV_INVOICE AS II")
                .select("II.InvoiceNo", "II.InvoiceDate", "II.PinCode", "II.Amount", "II.DiscountAmount",
                    "II.VatAmount", "II.TotalAmount", "II.PaymentTypeID", "II.CusID", "II.CusName", "II.TaxCode",
                    "II.CreatedBy", "II.Remark", "TC.TRFCodeName", "TC.TRFCodeName",
                    "IDD.TRFDesc", "IDD.TRFDescMore", "IDD.Quantity", "IDD.VatRate", "II.PaymentMethod", "OEB.ExpDate"
                )
                .leftJoin("TRF_CODE AS TC", "TC.TRFCode", "II.TariffTempID")
                .leftJoin("INV_DRAFT AS ID", "ID.PinCode", "II.PinCode")
                .leftJoin("INV_DRAFT_DETAILS AS IDD", "IDD.DraftNo", "ID.DraftNo")
                .leftJoin("ORD_EIR_BULK AS OEB", "OEB.DraftNo", "IDD.DraftNo")
                .orderBy("II.InvoiceDate")

            if (req.query.checkOption) {
                if (req.query.checkOption == "ALL") {
                    query.whereIn("II.PaymentTypeID", ["CAS", "CRE"])
                }
                else {
                    query.where("II.PaymentTypeID", req.query.checkOption)
                }
            }
            if (req.query.timeIn) {
                query.where("II.InvoiceDate", ">=", req.query.timeIn.toString());
            }
            if (req.query.timeOut) {
                query.where("II.InvoiceDate", "<", req.query.timeOut.toString());
            }
            if (req.query.VoyageKey) {
                query.where("II.VoyageKey", req.query.VoyageKey)
            }
            if (req.query.CusID) {
                query.where("II.CusID", req.query.CusID)
            }
            if (req.query.PaymentMethod) {
                query.where("II.PaymentMethod", req.query.PaymentMethod)
            }
            if (req.query.CurrencyCode) {
                query.where("II.CurrencyCode", req.query.CurrencyCode)
            }
            // còn 1 trường hợp xử lý với loại hóa đơn
            if (req.query.CreateTime) {
                query.where("II.CreateTime", req.query.CreateTime)
            }
            let result = (await query.catch((err) => console.log(err))) || [];
            resolve(result)
        } catch (error) {
            console.log(error)
        }
    })
}
