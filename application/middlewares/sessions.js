var redis = require("redis");
var session = require('express-session');
var redisStore = require('connect-redis')(session);
var { redis_config } = require('../config/config_site');
var client = redis.createClient({
    socket: {
        host: redis_config.host,
        port: redis_config.port
    },
    database: redis_config.session_db || 0,
    legacyMode: true
});
client.connect().catch(err => console.log(err));
module.exports = session({
    secret: process.env.SECRET_KEY || 'haolv@123',
    store: new redisStore({ client: client }),
    saveUninitialized: false,
    resave: false
});