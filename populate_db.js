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
var insert_movie = 1;
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
    queue = queue.then(function() {
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