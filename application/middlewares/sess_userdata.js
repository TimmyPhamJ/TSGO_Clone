
const { AsyncLocalStorage } = require('async_hooks');
const asyncLocalStorage = new AsyncLocalStorage();
var jwt = require('jsonwebtoken');
const { knex_once } = require('../config/database');
const jwtVerify = require('util').promisify(jwt.verify).bind(jwt);

const set_userdata = async function (req, res, next) {
    var cookie = req.cookies;
    if (!cookie.ssid) {
        return next();
    }

    try {
        var user = await jwtVerify(cookie.ssid, process.env.SECRET_KEY);
        user.ip = ((req.headers['x-forwarded-for'] || '') + '_' + (req.socket.remoteAddress || '')).substring(0, 49);
        req.session = { userdata: user }
        req.user_info = {
            UserID: user['UserID'],
            UserName: user['UserName'],
            UserGroupCode: user['UserGroupCode'],
            Tel: user['Tel'],
            Address: user['Address']
        }

        if (user['CurrentTerminal']) {
            req.user_info['CurrentTerminal'] = user['CurrentTerminal'];
            req.user_info['CurrentTerminalCode'] = user['CurrentTerminal']['Code'];
            req.TerminalCode = user['CurrentTerminal']['Code'];
            req.gtos=knex_once(user['CurrentTerminal']['Code']);
        }

        const store = new Map();
        store.set("id", cookie.ssid);
        await asyncLocalStorage.run(store, () => {
            store.set("timeStart", +new Date());
            store.set("userdata", user);
            return next();
        });

    } catch (error) {
        console.log(error)
        delete req.session;
        asyncLocalStorage.exit(function () {
            console.log('exit storage')
        })
        next();
    }
}

const get_userdata = () => {
    try {
        const store = asyncLocalStorage.getStore();
        if (!store) return undefined;

        const id = store.get("id");
        const timeStart = store.get("timeStart");
        const userdata = store.get("userdata");
        return userdata;
    } catch (error) {
        console.log(error)
        return undefined;
    }
}

const get_terminal = () => {
    var user = get_userdata();
    if (!user) { return undefined; }
    return user.CurrentTerminal;
}

const del_userdata = () => {
    try {
        const store = asyncLocalStorage.getStore();
        if (!store) return undefined;
        asyncLocalStorage.exit(function () {
            console.log('exit storage')
        })
    } catch (error) {
        console.log(error)
        return undefined;
    }
}

global.get_userdata = get_userdata;
global.get_terminal = get_terminal;
global.del_userdata = del_userdata;

module.exports = set_userdata