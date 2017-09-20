class Sale < ActiveRecord::Base
  belongs_to :product
  belongs_to :ticket 

  #validates_presence_of :quantity, :product_id, :totalsale, :presence => true
  
 
  def update_totalsale(product_id, quantity, exist)
  		if exist
  			self.quantity=self.quantity+quantity
  			self.totalsale=self.product.price*self.quantity
  		else
	  	   	self.totalsale=self.product.price*self.quantity
	    end
	       	self.save
	end
end
