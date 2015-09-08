!function(){"use strict";function config($routeProvider,$locationProvider){$routeProvider.when("/customer",{templateUrl:"/views/customer/list.html",controller:"CustomerController"}).when("/customer/:id",{templateUrl:"/views/customer/detail.html",controller:"CustomerDetailController"}).otherwise({redirectTo:"/customer"}),$locationProvider.html5Mode(!0)}config.$inject=["$routeProvider","$locationProvider"],angular.module("acctApp",["ngRoute","customerServices","invoiceServices"]).config(config).run(["$rootScope",function($rootScope){$rootScope.page={setTitle:function(title){this.title=title}},$rootScope.$on("$routeChangeSuccess",function(event,current,previous){$rootScope.page.setTitle(current.$$route.title||"Default Title")})}])}(),function(){"use strict";angular.module("acctApp").controller("CustomerController",["$scope","customerSrv",function($scope,customerSrv){$scope.customers=null,customerSrv.query({start:0,limit:10}).then(function(data){$scope.customers=data}),$scope.page.setTitle("Customers")}]).controller("CustomerDetailController",["$scope","$routeParams","$location","customerSrv","invoiceSvc",function($scope,$routeParams,$location,customerSrv,invoiceSvc){$scope.customer=customerSrv.detail({id:$routeParams.id}),$scope.transactions=invoiceSvc.query({id:$routeParams.id}),customerSrv.detail({id:$routeParams.id}).then(function(data){console.log($scope.data.Name),$scope.page.setTitle($scope.data.Name)}),angular.element(document).ready(function(){$("#myTab a:first").tab("show")})}])}(),function(){"use strict";var customerServiceModule=angular.module("customerServices",["ngResource"]);customerServiceModule.factory("customerSrv",function($resource){function query(){return console.log("sss"),$resource({url:"http://localhost:63267/api/Customer?start=:start&limit=:limit",method:"GET",params:{start:"@start",limit:"@limit"},isArray:!0,headers:{"auth-token":"admin 1qazxsw@"}})}function detail(){return $resource({url:"http://localhost:63267/api/Customer/:id",method:"GET",params:{id:"@id"}})}return{query:query,detail:detail}})}(),function(){"use strict";var invoiceServiceModule=angular.module("invoiceServices",["ngResource"]);invoiceServiceModule.factory("invoiceSvc",function($resource){return $resource("http://localhost:63267/api/invoice/customer/:id",{},{query:{method:"GET",params:{id:"@id"},isArray:!0,headers:{"auth-token":"admin 1qazxsw@"}}})})}();