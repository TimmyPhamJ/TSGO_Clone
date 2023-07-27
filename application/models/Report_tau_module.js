const FunctionModel = require("../models/FunctionModel");
const { gtos, gtosglobal } = require("../config/database");
const moment = require("moment-timezone");

module.exports.LoadReportTally = async (req) => {
  let query = req.gtos.raw(
    `select BS_METHOD.MethodName,DT_MNF_LD_BULK.CargoWeight as MNFMcWeight,DT_MNF_LD_BULK.Quantity as MNFQuantity,[JOB_TALLY].[VoyageKey],TPOL.PortName as POLName,TPOD.PortName as PODName,DT_BLOCK_STOCK.QuantityIn,DT_BLOCK_STOCK.McWeightIn,DT_BLOCK_STOCK.QuantityOut,DT_BLOCK_STOCK.McWeightOut, [JOB_TALLY].[BillOfLading], [JOB_TALLY].[BookingNo], [JOB_TALLY].[ClassID], [BS_CLASS].[ClassName], [DT_MNF_LD_BULK].[JobModeID], [DT_MNF_LD_BULK].[UnitID], [DT_MNF_LD_BULK].[ItemID], [BS_JOB_MODE].[JobModeName], [DT_VESSEL_VISIT].[ATA], [DT_VESSEL_VISIT].[ATD],  SUM([JOB_TALLY].[Quantity]) tallyQuantity, SUM([JOB_TALLY].[McWeight]) tallyMcWeight, [BS_UNIT].[UnitName], [DT_VESSEL_VISIT].[VesselID], [DT_VESSEL].[NationID], [BS_NATIONAL].[NationName], [DT_MNF_LD_BULK].[POL], [DT_MNF_LD_BULK].[POD], [BS_ITEM].[CargoTypeID], [BS_CARGOTYPE].[CargoTypeName] 	
    from [JOB_TALLY] 	
    left join [BS_CLASS] on [BS_CLASS].[ClassID] = [JOB_TALLY].[ClassID] 	
    left join [DT_MNF_LD_BULK] on (JOB_TALLY.BillOfLading != '' AND JOB_TALLY.BillOfLading = DT_MNF_LD_BULK.BillOfLading) OR (JOB_TALLY.BookingNo != '' AND JOB_TALLY.BookingNo = DT_MNF_LD_BULK.BookingNo) 	
    left join [BS_JOB_MODE] on [BS_JOB_MODE].[JobModeID] = [DT_MNF_LD_BULK].[JobModeID] 	
    left join [BS_METHOD] on [BS_METHOD].[MethodID] = [DT_MNF_LD_BULK].[MethodID] 	
    left join [DT_VESSEL_VISIT] on [DT_VESSEL_VISIT].[VoyageKey] = [JOB_TALLY].[VoyageKey] 	
    left join [BS_UNIT] on [BS_UNIT].[UnitID] = [DT_MNF_LD_BULK].[UnitID] 	
    left join [DT_VESSEL] on [DT_VESSEL].[VesselID] = [DT_VESSEL_VISIT].[VesselID] 	
    left join [BS_NATIONAL] on [BS_NATIONAL].[NationID] = [DT_VESSEL].[NationID] 	
    left join [BS_ITEM] on [BS_ITEM].[ItemID] = [DT_MNF_LD_BULK].[ItemID] 	
    left join [BS_CARGOTYPE] on [BS_CARGOTYPE].[CargoTypeID] = [BS_ITEM].[CargoTypeID]     	
    left join [BS_PORT] as TPOL on TPOL.[PortID] = [DT_MNF_LD_BULK].[POL] 	
    left join [BS_PORT] as TPOD on TPOD.[PortID] = [DT_MNF_LD_BULK].[POD] 	
    left join DT_BLOCK_STOCK on DT_BLOCK_STOCK.ClassID = [JOB_TALLY].ClassID and DT_BLOCK_STOCK.VoyageKey = [JOB_TALLY].VoyageKey and (DT_BLOCK_STOCK.JobModeIn = [JOB_TALLY].JobModeID OR DT_BLOCK_STOCK.JobModeOut = [JOB_TALLY].JobModeID)  	
    where [DT_VESSEL_VISIT].[VoyageKey] = :VoyageKey ${
      req.body.ClassID == "1"
        ? ` and [JOB_TALLY].[ClassID] = '1'`
        : req.body.ClassID == "2"
        ? ` and [JOB_TALLY].[ClassID] = '2'`
        : ""
    } 	
    group by BS_METHOD.MethodName,DT_MNF_LD_BULK.CargoWeight,DT_MNF_LD_BULK.Quantity,[JOB_TALLY].[VoyageKey],TPOL.PortName,TPOD.PortName,DT_BLOCK_STOCK.QuantityIn,DT_BLOCK_STOCK.McWeightIn,DT_BLOCK_STOCK.QuantityOut,DT_BLOCK_STOCK.McWeightOut, [JOB_TALLY].[BillOfLading], [JOB_TALLY].[BookingNo], [JOB_TALLY].[ClassID], [BS_CLASS].[ClassName], [DT_MNF_LD_BULK].[JobModeID], [DT_MNF_LD_BULK].[UnitID], [DT_MNF_LD_BULK].[ItemID], [BS_JOB_MODE].[JobModeName], [DT_VESSEL_VISIT].[ATA], [DT_VESSEL_VISIT].[ATD],  [BS_UNIT].[UnitName], [DT_VESSEL_VISIT].[VesselID], [DT_VESSEL].[NationID], [BS_NATIONAL].[NationName], [DT_MNF_LD_BULK].[POL], [DT_MNF_LD_BULK].[POD], [BS_ITEM].[CargoTypeID], [BS_CARGOTYPE].[CargoTypeName]`,
    { VoyageKey: req.body.VoyageKey || "" }
  );
  //query = FunctionModel.KnexWhere(query, req.body.filter, "JOB_TALLY");
  // console.log(query.toString());
  // return (await query.catch((err) => console.log(err))) || [];
  const result = (await query.catch((err) => console.log(err))) || [];
  return result;
};

/*********************** DT_VESSEL_VISIT ***********************/
module.exports.loadVesselVisitReport = async (req) => {
  let query = req
    .gtos("DT_VESSEL_VISIT")
    .leftJoin("DT_VESSEL", "DT_VESSEL.VesselID", "DT_VESSEL_VISIT.VesselID")
    .leftJoin("BS_OPR", "BS_OPR.OprID", "DT_VESSEL_VISIT.OprID")
    .leftJoin("BS_PORT as LP", "LP.PortID", "DT_VESSEL_VISIT.LastPort")
    .leftJoin("BS_PORT as NP", "NP.PortID", "DT_VESSEL_VISIT.NextPort")
    .leftJoin("BS_LANE as LN", "LN.LaneID", "DT_VESSEL_VISIT.InLane")
    .select(
      "DT_VESSEL_VISIT.*",
      //,'DT_VESSEL.VesselName'
      "DT_VESSEL.IMO",
      "BS_OPR.OprName",
      "LP.PortName as LastPortName",
      "NP.PortName as NextPortName",
      "LN.PortList"
    )
    .orderBy("CreateTime", "desc");
  query = FunctionModel.KnexWhere(query, req.body.filter, "DT_VESSEL_VISIT");
  return (await query.catch((err) => console.log(err))) || [];
};

//Thoilc(*Note)-Báo cáo tồn kho
module.exports.loadDataStock = async (req) => {
  var response = {
    iStatus: false,
    iPayload: [],
    iMessage: "",
  };

  if (Number(req.query.numDay) < 0) {
    response["iStatus"] = false;
    response["iMessage"] = "Hiện tại số ngày bạn cung cấp chưa đúng!";
    return response;
  }

  if (!req.query.selectDay) {
    response["iStatus"] = false;
    response["iMessage"] =
      "Vui lòng chọn số ngày tồn bãi trước khi nạp dữ liệu!";
    return response;
  }

  let query = req
    .gtos("DT_BLOCK_STOCK AS dtStock")
    .select(
      "dtStock.rowguid",
      "dtStock.Block",
      "dtStock.ClassID",
      "dtVessel.VesselName",
      "dtVessel.InboundVoyage",
      "dtVessel.OutboundVoyage",
      "dtStock.GetIn",
      "dtStock.BBNo",
      "dtStock.CusID",
      "bsCus.CusName",
      "dtStock.ItemID",
      "bsCargoType.CargoTypeName",
      "bsUnit.UnitName",
      "dtMnf.Quantity as mnfQuantity",
      "dtMnf.CargoWeight",
      "dtStock.Quantity as stQuantity",
      "dtStock.McWeight",
      "dtStock.Volume",
      "dtStock.TLHQ",
      "dtStock.IsLocalForeign",
      "dtStock.Note"
    )
    .leftJoin("BS_ITEM AS bsItem", "bsItem.ItemID", "dtStock.ItemID")
    .leftJoin("BS_CUSTOMER AS bsCus", "bsCus.CusID", "dtStock.CusID")
    .leftJoin("DT_MNF_LD_BULK AS dtMnf", function () {
      this.on("dtMnf.VoyageKey", "dtStock.VoyageKey").on(
        req.gtos.raw("ISNULL(dtMnf.BillOfLading,dtMnf.BookingNo)"),
        "dtStock.BBNo"
      );
    })
    .leftJoin(
      "DT_VESSEL_VISIT AS dtVessel",
      "dtVessel.VoyageKey",
      "dtStock.VoyageKey"
    )
    .leftJoin(
      "BS_CARGOTYPE AS bsCargoType",
      "bsCargoType.CargoTypeID",
      "bsItem.CargoTypeID"
    )
    .leftJoin("BS_UNIT AS bsUnit", "bsUnit.UnitID", "dtMnf.UnitID");
  if (req.query.VoyageKey) {
    query = query.where("dtStock.VoyageKey", req.query.VoyageKey);
  }
  if (req.query.IsLocalForeign) {
    query = query.where("dtStock.IsLocalForeign", req.query.IsLocalForeign);
  }
  if (req.query.CusID) {
    query = query.where("dtStock.CusID", req.query.CusID);
  }
  if (req.query.ClassID) {
    query = query.where("dtStock.ClassID", Number(req.query.ClassID));
  }
  if (req.query.cargoTypeID) {
    query = query.where("bsItem.CargoTypeID", req.query.cargoTypeID);
  }
  if (req.query.GetIn) {
    query = query.where("dtStock.GetIn", "<", req.query.GetIn);
  }
  // console.log(query.toString());
  query = (await query.catch((err) => console.log(err))) || [];
  if (query.length) {
    let dataNew = query.map((item) => {
      let numDaysStock = Math.round((moment() - item.GetIn) / 86400000 + 1);
      return {
        ...item,
        UnitName: item.UnitName ? item.UnitName : "",
        GetIn: moment(item.GetIn).format("DD/MM/YYYY HH:mm:ss"),
        IsLocalForeign: item.IsLocalForeign === "F" ? "Ngoại" : "Nội",
        ClassID: item.ClassID === 1 ? "Nhập" : "Xuất",
        TLHQ: item.TLHQ ? "Đã thanh lý" : "Chưa thanh lý",
        numDaysStock: numDaysStock,
      };
    });
    let arr = [];
    for (let i = 0; i < dataNew.length; i++) {
      if (dataNew[i].stQuantity > 0) {
        if (req.query.selectDay >= "gt") {
          if (dataNew[i].numDaysStock >= Number(req.query.numDay)) {
            arr.push(dataNew[i]);
          }
        }

        if (req.query.selectDay < "lt") {
          if (dataNew[i].numDaysStock < Number(req.query.numDay)) {
            arr.push(dataNew[i]);
          }
        }

        if (req.query.selectDay == "eq") {
          if (dataNew[i].numDaysStock == Number(req.query.numDay)) {
            arr.push(dataNew[i]);
          }
        }
      }
    }
    if (arr.length) {
      response["iStatus"] = true;
      response["iPayload"] = arr;
      response["iMessage"] = "Load dữ liệu thành công!";
      return response;
    } else {
      response["iStatus"] = false;
      response["iPayload"] = [];
      response["iMessage"] = "Không có dữ liệu!";
      return response;
    }
  } else {
    response["iStatus"] = false;
    response["iPayload"] = [];
    response["iMessage"] = "Không có dữ liệu!";
    return response;
  }
};

//Thoilc(*Note)-Báo cáo khai thác cầu bến
module.exports.loadDataBerth = async (req) => {
  var response = {
    iStatus: false,
    iPayload: [],
    iMessage: "",
  };

  let query = req
    .gtos("DT_VESSEL_VISIT AS dtVesselVisit")
    .select(
      "dtVesselVisit.rowguid",
      "dtVesselVisit.VesselName",
      "bsNational.NationName",
      "dtVesselVisit.InboundVoyage",
      "dtVesselVisit.OutboundVoyage",
      "dtVesselVisit.BerthID",
      "dtVesselVisit.BittID",
      "dtBlockStock.McWeightIn",
      "dtVesselVisit.ATB",
      "dtVesselVisit.ATD",
      "dtVesselVisit.CargoRemark",
      "dtVesselVisit.JobModeRemark",
      "dtVesselVisit.DeviceRemark",
      "dtVessel.LOA",
      "bsBerth.PosFrom",
      "dtVesselVisit.ATWD",
      "dtVesselVisit.ATWL",
      "dtVesselVisit.ATCL",
      "dtVesselVisit.ATCD",
      "dtVesselVisit.AlongSide",
      "dtVesselVisit.Remark"
    )
    .leftJoin(
      "DT_VESSEL as dtVessel",
      "dtVesselVisit.VesselName",
      "dtVessel.VesselName"
    )
    .leftJoin(
      "BS_NATIONAL as bsNational",
      "dtVessel.NationID",
      "bsNational.NationID"
    )
    .leftJoin(
      function () {
        this.select("dtBlockStock.VoyageKey")
          .sum("dtBlockStock.McWeightIn AS McWeightIn")
          .from("DT_BLOCK_STOCK AS dtBlockStock")
          .groupBy("dtBlockStock.VoyageKey")
          .as("dtBlockStock");
      },
      "dtBlockStock.VoyageKey",
      "dtVesselVisit.VoyageKey"
    )
    .leftJoin(
      "BS_BERTH as bsBerth",
      "dtVesselVisit.BerthID",
      "bsBerth.BerthID"
    );
  if (req.query.VoyageKey) {
    query = query.where("dtVesselVisit.VoyageKey", req.query.VoyageKey);
  }
  if (req.query.GetIn && req.query.GetOut) {
    query = query
      .where("dtVesselVisit.ATB", ">=", req.query.GetIn)
      .where("dtVesselVisit.ATB", "<", req.query.GetOut);
  }
  // console.log(query.toString());
  query = (await query.catch((err) => console.log(err))) || [];
  if (query.length) {
    let dataNew = query.map((item) => {
      return {
        ...item,
        McWeightIn: item.McWeightIn ? item.McWeightIn.toFixed(3) : "",
        ATB: item.ATB ? moment.utc(item.ATB).format("DD/MM/YYYY HH:mm:ss") : "",
        ATD: item.ATD ? moment.utc(item.ATD).format("DD/MM/YYYY HH:mm:ss") : "",
        ATWD: item.ATWD
          ? moment.utc(item.ATWD).format("DD/MM/YYYY HH:mm:ss")
          : "",
        ATWL: item.ATWL
          ? moment.utc(item.ATWL).format("DD/MM/YYYY HH:mm:ss")
          : "",
        ATCL: item.ATCL
          ? moment.utc(item.ATCL).format("DD/MM/YYYY HH:mm:ss")
          : "",
        ATCD: item.ATCD
          ? moment.utc(item.ATCD).format("DD/MM/YYYY HH:mm:ss")
          : "",
        AlongSide:
          item.AlongSide === "L"
            ? "Trái"
            : item.AlongSide === "R"
            ? "Phải"
            : "",
        TotalHours: item.ATD ? ((item.ATD - item.ATB) / 3600000).toFixed(3) : 0,
      };
    });
    response["iStatus"] = true;
    response["iPayload"] = dataNew;
    response["iMessage"] = "Load dữ liệu thành công!";
    return response;
  } else {
    response["iStatus"] = false;
    response["iPayload"] = [];
    response["iMessage"] = "Không có dữ liệu!";
    return response;
  }
};
