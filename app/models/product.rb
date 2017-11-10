class Product < ActiveRecord::Base
	has_many :LineItems
	has_many :tickets, through: :LineItems
	has_many :orders
	mount_uploader :photo, PhotoproductUploader

	validates :name, :brand, :price,  
			  :dateofexpiry,  :minstock, :maxstock,
			  :bar_code,  :presence => true
	
	validates_uniqueness_of :bar_code
	
	before_save :titleize_name

	def name_with_initial
   	 "Barcode:#{bar_code} Name: #{name} -- Stock: #{stock}"
    end

	def titleize_name
	 	self.name = name.titleize
	 end 
end
