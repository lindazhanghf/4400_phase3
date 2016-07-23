(function() {
    'use strict';
    angular.module('GT_Movie.routes', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
        .when('/login', {
            templateUrl: './components/login/Login_ctrl.js',
            controller: 'Login_ctrl'
        })
        .when('/now_playing', {
            templateUrl: './components/now_playing/Now_playing_ctrl.js',
            controller: 'Now_playing_ctrl'
        })
        .when('/me', {
            templateUrl: './components/me/Me_ctrl.js',
            controller: 'Me_ctrl'
        })
        .when('/register', {
            templateUrl: './components/register/Register_ctrl.js',
            controller: 'Register_ctrl'
        })
        .when('/movie', {
            templateUrl: './components/movie/Movie_ctrl.js',
            controller: 'Movie_ctrl'
        })
        .when('/movie_overview', {
            templateUrl: './components/movie_overview/Movie_overview_ctrl.js',
            controller: 'Movie_overview_ctrl'
        })
        .when('/my_payment_info', {
            templateUrl: './components/my_payment_info/My_payment_info_ctrl.js',
            controller: 'My_payment_info_ctrl'
        })
        .when('/my_preferred_theater', {
            templateUrl: './components/my_preferred_theater/My_preferred_theater_ctrl.js',
            controller: 'My_preferred_theater_ctrl'
        })
        .when('/order_detail', {
            templateUrl: './components/order_detail/Order_detail_ctrl.js',
            controller: 'Order_detail_ctrl'
        })
        .when('/order_history', {
            templateUrl: './components/order_history/Order_history_ctrl.js',
            controller: 'Order_history_ctrl'
        })
        .when('/review', {
            templateUrl: './components/review/Review_ctrl.js',
            controller: 'Review_ctrl'
        })
        .when('/search_theater_result', {
            templateUrl: './components/search_theater_result/Search_theater_result_ctrl.js',
            controller: 'Search_theater_result_ctrl'
        })
        .when('/select_time', {
            templateUrl: './components/select_time/Select_time_ctrl.js',
            controller: 'Select_time_ctrl'
        })
        .when('/view_popular_movie_report', {
            templateUrl: './components/view_popular_movie_report/View_popular_movie_report_ctrl.js',
            controller: 'View_popular_movie_report_ctrl'
        })
        .when('/view_revenue_report', {
            templateUrl: './components/view_revenue_report/View_revenue_report_ctrl.js',
            controller: 'View_revenue_report_ctrl'
        })

        .otherwise({
            redirectTo: '/login'
        })
    }])
})()