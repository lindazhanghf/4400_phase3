(function() {
    'use strict';
    angular.module('GT_Movie.controller')
    .controller('Give_review_ctrl', ['$scope', 'socket', 'current_user_info', '$location', function($scope, socket, current_user_info, $location) {
        $scope.review = {Rating:'5'};
        $scope.goto = function(path) {
            $location.path(path)
        }
        $scope.movie_info = current_user_info.movie_info;
        $scope.submit_review = function() {
            if (Object.keys($scope.myForm.Title.$error)> 0 || Object.keys($scope.myForm.Comment.$error)> 0) {
                return
            }
            var my_review = $scope.review;
            my_review.Rating = parseInt(my_review.Rating);
            my_review.User = current_user_info.user.Username
            my_review.Mtitle = current_user_info.movie_info.Title
            socket.emit('give_review', my_review)
        }
        socket.on('review_inserted', function() {
            $scope.goto('/review')
        })
    }])
})()