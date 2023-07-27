var express = require("express");
var router = express.Router();
var auth = require("../../middlewares/authentication");
const ReportCus = require("../../models/reportCus_model");
const app = express();
const moment = require("moment");
const excel = require("excel4node");
const path = require("path");
const fs = require("fs");
const os = require("os");
const multer = require("multer");
// Configure multer storage and upload middleware
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
router.get("/", auth, async function (req, res, next) {
  let result = await ReportCus.LoadPaymentMethod(req);
  res.loadContent("report/reportCus", { result });
});

// router.post("/PaymentMethod", auth, function (req, res, next) {
//   ReportCus.LoadPaymentMethod(req)
//     .then((data) => {
//       res.status(200).json({ data });
//     })
//     .catch((error) => {
//       res.status(200).json({ error });
//     });
// });

router.post("/get", auth, function (req, res, next) {
  ReportCus.LoadInvoice(req)
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      res.status(200).json({ error });
    });
});

router.get("/export", auth, function (req, res, next) {
  try {
    const { timeIn, timeOut, rowCount, ...rowData } = req.query;

    // console.log("query", req.query);

    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet("Sheet 1");

    worksheet.column(1).setWidth(5); // Kích thước cho cột A
    worksheet.column(2).setWidth(18); // Kích thước cho cột B
    worksheet.column(3).setWidth(18); // Kích thước cho cột C
    worksheet.column(4).setWidth(10); // Kích thước cho cột D
    worksheet.column(5).setWidth(23); // Kích thước cho cột E
    worksheet.column(6).setWidth(18); // Kích thước cho cột F
    worksheet.column(7).setWidth(20); // Kích thước cho cột G
    worksheet.column(8).setWidth(60); // Kích thước cho cột H
    worksheet.column(9).setWidth(10); // Kích thước cho cột I
    worksheet.column(10).setWidth(12); // Kích thước cho cột J
    worksheet.column(11).setWidth(12); // Kích thước cho cột K
    worksheet.column(12).setWidth(8); // Kích thước cho cột L
    worksheet.column(13).setWidth(10); // Kích thước cho cột M
    worksheet.column(14).setWidth(10); // Kích thước cho cột N
    worksheet.column(15).setWidth(8); // Kích thước cho cột O

    const style = workbook.createStyle({
      alignment: {
        vertical: "center",
        horizontal: "center",
        wrapText: true,
      },
      font: {
        bold: true,
      },
    });

    const style2 = workbook.createStyle({
      alignment: {
        vertical: "center",
        horizontal: "center",
        wrapText: true,
      },
    });

    worksheet.addImage({
      path: "public/assets/img/logos/logo-csg.png",
      type: "picture",
      position: {
        type: "twoCellAnchor",
        from: {
          col: 2,
          colOff: 0,
          row: 1,
          rowOff: 0,
        },
        to: {
          col: 3,
          colOff: 0,
          row: 7,
          rowOff: 0,
        },
      },
    });
    worksheet.cell(1, 1, 6, 2, true);

    worksheet
      .cell(1, 5)
      .string("CN CÔNG TY CP CẢNG SÀI GÒN - CẢNG TÂN THUẬN")
      .style(style);
    worksheet.cell(1, 5, 1, 8, true);
    worksheet
      .cell(2, 5)
      .string(
        "18B Lưu Trọng Lư, Phường Tân Thuận Đông, Quận 7, Thành Phố Hồ Chí Minh, Việt Nam"
      )
      .style(style2);
    worksheet.cell(2, 5, 2, 8, true);
    worksheet
      .cell(3, 5)
      .string("Điện thoại; (84) 028.3872.3569 - Fax: 028.3872.8447")
      .style(style2);
    worksheet.cell(3, 5, 3, 8, true);
    worksheet.cell(4, 5).string("Email: cms@tanthuanport.vn").style(style2);
    worksheet.cell(4, 5, 4, 8, true);

    worksheet
      .cell(7, 1)
      .string("BÁO CÁO DOANH THU THEO KHÁCH HÀNG")
      .style(style);
    worksheet.cell(7, 1, 7, 15, true);

    const borders = {
      top: { style: "thin" },
      bottom: { style: "thin" },
      left: { style: "thin" },
      right: { style: "thin" },
    };

    worksheet
      .cell(9, 2)
      .string("Từ ngày:")
      .style({ font: { bold: true } });
    const formattedTimeIn = moment(timeIn).format("DD/MM/YYYY HH:mm:ss");
    worksheet.cell(9, 3).string(formattedTimeIn);
    worksheet
      .cell(9, 4)
      .string("Đến ngày:")
      .style({ font: { bold: true } });
    const formattedTimeOut = moment(timeOut).format("DD/MM/YYYY HH:mm:ss");
    worksheet.cell(9, 5).string(formattedTimeOut);

    worksheet
      .cell(10, 1)
      .string("STT")
      .style({
        font: { bold: true },
        alignment: { vertical: "center", horizontal: "center", wrapText: true },
        border: borders,
        fill: {
          type: "pattern",
          patternType: "solid",
          bgColor: "#0099FF",
          fgColor: "#0099FF",
        },
      });
    worksheet
      .cell(10, 2)
      .string("Số Hóa Đơn")
      .style({
        font: { bold: true },
        alignment: { vertical: "center", horizontal: "center", wrapText: true },
        border: borders,
        fill: {
          type: "pattern",
          patternType: "solid",
          bgColor: "#0099FF",
          fgColor: "#0099FF",
        },
      });
    worksheet
      .cell(10, 3)
      .string("Ngày Hóa Đơn")
      .style({
        font: { bold: true },
        alignment: { vertical: "center", horizontal: "center", wrapText: true },
        border: borders,
        fill: {
          type: "pattern",
          patternType: "solid",
          bgColor: "#0099FF",
          fgColor: "#0099FF",
        },
      });
    worksheet
      .cell(10, 4)
      .string("Tỷ Giá")
      .style({
        font: { bold: true },
        alignment: { vertical: "center", horizontal: "center", wrapText: true },
        border: borders,
        fill: {
          type: "pattern",
          patternType: "solid",
          bgColor: "#0099FF",
          fgColor: "#0099FF",
        },
      });
    worksheet
      .cell(10, 5)
      .string("Tàu/Chuyến")
      .style({
        font: { bold: true },
        alignment: { vertical: "center", horizontal: "center", wrapText: true },
        border: borders,
        fill: {
          type: "pattern",
          patternType: "solid",
          bgColor: "#0099FF",
          fgColor: "#0099FF",
        },
      });
    worksheet
      .cell(10, 6)
      .string("Ngày Tàu Cập")
      .style({
        font: { bold: true },
        alignment: { vertical: "center", horizontal: "center", wrapText: true },
        border: borders,
        fill: {
          type: "pattern",
          patternType: "solid",
          bgColor: "#0099FF",
          fgColor: "#0099FF",
        },
      });
    worksheet
      .cell(10, 7)
      .string("Mã Khách Hàng")
      .style({
        font: { bold: true },
        alignment: { vertical: "center", horizontal: "center", wrapText: true },
        border: borders,
        fill: {
          type: "pattern",
          patternType: "solid",
          bgColor: "#0099FF",
          fgColor: "#0099FF",
        },
      });
    worksheet
      .cell(10, 8)
      .string("Tên Khách Hàng")
      .style({
        font: { bold: true },
        alignment: { vertical: "center", horizontal: "center", wrapText: true },
        border: borders,
        fill: {
          type: "pattern",
          patternType: "solid",
          bgColor: "#0099FF",
          fgColor: "#0099FF",
        },
      });
    worksheet
      .cell(10, 9)
      .string("Số Lượng")
      .style({
        font: { bold: true },
        alignment: { vertical: "center", horizontal: "center", wrapText: true },
        border: borders,
        fill: {
          type: "pattern",
          patternType: "solid",
          bgColor: "#0099FF",
          fgColor: "#0099FF",
        },
      });
    worksheet
      .cell(10, 10)
      .string("Tiền Dịch Vụ")
      .style({
        font: { bold: true },
        alignment: { vertical: "center", horizontal: "center", wrapText: true },
        border: borders,
        fill: {
          type: "pattern",
          patternType: "solid",
          bgColor: "#0099FF",
          fgColor: "#0099FF",
        },
      });
    worksheet
      .cell(10, 11)
      .string("Chiết Khấu")
      .style({
        font: { bold: true },
        alignment: { vertical: "center", horizontal: "center", wrapText: true },
        border: borders,
        fill: {
          type: "pattern",
          patternType: "solid",
          bgColor: "#0099FF",
          fgColor: "#0099FF",
        },
      });
    worksheet
      .cell(10, 12)
      .string("% Thuế")
      .style({
        font: { bold: true },
        alignment: { vertical: "center", horizontal: "center", wrapText: true },
        border: borders,
        fill: {
          type: "pattern",
          patternType: "solid",
          bgColor: "#0099FF",
          fgColor: "#0099FF",
        },
      });
    worksheet
      .cell(10, 13)
      .string("Tiền Thuế")
      .style({
        font: { bold: true },
        alignment: { vertical: "center", horizontal: "center", wrapText: true },
        border: borders,
        fill: {
          type: "pattern",
          patternType: "solid",
          bgColor: "#0099FF",
          fgColor: "#0099FF",
        },
      });
    worksheet
      .cell(10, 14)
      .string("Tổng Tiền")
      .style({
        font: { bold: true },
        alignment: { vertical: "center", horizontal: "center", wrapText: true },
        border: borders,
        fill: {
          type: "pattern",
          patternType: "solid",
          bgColor: "#0099FF",
          fgColor: "#0099FF",
        },
      });
    worksheet
      .cell(10, 15)
      .string("Ghi Chú")
      .style({
        font: { bold: true },
        alignment: { vertical: "center", horizontal: "center", wrapText: true },
        border: borders,
        fill: {
          type: "pattern",
          patternType: "solid",
          bgColor: "#0099FF",
          fgColor: "#0099FF",
        },
      });

    let checkindex = 0;
    for (let i = 0; i < rowCount; i++) {
      checkindex = i;
      const stt = rowData[`stt${i}`] || "";
      const invoiceNo = rowData[`invoiceNo${i}`] || "";
      const invoiceDate = rowData[`invoiceDate${i}`] || "";
      const exchangeRate = rowData[`exchangeRate${i}`] || "";
      const vesselInfo = rowData[`vesselInfo${i}`] || "";
      const aTA = rowData[`aTA${i}`] || "";
      const cusID = rowData[`cusID${i}`] || "";
      const cusName = rowData[`cusName${i}`] || "";
      const quantity = parseFloat(rowData[`quantity${i}`]) || 0;
      const amount = parseFloat(rowData[`amount${i}`]) || 0;
      const discountAmount = parseFloat(rowData[`discountAmount${i}`]) || 0;
      const vatRate = parseFloat(rowData[`vatRate${i}`]) || 0;
      const vatAmount = parseFloat(rowData[`vatAmount${i}`]) || 0;
      const totalAmount = parseFloat(rowData[`totalAmount${i}`]) || 0;
      const remark = rowData[`remark${i}`] || "";

      const inVoiceDate = moment(invoiceDate).format("DD/MM/YYYY HH:mm:ss");
      const ATa = moment(aTA).format("DD/MM/YYYY HH:mm:ss");

      const Vessel = JSON.parse(vesselInfo);
      const VesselFormattedString = `${Object.values(Vessel).join("/")}`;

      worksheet
        .cell(i + 11, 1)
        .string(stt)
        .style({
          border: borders,
          alignment: { vertical: "center", horizontal: "center" },
        });
      worksheet
        .cell(i + 11, 2)
        .string(invoiceNo)
        .style({ border: borders });
      worksheet
        .cell(i + 11, 3)
        .string(inVoiceDate)
        .style({ border: borders });
      worksheet
        .cell(i + 11, 4)
        .string(exchangeRate)
        .style({
          border: borders,
          alignment: { vertical: "center", horizontal: "center" },
        });
      worksheet
        .cell(i + 11, 5)
        .string(VesselFormattedString)
        .style({
          border: borders,
          alignment: { vertical: "center", horizontal: "center" },
        });
      worksheet
        .cell(i + 11, 6)
        .string(ATa)
        .style({ border: borders });
      worksheet
        .cell(i + 11, 7)
        .string(cusID)
        .style({ border: borders });
      worksheet
        .cell(i + 11, 8)
        .string(cusName)
        .style({ border: borders });
      if (quantity != "") {
        worksheet
          .cell(i + 11, 9)
          .number(parseFloat(quantity))
          .style({
            border: borders,
            alignment: { vertical: "center", horizontal: "center" },
            numberFormat: "#,##0.000; (#,##0.000); -",
          });
      } else {
        worksheet
          .cell(i + 11, 9)
          .string("")
          .style({
            border: borders,
            alignment: { vertical: "center", horizontal: "center" },
          });
      }
      if (amount != "") {
        const formattedAmount = amount.toLocaleString();
        worksheet
          .cell(i + 11, 10)
          .string(formattedAmount)
          .style({
            border: borders,
            alignment: { vertical: "center", horizontal: "right" },
          });
      } else {
        worksheet
          .cell(i + 11, 10)
          .string("")
          .style({
            border: borders,
            alignment: { vertical: "center", horizontal: "right" },
          });
      }
      if (discountAmount != "") {
        const formatDiscount = discountAmount.toLocaleString();
        worksheet
          .cell(i + 11, 11)
          .string(formatDiscount)
          .style({
            border: borders,
            alignment: { vertical: "center", horizontal: "right" },
          });
      } else {
        worksheet
          .cell(i + 11, 11)
          .string("")
          .style({
            border: borders,
            alignment: { vertical: "center", horizontal: "right" },
          });
      }
      if (vatRate != null) {
        worksheet
          .cell(i + 11, 12)
          .number(vatRate)
          .style({
            border: borders,
            alignment: { vertical: "center", horizontal: "center" },
          });
      } else {
        worksheet
          .cell(i + 11, 12)
          .string("")
          .style({
            border: borders,
            alignment: { vertical: "center", horizontal: "center" },
          });
      }
      if (vatAmount != "") {
        const formatVatAmount = vatAmount.toLocaleString();
        worksheet
          .cell(i + 11, 13)
          .string(formatVatAmount)
          .style({
            border: borders,
            alignment: { vertical: "center", horizontal: "right" },
          });
      } else {
        worksheet
          .cell(i + 11, 13)
          .string("")
          .style({
            border: borders,
            alignment: { vertical: "center", horizontal: "right" },
          });
      }
      if (totalAmount != "") {
        const formatTotalAmount = totalAmount.toLocaleString();
        worksheet
          .cell(i + 11, 14)
          .string(formatTotalAmount)
          .style({
            border: borders,
            alignment: { vertical: "center", horizontal: "right" },
          });
      } else {
        worksheet
          .cell(i + 11, 14)
          .string("")
          .style({
            border: borders,
            alignment: { vertical: "center", horizontal: "right" },
          });
      }
      worksheet
        .cell(i + 11, 15)
        .string(remark)
        .style({ border: borders });
    }
    checkindex = checkindex + 12;
    let sumQuantity = 0;
    let sumAmount = 0;
    let sumDiscountAmount = 0;
    let sumVatAmount = 0;
    let sumTotalAmount = 0;

    for (let i = 0; i < checkindex; i++) {
      const quantity = parseFloat(rowData[`quantity${i}`]) || 0;
      const amount = parseFloat(rowData[`amount${i}`]) || 0;
      const discountAmount = parseFloat(rowData[`discountAmount${i}`]) || 0;
      const vatAmount = parseFloat(rowData[`vatAmount${i}`]) || 0;
      const totalAmount = parseFloat(rowData[`totalAmount${i}`]) || 0;

      sumQuantity += quantity;
      sumAmount += amount;
      sumDiscountAmount += discountAmount;
      sumVatAmount += vatAmount;
      sumTotalAmount += totalAmount;
    }
    worksheet.cell(checkindex, 1).string("Tổng:");
    worksheet.cell(checkindex, 1, checkindex, 8, true).style({
      font: { bold: true },
      border: borders,
      alignment: { vertical: "center", horizontal: "center", wrapText: true },
    });

    worksheet
      .cell(checkindex, 9)
      .number(parseFloat(sumQuantity))
      .style({
        font: { bold: true },
        border: borders,
        alignment: {
          vertical: "center",
          horizontal: "center",
          numberFormat: "#,##0.000; (#,##0.000); -",
        },
      });
    const fsumAmount = sumAmount.toLocaleString();
    worksheet
      .cell(checkindex, 10)
      .string(fsumAmount)
      .style({
        font: { bold: true },
        border: borders,
        alignment: { vertical: "center", horizontal: "right" },
      });
    const fsumDiscountAmount = sumDiscountAmount.toLocaleString();
    worksheet
      .cell(checkindex, 11)
      .string(fsumDiscountAmount)
      .style({
        font: { bold: true },
        border: borders,
        alignment: { vertical: "center", horizontal: "right" },
      });
    worksheet
      .cell(checkindex, 12)
      .string("")
      .style({ font: { bold: true }, border: borders });
    const fsumVatAmount = sumVatAmount.toLocaleString();
    worksheet
      .cell(checkindex, 13)
      .string(fsumVatAmount)
      .style({
        font: { bold: true },
        border: borders,
        alignment: { vertical: "center", horizontal: "right" },
      });
    const fsumTotalAmount = sumTotalAmount.toLocaleString();
    worksheet
      .cell(checkindex, 14)
      .string(fsumTotalAmount)
      .style({
        font: { bold: true },
        border: borders,
        alignment: { vertical: "center", horizontal: "right" },
      });
    worksheet
      .cell(checkindex, 15)
      .string("")
      .style({ font: { bold: true }, border: borders });

    const now = new Date();
    const day1 = String(now.getDate()).padStart(2, "0");
    const month1 = String(now.getMonth() + 1).padStart(2, "0");
    const year1 = now.getFullYear();

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    const fileName = `BC_DOANH_THU_KHACH_HANG_${day1}${month1}${year1}_${hours}${minutes}${seconds}.xlsx`;
    const filePath = path.join(__dirname, fileName);

    workbook.write(filePath, function (err, stats) {
      if (err) {
        console.error("An error occurred during export:", err);
        res.status(500).json({ error: "An error occurred during export." });
      } else {
        // console.log("Excel file exported successfully.");

        // Gửi phản hồi HTTP để tải xuống file
        res.download(filePath, fileName, function (err) {
          if (err) {
            console.error("An error occurred during download:", err);
            res
              .status(500)
              .json({ error: "An error occurred during download." });
          } else {
            // Xóa file sau khi tải xuống hoàn thành
            fs.unlink(filePath, function (err) {
              if (err) {
                console.error(
                  "An error occurred while deleting the file:",
                  err
                );
              } else {
                // console.log("File deleted successfully.");
              }
            });
          }
        });
      }
    });
  } catch (error) {
    console.error("An error occurred during export:", error);
    res.status(500).json({ error: "An error occurred during export." });
  }
});

module.exports = router;
// module.exports = router;
