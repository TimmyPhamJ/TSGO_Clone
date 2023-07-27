const FunctionModel = require("./FunctionModel");
const { gtos, gtosglobal } = require("../config/database");
const moment = require("moment-timezone");

// module.exports.LoadCauBo = async (req) => {
//   let query = req
//     .gtos("JOB_TALLY as jt")
//     .join("BS_DEVICE as bd", "jt.DeviceID", "bd.DeviceID")
//     .select("jt.DeviceID", "bd.DeviceTypeID", "bd.DeviceName")
//     .groupBy("jt.DeviceID", "bd.DeviceTypeID", "bd.DeviceName");
//   query = FunctionModel.KnexWhere(query, req.body.filter, "jt");
//   return (await query.catch((err) => console.log(err))) || [];
// };

// module.exports.LoadCauBai = async (req) => {
//   let query = req
//     .gtos("JOB_YARD as jy")
//     .join("BS_DEVICE as bd", "jy.DeviceID", "bd.DeviceID")
//     .select("jy.DeviceID", "bd.DeviceTypeID", "bd.DeviceName")
//     .groupBy("jy.DeviceID", "bd.DeviceTypeID", "bd.DeviceName");
//   query = FunctionModel.KnexWhere(query, req.body.filter, "jy");
//   return (await query.catch((err) => console.log(err))) || [];
// };

module.exports.LoadDevice = async (req) => {
  let query = req
    .gtos("BS_DEVICE as bd")
    .select("bd.DeviceTypeID", "bd.DeviceID", "bd.DeviceName");
  query = FunctionModel.KnexWhere(query, req.body.filter, "bd");
  return (await query.catch((err) => console.log(err))) || [];
};

module.exports.LoadWorker = async (req) => {
  let query = req
    .gtos("BS_WORKER_GROUP")
    .select("BS_WORKER_GROUP.WorkerGroupID", "BS_WORKER_GROUP.WorkerGroupName");
  query = FunctionModel.KnexWhere(query, req.body.filter, "BS_WORKER_GROUP");
  return (await query.catch((err) => console.log(err))) || [];
};

// module.exports.LoadReportTally = async (req) => {
//   let query = req
//     .gtos("JOB_TALLY as jt")
//     .join("DT_VESSEL_VISIT as dvv", "jt.VoyageKey", "dvv.VoyageKey")
//     .join("BS_ITEM as bi", "jt.ItemID", "bi.ItemID")
//     .join("BS_WORKER_GROUP as bw", "jt.WorkerGroupID", "bw.WorkerGroupID")
//     .join("BS_DEVICE as bd", "jt.DeviceID", "bd.DeviceID")
//     .join("DT_MNF_LD_BULK as dmlb", function () {
//       this.on(
//         req.gtos.raw(
//           "(jt.BillOfLading = dmlb.BillOfLading) OR(jt.BillOfLading = '' AND jt.BookingNo = dmlb.BookingNo)"
//         )
//       );
//     })
//     .leftJoin("BS_CUSTOMER as bc", "dmlb.CusID", "bc.CusID")
//     .leftJoin("BS_UNIT as bu", "dmlb.UnitID", "bu.UnitID")
//     .leftJoin("BS_JOB_MODE as bjm", "dmlb.JobModeID", "bjm.JobModeID")
//     .join("DT_BLOCK_STOCK as dbs", function () {
//       this.on(
//         req.gtos.raw(
//           "(jt.BillOfLading = dbs.BillOfLading) OR(jt.BillOfLading = '' AND jt.BookingNo = dbs.BookingNo)"
//         )
//       );
//     })
//     .leftJoin("DT_VESSEL as dv", "dvv.VesselID", "dv.VesselID")
//     .leftJoin("BS_NATIONAL as bn", "dv.NationID", "bn.NationID")
//     .leftJoin("BS_CARGOTYPE as bcg", "bi.CargoTypeID", "bcg.CargoTypeID")
//     .select(
//       "dvv.VoyageKey",
//       "jt.BillOfLading",
//       "jt.BookingNo",
//       "jt.ClassID",
//       "jt.MethodID",
//       "jt.ItemID",
//       "jt.DeviceID",
//       "bd.DeviceTypeID",
//       "bd.DeviceName",
//       "bi.ItemName",
//       req.gtos.raw("SUM(jt.Quantity) AS TotalQuantity"),
//       req.gtos.raw("SUM(jt.McWeight) AS TotalMcWeight"),
//       req.gtos.raw("MIN(jt.CreateTime) AS CreateTime"),
//       "jt.WorkerGroupID",
//       "bw.WorkerGroupName",
//       req.gtos.raw("MAX(jt.Note) AS Note"),
//       "dmlb.CusID",
//       "dmlb.POL",
//       "dmlb.POD",
//       "dmlb.FPOD",
//       "bc.CusName",
//       "dmlb.UnitID",
//       "bu.UnitName",
//       "dmlb.JobModeID",
//       "bjm.JobModeName",
//       "dbs.TLHQ",
//       "dvv.VesselID",
//       "dvv.ATA",
//       "dv.NationID",
//       "bn.NationName",
//       "bi.CargoTypeID",
//       "bcg.CargoTypeName"
//     )
//     .where("dvv.VoyageKey", req.body.VoyageKey)
//     .groupBy(
//       "dvv.VoyageKey",
//       "jt.BillOfLading",
//       "jt.BookingNo",
//       "jt.ClassID",
//       "jt.MethodID",
//       "jt.ItemID",
//       "jt.WorkerGroupID",
//       "bi.ItemName",
//       "bw.WorkerGroupName",
//       "jt.DeviceID",
//       "bd.DeviceTypeID",
//       "bd.DeviceName",
//       "dmlb.UnitID",
//       "bu.UnitName",
//       "bc.CusName",
//       "dmlb.UnitID",
//       "bu.UnitName",
//       "dmlb.CusID",
//       "dmlb.POL",
//       "dmlb.POD",
//       "dmlb.FPOD",
//       "dmlb.JobModeID",
//       "bjm.JobModeName",
//       "dbs.TLHQ",
//       "dvv.VesselID",
//       "dvv.ATA",
//       "dv.NationID",
//       "bn.NationName",
//       "bi.CargoTypeID",
//       "bcg.CargoTypeName"
//     );
//   query = FunctionModel.KnexWhere(query, req.body.filter, "jt");
//   return (await query.catch((err) => console.log(err))) || [];
// };

module.exports.LoadReportTally = async (req) => {
  let query = req
    .gtos("JOB_TALLY as jt")
    .leftJoin("DT_VESSEL_VISIT as dvv", "jt.VoyageKey", "dvv.VoyageKey")
    .leftJoin("DT_MNF_LD_BULK as dmlb", function () {
      this.on(
        req.gtos.raw(
          "ISNULL(jt.BillOfLading, jt.BookingNo) = ISNULL(dmlb.BillOfLading, dmlb.BookingNo) AND jt.JobModeID = dmlb.JobModeID"
        )
      );
    })
    .leftJoin("BS_CUSTOMER as bc", "dmlb.CusID", "bc.CusID")
    .leftJoin("BS_JOB_MODE as bjm", "jt.JobModeID", "bjm.JobModeID")
    .leftJoin("BS_ITEM as bi", "jt.ItemID", "bi.ItemID")
    .leftJoin("BS_UNIT as bu", "dmlb.UnitID", "bu.UnitID")
    .leftJoin("BS_DEVICE as bd", "jt.DeviceID", "bd.DeviceID")
    .leftJoin("BS_WORKER_GROUP as bwg", "jt.WorkerGroupID", "bwg.WorkerGroupID")
    .leftJoin("DT_VESSEL as dv", "dvv.VesselID", "dv.VesselID")
    .leftJoin("BS_NATIONAL as bn", "dv.NationID", "bn.NationID")
    .leftJoin("BS_CARGOTYPE as bct", "bi.CargoTypeID", "bct.CargoTypeID")
    .select(
      "dvv.VoyageKey",
      "jt.BillOfLading",
      "jt.BookingNo",
      "dmlb.CusID",
      "bc.CusName",
      "jt.ClassID",
      "jt.JobModeID",
      "bjm.JobModeName",
      "jt.MethodID",
      "jt.ItemID",
      "bi.ItemName",
      "dmlb.UnitID",
      "bu.UnitName",
      req.gtos.raw("SUM(jt.Quantity) AS TotalQuantity"),
      req.gtos.raw("SUM(jt.McWeight) AS TotalMcWeight"),
      req.gtos.raw("Max(jt.CreateTime) AS CreateTime"),
      "bd.DeviceTypeID",
      "jt.DeviceID",
      "bd.DeviceName",
      "jt.WorkerGroupID",
      "bwg.WorkerGroupName",
      "dmlb.POL",
      "dmlb.POD",
      "dmlb.FPOD",
      "dmlb.TLHQ",
      req.gtos.raw("MAX(jt.Note) AS Note"),
      "dvv.VesselID",
      "dvv.ATA",
      "dv.NationID",
      "bn.NationName",
      "bi.CargoTypeID",
      "bct.CargoTypeName"
    )
    .where("dvv.VoyageKey", req.body.VoyageKey)
    .groupBy(
      "dvv.VoyageKey",
      "jt.BillOfLading",
      "jt.BookingNo",
      "dmlb.CusID",
      "bc.CusName",
      "jt.ClassID",
      "jt.JobModeID",
      "bjm.JobModeName",
      "jt.MethodID",
      "jt.ItemID",
      "bi.ItemName",
      "dmlb.UnitID",
      "bu.UnitName",
      "bd.DeviceTypeID",
      "jt.DeviceID",
      "bd.DeviceName",
      "dmlb.POL",
      "dmlb.POD",
      "dmlb.FPOD",
      "dmlb.TLHQ",
      "jt.WorkerGroupID",
      "dvv.VesselID",
      "dvv.ATA",
      "dv.NationID",
      "bn.NationName",
      "bi.CargoTypeID",
      "bct.CargoTypeName",
      "bwg.WorkerGroupName"
    );

  query = FunctionModel.KnexWhere(query, req.body.filter, "jt");

  return (await query.catch((err) => console.log(err))) || [];
};
