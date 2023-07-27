var express = require("express");
var router = express.Router();
var auth = require("../../middlewares/authentication");
const ReportModel = require("../../models/Report_tau_module.js");
var xl = require("excel4node");
const excel = require("excel4node");
const moment = require("moment");

router.get("/", auth, async function (req, res, next) {
  res.loadContent("report/reportBerth", {});
});

router.get("/getData", auth, function (req, res, next) {
  ReportModel.loadDataBerth(req)
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      res.status(200).json({ error });
    });
});

router.get("/exportExcel", auth, async function (req, res, next) {
  try {
    var wb = new xl.Workbook();
    // Style cho phần header
    var styleHeader = wb.createStyle({
      fill: {
        type: "pattern",
        patternType: "solid",
        bgColor: "#0099FF",
        fgColor: "#0099FF",
      },
      font: {
        size: 12,
        bold: true,
      },
      alignment: {
        vertical: "center",
        horizontal: "center",
      },
      margins: {
        left: 55,
        right: 55,
      },
      border: {
        left: {
          style: "thin",
          color: "black",
        },
        right: {
          style: "thin",
          color: "black",
        },
        top: {
          style: "thin",
          color: "black",
        },
        bottom: {
          style: "thin",
          color: "black",
        },
        outline: false,
      },
    });
    // style cho phần tiêu đề cty
    var styleIntroduce = wb.createStyle({
      font: {
        size: 14,
        bold: true,
      },
      alignment: {
        vertical: "center",
        horizontal: "center",
      },
    });
    // style cho các cell
    var styleContain = wb.createStyle({
      font: {
        size: 10,
      },
      alignment: {
        vertical: "center",
        horizontal: "center",
      },
      border: {
        left: {
          style: "thin",
          color: "black",
        },
        right: {
          style: "thin",
          color: "black",
        },
        top: {
          style: "thin",
          color: "black",
        },
        bottom: {
          style: "thin",
          color: "black",
        },
        outline: false,
      },
      numberFormat: "#,##0.000; (#,##0.000); -",
    });
    var styleHeaderItalic = wb.createStyle({
      font: {
        size: 10,
        italics: true,
      },
      alignment: {
        vertical: "center",
        horizontal: "center",
      },
    });
    let result = await ReportModel.loadDataBerth(req);
    let data = result.iPayload;
    if (data?.length) {
      let dataExcel = data.map((item, index) => {
        return {
          STT: index + 1,
          VesselName: item.VesselName,
          NationName: item.NationName,
          InboundVoyage: item.InboundVoyage,
          OutboundVoyage: item.OutboundVoyage,
          BerthID: item.BerthID,
          BittID: item.BittID,
          McWeightIn: Number(item.McWeightIn).toFixed(3),
          ATB: item.ATB,
          ATD: item.ATD,
          TotalHours: Number(item.TotalHours).toFixed(3),
          CargoRemark: item.CargoRemark,
          JobModeRemark: item.JobModeRemark,
          DeviceRemark: item.DeviceRemark,
        };
      });
      let _column = [
        "STT",
        "Tên tàu",
        "Quốc tịch",
        "Chuyến nhập",
        "Chuyến xuất",
        "Cập bến",
        "Pit",
        "Trọng lượng hàng hoá",
        "ATB",
        "ATD",
        "Tổng thời gian xếp dỡ",
        "Hàng hóa",
        "Phương án xếp dỡ",
        "Phương tiện xếp dỡ",
      ];
      let ws = wb.addWorksheet("Sheet1");
      let _colIndexHeader = 1;
      _column.map((item, index) => {
        let idx = index + 1;
        ws.cell(9, _colIndexHeader++).string(item).style(styleHeader);
        switch (idx) {
          case 1:
            ws.column(idx).setWidth(15);
          case 3:
            ws.column(idx).setWidth(15);
          case 4:
            ws.column(idx).setWidth(15);
          case 5:
            ws.column(idx).setWidth(15);
            break;
          default:
            ws.column(idx).setWidth(25);
            break;
        }
      });
      ws.addImage({
        path: "public/assets/img/logos/logo-csg.png",
        type: "picture",
        position: {
          type: "twoCellAnchor",
          from: {
            col: 1,
            colOff: 0,
            row: 2,
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
      ws.cell(2, 5)
        .string("CN CÔNG TY CP CẢNG SÀI GÒN - CẢNG TÂN THUẬN")
        .style(styleIntroduce);
      ws.cell(3, 5)
        .string(
          "18B Lưu Trọng Lư, Phường Tân Thuận Đông, Quận 7, Thành Phố Hồ Chí Minh, Việt Nam"
        )
        .style(styleHeaderItalic);
      ws.cell(4, 5)
        .string("Điện thoại; (84) 028.3872.3569 - Fax: 028.3872.8447")
        .style(styleHeaderItalic);
      ws.cell(5, 5)
        .string("Email: cms@tanthuanport.vn")
        .style(styleHeaderItalic);
      let _rowIndex = 10;
      dataExcel.map((item) => {
        let _colIndex = 1;
        Object.keys(item).map((p) => {
          if (p == "McWeightIn" || p == "TotalHours") {
            ws.cell(_rowIndex, _colIndex++)
              .number(parseFloat(item[p]))
              .style(styleContain);
          } else {
            const cellValue = item[p] === null ? "" : item[p] + "";
            ws.cell(_rowIndex, _colIndex++)
              .string(cellValue)
              .style(styleContain);
          }
        });
        _rowIndex++;
      });
      let currentDate = new Date();
      let day = ("0" + currentDate.getDate()).slice(-2);
      let month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
      let year = currentDate.getFullYear();
      let hours = ("0" + currentDate.getHours()).slice(-2);
      let minutes = ("0" + currentDate.getMinutes()).slice(-2);
      let seconds = ("0" + currentDate.getSeconds()).slice(-2);
      let fileName =
        "BAOCAOKHAITHACCAUBEN" +
        "_" +
        day +
        month +
        year +
        "_" +
        hours +
        minutes +
        seconds +
        ".xlsx";
      wb.write(fileName, res);
    } else {
      res.status(200).json("Không có dữ liệu xuất excel!");
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/diary", auth, async function (req, res, next) {
  try {
    const { rowCount, ...itemData } = req.query;
    // console.log("dulieu", req.query);

    const wb = new excel.Workbook();
    for (var i = 0; i < rowCount; i++) {
      const vesselName = itemData[`vesselName${i}`] || "";
      const nationName = itemData[`nationName${i}`] || "";
      const inboundVoyage = itemData[`inboundVoyage${i}`] || "";
      const outboundVoyage = itemData[`outboundVoyage${i}`] || "";
      const berthID = itemData[`berthID${i}`] || "";
      const bittID = itemData[`bittID${i}`] || "";
      const mcWeightIn = parseFloat(itemData[`mcWeightIn${i}`]) || 0;
      const aTB = itemData[`aTB${i}`] || "";
      const aTD = itemData[`aTD${i}`] || "";
      const cargoRemark = itemData[`cargoRemark${i}`] || "";
      const jobModeRemark = itemData[`jobModeRemark${i}`] || "";
      const deviceRemark = itemData[`deviceRemark${i}`] || "";
      const loa = parseFloat(itemData[`loa${i}`]) || 0;
      const posFrom = parseFloat(itemData[`posFrom${i}`]) || 0;
      const sumloaFrom = loa + posFrom;
      const atw = itemData[`aTWD${i}`] || itemData[`aTWL${i}`] || "";
      const aTC = itemData[`aTCL${i}`] || itemData[`aTCD${i}`] || "";
      const alongSide = itemData[`alongSide${i}`] || "";
      const remark = itemData[`remark${i}`] || "";

      var sheetName = vesselName + "_" + inboundVoyage + "_" + outboundVoyage;
      const ws = wb.addWorksheet(sheetName);
      ws.column(1).setWidth(12); // Kích thước cho cột A
      ws.column(2).setWidth(10); // Kích thước cho cột B
      ws.column(3).setWidth(9); // Kích thước cho cột C
      ws.column(4).setWidth(9); // Kích thước cho cột D
      ws.column(5).setWidth(18); // Kích thước cho cột E
      ws.column(6).setWidth(9); // Kích thước cho cột F
      ws.column(7).setWidth(10); // Kích thước cho cột G
      ws.column(8).setWidth(16); // Kích thước cho cột H
      ws.column(9).setWidth(20); // Kích thước cho cột I
      ws.column(10).setWidth(20); // Kích thước cho cột J
      ws.column(11).setWidth(9); // Kích thước cho cột K
      ws.column(12).setWidth(9); // Kích thước cho cột L

      ws.cell(1, 1)
        .string("CÔNG TY CỔ PHẦN CẢNG SÀI GÒN")
        .style({
          font: {
            name: "Times New Roman",
            size: 12,
            bold: true,
          },
          alignment: { vertical: "center", horizontal: "center" },
        });
      ws.cell(1, 1, 1, 4, true);
      ws.cell(1, 8)
        .string("CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM")
        .style({
          font: {
            name: "Times New Roman",
            size: 12,
          },
          alignment: { vertical: "center", horizontal: "center" },
        });
      ws.cell(1, 8, 1, 12, true);
      ws.cell(2, 8)
        .string("Độc Lập - Tự Do - Hạnh Phúc")
        .style({
          font: {
            name: "Times New Roman",
            size: 12,
            underline: true,
          },
          alignment: { vertical: "center", horizontal: "center" },
        });
      ws.cell(2, 8, 2, 12, true);

      ws.cell(4, 1)
        .string("NHẬT KÝ KHAI THÁC CẦU CẢNG - BẾN PHAO")
        .style({
          font: {
            name: "Times New Roman",
            size: 14,
            bold: true,
          },
          alignment: { vertical: "center", horizontal: "center" },
        });
      ws.cell(4, 1, 4, 12, true);

      ws.cell(6, 1, 7, 1, true)
        .string("1.Tên Tàu :")
        .style({
          alignment: { vertical: "center" },
          font: {
            name: "Times New Roman",
            size: 12,
            bold: true,
          },
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          border: {
            top: {
              style: "double", // Kiểu định dạng kép (double) cho border trên
              color: "black",
            },
            bottom: {
              style: "thin",
              color: "black",
            },
            left: {
              style: "double", // Kiểu định dạng kép (double) cho border bên trái
              color: "black",
            },
          },
        });
      ws.cell(6, 2, 7, 4, true)
        .string(vesselName)
        .style({
          alignment: { vertical: "center" },
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
          },
          border: {
            top: {
              style: "double", // Kiểu định dạng kép (double) cho border trên
              color: "black",
            },
            bottom: {
              style: "thin",
              color: "black",
            },
            right: {
              style: "thin", // Kiểu định dạng kép (double) cho border bên phải
              color: "black",
            },
          },
        });
      ws.cell(6, 5, 7, 5, true)
        .string("Quốc tịch :")
        .style({
          alignment: { vertical: "center" },
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
          },
          border: {
            top: {
              style: "double",
              color: "black",
            },
            left: {
              style: "thin",
              color: "black",
            },
            bottom: {
              style: "thin",
              color: "black",
            },
          },
        });
      ws.cell(6, 6, 7, 8, true)
        .string(nationName)
        .style({
          alignment: { vertical: "center" },
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
          },
          border: {
            top: {
              style: "double",
              color: "black",
            },
            bottom: {
              style: "thin",
              color: "black",
            },
            right: {
              style: "thin",
              color: "black",
            },
          },
        });
      ws.cell(6, 9, 7, 9, true)
        .string("Đại lý :")
        .style({
          alignment: { vertical: "center" },
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
          },
          border: {
            top: {
              style: "double",
              color: "black",
            },
            bottom: {
              style: "thin",
              color: "black",
            },
            left: {
              style: "thin",
              color: "black",
            },
          },
        });
      ws.cell(6, 10, 7, 12, true)
        .string("")
        .style({
          alignment: { vertical: "center" },
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
          },
          border: {
            top: {
              style: "double",
              color: "black",
            },
            bottom: {
              style: "thin",
              color: "black",
            },
            right: {
              style: "double",
              color: "black",
            },
          },
        });

      ws.cell(8, 1, 13, 1, true)
        .string("2.Thông số :")
        .style({
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
            bold: true,
          },
          alignment: {
            vertical: "center",
          },
          border: {
            left: {
              style: "double",
              color: "black",
            },
            right: {
              style: "thin",
              color: "black",
            },
            bottom: {
              style: "thin",
              color: "black",
            },
          },
        });
      ws.cell(8, 2, 9, 2, true)
        .string("DWT")
        .style({
          alignment: { vertical: "center" },
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
          },
        });
      ws.cell(10, 2, 13, 2, true)
        .string("GT")
        .style({
          alignment: { vertical: "center" },
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
          },
          alignment: {
            vertical: "center",
          },
          border: {
            bottom: {
              style: "thin",
              color: "black",
            },
          },
        });
      ws.cell(8, 3, 9, 3, true)
        .string("L :")
        .style({
          alignment: { vertical: "center" },
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
          },
        });
      ws.cell(8, 4, 9, 4, true)
        .string("")
        .style({
          alignment: { vertical: "center" },
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
          },
          border: {
            right: {
              style: "thin",
              color: "black",
            },
          },
        });
      ws.cell(10, 3, 11, 3, true)
        .string("B :")
        .style({
          alignment: { vertical: "center" },
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
          },
        });
      ws.cell(10, 4, 11, 4, true)
        .string("")
        .style({
          alignment: { vertical: "center" },
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
          },
          border: {
            right: {
              style: "thin",
              color: "black",
            },
          },
        });
      ws.cell(12, 3, 13, 3, true)
        .string("H :")
        .style({
          alignment: { vertical: "center" },
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
          },
          border: {
            bottom: {
              style: "thin",
              color: "black",
            },
          },
        });
      ws.cell(12, 4, 13, 4, true)
        .string("")
        .style({
          alignment: { vertical: "center" },
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
          },
          border: {
            bottom: {
              style: "thin",
              color: "black",
            },
            right: {
              style: "thin",
              color: "black",
            },
          },
        });
      ws.cell(8, 5, 10, 5, true)
        .string("Mớm nước đến :")
        .style({
          alignment: { vertical: "center" },
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
          },
        });
      ws.cell(8, 6, 10, 6, true)
        .string("")
        .style({
          alignment: { vertical: "center" },
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
          },
          border: {
            right: {
              style: "thin",
              color: "black",
            },
          },
        });

      ws.cell(11, 5, 13, 5, true)
        .string("Lượng chiếm nước :")
        .style({
          alignment: { vertical: "center" },
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
          },
          border: {
            bottom: {
              style: "thin",
              color: "black",
            },
          },
        });
      ws.cell(11, 6, 13, 6, true)
        .string("")
        .style({
          alignment: { vertical: "center" },
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
          },
          border: {
            right: {
              style: "thin",
              color: "black",
            },
            bottom: {
              style: "thin",
              color: "black",
            },
          },
        });
      ws.cell(8, 7, 13, 7, true)
        .string("Hàng Hóa :")
        .style({
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
          },
          alignment: {
            vertical: "center",
          },
          border: {
            bottom: {
              style: "thin",
              color: "black",
            },
          },
        });
      ws.cell(8, 8, 13, 8, true)
        .string(cargoRemark)
        .style({
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          alignment: {
            wrapText: true,
            vertical: "center",
          },
          font: {
            name: "Times New Roman",
            size: 12,
          },
          border: {
            right: {
              style: "thin",
              color: "black",
            },
            bottom: {
              style: "thin",
              color: "black",
            },
          },
        });
      ws.cell(8, 9, 13, 9, true)
        .string("Phương án :")
        .style({
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
          },
          alignment: {
            vertical: "center",
          },
          border: {
            bottom: {
              style: "thin",
              color: "black",
            },
          },
        });
      ws.cell(8, 10, 13, 10, true)
        .string(jobModeRemark)
        .style({
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          alignment: {
            wrapText: true,
            vertical: "center",
          },
          font: {
            name: "Times New Roman",
            size: 12,
          },
          border: {
            right: {
              style: "thin",
              color: "black",
            },
            bottom: {
              style: "thin",
              color: "black",
            },
          },
        });
      ws.cell(8, 11, 9, 11, true)
        .string("N")
        .style({
          alignment: { vertical: "center" },
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
          },
          alignment: {
            vertical: "center",
            horizontal: "center",
          },
          border: {
            bottom: {
              style: "thin",
              color: "black",
            },
          },
        });
      ws.cell(8, 12, 9, 12, true)
        .string("X")
        .style({
          alignment: { vertical: "center" },
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
          },
          alignment: {
            vertical: "center",
            horizontal: "center",
          },
          border: {
            right: {
              style: "double",
              color: "black",
            },
            left: {
              style: "thin",
              color: "black",
            },
            bottom: {
              style: "thin",
              color: "black",
            },
          },
        });
      ws.cell(10, 11, 13, 11, true)
        .string("")
        .style({
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 18,
          },
          alignment: {
            vertical: "center",
            horizontal: "center",
          },
          border: {
            right: {
              style: "thin",
              color: "black",
            },
            bottom: {
              style: "thin",
              color: "black",
            },
          },
        });
      ws.cell(10, 12, 13, 12, true)
        .string("")
        .style({
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 18,
          },
          alignment: {
            vertical: "center",
            horizontal: "center",
          },
          border: {
            right: {
              style: "double",
              color: "black",
            },
            left: {
              style: "thin",
              color: "black",
            },
            top: {
              style: "thin",
              color: "black",
            },
            bottom: {
              style: "thin",
              color: "black",
            },
          },
        });

      ws.cell(14, 1, 15, 4, true)
        .string("3. Cập cầu :")
        .style({
          alignment: { vertical: "center" },
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
            bold: true,
          },
          border: {
            right: {
              style: "thin",
              color: "black",
            },
            left: {
              style: "double",
              color: "black",
            },
            bottom: {
              style: "thin",
              color: "black",
            },
          },
        });
      ws.cell(14, 5, 15, 12, true)
        .string(aTB)
        .style({
          alignment: { vertical: "center" },
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
          },
          border: {
            right: {
              style: "double",
              color: "black",
            },
            bottom: {
              style: "thin",
              color: "black",
            },
          },
        });

      ws.cell(16, 1, 17, 1, true)
        .string("Vị trí :")
        .style({
          alignment: { vertical: "center" },
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
          },
          border: {
            left: {
              style: "double",
              color: "black",
            },
            bottom: {
              style: "thin",
              color: "black",
            },
          },
        });
      ws.cell(16, 2, 17, 4, true)
        .string(berthID)
        .style({
          alignment: { vertical: "center" },
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
          },
          border: {
            bottom: {
              style: "thin",
              color: "black",
            },
            right: {
              style: "thin",
              color: "black",
            },
          },
        });
      ws.cell(16, 5, 17, 5, true)
        .string("Từ(m) :")
        .style({
          alignment: { vertical: "center" },
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
          },
          border: {
            bottom: {
              style: "thin",
              color: "black",
            },
          },
        });
      ws.cell(16, 6, 17, 6, true)
        .number(posFrom)
        .style({
          numberFormat: "#,##0.000; (#,##0.000); -",
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
          },
          alignment: { vertical: "center", horizontal: "left" },
          border: {
            bottom: {
              style: "thin",
              color: "black",
            },
            right: {
              style: "thin",
              color: "black",
            },
          },
        });
      ws.cell(16, 7, 17, 7, true)
        .string("Đến(m) :")
        .style({
          alignment: { vertical: "center" },
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
          },
          border: {
            bottom: {
              style: "thin",
              color: "black",
            },
          },
        });
      ws.cell(16, 8, 17, 8, true)
        .number(sumloaFrom)
        .style({
          numberFormat: "#,##0.000; (#,##0.000); -",
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
          },
          alignment: { vertical: "center", horizontal: "left" },
          border: {
            bottom: {
              style: "thin",
              color: "black",
            },
            right: {
              style: "thin",
              color: "black",
            },
          },
        });
      ws.cell(16, 9, 17, 9, true)
        .string("Pit :")
        .style({
          alignment: { vertical: "center" },
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
          },
          border: {
            bottom: {
              style: "thin",
              color: "black",
            },
          },
        });
      ws.cell(16, 10, 17, 10, true)
        .string(bittID)
        .style({
          alignment: { vertical: "center" },
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
          },
          border: {
            bottom: {
              style: "thin",
              color: "black",
            },
            right: {
              style: "thin",
              color: "black",
            },
          },
        });
      ws.cell(16, 11, 17, 11, true)
        .string("Đến :")
        .style({
          alignment: { vertical: "center" },
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
          },
          border: {
            bottom: {
              style: "thin",
              color: "black",
            },
          },
        });
      ws.cell(16, 12, 17, 12, true)
        .string("")
        .style({
          alignment: { vertical: "center" },
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
          },
          border: {
            right: {
              style: "double",
              color: "black",
            },
            bottom: {
              style: "thin",
              color: "black",
            },
          },
        });

      ws.cell(18, 1, 19, 2, true)
        .string("Thao tác cập :")
        .style({
          alignment: { vertical: "center" },
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
          },
          border: {
            left: {
              style: "double",
              color: "black",
            },
            bottom: {
              style: "thin",
              color: "black",
            },
          },
        });
      ws.cell(18, 3, 19, 4, true)
        .string("")
        .style({
          alignment: { vertical: "center" },
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
          },
          border: {
            bottom: {
              style: "thin",
              color: "black",
            },
            right: {
              style: "thin",
              color: "black",
            },
          },
        });
      ws.cell(18, 5, 19, 5, true)
        .string("Góc cập :")
        .style({
          alignment: { vertical: "center" },
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
          },
          border: {
            bottom: {
              style: "thin",
              color: "black",
            },
          },
        });
      ws.cell(18, 6, 19, 6, true)
        .string("")
        .style({
          alignment: { vertical: "center" },
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
          },
          border: {
            bottom: {
              style: "thin",
              color: "black",
            },
            right: {
              style: "thin",
              color: "black",
            },
          },
        });
      ws.cell(18, 7, 19, 8, true)
        .string("Tốc độ pháp tuyến :")
        .style({
          alignment: { vertical: "center" },
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
          },
          border: {
            bottom: {
              style: "thin",
              color: "black",
            },
          },
        });
      ws.cell(18, 9, 19, 9, true)
        .string("")
        .style({
          alignment: { vertical: "center" },
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
          },
          border: {
            bottom: {
              style: "thin",
              color: "black",
            },
            right: {
              style: "thin",
              color: "black",
            },
          },
        });
      ws.cell(18, 10, 19, 11, true)
        .string("Cập mạn :" + " " + alongSide)
        .style({
          alignment: { vertical: "center" },
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
          },
          border: {
            bottom: {
              style: "thin",
              color: "black",
            },
          },
        });
      ws.cell(18, 12, 19, 12, true)
        .string("")
        .style({
          alignment: { vertical: "center" },
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
          },
          border: {
            right: {
              style: "double",
              color: "black",
            },
            bottom: {
              style: "thin",
              color: "black",
            },
          },
        });

      ws.cell(20, 1, 21, 1, true)
        .string("Bố trí dây :")
        .style({
          alignment: { vertical: "center" },
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
          },
          border: {
            right: {
              style: "thin",
              color: "black",
            },
            left: {
              style: "double",
              color: "black",
            },
            bottom: {
              style: "thin",
              color: "black",
            },
          },
        });
      ws.cell(20, 2, 21, 2, true)
        .string("Dọc mũi :")
        .style({
          alignment: { vertical: "center" },
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
          },
          border: {
            bottom: {
              style: "thin",
              color: "black",
            },
          },
        });
      ws.cell(20, 3, 21, 4, true)
        .string("")
        .style({
          alignment: { vertical: "center" },
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
          },
          border: {
            bottom: {
              style: "thin",
              color: "black",
            },
            right: {
              style: "thin",
              color: "black",
            },
          },
        });
      ws.cell(20, 5, 21, 5, true)
        .string("Dọc lái :")
        .style({
          alignment: { vertical: "center" },
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
          },
          border: {
            bottom: {
              style: "thin",
              color: "black",
            },
          },
        });
      ws.cell(20, 6, 21, 7, true)
        .string("")
        .style({
          alignment: { vertical: "center" },
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
          },
          border: {
            bottom: {
              style: "thin",
              color: "black",
            },
            right: {
              style: "thin",
              color: "black",
            },
          },
        });
      ws.cell(20, 8, 21, 8, true)
        .string("Chéo mũi :")
        .style({
          alignment: { vertical: "center" },
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
          },
          border: {
            bottom: {
              style: "thin",
              color: "black",
            },
          },
        });
      ws.cell(20, 9, 21, 9, true)
        .string("")
        .style({
          alignment: { vertical: "center" },
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
          },
          border: {
            bottom: {
              style: "thin",
              color: "black",
            },
            right: {
              style: "thin",
              color: "black",
            },
          },
        });
      ws.cell(20, 10, 21, 11, true)
        .string("Chéo lái :")
        .style({
          alignment: { vertical: "center" },
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
          },
          border: {
            bottom: {
              style: "thin",
              color: "black",
            },
          },
        });
      ws.cell(20, 12, 21, 12, true)
        .string("")
        .style({
          alignment: { vertical: "center" },
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
          },
          border: {
            right: {
              style: "double",
              color: "black",
            },
            bottom: {
              style: "thin",
              color: "black",
            },
          },
        });

      ws.cell(22, 1, 25, 2, true)
        .string("4. Điều kiện thủy văn")
        .style({
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          alignment: {
            vertical: "center",
          },
          font: {
            name: "Times New Roman",
            size: 12,
            bold: true,
          },
          border: {
            right: {
              style: "thin",
              color: "black",
            },
            left: {
              style: "double",
              color: "black",
            },
            bottom: {
              style: "thin",
              color: "black",
            },
          },
        });
      ws.cell(22, 3, 25, 3, true)
        .string("Thời tiết :")
        .style({
          alignment: {
            vertical: "center",
          },
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
          },
          border: {
            bottom: {
              style: "thin",
              color: "black",
            },
          },
        });
      ws.cell(22, 4, 25, 4, true)
        .string("")
        .style({
          alignment: { vertical: "center" },
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
          },
          border: {
            bottom: {
              style: "thin",
              color: "black",
            },
            right: {
              style: "thin",
              color: "black",
            },
          },
        });
      ws.cell(22, 5, 23, 5, true)
        .string("Vận tốc gió :")
        .style({
          alignment: { vertical: "center" },
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
          },
          border: {
            bottom: {
              style: "thin",
              color: "black",
            },
          },
        });
      ws.cell(22, 6, 23, 6, true)
        .string("")
        .style({
          alignment: { vertical: "center" },
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
          },
          border: {
            bottom: {
              style: "thin",
              color: "black",
            },
            right: {
              style: "thin",
              color: "black",
            },
          },
        });
      ws.cell(22, 7, 23, 8, true)
        .string("Vận tốc dòng chảy :")
        .style({
          alignment: { vertical: "center" },
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
          },
          border: {
            bottom: {
              style: "thin",
              color: "black",
            },
          },
        });
      ws.cell(22, 9, 23, 9, true)
        .string("")
        .style({
          alignment: { vertical: "center" },
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
          },
          border: {
            bottom: {
              style: "thin",
              color: "black",
            },
            right: {
              style: "thin",
              color: "black",
            },
          },
        });
      ws.cell(22, 10, 23, 11, true)
        .string("Thủy triều :")
        .style({
          alignment: { vertical: "center" },
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
          },
          border: {
            bottom: {
              style: "thin",
              color: "black",
            },
          },
        });
      ws.cell(22, 12, 23, 12, true)
        .string("")
        .style({
          alignment: { vertical: "center" },
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
          },
          border: {
            right: {
              style: "double",
              color: "black",
            },
            bottom: {
              style: "thin",
              color: "black",
            },
          },
        });

      ws.cell(24, 5, 25, 12, true)
        .string(
          "tham khảo trang web https://nchmf.gov.vn/Kttvsite/vi-VN/1/hai-van-22-15.html"
        )
        .style({
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          alignment: { vertical: "center", horizontal: "center" },
          font: {
            name: "Times New Roman",
            size: 12,
            bold: true,
          },
          border: {
            right: {
              style: "double",
              color: "black",
            },
            bottom: {
              style: "thin",
              color: "black",
            },
          },
        });

      ws.cell(26, 1, 27, 2, true)
        .string("5. Thời gian làm hàng")
        .style({
          alignment: { vertical: "center" },
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
            bold: true,
          },
          border: {
            right: {
              style: "thin",
              color: "black",
            },
            left: {
              style: "double",
              color: "black",
            },
            bottom: {
              style: "thin",
              color: "black",
            },
          },
        });
      ws.cell(26, 3, 27, 4, true)
        .string("Ngày bắt đầu :")
        .style({
          alignment: { vertical: "center" },
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
          },
          border: {
            bottom: {
              style: "thin",
              color: "black",
            },
          },
        });
      ws.cell(26, 5, 27, 7, true)
        .string(atw)
        .style({
          alignment: { vertical: "center" },
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
          },
          border: {
            bottom: {
              style: "thin",
              color: "black",
            },
            right: {
              style: "thin",
              color: "black",
            },
          },
        });
      ws.cell(26, 8, 27, 8, true)
        .string("Ngày kết thúc :")
        .style({
          alignment: { vertical: "center" },
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
          },
          border: {
            bottom: {
              style: "thin",
              color: "black",
            },
          },
        });
      ws.cell(26, 9, 27, 12, true)
        .string(aTC)
        .style({
          alignment: { vertical: "center" },
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
          },
          border: {
            right: {
              style: "double",
              color: "black",
            },
            bottom: {
              style: "thin",
              color: "black",
            },
          },
        });

      ws.cell(28, 1, 29, 2, true)
        .string("6. Rời cầu :")
        .style({
          alignment: { vertical: "center" },
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
            bold: true,
          },
          border: {
            right: {
              style: "thin",
              color: "black",
            },
            left: {
              style: "double",
              color: "black",
            },
            bottom: {
              style: "thin",
              color: "black",
            },
          },
        });
      ws.cell(28, 3, 29, 12, true)
        .string(aTD)
        .style({
          alignment: { vertical: "center" },
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
          },
          border: {
            right: {
              style: "double",
              color: "black",
            },
            bottom: {
              style: "thin",
              color: "black",
            },
          },
        });

      ws.cell(30, 1, 35, 12, true)
        .string("7. Phương tiện xếp dỡ :" + "\n" + deviceRemark)
        .style({
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
            bold: true,
          },
          alignment: {
            vertical: "top",
            wrapText: true,
          },
          border: {
            right: {
              style: "double",
              color: "black",
            },
            left: {
              style: "double",
              color: "black",
            },
            bottom: {
              style: "thin",
              color: "black",
            },
          },
        });

      ws.cell(36, 1, 41, 12, true)
        .string("8.Ghi chú :" + "\n" + remark)
        .style({
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffffff",
            fgColor: "#ffffff",
          },
          font: {
            name: "Times New Roman",
            size: 12,
            bold: true,
          },
          alignment: {
            vertical: "top",
            wrapText: true,
          },
          border: {
            right: {
              style: "double",
              color: "black",
            },
            left: {
              style: "double",
              color: "black",
            },
            bottom: {
              style: "double",
              color: "black",
            },
          },
        });

      const currentDates = new Date();
      const days = currentDates.getDate().toString().padStart(2, "0");
      const months = (currentDates.getMonth() + 1).toString().padStart(2, "0");
      const years = currentDates.getFullYear().toString();
      const dateString = `Cảng Sài Gòn, Ngày ${days} Tháng ${months} Năm ${years}`;

      ws.cell(43, 8, 43, 12, true)
        .string(dateString)
        .style({
          font: {
            name: "Times New Roman",
            size: 12,
            bold: true,
          },
          alignment: { vertical: "center", horizontal: "center" },
        });
      ws.cell(44, 8, 44, 12, true)
        .string("Trực Ban")
        .style({
          font: {
            name: "Times New Roman",
            size: 12,
            bold: true,
          },
          alignment: { vertical: "center", horizontal: "center" },
        });

      ws.cell(48, 1)
        .string("Giải thích ")
        .style({
          font: {
            name: "Times New Roman",
            size: 12,
            bold: true,
          },
        });
      ws.cell(49, 1, 62, 12, true)
        .string(
          "(1) Tên Tàu: tên phương tiện thủy cập vào cầu cảng, bến phao\n(2) Thông số: Các thông số cơ bản của phương tiện thủy: chiều dài, chiều rộng, chiều cao mạn, dung tích toàn phần, chiều cao, mớn nước lúc đến, lượng chiếm nước. Hàng hóa phương tiện chuyên chở thời điểm cập cầu để xếp dỡ, phương án làm hàng của phương tiện.\n(3) Cập cầu: thời gian cập, vị trí cập: vị trí trên sơ đồ cầu bến, các thao tác để tàu cập bến an toàn, cách bố trí dây phù hợp\n- Góc cập: Góc tạo giữa trục tàu với tuyến mép cầu cảng, trực ban sẽ tham khảo ý kiến hoa tiêu hoặc thuyền trưởng để ghi chép\n- Tốc độ pháp tuyến (m/s) : tốc độ của tàu trong quá trình cập cầu, trực ban sẽ tham khảo ý kiến hoa tiêu hoặc thuyền trưởng để ghi chép\n(4): Điều kiện thủy văn: Tình trạng thời tiết lúc tàu vào cầu\n- Vận tốc gió(km/h): Vận gió thời điểm tàu cập, ghi chép theo dự báo khí tượng thủy văn của thời điểm cập tàu\n- Vận tốc dòng chảy (m/s): Vận tốc dòng chảy thời điểm tàu cập, ghi chép theo dự báo khí tượng thủy văn hoặc tham khảo ý kiến hoa tiêu\nĐề xuất: Nên nghiên cứu và trang bị hệ thống đo vận tốc dòng chảy\n(5) Thời gian làm hàng: thời gian tàu bắt đầu  và kết thúc quá trình xếp dỡ\n(6) Thời gian tàu rời khỏi bến cảng, bến phao\n(7) Phương tiện xếp dỡ làm hàng:các phương tiện, thiết bị  tham gia quá trình xếp dỡ\n(8) Ghi chú: Các phát sinh ( nếu có) trong quá trình khai thác ."
        )
        .style({
          alignment: {
            wrapText: true,
          },
          font: {
            name: "Times New Roman",
            size: 12,
          },
        });
    }

    let currentDate = new Date();
    let day = ("0" + currentDate.getDate()).slice(-2);
    let month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
    let year = currentDate.getFullYear();
    let hours = ("0" + currentDate.getHours()).slice(-2);
    let minutes = ("0" + currentDate.getMinutes()).slice(-2);
    let seconds = ("0" + currentDate.getSeconds()).slice(-2);
    let fileName =
      "NHATKYKHAITHACCAUBEN" +
      "_" +
      day +
      month +
      year +
      "_" +
      hours +
      minutes +
      seconds +
      ".xlsx";
    wb.write(fileName, res);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
