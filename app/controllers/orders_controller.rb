class OrdersController < ApplicationController
	before_action :set_order, only: [:show, :edit, :update, :destroy]
	
	def index
		@orders= Order.all
	end

	def new
		@order= Order.new
		@order.OrderItems.build
	end

	def show
		
	end

	def create
	    @order = Order.new(order_params)
	    @order.user_id = current_user.id if current_user
	    respond_to do |format|
	      if @order.validate_and_addstock
	        format.html { redirect_to @order, notice: 'Order was successfully created.' }
	        format.json { render :show, status: :created, location: @order }
	      else
	        format.html { render :new }
	        format.json { render json: @order.errors, status: :unprocessable_entity }
	      end
	    end
 	 end

	private
    # Use callbacks to share common setup or constraints between actions.
    def set_order
      @order = Order.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def order_params
      params.require(:order).permit( :totalorder, :user_id, :product_id, :supplier_id, 
      								:OrderItems_attributes => [:id, :product_id, :quantity, :subtotal, :purchaseprice, :_destroy])
    end
end
