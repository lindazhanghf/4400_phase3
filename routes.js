(function() {
    angular.module('GT_Movie.routes', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
        .when('/login'), {
            templateUrl: 'components/login/login.html',
        }
        .otherwise({redirectTo '/login'})
    }])
})()