class ProductsController < ApplicationController
  before_action :set_product, only: [:show, :edit, :update, :destroy]
  
  # GET /products
  # GET /products.json
  def index
    @products = Product.all.order(:name)
  end

  # GET /products/1
  # GET /products/1.json
  def show
   
  end

  # GET /products/new
  def new
    @product = Product.new
  end

  # GET /products/1/edit
  def edit
  end

  def find
    respond_to do |format|
      if params[:bar_code]
        @product = Product.find_by bar_code: params[:bar_code]
      end
      if @product.nil?
        @product = Product.new
        format.html { render :new, notice:  'new' }
      else
        format.html { render :show, notice:  'else' }
      end
      format.json { render json: @product,  notice:  'ok'}
    end
  end
  # POST /products
  # POST /products.json
  def create
    @product = Product.new(product_params)

    respond_to do |format|
      if @product.save
        format.html { redirect_to products_url, notice: 'Product was successfully created.' }
        format.json { render :show, status: :created, location:products_url}
      else
        format.html { render :new }
        format.json { render json: @product.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /products/1
  # PATCH/PUT /products/1.json
  def update
    respond_to do |format|
      if @product.update(product_params)
        format.html { redirect_to products_url, notice: 'Product was successfully updated.' }
        format.json { render :show, status: :ok, location: products_url }
      else
        format.html { render :edit }
        format.json { render json: @product.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /products/1
  # DELETE /products/1.json
  def destroy
    @product.destroy
    respond_to do |format|
      format.html { redirect_to products_url, notice: 'Product was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_product
      @product = Product.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def product_params
      params.require(:product).permit(:name, :brand, :price, :purchaseprice, :dateofexpiry, :stock, :minstock, :maxstock, :description, :photo, :bar_code)
    end
end
