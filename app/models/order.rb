class Order < ActiveRecord::Base
	 
	 belongs_to :supplier
	 has_many :products, through: :OrderItems
	 has_many :OrderItems, :dependent => :destroy
	 validates_associated :OrderItems, :supplier
	 
	 
	 accepts_nested_attributes_for :OrderItems,  :allow_destroy=> true 

	
	 

	 def validate_and_addstock
	 	ActiveRecord::Base.transaction do
		 	self.save
		 	self.products.each do |p|
			 	self.OrderItems .each do |o| 
			 		o.subtotal= o.quantity * o.purchaseprice
			 		o.save
			 		p.stock+=o.quantity
			 		p.save
			 	end
			end 
			if self.totalorder!=self.OrderItems.sum(:subtotal)
				errors.add(:order, "the total of order is not equal to sum of subtotal items" )  	
				raise ActiveRecord::Rollback
			end	
		 end
	 end
end
