const config_site = {
    PORT_NAME: 'CANG CONT SPITC',
    PORT_TAX_CODE: '0302345459',
    PORT_ID: 'VNITC',
    PORT_ID_TP: '02CIS02',
    CUSTOMS_ID: '02CI',
    CUSTOMS_NAME: 'CANG SAI GON KV1',
    AUTO_MESSAGE: 0,
    CURL_SYNC_TLHQ: 1,
    SERVICE_SIGN: 1,
    SERVER_SIGN: {
        isHttps: false,
        host: '10.10.8.41',
        port: '8080',
        path: '/signData'
    },
    SERVER_API: {
        isHttps: false,
        host: 'hqtd.sp-itc.com.vn',
        port: 80,
        path_inout: '/index.php/8a5da52ed126447d359e70c05721a8aa/a496b16cff17a450b9d7dc5bf92ae447', //api/cas_tos_inout
        path_tlhq: '/index.php/8a5da52ed126447d359e70c05721a8aa/1c5a01ac3a7ff3e950db9c46e02837b5' //api/cas_tos
    },
    SOCKET_URL: "http://10.10.14.183:8083",
    SYS_MAIL_ADDR: 'levuhaomisgmailcom',
    SYS_MAIL_PASS: '1',
    SYS_MAIL_HOST: 'smtpgmailcom',
    SYS_MAIL_PORT: '587',
    MAIL_TO: 'nva,nvb,nvc,nvd',
    TOKEN_PROVIDER_NAME: 'VNPT-CA',
    TOKEN_PIN_CODE: '12345678',
    TOKEN_SERIAL: '540101014e8242b73a42da49d4afe047',
    TOKEN_EXPIRE_DATE: '2024-06-26',
    CERTNAME: 'SPITC.cer',
    MAIL_TO: 'nva,nvb,nvc,nvd',
    TEST_MODE: false,
    TEST_MODE_TP: false
}

const redis_config = {
    "host": "10.10.14.140",
    "port": 6379,
    "db": 0,
    "prefix": 'CAS_SPITC:',
    "pubSubDb": 11,
    "session_db": 12,
    "pubSubChan": 'transfer-tos-cas',
};

module.exports = {
    config_site, redis_config
}