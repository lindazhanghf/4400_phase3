(function() {
    'use strict';
    angular.module('GT_Movie.controller')
    .controller('View_revenue_report_ctrl', ['$scope', 'socket', 'current_user_info', '$location', function($scope, socket, current_user_info, $location) {
    	$scope.report = [];
    	var today = new Date();
    	var dd = today.getDate();
    	var mm = today.getMonth()+1; //January is 0!
        var want_n_month = 3;
        socket.emit('get_revenue_report', {from:5, to:7})
    	socket.on('revenue_report', function(result) {
            console.log(result)
    		$scope.report = result;
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