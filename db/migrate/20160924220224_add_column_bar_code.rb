class AddColumnBarCode < ActiveRecord::Migration
  def change
  	    add_column :products, :bar_code, :bigint
  end
end
