angular.module("myApp")

.controller("ordersCtrl", function ($scope, $rootScope, $http, $http2) {
    function getAdmin() {
        $http2.get("api/getAdmin.php")
            .then(function (response) {
                $rootScope.adName = response.data[0].name
                $rootScope.adPassword = response.data[0].password
                $rootScope.isLoggedIn = response.data[0].loggedIn
                $scope.$apply()
            })
    }
    getAdmin()

    $http.get("api/getOrders.php")
        .then(function (response) {

            $rootScope.orders = response.data

        })


})