const moment = require("moment-timezone");

module.exports.loadTemplate = async (req) => {
    var response = {
        iStatus: false,
        iPayload: [],
        iMessage: "",
    };
    let query = await req
        .gtos("TRF_TEMPLATE")
        .select("TPLTCode", "Remark")
        .orderBy("CreateTime");
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

module.exports.loadTrfStandard = async (req) => {
    var response = {
        iStatus: false,
        iPayload: [],
        iMessage: "",
    };
    let query = req
        .gtos("TRF_STANDARD AS trfStandard")
        .select("trfStandard.TRFCode", "trfStandard.TRFDesc", "trfStandard.ClassID", "trfStandard.CargoTypeID", "trfStandard.JobTypeID", "trfStandard.JobModeID",
            "trfStandard.MethodID", "trfStandard.TransitID", "trfStandard.IsLocalForeign", "trfStandard.ServiceID",
            "trfStandard.ItemID", "trfStandard.FormGRT", "trfStandard.ToGRT", "trfStandard.UnitID", "trfStandard.CurrencyCode", "trfStandard.Price", "trfStandard.VAT", "trfStandard.IncludeVAT",
            "trfStandard.rowguid", "trfStandard.CargoGroup", "trfStandard.Remark", "bsJobMode.JobModeName", "bsMethod.MethodName", "bsCargotype.CargoTypeName", "bsItem.ItemName", "bsUnit.UnitName"
        )
        .leftJoin("BS_METHOD AS bsMethod", " bsMethod.MethodID", "trfStandard.MethodID")
        .leftJoin("BS_JOB_MODE AS bsJobMode", "bsJobMode.JobModeID", "trfStandard.JobModeID")
        .leftJoin("BS_CARGOTYPE AS bsCargotype", "bsCargotype.CargoTypeID", "trfStandard.CargoTypeID")
        .leftJoin("BS_ITEM AS bsItem", "bsItem.ItemID", "trfStandard.ItemID")
        .leftJoin("BS_UNIT AS bsUnit", "bsUnit.UnitID", "trfStandard.UnitID")
    let trfStandard = req.body.trfStandard.split("-");
    let applyDate = trfStandard[0] ? moment(trfStandard[0], "DD/MM/YYYY").format("YYYY-MM-DD HH:mm:ss") : '';
    let expireDate = trfStandard[1] ? moment(trfStandard[1], "DD/MM/YYYY").format("YYYY-MM-DD HH:mm:ss") : '';
    let remark = trfStandard[2] ? trfStandard[2] : '';
    if (applyDate) {
        query = query.where("trfStandard.ApplyDate", applyDate);
    }

    if (expireDate) {
        query = query.where("trfStandard.ExpireDate", expireDate);
    }

    if (remark) {
        query = query.whereLike("trfStandard.Remark", remark + "%");
    }

    if (req.body.CurrencyCode) {
        query = query.where("trfStandard.CurrencyCode", req.body.CurrencyCode);
    }
    // console.log(query.toString());
    query = await query.catch(err => console.log(err)) || [];
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

module.exports.loadTrfTemplate = async (req) => {
    var response = {
        iStatus: false,
        iPayload: [],
        iMessage: "",
    };
    let query = await req.gtos("TRF_TEMPLATE").select("rowguid", "TRF_Standard_Rowguid", "TPLTCode", "TPLTDesc", "CurrencyCode", "TRFCode").catch(err => console.log(err)) ?? [];
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

module.exports.saveTrfTemplate = async (req) => {
    var response = {
        iStatus: false,
        iPayload: [],
        iMessage: "",
    };
    let prm = [];
    for await (let item of req.body.data || []) {
        if (req.body.data[0].TRF_Standard_Rowguid || req.body.data[0].rowguid) {
            var checkTPLTCode = await req
                .gtos("TRF_TEMPLATE")
                .select("rowguid")
                .where("TPLTCode", item.TPLTCode || null)
                .limit(1)
                .catch((err) => console.log(err));
        } else {
            var checkItem = await req
                .gtos("TRF_TEMPLATE")
                .select("TPLTCode")
                .where("TPLTCode", item.TPLTCode || null)
                .limit(1)
                .catch((err) => console.log(err));
        }
        if (checkTPLTCode && checkTPLTCode.length) {
            await req
                .gtos("TRF_TEMPLATE")
                .whereIn(
                    "TPLTCode",
                    (req.body.data || []).map((itm) => itm.TPLTCode)
                )
                .del();
            if (item.isCheck == 1) {
                delete item["rowguid"];
                delete item["isCheck"];
                item["CreatedBy"] = req.session.userdata["UserID"];
                // console.log(req.gtos("TRF_TEMPLATE").insert(item).toString());
                prm.push(req.gtos("TRF_TEMPLATE").insert(item));
            }
        } else {
            delete item["isCheck"];
            if (checkItem && checkItem.length) {
                item["ModifiedBy"] = req.session.userdata["UserID"];
                item["UpdateTime"] = moment().format("YYYY-MM-DD HH:mm:ss");
                prm.push(
                    req
                        .gtos("TRF_TEMPLATE")
                        .where("TPLTCode", item.TPLTCode || null)
                        .update(item)
                );
            } else {
                delete item["rowguid"];
                delete item["isCheck"];
                item["CreatedBy"] = req.session.userdata["UserID"];
                // console.log("check2", req.gtos("TRF_TEMPLATE").insert(item).toString());
                prm.push(req.gtos("TRF_TEMPLATE").insert(item));
            }
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

module.exports.delTrfTemplate = async (req) => {
    var response = {
        iStatus: false,
        iMessage: "",
    };
    try {
        await req
            .gtos("TRF_TEMPLATE")
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