const { rejects } = require("assert");
const { query } = require("express");
const moment = require("moment-timezone");
const { resolve } = require("path");
module.exports.getDataEirBulk = async (req) => {
    return new Promise(async (resolve, rejects) => {
        try {
            // Trường hợp truy vấn theo nâng hạ
            if (req.query.index == 0) {
                let query = req.gtos("ORD_EIR_BULK AS OEB").select("OEB.EirNo", "OEB.PinCode", "OEB.ClassID", "OEB.MethodID", "OEB.CommodityDescription", "OEB.VoyageKey", "OEB.BillOfLading", "OEB.BookingNo", "OEB.PaymentTypeID", "OEB.DraftNo", "OEB.ShipperName", "OEB.CreatedBy", "OEB.Remark",
                    "BJM.JobModeName", "BM.MethodName", "OEB.CargoWeight",
                    "OEB.CusID", "VSV.VesselName", "VSV.InboundVoyage",
                    "VSV.OutboundVoyage", "OEB.JobModeID", "OEB.IssueDate",
                    "OEB.ExpDate", "OEB.IsLocalForeign", "II.InvoiceDate", "ID.TariffTempID", "ID.Amount", "TC.TRFCodeName", "OEB.InvoiceNo")
                    .leftJoin("BS_JOB_MODE AS BJM", "BJM.JobModeID", "OEB.JobModeID")
                    .leftJoin("BS_METHOD AS BM", "BM.MethodID", "OEB.MethodID")
                    .leftJoin("DT_VESSEL_VISIT AS VSV", "VSV.VoyageKey", "OEB.VoyageKey")
                    .leftJoin("INV_DRAFT AS ID", "ID.DraftNo", "OEB.DraftNo")
                    .leftJoin("INV_INVOICE AS II", "II.TariffTempID", "ID.TariffTempID")
                    .leftJoin("TRF_CODE AS TC", "TC.TRFCode", "ID.TariffTempID")

                //query param
                if (req.query.searchParam) {
                    query.where(function () {
                        this.where("OEB.EirNo", req.query.searchParam)
                            .orWhere("OEB.PinCode", req.query.searchParam)
                            .orWhere("OEB.BookingNo", req.query.searchParam)
                            .orWhere("OEB.BillOfLading", req.query.searchParam)
                    })
                }
                if (req.query.VoyageKey) {
                    query.where("OEB.VoyageKey", req.query.VoyageKey)
                }
                if (req.query.startDate) {
                    query.where("OEB.CreateTime", ">=", req.query.startDate.toString());
                }
                if (req.query.endDate) {
                    query.where("OEB.CreateTime", "<", req.query.endDate.toString());
                }
                if (req.query.classID) {
                    query.whereIn("OEB.JobModeID", req.query.classID)
                }
                let result = (await query.catch((err) => console.log(err))) || [];
                resolve(result)
            }
            // Trường hợp truy vấn theo dịch vụ
            if (req.query.index == 1) {
                let query = req.gtos("ORD_SERVICE AS OS").select("OS.EirNo", "OS.PinCode", "OS.ClassID", "OS.MethodID",
                    "OS.VoyageKey", "OS.BillOfLading", "OS.BookingNo", "OS.PaymentTypeID", "OS.ShipperName",
                    "OS.CreatedBy", "OS.Remark", "BJM.JobModeName", "OS.CusID", "OS.IssueDate", "OS.ExpDate"
                    , "BM.MethodName", "OS.CarWeight AS CargoWeight", "VSV.VesselName", "VSV.InboundVoyage",
                    "VSV.OutboundVoyage", "II.InvoiceDate", "ID.TariffTempID", "ID.Amount", "BJM.IsYard", "TC.TRFCodeName", "OS.InvNo"
                )
                    .leftJoin("BS_JOB_MODE AS BJM", "OS.JobModeID", "BJM.JobModeID")
                    .leftJoin("BS_METHOD AS BM", "OS.MethodID", "BM.MethodID")
                    .leftJoin("DT_VESSEL_VISIT AS VSV", "OS.VoyageKey", "VSV.VoyageKey")
                    .leftJoin("INV_INVOICE AS II", "OS.PinCode", "II.PinCode")
                    .leftJoin("INV_DRAFT AS ID", "OS.PinCode", "ID.PinCode")
                    .leftJoin("TRF_CODE AS TC", "TC.TRFCode", "ID.TariffTempID")
                    .where("BJM.IsYard", "=", 1)
                //query param
                if (req.query.searchParam) {
                    query.where(function () {
                        this.where("OS.EirNo", req.query.searchParam)
                            .orWhere("OS.PinCode", req.query.searchParam)
                            .orWhere("OS.BookingNo", req.query.searchParam)
                            .orWhere("OS.BillOfLading", req.query.searchParam)
                    })
                }
                if (req.query.VoyageKey) {
                    query.where("OS.VoyageKey", req.query.VoyageKey)
                }
                if (req.query.startDate) {
                    query.where("OS.CreateTime", ">=", req.query.startDate.toString());
                }
                if (req.query.endDate) {
                    query.where("OS.CreateTime", "<", req.query.endDate.toString());
                }
                let result = (await query.catch((err) => console.log(err))) || [];
                resolve(result)
            }
        } catch (error) {
            rejects(error)
        }
    })
}