(function() {
    'use strict';
    angular.module('GT_Movie.routes', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
        .when('/login', {
            templateUrl: 'components/login/login.html',
            controller: 'Login_ctrl'
        })
        .otherwise({
            redirectTo: '/login'
        })
    }])
})()