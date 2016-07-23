(function() {
    'use strict';
    angular.module('GT_Movie.controller')
    .controller('Order_history_ctrl', ['$scope', 'socket', 'current_user_info', '$location', function($scope, socket, current_user_info, $location) {
        socket.emit('get_order_history', current_user_info.user.Username);
        socket.on('order_history', function(data) {
            $scope.orders = data;
        })
        $scope.goto_me = function() {
            $location.path('/me');
        }
    }])
})()