angular.module("myApp")

.controller("logoutCtrl", function ($scope, $rootScope, $http, $http2, $location, $db, $timeout) {


    $http.post("api/logout.php")
        .then(function (response) {

            if (response.data.status) {
                $location.path('')
            }
        })

})