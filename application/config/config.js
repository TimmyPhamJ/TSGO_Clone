const { config_site, redis_config } = require('./config_site');
const TESTMODE = 1;
const config = {
    encrypt_key: "CEH_hZWEzNzc45622NjdiOA==",
    app_id: 'CAS_SERVER',
    users: {
        mobile: {
            name: 'server',
            pwd: '12345876'
        }
    },
    MSG_32: ['212', '213', '566', '253', '363', '367', '364', '223', '243', '252', '219', '3665'], //cho phep 3665 goi lai khi da thanh cong
    MSG_INOUT_WITH_SEQ: ['2668', '4668', '1668', '321', '341', '421', '441', '121', '141'],
    MSG_THUPHI: ["901.100", "901.101#1", "901.101#2", "214[CSHT]", "215[CSHT]", "216[CSHT]", "365[CSHT]", "321[CSHT]", "421[CSHT]"], //[MSG_THUPHI]
    MSG_WITHOUT_REMARK: ["211", "243", "901.100", "901.101#1", "901.101#2"], //[MSG_THUPHI]
    MSG_EXCHANGE_LOOP_TIME: 4, //second
    WAITING_INTERVAL: 5,
    TRANSMIT_RETRY_LIMIT: 5,
    ASKING_LIMIT: 15,
    SIGNATURE: `<Signature>
                    <data>SIGNATURE_DATA</data>
                    <fileCert>SIGNATURE_FILECERT</fileCert>
                </Signature>`,
    REQUEST_CONTENT: `<Declaration>
                        <issuer>MESSAGE_ID</issuer>
                        <reference>MESSAGE_REFERENCE</reference>
                        <issue>MESSAGE_TIME</issue>
                        <function>REQUEST_FUNCTION</function>
                        <status>1</status>
                        ACCEPTANCE
                        <declarationOffice>${config_site.CUSTOMS_ID}</declarationOffice>
                        <Agent>
                            <name>${config_site.PORT_NAME}</name>
                            <identity>${config_site.PORT_TAX_CODE}</identity>
                            <status>3</status>
                        </Agent>
                        <Importer>
                            <name>${config_site.PORT_NAME}</name>
                            <identity>${config_site.PORT_TAX_CODE}</identity>
                        </Importer>
                        <PortDocument>
                            <identity>${config_site.PORT_ID}</identity>
                            <name>${config_site.PORT_NAME}</name>
                        </PortDocument>
                        XML_DECLARATION
                    </Declaration>`,
    REQUEST_ENVELOP: `<Envelope>
                        <Header>
                            <procedureType>2</procedureType>
                            <Reference>
                                <version>3.00</version>
                                <messageId>MESSAGE_GUID_ID</messageId>
                            </Reference>
                            <SendApplication>
                                <name>CAS</name>
                                <version>1.0</version>
                                <companyName>CEH</companyName>
                                <companyIdentity>0313206513</companyIdentity>
                                <createMessageIssue>MESSAGE_CREATE_TIME</createMessageIssue>
                            </SendApplication>
                            <From>
                                <name>${config_site.PORT_NAME}</name>
                                <identity>${config_site.PORT_TAX_CODE}</identity>
                            </From>
                            <To>
                                <name>${config_site.CUSTOMS_NAME}</name>
                                <identity>${config_site.CUSTOMS_ID}</identity>
                            </To>
                            <Subject>
                                <type>MESSAGE_ID</type>
                                <function>REQUEST_FUNCTION</function>
                                <reference>MESSAGE_REFERENCE</reference>
                                <sendApplication>CAS</sendApplication>
                                <receiveApplication>VNACCS/VCIS</receiveApplication>
                            </Subject>
                        </Header>
                        <Body>
                            <Content>REQUEST_CONTENT</Content>SIGNATURE_CONTENT
                        </Body>
                    </Envelope>`,

    ID_TEST: '0100101308',
    PASS_TEST: '0100101308',
    SERVER_HQ: {
        xml: config_site.TEST_MODE
            ? `<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><Send xmlns="http://cis.customs.gov.vn/"><MessageXML>XML_REQUEST</MessageXML><UserId>0100101308</UserId><Password>0100101308</Password></Send></soap:Body></soap:Envelope>`
            : `<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><Process xmlns="http://ecustoms.customs.gov.vn/"><MessageXML>XML_REQUEST</MessageXML></Process></soap:Body></soap:Envelope>`,
        isHttps: false,
        host: config_site.TEST_MODE ? '103.248.160.15' : '103.248.160.22',
        port: config_site.TEST_MODE ? '8088' : '80',
        path: config_site.TEST_MODE ? '/KDTServiceAcc/CISService.asmx' : '/',
        soapaction: config_site.TEST_MODE ? 'http://cis.customs.gov.vn/Send' : 'http://ecustoms.customs.gov.vn/Process',
        contentType: config_site.TEST_MODE ? 'text/xml; charset=utf-8' : 'application/soap+xml;charset=UTF-8',
    },
    SERVER_TP: {
        xml: config_site.TEST_MODE_TP ? `<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><Send xmlns="http://tempuri.org/"><MsgXML>XML_REQUEST</MsgXML></Send></soap:Body></soap:Envelope>`
            : `<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><Send xmlns="http://tempuri.org/"><MsgXML>XML_REQUEST</MsgXML></Send></soap:Body></soap:Envelope>`,
        isHttps: true,
        hostName: config_site.TEST_MODE_TP ? "thuphihatang.tphcm.gov.vn" : "thuphihatang.tphcm.gov.vn",
        host: config_site.TEST_MODE_TP ? "210.2.120.230" : "210.2.120.230",
        port: config_site.TEST_MODE_TP ? "8082" : "8091",
        path: config_site.TEST_MODE_TP ? "/KDTService.asmx" : "/KDTService.asmx",
        soapaction: config_site.TEST_MODE_TP ? "http://tempuri.org/Send" : "http://tempuri.org/Send",
        contentType: config_site.TEST_MODE_TP ? 'text/xml; charset=utf-8' : 'text/xml; charset=utf-8'
    },
    //[MSG_THUPHI]
    REQUEST_CONTENT_TP: `<Declaration>
                            <issuer>MESSAGE_ID</issuer>
                            <reference>MESSAGE_REFERENCE</reference>
                            <issue>MESSAGE_TIME</issue>
                            <function>REQUEST_FUNCTION</function>
                            <status>1</status>
                            ACCEPTANCE
                            <declarationOffice>${config_site.CUSTOMS_ID}</declarationOffice>
                            <Agent>
                                <name>${config_site.PORT_NAME}</name>
                                <identity>${config_site.PORT_ID_TP}</identity>
                                <status>3</status>
                            </Agent>
                            <Importer>
                                <name>${config_site.PORT_NAME}</name>
                                <identity>${config_site.PORT_ID_TP}</identity>
                            </Importer>
                            <PortDocument>
                                <identity>${config_site.PORT_ID_TP}</identity>
                                <name>${config_site.PORT_NAME}</name>
                            </PortDocument>
                            XML_DECLARATION
                        </Declaration>`,
    REQUEST_ENVELOP_TP: `<Envelope>
                            <Header>
                                <procedureType>2</procedureType>
                                <Reference>
                                    <version>3.00</version>
                                    <messageId>MESSAGE_GUID_ID</messageId>
                                </Reference>
                                <SendApplication>
                                    <name>CAS</name>
                                    <version>1.0</version>
                                    <companyName>CEH</companyName>
                                    <companyIdentity>0313206513</companyIdentity>
                                    <createMessageIssue>MESSAGE_CREATE_TIME</createMessageIssue>
                                </SendApplication>
                                <From>
                                    <name>${config_site.PORT_NAME}</name>
                                    <identity>${config_site.PORT_ID_TP}</identity>
                                </From>
                                <To>
                                    <name>${config_site.CUSTOMS_NAME}</name>
                                    <identity>${config_site.CUSTOMS_ID}</identity>
                                </To>
                                <Subject>
                                    <type>MESSAGE_ID</type>
                                    <function>REQUEST_FUNCTION</function>
                                    <reference>MESSAGE_REFERENCE</reference>
                                </Subject>
                            </Header>
                            <Body>
                                <Content>REQUEST_CONTENT</Content>SIGNATURE_CONTENT
                            </Body>
                        </Envelope>`
};

Object.assign(config, config_site);

var error_messages = {
    FAILED_CONNECT_DATABASE: "Have trouble when connecting to server"
}

module.exports = {
    TESTMODE,
    config,
    redis_config,
    error_messages
}