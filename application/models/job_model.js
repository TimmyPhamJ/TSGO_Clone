const moment = require("moment-timezone");

//Thoilc(*Note)-Load phương án và loại hàng
module.exports.loadPortJob = async (req) => {
    var response = {
        iStatus: false,
        iPayload: [],
        iMessage: "",
    };

    let queryJobMode = await req
        .gtos("BS_JOB_MODE")
        .select("JobModeID", "JobModeName")
        .orderBy("CreateTime")
        .catch(err => console.log(err)) || [];

    let queryItem = await req
        .gtos("BS_ITEM")
        .select("ItemID", "ItemName")
        .orderBy("CreateTime")
        .catch(err => console.log(err)) || [];

    response["iPayload"] = { queryJobMode: queryJobMode, queryItem: queryItem };
    response["iStatus"] = true;
    response["iMessage"] = "Load dữ liệu thành công!";
    return response;
};

//Thoilc(*Note)-Load danh sách tally
module.exports.loadDataJob = async (req) => {
    var response = {
        iStatus: false,
        iPayload: [],
        iMessage: "",
    };

    let query = req
        .gtos("JOB_TALLY AS jTally")
        .select("jTally.rowguid", "jTally.BillOfLading", "jTally.BookingNo", "jTally.MethodID", "bsMethod.MethodName", "jTally.JobModeID",
            "bsJobMode.JobModeName", "jTally.ItemID", "bsItem.ItemName", "jTally.UnitID", "bsUnit.UnitName", "jTally.Quantity", "jTally.McWeight",
            "jTally.Volume", "jTally.TransitID", "bsTran.TransitName", "jTally.Note", "dtMnf.CusID", "bsCus.CusName", "dtMnf.IsLocalForeign",
            "jTally.ClassID")
        .leftJoin("DT_MNF_LD_BULK AS dtMnf", function () {
            this.on("dtMnf.VoyageKey", "jTally.VoyageKey").on(
                req.gtos.raw("ISNULL(dtMnf.BillOfLading,dtMnf.BookingNo)"),
                req.gtos.raw("ISNULL(jTally.BillOfLading,jTally.BookingNo)")
            );
        })
        .leftJoin("BS_CUSTOMER AS bsCus", "bsCus.CusID", "dtMnf.CusID")
        .leftJoin("BS_TRANSIT AS bsTran", "bsTran.TransitID", "jTally.TransitID")
        .leftJoin("BS_UNIT AS bsUnit", "bsUnit.UnitID", "jTally.UnitID")
        .leftJoin("BS_ITEM AS bsItem", "bsItem.ItemID", "jTally.ItemID")
        .leftJoin("BS_JOB_MODE AS bsJobMode", "bsJobMode.JobModeID", "jTally.JobModeID")
        .leftJoin("BS_METHOD AS bsMethod", "bsMethod.MethodID", "jTally.MethodID");

    if (req.body.VoyageKey) {
        query = query.where("jTally.VoyageKey", req.body.VoyageKey);
    }
    if (req.body.ClassID) {
        query = query.where("jTally.ClassID", req.body.ClassID);
    }
    if (req.body.IsLocalForeign) {
        query = query.where("dtMnf.IsLocalForeign", req.body.IsLocalForeign);
    }
    if (req.body.ItemID) {
        query = query.where("jTally.ItemID", req.body.ItemID);
    }
    if (req.body.JobModeID) {
        query = query.where("jTally.JobModeID", req.body.JobModeID);
    }
    if (req.body.CusID) {
        query = query.where("dtMnf.CusID", req.body.CusID);
    }
    // console.log(query.toString());
    query = (await query.catch((err) => console.log(err))) || [];
    if (query.length) {
        let queryStatistic = query.map(item => {
            return {
                JobModeID: item.JobModeID,
                JobModeName: item.JobModeName,
                MethodID: item.MethodID,
                MethodName: item.MethodName,
                ItemID: item.ItemID,
                ItemName: item.ItemName,
                UnitID: item.UnitID,
                UnitName: item.UnitName,
                Quantity: item.Quantity,
                McWeight: item.McWeight,
            };
        });
        let dataFilter = queryStatistic.map(p => p.JobModeID + "__" + p.MethodID + "__" + p.ItemID)
            .filter((item, index, self) => self.indexOf(item) === index);
        let arr = [];
        for (let i = 0; i < dataFilter.length; i++) {
            let jobModeID = dataFilter[i].split("__")[0];
            let methodID = dataFilter[i].split("__")[1];
            let itemID = dataFilter[i].split("__")[2];
            let group = queryStatistic.filter(item => item.JobModeID === jobModeID && item.MethodID === methodID && item.ItemID === itemID);

            let Quantity = group.reduce((sum, item) => {
                return sum + item.Quantity;
            }, 0);
            let McWeight = group.reduce((sum, item) => {
                return sum + item.McWeight;
            }, 0);

            let obj = {};
            Object.keys(group[0]).map(item => {
                obj[item] = group[0][item]
            });
            obj = { ...obj, McWeight: (McWeight).toFixed(3), Quantity: Quantity };
            arr.push(obj);
        }
        response["iStatus"] = true;
        response["iPayload"] = { query: query, dataGroup: arr };
        response["iMessage"] = "Load dữ liệu thành công!";
        return response;
    } else {
        response["iStatus"] = false;
        response["iMessage"] = "Không có dữ liệu!";
        return response;
    }
};

//Thoilc(*Note)-1::Đối chiếu mẫu cước để load danh sách cước
module.exports.calTrfStandard = async (req) => {
    var response = {
        iStatus: false,
        iPayload: [],
        iMessage: "",
    };
    let arrStandard = [], arrDiscount = [];
    let query;
    let tempCus = req.body.dataStandard[0].CusInfo.split("/");
    let cusInfo = tempCus[0];
    //Thoilc(*Note)-Kiểm tra cước xem khách hàng có được giảm giá hay không
    for await (let item of req.body.dataStandard || []) {
        query = req
            .gtos("TRF_DISCOUNT")
            .select("TRFCode", "TRFDesc", "Price", "VAT",
                "ApplyDate", "ExpireDate", "rowguid")
            .where("CusID", cusInfo)
            .where("JobModeID", item.JobModeID)
            .where("MethodID", item.MethodID)
            .where("ItemID", item.ItemID);
        // console.log(query.toString());
        query = await query.catch((err) => console.log(err)) || [];
        if (query.length) {
            let iCount = 0;
            query.map((item, index) => {
                return iCount = index + 1;
            });
            if (iCount > 1) {
                response["iStatus"] = false;
                response["iMessage"] = "Hiện tại có 2 mẫu cước khớp với ngày hiện tại!";
                return response;
            } else {
                let dtDiscount = {
                    TRFCode: query[0].TRFCode,
                    TRFDesc: query[0].TRFDesc,
                    ItemID: item.ItemID,
                    ItemName: item.ItemName,
                    UnitID: item.UnitID,
                    UnitName: item.UnitName,
                    ClassID: item.ClassID,
                    Quantity: item.Quantity,
                    Price: query[0].Price,
                    VAT: query[0].VAT,
                    ApplyDate: query[0].ApplyDate,
                    ExpireDate: query[0].ExpireDate,
                    rowguid: query[0].rowguid,
                }
                arrDiscount.push(dtDiscount);
            }
        }
    }
    //Thoilc(*Note)-2::Nếu có thông tin => ra khách hàng được giảm giá thì lấy giá bên Discount còn ngược lại kiểm tra Standard
    if (arrDiscount.length) {
        arrDiscount = arrDiscount;
    } else {
        for await (let item of req.body.dataStandard || []) {
            query = req
                .gtos("TRF_STANDARD")
                .select("TRFCode", "TRFDesc", "Price", "VAT",
                    "ApplyDate", "ExpireDate", "rowguid")
                .where("JobModeID", item.JobModeID)
                .where("MethodID", item.MethodID)
                .where("ItemID", item.ItemID)
            // console.log(query.toString());
            query = await query.catch((err) => console.log(err)) || [];
            if (query.length) {
                let iCount = 0;
                query.map((item, index) => {
                    return iCount = index + 1;
                });
                if (iCount > 1) {
                    response["iStatus"] = false;
                    response["iMessage"] = "Hiện tại có 2 mẫu cước khớp với ngày hiện tại!";
                    return response;
                } else {
                    let dtStandard = {
                        TRFCode: query[0].TRFCode,
                        TRFDesc: query[0].TRFDesc,
                        ItemID: item.ItemID,
                        ItemName: item.ItemName,
                        UnitID: item.UnitID,
                        UnitName: item.UnitName,
                        ClassID: item.ClassID,
                        Quantity: item.Quantity,
                        Price: query[0].Price,
                        VAT: query[0].VAT,
                        ApplyDate: query[0].ApplyDate,
                        ExpireDate: query[0].ExpireDate,
                        rowguid: query[0].rowguid,
                    }
                    arrStandard.push(dtStandard);
                }
            }
        }
    }
    //Thoilc(*Note)-3::Sau khi thoả điểu kiện 1 và 2 tiếp tục kiểm tra các dòng cước bên trong xem còn hiệu lực hay không
    //Thoilc(*Note)-Local timer
    let currentDate = moment.utc().local().format("YYYY-MM-DD HH:mm:ss");
    let dataNew = arrDiscount.length ? arrDiscount : arrStandard;
    let dtAll = [];
    for await (item of dataNew || []) {
        if (currentDate >= moment(item.ApplyDate).format("YYYY-MM-DD HH:mm:ss") && currentDate <= moment(item.ExpireDate).format("YYYY-MM-DD HH:mm:ss")) {
            dtAll.push({
                TPLTCode: item.TRFCode,
                TRFDesc: item.TRFDesc,
                ItemID: item.ItemID,
                ItemName: item.ItemName,
                UnitID: item.UnitID,
                UnitName: item.UnitName,
                ClassID: item.ClassID,
                ClassName: item.ClassID == 1 ? "Nhập" : "Xuất",
                Quantity: 0,
                PriceIncludeVat: 0,
                UnitPrice: 0,
                Price: 0,
                VAT: 10,
                VatAmount: 0,
                TotalAmount: 0,
                PriceCK: 0,
                rowguid: item.rowguid,
            });
        }
    }
    //Thoilc(*Note)-Sau khi mục 3 đã thoả thì trả req về cho FE để load dữ liệu lên lưới hoàn tất tính cước
    // console.log("check 2", dtAll);
    if (dtAll.length) {
        response["iStatus"] = true;
        response["iPayload"] = dtAll;
        response["iMessage"] = "Load dữ liệu thành công!";
        return response;
    } else {
        response["iStatus"] = false;
        response["iMessage"] = "Hiện tại không tìm thấy mẫu cước phù hợp!";
        return response;
    }
};

//Thoilc(*Note)-Đối chiếu mẫu cước để load danh sách cước
module.exports.selTrfTemplate = async (req) => {
    var response = {
        iStatus: false,
        iPayload: [],
        iMessage: "",
    };
    let trfTemplate = req.body.trfTemplate != '*' ? req.body.trfTemplate.split("-") : '';
    let tPLTCode = trfTemplate[0] ? trfTemplate[0] : '';
    let remark = trfTemplate[1] ? trfTemplate[1] : '';
    let query = req
        .gtos("TRF_TEMPLATE AS trfTemplate")
        .select("trfTemplate.TPLTCode", "trfTemplate.TRFDesc", "trfTemplate.Remark", "trfTemplate.ItemID", "bsItem.ItemName",
            "trfTemplate.UnitID", "bsUnit.UnitName", "trfTemplate.ClassID", "trfTemplate.Price", "trfTemplate.VAT", "trfTemplate.rowguid")
        .leftJoin("BS_ITEM AS bsItem", "bsItem.ItemID", "trfTemplate.ItemID")
        .leftJoin("BS_UNIT AS bsUnit", "bsUnit.UnitID", "trfTemplate.UnitID")
    if (req.body.trfTempCurrency) {
        query = query.where("trfTemplate.CurrencyCode", req.body.trfTempCurrency);
    }

    if (tPLTCode) {
        query = query.where("trfTemplate.TPLTCode", tPLTCode);
    }

    if (remark) {
        query = query.where("trfTemplate.Remark", remark);
    }
    // console.log(query.toString());
    query = await query.catch(err => console.log(err)) || [];
    if (query.length) {
        let dataNew = query.map(item => {
            return {
                TPLTCode: item.TPLTCode,
                TRFDesc: item.TRFDesc,
                Remark: item.Remark,
                ItemID: item.ItemID,
                ItemName: item.ItemName,
                UnitID: item.UnitID,
                UnitName: item.UnitName,
                ClassID: item.ClassID,
                ClassName: item.ClassID == 1 ? "Nhập" : "Xuất",
                Quantity: 0,
                PriceIncludeVat: 0,
                UnitPrice: 0,
                Price: 0,
                VAT: 10,
                VatAmount: 0,
                TotalAmount: 0,
                PriceCK: 0,
                rowguid: item.rowguid,
            }
        })
        response["iStatus"] = true;
        response["iPayload"] = dataNew;
        response["iMessage"] = "Load dữ liệu thành công!";
        return response;
    } else {
        response["iStatus"] = false;
        response["iMessage"] = "Không có dữ liệu!";
        return response;
    }
};
