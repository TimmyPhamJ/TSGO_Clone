const moment = require("moment-timezone");

//Thoilc(*Note)-Get dữ liệu khi người dùng nhập số eir || pincode
module.exports.loadOrderEirBulk = async (req) => {
  var response = {
    iStatus: false,
    iPayload: [],
    iMessage: "",
  };
  let query;
  if (!req.body.SoPin && !req.body.EIRNo) {
    response["iStatus"] = false;
    response["iMessage"] = "Vui lòng cung cấp số lệnh hoặc số pin!";
    return response;
  }
  if (req.body.TypeGate === "I") {
    query = req
      .gtos("ORD_EIR_BULK AS orderG")
      .select(
        "orderG.VoyageKey",
        "vessel.VesselName",
        "vessel.InboundVoyage",
        "vessel.OutboundVoyage",
        "vessel.ETB",
        "vessel.ETD",
        "orderG.UnitID",
        "orderG.IsLocalForeign",
        "orderG.JobModeID",
        "orderG.CusTypeID",
        "orderG.CusID",
        "orderG.PaymentTypeID",
        "orderG.DraftNo",
        "orderG.InvoiceNo",
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
        "orderG.CommodityDescription",
        "jMode.JobModeName"
      )
      .leftJoin(
        "DT_VESSEL_VISIT AS vessel",
        "vessel.VoyageKey",
        "orderG.VoyageKey"
      )
      .leftJoin("BS_JOB_MODE AS jMode", "jMode.JobModeID", "orderG.JobModeID");

    if (req.body.SoPin) {
      query.where("orderG.PinCode", req.body.SoPin);
    }

    if (req.body.EIRNo) {
      query.where("orderG.EirNo", req.body.EIRNo);
    }
  }
  else {
    query = req
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
        "gate.DraftNo",
        "gate.InvoiceNo",
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
        "WeightC.License_Plate",
        "WeightC.Trailer_Weight",
        "WeightC.Romooc_Weight",
        "WeightC.Allowed_Trailer_Weight",
        "WeightC.Allowed_Romooc_Weight",
        "WeightC.RM_No",
        "WeightC.Phone_Number",
        "orBulk.IssueDate",
        "orBulk.ShipperName"
      )
      .leftJoin(
        "WT_CATEGORY AS WeightC",
        "WeightC.License_Plate",
        "gate.TruckNo"
      )
      .leftJoin("DT_VESSEL_VISIT AS dtVessel", 'dtVessel.VoyageKey', 'gate.VoyageKey')
      .leftJoin("ORD_EIR_BULK AS orBulk", function () {
        this
          .on("gate.EirNo", "orBulk.EirNo")
          .on("gate.PinCode", "orBulk.PinCode");
      })
      .whereNull("gate.FinishDate")
      .whereNull("WeightC.ModifiedBy")
      .orderBy("gate.CreateTime", "desc")
      .limit(1);


    if (req.body.SoPin) {
      query.where("gate.PinCode", req.body.SoPin);
    }

    if (req.body.EIRNo) {
      query.where("gate.EirNo", req.body.EIRNo);
    }
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
  if (arrOrder && arrOrder[0] && req.body.TypeGate === "I") {
    let checkMNF = await req.gtos("DT_MNF_LD_BULK")
      .select("rowguid", "LDStatus")
      .where(req.gtos.raw('CONCAT(BillOfLading,BookingNo)'), arrOrder[0].BillOfLading || arrOrder[0].BookingNo)
      .where("ClassID", arrOrder[0].ClassID)
      .where("VoyageKey", arrOrder[0].VoyageKey)
      .whereIn("JobModeID", ['NGTH', 'XGTH'])
      .catch((err) => console.log(err)) || [];
    if (checkMNF && checkMNF[0] && checkMNF[0].LDStatus != 'B') {
      response["iStatus"] = false;
      response["iPayload"] = [];
      response["iMessage"] = "Chưa phân bổ công việc !";
      return response;
    }
  }
  var queryBlock = await req
    .gtos("DT_BLOCK_STOCK")
    .select("Block")
    .where("BBNo", arrOrder[0].BillOfLading || arrOrder[0].BookingNo)
    .orderBy("Block")
    .catch((err) => console.log(err)) || [];
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
    UserName: req.user_info.UserName
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
      "gate.DraftNo",
      "gate.InvoiceNo",
      "gate.PaymentTypeID",
      "gate.BillOfLading",
      "gate.BookingNo",
      "gate.JobModeID",
      "gate.MethodID",
      "gate.Block",
      "gate.TruckNo",
      "gate.CargoType",
      "gate.Remark",
      // "WeightC.Trailer_Weight",
      // "WeightC.RM_No",
      // "WeightC.Romooc_Weight",
      // "WeightC.Trailer_Weight",
      // "WeightC.Romooc_Weight",
      // "WeightC.Allowed_Trailer_Weight",
      // "WeightC.Allowed_Romooc_Weight",
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
    //   "WeightC.License_Plate",
    //   "gate.TruckNo"
    // )
    .leftJoin("ORD_EIR_BULK AS orderG", "orderG.PinCode", "gate.PinCode")
    // .whereNull("WeightC.ModifiedBy")
    .whereNull("gate.FinishDate")
    .orderBy("gate.CreateTime", "desc");
  // console.log(query.toString());
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
  if (!req.body.Trailer_Weight) {
    response["iStatus"] = false;
    response["iMessage"] = "Vui lòng cung cấp trọng lượng đăng kiểm!";
    return response;
  }
  if (!req.body.Allowed_Trailer_Weight) {
    response["iStatus"] = false;
    response["iMessage"] = "Vui lòng cung cấp trọng tải cho phép đăng kiểm!";
    return response;
  }
  if (!req.body.RemoocNo) {
    response["iStatus"] = false;
    response["iMessage"] = "Vui lòng cung cấp số remooc!";
    return response;
  }
  if (!req.body.Romooc_Weight) {
    response["iStatus"] = false;
    response["iMessage"] = "Vui lòng cung cấp trọng lượng remooc!";
    return response;
  }
  if (!req.body.Allowed_Romooc_Weight) {
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
    License_Plate: req.body.TruckNo.replace(/-\s/g, ""),
    Trailer_Weight: Number(req.body.Trailer_Weight),
    Allowed_Trailer_Weight: Number(req.body.Allowed_Trailer_Weight),
    RM_No: req.body.RemoocNo.replace(/-\s/g, ""),
    Romooc_Weight: Number(req.body.Romooc_Weight),
    Allowed_Romooc_Weight: Number(req.body.Allowed_Romooc_Weight),
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

  let checkTruckPlan = (await req
    .gtos("PLAN_DEVICE")
    .select("rowguid")
    .where("VoyageKey", req.body.VoyageKey)
    .where("DeviceID", req.body.TruckNo)
    .limit(1)
    .catch((err) => console.log(err))) || [];
  if (!checkTruckPlan || !checkTruckPlan[0]) {
    response["iStatus"] = false;
    response["iMessage"] = "Xe [" + req.body.TruckNo + "] không nằm trong kế hoạch !";
    return response;
  }

  var checkTruck =
    (await req
      .gtos("WT_CATEGORY")
      .select("License_Plate")
      .where("License_Plate", objCarRemooc.License_Plate)
      .limit(1)
      .catch((err) => console.log(err))) || [];
  var checkRemooc =
    (await req
      .gtos("WT_CATEGORY")
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
        .where("TruckNo", objCarRemooc.License_Plate)
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
        InOut: req.body.JobModeID === "LAYN" ? "O" : "I",
        ClassID: Number(req.body.ClassID),
        TransitID: req.body.TransitID ? req.body.TransitID : null,
        CusTypeID: req.body.CusTypeID ? req.body.CusTypeID : null,
        CusID: req.body.CusID,
        EirNo: req.body.EirNo,
        PinCode: req.body.PinCode,
        DraftNo: req.body.DraftNo ? req.body.DraftNo : null,
        InvoiceNo: req.body.InvoiceNo ? req.body.InvoiceNo : null,
        PaymentTypeID: req.body.PaymentTypeID ? req.body.PaymentTypeID : null,
        [req.body.ClassID === "1" ? "BillOfLading" : "BookingNo"]:
          req.body.ClassID === "1" ? req.body.BillOfLading : req.body.BookingNo,
        JobModeID: req.body.JobModeID ? req.body.JobModeID : null,
        MethodID: req.body.MethodID ? req.body.MethodID : null,
        POD: req.body.POD,
        Block: req.body.Block,
        TruckNo: objCarRemooc.License_Plate,
        RM_No: objCarRemooc.RM_No,
        Remark: req.body.Note ? req.body.Note : null,
        Sequence: checkItem.length ? Number(checkItem[0].Sequence) + 1 : 1,
        ItemID: req.body.ItemID,
        UnitID: req.body.UnitID,
        IsLocalForeign: req.body.IsLocalForeign,
        CommodityDescription: req.body.CommodityDescription,
        CreatedBy: req.session.userdata["UserID"],
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
          Trailer_Weight: objCarRemooc.Trailer_Weight,
          Allowed_Trailer_Weight: objCarRemooc.Allowed_Trailer_Weight,
          Phone_Number: objCarRemooc.Phone_Number,
          ModifiedBy: req.session.userdata["UserID"],
          update_time: moment().format("YYYY-MM-DD HH:mm:ss"),
        };
        await req
          .gtos("WT_CATEGORY")
          .where("License_Plate", objCarRemooc.License_Plate)
          .update(objUpdate)
          .catch((err) => console.error(err));
      }
      if (checkRemooc.length) {
        //Thoilc(*Note)-Kiểm tra số remooc
        let objUpdate = {
          Romooc_Weight: objCarRemooc.Romooc_Weight,
          Allowed_Romooc_Weight: objCarRemooc.Allowed_Romooc_Weight,
          Phone_Number: objCarRemooc.Phone_Number,
          ModifiedBy: req.session.userdata["UserID"],
          update_time: moment().format("YYYY-MM-DD HH:mm:ss"),
        };
        await req
          .gtos("WT_CATEGORY")
          .where("RM_No", objCarRemooc.RM_No)
          .update(objUpdate)
          .catch((err) => console.error(err));
      }

      //Thoilc(*Note)-Thêm dữ liệu số xe
      await req.gtos("WT_CATEGORY").insert(objInsert);
      //Thoilc(*Note)-Thêm dữ liệu JOB_YARD
      // await req.gtos("JOB_YARD").insert(objYard);
      //Thoilc(*Note)-Thêm dữ liệu JOB_GATE
      await req.gtos("JOB_GATE").insert(newObj);
      global.io.sendData('pathname','/gate','reload_gate',newObj.TruckNo);
      // console.log(req.gtos("JOB_GATE").insert(newObj).toString());
      response["iStatus"] = true;
      response["iPayload"] = Object.assign(newObj, { StartDate: moment.utc(moment.utc().format()).local().format() });
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
        TruckNo: objCarRemooc.License_Plate,
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
      objCarRemooc.License_Plate
        ? (objUpdate["License_Plate"] = objCarRemooc.License_Plate)
        : "";
      objCarRemooc.Trailer_Weight
        ? (objUpdate["Trailer_Weight"] = objCarRemooc.Trailer_Weight)
        : "";
      objCarRemooc.Allowed_Trailer_Weight
        ? (objUpdate["Allowed_Trailer_Weight"] =
          objCarRemooc.Allowed_Trailer_Weight)
        : "";
      objCarRemooc.RM_No ? (objUpdate["RM_No"] = objCarRemooc.RM_No) : "";
      objCarRemooc.Romooc_Weight
        ? (objUpdate["Romooc_Weight"] = objCarRemooc.Romooc_Weight)
        : "";
      objCarRemooc.Allowed_Romooc_Weight
        ? (objUpdate["Allowed_Romooc_Weight"] =
          objCarRemooc.Allowed_Romooc_Weight)
        : "";
      if (checkTruck.length) {
        await req
          .gtos("WT_CATEGORY")
          .where("License_Plate", objCarRemooc.License_Plate)
          .update(objUpdate)
          .catch((err) => console.error(err));
      }
      if (checkRemooc.length) {
        await req
          .gtos("WT_CATEGORY")
          .where("License_Plate", objCarRemooc.License_Plate)
          .update(objUpdate)
          .catch((err) => console.error(err));
      }
      await req.gtos("WT_CATEGORY").insert(objInsert);
      response["iStatus"] = true;
      response["iPayload"] = await req
        .gtos("JOB_GATE")
        .where("rowguid", req.body.rowguid)
        .whereNull("FinishDate")
        .update(objGateUpdate)
        .catch((err) => console.error(err));
      global.io.sendData('pathname','/gate','reload_gate',req.body.rowguid);
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
  var licenseNo = req.body.License_Plate;
  var VoyageKey = req.body.VoyageKey;
  var query = req
    .gtos("WT_CATEGORY AS wc")
    .select("wc.RM_No", "wc.Romooc_Weight", "wc.Allowed_Romooc_Weight", "wc.License_Plate", "wc.Trailer_Weight", "wc.Allowed_Trailer_Weight"
      , 'bl.TruckNo', 'bl.Reason')
    .leftJoin('GATE_BLACK_LIST AS bl', 'bl.TruckNo', 'wc.License_Plate')

  if (remoocNo) {
    query.where("RM_No", remoocNo)
  }
  if (licenseNo) {
    query.where("License_Plate", licenseNo)
  }
  if (licenseNo && VoyageKey) {
    let checkPLTruck = (await req
      .gtos("PLAN_DEVICE")
      .select("rowguid")
      .where("VoyageKey", VoyageKey || '')
      .where("DeviceID", licenseNo || '')
      .limit(1)
      .catch((err) => console.log(err))) || [];
    //console.log(checkPLTruck);
    if (!checkPLTruck[0]) {
      response["iStatus"] = false;
      response["iMessage"] = "Xe [" + licenseNo + "] không nằm trong kế hoạch !";
      return response;
    }
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
        "dtVessel.ETB",
        "dtVessel.ETD",
        "dtVessel.InboundVoyage",
        "dtVessel.OutboundVoyage",
        "gate.GateInID",
        "gate.GateOutID",
        "gate.TransitID",
        "gate.CusTypeID",
        "gate.CusID",
        "gate.PinCode",
        "gate.DraftNo",
        "gate.InvoiceNo",
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
        "WeightC.License_Plate",
        "WeightC.Trailer_Weight",
        "WeightC.Romooc_Weight",
        "WeightC.Allowed_Trailer_Weight",
        "WeightC.Allowed_Romooc_Weight",
        "WeightC.RM_No",
        "WeightC.Phone_Number",
        "orBulk.InvoiceNo",
        "orBulk.ExpDate",
        "orBulk.POD",
        "orBulk.FPOD",
        "orBulk.TransitID",
        "orBulk.IssueDate",
        "orBulk.ShipperName"
      )
      .leftJoin(
        "WT_CATEGORY AS WeightC",
        "WeightC.License_Plate",
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
    query = query.map(item => ({
      ...item,
      ETB: item.ETB ? moment(item.ETB).format("DD/MM/YYYY") : "",
      ETD: item.ETD ? moment(item.ETD).format("DD/MM/YYYY") : "",
      IssueDate: item.IssueDate
        ? moment(item.IssueDate).format("DD/MM/YYYY")
        : "",
      ExpDate: item.ExpDate ? moment(item.ExpDate).format("DD/MM/YYYY") : ""
    }))
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
    query.whereBetween("jGate.StartDate", [moment(arrTime[0]).format("YYYY-MM-DD 00:00:00"), moment(arrTime[1]).format("YYYY-MM-DD 23:59:59")])
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
        StartDate: item.StartDate ? moment(item.StartDate).format("YYYY-MM-DD HH:mm:ss") : '',
        FinishDate: item.FinishDate ? moment(item.FinishDate).format("YYYY-MM-DD HH:mm:ss") : '',
        UserName: req.user_info.UserName
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