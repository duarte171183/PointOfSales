<%= form_for(@ticket) do |f| %>
  <% if @ticket.errors.any? %>
    <div id="error_explanation" class="alert alert-danger">
      <h2><%= pluralize(@ticket.errors.count, "error") %> prohibited this ticket from being saved:</h2>
      <ul>
      <% @ticket.errors.full_messages.each do |message| %>
        <li><%= message %></li>
      <% end %>
      </ul>
    </div>
  <% end %>
   

  <div class="row">
    	 <div class="col-md-6">
        <div class="panel panel-default">
            <div class="panel-body">
          	 <div class="form-group ">
      	    	<input type="text" name="codebarproduct" class="form-control" id="codebarproduct" placeholder="Insert Barcode" data-validation="required">
      	     </div>
             <div class="form-group">
              <input type="number" name="quantityproduct"  class="form-control" id="quantityproduct" placeholder="Quantity" value="1", min="1" data-validation="required" >
      	     </div>
            </div>
        </div>
	   </div>
     <div class="col-md-6">
       <div class="panel panel-default">
        <div class="panel-body">
          <div class="col-md-4">
            <img id="productimage" src="/uploads/product/photo/default/noProduct.png", width="150" height="75">  
          </div>
          <div class="col-md-8">
             Stock: <span class="label label-default" id="productstock"></span>
          Name:<span class="label label-default" id="productname"></span>
          <br>
          <br>
          Price: <span class="label label-default" id="productprice"></span>
          Quantity: <span class="label label-default" id="productquantity"></span>
          Total: <span class="label label-default" id="producttotal"></span>
        
          </div>
         </div>
       </div>
     </div>
    </div>
  <br>
    <div id="line_items"  class="row">
      <div class="col-md-12">
        <div class="panel panel-default">
                <%= link_to_add_association 'add product', f, :sales, :id=>'salebtn', :class => 'btn btn-large btn-primary',  render_options: { wrapper: 'inline'} %>
         </div>
      </div>
    </div>
   <br>   
   <div class="panel panel-primary">
    <div class="panel-body">
      <div class="col-md-12">
          <%= f.label :subtotal %>
          <%= f.number_field :subtotal, min:1,  step: 2, :required => true, class: 'form-control', readonly: true  %>
          <%= f.label :total %>
          <%= f.number_field :total, min:1,   step: 2, :required => true, class: 'form-control', readonly: true %>
          <%= f.label :pay_with %>
          <%= f.number_field :pay_with, min:1,  step: 2, :required => true, class: 'form-control' %>
          <%= f.label :change %>
          <%= f.number_field :change, min:0,  step: 2, :required => true, class: 'form-control', readonly: true %>
      </div>
    </div>
  </div>  
 <div class="actions">
    <%= f.submit :class => 'btn btn-large btn-success' %>
</div>
<% end %>

