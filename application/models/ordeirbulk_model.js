const { gtos, gtosglobal, knex_once } = require("../config/database");
const moment = require("moment-timezone");
const FunctionModel = require("./FunctionModel");

module.exports.loadBulkEirOrd = async (req) => {
  let query = req.gtos("ORD_EIR_BULK").select("*").orderBy("VoyageKey");
  query = FunctionModel.KnexWhere(query, req.body.filter, "ORD_EIR_BULK");
  console.log(query.toString());
  return (await query.catch((err) => console.log(err))) || [];
};

module.exports.generateID = (req) => {
  return new Promise(async (resolve, reject) => {
    let year = FunctionModel.moment().format("YY");
    let month = FunctionModel.moment().format("MM");
    let day = FunctionModel.moment().format("DD");
    var pmx = year + month + day + "";

    var chk = await req
      .gtos("SYS_COUNTER")
      .where("CounterName", pmx)
      .update({
        CounterNumber: req.gtos.raw("CounterNumber + 1"),
      })
      .returning("*")
      .then((data) => {
        //console.error('generateDraftNo_test data',data);
        DraftNumber = data[0].CounterNumber;
      })
      .catch(async () => {
        await req.gtos
          .raw(
            `insert into SYS_COUNTER(CounterName,CounterNumber) values (?,?)`,
            [pmx, 1]
          )
          .then(() => {
            DraftNumber = 1;
          });
      });
    //console.error('generateDraftNo_test',( pmx + ('0000000' + DraftNumber).substr(-7)));
    resolve(pmx + ("0000000" + DraftNumber).substr(-7));
  });
};

function randomChar(length) {
  var result = "";
  var characters = "0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

module.exports.generatePinCode = (req) => {
  return new Promise(async (resolve, reject) => {
    let year = FunctionModel.moment().format("YY");
    let month = FunctionModel.moment().format("MM");
    let day = FunctionModel.moment().format("DD");
    //let pmx = 'TTP230504D5IR2';
    req.loop = (req.loop || 0) + 1;
    if (req.loop >= 50) return reject(false);
    let pmx =
      req.user_info["CurrentTerminalCode"] + year + month + day + randomChar(4);
    let DraftNumber = "";
    await req
      .gtos("SYS_PINCODE")
      .insert({ PinCode: pmx })
      .returning("*")
      .then((data) => {
        DraftNumber = data[0].PinCode;
      })
      .catch(async (err) => {
        if (err.message.indexOf("The duplicate key value") != -1) {
          console.error(err.message);
          DraftNumber = await module.exports.generatePinCode(req);
        } else reject(false);
      });
    resolve(DraftNumber);
  });
};

module.exports.generateDraftID = (req) => {
  return new Promise(async (resolve, reject) => {
    let year = FunctionModel.moment().format("YY");
    let month = FunctionModel.moment().format("MM");
    let day = FunctionModel.moment().format("DD");
    var pmx = req.user_info["CurrentTerminalCode"] + year + month + day + "";

    var chk = await req
      .gtos("SYS_COUNTER")
      .where("CounterName", pmx)
      .update({
        CounterNumber: req.gtos.raw("CounterNumber + 1"),
      })
      .returning("*")
      .then((data) => {
        //console.error('generateDraftNo_test data',data);
        DraftNumber = data[0].CounterNumber;
      })
      .catch(async () => {
        await req.gtos
          .raw(
            `insert into SYS_COUNTER(CounterName,CounterNumber) values (?,?)`,
            [pmx, 1]
          )
          .then(() => {
            DraftNumber = 1;
          });
      });
    //console.error('generateDraftNo_test',( pmx + ('0000000' + DraftNumber).substr(-7)));
    resolve(pmx + ("0000000" + DraftNumber).substr(-7));
  });
};
module.exports.saveEirBulk = async (req) => {
  let prm = [];
  let arrdatas = req.body.datas || [];
  console.log(req.body.datas);

  for (let index = 0; index < arrdatas.length; index++) {
    const datas = arrdatas[index];
    let query = req.gtos("ORD_EIR_BULK").select("rowguid");
    if (datas.BillOfLading) query.where("BillOfLading", datas.BillOfLading);
    if (datas.BookingNo) query.where("BookingNo", datas.BookingNo);
    if (datas.ClassID) query.where("ClassID", datas.ClassID);
    if (datas.JobModeID) query.where("JobModeID", datas.JobModeID);
    if (datas.ItemID) query.where("ItemID", datas.ItemID);
    if (datas.VoyageKey) query.where("VoyageKey", datas.VoyageKey);
    console.log(query.toString());
    let checkitem = await query.limit(1).catch((err) => console.log(err));

    if (checkitem && checkitem.length > 0) {
      throw "Lệnh đã tồn tại !";
      // datas.ModifiedBy = req.session.userdata["UserID"];
      // datas.UpdateTime = moment().format("YYYY-MM-DD HH:mm:ss");

      // for (let item in datas) {
      //   if (datas.hasOwnProperty(item) && datas[item] === "") {
      //     datas[item] = null;
      //   }
      // }
      // console.log(datas);

      // prm.push(
      //   req.gtos("ORD_EIR_BULK").where("rowguid", datas.rowguid).update(datas)
      // );
    }
  }

  let PinCode = await module.exports.generatePinCode(req);
  let EirNo = await module.exports.generateID(req);
  let DraftNo = await module.exports.generateDraftID(req);
  for (let ii = 0; ii < arrdatas.length; ii++) {
    delete arrdatas[ii].rowguid;
    delete arrdatas[ii].STT;
    delete arrdatas[ii].FinishDate;
    arrdatas[ii]["PinCode"] = PinCode + "-" + ("0000" + (ii + 1)).substr(-3);
    arrdatas[ii]["EirNo"] = EirNo;
    arrdatas[ii]["DraftNo"] = DraftNo;
    arrdatas[ii]["Quantity"] = arrdatas[ii]["Quantity"] || 0;
    arrdatas[ii]["CargoWeight"] = arrdatas[ii]["CargoWeight"] || 0;
    arrdatas[ii]["Volume"] = arrdatas[ii]["Volume"] || 0;
    arrdatas[ii].CreatedBy = req.session.userdata["UserID"];
    arrdatas[ii].CreateTime = moment().format("YYYY-MM-DD HH:mm:ss");
  }

  for (let index = 0; index < arrdatas.length; index++) {
    const datas = arrdatas[index];
    // for (let item in datas) {
    //   if (datas.hasOwnProperty(item) && datas[item] === "") {
    //     datas[item] = null;
    //   }
    // }
    console.log(datas);
    prm.push(req.gtos("ORD_EIR_BULK").insert(datas));
  }

  let rt = false;
  await Promise.all(prm)
    .then(() => {
      rt = {
        PinCode: PinCode,
        EirNo: EirNo,
        DraftNo: DraftNo,
        datas: arrdatas,
      };
    })
    .catch((err) => {
      console.log(err);
    });
  return rt;
};
module.exports.loadPrintEirInfo = async (req) => {
  let PinCode = req.params.PinCode || req.body.PinCode;
  let TerminalCode = req.params.PinCode.substr(0, 3);
  console.log(TerminalCode, typeof knex_once(TerminalCode).raw);
  if (typeof knex_once(TerminalCode).raw + "" != "function") return {};
  let query = knex_once(TerminalCode)("ORD_EIR_BULK as ORD")
    .select(
      "ORD.*",
      "IT.ItemName",
      "JM.JobModeName",
      "MT.MethodName",
      "VSS.VesselName",
      "VSS.InboundVoyage",
      "VSS.OutboundVoyage",
      "VSS.ATB"
    )
    .leftJoin("BS_ITEM as IT", "IT.ItemID", "ORD.ItemID")
    .leftJoin("BS_JOB_MODE as JM", "JM.JobModeID", "ORD.JobModeID")
    .leftJoin("BS_METHOD as MT", "MT.MethodID", "ORD.MethodID")
    .leftJoin("DT_VESSEL_VISIT as VSS", "VSS.VoyageKey", "ORD.VoyageKey")
    .whereLike("PinCode", PinCode + "%");
  let ordInfo = (await query.catch((err) => console.log(err))) || [];
  ordInfo = ordInfo.map((itm) => ({
    ...itm,
    IssueDate: FunctionModel.moment(itm.IssueDate).format("DD/MM/YYYY HH:mm"),
    ExpDate: itm.ExpDate
      ? FunctionModel.moment(itm.ExpDate).format("DD/MM/YYYY HH:mm")
      : "",
    ATB: itm.ATB
      ? FunctionModel.moment(itm.ATB).format("DD/MM/YYYY HH:mm")
      : "",
  }));
  let terminalInfo =
    (await gtosglobal("BS_TERMINAL")
      .select("*")
      .where("TerminalCode", TerminalCode)
      .catch((err) => console.log(err))) || [];
  let blocks = false;
  if (ordInfo && ordInfo[0] && ordInfo[0].JobModeID == "LAYN") {
    blocks = {};
    for (let ii = 0; ii < ordInfo.length; ii++) {
      const ordr = ordInfo[ii];
      let stocks =
        (await knex_once(TerminalCode)("DT_BLOCK_STOCK")
          .select("*")
          .where("BillOfLading", ordInfo[0].BillOfLading)
          .where("VoyageKey", ordInfo[0].VoyageKey)
          .catch((err) => console.log(err))) || [];

      for (let ind = 0; ind < stocks.length; ind++) {
        const block = stocks[ind];
        if (!blocks[(block.BillOfLading || "") + (block.BookingNo || "")])
          blocks[(block.BillOfLading || "") + (block.BookingNo || "")] = {};
        blocks[(block.BillOfLading || "") + (block.BookingNo || "")][
          block.Block
        ] = block.rowguid;
        ordInfo[ii].Blocks = Object.keys(
          blocks[(block.BillOfLading || "") + (block.BookingNo || "")]
        ).join(", ");
      }
    }
  }
  //query = FunctionModel.KnexWhere(query, req.body.filter, "ORD_EIR_BULK");
  //console.log(query.toString());
  return { ordInfo, terminalInfo, blocks: blocks };
};

module.exports.searchRePrint = async (req) => {
  if (
    !req.body.OrderNo &&
    !req.body.PinCode &&
    !req.body.InvoiceNo &&
    !req.body.BBNo
  )
    throw "Vui lòng nhập dữ liệu !";
  let query = req
    .gtos("ORD_EIR_BULK as ORD")
    .select(
      "ORD.*",
      "ORD.EirNo as OrderNo",
      req.gtos.raw("CONCAT(ORD.BillOfLading,ORD.BookingNo) as BBNo"),
      "IT.ItemName",
      "JM.JobModeName",
      "MT.MethodName",
      "VSS.VesselName",
      "VSS.InboundVoyage",
      "VSS.OutboundVoyage",
      "VSS.ATB"
    )
    .leftJoin("BS_ITEM as IT", "IT.ItemID", "ORD.ItemID")
    .leftJoin("BS_JOB_MODE as JM", "JM.JobModeID", "ORD.JobModeID")
    .leftJoin("BS_METHOD as MT", "MT.MethodID", "ORD.MethodID")
    .leftJoin("DT_VESSEL_VISIT as VSS", "VSS.VoyageKey", "ORD.VoyageKey");
  if (req.body.OrderNo) query.where("EirNo", req.body.OrderNo + "");
  if (req.body.PinCode) query.whereLike("PinCode", req.body.PinCode + "%");
  if (req.body.InvoiceNo) query.where("InvoiceNo", req.body.InvoiceNo + "");
  if (req.body.BBNo) {
    query.where(function () {
      this.where("BillOfLading", req.body.BBNo + "").orWhere(
        "BookingNo",
        req.body.BBNo + ""
      );
    });
  }
  console.log(query.toString());
  return await query.catch((err) => console.log(err));
};

module.exports.searchReceiptPrint = async (req) => {
  if (!req.body.VoyageKey && !req.body.CusID && !req.body.BBNo)
    throw "Vui lòng nhập dữ liệu !";
  let query = req
    .gtos("DT_BLOCK_STOCK as ORD")
    .select(
      req.gtos.raw("SUM(QuantityIn) as QuantityIn"),
      req.gtos.raw("SUM(QuantityOut) as QuantityOut"),
      req.gtos.raw("SUM(McWeightIn) as McWeightIn"),
      req.gtos.raw("SUM(McWeightOut) as McWeightOut"),
      "ORD.ClassID",
      "ORD.CusID",
      "ORD.BBNo",
      "ORD.VoyageKey",
      "ORD.JobModeIn",
      "ORD.JobModeOut",
      "IT.ItemName",
      "JMI.JobModeName as JobModeInName",
      "JMO.JobModeName as JobModeOutName"
    )
    .leftJoin("BS_ITEM as IT", "IT.ItemID", "ORD.ItemID")
    .leftJoin("BS_JOB_MODE as JMI", "JMI.JobModeID", "ORD.JobModeIn")
    .leftJoin("BS_JOB_MODE as JMO", "JMO.JobModeID", "ORD.JobModeOut")
    .groupByRaw(
      "ORD.ClassID,ORD.CusID,ORD.BBNo,ORD.VoyageKey,ORD.JobModeIn,ORD.JobModeOut,IT.ItemName,JMI.JobModeName,JMO.JobModeName"
    );
  if (req.body.VoyageKey) query.where("ORD.VoyageKey", req.body.VoyageKey + "");
  if (req.body.CusID) query.whereLike("ORD.CusID", req.body.CusID + "");
  if (req.body.BBNo) {
    query.where("ORD.BBNo", req.body.BBNo + "");
  }
  return await query.catch((err) => console.log(err));
};

module.exports.loadPrintSDInfo = async (req) => {
  let TerminalCode = req.params.TerminalCode || req.body.TerminalCode;
  let BBNo = req.query.BBNo || "";
  let VoyageKey = req.query.VoyageKey || "";
  let ClassID = req.query.ClassID || "";
  let JobModeID = req.query.JobModeID || "";
  let MethodID = req.query.MethodID || "";
  let CusID = req.query.CusID || "";
  //console.log(TerminalCode,typeof knex_once(TerminalCode).raw);
  if (typeof knex_once(TerminalCode).raw + "" != "function") return {};
  let query = knex_once(TerminalCode)("DT_BLOCK_STOCK")
    .select(
      knex_once(TerminalCode).raw(
        `STRING_AGG(DT_BLOCK_STOCK.Block,', ') as Blocks,${
          ClassID + "" == "2"
            ? "SUM(QuantityIn) as Quantity,SUM(McWeightIn) as McWeight"
            : "SUM(QuantityOut) as Quantity,SUM(McWeightOut) as McWeight"
        },DT_VESSEL_VISIT.VesselName,DT_VESSEL_VISIT.InboundVoyage,DT_VESSEL_VISIT.OutboundVoyage,DT_VESSEL_VISIT.ATB,BS_CUSTOMER.CusName,DT_BLOCK_STOCK.BBNo,DT_BLOCK_STOCK.ClassID,DT_BLOCK_STOCK.ItemID, BS_ITEM.ItemName,DT_BLOCK_STOCK.UnitID,JM.JobModeName,MT.MethodName,MAX(DT_BLOCK_STOCK.CreateTime) as CreateTime,MAX(DT_BLOCK_STOCK.GetIn) as GetIn,MAX(DT_BLOCK_STOCK.GetOut) as GetOut`
      )
    )
    .leftJoin(
      "DT_VESSEL_VISIT",
      "DT_VESSEL_VISIT.VoyageKey",
      "DT_BLOCK_STOCK.VoyageKey"
    )
    .leftJoin("BS_ITEM", "BS_ITEM.ItemID", "DT_BLOCK_STOCK.ItemID")
    .leftJoin("BS_CUSTOMER", "BS_CUSTOMER.CusID", "DT_BLOCK_STOCK.CusID");
  if (ClassID + "" == "2")
    query
      .leftJoin("BS_JOB_MODE as JM", "JM.JobModeID", "DT_BLOCK_STOCK.JobModeIn")
      .leftJoin("BS_METHOD as MT", "MT.MethodID", "DT_BLOCK_STOCK.MethodIn");
  else
    query
      .leftJoin(
        "BS_JOB_MODE as JM",
        "JM.JobModeID",
        "DT_BLOCK_STOCK.JobModeOut"
      )
      .leftJoin("BS_METHOD as MT", "MT.MethodID", "DT_BLOCK_STOCK.MethodOut");

  query.groupByRaw(
    "DT_VESSEL_VISIT.VesselName,DT_VESSEL_VISIT.InboundVoyage,DT_VESSEL_VISIT.OutboundVoyage,DT_VESSEL_VISIT.ATB,BS_CUSTOMER.CusName,DT_BLOCK_STOCK.BBNo,DT_BLOCK_STOCK.ClassID,DT_BLOCK_STOCK.ItemID, BS_ITEM.ItemName,DT_BLOCK_STOCK.UnitID,JM.JobModeName,MT.MethodName"
  );
  if (BBNo) query.where("DT_BLOCK_STOCK.BBNo", BBNo);
  if (ClassID + "" == "2") query.where("DT_BLOCK_STOCK.JobModeIn", JobModeID);
  else query.where("DT_BLOCK_STOCK.JobModeOut", JobModeID);

  if (MethodID) query.where("DT_BLOCK_STOCK.MethodID", MethodID);

  query.where("DT_BLOCK_STOCK.CusID", CusID);
  query.where("DT_BLOCK_STOCK.VoyageKey", VoyageKey);
  query.where("DT_BLOCK_STOCK.ClassID", ClassID);
  console.log("==========", query.toString());
  let ordInfo = (await query.catch((err) => console.log(err))) || [];
  ordInfo = ordInfo.map((itm) => ({
    ...itm,
    CreateTime: itm.CreateTime
      ? FunctionModel.moment(itm.CreateTime).format("DD/MM/YYYY HH:mm")
      : "",
    GetIn: itm.GetIn
      ? FunctionModel.moment(itm.GetIn).format("DD/MM/YYYY HH:mm")
      : "",
    GetOut: itm.GetOut
      ? FunctionModel.moment(itm.GetOut).format("DD/MM/YYYY HH:mm")
      : "",
    ATB: itm.ATB
      ? FunctionModel.moment(itm.ATB).format("DD/MM/YYYY HH:mm")
      : "",
  }));
  let terminalInfo =
    (await gtosglobal("BS_TERMINAL")
      .select("*")
      .where("TerminalCode", TerminalCode)
      .catch((err) => console.log(err))) || [];

  //query = FunctionModel.KnexWhere(query, req.body.filter, "ORD_EIR_BULK");
  //console.log(query.toString());
  return { ordInfo, terminalInfo };
};
