class Product < ActiveRecord::Base
	has_many :sales
	has_many :tickets, through: :sales
	mount_uploader :photo, PhotoproductUploader

	validates :name, :brand, :price, :purchaseprice, 
			  :dateofexpiry, :stock, :minstock, :maxstock,
			  :bar_code,  :presence => true
	validates_uniqueness_of :bar_code
	
	before_save :titleize_name

	def titleize_name
	 	self.name = name.titleize
	 end 
end
