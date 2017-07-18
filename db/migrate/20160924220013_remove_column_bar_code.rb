class RemoveColumnBarCode < ActiveRecord::Migration
  def change
  	remove_column :products, :bar_code
  end
end
