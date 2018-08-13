//My Module
var app = angular.module('TweetListDisplay', []);

/**
 * My controller
 * 
 */
app.controller('MainController', ['$scope', '$http', '$interval', function ($scope, $http, $interval) {
    refresh();

    //refresh page every second
    $interval(refresh, 1000);

    /**
     * Http get request called after database update
     *
     */
    function refresh() {
        $http.get('/api/tweets')
            .success(function (data) {
                $scope.tweets = data;
            })
            .error(function (err) {
                return err;
            });
    }

    /**
     * Http post request called from script.js in post()
     *
     */
    $scope.postTweet = function (cnt, ky) {
        $http.post('/api/tweets', {
            content: cnt,
            key: ky
        }).
        success(function (data, status) {
            refresh();
        }).
        error(function (data, status) {
            window.alert("Failed to post to database. Please refresh page.");
        });

    };

    /**
     * Http delete request called when a tweet is clicked
     *
     */
    $scope.deleteTweet = function (index) {
        $http.delete('/api/tweets/' + $scope.tweets[$scope.tweets.length - 1 - index]._id).
        success(function (data, status) {
            refresh();
        }).
        error(function (data, status) {
            window.alert("Failed to delete from database. Please refresh page.");
            console.log(data);
        });

    };
}]);
