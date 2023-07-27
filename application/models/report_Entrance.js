const { resolve } = require("path");
const FunctionModel = require("./FunctionModel.js");
const moment = require("moment-timezone");
const { rejects } = require("assert");
const { Console } = require("console");
module.exports.getItemName = async (req) => {
  return new Promise(async (resolve, rejects) => {
    try {
      let result = [];
      let result_itemname = await req.gtos("BS_ITEM").select("ItemName");
      let result_jobmodename = await req
        .gtos("BS_JOB_MODE")
        .select("JobModeName", "JobModeID");
      result.push(result_itemname, result_jobmodename);
      resolve(result);
    } catch (error) {
      rejects(error);
    }
  });
};
module.exports.getEntranceReport = async (req) => {
  return new Promise(async (resolve, rejects) => {
    try {
      let query = req
        .gtos("JOB_GATE AS JG")
        .select("JG.VoyageKey", "VSV.VesselName", "JG.RM_No", "JG.EirNo", "JG.BillOfLading",
          "JG.BookingNo", "JG.ClassID", "JG.ItemID", "JG.Quantity", "JG.McWeight", "JG.InOut",
          "JG.GateInID", "JG.StartDate", "JG.GateOutID", "JG.FinishDate", "JG.TruckNo", "JG.JobModeID",
          "JG.CargoType", "JG.MethodID", "JG.CusID", "JG.Remark", "OEB.PaymentTypeID", "OEB.InvoiceNo",
          "OEB.DraftNo", "OEB.ShipperName", "VSV.InboundVoyage", "VSV.OutboundVoyage", "BJM.JobModeName",
          "BCM.CusName", "bsCargo.CargoTypeName", "bsItem.ItemName", "JG.Block", "JG.PinCode", "JG.Sequence"
        )
        .leftJoin("DT_VESSEL_VISIT AS VSV", "JG.VoyageKey", "VSV.VoyageKey")
        .leftJoin("DT_VESSEL AS VS", "VS.VesselID", "VSV.VesselID")
        .leftJoin("BS_JOB_MODE AS BJM ", "BJM.JobModeID", "JG.JobModeID")
        .leftJoin("BS_CUSTOMER AS BCM", "JG.CusID", "BCM.CusID")
        .leftJoin("BS_ITEM AS bsItem", "JG.ItemID", "bsItem.ItemID")
        .leftJoin("BS_CARGOTYPE AS bsCargo", "bsItem.CargoTypeID", "bsCargo.CargoTypeID")
        .leftJoin("ORD_EIR_BULK AS OEB", "OEB.PinCode", "JG.PinCode");
      // query param
      if (req.query.ClassID) {
        query.where("JG.ClassID", +req.query.ClassID);
      }
      if (req.query.CH) {
        query.where("OEB.ShipperName", req.query.CH);
      }
      if (req.query.HTTT) {
        query.where("OEB.PaymentTypeID", req.query.HTTT);
      }
      if (req.query.BillOfLading) {
        query.where("JG.BillOfLading", req.query.BillOfLading);
      }
      if (req.query.JobModeID) {
        query.where("JG.JobModeID", req.query.JobModeID);
      }
      if (req.query.BookingNo) {
        query.where("JG.BookingNo", req.query.BookingNo);
      }
      if (req.query.ItemID) {
        query.where("bsItem.ItemName", req.query.ItemID);
      }
      if (req.query.EirNo) {
        query.where("JG.EirNo", req.query.EirNo);
      }
      if (req.query.StartDate) {
        StartDate = moment(req.query.StartDate).format("YYYY-MM-DD THH:mm:ssZ");
        query.where("JG.StartDate", ">=", req.query.StartDate.toString());
      }
      if (req.query.FinishDate) {
        FinishDate = moment(req.query.FinishDate).format(
          "YYYY-MM-DD THH:mm:ssZ"
        );
        query.where("JG.FinishDate", "<", req.query.FinishDate.toString());
      }
      if (req.query.checkIn) {
        query.whereIn("JG.InOut", req.query.checkIn);
      }
      if (req.query.VoyageKey) {
        query.where("VSV.VoyageKey", req.query.VoyageKey);
      }
      let result = (await query.catch((err) => console.log(err))) || [];
      resolve(result);
    } catch (error) {
      console.log(error);
      rejects(error);
    }
  });
};
