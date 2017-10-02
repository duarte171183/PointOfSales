class SalesController < ApplicationController
  before_action :set_sale, only: [:show, :edit, :update, :destroy]
  respond_to :html, :json

 
  # GET /sales
  # GET /sales.json
  def index
    
  end
  
  # GET /sales/1
  # GET /sales/1.json
  def show
  end

  # GET /sales/new
  def new
    
  end

  # GET /sales/1/edit
  def edit
  end

  # POST /sales
  # POST /sales.json
  def create
    @ticket = Ticket.find(params[:ticket_id])
    if @sale =@ticket.products.exists?(sale_params[:product_id])
       @sale_first=@ticket.sales.where(product_id: sale_params[:product_id]).first  
       @sale_first.update(quantity: sale_params[:quantity].to_d+@sale_first.quantity, totalsale: (sale_params[:totalsale].to_d+@sale_first.totalsale < 0 ? sale_params[:totalsale]=@sale_first.totalsale : sale_params[:totalsale].to_d+@sale_first.totalsale  ))
       @sale_first.destroy if @sale_first.quantity<=0
    else
       @sale = @ticket.sales.create(sale_params)  
    end  
    
    respond_to do |format|
     if @ticket.update_columns(total: @ticket.total+sale_params[:totalsale] < 0 ?  0 : @ticket.total+sale_params[:totalsale])
         format.html { redirect_to tickets_url, notice: 'Product is add' }
         format.json { head :no_content }
      else
         format.html { redirect_to tickets_url, notice: 'Error in sale' }
         format.json { render json: @sale.errors, status: :unprocessable_entity }
      end
    end
 end

  # PATCH/PUT /sales/1
  # PATCH/PUT /sales/1.json
  # def update
  #   respond_to do |format|
  #     if @sale.update(sale_params)
  #       format.html { redirect_to sales_path(@sale)}
  #       format.json { render :show, status: :ok, location: @sale }
  #     else
  #       format.html { render :edit }
  #       format.json { render json: @sale.errors, status: :unprocessable_entity }
  #     end
  #   end
  # end

  # DELETE /sales/1
  # DELETE /sales/1.json
  def destroy
   
    @ticket = Ticket.find(params[:ticket_id])
    @sale = @ticket.sales.find(params[:id])
    @ticket.update_columns(total: @ticket.total-@sale.totalsale < 0 ?  0 : @ticket.total-@sale.totalsale)
    @sale.destroy
   
    respond_to do |format|
      format.html { redirect_to tickets_url, notice: 'Ticket was successfully destroyed.' }
      format.json { head :no_content }
    end
end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_sale
      @sale = Sale.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def sale_params
      params.require(:sale).permit(:product_id, :ticket_id, :quantity, :totalsale, :_destroy)
    end
end
