class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action   :configure_permitted_parameters, :authenticate_user!, if: :devise_controller?
  
  

	def configure_permitted_parameters
  		devise_parameter_sanitizer.permit(:sign_in) { |u| u.permit(:alias, :username, :email, :password, :password_confirmation, roles_id: [])}
  		devise_parameter_sanitizer.permit(:account_update) { |u| u.permit(:alias, :username, :email, :password, :password_confirmation, :current_password, roles_id:[])}
  		devise_parameter_sanitizer.permit(:sign_up) { |u| u.permit(:alias, :username, :email, :password, :password_confirmation, roles_id: [])}
	end
  
end


# before_action :configure_permitted_parameters, if: :devise_controller?

#   protected

#   def configure_permitted_parameters
#     devise_parameter_sanitizer.permit(:sign_up, keys: [:username])
#   end