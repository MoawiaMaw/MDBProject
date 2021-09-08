angular.module("myApp", ["ngRoute", "mds"])
    .service("$db", function () {

        var db = window.openDatabase('cust', '1.0', 'custmer DB', 50 * 1024 * 1024);
        this.query = function (query, parmaters) {
            console.log(parmaters.length)
            return new Promise(function (resolve, reject) {
                db.transaction(function (tx) {
                    tx.executeSql(query, parmaters, function (tx, results) {
                        var data = []
                        if (results.rows.length > 0) {
                            for (i = 0; i < results.rows.length; i++) {
                                row = results.rows.item(i)
                                data.push(row)
                            }
                        }
                        resolve(data)
                    }, function (tx, error) {
                        console.log('Oops. Error was ' + error.message + '  Code ' + error.code);
                        resolve(false)
                    });

                })
            })
        }
    })
    .config(function ($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "templates/login.html",
                controller: "loginCtrl",
                css: "css/style (2).css"
            })
            .when("/login", {
                templateUrl: "templates/login.html",
                controller: "loginCtrl",
                css: "css/style (2).css"
            })
            .when("/store", {
                templateUrl: "templates/store.html",
                controller: "storeCtrl"
            })
            .when("/orders", {
                templateUrl: "templates/orders.html",
                controller: "ordersCtrl"
            })
            .when("/logout", {
                template: "",
                controller: "logoutCtrl"
            });
    })
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

    .controller("storeCtrl", function ($scope, $rootScope, $http, $http2, $location, $db, $timeout) {
        if (!localStorage['x'] || localStorage['x'] == 0) {
            $timeout(function () {
                $('#loginAlert').slideUp()
                localStorage['x'] = 1
            }, 1500)

        } else {
            $('#loginAlert').css('display', 'none')
            console.log('hi')
        }

        function getProducts() {

            $http2.get("api/getProducts.php")
                .then(function (response) {

                    $scope.products = response.data

                })
        }
        getProducts();
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

        $scope.showForm = function () {

            $(".well").slideToggle("fast")

        }
        $rootScope.showInfo = function () {
            $("#id")
        }
        $scope.addProduct = function () {

            $http2.post("http://localhost/finalProject/api/addProduct.php", {
                name: $scope.name,
                section: $scope.section,
                quantity: $scope.quantity,
                price: $scope.price,
                description: $scope.description,
                image: $scope.x
            }).then(function (response) {
                if (response.data.status) {
                    getProducts()
                    alert("you added a new product successfully")
                    $scope.name = ""
                    $scope.section = ""
                    $scope.quantity = ""
                    $scope.price = ""
                    $scope.description = ""
                    $scope.y = ""
                    $scope.$apply()
                } else {
                    alert("failed to add a product ")
                }
            })
            getProducts()
        }
        $scope.deleteProduct = function (product) {
            var check = confirm("are you sure ?")
            if (check) {
                $http.post("api/deleteProduct.php", {
                    id: product.id
                }).then(function (resp) {
                    if (resp) {
                        alert("product deleted successfully!")
                    }
                })
                getProducts()
            }

        }
        //pre edit product
        $scope.preEdit = function (product, index) {
            $scope.selectedProduct = angular.copy(product)
            $scope.selectedProductIndex = index
            $scope.selectedProduct.price = parseInt($scope.selectedProduct.price)
            $scope.selectedProduct.quantity = parseInt($scope.selectedProduct.quantity)

            $("#myModal").modal("show")
        }
        // update product
        $scope.editProduct = function () {
            var check = confirm("Sure to update product ?")
            if (check) {
                $http.post("api/updateProduct.php", $scope.selectedProduct)
                    .then(function (resp) {
                        if (resp.data.status) {
                            alert("product updated successfully")
                            getProducts()
                            $scope.products[$scope.selectedProductIndex] = $scope.selectedProduct;
                            $("#myModal").modal("hide")
                        }
                    })
            }
        }

        //editImage
        $scope.preEditProductImage = function (file, id) {
            var check = confirm("Sure to change Product image ?")
            if (check) {
                $http2.post("api/editProductImage.php", {
                    id: id,
                    image: file
                }).then(function (resp) {
                    if (resp.data.status) {
                        getProducts()
                        alert("Product image updated successfully")
                        $scope.$apply()
                    }
                    else {
                        alert("Failed to update product image")
                    }
                })
            }
        }

    })
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
    .controller("logoutCtrl", function ($scope, $rootScope, $http, $http2, $location, $db, $timeout) {


        $http.post("api/logout.php")
            .then(function (response) {

                if (response.data.status) {
                    $location.path('')
                }
            })

    })
    .filter("sectionFilter", function ($rootScope) {

        return function (products, productSection) {

            var out = []

            if (productSection == "phones") {
                products.forEach(function (product) {
                    if (product.section == "phones")
                        out.push(product)
                })
            }
            else if (productSection == "laptops") {
                products.forEach(function (product) {
                    if (product.section == "laptops")
                        out.push(product)
                })
            }
            else if (productSection == "electrics") {
                products.forEach(function (product) {
                    if (product.section == "electrics")
                        out.push(product)
                })
            }
            return out
        }

    })
    .directive('head', ['$rootScope', '$compile',
        function ($rootScope, $compile) {
            return {
                restrict: 'E',
                link: function (scope, elem) {
                    var html = '<link rel="stylesheet" ng-repeat="(routeCtrl, cssUrl) in routeStyles" ng-href="{{cssUrl}}" />';
                    elem.append($compile(html)(scope));
                    scope.routeStyles = {};
                    $rootScope.$on('$routeChangeStart', function (e, next, current) {
                        if (current && current.$$route && current.$$route.css) {
                            if (!angular.isArray(current.$$route.css)) {
                                current.$$route.css = [current.$$route.css];
                            }
                            angular.forEach(current.$$route.css, function (sheet) {
                                delete scope.routeStyles[sheet];
                            });
                        }
                        if (next && next.$$route && next.$$route.css) {
                            if (!angular.isArray(next.$$route.css)) {
                                next.$$route.css = [next.$$route.css];
                            }
                            angular.forEach(next.$$route.css, function (sheet) {
                                scope.routeStyles[sheet] = sheet;
                            });
                        }
                    });
                }
            };
        }
    ]);

