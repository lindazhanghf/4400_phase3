(function() {
    'use strict';
    angular.module('GT_Movie.routes', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
        .when('/login', {
            templateUrl: './components/login/login.html',
            controller: 'Login_ctrl'
        })
        .when('/now_playing', {
            templateUrl: './components/now_playing/now_playing.html',
            controller: 'Now_playing_ctrl'
        })
        .when('/me', {
            templateUrl: './components/me/me.html',
            controller: 'Me_ctrl'
        })
        .when('/register', {
            templateUrl: './components/register/register.html',
            controller: 'Register_ctrl'
        })
        .when('/movie', {
            templateUrl: './components/movie/movie.html',
            controller: 'Movie_ctrl'
        })
        .when('/movie_overview', {
            templateUrl: './components/movie_overview/movie_overview.html',
            controller: 'Movie_overview_ctrl'
        })
        .when('/my_payment_info', {
            templateUrl: './components/my_payment_info/my_payment_info.html',
            controller: 'My_payment_info_ctrl'
        })
        .when('/my_preferred_theater', {
            templateUrl: './components/my_preferred_theater/my_preferred_theater.html',
            controller: 'My_preferred_theater_ctrl'
        })
        .when('/order_detail', {
            templateUrl: './components/order_detail/order_detail.html',
            controller: 'Order_detail_ctrl'
        })
        .when('/order_history', {
            templateUrl: './components/order_history/order_history.html',
            controller: 'Order_history_ctrl'
        })
        .when('/review', {
            templateUrl: './components/review/review.html',
            controller: 'Review_ctrl'
        })
        .when('/search_theater_result', {
            templateUrl: './components/search_theater_result/search_theater_result.html',
            controller: 'Search_theater_result_ctrl'
        })
        .when('/select_time', {
            templateUrl: './components/select_time/select_time.html',
            controller: 'Select_time_ctrl'
        })
        .when('/view_popular_movie_report', {
            templateUrl: './components/view_popular_movie_report/view_popular_movie_report.html',
            controller: 'View_popular_movie_report_ctrl'
        })
        .when('/view_revenue_report', {
            templateUrl: './components/view_revenue_report/view_revenue_report.html',
            controller: 'View_revenue_report_ctrl'
        })
        .when('/buy_ticket', {
            templateUrl: './components/buy_ticket/buy_ticket.html',
            controller: 'Buy_ticket_ctrl'
        })
        .when('/give_review', {
            templateUrl: './components/give_review/give_review.html',
            controller: 'Give_review_ctrl'
        })
        .when('/payment_info', {
            templateUrl:'./components/payment_info/payment_info.html',
            controller:'Payment_info_ctrl'
        })

        .otherwise({
            redirectTo: '/login'
        })
    }])
})()