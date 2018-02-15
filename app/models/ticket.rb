class Ticket < ActiveRecord::Base
	
	has_many :LineItems, :dependent => :destroy
	has_many :products, through: :LineItems
	validates_associated :LineItems
	accepts_nested_attributes_for :LineItems, :reject_if => :all_blank, :allow_destroy=> true 
	validates_presence_of :subtotal, :total, :pay_with, :change, :presence => true

	scope :order_desc, -> { order(created_at: :desc)}

	def as_json(options={})
  
     super(:include => { :LineItems => {
           :include => { :product => {
           :include  => { :photo => {
           :include  => { :thumb => {
           					   :only => :url } },
           					   :only => :url } },
                               :only => [:name, :price] } },
                               :only => [:id, :quantity, :totalsale]} } )
    end
	
    def discount_from_stock
    	if self.status==2 
	    	self.products.each do |p|	
	    		self.LineItems.each do |l|
	    			p.stock -= l.quantity
	    			p.save
	    		end
	    	end 
		end    
	end

	def validate_and_save
  	  ActiveRecord::Base.transaction do
      self.save 
      self.products.each do |p|
      	  self.lineitems.each do |q|
      	  	if q.quantity > p.stock
	       		errors.add( :ticket, "quantity > stock") 
	       		raise ActiveRecord::Rollback 
	       	end
	       	p.stock -= q.quantity 
	      	p.save
	       end
      	end
	  end
	end
end
