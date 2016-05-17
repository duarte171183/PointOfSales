class Ticket < ActiveRecord::Base
	
	has_many :sales, :dependent => :destroy
	has_many :products, :through => :sales
	validates_associated :sales
	accepts_nested_attributes_for :sales, :reject_if => :all_blank, :allow_destroy=> true 
	attr_accessor :status,:subtotal, :total, :pay_with, :sales_attributes
	validates :subtotal, :total, :pay_with, :presence => true
	
end
