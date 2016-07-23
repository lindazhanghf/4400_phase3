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
            socket.emit('register', $scope.user);
        }
        socket.on('registered', function(data) {
            $location.path('/login')
        })
        socket.on('duplicate', function(data) {
            console.log('!')
            alert('username or email already exits, please use another one')
        })
        socket.on('wrong_manager_password', function(data) {
            alert('wrong manager password');
        })
    }])
})()