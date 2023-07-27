
const moment = require('moment-timezone');
const { gtos, gtosglobal } = require('../config/database');
var QRCode = require('qrcode');
module.exports.moment = moment;
module.exports.KnexWhere = (knex, filterObj, ext) => {
    let filters = Object.keys(filterObj || {});

    for (let ii = 0; ii < filters.length; ii++) {
        let key = filters[ii];
        let field = filters[ii];
        if (ext) field = ext + '.' + key;
        let item = filterObj[key];
        //console.log('filters::',item);
        if (item) {
            let opr = item['operation'] || "=";
            if (opr == 'is')
                knex.whereNull(field, (item.value != undefined ? item.value : item));
            else
                if (opr == 'is not')
                    knex.whereNotNull(field, (item.value != undefined ? item.value : item));
                else
                    if (opr == 'in')
                        knex.whereIn(field, (item.value != undefined ? item.value : item));
                    else
                        if (opr == 'not in')
                            knex.whereNotIn(field, (item.value != undefined ? item.value : item));
                        else
                            if (opr == 'like')
                                knex.where(field, opr, '%' + (item.value != undefined ? item.value : item) + '%');
                            else
                                if (opr == 'left like')
                                    knex.where(field, opr, '%' + (item.value != undefined ? item.value : item));
                                else
                                    if (opr == 'right like')
                                        knex.where(field, opr, (item.value != undefined ? item.value : item) + '%');
                                    else
                                        knex.where(field, opr, (item.value != undefined ? item.value : item));

        }
    }
    //console.log('knex:::',knex.toString());
    return knex;
}

module.exports.generateQRCode = (code, filename) => {
    return new Promise(async (resolve, reject) => {
        filename = (filename || code);
        var maked = makeDir('qrcode');
        QRCode.toFile(
            filedir + filename + '.png',
            [{ data: code, mode: 'byte' }],
            {},
            function (data) {
                resolve({ filepatch: filedir + filename + '.png', fileurl: global.app_url + '/assets/uploads/qrcode/' + filename + '.png', data: data });
            }
        )
    });
}

module.exports.generateQRCodeToSting = (code) => {
    return new Promise(async (resolve, reject) => {
        QRCode.toDataURL(
            code,
            function (err, string) {
                if (err) throw err
                resolve(string);
            }
        );
    });
}
module.exports.getUserTerminalList = async (req) => {
    return ((req.session || {})['userdata'] || {}).Terminals || [].map(itm => { return { TerminalCode: itm.Code, TerminalName: itm.Name } });
}
module.exports.getTerminalList = async () => {
    return await gtosglobal('BS_TERMINAL').select('*');
}
module.exports.getTerminalInfo = async (req) => {
    return await gtosglobal('BS_TERMINAL').select('*').where('TerminalCode', req.body.TerminalCode || '');
}

module.exports.dbDateTime = (strDateTime, format= 'YYYY-MM-DD HH:mm:ss') => {
    if (!strDateTime || !strDateTime.includes("/") && !strDateTime.includes("-")) {
        return '';
    }

    if (strDateTime.includes("-") && moment(strDateTime).isValid()) {
        return moment(strDateTime).format(format);
    }

    var dts = strDateTime.split(' ');
    var date = dts[0].split('/').reverse().join('-');  //date('Y-m-d', strtotime(implode('-', array_reverse(explode('/', $dts[0])))));
    var datetime = date + ' ' + (dts[1] || '00:00:00');
    return moment(datetime).format(format);
}

module.exports.getConfig = async (partnerCode, terminalCode, TESTMODE = 1) => {
    return new Promise(async (resolve, reject) => {
        gtosglobal('SYS_CONFIG')
            .select('ConfigJSON')
            .where({
                'PartnerCode': partnerCode,
                'TestMode': TESTMODE
            })
            .where(p => {
                if (terminalCode) {
                    p.where('TerminalCode', terminalCode)
                        .orWhereNull('TerminalCode')
                }
                else {
                    p.whereNull('TerminalCode')
                }
            })
            .limit(1)
            .then(result => {

                let jsonResult = result[0]['ConfigJSON'] ? JSON.parse(result[0]['ConfigJSON']) : [];
                resolve(jsonResult);
            })
            .catch(err => {
                resolve([]);
            })
    })

}