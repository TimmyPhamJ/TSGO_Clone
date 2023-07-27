const { gtosglobal } = require("../config/database");

exports.getMenu = async (groupId, TerminalId) => {
  var menu_r = {};
  if (groupId == "GroupAdmin") {
    var menus =
      (await gtosglobal("SA_MENU")
        .select("MenuID", "MenuName", "MenuIcon", "ParentCode")
        .where({
          ParentCode: null,
          //TerminalCode: global.getSession().TerminalCode,
          IsVisible: 1,
        })
        .orderBy("OrderBy", "ASC")
        .catch((error) => console.log(error))) || [];

    for await (let menu of menus) {
      menu_r[menu["MenuID"]] = {
        MenuID: menu["MenuID"],
        MenuName: menu["MenuName"],
        MenuIcon: menu["MenuIcon"],
      };

      let submenus = await getSubMenu(menu["MenuID"], groupId, TerminalId);

      menu_r[menu["MenuID"]]["submenu"] = submenus;
      let subMenuIDs = Object.keys(submenus);

      if (subMenuIDs.length > 0) {
        for await (let subMenuID of subMenuIDs) {
          let submenu = submenus[subMenuID];
          menu_r[menu["MenuID"]]["submenu"][submenu["MenuID"]] = {
            MenuID: submenu["MenuID"],
            MenuName: submenu["MenuName"],
            MenuIcon: submenu["MenuIcon"],
          };

          let subsubmenus = await getSubMenu(
            submenu["MenuID"],
            groupId,
            TerminalId
          );
          let subsubMenuIDs = Object.keys(subsubmenus);
          if (subsubMenuIDs.length > 0) {
            for await (let subsubMenuID of subsubMenuIDs) {
              let subsubmenu = subsubmenus[subsubMenuID];
              menu_r[menu["MenuID"]]["submenu"]["subsubmenu"][
                subsubmenu["MenuID"]
              ] = {
                MenuID: subsubmenu["MenuID"],
                MenuName: subsubmenu["MenuName"],
                MenuIcon: subsubmenu["MenuIcon"],
              };
            }
          }
        }
      }
    }

    return menu_r;
  }

  var menus =
    (await gtosglobal("SA_MENU")
      .select(
        "SA_MENU.MenuID",
        "SA_MENU.MenuName",
        "SA_MENU.MenuIcon",
        "SA_MENU.ParentCode"
      )
      .join("SA_ACCESSRIGHT", "SA_ACCESSRIGHT.MenuID", "=", "SA_MENU.MenuID")
      .where({
        "SA_MENU.ParentCode": null,
        "SA_MENU.IsVisible": 1,
      })
      .where("SA_ACCESSRIGHT.UserGroupCode", groupId)
      // .where('SA_ACCESSRIGHT.TerminalCode', TerminalId)
      .orderBy("OrderBy", "asc")
      .catch((error) => console.log(error))) || [];

  for await (let menu of menus) {
    menu_r[menu["MenuID"]] = {
      MenuID: menu["MenuID"],
      MenuName: menu["MenuName"],
      MenuIcon: menu["MenuIcon"],
    };

    let submenus = await getSubMenu(menu["MenuID"], groupId, TerminalId);
    menu_r[menu["MenuID"]]["submenu"] = submenus;
    let subMenuIDs = Object.keys(submenus);

    if (subMenuIDs.length > 0) {
      for await (let subMenuID of subMenuIDs) {
        let submenu = submenus[subMenuID];
        menu_r[menu["MenuID"]]["submenu"][submenu["MenuID"]] = {
          MenuID: submenu["MenuID"],
          MenuName: submenu["MenuName"],
          MenuIcon: submenu["MenuIcon"],
        };

        let subsubmenus = await getSubMenu(
          submenu["MenuID"],
          groupId,
          TerminalId
        );
        let subsubMenuIDs = Object.keys(subsubmenus);
        if (subsubMenuIDs.length > 0) {
          for await (let subsubMenuID of subsubMenuIDs) {
            let subsubmenu = subsubmenus[subsubMenuID];
            menu_r[menu["MenuID"]]["submenu"]["subsubmenu"][
              subsubmenu["MenuID"]
            ] = {
              MenuID: subsubmenu["MenuID"],
              MenuName: subsubmenu["MenuName"],
              MenuIcon: subsubmenu["MenuIcon"],
            };
          }
        }
      }
    }
  }
  //console.log(menu_r);
  return menu_r;
};

const getSubMenu = async (ParentCode, groupId, TerminalId) => {
  if (groupId == "GroupAdmin") {
    var result =
      (await gtosglobal("SA_MENU")
        .select("MenuID", "MenuName", "MenuIcon", "ParentCode")
        .where({
          ParentCode: ParentCode,
          // AppID: config.app_id,
          //TerminalCode: global.getSession().TerminalCode,
          IsVisible: 1,
        })
        .orderBy("OrderBy", "ASC")
        .catch((error) => console.log(error))) || [];
    let menu_r = {};
    await result.forEach((m) => {
      menu_r[m["MenuID"]] = {
        MenuID: m["MenuID"],
        MenuName: m["MenuName"],
        MenuIcon: m["MenuIcon"],
      };
    });

    return menu_r;
  }

  var result =
    (await gtosglobal("SA_MENU")
      .select(
        "SA_MENU.MenuID",
        "SA_MENU.MenuName",
        "SA_MENU.MenuIcon",
        "SA_MENU.ParentCode"
      )
      .join("SA_ACCESSRIGHT AS acr", "acr.MenuID", "=", "SA_MENU.MenuID")
      .where("acr.UserGroupCode", groupId)
      .where("acr.IsView", 1)
      // .where('SA_ACCESSRIGHT.TerminalCode', TerminalId)
      .where({
        ParentCode: ParentCode,
        // 'SA_MENU.AppID': config.app_id,
      })
      .orderBy("SA_MENU.OrderBy", "asc")
      .catch((error) => console.log(error))) || [];

  let menu_r = {};
  await result.forEach(function (m) {
    menu_r[m["MenuID"]] = {
      MenuID: m["MenuID"],
      MenuName: m["MenuName"],
      MenuIcon: m["MenuIcon"],
    };
  });

  return menu_r;
};

//Thoilc(*Note)-Get data
module.exports.loadData = async (req) => {
  var response = {
    iStatus: false,
    iPayload: [],
    iMessage: "",
  };

  if (!req.body.checkval) {
    response["iStatus"] = false;
    response["iMessage"] = "Vui lòng cung cấp dữ liệu!";
    return response;
  }

  let query = req
    .gtos("DT_BLOCK_STOCK AS dtStock")
    .select("dtStock.Block", "dtStock.BBNo", "dtStock.ItemID", "dtStock.ClassID", "dtStock.Quantity", "dtStock.McWeight",
      "dtStock.Volume", "dtStock.TLHQ", "dtStock.GetIn", "dtStock.GetOut", "bsCus.CusName", "bsItem.ItemName",
      "bsCarType.CargoTypeName", "dtVessel.VesselName", "dtVessel.ETB", "dtVessel.ETD", "dtStock.IsLocalForeign",
      "dtVessel.InboundVoyage", "dtVessel.OutboundVoyage",
      "MTI.MethodName AS MethodNameIN", "MTO.MethodName AS MethodNameOUT",
      "JMI.JobModeName AS JobModeNameIN", "JMO.JobModeName AS JobModeNameOUT"
    )
    .leftJoin("BS_CUSTOMER AS bsCus", "bsCus.CusID", "dtStock.CusID")
    .leftJoin("DT_VESSEL_VISIT AS dtVessel", "dtVessel.VoyageKey", "dtStock.VoyageKey")
    .leftJoin("BS_ITEM AS bsItem", "bsItem.ItemID", "dtStock.ItemID")
    .leftJoin("BS_CARGOTYPE AS bsCarType", "bsCarType.CargoTypeID", "bsItem.CargoTypeID")
    .leftJoin("BS_JOB_MODE AS JMI", "JMI.JobModeID", "dtStock.JobModeIn")
    .leftJoin("BS_JOB_MODE AS JMO", "JMO.JobModeID", "dtStock.JobModeOut")
    .leftJoin("BS_METHOD AS MTI", "MTI.MethodID", "dtStock.MethodIn")
    .leftJoin("BS_METHOD AS MTO", "MTO.MethodID", "dtStock.MethodOut")
  // console.log(query.toString());
  if (req.body.opt === 'bill') {
    query = query
      .where("DTStock.BillOfLading", req.body.checkval)
      .limit(1);
  } else {
    query = query
      .where("DTStock.BookingNo", req.body.checkval)
      .limit(1);
  }
  query = await query.catch(err => console.log(err)) || [];
  if (query.length) {
    response["iStatus"] = true;
    response["iPayload"] = query;
    response["iMessage"] = "Load dữ liệu thành công!";
    return response;
  } else {
    response["iStatus"] = false;
    response["iPayload"] = [];
    response["iMessage"] = "Không có dữ liệu!";
    return response;
  }
}

//Thoilc(*Note)-Get data
module.exports.getPinCode = async (req) => {
  var response = {
    iStatus: false,
    iPayload: [],
    iMessage: "",
  };

  if (!req.body.checkval) {
    response["iStatus"] = false;
    response["iMessage"] = "Vui lòng cung cấp dữ liệu!";
    return response;
  }
  let query = req
    .gtos("ORD_EIR_BULK AS ordBulk")
    .select("ordBulk.rowguid", "ordBulk.PinCode", "bsJobMode.JobModeName", "ordBulk.ShipperName",
      "bsCus.CusName", "ordBulk.InvoiceNo", "ordBulk.Remark", "ordBulk.BillOfLading",
      "ordBulk.BookingNo", "bsItem.ItemName", "bsCgoType.CargoTypeName", "ordBulk.CommodityDescription",
      "ordBulk.Quantity", "ordBulk.CargoWeight", "ordBulk.Volume", "bsUnit.UnitName", "ordBulk.TransitID",
      "bsMethod.MethodName")
    .leftJoin("BS_CUSTOMER AS bsCus", "bsCus.CusID", "ordBulk.CusID")
    .leftJoin("BS_ITEM AS bsItem", "bsItem.ItemID", "ordBulk.ItemID")
    .leftJoin("BS_CARGOTYPE AS bsCgoType", "bsCgoType.CargoTypeID", "bsItem.CargoTypeID")
    .leftJoin("BS_UNIT AS bsUnit", "bsUnit.UnitID", "ordBulk.UnitID")
    .leftJoin("BS_JOB_MODE AS bsJobMode", "bsJobMode.JobModeID", "ordBulk.JobModeID")
    .leftJoin("BS_METHOD AS bsMethod", "bsMethod.MethodID", "ordBulk.MethodID")
    .whereLike("PinCode", `${req.body.checkval}%`)
    .orderBy("ordBulk.CreateTime", "desc");
  // console.log(query.toString());
  query = await query.catch(err => console.log(err)) || [];
  if (query.length) {
    let dataNew = query.map(item => {
      return {
        ...item,
        BBNo: item.BillOfLading ? item.BillOfLading : item.BookingNo,
        ParrentPinCode: (item.PinCode).split("-")[0]
      }
    });
    response["iStatus"] = true;
    response["iPayload"] = dataNew;
    response["iMessage"] = "Load dữ liệu thành công!";
    return response;
  } else {
    response["iStatus"] = false;
    response["iPayload"] = [];
    response["iMessage"] = "Không có dữ liệu!";
    return response;
  }
}