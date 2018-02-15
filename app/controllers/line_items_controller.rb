class LineItemsController < ApplicationController
  before_action :set_lineitem, only: [:show, :edit, :update, :destroy]
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
    if @line_item =@ticket.products.exists?(lineitem_params[:product_id])
       @line_item_first=@ticket.LineItems.where(product_id: lineitem_params[:product_id]).first  
       @line_item_first.update(quantity: lineitem_params[:quantity].to_d+@line_item_first.quantity, totalsale: (lineitem_params[:totalsale].to_d+@line_item_first.totalsale < 0 ? lineitem_params[:totalsale]=@line_item_first.totalsale : lineitem_params[:totalsale].to_d+@line_item_first.totalsale  ))
       @line_item_first.destroy if @line_item_first.quantity<=0
       respond_to do |format|
        format.json {head :no_content}
      end
    else
       @line_item = @ticket.LineItems.create(lineitem_params)  
    end  
    
    respond_to do |format|
     if @ticket.update_columns(total: @ticket.total+lineitem_params[:totalsale] < 0 ?  0 : @ticket.total+lineitem_params[:totalsale])
         format.json { head :no_content }
      else
         format.json { render json: @line_item.errors, status: :unprocessable_entity }
      end
    end
 end

  # PATCH/PUT /sales/1
  # PATCH/PUT /sales/1.json
  # def update
  #   respond_to do |format|
  #     if @line_item.update(lineitem_params)
  #       format.html { redirect_to sales_path(@line_item)}
  #       format.json { render :show, status: :ok, location: @line_item }
  #     else
  #       format.html { render :edit }
  #       format.json { render json: @line_item.errors, status: :unprocessable_entity }
  #     end
  #   end
  # end

  # DELETE /sales/1
  # DELETE /sales/1.json
  def destroy
   
    @ticket = Ticket.find(params[:ticket_id])
    @line_item = @ticket.LineItems.find(params[:id])
    @ticket.update_columns(total: @ticket.total-@line_item.totalsale < 0 ?  0 : @ticket.total-@line_item.totalsale)
    @line_item.destroy
   
    respond_to do |format|
      format.html { redirect_to tickets_url, notice: 'Ticket was successfully destroyed.' }
      format.json { head :no_content }
    end
end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_lineitem
      @lineitem = LineItem.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def lineitem_params
      params.require(:lineitem).permit(:product_id, :ticket_id, :quantity, :totalsale, :_destroy)
    end
end
