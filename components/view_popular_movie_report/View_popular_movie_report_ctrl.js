(function() {
    'use strict';
    angular.module('GT_Movie.controller')
    .controller('View_popular_movie_report_ctrl', ['$scope', 'socket', 'current_user_info', '$location', function($scope, socket, current_user_info, $location) {
    	// $scope.report = [];
    	// var today = new Date();
    	// var dd = today.getDate();
    	// var mm = today.getMonth()+1; //January is 0!
    	// for (var i = mm-2; i <= mm; i++) {
    	// 	$scope.report.push(i);
    	// } 
    	// socket.emit('get_revenue_report_gen', $scope.report);
    	// socket.on('revenue_report', result);

        $scope.goto = function(path) {
            $location.path(path)
        }

    }])
})()