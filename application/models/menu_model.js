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
