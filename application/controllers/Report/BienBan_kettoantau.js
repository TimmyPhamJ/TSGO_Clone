var express = require("express");
var router = express.Router();
var auth = require("../../middlewares/authentication");
const ReportModel = require("../../models/Report_tau_module.js");
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
  res.loadContent("report/BaoCao_tau", { title: "BIÊN BẢN KẾT TOÁN TÀU" });
});

router.post("/loadVesselVisit", auth, function (req, res, next) {
  ReportModel.loadVesselVisitReport(req)
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      res.status(200).json({ error });
    });
});

router.post("/get", auth, function (req, res, next) {
  ReportModel.LoadReportTally(req)
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      console.log(error);
      res.status(200).json({ error });
    });
});

router.get("/export", auth, function (req, res, next) {
  try {
    const {
      shipName,
      nationName,
      pol,
      dateArr,
      pod,
      dateDep,
      rowCount,
      ...rowData
    } = req.query;

    // console.log("query", req.query);

    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet("Sheet 1");

    worksheet.column(1).setWidth(36); // Kích thước cho cột A
    worksheet.column(2).setWidth(16); // Kích thước cho cột B
    worksheet.column(3).setWidth(13); // Kích thước cho cột C
    worksheet.column(4).setWidth(14); // Kích thước cho cột D
    worksheet.column(5).setWidth(20); // Kích thước cho cột E
    worksheet.column(6).setWidth(15); // Kích thước cho cột F
    worksheet.column(7).setWidth(15); // Kích thước cho cột E

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

    worksheet.addImage({
      path: "public/assets/img/logos/logo-csg.png",
      type: "picture",
      position: {
        type: "twoCellAnchor",
        from: {
          col: 1,
          colOff: 0,
          row: 1,
          rowOff: 0,
        },
        to: {
          col: 2,
          colOff: 0,
          row: 7,
          rowOff: 0,
        },
      },
    });
    worksheet.cell(1, 1, 6, 1, true);

    worksheet.cell(2, 2).string("CẢNG SÀI GÒN").style(style);
    worksheet.cell(2, 2, 2, 3, true);
    worksheet
      .cell(3, 2)
      .string("Direction of Habour Saigon")
      .style({
        alignment: { vertical: "center", horizontal: "center" },
      });
    worksheet.cell(3, 2, 3, 3, true);
    worksheet.cell(4, 2).string("PHÒNG KHO HÀNG").style(style);
    worksheet.cell(4, 2, 4, 3, true);
    worksheet
      .cell(5, 2)
      .string("Docks Office")
      .style({
        alignment: { vertical: "center", horizontal: "center" },
      });
    worksheet.cell(5, 2, 5, 3, true);
    worksheet
      .cell(3, 4)
      .string("CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM")
      .style(style);
    worksheet.cell(3, 4, 3, 7, true);
    worksheet.cell(4, 4).string("Độc lập - Tự do - Hạnh phúc").style(style);
    worksheet.cell(4, 4, 4, 7, true);

    worksheet
      .cell(8, 1)
      .string("Số: 01/KT")
      .style({
        alignment: { vertical: "center", horizontal: "left" },
      });
    worksheet
      .cell(9, 1)
      .string("No")
      .style({
        alignment: { vertical: "center", horizontal: "left" },
      });

    worksheet
      .cell(8, 2)
      .string("BIÊN BẢN KẾT TOÁN NHẬN HÀNG VỚI TÀU")
      .style(style);
    worksheet.cell(8, 2, 8, 7, true);
    worksheet
      .cell(9, 2)
      .string("REPORT ON RECEIPT OF CARGO")
      .style({
        alignment: { vertical: "center", horizontal: "center" },
      });
    worksheet.cell(9, 2, 9, 7, true);

    worksheet
      .cell(11, 1)
      .string("Tên tàu/Vese:")
      .style({ font: { bold: true } });
    worksheet.cell(11, 2).string(shipName);
    worksheet
      .cell(11, 5)
      .string("Quốc tịch/Nationality:")
      .style({ font: { bold: true } });
    worksheet.cell(11, 6).string(nationName);

    worksheet
      .cell(12, 1)
      .string("Cảng xếp hàng/ Port of loading:")
      .style({ font: { bold: true } });
    worksheet.cell(12, 2).string(pol);
    worksheet
      .cell(12, 5)
      .string("Ngày đến/ Date Arr:")
      .style({ font: { bold: true } });
    worksheet.cell(12, 6).string(dateArr);

    worksheet
      .cell(13, 1)
      .string("Cảng bốc dở hàng/ Port of discharging:")
      .style({ font: { bold: true } });
    worksheet.cell(13, 2).string(pod);
    worksheet
      .cell(13, 5)
      .string("Ngày Đi/ Date Dep:")
      .style({ font: { bold: true } });
    worksheet.cell(13, 6).string(dateDep);

    const borders = {
      top: { style: "thin" },
      bottom: { style: "thin" },
      left: { style: "thin" },
      right: { style: "thin" },
    };

    worksheet
      .cell(15, 1)
      .string(
        "SỐ LƯỢNG HÀNG GHI TRONG LƯỢC KHAI\nNumber of packages mentioned in manifest"
      )
      .style({
        font: { bold: true }, // Áp dụng in đậm cho phần đầu của chuỗi
        alignment: { vertical: "center", horizontal: "center", wrapText: true },
        border: borders,
      });

    worksheet.cell(15, 1, 16, 4, true).style({
      alignment: { vertical: "center", horizontal: "center", wrapText: true },
      border: borders,
    });
    worksheet
      .cell(15, 5)
      .string("SỐ LƯỢNG HÀNG THỰC NHẬN\nNumber of packages received")
      .style({
        font: { bold: true }, // Áp dụng in đậm cho phần đầu của chuỗi
        alignment: { vertical: "center", horizontal: "center", wrapText: true },
        border: borders,
      });

    worksheet.cell(15, 5, 16, 7, true).style({
      alignment: { vertical: "center", horizontal: "center", wrapText: true },
      border: borders,
    });

    worksheet
      .cell(17, 1)
      .string("Cảng xếp hàng\nPort of loading")
      .style({
        font: { bold: true },
        alignment: { vertical: "center", horizontal: "center", wrapText: true },
        border: borders,
      });
    worksheet
      .cell(17, 2)
      .string("Số ĐHVT\nNo. B/L")
      .style({
        font: { bold: true },
        alignment: { vertical: "center", horizontal: "center", wrapText: true },
        border: borders,
      });
    worksheet
      .cell(17, 3)
      .string("Số lượng\nQuantity")
      .style({
        font: { bold: true },
        alignment: { vertical: "center", horizontal: "center", wrapText: true },
        border: borders,
      });
    worksheet
      .cell(17, 4)
      .string("Trọng lượng\nWeight (MTS)")
      .style({
        font: { bold: true },
        alignment: { vertical: "center", horizontal: "center", wrapText: true },
        border: borders,
      });
    worksheet
      .cell(17, 5)
      .string("Số lượng\nQuantity")
      .style({
        font: { bold: true },
        alignment: { vertical: "center", horizontal: "center", wrapText: true },
        border: borders,
      });
    worksheet
      .cell(17, 6)
      .string("Trọng lượng\nWeight (MTS)")
      .style({
        font: { bold: true },
        alignment: { vertical: "center", horizontal: "center", wrapText: true },
        border: borders,
      });
    worksheet
      .cell(17, 7)
      .string("Loại hàng\nDescription")
      .style({
        font: { bold: true },
        alignment: { vertical: "center", horizontal: "center", wrapText: true },
        border: borders,
      });

    let checkindex = 0;
    for (let i = 0; i < rowCount; i++) {
      checkindex = i;
      const pol = rowData[`pol${i}`] || "";
      const billOfLading = rowData[`billOfLading${i}`] || "";
      const mnfQuantity = parseInt(rowData[`mnfQuantity${i}`]) || 0;
      const mnfMcWeight = parseFloat(rowData[`mnfMcWeight${i}`]) || 0;
      const quantityA = parseInt(rowData[`quantityA${i}`]) || 0;
      const weightA = parseFloat(rowData[`weightA${i}`]) || 0;
      const cargoTypeName = rowData[`cargoTypeName${i}`] || "";

      worksheet
        .cell(i + 18, 1)
        .string(pol)
        .style({ border: borders });
      worksheet
        .cell(i + 18, 2)
        .string(billOfLading)
        .style({ border: borders });
      worksheet
        .cell(i + 18, 3)
        .number(mnfQuantity)
        .style({ border: borders });
      worksheet
        .cell(i + 18, 4)
        .number(mnfMcWeight)
        .style({ border: borders, numberFormat: "#,##0.000; (#,##0.000); -" });
      worksheet
        .cell(i + 18, 5)
        .number(quantityA)
        .style({ border: borders });
      worksheet
        .cell(i + 18, 6)
        .number(weightA)
        .style({ border: borders, numberFormat: "#,##0.000; (#,##0.000); -" });
      worksheet
        .cell(i + 18, 7)
        .string(cargoTypeName)
        .style({ border: borders });
    }

    checkindex = checkindex + 19;
    let sumQuantity = 0;
    let sumWeight = 0;
    let sumQuantityA = 0;
    let sumWeightA = 0;

    for (let i = 0; i < checkindex; i++) {
      const mnfQuantity = parseInt(rowData[`mnfQuantity${i}`]) || 0;
      const mnfMcWeight = parseFloat(rowData[`mnfMcWeight${i}`]) || 0;
      const quantityA = parseInt(rowData[`quantityA${i}`]) || 0;
      const weightA = parseFloat(rowData[`weightA${i}`]) || 0;

      sumQuantity += mnfQuantity;
      sumWeight += mnfMcWeight;
      sumQuantityA += quantityA;
      sumWeightA += weightA;
    }

    worksheet.cell(checkindex, 1).string("TỔNG/TOTAL:");
    worksheet.cell(checkindex, 1, checkindex, 2, true).style({
      font: { bold: true },
      border: borders,
      alignment: { vertical: "center", horizontal: "center", wrapText: true },
    });
    worksheet
      .cell(checkindex, 3)
      .number(parseInt(sumQuantity))
      .style({ font: { bold: true }, border: borders });
    worksheet
      .cell(checkindex, 4)
      .number(parseFloat(sumWeight))
      .style({
        font: { bold: true },
        border: borders,
        numberFormat: "#,##0.000; (#,##0.000); -",
      });
    worksheet
      .cell(checkindex, 5)
      .number(parseInt(sumQuantityA))
      .style({ font: { bold: true }, border: borders });
    worksheet
      .cell(checkindex, 6)
      .number(parseFloat(sumWeightA))
      .style({
        font: { bold: true },
        border: borders,
        numberFormat: "#,##0.000; (#,##0.000); -",
      });
    worksheet
      .cell(checkindex, 7)
      .style({ font: { bold: true }, border: borders });

    worksheet
      .cell(checkindex + 2, 1, checkindex + 2, 7, true)
      .string("**NOTE:")
      .style({
        font: { bold: true },
        alignment: {
          vertical: "center",
          horizontal: "left",
        },
      });
    worksheet
      .cell(checkindex + 3, 1, checkindex + 4, 7, true)
      .string(
        "-Before discharge operation, we have found the damaged cargo: Some coils were rusted, oil stained; some coids had no marks, some coils: scractched, band-off, edges folded & torn;  Some coils were rusted, oil stained; had no marks, some coils: scractched, tangled, wraped, band-off."
      )
      .style({
        alignment: {
          wrapText: true,
          vertical: "center",
          horizontal: "left",
        },
      });
    worksheet
      .cell(checkindex + 5, 1, checkindex + 5, 7, true)
      .string(" - All the cargo was discharged by the shore cranes")
      .style({
        alignment: {
          vertical: "center",
          horizontal: "left",
        },
      });

    worksheet
      .cell(checkindex + 7, 1, checkindex + 7, 3, true)
      .string("ĐIỀU KIỆN NHẬN HÀNG")
      .style({
        font: { bold: true },
        alignment: {
          vertical: "center",
          horizontal: "center",
        },
      });
    worksheet
      .cell(checkindex + 8, 1, checkindex + 9, 3, true)
      .string(
        "- Hàng nhận theo số lượng kiện, bao bì nguyên vẹn không chịu trách nhiệm bên trong."
      )
      .style({
        alignment: {
          wrapText: true,
          vertical: "center",
          horizontal: "left",
        },
      });
    worksheet
      .cell(checkindex + 10, 1, checkindex + 11, 3, true)
      .string(
        " - Trọng lượng ghi theo lượng khai của Tàu (kể cả hàng rời) không chịu trách nhiệm hao hụt."
      )
      .style({
        alignment: {
          wrapText: true,
          vertical: "center",
          horizontal: "left",
        },
      });

    worksheet
      .cell(checkindex + 7, 5, checkindex + 7, 7, true)
      .string("CONDITIONS AND EXCEPTION OF RECEIPT")
      .style({
        font: { bold: true },
        alignment: {
          vertical: "center",
          horizontal: "center",
        },
      });
    worksheet
      .cell(checkindex + 8, 5, checkindex + 9, 7, true)
      .string(
        "- Cargo received as per number of packages in apparent good condition without liability for contents."
      )
      .style({
        alignment: {
          wrapText: true,
          vertical: "center",
          horizontal: "left",
        },
      });
    worksheet
      .cell(checkindex + 10, 5, checkindex + 11, 7, true)
      .string(
        " - Weight as per manifest (including cargo in bulk) without liability for discrepancy."
      )
      .style({
        alignment: {
          wrapText: true,
          vertical: "center",
          horizontal: "left",
        },
      });

    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, "0");
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const year = currentDate.getFullYear().toString();

    const dateString = `Cảng Sài Gòn, Ngày ${day} Tháng ${month} Năm ${year}`;

    worksheet
      .cell(checkindex + 13, 5, checkindex + 13, 7, true)
      .string(dateString)
      .style({
        alignment: { vertical: "center", horizontal: "center", wrapText: true },
      });

    worksheet
      .cell(checkindex + 14, 1, checkindex + 14, 3, true)
      .string("Người giao hàng")
      .style({
        alignment: {
          vertical: "center",
          horizontal: "center",
          wrapText: true,
        },
        font: { bold: true },
      });
    worksheet
      .cell(checkindex + 15, 1, checkindex + 15, 3, true)
      .string("The deliverer of goods")
      .style({
        alignment: { vertical: "center", horizontal: "center", wrapText: true },
      });

    worksheet
      .cell(checkindex + 14, 5, checkindex + 14, 7, true)
      .string("Người nhận hàng")
      .style({
        alignment: {
          vertical: "center",
          horizontal: "center",
          wrapText: true,
        },
        font: { bold: true },
      });
    worksheet
      .cell(checkindex + 15, 5, checkindex + 15, 7, true)
      .string("The receiver of goods")
      .style({
        alignment: { vertical: "center", horizontal: "center", wrapText: true },
      });

    worksheet
      .cell(checkindex + 20, 1, checkindex + 20, 3, true)
      .string("Thuyền trưởng")
      .style({
        alignment: {
          vertical: "center",
          horizontal: "center",
          wrapText: true,
        },
        font: { bold: true },
      });
    worksheet
      .cell(checkindex + 21, 1, checkindex + 21, 3, true)
      .string("The Master / Chief Officer")
      .style({
        alignment: { vertical: "center", horizontal: "center", wrapText: true },
      });

    worksheet
      .cell(checkindex + 20, 5, checkindex + 20, 7, true)
      .string("Trưởng phòng kho hàng")
      .style({
        alignment: {
          vertical: "center",
          horizontal: "center",
          wrapText: true,
        },
        font: { bold: true },
      });
    worksheet
      .cell(checkindex + 21, 5, checkindex + 21, 7, true)
      .string("Chief Docks Office")
      .style({
        alignment: { vertical: "center", horizontal: "center", wrapText: true },
      });

    const now = new Date();
    const day1 = String(now.getDate()).padStart(2, "0");
    const month1 = String(now.getMonth() + 1).padStart(2, "0");
    const year1 = now.getFullYear();

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    const fileName = `BB_KET_TOAN_${shipName
      .replace("|", "_")
      .replace(
        "|",
        "_"
      )}_${day1}${month1}${year1}_${hours}${minutes}${seconds}.xlsx`;
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
