
class Product < ActiveRecord::Base
	mount_uploader :photo, PhotoproductUploader
end
