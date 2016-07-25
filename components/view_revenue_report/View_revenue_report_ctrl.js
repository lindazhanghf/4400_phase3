(function() {
    'use strict';
    angular.module('GT_Movie.controller')
    .controller('View_revenue_report_ctrl', ['$scope', 'socket', 'current_user_info', '$location', function($scope, socket, current_user_info, $location) {
    	$scope.report = [];
    	var today = new Date();
    	var dd = today.getDate();
    	var mm = today.getMonth()+1; //January is 0!
    	for (var i = mm-2; i <= mm; i++) {
    		$scope.report.push({month:i});
    	} 
    	// console.log($scope.report);
    	socket.emit('get_revenue_report', $scope.report);
    	socket.on('revenue_report', function(result) {
    		$scope.report = result;
	    	console.log(JSON.stringify(result))
    	});

        $scope.goto = function(path) {
            $location.path(path);
        }
        $scope.getMonthName = function(monthNumber) {
			var monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June',
				'July', 'August', 'September', 'October', 'November', 'December' ];
			return monthNames[monthNumber - 1];
        }
    }])
})()