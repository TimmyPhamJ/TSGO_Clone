const moment = require("moment-timezone");

//Thoilc(*Note)-Get dữ liệu khi người dùng nhập bộ filter
module.exports.loadDataPort = async (req) => {
    var response = {
        iStatus: false,
        iPayload: [],
        iMessage: "",
    };
    let query = req
        .gtos("JOB_GATE AS jGate")
        .select("jGate.rowguid", "jGate.BillOfLading", "jGate.BookingNo", "jGate.ClassID", "bsClass.ClassName", "dtVessel.VoyageKey",
            "dtVessel.VesselName", "dtVessel.InboundVoyage", "dtVessel.OutboundVoyage", "bsJobmd.JobModeName", "bsMethod.MethodName",
            "jGate.CommodityDescription", "jGate.Quantity", "jGate.McWeight", "jGate.Volume", "jGate.GateInID", "bsGateIn.GateName AS GateIn",
            "jGate.StartDate", "jGate.GateOutID", "bsGateOut.GateName AS GateOut", "jGate.FinishDate", "jGate.TruckNo", "jGate.RM_No",
            "jGate.Remark")
        .leftJoin("DT_VESSEL_VISIT AS dtVessel", "dtVessel.VoyageKey", "jGate.VoyageKey")
        .leftJoin("BS_METHOD AS bsMethod", "bsMethod.MethodID", "jGate.MethodID")
        .leftJoin("BS_JOB_MODE AS bsJobmd", "bsJobmd.JobModeID", "bsMethod.JobModeID")
        .leftJoin("BS_GATE AS bsGateIn", "bsGateIn.GateID", "jGate.GateInID")
        .leftJoin("BS_GATE AS bsGateOut", "bsGateOut.GateID", "jGate.GateOutID")
        .leftJoin("BS_CLASS AS bsClass", "bsClass.ClassID", "jGate.ClassID");
    if (req.body.VoyageKey) {
        query = query.where("jGate.VoyageKey", req.body.VoyageKey);
    }

    if (req.body.BookingNo) {
        query = query.where("jGate.BookingNo", req.body.BookingNo);
    }

    if (req.body.BillOfLading) {
        query = query.where("jGate.BillOfLading", req.body.BillOfLading);
    }

    if (req.body.EriNo) {
        query = query.where("jGate.EriNo", req.body.EriNo);
    }

    if (req.body.PinCode) {
        query = query.where("jGate.PinCode", req.body.PinCode);
    }

    if (req.body.GetIn || req.body.GetOut) {
        query = query
            .where('jGate.FinishDate', '>=', req.body.GetIn)
            .where('jGate.FinishDate', '<', req.body.GetOut);
    }
    // console.log(query.toString());
    let data = await query.catch((err) => console.log(err)) || [];
    // console.log(data);
    if (data.length) {
        let dataAll = data.map(item => {
            return {
                ...item,
                Quantity: item.Quantity ? (item.Quantity).toFixed(3) : '',
                McWeight: item.McWeight ? (item.McWeight).toFixed(3) : '',
                Volume: item.Volume ? (item.Volume).toFixed(3) : '',
                VesselInfo: item.VesselName + "/" + item.InboundVoyage + "/" + item.OutboundVoyage,
                StartDate: item.StartDate ? moment(item.StartDate).format("YYYY-MM-DD HH:mm:ss") : '',
                FinishDate: item.FinishDate ? moment(item.FinishDate).format("YYYY-MM-DD HH:mm:ss") : ''
            }
        });
        // console.log(dataAll);
        response["iPayload"] = dataAll;
        response["iStatus"] = true;
        response["iMessage"] = "Load dữ liệu thành công!";
        return response;
    } else {
        response["iStatus"] = false;
        response["iMessage"] = "Không tìm thấy dữ liệu!";
        return response;
    }
};

//Thoilc(*Note)-Get dữ liệu khi người dùng nhập bộ filter
module.exports.loadDataYard = async (req) => {
    var response = {
        iStatus: false,
        iPayload: [],
        iMessage: "",
    };
    let query = req
        .gtos("JOB_YARD AS jYard")
        .select("jYard.rowguid", "jYard.BillOfLading", "jYard.BookingNo", "bsClass.ClassName", "dtVessel.VoyageKey",
            "dtVessel.VesselName", "dtVessel.InboundVoyage", "dtVessel.OutboundVoyage", "bsJobmd.JobModeName", "bsMethod.MethodName",
            "jYard.Block", "bsDevice.DeviceName", "bsWorker.WorkerGroupName", "jYard.Quantity", "jYard.McWeight", "jYard.Volume",
            "jYard.TruckNo", "bsUnit.UnitName", "jYard.FinishDate", "jYard.Note", "bsItem.ItemName")
        .leftJoin("DT_VESSEL_VISIT AS dtVessel", "dtVessel.VoyageKey", "jYard.VoyageKey")
        .leftJoin("BS_ITEM AS bsItem", "bsItem.ItemID", "jYard.ItemID")
        .leftJoin("BS_METHOD AS bsMethod", "bsMethod.MethodID", "jYard.MethodID")
        .leftJoin("BS_JOB_MODE AS bsJobmd", "bsJobmd.JobModeID", "bsMethod.JobModeID")
        .leftJoin("BS_CLASS AS bsClass", "bsClass.ClassID", "jYard.ClassID")
        .leftJoin("BS_DEVICE AS bsDevice", "bsDevice.DeviceID", "jYard.DeviceID")
        .leftJoin("BS_WORKER_GROUP AS bsWorker", "bsWorker.WorkerGroupID", "jYard.WorkerGroupID")
        .leftJoin("BS_UNIT AS bsUnit", "bsUnit.UnitID", "jYard.UnitID");
    if (req.body.VoyageKey) {
        query = query.where("jYard.VoyageKey", req.body.VoyageKey);
    }

    if (req.body.BookingNo) {
        query = query.where("jYard.BookingNo", req.body.BookingNo);
    }

    if (req.body.BillOfLading) {
        query = query.where("jYard.BillOfLading", req.body.BillOfLading);
    }

    if (req.body.EriNo) {
        query = query.where("jYard.EriNo", req.body.EriNo);
    }

    if (req.body.PinCode) {
        query = query.where("jYard.PinCode", req.body.PinCode);
    }

    if (req.body.GetIn || req.body.GetOut) {
        query = query
            .where('jYard.FinishDate', '>=', req.body.GetIn)
            .where('jYard.FinishDate', '<', req.body.GetOut);
    }
    // console.log(query.toString());
    let data = await query.catch((err) => console.log(err)) || [];
    // console.log(data);
    if (data.length) {
        let dataAll = data.map(item => {
            return {
                ...item,
                Quantity: item.Quantity ? (item.Quantity).toFixed(3) : '',
                McWeight: item.McWeight ? (item.McWeight).toFixed(3) : '',
                Volume: item.Volume ? (item.Volume).toFixed(3) : '',
                VesselInfo: item.VesselName + "/" + item.InboundVoyage + "/" + item.OutboundVoyage,
                FinishDate: item.FinishDate ? moment(item.FinishDate).format("YYYY-MM-DD HH:mm:ss") : ''
            }
        });
        // console.log(dataAll);
        response["iPayload"] = dataAll;
        response["iStatus"] = true;
        response["iMessage"] = "Load dữ liệu thành công!";
        return response;
    } else {
        response["iStatus"] = false;
        response["iMessage"] = "Không tìm thấy dữ liệu!";
        return response;
    }
};
//Thoilc(*Note)-Load danh sách cổng
module.exports.loadDetailPort = async (req) => {
    var response = {
        iStatus: false,
        iPayload: [],
        iMessage: "",
    };
    let queryItem = await req
        .gtos("BS_ITEM")
        .select("ItemID", "ItemName")
        .orderBy("CreateTime")
        .catch(err => console.log(err)) || [];

    let queryGateIn = await req
        .gtos("BS_GATE")
        .select("GateID", "GateName")
        .where("InOut", "I")
        .orderBy("CreateTime")
        .catch(err => console.log(err)) || [];

    let queryGateOut = await req
        .gtos("BS_GATE")
        .select("GateID", "GateName")
        .where("InOut", "O")
        .orderBy("CreateTime")
        .catch(err => console.log(err)) || [];

    response["iPayload"] = { queryItem: queryItem, queryGateIn: queryGateIn, queryGateOut: queryGateOut };
    response["iStatus"] = true;
    response["iMessage"] = "Load dữ liệu thành công!";
    return response;
};

//Thoilc(*Note)-Load danh sách bãi
module.exports.loadDetailYard = async (req) => {
    var response = {
        iStatus: false,
        iPayload: [],
        iMessage: "",
    };
    let queryItem = await req
        .gtos("BS_ITEM")
        .select("ItemID", "ItemName")
        .orderBy("CreateTime")
        .catch(err => console.log(err)) || [];

    let queryDevice = await req
        .gtos("BS_DEVICE")
        .select("DeviceID", "DeviceName")
        .orderBy("CreateTime")
        .catch(err => console.log(err)) || [];

    let queryWorker = await req
        .gtos("BS_WORKER_GROUP")
        .select("WorkerGroupID", "WorkerGroupName")
        .orderBy("CreateTime")
        .catch(err => console.log(err)) || [];

    let queryUnit = await req
        .gtos("BS_UNIT")
        .select("UnitID", "UnitName")
        .orderBy("CreateTime")
        .catch(err => console.log(err)) || [];

    let queryBlock = await req
        .gtos("BS_YP_BLOCK")
        .select("Block")
        .orderBy("CreateTime")
        .catch(err => console.log(err)) || [];

    response["iPayload"] = { queryItem: queryItem, queryDevice: queryDevice, queryWorker: queryWorker, queryUnit: queryUnit, queryBlock: queryBlock };
    response["iStatus"] = true;
    response["iMessage"] = "Load dữ liệu thành công!";
    return response;
};

//Thoilc(*Note)-Lưu dữ liệu cổng
module.exports.savePort = async (req) => {
    var response = {
        iStatus: false,
        iMessage: "",
    };
    if (!req.body.data || !req.body.data.length) {
        response["iStatus"] = false;
        response["iMessage"] = "Không có dữ liệu cập nhật!";
        return response;
    }
    let prm = [];
    for await (let item of (req.body.data)) {
        let dataObj = {};
        dataObj['ItemID'] = item['ItemID'];
        dataObj['CommodityDescription'] = item['CommodityDescription'];
        dataObj['Quantity'] = parseFloat(item['Quantity'] || 0);
        dataObj['McWeight'] = parseFloat(item['McWeight'] || 0);
        dataObj['Volume'] = parseFloat(item['Volume'] || 0);
        dataObj['GateInID'] = item['GateInID'];
        dataObj['StartDate'] = item['StartDate'];
        dataObj['GateOutID'] = item['GateOutID'];
        dataObj['FinishDate'] = item['FinishDate'];
        dataObj['TruckNo'] = item['TruckNo'];
        dataObj['RM_No'] = item['RM_No'];
        dataObj['Remark'] = item['Remark'];
        dataObj['ModifiedBy'] = req.session.userdata["UserID"];
        dataObj['UpdateTime'] = moment().format('YYYY-MM-DD HH:mm:ss');
        prm.push(req.gtos('JOB_GATE').where('rowguid', item.rowguid || null).update(dataObj));
    }
    let flag = false
    await Promise.all(prm)
        .then(() => {
            flag = true;
        })
        .catch((err) => {
            console.log(err);
        });
    if (flag) {
        response["iStatus"] = true;
        response["iMessage"] = "Cập nhật thành công!";
        return response;
    } else {
        response["iStatus"] = false;
        response["iMessage"] = "Cập nhật thất bại!";
        return response;
    }
};

//Thoilc(*Note)-Lưu dữ liệu bãi
module.exports.saveYard = async (req) => {
    var response = {
        iStatus: false,
        iMessage: "",
    };
    if (!req.body.data || !req.body.data.length) {
        response["iStatus"] = false;
        response["iMessage"] = "Không có dữ liệu cập nhật!";
        return response;
    }
    let prm = [];
    for await (let item of (req.body.data)) {
        let dataObj = {};
        dataObj['Block'] = item['Block'];
        dataObj['ItemID'] = item['ItemName'];
        dataObj['DeviceID'] = item['DeviceName'];
        dataObj['WorkerGroupID'] = item['WorkerGroupName'];
        dataObj['UnitID'] = item['UnitName'];
        dataObj['WorkerGroupID'] = item['WorkerGroupName'];
        dataObj['Quantity'] = item['Quantity'] || 0;
        dataObj['McWeight'] = parseFloat(item['McWeight'] || 0);
        dataObj['Volume'] = parseFloat(item['Volume'] || 0);
        dataObj['GateInID'] = item['GateInID'];
        dataObj['StartDate'] = item['StartDate'];
        dataObj['GateOutID'] = item['GateOutID'];
        dataObj['FinishDate'] = item['FinishDate'];
        dataObj['TruckNo'] = item['TruckNo'];
        dataObj['Note'] = item['Note'];
        dataObj['ModifiedBy'] = req.session.userdata["UserID"];
        dataObj['UpdateTime'] = moment().format('YYYY-MM-DD HH:mm:ss');
        prm.push(req.gtos('JOB_YARD').where('rowguid', item.rowguid || null).update(dataObj));
    }
    let flag = false
    await Promise.all(prm)
        .then(() => {
            flag = true;
        })
        .catch((err) => {
            console.log(err);
        });
    if (flag) {
        response["iStatus"] = true;
        response["iMessage"] = "Cập nhật thành công!";
        return response;
    } else {
        response["iStatus"] = false;
        response["iMessage"] = "Cập nhật thất bại!";
        return response;
    }
};