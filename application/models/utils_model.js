const { gtos } = require("../config/database");
const getLanePort = async (req) => {
    let query = req
        .gtos("BS_LANE")
        .select("LaneID", "LaneName", "OprList", "PortList")
        .orderBy("LaneID");
    if (req.body.laneID) {
        query.where("LaneID", req.body.laneID)
    }
    return (await query.catch((err) => console.log(err))) || [];
};

const getUnitName = async (unitcode) => {
    var data = await gtos('BS_UNIT').select('UnitID', 'UnitName')
        .where('UnitID', unitcode).limit(1).catch(err => console.log(err)) || [];
    return data.length > 0 ? data[0]['UnitID'] : unitcode;
}

const getItems = async (req) => {
    var rquery = req.gtos('BS_ITEM').select('CargoTypeID', 'ItemID', 'ItemName')
    if (req.ItemID) {
        rquery.where('ItemID', req.ItemID)
    }
    if (req.CargoTypeID) {
        rquery.where('CargoTypeID', req.CargoTypeID)
    }
    var data = await rquery.catch(err => console.log(err)) || [];
    return data;
}

const getPaymentTypeAndMethod = async (req) => {
    var rquery = req.gtos('BS_INV_PAYMENT_TYPE AS pt').select('pt.PaymentTypeID', 'PaymentTypeName', 'pm.PaymentMethod')
    .leftJoin('BS_PAYMENT_METHOD AS pm', 'pm.PaymentTypeID', 'pt.PaymentTypeID')
    if (req.PaymentTypeID) {
        rquery.where('pt.PaymentTypeID', req.PaymentTypeID)
    }
    var data = await rquery.catch(err => console.log(err)) || [];
    return data;
}

const getClassCode = async (req) => {
    var rquery = req.gtos('BS_CLASS').select('ClassID', 'ClassName')
    if (req.ClassID) {
        rquery.where('ClassID', req.ClassID)
    }
    var data = await rquery.catch(err => console.log(err)) || [];
    return data;
}

module.exports = {
    getLanePort,
    getUnitName,
    getItems,
    getPaymentTypeAndMethod,
    getClassCode
}
