(function() {
    'use strict';
    angular.module('GT_Movie.controller')
    .controller('Buy_ticket_ctrl', ['$scope', 'socket', 'current_user_info', '$location', function($scope, socket, current_user_info, $location) {
        $scope.select = {};
        $scope.select.Tid = 1;
        socket.emit('get_preferred_theaters', current_user_info.user.Username);
        socket.on('preferred_theaters', function(data) {
            $scope.preferred_theaters = data;
            console.log("preferred_theaters: ", data)
        })
        $scope.goto = function(path) {
            $location.path(path);
        }
        $scope.select_theater = function() {
            current_user_info.ticket = {};
            current_user_info.ticket.Tid = select.Tid;
            console.log('Buy ticket: ' + current_user_info.user.Username + " select " + current_user_info.ticket.Tid)
            $location.path('/select_time')
        }
        $scope.search_theater = function(search_word) {
            socket.emit('search_theater', search_word)
            console.log('Buy ticket: ' + current_user_info.user.Username + ' search ' + search_word )
        }
        socket.on('search_theater_result', function(data) {
            $scope.search_theater_result = data;
            console.log('search_result:\n', data)
        })
    }])
})()