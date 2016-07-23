(function() {
    'use strict';
    angular.module('GT_Movie.controller')
    .controller('Buy_ticket_ctrl', ['$scope', 'socket', 'current_user_info', '$location', function($scope, socket, current_user_info, $location) {
        function goto(path) {
            $location.path(path);
        }
    }])
})()