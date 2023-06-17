const FunctionModel = require("../models/FunctionModel");
const { gtos, gtosglobal } = require("../config/database");
const moment = require("moment-timezone");

// module.exports.LoadReportTally = async (req) => {
//   let query = req
//     .gtos("JOB_TALLY")
//     .select(
//       "JOB_TALLY.VoyageKey",
//       "JOB_TALLY.BillOfLading",
//       "JOB_TALLY.BookingNo",
//       "JOB_TALLY.ClassID",
//       "JOB_YARD.Quantity",
//       "BS_CLASS.ClassName",
//       "DT_MNF_LD_BULK.JobModeID",
//       "BS_JOB_MODE.JobModeName",
//       "DT_VESSEL_VISIT.ATA",
//       "DT_VESSEL_VISIT.ATD",
//       "JOB_YARD.McWeight as YardMcWeight",
//       "DT_MNF_LD_BULK.UnitID",
//       "BS_UNIT.UnitName",
//       "DT_VESSEL_VISIT.VesselID",
//       "DT_VESSEL.NationID",
//       "BS_NATIONAL.NationName",
//       "DT_MANIFEST.POL",
//       "DT_MANIFEST.POD",
//       "BS_ITEM.CargoTypeID",
//       "BS_CARGOTYPE.CargoTypeName",
//       "DT_MNF_LD_BULK.ItemID"
//     )
//     .leftJoin("BS_CLASS", "BS_CLASS.ClassID", "JOB_TALLY.ClassID")
//     .leftJoin("DT_MNF_LD_BULK", function () {
//       this.on(
//         "JOB_TALLY.BillOfLading",
//         "=",
//         "DT_MNF_LD_BULK.BillOfLading"
//       ).orOn("JOB_TALLY.BookingNo", "=", "DT_MNF_LD_BULK.BookingNo");
//     })
//     .leftJoin(
//       "BS_JOB_MODE",
//       "BS_JOB_MODE.JobModeID",
//       "DT_MNF_LD_BULK.JobModeID"
//     )
//     .leftJoin(
//       "DT_VESSEL_VISIT",
//       "DT_VESSEL_VISIT.VoyageKey",
//       "JOB_TALLY.VoyageKey"
//     )
//     // .leftJoin("JOB_YARD", "JOB_YARD.RefRowguid", "JOB_TALLY.RefRowguid")
//     .leftJoin("JOB_YARD", function () {
//       this.on("JOB_TALLY.BillOfLading", "=", "JOB_YARD.BillOfLading").orOn(
//         "JOB_TALLY.BookingNo",
//         "=",
//         "JOB_YARD.BookingNo"
//       );
//     })
//     .leftJoin("BS_UNIT", "BS_UNIT.UnitID", "DT_MNF_LD_BULK.UnitID")
//     .leftJoin("DT_VESSEL", "DT_VESSEL.VesselID", "DT_VESSEL_VISIT.VesselID")
//     .leftJoin("BS_NATIONAL", "BS_NATIONAL.NationID", "DT_VESSEL.NationID")
//     .leftJoin("DT_MANIFEST", function () {
//       this.on("JOB_TALLY.BillOfLading", "=", "DT_MANIFEST.BillOfLading").orOn(
//         "JOB_TALLY.BookingNo",
//         "=",
//         "DT_MANIFEST.BookingNo"
//       );
//     })
//     .leftJoin("BS_ITEM", "BS_ITEM.ItemID", "DT_MNF_LD_BULK.ItemID")
//     .leftJoin("BS_CARGOTYPE", "BS_CARGOTYPE.CargoTypeID", "BS_ITEM.CargoTypeID")
//     .where("DT_VESSEL_VISIT.VoyageKey", req.body.VoyageKey)
//     .whereIn("DT_MNF_LD_BULK.JobModeID", ["XTAU", "NTAU"])
//     .whereNotNull("JOB_YARD.McWeight")
//     .groupBy(
//       "JOB_TALLY.VoyageKey",
//       "JOB_TALLY.BillOfLading",
//       "JOB_TALLY.BookingNo",
//       "JOB_TALLY.ClassID",
//       "JOB_YARD.Quantity",
//       "BS_CLASS.ClassName",
//       "DT_MNF_LD_BULK.JobModeID",
//       "BS_JOB_MODE.JobModeName",
//       "DT_VESSEL_VISIT.ATA",
//       "DT_VESSEL_VISIT.ATD",
//       "JOB_YARD.McWeight",
//       "DT_MNF_LD_BULK.UnitID",
//       "BS_UNIT.UnitName",
//       "DT_VESSEL_VISIT.VesselID",
//       "DT_VESSEL.NationID",
//       "BS_NATIONAL.NationName",
//       "DT_MANIFEST.POL",
//       "DT_MANIFEST.POD",
//       "BS_ITEM.CargoTypeID",
//       "BS_CARGOTYPE.CargoTypeName",
//       "DT_MNF_LD_BULK.ItemID"
//     );
//   query = FunctionModel.KnexWhere(query, req.body.filter, "JOB_TALLY");
//   return (await query.catch((err) => console.log(err))) || [];
// };

module.exports.LoadReportTally = async (req) => {
  let query = req
    .gtos("JOB_TALLY")
    .select(
      "JOB_TALLY.VoyageKey",
      "JOB_TALLY.BillOfLading",
      "JOB_TALLY.BookingNo",
      "JOB_TALLY.ClassID",
      "BS_CLASS.ClassName",
      "DT_MNF_LD_BULK.JobModeID",
      "DT_MNF_LD_BULK.UnitID",
      "DT_MNF_LD_BULK.ItemID",
      "BS_JOB_MODE.JobModeName",
      "DT_VESSEL_VISIT.ATA",
      "DT_VESSEL_VISIT.ATD",
      "M.ItemID",
      "M.Quantity",
      req.gtos.raw("ROUND(M.McWeight, 2) as McWeight"),
      "BS_UNIT.UnitName",
      "DT_VESSEL_VISIT.VesselID",
      "DT_VESSEL.NationID",
      "BS_NATIONAL.NationName",
      "DT_MANIFEST.POL",
      "DT_MANIFEST.POD",
      "BS_ITEM.CargoTypeID",
      "BS_CARGOTYPE.CargoTypeName"
    )
    .leftJoin("BS_CLASS", "BS_CLASS.ClassID", "=", "JOB_TALLY.ClassID")
    .leftJoin("DT_MNF_LD_BULK", function () {
      this.on(
        req.gtos.raw(
          "(JOB_TALLY.BillOfLading != '' AND JOB_TALLY.BillOfLading = DT_MNF_LD_BULK.BillOfLading) OR (JOB_TALLY.BookingNo != '' AND JOB_TALLY.BookingNo = DT_MNF_LD_BULK.BookingNo)"
        )
      );
    })
    .leftJoin(
      "BS_JOB_MODE",
      "BS_JOB_MODE.JobModeID",
      "=",
      "DT_MNF_LD_BULK.JobModeID"
    )
    .leftJoin(
      "DT_VESSEL_VISIT",
      "DT_VESSEL_VISIT.VoyageKey",
      "=",
      "JOB_TALLY.VoyageKey"
    )
    .leftJoin("BS_UNIT", "BS_UNIT.UnitID", "=", "DT_MNF_LD_BULK.UnitID")
    .leftJoin(
      "DT_VESSEL",
      "DT_VESSEL.VesselID",
      "=",
      "DT_VESSEL_VISIT.VesselID"
    )
    .leftJoin("BS_NATIONAL", "BS_NATIONAL.NationID", "=", "DT_VESSEL.NationID")
    .leftJoin("DT_MANIFEST", function () {
      this.on(
        req.gtos.raw(
          "(JOB_TALLY.BillOfLading != '' AND JOB_TALLY.BillOfLading = DT_MANIFEST.BillOfLading) OR (JOB_TALLY.BookingNo != '' AND JOB_TALLY.BookingNo = DT_MANIFEST.BookingNo)"
        )
      );
    })
    .leftJoin("BS_ITEM", "BS_ITEM.ItemID", "=", "DT_MNF_LD_BULK.ItemID")
    .leftJoin(
      "BS_CARGOTYPE",
      "BS_CARGOTYPE.CargoTypeID",
      "=",
      "BS_ITEM.CargoTypeID"
    )
    .leftJoin(
      function () {
        this.select(
          "JOB_YARD.ItemID",
          "JOB_TALLY.BillOfLading",
          "JOB_TALLY.BookingNo"
        )
          .sum("JOB_YARD.Quantity as Quantity")
          .sum("JOB_YARD.McWeight as McWeight")
          .from("JOB_TALLY")
          .leftJoin("JOB_YARD", function () {
            this.on(
              req.gtos.raw(
                "(JOB_TALLY.BillOfLading != '' AND JOB_TALLY.BillOfLading = JOB_YARD.BillOfLading) OR (JOB_TALLY.BookingNo != '' AND JOB_TALLY.BookingNo = JOB_YARD.BookingNo)"
              )
            );
          })
          .groupBy(
            "JOB_TALLY.BillOfLading",
            "JOB_TALLY.BookingNo",
            "JOB_YARD.ItemID"
          )
          .as("M");
      },
      "JOB_TALLY.BillOfLading",
      "=",
      "M.BillOfLading"
    )
    .where("DT_VESSEL_VISIT.VoyageKey", req.body.VoyageKey)
    .whereIn("DT_MNF_LD_BULK.JobModeID", ["XTAU", "NTAU"])
    .groupBy(
      "JOB_TALLY.VoyageKey",
      "JOB_TALLY.BillOfLading",
      "JOB_TALLY.BookingNo",
      "JOB_TALLY.ClassID",
      "BS_CLASS.ClassName",
      "DT_MNF_LD_BULK.JobModeID",
      "DT_MNF_LD_BULK.UnitID",
      "DT_MNF_LD_BULK.ItemID",
      "BS_JOB_MODE.JobModeName",
      "DT_VESSEL_VISIT.ATA",
      "DT_VESSEL_VISIT.ATD",
      "M.ItemID",
      "M.Quantity",
      "M.McWeight",
      "BS_UNIT.UnitName",
      "DT_VESSEL_VISIT.VesselID",
      "DT_VESSEL.NationID",
      "BS_NATIONAL.NationName",
      "DT_MANIFEST.POL",
      "DT_MANIFEST.POD",
      "BS_ITEM.CargoTypeID",
      "BS_CARGOTYPE.CargoTypeName"
    );
  query = FunctionModel.KnexWhere(query, req.body.filter, "JOB_TALLY");
  // return (await query.catch((err) => console.log(err))) || [];
  const result = (await query.catch((err) => console.log(err))) || [];

  // Định dạng lại giá trị M.McWeight trong kết quả
  result.forEach((row) => {
    row.McWeight = row.McWeight.toFixed(2);
  });

  return result;
};
