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
//= require jquery.validate
//= require jquery.validate.additional-methods
//= require turbolinks
//= require jquery.turbolinks
//= require components
//= require bootstrap-sprockets
//= require cocoon
//= require_tree .


$(document).ready(function() { 



  $("#new_ticket").validate();  
 	
 	var quantity =  $('#quantityproduct' ).val();
  $('#productquantity').html(quantity);
 	var subtotal_ticket = 0;
  var t = 0;
  var price = 0;

 	$('#line_items')
 	  .on('cocoon:before-insert', function(e, sale_to_be_added) {
        searchdata2($('#codebarproduct').val(), 
          function(data) {
            sale_to_be_added.find("select").val(data.id)
            sale_to_be_added.find("input[type='number']").val($('#quantityproduct').val())
            sale_to_be_added.find("input[type='text']").val($('#producttotal').text())
          });
        subtotal_ticket=subtotal_ticket+total;
        $('#ticket_subtotal').val(subtotal_ticket);
        $('#ticket_total').val(subtotal_ticket);
      })
      .on('cocoon:after-insert', function(e, added_sale) {
      
      })
      .on("cocoon:before-remove", function(e, sale) {
        $(this).data('remove-timeout', 1000);
        sale.fadeOut('slow');
      })
      .on("cocoon:after-remove", function(e, sale) {
       
        rest = sale.find("input[type='text']").val();
        subtotal_ticket = $('#ticket_subtotal').val()-rest; 
        $('#ticket_subtotal').val(subtotal_ticket);
         $('#ticket_total').val(subtotal_ticket);
       //* e.g. recalculate order of child items */
      });
      
  $('#codebarproduct' ).on( "change paste keyup", function() {
    	var value = $( this ).val();
   		searchdata(value);	
     
   	});

	$('#quantityproduct' ).on( "change paste keyup", function() {
    	quantity = $( this ).val();
    	$('#productquantity').html(quantity);
    	$('.quantityProdcutsale').val(quantity);
    	importforproduct();
   	});

   $('#ticket_pay_with' ).on( "change paste keyup", function() {
      pay_with = $( this ).val();
      change =  pay_with - $('#ticket_total').val();
      $('#ticket_change') .val(change);    
    });

	
  function searchdata(id) {
	  	var data;
	  	$.ajax({
	    	type: "GET",
	    	url: '/products/find.json?bar_code=' + id,
	    	dataType: "JSON",
	    	success: function(data) {
            if(data.id==null){
               alert("Barcode no exist");
            }
            else{
             $('#productname').html(data.name);
             $('#productprice').html(data.price);
             $('.idProductsale').val(data.id); 
              importforproduct(t, price)
            }
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

	function importforproduct(){
	  t=$('#quantityproduct' ).val();
    price= $('#productprice').text();  
    total= t*price;
		$('#producttotal').html(total);

	}

});