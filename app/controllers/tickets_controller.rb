
class TicketsController < ApplicationController

  before_action :set_ticket, only: [:show, :edit, :update, :destroy]
  respond_to :html, :json

  # GET /tickets
  # GET /tickets.json
  def index
    @tickets = Ticket.all
  end

  

  def findopenticket
     @openticket = Ticket.where(status: 1, user_id: current_user.id)
     respond_to do |format|
      format.html {}
      format.json { render json: @openticket}
    end
  end
  # GET /tickets/1
  # GET /tickets/1.json
  def show
    respond_to do |format|
      format.html
      format.pdf do 
        pdf = TicketPdf.new(@ticket, view_context)
        send_data pdf.render, filename: "ticket_#{@ticket.id}.pdf",
                              type: "application/pdf",
                              disposition: "inline"
      end
    end
  end

  # GET /tickets/new
  def new
    @ticket = Ticket.new
    @ticket.LineItems.build
 end

  # GET /tickets/1/edit
  def edit
    unless current_user.has_role? :admin
      unless @user == current_user
        redirect_to  root_path, :notice => "Access denied."
      end
    end
  end

  # POST /tickets
  # POST /tickets.json
  def create
    @ticket = Ticket.new(ticket_params)
    respond_to do |format|
      if @ticket.save
        format.html { redirect_to tickets_url, notice: 'Ticket was successfully created.' }
      else
        format.html { render :new  }
        format.json { render json: @ticket.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /tickets/1
  # PATCH/PUT /tickets/1.json
  def update
    respond_to do |format|
      if @ticket.update(ticket_params)
         @ticket.discount_from_stock
        format.html { redirect_to tickets_url, notice: 'Ticket was successfully updated.' }
      else
        format.html { render :edit }
        format.json { render json: @ticket.errors, status: :unprocessable_entity }
      end
    end

  end

  # DELETE /tickets/1
  # DELETE /tickets/1.json
  def destroy
    unless current_user.has_role? :admin
      unless @user == current_user
        redirect_to  root_path, :notice => "Access denied."
      end
    end
    @ticket.destroy
    respond_to do |format|
      format.html { redirect_to tickets_url, notice: 'Ticket was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_ticket
      @ticket = Ticket.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def ticket_params
      params.require(:ticket).permit(:subtotal, :total, :pay_with, :change, :status, :user_id,
                                      :LineItems_attributes => [:id, :product_id, :quantity, :totalsale,  :_destroy])
    end

end