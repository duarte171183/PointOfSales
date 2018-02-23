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
//= require_tree .
//= require ng-rails-csrf
//= require bootstrap-filestyle
//= require bootstrap-sass-official/assets/javascripts/bootstrap-sprockets
//= require jquery_nested_form
//= require select2
//= require select2-full



function formatRepo (repo) {
   
    if (repo.loading) return repo.text;

    var markup = '<div class="clearfix">' +
   
    '<div class="clearfix">' +
    '<div class="col-sm-6">' + repo.bar_code + '</div>' +
    '<div class="col-sm-3"><i class="fa fa-code-fork"></i> ' + repo.name + '</div>' +
    '<div class="col-sm-2"><i class="fa fa-star"></i> ' + repo.stock + '</div>' +
    '</div>';

    markup += '</div></div>';

    return markup;
  }

  function formatRepoSelection (repo) {
    return repo.name || repo.text;
  }


$(document).ready(function() {
  $('#order_supplier_id').select2({
  	 theme: "bootstrap",
  	placeholder: "Select Supplier"
   });

  $('.selectproduct').select2({
    theme: "bootstrap",
    placeholder: "search product",
    dataType: "json",
    delay: 500,
    ajax: {
    url: '/products/find.json',
    data: function (params) {
      var query = {
       keywords: params.term,
        type: 'public'
      }

      // Query parameters will be ?search=[term]&type=public
      return query;

    },
    processResults: function (data) {
        console.log(data);
      return { 
      results: data
    };
  
    cache: true
  }},
  escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
  minimumInputLength: 4,
  templateResult: formatRepo,
  templateSelection: formatRepoSelection
  });

});


$(document).on('nested:fieldAdded', function(event){
  // this field was just inserted into your form
  $('.selectproduct').select2({
    theme: "bootstrap",
    placeholder: "search product",
    dataType: "json",
    delay: 500,
    ajax: {
    url: '/products/find.json',
    data: function (params) {
      var query = {
       keywords: params.term,
        type: 'public'
      }

      // Query parameters will be ?search=[term]&type=public
      return query;

    },
    processResults: function (data) {
        console.log(data);
      return { 
      results: data
    };
  
    cache: true
  }},
  escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
  minimumInputLength: 4,
  templateResult: formatRepo,
  templateSelection: formatRepoSelection
  });
})
