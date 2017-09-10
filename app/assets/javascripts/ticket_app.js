var app = angular.module('PointOfSales',['ngRoute', 'ngResource', 'templates', 'ng-rails-csrf' ]);

//Factory
app.factory('Tickets', ['$resource',function($resource){
  return $resource('/tickets.json', {},{
    query: { method: 'GET', isArray: true },
    create: { method: 'POST' }
  })
}]);

app.factory('Ticket', ['$resource', function($resource){
  return $resource('/tickets/:id.json', {}, {
    show: { method: 'GET' },
    update: { method: 'PUT', params: {id: '@id', status: '@status'} },
    delete: { method: 'DELETE', params: {id: '@id'} }
  });
}]);

app.factory('Sales_Tickets', ['$resource', function($resource){
  return $resource('/tickets/:ticket_id/sales/:id.json', {}, {
    delete: { method: 'DELETE', params: {ticket: '@ticket_id', id: '@id'} }
  });
}]);

app.factory('Sales_Ticket', ['$resource',function($resource){
  return $resource('/tickets/:ticket_id/sales', {}, {
    create: { method: 'POST', params:{ticket_id: '@ticket_id'} }
  })
}]);

//Controller
app.controller("ProductSearchController", [ '$scope','$http', '$location', 'Tickets', 'Ticket', 'Sales_Tickets', 'Sales_Ticket',
  function($scope , $http, $location, Tickets, Ticket, Sales_Tickets, Sales_Ticket) {                         
   


  $scope.findticket=function(){
    $http.get("/tickets/findopenticket.json").success(
        function(data,status,headers,config) { 
          $scope.ticket = data;
      }).error(
        function(data,status,headers,config) {
          alert("There was a problem: " + status);
       });
     $scope.keywords= null;
     $scope.pay_with = null;
   };    

   $scope.findticket();

    $scope.search = function(searchTerm, user_id, ticket) { 
      $scope.loading = true;
      
      if (searchTerm.length < 3) {
        return;
      }  
      
      $http.get("/products/find.json",  
                { "params": { "keywords": searchTerm } }
      ).success(
        function(data,status,headers,config) { 
          console.log(user_id);
          var productssearch = data;
          $scope.addListItem(productssearch[0].id, user_id, productssearch[0].price);
          $scope.loading = false;

      }).error(
        function(data,status,headers,config) {
          $scope.loading = false;
          alert("There was a problem: " + status);
        });
      $scope.keywords= null;
      $scope.change=$scope.pay_with-$scope.total;
      $scope.pay_with = null;
      
    };
   
  
  $scope.addListItem = function(product_id, user_id, product_price){
    
    console.log(angular.isDefined($scope.ticket[0]));
    console.log($scope.ticket.length);
    
    if(angular.isDefined($scope.ticket[0])){
        var ticket_id = $scope.ticket[0].id;  
       $scope.sales_attributes={ "product_id": product_id, "quantity" : '1', "totalsale" : product_price };
       Sales_Ticket.create({ticket_id: ticket_id, sale: $scope.sales_attributes }, function(){
       $scope.findticket();
      });
     }
    else
    {
     $scope.ticket = {"subtotal": product_price, "total": product_price, "pay_with": 0, "change": 0, "status":1, "user_id" : user_id,  
              sales_attributes: [{ "product_id": product_id, "quantity" : '1', "totalsale" : product_price} ]}
        console.log($scope.ticket);
        Tickets.create({ticket: $scope.ticket}, function(){
           $scope.findticket();
         }, function(error){
           console.log(error)
         });   
    }
   };
  
   $scope.deleteItemProduct = function(sale_id, ticket, ticket_id){
   
      Sales_Tickets.delete({ticket_id: ticket_id, id: sale_id}, function(){
       $scope.findticket();
      });
  };

  $scope.pay =function(){
    var ticket_id = $scope.ticket[0].id;
    Ticket.update({id: ticket_id, status: 2 }, function(){
     $scope.findticket();
    });
  };
}]);

app.directive('ensurePrime', function() {

  return {

    require: 'ngModel',
    restrict: 'A',
       link: function(scope, element, attrs, ctrl) {
       
        function isPrime(n) {
          
          if (n>=attrs.total) {
            console.log(n+attrs.total);
            return true;
          }
        return false;
      }
    
    scope.$watch(attrs.ngModel, function(newval) {
    if (isPrime(newval)) {
      ctrl.$setValidity('prime', true);
    }
    else {
      ctrl.$setValidity('prime', false);
    }
    });
  }
}
});

