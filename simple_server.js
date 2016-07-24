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
    socket.on('get_movie_info', get_movie_info_handler_gen(socket))
    socket.on('get_movie_review', get_movie_review_gen(socket))
    socket.on('give_review', give_review_gen(socket))
    socket.on('get_preferred_theaters', get_preferred_theaters_gen(socket))
    socket.on('add_preferred_theater', add_preferred_theater_gen(socket))
    socket.on('delete_preferred_theater', delete_preferred_theater_gen(socket))
    socket.on('get_order_history', get_order_history_gen(socket))
    socket.on('get_now_playing', get_now_playing_gen(socket))
    socket.on('get_movie_review_avg', get_movie_review_avg_gen(socket))
    socket.on('get_my_payment_info', get_my_payment_info_gen(socket))
    socket.on('delete_saved_payment_info', delete_saved_payment_info_gen(socket))
    socket.on('search_theater', search_theater_gen(socket))
    socket.on('get_showtime', get_showtime_gen(socket))
})
server.listen(portNum);

function format_date(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();

    month = '00'.substring(0, 2-month.toString().length) + month
    hour = '00'.substring(0, 2-hour.toString().length) + hour
    min = '00'.substring(0, 2-min.toString().length) + min
    return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':00'
}

function get_showtime_gen(socket) {
    return function get_showtime(data) {
        var now = new Date();
        var time = format_date(now);
        var day_later = new Date()
        day_later.setDate(day_later.getDate() + 4);
        connection.query('SELECT Showtime FROM SHOWTIME WHERE Mtitle = ? AND Tid = ? AND Showtime > ? AND Showtime < ?', [data.Mtitle, data.Tid, time, day_later], function(err, result) {
            if (err) {
                console.log(err)
                return
            };
            console.log(result);
            socket.emit('showtimes', result)
        })
    }
}

function delete_saved_payment_info_gen(socket) {
    return function delete_saved_payment_info(data) {
        connection.query('UPDATE PAYMENT_INFO SET Saved = false WHERE Card_number = ?', [data.Card_number], function(err, result) {
            if (err) {
                console.log(err)
                return;
            }
            get_my_payment_info_gen(socket)(data.User)
        })
    }
}
function get_my_payment_info_gen(socket) {
    return function get_payment_info(data) {
        connection.query('SELECT * FROM PAYMENT_INFO WHERE User = ? AND Saved = true', data, function(err, result) {
            if (err) {
                console.log(err)
                return ;
            };
            console.log(result);
            socket.emit('my_pament_info', result);

        })
    }
}

function get_now_playing_gen(socket) {
    return function get_now_playing(data) {
        connection.query('SELECT DISTINCT(Mtitle) FROM PLAYS_AT WHERE Playing = true', null, function(err, result) {
            socket.emit('now_playing', result);
        })
    }
}
function get_order_history_gen(socket) {
    return function get_order_history(data) {
        console.log(data);
        connection.query('SELECT * FROM ORDER WHERE User = ?', [data], function(err, result) {
            socket.emit('order_history', result);
        })
    }
}
function add_preferred_theater_gen(socket) {
    return function add_preferred_theater(data) {
        console.log(data);
        connection.query('INSERT INTO PREFERS SET ?'[data], function(err, result) {
            if (err) {
                console.log(err)
            };
            console.log(result);
        })
    }
}
function get_preferred_theaters_gen(socket) {
    return function get_preferred_theaters(data) {
        console.log(data);
        connection.query('SELECT * FROM THEATER, PREFERS WHERE User = ? AND Theater_id = Tid', [data], function(err, result) {
            if (err) {
                console.log(err);
            };
            socket.emit('preferred_theaters', result);
        })
    }
}
function delete_preferred_theater_gen(socket) {
    return function delete_preferred_theater(data) {
        console.log(data);
        connection.query('DELETE FROM PREFERS WHERE User = ? AND Tid = ?', [data.User, data.Tid], function(err, result) {
            if (err) {
                console.log(err);
            };
        })
        get_preferred_theaters_gen(socket)(data.User)
    }
}

function give_review_gen(socket) {
    return function give_review(data) {
        console.log(data);
        if (data.Rating < 1 || data.Rating > 5) {
            socket.on('invalid_value')
            return
        };
        if (!data.Title || data.Title > 255) {
            socket.on('invalid_value')
            return
        }
        if (!data.Comment) {
            socket.on('invalid_value')
            return
        };
        if (!data.User) {
            socket.on('invalid_value')
            return
        };
        connection.query('INSERT INTO REVIEW SET ?', [data], function(err, result) {
            if (err) {
                console.log(err)
            };
            socket.emit('review_inserted');
        })
    }
}
function get_movie_info_handler_gen(socket) {
    return function movie_info_handler(data) {
        console.log(data);
        connection.query('SELECT * FROM MOVIE WHERE Title = ?', [data], function(err, result) {
            if (err) {
                console.log(err)
            };
            console.log(result);
            socket.emit('movie_info', result[0]);
        })
    }
}
function get_movie_review_gen(socket) {
    return function movie_review_handler(data) {
        console.log(data);
        connection.query('SELECT * FROM REVIEW as r WHERE r.Mtitle = ?', [data], function(err, result) {
            if (err) {
                console.log(err)
            };
            console.log(result);
            socket.emit('movie_reviews', result);
        })
    }
}

function get_movie_review_avg_gen(socket) {
    return function movie_review_avg_handler(data) {
        connection.query('SELECT AVG(Rating) FROM REVIEW WHERE Mtitle = ?', [data], function(err, result) {
            if (err) {
                console.log(err);
            };
            console.log(result);
            socket.emit('movie_review_avg_rating', result[0]);
        })
    }
}
function search_theater_gen(socket) {
    return function search_theater_handler(data) {
        connection.query('SELECT * FROM THEATER WHERE Name LIKE \'%?%\' OR State LIKE \'%?%\' OR City LIKE \'%?%\'', [data], function(err, result) {
            if (err) {
                console.log(err);
            };
            console.log(result);
            socket.emit('search_theater_result', result);
        })
    }
}
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
                    connection.query('SELECT Manager_password FROM SYSTEM_INFO', null, function(err, result) {
                        var correct_manager_password = result[0].Manager_password;
                        if (data.manager_password === correct_manager_password) {
                            delete data.confirm_password
                            delete data.manager_password
                            connection.query('INSERT INTO USER SET ?', data, function(err, result){
                                if (err) {
                                    console.log(err)
                                };
                                console.log(result)
                                socket.emit('registered')
                                var user = {Username: data.Username};
                                connection.query('INSERT INTO MANAGER SET ?', user, function(err, result) {
                                    if (err) {
                                        console.log(err)
                                    };
                                    console.log(result);
                                })
                            })
                        } else {
                            console.log('wrong_manager_password');
                            socket.emit('wrong_manager_password')
                        }
                    })
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