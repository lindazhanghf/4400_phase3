(function() {
    'use strict';
    angular.module('GT_Movie.controller')
    .controller('Login_ctrl', ['$scope', 'socket', 'current_user_info', '$location', function($scope, socket, current_user_info, $location) {
        $scope.user = {};
        console.log($scope.myForm);
        $scope.login = function() {
            $scope.myForm.Password.$dirty = true;
            $scope.myForm.Username.$dirty = true
            if (Object.keys($scope.myForm.Username.$error).length != 0 || Object.keys($scope.myForm.Password.$error).length != 0) {
                return
            };
            socket.emit('login', $scope.user)
            console.log($scope.user);
        }

        socket.on('no_user', function() {
            alert('Please register first')
        })
        socket.on('is_customer', function(data) {
            console.log('is customer')
            current_user_info.user.Username = data;
            goto('/now_playing')
        })
        socket.on('is_manager', function() {
            console.log('is_manager')
        })
        socket.on('wrong_passord', function() {
            alert('check your password')
        })
        function goto(path) {
            $location.path(path);
        }
    }])
})()