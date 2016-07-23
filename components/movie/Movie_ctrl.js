(function() {
    'use strict';
    angular.module('GT_Movie.controller')
    .controller('Movie_ctrl', ['$scope', 'socket', 'current_user_info', '$location', function($scope, socket, current_user_info, $location) {
        $scope.movie_info ={};
        $scope.goto = function(path) {
            $location.path(path);
        }
        socket.emit('get_movie_info', current_user_info.movie.Title);
        socket.emit('get_movie_review_avg', current_user_info.movie.Title);
        socket.on('movie_info', function(data) {
            $scope.movie_info = data
            current_user_info.movie_info = data
        })
        socket.on('movie_review_avg_rating', function(data) {
            $scope.movie_info.fan_rating = data['AVG(Rating)'];
            current_user_info.fan_rating = data['AVG(Rating)'];
        })
    }])
})()