(function() {
    'use strict';
    angular.module('GT_Movie.controller')
    .controller('Order_detail_ctrl', ['$scope', 'socket', 'current_user_info', '$location', function($scope, socket, current_user_info, $location) {
        socket.emit('get_order_detail', current_user_info.want_detail_order)
        socket.on('order_detail', function(data) {
            console.log(data);
            $scope.detail = data;
        })
        socket.on('cancelled', function(data) {
            $scope.goto('/order_history')
        })

        $scope.goto = function(path) {
            $location.path(path);
        }
        $scope.cancel = function() {
            socket.emit('cancel_order', current_user_info.want_detail_order)
        }
    }])
})()