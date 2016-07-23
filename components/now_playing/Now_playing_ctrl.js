(function() {
    'use strict';
    angular.module('GT_Movie.controller')
    .controller('Now_playing_ctrl', ['$scope', 'socket', 'current_user_info', '$location', function($scope, socket, current_user_info, $location) {
        $scope.goto_me = function() {
            $location.path('/me');
        }
    }])
})()