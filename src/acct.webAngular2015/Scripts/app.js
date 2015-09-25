(function () {
    'use strict';

    config.$inject = ['$routeProvider', '$locationProvider'];

    angular.module('acctApp', [
        'ngRoute',
        'ui.bootstrap',
        'customerServices',
        'invoiceServices',
        'GSTServices'
    ])
    .constant('settings', {
        baseUrl: 'http://localhost:63267/api',
        //baseUrl: '',
        pageSize:10
    })
    .config(config)
    .config(['datepickerConfig','datepickerPopupConfig', function (datepickerConfig, datepickerPopupConfig) {
        datepickerConfig.showWeeks = false;
        datepickerPopupConfig.showButtonBar = false;
        datepickerPopupConfig.datepickerPopup = 'dd/MM/yyyy';
    }])
    .run(['$rootScope', function ($rootScope) {
        $rootScope.page = {
            setTitle: function (title) {
                this.title = title;
            }
        }
        $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
            $rootScope.page.setTitle(current.$$route.title);
        });
    }])
    //.run(function ($httpBackend) {
    //    var customers = [[{ "Id": 6, "Name": "2ADVANCED PTE LTD", "Address": "10 Admiralty St #04-23,24\r\nNorth Link Building\r\nSingapore 757695", "Phone": "NULL", "Fax": "NULL", "Email": null, "ContactName": "Mr Freddy Khong", "idmas_GST": 2, "GST": null, "Order": [] }, { "Id": 7, "Name": "3A SYSTEM (M & E) PTE LTD", "Address": "Blk 37 Defu Lane 10  #03-47\r\nSingapore 529214\r\n", "Phone": "6552 1259", "Fax": "6552 1760", "Email": "eddiegan@malafon.com.sg", "ContactName": "Eddie Gan", "idmas_GST": 2, "GST": null, "Order": [] }, { "Id": 8, "Name": "3A-COOL SERVICES PTE LTD", "Address": "Blk 37 Defu Lane 10  #03-47,\r\nSingapore 529214.", "Phone": "6552 1259", "Fax": "6552 1760", "Email": null, "ContactName": "Mr. Ang", "idmas_GST": 2, "GST": null, "Order": [] }, { "Id": 9, "Name": "3G INTEGRATED PTE LTD", "Address": "Blk 2,  #03-501,\r\nDefu Lane 10,\r\nSingapore  539183\r\n", "Phone": "6281 0306", "Fax": "6281 0326", "Email": null, "ContactName": "Damien Chin", "idmas_GST": 2, "GST": null, "Order": [] }, { "Id": 10, "Name": "3H AIRCONDITIONING ENGINEERING PTE LTD", "Address": "10Admiralty Street\r\n#04-78, North Link Building\r\nSingapore   757695", "Phone": "6483 5702", "Fax": "6483 5703", "Email": "th.yeow@3h-ac.com.sg", "ContactName": "Mr.Yeow Teck Huat/Ms Peggy", "idmas_GST": 2, "GST": null, "Order": [] }, { "Id": 11, "Name": "5 FOOT WAY INN", "Address": "227 South Bridge Rd\r\nSingapore 058776", "Phone": "6223 8083", "Fax": "NULL", "Email": null, "ContactName": "Mr Wei Hao", "idmas_GST": 2, "GST": null, "Order": [] }, { "Id": 12, "Name": "883 ENGINEERING PTE. LTD.", "Address": "15 Changi North Street 1\r\n#01-26 l-Lofts\r\nSingapore 498765", "Phone": "6256 8883 / 6256 2662", "Fax": "6256 8833", "Email": "munited@singnet.com.sg", "ContactName": "Mr Watson / Saifuls", "idmas_GST": 2, "GST": null, "Order": [] }, { "Id": 13, "Name": "A  SENSOR TECH PTE LTD", "Address": "362 Upper Paya Lebar Road #01-14\r\nDa Jin Factory Building \r\nSingapore 534963", "Phone": "6287 7951", "Fax": "6287 7728", "Email": null, "ContactName": "Mr Sebastian Ong/ Kelvin Oh", "idmas_GST": 2, "GST": null, "Order": [] }, { "Id": 14, "Name": "A & JN TECHNICAL SUPPORT PTE LTD", "Address": "No 11,Lok Yong Way\r\nSingapore 658077.", "Phone": "6265 1728", "Fax": "6877 0716/6265 6837", "Email": "otm_engg@pacific.net.sg", "ContactName": "Mr.Chye Joon Num", "idmas_GST": 2, "GST": null, "Order": [] }, { "Id": 15, "Name": "A PLUS FOOD PLACE", "Address": "New Tech Park 151\r\nLor Chuan #02-12", "Phone": "9827 9310", "Fax": "NULL", "Email": null, "ContactName": "Mr Katherine", "idmas_GST": 2, "GST": null, "Order": [] }, { "Id": 16, "Name": "A- STAR DATA STORAGE INSTITUTE", "Address": "Dsi  Building 5 Engineering Drive 1\r\n(Off Kent Ridge Crescent, Nus)\r\nSingapore 117608\r\n\r\n", "Phone": "6874 5089/6874 6600", "Fax": "6777 8517", "Email": null, "ContactName": "Mr Lim Kian Guan", "idmas_GST": 2, "GST": null, "Order": [] }, { "Id": 17, "Name": "A T FORKLIFT REPAIR & SERVICES", "Address": "Blk 331 Bukit Batok Streer 33#04-233\r\nSingapore 650331", "Phone": "NULL", "Fax": "6760 7765", "Email": null, "ContactName": "Mr See Ai Teck", "idmas_GST": 2, "GST": null, "Order": [] }, { "Id": 18, "Name": "A.C.E TAI SOON (S) PTE LTD", "Address": "11 Lorong 15 Geylang \r\nSingapore 388604", "Phone": "6841 3998", "Fax": "NULL", "Email": null, "ContactName": "NULL", "idmas_GST": 2, "GST": null, "Order": [] }, { "Id": 19, "Name": "A.K.ONG ENGINEERING PTE LTD", "Address": "No: 65 Sims Avenue \r\nYi Xiu Factory Building \r\n#01-09\r\nSingapore 387418", "Phone": "6846 1611", "Fax": "6842 1395", "Email": "akongeng@gmail.com", "ContactName": "Ms Joe", "idmas_GST": 2, "GST": null, "Order": [] }, { "Id": 20, "Name": "A.MAX PTE LTD", "Address": "16 Kaki Bukit Crescent \r\nSingapore 416247", "Phone": "6449 9972", "Fax": "6445 1411", "Email": null, "ContactName": "Ms Esther", "idmas_GST": 2, "GST": null, "Order": [] }, { "Id": 21, "Name": "A.P.E ELECTRICAL AND AIRECON ENGINEERING", "Address": "Blk 111#04-620\r\nTeck Whye Lane\r\nSingapore 680111", "Phone": "NULL", "Fax": "NULL", "Email": null, "ContactName": "Mr. David Tee", "idmas_GST": 2, "GST": null, "Order": [] }, { "Id": 22, "Name": "a/a", "Address": "5A ENG KONG TERRACE\r\nSINGAPORE 598977", "Phone": "9099 2788", "Fax": "6750 2015", "Email": null, "ContactName": "TEO", "idmas_GST": 2, "GST": null, "Order": [] }, { "Id": 23, "Name": "A/C-TPL", "Address": "No. 96 Mandai Estate \r\nSingapore 729927", "Phone": "6362 0660", "Fax": "6362 0770", "Email": null, "ContactName": "Kenny Ng", "idmas_GST": 2, "GST": null, "Order": [] }, { "Id": 24, "Name": "A\\C", "Address": "19, Senoko Ave,\r\nSingapore 758308.", "Phone": "6365 2688", "Fax": "6365 5956", "Email": "eddiegan@malafon.com.sg", "ContactName": "Eddie Gan", "idmas_GST": 2, "GST": null, "Order": [] }, { "Id": 25, "Name": "AAA INTEGRATE PTE LTD", "Address": "Blk 63, #05-281\r\nCircuit Road\r\nSingapore 370063", "Phone": "NULL", "Fax": "NULL", "Email": null, "ContactName": "Mr KPC Gupthan", "idmas_GST": 2, "GST": null, "Order": [] }]];
    //    $httpBackend.whenGET(/^\/views\//).passThrough();

    //    $httpBackend.whenGET('/customer?page=1&pagesize=10').respond(function (method, url, data, headers) {
    //        headers['Content-Type'] == 'application/json;charset=utf-8'
    //        var pageHeader = {
    //                "TotalCount": 2219,
    //                "TotalPages": 111
    //        };
    //        return [200, customers, { 'X-Pagination': pageHeader }, "OK"];
    //    });
        
    //})
    ;


    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/views/home/index.html',
                controller: 'HomeController'
            })
            .when('/customer', {
                templateUrl: '/views/customer/list.html',
                controller: 'CustomerController'
            })
            .when('/customer/create', {
                templateUrl: '/views/customer/create.html',
                controller: 'CustomerCreateController'
            })
            .when('/customer/:id', {
                templateUrl: '/views/customer/detail.html',
                controller: 'CustomerDetailController'
            })
            .when('/customer/edit/:id', {
                templateUrl: '/views/customer/edit.html',
                controller: 'CustomerEditController'
            })
            .when('/invoice', {
                templateUrl: '/views/invoice/list.html',
                controller: 'InvoiceController'
            })
            .when('/invoice/:id', {
                templateUrl: '/views/invoice/detail.html',
                controller: 'InvoiceDetailController'
            })
            .when('/invoice/edit/:id', {
                templateUrl: '/views/invoice/edit.html',
                controller: 'InvoiceEditController'
            })
            .when('/GST', {
                templateUrl: '/views/gst/list.html',
                controller: 'GSTController'
            })
            .when('/GST/:id', {
                templateUrl: '/views/gst/detail.html',
                controller: 'GSTDetailController'
            })
            .when('/GST/edit/:id', {
                templateUrl: '/views/gst/edit.html',
                controller: 'GSTEditController'
            })
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);
    }

    /* Utility Functions */

    function _showValidationErrors($scope, error) {
        $scope.validationErrors = [];
        if (error.data && angular.isObject(error.data)) {
            for (var key in error.data) {
                $scope.validationErrors.push(error.data[key][0]);
            }
        } else {
            $scope.validationErrors.push('Could not add movie.');
        };
    }

})();