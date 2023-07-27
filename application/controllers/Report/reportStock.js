var express = require("express");
var router = express.Router();
var auth = require("../../middlewares/authentication");
const ReportModel = require("../../models/Report_tau_module.js");
var xl = require("excel4node");

router.get("/", auth, async function (req, res, next) {
    res.loadContent("report/reportStock", {});
});

router.get("/getData", auth, function (req, res, next) {
    ReportModel.loadDataStock(req)
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
                bold: true,
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
        var styleContainLeft = wb.createStyle({
            font: {
                size: 10,
                bold: true,
            },
            alignment: {
                vertical: "center",
                horizontal: "left",
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
        var styleInTotal = wb.createStyle({
            font: {
                color: "red",
                size: 12,
                bold: true,
            },
            alignment: {
                vertical: "center",
                horizontal: "center",
            },
            numberFormat: "#,##0.000; (#,##0.000); -",
        });
        var styleInTotalLeft = wb.createStyle({
            font: {
                color: "red",
                size: 12,
                bold: true,
            },
            alignment: {
                vertical: "center",
                horizontal: "left",
            },
        });
        var styleInTotalLarge = wb.createStyle({
            font: {
                color: "red",
                size: 15,
                bold: true,
            },
            alignment: {
                vertical: "center",
                horizontal: "center",
            },
            numberFormat: "#,##0.000; (#,##0.000); -",
        });
        var styleInTotalLargeLeft = wb.createStyle({
            font: {
                color: "red",
                size: 15,
                bold: true,
            },
            alignment: {
                vertical: "center",
                horizontal: "left",
            },
        });
        let result = await ReportModel.loadDataStock(req);
        let data = result.iPayload;
        let sumWeightInGlobal = 0;
        let sumWeightInLocal = 0;
        let sumWeightOutGlobal = 0;
        let sumWeightOutLocal = 0;
        let sumTotal = 0;
        if (data?.length) {
            sumWeightInGlobal = data.filter(p => p.ClassID === 'Nhập' && p.IsLocalForeign === 'Ngoại').reduce(function (sum, itm) {
                return parseFloat(sum) + parseFloat(itm.McWeight);
            }, 0);
            sumWeightInLocal = data.filter(p => p.ClassID === 'Nhập' && p.IsLocalForeign === 'Nội').reduce(function (sum, itm) {
                return parseFloat(sum) + parseFloat(itm.McWeight);
            }, 0);
            sumWeightOutGlobal = data.filter(p => p.ClassID === 'Xuất' && p.IsLocalForeign === 'Ngoại').reduce(function (sum, itm) {
                return parseFloat(sum) + parseFloat(itm.McWeight);
            }, 0);
            sumWeightOutLocal = data.filter(p => p.ClassID === 'Xuất' && p.IsLocalForeign === 'Nội').reduce(function (sum, itm) {
                return parseFloat(sum) + parseFloat(itm.McWeight);
            }, 0);
            sumTotal = (sumWeightInGlobal + sumWeightInLocal + sumWeightOutGlobal + sumWeightOutLocal);
            let dataExcel = data.map((item, index) => {
                return {
                    STT: index + 1,
                    Block: item.Block,
                    ClassID: item.ClassID,
                    VesselName: item.VesselName,
                    InboundVoyage: item.InboundVoyage,
                    OutboundVoyage: item.OutboundVoyage,
                    GetIn: item.GetIn,
                    BBNo: item.BBNo,
                    CusID: item.CusID,
                    CusName: item.CusName,
                    ItemID: item.ItemID,
                    CargoTypeName: item.CargoTypeName,
                    UnitName: item.UnitName,
                    mnfQuantity: Number(item.mnfQuantity).toFixed(3),
                    CargoWeight: Number(item.CargoWeight).toFixed(3),
                    stQuantity: Number(item.stQuantity).toFixed(3),
                    McWeight: Number(item.McWeight).toFixed(3),
                    IsLocalForeign: item.IsLocalForeign,
                    TLHQ: item.TLHQ,
                    Note: item.Note,
                };
            });
            let _column = ["STT", "Vị trí", "Hướng", "Tên tàu", "Chuyến nhập", "Chuyến xuất", "Ngày nhập kho", "Số vận đơn/booking", "Mã khách hàng", "Chủ hàng", "Mã hàng hoá", "Loại hàng", "Đơn vị tính", "Số lượng MNF", "Trọng lượng MNF", "Số lượng tồn", "Trọng lượng tồn", "Nội/Ngoại", "Thanh lý hải quan", "Ghi chú"];
            let ws = wb.addWorksheet("Sheet1");
            let _colIndexHeader = 1;
            _column.map((item, index) => {
                let idx = index + 1;
                ws.cell(9, _colIndexHeader++).string(item).style(styleHeader);
                switch (idx) {
                    case 1:
                        ws.column(idx).setWidth(15);
                    case 2:
                        ws.column(idx).setWidth(15);
                    case 3:
                        ws.column(idx).setWidth(15);
                    case 5:
                        ws.column(idx).setWidth(15);
                    case 6:
                        ws.column(idx).setWidth(15);
                    case 11:
                        ws.column(idx).setWidth(15);
                    case 12:
                        ws.column(idx).setWidth(15);
                    case 13:
                        ws.column(idx).setWidth(15);
                    case 14:
                        ws.column(idx).setWidth(15);
                    case 15:
                        ws.column(idx).setWidth(15);
                    case 16:
                        ws.column(idx).setWidth(15);
                    case 17:
                        ws.column(idx).setWidth(15);
                    case 18:
                        ws.column(idx).setWidth(15); break;
                    case 10:
                        ws.column(idx).setWidth(40);
                    case 20:
                        ws.column(idx).setWidth(40); break;
                    default:
                        ws.column(idx).setWidth(25); break;
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
            ws.cell(2, 10).string("CN CÔNG TY CP CẢNG SÀI GÒN - CẢNG TÂN THUẬN").style(styleIntroduce);
            ws.cell(3, 10).string("18B Lưu Trọng Lư, Phường Tân Thuận Đông, Quận 7, Thành Phố Hồ Chí Minh, Việt Nam").style(styleHeaderItalic);
            ws.cell(4, 10).string("Điện thoại; (84) 028.3872.3569 - Fax: 028.3872.8447").style(styleHeaderItalic);
            ws.cell(5, 10).string("Email: cms@tanthuanport.vn").style(styleHeaderItalic);
            let _rowIndex = 10;
            let _chkIndex = 0;
            dataExcel.map((item, index) => {
                let _colIndex = 1;
                _chkIndex = index + 1;
                Object.keys(item).map(p => {
                    if (p == 'mnfQuantity' || p == 'CargoWeight' || p == 'stQuantity' || p == 'McWeight') {
                        ws.cell(_rowIndex, _colIndex++).number(parseFloat(item[p])).style(styleContain);
                    } else if (p == 'CusName') {
                        ws.cell(_rowIndex, _colIndex++).string(item[p] + "").style(styleContainLeft);
                    } else {
                        ws.cell(_rowIndex, _colIndex++).string(item[p] + "").style(styleContain);
                    }
                });
                _rowIndex++;
            });
            //Thoilc(*Note)-Sum totald 
            _chkIndex += 10;
            ws.cell(_chkIndex, 17).number(parseFloat(sumWeightInGlobal)).style(styleInTotal);
            ws.cell(_chkIndex, 15).string("Hàng nhập ngoại:").style(styleInTotalLeft);
            ws.cell(_chkIndex + 1, 17).number(parseFloat(sumWeightInLocal)).style(styleInTotal);
            ws.cell(_chkIndex + 1, 15).string("Hàng nhập nội:").style(styleInTotalLeft);
            ws.cell(_chkIndex + 2, 17).number(parseFloat(sumWeightOutGlobal)).style(styleInTotal);
            ws.cell(_chkIndex + 2, 15).string("Hàng xuất ngoại:").style(styleInTotalLeft);
            ws.cell(_chkIndex + 3, 17).number(parseFloat(sumWeightOutLocal)).style(styleInTotal);
            ws.cell(_chkIndex + 3, 15).string("Hàng xuất nội:").style(styleInTotalLeft);
            ws.cell(_chkIndex + 4, 17).number(parseFloat(sumTotal)).style(styleInTotalLarge);
            ws.cell(_chkIndex + 4, 15).string("T/c tồn:").style(styleInTotalLargeLeft);
            let currentDate = new Date();
            let day = ("0" + currentDate.getDate()).slice(-2);
            let month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
            let year = currentDate.getFullYear();
            let hours = ("0" + currentDate.getHours()).slice(-2);
            let minutes = ("0" + currentDate.getMinutes()).slice(-2);
            let seconds = ("0" + currentDate.getSeconds()).slice(-2);
            let fileName = "BAOCAOTONKHOBAI" + "_" + day + month + year + "_" + hours + minutes + seconds + ".xlsx";
            wb.write(fileName, res);
        } else {
            res.status(200).json("Không có dữ liệu xuất excel!");
        }
    } catch (error) {
        console.log(error);
    }
});
module.exports = router;