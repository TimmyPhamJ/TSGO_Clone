const { resolve } = require("path");
const FunctionModel = require("./FunctionModel.js");
const moment = require("moment-timezone");
const { rejects } = require("assert");

/*********************** VesselChart */
module.exports.loadVesselChart = async (req) => {
  let query = req
    .gtos("DT_VESSEL_VISIT")
    .select("DT_VESSEL_VISIT.*", "DT_VESSEL.VesselType", "DT_VESSEL.LOA")
    .leftJoin("DT_VESSEL", "DT_VESSEL.VesselID", "DT_VESSEL_VISIT.VesselID")
    .orderByRaw("ATA desc , ETA desc ");
  query = FunctionModel.KnexWhere(query, req.body.filter);
  query.where(req.gtos.raw("ISNULL(ATA,ETA)"), ">=", req.body.FROMTIME || "");
  query.where(req.gtos.raw("ISNULL(ATA,ETA)"), "<=", req.body.TOTIME || "");
  query.where(req.gtos.raw("ISNULL(ATD,ETD)"), ">=", req.body.FROMTIME || "");
  query.where(req.gtos.raw("ISNULL(ATD,ETD)"), "<=", req.body.TOTIME || "");
  console.log(query.toString());
  let data = (await query.catch((err) => console.log(err))) || [];
  let vessel = {};
  let stt = 0;
  let maxDate = 0;
  let minDate = 0;
  for (let ii = 0; ii < data.length; ii++) {
    const row = data[ii];
    if (maxDate == 0) maxDate = new Date(row.ATD || row.ETD).valueOf() + 0;
    if (minDate == 0) minDate = new Date(row.ATA || row.ETA).valueOf() + 0;

    console.log(
      new Date(minDate).toISOString(),
      "==",
      new Date(row.ATA || row.ETA).toISOString()
    );

    maxDate = Math.max(maxDate, new Date(row.ATD || row.ETD).valueOf()) + 0;
    minDate = Math.min(minDate, new Date(row.ATA || row.ETA).valueOf()) + 0;
    console.log(
      new Date(minDate).toISOString(),
      "=!=",
      new Date(row.ATA || row.ETA).toISOString()
    );
    if (!vessel[row["VesselID"]]) {
      stt++;
      vessel[row["VesselID"]] = {
        cssClass: "Mod" + (stt % 7),
        desc: row["VesselID"],
        name: row["VesselName"],
        values: [],
      };
    }

    if (parseInt(row["VesselType"]) == 1) {
      let VSum = await req
        .gtos("DT_MANIFEST")
        .select(req.gtos.raw("COUNT(*) as tong"))
        .where("VoyageKey", row["VoyageKey"])
        .where("ClassID", 1);
      row["sumnhap"] = parseFloat((VSum[0] || { tong: 0 })["tong"] || 0);
      row["UnitID"] = "Unit";
      let VSum2 = await req
        .gtos("DT_MANIFEST")
        .select(req.gtos.raw("COUNT(*) as tong"))
        .where("VoyageKey", row["VoyageKey"])
        .where("ClassID", 2);
      row["sumxuat"] = parseFloat((VSum2[0] || { tong: 0 })["tong"] || 0);
      row["UnitID"] = "Unit";
    } else if (parseInt(row["VesselType"]) == 3) {
      let VSum = await req
        .gtos("DT_MNF_LD_BULK")
        .select(req.gtos.raw("sum(CargoWeight) as tong, max(UnitID) as UnitID"))
        .where("VoyageKey", row["VoyageKey"])
        .where("ClassID", 1);
      row["sumnhap"] = parseFloat((VSum[0] || { tong: 0 })["tong"] || 0);
      row["UnitID"] = (VSum[0] || { UnitID: "" })["UnitID"];
      let VSum2 = await req
        .gtos("DT_MNF_LD_BULK")
        .select(req.gtos.raw("sum(CargoWeight) as tong, max(UnitID) as UnitID"))
        .where("VoyageKey", row["VoyageKey"])
        .where("ClassID", 2);
      row["sumxuat"] = parseFloat((VSum2[0] || { tong: 0 })["tong"] || 0);
      row["UnitID"] = (VSum2[0] || { UnitID: "" })["UnitID"];
    }

    vessel[row["VesselID"]].values.push({
      customClass: "Mod" + (stt % 7),
      label: row["VesselName"],
      from: new Date(row.ATA || row.ETA).valueOf(),
      to: new Date(row.ATD || row.ETD).valueOf(),
      dataObj: {
        from: moment(row.ATA || row.ETA).format("YYYY-MM-DD HH:mm:ss"),
        to: moment(row.ATD || row.ETD).format("YYYY-MM-DD HH:mm:ss"),
        name: row["VesselName"],
        vdata: row,
      },
    });
  }
  maxDate = moment(maxDate).add(2, "day").valueOf();
  minDate = moment(minDate).add(-2, "day").valueOf();
  console.log(new Date(minDate).toISOString());
  return {
    DATA: Object.keys(vessel).map((itm) => {
      return { ...vessel[itm] };
    }),
    maxDate,
    minDate,
  };
};

/*********************** BS_LANE */

module.exports.loadLaneDetails = async (req) => {
  let query = req
    .gtos("BS_LANE_DETAILS")
    .select("BS_LANE_DETAILS.*", "BS_PORT.NationID")
    .leftJoin("BS_PORT", "BS_PORT.PortID", "BS_LANE_DETAILS.PortID")
    .orderBy("CreateTime", "desc");
  query = FunctionModel.KnexWhere(query, req.body.filter);
  console.log(query.toString());
  return (await query.catch((err) => console.log(err))) || [];
};

module.exports.loadLane = async (req) => {
  return (
    (await req
      .gtos("BS_LANE")
      .select("*")
      .orderBy("LaneID")
      .catch((err) => console.log(err))) || []
  );
};

module.exports.saveLane = async (req) => {
  let prm = [];
  let item = req.body.data;
  let laneDetailList = [...(item["laneDetailList"] || [])].map((itm) => {
    return {
      ...itm,
      CreatedBy: req.session.userdata["UserID"],
      CreateTime: moment().format("YYYY-MM-DD HH:mm:ss"),
    };
  });
  delete item["STT"];
  delete item["laneDetailList"];
  console.log("laneDetailList:", laneDetailList);
  var checkitem = await req
    .gtos("BS_LANE")
    .select("rowguid")
    .where("LaneID", item["LaneID"])
    .orWhere("rowguid", item["rowguid"] || null)
    .limit(1)
    .catch((err) => console.log(err));

  if (checkitem && checkitem.length > 0) {
    item["ModifiedBy"] = req.session.userdata["UserID"];
    item["UpdateTime"] = moment().format("YYYY-MM-DD HH:mm:ss");
    /* Do nothing */
    prm.push(req.gtos("BS_LANE_DETAILS").where("LaneID", item["LaneID"]).del());
    prm.push(req.gtos("BS_LANE_DETAILS").insert(laneDetailList));
    prm.push(
      req.gtos("BS_LANE").where("rowguid", checkitem[0]["rowguid"]).update(item)
    );
  } else {
    delete item["rowguid"];
    item["CreatedBy"] = req.session.userdata["UserID"];
    prm.push(req.gtos("BS_LANE").insert(item));
    prm.push(req.gtos("BS_LANE_DETAILS").where("LaneID", item["LaneID"]).del());
    prm.push(req.gtos("BS_LANE_DETAILS").insert(laneDetailList));
  }

  let rt = false;
  await Promise.all(prm)
    .then(() => {
      rt = true;
    })
    .catch((err) => {
      console.log(err);
    });
  return rt;
};

module.exports.deleteLane = async (req) => {
  try {
    await req
      .gtos("BS_LANE")
      .whereIn(
        "LaneID",
        (req.body.data || []).map((itm) => itm.LaneID)
      )
      .del();
    return true;
  } catch (error) {
    return false;
  }
};

/*********************** BS_YP_PLAN */
module.exports.loadColorAndSeqList = async (req) => {
  let query = req
    .gtos("BS_YP_PLAN")
    .select("Color", "PlanSequence")
    .groupByRaw("Color, PlanSequence");
  query = FunctionModel.KnexWhere(query, req.body.filter);
  return (await query.catch((err) => console.log(err))) || [];
};

module.exports.loadYardPlanning = async (req) => {
  let query = req.gtos("BS_YP_PLAN").select("*").orderBy("CreateTime", "desc");
  query = FunctionModel.KnexWhere(query, req.body.filter);
  return (await query.catch((err) => console.log(err))) || [];
};

module.exports.saveYardPlanning = async (req) => {
  let prm = [];
  console.log(req.body.data);

  for await (let item of req.body.data || []) {
    delete item["STT"];

    var checkitem = await req
      .gtos("BS_YP_PLAN")
      .select("rowguid")
      .where("rowguid", item["rowguid"] || null)
      .limit(1)
      .catch((err) => console.log(err));

    if (checkitem && checkitem.length > 0) {
      item["ModifiedBy"] = req.session.userdata["UserID"];
      item["UpdateTime"] = moment().format("YYYY-MM-DD HH:mm:ss");
      /* Do nothing */
      prm.push(
        req
          .gtos("BS_YP_PLAN")
          .where("rowguid", checkitem[0]["rowguid"])
          .update(item)
      );
    } else {
      delete item["rowguid"];
      item["CreatedBy"] = req.session.userdata["UserID"];
      prm.push(req.gtos("BS_YP_PLAN").insert(item));
    }
  }
  let rt = false;
  await Promise.all(prm)
    .then(() => {
      rt = true;
    })
    .catch((err) => {
      console.log(err);
    });
  return rt;
};

module.exports.deleteYardPlanning = async (req) => {
  try {
    let prm = [];
    for (let ii = 0; ii < (req.body.data || []).length; ii++) {
      const row = req.body.data[ii];
      prm.push(
        req
          .gtos("BS_YP_PLAN")
          .where("Block", row.Block || null)
          .where("Bay", row.Bay || null)
          .where("Row", row.Row || null)
          .where("Tier", row.Tier || null)
          .del()
          .catch((err) => {
            console.log(err);
          })
      );
    }
    let rt = false;
    await Promise.all(prm)
      .then((log) => {
        console.log(log);
        rt = true;
      })
      .catch((err) => {
        console.log(err);
      });
    return rt;
  } catch (error) {
    return false;
  }
};

module.exports.getBerth = async (req) => {
  return new Promise(async (resolve, rejects) => {
    try {
      let result = await req.gtos("BS_BERTH").select("*");
      resolve(result);
    } catch (error) {
      rejects(error);
    }
  });
};
module.exports.getDisLoad = async (req) => {
  return new Promise(async (resolve, rejects) => {
    console.log("check arr", req.body);
    try {
      let { voyageKey } = req.body;
      if (voyageKey.length > 0) {
        let result = await req
          .gtos("JOB_TALLY ")
          .select("VoyageKey", "BookingNo", "BillOfLading", "Cellar")
          .whereIn("VoyageKey", voyageKey);

        resolve(result);
      }
    } catch (error) {
      rejects(error);
    }
  });
};
module.exports.getBitt = async (req) => {
  return new Promise(async (resolve, rejects) => {
    try {
      let { bitt_ID, berth_ID } = req.query;
      console.log("checkdata", bitt_ID, berth_ID);
      let result = await req
        .gtos("BS_BITT")
        .select("*")
        .where("BittID", `${bitt_ID}`)
        .where("BerthID", `${berth_ID}`);

      resolve(result);
    } catch (error) {
      rejects(error);
    }
  });
};

/*********************** DT_VESSEL_VISIT */

module.exports.loadVesselVisit = async (req) => {
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

module.exports.saveVesselVisit = async (req) => {
  let prm = [];
  //console.log(req.body.data);

  for await (let item of req.body.data || []) {
    delete item["STT"];

    var checkitem = await req
      .gtos("DT_VESSEL_VISIT")
      .select("rowguid")
      .where("VoyageKey", item["VoyageKey"])
      .orWhere("rowguid", item["rowguid"] || null)
      .limit(1)
      .catch((err) => console.log(err));

    if (checkitem && checkitem.length > 0) {
      item["ModifiedBy"] = req.session.userdata["UserID"];
      item["UpdateTime"] = moment().format("YYYY-MM-DD HH:mm:ss");
      /* Do nothing */
      prm.push(
        req
          .gtos("DT_VESSEL_VISIT")
          .where("rowguid", checkitem[0]["rowguid"])
          .update(item)
      );
    } else {
      delete item["rowguid"];
      item["CreatedBy"] = req.session.userdata["UserID"];
      prm.push(req.gtos("DT_VESSEL_VISIT").insert(item));
    }
  }
  let rt = false;
  await Promise.all(prm)
    .then(() => {
      rt = true;
    })
    .catch((err) => {
      console.log(err);
    });
  return rt;
};

module.exports.deleteVesselVisit = async (req) => {
  try {
    await req
      .gtos("DT_VESSEL_VISIT")
      .whereIn(
        "VoyageKey",
        (req.body.data || []).map((itm) => itm.VoyageKey)
      )
      .del();
    return true;
  } catch (error) {
    return false;
  }
};

/*********************** DT_VESSEL */

module.exports.saveRowVessel = async (req) => {
  let item = req.body.data;
  delete item["STT"];
  item["CreatedBy"] = req.session.userdata["UserID"];
  let rt = false;
  await req
    .gtos("DT_VESSEL")
    .insert(item)
    .then(() => {
      rt = { success: true, data: item };
    })
    .catch((err) => {
      console.log(err);
      rt = { success: false, error: (err || {}).message || err, data: item };
    });
  return rt;
};

module.exports.loadVesselFull = async (req) => {
  let query = req
    .gtos("DT_VESSEL")
    .join("BS_OPR", "BS_OPR.OprID", "DT_VESSEL.OprID")
    .select("DT_VESSEL.*", "BS_OPR.OprName")
    .orderBy("VesselID");
  query = FunctionModel.KnexWhere(query, req.body.filter, "DT_VESSEL");
  return (await query.catch((err) => console.log(err))) || [];
};

module.exports.loadVessel = async (req) => {
  let query = req.gtos("DT_VESSEL").select("*").orderBy("VesselID");
  query = FunctionModel.KnexWhere(query, req.body.filter);
  return (await query.catch((err) => console.log(err))) || [];
};

module.exports.saveVessel = async (req) => {
  let prm = [];
  console.log(req.body.data);

  for await (let item of req.body.data || []) {
    delete item["STT"];

    var checkitem = await req
      .gtos("DT_VESSEL")
      .select("rowguid")
      .where("VesselID", item["VesselID"])
      .orWhere("rowguid", item["rowguid"] || null)
      .limit(1)
      .catch((err) => console.log(err));

    if (checkitem && checkitem.length > 0) {
      item["ModifiedBy"] = req.session.userdata["UserID"];
      item["UpdateTime"] = moment().format("YYYY-MM-DD HH:mm:ss");
      /* Do nothing */
      prm.push(
        req
          .gtos("DT_VESSEL")
          .where("rowguid", checkitem[0]["rowguid"])
          .update(item)
      );
    } else {
      delete item["rowguid"];
      item["CreatedBy"] = req.session.userdata["UserID"];
      prm.push(req.gtos("DT_VESSEL").insert(item));
    }
  }
  let rt = false;
  await Promise.all(prm)
    .then(() => {
      rt = true;
      if ((req.body.data || []).length == 1 && req.body.imgSrc) {
        var base64Data = req.body.imgSrc.replace(
          /^data:image\/([a-zA-Z]+);base64,/,
          ""
        );
        require("fs").writeFile(
          __dirname +
            "/../../public/assets/img/vessel_images/" +
            req.body.data[0].VesselID +
            ".jpg",
          base64Data,
          "base64",
          function (err) {
            console.log(err);
          }
        );
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return rt;
};

module.exports.deleteVessel = async (req) => {
  try {
    await req
      .gtos("DT_VESSEL")
      .whereIn(
        "VesselID",
        (req.body.data || []).map((itm) => itm.VesselID)
      )
      .del();
    return true;
  } catch (error) {
    return false;
  }
};
