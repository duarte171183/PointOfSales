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
//= require jquery.turbolinks
//= require angular/angular
//= require angular
//= require angular-route/angular-route
//= require angular-rails-templates
//= require angular-resource
//= require turbolinks
//= require_tree .
//= require ng-rails-csrf
//= require bootstrap-filestyle
//= require bootstrap-sass-official/assets/javascripts/bootstrap-sprockets
//= require jquery_nested_form
//= require select2
//= require select2-full

$(document).ready(function() {
  $('#order_supplier_id').select2({
  	 theme: "bootstrap",
  	placeholder: "Select Supplier"
   });

  $('.selectproduct').select2({
    theme: "bootstrap",
     placeholder: "Select Product"
  });
});


$(document).on('nested:fieldAdded', function(event){
  // this field was just inserted into your form
  var field = event.field; 
  // it's a jQuery object already! Now you can find date input
  var dateField = field.find('.selectproduct');
  // and activate datepicker on it
  dateField.select2({
  	theme: "bootstrap",
  	placeholder: "Select Product"
  });
})


  
