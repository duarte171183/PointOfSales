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
 	var   subtotal_ticket = 0;
 	
 	$('#line_items')
 	  .on('cocoon:before-insert', function(e, sale_to_be_added) {
        searchdata2($('#codebarproduct').val(), 
          function(data) {
            sale_to_be_added.find("select").val(data.id)
            sale_to_be_added.find("input[type='number']").val($('#quantityproduct').val())
            sale_to_be_added.find("input[type='text']").val($('#producttotal').text())
          });
        subtotal_ticket=subtotal_ticket+total;
        $('#total_item').val(total);
        $('#ticket_subtotal').val(subtotal_ticket);
        sale_to_be_added.fadeIn('slow');
      })
      .on('cocoon:after-insert', function(e, added_sale) {
      	
      })
      .on("cocoon:before-remove", function(e, sale) {
         $(this).data('remove-timeout', 1000);
        sale.fadeOut('slow');
      })
      .on("cocoon:after-remove", function() {
        alert("aqui van las restas");
    	});

    $('#codebarproduct' ).keyup(function() {
    	var value = $( this ).val();
    		searchdata(value);	
   	}).keyup();

 	$('#quantityproduct' ).keyup(function() {
    	quantity = $( this ).val();
    	$('#productquantity').html(quantity);
    	$('.quantityProdcutsale').val(quantity);
    	price= $('#productprice').text();  
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
	      		$('.idProductsale').val(data.id);
	      	}
	 	});
	}

	function searchdata2(id, callback) {
      $.ajax({
        type: "GET",
        url: '/products/find.json?bar_code=' + id,
        dataType: "JSON",
        success: callback
    });
  }
	
	function addProduct(){
  	 var index = $(".idProductsale").attr('id');
  	  alert(index);
	}

	function importforproduct(quantity, price){
	    total= quantity*price;
		$('#producttotal').html(total);

	}

});