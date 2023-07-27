const { resolve } = require("path");
const FunctionModel = require("../models/FunctionModel.js");
const moment = require("moment-timezone");
const { rejects } = require("assert");

module.exports.loadTrfCode = async (req) => {
  let query = req.gtos("TRF_CODE").select("*");
  query = FunctionModel.KnexWhere(query, req.body.filter);
  return (await query.catch((err) => console.log(err))) || [];
};

module.exports.saveTrfCode = async (req) => {
  let prm = [];
  for await (let item of req.body.data || []) {
    delete item["STT"];

    var checkitem = await req
      .gtos("TRF_CODE")
      .select("rowguid")
      .where("TRFCode", item["TRFCode"])
      .orWhere("rowguid", item["rowguid"] || null)
      .limit(1)
      .catch((err) => console.log(err));

    if (checkitem && checkitem.length > 0) {
      item["ModifiedBy"] = req.session.userdata["UserID"];
      item["UpdateTime"] = moment().format("YYYY-MM-DD HH:mm:ss");
      /* Do nothing */
      prm.push(
        req
          .gtos("TRF_CODE")
          .where("rowguid", checkitem[0]["rowguid"])
          .update(item)
      );
    } else {
      delete item["rowguid"];
      item["CreatedBy"] = req.session.userdata["UserID"];
      prm.push(req.gtos("TRF_CODE").insert(item));
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

module.exports.deleteTrfCode = async (req) => {
  try {
    await req
      .gtos("TRF_CODE")
      .whereIn(
        "TRFCode",
        (req.body.data || []).map((itm) => itm.TRFCode)
      )
      .del();
    return true;
  } catch (error) {
    return false;
  }
};

/*********************** TRF_STANDARD */

module.exports.loadTrfStandardGroup = async (req) => {
  let query = req
    .gtos("TRF_STANDARD")
    .select(
      req.gtos.raw(`FORMAT(ApplyDate,'dd/MM/yyyy') as ApplyDate`),
      req.gtos.raw(`FORMAT(ExpireDate,'dd/MM/yyyy') as ExpireDate`),
      "Remark"
    )
    .groupByRaw("ApplyDate,ExpireDate,Remark")
    .orderBy("ApplyDate", "desc");
  query = FunctionModel.KnexWhere(query, req.body.filter);
  return (await query.catch((err) => console.log(err))) || [];
};

module.exports.loadTrfStandardDetails = async (req) => {
  let query = req
    .gtos("TRF_STANDARD")
    .select("TRF_STANDARD.*", "BS_PORT.NationID")
    .leftJoin("BS_PORT", "BS_PORT.PortID", "TRF_STANDARD.PortID")
    .orderBy("TRF_STANDARD.CreateTime", "desc");
  query = FunctionModel.KnexWhere(query, req.body.filter, "TRF_STANDARD");
  console.log(query.toString());
  return (await query.catch((err) => console.log(err))) || [];
};

module.exports.loadTrfStandard = async (req) => {
  let query = req
    .gtos("TRF_STANDARD")
    .select("*")
    .orderBy("CreateTime", "desc");
  query = FunctionModel.KnexWhere(query, req.body.filter);
  return (await query.catch((err) => console.log(err))) || [];
};

module.exports.saveTrfStandard = async (req) => {
  let prm = [];
  for await (let item of req.body.data || []) {
    delete item["STT"];

    var checkitem = await req
      .gtos("TRF_STANDARD")
      .select("rowguid")
      .where("rowguid", item["rowguid"] || null)
      .orWhere((trx) => {
        trx.where({
          TRFCode: item["TRFCode"],
          ApplyDate: item["ApplyDate"],
          ExpireDate: item["ExpireDate"],
          Remark: item["Remark"],
        });
      })
      .limit(1)
      .catch((err) => console.log(err));

    if (checkitem && checkitem.length > 0) {
      item["ModifiedBy"] = req.session.userdata["UserID"];
      item["UpdateTime"] = moment().format("YYYY-MM-DD HH:mm:ss");
      /* Do nothing */
      prm.push(
        req
          .gtos("TRF_STANDARD")
          .where("rowguid", checkitem[0]["rowguid"])
          .update(item)
      );
    } else {
      delete item["rowguid"];
      item["CreatedBy"] = req.session.userdata["UserID"];
      prm.push(req.gtos("TRF_STANDARD").insert(item));
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

module.exports.deleteTrfStandard = async (req) => {
  try {
    await req
      .gtos("TRF_STANDARD")
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

/*********************** TRF_DISCOUNT */

module.exports.loadTrfDiscountGroup = async (req) => {
  let query = req
    .gtos("TRF_DISCOUNT")
    .select(
      // "rowguid",
      // "DiscountID",
      "CusID",
      req.gtos.raw(`FORMAT(ApplyDate,'dd/MM/yyyy') as ApplyDate`),
      req.gtos.raw(`FORMAT(ExpireDate,'dd/MM/yyyy') as ExpireDate`)
    )
    .groupByRaw("CusID,ApplyDate,ExpireDate")
    .orderBy("ApplyDate", "desc");
  query = FunctionModel.KnexWhere(query, req.body.filter);
  return (await query.catch((err) => console.log(err))) || [];
};

module.exports.loadTrfDiscountDetails = async (req) => {
  let query = req
    .gtos("TRF_DISCOUNT")
    .select("TRF_DISCOUNT.*", "BS_PORT.NationID")
    .leftJoin("BS_PORT", "BS_PORT.PortID", "TRF_DISCOUNT.PortID")
    .orderBy("TRF_DISCOUNT.CreateTime", "desc");
  query = FunctionModel.KnexWhere(query, req.body.filter, "TRF_DISCOUNT");
  console.log(query.toString());
  return (await query.catch((err) => console.log(err))) || [];
};

module.exports.loadTrfDiscount = async (req) => {
  let query = req
    .gtos("TRF_DISCOUNT")
    .select("*")
    .orderBy("CreateTime", "desc");
  if (req.body.CusID)
    query.where('CusID', req.body.CusID);
  query = FunctionModel.KnexWhere(query, req.body.filter);
  return (await query.catch((err) => console.log(err))) || [];
};

module.exports.saveTrfDiscount = async (req) => {
  return new Promise(async (resolve, rejects) => {
    try {
      let prm = [];
      for await (let item of req.body.data || []) {
        let query = await req.gtos("TRF_DISCOUNT AS TD")
          .select("TD.rowguid")
          .where("TD.CargoTypeID", item.CargoTypeID)
          .where("TD.ClassID", item.ClassID)
          .where("TD.ContractName", item.ContractName)
          .where("TD.CusID", item.CusID)
          .where("TD.CusTypeID", item.CusTypeID)
          .where("TD.JobModeID", item.JobModeID)
          .where("TD.JobTypeID", item.JobTypeID)
          .where("TD.MethodID", item.MethodID)
          .where("TD.PaymentTypeID", item.PaymentTypeID)
          .where("TD.TRFCode", item.TRFCode)
          .where("TD.TRFDesc", item.TRFDesc)
          .where("TD.TransitID", item.TransitID)
          .where("TD.UnitID", item.UnitID)
          .where("TD.VoyageKey", item.VoyageKey)
          .limit(1)
        console.log("checkquery", query)
        let item1 = { ...item, CreatedBy: req.session.userdata["UserID"] }
        if (query?.length > 0) {
          prm.push(req.gtos("TRF_DISCOUNT").where("rowguid", query[0].rowguid)
            .update(item1))
        }
        else {
          prm.push(req.gtos("TRF_DISCOUNT").insert(item1));
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
      resolve(rt);
    } catch (error) {
      console.log(error)
      rejects(error)
    }
  })
};

module.exports.deleteTrfDiscount = async (req) => {
  try {
    await req
      .gtos("TRF_DISCOUNT")
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
