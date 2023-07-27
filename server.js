require('dotenv').config();
var jwt = require('jsonwebtoken');
var jwtVerify = require('util').promisify(jwt.verify).bind(jwt);
var app = require('./app');
var http = require('http');

var port = normalizePort(process.env.PORT || '8888');
app.set('port', port);
var server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

io.on("connection", (socket) => {
    // send a message to the client
    // socket.send(JSON.stringify({
    //   type: "hello from server",
    //   content: [ 1, "2" ]
    // }));
  
    // receive a message from the client
    socket.on("login", async (token) => {
        //console.log(token);
        if(!token.access_token) return false;
        var data = await jwtVerify(token.access_token, process.env.SECRET_KEY);
        //console.log(data);
        let user ={}
        try{
            user = JSON.parse(data);
        }
        catch(err){
        }
        if(user.UserID){
            socket.join('|UserID|'+user.UserID);
        }
        if(user.UserGroupCode){
            socket.join('|UserGroupCode|'+user.UserGroupCode);
        }
        if(user.CurrentTerminal && user.CurrentTerminal.Code){
            socket.join('|TerminalCode|'+user.CurrentTerminal.Code);
        }
        if(user.CurrentTerminal && user.CurrentTerminal.Code && user.UserID){
            socket.join('|UserTerminal|'+user.UserID+'_'+user.CurrentTerminal.Code);
        }
        if(token.pathname){
            socket.join('|pathname|'+token.pathname);
        }
        return true;
    });
});
global.io=io;
global.io.sendData=(group,to,event,data)=>{
    try{
        global.io.to('|'+group+'|'+to).emit(event, data);
    }catch(err){
        console.log(err);
    }
}
/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('Listening on ' + bind);
}
