const moment = require("moment-timezone");

//Thoilc(*Note)-Load danh sách dịch vụ tàu
module.exports.loadDetailSrv = async (req) => {
    var response = {
        iStatus: false,
        iPayload: [],
        iMessage: "",
    };

    let queryUnit = await req
        .gtos("BS_UNIT")
        .select("UnitID", "UnitName")
        .orderBy("CreateTime")
        .catch(err => console.log(err)) || [];

    let queryServiceJob = await req
        .gtos("BS_SERVICE")
        .select("ServiceID", "ServiceName")
        .where("IsQuayJob", 1)
        .orderBy("CreateTime")
        .catch(err => console.log(err)) || [];

    let queryService = await req
        .gtos("BS_SERVICE")
        .select("ServiceID", "ServiceName")
        .where("IsQuayJob", 1)
        .orderBy("CreateTime")
        .catch(err => console.log(err)) || [];

    response["iPayload"] = { queryUnit: queryUnit, queryServiceJob: queryServiceJob, queryService: queryService };
    response["iStatus"] = true;
    response["iMessage"] = "Load dữ liệu thành công!";
    return response;
};

module.exports.loadData = async (req) => {
    var response = {
        iStatus: false,
        iPayload: [],
        iMessage: "",
    };
    let query = req
        .gtos("DT_VESSEL_SERVICE AS dtVesselSrv")
        .select("dtVesselSrv.rowguid", "dtVesselSrv.ServiceID", "dtVesselSrv.ServiceName",
            "dtVesselSrv.Quantity", "bsUnit.UnitName", "dtVesselSrv.Note")
        .leftJoin("BS_UNIT AS bsUnit", "bsUnit.UnitID", "dtVesselSrv.UnitID")
        .orderBy("dtVesselSrv.CreateTime");
    if (req.body.VoyageKey) {
        query = query.where("dtVesselSrv.VoyageKey", req.body.VoyageKey)
    }
    if (req.body.ClassID) {
        query = query.where("dtVesselSrv.ClassID", req.body.ClassID)
    }
    // console.log(query.toString());
    query = (await query.catch((err) => console.log(err))) || [];
    if (query.length) {
        response["iStatus"] = true;
        response["iPayload"] = query;
        response["iMessage"] = "Load dữ liệu thành công!";
        return response;
    } else {
        response["iStatus"] = false;
        response["iMessage"] = "Không có dữ liệu!";
        return response;
    }
};

//Thoilc(*Note)-Lưu dữ liệu dịch vụ tàu
module.exports.saveVesselSrv = async (req) => {
    var response = {
        iStatus: false,
        iPayload: [],
        iMessage: "",
    };
    let prm = [];
    for await (let item of req.body.data || []) {
        var checkItem = await req
            .gtos("DT_VESSEL_SERVICE")
            .select("rowguid")
            .where("rowguid", item["rowguid"] || null)
            .limit(1)
            .catch((err) => console.log(err));

        if (checkItem && checkItem.length > 0) {
            item["ModifiedBy"] = req.session.userdata["UserID"];
            item["UpdateTime"] = moment().format("YYYY-MM-DD HH:mm:ss");
            prm.push(
                req
                    .gtos("DT_VESSEL_SERVICE")
                    .where("rowguid", item.rowguid || null)
                    .update(item)
            );
        } else {
            delete item["rowguid"];
            item["CreatedBy"] = req.session.userdata["UserID"];
            prm.push(req.gtos("DT_VESSEL_SERVICE").insert(item));
        }
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

//Thoilc(*Note)-Xoá dữ liệu dịch vụ tàu
module.exports.delVesselSrv = async (req) => {
    var response = {
        iStatus: false,
        iMessage: "",
    };
    try {
        await req
            .gtos("DT_VESSEL_SERVICE")
            .whereIn(
                "rowguid",
                (req.body.data || []).map((itm) => itm.rowguid)
            )
            .del();
        response["iStatus"] = true;
        response["iMessage"] = "Xoá dữ liệu thành công!";
        return response;
    } catch (error) {
        response["iStatus"] = false;
        response["iMessage"] = "Xoá dữ liệu thất bại!";
        return response;
    }
};