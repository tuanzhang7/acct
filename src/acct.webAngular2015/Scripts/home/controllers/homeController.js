(function () {
    'use strict';

    angular.module('acctApp')
        .controller('HomeController', ['$scope', '$http', 'customerSrv', 'settings',
            function ($scope, $http, customerSrv, settings) {
                var baseUrl = settings.baseUrl;
                $scope.page.setTitle('Dashboard');

                var year = '2014';
                $http({ method: 'GET', url: baseUrl + '/Dashboard', params: {} }
                    ).then(function (response) {
                        var dashboard = angular.fromJson(response.data);

                        $scope.dashboard = dashboard;
                    }, function (response) {
                        $scope.data = response.data || "Request failed";
                        $scope.status = response.status;
                    });
                showChart(year);
                showChartCustomer(year);
                showChartSalesman(year);

                function showChart(year) {
                    var url = baseUrl + '/Invoice/GetMonthlyTotal/' + year;
                    $http.get(url).then(function (response) {
                        var chartData = response.data;
                        var chart = AmCharts.makeChart("chartdiv", {
                            "type": "serial",
                            "theme": "light",
                            "dataProvider": chartData,
                            "valueAxes": [{
                                "gridColor": "#FFFFFF",
                                "gridAlpha": 0.2,
                                "dashLength": 0
                            }],
                            "gridAboveGraphs": true,
                            "startDuration": 1,
                            "graphs": [{
                                "balloonText": "[[category]]:<b>[[value]]</b>",
                                "fillAlphas": 0.8,
                                "lineAlpha": 0.2,
                                "type": "column",
                                "valueField": "total"
                            }],
                            "chartCursor": {
                                "categoryBalloonEnabled": false,
                                "cursorAlpha": 0,
                                "zoomable": false
                            },
                            "categoryField": "month",
                            "categoryAxis": {
                                "gridPosition": "start",
                                "gridAlpha": 0,
                                "tickPosition": "start",
                                "tickLength": 20
                            },
                            "exportConfig": {
                                "menuTop": 0,
                                "menuItems": [{
                                    "icon": '/lib/3/images/export.png',
                                    "format": 'png'
                                }]
                            }
                        });
                    });

                }
                function showChartCustomer(year) {
                    var url = baseUrl + '/Invoice/GetYearlyTopCustomer/' + year;
                    $.getJSON(url, function (chartData) {
                        var chart = AmCharts.makeChart("chartdiv_salesby_customer", {
                            "type": "pie",
                            "theme": "light",
                            "legend": {
                                "markerType": "circle",
                                "position": "right",
                                "marginRight": 70,
                                "autoMargins": true
                            },
                            "dataProvider": chartData,
                            "valueField": "total",
                            "titleField": "customer",
                            "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
                        });
                    });
                }
                function showChartSalesman(year) {
                    var url = baseUrl + "/Invoice/GetYearlyTopSalesman/" + year;
                    $.getJSON(url, function (chartData) {
                        var chart = AmCharts.makeChart("chartdiv_salesby_salesman", {
                            "type": "pie",
                            "theme": "light",
                            "legend": {
                                "markerType": "circle",
                                "position": "right",//bottom
                                "marginRight": 70,
                                "autoMargins": true
                            },
                            "dataProvider": chartData,
                            "valueField": "total",
                            "titleField": "salesman",
                            "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
                        });
                    });
                }

            }])
})();




