"use strict";!function(){function configRoute($routeProvider,$locationProvider){$routeProvider.when("/",{templateUrl:"/views/home/index.html",controller:"HomeController"}).when("/login",{templateUrl:"/views/account/login.html",controller:"loginController"}).when("/signup",{controller:"signupController",templateUrl:"/app/views/signup.html"}).when("/tokens",{controller:"tokensManagerController",templateUrl:"/app/views/tokens.html"}).when("/customer",{templateUrl:"/views/customer/list.html",controller:"CustomerController"}).when("/customer/create",{templateUrl:"/views/customer/create.html",controller:"CustomerCreateController"}).when("/customer/:id",{templateUrl:"/views/customer/detail.html",controller:"CustomerDetailController"}).when("/customer/edit/:id",{templateUrl:"/views/customer/edit.html",controller:"CustomerEditController"}).when("/invoice",{templateUrl:"/views/invoice/list.html",controller:"InvoiceController"}).when("/invoice/create",{templateUrl:"/views/invoice/create.html",controller:"InvoiceCreateController"}).when("/invoice/:id",{templateUrl:"/views/invoice/detail.html",controller:"InvoiceDetailController"}).when("/invoice/edit/:id",{templateUrl:"/views/invoice/edit.html",controller:"InvoiceEditController"}).when("/quotation",{templateUrl:"/views/quotation/list.html",controller:"QuotationController"}).when("/quotation/create",{templateUrl:"/views/quotation/create.html",controller:"QuotationCreateController"}).when("/quotation/:id",{templateUrl:"/views/quotation/detail.html",controller:"QuotationDetailController"}).when("/quotation/edit/:id",{templateUrl:"/views/quotation/edit.html",controller:"QuotationEditController"}).when("/GST",{templateUrl:"/views/gst/list.html",controller:"GSTController"}).when("/GST/:id",{templateUrl:"/views/gst/detail.html",controller:"GSTDetailController"}).when("/GST/edit/:id",{templateUrl:"/views/gst/edit.html",controller:"GSTEditController"}).when("/tools/importData",{templateUrl:"/views/tools/importData.html",controller:"toolsImportDataController"}).otherwise({redirectTo:"/"}),$locationProvider.html5Mode(!0)}configRoute.$inject=["$routeProvider","$locationProvider"],angular.module("acctApp",["ngRoute","LocalStorageModule","ui.bootstrap","commonServices","customerServices","invoiceServices","quotationServices","GSTServices","authServices","authInterceptorServices"]).constant("Config",{viewDir:"views/",API:{useMocks:!1,fakeDelay:100,protocol:window.location.protocol.split(":")[0],host:"acctapi.thickpotential.com.sg",port:80,path:"/api"}}).constant("Enum",{DateRangeFilter:{AnyTime:0,ThisYear:1,ThisMonth:2,Last3Month:3,Last7Days:4,Last365Days:5}}).factory("APISetting",function(Config){var port=":"+Config.API.port;80==Config.API.port&&(port="");var apiBase=Config.API.protocol+"://"+Config.API.host+port+Config.API.path+"/",urlBase=Config.API.protocol+"://"+Config.API.host+port+"/";return{apiBase:apiBase,urlBase:urlBase}}).constant("settings",{pageSize:10,clientId:"ngAuthApp",apiServiceBaseUri:"ngAuthApp"}).config(configRoute).config(["datepickerConfig","datepickerPopupConfig",function(datepickerConfig,datepickerPopupConfig){datepickerConfig.showWeeks=!1,datepickerPopupConfig.showButtonBar=!1,datepickerPopupConfig.datepickerPopup="dd/MM/yyyy"}]).config(function($httpProvider){$httpProvider.interceptors.push("authInterceptorService")}).run(["authService",function(authService){authService.fillAuthData()}]).run(["$rootScope","$location","authService",function($rootScope,$location,authService){$rootScope.page={setTitle:function(title){this.title=title}},$rootScope.$on("$routeChangeSuccess",function(event,current,previous){}),$rootScope.$on("$routeChangeStart",function(event,next,current){0==authService.authentication.isAuth&&("/views/account/login.html"==next.templateUrl||$location.path("/login"))})}])}(),function(){angular.module("acctApp").controller("GSTController",["$scope","GSTSrv",function($scope,GSTSrv){$scope.page.setTitle("GST"),GSTSrv.list.query({},function(data,headers){$scope.GSTs=data})}]).controller("GSTDetailController",["$scope","$routeParams","$location","GSTSrv","invoiceSvc",function($scope,$routeParams,$location,GSTSrv){$scope.GST=null,GSTSrv.detail.query({id:$routeParams.id}).$promise.then(function(data){$scope.GST=data,$scope.page.setTitle($scope.GST.Name)})}]).controller("GSTEditController",["$scope","$routeParams","$location","GSTSrv",function($scope,$routeParams,$location,GSTSrv){$scope.GST=null,GSTSrv.detail.query({id:$routeParams.id}).$promise.then(function(data){$scope.GST=data,$scope.page.setTitle($scope.GST.Name)}),$scope.edit=function(){$scope.GST.$save(function(){console.log("saving..."),$location.path("/GST/"+$routeParams.id)},function(error){})}}])}(),function(){var GSTServiceModule=angular.module("GSTServices",["ngResource"]);GSTServiceModule.factory("GSTSrv",function($resource,APISetting){var baseUrl=APISetting.apiBase;return{list:$resource(baseUrl+"GST",{},{query:{method:"GET",params:{},isArray:!0,headers:{}}}),detail:$resource(baseUrl+"GST/:id",{},{query:{method:"GET",params:{id:"@id"}},update:{method:"PUT",params:{id:"@id"}},delete:{method:"DELETE",params:{id:"@id"}}})}})}();var authInterceptorServiceModule=angular.module("authInterceptorServices",["ngResource"]);authInterceptorServiceModule.factory("authInterceptorService",["$q","$injector","$location","localStorageService",function($q,$injector,$location,localStorageService){var authInterceptorServiceFactory={},_request=function(config){config.headers=config.headers||{};var authData=localStorageService.get("authorizationData");return authData&&(config.headers.Authorization="Bearer "+authData.token),config},_responseError=function(rejection){if(401===rejection.status){console.log("auth interceptor remote api 401..");var authService=$injector.get("authService"),authData=localStorageService.get("authorizationData");if(authData&&authData.useRefreshTokens)return $location.path("/refresh"),$q.reject(rejection);authService.logOut(),$location.path("/login")}return $q.reject(rejection)};return authInterceptorServiceFactory.request=_request,authInterceptorServiceFactory.responseError=_responseError,authInterceptorServiceFactory}]);var authServiceModule=angular.module("authServices",["ngResource"]);authServiceModule.factory("authService",["$http","$q","localStorageService","settings","APISetting",function($http,$q,localStorageService,settings,APISetting){var serviceBase=APISetting.urlBase,authServiceFactory={},_authentication={isAuth:!1,userName:"",useRefreshTokens:!1},_externalAuthData={provider:"",userName:"",externalAccessToken:""},_saveRegistration=function(registration){return _logOut(),$http.post(serviceBase+"account/register",registration).then(function(response){return response})},_login=function(loginData){var data="grant_type=password&username="+loginData.userName+"&password="+loginData.password;loginData.useRefreshTokens&&(data=data+"&client_id="+ngAuthSettings.clientId);var deferred=$q.defer();return $http.post(serviceBase+"token",data,{headers:{"Content-Type":"application/x-www-form-urlencoded"}}).success(function(response){loginData.useRefreshTokens?localStorageService.set("authorizationData",{token:response.access_token,userName:loginData.userName,refreshToken:response.refresh_token,useRefreshTokens:!0}):localStorageService.set("authorizationData",{token:response.access_token,userName:loginData.userName,refreshToken:"",useRefreshTokens:!1}),_authentication.isAuth=!0,_authentication.userName=loginData.userName,_authentication.useRefreshTokens=loginData.useRefreshTokens,deferred.resolve(response)}).error(function(err,status){_logOut(),deferred.reject(err)}),deferred.promise},_logOut=function(){localStorageService.remove("authorizationData"),_authentication.isAuth=!1,_authentication.userName="",_authentication.useRefreshTokens=!1},_fillAuthData=function(){var authData=localStorageService.get("authorizationData");authData&&(_authentication.isAuth=!0,_authentication.userName=authData.userName,_authentication.useRefreshTokens=authData.useRefreshTokens)},_refreshToken=function(){var deferred=$q.defer(),authData=localStorageService.get("authorizationData");if(authData&&authData.useRefreshTokens){var data="grant_type=refresh_token&refresh_token="+authData.refreshToken+"&client_id="+ngAuthSettings.clientId;localStorageService.remove("authorizationData"),$http.post(serviceBase+"token",data,{headers:{"Content-Type":"application/x-www-form-urlencoded"}}).success(function(response){localStorageService.set("authorizationData",{token:response.access_token,userName:response.userName,refreshToken:response.refresh_token,useRefreshTokens:!0}),deferred.resolve(response)}).error(function(err,status){_logOut(),deferred.reject(err)})}return deferred.promise},_obtainAccessToken=function(externalData){var deferred=$q.defer();return $http.get(serviceBase+"api/account/ObtainLocalAccessToken",{params:{provider:externalData.provider,externalAccessToken:externalData.externalAccessToken}}).success(function(response){localStorageService.set("authorizationData",{token:response.access_token,userName:response.userName,refreshToken:"",useRefreshTokens:!1}),_authentication.isAuth=!0,_authentication.userName=response.userName,_authentication.useRefreshTokens=!1,deferred.resolve(response)}).error(function(err,status){_logOut(),deferred.reject(err)}),deferred.promise},_registerExternal=function(registerExternalData){var deferred=$q.defer();return $http.post(serviceBase+"api/account/registerexternal",registerExternalData).success(function(response){localStorageService.set("authorizationData",{token:response.access_token,userName:response.userName,refreshToken:"",useRefreshTokens:!1}),_authentication.isAuth=!0,_authentication.userName=response.userName,_authentication.useRefreshTokens=!1,deferred.resolve(response)}).error(function(err,status){_logOut(),deferred.reject(err)}),deferred.promise};return authServiceFactory.saveRegistration=_saveRegistration,authServiceFactory.login=_login,authServiceFactory.logOut=_logOut,authServiceFactory.fillAuthData=_fillAuthData,authServiceFactory.authentication=_authentication,authServiceFactory.refreshToken=_refreshToken,authServiceFactory.obtainAccessToken=_obtainAccessToken,authServiceFactory.externalAuthData=_externalAuthData,authServiceFactory.registerExternal=_registerExternal,authServiceFactory}]),function(){angular.module("acctApp").controller("loginController",["$scope","$location","authService","settings","APISetting",function($scope,$location,authService,settings,APISetting){$scope.loginData={userName:"",password:"",useRefreshTokens:!1},$scope.message="",$scope.page.setTitle("Login"),$scope.login=function(){authService.login($scope.loginData).then(function(response){$location.path("/")},function(err){$scope.message=err.error_description})},$scope.authExternalProvider=function(provider){var redirectUri=location.protocol+"//"+location.host+"/authcomplete.html",externalProviderUrl=APISetting.apiBase+"Account/ExternalLogin?provider="+provider+"&response_type=token&client_id="+settings.clientId+"&redirect_uri="+redirectUri;window.$windowScope=$scope;window.open(externalProviderUrl,"Authenticate Account","location=0,status=0,width=600,height=750")},$scope.authCompletedCB=function(fragment){$scope.$apply(function(){if("False"==fragment.haslocalaccount)authService.logOut(),authService.externalAuthData={provider:fragment.provider,userName:fragment.external_user_name,externalAccessToken:fragment.external_access_token},$location.path("/associate");else{var externalData={provider:fragment.provider,externalAccessToken:fragment.external_access_token};authService.obtainAccessToken(externalData).then(function(response){$location.path("/")},function(err){$scope.message=err.error_description})}})}}])}(),angular.module("acctApp").controller("signupController",["$scope","$location","$timeout","authService",function($scope,$location,$timeout,authService){$scope.savedSuccessfully=!1,$scope.message="",$scope.registration={userName:"",password:"",confirmPassword:""},$scope.signUp=function(){authService.saveRegistration($scope.registration).then(function(response){$scope.savedSuccessfully=!0,$scope.message="User has been registered successfully, you will be redicted to login page in 2 seconds.",startTimer()},function(response){var errors=[];for(var key in response.data.modelState)for(var i=0;i<response.data.modelState[key].length;i++)errors.push(response.data.modelState[key][i]);$scope.message="Failed to register user due to:"+errors.join(" ")})};var startTimer=function(){var timer=$timeout(function(){$timeout.cancel(timer),$location.path("/login")},2e3)}}]),angular.module("acctApp").controller("tokensManagerController",["$scope","tokensManagerService",function($scope,tokensManagerService){$scope.refreshTokens=[],tokensManagerService.getRefreshTokens().then(function(results){$scope.refreshTokens=results.data},function(error){alert(error.data.message)}),$scope.deleteRefreshTokens=function(index,tokenid){tokenid=window.encodeURIComponent(tokenid),tokensManagerService.deleteRefreshTokens(tokenid).then(function(results){$scope.refreshTokens.splice(index,1)},function(error){alert(error.data.message)})}}]),angular.module("acctApp").factory("tokensManagerService",["$http","APISetting",function($http,APISetting){var serviceBase=APISetting.apiBase,tokenManagerServiceFactory={},_getRefreshTokens=function(){return $http.get(serviceBase+"api/refreshtokens").then(function(results){return results})},_deleteRefreshTokens=function(tokenid){return $http.delete(serviceBase+"api/refreshtokens/?tokenid="+tokenid).then(function(results){return results})};return tokenManagerServiceFactory.deleteRefreshTokens=_deleteRefreshTokens,tokenManagerServiceFactory.getRefreshTokens=_getRefreshTokens,tokenManagerServiceFactory}]);var commonServicesModule=angular.module("commonServices",[]);commonServicesModule.factory("commonSrv",function(){return{calcTotal:function(qty,unitPrice,discount){var total=qty*unitPrice;return discount>0&&discount<100&&(total=total*(100-discount)/100),parseFloat(total.toFixed(2))}}}),function(){angular.module("acctApp").controller("CustomerController",["$scope","$http","$location","customerSrv","settings",function($scope,$http,$location,customerSrv,settings){function get(currentPage,pageSize){customerSrv.list.query({page:currentPage,pagesize:pageSize},function(data,headers){$scope.customers=data;var Pagination=angular.fromJson(headers("X-Pagination")),TotalCount=Pagination.TotalCount,TotalPages=Pagination.TotalPages;$scope.totalItems=TotalCount,$scope.totalPages=TotalPages})}var pageSize=settings.pageSize;$scope.pageSize=pageSize,$scope.currentPage=1,$scope.maxSize=10,$scope.page.setTitle("Customers"),get($scope.currentPage,pageSize),$scope.lookup=function(q){return customerSrv.lookup.query({q:q,limit:10}).$promise.then(function(data){return data})},$scope.onSelect=function($item,$model,$label){$scope.$item=$item,$scope.$model=$model,$scope.$label=$label;var id=$item.id;$location.path("/customer/"+id)},$scope.pageChanged=function(){get($scope.currentPage,pageSize)}}]).controller("CustomerDetailController",["$scope","$routeParams","$location","customerSrv","invoiceSvc",function($scope,$routeParams,$location,customerSrv,invoiceSvc){$scope.transactions=invoiceSvc.listByCustomer.query({id:$routeParams.id}),$scope.balance=customerSrv.balance.query({id:$routeParams.id}),$scope.customer=null,customerSrv.detail.query({id:$routeParams.id}).$promise.then(function(data){$scope.customer=data,$scope.page.setTitle($scope.customer.Name)})}]).controller("CustomerCreateController",["$scope","$routeParams","$location","customerSrv","GSTSrv",function($scope,$routeParams,$location,customerSrv,GSTSrv){$scope.page.setTitle("Create Customer"),$scope.customer=null,$scope.GSTList=null,GSTSrv.list.query().$promise.then(function(data){$scope.GSTList=data,$scope.customer={idmas_GST:data[0].Id}}),$scope.create=function(){console.log($scope.customer.Name),customerSrv.detail.create($scope.customer).$promise.then(function(data){var newId=data.Id;$location.path("/customer/"+newId)})}}]).controller("CustomerEditController",["$scope","$routeParams","$location","customerSrv","GSTSrv",function($scope,$routeParams,$location,customerSrv,GSTSrv){$scope.customer=null,customerSrv.detail.query({id:$routeParams.id}).$promise.then(function(data){$scope.customer=data,$scope.page.setTitle($scope.customer.Name)}),$scope.GSTList=GSTSrv.list.query(),$scope.edit=function(){$scope.customer.$save(function(){$location.path("/customer/"+$routeParams.id)},function(error){})}}])}(),function(){var customerServiceModule=angular.module("customerServices",["ngResource"]);customerServiceModule.factory("customerSrv",function($resource,APISetting){var baseUrl=APISetting.apiBase;return{list:$resource(baseUrl+"customer?page=:page&pagesize=:pagesize",{},{query:{method:"GET",params:{page:"@page",pagesize:"@pagesize"},isArray:!0,headers:{}}}),detail:$resource(baseUrl+"customer/:id",{},{create:{method:"POST"},query:{method:"GET",params:{id:"@id"}},update:{method:"PUT",params:{id:"@id"}},delete:{method:"DELETE",params:{id:"@id"}}}),balance:$resource(baseUrl+"customer/:id/balance",{},{query:{method:"GET",params:{id:"@id"}}}),lookup:$resource(baseUrl+"customer/lookup?q=:q&limit=:limit",{},{query:{method:"GET",params:{q:"@q",limit:"@limit"},isArray:!0}})}})}(),angular.module("acctApp").directive("datePicker",function(){function link(scope,element,attrs){scope.status={opened:!1},scope.open=function($event){scope.status.opened=!0}}return{scope:{date:"=date"},templateUrl:function(elem,attr){return"/views/directives/_datePicker.html"},link:link}}),angular.module("acctApp").directive("dateRange",function(){return{scope:{dateRangeEnum:{AnyTime:0,ThisYear:1,ThisMonth:2,Last3Month:3,Last7Days:4,Last365Days:5}},templateUrl:function(elem,attr){return"/views/directives/_dataRangeDropdown.html"}}}),angular.module("acctApp").directive("orderDetails",function(){return{scope:{order:"=order"},templateUrl:function(elem,attr){return"/views/directives/_orderDetails.html"}}}).directive("orderLines",function(){return{scope:{lines:"=lines"},templateUrl:function(elem,attr){return"/views/directives/_orderLines.html"}}}).directive("orderList",function(){return{scope:{orders:"=orders",skipCustomer:"=skipCustomer"},templateUrl:function(elem,attr){return"/views/directives/_orderList.html"}}}).directive("orderLinesForm",["commonSrv",function(commonSrv){var link=function(scope,element,attrs){scope.addRow=function(){scope.lines.push({Qty:0,UnitPrice:0,Discount:0})},scope.removeRow=function(idx){scope.lines.splice(idx,1)},scope.calcTotal=commonSrv.calcTotal,scope.getTotal=function(){var total=0;if(scope.lines)for(var i=0;i<scope.lines.length;i++){var line=scope.lines[i];total+=commonSrv.calcTotal(line.Qty,line.UnitPrice,line.Discount)}return total}};return{scope:{lines:"=lines"},templateUrl:function(elem,attr){return"/views/directives/_orderLinesForm.html"},link:link}}]).directive("orderForm",function(){return{scope:{order:"=",customers:"="},templateUrl:function(elem,attr){return"/views/directives/_orderForm.html"}}}),angular.module("acctApp").directive("orderStatus",function(){return{scope:{status:"=status"},templateUrl:function(elem,attr){return"/views/directives/_status.html"}}}),function(){angular.module("acctApp").controller("HomeController",["$scope","$http","customerSrv","APISetting",function($scope,$http,customerSrv,APISetting){function showChart(year){var url=baseUrl+"invoice/GetMonthlyTotal/"+year;$http.get(url).then(function(response){var chartData=response.data;AmCharts.makeChart("chartdiv",{type:"serial",theme:"light",dataProvider:chartData,valueAxes:[{gridColor:"#FFFFFF",gridAlpha:.2,dashLength:0}],gridAboveGraphs:!0,startDuration:1,graphs:[{balloonText:"[[category]]:<b>[[value]]</b>",fillAlphas:.8,lineAlpha:.2,type:"column",valueField:"total"}],chartCursor:{categoryBalloonEnabled:!1,cursorAlpha:0,zoomable:!1},categoryField:"month",categoryAxis:{gridPosition:"start",gridAlpha:0,tickPosition:"start",tickLength:20},exportConfig:{menuTop:0,menuItems:[{icon:"/lib/3/images/export.png",format:"png"}]}})})}function showChartCustomer(year){var url=baseUrl+"invoice/GetYearlyTopCustomer/"+year;$http.get(url).then(function(response){var chartData=response.data;AmCharts.makeChart("chartdiv_salesby_customer",{type:"pie",theme:"light",legend:{markerType:"circle",position:"right",marginRight:70,autoMargins:!0},dataProvider:chartData,valueField:"total",titleField:"customer",balloonText:"[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>"})})}function showChartSalesman(year){var url=baseUrl+"invoice/GetYearlyTopSalesman/"+year;$http.get(url).then(function(response){var chartData=response.data;AmCharts.makeChart("chartdiv_salesby_salesman",{type:"pie",theme:"light",legend:{markerType:"circle",position:"right",marginRight:70,autoMargins:!0},dataProvider:chartData,valueField:"total",titleField:"salesman",balloonText:"[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>"})})}var baseUrl=APISetting.apiBase;$scope.page.setTitle("Dashboard");var year="2014";$http({method:"GET",url:baseUrl+"Dashboard",params:{}}).then(function(response){var dashboard=angular.fromJson(response.data);$scope.dashboard=dashboard},function(response){$scope.data=response.data||"Request failed",$scope.status=response.status}),showChart(year),showChartCustomer(year),showChartSalesman(year)}])}(),angular.module("acctApp").controller("indexController",["$scope","$location","authService",function($scope,$location,authService){$scope.logOut=function(){authService.logOut(),$location.path("/login")},$scope.authentication=authService.authentication}]),function(){angular.module("acctApp").controller("InvoiceController",["$scope","$http","$location","customerSrv","invoiceSvc","settings",function($scope,$http,$location,customerSrv,invoiceSvc,settings){function get(dateRange,status,currentPage,pageSize){invoiceSvc.list.query({dateRange:dateRange,status:status,page:currentPage,pagesize:pageSize},function(data,headers){$scope.invoices=data;var Pagination=angular.fromJson(headers("X-Pagination")),TotalCount=Pagination.TotalCount,TotalPages=Pagination.TotalPages;$scope.totalItems=TotalCount,$scope.totalPages=TotalPages})}var pageSize=settings.pageSize;$scope.pageSize=pageSize,$scope.currentPage=1,$scope.maxSize=10,$scope.page.setTitle("Invoice"),$scope.dateRangeEnum={AnyTime:"Any Time",ThisYear:"Current Year",ThisMonth:"Current Month",Last3Month:"Past 3 Month",Last7Days:"Past 7 Days",Last365Days:"Past 365 Days"},$scope.statusEnum={All:0,Open:0,Unpaid:1,Partial:2,Overdue:4,Paid:3},$scope.statusParm=null!=$location.search().status?$location.search().status:"All";var _statusParms=$scope.statusParm;"All"==$location.search().status?_statusParms=["Unpaid","Partial","Overdue","Paid"]:"Open"==$location.search().status&&(_statusParms=["Unpaid","Partial","Overdue"]),$scope.dateRangeParm=null!=$location.search().dateRange?$location.search().dateRange:"AnyTime",get($scope.dateRangeParm,_statusParms,$scope.currentPage,pageSize),$scope.pageChanged=function(){get($scope.dateRangeParm,_statusParms,$scope.currentPage,pageSize)},$scope.lookup=function(q){return customerSrv.lookup.query({q:q,limit:10}).$promise.then(function(data){return data})},$scope.onSelect=function($item,$model,$label){$scope.$item=$item,$scope.$model=$model,$scope.$label=$label;var id=$item.id;$location.path("/invoice/"+id)},$scope.print=function(id){var downloadPath=APISetting+"invoice/print/"+id;window.open(downloadPath,"_self","")}}]).controller("InvoiceDetailController",["$scope","$routeParams","$location","$http","customerSrv","invoiceSvc","APISetting",function($scope,$routeParams,$location,$http,customerSrv,invoiceSvc,APISetting){$scope.invoice=null,invoiceSvc.detail.query({id:$routeParams.id}).$promise.then(function(data){$scope.invoice=data,$scope.page.setTitle("Invoice "+$scope.invoice.OrderNumber)}),$scope.print=function(id){var downloadPath=APISetting.apiBase+"invoice/print/"+id;$http.get(downloadPath,{responseType:"arraybuffer"}).success(function(data,status,headers,config){var contentDisposition=headers("Content-Disposition");console.log(contentDisposition);var filenameExp=RegExp("filename=(.*)"),fileName=filenameExp.exec(contentDisposition)[1];console.log(fileName);var file=new Blob([data],{type:"application/pdf"});URL.createObjectURL(file);saveAs(file,fileName)}).error(function(data,status,headers,config){console.log("error when download")})}}]).controller("InvoicePrintController",["$scope","$routeParams","$location","APISetting",function($scope,$routeParams,$location,APISetting){var downloadPath=APISetting+"invoice/print/"+$routeParams.id;window.open(downloadPath,"_self","")}]).controller("InvoiceEditController",["$scope","$routeParams","$location","customerSrv","invoiceSvc",function($scope,$routeParams,$location,customerSrv,invoiceSvc){$scope.invoice=null,invoiceSvc.detail.query({id:$routeParams.id}).$promise.then(function(data){$scope.invoice=data,$scope.page.setTitle("Edit Invoice "+$scope.invoice.OrderNumber)}),$scope.customerList=null,customerSrv.list.query({page:1,pagesize:100}).$promise.then(function(data){$scope.customerList=data}),$scope.save=function(){console.log("saving edit"),console.log($scope.invoice),$scope.invoice.$save(function(){$location.path("/invoice/"+$routeParams.id)},function(error){})},$scope.getCustomer=function(val){return $http.get("//maps.googleapis.com/maps/api/geocode/json",{params:{address:val,sensor:!1}}).then(function(response){return response.data.results.map(function(item){return item.formatted_address})})}}]).controller("InvoiceCreateController",["$scope","$routeParams","$location","customerSrv","invoiceSvc",function($scope,$routeParams,$location,customerSrv,invoiceSvc){$scope.page.setTitle("Create Invoice ");var _orderDetail=[{Qty:0,UnitPrice:0,Discount:0}];$scope.invoice={OrderDate:new Date,OrderDetail:_orderDetail},invoiceSvc.getNextInvoiceNumber.query().$promise.then(function(data){$scope.invoice.OrderNumber=data.nextNumber}),$scope.customerList=null,customerSrv.list.query({page:1,pagesize:100}).$promise.then(function(data){$scope.customerList=data,$scope.customer={customerId:data[0].Id}}),$scope.save=function(){console.log("saving create invoice"),console.log($scope.invoice),invoiceSvc.detail.create($scope.invoice).$promise.then(function(data){console.log(data.Id);var newId=data.Id;$location.path("/invoice/"+newId)})}}])}(),function(){var invoiceServiceModule=angular.module("invoiceServices",["ngResource"]);invoiceServiceModule.factory("invoiceSvc",function($resource,APISetting){var baseUrl=APISetting.apiBase;return{list:$resource(baseUrl+"invoice",{dateRange:"@dateRange",status:"@status",page:"@page",pagesize:"@pagesize"},{query:{method:"GET",isArray:!0,headers:{}}}),listByCustomer:$resource(baseUrl+"invoice/customer/:id",{},{query:{method:"GET",params:{id:"@id"},isArray:!0,headers:{}}}),getNextInvoiceNumber:$resource(baseUrl+"invoice/getNextInvoiceNumber",{},{query:{method:"GET",headers:{}}}),detail:$resource(baseUrl+"invoice/:id",{},{create:{method:"POST"},query:{method:"GET",params:{id:"@id"}},update:{method:"PUT",params:{id:"@id"}},delete:{method:"DELETE",params:{id:"@id"}}})}})}(),function(){angular.module("acctApp").controller("QuotationController",["$scope","$http","$location","customerSrv","quotationSvc","settings",function($scope,$http,$location,customerSrv,quotationSvc,settings){function get(dateRange,status,currentPage,pageSize){quotationSvc.list.query({dateRange:dateRange,status:status,page:currentPage,pagesize:pageSize},function(data,headers){$scope.quotations=data;var Pagination=angular.fromJson(headers("X-Pagination")),TotalCount=Pagination.TotalCount,TotalPages=Pagination.TotalPages;$scope.totalItems=TotalCount,$scope.totalPages=TotalPages})}console.log("in QuotationController");var pageSize=settings.pageSize;$scope.pageSize=pageSize,$scope.currentPage=1,$scope.maxSize=10,$scope.page.setTitle("Quotation"),$scope.dateRangeEnum={AnyTime:"Any Time",ThisYear:"Current Year",ThisMonth:"Current Month",Last3Month:"Past 3 Month",Last7Days:"Past 7 Days",Last365Days:"Past 365 Days"},$scope.statusEnum={All:0,Open:0,Unpaid:1,Partial:2,Overdue:4,Paid:3},$scope.statusParm=null!=$location.search().status?$location.search().status:"All";var _statusParms=$scope.statusParm;"All"==$location.search().status?_statusParms=["Unpaid","Partial","Overdue","Paid"]:"Open"==$location.search().status&&(_statusParms=["Unpaid","Partial","Overdue"]),$scope.dateRangeParm=null!=$location.search().dateRange?$location.search().dateRange:"AnyTime",get($scope.dateRangeParm,_statusParms,$scope.currentPage,pageSize),$scope.pageChanged=function(){get($scope.dateRangeParm,_statusParms,$scope.currentPage,pageSize)},$scope.lookup=function(q){return customerSrv.lookup.query({q:q,limit:10}).$promise.then(function(data){return data})},$scope.onSelect=function($item,$model,$label){$scope.$item=$item,$scope.$model=$model,$scope.$label=$label;var id=$item.id;$location.path("/quotation/"+id)},$scope.print=function(id){var downloadPath=APISetting+"quotation/print/"+id;window.open(downloadPath,"_self","")}}]).controller("QuotationDetailController",["$scope","$routeParams","$location","$http","customerSrv","quotationSvc","APISetting",function($scope,$routeParams,$location,$http,customerSrv,quotationSvc,APISetting){$scope.quotation=null,quotationSvc.detail.query({id:$routeParams.id}).$promise.then(function(data){$scope.quotation=data,$scope.page.setTitle("Quotation "+$scope.quotation.OrderNumber)}),$scope.print=function(id){var downloadPath=APISetting.apiBase+"quotation/print/"+id;$http.get(downloadPath,{responseType:"arraybuffer"}).success(function(data,status,headers,config){var contentDisposition=headers("Content-Disposition");console.log(contentDisposition);var filenameExp=RegExp("filename=(.*)"),fileName=filenameExp.exec(contentDisposition)[1];console.log(fileName);var file=new Blob([data],{type:"application/pdf"});URL.createObjectURL(file);saveAs(file,fileName)}).error(function(data,status,headers,config){console.log("error when download")})}}]).controller("QuotationPrintController",["$scope","$routeParams","$location","APISetting",function($scope,$routeParams,$location,APISetting){var downloadPath=APISetting+"quotation/print/"+$routeParams.id;window.open(downloadPath,"_self","")}]).controller("QuotationEditController",["$scope","$routeParams","$location","customerSrv","quotationSvc",function($scope,$routeParams,$location,customerSrv,quotationSvc){$scope.quotation=null,quotationSvc.detail.query({id:$routeParams.id}).$promise.then(function(data){$scope.quotation=data,$scope.page.setTitle("Edit Quotation "+$scope.quotation.OrderNumber)}),$scope.customerList=null,customerSrv.list.query({page:1,pagesize:100}).$promise.then(function(data){$scope.customerList=data}),$scope.save=function(){console.log("saving edit"),console.log($scope.quotation),$scope.quotation.$save(function(){$location.path("/quotation/"+$routeParams.id)},function(error){})},$scope.getCustomer=function(val){return $http.get("//maps.googleapis.com/maps/api/geocode/json",{params:{address:val,sensor:!1}}).then(function(response){return response.data.results.map(function(item){return item.formatted_address})})}}]).controller("QuotationCreateController",["$scope","$routeParams","$location","customerSrv","quotationSvc",function($scope,$routeParams,$location,customerSrv,quotationSvc){$scope.page.setTitle("Create Quotation ");var _orderDetail=[{Qty:0,UnitPrice:0,Discount:0}];$scope.quotation={OrderDate:new Date,OrderDetail:_orderDetail},quotationSvc.getNextQuotationNumber.query().$promise.then(function(data){$scope.quotation.OrderNumber=data.nextNumber}),$scope.customerList=null,customerSrv.list.query({page:1,pagesize:100}).$promise.then(function(data){$scope.customerList=data,$scope.customer={customerId:data[0].Id}}),$scope.save=function(){console.log("saving create quotation"),console.log($scope.quotation),quotationSvc.detail.create($scope.quotation).$promise.then(function(data){
console.log(data.Id);var newId=data.Id;$location.path("/quotation/"+newId)})}}])}(),function(){var quotationServiceModule=angular.module("quotationServices",["ngResource"]);quotationServiceModule.factory("quotationSvc",function($resource,APISetting){var baseUrl=APISetting.apiBase;return{list:$resource(baseUrl+"quotation",{dateRange:"@dateRange",status:"@status",page:"@page",pagesize:"@pagesize"},{query:{method:"GET",isArray:!0,headers:{}}}),listByCustomer:$resource(baseUrl+"quotation/customer/:id",{},{query:{method:"GET",params:{id:"@id"},isArray:!0,headers:{}}}),getNextQuotationNumber:$resource(baseUrl+"quotation/getNextQuotationNumber",{},{query:{method:"GET",headers:{}}}),detail:$resource(baseUrl+"quotation/:id",{},{create:{method:"POST"},query:{method:"GET",params:{id:"@id"}},update:{method:"PUT",params:{id:"@id"}},delete:{method:"DELETE",params:{id:"@id"}}})}})}(),function(){angular.module("acctApp").controller("toolsImportDataController",["$scope","$routeParams","$location",function($scope,$routeParams,$location){$scope.page.setTitle("Import data"),$scope.import=function(){var f=document.getElementById("file").files[0],r=new FileReader;r.onloadend=function(e){e.target.result},r.readAsBinaryString(f)}}])}(),function(){var toolsServiceModule=angular.module("toolsServices",["ngResource"]);toolsServiceModule.factory("toolsSrv",function($resource,APISetting){var baseUrl=APISetting.apiBase;return{importData:$resource(baseUrl+"tools/ImportData",{},{query:{method:"POST",params:{},headers:{}}})}})}();