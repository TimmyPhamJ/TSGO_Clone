const { gtos, gtosglobal } = require('../config/database');
const moment = require('moment-timezone');

const contractTemplate = async () => {
    var tplt = await gtos('TRF_DIS')
        .select('NICK_NAME', 'OPR', 'LANE', 'PAYER_TYPE', 'PAYER', 'APPLY_DATE', 'PAYMENT_TYPE', 'REF_RMK')
        .orderBy('NICK_NAME')
    var result = [];

    for await (let item of tplt) {
        var ptemp = '';
        if (Array.isArray(item)) {
            for await (let n of item) {
                ptemp += n ? ":" : `${n}:`;
            }
        }

        result.push(ptemp.slice(0, -1));
    }

    result = result.filter((v, i, s) => s.indexOf(v) === i);
    return result;
}

const loadTRFSource = async () => {
    return await gtos('TRF_CODES').select("TRF_CODE", "TRF_DESC");
}

const loadTariffCodes = async () => {
    return await gtos('TRF_CODES').select('*');
}

const tarrifTemplate = async () => {
    var tariff = await gtos('TRF_STD').select('FROM_DATE', 'TO_DATE', 'NOTE').orderBy('FROM_DATE', 'desc');
    var result = [];
    for await (let item of tariff) {
        var ptemp = '';
        if (Array.isArray(item)) {
            for await (let n of item) {
                ptemp += n ? "-" : `${n}-`;
            }
        }
        result.push(ptemp.slice(0, -1));
    }
    result = result.filter((v, i, s) => s.indexOf(v) === i);
    return result;
}

const loadTariffStandard = async (tariffTemp) => {
    var tariff = gtos('TRF_STD')
        .select('rowguid', 'TRANSIT_CD,DMETHOD_CD', 'TRF_CODE', 'IX_CD', 'CARGO_TYPE', 'JOB_KIND', 'CNTR_JOB_TYPE', 'CURRENCYID', 'IsLocal', 'AMT_F20', 'AMT_E20'
            , 'AMT_F40', 'AMT_E40', 'AMT_F45', 'AMT_E45', 'AMT_NCNTR', 'VAT', 'TRF_STD_DESC', 'FROM_DATE', 'TO_DATE', 'NOTE', 'INCLUDE_VAT', 'FROM_DATE', 'TO_DATE');

    var temp = tariffTemp.split("-");
    var fwhere = {
        "FROM_DATE": temp[0] || null,
        "TO_DATE": temp[1] || null
    };

    return await tariff.where(fwhere);
}

const loadContract = async (contractTemp) => {
    var temp = contractTemp.split(':');
    var fwhere = {
        "NICK_NAME": temp[0] || null,
        "OPR": temp[1],
        "LANE": temp[2],
        "PAYER_TYPE": temp[3],
        "PAYER": temp[4],
        "APPLY_DATE": temp[5],
        "PAYMENT_TYPE": temp[6],
    };

    return await gtos('TRF_DIS').select('*').where(fwhere);
}


//SAVE TRF_CODE
const saveTRFCode = async (req, datas) => {
    for await (let item of datas) {
        var rguid = item['rowguid'];
        delete item['rowguid'];
        var existItem = [];

        if (rguid) {
            existItem = await gtos('TRF_CODES').select('rowguid').where('rowguid', rguid);
        }

        item['ModifiedBy'] = req.session.userdata["UserID"];
        item['update_time'] = moment().format('YYYY-MM-DD HH:mm:ss');

        if (existItem && existItem.length > 0) {
            //update database
            await gtos('TRF_CODES').where('rowguid', rguid).update(item);
        } else {
            var checkitem = await gtos('TRF_CODES').select("rowguid")
                .where('TRF_CODE', item['TRF_CODE'])
                .limit(1).catch(err => console.log(err));

            if (checkitem && checkitem.length > 0) {
                await gtos('TRF_CODES').where('rowguid', checkitem[0]["rowguid"]).update(item);
            } else {
                //insert database
                item['CreatedBy'] = req.session.userdata["UserID"];
                await gtos('TRF_CODES').insert(item);
            }
        }
    }
    return true;
}

//SAVE TRF_STD
const saveTariffSTD = async (req, datas, applyDate, expireDate, ref_mark) => {
    for await (let item of datas) {
        var rguid = item['rowguid'];
        delete item['rowguid'];
        var where = {
            "TRF_CODE": item["TRF_CODE"],
            "DMETHOD_CD": item["DMETHOD_CD"],
            "IX_CD": item["IX_CD"],
            "CARGO_TYPE": item["CARGO_TYPE"],
            "JOB_KIND": item["JOB_KIND"],
            "CNTR_JOB_TYPE": item["CNTR_JOB_TYPE"],
            "TRANSIT_CD": item["TRANSIT_CD"],
            "IsLocal": item["IsLocal"],
            "CURRENCYID": item["CURRENCYID"],
            "FROM_DATE": applyDate,
            "TO_DATE": expireDate,
        };

        var existsTRF = await gtos('TRF_STD').select("rowguid").where(where).limit(1);

        item["FROM_DATE"] = applyDate;
        item["TO_DATE"] = expireDate;
        item['NOTE'] = ref_mark;

        if (existsTRF["COUNT_TRF"] > 0) {
            //update database
            item['ModifiedBy'] = req.session.userdata["UserID"];
            item['update_time'] = moment().format('YYYY-MM-DD HH:mm:ss');
            await gtos('TRF_STD').where(where).update(item);
        } else {
            //insert database
            item['CreatedBy'] = req.session.userdata["UserID"];
            await gtos('TRF_STD').insert(item);
        }
    }
    return true;
}

module.exports = {
    contractTemplate,
    loadTRFSource,
    loadTariffCodes,
    tarrifTemplate,
    loadTariffStandard,
    loadContract,
    saveTRFCode,
    saveTariffSTD
}