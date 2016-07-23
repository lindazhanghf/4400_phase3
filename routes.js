(function() {
    'use strict';
    angular.module('GT_Movie.routes', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
        .when('/login', {
            templateUrl: 'components/login/login.html',
            controller: 'Login_ctrl'
        })
        .when('/now_playing',  {
            templateUrl: 'components/now_playing/now_playing.html',
            controller: 'Now_playing_ctrl'
        })
        .when('/register', {
            templateUrl: 'components/register/register.html',
            controller: 'Register_ctrl'
        })
        .when('/me', {
            templateUrl:'components/me/me.html',
            controller: 'Me_ctrl'
        })
        .otherwise({
            redirectTo: '/login'
        })
    }])
})()