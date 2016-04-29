class Product < ActiveRecord::Base
	has_many :sales
	has_many :tickets, :through => :sales
	mount_uploader :photo, PhotoproductUploader

	validates :name, :brand, :price, :purchaseprice, 
			  :dateofexpiry, :stock, :minstock, :maxstock, :description, 
			  :photo, :bar_code,  :presence => true
	validates_uniqueness_of :bar_code
	
end
