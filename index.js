(function() {
    angular.module('GT_Movie', ['GT_Movie.controller', 'GT_Movie.routes']);
    angular.module('GT_Movie.controller', ['GT_Movie.com'])
    angular.module('GT_Movie.com', [])
    angular.module('GT_Movie.routes', []);
    // angular.module('GT_Movie.socket', []);
})();