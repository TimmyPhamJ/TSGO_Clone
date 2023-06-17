const console = require('console');
const ejs = require('ejs');
const fs = require('fs');
var menuModel = require('../models/menu_model');



// {
//     UserID: 'haolv',
//     UserName: undefined,
//     UserGroupCode: 'GroupAdmin',
//     Tel: undefined,
//     Address: null,
//     CurrentTerminal: { Code: 'TANTHUAN', Name: 'CẢNG TÂN THUẬN' },
//     CurrentTerminalCode: 'TANTHUAN'
//   }

const render_content = async function (filename, data) {
    let fileContent = '';
    let rendered="";   
    if (fs.existsSync(__dirname + '/../views/' + filename + '.ejs')) {
        fileContent =  fs.readFileSync(__dirname + '/../views/' + filename + '.ejs', 'utf8');
        try{
            rendered = await ejs.render(fileContent, data || {},{async: true});
        }catch(err){
            console.log(err);
            rendered='<textarea style="border:none;bacground:tranparent;width:100%;min-height:100vh;overflow:auto;" disabled>'+(err)+'</textarea>';
        }
    }
    else{
        rendered = '<textarea style="border:none;bacground:tranparent;width:100%;min-height:100vh;overflow:auto;" disabled>NO VIEW FILE</textarea>';
    }    
    return rendered;
}
const loadContent = async function (filename, data, req) {
    var user = req.user_info || {};
    var menus = await menuModel.getMenu(user['UserGroupCode'], user['CurrentTerminalCode']);
    let header = await render_content('general/header', { menus: menus, userName: user['UserName'], title: data.title || 'GTOS' });
    let rendered = await render_content(filename, data);
    let footer = await render_content('general/footer');
    return header + rendered + footer;
}

const loadOnce = async function (filename, data, req) {
    let rendered = await render_content(filename, data);
    return rendered;
}

const load_content_exports = async function (req, res, next) {
    res.loadContent = async (filename, data) => {
        //console.log(req.user_info);
        try {
            let rt = await loadContent(filename, data, req);
            //console.log(rt);
            res.end(rt || 'Error');
        }
        catch (err) {
            res.end(err || 'Error');
            console.log(err);
        }
    }
    res.loadOnce = async (filename, data) => {
        try {
            let rt = await loadOnce(filename, data, req);
            res.end(rt || 'Error');
        }
        catch (err) {
            res.end(err || 'Error');
            console.log(err);
        }
    }
    next();
    return;
}

module.exports = load_content_exports;