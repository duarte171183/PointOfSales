class Ticket < ActiveRecord::Base
	
	has_many :sales, :dependent => :destroy
	has_many :products, :through => :sales
	accepts_nested_attributes_for :sales, :reject_if => :all_blank, :allow_destroy=> true 

	attr_accessor :status

	def initialize      
   	 	@status = 1
    	super
  	end
end
