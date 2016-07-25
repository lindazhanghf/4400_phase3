(function() {
    'use strict';
    angular.module('GT_Movie.controller')
    .controller('Order_history_ctrl', ['$scope', 'socket', 'current_user_info', '$location', function($scope, socket, current_user_info, $location) {
        socket.emit('get_order_history', current_user_info.user.Username);
        var orders = [];
        $scope.selected_order_id = 0;
        $scope.search_word = "";
        $scope.search = function() {
            if (!$scope.search_word) {
                $scope.orders = orders;
                return;
            }
            $scope.orders = orders.filter(function(e) {
                if (e.Order_id.toString() == $scope.search_word) {
                    return true
                };
            })
            $scope.search_word = "";
        }
        socket.on('order_history', function(data) {
            console.log(data);
            orders = data;
            $scope.orders = data;
        })
        $scope.goto = function(path) {
            $location.path(path);
        }
        $scope.select_id = function(id) {
            $scope.selected_order_id = id.toString();
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