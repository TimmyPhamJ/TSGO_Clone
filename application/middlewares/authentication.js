var jwt = require('jsonwebtoken');
var jwtVerify = require('util').promisify(jwt.verify).bind(jwt);
var userModel = require('../models/user_model');

const auth = async (req, res, next, act = undefined, menuId = undefined) => {
    var cookie = req.cookies;
    if (cookie.ssid) {
        req.headers.authorization = `BEAR ${cookie.ssid}`;
    }

    var authHeader = req.headers.authorization;
    if (!authHeader) {
        if (req.xhr) {
            return res.status(403).json({ status: 403, success: false, message: "Token not found!" });
        }

        return res.render('login');
    }

    var token = authHeader.split(' ')[1];
    try {
        //verify token
        var user = await jwtVerify(token, process.env.SECRET_KEY);
        //console.log(user);
        if (!user['CurrentTerminal']) {
            global.del_userdata();
            delete req.session;
            res.clearCookie('ssid');
            res.clearCookie('rememberme');

            if (req.xhr) {
                return res.status(403).json({ status: 403, success: false, message: "Terminal is required!" });
            }

            return res.render('login');
        }

        user.ip = ((req.headers['x-forwarded-for'] || '') + '_' + (req.socket.remoteAddress || '')).substring(0, 49);
        req.session = { userdata: user }

        var isAccess = await userModel.access(req, menuId, act);
        if (!isAccess) {
            return res.status(403).json({ status: 403, success: false, message: "Not permission!", error: "Not permission!" });
        }

        next();

    } catch (error) {
        if (req.xhr) {
            return res.status(401).json({ status: 401, success: false, message: "Token verify false", payload: "" });
        }
        return res.render('login');
    }
};

module.exports = auth
