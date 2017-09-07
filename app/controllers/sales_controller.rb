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
    @sale = @ticket.sales.create(sale_params)
    @ticket.update_columns(total: @ticket.total+@sale.totalsale)
     respond_to do |format|
      format.html { redirect_to tickets_url, notice: 'Ticket was successfully destroyed.' }
      format.json { head :no_content }
    end
 end

  # PATCH/PUT /sales/1
  # PATCH/PUT /sales/1.json
  def update
    respond_to do |format|
      if @sale.update(sale_params)
        format.html { redirect_to sales_path(@sale)}
        format.json { render :show, status: :ok, location: @sale }
      else
        format.html { render :edit }
        format.json { render json: @sale.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /sales/1
  # DELETE /sales/1.json
  def destroy
    @ticket = Ticket.find(params[:ticket_id])
    @sale = @ticket.sales.find(params[:id])
    @sale.destroy
    @ticket.update_columns(total: @ticket.total-@sale.totalsale)
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
      params.require(:sale).permit(:product_id, :ticket_id, :quantity, :_destroy, :totalsale)
    end
end
