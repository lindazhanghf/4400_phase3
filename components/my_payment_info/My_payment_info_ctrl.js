(function() {
    'use strict';
    angular.module('GT_Movie.controller')
    .controller('My_payment_info_ctrl', ['$scope', 'socket', 'current_user_info', '$location', function($scope, socket, current_user_info, $location) {
        $scope.goto = function(path) {
            $location.path(path);
        }
        socket.emit('get_my_payment_info', current_user_info.user.Username)
        socket.on('my_pament_info', function(data) {
            console.log(data);
            $scope.cards = data;
            $scope.delete_saved_card = function(card) {
                var data = {Card_number: card.Card_number, User: current_user_info.user.Username}
                socket.emit('delete_saved_payment_info', data)
            }
        })
    }])
})()