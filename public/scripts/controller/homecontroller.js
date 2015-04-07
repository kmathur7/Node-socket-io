angular.module('myApp')
.controller('HomeController', function ($scope,$rootScope) {
    $scope.serviceapidetails = [];
    $scope.dbapidetails = [];
    $scope.solrdetails = [];
    $scope.serviceapicalls = 0;
    $scope.dbapicalls = 0;
    $scope.solrcalls = 0;
    $scope.serviceapiflag = false;
    $scope.dbapiflag = false;
    $scope.solrflag = false;
    $scope.zeroserviceapiflag = false;
    $scope.zerodbapiflag = false;
    $scope.zerosolrflag = false;
  
    $scope.showServiceAPICalls = function(){
      $scope.serviceapiflag = !$scope.serviceapiflag;
      if($scope.serviceapiflag===true){
        $scope.serviceapicalls = 0;
        $scope.zeroserviceapiflag = false;
      }
      
    };
    
    $scope.showDBAPICalls = function(){
      $scope.dbapiflag = !$scope.dbapiflag;
      if($scope.dbapiflag===true){
        $scope.dbapicalls = 0;
        $scope.zerodbapiflag = false;
      }
      
    };
  
    $scope.solrCalls = function(){
      $scope.solrflag = !$scope.solrflag;
      if($scope.solrflag===true){
        $scope.solrcalls = 0;
        $scope.zerosolrflag = false;
      }
      
    };
  
  
  
    var socket = io();
    socket.on('apicalls', function (data) {
      console.log(data);
      if (data.API=="service API")
      {
          $rootScope.$apply(function () {
          $scope.serviceapidetails.push(data);
          $scope.serviceapicalls += 1;
          $scope.zeroserviceapiflag = true;
      });
        
      }
      else if(data.API=="DB Call")
      {
        $rootScope.$apply(function () {
          $scope.dbapidetails.push(data);
          $scope.dbapicalls += 1;
          $scope.zerodbapiflag = true;
        });
      }
      else if(data.API=="Solr Call")
      {
        $rootScope.$apply(function () {
          $scope.solrdetails.push(data);
          $scope.solrcalls += 1;
          $scope.zerosolrflag = true;
        });
      }
    });
   
  });