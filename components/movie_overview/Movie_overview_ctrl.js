(function() {
    'use strict';
    angular.module('GT_Movie.controller')
    .controller('Movie_overview_ctrl', ['$scope', 'socket', 'current_user_info', '$location', function($scope, socket, current_user_info, $location) {
        $scope.movie_info = current_user_info.movie_info;
        $scope.goto = function(path) {
            $location.path(path)
        }
    }])
})()