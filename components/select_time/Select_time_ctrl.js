(function() {
    'use strict';
    angular.module('GT_Movie.controller')
    .controller('Select_time_ctrl', ['$scope', 'socket', 'current_user_info', '$location', function($scope, socket, current_user_info, $location) {
        var showTime_pass_in = {
            Tid: current_user_info.ticket.Tid,
            Mtitle: current_user_info.movie.Title
        }
        $scope.goto = function(path) {
            $location.path(path);
        }
        $scope.movie_info = current_user_info.movie_info;
        current_user_info.ticket.Adult_tickets = '0'
        current_user_info.ticket.Child_tickets = '0'
        current_user_info.ticket.Senior_tickets = '0'
        $scope.ticket = current_user_info.ticket

        socket.emit('get_showtime', showTime_pass_in)
        $scope.date_selected = "";
        socket.on('showtimes', function(dates) {
            $scope.date = {};
            dates.forEach(function(date, index) {
                var date = new Date(date.Showtime);
                console.log(date)
                date = format_date(date);
                var month_day = date.substring(0, 10);
                var hour_min = date.substring(11, date.length)
                if (!$scope.date[month_day]) {
                    $scope.date[month_day] = [];
                }
                $scope.date[month_day].push(hour_min)
            })
            console.log(JSON.stringify($scope.date, null, 2))

        })
        socket.emit('get_system_info')
        socket.on('system_info', function(data) {
            console.log(data);
            $scope.price_info = data;
        })
        $scope.select_date = function(date) {
            $scope.date_selected = date;
            $scope.hour_mins =$scope.date[date];
        }
        $scope.select_time = function(time) {
            $scope.selected_time = time;
            current_user_info.ticket.Date = $scope.date_selected
            current_user_info.ticket.Time = time
            current_user_info.ticket.Mtitle = current_user_info.movie.Title
        }
        $scope.pay = function() {
            if (current_user_info.ticket.Adult_tickets + current_user_info.ticket.Child_tickets + current_user_info.ticket.Senior_tickets == 0) {
                return
            };
            current_user_info.ticket.Adult_tickets = parseInt(current_user_info.ticket.Adult_tickets)
            current_user_info.ticket.Child_tickets = parseInt(current_user_info.ticket.Child_tickets)
            current_user_info.ticket.Senior_tickets = parseInt(current_user_info.ticket.Senior_tickets)
            $scope.goto('/payment_info')
        }
        function format_date(date) {
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var hour = date.getHours();
            var min = date.getMinutes();

            month = '00'.substring(0, 2-month.toString().length) + month
            hour = '00'.substring(0, 2-hour.toString().length) + hour
            min = '00'.substring(0, 2-min.toString().length) + min
            return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':00'
        }
    }])
})()