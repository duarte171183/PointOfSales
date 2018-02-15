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


/*$(".js-example-data-ajax").select2({
  ajax: {
    url: "https://api.github.com/search/repositories",
    dataType: 'json',
    delay: 250,
    data: function (params) {
      return {
        q: params.term, // search term
        page: params.page
      };
    },
    processResults: function (data, params) {
      // parse the results into the format expected by Select2
      // since we are using custom formatting functions we do not need to
      // alter the remote JSON data, except to indicate that infinite
      // scrolling can be used
      params.page = params.page || 1;

      return {
        results: data.items,
        pagination: {
          more: (params.page * 30) < data.total_count
        }
      };
    },
    cache: true
  },
  placeholder: 'Search for a repository',
  escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
  minimumInputLength: 1,
  templateResult: formatRepo,
  templateSelection: formatRepoSelection
});

function formatRepo (repo) {
  if (repo.loading) {
    return repo.text;
  }

  var markup = "<div class='select2-result-repository clearfix'>" +
    "<div class='select2-result-repository__avatar'><img src='" + repo.owner.avatar_url + "' /></div>" +
    "<div class='select2-result-repository__meta'>" +
      "<div class='select2-result-repository__title'>" + repo.full_name + "</div>";

  if (repo.description) {
    markup += "<div class='select2-result-repository__description'>" + repo.description + "</div>";
  }

  markup += "<div class='select2-result-repository__statistics'>" +
    "<div class='select2-result-repository__forks'><i class='fa fa-flash'></i> " + repo.forks_count + " Forks</div>" +
    "<div class='select2-result-repository__stargazers'><i class='fa fa-star'></i> " + repo.stargazers_count + " Stars</div>" +
    "<div class='select2-result-repository__watchers'><i class='fa fa-eye'></i> " + repo.watchers_count + " Watchers</div>" +
  "</div>" +
  "</div></div>";

  return markup;
}

function formatRepoSelection (repo) {
  return repo.full_name || repo.text;
}*/
// Set up the Select2 control
// $('#mySelect2').select2({
//     ajax: {
//         url: '/api/students'
//     }
// });

// // Fetch the preselected item, and add to the control
// var studentSelect = $('#mySelect2');
// $.ajax({
//     type: 'GET',
//     url: '/api/students/s/' + studentId
// }).then(function (data) {
//     // create the option and append to Select2
//     var option = new Option(data.full_name, data.id, true, true);
//     studentSelect.append(option).trigger('change');

//     // manually trigger the `select2:select` event
//     studentSelect.trigger({
//         type: 'select2:select',
//         params: {
//             data: data
//         }
//     });
// });


  
