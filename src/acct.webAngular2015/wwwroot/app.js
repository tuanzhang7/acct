!function(){"use strict";function config($routeProvider,$locationProvider){$routeProvider.when("/",{templateUrl:"/views/home/index.html",controller:"HomeController"}).when("/customer",{templateUrl:"/views/customer/list.html",controller:"CustomerController"}).when("/customer/create",{templateUrl:"/views/customer/create.html",controller:"CustomerCreateController"}).when("/customer/:id",{templateUrl:"/views/customer/detail.html",controller:"CustomerDetailController"}).when("/customer/edit/:id",{templateUrl:"/views/customer/edit.html",controller:"CustomerEditController"}).when("/invoice",{templateUrl:"/views/invoice/list.html",controller:"InvoiceController"}).when("/invoice/:id",{templateUrl:"/views/invoice/detail.html",controller:"InvoiceDetailController"}).when("/invoice/edit/:id",{templateUrl:"/views/invoice/edit.html",controller:"InvoiceEditController"}).when("/GST",{templateUrl:"/views/gst/list.html",controller:"GSTController"}).when("/GST/:id",{templateUrl:"/views/gst/detail.html",controller:"GSTDetailController"}).when("/GST/edit/:id",{templateUrl:"/views/gst/edit.html",controller:"GSTEditController"}).otherwise({redirectTo:"/"}),$locationProvider.html5Mode(!0)}config.$inject=["$routeProvider","$locationProvider"],angular.module("acctApp",["ngRoute","ui.bootstrap","customerServices","invoiceServices","GSTServices"]).constant("Config",{viewDir:"views/",API:{useMocks:!1,fakeDelay:100,protocol:window.location.protocol.split(":")[0],host:"localhost",port:3e3,path:"/api"}}).factory("APIBase",function(Config){var apiBase=Config.API.protocol+"://"+Config.API.host+":"+Config.API.port+Config.API.path+"/";return console.log(apiBase),apiBase}).constant("settings",{pageSize:10}).config(config).config(["datepickerConfig","datepickerPopupConfig",function(datepickerConfig,datepickerPopupConfig){datepickerConfig.showWeeks=!1,datepickerPopupConfig.showButtonBar=!1,datepickerPopupConfig.datepickerPopup="dd/MM/yyyy"}]).run(["$rootScope",function($rootScope){$rootScope.page={setTitle:function(title){this.title=title}},$rootScope.$on("$routeChangeSuccess",function(event,current,previous){$rootScope.page.setTitle(current.$$route.title)})}])}(),function(){"use strict";angular.module("acctApp").controller("GSTController",["$scope","GSTSrv",function($scope,GSTSrv){$scope.page.setTitle("GST"),GSTSrv.list.query({},function(data,headers){$scope.GSTs=data})}]).controller("GSTDetailController",["$scope","$routeParams","$location","GSTSrv","invoiceSvc",function($scope,$routeParams,$location,GSTSrv){$scope.GST=null,GSTSrv.detail.query({id:$routeParams.id}).$promise.then(function(data){$scope.GST=data,$scope.page.setTitle($scope.GST.Name)})}]).controller("GSTEditController",["$scope","$routeParams","$location","GSTSrv",function($scope,$routeParams,$location,GSTSrv){$scope.GST=null,GSTSrv.detail.query({id:$routeParams.id}).$promise.then(function(data){$scope.GST=data,$scope.page.setTitle($scope.GST.Name)}),$scope.edit=function(){$scope.GST.$save(function(){console.log("saving..."),$location.path("/GST/"+$routeParams.id)},function(error){})}}])}(),function(){"use strict";var GSTServiceModule=angular.module("GSTServices",["ngResource"]);GSTServiceModule.factory("GSTSrv",function($resource,APIBase){var baseUrl=APIBase;return{list:$resource(baseUrl+"GST",{},{query:{method:"GET",params:{},isArray:!0,headers:{}}}),detail:$resource(baseUrl+"GST/:id",{},{query:{method:"GET",params:{id:"@id"}},update:{method:"PUT",params:{id:"@id"}},"delete":{method:"DELETE",params:{id:"@id"}}})}})}(),function(){"use strict";angular.module("acctApp").controller("CustomerController",["$scope","$http","$location","customerSrv","settings",function($scope,$http,$location,customerSrv,settings){function get(currentPage,pageSize){customerSrv.list.query({page:currentPage,pagesize:pageSize},function(data,headers){$scope.customers=data;var Pagination=angular.fromJson(headers("X-Pagination")),TotalCount=Pagination.TotalCount,TotalPages=Pagination.TotalPages;$scope.totalItems=TotalCount,$scope.totalPages=TotalPages})}var pageSize=settings.pageSize;$scope.pageSize=pageSize,$scope.currentPage=1,$scope.maxSize=10,$scope.page.setTitle("Customers"),get($scope.currentPage,pageSize),$scope.lookup=function(q){return customerSrv.lookup.query({q:q,limit:10}).$promise.then(function(data){return data})},$scope.onSelect=function($item,$model,$label){$scope.$item=$item,$scope.$model=$model,$scope.$label=$label;var id=$item.id;$location.path("/customer/"+id)},$scope.pageChanged=function(){get($scope.currentPage,pageSize)}}]).controller("CustomerDetailController",["$scope","$routeParams","$location","customerSrv","invoiceSvc",function($scope,$routeParams,$location,customerSrv,invoiceSvc){$scope.transactions=invoiceSvc.listByCustomer.query({id:$routeParams.id}),$scope.balance=customerSrv.balance.query({id:$routeParams.id}),$scope.customer=null,customerSrv.detail.query({id:$routeParams.id}).$promise.then(function(data){$scope.customer=data,$scope.page.setTitle($scope.customer.Name)})}]).controller("CustomerCreateController",["$scope","$routeParams","$location","customerSrv","GSTSrv",function($scope,$routeParams,$location,customerSrv,GSTSrv){$scope.page.setTitle("Create Customer"),$scope.customer=null,$scope.GSTList=null,GSTSrv.list.query().$promise.then(function(data){$scope.GSTList=data,$scope.customer={idmas_GST:data[0].Id}}),$scope.create=function(){console.log($scope.customer.Name),customerSrv.detail.create($scope.customer).$promise.then(function(data){var newId=data.Id;$location.path("/customer/"+newId)})}}]).controller("CustomerEditController",["$scope","$routeParams","$location","customerSrv","GSTSrv",function($scope,$routeParams,$location,customerSrv,GSTSrv){$scope.customer=null,customerSrv.detail.query({id:$routeParams.id}).$promise.then(function(data){$scope.customer=data,$scope.page.setTitle($scope.customer.Name)}),$scope.GSTList=GSTSrv.list.query(),$scope.edit=function(){$scope.customer.$save(function(){$location.path("/customer/"+$routeParams.id)},function(error){})}}])}(),function(){"use strict";var customerServiceModule=angular.module("customerServices",["ngResource"]);customerServiceModule.factory("customerSrv",function($resource,APIBase){var baseUrl=APIBase;return{list:$resource(baseUrl+"customer?page=:page&pagesize=:pagesize",{},{query:{method:"GET",params:{page:"@page",pagesize:"@pagesize"},isArray:!0,headers:{}}}),detail:$resource(baseUrl+"customer/:id",{},{create:{method:"POST"},query:{method:"GET",params:{id:"@id"}},update:{method:"PUT",params:{id:"@id"}},"delete":{method:"DELETE",params:{id:"@id"}}}),balance:$resource(baseUrl+"customer/:id/balance",{},{query:{method:"GET",params:{id:"@id"}}}),lookup:$resource(baseUrl+"customer/lookup?q=:q&limit=:limit",{},{query:{method:"GET",params:{q:"@q",limit:"@limit"},isArray:!0}})}})}(),angular.module("acctApp").directive("datePicker",function(){function link(scope,element,attrs){scope.status={opened:!1},scope.open=function($event){scope.status.opened=!0}}return{scope:{date:"=date"},templateUrl:function(elem,attr){return"/views/directives/_datePicker.html"},link:link}}),angular.module("acctApp").directive("orderDetails",function(){return{scope:{order:"=order"},templateUrl:function(elem,attr){return"/views/directives/_orderDetails.html"}}}).directive("orderLines",function(){return{scope:{lines:"=lines"},templateUrl:function(elem,attr){return"/views/directives/_orderLines.html"}}}).directive("orderList",function(){return{scope:{orders:"=orders"},templateUrl:function(elem,attr){return"/views/directives/_orderList.html"}}}).directive("orderForm",function(){return{scope:{order:"=order"},templateUrl:function(elem,attr){return"/views/directives/_orderForm.html"}}}),angular.module("acctApp").directive("orderStatus",function(){return{scope:{status:"=status"},templateUrl:function(elem,attr){return"/views/directives/_status.html"}}}),function(){"use strict";angular.module("acctApp").controller("HomeController",["$scope","$http","customerSrv","APIBase",function($scope,$http,customerSrv,APIBase){function showChart(year){var url=baseUrl+"invoice/GetMonthlyTotal/"+year;$http.get(url).then(function(response){var chartData=response.data;AmCharts.makeChart("chartdiv",{type:"serial",theme:"light",dataProvider:chartData,valueAxes:[{gridColor:"#FFFFFF",gridAlpha:.2,dashLength:0}],gridAboveGraphs:!0,startDuration:1,graphs:[{balloonText:"[[category]]:<b>[[value]]</b>",fillAlphas:.8,lineAlpha:.2,type:"column",valueField:"total"}],chartCursor:{categoryBalloonEnabled:!1,cursorAlpha:0,zoomable:!1},categoryField:"month",categoryAxis:{gridPosition:"start",gridAlpha:0,tickPosition:"start",tickLength:20},exportConfig:{menuTop:0,menuItems:[{icon:"/lib/3/images/export.png",format:"png"}]}})})}function showChartCustomer(year){var url=baseUrl+"invoice/GetYearlyTopCustomer/"+year;$.getJSON(url,function(chartData){AmCharts.makeChart("chartdiv_salesby_customer",{type:"pie",theme:"light",legend:{markerType:"circle",position:"right",marginRight:70,autoMargins:!0},dataProvider:chartData,valueField:"total",titleField:"customer",balloonText:"[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>"})})}function showChartSalesman(year){var url=baseUrl+"invoice/GetYearlyTopSalesman/"+year;$.getJSON(url,function(chartData){AmCharts.makeChart("chartdiv_salesby_salesman",{type:"pie",theme:"light",legend:{markerType:"circle",position:"right",marginRight:70,autoMargins:!0},dataProvider:chartData,valueField:"total",titleField:"salesman",balloonText:"[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>"})})}var baseUrl=APIBase;console.log(baseUrl),$scope.page.setTitle("Dashboard");var year="2014";$http({method:"GET",url:baseUrl+"Dashboard",params:{}}).then(function(response){var dashboard=angular.fromJson(response.data);$scope.dashboard=dashboard},function(response){$scope.data=response.data||"Request failed",$scope.status=response.status}),showChart(year),showChartCustomer(year),showChartSalesman(year)}])}(),function(){"use strict";angular.module("acctApp").controller("InvoiceController",["$scope","$http","$location","customerSrv","invoiceSvc","settings",function($scope,$http,$location,customerSrv,invoiceSvc,settings){function get(currentPage,pageSize){invoiceSvc.list.query({page:currentPage,pagesize:pageSize},function(data,headers){$scope.invoices=data;var Pagination=angular.fromJson(headers("X-Pagination")),TotalCount=Pagination.TotalCount,TotalPages=Pagination.TotalPages;$scope.totalItems=TotalCount,$scope.totalPages=TotalPages})}var pageSize=settings.pageSize;$scope.pageSize=pageSize,$scope.currentPage=1,$scope.maxSize=10,$scope.page.setTitle("Invoice"),get($scope.currentPage,pageSize),$scope.pageChanged=function(){get($scope.currentPage,pageSize)},$scope.lookup=function(q){return customerSrv.lookup.query({q:q,limit:10}).$promise.then(function(data){return data})},$scope.onSelect=function($item,$model,$label){$scope.$item=$item,$scope.$model=$model,$scope.$label=$label;var id=$item.id;$location.path("/invoice/"+id)}}]).controller("InvoiceDetailController",["$scope","$routeParams","$location","customerSrv","invoiceSvc",function($scope,$routeParams,$location,customerSrv,invoiceSvc){$scope.invoice=null,invoiceSvc.detail.query({id:$routeParams.id}).$promise.then(function(data){$scope.invoice=data,$scope.page.setTitle("Invoice "+$scope.invoice.OrderNumber)})}]).controller("InvoiceEditController",["$scope","$routeParams","$location","customerSrv","invoiceSvc",function($scope,$routeParams,$location,customerSrv,invoiceSvc){$scope.invoice=null,invoiceSvc.detail.query({id:$routeParams.id}).$promise.then(function(data){$scope.invoice=data,$scope.page.setTitle("Edit Invoice "+$scope.invoice.OrderNumber)}),$scope.CustomerList=customerSrv.list.query(),$scope.edit=function(){$scope.invoice.$save(function(){$location.path("/invoice/"+$routeParams.id)},function(error){})},$scope.getCustomer=function(val){return $http.get("//maps.googleapis.com/maps/api/geocode/json",{params:{address:val,sensor:!1}}).then(function(response){return response.data.results.map(function(item){return item.formatted_address})})}}])}(),function(){"use strict";var invoiceServiceModule=angular.module("invoiceServices",["ngResource"]);invoiceServiceModule.factory("invoiceSvc",function($resource,APIBase){var baseUrl=APIBase;return{list:$resource(baseUrl+"invoice?page=:page&pagesize=:pagesize",{},{query:{method:"GET",params:{page:"@page",pagesize:"@pagesize"},isArray:!0,headers:{}}}),listByCustomer:$resource(baseUrl+"invoice/customer/:id",{},{query:{method:"GET",params:{id:"@id"},isArray:!0,headers:{}}}),detail:$resource(baseUrl+"invoice/:id",{},{create:{method:"POST"},query:{method:"GET",params:{id:"@id"}},update:{method:"PUT",params:{id:"@id"}},"delete":{method:"DELETE",params:{id:"@id"}}})}})}();