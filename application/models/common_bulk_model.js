const { gtos, gtosglobal } = require('../config/database');
const moment = require('moment-timezone');

const loadEquipmentTypeList = async () => {
    return await gtos().select('*').from('BS_EQUIPMENT_TYPE').catch(err => console.log(err)) || [];
}

/* BS_EQUIPMENT_TYPE */
const saveEquipmentType = async (req, datas) => {
    for await (let item of datas) {
        delete item['rowguid'];

        item['ModifiedBy'] = req.session.userdata["UserID"];
        item['UpdateTime'] = moment().format('YYYY-MM-DD HH:mm:ss');
        item['CreatedBy'] = item['ModifiedBy'];

        let checkItem = await gtos().from('BS_EQUIPMENT_TYPE')
            .select("EquipmentTypeID")
            .where('EquipmentTypeID', item['EquipmentTypeID'])
            .limit(1).catch(err => console.log(err));

        if (checkItem && checkItem.length == 0) {
            item['CreateTime'] = item['UpdateTime'];
            gtos('BS_EQUIPMENT_TYPE').insert(item)
        }
    }

    return true;
}

const deleteEquipmentType = async (datas) => {
    var result = {
        error: [], success: []
    }

    var equipmentTypes = await gtos()
        .from('BS_EQUIPMENT_TYPE').select('rowguid', 'EquipmentTypeID')
        .whereIn('rowguid', item).catch(err => console.log(err)) || [];

    for await (let item of datas) {
        var equipmentTypeID = equipmentTypes.filter(p => p.rowguid == item).map(p => p.EquipmentTypeID)[0];
        if (!equipmentTypeID) continue;

        var checkExist = await gtos()
            .count({ countExist: 'rowguid' }).from("BS_EQUIPMENT")
            .where('EquipmentTypeID', equipmentTypeID).catch(err => console.log(err)) || undefined;

        if (checkExist && checkExist[0]?.countExist > 0) {
            result['error'].push(`Không thể xóa - đã phát sinh Thiết bị với Mã loại thiết bị: ${equipmentTypeID}`);
            continue;
        }
        try {
            await gtos('BS_EQUIPMENT_TYPE').where('rowguid', item).del();
            result['success'].push(`'Xóa thành công Mã loại thiết bị [${equipmentTypeID}]`)
        } catch (error) {
            result['error'].push(`'Không thể xóa [${equipmentTypeID}] - ${error.message || 'unknown error'}`)
        }
    }

    return result;
}

/* BS_EQUIPMENT */
const loadEquipmentList = async () => {
    return await gtos('BS_EQUIPMENT').select('EquipmentTypeID', 'EquipmentID', 'EquipmentName', 'IsOwn', 'rowguid').catch(err => console.log(err)) || [];
}

const loadEquipmentDataByTruckNo = async (truckNumber = '') => {
    return await gtos()
        .select('B.BillOfLading', 'B.BookingNo', 'EquipmentTypeID', 'EquipmentID', 'EquipmentName', 'EquipmentWeight', 'StockRef')
        .from('BS_EQUIPMENT AS A')
        .leftJoin('JOB_QUAY B', 'A.EquipmentID', 'B.TruckNo')
        .where('EquipmentID', truckNumber).catch(err => console.log(err)) || [];
}

const loadTruckWeightDataWithEirNo = async (TruckNo = '') => {
    await gtos().select(gtosglobal.raw('max(A.Sequence) as maxSequence'), 'A.EirNo', 'B.TruckWeight', 'A.BillOfLading', 'FirstWeightScale', 'SecondWeightScale')
        .from('JOB_GATE AS A')
        .where('A.TruckNo', TruckNo)
        .leftJoin('BS_TRUCK_WEIGHT AS B', 'A.TruckNo', 'B.TruckNo')
        .groupBy('A.EirNo', 'B.TruckWeight', 'A.BillOfLading', 'FirstWeightScale', 'SecondWeightScale')
        .catch(err => console.log(err)) || []
}

module.exports = {
    loadEquipmentTypeList,
    saveEquipmentType,
    deleteEquipmentType,
    loadEquipmentList,
    loadEquipmentDataByTruckNo,
    loadTruckWeightDataWithEirNo
}