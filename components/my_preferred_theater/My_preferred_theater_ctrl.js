(function() {
    'use strict';
    angular.module('GT_Movie.controller')
    .controller('My_preferred_theater_ctrl', ['$scope', 'socket', 'current_user_info', '$location', function($scope, socket, current_user_info, $location) {
        socket.emit('get_preferred_theaters', current_user_info.user.Username);
        socket.on('preferred_theaters', function(data) {
            $scope.theaters = data;
        })
        $scope.goto = function(path) {
            $location.path(path);
        }
    }])
})()