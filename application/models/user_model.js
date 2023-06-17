const { gtos, gtosglobal } = require('../config/database');
const md5 = require('md5');
const _GroupAdmin = "GroupAdmin";
const _GroupVesselOwner = "GroupVesselOwner";
const FunctionModel = require('../models/FunctionModel.js');




















const validate_user = async (data) => {
    let where = {
        'UserID': data['UserID'],
        'Password': encrypt(data['password']),
    };

    let result = await gtosglobal('SA_USERS').select('*').where(where).limit(1).catch(err => console.log(err)) || [];
    return result.length > 0 ? result[0] : null;
}

const check_exist = async (user_id) => {
    let count_user = await gtosglobal().from('SA_USERS')
        .count('UserID as CountUser')
        .where('UserID', user_id)
        .limit(1).catch(err => console.log(err)) || [];

    return count_user.length > 0;
}

const encrypt = (string = '') => {
    return md5(md5(process.env.SECRET_KEY) + md5(string));
}

const isAdmin = (req) => {
    return req.session.userdata['UserGroupCode'] == _GroupAdmin;
}

const access = async (req, method = '', action = 'view') => {
    var fmenu = await gtosglobal()
        .from('SA_MENU AS m').select('*')
        .join('SA_ACCESSRIGHT AS p', 'p.MenuID', 'm.MenuID')
        .where({
            'p.UserGroupCode': req.session.userdata['UserGroupCode'],
            'm.MenuID': method
        }).limit(1).catch(err => console.log(err));
    if(!method && req.session.userdata['UserGroupCode']){
        return true;
    }
    if ([_GroupAdmin, _GroupVesselOwner].indexOf(req.session.userdata['UserGroupCode']) >= 0) {
        return true;
    }

    if (fmenu.length == 0) {
        return false;
    }

    var act = action || req.body.action || req.params.action || 'view';
    var colNameAct = '';
    switch (act) {
        case "add":
            colNameAct = 'IsAddNew';
            break;
        case "save":
        case "modify":
        case "update":
        case "edit":
            colNameAct = 'IsModify';
            break;
        case "delete":
            colNameAct = 'IsDelete';
            break;
        case "view":
        default:
            colNameAct = 'IsView';
            break;
    }

    return fmenu[colNameAct];
}

const allGroups = async () => {
    return await gtosglobal().select('*').from('SA_ACCESSRIGHT').catch(err => console.log(err)) || [];
}

const allUsers = async () => {
    return await gtosglobal()
        .select('u.*', 'g.GroupMenuName')
        .from('SA_USERS AS u')
        .join('SA_ACCESSRIGHT AS g', 'g.UserGroupCode', 'u.UserGroupCode')
        .orderBy('u.UserID').catch(err => console.log(err)) || []
}

const byUserUserGroupCode = async (gId) => {
    return await gtosglobal().select('*').from('SA_USERS').where('UserGroupCode', gId).catch(err => console.log(err)) || [];
}

const byId = async (userId) => {
    return await gtosglobal()
        .select('u.*', 'g.GroupMenuName')
        .from('SA_USERS AS u')
        .join('SA_ACCESSRIGHT AS g', 'g.UserGroupCode', 'u.UserGroupCode')
        .where('u.UserID', userId)
        .orderBy('u.UserID').catch(err => console.log(err)) || []
}





/*********************** SA_ACCESSRIGHT */

exports.loadACCESSRIGHTMenu = async (req) => {
    var menu_r = {};
    let groupId=req.body.UserGroupCode;
    let TerminalId=req.body.TerminalCode;
    if (groupId == 'GroupAdmin') {
        var menus = await gtosglobal('SA_MENU')
            .select('MenuID', 'MenuName', 'MenuIcon', 'ParentCode')
            .where({
                ParentCode: null,
                //TerminalCode: global.getSession().TerminalCode,
                IsVisible: 1
            })
            .orderBy("OrderBy", "ASC")
            .catch(error => console.log(error)) || [];

        for await (let menu of menus) {
            menu_r[menu['MenuID']] = {
                MenuID: menu['MenuID'],
                MenuName: menu['MenuName'],
                MenuIcon: menu['MenuIcon'],
                ParentCode: menu['ParentCode'],
                IsView: true,
                IsAddNew: true,
                IsModify: true,
                IsDelete: true,
            };

            let submenus = await getSubMenu(menu['MenuID'], groupId, TerminalId)

            menu_r[menu['MenuID']]['submenu'] = submenus;
            let subMenuIDs = Object.keys(submenus);

            if (subMenuIDs.length > 0) {
                for await (let subMenuID of subMenuIDs) {
                    let submenu = submenus[subMenuID];
                    menu_r[menu['MenuID']]['submenu'][submenu['MenuID']] = {
                        MenuID: submenu['MenuID'],
                        MenuName: submenu['MenuName'],
                        MenuIcon: submenu['MenuIcon'],
                        ParentCode: submenu['ParentCode'],
                        IsView: true,
                        IsAddNew: true,
                        IsModify: true,
                        IsDelete: true,
                    };

                    let subsubmenus = await getSubMenu(submenu['MenuID'], groupId, TerminalId)
                    let subsubMenuIDs = Object.keys(subsubmenus);
                    if (subsubMenuIDs.length > 0) {
                        for await (let subsubMenuID of subsubMenuIDs) {
                            let subsubmenu = subsubmenus[subsubMenuID];
                            menu_r[menu['MenuID']]['submenu']['subsubmenu'][subsubmenu['MenuID']] = {
                                MenuID: subsubmenu['MenuID'],
                                MenuName: subsubmenu['MenuName'],
                                MenuIcon: subsubmenu['MenuIcon'],
                                ParentCode: subsubmenu['ParentCode'],
                                IsView: true,
                                IsAddNew: true,
                                IsModify: true,
                                IsDelete: true,
                            };
                        }
                    }
                }
            }
        }

        return menu_r;
    }

    var menus = await gtosglobal('SA_MENU')
        .select('SA_MENU.MenuID', 'SA_MENU.MenuName', 'SA_MENU.MenuIcon', 'SA_MENU.ParentCode', 
        'SA_ACCESSRIGHT.IsView',
        'SA_ACCESSRIGHT.IsAddNew',
        'SA_ACCESSRIGHT.IsModify',
        'SA_ACCESSRIGHT.IsDelete'
        )
        .leftJoin('SA_ACCESSRIGHT', 'SA_ACCESSRIGHT.MenuID', '=', 'SA_MENU.MenuID')
        .where({
            'SA_MENU.ParentCode': null,
            'SA_MENU.IsVisible': 1
        })
        .where( gtosglobal.raw('ISNULL(SA_ACCESSRIGHT.UserGroupCode,:groupId)',{groupId}),groupId)
        .where(gtosglobal.raw('ISNULL(SA_ACCESSRIGHT.TerminalCode,:TerminalId)',{TerminalId}),TerminalId)
        .orderBy("OrderBy", "asc")
        .catch(error => console.log(error)) || [];
        //console.log(menus);
    for await (let menu of menus) {
        menu_r[menu['MenuID']] = {
            MenuID: menu['MenuID'],
            MenuName: menu['MenuName'],
            MenuIcon: menu['MenuIcon'],
            ParentCode: menu['ParentCode'],
            IsView: menu['IsView'],
            IsAddNew: menu['IsAddNew'],
            IsModify: menu['IsModify'],
            IsDelete: menu['IsDelete']
        };

        let submenus = await getSubMenu(menu['MenuID'], groupId, TerminalId);
        menu_r[menu['MenuID']]['submenu'] = submenus;
        let subMenuIDs = Object.keys(submenus);

        if (subMenuIDs.length > 0) {
            for await (let subMenuID of subMenuIDs) {
                let submenu = submenus[subMenuID];
                menu_r[menu['MenuID']]['submenu'][submenu['MenuID']] = {
                    MenuID: submenu['MenuID'],
                    MenuName: submenu['MenuName'],
                    MenuIcon: submenu['MenuIcon'],
                    ParentCode: submenu['ParentCode'],
                    IsView: submenu['IsView'],
                    IsAddNew: submenu['IsAddNew'],
                    IsModify: submenu['IsModify'],
                    IsDelete: submenu['IsDelete']
                };

                let subsubmenus = await getSubMenu(submenu['MenuID'], groupId, TerminalId)
                let subsubMenuIDs = Object.keys(subsubmenus);
                if (subsubMenuIDs.length > 0) {
                    for await (let subsubMenuID of subsubMenuIDs) {
                        let subsubmenu = subsubmenus[subsubMenuID];
                        menu_r[menu['MenuID']]['submenu']['subsubmenu'][subsubmenu['MenuID']] = {
                            MenuID: subsubmenu['MenuID'],
                            MenuName: subsubmenu['MenuName'],
                            MenuIcon: subsubmenu['MenuIcon'],
                            ParentCode: subsubmenu['ParentCode'],
                            IsView: subsubmenus['IsView'],
                            IsAddNew: subsubmenus['IsAddNew'],
                            IsModify: subsubmenus['IsModify'],
                            IsDelete: subsubmenus['IsDelete']
                        };
                    }
                }
            }
        }
    }
    //console.log(menu_r);
    return menu_r;
}

const getSubMenu = async (ParentCode, groupId, TerminalId) => {
    if (groupId == 'GroupAdmin') {
        var result = await gtosglobal('SA_MENU')
            .select('MenuID', 'MenuName', 'MenuIcon', 'ParentCode')
            .where({
                ParentCode: ParentCode,
                IsVisible: 1
            })
            .orderBy("OrderBy", "ASC")
            .catch(error => console.log(error)) || [];
        let menu_r = {};
        await result.forEach(m => {
            menu_r[m['MenuID']] = {
                MenuID: m['MenuID'],
                MenuName: m['MenuName'],
                MenuIcon: m['MenuIcon'],
                ParentCode: m['ParentCode'],
                IsView: true,
                IsAddNew: true,
                IsModify: true,
                IsDelete: true
            };
        });

        return menu_r;
    }
    // console.log(gtosglobal('SA_MENU')
    // .select('SA_MENU.MenuID', 'SA_MENU.MenuName', 'SA_MENU.MenuIcon', 'SA_MENU.ParentCode', 
    // 'SA_ACCESSRIGHT.IsView',
    // 'SA_ACCESSRIGHT.IsAddNew',
    // 'SA_ACCESSRIGHT.IsModify',
    // 'SA_ACCESSRIGHT.IsDelete')
    // .leftJoin('SA_ACCESSRIGHT', 'SA_ACCESSRIGHT.MenuID', '=', 'SA_MENU.MenuID')
    // .where( gtosglobal.raw('ISNULL(SA_ACCESSRIGHT.UserGroupCode,:groupId)',{groupId}),groupId)
    // .where(gtosglobal.raw('ISNULL(SA_ACCESSRIGHT.TerminalCode,:TerminalId)',{TerminalId}),TerminalId)
    // .where({
    //     ParentCode: ParentCode,
    // })
    // .orderBy('SA_MENU.OrderBy', 'asc').toString())
    var result = await gtosglobal('SA_MENU')
        .select('SA_MENU.MenuID', 'SA_MENU.MenuName', 'SA_MENU.MenuIcon', 'SA_MENU.ParentCode', 
        'SA_ACCESSRIGHT.IsView',
        'SA_ACCESSRIGHT.IsAddNew',
        'SA_ACCESSRIGHT.IsModify',
        'SA_ACCESSRIGHT.IsDelete')
        .leftJoin('SA_ACCESSRIGHT', 'SA_ACCESSRIGHT.MenuID', '=', 'SA_MENU.MenuID')
        .where( gtosglobal.raw('ISNULL(SA_ACCESSRIGHT.UserGroupCode,:groupId)',{groupId}),groupId)
        .where(gtosglobal.raw('ISNULL(SA_ACCESSRIGHT.TerminalCode,:TerminalId)',{TerminalId}),TerminalId)
        .where({
            ParentCode: ParentCode,
        })
        .orderBy('SA_MENU.OrderBy', 'asc')
        .catch(error => console.log(error)) || [];

    let menu_r = {};
    await result.forEach(function (m) {
        menu_r[m['MenuID']] = {
            MenuID: m['MenuID'],
            MenuName: m['MenuName'],
            MenuIcon: m['MenuIcon'],
            ParentCode: m['ParentCode'],
            IsView: m['IsView'],
            IsAddNew: m['IsAddNew'],
            IsModify: m['IsModify'],
            IsDelete: m['IsDelete']
        };
    });

    return menu_r;
}

module.exports.loadACCESSRIGHT = async (req) => {
    return await gtosglobal('SA_ACCESSRIGHT').select('*').orderBy('UserGroupCode').catch(err => console.log(err)) || [];
}

module.exports.saveACCESSRIGHT = async (req) => {
    let prm=[];
    let parent=(req.body.parent || []);
    let data=(req.body.data || []);
    if(data.length){
        await gtosglobal('SA_ACCESSRIGHT').where('UserGroupCode', parent['UserGroupCode']||'').where('TerminalCode', parent['TerminalCode']||'').del().catch(err => console.log(err));
        for await (let item of data) {
            delete item['STT'];
            delete item['rowguid'];
            item['CreatedBy'] = req.session.userdata["UserID"];
            prm.push(gtosglobal('SA_ACCESSRIGHT').insert(item));
            
        }
    }
    
    let rt=false;
    await Promise.all(prm).then(()=>{rt=true;}).catch((err)=>{console.log(err)});
    return rt;
}

module.exports.deleteACCESSRIGHT = async (req) => {
    try {
        await gtosglobal('SA_ACCESSRIGHT').whereIn('Rowguid', (req.body.data || []).map((itm) => itm.Rowguid)).del();
        return true;
    } catch (error) {
        return false;
    }
}





/*********************** SA_USERGROUPS */
module.exports.loadUserGroup = async (req) => {
    return await gtosglobal('SA_USERGROUPS').select('*').orderBy('UserGroupCode').catch(err => console.log(err)) || [];
}

module.exports.saveUserGroup = async (req) => {
    let prm=[];
    for await (let item of (req.body.data || [])) {
        delete item['STT'];

        var checkitem = await gtosglobal('SA_USERGROUPS').select("rowguid").where('UserGroupCode', item['UserGroupCode']).orWhere('rowguid', item['rowguid']||null).limit(1).catch(err => console.log(err));
        
        if (checkitem && checkitem.length > 0) {
            item['ModifiedBy'] = req.session.userdata["UserGroupCode"];
            item['ModifiedTime'] = FunctionModel.moment().format('YYYY-MM-DD HH:mm:ss');
            /* Do nothing */
            prm.push(gtosglobal('SA_USERGROUPS').where('rowguid', checkitem[0]["rowguid"]).update(item));
        } else {
            delete item['rowguid'];
            item['CreatedBy'] = req.session.userdata["UserGroupCode"];
            prm.push(gtosglobal('SA_USERGROUPS').insert(item));
        }
    }
    let rt=false;
    await Promise.all(prm).then(()=>{rt=true;}).catch((err)=>{console.log(err)});
    return rt;
}

module.exports.deleteUserGroup = async (req) => {
    try {
        await gtosglobal('SA_USERGROUPS').whereIn('UserGroupCode', (req.body.data || []).map((itm) => itm.UserGroupCode)).del();
        return true;
    } catch (error) {
        return false;
    }
}



/*********************** SA_USERS */
module.exports.loadUserFull = async (req) => {
    let query=gtosglobal('SA_USERS').join('SA_USERGROUPS','SA_USERGROUPS.UserGroupCode','SA_USERS.UserGroupCode').select('SA_USERS.*','SA_USERGROUPS.UserGroupName').orderBy('UserID');
    query=FunctionModel.KnexWhere(query,req.body.filter);
    return await query.catch(err => console.log(err)) || [];
}
module.exports.loadUser = async (req) => {
    return await gtosglobal('SA_USERS').select(
    'Rowguid'
      ,'TerminalCode'
      ,'ID'
      ,'UserID'
      ,'UserName'
      ,'UserNumber'
      , gtosglobal.raw("'********' as PassWord")
      ,'ExpireDate'
      ,'BirthDay'
      ,'Address'
      ,'Telphone'
      ,'Email'
      ,'UserGroupCode'
      ,'UserGroupName'
      ,'AppID'
      ,'OperationCode'
      ,'CustomerCode'
      ,'IsActive'
      ,'Remark'
      ,'CreatedBy'
      ,'CreatedTime'
      ,'ModifiedBy'
      ,'ModifiedTime'
    ).orderBy('UserID').catch(err => console.log(err)) || [];
}

module.exports.saveUser = async (req) => {
    let prm=[];
    for await (let item of (req.body.data || [])) {
        delete item['STT'];
        delete item['ID'];
        console.log(item);
        var checkitem = await gtosglobal('SA_USERS').select("rowguid").where('UserID', item['UserID']).orWhere('rowguid', item['rowguid']||null).limit(1).catch(err => console.log(err));
        
        if (checkitem && checkitem.length > 0) {
            item['ModifiedBy'] = req.session.userdata["UserID"];
            item['ModifiedTime'] = FunctionModel.moment().format('YYYY-MM-DD HH:mm:ss');
            /* Do nothing */
            if(item['PassWord']=='********' || item['PassWord']=='')
            {
                delete item['PassWord'];
            }
            else{
                item['PassWord']=encrypt(item['PassWord']);
            }
            prm.push(gtosglobal('SA_USERS').where('rowguid', checkitem[0]["rowguid"]).update(item));
        } else {
            delete item['rowguid'];
            item['CreatedBy'] = req.session.userdata["UserID"];
            if(item['PassWord']=='********' || item['PassWord']=='')
            {
                delete item['PassWord'];
            }
            else{
                item['PassWord']=encrypt(item['PassWord']);
            }
            prm.push(gtosglobal('SA_USERS').insert(item));
        }
    }
    let rt=false;
    await Promise.all(prm).then((data)=>{console.log(data);rt=true;}).catch((err)=>{console.log(err)});
    return rt;
}

module.exports.deleteUser = async (req) => {
    try {
        await gtosglobal('SA_USERS').whereIn('UserID', (req.body.data || []).map((itm) => itm.UserID)).del();
        return true;
    } catch (error) {
        return false;
    }
}












module.exports = {
    ...exports,
    validate_user,
    check_exist,
    isAdmin,
    access,
    allGroups,
    allUsers,
    byUserUserGroupCode,
    byId
}