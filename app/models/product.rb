class Product < ActiveRecord::Base
	has_many :sales
	has_many :tickets, :through => :sales
	mount_uploader :photo, PhotoproductUploader
end
