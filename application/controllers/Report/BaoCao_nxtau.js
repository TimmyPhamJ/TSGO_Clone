var express = require("express");
var router = express.Router();
var auth = require("../../middlewares/authentication");
const VesselModel = require("../../models/VesselModel.js");
// const ReportModel = require("../../models/Report_tau_module.js");
const ReportInOutModel = require("../../models/reportinout_model.js");
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
  res.loadContent("report/InOut_tau", { title: "BÁO CÁO NHẬP XUẤT TÀU" });
});

router.post("/loadVesselVisit", auth, function (req, res, next) {
  VesselModel.loadVesselVisit(req)
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      res.status(200).json({ error });
    });
});

router.post("/Device", auth, function (req, res, next) {
  ReportInOutModel.LoadDevice(req)
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      res.status(200).json({ error });
    });
});

router.post("/Worker", auth, function (req, res, next) {
  ReportInOutModel.LoadWorker(req)
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      res.status(200).json({ error });
    });
});

router.post("/get", auth, function (req, res, next) {
  ReportInOutModel.LoadReportTally(req)
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      res.status(200).json({ error });
    });
});

router.get("/export", auth, function (req, res, next) {
  try {
    const {
      shipName,
      classID,
      nationName,
      dateArr,
      itemName,
      cargoName,
      method,
      workerGroup,
      rowCount,
      ...rowData
    } = req.query;

    // console.log("query", req.query);

    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet("Sheet 1");

    worksheet.column(1).setWidth(20); // Kích thước cho cột A
    worksheet.column(2).setWidth(25); // Kích thước cho cột B
    worksheet.column(3).setWidth(11); // Kích thước cho cột C
    worksheet.column(4).setWidth(11); // Kích thước cho cột D
    worksheet.column(5).setWidth(11); // Kích thước cho cột E
    worksheet.column(6).setWidth(23); // Kích thước cho cột F
    worksheet.column(7).setWidth(25); // Kích thước cho cột G

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
    worksheet.cell(2, 1, 4, 1, true);

    worksheet
      .cell(2, 2)
      .string("CÔNG TY CỔ PHẦN XẾP DỠ VÀ DỊCH VỤ CẢNG SÀI GÒN")
      .style(style);
    worksheet.cell(2, 2, 4, 3, true);
    worksheet
      .cell(1, 5)
      .string("CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM")
      .style(style);
    worksheet.cell(1, 5, 1, 7, true);
    worksheet.cell(2, 5).string("VIETNAM SOCIALIST REPUBLIC").style(style);
    worksheet.cell(2, 5, 2, 7, true);
    worksheet.cell(3, 5).string("Độc lập - Tự do - Hạnh phúc").style(style);
    worksheet.cell(3, 5, 3, 7, true);
    worksheet
      .cell(4, 5)
      .string("Independence - Freedom - Happiness")
      .style(style);
    worksheet.cell(4, 5, 4, 7, true);

    worksheet.cell(7, 1).string("GIẤY KIỂM NHẬN HÀNG VỚI TÀU").style(style);
    worksheet.cell(7, 1, 7, 7, true);
    worksheet.cell(8, 1).string("TALLY REPORT").style(style);
    worksheet.cell(8, 1, 8, 7, true);

    worksheet
      .cell(10, 1)
      .string("Tên tàu:")
      .style({ font: { bold: true } });
    worksheet.cell(10, 2).string(shipName);
    worksheet
      .cell(10, 4)
      .string("Quốc tịch:")
      .style({ font: { bold: true } });
    worksheet.cell(10, 5).string(nationName);
    worksheet
      .cell(10, 6)
      .string("Cập bến ngày:")
      .style({ font: { bold: true } });
    const formattedDate = moment(dateArr).format("DD/MM/YYYY HH:mm:ss");
    worksheet.cell(10, 7).string(formattedDate);

    worksheet
      .cell(11, 1)
      .string("Loại hàng:")
      .style({ font: { bold: true } });
    worksheet.cell(11, 2).string(itemName);
    worksheet
      .cell(11, 4)
      .string("Máng số:")
      .style({ font: { bold: true } });
    worksheet.cell(11, 5).string("");
    worksheet
      .cell(11, 6)
      .string("Phương thức:")
      .style({ font: { bold: true } });
    worksheet.cell(11, 7).string(method);

    worksheet
      .cell(12, 1)
      .string("Ca từ:")
      .style({ font: { bold: true } });
    worksheet.cell(12, 2).string("");
    worksheet
      .cell(12, 4)
      .string("Đến:")
      .style({ font: { bold: true } });
    worksheet.cell(12, 5).string("");

    worksheet
      .cell(13, 1)
      .string("Tên người biên hàng:")
      .style({ font: { bold: true } });
    worksheet.cell(13, 2).string("");
    worksheet
      .cell(13, 4)
      .string("MSCĐ:")
      .style({ font: { bold: true } });
    worksheet.cell(13, 5).string("");

    worksheet
      .cell(14, 1)
      .string("Tổ công nhân:")
      .style({ font: { bold: true } });
    worksheet.cell(14, 2).string(workerGroup);

    const borders = {
      top: { style: "thin" },
      bottom: { style: "thin" },
      left: { style: "thin" },
      right: { style: "thin" },
    };

    var content = classID == 2 ? "BookingNo" : "Số vận đơn";

    worksheet
      .cell(16, 1)
      .string(content)
      .style({
        font: { bold: true },
        alignment: { vertical: "center", horizontal: "center", wrapText: true },
        border: borders,
      });
    worksheet
      .cell(16, 2)
      .string("Ký Hiệu Mã\nMarks No")
      .style({
        font: { bold: true },
        alignment: { vertical: "center", horizontal: "center", wrapText: true },
        border: borders,
      });
    worksheet
      .cell(16, 3)
      .string("Loại Hàng\nDescription")
      .style({
        font: { bold: true },
        alignment: { vertical: "center", horizontal: "center", wrapText: true },
        border: borders,
      });
    worksheet
      .cell(16, 4)
      .string("Số Lượng (Bao Kiện)\nNumber of packages")
      .style({
        font: { bold: true },
        alignment: { vertical: "center", horizontal: "center", wrapText: true },
        border: borders,
      });
    worksheet
      .cell(16, 5)
      .string("Cộng\nTotal")
      .style({
        font: { bold: true },
        alignment: { vertical: "center", horizontal: "center", wrapText: true },
        border: borders,
      });
    worksheet
      .cell(16, 6)
      .string("Khối Lượng (Tấn)\nGross Weight")
      .style({
        font: { bold: true },
        alignment: { vertical: "center", horizontal: "center", wrapText: true },
        border: borders,
      });
    worksheet
      .cell(16, 7)
      .string("Ghi Chú\nRemarks")
      .style({
        font: { bold: true },
        alignment: { vertical: "center", horizontal: "center", wrapText: true },
        border: borders,
      });

    let checkindex = 0;
    // Thêm dữ liệu cho từng hàng (rows)
    for (let i = 0; i < rowCount; i++) {
      checkindex = i;
      const billOfLading = rowData[`billOfLading${i}`] || "";
      const cargoType = rowData[`cargoType${i}`] || "";
      const cargoTypeName = rowData[`cargoTypeName${i}`] || "";
      const quantity = parseInt(rowData[`quantity${i}`]) || 0;
      const total = parseInt(rowData[`total${i}`]) || 0;
      const weight = parseFloat(rowData[`weight${i}`]) || 0;
      const note = rowData[`note${i}`] || "";

      worksheet
        .cell(i + 17, 1)
        .string(billOfLading)
        .style({ border: borders });
      worksheet
        .cell(i + 17, 2)
        .string(cargoType)
        .style({ border: borders });
      worksheet
        .cell(i + 17, 3)
        .string(cargoTypeName)
        .style({ border: borders });
      worksheet
        .cell(i + 17, 4)
        .number(quantity)
        .style({ border: borders });
      worksheet
        .cell(i + 17, 5)
        .number(total)
        .style({ border: borders });
      worksheet
        .cell(i + 17, 6)
        .number(weight)
        .style({ border: borders, numberFormat: "#,##0.000; (#,##0.000); -" });
      worksheet
        .cell(i + 17, 7)
        .string(note)
        .style({ border: borders });
    }
    checkindex = checkindex + 18;
    let totalQuantity = 0;
    let totalTotal = 0;
    let totalWeight = 0;

    for (let i = 0; i < checkindex; i++) {
      const quantity = parseInt(rowData[`quantity${i}`]) || 0;
      const total = parseInt(rowData[`total${i}`]) || 0;
      const weight = parseFloat(rowData[`weight${i}`]) || 0;

      totalQuantity += quantity;
      totalTotal += total;
      totalWeight += weight;
    }
    worksheet.cell(checkindex, 1).string("TỔNG");

    worksheet.cell(checkindex, 1, checkindex, 3, true).style({
      font: { bold: true },
      border: borders,
      alignment: { vertical: "center", horizontal: "center", wrapText: true },
    });
    worksheet
      .cell(checkindex, 4)
      .number(parseFloat(totalQuantity))
      .style({ font: { bold: true }, border: borders });
    worksheet
      .cell(checkindex, 5)
      .number(parseFloat(totalTotal))
      .style({ font: { bold: true }, border: borders });
    worksheet
      .cell(checkindex, 6)
      .number(parseFloat(totalWeight))
      .style({
        font: { bold: true },
        border: borders,
        numberFormat: "#,##0.000; (#,##0.000); -",
      });
    worksheet
      .cell(checkindex, 7)
      .style({ font: { bold: true }, border: borders });

    worksheet
      .cell(checkindex + 2, 1, checkindex + 2, 3, true)
      .string("Chứng nhận số hàng ghi trên là đúng");

    worksheet
      .cell(checkindex + 3, 1, checkindex + 3, 3, true)
      .string("Certified exact above mentioned number of packages");

    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, "0");
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const year = currentDate.getFullYear().toString();

    const dateString = `Cảng Sài Gòn, Ngày ${day} Tháng ${month} Năm ${year}`;

    worksheet
      .cell(checkindex + 4, 5, checkindex + 4, 7, true)
      .string(dateString)
      .style({
        alignment: { vertical: "center", horizontal: "center", wrapText: true },
      });

    worksheet
      .cell(checkindex + 5, 1, checkindex + 5, 3, true)
      .string("ĐẠI DIỆN CỦA TÀU")
      .style({
        alignment: {
          vertical: "center",
          horizontal: "center",
          wrapText: true,
        },
        font: { bold: true },
      });

    worksheet
      .cell(checkindex + 5, 5, checkindex + 5, 7, true)
      .string("ĐẠI DIỆN CỦA CẢNG")
      .style({
        alignment: {
          vertical: "center",
          horizontal: "center",
          wrapText: true,
        },
        font: { bold: true },
      });

    worksheet
      .cell(checkindex + 6, 1, checkindex + 6, 3, true)
      .string("Ship's Tallyman")
      .style({
        alignment: { vertical: "center", horizontal: "center", wrapText: true },
      });

    worksheet
      .cell(checkindex + 6, 5, checkindex + 6, 7, true)
      .string("Docks office representative")
      .style({
        alignment: { vertical: "center", horizontal: "center", wrapText: true },
      });

    worksheet
      .cell(checkindex + 7, 1, checkindex + 7, 3, true)
      .string("Họ và Tên")
      .style({
        alignment: { vertical: "center", horizontal: "center", wrapText: true },
      });

    worksheet
      .cell(checkindex + 7, 5, checkindex + 7, 7, true)
      .string("Họ và Tên")
      .style({
        alignment: { vertical: "center", horizontal: "center", wrapText: true },
      });

    worksheet
      .cell(checkindex + 8, 1, checkindex + 8, 3, true)
      .string("(Ký tên)")
      .style({
        alignment: { vertical: "center", horizontal: "center", wrapText: true },
      });

    worksheet
      .cell(checkindex + 8, 5, checkindex + 8, 7, true)
      .string("(Ký tên)")
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

    const fileName = `BC_NHAP_XUAT_TAU_${shipName
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
