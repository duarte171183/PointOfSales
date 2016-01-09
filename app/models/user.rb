class User < ActiveRecord::Base
  
  has_many :roles, :through => :user_roles
  has_many :user_roles

  rolify

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  
end
