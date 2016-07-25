(function() {
    'use strict';
    angular.module('GT_Movie.controller')
    .controller('Order_history_ctrl', ['$scope', 'socket', 'current_user_info', '$location', function($scope, socket, current_user_info, $location) {
        socket.emit('get_order_history', current_user_info.user.Username);
        var orders = {};
        socket.on('order_history', function(data) {
            console.log(data);
            orders = data;
            $scope.orders = data;
            if ($scope.orders.length > 0) {
                $scope.selected_order_id = $scope.orders[0].Order_id.toString();
            } else {
                $scope.selected_order_id = 0;
            }
        })
        $scope.goto = function(path) {
            $location.path(path);
        }

        $scope.veiw_detail = function() {
            if (!$scope.selected_order_id) {
                return;
            };
            console.log($scope.selected_order_id)
            current_user_info.want_detail_order = parseInt($scope.selected_order_id)
            $scope.goto('/order_detail');
        }

    }])
})()