(function() {
    'use strict';
    angular.module('GT_Movie.controller')
    .controller('Review_ctrl', ['$scope', 'socket', 'current_user_info', '$location', function($scope, socket, current_user_info, $location) {
        $scope.movie_info = current_user_info.movie_info
        socket.emit('get_movie_review', current_user_info.movie_info.Title);
        socket.on('movie_reviews', function(data) {
            $scope.reviews = data;
        })
        $scope.goto = function(path) {
            $location.path(path);
        }
    }])
})()