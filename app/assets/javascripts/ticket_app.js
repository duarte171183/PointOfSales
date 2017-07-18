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


app.controller("ProductSearchController", [ '$scope','$http', '$location', 'Tickets',
  function($scope , $http, $location, Tickets) {                         

    $scope.products = [];

    $scope.search = function(searchTerm) { 
      $scope.loading = true;
      
      if (searchTerm.length < 3) {
        return;
      }  
      
      $http.get("/products/find.json",  
                { "params": { "keywords": searchTerm } }
      ).success(
        function(data,status,headers,config) { 
          $scope.products = data;
          $scope.loading = false;
      }).error(
        function(data,status,headers,config) {
          $scope.loading = false;
          alert("There was a problem: " + status);
        });
    }

  $scope.addListItem = function(productid, user_id, price){
    $scope.ticket = {"subtotal": price, "total": price, "pay_with": 0, "change": 0, "status":1, 
              sales_attributes: [{ "product_id": productid, "quantity" : '1', "totalsale" : price, "user_id" : user_id } ]}
        console.log($scope.ticket);
        Tickets.create({ticket: $scope.ticket}, function(){
          $location.path();
         }, function(error){
           console.log(error)
         });
     
    //$scope.ticket.sales_attributes.push({ "product_id": productid, "quantity" : '1', "totalsale" : price, "user_id" : user_id })
   };
}]);


// app.controller("addListItem", ['$scope', '$resource', 'Tickets', '$location', 
//   function($scope, $resource, Tickets, $location, productid, user_id ) 
//   {
//     console.log(user_id);
//     $scope.ticket = {sales: [{ "product_id": productid, "user_id" : user_id }]}
//      
//         Tickets.create({ticket: $scope.ticket}, function(){
//           $location.path('/');
//         }, function(error){
//           console.log(error)
//         });
//       }
//   }

// ]);


    
    // $scope.addListItem = function(productid, user_id){
    //         $http.put("/sales/new",{ "params": { "product_id": productid, "user_id" : user_id } }
    //   ).success(
    //     function(data,status,headers,config) { 
    //       console.log(productid, user_id);
    //   }).error(
    //     function(data,status,headers,config) {
    //       alert("There was a problem: " + status);
    //     });
    // };