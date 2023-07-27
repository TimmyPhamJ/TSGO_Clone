const Common = require("../utils/common");
const FunctionModel = require("../models/FunctionModel");
const OrderModel = require("../models/ordeirbulk_model");
const Utils = require("../models/utils_model");

exports.InvoiceManagementMS = class {
    //Thoilc(*Note)-Khai báo constructor
    constructor() {
        this._access_token = null;
        this._responseData = null;
        this._data = {
            success: true,
        };
        this._responseContent = "";
    }

    //properties
    get config_site() {
        return {
            ROUND_NUM: {
                VND: 0,
                USD: 2,
            },
            ROUND_NUM_Quantity_UNIT: 2,
        };
    }

    //Thoilc(*Note)-Thông tin cấu hình Misa
    get config() {
        return {
            SUPPLIER_TAX_CODE: "2222222222-433",
            HOST: "api.meinvoice.vn",
            IS_HTTPS: true,
            //Thoilc(*Note)-Môi trường test::https://testapi.meinvoice.vn/api/v3
            //Thoilc(*Note)-Môi trường chính thức::https://api.meinvoice.vn/api/v3
            URL: "https://api.meinvoice.vn",
            AUTH_PATH: "/auth/login",
            API_PATH: "/api/v3",
            MS_TEST_MODE: "",
            SRV_ID: "",
            SRV_PWD: "",
            //Thoilc(*Note)-Thông tư hoá đơn 1/073 || 1/074 || ... || 1/078
            INV_PATTERN: "1/078",
            INV_SERIAL: "1K21TND",
            PORTAL_URL: "https://www.meinvoice.vn/tra-cuu",
            INV_CRE: {
                INV_PATTERN: "1/073",
                INV_SERIAL: "1K21TND",
            },
        };
    }

    //Thoilc(*Note)-Tạo phương thức get & set để kiểm tra người dùng thông qua token
    get access_token() {
        return this._access_token;
    }
    set access_token(usid) {
        this._access_token = usid;
    }

    //Thoilc(*Note)-Tạo phương thức get & set kiểm tra dữ liệu trả về
    get responseData() {
        return this._responseData;
    }
    set responseData(data) {
        this._responseData = data;
    }

    //Thoilc(*Note)-Tạo phương thức get & set kiểm tra content trả về
    get responseContent() {
        return this._responseContent;
    }
    set responseContent(content) {
        this._responseContent = content;
    }

    //Thoilc(*Note)-Tạo phương thức get & set kiểm tra dữ liệu
    get data() {
        return this._data;
    }
    set data(dt) {
        this._data = dt;
    }

    //Thoilc(*Note)-Post dữ liệu đến misa, bao gồm path, data gửi, và thông tin cấu hình
    async postToMS(path, data, moreConfig = {}) {
        var contentType = moreConfig["contentType"] || "application/json";
        var options = {
            isHttps: true,
            hostname: this.config.HOST,
            path: path,
            headers: {
                "Content-Type": contentType,
                "Content-Length": Buffer.byteLength(data),
            },
            maxRedirects: 20,
        };

        //Thoilc(*Note)-Kiểm tra token trước khi gửi request cho misa
        if (this.access_token !== null) {
            options.headers["Cookie"] = `access_token=${this.access_token}`;
        }

        //Thoilc(*Note)-ccurl gửi request data misa
        try {
            this.responseContent = await Common.ccurl(data, options);
            if (!this.responseContent) {
                this.data["error"] =
                    "[MSA] Thất bại: Giao dịch với Hệ Thống Hóa Đơn Điện Tử!";
                return false;
            }

            this.responseData = JSON.parse(this.responseContent) || {};
            if (
                this.responseData["errorCode"] &&
                this.responseData["errorCode"] != 200
            ) {
                this.data["error"] =
                    "[MSA] " +
                    this.responseData["errorCode"] +
                    " : " +
                    this.responseData["description"];
                return false;
            } else if (
                this.responseData["code"] &&
                this.responseData["code"] != 200
            ) {
                this.data["error"] =
                    "[MSA] " +
                    this.responseData["code"] +
                    " : " +
                    (this.responseData["data"] || this.responseData["message"]);
                return false;
            }

            return true;
        } catch (error) {
            console.log(error);
            this.data["error"] = `[MSA] ${error.message}`;

            if (this.responseContent) {
                let response = JSON.parse(this.responseContent) || {};
                let errorMsg =
                    "[MSA] " +
                    (response["code"] || response["status"] || 200) +
                    " - " +
                    (response["data"] ||
                        response["error"] ||
                        response["message"] ||
                        "Thất bại: Giao dịch với Hệ Thống Hóa Đơn Điện Tử!");
                this.data["error"] = `[MSA] ${errorMsg.trim()}`;
            }
            return false;
        }
    }

    //Thoilc(*Note)-Lấy dữ liệu token
    async getToken() {
        var reqData = JSON.stringify({
            username: this.config["SRV_ID"],
            password: this.config["SRV_PWD"],
        });

        var path = this.config["AUTH_PATH"];
        var isSuccess = await this.postToMS(path, reqData);
        if (!isSuccess) {
            return false;
        }

        if (!this.responseData["access_token"]) {
            this.data[
                "error"
            ] = `[MSA] ${this.responseData["title"]}: ${this.responseData["message"]}`;
            return false;
        }
        //Thoilc(*Note)-Lấy token thành công
        this.access_token = this.responseData["access_token"];
        return true;
    }

    //Thoilc(*Note)-Tải file PDF 
    async downloadMSInvPDF(req) {
        return this.getInvView(req);
    }

    async getMSInvView(req) {
        var args = { ...req.params, ...req.query };
        var pattern = args["pattern"] || this.config["INV_PATTERN"];
        var fkey = args["fkey"] || "";
        var inv = args["inv"] || "";
        if (fkey && !inv) {
            var temp = req
                .gtos("INV_INVOICE")
                .select("InvNo")
                .where("PinCode", fkey)
                .limit(1)
                .order_by("InvDate", "DESC")
                .catch((err) => console.log(err));
            if (!temp) {
                this.data.success = false;
                this.data[
                    "warning_html"
                ] = `<div style='width: 100vw;text-align: center;margin: -8px 0 0 -8px;font-weight: 600;font-size: 27px;color: white;background-color:#614040;line-height: 2;'>Không tìm thấy thông tin hoá đơn này!</div>`;
                return this.data;
            }

            inv = temp[0]["InvNo"];
        }

        if (!this.access_token) {
            if (!(await this.getToken())) {
                this.data.success = false;
                this.data[
                    "warning_html"
                ] = `<div style='width: 100vw;text-align: center;margin: -8px 0 0 -8px;font-weight: 600;font-size: 27px;color: white;background-color:#614040;line-height: 2;'>${this.data.error || "Can not get token!"
                }</div>`;
                return this.data;
            }
        }

        var inputData = {
            supplierTaxCode: this.config["SUPPLIER_TAX_CODE"],
            templateCode: pattern,
            invoiceNo: inv,
            fileType: "pdf",
        };

        var path =
            this.config["API_PATH"] + "/itg/invoicepublished/downloadinvoice";
        var isSuccess = await this.postToMS(path, JSON.stringify(inputData));
        if (!isSuccess) {
            this.data.success = false;
            this.data[
                "warning_html"
            ] = `<div style='width: 100vw;text-align: center;margin: -8px 0 0 -8px;font-weight: 600;font-size: 27px;color: white;background-color:#614040;line-height: 2;'>
                ${this.data["error"]}
                </div>`;
            return this.data;
        }

        var base64File = this.responseData["fileToBytes"];
        if (!base64File) {
            this.data.success = false;
            this.data[
                "warning_html"
            ] = `<div style='width: 100vw;text-align: center;margin: -8px 0 0 -8px;font-weight: 600;font-size: 27px;color: white;background-color:#614040;line-height: 2;'>
                    Không thể tải tệp từ hệ thống HDDT
                </div>`;
            return this.data;
        }

        this.data["content"] = Buffer.from(base64File, "base64");
        this.data["fileName"] = this.responseData["fileName"];
        return this.data;
    }
    //--------------------End tải file PDF--------------------//

    //Thoilc(*Note)-Huỷ hoá đơn
    async cancelInv(req) {
        var args = req.body;
        var fkey = args["fkey"] || "";
        var inv = args["inv"] || "";
        var invType = args["invType"] || "";
        var issueDate = args["issueDate"] || "";
        var cancelReason = args["cancelReason"] || "";

        if (!this.access_token) {
            if (!(await this.getToken())) {
                this.data.success = false;
                return this.data;
            }
        }

        if (fkey && !inv) {
            var temp = await req
                .gtos("INV_INVOICE")
                .select("InvNo", "InvDate", "PayFormID")
                .where("PinCode", fkey)
                .limit(1)
                .order_by("InvDate", "DESC")
                .catch((err) => console.log(err));
            if (!temp) {
                this.data.success = false;
                this.data["error"] = "Không tìm thấy dữ liệu hóa đơn theo Mã PIN";
                return this.data;
            }

            inv = temp[0]["InvNo"];
            issueDate = temp[0]["InvDate"];
            invType = temp[0]["PayFormID"];
        }

        var pattern =
            invType == "CRE"
                ? this.config["INV_CRE"]["INV_PATTERN"]
                : this.config["INV_PATTERN"];
        var path = this.config["API_PATH"] + "/itg/invoicepublished/cancel";
        var inputData = {
            supplierTaxCode: this.config["SUPPLIER_TAX_CODE"],
            templateCode: pattern,
            invoiceNo: inv,
            strIssueDate: this.dateTimeToMillisecond(issueDate),
            additionalReferenceDesc: cancelReason,
            additionalReferenceDate: this.dateTimeToMillisecond(),
            reasonDelete: cancelReason,
        };
        var params = new URLSearchParams(inputData).toString();
        var isSuccess = await this.postToMS(path, params, {
            contentType: "application/x-www-form-urlencoded",
        });
        if (!isSuccess) {
            this.data.success = false;
            return this.data;
        }

        this.data.success = true;
        return this.data;
    }
};