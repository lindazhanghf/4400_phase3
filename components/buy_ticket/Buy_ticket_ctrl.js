(function() {
    'use strict';
    angular.module('GT_Movie.controller')
    .controller('Buy_ticket_ctrl', ['$scope', 'socket', 'current_user_info', '$location', function($scope, socket, current_user_info, $location) {
        socket.emit('get_preferred_theaters', current_user_info.user.Username);
        socket.on('preferred_theaters', function(data) {
            $scope.preferred_theaters = data;
            console.log("preferred_theaters: ", data)
        })
        function goto(path) {
            $location.path(path);
        }
        function select_theater(theater_id) {
            current_user_info.ticket.Tid = theater_id;
            console.log('Buy ticket: ' + current_user_info.user.Username + " select ", + theater_id.toString())
            $location.path('/select_time')
        }
        function search_theater(search_word) {
            socket.emit('search_theater', search_word)
            console.log('Buy ticket: ' + current_user_info.user.Username + ' search ' + search_word )
        }
        socket.on('search_theater_result', function(data) {
            $scope.search_theater_result = data;
            console.log('search_result:\n', data)
        })
    }])
})()