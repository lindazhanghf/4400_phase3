(function() {
    'use strict';
    angular.module('GT_Movie.controller')
    .controller('Movie_ctrl', ['$scope', 'socket', 'current_user_info', '$location', function($scope, socket, current_user_info, $location) {
        current_user_info.movie = 'test_movie'
    }])
})()