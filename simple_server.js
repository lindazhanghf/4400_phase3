var portNum = 8000;
var static = require('node-static');
var file = new static.Server('./');
var server = require('http').createServer(serverhandle);
var io = require('socket.io')(server);
var mysql = require('mysql2');
var connection = mysql.createConnection({
    host:'localhost',
    user: 'yuhui',
    password: '4400phase3',
    datahase:'4400phase3'
})
connection.connect();

function serverhandle(req, resp) {
    req.addListener('end', function() {
        file.serve(req,resp);
    }).resume()
}

io.on('connect', function(socket) {
    console.log('a user connected')
})

server.listen(portNum);