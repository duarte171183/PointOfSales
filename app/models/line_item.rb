class LineItem < ActiveRecord::Base
  belongs_to :product
  belongs_to :ticket 

  validates_presence_of :quantity, :product_id, :totalsale, :presence => true
  
 
  
end
