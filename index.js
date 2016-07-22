(function() {
    'use strict';
    angular.module('GT_Movie', ['GT_Movie.controller', 'GT_Movie.routes']);
    angular.module('GT_Movie.controller', ['GT_Movie.com', 'ngMessages', 'GT_Movie.current_user_info'])
    angular.module('GT_Movie.com', [])
    angular.module('GT_Movie.current_user_info', [])
    angular.module('GT_Movie.routes', []);
    // angular.module('GT_Movie.socket', []);
})();