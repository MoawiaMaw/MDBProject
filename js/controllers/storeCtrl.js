angular.module("myApp")
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