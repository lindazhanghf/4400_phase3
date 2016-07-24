(function() {
    'use strict';
    angular.module('GT_Movie.controller')
    .controller('Select_time_ctrl', ['$scope', 'socket', 'current_user_info', '$location', function($scope, socket, current_user_info, $location) {
        var showTime_pass_in = {
            Tid: current_user_info.ticket.Tid,
            Mtitle: current_user_info.movie.Title
        }
        socket.emit('get_showtime', showTime_pass_in)
    }])
})()