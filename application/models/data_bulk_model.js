const { gtos, gtosglobal } = require("../config/database");
const moment = require("moment-timezone");
const FunctionModel = require("../models/FunctionModel.js");

module.exports.loadBulkManifestFull = async (req) => {
  let query = req
    .gtos("DT_MNF_LD_BULK")
    .select(
      "A.rowguid",
      "VoyageKey",
      "BillOfLading",
      "BookingNo",
      "A.JobModeID",
      "JobModeName",
      "A.MethodID",
      "MethodName",
      "CargoWeight",
      "A.UnitID",
      "UnitName",
      "Sequence",
      "CntrNo",
      "A.ClassID",
      "ClassName",
      "IsLocalForeign",
      "CommodityDescription",
      "IsInOrdEirBulk",
      "A.CargoTypeID",
      "CargoTypeName"
    )
    .from("DT_MNF_LD_BULK as A")
    .leftJoin("BS_JOB_MODE as B", "A.JobModeID", "B.JobModeID")
    .leftJoin("BS_METHOD as C", "A.MethodID", "C.MethodID")
    .leftJoin("BS_UNIT as D", "A.UnitID", "D.UnitID")
    .leftJoin("BS_CLASS as E", "A.ClassID", "E.ClassID")
    .leftJoin("BS_CARGOTYPE as F", "A.CargoTypeID", "F.CargoTypeID");
  query = FunctionModel.KnexWhere(query, req.body.filter, "A");
  //console.log(req.body.filter,query.toString());
  return (await query.catch((err) => console.log(err))) || [];
};

module.exports.loadBulkManifest = async (req) => {
  let query = req
    .gtos("DT_MNF_LD_BULK")
    .select("*")
    .from("DT_MNF_LD_BULK as A");
  query = FunctionModel.KnexWhere(query, req.body.filter, "A");
  //console.log(req.body.filter,query.toString());
  return (await query.catch((err) => console.log(err))) || [];
};

module.exports.loadBulkManifestFullName = async (req) => {
  let query = req
    .gtos("DT_MNF_LD_BULK")
    .select("A.*","B.CusName")
    .from("DT_MNF_LD_BULK as A")
    .leftJoin("BS_CUSTOMER as B", "A.CusID", "B.CusID");
  query = FunctionModel.KnexWhere(query, req.body.filter, "A");
  //console.log(req.body.filter,query.toString());
  return (await query.catch((err) => console.log(err))) || [];
};

module.exports.saveBulkManifest = async (req) => {
  let prm = [];
  console.log(req.body.data);

  for await (let item of req.body.data || []) {
    delete item["STT"];
    delete item["CusName"];

    var checkitem = await req
      .gtos("DT_MNF_LD_BULK")
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
          .gtos("DT_MNF_LD_BULK")
          .where("rowguid", checkitem[0]["rowguid"])
          .update(item)
      );
    } else {
      delete item["rowguid"];
      item["CreatedBy"] = req.session.userdata["UserID"];
      prm.push(req.gtos("DT_MNF_LD_BULK").insert(item));
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
 

module.exports.setStatus = async (req) => {
  try {
    await req
      .gtos("DT_MNF_LD_BULK")
      .update({LDStatus: req.body.LDStatus})
      .where(
        "rowguid",req.body.rowguid
      );
    return true;
  } catch (error) {
    return false;
  }
};

module.exports.deleteBulkManifest = async (req) => {
  try {
    await req
      .gtos("DT_MNF_LD_BULK")
      .whereIn(
        "rowguid",
        (req.body.data || []).map((itm) => itm.rowguid)
      )
      .del();
    return true;
  } catch (error) {
    return false;
  }
};



module.exports.getCusSearch = async (req) => {
  let query = req
    .gtos("BS_CUSTOMER")
    .select("*").limit(10);
    if(req.body.taxcode){
      query.where('CusID','like',`%${req.body.taxcode}%`);
      query.orWhere('CusName','like',`%${req.body.taxcode}%`);
    }
  query = FunctionModel.KnexWhere(query, req.body.filter);
  //console.log(req.body.filter,query.toString());
  return (await query.catch((err) => console.log(err))) || [];
};



module.exports.loadTallyJob = async (req) => {
  let query = req
    .gtos("JOB_TALLY")
    .select("JOB_TALLY.*"
    ,"BS_ITEM.ItemName"
    ,"BS_METHOD.MethodName"
    ,"BS_JOB_MODE.JobModeName"
    ,"BS_WORKER_GROUP.WorkerGroupName"
    ,"BS_DEVICE.DeviceName"
    ,"JOB_YARD.Block"
    ,"JOB_YARD.FinishDate"
    )
    .leftJoin('JOB_YARD', 'JOB_YARD.RefRowguid', 'JOB_TALLY.rowguid')
    .leftJoin('BS_ITEM', 'BS_ITEM.ItemID', 'JOB_TALLY.ItemID')
    .leftJoin('BS_METHOD', 'BS_METHOD.MethodID', 'JOB_TALLY.MethodID')
    .leftJoin('BS_JOB_MODE', 'BS_JOB_MODE.JobModeID', 'BS_METHOD.JobModeID')
    .leftJoin('BS_WORKER_GROUP', 'BS_WORKER_GROUP.WorkerGroupID', 'JOB_TALLY.WorkerGroupID')
    .leftJoin('BS_DEVICE', 'BS_DEVICE.DeviceID', 'JOB_TALLY.DeviceID')
  query = FunctionModel.KnexWhere(query, req.body.filter,'JOB_TALLY');
  console.log(req.body.filter,query.toString());
  return (await query.catch((err) => console.log(err))) || [];
};