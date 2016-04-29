class UsersController < ApplicationController
	before_filter :authenticate_user!
  before_filter :admin_only
  before_action :set_user, only: [:show, :edit, :update, :destroy]

  # GET /users
  # GET /users.json
  def index
    @users = User.where.not(id: current_user)
  end

  # GET /Users/1
  # GET /Users/1.json
  def show
    unless current_user.has_role? :admin
      unless @user == current_user
        redirect_to  root_path, :notice => "Access denied."
      end
    end
  end

  # GET /Users/new
  def new
    @user = User.new
  end

  # GET /users/1/edit
  def edit

  end
  # POST /users
  # POST /users.json
  def create
    @user = User.new(user_params)
    respond_to do |format|
      if @user.save
        format.html { redirect_to users_url, notice: 'user was successfully created.' }
        format.json { render :show, status: :created, location:user_url}
      else
        format.html { render :new }
        format.json { render json: @users.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /users/1
  # PATCH/PUT /users/1.json
 def update
  if user_params[:password].blank?
    user_params.delete(:password)
    user_params.delete(:password_confirmation)
  end

  successfully_updated = if needs_password?(@user, user_params)
                           @user.update(user_params)
                         else
                           @user.update_without_password(user_params)
                         end

  respond_to do |format|
    if successfully_updated
      format.html { redirect_to @user, notice: 'User was successfully updated.' }
      format.json { head :no_content }
    else
      format.html { render action: 'edit' }
      format.json { render json: @user.errors, status: :unprocessable_entity }
    end
  end
end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @user.destroy
    respond_to do |format|
      format.html { redirect_to users_url, notice: 'users was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_params
      params.require(:user).permit(:alias, :username, :email, :password, :password_confirmation, role_ids:[])
    end

    def admin_only
    unless current_user.has_role? :admin
      redirect_to  root_path, :notice => "Access denied."
    end
  end

  protected
  def needs_password?(user, params)
    params[:password].present?
  end
end
