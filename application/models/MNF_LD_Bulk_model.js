const FunctionModel = require("../models/FunctionModel");
const { gtos, gtosglobal } = require("../config/database");
const moment = require("moment-timezone");

// module.exports.LoadManiFestBulk = async (req) => {
//   let query = req
//     .gtos("DT_MNF_LD_BULK")
//     .select(
//       "DT_MNF_LD_BULK.*",
//       "BS_CLASS.ClassName",
//       "BS_ITEM.ItemName",
//       "BS_ITEM.CargoTypeID",
//       "BS_CARGOTYPE.CargoTypeName",
//       "DT_BLOCK_STOCK.Quantity",
//       "DT_BLOCK_STOCK.McWeight",
//       "BS_UNIT.UnitName",
//       "BS_CUSTOMER_TYPE.CusTypeName",
//       "BS_JOB_MODE.JobModeName",
//       "BS_METHOD.MethodName"
//     )

//     .leftJoin("BS_CLASS", "BS_CLASS.ClassID", "DT_MNF_LD_BULK.ClassID")
//     .leftJoin("BS_ITEM", "BS_ITEM.ItemID", "DT_MNF_LD_BULK.ItemID")
//     .leftJoin("BS_CARGOTYPE", "BS_CARGOTYPE.CargoTypeID", "BS_ITEM.CargoTypeID")
//     .leftJoin("DT_BLOCK_STOCK", function () {
//       this.on(
//         "DT_MNF_LD_BULK.VoyageKey",
//         "=",
//         "DT_BLOCK_STOCK.VoyageKey"
//       ).andOn("DT_MNF_LD_BULK.ClassID", "=", "DT_BLOCK_STOCK.ClassID");
//     })
//     .leftJoin("BS_UNIT", "BS_UNIT.UnitID", "DT_MNF_LD_BULK.UnitID")
//     .leftJoin(
//       "BS_CUSTOMER_TYPE",
//       "BS_CUSTOMER_TYPE.CusTypeID",
//       "DT_MNF_LD_BULK.CusTypeID"
//     )
//     .leftJoin(
//       "BS_JOB_MODE",
//       "BS_JOB_MODE.JobModeID",
//       "DT_MNF_LD_BULK.JobModeID"
//     )
//     .leftJoin("BS_METHOD", "BS_METHOD.MethodID", "DT_MNF_LD_BULK.MethodID");
//   query = FunctionModel.KnexWhere(query, req.body.filter, "DT_MNF_LD_BULK");
//   return (await query.catch((err) => console.log(err))) || [];
// };

module.exports.LoadManiFestBulk = async (req) => {
  let query = req
    .gtos("DT_MNF_LD_BULK")
    .select(
      "DT_MNF_LD_BULK.*",
      "BS_CLASS.ClassName",
      "BS_ITEM.ItemName",
      "BS_ITEM.CargoTypeID",
      "BS_CARGOTYPE.CargoTypeName",
      req.gtos.raw("SUM(DT_BLOCK_STOCK.Quantity) as TotalQuantity"),
      req.gtos.raw("SUM(DT_BLOCK_STOCK.McWeight) as TotalMcWeight"),
      req.gtos.raw("SUM(DT_BLOCK_STOCK.Volume) as TotalVolume"),
      "BS_UNIT.UnitName",
      "BS_CUSTOMER_TYPE.CusTypeName",
      "BS_JOB_MODE.JobModeName",
      "BS_METHOD.MethodName",
      "BS_CUSTOMER.CusName"
    )
    .leftJoin("BS_CUSTOMER", "BS_CUSTOMER.CusID", "DT_MNF_LD_BULK.CusID")
    .leftJoin("BS_CLASS", "BS_CLASS.ClassID", "DT_MNF_LD_BULK.ClassID")
    .leftJoin("BS_ITEM", "BS_ITEM.ItemID", "DT_MNF_LD_BULK.ItemID")
    .leftJoin("BS_CARGOTYPE", "BS_CARGOTYPE.CargoTypeID", "BS_ITEM.CargoTypeID")
    .leftJoin("DT_BLOCK_STOCK", function () {
      this.on(
        "DT_MNF_LD_BULK.VoyageKey",
        "=",
        "DT_BLOCK_STOCK.VoyageKey"
      ).andOn("DT_MNF_LD_BULK.ClassID", "=", "DT_BLOCK_STOCK.ClassID");
    })
    .leftJoin("BS_UNIT", "BS_UNIT.UnitID", "DT_MNF_LD_BULK.UnitID")
    .leftJoin(
      "BS_CUSTOMER_TYPE",
      "BS_CUSTOMER_TYPE.CusTypeID",
      "DT_MNF_LD_BULK.CusTypeID"
    )
    .leftJoin(
      "BS_JOB_MODE",
      "BS_JOB_MODE.JobModeID",
      "DT_MNF_LD_BULK.JobModeID"
    )
    .leftJoin("BS_METHOD", "BS_METHOD.MethodID", "DT_MNF_LD_BULK.MethodID")
    .whereNot("DT_MNF_LD_BULK.ClassID", "2")
    .groupBy(
      "DT_MNF_LD_BULK.rowguid",
      "DT_MNF_LD_BULK.LDStatus",
      "DT_MNF_LD_BULK.VoyageKey",
      "DT_MNF_LD_BULK.ClassID",
      "DT_MNF_LD_BULK.IsLocalForeign",
      "DT_MNF_LD_BULK.BillOfLading",
      "DT_MNF_LD_BULK.BookingNo",
      "DT_MNF_LD_BULK.Sequence",
      "DT_MNF_LD_BULK.JobModeID",
      "DT_MNF_LD_BULK.MethodID",
      "DT_MNF_LD_BULK.CargoTypeID",
      "DT_MNF_LD_BULK.CargoWeight",
      "DT_MNF_LD_BULK.Quantity",
      "DT_MNF_LD_BULK.UnitID",
      "DT_MNF_LD_BULK.CntrNo",
      "DT_MNF_LD_BULK.IsInOrdEirBulk",
      "DT_MNF_LD_BULK.CommodityDescription",
      "DT_MNF_LD_BULK.CreatedBy",
      "DT_MNF_LD_BULK.ModifiedBy",
      "DT_MNF_LD_BULK.UpdateTime",
      "DT_MNF_LD_BULK.CreateTime",
      "DT_MNF_LD_BULK.ItemID",
      "DT_MNF_LD_BULK.CusID",
      "DT_MNF_LD_BULK.CusTypeID",
      "DT_MNF_LD_BULK.Volume",
      "DT_MNF_LD_BULK.Remark",
      "DT_MNF_LD_BULK.TransitID",
      "DT_MNF_LD_BULK.PlanBlock",
      "DT_MNF_LD_BULK.PlanBy",
      "DT_MNF_LD_BULK.PlanTime",
      "DT_MNF_LD_BULK.LDStatus",
      "BS_CLASS.ClassName",
      "BS_ITEM.ItemName",
      "BS_ITEM.CargoTypeID",
      "BS_CARGOTYPE.CargoTypeName",
      "BS_UNIT.UnitName",
      "BS_CUSTOMER_TYPE.CusTypeName",
      "BS_JOB_MODE.JobModeName",
      "BS_METHOD.MethodName",
      "BS_CUSTOMER.CusName"
    );

  query = FunctionModel.KnexWhere(query, req.body.filter, "DT_MNF_LD_BULK");
  return (await query.catch((err) => console.log(err))) || [];
};

module.exports.LoadBill = async (req) => {
  let query = req
    .gtos("DT_MNF_LD_BULK")
    .select(
      "DT_MNF_LD_BULK.VoyageKey",
      "DT_MNF_LD_BULK.BillOfLading",
      "DT_VESSEL_VISIT.VesselName",
      "DT_VESSEL_VISIT.InboundVoyage",
      "DT_VESSEL_VISIT.OutboundVoyage"
    )
    .leftJoin(
      "DT_VESSEL_VISIT",
      "DT_VESSEL_VISIT.VoyageKey",
      "DT_MNF_LD_BULK.VoyageKey"
    )
    .where("DT_MNF_LD_BULK.BillOfLading", req.body.BillOfLand);
  query = FunctionModel.KnexWhere(query, req.body.filter, "DT_MNF_LD_BULK");
  return (await query.catch((err) => console.log(err))) || [];
};
