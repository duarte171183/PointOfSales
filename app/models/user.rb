class User < ActiveRecord::Base
  resourcify
  rolify
  validates_uniqueness_of :alias
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable,  :rememberable, :trackable, :validatable

  
end
