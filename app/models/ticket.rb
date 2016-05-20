class Ticket < ActiveRecord::Base
	
	has_many :sales, :dependent => :destroy
	has_many :products, :through => :sales
	validates_associated :sales
	
	accepts_nested_attributes_for :sales, :reject_if => :all_blank, :allow_destroy=> true 
	
	validates_presence_of :subtotal, :total, :pay_with,  :presence => true
	

	protected
	def validates
		errors.add(:change, "should be positive") unless :change.nill? || :change >= 0.0
	end
end
