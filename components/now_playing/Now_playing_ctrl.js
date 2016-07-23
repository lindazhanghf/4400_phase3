(function() {
    'use strict';
    angular.module('GT_Movie.controller')
    .controller('Now_playing_ctrl', ['$scope', 'socket', 'current_user_info', '$location', function($scope, socket, current_user_info, $location) {
        socket.emit('get_now_playing')
        socket.on('now_playing', function(data) {
            console.log(data);
            $scope.movies = data;
        })
        $scope.get_movie = function(movie_name) {
            current_user_info.movie.Title = movie_name;
            $location.path('/movie')
        }
        $scope.goto_me = function() {
            $location.path('/me');
        }
        $scope.logout = function() {
            current_user_info.user = {};
            $location.path('/login')
        }
    }])
})()