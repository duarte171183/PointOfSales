class OrderItem < ActiveRecord::Base
  belongs_to :product
  belongs_to :order

  validates :product_id, :quantity,  :purchaseprice, :presence => true 

end
