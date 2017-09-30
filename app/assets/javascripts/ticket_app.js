var app = angular.module('PointOfSales',['ngRoute', 'ngResource', 'ng-rails-csrf' ]);

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
   
  var quantity=1;


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
     quantity=1;
   };    

   $scope.findticket();

    $scope.search = function(searchTerm, user_id, ticket) { 
      $scope.loading = true;
      
      if (searchTerm.length < 6) {
        
        console.log("valor de search"+searchTerm);
        if(searchTerm.includes("+"))
        {
          $scope.operation=searchTerm;
          quantity=parseFloat(searchTerm.match(/\d+$/));
          $scope.keywords=null;
        }
        if(searchTerm.includes("-"))
        {
          $scope.operation=searchTerm;
          quantity=parseFloat(searchTerm.match(/\d+$/)*-1);
          $scope.keywords=null;
        }

        return;
      }  
      
      $http.get("/products/find.json",  
                { "params": { "keywords": searchTerm } }
      ).success(
        function(data,status,headers,config) { 
          console.log("the user is"+user_id+quantity[0]);
          var productssearch = data;
          $scope.addListItem(productssearch[0].id, user_id, productssearch[0].price, quantity);
          $scope.loading = false;

      }).error(
        function(data,status,headers,config) {
          $scope.loading = false;
          alert("There was a problem: " + status);
        });
      $scope.operation= null;
      $scope.keywords= null;
      $scope.pay_with = null;
    };
   
  
  $scope.addListItem = function(product_id, user_id, product_price, quantity){
    
    console.log(angular.isDefined($scope.ticket[0]));
    console.log($scope.ticket.length);
    console.log(quantity);
    var totalsale = product_price*quantity;
    if(angular.isDefined($scope.ticket[0])){
      var ticket_id = $scope.ticket[0].id;  
      $scope.sales_attributes={ "product_id": product_id, "quantity": quantity, "totalsale": totalsale };
      console.log("sales_attributes"+$scope.sales_attributes.to_s);
      Sales_Ticket.create({ticket_id: ticket_id, sale: $scope.sales_attributes }, function(){
       $scope.findticket();
      }, function(error){
         console.log(error)
      });   
     }
    else
    {
     $scope.ticket = {"subtotal": product_price, "total": product_price, "pay_with": 0, "change": 0, "status":1, "user_id" : user_id,  
              sales_attributes: [{ "product_id": product_id, "quantity": quantity, "totalsale" : totalsale} ]}
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
      },function(error){
         console.log(error)
      });   
  };

  $scope.pay =function(){
    var ticket_id = $scope.ticket[0].id;
    Ticket.update({id: ticket_id, status: 2 }, function(){
     $scope.findticket();
    },function(error){
         console.log(error)
      });   
  };
}]);

app.directive('ensurePrime', function() {

  return {

    require: 'ngModel',
    restrict: 'A',
       link: function(scope, element, attrs, ctrl) {
       
        function isPrime(n) {
          
          if (n>=attrs.total&&attrs.total>0) {
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

