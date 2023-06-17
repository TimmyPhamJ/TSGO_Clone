"use strict"
const { gtos, gtosglobal, knex_once } = require('../config/database');
const moment = require('moment-timezone');

const FunctionModel = require('../models/FunctionModel.js');



/*********************** BS_DEVICETYPE */
module.exports.loadDevice = async (req) => {
    return await req.gtos('BS_DEVICE').select('*').orderBy('DeviceID').catch(err => console.log(err)) || [];
}

module.exports.saveDevice = async (req) => {
    let prm = [];
    for await (let item of (req.body.data || [])) {
        delete item['STT'];

        var checkitem = await req.gtos('BS_DEVICE').select("rowguid").where('DeviceID', item['DeviceID']).orWhere('rowguid', item['rowguid'] || null).limit(1).catch(err => console.log(err));

        if (checkitem && checkitem.length > 0) {
            item['ModifiedBy'] = req.session.userdata["UserID"];
            item['UpdateTime'] = moment().format('YYYY-MM-DD HH:mm:ss');
            /* Do nothing */
            prm.push(req.gtos('BS_DEVICE').where('rowguid', checkitem[0]["rowguid"]).update(item));
        } else {
            delete item['rowguid'];
            item['CreatedBy'] = req.session.userdata["UserID"];
            prm.push(req.gtos('BS_DEVICE').insert(item));
        }

    }
    let rt = false;
    await Promise.all(prm).then(() => { rt = true; }).catch((err) => { console.log(err) });
    return rt;
}

module.exports.deleteDevice = async (req) => {
    try {
        await req.gtos('BS_DEVICE').whereIn('DeviceID', (req.body.data || []).map((itm) => itm.DeviceID)).del();
        return true;
    } catch (error) {
        return false;
    }
}

/*********************** BS_DEVICETYPE */
module.exports.loadDeviceType = async (req) => {
    return await req.gtos('BS_DEVICETYPE').select('*').orderBy('DeviceTypeID').catch(err => console.log(err)) || [];
}

module.exports.saveDeviceType = async (req) => {
    let prm = [];
    for await (let item of (req.body.data || [])) {
        delete item['STT'];

        var checkitem = await req.gtos('BS_DEVICETYPE').select("rowguid").where('DeviceTypeID', item['DeviceTypeID']).orWhere('rowguid', item['rowguid'] || null).limit(1).catch(err => console.log(err));

        if (checkitem && checkitem.length > 0) {
            item['ModifiedBy'] = req.session.userdata["UserID"];
            item['UpdateTime'] = moment().format('YYYY-MM-DD HH:mm:ss');
            /* Do nothing */
            prm.push(req.gtos('BS_DEVICETYPE').where('rowguid', checkitem[0]["rowguid"]).update(item));
        } else {
            delete item['rowguid'];
            item['CreatedBy'] = req.session.userdata["UserID"];
            prm.push(req.gtos('BS_DEVICETYPE').insert(item));
        }

    }
    let rt = false;
    await Promise.all(prm).then(() => { rt = true; }).catch((err) => { console.log(err) });
    return rt;
}

module.exports.deleteDeviceType = async (req) => {
    try {
        await req.gtos('BS_DEVICETYPE').whereIn('DeviceTypeID', (req.body.data || []).map((itm) => itm.DeviceTypeID)).del();
        return true;
    } catch (error) {
        return false;
    }
}





/*********************** BS_YP_AREA */
module.exports.loadArea = async (req) => {
    return await req.gtos('BS_YP_AREA').select('*').orderBy('Area').catch(err => console.log(err)) || [];
}

module.exports.saveArea = async (req) => {
    let prm = [];
    for await (let item of (req.body.data || [])) {
        delete item['STT'];

        var checkitem = await req.gtos('BS_YP_AREA').select("rowguid").where('Area', item['Area']).orWhere('rowguid', item['rowguid'] || null).limit(1).catch(err => console.log(err));

        if (checkitem && checkitem.length > 0) {
            item['ModifiedBy'] = req.session.userdata["UserID"];
            item['UpdateTime'] = moment().format('YYYY-MM-DD HH:mm:ss');
            /* Do nothing */
            prm.push(req.gtos('BS_YP_AREA').where('rowguid', checkitem[0]["rowguid"]).update(item));
        } else {
            delete item['rowguid'];
            item['CreatedBy'] = req.session.userdata["UserID"];
            prm.push(req.gtos('BS_YP_AREA').insert(item));
        }

    }
    let rt = false;
    await Promise.all(prm).then(() => { rt = true; }).catch((err) => { console.log(err) });
    return rt;
}

module.exports.deleteArea = async (req) => {
    try {
        await req.gtos('BS_YP_AREA').whereIn('Area', (req.body.data || []).map((itm) => itm.Area)).del();
        return true;
    } catch (error) {
        return false;
    }
}

/*********************** BS_ITEM */
module.exports.loadItem = async (req) => {
    return await req.gtos('BS_ITEM').select('*').orderBy('ItemID').catch(err => console.log(err)) || [];
}

module.exports.saveItem = async (req) => {
    let prm = [];
    for await (let item of (req.body.data || [])) {
        delete item['STT'];

        var checkitem = await req.gtos('BS_ITEM').select("rowguid").where('ItemID', item['ItemID']).orWhere('rowguid', item['rowguid'] || null).limit(1).catch(err => console.log(err));

        if (checkitem && checkitem.length > 0) {
            item['ModifiedBy'] = req.session.userdata["UserID"];
            item['UpdateTime'] = moment().format('YYYY-MM-DD HH:mm:ss');
            /* Do nothing */
            prm.push(req.gtos('BS_ITEM').where('rowguid', checkitem[0]["rowguid"]).update(item));
        } else {
            delete item['rowguid'];
            item['CreatedBy'] = req.session.userdata["UserID"];
            prm.push(req.gtos('BS_ITEM').insert(item));
        }
    }
    let rt = false;
    await Promise.all(prm).then(() => { rt = true; }).catch((err) => { console.log(err) });
    return rt;
}

module.exports.deleteItem = async (req) => {
    try {
        await req.gtos('BS_ITEM').whereIn('ItemID', (req.body.data || []).map((itm) => itm.ItemID)).del();
        return true;
    } catch (error) {
        return false;
    }
}
/*********************** BS_CARGOTYPE */
module.exports.loadCargoType = async (req) => {
    return await req.gtos('BS_CARGOTYPE').select('*').orderBy('CargoTypeID').catch(err => console.log(err)) || [];
}

module.exports.saveCargoType = async (req) => {
    let prm = [];
    for await (let item of (req.body.data || [])) {
        delete item['STT'];

        var checkitem = await req.gtos('BS_CARGOTYPE').select("rowguid").where('CargoTypeID', item['CargoTypeID']).orWhere('rowguid', item['rowguid'] || null).limit(1).catch(err => console.log(err));

        if (checkitem && checkitem.length > 0) {
            item['ModifiedBy'] = req.session.userdata["UserID"];
            item['UpdateTime'] = moment().format('YYYY-MM-DD HH:mm:ss');
            /* Do nothing */
            prm.push(req.gtos('BS_CARGOTYPE').where('rowguid', checkitem[0]["rowguid"]).update(item));
        } else {
            delete item['rowguid'];
            item['CreatedBy'] = req.session.userdata["UserID"];
            prm.push(req.gtos('BS_CARGOTYPE').insert(item));
        }
    }
    let rt = false;
    await Promise.all(prm).then(() => { rt = true; }).catch((err) => { console.log(err) });
    return rt;
}

module.exports.deleteCargoType = async (req) => {
    try {
        await req.gtos('BS_CARGOTYPE').whereIn('CargoTypeID', (req.body.data || []).map((itm) => itm.CargoTypeID)).del();
        return true;
    } catch (error) {
        return false;
    }
}

/*********************** BS_SERVICE */
module.exports.loadService = async (req) => {
    return await req.gtos('BS_SERVICE').select('*').orderBy('ServiceID').catch(err => console.log(err)) || [];
}

module.exports.saveService = async (req) => {
    let prm = [];
    for await (let item of (req.body.data || [])) {
        delete item['STT'];

        var checkitem = await req.gtos('BS_SERVICE').select("rowguid").where('ServiceID', item['ServiceID']).orWhere('rowguid', item['rowguid'] || null).limit(1).catch(err => console.log(err));

        if (checkitem && checkitem.length > 0) {
            item['ModifiedBy'] = req.session.userdata["UserID"];
            item['UpdateTime'] = moment().format('YYYY-MM-DD HH:mm:ss');
            /* Do nothing */
            prm.push(req.gtos('BS_SERVICE').where('rowguid', checkitem[0]["rowguid"]).update(item));
        } else {
            delete item['rowguid'];
            item['CreatedBy'] = req.session.userdata["UserID"];
            prm.push(req.gtos('BS_SERVICE').insert(item));
        }
    }
    let rt = false;
    await Promise.all(prm).then(() => { rt = true; }).catch((err) => { console.log(err) });
    return rt;
}

module.exports.deleteService = async (req) => {
    try {
        await req.gtos('BS_SERVICE').whereIn('ServiceID', (req.body.data || []).map((itm) => itm.ServiceID)).del();
        return true;
    } catch (error) {
        return false;
    }
}


/*********************** BS_PORT */
module.exports.loadPortFull = async (req) => {
    let query = req.gtos('BS_PORT').join('BS_NATIONAL', 'BS_NATIONAL.NationID', 'BS_PORT.NationID').select('BS_PORT.*', 'BS_NATIONAL.NationName').orderBy('PortID');
    query = FunctionModel.KnexWhere(query, req.body.filter);
    return await query.catch(err => console.log(err)) || [];
}
module.exports.loadPort = async (req) => {
    return await req.gtos('BS_PORT').select('*').orderBy('PortID').catch(err => console.log(err)) || [];
}

module.exports.savePort = async (req) => {
    let prm = [];
    for await (let item of (req.body.data || [])) {
        delete item['STT'];

        var checkitem = await req.gtos('BS_PORT').select("rowguid").where('PortID', item['PortID']).orWhere('rowguid', item['rowguid'] || null).limit(1).catch(err => console.log(err));

        if (checkitem && checkitem.length > 0) {
            item['ModifiedBy'] = req.session.userdata["UserID"];
            item['UpdateTime'] = moment().format('YYYY-MM-DD HH:mm:ss');
            /* Do nothing */
            prm.push(req.gtos('BS_PORT').where('rowguid', checkitem[0]["rowguid"]).update(item));
        } else {
            delete item['rowguid'];
            item['CreatedBy'] = req.session.userdata["UserID"];
            prm.push(req.gtos('BS_PORT').insert(item));
        }
    }
    let rt = false;
    await Promise.all(prm).then(() => { rt = true; }).catch((err) => { console.log(err) });
    return rt;
}

module.exports.deletePort = async (req) => {
    try {
        await req.gtos('BS_PORT').whereIn('PortID', (req.body.data || []).map((itm) => itm.PortID)).del();
        return true;
    } catch (error) {
        return false;
    }
}


/*********************** BS_NATIONAL */
module.exports.loadNational = async (req) => {
    return await req.gtos('BS_NATIONAL').select('*').orderBy('NationID').catch(err => console.log(err)) || [];
}

module.exports.saveNational = async (req) => {
    let prm = [];
    for await (let item of (req.body.data || [])) {
        delete item['STT'];

        var checkitem = await req.gtos('BS_NATIONAL').select("rowguid").where('NationID', item['NationID']).orWhere('rowguid', item['rowguid'] || null).limit(1).catch(err => console.log(err));

        if (checkitem && checkitem.length > 0) {
            item['ModifiedBy'] = req.session.userdata["UserID"];
            item['UpdateTime'] = moment().format('YYYY-MM-DD HH:mm:ss');
            /* Do nothing */
            prm.push(req.gtos('BS_NATIONAL').where('rowguid', checkitem[0]["rowguid"]).update(item));
        } else {
            delete item['rowguid'];
            item['CreatedBy'] = req.session.userdata["UserID"];
            prm.push(req.gtos('BS_NATIONAL').insert(item));
        }
    }
    let rt = false;
    await Promise.all(prm).then(() => { rt = true; }).catch((err) => { console.log(err) });
    return rt;
}

module.exports.deleteNational = async (req) => {
    try {
        await req.gtos('BS_NATIONAL').whereIn('NationID', (req.body.data || []).map((itm) => itm.NationID)).del();
        return true;
    } catch (error) {
        return false;
    }
}



/*********************** BS_OPR */
module.exports.loadOpr = async (req) => {
    return await req.gtos('BS_OPR').select('*').orderBy('OprID').catch(err => console.log(err)) || [];
}

module.exports.saveOpr = async (req) => {
    let prm = [];
    for await (let item of (req.body.data || [])) {
        delete item['STT'];

        var checkitem = await req.gtos('BS_OPR').select("rowguid").where('OprID', item['OprID']).orWhere('rowguid', item['rowguid'] || null).limit(1).catch(err => console.log(err));

        if (checkitem && checkitem.length > 0) {
            item['ModifiedBy'] = req.session.userdata["UserID"];
            item['UpdateTime'] = moment().format('YYYY-MM-DD HH:mm:ss');
            /* Do nothing */
            prm.push(req.gtos('BS_OPR').where('rowguid', checkitem[0]["rowguid"]).update(item));
        } else {
            delete item['rowguid'];
            item['CreatedBy'] = req.session.userdata["UserID"];
            prm.push(req.gtos('BS_OPR').insert(item));
        }
    }
    let rt = false;
    await Promise.all(prm).then(() => { rt = true; }).catch((err) => { console.log(err) });
    return rt;
}

module.exports.deleteOpr = async (req) => {
    try {
        await req.gtos('BS_OPR').whereIn('OprID', (req.body.data || []).map((itm) => itm.OprID)).del();
        return true;
    } catch (error) {
        return false;
    }
}


/*********************** BS_JOB_TYPE */
module.exports.loadJobType = async (req) => {
    return await req.gtos('BS_JOB_TYPE').select('*').orderBy('JobTypeID').catch(err => console.log(err)) || [];
}

module.exports.saveJobType = async (req) => {
    let prm = [];
    for await (let item of (req.body.data || [])) {
        delete item['STT'];

        var checkitem = await req.gtos('BS_JOB_TYPE').select("rowguid").where('JobTypeID', item['JobTypeID']).orWhere('rowguid', item['rowguid'] || null).limit(1).catch(err => console.log(err));

        if (checkitem && checkitem.length > 0) {
            item['ModifiedBy'] = req.session.userdata["UserID"];
            item['UpdateTime'] = moment().format('YYYY-MM-DD HH:mm:ss');
            /* Do nothing */
            prm.push(req.gtos('BS_JOB_TYPE').where('rowguid', checkitem[0]["rowguid"]).update(item));
        } else {
            delete item['rowguid'];
            item['CreatedBy'] = req.session.userdata["UserID"];
            prm.push(req.gtos('BS_JOB_TYPE').insert(item));
        }
    }
    let rt = false;
    await Promise.all(prm).then(() => { rt = true; }).catch((err) => { console.log(err) });
    return rt;
}

module.exports.deleteJobType = async (req) => {
    try {
        await req.gtos('BS_JOB_TYPE').whereIn('JobTypeID', (req.body.data || []).map((itm) => itm.JobTypeID)).del();
        return true;
    } catch (error) {
        return false;
    }
}


/*********************** BS_METHOD */
module.exports.loadMethod = async (req) => {
    return await req.gtos('BS_METHOD').select('*').orderBy('MethodID').catch(err => console.log(err)) || [];
}

module.exports.saveMethod = async (req) => {
    let prm = [];
    for await (let item of (req.body.data || [])) {
        delete item['STT'];

        var checkitem = await req.gtos('BS_METHOD').select("rowguid").where('MethodID', item['MethodID']).orWhere('rowguid', item['rowguid'] || null).limit(1).catch(err => console.log(err));

        if (checkitem && checkitem.length > 0) {
            item['ModifiedBy'] = req.session.userdata["UserID"];
            item['UpdateTime'] = moment().format('YYYY-MM-DD HH:mm:ss');
            /* Do nothing */
            prm.push(req.gtos('BS_METHOD').where('rowguid', checkitem[0]["rowguid"]).update(item));
        } else {
            delete item['rowguid'];
            item['CreatedBy'] = req.session.userdata["UserID"];
            prm.push(req.gtos('BS_METHOD').insert(item));
        }
    }
    let rt = false;
    await Promise.all(prm).then(() => { rt = true; }).catch((err) => { console.log(err) });
    return rt;
}

module.exports.deleteMethod = async (req) => {
    try {
        await req.gtos('BS_METHOD').whereIn('MethodID', (req.body.data || []).map((itm) => itm.MethodID)).del();
        return true;
    } catch (error) {
        return false;
    }
}


/*********************** BS_CLASS */
module.exports.loadClass = async (req) => {
    return await req.gtos('BS_CLASS').select('*').orderBy('ClassID').catch(err => console.log(err)) || [];
}

module.exports.saveClass = async (req) => {
    let prm = [];
    for await (let item of (req.body.data || [])) {
        delete item['STT'];

        var checkitem = await req.gtos('BS_CLASS').select("rowguid").where('ClassID', item['ClassID']).orWhere('rowguid', item['rowguid'] || null).limit(1).catch(err => console.log(err));

        if (checkitem && checkitem.length > 0) {
            item['ModifiedBy'] = req.session.userdata["UserID"];
            item['UpdateTime'] = moment().format('YYYY-MM-DD HH:mm:ss');
            /* Do nothing */
            prm.push(req.gtos('BS_CLASS').where('rowguid', checkitem[0]["rowguid"]).update(item));
        } else {
            delete item['rowguid'];
            item['CreatedBy'] = req.session.userdata["UserID"];
            prm.push(req.gtos('BS_CLASS').insert(item));
        }
    }
    let rt = false;
    await Promise.all(prm).then(() => { rt = true; }).catch((err) => { console.log(err) });
    return rt;
}

module.exports.deleteClass = async (req) => {
    try {
        await req.gtos('BS_CLASS').whereIn('ClassID', (req.body.data || []).map((itm) => itm.ClassID)).del();
        return true;
    } catch (error) {
        return false;
    }
}

/*********************** BS_TRANSIT */
module.exports.loadTransit = async (req) => {
    return await req.gtos('BS_TRANSIT').select('*').orderBy('TransitID').catch(err => console.log(err)) || [];
}

module.exports.saveTransit = async (req) => {
    let prm = [];
    for await (let item of (req.body.data || [])) {
        delete item['STT'];

        var checkitem = await req.gtos('BS_TRANSIT').select("rowguid").where('TransitID', item['TransitID']).orWhere('rowguid', item['rowguid'] || null).limit(1).catch(err => console.log(err));

        if (checkitem && checkitem.length > 0) {
            item['ModifiedBy'] = req.session.userdata["UserID"];
            item['UpdateTime'] = moment().format('YYYY-MM-DD HH:mm:ss');
            /* Do nothing */
            prm.push(req.gtos('BS_TRANSIT').where('rowguid', checkitem[0]["rowguid"]).update(item));
        } else {
            delete item['rowguid'];
            item['CreatedBy'] = req.session.userdata["UserID"];
            prm.push(req.gtos('BS_TRANSIT').insert(item));
        }
    }
    let rt = false;
    await Promise.all(prm).then(() => { rt = true; }).catch((err) => { console.log(err) });
    return rt;
}

module.exports.deleteTransit = async (req) => {
    try {
        await req.gtos('BS_TRANSIT').whereIn('TransitID', (req.body.data || []).map((itm) => itm.TransitID)).del();
        return true;
    } catch (error) {
        return false;
    }
}


/*********************** JOBMODE */
module.exports.loadJobMode = async (req) => {
    return await req.gtos('BS_JOB_MODE').select('*').orderBy('JobModeID').catch(err => console.log(err)) || [];
}

module.exports.saveJobMode = async (req) => {
    let prm = [];
    for await (let item of (req.body.data || [])) {
        delete item['STT'];

        var checkitem = await req.gtos('BS_JOB_MODE').select("rowguid").where('JobModeID', item['JobModeID']).orWhere('rowguid', item['rowguid'] || null).limit(1).catch(err => console.log(err));

        if (checkitem && checkitem.length > 0) {
            item['ModifiedBy'] = req.session.userdata["UserID"];
            item['UpdateTime'] = moment().format('YYYY-MM-DD HH:mm:ss');
            /* Do nothing */
            prm.push(req.gtos('BS_JOB_MODE').where('rowguid', checkitem[0]["rowguid"]).update(item));
        } else {
            delete item['rowguid'];
            item['CreatedBy'] = req.session.userdata["UserID"];
            prm.push(req.gtos('BS_JOB_MODE').insert(item));
        }
    }
    let rt = false;
    await Promise.all(prm).then(() => { rt = true; }).catch((err) => { console.log(err) });
    return rt;
}

module.exports.deleteJobMode = async (req) => {
    try {
        await req.gtos('BS_JOB_MODE').whereIn('JobModeID', (req.body.data || []).map((itm) => itm.JobModeID)).del();
        return true;
    } catch (error) {
        return false;
    }
}

/*********************** RATE */
module.exports.loadUnit = async (req) => {
    return await req.gtos('BS_UNIT').select('*').orderBy('UnitID').catch(err => console.log(err)) || [];
}

module.exports.saveUnit = async (req) => {
    let prm = [];
    for await (let item of (req.body.data || [])) {
        delete item['STT'];

        var checkitem = await req.gtos('BS_UNIT').select("rowguid").where('UnitID', item['UnitID']).orWhere('rowguid', item['rowguid'] || null).limit(1).catch(err => console.log(err));

        if (checkitem && checkitem.length > 0) {
            item['ModifiedBy'] = req.session.userdata["UserID"];
            item['UpdateTime'] = moment().format('YYYY-MM-DD HH:mm:ss');
            /* Do nothing */
            prm.push(req.gtos('BS_UNIT').where('rowguid', checkitem[0]["rowguid"]).update(item));
        } else {
            delete item['rowguid'];
            item['CreatedBy'] = req.session.userdata["UserID"];
            prm.push(req.gtos('BS_UNIT').insert(item));
        }
    }
    let rt = false;
    await Promise.all(prm).then(() => { rt = true; }).catch((err) => { console.log(err) });
    return rt;
}

module.exports.deleteUnit = async (req) => {
    try {
        await req.gtos('BS_UNIT').whereIn('UnitID', (req.body.data || []).map((itm) => itm.UnitID)).del();
        return true;
    } catch (error) {
        return false;
    }
}



/*********************** RATE */
module.exports.loadRate = async (req) => {
    return await req.gtos('BS_INV_RATE').select('*').orderBy('RateID').catch(err => console.log(err)) || [];
}

module.exports.saveRate = async (req) => {
    let prm = [];
    for await (let item of (req.body.data || [])) {
        delete item['STT'];

        var checkitem = await req.gtos('BS_INV_RATE').select("rowguid").where('RateID', item['RateID']).orWhere('rowguid', item['rowguid'] || null).limit(1).catch(err => console.log(err));

        if (checkitem && checkitem.length > 0) {
            item['ModifiedBy'] = req.session.userdata["UserID"];
            item['UpdateTime'] = moment().format('YYYY-MM-DD HH:mm:ss');
            /* Do nothing */
            prm.push(req.gtos('BS_INV_RATE').where('rowguid', checkitem[0]["rowguid"]).update(item));
        } else {
            delete item['rowguid'];
            item['CreatedBy'] = req.session.userdata["UserID"];
            prm.push(req.gtos('BS_INV_RATE').insert(item));
        }
    }
    let rt = false;
    await Promise.all(prm).then(() => { rt = true; }).catch((err) => { console.log(err) });
    return rt;
}

module.exports.deleteRate = async (req) => {
    try {
        await req.gtos('BS_INV_RATE').whereIn('RateID', (req.body.data || []).map((itm) => itm.RateID)).del();
        return true;
    } catch (error) {
        return false;
    }
}


/*********************** GATE */
module.exports.loadGate = async (req) => {
    return await req.gtos('BS_GATE').select('*').orderBy('GateID').catch(err => console.log(err)) || [];
}

module.exports.saveGate = async (req) => {
    let prm = [];
    for await (let item of (req.body.data || [])) {
        delete item['STT'];

        var checkitem = await req.gtos('BS_GATE').select("rowguid").where('GateID', item['GateID']).orWhere('rowguid', item['rowguid'] || null).limit(1).catch(err => console.log(err));

        if (checkitem && checkitem.length > 0) {
            item['ModifiedBy'] = req.session.userdata["UserID"];
            item['UpdateTime'] = moment().format('YYYY-MM-DD HH:mm:ss');
            /* Do nothing */
            prm.push(req.gtos('BS_GATE').where('rowguid', checkitem[0]["rowguid"]).update(item));
        } else {
            delete item['rowguid'];
            item['CreatedBy'] = req.session.userdata["UserID"];
            prm.push(req.gtos('BS_GATE').insert(item));
        }
    }
    let rt = false;
    await Promise.all(prm).then(() => { rt = true; }).catch((err) => { console.log(err) });
    return rt;
}

module.exports.deleteGate = async (req) => {
    try {
        await req.gtos('BS_GATE').whereIn('GateID', (req.body.data || []).map((itm) => itm.GateID)).del();
        return true;
    } catch (error) {
        return false;
    }
}



/*********************** BITT */
module.exports.loadBitt = async (req) => {
    return await req.gtos('BS_BITT').select('*').orderBy('BittID').catch(err => console.log(err)) || [];
}

module.exports.saveBitt = async (req) => {
    let prm = [];
    for await (let item of (req.body.data || [])) {
        delete item['STT'];

        var checkitem = await req.gtos('BS_BITT').select("rowguid").where('BittID', item['BittID']).orWhere('rowguid', item['rowguid'] || null).limit(1).catch(err => console.log(err));

        if (checkitem && checkitem.length > 0) {
            item['ModifiedBy'] = req.session.userdata["UserID"];
            item['UpdateTime'] = moment().format('YYYY-MM-DD HH:mm:ss');
            /* Do nothing */
            prm.push(req.gtos('BS_BITT').where('rowguid', checkitem[0]["rowguid"]).update(item));
        } else {
            delete item['rowguid'];
            item['CreatedBy'] = req.session.userdata["UserID"];
            prm.push(req.gtos('BS_BITT').insert(item));
        }
    }
    let rt = false;
    await Promise.all(prm).then(() => { rt = true; }).catch((err) => { console.log(err) });
    return rt;
}

module.exports.deleteBitt = async (req) => {
    try {
        await req.gtos('BS_BITT').whereIn('BittID', (req.body.data || []).map((itm) => itm.BittID)).del();
        return true;
    } catch (error) {
        return false;
    }
}



/*********************** YP_BLOCK */
module.exports.loadBlock = async (req) => {
    return await req.gtos('BS_YP_BLOCK').select('*').orderBy('Block').catch(err => console.log(err)) || [];
}

module.exports.saveBlock = async (req) => {
    let prm = [];
    for await (let item of (req.body.data || [])) {
        delete item['STT'];

        var checkitem = await req.gtos('BS_YP_BLOCK').select("rowguid").where('Block', item['Block']).orWhere('rowguid', item['rowguid'] || null).limit(1).catch(err => console.log(err));

        if (checkitem && checkitem.length > 0) {
            item['ModifiedBy'] = req.session.userdata["UserID"];
            item['UpdateTime'] = moment().format('YYYY-MM-DD HH:mm:ss');
            /* Do nothing */
            prm.push(req.gtos('BS_YP_BLOCK').where('rowguid', checkitem[0]["rowguid"]).update(item));
        } else {
            delete item['rowguid'];
            item['CreatedBy'] = req.session.userdata["UserID"];
            prm.push(req.gtos('BS_YP_BLOCK').insert(item));
        }
    }
    let rt = false;
    await Promise.all(prm).then(() => { rt = true; }).catch((err) => { console.log(err) });
    return rt;
}

module.exports.saveBlockDesign = async (req) => {
    let prm = [];
    for await (let item of (req.body.data || [])) {
        delete item['STT'];

        var checkitem = await req.gtos('BS_YP_BLOCK').select("rowguid").where('Block', item['Block']).limit(1).catch(err => console.log(err));

        if (checkitem && checkitem.length > 0) {
            item['ModifiedBy'] = req.session.userdata["UserID"];
            item['UpdateTime'] = moment().format('YYYY-MM-DD HH:mm:ss');
            /* Do nothing */
            prm.push(req.gtos('BS_YP_BLOCK').where('rowguid', checkitem[0]["rowguid"]).update(item));
        }
    }
    let rt = false;
    await Promise.all(prm).then(() => { rt = true; }).catch((err) => { console.log(err) });
    return rt;
}
module.exports.deleteBlock = async (req) => {
    try {
        await req.gtos('BS_YP_BLOCK').whereIn('Block', (req.body.data || []).map((itm) => itm.Block)).del();
        return true;
    } catch (error) {
        return false;
    }
}

/***********************WORKER_GROUP */
module.exports.loadWorkerGroup = async (req) => {
    return await req.gtos('BS_WORKER_GROUP').select('*').orderBy('WorkerGroupID').catch(err => console.log(err)) || [];
}

module.exports.saveWorkerGroup = async (req) => {
    let prm = [];
    for await (let item of (req.body.data || [])) {
        delete item['STT'];

        var checkitem = await req.gtos('BS_WORKER_GROUP').select("rowguid").where('WorkerGroupID', item['WorkerGroupID']).orWhere('rowguid', item['rowguid'] || null).limit(1).catch(err => console.log(err));

        if (checkitem && checkitem.length > 0) {
            item['ModifiedBy'] = req.session.userdata["UserID"];
            item['UpdateTime'] = moment().format('YYYY-MM-DD HH:mm:ss');
            /* Do nothing */
            prm.push(req.gtos('BS_WORKER_GROUP').where('rowguid', checkitem[0]["rowguid"]).update(item));
        } else {
            delete item['rowguid'];
            item['CreatedBy'] = req.session.userdata["UserID"];
            prm.push(req.gtos('BS_WORKER_GROUP').insert(item));
        }
    }
    let rt = false;
    await Promise.all(prm).then(() => { rt = true; }).catch((err) => { console.log(err) });
    return rt;
}

module.exports.deleteWorkerGroup = async (req) => {
    try {
        await req.gtos('BS_WORKER_GROUP').whereIn('WorkerGroupID', (req.body.data || []).map((itm) => itm.WorkerGroupID)).del();
        return true;
    } catch (error) {
        return false;
    }
}


/***********************WORKER_GROUP_TYPE */
module.exports.loadWorkerGroupType = async (req) => {
    return await req.gtos('BS_WORKER_GROUP_TYPE').select('*').orderBy('WorkerGroupType').catch(err => console.log(err)) || [];
}

module.exports.saveWorkerGroupType = async (req) => {
    let prm = [];
    for await (let item of (req.body.data || [])) {
        delete item['STT'];

        var checkitem = await req.gtos('BS_WORKER_GROUP_TYPE').select("rowguid").where('WorkerGroupType', item['WorkerGroupType']).orWhere('rowguid', item['rowguid'] || null).limit(1).catch(err => console.log(err));

        if (checkitem && checkitem.length > 0) {
            item['ModifiedBy'] = req.session.userdata["UserID"];
            item['UpdateTime'] = moment().format('YYYY-MM-DD HH:mm:ss');
            /* Do nothing */
            prm.push(req.gtos('BS_WORKER_GROUP_TYPE').where('rowguid', checkitem[0]["rowguid"]).update(item));
        } else {
            delete item['rowguid'];
            item['CreatedBy'] = req.session.userdata["UserID"];
            prm.push(req.gtos('BS_WORKER_GROUP_TYPE').insert(item));
        }
    }
    let rt = false;
    await Promise.all(prm).then(() => { rt = true; }).catch((err) => { console.log(err) });
    return rt;
}

module.exports.deleteWorkerGroupType = async (req) => {
    try {
        await req.gtos('BS_WORKER_GROUP_TYPE').whereIn('WorkerGroupType', (req.body.data || []).map((itm) => itm.WorkerGroupType)).del();
        return true;
    } catch (error) {
        return false;
    }
}

/***********************Berth */
module.exports.loadBerthList = async (req) => {
    return await req.gtos('BS_BERTH').select('*').orderBy('BerthID').catch(err => console.log(err)) || [];
}

module.exports.saveBerth = async (req) => {
    let prm = [];
    for await (let item of (req.body.data || [])) {
        delete item['STT'];

        var checkitem = await req.gtos('BS_BERTH').select("rowguid").where('BerthID', item['BerthID']).orWhere('rowguid', item['rowguid'] || null).limit(1).catch(err => console.log(err));

        if (checkitem && checkitem.length > 0) {
            item['ModifiedBy'] = req.session.userdata["UserID"];
            item['UpdateTime'] = moment().format('YYYY-MM-DD HH:mm:ss');
            /* Do nothing */
            prm.push(req.gtos('BS_BERTH').where('rowguid', checkitem[0]["rowguid"]).update(item));
        } else {
            delete item['rowguid'];
            item['CreatedBy'] = req.session.userdata["UserID"];
            prm.push(req.gtos('BS_BERTH').insert(item));
        }
    }
    let rt = false;
    await Promise.all(prm).then(() => { rt = true; }).catch((err) => { console.log(err) });
    return rt;
}

module.exports.deleteBerth = async (req) => {
    try {
        await req.gtos('BS_BERTH').whereIn('BerthID', (req.body.data || []).map((itm) => itm.BerthID)).del();
        return true;
    } catch (error) {
        return false;
    }
}


/***********************CustomerType */
module.exports.loadCustomerType = async (req) => {
    return await req.gtos('BS_CUSTOMER_TYPE').select('*').orderBy('CusTypeID').catch(err => console.log(err)) || [];
}

module.exports.saveCustomerType = async (req) => {
    let prm = [];
    for await (let item of (req.body.data || [])) {
        var checkitem = await req.gtos('BS_CUSTOMER_TYPE').select("rowguid").where('CusTypeID', item['CusTypeID']).orWhere('rowguid', item['rowguid'] || null).limit(1).catch(err => console.log(err));

        delete item['STT'];
        delete item['rowguid'];
        if (checkitem && checkitem.length > 0) {
            item['ModifiedBy'] = req.session.userdata["UserID"];
            item['UpdateTime'] = moment().format('YYYY-MM-DD HH:mm:ss');
            /* Do nothing */
            prm.push(req.gtos('BS_CUSTOMER_TYPE').where('rowguid', checkitem[0]["rowguid"]).update(item));
        } else {
            item['CreatedBy'] = req.session.userdata["UserID"];
            prm.push(req.gtos('BS_CUSTOMER_TYPE').insert(item));
        }
    }
    let rt = false;
    await Promise.all(prm).then(() => { rt = true; }).catch((err) => { console.log(err) });
    return rt;
}

module.exports.deleteCustomerType = async (req) => {
    try {
        await req.gtos('BS_CUSTOMER_TYPE').whereIn('CusTypeID', (req.body.data || []).map((itm) => itm.CusTypeID)).del();
        return true;
    } catch (error) {
        return false;
    }
}



/***********************Customers */
module.exports.loadCustomers = async (req) => {
    var customers = req.gtos()
        .select('B.CusID', 'B.CusTypeID', 'A.CusTypeName', 'B.PaymentTypeID', 'C.PaymentTypeName', 'B.CusName', 'B.TaxCode', 'B.Tel'
            , 'B.Fax', 'B.Address', 'B.Email', 'B.IsActive', 'B.rowguid')
        .from('BS_CUSTOMER AS B')
        .leftJoin('BS_CUSTOMER_TYPE as A', 'A.CusTypeID', 'B.CusTypeID')
        .leftJoin('BS_INV_PAYMENT_TYPE as C', 'B.PaymentTypeID', 'C.PaymentTypeID');

    if (req.body.type) {
        customers.where('A.CusTypeID', req.body.type);
    }
    if (req.body.id) {
        customers.where('CusID', req.body.id);
    }
    if (req.body.name) {
        customers.whereLike('CusName', `%${req.body.name}%`);
    }
    if (req.body.taxcode) {
        customers.whereLike('TaxCode', `%${req.body.taxcode}%`);
    }
    if (req.body.search) {
        customers.where(function () {
            this.whereLike('TaxCode', `%${req.body.search}%`).orWhere('CusName', 'like', `%${req.body.search}%`);
        });
    }

    customers.orderBy('CusName')
    return await customers.catch(err => console.log(err)) || []
}

module.exports.saveCustomers = async (req) => {
    let prm = [];
    for await (let item of (req.body.data || [])) {
        delete item['STT'];
        delete item['CusTypeName'];
        delete item['PaymentTypeName'];

        var checkitem = await req.gtos('BS_CUSTOMER').select("rowguid").where('CusID', item['CusID']).orWhere('rowguid', item['rowguid'] || null).limit(1).catch(err => console.log(err));

        if (checkitem && checkitem.length > 0) {
            item['ModifiedBy'] = req.session.userdata["UserID"];
            item['UpdateTime'] = moment().format('YYYY-MM-DD HH:mm:ss');
            /* Do nothing */
            prm.push(req.gtos('BS_CUSTOMER').where('rowguid', checkitem[0]["rowguid"]).update(item));
        } else {
            delete item['rowguid'];
            item['CreatedBy'] = req.session.userdata["UserID"];
            prm.push(req.gtos('BS_CUSTOMER').insert(item));
        }
    }
    let rt = false;
    await Promise.all(prm).then(() => { rt = true; }).catch((err) => { console.log(err) });
    return rt;
}

module.exports.deleteCustomers = async (req) => {
    try {
        await req.gtos('BS_CUSTOMER').whereIn('CusID', (req.body.data || []).map((itm) => itm.CusID)).del();
        return true;
    } catch (error) {
        return false;
    }
}











// const tracking = async (req, col, val) => {
//     var query = req.gtos()
//         .select('cd.*', 'v.ShipName', 'dm.CJModeName'
//             , gtosglobal.raw('ISNULL(cd.cBlock,\'\')+\'-\'+ISNULL(cd.cBay,\'\')+\'-\'+ISNULL(cd.cRow,\'\')+\'-\'+ISNULL(cd.cTier,\'\') cLocation')
//             , gtosglobal.raw('CASE WHEN cd.cTLHQ = 1 THEN N\'Thanh lý hải quan\' ELSE N\'Chưa thanh lý hải quan\' END AS cTLHQ')
//             , gtosglobal.raw('ISNULL( CONVERT( varchar(10), CLASS) , \'\')+\'-\'+ISNULL(UNNO,\'\') AS ClassUno')
//             , gtosglobal.raw('v.ShipName+\'/\'+ImVoy+\'/\'+ExVoy AS ShipInfo')
//             , gtosglobal.raw('ImVoy+\'/\'+ExVoy AS imexvoy'))
//         .from('CNTR_DETAILS AS cd')
//         .leftJoin('DELIVERY_MODE AS dm', 'cd.CJMode_CD', 'dm.CJMode_CD')
//         .leftJoin('VESSELS as v', 'cd.ShipID = v.ShipID');

//     if (col == "CntrNo") {
//         query.where('cd.' + col, val);
//         query.orderBy('cd.DateIn', 'desc')
//     }

//     if (col == "BLNo") {
//         query.whereIn('cd.CntrClass', ['1', '4']);
//         query.whereIn('cd.CMStatus', ['B', 'I', 'S', 'D']);
//         query.where('cd.BLNo', val);
//     }

//     if (col == "BookingNo") {
//         query.whereIn('cd.CntrClass', ['3', '5']);
//         query.whereIn('cd.CMStatus', ['B', 'I', 'S', 'O', 'D']);
//         query.where('cd.BookingNo', val);
//     }

//     return await query.catch(err => console.log(err)) || [];
// }

// //get function code
// const getTariff = async (req) => {
//     return await req.gtos()
//         .select('TRF_CODE AS ID', 'TRF_DESC AS NAME')
//         .from('TRF_CODES')
//         .orderBy('TRF_DESC')
// }

// const getOprs = async (req) => {
//     var inWhere = req.gtos().select("OprID").from("CNTR_SZTP_MAP")
//     var stmt = req.gtos().select('CusID', 'CusName')
//         .from('BS_CUSTOMER')
//         .where('IsOpr', 1)
//         .whereIn("CusID", inWhere)
//         .orderBy('CusName')
//     return await stmt.catch(err => console.log(err)) || []
// }

// const getPayers = async (req, user = '') => {
//     var payers = req.gtos()
//         .from('BS_CUSTOMER')
//         .select('CusID', 'CusName', 'Address', 'VAT_CD', 'CusType', 'IsOpr', 'IsAgency', 'IsOwner', 'IsLogis', 'IsTrans', 'IsOther ')
//         .where('IsOwner', 1).whereNotNull('VAT_CD')

//     if (user && user != 'Admin') {
//         payers.where('NameDD', user);
//     }

//     payers.orderBy('CusName')
//     return await payers.catch(err => console.log(err)) || []
// }

// const getSizeType = async (req, opr = '') => {
//     let sztp = req.gtos().select('OprID', 'LocalSZPT', 'ISO_SZTP').from('CNTR_SZTP_MAP')
//     if (opr) {
//         sztp.where('OprID', opr);
//     }

//     sztp.orderBy('LocalSZPT')
//     return await sztp.catch(err => console.log(err)) || []
// }

// const getPayers_Inv = async (req) => {
//     return await req.gtos().distinct('PAYER ID', 'CusName NAME')
//         .from('INV_VAT AS i')
//         .join('BS_CUSTOMER AS c', 'c.CusID', 'i.PAYER')
//         .whereNotNull('PAYER')
//         .orderBy('c.CusName').catch(err => console.log(err)) || []
// }

// const getPayers_InvDFT = async (req) => {
//     return await req.gtos().distinct('PAYER', 'CusName')
//         .from('INV_DFT AS i')
//         .join('BS_CUSTOMER AS c', 'c.CusID', 'i.PAYER')
//         .whereNotNull('PAYER')
//         .orderBy('c.CusName').catch(err => console.log(err)) || []
// }

// const searchShip = async (req, arrStatus = '', year = '', name = '') => {
//     var ships = req.gtos()
//         .from('VESSEL_SCHEDULE')
//         .select('ShipKey', 'ShipID', 'ShipYear', 'ShipVoy', 'ImVoy', 'ExVoy', 'ETB', 'ETD')
//     if (arrStatus) {
//         ships.where('ShipArrStatus', '<=', parseInt(arrStatus));
//     }
//     if (year) {
//         ships.where('ShipYear', year);
//     }
//     if (name) {
//         ships.whereLike('ShipID', `%${name}%`);
//     }

//     ships.orderBy('ETB', 'desc')
//     return await ships.catch(err => console.log(err)) || []
// }

// //load data
// const loadVesselSchedule = async (req, fromdate = '', todate = '') => {
//     var vss = req.gtos()
//         .select('vv.ShipID', 'ShipName', 'ShipYear', 'ShipVoy', 'Opr_CD', 'CALL_NO', 'BERTH_NO', 'ALONGSIDE', 'ImVoy'
//             , 'ExVoy', 'ETA', 'ETB', 'ETW', 'ETD', 'ATA', 'ATW', 'ATD')
//         .from('VESSEL_SCHEDULE AS vs')
//         .join('VESSELS vv', 'vs.ShipID', 'vv.ShipID')

//     if (fromdate) {
//         vss.where('ETB', '>=', fromdate);
//     }
//     if (todate) {
//         vss.where('ETB', '<=', todate);
//     }

//     vss.orderBy('ETB', 'desc')
//     return await vss.catch(err => console.log(err)) || []
// }

// const loadSizeTypeMapping = async (req, oprs) => {
//     var szMap = req.gtos().select('*').from('CNTR_SZTP_MAP')
//     if (oprs) szMap.where('OprID', oprs);
//     szMap.orderBy('OprID')
//     return await szMap.catch(err => console.log(err)) || []
// }

// const loadLaneDetailByID = async (req, laneID) => {
//     var lanes = req.gtos()
//         .select('A.LaneID', 'LaneName', 'A.PortID', 'A.ShortPort', 'PortSeq', 'BackColor', 'ForeColor', 'C.NationID', 'B.OprID')
//         .from('BS_LANE_DETAILS AS A')
//         .join('BS_LANE AS B', 'A.LaneID', 'B.LaneID')
//         .join('BS_PORT AS C', 'A.PortID', 'C.PortID')
//         .join('BS_NATIONAL AS D', 'C.NationID', 'D.NationID')

//     if (laneID) {
//         lanes.where('A.LaneID', laneID);
//     }

//     lanes.orderBy('PortSeq')
//     return await lanes.catch(err => console.log(err)) || []
// }

// const loadExistPortListByLaneID = async (req, laneID) => {
//     return await req.gtos('BS_LANE_DETAILS').select('PortID')
//         .where('LaneID', laneID)
//         .orderBy('PortID').catch(err => console.log(err)) || []
// }

// const loadLaneByID = async (req, laneID = '') => {
//     var lanes = req.gtos().select('*').from('BS_LANE')
//     if (laneID != '') {
//         lanes.where('LaneID', laneID);
//     }

//     lanes.orderBy('LaneID')
//     return await lanes.catch(err => console.log(err)) || []
// }

// const loadCargoType = async (req) => {
//     return await req.gtos('CARGO_TYPE').select('*').orderBy('Code').catch(err => console.log(err)) || [];
// }

// const loadUnitCodes = async (req) => {
//     return await req.gtos().select('UnitID', 'UnitName').orderBy('UnitID').catch(err => console.log(err)) || [];
// }

// const loadDamagedTypeList = async (req) => {
//     return await req.gtos('BS_DAMAGED_TYPE')
//         .select('DamagedTypeID', 'DamagedTypeName', 'rowguid')
//         .orderBy('DamagedTypeID')
//         .catch(err => console.log(err)) || [];
// }

// const loadDamagedList = async (req) => {
//     return await req.gtos()
//         .select('A.DamagedTypeID', 'DamagedTypeName', 'DamagedID', 'DamagedName', 'A.rowguid')
//         .from('BS_DAMAGED AS A')
//         .join('BS_DAMAGED_TYPE AS B', 'A.DamagedTypeID = B.DamagedTypeID')
//         .orderBy('DamagedID')
//         .catch(err => console.log(err)) || [];
// }

// const loadCusType = async (req) => {
//     return await req.gtos('BS_CUSTOMER_TYPE').select('CusTypeID', 'CusTypeName', 'rowguid').orderBy('CusTypeID').catch(err => console.log(err)) || [];
// }

// const loadCus = async (req) => {
//     return await req.gtos()
//         .select('CusID', 'CusName', 'Address', 'A.CusTypeID', 'CusTypeName', 'A.rowguid', 'A.PaymentTypeID', 'PaymentTypeName')
//         .from('BS_CUSTOMER AS A')
//         .leftJoin('BS_CUSTOMER_TYPE AS B', 'A.CusTypeID', 'B.CusTypeID')
//         .leftJoin('BS_INV_PAYMENT_TYPE AS C', 'A.PaymentTypeID', 'C.PaymentTypeID')
//         .orderBy('CusID').catch(err => console.log(err)) || [];
// }

// const loadPaymentTypeList = async (req) => {
//     return await req.gtos('BS_INV_PAYMENT_TYPE').select('PaymentTypeID', 'PaymentTypeName').orderBy('PaymentTypeID').catch(err => console.log(err)) || [];
// }

// const loadBittList = async (req) => {
//     return await req.gtos('BS_BITT').select('BerthID', 'BittID', 'CoordX', 'CoordY', 'rowguid').orderBy('BittID').catch(err => console.log(err)) || [];
// }


// const loadBerthID = async (req) => {
//     return await req.gtos('BS_BERTH').select('BerthID').orderBy('BerthID').catch(err => console.log(err)) || [];
// }

// const loadWorkerGroupTypeList = async (req) => {
//     return await req.gtos('BS_WORKER_GROUP_TYPE')
//         .select('WorkerGroupType', 'WorkerGroupTypeName')
//         .orderBy('WorkerGroupType').catch(err => console.log(err)) || [];
// }

// const loadWorkerGroupList = async (req) => {
//     return await req.gtos()
//         .select('A.WorkerGroupType', 'WorkerGroupTypeName', 'WorkerGroupID', 'WorkerGroupName')
//         .from('BS_WORKER_GROUP AS A')
//         .join('BS_WORKER_GROUP_TYPE AS B', 'A.WorkerGroupType', 'B.WorkerGroupType')
//         .orderBy('WorkerGroupID').catch(err => console.log(err)) || [];
// }

// const loadNationList = async (req) => {
//     return await req.gtos('BS_NATIONAL').select('NationID', 'NationName', 'Flag').orderBy('NationID')
//         .catch(err => console.log(err)) || [];
// }

// const loadPortListForPortScreen = async (req) => {
//     return await req.gtos().select('A.NationID', 'NationName', 'PortID', 'PortName')
//         .from('BS_PORT AS A')
//         .join('BS_NATIONAL AS B', 'A.NationID', 'B.NationID')
//         .orderBy('A.NationID').catch(err => console.log(err)) || [];
// }

// const loadPortList = async (req) => {
//     return await req.gtos()
//         .select('A.PortID', 'PortName', 'A.NationID', 'NationName')
//         .from('BS_PORT AS A')
//         .join('BS_NATIONAL AS B', 'A.NationID', 'B.NationID')
//         .orderBy('PortID').catch(err => console.log(err)) || [];
// }

// const loadLaneList = async (req) => {
//     return await req.gtos('BS_LANE').distinct('LaneID').orderBy('LaneID').catch(err => console.log(err)) || [];
// }

// const loadAllColCustomer = async (req) => {
//     return await req.gtos('BS_CUSTOMER')
//         .select('CusTypeID', 'CusID', 'CusName', 'TaxCode', 'PaymentTypeID', 'Tel', 'Fax', 'Address', 'Email', 'IsActive')
//         .orderBy('CusID').catch(err => console.log(err)) || [];
// }

// const loadAllColJobModes = async (req) => {
//     return await req.gtos().select('A.ClassID', 'ClassName', 'A.TransitID', 'TransitName'
//         , ' InOut', 'JobModeID', 'JobModeName', 'IsYard', 'IsVessel', 'CustomsJobType', 'Remark')
//         .from('BS_JOB_MODE AS A')
//         .leftJoin('BS_TRANSIT AS B', 'A.TransitID', 'B.TransitID')
//         .leftJoin('BS_CLASS AS C', 'A.ClassID', 'C.ClassID')
//         .orderBy('JobModeID').catch(err => console.log(err)) || [];
// }

// const loadJobModesList = async (req) => {
//     return await req.gtos('BS_JOB_MODE').select('JobModeID', 'JobModeName', 'IsYard', 'IsVessel')
//         .orderBy('JobModeID').catch(err => console.log(err)) || [];
// }

// const loadOprList = async (req) => {
//     return await req.gtos('BS_OPR').select('*').orderBy('OprID').catch(err => console.log(err)) || [];
// }

// const loadTransitList = async (req) => {
//     return await req.gtos('BS_TRANSIT').select('TransitID', 'TransitName').orderBy('TransitID').catch(err => console.log(err)) || [];
// }

// const loadAllColGateList = async (req) => {
//     return await req.gtos().select('GateID', 'GateName', 'InOut', 'A.ClassID', 'ClassName', 'A.rowguid')
//         .from('BS_GATE AS A')
//         .join('BS_CLASS AS B', 'A.ClassID', 'B.ClassID')
//         .orderBy('GateID').catch(err => console.log(err)) || [];
// }

// const loadAllColServices = async (req) => {
//     return await req.gtos().select('ServiceID', 'ServiceName', 'A.JobModeID', 'JobModeName', 'IsQuayJob', 'IsYardJob', 'IsGateJob')
//         .from('BS_SERVICE AS A')
//         .join('BS_JOB_MODE AS B', 'A.JobModeID', 'B.JobModeID')
//         .orderBy('ServiceID').catch(err => console.log(err)) || [];
// }

// const loadAllColJobTypes = async (req) => {
//     return await req.gtos('BS_JOB_TYPE')
//         .select('JobTypeID', 'JobTypeName', 'MoveType', 'IsQuayJob', 'IsYardJob', 'IsGateJob')
//         .orderBy('JobTypeID').catch(err => console.log(err)) || [];
// }

// const loadAllColMethodList = async (req) => {
//     return await req.gtos().select('A.JobModeID', 'JobModeName', 'MethodID', 'MethodName')
//         .from('BS_METHOD AS A')
//         .join("BS_JOB_MODE AS B", "A.JobModeID", "B.JobModeID")
//         .orderBy('JobModeID').catch(err => console.log(err)) || [];
// }

// const loadAllColShiftList = async (req) => {
//     return await req.gtos('BS_SHIFT').select('ShiftID', 'ShiftName', 'FromTime', 'ToTime')
//         .orderBy('ShiftID').catch(err => console.log(err)) || [];
// }

// const loadAllColCarBrand = async (req) => {
//     return await req.gtos('BS_CAR_BRAND').select('BrandID', 'BrandName', 'rowguid')
//         .orderBy('BrandID').catch(err => console.log(err)) || [];
// }

// const loadAllColCarType = async (req) => {
//     return await req.gtos().select('A.BrandID', 'BrandName', 'CarTypeID', 'CarTypeName', 'EngineType', 'CarYear', 'CarColor', 'A.rowguid')
//         .from('BS_CAR_TYPE AS A')
//         .join("BS_CAR_BRAND AS B", "A.BrandID", "B.BrandID")
//         .orderBy('CarTypeID').catch(err => console.log(err)) || [];
// }

// const loadAllColPaymentType = async (req) => {
//     return await req.gtos('BS_INV_PAYMENT_TYPE')
//         .select('PaymentTypeID', 'PaymentTypeName')
//         .orderBy('PaymentTypeID')
//         .catch(err => console.log(err)) || [];
// }

// const loadAllColPaymentForm = async (req) => {
//     return await req.gtos()
//         .select('A.PaymentTypeID', 'PaymentTypeName', 'PayFormID', 'PayFormName')
//         .from('BS_INV_PAY_FORM AS A')
//         .join("BS_INV_PAYMENT_TYPE AS B", "A.PaymentTypeID", "B.PaymentTypeID")
//         .orderBy('PayFormID')
//         .catch(err => console.log(err)) || [];
// }

// const loadAllColRateList = async (req) => {
//     return await req.gtos().select('RateID', 'A.BrandID', 'BrandName', 'ExchangeRate')
//         .from('BS_INV_RATE AS A')
//         .join("BS_CAR_BRAND AS B", "A.BrandID", "B.BrandID")
//         .orderBy('RateID').catch(err => console.log(err)) || [];
// }

// const loadAllColTransit = async (req) => {
//     return await req.gtos('BS_TRANSIT').select('TransitID', 'TransitName')
//         .orderBy('TransitID').catch(err => console.log(err)) || [];
// }

// const loadAllColArea = async (req) => {
//     return await req.gtos('BS_YP_AREA').select('Area', 'AreaName', 'Capacity', 'rowguid')
//         .orderBy('Area').catch(err => console.log(err)) || [];
// }
// // Get cus data array to export
// const getCusList = async (req) => {
//     return await req.gtos('import')
//         .select('c.CusTypeID', 'c.cusID', 'c.CusName', 'TaxCode', 'Tel', 'Fax', 'Address', 'Email', 'IsActive')
//         .catch(err => console.log(err)) || [];
// }

// const loadPaymentMethod = async (req) => {
//     return await req.gtos('ACCOUNTS')
//         .select('rowguid', 'ACC_CD', 'ACC_NO', 'ACC_TYPE', 'ACC_NAME')
//         .catch(err => console.log(err)) || [];
// }

// const loadDeliveryMode = async (req) => {
//     return await req.gtos().select('*').from('DELIVERY_MODE')
//         .whereIn('CJMode_CD', ['LAYN', 'CAPR', 'HBAI', 'TRAR'])
//         .orderBy('CJMode_CD')
//         .catch(err => console.log(err)) || [];
// }

// const loadExchangeRate = async (req) => {
//     return await req.gtos('EXCHANGE_RATE').select('CURRENCYID', 'DATEOFRATE', 'RATE')
//         .orderBy('CURRENCYID')
// }

// const loadMethodMode = async (req) => {
//     return await req.gtos('MENTHOD_MODE').select('MAPA_Code', 'MAPA_Name').orderBy('MAPA_Code')
// }

// const loadCntrClass = async (req) => {
//     return await req.gtos('CLASS_MODE').select('CLASS_Code', 'CLASS_Name').orderBy('CLASS_Code')
// }

// const loadDMethodInServices = async (req) => {
//     return await req.gtos('DELIVERY_MODE').select('CJMode_CD', 'CJModeName', 'isLoLo', 'ischkCFS', 'isYardSRV')
//         .where('isLoLo', 1)
//         .orWhere('isYardSRV', 1)
//         .orWhere('ischkCFS', '!=', 0)
//         .orderBy('CJMode_CD')
// }

// const loadServiceMore = async (req) => {
//     return await req.gtos('SRVMORE').select('ORD_TYPE', 'CjMode_CD', 'chkPrint')
// }

// const loadServiceList = async (req) => {
//     return await req.gtos('BS_SERVICE').select('ServiceID', 'ServiceName').orderBy('ServiceID')
// }

// const loadPayFormByPaymentTypeID = async (PaymentTypeID = '') => {
//     var paymentTypes = req.gtos('BS_INV_PAY_FORM').distinct('PayFormID', 'PayFormName')
//     if (PaymentTypeID) {
//         paymentTypes.where('PaymentTypeID', PaymentTypeID);
//     }

//     return await paymentTypes.catch(err => console.log(err)) || []
// }

// const loadServiceTemplate = async (req) => {
//     var getOrdType = req.gtos('ORD_TPLT').select("ORD_TYPE").whereRaw("TPLT_NM = i.TPLT_NM").limit(1)
//     return await req.gtos()
//         .distinct('i.TPLT_NM', 'i.TPLT_DESC', gtosglobal.raw(`(${getOrdType}) AS ORD_TYPE`))
//         .from("INV_TPLT AS i")
//         .catch(err => console.log(err)) || []
// }

// const loadEir = async (oprs = []) => {
//     var eirs = req.gtos()
//         .select('CntrNo', 'EIRNo', 'IssueDate', 'ExpDate', 'ExpPluginDate', 'bXNVC', 'OprID', 'LocalSZPT', 'ISO_SZTP'
//             , 'CARGO_TYPE', 'Status', 'ShipID', 'ImVoy', 'ExVoy', 'CJMode_CD', 'DMethod_CD', 'TruckNo', 'CMDWeight'
//             , 'BLNo', 'BookingNo', 'SealNo', 'SealNo1', 'SealNo2', 'RetLocation', 'IsLocal', 'CusName', 'Note', 'CreatedBy'
//             , 'DRAFT_INV_NO', 'InvNo')
//         .from('EIR')

//     if (oprs['FROM_DATE'] != '')
//         eirs.where('IssueDate', '>=', oprs['FROM_DATE']);
//     if (oprs['TO_DATE'] != '')
//         eirs.where('IssueDate', '<=', oprs['TO_DATE']);
//     if (oprs['OprID'] != '')
//         eirs.where('OprID', oprs['OprID']);
//     if (oprs['PAYMENT_TYPE'] != '')
//         eirs.where('PAYMENT_TYPE', oprs['PAYMENT_TYPE']);
//     if (oprs['CntrNo'] != '')
//         eirs.whereLike('CntrNo', `%${oprs['CntrNo']}%`);
//     if (oprs['ShipKey'] != '')
//         eirs.where('ShipKey', oprs['ShipKey']);
//     if (oprs['bXNVC'] != '')
//         eirs.where('bXNVC', '<=', oprs['bXNVC']);
//     if (oprs['CJMode_CD'] && oprs['CJMode_CD'].length > 0)
//         eirs.whereIn('CJMode_CD', oprs['CJMode_CD']);

//     eirs.orderBy('IssueDate', 'DESC')
//     return await eirs.catch(err => console.log(err)) || []
// }

// const loadInvDraff = async (wheres = []) => {
//     var drafts = req.gtos().distinct()
//         .select('inv_dtl.rowguid', 'inv.INV_DATE', 'inv.ShipID', 'inv.ShipYear', 'inv.ShipVoy', 'cc.Opr_CD as VSL_OWNER', 'inv.INV_NO'
//             , 'inv.OPR', 'inv.PAYER', 'm.CusName', 'inv_dft.REF_NO', 'inv_dtl.DRAFT_INV_NO', 'inv_dtl.TRF_CODE', 'inv_dtl.TRF_DESC'
//             , 'inv_dtl.CARGO_TYPE', 'inv_dtl.FE', 'inv_dtl.SZ', 'inv_dtl.QTY', 'inv_dtl.Remark', 'inv_dtl.AMOUNT', 'inv_dtl.VAT_RATE'
//             , 'inv_dtl.VAT', 'inv.DISCOUNT_AMT', 'inv.DISCOUNT_VAT', 'inv_dtl.TAMOUNT')
//         .from('INV_VAT AS inv')
//         .leftJoin('VESSEL_SCHEDULE AS cc', 'inv.ShipKey', 'cc.ShipKey')
//         .leftJoin('BS_CUSTOMER AS m', 'inv.payer', 'm.CusID')
//         .leftJoin('INV_DFT AS inv_dft', 'inv.INV_NO', 'inv_dft.INV_NO')
//         .leftJoin('INV_DFT_DTL AS inv_dtl', 'inv_dft.DRAFT_INV_NO', 'inv_dtl.DRAFT_INV_NO')
//         .whereNotNull('inv_dtl.DRAFT_INV_NO');

//     if (wheres['FROM_DATE'] != '')
//         drafts.where('inv.INV_DATE', '>=', wheres['FROM_DATE']);

//     if (wheres['TO_DATE'] != '')
//         drafts.where('inv.INV_DATE', '<=', wheres['TO_DATE']);

//     if (wheres['OprID'] != '')
//         drafts.where('inv.OPR', wheres['OprID']);

//     if (wheres['PAYMENT_STATUS'] && wheres['PAYMENT_STATUS'].length > 0)
//         drafts.whereIn('inv.PAYMENT_STATUS', wheres['PAYMENT_STATUS']);

//     if (wheres['CreatedBy'] != '')
//         drafts.whereLike('inv.CreatedBy', `%${wheres['CreatedBy']}%`);

//     if (wheres['CusID'] != '')
//         drafts.where('inv.PAYER', wheres['CusID']);

//     if (wheres['INV_TYPE'] && wheres['INV_TYPE'].length > 0)
//         drafts.whereIn('inv.INV_TYPE', wheres['INV_TYPE']);

//     if (wheres['CURRENCYID'] && wheres['CURRENCYID'].length > 0)
//         drafts.whereIn('inv.CURRENCYID', wheres['CURRENCYID']);

//     drafts.orderBy('inv.INV_DATE', 'desc');
//     return await drafts.catch(err => console.log(err)) || []
// }

// const loadInv = async (wheres = []) => {
//     var invs = req.gtos()
//         .select('a.DISCOUNT_AMT', 'a.DISCOUNT_VAT', 'a.inv_no ', ' c.VAT_RATE', 'a.inv_date', 'a.ShipID', 'a.ShipYear', 'a.ShipVoy'
//             , 'a.payer,m.VAT_CD', 'a.CreatedBy', 'a.OPR', 'a.REF_NO', 'a.Remark', gtosglobal.raw('sum(c.amount) as amount')
//             , 'c.TRF_CODE', gtosglobal.raw('sum(c.vat) as vat'), gtosglobal.raw('sum(c.tamount) as tamount'), 'c.dis_amt'
//             , 'b.draft_inv_no', 'b.draft_inv_date', 'm.CusName', 'c.TRF_DESC')
//         .from('INV_VAT AS a')
//         .leftJoin('BS_CUSTOMER AS m', 'a.payer', 'm.CusID')
//         .join('INV_DFT AS b', 'a.inv_no', 'b.inv_no')
//         .join('INV_DFT_DTL AS c', 'b.draft_inv_no=c.draft_inv_no')
//         .where('a.INV_TYPE', 'CAS')
//         .where('a.PAYMENT_STATUS', 'Y')

//     if (wheres['FROM_DATE'] != '')
//         invs.where('a.INV_DATE', '>=', wheres['FROM_DATE']);

//     if (wheres['TO_DATE'] != '')
//         invs.where('a.INV_DAT', '<=', wheres['TO_DATE']);

//     if (wheres['ShipKey'] != '')
//         invs.where('a.ShipKey', wheres['ShipKey']);

//     if (wheres['PAYER'] != '')
//         invs.where('a.PAYER', wheres['PAYER']);

//     if (wheres['CreatedBy'] != '')
//         invs.whereLike('a.CreatedBy', `%${wheres['CreatedBy']}%`);

//     if (wheres['TRF_CODE'] != '')
//         invs.where('c.TRF_CODE', wheres['TRF_CODE']);

//     if (wheres['CURRENCYID'] && wheres['CURRENCYID'].length > 0)
//         invs.whereIn('a.CURRENCYID', wheres['CURRENCYID']);

//     invs.group_by('a.DISCOUNT_AMT', 'a.DISCOUNT_VAT', 'a.inv_no ', ' c.VAT_RATE', 'a.inv_date', 'a.ShipID', 'a.ShipYear'
//         , 'a.ShipVoy', ' a.payer', 'm.VAT_CD', ' a.CreatedBy', ' a.OPR', ' a.REF_NO', 'a.Remark', 'c.TRF_CODE', 'c.dis_amt'
//         , ' b.draft_inv_no', ' b.draft_inv_date', '  m.CusName', 'c.TRF_DESC');
//     invs.orderBy('a.inv_date', 'a.inv_no', 'a.payer')
//     return await invs.catch(err => console.log(err)) || {}
// }


// const savePorts = async (req, datas) => {
//     for await (let item of datas) {
//         item['ModifiedBy'] = req.session.userdata["UserID"];
//         item['UpdateTime'] = moment().format('YYYY-MM-DD HH:mm:ss');

//         var checkitem = await req.gtos('BS_PORT').select("PortID").where('PortID', item['PortID'])
//             .where('YardID', item['YardID']).limit(1).catch(err => console.log(err))
//         if (checkitem && checkitem.length > 0) {
//             await req.gtos('BS_PORT').where('PortID', checkitem[0]["PortID"]).update(item);
//         } else {
//             //insert database
//             item['CreateTime'] = item['UpdateTime'];
//             item['CreatedBy'] = item['ModifiedBy'];
//             await req.gtos('BS_PORT').insert(item);
//         }
//     }

//     return true;
// }

// const saveJobModes = async (req, datas) => {
//     for await (let item of datas) {
//         item['ModifiedBy'] = req.session.userdata["UserID"];
//         item['UpdateTime'] = moment().format('YYYY-MM-DD HH:mm:ss');

//         var checkitem = await req.gtos('BS_JOB_MODE')
//             .select("JobModeID")
//             .where('JobModeID', item['JobModeID'])
//             .limit(1).catch(err => console.log(err))
//         if (checkitem && checkitem.length > 0) {
//             await req.gtos('BS_JOB_MODE').where('JobModeID', checkitem[0]["JobModeID"]).update(item);
//         } else {
//             //insert database
//             item['CreateTime'] = item['UpdateTime'];
//             item['CreatedBy'] = item['ModifiedBy'];
//             await req.gtos('BS_JOB_MODE').insert(item);
//         }
//     }
//     return true;
// }

// const saveJobTypes = async (req, datas) => {
//     for await (let item of datas) {
//         item['ModifiedBy'] = req.session.userdata["UserID"];
//         item['UpdateTime'] = moment().format('YYYY-MM-DD HH:mm:ss');
//         item['CreateTime'] = item['UpdateTime'];

//         var checkitem = await req.gtos("BS_JOB_TYPE")
//             .select("JobTypeID").where('JobTypeID', item['JobTypeID'])
//             .limit(1).catch(err => console.log(err))
//         if (checkitem && checkitem.length > 0) {
//             await req.gtos("BS_JOB_TYPE").where('JobTypeID', checkitem[0]["JobTypeID"]).update(item);
//         } else {
//             //insert database
//             item['CreatedBy'] = item['ModifiedBy'];
//             await req.gtos("BS_JOB_TYPE").insert(item);
//         }
//     }

//     return true;
// }

// const saveServices = async (req, datas) => {
//     for await (let item of datas) {
//         item['ModifiedBy'] = req.session.userdata["UserID"];
//         item['UpdateTime'] = moment().format('YYYY-MM-DD HH:mm:ss');

//         var checkitem = await req.gtos('BS_SERVICE').select("ServiceID")
//             .where('ServiceID', item['ServiceID']).limit(1).catch(err => console.log(err))
//         if (checkitem && checkitem.length > 0) {
//             await req.gtos('BS_SERVICE').where('ServiceID', checkitem[0]["ServiceID"]).update(item);
//         } else {
//             //insert database
//             item['CreateTime'] = item['UpdateTime'];
//             item['CreatedBy'] = item['ModifiedBy'];
//             await req.gtos('BS_SERVICE').insert(item);
//         }
//     }
// }

// const saveMethod = async (req, datas) => {
//     for await (let item of datas) {
//         item['ModifiedBy'] = req.session.userdata["UserID"];
//         item['UpdateTime'] = moment().format('YYYY-MM-DD HH:mm:ss');

//         var checkitem = await req.gtos('BS_METHOD').select("MethodID")
//             .where('MethodID', item['MethodID'])
//             .limit(1).catch(err => console.log(err))
//         if (checkitem && checkitem.length > 0) {
//             await req.gtos('BS_METHOD').where('MethodID', checkitem[0]["MethodID"]).update(item);
//         } else {
//             //insert database
//             item['CreateTime'] = item['UpdateTime'];
//             item['CreatedBy'] = item['ModifiedBy'];
//             await req.gtos('BS_METHOD').insert(item);
//         }
//     }
//     return true;
// }

// const saveShifts = async (datas) => {
//     for await (let item of datas) {
//         item['ModifiedBy'] = req.session.userdata["UserID"];
//         item['UpdateTime'] = moment().format('YYYY-MM-DD HH:mm:ss');

//         var checkitem = await req.gtos('BS_SHIFT').select("ShiftID").where('ShiftID', item['ShiftID'])
//             .limit(1).catch(err => console.log(err))
//         if (checkitem && checkitem.length > 0) {
//             await req.gtos('BS_SHIFT').where('ShiftID', checkitem[0]["ShiftID"]).update(item);
//         } else {
//             //insert database
//             item['CreateTime'] = item['UpdateTime'];
//             item['CreatedBy'] = item['ModifiedBy'];
//             await req.gtos('BS_SHIFT').insert(item);
//         }
//     }
//     return true;
// }

// const savePaymentType = async (req, datas) => {
//     for await (let item of datas) {
//         item['ModifiedBy'] = req.session.userdata["UserID"];
//         item['UpdateTime'] = moment().format('YYYY-MM-DD HH:mm:ss');

//         var checkitem = await req.gtos('BS_INV_PAYMENT_TYPE').select("PaymentTypeID").where('PaymentTypeID', item['PaymentTypeID'])
//             .where('YardID', item['YardID']).limit(1).catch(err => console.log(err))
//         if (checkitem && checkitem.length > 0) {
//             await req.gtos('BS_INV_PAYMENT_TYPE').where('PaymentTypeID', checkitem[0]["PaymentTypeID"]).update(item);
//         } else {
//             //insert database
//             item['CreateTime'] = item['UpdateTime'];
//             item['CreatedBy'] = item['ModifiedBy'];
//             await req.gtos('BS_INV_PAYMENT_TYPE').insert(item);
//         }
//     }
//     return true;
// }

// const savePayForm = async (req, datas) => {
//     for await (let item of datas) {
//         item['ModifiedBy'] = req.session.userdata["UserID"];
//         item['UpdateTime'] = moment().format('YYYY-MM-DD HH:mm:ss');

//         var checkitem = await req.gtos('BS_INV_PAY_FORM').select("PaymentTypeID', 'PayFormID")
//             .where('PaymentTypeID', item['PaymentTypeID'])
//             .where('PayFormID', item['PayFormID'])
//             .limit(1).catch(err => console.log(err))
//         if (checkitem && checkitem.length > 0) {
//             await req.gtos('BS_INV_PAY_FORM').where('PaymentTypeID', checkitem[0]['PaymentTypeID'])
//                 .where('PayFormID', checkitem[0]['PayFormID'])
//                 .update(item);
//         } else {
//             //insert database
//             item['CreateTime'] = item['UpdateTime'];
//             item['CreatedBy'] = item['ModifiedBy'];
//             await req.gtos('BS_INV_PAY_FORM').insert(item);
//         }
//     }
//     return true;
// }

// const saveRate = async (req, datas) => {
//     for await (let item of datas) {
//         item['ModifiedBy'] = req.session.userdata["UserID"];
//         item['UpdateTime'] = moment().format('YYYY-MM-DD HH:mm:ss');

//         var checkitem = await req.gtos('BS_INV_RATE').select("RateID").where('RateID', item['RateID'])
//             .limit(1).catch(err => console.log(err))
//         if (checkitem && checkitem.length > 0) {
//             await req.gtos('BS_INV_RATE').where('RateID', checkitem[0]["RateID"]).update(item);
//         } else {
//             //insert database
//             item['CreateTime'] = item['UpdateTime'];
//             item['CreatedBy'] = item['ModifiedBy'];
//             await req.gtos('BS_INV_RATE').insert(item);
//         }
//     }

//     return true;
// }

// const saveTransit = async (req, datas) => {
//     for await (let item of datas) {
//         item['ModifiedBy'] = req.session.userdata["UserID"];
//         item['UpdateTime'] = moment().format('YYYY-MM-DD HH:mm:ss');

//         var checkitem = await req.gtos('BS_TRANSIT').select("TransitID").where('TransitID', item['TransitID'])
//             .limit(1).get('BS_TRANSIT').catch(err => console.log(err))
//         if (checkitem && checkitem.length > 0) {
//             await req.gtos('BS_TRANSIT').where('TransitID', checkitem[0]["TransitID"]).update(item);
//         } else {
//             //insert database
//             item['CreateTime'] = item['UpdateTime'];
//             item['CreatedBy'] = item['ModifiedBy'];
//             await req.gtos('BS_TRANSIT').insert(item);
//         }
//     }

//     return true;
// }

// const saveArea = async (req, datas) => {
//     for await (let item of datas) {
//         delete item['rowguid'];
//         item['ModifiedBy'] = req.session.userdata["UserID"];
//         item['UpdateTime'] = moment().format('YYYY-MM-DD HH:mm:ss');

//         var checkitem = await req.gtos('BS_YP_AREA').select("Area").where('Area', item['Area'])
//             .limit(1).get('BS_YP_AREA').catch(err => console.log(err))

//         if (checkitem && checkitem.length > 0) {
//             return false;
//         } else {
//             //insert database
//             item['CreatedBy'] = item['ModifiedBy'];
//             await req.gtos('BS_YP_AREA').insert(item);
//         }
//     }

//     return true;
// }

// const updateArea = async (req, datas) => {
//     for await (let item of datas) {
//         item['ModifiedBy'] = this.session.userdata("UserID");
//         item['UpdateTime'] = moment().format('YYYY-MM-DD HH:mm:ss');

//         var checkitem = await req.gtos('BS_YP_AREA').select("rowguid")
//             .where('rowguid', item['rowguid'])
//             .limit(1).catch(err => console.log(err))
//         if (checkitem && checkitem.length > 0) {
//             await req.gtos('BS_YP_AREA').where('rowguid', checkitem[0]["rowguid"]).update(item);
//         }
//     }

//     return true;
// }

// // Delete info in customer table

// // Delete info in port table
// const deletePort = async (datas) => {
//     var result = {
//         error: []
//     }

//     var checkExistManifest = await req.gtos('DT_MANIFEST').select('rowguid', 'POL', 'POD', 'FPOD')
//         .whereIn('POL', datas)
//         .orWhereIn('POD', datas)
//         .orWhereIn('FPOD', datas)
//         .catch(err => console.log(err)) || [];

//     for await (let item of datas) {
//         if (checkExistManifest.filter(p => [p.POL, p.POD, P.FPOD].indexOf(item) >= 0).length > 0) {
//             result['error'].push('Không thể xóa - đã phát sinh dữ liệu Manifest với Mã cảng: ' + item);
//             continue;
//         }

//         await req.gtos('BS_PORT').where('PortID', item).del();
//     }

//     return result;
// }

// // Delete info in job mode table
// const deleteJobModes = async (datas) => {
//     try {
//         await req.gtos('BS_JOB_MODE').whereIn('JobModeID', datas).del();
//         return true;
//     } catch (error) {
//         return false;
//     }
// }

// // Delete info in Service table
// const deleteServices = async (datas) => {
//     try {
//         await req.gtos('BS_SERVICE').whereIn('ServiceID', datas).del();
//         return true;
//     } catch (error) {
//         return false;
//     }
// }

// // Delete info in Job type table
// const deleteJobTypes = async (datas) => {
//     try {
//         await req.gtos('BS_JOB_TYPE').whereIn('JobTypeID', datas).del();
//         return true;
//     } catch (error) {
//         return false;
//     }
// }

// // Delete info in Job type table
// const deleteMethod = async (datas) => {
//     try {
//         await req.gtos('BS_METHOD').whereIn('MethodID', datas).del();
//         return true;
//     } catch (error) {
//         return false;
//     }
// }

// // Delete info in shift table
// const deleteShifts = async (datas) => {
//     try {
//         await req.gtos('BS_SHIFT').whereIn('ShiftID', datas).del();
//         return true;
//     } catch (error) {
//         return false;
//     }
// }

// // Delete info in Transit table
// const deleteTransit = async (datas) => {
//     try {
//         await req.gtos('BS_TRANSIT').whereIn('TransitID', datas).del();
//         return true;
//     } catch (error) {
//         return false;
//     }
// }

// // Delete info in Area table
// const deleteArea = async (datas) => {
//     try {
//         await req.gtos('BS_YP_AREA').whereIn('Area', datas).del();
//         return true;
//     } catch (error) {
//         return false;
//     }
// }

// // payment method save data function
// const savePaymentMethod = async (req, datas) => {

//     for await (let item of datas) {
//         item['ModifiedBy'] = req.session.userdata["UserID"];
//         item['update_time'] = moment().format('YYYY-MM-DD HH:mm:ss');

//         var checkitem = await req.gtos('ACCOUNTS').select("rowguid")
//             .where('ACC_CD', item['ACC_CD'])
//             .limit(1).catch(err => console.log(err))
//         if (checkitem && checkitem.length > 0) {
//             await req.gtos('ACCOUNTS').where('rowguid', checkitem[0]["rowguid"]).update(checkitem);
//         } else {
//             //insert database
//             item['CreatedBy'] = item['ModifiedBy'];
//             await req.gtos('ACCOUNTS').insert(item);
//         }
//     }
//     return true;
// }

// /* Nation Table */
// const saveNation = async (req, datas) => {

//     for await (let item of datas) {
//         item['ModifiedBy'] = req.session.userdata["UserID"];
//         item['UpdateTime'] = moment().format('YYYY-MM-DD HH:mm:ss');

//         var checkitem = await req.gtos('BS_NATIONAL').select("NationID").where('NationID', item['NationID'])
//             .limit(1).catch(err => console.log(err))
//         if (checkitem && checkitem.length > 0) {
//             await req.gtos('BS_NATIONAL').where('NationID', checkitem[0]["NationID"]).update(item);
//         } else {
//             //insert database
//             item['CreatedBy'] = item['ModifiedBy'];
//             await req.gtos('BS_NATIONAL').insert(item);
//         }
//     }
//     return true;
// }

// const deleteNation = async (datas) => {
//     try {
//         await req.gtos('BS_NATIONAL').whereIn('NationID', datas).del();
//         return true;
//     } catch (error) {
//         return false;
//     }
// }

// /* Opr Table */
// const saveOpr = async (req, datas) => {
//     for await (let item of datas) {
//         item['ModifiedBy'] = req.session.userdata["UserID"];
//         item['UpdateTime'] = moment().format('YYYY-MM-DD HH:mm:ss');

//         var checkitem = await req.gtos('BS_OPR').select("OprID").where('OprID', item['OprID'])
//             .limit(1).catch(err => console.log(err))
//         if (checkitem && checkitem.length > 0) {
//             await req.gtos('BS_OPR').where('OprID', checkitem[0]["OprID"]).update(item);
//         } else {
//             //insert database
//             item['CreatedBy'] = item['ModifiedBy'];
//             await req.gtos('BS_OPR').insert(item);
//         }
//     }
//     return true;
// }

// const deleteOpr = async (datas) => {
//     try {
//         await req.gtos('BS_OPR').whereIn('OprID', datas).del();
//         return true;
//     } catch (error) {
//         return false;
//     }
// }

// /* Gate Table */
// const saveGate = async (req, datas) => {
//     for await (let item of datas) {
//         item['ModifiedBy'] = req.session.userdata["UserID"];
//         item['UpdateTime'] = moment().format('YYYY-MM-DD HH:mm:ss');

//         var checkitem = await req.gtos('BS_GATE').select("GateID").where('GateID', item['GateID'])
//             .limit(1).catch(err => console.log(err))
//         if (checkitem && checkitem.length > 0) {
//             /* Do nothing */
//         } else {
//             item['CreatedBy'] = item['ModifiedBy'];
//             await req.gtos('BS_GATE').insert(item);
//         }
//     }
//     return true;
// }

// const updateGate = async (req, datas) => {
//     for await (let item of datas) {
//         item['ModifiedBy'] = req.session.userdata["UserID"];
//         item['UpdateTime'] = moment().format('YYYY-MM-DD HH:mm:ss');

//         var checkitem = await req.gtos('BS_GATE').select("rowguid', 'GateID")
//             .where('rowguid', item['rowguid'])
//             .limit(1).catch(err => console.log(err))

//         if (checkitem && checkitem.length > 0) {
//             await req.gtos('BS_GATE').where('rowguid', checkitem[0]["rowguid"]).update(item);
//         } else {
//             /* Do nothing */
//         }
//     }

//     return true;
// }

// const deleteGate = async (datas) => {
//     try {
//         await req.gtos('BS_GATE').whereIn('GateID', datas).del();
//         return true;
//     } catch (error) {
//         return false;
//     }
// }

// /* Lane Table */
// const saveLane = async (req, datas) => {
//     for await (let item of datas) {
//         item['ModifiedBy'] = req.session.userdata["UserID"];
//         item['UpdateTime'] = moment().format('YYYY-MM-DD HH:mm:ss');

//         var checkitem = await req.gtos('BS_LANE').select("LaneID', 'OprID").where('LaneID', item['LaneID'])
//             .where('OprID', item['OprID'])
//             .limit(1).catch(err => console.log(err))
//         if (checkitem && checkitem.length > 0) {
//             await req.gtos('BS_LANE')
//                 .where('LaneID', checkitem[0]["LaneID"])
//                 .where('OprID', checkitem[0]['OprID'])
//                 .update(item);
//         } else {
//             //insert database
//             item['CreatedBy'] = item['ModifiedBy'];
//             await req.gtos('BS_LANE').insert(item);
//         }
//     }

//     return true;
// }

// const saveLaneDetail = async (req, datas) => {

//     for await (let item of datas) {
//         item['ModifiedBy'] = req.session.userdata["UserID"];
//         item['UpdateTime'] = moment().format('YYYY-MM-DD HH:mm:ss');

//         var checkitem = await req.gtos('BS_LANE_DETAILS').select("LaneID", "PortSeq")
//             .where('LaneID', item['LaneID'])
//             .where('PortSeq', item['PortSeq'])
//             .where('YardID', item['YardID'])
//             .limit(1).catch(err => console.log(err))
//         if (checkitem && checkitem.length > 0) {
//             await req.gtos('BS_LANE_DETAILS')
//                 .where('LaneID', checkitem[0]['LaneID'])
//                 .where('PortSeq', checkitem[0]['PortSeq'])
//                 .update(item);
//         } else {
//             //insert database
//             item['CreatedBy'] = item['ModifiedBy'];
//             await req.gtos('BS_LANE_DETAILS').insert(item);
//         }
//     }

//     return true;
// }

// const deleteLaneDetails = async (datas, datas2, LaneID) => {
//     try {
//         await req.gtos('BS_LANE_DETAILS').where('LaneID', LaneID).whereIn('PortSeq', datas).del();
//         await req.gtos('BS_LANE').where('LaneID', LaneID).whereIn('OprID', datas2).del();
//         for await (let item of datas) {
//             await req.gtos('BS_LANE_DETAILS').where('LaneID', LaneID)
//                 .where('PortSeq', '>', item)
//                 .decrement({ PortSeq: 1 }).catch(err => console.log(err))
//         }
//         return true;
//     } catch (error) {
//         return false;
//     }
// }

// const deleteLaneDetailsByOpr = async (datas, LaneID) => {
//     try {
//         await req.gtos('BS_LANE_DETAILS').where('LaneID', LaneID).whereIn('OprID', datas).del();
//         return true;
//     } catch (error) {
//         return false;
//     }
// }
// // payment method delete function
// const deletePaymentMethod = async (datas) => {
//     var result = { error: [] }

//     for await (let item of datas) {
//         var checkInv = await req.gtos('INV_VAT').select('rowguid', 'INV_NO')
//             .where('ACC_CD', item)
//             .limit(1).catch(err => console.log(err))
//         if (!checkInv || checkInv.length == 0) {
//             await req.gtos('INV_VAT').where('ACC_CD', item).del();
//         } else {
//             result['error'].push('Không thể xóa - đã phát sinh hóa đơn: ' + checkInv[0].INV_NO);
//         }
//     }
//     return result;
// }

// /* Delete info in Payment Type table */
// const deletePaymentType = async (datas) => {
//     try {
//         await req.gtos('BS_INV_PAYMENT_TYPE').whereIn('PaymentTypeID', datas).del();
//         return true;
//     } catch (error) {
//         return false;
//     }
// }

// /* Delete info in Pay Fomr table */
// const deletePayForm = async (datas) => {
//     try {
//         await req.gtos('BS_INV_PAY_FORM').whereIn('PayFormID', datas).del();
//         return true;
//     } catch (error) {
//         return false;
//     }
// }

// /* Delete info in Rate table */
// const deleteRate = async (datas) => {
//     try {
//         await req.gtos('BS_INV_RATE').whereIn('RateID', datas).del();
//         return true;
//     } catch (error) {
//         return false;
//     }
// }


// /* Damaged Type */
// const saveDamagedType = async (req, datas) => {
//     for await (let item of datas) {
//         delete item['rowguid'];

//         item['ModifiedBy'] = req.session.userdata["UserID"];
//         item['UpdateTime'] = moment().format('YYYY-MM-DD HH:mm:ss');

//         var checkitem = await req.gtos('BS_DAMAGED_TYPE').select("rowguid")
//             .where('DamagedTypeID', item['DamagedTypeID'])
//             .limit(1).catch(err => console.log(err))

//         if (checkitem && checkitem.length > 0) {
//             /* Do nothing */
//             await req.gtos('BS_DAMAGED_TYPE').where('rowguid', checkitem[0]["rowguid"]).update(item);
//         } else {
//             item['CreateTime'] = item['UpdateTime'];
//             await req.gtos('BS_DAMAGED_TYPE').insert(item);
//         }
//     }

//     return true;
// }

// const updateDamagedType = async (req, datas) => {
//     return await saveDamagedType(req, datas);
// }

// const deleteDamagedType = async (datas) => {
//     try {
//         await req.gtos('BS_DAMAGED_TYPE').whereIn('DamagedTypeID', datas).del();
//         return true;
//     } catch (error) {
//         return false;
//     }
// }

// /* Damaged */
// const saveDamaged = async (req, datas) => {
//     for await (let item of datas) {
//         delete item['rowguid'];
//         var checkitem = await req.gtos('BS_DAMAGED').select("rowguid").where('DamagedID', item['DamagedID'])
//             .limit(1).catch(err => console.log(err))
//         if (checkitem && checkitem.length > 0) {
//             item['ModifiedBy'] = req.session.userdata["UserID"];
//             item['UpdateTime'] = moment().format('YYYY-MM-DD HH:mm:ss');
//             await req.gtos('BS_DAMAGED').where('rowguid', checkitem[0]["rowguid"]).update(item);
//         } else {
//             item['CreatedBy'] = req.session.userdata["UserID"];
//             await req.gtos('BS_DAMAGED').insert(item);
//         }
//     }

//     return true;
// }

// const updateDamaged = async (req, datas) => {
//     return await saveDamaged(req, datas);
// }

// const deleteDamaged = async (datas) => {
//     try {
//         await req.gtos('BS_DAMAGED').whereIn('DamagedID', datas).del();
//         return true;
//     } catch (error) {
//         return false;
//     }
// }



// /* Bitt */
// const saveBitt = async (req, datas) => {
//     for await (let item of datas) {
//         delete item['rowguid'];

//         var checkitem = await req.gtos('BS_BITT').select("rowguid").where('BittID', item['BittID'])
//             .limit(1).catch(err => console.log(err));
//         if (checkitem && checkitem.length > 0) {
//             /* Do nothing */
//             item['ModifiedBy'] = req.session.userdata["UserID"];
//             item['UpdateTime'] = moment().format('YYYY-MM-DD HH:mm:ss');

//             await req.gtos('BS_BITT').where('rowguid', checkitem[0]["rowguid"]).update(item);
//         } else {
//             item['CreatedBy'] = req.session.userdata["UserID"];
//             await req.gtos('BS_BITT').insert(item);
//         }
//     }

//     return true;
// }

// const updateBitt = async (req, datas) => {
//     return await saveBitt(req, datas)
// }

// const deleteBitt = async (datas) => {
//     try {
//         await req.gtos('BS_BITT').whereIn('BittID', datas).del();
//         return true;
//     } catch (error) {
//         return false;
//     }
// }

// /* Color */
// const saveColor = async (req, datas) => {
//     for await (let item of datas) {
//         delete item['rowguid'];

//         var checkitem = await req.gtos('BS_YP_COLOR').select("rowguid")
//             .where({
//                 'VesselID': item['VesselID'],
//                 'CarTypeID': item['CarTypeID']
//             })
//             .limit(1).catch(err => console.log(err))
//         if (checkitem && checkitem.length > 0) {
//             item['ModifiedBy'] = req.session.userdata["UserID"];
//             item['UpdateTime'] = moment().format('YYYY-MM-DD HH:mm:ss');

//             await req.gtos('BS_YP_COLOR').where('rowguid', checkitem[0]["rowguid"]).update(item);
//         } else {
//             item['CreatedBy'] = req.session.userdata["UserID"];
//             await req.gtos('BS_YP_COLOR').insert(item);
//         }
//     }
//     return true;
// }

// const deleteColor = async (datas) => {
//     try {
//         await req.gtos('BS_YP_COLOR').where({
//             VesselID: item['VesselID'],
//             BrandID: item['BrandID'],
//             CarTypeID: item['CarTypeID']
//         }).del();
//         return true;
//     } catch (error) {
//         return false;
//     }
// }

// /* Worker Group Type */
// const saveWorkerGroupType = async (req, datas) => {
//     for await (let item of datas) {
//         var checkitem = await req.gtos('BS_WORKER_GROUP_TYPE').select("rowguid")
//             .where('WorkerGroupType', item['WorkerGroupType'])
//             .limit(1).catch(err => console.log(err))
//         if (checkitem && checkitem.length > 0) {
//             item['ModifiedBy'] = req.session.userdata["UserID"];
//             item['UpdateTime'] = moment().format('YYYY-MM-DD HH:mm:ss');

//             await req.gtos('BS_WORKER_GROUP_TYPE').where('rowguid', checkitem[0]["rowguid"]).update(item);
//         } else {
//             item['CreatedBy'] = req.session.userdata["UserID"];
//             await req.gtos('BS_WORKER_GROUP_TYPE').insert(item);
//         }
//     }
//     return true;
// }

// const deleteWorkerGroupType = async (datas) => {
//     try {
//         await req.gtos('BS_WORKER_GROUP_TYPE').whereIn('WorkerGroupType', datas).del();
//         return true;
//     } catch (error) {
//         return false;
//     }
// }

// /* Worker Group */
// const saveWorkerGroup = async (req, datas) => {
//     for await (let item of datas) {
//         var checkitem = await req.gtos('BS_WORKER_GROUP').select('rowguid').where('WorkerGroupID', item['WorkerGroupID'])
//             .limit(1).catch(err => console.log(err))
//         if (checkitem && checkitem.length > 0) {
//             item['ModifiedBy'] = req.session.userdata["UserID"];
//             item['UpdateTime'] = moment().format('YYYY-MM-DD HH:mm:ss');
//             await req.gtos('BS_WORKER_GROUP').where('rowguid', checkitem[0]['rowguid']).update(item);
//         } else {
//             item['CreatedBy'] = req.session.userdata["UserID"];
//             await req.gtos('BS_WORKER_GROUP').insert(item);
//         }
//     }
//     return true;
// }

// const deleteWorkerGroup = async (datas) => {
//     try {
//         await req.gtos('BS_WORKER_GROUP').whereIn('WorkerGroupID', datas).del();
//         return true;
//     } catch (error) {
//         return false;
//     }
// }

// //save unit_codes
// const saveUnitCode = async (req, datas) => {
//     for await (let item of datas) {
//         var checkitem = await req.gtos('BS_UNIT').select("rowguid").where('UnitID', item['UnitID'])
//             .limit(1).catch(err => console.log(err))
//         if (checkitem && checkitem.length > 0) {
//             item['UpdateTime'] = moment().format('YYYY-MM-DD HH:mm:ss');
//             item['ModifiedBy'] = req.session.userdata["UserID"];
//             await req.gtos('BS_UNIT').where('rowguid', checkitem[0]["rowguid"]).update(item);
//         } else {
//             //insert database
//             item['CreatedBy'] = req.session.userdata["UserID"];
//             await req.gtos('BS_UNIT').insert(item);
//         }
//     }

//     return true;
// }

// // Delete unit codes
// const deleteUnitCode = async (datas) => {
//     try {
//         await req.gtos('BS_UNIT').whereIn('UnitID', datas).del();
//         return true;
//     } catch (error) {
//         return false;
//     }
// }

// /* Class */
// const saveClass = async (req, datas) => {

//     for await (let item of datas) {
//         delete item['rowguid'];
//         var checkitem = await req.gtos('BS_CLASS').select("rowguid").where('ClassID', item['ClassID'])
//             .limit(1).catch(err => console.log(err))
//         if (checkitem && checkitem.length > 0) {
//             /* Do nothing */
//             item['ModifiedBy'] = req.session.userdata["UserID"];
//             item['UpdateTime'] = moment().format('YYYY-MM-DD HH:mm:ss');
//             await req.gtos('BS_CLASS').where('rowguid', checkitem[0]["rowguid"]).update(item);
//         } else {
//             item['CreatedBy'] = req.session.userdata["UserID"];
//             await req.gtos('BS_CLASS').insert(item);
//         }
//     }

//     return true;
// }

// const updateClass = async (req, datas) => {
//     return await saveClass(req, datas);
// }

// const deleteClass = async (datas) => {
//     try {
//         await req.gtos('BS_CLASS').whereIn('ClassID', datas).del();
//         return true;
//     } catch (error) {
//         return false;
//     }
// }

// /* Yard */
// const saveYard = async (req, datas) => {
//     for await (let item of datas) {
//         delete item['rowguid'];
//         var checkitem = await req.gtos('BS_YARD').select("rowguid").where('YardID', item['YardID'])
//             .limit(1).catch(err => console.log(err))
//         if (checkitem && checkitem.length > 0) {
//             item['UpdateTime'] = moment().format('YYYY-MM-DD HH:mm:ss');
//             item['ModifiedBy'] = req.session.userdata["UserID"];
//             await req.gtos('BS_YARD').where('YardID', checkitem[0]["rowguid"]).update(item);
//         } else {
//             item['CreatedBy'] = req.session.userdata["UserID"];
//             await req.gtos('BS_YARD').insert(item);
//         }
//     }

//     return true;
// }

// const deleteYard = async (datas) => {
//     try {
//         await req.gtos('BS_YARD').whereIn('YardID', datas).del();
//         return true;
//     } catch (error) {
//         return false;
//     }
// }

// /* Block */
// const saveBlock = async (req, datas) => {
//     for await (let item of datas) {
//         var checkitem = await req.gtos('BS_YP_BLOCK').select('rowguid')
//             .where({
//                 'MaxBay': item['MaxBay'],
//                 'MaxRow': item['MaxRow'],
//                 'MaxTier': item['MaxTier']
//             })
//             .limit(1).catch(err => console.log(err))

//         if (checkitem && checkitem.length > 0) {
//             item['ModifiedBy'] = req.session.userdata["UserID"];
//             item['UpdateTime'] = moment().format('YYYY-MM-DD HH:mm:ss');
//             await req.gtos('BS_YP_BLOCK').where('rowguod').update(item);
//         } else {
//             item['CreatedBy'] = req.session.userdata["UserID"];
//             await req.gtos('BS_YP_BLOCK').insert(item);
//         }
//     }
//     return true;
// }

// const deleteBlock = async (datas) => {
//     try {
//         for await (let item of datas) {
//             await req.gtos('BS_YP_BLOCK')
//                 .where('Block', item['Block'])
//                 .where('MaxBay', item['MaxBay'])
//                 .where('MaxRow', item['MaxRow'])
//                 .where('MaxTier', item['MaxTier'])
//                 .del();
//         }
//         return true;
//     } catch (error) {
//         return false;
//     }
// }

// //save exchange rate
// const saveExchangeRate = async (req, datas) => {
//     for await (let item of datas) {
//         delete item['rowguid'];

//         var checkitem = await req.gtos('EXCHANGE_RATE').select("rowguid")
//             .where('CURRENCYID', item['CURRENCYID'])
//             .limit(1).catch(err => console.log(err))

//         if (checkitem && checkitem.length > 0) {
//             item['ModifiedBy'] = req.session.userdata["UserID"];
//             item['update_time'] = moment().format('YYYY-MM-DD HH:mm:ss');
//             await req.gtos('EXCHANGE_RATE').where('rowguid', checkitem[0]["rowguid"]).update(item);
//         } else {
//             //insert database
//             item['CreatedBy'] = req.session.userdata["UserID"];
//             item['insert_time'] = moment().format('YYYY-MM-DD HH:mm:ss');
//             await req.gtos('EXCHANGE_RATE').insert(item);
//         }
//     }

//     return true;
// } // ------------end exchange rate save data function

// // delete exchange rate
// const deleteExchangeRate = async (datas) => {
//     try {
//         await req.gtos('EXCHANGE_RATE').whereIn('CURRENCYID', datas).del();
//         return true;
//     } catch (error) {
//         return false;
//     }
// }

// const saveServiceAddon = async (req, datas) => {
//     for await (let item of datas) {
//         item["SRM_NO"] = item["ORD_TYPE"] + "_" + item["CjMode_CD"];

//         if (parseInt(item["IsChecked"]) == 1) {
//             var checkitem = await req.gtos('SRVMORE').select("rowguid")
//                 .where("ORD_TYPE", item["ORD_TYPE"])
//                 .where("CjMode_CD", item["CjMode_CD"])
//                 .limit(1).catch(err => console.log(err));

//             if (checkitem && checkitem.length > 0) {
//                 item['ModifiedBy'] = req.session.userdata["UserID"];
//                 item['update_time'] = moment().format('YYYY-MM-DD HH:mm:ss');

//                 await req.gtos('SRVMORE').where('rowguid', checkitem[0]["rowguid"])
//                     .update({ "chkPrint": item["chkPrint"] });
//             } else {
//                 delete item["IsChecked"];
//                 //insert database
//                 item['CreatedBy'] = req.session.userdata["UserID"];
//                 item['insert_time'] = moment().format('YYYY-MM-DD HH:mm:ss');
//                 await req.gtos('SRVMORE').insert(item);
//             }
//         } else {
//             await req.gtos('SRVMORE')
//                 .where("ORD_TYPE", item["ORD_TYPE"])
//                 .where("CjMode_CD", item["CjMode_CD"])
//                 .del();
//         }
//     }
//     return true;
// }

// const saveTRFTempConfig = async (req, datas) => {
//     for await (let item of datas) {
//         item["ORD_TPLT_NO"] = item["ORD_TYPE"] + "_" + item["TPLT_NM"];

//         if (parseInt(item["IsChecked"]) == 1) {
//             item['ModifiedBy'] = req.session.userdata["UserID"];
//             item['update_time'] = moment().format('YYYY-MM-DD HH:mm:ss');

//             var checkItem = await req.gtos('ORD_TPLT').select("rowguid")
//                 .where("ORD_TYPE", item["ORD_TYPE"])
//                 .where("TPLT_NM", item["TPLT_NM"])
//                 .limit(1).catch(err => console.log(err));

//             if (!checkItem || checkItem.length == 0) {
//                 delete item["IsChecked"];
//                 //insert database
//                 item['CreatedBy'] = req.session.userdata["UserID"];
//                 item['insert_time'] = moment().format('YYYY-MM-DD HH:mm:ss');
//                 await req.gtos('ORD_TPLT').insert(item);
//             }
//         } else {
//             await req.gtos('ORD_TPLT')
//                 .where("ORD_TYPE", item["ORD_TYPE"])
//                 .where("TPLT_NM", item["TPLT_NM"])
//                 .del();
//         }
//     }

//     return true;
// }

// const LoadVesselListFromManifestForColorScreen = async (req) => {
//     return await req.gtos()
//         .select('VesselID', 'VesselName', 'A.BrandID as BrandID', 'BrandName', 'A.CarTypeID', 'CarTypeName'
//             , 'A.EngineType', 'POL', gtosglobal.raw('D.PortName AS POLName'), 'POD', 'E.PortName as PODName'
//             , 'FPOD', gtosglobal.raw('E.PortName as FPODName'), 'A.Remark')
//         .from('DT_MANIFEST AS A')
//         .join('DT_VESSEL_VISIT AS B', 'A.VoyageKey', 'B.VoyageKey')
//         .join('BS_CAR_BRAND AS C', 'A.BrandID', 'C.BrandID')
//         .join('BS_PORT AS D', 'POL', 'D.PortID')
//         .join('BS_PORT AS E', 'POD', 'E.PortID')
//         .join('BS_PORT AS F', 'FPOD', 'F.PortID')
//         .join('BS_CAR_TYPE AS G', 'A.CarTypeID', 'G.CarTypeID')
//         .orderBy('VesselID').catch(err => console.log(err)) || []
// }

// const loadAllColColor = async (req) => {
//     return await req.gtos()
//         .select('A.VesselID', 'VesselName', 'A.BrandID', 'BrandName', 'A.CarTypeID', 'CarTypeName', 'A.EngineType', 'POL'
//             , gtosglobal.raw('E.PortName as POLName'), 'POD', gtosglobal.raw('F.PortName as PODName'), 'FPOD'
//             , gtosglobal.raw('G.PortName as FPODName'), 'BackColor', 'ForeColor', 'A.Remark')
//         .from('BS_YP_COLOR AS A')
//         .join("DT_VESSEL_VISIT AS B", 'A.VesselID', 'B.VesselID')
//         .join("BS_CAR_BRAND AS C", 'A.BrandID', 'C.BrandID')
//         .join("BS_CAR_TYPE AS D", 'A.CarTypeID', 'D.CarTypeID')
//         .join("BS_PORT AS E", 'POL', 'E.PortID')
//         .join("BS_PORT AS F", 'POD', 'F.PortID')
//         .join("BS_PORT AS G", 'FPOD', 'G.PortID')
//         .catch(err => console.log(err))
// }

// const loadAllColClass = async (req) => {
//     return await req.gtos('BS_CLASS').select('ClassID', 'ClassName', 'rowguid').orderBy('ClassID').catch(err => console.log(err))
// }

// const loadAllColYard = async (req) => {
//     return await req.gtos().from('BS_YARD').select('*').orderBy('YardID').catch(err => console.log(err))
// }

// const loadAllColPrefix = async (req) => {
//     return await req.gtos().from('BS_INV_PREFIX').select('*').orderBy('PackageID').catch(err => console.log(err))
// }

// const loadBlockByYardID = async (YardID = '') => {
//     var blocks = req.gtos().select('YardID', 'Block', 'MaxBay', 'MaxRow', 'MaxTier', 'Capacity')

//     if (YardID != '') {
//         blocks.where('YardID', YardID);
//     }
//     blocks.orderBy('YardID')
//     return await blocks.catch(err => console.log(err))
// }

// /* VM Status */
// const loadVMStatusList = async (req) => {
//     return await req.gtos('BS_VMSTATUS').select('VMStatus', 'VMStatusDesc', 'rowguid').orderBy('VMStatus').catch(err => console.log(err))
// }

// const saveVMStatus = async (req, datas) => {
//     for await (let item of datas) {
//         delete item['rowguid'];
//         var checkitem = await req.gtos('BS_VMSTATUS').select("rowguid").where('VMStatus', item['VMStatus'])
//             .limit(1).catch(err => console.log(err));

//         if (checkitem && checkitem.length > 0) {
//             /* Do nothing */
//             item['UpdateTime'] = moment().format('YYYY-MM-DD HH:mm:ss');
//             item['ModifiedBy'] = req.session.userdata["UserID"];
//             await req.gtos('BS_VMSTATUS').where('rowguid', checkitem[0]["rowguid"]).update(item);
//         } else {
//             item['CreatedBy'] = req.session.userdata["UserID"];
//             await req.gtos('BS_VMSTATUS').insert(item);
//         }
//     }

//     return true;
// }

// const updateVMStatus = async (req, datas) => {
//     return saveVMStatus(req, datas);
// }

// const deleteVMStatus = async (datas) => {
//     try {
//         await req.gtos('BS_VMSTATUS').whereIn('VMStatus', datas).del();
//         return true;
//     } catch (error) {
//         return false;
//     }
// }

// const loadGateList = async (req) => {
//     return await req.gtos().from('BS_GATE').select('*').orderBy('GateID').catch(err => console.log(err));
// }

// const insertScalesDataForIn = async (req, datas, StockRef = '') => {
//     for await (let item of datas) {
//         item['ModifiedBy'] = req.session.userdata["UserID"];
//         item['UpdateTime'] = moment().format('YYYY-MM-DD HH:mm:ss');

//         var checkSeq = await req.gtos('JOB_QUAY').select('max(Sequence) as Sequence')
//             .where('TruckNo', item['TruckNo'])
//             .where('ClassID', 1)
//             .whereNull('BookingNo')
//             .limit(1).catch(err => console.log(err))

//         var sequence = -1;
//         if (parseInt(checkSeq[0]?.Sequence) > 0) {
//             sequence = checkSeq[0]['Sequence'];
//         }

//         item['Sequence'] = sequence;
//         await req.gtos('BS_TRUCK_WEIGHT').insert(item);

//         /* UPDATE STOCK IN BULK */
//         await req.gtos('DT_STOCKIN_BULK')
//             .where({
//                 'TruckNo': item['TruckNo'],
//                 'Sequence': item['Sequence'],
//                 'StockRef': StockRef
//             })
//             .whereNull('CargoWeightGetIn')
//             .update({ 'CargoWeightGetIn': item['CargoWeight'] });
//     }

//     return true;
// }

// const insertScalesDataWithBLForIn = async (req, datas) => {
//     for await (let item of datas) {
//         item['CreatedBy'] = req.session.userdata["UserID"];
//         item['ModifiedBy'] = item['CreatedBy'];
//         item['CreateTime'] = moment().format('YYYY-MM-DD HH:mm:ss');
//         item['UpdateTime'] = item['CreateTime'];

//         var checkSeq = await req.gtos('JOB_GATE').select('max(Sequence) as Sequence')
//             .where('EirNo', item['EirNo'])
//             .where('TruckNo', item['TruckNo'])
//             .where('BillOfLading', item['BillOfLading'])
//             .limit(1).catch(err => console.log(err)) || []

//         sequence = -1;
//         if (parseInt(checkSeq[0]?.Sequence) > 0) {
//             sequence = checkSeq[0]['Sequence'];
//             item['Sequence'] = sequence;
//             await req.gtos('BS_TRUCK_WEIGHT').insert(item);
//         }
//     }
//     return true;
// }

// const updateScalesDataWithBLForIn = async (req, datas) => {
//     for await (let item of datas) {
//         var checkExist = await req.gtos('BS_TRUCK_WEIGHT').select('rowguid')
//             .where('TruckNo', item['TruckNo'])
//             .where('EirNo', item['EirNo'])
//             .where('Sequence', item['Sequence'])
//             .limit(1).catch(err => console.log(err)) || []

//         if (checkExist.length > 0) {
//             await req.gtos('BS_TRUCK_WEIGHT')
//                 .where('rowguid', checkExist[0]['rowguid'])
//                 .update({
//                     'CargoWeight': item['CargoWeight'],
//                     'FirstWeightScale': item['FirstWeightScale']
//                 })
//         } else {
//             item['CreatedBy'] = req.session.userdata["UserID"];
//             item['CreateTime'] = moment().format('YYYY-MM-DD HH:mm:ss');
//             await req.gtos('BS_TRUCK_WEIGHT').insert(item);
//         }
//     }

//     return true;
// }

// const saveScalesDataForOut = async (req, datas) => {
//     for await (let item of datas) {
//         item['ModifiedBy'] = req.session.userdata["UserID"];
//         item['UpdateTime'] = moment().format('YYYY-MM-DD HH:mm:ss');
//         var eirNo = item['EirNo'];

//         var checkExistFinishTwoScales = await req.gtos('BS_TRUCK_WEIGHT').select('rowguid', 'SecondWeightScale')
//             .where('TruckNo', item['TruckNo'])
//             .whereNotNull('FirstWeightScale')
//             .whereNotNull('SecondWeightScale')
//             .limit(1).catch(err => console.log(err))

//         var checkIsSecondScale = false;
//         var firstWeightScale = await req.gtos('BS_TRUCK_WEIGHT').select('rowguid', 'Sequence')
//             .where('EirNo', item['EirNo'])
//             .where('TruckNo', item['TruckNo'])
//             .whereNotNull('FirstWeightScale')
//             .whereNull('SecondWeightScale')
//             .limit(1).catch(err => console.log(err))
//         if (firstWeightScale && firstWeightScale.length > 0) {
//             checkIsSecondScale = true;
//         }

//         var gateSequence = await req.gtos('JOB_GATE').select('rowguid', 'Sequence')
//             .where('EirNo', item['EirNo'])
//             .where('TruckNo', item['TruckNo'])
//             .whereNull('FinishDate')
//             .limit(1).catch(err => console.log(err))

//         /* Get sequence */
//         if (checkIsSecondScale) {
//             sequence = firstWeightScale[0]['Sequence'];
//         } else {
//             sequence = gateSequence[0]['Sequence'];
//         }

//         if (checkExistFinishTwoScales && checkExistFinishTwoScales.length > 0) { // Not have two scale before
//             item['CreatedBy'] = item['ModifiedBy'];
//             item['Sequence'] = sequence;

//             if (checkIsSecondScale) { // In second scale
//                 item['CargoWeight'] = item['FirstWeightScale'] - item['SecondWeightScale'];

//                 await req.gtos('BS_TRUCK_WEIGHT').where('TruckNo', item['TruckNo'])
//                     .where('EirNo', item['EirNo'])
//                     .where('Sequence', sequence)
//                     .update(item);

//             } else { // In the first scale
//                 await req.gtos('BS_TRUCK_WEIGHT').insert(item);
//             }

//         } else { // Have two scale before
//             item['Sequence'] = sequence;
//             item['CargoWeight'] = parseFloat(item['FirstWeightScale']) - parseFloat(checkExistFinishTwoScales[0]['SecondWeightScale']);
//             item['TruckWeight'] = checkExistFinishTwoScales[0]['SecondWeightScale'];
//             item['SecondWeightScale'] = checkExistFinishTwoScales[0]['SecondWeightScale'];
//             item['CreatedBy'] = item['ModifiedBy'];

//             await req.gtos('BS_TRUCK_WEIGHT').insert(item);
//         }

//         if (item['CargoWeight']) {
//             /* Update data for STOCK_IN and JOB_GATE */
//             await req.gtos('DT_STOCKIN_BULK').where('EirNo', eirNo)
//                 .where('Sequence', sequence)
//                 .update({ 'CargoWeightGetIn': item['CargoWeight'] })

//             await req.gtos('JOB_GATE').where('EirNo', eirNo)
//                 .where('Sequence', sequence)
//                 .update({ 'CarWeight': item['CargoWeight'] })

//             /* Update JOB QUAY */
//             var stockRef = await req.gtos('JOB_GATE').select('StockRef')
//                 .where('EirNo', eirNo)
//                 .where('Sequence', sequence)
//                 .limit(1).catch(err => console.log(err))

//             if (stockRef && stockRef.length > 0) {
//                 await req.gtos('JOB_QUAY').where('StockRef', stockRef[0].StockRef)
//                     .where('Sequence', sequence)
//                     .update({ 'CarWeight': item['CargoWeight'] });
//             }
//         }
//     }
//     return true;
// }

// const loadTruckWeightList = async (YardID = '') => {
//     return await req.gtos()
//         .select('A.rowguid rowguid', 'EirNo', 'TruckNo', 'FirstWeightScale', 'SecondWeightScale', 'A.JobModeID', 'JobModeName'
//             , 'Sequence', 'BillOfLading', 'BookingNo')
//         .from('BS_TRUCK_WEIGHT AS A')
//         .leftJoin('BS_JOB_MODE AS B', function () {
//             this.on('A.JobModeID', 'B.JobModeID').on(gtosglobal.raw('A.FirstWeightScale IS NULL'))
//         })
//         .orderBy('EirNo', 'Sequence').catch(err => console.log(err))
// }

// const loadTruckWeightDataByTruckNo = async (TruckNo = '') => {
//     return await req.gtos().from('BS_TRUCK_WEIGHT').select('*')
//         .where('TruckNo', TruckNo)
//         .whereNotNull('SecondWeightScale').catch(err => console.log(err))
// }

// const loadCargoTypeList = async (req) => {
//     return await req.gtos('BS_CARGOTYPE').select('CargoTypeID', 'CargoTypeName', 'rowguid');
// }

// const saveCargoType = async (req, datas) => {
//     for await (let item of datas) {
//         delete item['rowguid'];
//         item['ModifiedBy'] = req.session.userdata["UserID"];
//         item['UpdateTime'] = moment().format('YYYY-MM-DD HH:mm:ss');

//         var checkitem = await req.gtos('BS_CARGOTYPE').select("CargoTypeID").where('CargoTypeID', item['CargoTypeID']).limit(1);
//         if (checkitem && checkitem.length > 0) {
//             return FALSE;
//         } else {
//             item['CreatedBy'] = req.session.userdata["UserID"];
//             await req.gtos('BS_CARGOTYPE').insert(item);
//         }
//     }

//     return true;
// }

// const updateCargoType = async (req, datas) => {
//     for await (let item of datas) {
//         item['ModifiedBy'] = req.session.userdata["UserID"];
//         item['UpdateTime'] = moment().format('YYYY-MM-DD HH:mm:ss');
//         var checkitem = await req.gtos('BS_CARGOTYPE').select("rowguid").where('rowguid', item['rowguid']).limit(1);
//         if (checkitem && checkitem.length > 0) {
//             await req.gtos('BS_CARGOTYPE').where('rowguid', checkitem[0]["rowguid"]).update(item);
//         } else {
//             /* Do nothing */
//         }
//     }
//     return true;
// }

// const deleteCargoType = async (datas) => {
//     try {
//         await req.gtos('BS_CARGOTYPE').whereIn('CargoTypeID', datas).del();
//         return true;
//     } catch (error) {
//         return false;
//     }
// }

// module.exports = {...module.exports,
//     tracking,
//     getTariff,
//     getOprs,
//     getPayers,
//     getSizeType,
//     getPayers_Inv,
//     getPayers_InvDFT,
//     searchShip,
//     loadVesselSchedule,
//     loadCustomers,
//     loadSizeTypeMapping,
//     loadLaneDetailByID,
//     loadExistPortListByLaneID,
//     loadLaneByID,
//     loadCargoType,
//     loadUnitCodes,
//     loadDamagedTypeList,
//     loadDamagedList,
//     loadCusType,
//     loadCus,
//     loadPaymentTypeList,
//     loadBittList,
//     loadBerthList,
//     loadBerthID,
//     loadWorkerGroupTypeList,
//     loadWorkerGroupList,
//     loadNationList,
//     loadPortListForPortScreen,
//     loadPortList,
//     loadLaneList,
//     loadAllColCustomer,
//     loadAllColJobModes,
//     loadJobModesList,
//     loadOprList,
//     loadTransitList,
//     loadAllColGateList,
//     loadAllColServices,
//     loadAllColJobTypes,
//     loadAllColMethodList,
//     loadAllColShiftList,
//     loadAllColCarBrand,
//     loadAllColCarType,
//     loadAllColPaymentType,
//     loadAllColPaymentForm,
//     loadAllColRateList,
//     loadAllColTransit,
//     loadAllColArea,
//     getCusList,
//     loadPaymentMethod,
//     loadDeliveryMode,
//     loadExchangeRate,
//     loadMethodMode,
//     loadCntrClass,
//     loadDMethodInServices,
//     loadServiceMore,
//     loadServiceList,
//     loadPayFormByPaymentTypeID,
//     loadServiceTemplate,
//     loadEir,
//     loadInvDraff,
//     loadInv,
//     saveCustomers,
//     updateCustomers,
//     savePorts,
//     saveJobModes,
//     saveJobTypes,
//     saveServices,
//     saveMethod,
//     saveShifts,
//     savePaymentType,
//     savePayForm,
//     saveRate,
//     saveTransit,
//     saveArea,
//     updateArea,
//     deleteCustomers,
//     deletePort,
//     deleteJobModes,
//     deleteServices,
//     deleteJobTypes,
//     deleteMethod,
//     deleteShifts,
//     deleteTransit,
//     deleteArea,
//     savePaymentMethod,
//     saveNation,
//     deleteNation,
//     saveOpr,
//     deleteOpr,
//     saveGate,
//     updateGate,
//     deleteGate,
//     saveLane,
//     saveLaneDetail,
//     deleteLaneDetails,
//     deleteLaneDetailsByOpr,
//     deletePaymentMethod,
//     deletePaymentType,
//     deletePayForm,
//     deleteRate,
//     saveCustomerType,
//     deleteCustomerType,
//     saveDamagedType,
//     updateDamagedType,
//     deleteDamagedType,
//     saveDamaged,
//     updateDamaged,
//     deleteDamaged,
//     saveBerth,
//     updateBerth,
//     deleteBerth,
//     saveBitt,
//     updateBitt,
//     deleteBitt,
//     saveColor,
//     deleteColor,
//     saveWorkerGroupType,
//     deleteWorkerGroupType,
//     saveWorkerGroup,
//     deleteWorkerGroup,
//     saveUnitCode,
//     deleteUnitCode,
//     saveClass,
//     updateClass,
//     deleteClass,
//     saveYard,
//     deleteYard,
//     saveBlock,
//     deleteBlock,
//     saveExchangeRate,
//     deleteExchangeRate,
//     saveServiceAddon,
//     saveTRFTempConfig,
//     LoadVesselListFromManifestForColorScreen,
//     loadAllColColor,
//     loadAllColClass,
//     loadAllColYard,
//     loadAllColPrefix,
//     loadBlockByYardID,
//     loadVMStatusList,
//     saveVMStatus,
//     updateVMStatus,
//     deleteVMStatus,
//     loadGateList,
//     insertScalesDataForIn,
//     insertScalesDataWithBLForIn,
//     updateScalesDataWithBLForIn,
//     saveScalesDataForOut,
//     loadTruckWeightList,
//     loadTruckWeightDataByTruckNo,
//     loadCargoTypeList,
//     saveCargoType,
//     updateCargoType,
//     deleteCargoType,
//     loadCustomerType
// }