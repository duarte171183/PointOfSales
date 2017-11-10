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
  return $resource('/tickets/:ticket_id/line_items/:id.json', {}, {
    delete: { method: 'DELETE', params: {ticket: '@ticket_id', id: '@id'} }
  });
}]);

app.factory('Sales_Ticket', ['$resource',function($resource){
  return $resource('/tickets/:ticket_id/line_items', {}, {
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
    console.log("The cantity is "+quantity);
    if(quantity>0 || quantity<0) {
      var totalsale = product_price*quantity;
     if(angular.isDefined($scope.ticket[0])){
        console.log("Sales_Ticket");
        var ticket_id = $scope.ticket[0].id;  
        $scope.LineItems_attributes={ "product_id": product_id, "quantity": quantity, "totalsale": totalsale, "subtotal": totalsale };
        console.log("lineitems_attributes: "+$scope.lineitems_attributes);
        Sales_Ticket.create({ticket_id: ticket_id, lineitem: $scope.LineItems_attributes }, function(){
         $scope.findticket();
        }, function(error){
           console.log(error)
        });   
       }
      else
      {
       console.log("Total sale "+totalsale);
       $scope.ticket = {"subtotal": totalsale, "total": totalsale, "pay_with": 0, "change": 0, "status":1, "user_id" : user_id,  
                LineItems_attributes: [{ "product_id": product_id, "quantity": quantity, "totalsale": totalsale} ]}
          console.log($scope.ticket);
        Tickets.create({ticket: $scope.ticket}, function(){
          $scope.findticket();
        }, function(error){
           console.log(error)
        });   
      }

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
    $scope.ticket_id = $scope.ticket[0].id;
    $scope.change= $scope.pay_with- $scope.ticket[0].total ;
    console.log("the change is"+$scope.change);
    /*Ticket.update({id: $scope.ticket_id, status: 2, change: change, pay_with: $scope.pay_with }, function(){
     $scope.findticket();
    },function(error){
         console.log(error)
      });   */
  };

  $scope.confirm = function(){
     
     Ticket.update({id: $scope.ticket_id, status: 2, change: $scope.change, pay_with: $scope.pay_with }, function(){
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

