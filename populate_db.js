var mysql = require('mysql2');
var request = require('request');
var fs = require('fs');
var Q = require('q');
var connection = mysql.createConnection({
    host:'localhost',
    user: 'yuhui',
    password: '4400phase3',
    database:'4400phase3'
})
var get_user_names = 0;
var insert_users = 0;
var insert_system_info = 0;
var insert_movie = 0;
var insert_theater = 0;
var insert_plays_at = 0;
var insert_Showtime = 0;
var insert_Showtime_3_month = 0;
var insert_payment = 0;
var insert_payment_rand = 0
// var insert_order = 1;
var insert_may_june_movie = 0;
var insert_new_plays_at = 1;
connection.connect();
var system_info = {
    Cancellation_fee : 2.75,
    Manager_password : 'Manager_password',
    Child_discount : 0.85,
    Senior_discount : 0.75
}
var managers = [
    {
      Username : 'yzhao343',
      Password : '4400phase3',
      Email : 'yzhao343@gatech.edu'
    },
    {
      Username : 'zzang391',
      Password : '4400phase3',
      Email : 'zzang391@gatech.edu'
    },
    {
      Username : 'jthornburgh3',
      Password :'4400phase3',
      Email : 'jthornburgh3@gatech.edu'
    },
    {
      Username : 'buzz',
      Password :'4400phase3',
      Email : 'buzz3@gatech.edu'
    },
    {
      Username : 'gburdell3',
      Password :'4400phase3',
      Email : 'gburdell3'

    }
]
var english = /^[A-Za-z0-9]*$/;

var users = [];
if (get_user_names) {
    var queue = Q();
    for(var i = 0; i < 30; i++) {
        queue = queue
        .then(function() {
            var deferred = Q.defer();
            request('https://randomuser.me/api/', function(err, res, body) {
                var res = JSON.parse(body).results[0];
                var user = {
                    Name: res.name.first + ' ' + res.name.last,
                    Username : res.login.username,
                    Password : res.login.password,
                    Email : res.email
                };
                deferred.resolve();
                console.log(user);
                users.push(user);
            })
            return deferred.promise;
        })
        .then(function(){
            var deferred = Q.defer();
            setTimeout(function() {
                deferred.resolve();
            }, 500)
            return deferred.promise;
        })
    }
    var queue = queue.then(function() {
        var deferred = Q.defer();
        console.log('!!!')
        fs.writeFile('./all_users.json', JSON.stringify(users, null, 2), function(e) {
                if (e) {
                    console.log(e);
                }
                deferred.resolve();
        })
        return deferred.promise;
    })
};

if (insert_users) {
    // customers =JSON.parse(fs.readFileSync('./all_users.json', 'utf8'));
    // for (var i = customers.length - 1; i >= 0; i--) {
    //     var user = customers[i];
    //     delete user.Name;

    //     // var query = connection.query('INSERT INTO USER SET ?', user, function(err, result) {
    //     //     if (err) {
    //     //         console.log(err);
    //     //     };
    //     //     console.log(result);
    //     // })
    //     delete user.Password;
    //     delete user.Email
    //     var query = connection.query('INSERT INTO CUSTOMER SET ?', user, function(err, result) {
    //         if (err) {
    //             console.log(err);
    //         };
    //         console.log(result);
    //     })
    //     console.log(query.sql);
    // };
    for(var i = 0; i < managers.length; i++) {
        var manager = managers[i];
        var query = connection.query('INSERT INTO USER SET ?', manager, function(err, result) {
                if (err) {
                    console.log(err)
                };
                console.log(result);
        })
        console.log(query.sql);
    }
    for(var i = 0; i < managers.length; i++) {
        var manager = managers[i];
        delete manager.Password;
        delete manager.Email;
        var query = connection.query('INSERT INTO MANAGER SET ?', manager, function(err, result) {
                if (err) {
                    console.log(err);
                };
                console.log(result);
        })
        console.log(query.sql);
    }

};
if (insert_system_info) {
    query = connection.query('INSERT INTO SYSTEM_INFO SET ?', system_info, function(err, result) {
        if (err) {
            console.log(err)
        };
        console.log(result);
    })
}

if (insert_movie) {
    var movies = JSON.parse(fs.readFileSync('./populate_db_queries/all_movies.json', 'utf8'));
    console.log(movies);
    for (var i = movies.length - 1; i >= 0; i--) {
        query = connection.query('INSERT INTO MOVIE SET ?', movies[i], function(err, result) {
            if (err) {
                console.log(err)
            };
            console.log(result);
        })
    };
};

if (insert_theater) {
    var movies = JSON.parse(fs.readFileSync('./populate_db_queries/all_theaters.json', 'utf8'));
    console.log(movies);
    for (var i = movies.length - 1; i >= 0; i--) {
        query = connection.query('INSERT INTO THEATER SET ?', movies[i], function(err, result) {
            if (err) {
                console.log(err)
            };
            console.log(result);
        })
    };
};
if (insert_plays_at) {
    var movies = JSON.parse(fs.readFileSync('./populate_db_queries/insert_Plays_at.json', 'utf8'));
    console.log(movies);
    for (var i = movies.length - 1; i >= 0; i--) {
        query = connection.query('INSERT INTO PLAYS_AT SET ?', movies[i], function(err, result) {
            if (err) {
                console.log(err)
            };
            console.log(result);
        })
    };
};
// var days = ['22','23','24','25','26']
// if (insert_Showtime) {
//     var movies = JSON.parse(fs.readFileSync('./populate_db_queries/insert_Showtime.json', 'utf8'));
//     console.log(movies);
//     for (var i = movies.length - 1; i >= 0; i--) {
//         var months = '2016-07-';
//         for (var j = 0; j <= days.length-1; j++) {
//             var day = months + days[j]
//             for (var k = 0; k < 5; k++) {
//                 var hour = Math.floor((Math.random() * 12) + 10);
//                 var minute = Math.floor((Math.random() * 60));
//                 var timeStamp = day + ' ' + hour.toString() + ':' + minute.toString() + ':00';

//                 var movies[i].Showtime = timeStamp;
//                 var query = connection.query('INSERT INTO SHOWTIME SET ?', movies[i], function(err, result) {
//                     if (err) {
//                         console.log(err)
//                     };
//                     console.log(result);
//                 })
//             }
//         }
//     };
// };

if (insert_Showtime_3_month) {
    days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
    month = [5,6,7]
};

if (insert_payment) {
    var payment_info = require('./populate_db_queries/payment_info').payment_info
    for(var i = 0; i < payment_info.length; i++) {
        query = connection.query('INSERT INTO PAYMENT_INFO SET ?',payment_info[i], function(err, result) {
            if (err) {
                console.log(err)
            };
            console.log(result);
        })
        console.log(query)
    }
};

// if (insert_order) {
    // var queue = Q();
    // queue
    // .then(function() {
    //     var deferred = Q.defer();
    //     connection.query('SELECT * FROM CUSTOMER', null, function(err, result) {
    //         if (err) {
    //             throw(err)
    //         };
    //         deferred.resolve(result);
    //     })
    //     return deferred.promise;
    // })
    // .then(function(users) {
    //     var deferred = Q.defer();
    //     connection.query('SELECT * FROM SHOWTIME', null, function(err, result) {
    //         if (err) {
    //             throw(err)
    //         }
    //         deferred.resolve({users: users, showtime:result})
    //     })
    //     return deferred.promise;
    // }).then(function(info) {
    //     var deferred = Q.defer()
    //     console.log(info)
    //     return deferred.promise
    // })
    // .fail(function(err) {
    //     console.log('failed!')
    //     console.log('err')
    // })
// };

if (insert_may_june_movie) {
    var may_june_movies = require('./populate_db_queries/payment_info').may_june_movies;
    for(var i = 0; i < may_june_movies.length; i++) {
        query = connection.query('INSERT INTO MOVIE SET ?',may_june_movies[i], function(err, result) {
            if (err) {
                console.log(err)
            };
            console.log(result);
        })
        console.log(query)
    }
};

if (insert_new_plays_at) {
    connection.query("SELECT Title, Release_date FROM MOVIE WHERE Release_date > '2016-07-16'", null, function(err, result) {
        if (err) {
            console.log(err)
            return;
        };
        console.log(result);
        for(var i = 1; i < 7; i++) {
            var plays_at =
            connection.query('INSERT INTO PLAYS_AT SET ?')
        }
    })
};