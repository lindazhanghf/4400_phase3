(function() {
    'use strict';
    angular.module('GT_Movie.controller')
    .controller('Manager_view_ctrl', ['$scope', 'socket', 'current_user_info', '$location', function($scope, socket, current_user_info, $location) {
        $scope.goto = function(path) {
            $location.path(path);
        }
        $scope.logout = function() {
            current_user_info.user = {};
            $location.path('/login')
        }

    }])
})()