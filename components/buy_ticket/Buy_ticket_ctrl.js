(function() {
    'use strict';
    angular.module('GT_Movie.controller')
    .controller('Buy_ticket_ctrl', ['$scope', 'socket', 'current_user_info', '$location', function($scope, socket, current_user_info, $location) {
        $scope.select = {};
        $scope.select.Tid = 1;
        $scope.search = {};
        $scope.search.Result = [];
        socket.emit('get_preferred_theaters', current_user_info.user.Username);
        socket.on('preferred_theaters', function(data) {
            $scope.preferred_theaters = data;
            console.log("preferred_theaters: ", data)
        })
        $scope.goto = function(path) {
            $location.path(path);
        }
        $scope.select_theater = function(theater) {
            console.log(theater);
            current_user_info.ticket = {};
            if (theater == undefined)
                current_user_info.ticket.Tid = $scope.select.Tid;
            else
                current_user_info.ticket.Tid = theater.Tid;
            console.log('Buy ticket: ' + current_user_info.user.Username + " select " + current_user_info.ticket.Tid)
            $location.path('/select_time')
        }
        $scope.search_theater = function() {
            var keyword = '%' + $scope.search.Keyword + '%';
            console.log('search_theater: ' + current_user_info.user.Username + ' search ' + keyword )
            socket.emit('search_theater', keyword)
        }
        socket.on('search_theater_result', function(data) {
            $scope.search.Result = data;
            console.log('search_result:\n', data)
        })
    }])
})()