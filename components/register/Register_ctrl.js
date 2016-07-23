(function() {
    'use strict';
    angular.module('GT_Movie.controller')
    .controller('Register_ctrl', ['$scope', 'socket', 'current_user_info', '$location', function($scope, socket, current_user_info, $location) {
        $scope.user = {};
        $scope.register = function() {
            $scope.myForm.Password.$dirty = true;
            if ($scope.user.Password !== $scope.user.confirm_password) {
                return;
            };
            if (Object.keys($scope.myForm.Username.$error).length != 0 || Object.keys($scope.myForm.Password.$error).length != 0 || Object.keys($scope.myForm.Email.$error).length != 0) {
                return;
            };
            if ($scope.user.manager_password) {
                socket.emit('add_customer', user);
            } else {
                socket.emit('add_manager', user);
            }
        }
    }])
})()