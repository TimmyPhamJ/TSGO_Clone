const { gtos, gtosglobal, knex_once } = require("../config/database");
const moment = require("moment-timezone");
const FunctionModel = require("../models/FunctionModel");

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
        await req.gtos.raw(
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
        await req.gtos.raw(
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
    let query = req
    .gtos("ORD_EIR_BULK")
    .select("rowguid");
    if(datas.BillOfLading)
    query.where("BillOfLading", datas.BillOfLading)
    if(datas.BookingNo)
    query.where("BookingNo", datas.BookingNo)
    if(datas.ClassID)
    query.where("ClassID", datas.ClassID)
    if(datas.JobModeID)
    query.where("JobModeID", datas.JobModeID)
    if(datas.ItemID)
    query.where("ItemID", datas.ItemID)
    console.log(query.toString());
    let checkitem = await query.limit(1)
    .catch((err) => console.log(err));
    
    if (checkitem && checkitem.length > 0) {
      throw 'Lệnh đã tồn tại !'; 
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
    arrdatas[ii]['PinCode']=PinCode+"-"+("0000" + (ii+1)).substr(-3);
    arrdatas[ii]['EirNo']=EirNo;
    arrdatas[ii]['DraftNo']=DraftNo;
    arrdatas[ii]['Quantity']=arrdatas[ii]['Quantity']||0;
    arrdatas[ii]['CargoWeight']=arrdatas[ii]['CargoWeight']||0;
    arrdatas[ii]['Volume']=arrdatas[ii]['Volume']||0;
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
        datas:arrdatas
      };
    })
    .catch((err) => {
      console.log(err);
    });
  return rt;
};
