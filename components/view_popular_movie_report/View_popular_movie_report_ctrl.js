(function() {
    'use strict';
    angular.module('GT_Movie.controller')
    .controller('View_popular_movie_report_ctrl', ['$scope', 'socket', 'current_user_info', '$location', function($scope, socket, current_user_info, $location) {
    	$scope.report = {};
        var want_n_month = 3;
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        for (var i = mm-want_n_month+1; i <= mm; i++) {
            socket.emit('get_popular_movie_report', i)
        }
    	socket.on('popular_movie_report',function(result) {
            console.log('result:', JSON.stringify(result))
            $scope.report[result.month.toString()] = result.result;
        });

        $scope.goto = function(path) {
            $location.path(path)
        }
        $scope.getMonthName = function(monthNumber) {
            var monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December' ];
            return monthNames[monthNumber - 1];
        }

    }])
})()