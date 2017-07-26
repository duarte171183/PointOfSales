var app = angular.module('PointOfSales',['ngRoute', 'ngResource', 'templates', 'ng-rails-csrf' ]);

//Factory
app.factory('Tickets', ['$resource',function($resource){
  return $resource('/tickets.json', {},{
    query: { method: 'GET', isArray: true },
    create: { method: 'POST' }
  })
}]);

app.factory('Ticket', ['$resource', function($resource){
  return $resource('/ticket/:id.json', {}, {
    show: { method: 'GET' },
    update: { method: 'PUT', params: {id: '@id'} },
    delete: { method: 'DELETE', params: {id: '@id'} }
  });
}]);

app.factory('Sales_Tickets', ['$resource', function($resource){
  return $resource('/tickets/:ticket_id/sales/:id.json', {}, {
    //show: { method: 'GET' },
    update: { method: 'PUT', params: {ticket: '@ticket_id', id: '@id'} },
    delete: { method: 'DELETE', params: {ticket: '@ticket_id', id: '@id'} }
  });
}]);

app.factory('Sales_Ticket', ['$resource',function($resource){
  return $resource('/tickets/:ticket_id/sales', {}, {
    query: { method: 'GET', isArray: true },
    create: { method: 'POST' }
  })
}]);



app.controller("ProductSearchController", [ '$scope','$http', '$location', 'Tickets', 'Ticket', 'Sales_Tickets',
  function($scope , $http, $location, Tickets, Ticket, Sales_Ticket) {                         

    
    $http.get("/tickets/findopenticket.json").success(
        function(data,status,headers,config) { 
          $scope.ticket = data;
          $scope.loading =false;
      }).error(
        function(data,status,headers,config) {
          $scope.loading = false;
          alert("There was a problem: " + status);
       });
   


    $scope.search = function(searchTerm) { 
      $scope.loading = true;
      
      if (searchTerm.length < 3) {
        return;
      }  
      
      $http.get("/products/find.json",  
                { "params": { "keywords": searchTerm } }
      ).success(
        function(data,status,headers,config) { 
          $scope.productssearch = data;
          $scope.loading = false;
      }).error(
        function(data,status,headers,config) {
          $scope.loading = false;
          alert("There was a problem: " + status);
        });
    };
   
  
  $scope.addListItem = function(sale_id, ticket){
    if(ticket.length>0){
      console.log(ticket, "tienes datos");
    }
    else
    {
     console.log(ticket,"no tiene datos");
    }


  };
  
   $scope.deleteItemProduct = function(sale_id, ticket, ticket_id){
   
      Sales_Tickets.delete({ticket_id: ticket_id, id: sale_id}, function(){
       $scope.loading =false;
      });
  };
}]);

 // app.controller("addListItem", ['$scope', '$resource', 'Tickets', '$location', 
 //   function($scope, $resource, Tickets, $location, productid, user_id ) 
 //   {
 //     $scope.ticket = {"subtotal": price, "total": price, "pay_with": 0, "change": 0, "status":1, 
 //              sales_attributes: [{ "product_id": productid, "quantity" : '1', "totalsale" : price, "user_id" : user_id } ]}
 //        console.log($scope.ticket);
 //        Tickets.create({ticket: $scope.ticket}, function(){
 //          $location.path();
 //         }, function(error){
 //           console.log(error)
 //         });
 //     }
 // ]);

 // var address = user.addresses[index];
 //    if(address.id){
 //      address._destroy = true;
 //    }else{
 //      user.addresses.splice(index, 1);
 //    }