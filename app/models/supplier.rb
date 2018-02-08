class Supplier < ActiveRecord::Base
	validates_uniqueness_of :name, :rfc
	validates_presence_of :name
	before_save :titleize_inputs

	private
	def titleize_inputs
	 	self.name = name.titleize
	 	self.rfc = name.titleize
	 end 
end
