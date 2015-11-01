(function () {
    'use strict';

    angular.module('acctApp')
        .controller('InvoiceController', ['$scope', '$http', '$location', 'customerSrv', 'invoiceSvc', 'settings',
            function ($scope, $http, $location, customerSrv, invoiceSvc, settings) {

                var pageSize = settings.pageSize;
                $scope.pageSize = pageSize;
                $scope.currentPage = 1;
                $scope.maxSize = 10;
                $scope.page.setTitle('Invoice');


                $scope.dateRangeEnum = {
                    AnyTime: "Any Time",
                    ThisYear: "Current Year",
                    ThisMonth: "Current Month",
                    Last3Month: "Past 3 Month",
                    Last7Days: "Past 7 Days",
                    Last365Days: "Past 365 Days",
                };
                $scope.statusEnum = {
                    All: 0,
                    Open: 0,
                    Unpaid: 1,
                    Partial: 2,
                    Overdue: 4,
                    Paid: 3
                }
                $scope.statusParm = $location.search().status != null ? $location.search().status : "All";

                var _statusParms = $scope.statusParm;
                if ($location.search().status == "All") {
                    _statusParms = ['Unpaid', 'Partial', 'Overdue', 'Paid'];
                }
                else if ($location.search().status == "Open") {
                    _statusParms = ['Unpaid', 'Partial', 'Overdue'];
                }

                $scope.dateRangeParm = $location.search().dateRange != null ? $location.search().dateRange : "AnyTime";

                get($scope.dateRangeParm, _statusParms, $scope.currentPage, pageSize);
                function get(dateRange, status, currentPage, pageSize) {
                    invoiceSvc.list.query({
                        dateRange: dateRange,
                        status: status,
                        page: currentPage,
                        pagesize: pageSize
                    }, function (data, headers) {
                        $scope.invoices = data;
                        var Pagination = angular.fromJson(headers('X-Pagination'));
                        var TotalCount = Pagination.TotalCount;
                        var TotalPages = Pagination.TotalPages;

                        $scope.totalItems = TotalCount;
                        $scope.totalPages = TotalPages;
                    });
                }

                $scope.pageChanged = function () {
                    get($scope.dateRangeParm, _statusParms, $scope.currentPage, pageSize);
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
                    $location.path('/invoice/' + id);
                };
                $scope.print = function (id) {
                    var downloadPath = APISetting + "invoice/print/" + id;
                    window.open(downloadPath, '_self', '');
                }
            }])
        .controller('InvoiceDetailController', ['$scope', '$routeParams', '$location', '$http',
            'customerSrv', 'invoiceSvc', 'APISetting',
            function ($scope, $routeParams, $location, $http, customerSrv, invoiceSvc, APISetting) {
                $scope.invoice = null;
                invoiceSvc.detail.query({id: $routeParams.id}).$promise.then(function (data) {
                    $scope.invoice = data;
                    $scope.page.setTitle('Invoice ' + $scope.invoice.OrderNumber);
                });

                $scope.print = function (id) {
                    var downloadPath = APISetting.apiBase + "invoice/print/" + id;
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
        .controller('InvoicePrintController', ['$scope', '$routeParams', '$location', 'APISetting',
            function ($scope, $routeParams, $location, APISetting) {
                var downloadPath = APISetting + "invoice/print/" + $routeParams.id;
                window.open(downloadPath, '_self', '');
            }])
        .controller('InvoiceEditController', ['$scope', '$routeParams', '$location',
            'customerSrv', 'invoiceSvc',
            function ($scope, $routeParams, $location, customerSrv, invoiceSvc) {

                $scope.invoice = null;
                invoiceSvc.detail.query({id: $routeParams.id}).$promise.then(function (data) {
                    $scope.invoice = data;
                    $scope.page.setTitle('Edit Invoice ' + $scope.invoice.OrderNumber);
                });

                //$scope.customerList = customerSrv.list.query();
                $scope.save = function () {
                    console.log("saving edit");
                    console.log($scope.invoice);
                    $scope.invoice.$save(
                        // success
                        function () {
                            $location.path('/invoice/' + $routeParams.id);
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
        .controller('InvoiceCreateController', ['$scope', '$routeParams', '$location',
            'customerSrv', 'invoiceSvc',
            function ($scope, $routeParams, $location, customerSrv, invoiceSvc) {
                $scope.page.setTitle('Create Invoice ');

                var _orderDetail= [{
                    Qty: 0,
                    UnitPrice: 0,
                    Discount: 0
                }];

                $scope.invoice={
                    OrderDate:new Date(),
                    OrderDetail:_orderDetail
                };
                invoiceSvc.getNextInvoiceNumber.query().$promise.then(function (data) {
                    $scope.invoice.OrderNumber = data.nextNumber;
                });

                $scope.customerList = null;
                customerSrv.list.query({ page:1,pagesize:100 }).$promise.then(function (data) {
                    $scope.customerList = data;
                    $scope.customer = {customerId: data[0].Id};
                });



                $scope.save = function () {
                    console.log("saving create invoice");
                    console.log($scope.invoice);

                    invoiceSvc.detail.create($scope.invoice).$promise.then(function (data) {
                        console.log(data.Id);
                        var newId = data.Id;
                        $location.path('/invoice/' + newId);
                    });
                };
            }]);
})();




