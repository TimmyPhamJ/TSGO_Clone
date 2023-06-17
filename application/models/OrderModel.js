const FunctionModel = require("./FunctionModel.js");

const CalcStandardRow = (req, row) => {
  return new Promise(async (resolve, reject) => {
    let tnow = FunctionModel.moment().format("YYYY-MM-DD HH:mm:ss");
    req
      .gtos(req.gtos.raw("TRF_STANDARD with (nolock)"))
      .select("*")
      .where(
        req.gtos.raw(
          `(ISNULL(row.JobModeID,'*')='*' or ISNULL(row.JobModeID,'*')=:JobModeID)`,
          { JobModeID: row.JobModeID }
        )
      )
      .where(
        req.gtos.raw(
          `(ISNULL(row.ClassID,'*')='*' or ISNULL(row.ClassID,'*')=:ClassID)`,
          { ClassID: row.ClassID }
        )
      )
      .where(
        req.gtos.raw(
          `(ISNULL(row.IsLocalForeign,'*')='*' or ISNULL(row.IsLocalForeign,'*')=:IsLocalForeign)`,
          { IsLocalForeign: row.IsLocalForeign }
        )
      )
      .where(
        req.gtos.raw(
          `(ISNULL(row.MethodID,'*')='*' or ISNULL(row.MethodID,'*')=:MethodID)`,
          { MethodID: row.MethodID }
        )
      )
      .where(
        req.gtos.raw(
          `(ISNULL(row.ServiceID,'*')='*' or ISNULL(row.ServiceID,'*')=:ServiceID)`,
          { ServiceID: row.ServiceID }
        )
      )
      .where(
        req.gtos.raw(
          `(ISNULL(row.TransitID,'*')='*' or ISNULL(row.TransitID,'*')=:TransitID)`,
          { TransitID: row.TransitID }
        )
      )
      .where(
        req.gtos.raw(
          `(ISNULL(row.CargoTypeID,'*')='*' or ISNULL(row.CargoTypeID,'*')=:CargoTypeID)`,
          { CargoTypeID: row.CargoTypeID }
        )
      )
      .where(
        req.gtos.raw(
          `(ISNULL(row.ItemID,'*')='*' or ISNULL(row.ItemID,'*')=:ItemID)`,
          { ItemID: row.ItemID }
        )
      )
      .where(
        req.gtos.raw(
          `(ISNULL(row.UnitID,'*')='*' or ISNULL(row.UnitID,'*')=:UnitID)`,
          { UnitID: row.UnitID }
        )
      )
      .where(`ApplyDate`, ">=", tnow)
      .where(`ExpireDate`, "<=", tnow)
      .then((data) => {
        if (data && data[0]) {
          if (data.length == 1) {
            return resolve(data[0]);
          } else {
            let goc = 0;
            let rxx = data[0];
            for (let ii = 0; ii < data.length; ii++) {
              const rowx = data[ii];
              let nen = 0;
              if (rowx.JobModeID != "*" || rowx.JobModeID) nen++;
              if (rowx.ClassID != "*" || rowx.ClassID) nen++;
              if (rowx.IsLocalForeign != "*" || rowx.IsLocalForeign) nen++;
              if (rowx.MethodID != "*" || rowx.MethodID) nen++;
              if (rowx.ServiceID != "*" || rowx.ServiceID) nen++;
              if (rowx.TransitID != "*" || rowx.TransitID) nen++;
              if (rowx.CargoTypeID != "*" || rowx.CargoTypeID) nen++;
              if (rowx.ItemID != "*" || rowx.ItemID) nen++;
              if (rowx.UnitID != "*" || rowx.UnitID) nen++;
              if (nen > goc) {
                rxx = rowx;
                goc = nen;
              }
            }
            return resolve(rxx);
          }
        } else return reject("ERROR");
      })
      .catch((e) => {
        return reject("ERROR");
      });
  });
};

module.exports.PaymentCalc = async (req) => {
  return new Promise(async (resolve, reject) => {
    let data = req.body.data || [];
    let gom = [];
    for (let ii = 0; ii < data.length; ii++) {
      const row = data[ii];
      gom.push(CalcStandardRow(req, row));
    }
    if (gom.length) {
      Promise.all(gom)
        .then((data) => {
          return resolve(data);
        })
        .catch(() => {
          return reject(false);
        });
    } else {
      return reject(false);
    }
  });
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
        CounterNumber: tosglobal.raw("CounterNumber + 1"),
      })
      .returning("*")
      .then((data) => {
        //console.error('generateDraftNo_test data',data);
        DraftNumber = data[0].CounterNumber;
      })
      .catch(async () => {
        await req
          .gtos()
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
        CounterNumber: tosglobal.raw("CounterNumber + 1"),
      })
      .returning("*")
      .then((data) => {
        //console.error('generateDraftNo_test data',data);
        DraftNumber = data[0].CounterNumber;
      })
      .catch(async () => {
        await req
          .gtos()
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
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
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

module.exports.saveEir = (req) => {
  return new Promise(async (resolve, reject) => {
    let datas = datas.push(req) || [];
    let rows = [];
    console.log(datas);
    if (datas.length == 0) return reject({ message: "Chưa nhập danh sách !" });
    for (let ii = 0; ii < dat.length; ii++) {
      const row = dat[ii];
      let PinCode = await module.exports.generatePinCode(req);
      let DraftNo = await module.exports.generateDraftID(req);
      let EirNo = await module.exports.generateID(req);
      let ins = {
        VoyageKey: row.VoyageKey,
        ClassID: row.ClassID,
        TransitID: row.TransitID,
        JobModeID: row.JobModeID,
        MethodID: row.MethodID,
        EirNo: EirNo,
        PinCode: PinCode,
        DraftNo: DraftNo,
        IssueDate: row.IssueDate,
        ExpDate: row.ExpDate,
        FinishDate: row.FinishDate,
        BillOfLading: row.BillOfLading,
        BookingNo: row.BookingNo,
        CargoType: row.CargoType,
        ShipperName: row.ShipperName,
        CusTypeID: row.CusTypeID,
        CusID: row.CusID,
        ItemID: row.ItemID,
        UnitID: row.UnitID,
        PaymentTypeID: row.PaymentTypeID,
        PayFormID: row.PayFormID,
        DiscountID: row.DiscountID,
        ShipperNumberID: row.ShipperNumberID,
        Email: row.Email,
        Remark: row.Remark,
        BillOfLading: row.BillOfLading,
        BookingNo: row.BookingNo,
      };
      rows.push(ins);
    }
    req
      .gtos("ORD_EIR")
      .insert(rows)
      .then((data) => {
        resolve(data);
      });
  });
};
