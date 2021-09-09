angular.module("myApp")

.controller("loginCtrl", function ($scope, $rootScope, $http, $http2, $location, $timeout) {
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
    $scope.checkAdmin = function () {
        if ($scope.name == $scope.adName && $scope.password == $scope.adPassword) {

            $http.post("api/login.php", {
                name: $scope.name,
                password: $scope.password
            }).then(function (response) {
                if (response.data.status) {
                    // alert("logged in");
                    $location.path('store')
                    getAdmin()
                }
            })



        } else {
            alert("name or password might be wrong");
            $scope.password = ""
        }

    }
    if (localStorage['x'] == 1) {
        $timeout(function () {
            $('#logoutAlert').animate({
                'opacity': '0',
                'display': 'block'
            })
            localStorage['x'] = 0
        }, 1500)

    } else {
        $('#logoutAlert').css({
            'display': 'block',
            'opacity': '0'
        })
        console.log('hi')
    }

})
