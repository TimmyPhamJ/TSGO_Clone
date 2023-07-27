var express = require("express");
var router = express.Router();
var xl = require("excel4node");
const moment = require("moment-timezone");
var auth = require("../../middlewares/authentication");
const reportSaleModel = require("../../models/report_sale");
const e = require("express");
router.get("/", auth, async function (req, res, next) {
    let result = await reportSaleModel.loadPaymentMethod(req)
    res.loadContent("report/reportSale", { result });
});
router.get("/getDataInvoice", auth, async function (req, res, next) {
    try {
        let result = await reportSaleModel.getdataInvoice(req)
        if (result?.length > 0) {
            return res.status(200).json({
                errCode: 0,
                length: result?.length,
                result: result,
                message: "Sucess"
            })
        }
        else {
            return res.status(200).json({
                errCode: 1,
                message: "No data with Server"
            })
        }
    } catch (error) {

    }
})
router.get("/exportExcel", auth, async function (req, res, next) {
    try {
        let result = await reportSaleModel.getdataInvoice(req)
        let totalMoney = 0;
        let total = 0;
        let totalVAT = 0
        // Xử lý data để map các cell vào
        if (result?.length > 0) {
            let dataExcel = [];
            result.forEach((item, index) => {
                totalMoney = totalMoney + item.TotalAmount
                total = total + item.Amount
                totalVAT = totalVAT + item.VatAmount
                let obj = {};
                obj["STT"] = index + 1,
                    obj["InvoiceNo"] = item.InvoiceNo ? item.InvoiceNo : "",
                    obj["InvoiceDate"] = moment(item.InvoiceDate).format("DD-MM-YYYY HH:mm:ss"),
                    obj["SLE"] = "",
                    obj["TRFCodeName"] = item.TRFCodeName ? item.TRFCodeName : "",
                    obj["PinCode"] = item.PinCode ? item.PinCode : "",
                    obj["HL"] = "",
                    obj["TRFDesc"] = `${item.TRFDesc ? item.TRFDesc : ""} ${item.TRFDescMore ? item.TRFDescMore : ""}`,
                    obj["Quantity"] = item.Quantity ? item.Quantity : 0,
                    obj["Amount"] = item.Amount.toLocaleString(),
                    obj["DiscountAmount"] = item.DiscountAmount,
                    obj["VatRate"] = item.VatRate ? item.VatRate : 0,
                    obj["VatAmount"] = item.VatAmount.toLocaleString(),
                    obj["TotalAmount"] = item.TotalAmount.toLocaleString(),
                    obj["PaymentTypeID"] = item.PaymentTypeID == "CAS" ? "THU NGAY" : "THU SAU",
                    obj["PaymentMethod"] = item.PaymentMethod,
                    obj["DTTT"] = `${item.CusName ? item.CusName : ""}`,
                    obj["TaxCode"] = item.TaxCode,
                    obj["CreatedBy"] = item.CreatedBy,
                    obj["Remark"] = item.Remark ? item.Remark : "",
                    dataExcel.push(obj);
            });
            let colHeader = ["STT", "Số HĐ", "Ngày HĐ", "Số lệnh", "Phương án", "PinCode", "Hạn lệnh", "Diễn giải", "Số lượng", "Thành tiền", "Chiết khấu", "%Thuế", "Tiền thuế", "Tổng tiền", "Loại hóa đơn", "HTTT", "ĐTTT", "MST", "Lập bởi", "Ghi chú"]
            var wb = new xl.Workbook();
            // Style cho phần header
            var styleHeader = wb.createStyle({
                fill: { type: "pattern", patternType: "solid", bgColor: "#0099FF", fgColor: "#0099FF", },
                font: { color: "black", size: 12, bold: true, },
                alignment: { vertical: "center", horizontal: "center", },
                margins: { left: 55, right: 55, },
                border: {
                    left: { style: "thin", color: "black", },
                    right: { style: "thin", color: "black", },
                    top: { style: "thin", color: "black", },
                    bottom: { style: "thin", color: "black", },
                    outline: false,
                },
            });
            // style cho các cell
            var styleContain = wb.createStyle({
                alignment: { vertical: "center", horizontal: "center", },
                border: {
                    left: { style: "thin", color: "black", },
                    right: { style: "thin", color: "black", },
                    top: { style: "thin", color: "black", },
                    bottom: { style: "thin", color: "black", },
                    outline: false,
                },
            });
            // style cho phần tiêu đề cty
            var styleIntroduce = wb.createStyle({ font: { color: "black", size: 12, bold: true, }, });
            var styleDTTT = wb.createStyle({
                border: {
                    left: { style: "thin", color: "black", },
                    right: { style: "thin", color: "black", },
                    top: { style: "thin", color: "black", },
                    bottom: { style: "thin", color: "black", },
                    outline: false,
                },
                alignment: { vertical: "center", horizontal: "left", },
            });
            // style cho phần total
            var styleInTotal = wb.createStyle({
                font: { color: "red", size: 12, bold: true, },
                alignment: { vertical: "center", horizontal: "right", },
            });
            var styleNumber = wb.createStyle({
                alignment: { vertical: "center", horizontal: "right", },
                border: {
                    left: { style: "thin", color: "black", },
                    right: { style: "thin", color: "black", },
                    top: { style: "thin", color: "black", },
                    bottom: { style: "thin", color: "black", },
                    outline: false,
                },
            });
            // Phần header
            var ws = wb.addWorksheet("Sheet 1");
            let colIndex = 1;
            colHeader.forEach((item, index) => {
                ws.cell(10, colIndex++).string(item).style(styleHeader);
                if (index + 1 == 17) {
                    ws.column(index + 1).setWidth(65);
                }
                if (index + 1 == 2 || index + 1 == 3 || index + 1 == 6 || index + 1 == 18 || index + 1 == 15) {
                    ws.column(index + 1).setWidth(25);
                }
                if (index + 1 == 8) {
                    ws.column(index + 1).setWidth(35);
                }
                if (index + 1 == 14 || index + 1 == 15) {
                    ws.column(index + 1).setWidth(18);
                }
            });
            // Phần ảnh
            ws.addImage({ path: "public/assets/img/logos/logo-csg.png", type: "picture", position: { type: "twoCellAnchor", from: { col: 1, colOff: 0, row: 2, rowOff: 0, }, to: { col: 2, colOff: 0, row: 7, rowOff: 0, }, }, });
            // phần giới thiệu
            ws.cell(2, 4).string("CN CÔNG TY CP CẢNG SÀI GÒN - CẢNG TÂN THUẬN").style(styleIntroduce);
            ws.cell(3, 4).string("18B Lưu Trọng Lư, Phường Tân Thuận Đông, Quận 7, Thành Phố Hồ Chí Minh, Việt Nam");
            ws.cell(4, 4).string("Điện thoại; (84) 028.3872.3569 - Fax: 028.3872.8447");
            ws.cell(5, 4).string("Email: cms@tanthuanport.vn");
            // add cell cho các row
            let rowIndex = 11;
            let checkIndex = 0;
            dataExcel.forEach((item, index) => {
                checkIndex = index + 1;
                let columnIndex = 1;
                Object.keys(item).forEach((colName) => {
                    if (colName == "STT" || colName == "Quantity" || colName == "DiscountAmount" || colName == "VatRate") {
                        ws.cell(rowIndex, columnIndex++).number(parseFloat(item[colName])).style(styleContain);
                    }
                    else if (colName == "DTTT") {
                        ws.cell(rowIndex, columnIndex++).string(item[colName] + "").style(styleDTTT);
                    }
                    else if (colName == "TotalAmount" || colName == "VatAmount" || colName == "Amount") {
                        ws.cell(rowIndex, columnIndex++).string(item[colName] + "").style(styleNumber);
                    }
                    else {
                        ws.cell(rowIndex, columnIndex++).string(item[colName] + "").style(styleContain);
                    }
                });
                rowIndex++;
            });
            totalMoney = totalMoney.toLocaleString();
            total = total.toLocaleString()
            totalVAT = totalVAT.toLocaleString()
            checkIndex = checkIndex + 11;
            ws.cell(checkIndex, 14).string(totalMoney).style(styleInTotal);
            ws.cell(checkIndex, 13).string(totalVAT).style(styleInTotal);
            ws.cell(checkIndex, 10).string(total).style(styleInTotal);
            ws.cell(checkIndex, 9).string("TỔNG").style(styleInTotal);
            ws.cell(7, 5).string("BÁO CÁO DOANH THU").style(styleIntroduce);
            ws.cell(8, 4).string(`Từ ngày: ${moment(req.query.timeIn).format("DD-MM-YYYY")}`);
            ws.cell(8, 6).string(`Đến ngày: ${moment(req.query.timeOut).format("DD-MM-YYYY")} `);
            wb.write(`baocaodoanhthu-${moment(req.query.timeIn).format("DD-MM-YYYY")}-${moment(req.query.timeOut).format("DD-MM-YYYY")}.xlsx`, res);
        }
    } catch (error) {
        console.log(error)
    }
})
module.exports = router;