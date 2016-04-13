// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require jquery.turbolinks
//= require components
//= require bootstrap-sprockets
//= require cocoon
//= require_tree .


$(document).ready(function() { 
 	
 	var quantity = 0;
    
    $('#codebarproduct' ).keyup(function() {
    	var value = $( this ).val();
    		searchdata(value);	
   	}).keyup();

 	$('#quantityproduct' ).keyup(function() {
    	quantity = $( this ).val();
    	$('#productquantity').html(quantity);
    	price= $('#productprice').text();  
    	console.log(price);
    	importforproduct(quantity, price)
   	}).keyup();

	function searchdata(id) {
	  	var data;
	  	$.ajax({
	    	type: "GET",
	    	url: '/products/find.json?bar_code=' + id,
	    	dataType: "JSON",
	    	success: function(data) {
	      		$('#productname').html(data.name);
	      		$('#productprice').html(data.price);
	    	}
	 	});
	}

	function importforproduct(quantity, price){
	    total= quantity*price;
		$('#producttotal').html(total);

	}

});