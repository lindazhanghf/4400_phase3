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
        $scope.theater = current_user_info.selected_theater;
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
            current_user_info.ticket.Adult_tickets = '0'
            current_user_info.ticket.Child_tickets = '0'
            current_user_info.ticket.Senior_tickets = '0'
            $scope.date_selected = date;
            $scope.hour_mins =$scope.date[date];
            $scope.selected_time = "";
        }
        $scope.select_time = function(time) {
            current_user_info.ticket.Adult_tickets = '0'
            current_user_info.ticket.Child_tickets = '0'
            current_user_info.ticket.Senior_tickets = '0'
            $scope.selected_time = time;

        }
        $scope.pay = function() {
            if (current_user_info.ticket.Adult_tickets + current_user_info.ticket.Child_tickets + current_user_info.ticket.Senior_tickets == 0) {
                return
            };
            var ticket = generate_ticket();
            if (current_user_info.ticket.card.Expiration_date < new Date()) {
                alert("Can't proceed, selected card is expired");
                return
            };
            ticket.Cno = JSON.parse(current_user_info.ticket.card).Card_number;
            console.log(ticket);
            socket.emit('pay_using_saved_card', ticket)

        }
        $scope.expired = false
        function hasErr() {
            return Object.keys($scope.myForm.Name_on_card.$error).length +  Object.keys($scope.myForm.Card_number.$error).length + Object.keys($scope.myForm.Cvv.$error).length + Object.keys($scope.myForm.Expiration_date.$error).length
        }
        function generate_ticket () {
            return {
                Date: $scope.date_selected,
                User: current_user_info.user.Username,
                Time: $scope.selected_time,
                Mtitle: current_user_info.movie.Title,
                Adult_tickets: parseInt(current_user_info.ticket.Adult_tickets),
                Child_tickets: parseInt(current_user_info.ticket.Child_tickets),
                Senior_tickets: parseInt(current_user_info.ticket.Senior_tickets),
                Status:'unused',
                Cno:$scope.newCard.Card_number,
                Mtitle:current_user_info.movie.Title,
                Tid:current_user_info.ticket.Tid
            }
        }
        $scope.hasErr = hasErr;
        $scope.pay_using_new_card = function() {
            $scope.myForm.Name_on_card.$dirty = true
            $scope.myForm.Card_number.$dirty = true
            $scope.myForm.Cvv.$dirty = true
            $scope.myForm.Expiration_date.$dirty = true
            console.log($scope.newCard);
            if (hasErr()) {
                return
            };

            if ($scope.newCard.Expiration_date < new Date()) {
                $scope.expired = true;
                return
            };
            var newCard = JSON.parse(JSON.stringify($scope.newCard))
            newCard.Expiration_date = format_date(new Date($scope.newCard.Expiration_date)).substring(0, 11);
            var ticket = generate_ticket()
            console.log(ticket)
            console.log(newCard)
            socket.emit('pay_using_new_card', {newCard: newCard, ticket: ticket})
        }
        socket.emit('get_my_payment_info', current_user_info.user.Username)
        socket.on('my_pament_info', function(data) {
            console.log(data);
            $scope.cards = data;
        })

        $scope.newCard = {
            Card_number:"",
            User: current_user_info.user.Username,
            Saved: false,
            Cvv:"",
            Expiration_date:"",
            Name_on_card:""
        };
        function format_date(date) {
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var hour = date.getHours();
            var min = date.getMinutes();

            month = '00'.substring(0, 2-month.toString().length) + month
            hour = '00'.substring(0, 2-hour.toString().length) + hour
            min = '00'.substring(0, 2-min.toString().length) + min
            day = '00'.substring(0, 2-day.toString().length) + day
            return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':00'
        }
        $scope.paid = false;
        $scope.Order_ID = 0;
        $scope.$watch('paid', function() {console.log('paid changed')})
        $scope.$watch('Order_ID', function() {console.log('Order_ID changed')})
        socket.on('Order_ID', function(data) {
            $scope.paid = true;
            console.log(data);
            $scope.Order_ID = data['LAST_INSERT_ID()'];
        })
    }])
})()