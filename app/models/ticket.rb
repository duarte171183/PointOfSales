class Ticket < ActiveRecord::Base
	
	has_many :sales, :dependent => :destroy
	has_many :products, :through => :sales
	validates_associated :sales
	accepts_nested_attributes_for :sales, :reject_if => :all_blank, :allow_destroy=> true 
	validates_presence_of :subtotal, :total, :pay_with,  :presence => true
	
	def validate_and_save
  	  ActiveRecord::Base.transaction do
      self.save
      self.products.each do |p|
      	  self.sales.each do |q|
	      	e=q.quantity
	      	p.stock -= e 
	      	p.save
	       end
      	end
	  end
	end
end
