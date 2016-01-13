class AddBarCodeToProducts < ActiveRecord::Migration
  def change
    add_column :products, :bar_code, :integer
  end
end
