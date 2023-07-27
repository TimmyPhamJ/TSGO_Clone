var express = require("express");
var router = express.Router();
var auth = require("../../middlewares/authentication");
var xl = require("excel4node");
const moment = require("moment-timezone");
const ReportgoodModal = require("../../models/report_Entrance");
router.get("/", auth, async function (req, res, next) {
  try {
    let result = await ReportgoodModal.getItemName(req);
    res.loadContent("report/reportEntrance", { result });
  } catch (error) { }
});
router.get("/get-entranceReport", auth, async function (req, res, next) {
  try {
    let result = await ReportgoodModal.getEntranceReport(req);

    if (result.length > 0) {
      return res.status(200).json({
        errCode: 0,
        result: result,
        message: "success",
      });
    } else {
      return res.status(200).json({
        errCode: 1,
        message: "No data with server",
        result: [],
      });
    }
  } catch (error) { }
});
router.get("/exportExcel", auth, async function (req, res, next) {
  try {
    // call API lấy dataExcel
    let result = await ReportgoodModal.getEntranceReport(req);
    // Xử lý data map đúng vs các cột
    let totalMcwweight = 0;
    if (result?.length > 0) {
      let dataExcel = [];
      result.forEach((item, index) => {
        totalMcwweight = totalMcwweight + item.McWeight;
        let obj = {};
        obj["STT"] = index + 1,
          obj["EirNo"] = item.EirNo ? item.EirNo : "",
          obj["Pincode"] = `${item.PinCode ? item.PinCode : ""}`,
          obj["InboundVoyage"] = `${item.VesselName}/${item.InboundVoyage}/${item.OutboundVoyage}`,
          obj["BillOfLading"] = item.BillOfLading ? item.BillOfLading : "",
          obj["BookingNo"] = item.BookingNo ? item.BookingNo : "",
          obj["ClassID"] = `${item.ClassID == 1 ? "Nhập" : "Xuất"}`,
          obj["CargoType"] = item.CargoTypeName ? item.CargoTypeName : "",
          obj["ItemID"] = item.ItemName ? item.ItemName : "",
          obj["Quantity"] = item.Quantity,
          obj["McWeight"] = item.McWeight.toFixed(3),
          obj["InOut"] = `${item.InOut == "I" ? "Vào" : "Ra"}`,
          obj["GateInID"] = item.GateInID ? item.GateInID : "",
          obj["StartDate"] = moment(item.StartDate).format("DD-MM-YYYY HH:mm:ss"),
          obj["GateOutID"] = item.GateOutID ? item.GateOutID : "",
          obj["FinishDate"] = moment(item.FinishDate).format("DD-MM-YYYY HH:mm:ss"),
          obj["TruckNo"] = item.TruckNo ? item.TruckNo : "",
          obj["RM_No"] = item.RM_No ? item.RM_No : "",
          obj["Sequence"] = item.Sequence,
          obj["Block"] = item.Block ? item.Block : "",
          obj["JobModeName"] = item.JobModeName ? item.JobModeName : "",
          obj["MethodID"] = item.MethodID ? item.MethodID : "",
          obj["ShipperName"] = item.ShipperName ? item.ShipperName : "",
          obj["PaymentTypeID"] = `${item.PaymentTypeID == "C" ? "Thu ngay" : item.PaymentTypeID == "M" ? "Thu sau" : ""}`,
          obj["DTTT"] = `${item.CusID ? item.CusID : ""}: ${item.CusName ? item.CusName : ""}`,
          obj["InvoiceNo"] = item.InvoiceNo ? item.InvoiceNo : "",
          obj["DraftNo"] = item.DraftNo ? item.DraftNo : "",
          obj["Remark"] = item.Remark ? item.Remark : "";

        dataExcel.push(obj);
      });
      // Column excel
      let colHeader = ["STT", "Số lệnh", "Số Pincode", "Lịch trình tàu", "Số vận đơn", "Số booking", "Hướng", "Loại hàng", "Hàng hóa", "Số lượng", "Trọng Lượng(Tấn)", "Vào/Ra", "Cổng vào", "Xe vào cổng", "Cổng ra", "Xe ra cổng", "Số xe/Sà lan", "Số romooc", "Lượt xe", "Vị trí bãi", "Phương án", "PTGN", "Chủ hàng", "HTTT", "ĐTTT", "Số hóa đơn", "Số PTC", "Ghi chú"];
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
      // style cho cột trọng lượng
      var styleMcweight = wb.createStyle({
        alignment: { vertical: "center", horizontal: "center", },
        border: {
          left: { style: "thin", color: "black", },
          right: { style: "thin", color: "black", },
          top: { style: "thin", color: "black", },
          bottom: { style: "thin", color: "black", },
          outline: false,
        },
        numberFormat: "#,##0.000; (#,##0.000); -",
      });
      // style cho cell DTTT
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
      // style cho phần tổng trọng lượng
      var styleInTotal = wb.createStyle({
        font: { color: "red", size: 12, bold: true, },
        alignment: { vertical: "center", horizontal: "center", },
        numberFormat: "#,##0.000; (#,##0.000); -",
      });
      var ws = wb.addWorksheet("Sheet 1");
      let colIndex = 1;
      // cell cho các cột tiêu đề
      colHeader.forEach((item, index) => {
        ws.cell(9, colIndex++).string(item).style(styleHeader);
        if (index + 1 == 2 || index + 1 == 3 || index + 1 == 14 || index + 1 == 16 || index + 1 == 21 || index + 1 == 27 || index + 1 == 28 || index + 1 == 5 || index + 1 == 11) {
          ws.column(index + 1).setWidth(25);
        }
        if (index + 1 == 25) {
          ws.column(index + 1).setWidth(60);
        }
        if (index + 1 == 23 || index + 1 == 4) {
          ws.column(index + 1).setWidth(35);
        }
      });
      // ảnh
      ws.addImage({ path: "public/assets/img/logos/logo-csg.png", type: "picture", position: { type: "twoCellAnchor", from: { col: 1, colOff: 0, row: 2, rowOff: 0, }, to: { col: 2, colOff: 0, row: 7, rowOff: 0, }, }, });
      // phần giới thiệu
      ws.cell(2, 4).string("CN CÔNG TY CP CẢNG SÀI GÒN - CẢNG TÂN THUẬN").style(styleIntroduce);
      ws.cell(3, 4).string("18B Lưu Trọng Lư, Phường Tân Thuận Đông, Quận 7, Thành Phố Hồ Chí Minh, Việt Nam");
      ws.cell(4, 4).string("Điện thoại; (84) 028.3872.3569 - Fax: 028.3872.8447");
      ws.cell(5, 4).string("Email: cms@tanthuanport.vn");
      let rowIndex = 10;
      let checkIndex = 0;
      // fill các cell vào
      dataExcel.forEach((item, index) => {
        checkIndex = index + 1;
        let columnIndex = 1;
        Object.keys(item).forEach((colName) => {
          if (colName == "STT" || colName == "Quantity" || colName == "Sequence") {
            ws.cell(rowIndex, columnIndex++).number(parseFloat(item[colName])).style(styleContain);
          } else if (colName == "DTTT") {
            ws.cell(rowIndex, columnIndex++).string(item[colName] + "").style(styleDTTT);
          } else if (colName == "McWeight") {
            ws.cell(rowIndex, columnIndex++).number(parseFloat(item[colName])).style(styleMcweight);
          } else {
            ws.cell(rowIndex, columnIndex++).string(item[colName] + "").style(styleContain);
          }
        });
        rowIndex++;
      });
      // add cell cho phần tổng trọng lượng
      checkIndex = checkIndex + 10;
      ws.cell(checkIndex, 11).number(parseFloat(totalMcwweight)).style(styleInTotal);
      ws.cell(checkIndex, 9).string("TỔNG").style(styleInTotal);
      wb.write("baocaoxeravaocong.xlsx", res);
    }
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
