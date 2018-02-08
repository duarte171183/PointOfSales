class ProductsController < ApplicationController
  before_action :set_product, only: [:show, :edit, :update, :destroy]
  
  # GET /products
  # GET /products.json
  def index
    @page = (params[:page] || 0).to_i

    if params[:keywords].present?
      @keywords = params[:keywords]
      product_search_term = ProductSearchTerm.new(@keywords)
      @products = Product.where(product_search_term.where_clause, product_search_term.where_args).paginate(:page => params[:page], :per_page => 10)

    else
      @products = Product.all.order(:name).paginate(:page => params[:page], :per_page => 10)
    end
    
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
   if params[:keywords].present?
      @keywords = params[:keywords]
      product_search_term = ProductSearchTerm.new(@keywords)
      @product = Product.where(product_search_term.where_clause, product_search_term.where_args)
    else
      @product = []
    end
    
    respond_to do |format|
      format.html {render products}
      format.json { render json: @product}
    end
  end
  # POST /products
  # POST /products.json
  def create
    @product = Product.new(product_params)

    respond_to do |format|
      if @product.save
        flash[:success] = 'Todo was successfully created.'
        format.html { redirect_to products_url}
        format.json { render :show, status: :created, location:products_url}
      else
        flash[:danger] = 'There was a problem creating the product.'
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
