var express = require('express');
var router = express.Router();
var auth = require('../middlewares/authentication')

router.get('/login', function (req, res, next) {
    global.del_userdata();
    delete req.session;
    delete req.user_info;
    res.render('login')
});

router.post('/login', async function (req, res, next) {
    var output = {}
    var data_req = {
        UserID: req.body.UserID,
        password: req.body.password,
        rememberme: req.body.rememberme
    }

    var user_model = require('../models/user_model');
    var user = await user_model.validate_user(data_req);
    if (!user) {
        output['error'] = "Tên đăng nhập hoặc Mật khẩu không đúng!";
        res.status(200).json(output);
        //res.render('login', { title: 'GTOS', ...output });
        return;
    }

    if (user['IsActive'] == '0') {
        output['error'] = "Người dùng chưa được kích hoạt";
        res.status(200).json(output);
        //res.render('login', { title: 'GTOS', ...output });
        return;
    }

    var terminalCodes = String(user['TerminalCode'] || '').split(',').filter(p => p);
    var jwt = require('jsonwebtoken');
    var exp = Math.floor(Date.now() / 1000) + (86400 * 30 * 1);// expires in 24 hours * 1 thang

    user.ip = ((req.headers['x-forwarded-for'] || '') + '_' + (req.socket.remoteAddress || '')).substring(0, 49);
    var { db_list } = require('../config/database');
    var terminals = (terminalCodes.length > 0 ? terminalCodes : Object.keys(db_list)).map(code => {
        return {
            Code: code,
            Name: db_list[code]['TerminalName']
        }
    });
    user.Terminals = terminals;
    user['CurrentTerminal'] = terminals[0];
    //neu 1 cang thi chon luon
    if (terminals.length == 1) {
        user['CurrentTerminal'] = terminals[0];
        output['user_info'] = {
            UserID: user['UserID'],
            FullName: user['FullName'],
            UserGroupCode: user['UserGroupCode'],
            Tel: user['Tel'],
            Address: user['Address'],
            CurrentTerminal: terminals[0]
        };
    }
    else {
        output['terminals'] = terminals;
    }

    var access_token = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: exp });
    res.cookie('ssid', access_token, {
        credentials: true,
        withCredentials: true,
        sameSite: true,
        httpOnly: true,
        secure: true,
        maxAge: new Date().setMonth(new Date().getMonth() + 1) //1 thang
    });

    if (data_req['rememberme']) {
        res.cookie('rememberme', data_req['rememberme'], { maxAge: new Date().setMonth(new Date().getMonth() + 1) });
    } else {
        res.clearCookie('rememberme')
    }
    output['access_token']=access_token;
    res.status(200).json(output);
    return;
});

router.post('/switch-terminal', auth, async function (req, res, next) {
    var user = global.get_userdata() || req.session?.userdata;
    var terminals = user.Terminals.filter(p => p.Code !== user.CurrentTerminal.Code);
    if (terminals.length == 0) {
        return res.end()
    }

    res.render('switch_terminal', { terminals: terminals });
    return;
});

router.post('/select-terminal',auth, async function (req, res, next) {
    var user = global.get_userdata() || req.session?.userdata;
    //console.log(user)
    var terminalCode = req.body.terminal;
    var jwt = require('jsonwebtoken');
    var exp = Math.floor(Date.now() / 1000) + (86400 * 30 * 1);// expires in 24 hours * 1 thang

    var newSelectTer = user.Terminals?.filter(p => p.Code == terminalCode)[0] || undefined;
    if( !newSelectTer ) {
        next(new Error('Can not select this Terminal! Try again'));
        return;
    }
    
    user['CurrentTerminal'] = newSelectTer;
    delete user['exp'];
    delete user['iat'];

    var access_token = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: exp });
    var user_info = {
        UserID: user['UserID'],
        UserName: user['UserName'],
        UserGroupCode: user['UserGroupCode'],
        Tel: user['Tel'],
        Address: user['Address'],
        CurrentTerminal: user['CurrentTerminal']
    };

    res.cookie('ssid', access_token, {
        credentials: true,
        withCredentials: true,
        sameSite: true,
        httpOnly: true,
        secure: true,
        maxAge: new Date().setMonth(new Date().getMonth() + 1) //1 thang
    });

    res.status(200).json({ user_info: user_info,access_token });
    return;
});

router.get('/logout', function (req, res, next) {
    global.del_userdata();
    delete req.session;
    delete req.user_info;
    res.clearCookie('ssid');
    res.clearCookie('rememberme');
    res.redirect('/')
});


router.get('/cmCustomerType', auth, async function (req, res, next) {
    return res.render('che');
});

module.exports = router;