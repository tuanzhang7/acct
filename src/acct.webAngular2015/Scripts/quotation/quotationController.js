(function () {
    'use strict';

    angular.module('acctApp')
        .controller('QuotationController', ['$scope', '$http', '$location', 'customerSrv', 'quotationSvc', 'settings',
            function ($scope, $http, $location, customerSrv, quotationSvc, settings) {
                var pageSize = settings.pageSize;
                $scope.pageSize = pageSize;
                $scope.currentPage = 1;
                $scope.maxSize = 10;
                $scope.page.setTitle('Quotation');


                $scope.dateRangeEnum = {
                    AnyTime: "Any Time",
                    ThisYear: "Current Year",
                    ThisMonth: "Current Month",
                    Last3Month: "Past 3 Month",
                    Last7Days: "Past 7 Days",
                    Last365Days: "Past 365 Days",
                };

                $scope.dateRangeParm = $location.search().dateRange != null ? $location.search().dateRange : "AnyTime";

                get($scope.dateRangeParm,  $scope.currentPage, pageSize);
                function get(dateRange, status, currentPage, pageSize) {
                    quotationSvc.list.query({
                        dateRange: dateRange,
                        page: currentPage,
                        pagesize: pageSize
                    }, function (data, headers) {
                        $scope.quotations = data;
                        var Pagination = angular.fromJson(headers('X-Pagination'));
                        var TotalCount = Pagination.TotalCount;
                        var TotalPages = Pagination.TotalPages;

                        $scope.totalItems = TotalCount;
                        $scope.totalPages = TotalPages;
                    });
                }

                $scope.pageChanged = function () {
                    get($scope.dateRangeParm,  $scope.currentPage, pageSize);
                };

                $scope.lookup = function (q) {
                    return customerSrv.lookup.query({q: q, limit: 10}).$promise.then(function (data) {
                        return data;
                    });
                };

                $scope.onSelect = function ($item, $model, $label) {
                    $scope.$item = $item;
                    $scope.$model = $model;
                    $scope.$label = $label;

                    var id = $item.id;
                    $location.path('/quotation/' + id);
                };
                $scope.print = function (id) {
                    var downloadPath = APISetting + "quotation/print/" + id;
                    window.open(downloadPath, '_self', '');
                }
            }])
        .controller('QuotationDetailController', ['$scope', '$routeParams', '$location', '$http',
            'customerSrv', 'quotationSvc', 'APISetting',
            function ($scope, $routeParams, $location, $http, customerSrv, quotationSvc, APISetting) {
                $scope.quotation = null;
                quotationSvc.detail.query({id: $routeParams.id}).$promise.then(function (data) {
                    $scope.quotation = data;
                    $scope.page.setTitle('Quotation ' + $scope.quotation.OrderNumber);
                });

                $scope.print = function (id) {
                    var downloadPath = APISetting.apiBase + "quotation/print/" + id;
                    //window.open(downloadPath, '_self', ''); //not working when server need authentication

                    $http.get(downloadPath, {
                        responseType: 'arraybuffer'
                    }).
                        success(function (data, status, headers, config) {
                            var contentDisposition = headers('Content-Disposition');
                            console.log(contentDisposition);
                            var filenameExp = RegExp("filename=(.*)");
                            var fileName = filenameExp.exec(contentDisposition)[1];
                            console.log(fileName);
                            var file = new Blob([data], {type: 'application/pdf'});
                            var fileURL = URL.createObjectURL(file);
                            saveAs(file, fileName);
                        }).
                        error(function (data, status, headers, config) {
                            console.log("error when download");
                            // if there's an error you should see it here
                        });

                }

            }])
        .controller('QuotationPrintController', ['$scope', '$routeParams', '$location', 'APISetting',
            function ($scope, $routeParams, $location, APISetting) {
                var downloadPath = APISetting + "quotation/print/" + $routeParams.id;
                window.open(downloadPath, '_self', '');
            }])
        .controller('QuotationEditController', ['$scope', '$routeParams', '$location',
            'customerSrv', 'quotationSvc',
            function ($scope, $routeParams, $location, customerSrv, quotationSvc) {

                $scope.quotation = null;
                quotationSvc.detail.query({id: $routeParams.id}).$promise.then(function (data) {
                    $scope.quotation = data;
                    $scope.page.setTitle('Edit Quotation ' + $scope.quotation.OrderNumber);
                });

                $scope.customerList = null;
                customerSrv.list.query({ page:1,pagesize:100 }).$promise.then(function (data) {
                    $scope.customerList = data;
                });

                //$scope.customerList = customerSrv.list.query();
                $scope.save = function () {
                    console.log("saving edit");
                    console.log($scope.quotation);
                    $scope.quotation.$save(
                        // success
                        function () {
                            $location.path('/quotation/' + $routeParams.id);
                        },
                        // error
                        function (error) {
                            //_showValidationErrors($scope, error);
                        }
                    );
                };

                $scope.getCustomer = function (val) {
                    return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
                        params: {
                            address: val,
                            sensor: false
                        }
                    }).then(function (response) {
                        return response.data.results.map(function (item) {
                            return item.formatted_address;
                        });
                    });
                };

            }])
        .controller('QuotationCreateController', ['$scope', '$routeParams', '$location',
            'customerSrv', 'quotationSvc',
            function ($scope, $routeParams, $location, customerSrv, quotationSvc) {
                $scope.page.setTitle('Create Quotation ');

                var _orderDetail= [{
                    Qty: 0,
                    UnitPrice: 0,
                    Discount: 0
                }];

                $scope.quotation={
                    OrderDate:new Date(),
                    GSTRate:0,
                    OrderDetail:_orderDetail
                };
                quotationSvc.getNextQuotationNumber.query().$promise.then(function (data) {
                    $scope.quotation.OrderNumber = data.nextNumber;
                });

                $scope.customerList = null;
                customerSrv.list.query({ page:1,pagesize:100 }).$promise.then(function (data) {
                    $scope.customerList = data;
                    $scope.customer = {customerId: data[0].Id};
                });

                $scope.save = function () {
                    console.log("saving create quotation");
                    console.log($scope.quotation);

                    quotationSvc.detail.create($scope.quotation).$promise.then(function (data) {
                        console.log(data.Id);
                        var newId = data.Id;
                        $location.path('/quotation/' + newId);
                    });
                };
            }]);
})();
