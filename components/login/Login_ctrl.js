(function() {
    'use strict';
    angular.module('GT_Movie.controller')
    .controller('Login_ctrl', ['$scope', 'socket', 'current_user_info', function($scope, socket, current_user_info) {
        $scope.user = {};
        console.log($scope.myForm);
        $scope.login = function() {
            $scope.myForm.Password.$dirty = true;
            if (Object.keys($scope.myForm.Username.$error).length != 0 || Object.keys($scope.myForm.Password.$error).length != 0) {
                return
            };
            console.log($scope.user);
            socket.emit('login', $scope.user)
            socket.on('no_user', function() {
                console.log('no user!')
            })
            socket.on('is_customer', function() {
                console.log('is customer')
            })
            socket.on('is_manager', function() {
                console.log('is_manager')
            })
            socket.on('wrong_passord', function() {
                console.log('wrong_passord');
            })
        }
    }])
})()