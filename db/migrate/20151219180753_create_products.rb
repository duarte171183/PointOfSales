class CreateProducts < ActiveRecord::Migration
  def change
    create_table :products do |t|
      t.string :name
      t.string :brand
      t.decimal :price
      t.decimal :purchaseprice
      t.date :dateofexpiry
      t.integer :minstock
      t.integer :maxstock
      t.text :description

      t.timestamps null: false
    end
  end
end
