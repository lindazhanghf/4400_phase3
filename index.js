(function() {
    angular.module('GT_Movie', ['GT_Movie.socket', 'GT_Movie.routes']);
    angular.module('GT_Movie.controller', ['GT_Movie.socket'])
    angular.module('GT_Movie.routes')
    angular.module('GT_Movie.socket', []);
})();