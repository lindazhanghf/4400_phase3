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
    database:'4400phase3'
})
connection.connect();

function serverhandle(req, resp) {
    req.addListener('end', function() {
        file.serve(req,resp);
    }).resume()
}

io.on('connect', function(socket) {
    console.log('a user connected')
    socket.on('login', login_handler_gen(socket))
    socket.on('register', register_handler_gen(socket))
})

server.listen(portNum);
function register_handler_gen(socket) {
    return function register_handler(data) {
        console.log(data)
        connection.query('SELECT Password FROM USER WHERE Username = ? OR Email = ?', [data.Username, data.Email], function(err, result) {
            if (err) {
                console.log(err);
            };
            console.log(result);
            if (result.length === 0) {
                if (data.manager_password) {

                } else {
                    delete data.confirm_password
                    connection.query('INSERT INTO USER SET ?', data, function(err, result){
                        if (err) {
                            console.log(err)
                        };
                        console.log(result)
                        socket.emit('registered')
                        var user = {Username: data.Username};
                        connection.query('INSERT INTO CUSTOMER SET ?', user, function(err, result) {
                            if (err) {
                                console.log(err)
                            };
                            console.log(result);
                        })
                    })
                }
            } else {
                console.log('duplicate!')
                socket.emit('duplicate')
            }
        })
    }
}
function login_handler_gen(socket) {
    return function login_handler(data) {
        console.log(data);
        connection.query("SELECT Password FROM USER WHERE Username = ?", [data.Username], function(err, result) {
            if (err) {
                console.log(err);
            };
            if (result.length === 0) {
                socket.emit('no_user')
                return
            };
            if (result.length === 1) {
                var password = result[0].Password;
                if (password !== data.Password) {
                    socket.emit('wrong_passord')
                    return
                };
                connection.query("SELECT Username FROM CUSTOMER WHERE Username = ?", [data.Username], function(err, result) {
                    if (err) {
                        console.log(err);
                    };
                    if (result.length === 1) {
                        socket.emit('is_customer', data.Username)
                    } else {
                        socket.emit('is_manager')
                    }
                })
            };
        })
    }
}