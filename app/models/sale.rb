class Sale < ActiveRecord::Base
  belongs_to :product
  belongs_to :ticket 

  validates :quantity, :product_id, :presence => true
  
end
