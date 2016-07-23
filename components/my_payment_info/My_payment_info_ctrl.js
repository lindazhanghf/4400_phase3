(function() {
    'use strict';
    angular.module('GT_Movie.controller')
    .controller('My_payment_info_ctrl', ['$scope', 'socket', 'current_user_info', '$location', function($scope, socket, current_user_info, $location) {
        socket.emit('get_my_payment_info', current_user_info.user.Username)
        socket.on('my_pament_info', function(data) {
            console.log(data);
        })
    }])
})()