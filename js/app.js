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

