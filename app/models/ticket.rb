class Ticket < ActiveRecord::Base
	
	has_many :sales, :dependent => :destroy
	has_many :products, :through => :sales
	accepts_nested_attributes_for :sales, :reject_if => :all_blank, :allow_destroy=> true 

	attr_accessor :status,:subtotal, :total, :pay_with
	validates :subtotal, :total, :pay_with,  :presence => true
	
end
