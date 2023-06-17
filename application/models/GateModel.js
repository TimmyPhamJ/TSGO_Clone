const { gtos, gtosglobal } = require("../config/database");
const FunctionModel = require("./FunctionModel.js");
const moment = require("moment-timezone");

//Thoilc(*Note)-Get dữ liệu khi người dùng nhập số eir || pincode
module.exports.loadOrderEirBulk = async (req) => {
  var response = {
    iStatus: false,
    iPayload: [],
    iMessage: "",
  };

  if (!req.body.SoPin && !req.body.EIRNo) {
    response["iStatus"] = false;
    response["iMessage"] = "Vui lòng cung cấp số lệnh hoặc số pin!";
    return response;
  }

  let query = req
    .gtos("ORD_EIR_BULK AS orderG")
    .select(
      "orderG.VoyageKey",
      "vessel.VesselName",
      "vessel.InboundVoyage",
      "vessel.OutboundVoyage",
      "vessel.ETB",
      "vessel.ETD",
      "orderG.JobModeID",
      "orderG.CusTypeID",
      "orderG.CusID",
      "orderG.PaymentTypeID",
      "orderG.InvDraftNo",
      "orderG.InvNo",
      "orderG.MethodID",
      "orderG.ClassID",
      "orderG.BillOfLading",
      "orderG.BookingNo",
      "orderG.IssueDate",
      "orderG.ExpDate",
      "orderG.POD",
      "orderG.FPOD",
      "orderG.TransitID",
      "orderG.ShipperName",
      "orderG.PinCode",
      "orderG.EirNo",
      "orderG.ItemID",
      "orderG.CommodityDescription"
    )
    .leftJoin(
      "DT_VESSEL_VISIT AS vessel",
      "vessel.VoyageKey",
      "orderG.VoyageKey"
    );

  if (req.body.SoPin) {
    query.where("orderG.PinCode", req.body.SoPin);
  }

  if (req.body.EIRNo) {
    query.where("orderG.EirNo", req.body.EIRNo);
  }

  let arrOrder = (await query.catch((err) => console.log(err))) || [];
  if (!arrOrder.length) {
    response["iStatus"] = false;
    response["iMessage"] = "Không có dữ liệu từ bảng lệnh";
    response["iPayload"] = [];
    return response;
  }
  if (arrOrder.length > 1) {
    response["iStatus"] = false;
    response["iPayload"] = [];
    response["iMessage"] =
      "Hiện tại số lệnh này bao gồm 2 số pin trở lên, vui lòng cung cấp thêm số pin!";
    return response;
  }
  if (!arrOrder[0].BillOfLading && !arrOrder[0].BookingNo) {
    response["iStatus"] = false;
    response["iPayload"] = [];
    response["iMessage"] = "Không có số vận đơn || số bookingNo";
    return response;
  }
  var queryBlock = await req
    .gtos("DT_BLOCK_STOCK")
    .select("Block")
    .where("BBNo", arrOrder[0].BillOfLading || arrOrder[0].BookingNo)
    .orderBy("Block")
    .catch((err) => console.log(err));
  //Kiểm tra sau(Phong)
  // if (!queryBlock.length) {
  //   response["iStatus"] = false;
  //   response["iPayload"] = [];
  //   response["iMessage"] = "Không có vị trí theo số vận đơn hoặc số bookingNo";
  //   return response;
  // }
  var block = queryBlock
    .map((item) => item.Block)
    .filter((value, index, self) => value && self.indexOf(value) === index)
    .join(", ");
  arrOrder[0].Block = block;
  // console.log(arrOrder);
  response["iStatus"] = true;
  response["iPayload"] = arrOrder.map((item) => ({
    ...item,
    ETB: item.ETB ? moment(item.ETB).format("DD/MM/YYYY") : "",
    ETD: item.ETD ? moment(item.ETD).format("DD/MM/YYYY") : "",
    IssueDate: item.IssueDate
      ? moment(item.IssueDate).format("DD/MM/YYYY")
      : "",
    ExpDate: item.ExpDate ? moment(item.ExpDate).format("DD/MM/YYYY") : "",
  }));
  response["iMessage"] = "Load dữ liệu thành công!";
  return response;
};

//Thoilc(*Note)-Load danh sách xe
module.exports.loadCarInfo = async (req) => {
  var response = {
    iStatus: false,
    iPayload: [],
    iMessage: "",
  };
  let query = req
    .gtos("JOB_GATE AS gate")
    .select(
      "vessel.VesselName",
      "vessel.InboundVoyage",
      "vessel.OutboundVoyage",
      "vessel.ETB",
      "vessel.ETD",
      "gate.VoyageKey",
      "gate.GateInID",
      "gate.StartDate",
      "gate.GateOutID",
      "gate.InOut",
      "gate.ClassID",
      "gate.TransitID",
      "gate.CusTypeID",
      "gate.CusID",
      "gate.EirNo",
      "gate.PinCode",
      "gate.InvDraftNo",
      "gate.InvNo",
      "gate.PaymentTypeID",
      "gate.BillOfLading",
      "gate.BookingNo",
      "gate.JobModeID",
      "gate.MethodID",
      "gate.Block",
      "gate.TruckNo",
      "gate.CargoType",
      "gate.Remark",
      // "WeightC.trailer_weight",
      // "WeightC.RM_No",
      // "WeightC.romooc_weight",
      // "WeightC.trailer_weight",
      // "WeightC.romooc_weight",
      // "WeightC.allowed_trailer_weight",
      // "WeightC.allowed_romooc_weight",
      // "WeightC.Phone_Number",
      "orderG.IssueDate",
      "orderG.ExpDate",
      "orderG.ShipperName",
      "gate.rowguid",
      "gate.Sequence"
    )
    .leftJoin("DT_VESSEL_VISIT AS vessel", "vessel.VoyageKey", "gate.VoyageKey")
    // .leftJoin(
    //   "Weight_Category AS WeightC",
    //   "WeightC.license_plate",
    //   "gate.TruckNo"
    // )
    .leftJoin("ORD_EIR_BULK AS orderG", "orderG.EirNo", "gate.EirNo")
    // .whereNull("WeightC.ModifiedBy")
    .whereNull("gate.FinishDate")
    .limit(1)
    .orderBy("gate.CreateTime", "desc");
  console.log(query.toString());
  let newData = (await query.catch((err) => console.log(err))) || [];
  if (newData.length) {
    response["iStatus"] = true;
    response["iPayload"] = newData.map((item) => ({
      ...item,
      ETB: item.ETB ? moment(item.ETB).format("DD/MM/YYYY") : "",
      ETD: item.ETD ? moment(item.ETD).format("DD/MM/YYYY") : "",
      IssueDate: item.IssueDate
        ? moment(item.IssueDate).format("DD/MM/YYYY")
        : "",
      ExpDate: item.ExpDate ? moment(item.ExpDate).format("DD/MM/YYYY") : "",
    }));
    response["iMessage"] = "Load dữ liệu thành công!";
    return response;
  } else {
    response["iStatus"] = false;
    response["iPayload"] = [];
    response["iMessage"] = "Không có dữ liệu!";
    return response;
  }
};

//Thoilc(*Note)-Thêm dữ liệu khi pass gate
module.exports.saveJobGate = async (req) => {
  var response = {
    iStatus: false,
    iPayload: [],
    iMessage: "",
  };

  if (!req.body.VoyageKey) {
    response["iStatus"] = false;
    response["iMessage"] = "Vui lòng cung cấp mã tàu!";
    return response;
  }
  if (!req.body.ClassID) {
    response["iStatus"] = false;
    response["iMessage"] = "Vui lòng cung cấp ClassID!";
    return response;
  }
  if (!req.body.CusTypeID) {
    response["iStatus"] = false;
    response["iMessage"] = "Vui lòng cung cấp loại khách hàng!";
    return response;
  }
  if (!req.body.CusID) {
    response["iStatus"] = false;
    response["iMessage"] = "Vui lòng cung cấp mã khách hàng!";
    return response;
  }
  if (!(req.body.BillCheck !== 1 || req.body.BillCheck !== 0)) {
    response["iStatus"] = false;
    response["iMessage"] = "Vui lòng cung cấp bill!";
    return response;
  }
  if (!req.body.TruckNo) {
    response["iStatus"] = false;
    response["iMessage"] = "Vui lòng cung cấp số xe!";
    return response;
  }
  if (!req.body.trailer_weight) {
    response["iStatus"] = false;
    response["iMessage"] = "Vui lòng cung cấp trọng lượng đăng kiểm!";
    return response;
  }
  if (!req.body.allowed_trailer_weight) {
    response["iStatus"] = false;
    response["iMessage"] = "Vui lòng cung cấp trọng tải cho phép đăng kiểm!";
    return response;
  }
  if (!req.body.RemoocNo) {
    response["iStatus"] = false;
    response["iMessage"] = "Vui lòng cung cấp số remooc!";
    return response;
  }
  if (!req.body.romooc_weight) {
    response["iStatus"] = false;
    response["iMessage"] = "Vui lòng cung cấp trọng lượng remooc!";
    return response;
  }
  if (!req.body.allowed_romooc_weight) {
    response["iStatus"] = false;
    response["iMessage"] = "Vui lòng cung cấp trọng tải cho phép remooc!";
    return response;
  }
  if (!req.body.EirNo) {
    response["iStatus"] = false;
    response["iMessage"] = "Vui lòng cung cấp số lệnh!";
    return response;
  }
  if (!req.body.PinCode) {
    response["iStatus"] = false;
    response["iMessage"] = "Vui lòng cung cấp số pin!";
    return response;
  }
  if (!req.session.userdata["UserID"]) {
    response["iStatus"] = false;
    response["iMessage"] = "Vui lòng cung cấp tên người dùng!";
    return response;
  }
  let objCarRemooc = {
    license_plate: req.body.TruckNo.replace(/-\s/g, ""),
    trailer_weight: Number(req.body.trailer_weight),
    allowed_trailer_weight: Number(req.body.allowed_trailer_weight),
    RM_No: req.body.RemoocNo.replace(/-\s/g, ""),
    romooc_weight: Number(req.body.romooc_weight),
    allowed_romooc_weight: Number(req.body.allowed_romooc_weight),
    Phone_Number: req.body.Driver_PhoneNo,
  };
  var querySequence = req.gtos("JOB_GATE").select("Sequence");
  if (req.body.EirNo) {
    querySequence = querySequence.where("EirNo", req.body.EirNo);
  }
  if (req.body.VoyageKey) {
    querySequence = querySequence.where("VoyageKey", req.body.VoyageKey);
  }
  if (req.body.ClassID) {
    querySequence = querySequence.where(
      req.body.ClassID === "1" ? "BillOfLading" : "BookingNo",
      req.body.ClassID === "1" ? req.body.BillOfLading : req.body.BookingNo
    );
  }
  var checkTruck =
    (await req
      .gtos("Weight_Category")
      .select("license_plate")
      .where("license_plate", objCarRemooc.license_plate)
      .limit(1)
      .catch((err) => console.log(err))) || [];
  var checkRemooc =
    (await req
      .gtos("Weight_Category")
      .select("RM_No")
      .where("RM_No", objCarRemooc.RM_No)
      .limit(1)
      .catch((err) => console.log(err))) || [];
  //Thoilc(*Note)-Xe bắt đầu đăng ký lệnh để vào cổng
  if (req.body.TypeGate === "I") {
    //Thoilc(*Note)-Khi và chỉ khi pass-gate cùng số xe khi đã hoàn tất
    var checkGate =
      (await req
        .gtos("JOB_GATE")
        .select("TruckNo")
        .where("TruckNo", objCarRemooc.license_plate)
        .whereNull("FinishDate")
        .limit(1)
        .catch((err) => console.log(err))) || [];
    if (!checkGate.length) {
      var checkItem =
        (await querySequence
          .limit(1)
          .orderBy("Sequence", "desc")
          .catch((err) => console.log(err))) || [];

      let newObj = {
        VoyageKey: req.body.VoyageKey,
        GateInID: req.body.GateName,
        StartDate: moment().format("YYYY-MM-DD HH:mm:ss"),
        InOut: req.body.JobModeID === "LAYN" ? "O" : "I",
        ClassID: Number(req.body.ClassID),
        TransitID: req.body.TransitID ? req.body.TransitID : null,
        CusTypeID: req.body.CusTypeID ? req.body.CusTypeID : null,
        CusID: req.body.CusID,
        EirNo: req.body.EirNo,
        PinCode: req.body.PinCode,
        InvDraftNo: req.body.InvDraftNo ? req.body.InvDraftNo : null,
        InvNo: req.body.InvNo ? req.body.InvNo : null,
        PaymentTypeID: req.body.PaymentTypeID ? req.body.PaymentTypeID : null,
        [req.body.ClassID === "1" ? "BillOfLading" : "BookingNo"]:
          req.body.ClassID === "1" ? req.body.BillOfLading : req.body.BookingNo,
        JobModeID: req.body.JobModeID ? req.body.JobModeID : null,
        MethodID: req.body.MethodID ? req.body.MethodID : null,
        POD: req.body.POD,
        Block: req.body.Block,
        TruckNo: objCarRemooc.license_plate,
        Remark: req.body.Note ? req.body.Note : null,
        Sequence: checkItem.length ? Number(checkItem[0].Sequence) + 1 : 1,
        ItemID: req.body.ItemID,
        CommodityDescription: req.body.CommodityDescription,
        CreatedBy: req.session.userdata["UserID"],
        CreateTime: moment().format("YYYY-MM-DD HH:mm:ss"),
      };
      // var checkYard =
      //   (await req
      //     .gtos("JOB_YARD")
      //     .select("VoyageKey")
      //     .where("VoyageKey", newObj.VoyageKey)
      //     .where("TruckNo", newObj.TruckNumber)
      //     .limit(1)
      //     .catch((err) => console.log(err))) || [];
      // if (!checkYard.length) {
      // let objYard = {
      //   ClassID: newObj.ClassID,
      //   TallyType: 2,
      //   EirNo: newObj.EirNo,
      //   PinCode: newObj.PinCode,
      //   BillOfLading: req.body.BillOfLading ? req.body.BillOfLading : null,
      //   BookingNo: req.body.BookingNo ? req.body.BookingNo : null,
      //   ItemID: req.body.ItemID,
      //   VoyageKey: newObj.VoyageKey,
      //   TruckNo: newObj.TruckNo,
      //   Block: newObj.Block,
      //   Note: newObj.Remark,
      //   FinishDate: null,
      //   CreatedBy: req.session.userdata["UserID"],
      //   CreateTime: moment().format("YYYY-MM-DD HH:mm:ss"),
      // };
      let objInsert = {
        ...objCarRemooc,
        CreatedBy: req.session.userdata["UserID"],
        insert_time: moment().format("YYYY-MM-DD[T]HH:mm:ss"),
      };

      if (checkTruck.length) {
        //Thoilc(*Note)-Kiểm tra số xe
        let objUpdate = {
          trailer_weight: objCarRemooc.trailer_weight,
          allowed_trailer_weight: objCarRemooc.allowed_trailer_weight,
          Phone_Number: objCarRemooc.Phone_Number,
          ModifiedBy: req.session.userdata["UserID"],
          update_time: moment().format("YYYY-MM-DD HH:mm:ss"),
        };
        await req
          .gtos("Weight_Category")
          .where("license_plate", objCarRemooc.license_plate)
          .update(objUpdate)
          .catch((err) => console.error(err));
      }
      if (checkRemooc.length) {
        //Thoilc(*Note)-Kiểm tra số remooc
        let objUpdate = {
          romooc_weight: objCarRemooc.romooc_weight,
          allowed_romooc_weight: objCarRemooc.allowed_romooc_weight,
          Phone_Number: objCarRemooc.Phone_Number,
          ModifiedBy: req.session.userdata["UserID"],
          update_time: moment().format("YYYY-MM-DD HH:mm:ss"),
        };
        await req
          .gtos("Weight_Category")
          .where("RM_No", objCarRemooc.RM_No)
          .update(objUpdate)
          .catch((err) => console.error(err));
      }

      //Thoilc(*Note)-Thêm dữ liệu số xe
      await req.gtos("Weight_Category").insert(objInsert);
      //Thoilc(*Note)-Thêm dữ liệu JOB_YARD
      // await req.gtos("JOB_YARD").insert(objYard);
      //Thoilc(*Note)-Thêm dữ liệu JOB_GATE
      await req.gtos("JOB_GATE").insert(newObj);
      // console.log(req.gtos("JOB_GATE").insert(newObj).toString());
      response["iStatus"] = true;
      response["iPayload"] = newObj;
      response["iInsert"] = true;
      response["iMessage"] = "Thêm dữ liệu thành công!";
      return response;
      // } else {
      //   response["iStatus"] = false;
      //   response["iMessage"] = "Không thể thêm dữ liệu!";
      //   return response;
      // }
    } else {
      response["iStatus"] = false;
      response["iMessage"] = `Xe đã thực hiện lệnh ${checkGate.TruckNo}!`;
      return response;
    }
  } else {
    //Thoilc(*Note)-Xe hoàn tất công việc và out ra cổng
    var checkItem =
      (await req
        .gtos("JOB_GATE")
        .select("VoyageKey", "EirNo", "PinCode", "BillOfLading", "BookingNo")
        .where("rowguid", req.body.rowguid)
        .whereNull("FinishDate")
        .limit(1)
        .catch((err) => console.log(err))) || [];

    if (checkItem.length) {
      let objGateUpdate = {
        TruckNo: objCarRemooc.license_plate,
        GateOutID: req.body.GateName,
        Quantity: req.body.Quantity ? Number(req.body.Quantity) : 0,
        McWeight: req.body.McWeight ? Number(req.body.McWeight) : 0,
        Volume: req.body.Volume ? req.body.Volume : null,
        Remark: req.body.Note,
        FinishDate: moment().format("YYYY-MM-DD[T]HH:mm:ss"),
        ModifiedBy: req.session.userdata["UserID"],
        UpdateTime: moment().format("YYYY-MM-DD[T]HH:mm:ss"),
      };

      let objInsert = {
        ...objCarRemooc,
        CreatedBy: req.session.userdata["UserID"],
        insert_time: moment().format("YYYY-MM-DD[T]HH:mm:ss"),
      };
      let objUpdate = {
        Phone_Number: objCarRemooc.Phone_Number,
        ModifiedBy: req.session.userdata["UserID"],
        update_time: moment().format("YYYY-MM-DD HH:mm:ss"),
      };
      objCarRemooc.license_plate
        ? (objUpdate["license_plate"] = objCarRemooc.license_plate)
        : "";
      objCarRemooc.trailer_weight
        ? (objUpdate["trailer_weight"] = objCarRemooc.trailer_weight)
        : "";
      objCarRemooc.allowed_trailer_weight
        ? (objUpdate["allowed_trailer_weight"] =
          objCarRemooc.allowed_trailer_weight)
        : "";
      objCarRemooc.RM_No ? (objUpdate["RM_No"] = objCarRemooc.RM_No) : "";
      objCarRemooc.romooc_weight
        ? (objUpdate["romooc_weight"] = objCarRemooc.romooc_weight)
        : "";
      objCarRemooc.allowed_romooc_weight
        ? (objUpdate["allowed_romooc_weight"] =
          objCarRemooc.allowed_romooc_weight)
        : "";
      if (checkTruck.length) {
        await req
          .gtos("Weight_Category")
          .where("license_plate", objCarRemooc.license_plate)
          .update(objUpdate)
          .catch((err) => console.error(err));
      }
      if (checkRemooc.length) {
        await req
          .gtos("Weight_Category")
          .where("license_plate", objCarRemooc.license_plate)
          .update(objUpdate)
          .catch((err) => console.error(err));
      }
      await req.gtos("Weight_Category").insert(objInsert);
      response["iStatus"] = true;
      response["iPayload"] = await req
        .gtos("JOB_GATE")
        .where("rowguid", req.body.rowguid)
        .whereNull("FinishDate")
        .update(objGateUpdate)
        .catch((err) => console.error(err));
      response["iUpdate"] = true;
      response["iMessage"] = "Thêm dữ liệu thành công!";
      return response;
    } else {
      response["iStatus"] = false;
      response["iMessage"] = "Hiện tại không có thông tin xe để qua cổng!";
      return response;
    }
  }
};

//Thoilc(*Note)-Load ds xe hoặc remooc
module.exports.loadCar_RmNum = async (req) => {
  var response = {
    iStatus: false,
    iPayload: [],
    iMessage: "",
  };

  var remoocNo = req.body.RM_No;
  var licenseNo = req.body.license_plate;
  var query = req
    .gtos("Weight_Category AS wc")
    .select("wc.RM_No", "wc.romooc_weight", "wc.allowed_romooc_weight", "wc.license_plate", "wc.trailer_weight", "wc.allowed_trailer_weight"
      , 'bl.TruckNo', 'bl.Reason')
    .leftJoin('GATE_BLACK_LIST AS bl', 'bl.TruckNo', 'wc.license_plate')

  if (remoocNo) {
    query.where("RM_No", remoocNo)
  }
  if (licenseNo) {
    query.where("license_plate", licenseNo)
  }

  //kiem tra thong tin dang ky
  query = await query.limit(1).catch(err => console.log(err)) || [];
  if (query.length == 0) {
    response["iStatus"] = false;
    response["iMessage"] = `Số ${remoocNo ? 'remooc' : 'xe'} hiện tại chưa đăng ký!`;
    return response;
  }

  //kiem tra danh sach cam vao cang
  if (query[0].TruckNo) {
    response["iStatus"] = false;
    response["iBacklst"] = true;
    response["iPayload"] = query;
    // response["iMessage"] = "Xe có trong black list, không thể vào cảng!";
    return response;
  }

  response["iStatus"] = true;
  response["iMessage"] = "Load dữ liệu thành công!";
  response["iPayload"] = query;
  return response;
};

//Thoilc(*Note)-Thêm danh sách xe ở dạng backlist
module.exports.saveBacklst = async (req) => {
  var response = {
    iStatus: false,
    iPayload: [],
    iMessage: "",
  };

  if (!req.body.TruckNo) {
    response["iStatus"] = false;
    response["iMessage"] = "Vui lòng cung cấp số xe!";
    return response;
  }
  if (!req.body.Reason) {
    response["iStatus"] = false;
    response["iMessage"] = "Vui lòng cung cấp lý do!";
    return response;
  }

  var query =
    (await req
      .gtos("GATE_BLACK_LIST")
      .select("TruckNo", "Reason")
      .where("TruckNo", req.body.TruckNo)
      .limit(1)
      .catch((err) => console.log(err))) || [];

  if (query.length) {
    response["iStatus"] = false;
    response["iMessage"] = "Số xe đã được thêm trước đó!";
    return response;
  } else {
    let obj = {
      TruckNo: req.body.TruckNo,
      Reason: req.body.Reason,
      CreatedBy: req.session.userdata["UserID"],
      insert_time: moment().format("YYYY-MM-DD[T]HH:mm:ss"),
    };
    await req.gtos("GATE_BLACK_LIST").insert(obj);
    response["iStatus"] = true;
    response["iPayload"] = obj;
    response["iMessage"] = "Thêm dữ liệu thành công!";
    return response;
  }
};

//Thoilc(*Note)-Load danh mục cổng
module.exports.loadBsGate = async (req) => {
  var response = {
    iStatus: false,
    iPayload: [],
    iMessage: "",
  };
  var query =
    (await req
      .gtos("BS_GATE")
      .select("GateID", "InOut", "ClassID")
      .orderBy("GateID", "desc")
      .catch((err) => console.log(err))) || [];
  if (query.length) {
    response["iStatus"] = true;
    response["iPayload"] = query;
    response["iMessage"] = "Load dữ liệu thành công!";
    return response;
  } else {
    response["iStatus"] = false;
    response["iPayload"] = [];
    response["iMessage"] = "Không có dữ liệu danh mục cổng!";
    return response;
  }
};

//Thoilc(*Note)-Load dữ liệu trên lưới
module.exports.loadRefData = async (req) => {
  var response = {
    iStatus: false,
    iPayload: [],
    iMessage: "",
  };
  let query =
    (await req
      .gtos("JOB_GATE AS gate")
      .select(
        "gate.StartDate",
        "gate.InOut",
        "gate.ClassID",
        "gate.EirNo",
        "gate.BillOfLading",
        "gate.BookingNo",
        "gate.TruckNo",
        "gate.rowguid"
      )
      .whereNull("gate.FinishDate")
      .orderBy("gate.CreateTime", "desc")
      .catch((err) => console.log(err))) || [];
  if (query.length) {
    response["iStatus"] = true;
    response["iPayload"] = query;
    response["iMessage"] = "Load dữ liệu thành công!";
    return response;
  } else {
    response["iStatus"] = false;
    response["iPayload"] = [];
    response["iMessage"] = "Không có dữ liệu!";
    return response;
  }
};

//Thoilc(*Note)-Load dữ liệu trên lưới
module.exports.loadCarTable = async (req) => {
  var response = {
    iStatus: false,
    iPayload: [],
    iMessage: "",
  };
  if (!req.body.TruckNo) {
    response["iStatus"] = false;
    response["iPayload"] = [];
    response["iMessage"] = "Không tìm thấy số xe!";
    return response;
  }

  let query =
    (await req
      .gtos("JOB_GATE AS gate")
      .select(
        "gate.VoyageKey",
        "dtVessel.VesselName",
        "dtVessel.ATB",
        "dtVessel.InboundVoyage",
        "dtVessel.OutboundVoyage",
        "gate.GateInID",
        "gate.GateOutID",
        "gate.TransitID",
        "gate.CusTypeID",
        "gate.CusID",
        "gate.PinCode",
        "gate.InvDraftNo",
        "gate.InvNo",
        "gate.PaymentTypeID",
        "gate.JobTypeID",
        "gate.JobModeID",
        "gate.MethodID",
        "gate.Sequence",
        "gate.CarWeight",
        "gate.Remark",
        "gate.Quantity",
        "gate.McWeight",
        "gate.Volume",
        "gate.ItemID",
        "gate.CommodityDescription",
        "gate.StartDate",
        "gate.InOut",
        "gate.ClassID",
        "gate.EirNo",
        "gate.BillOfLading",
        "gate.BookingNo",
        "gate.TruckNo",
        "gate.rowguid",
        "gate.Block",
        "WeightC.license_plate",
        "WeightC.trailer_weight",
        "WeightC.romooc_weight",
        "WeightC.allowed_trailer_weight",
        "WeightC.allowed_romooc_weight",
        "WeightC.RM_No",
        "WeightC.Phone_Number",
        "orBulk.IssueDate",
        "orBulk.ShipperName"
      )
      .leftJoin(
        "Weight_Category AS WeightC",
        "WeightC.license_plate",
        "gate.TruckNo"
      )
      .leftJoin("DT_VESSEL_VISIT AS dtVessel", 'dtVessel.VoyageKey', 'gate.VoyageKey')
      .leftJoin("ORD_EIR_BULK AS orBulk", function () {
        this
          .on("gate.EirNo", "orBulk.EirNo")
          .on("gate.PinCode", "orBulk.PinCode");
      })
      .where("gate.TruckNo", req.body.TruckNo)
      .whereNull("WeightC.ModifiedBy")
      .orderBy("gate.CreateTime", "desc")
      .limit(1)
      .catch((err) => console.log(err))) || [];
  if (query.length) {
    response["iStatus"] = true;
    response["iPayload"] = query;
    response["iMessage"] = "Load dữ liệu thành công!";
    return response;
  } else {
    response["iStatus"] = false;
    response["iPayload"] = [];
    response["iMessage"] = "Không có dữ liệu!";
    return response;
  }
};

//Thoilc(*Note)-Load dữ liệu gate
module.exports.loadDataGate = async (req) => {
  var response = {
    iStatus: false,
    iPayload: [],
    iMessage: "",
  };
  let arrTime = [];
  arrTime = req.body.time.split(' - ');
  var query = req.gtos("JOB_GATE AS jGate")
    .select("jGate.rowguid", "jGate.EirNo", "jGate.PinCode", "jGate.BillOfLading", "jGate.BookingNo", "jGate.Quantity", "jGate.McWeight",
      "jMode.JobModeName", "jGate.TruckNo", "jGate.Block", "jGate.StartDate", "jGate.FinishDate", "jGate.CommodityDescription",
      // "bsCus.CusName",
      "dtVessel.VesselName", "jGate.POD", "jGate.Remark", "dtVessel.InboundVoyage", "dtVessel.OutboundVoyage", "dtVessel.ATB", "orBulk.IssueDate",
      "jGate.Sequence", "orBulk.ShipperName")
    // .leftJoin("BS_CUSTOMER AS bsCus", "bsCus.CusID", "jGate.CusID")
    .leftJoin("BS_JOB_MODE AS jMode", "jMode.JobModeID", "jGate.JobModeID")
    .leftJoin("DT_VESSEL_VISIT AS dtVessel", "dtVessel.VoyageKey", "jGate.VoyageKey")
    .leftJoin("ORD_EIR_BULK AS orBulk", function () {
      this
        .on("jGate.EirNo", "orBulk.EirNo")
        .on("jGate.PinCode", "orBulk.PinCode");
    });
  if (req.body.time) {
    query.whereBetween("jGate.StartDate", [arrTime[0], arrTime[1]])
  }
  if (req.body.EIRNo) {
    query.where("jGate.EIRNo", req.body.EIRNo)
  }

  if (req.body.BBNo) {
    var checkBill = await req.gtos("JOB_GATE AS jGate")
      .select("jGate.BillOfLading")
      .where("jGate.BillOfLading", req.body.BBNo)
      .catch((error) => console.log(error)) || [];
    var checkBkNo = await req.gtos("JOB_GATE AS jGate")
      .select("jGate.BookingNo")
      .where("jGate.BookingNo", req.body.BBNo)
      .catch((error) => console.log(error)) || [];

    if (checkBill.length) {
      query.where("jGate.BillOfLading", req.body.BBNo);
    }
    if (checkBkNo.length) {
      query.where("jGate.BookingNo", req.body.BBNo);
    }
  }
  // console.log(query.toString());
  query = (await query.catch((err) => console.log(err))) || [];
  if (query.length) {
    let dataNew = query.map(item => {
      return {
        ...item,
        StartDate: moment(item.StartDate).format("YYYY-MM-DD HH:mm:ss"),
        FinishDate: moment(item.FinishDate).format("YYYY-MM-DD HH:mm:ss"),
      };
    })
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