var mysql = require('mysql2');
var request = require('request');
var connection = mysql.createConnection({
    host:'localhost',
    user: 'yuhui',
    password: '4400phase3',
    datahase:'4400phase3'
})
// connection.connect();

request('https://randomuser.me/api/', function(err, res, body) {
    console.log(body)
})
