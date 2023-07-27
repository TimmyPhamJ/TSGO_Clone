const http = require("http");
const https = require("https");
const { v4: uuidv4 } = require('uuid');

const ccurl = (data, options) => {
    return new Promise(async (resolve, reject) => {
        options['timeout'] = options['timeout'] || 10000;
        options['method'] = options['method'] || 'POST';
        const request = options['isHttps'] ? https : http;
        delete options['isHttps'];

        const req = request.request(options, (res) => {
            res.setEncoding('utf8');
            var endWithoutData = true;
            var response = "";
            res.on('data', (chunk) => {
                endWithoutData = false;
                if (!chunk) {
                    reject("Failed to get response data");
                }
                else {
                    response += chunk;
                }
            });
            res.on('timeout', () => {
                reject("timeout response data");
                res.end();
            });
            res.on('end', () => {
                if (endWithoutData) {
                    reject('No more data in response.');
                    return;
                }
                resolve(response);
            });
        });

        req.on('error', (e) => {
            reject(`problem with request: ${e.message}`);
        });

        if (data) {
            req.write(data);
        }

        req.end();
    });
}

const newGuid = async () => {
    return String(uuidv4()).toUpperCase();
}

const is_valid_xml = (xmlstr) => {
    return String(xmlstr).match(/\<(\w)+\>/g) && xmlstr.match(/\<\/(\w)+\>/g);
}

const strReplaceAssoc = (replace, subject) => {
    Object.keys(replace).forEach((k) => {
        var v = replace[k];
        subject = subject.replaceAll(k, v);
    });
    return subject;
}

const arrayChunk = function (arr, size = 2000) {
    arr = arr ? (Array.isArray(arr) ? arr : ['']) : [''];
    return Math.ceil(size / (Object.keys(arr[0]).length || 1));
}

const htmlspecialchars = (string) => {
    return string.toString()
        .trim()
        .replace(/\r/g, "")
        .replace(/\n/g, "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
};

var DOCSO = function () {
    var t = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"],
        r = function (r, n) {
            var o = "", a = Math.floor(r / 10), e = r % 10;
            return a > 1 ? (o = " " + t[a] + " mươi", 1 == e && (o += " mốt")) : 1 == a ? (o = " mười", 1 == e && (o += " một")) : n && e > 0 && (o = " lẻ"), 5 == e && a >= 1 ? o += " lăm" : 4 == e && a >= 1 ? o += " tư" : (e > 1 || 1 == e && 0 == a) && (o += " " + t[e]), o
        },
        n = function (n, o) {
            var a = "", e = Math.floor(n / 100), n = n % 100;
            return o || e > 0 ? (a = " " + t[e] + " trăm", a += r(n, !0)) : a = r(n, !1), a
        }, o = function (t, r) {
            var o = "", a = Math.floor(t / 1e6), t = t % 1e6; a > 0 && (o = n(a, r) + " triệu", r = !0); var e = Math.floor(t / 1e3), t = t % 1e3;
            return e > 0 && (o += n(e, r) + " ngàn", r = !0), t > 0 && (o += n(t, r)), o
        }; return {
            doc: function (r) {
                if (0 == r)
                    return t[0]; var n = "", a = ""; do ty = r % 1e9, r = Math.floor(r / 1e9), n = r > 0 ? o(ty, !0) + a + n : o(ty, !1) + a + n, a = " tỷ"; while (r > 0); return n.trim()
            }
        }
}();

const convert_number_to_words_old = (so) => {
    return DOCSO.doc(so);
}

const convert_number_to_words = (sotien = 0, currency = '') => {
    let newSoTien = sotien;
    let prefixReduce_vn = "";
    let prefixReduce_en = "";
    if (sotien < 0) {
        newSoTien = Math.abs(sotien);
        prefixReduce_vn = "giảm ";
        prefixReduce_en = " off";
    }
    let textnumber = prefixReduce_vn + convert_number_to_words_vi(newSoTien, currency);
    if (currency == 'USD') {
        textnumber += " (" + convert_number_to_words_en(newSoTien, currency) + prefixReduce_en + ")";
    }
    return textnumber;
}

function convert_number_to_words_vi(sotien = 0, currency = '') {
    const decimal = " phẩy ";
    const Text = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];
    const TextLuythua = ["", "nghìn", "triệu", "tỷ", "ngàn tỷ", "triệu tỷ", "tỷ tỷ"];
    if (sotien < 0) {
        return "Tiền phải là số nguyên dương lớn hơn số 0";
    }
    let textnumber = "";
    let fraction = null;
    if (sotien.toString().includes('.')) {
        [sotien, fraction] = sotien.toString().split('.');
    }
    const length = sotien.toString().length;
    const unread = Array(length).fill(0);
    for (let i = 0; i < length; i++) {
        const so = sotien.toString().charAt(length - i - 1);
        if (so == 0 && i % 3 == 0 && unread[i] == 0) {
            let j = 0;
            for (j = i + 1; j < length; j++) {
                const so1 = sotien.toString().charAt(length - j - 1);
                if (so1 != 0) {
                    break;
                }
            }
            if (parseInt((j - i) / 3) > 0) {
                for (let k = i; k < parseInt((j - i) / 3) * 3 + i; k++) {
                    unread[k] = 1;
                }
            }
        }
    }
    for (let i = 0; i < length; i++) {
        const so = sotien.toString().charAt(length - i - 1);
        if (unread[i] == 1) {
            continue;
        }
        if (i % 3 == 0 && i > 0) {
            textnumber = TextLuythua[i / 3] + " " + textnumber;
        }
        if (i % 3 == 2) {
            textnumber = 'trăm ' + textnumber;
        }
        if (i % 3 == 1) {
            textnumber = 'mươi ' + textnumber;
        }
        textnumber = Text[so] + " " + textnumber;
    }
    textnumber = textnumber.replace("không mươi", "lẻ");
    textnumber = textnumber.replace("lẻ không", "");
    textnumber = textnumber.replace("mươi không", "mươi");
    textnumber = textnumber.replace("một mươi", "mười");
    textnumber = textnumber.replace("mươi năm", "mươi lăm");
    textnumber = textnumber.replace("mươi một", "mươi mốt");
    textnumber = textnumber.replace("mười năm", "mười lăm");
    if (fraction !== null && !isNaN(fraction) && parseFloat(fraction) > 0) {
        switch (currency) {
            case "USD":
                fraction = (fraction + "000000").substring(0, 2);
                textnumber += ' Đô-La Mỹ và ' + convert_number_to_words_vi(fraction) + ' cent.';
                break;
            case "VND":
                textnumber += ' đồng và ' + convert_number_to_words_vi(fraction) + ' hào.';
                break;
            default:
                textnumber += decimal;
                const words = Array.from(fraction.toString()).map(number => Text[number]);
                textnumber += words.join(' ');
                break;
        }
    } else {
        switch (currency) {
            case "USD":
                textnumber += ' Đô-La Mỹ';
                break;
            case "VND":
                textnumber += ' đồng';
                break;
        }
    }
    return textnumber;
}

function convert_number_to_words_en(sotien = 0, currency = '') {
    const decimal = " point ";
    const Text = {
        0: "zero",
        1: "one",
        2: "two",
        3: "three",
        4: "four",
        5: "five",
        6: "six",
        7: "seven",
        8: "eight",
        9: "nine",
        10: 'ten',
        11: 'eleven',
        12: 'twelve',
        13: 'thirteen',
        14: 'fourteen',
        15: 'fifteen',
        16: 'sixteen',
        17: 'seventeen',
        18: 'eighteen',
        19: 'nineteen',
        20: 'twenty',
        30: 'thirty',
        40: 'forty',
        50: 'fifty',
        60: 'sixty',
        70: 'seventy',
        80: 'eighty',
        90: 'ninety'
    };
    const TextLuythua = ["", "thousand", "million", "billion", "trillion", "quadrillion", "quintillion"];
    if (sotien < 0) {
        return "Money must be greater than 0";
    }
    let textnumber = "";
    let fraction = null;
    if (sotien.toString().includes('.')) {
        [sotien, fraction] = sotien.toString().split('.');
    }
    const length = sotien.toString().length;
    const unread = Array(length).fill(0);
    for (let i = 0; i < length; i++) {
        const so = sotien.toString().charAt(length - i - 1);
        if (so == 0 && i % 3 == 0 && unread[i] == 0) {
            let j = 0;
            for (j = i + 1; j < length; j++) {
                const so1 = sotien.toString().charAt(length - j - 1);
                if (so1 != 0) {
                    break;
                }
            }
            if (parseInt((j - i) / 3) > 0) {
                for (let k = i; k < parseInt((j - i) / 3) * 3 + i; k++) {
                    unread[k] = 1;
                }
            }
        }
    }
    for (let i = 0; i < length; i++) {
        const so = sotien.toString().charAt(length - i - 1);
        if (unread[i] == 1) {
            continue;
        }
        if (i % 3 == 0 && i > 0) {
            textnumber = TextLuythua[i / 3] + " " + textnumber;
        }
        if (i % 3 == 2) {
            textnumber = 'hundred ' + textnumber;
        }
        if (i == 1 && so == 1) {
            const sox = sotien.toString().slice(-2);
            textnumber = Text[sox];
            continue;
        }
        if (i % 3 == 1) {
            textnumber = (so > 0 ? Text[so * 10] : "") + "-" + textnumber;
            continue;
        }
        textnumber = Text[so] + " " + textnumber;
    }
    textnumber = textnumber.replace("zero-", "");
    textnumber = textnumber.replace("and zero", "");
    textnumber = textnumber.replace("-zero", "");
    if (fraction !== null && !isNaN(fraction) && parseFloat(fraction) > 0) {
        switch (currency) {
            case "USD":
                fraction = (fraction + "000000").substring(0, 2);
                textnumber += ' U.S. Dollars and ' + convert_number_to_words_en(fraction) + ' Cents.';
                break;
            case "VND":
                textnumber += ' dong and ' + convert_number_to_words_en(fraction) + ' hao.';
                break;
            default:
                textnumber += decimal;
                const words = Array.from(fraction.toString()).map(number => Text[number]);
                textnumber += words.join(' ');
                break;
        }
    } else {
        switch (currency) {
            case "USD":
                textnumber += ' U.S. Dollars.';
                break;
            case "VND":
                textnumber += ' dong.';
                break;
        }
    }
    return textnumber;
}

module.exports = {
    ccurl,
    newGuid,
    is_valid_xml,
    strReplaceAssoc,
    arrayChunk,
    htmlspecialchars,
    convert_number_to_words
}